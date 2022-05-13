/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import { useState, useEffect, createContext } from 'react'
import { usePopper } from 'react-popper'
import Bell from './Bell'
import Badge from './Badge'
import Toaster, { notify } from './Toast'
import NotificationContainer from './NotificationContainer'
import useClickOutside from './utils/useClickOutside'
import useLocalStorage from './utils/useLocalStorage'
import config from './config'
import { getNotifications } from './utils/api'

const mockData = {
  unread: 10,
  results: [
    {
      created_on: 1343105158102,
      n_category: 'transactional',
      n_id: 'dsdskjdk',
      message: {
        header: 'Welcome to SuprSend',
        text: 'This diwali buy any item above 500rs and get 2000rs cashback only on suprsend'
      }
    },
    {
      created_on: 1643105158102,
      n_category: 'transactional',
      n_id: 'dsdskjl',
      seen_on: 1643101796876,
      message: {
        header: 'Welcome to SuprSend',
        text: 'This diwali buy any item above 500rs and get 2000rs cashback only on suprsend',
        image: '',
        button: 'Click Me',
        url: ''
      }
    },
    {
      created_on: 1643105148102,
      n_category: 'transactional',
      n_id: 'dsdskjm',
      message: {
        header: 'Welcome to SuprSend',
        text: 'This diwali buy any item above 500rs and get 2000rs cashback only on suprsend',
        image: '',
        button: 'Click Me',
        url: ''
      }
    },
    {
      created_on: 1643105198102,
      n_category: 'transactional',
      n_id: 'dsdskjln',
      seen_on: 1643101796876,
      message: {
        header: 'Welcome to SuprSend',
        text: 'This diwali buy any item above 500rs and get 2000rs cashback only on suprsend',
        image: '',
        button: 'Click Me',
        url: ''
      }
    }
  ]
}

function processNotificationData({
  currentFetchingOn,
  response,
  setNotificationData,
  notificationData
}) {
  const storageObject = {
    last_fetched: currentFetchingOn
  }
  if (response.results.length > config.BATCH_SIZE) {
    storageObject.notifications = response.results.slice(
      0,
      config.BATCH_SIZE + 1
    )
    storageObject.unread = config.BATCH_SIZE
  } else {
    const allNotifications = [
      ...response.results,
      ...notificationData.notifications
    ]

    // get new notifications
    const newNotifications = response.results.filter((el) => {
      return !notificationData.notifications.find((obj) => {
        return el.n_id === obj.n_id
      })
    })
    const notificationCount = newNotifications.length
    if (notificationCount > 0) {
      notify({ notificationCount, notificationData: newNotifications[0] })
    }

    // // ------------------- //
    // const notificationCount = allNotifications.length
    // if (notificationCount > 0) {
    //   notify({ notificationCount: 1, notificationData: allNotifications[0] })
    // }
    // // ------------------- //

    // remove dupicates and get first 25 notifications
    const formattedNotifications = allNotifications
      .filter((v, i, a) => a.findIndex((v2) => v2.n_id === v.n_id) === i)
      .slice(0, config.BATCH_SIZE + 1)
    // get count of unread notificationst
    const unread = formattedNotifications.reduce(
      (acc, item) => (!item.seen_on ? acc + 1 : acc),
      0
    )
    storageObject.notifications = formattedNotifications
    storageObject.unread = unread
  }
  setNotificationData(storageObject)
}

function getNotificationsApi({
  distinctId,
  workspaceKey,
  notificationData,
  setNotificationData
}) {
  const after = notificationData.last_fetched
  const currentFetchingOn = Date.now()
  getNotifications({ distinctId, workspaceKey, after })
    .then((res) => res.json())
    .then((response) => {
      console.log('RESPONSE', response)
      processNotificationData({
        response,
        setNotificationData,
        currentFetchingOn,
        notificationData
      })
    })
    .catch((err) => {
      console.log('ERROR', err)
      // // ----------------------- //
      // const response = mockData
      // processNotificationData({
      //   response,
      //   setNotificationData,
      //   currentFetchingOn,
      //   notificationData
      // })
      // // ----------------------- //
    })
}

export const InboxContext = createContext({})

function SuprsendInbox({
  workspaceKey = '',
  distinctId = '',
  children,
  toastProps,
  bellProps,
  badgeProps,
  headerProps,
  notificationProps
}) {
  const [isOpen, toggleOpen] = useState(false)
  const [referenceElement, setReferenceElement] = useState(null)
  const [popperElement, setPopperElement] = useState(null)
  const [arrowElement, setArrowElement] = useState(null)
  const [notificationData, setNotificationData] = useLocalStorage(
    '_suprsend_inbox',
    {
      notifications: [],
      unread: 0,
      last_fetched: Date.now() - 30 * 24 * 60 * 60 * 1000
    }
  )

  useEffect(() => {
    const props = {
      distinctId,
      workspaceKey,
      notificationData,
      setNotificationData
    }
    getNotificationsApi(props)
    setInterval(() => {
      getNotificationsApi(props)
    }, config.DELAY)
  }, [])

  useClickOutside({ current: popperElement }, () => {
    toggleOpen((prev) => !prev)
  })

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'bottom',
    modifiers: [
      { name: 'arrow', options: { element: arrowElement } },
      {
        name: 'offset',
        options: {
          offset: [0, 5]
        }
      }
    ]
  })

  const arrowStyle = {
    ...styles.arrow,
    ...{
      width: 0,
      height: 0,
      borderLeft: '10px solid transparent',
      borderRight: '10px solid transparent',
      borderBottom: '10px solid white',
      top: -8
    }
  }

  const NotificationBox = children ? children : NotificationContainer

  return (
    <InboxContext.Provider
      value={{
        distinctId,
        workspaceKey,
        notifications: notificationData.notifications,
        unread: notificationData.unread,
        setNotificationData,
        toggleInbox: toggleOpen
      }}
    >
      <div
        css={css`
          position: relative;
          display: inline-block;
        `}
      >
        <div
          onClick={() => {
            toggleOpen((prev) => !prev)
          }}
          ref={setReferenceElement}
          css={css`
            position: relative;
            margin-top: 12px;
            margin-right: 12px;
            cursor: pointer;
          `}
        >
          <Badge {...badgeProps} />
          <Bell {...bellProps} />
        </div>
        {isOpen && (
          <div
            ref={setPopperElement}
            style={styles.popper}
            {...attributes.popper}
          >
            <div ref={setArrowElement} style={arrowStyle} />
            <NotificationBox headerProps={headerProps} />
          </div>
        )}
        <Toaster {...toastProps} />
      </div>
    </InboxContext.Provider>
  )
}

export default SuprsendInbox
