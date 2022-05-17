/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import { useState, useEffect, useRef } from 'react'
import { usePopper } from 'react-popper'
import Bell from './Bell'
import Badge from './Badge'
import Toaster, { notify } from './Toast'
import NotificationContainer from './NotificationContainer'
import useClickOutside from './utils/useClickOutside'
import config from './config'
import { getNotifications } from './utils/api'
import {
  InboxContext,
  getStorageKey,
  getStorageData,
  setStorageData
} from './utils'
export { default as NotificationBox } from './NotificationContainer'

function processNotificationData({
  response,
  notificationData,
  setNotificationData,
  currentFetchingOn,
  storageKey,
  distinctId
}) {
  const firstCall = !notificationData.last_after
  let newNotificationsList = [] // actual and final notification list
  let newlyFetchedNotifications = [] // for showing toast
  const badgeCount = response.results.reduce((acc, item) => {
    return !item.seen_on ? acc + 1 : acc
  }, 0)

  if (response.results.length > config.BATCH_SIZE) {
    newNotificationsList = response.results.slice(0, config.BATCH_SIZE)
    newlyFetchedNotifications = newNotificationsList
  } else {
    let allNotifications = []
    if (firstCall) {
      allNotifications = response.results
    } else {
      allNotifications = [
        ...response.results,
        ...notificationData.notifications
      ]
    }
    // remove dupicates and get first 20 notifications
    newNotificationsList = allNotifications
      .filter((v, i, a) => a.findIndex((v2) => v2.n_id === v.n_id) === i)
      .slice(0, config.BATCH_SIZE)
    newlyFetchedNotifications = response.results.filter((el) => {
      return !notificationData.notifications.find((obj) => {
        return el.n_id === obj.n_id
      })
    })
  }

  // filter unseen notification from new notifications
  const newUnseenNotification = newlyFetchedNotifications.filter(
    (notification) => !notification.seen_on
  )

  // show toast for new notifications
  const notificationCount = newUnseenNotification.length
  if (notificationCount > 0 && !firstCall) {
    notify({
      notificationCount,
      notificationData: newUnseenNotification[0]
    })
  }

  const totalNewNotificationCount = notificationData.count + badgeCount
  // set in state and local storage
  setNotificationData(() => ({
    notifications: newNotificationsList,
    last_after: currentFetchingOn,
    count:
      totalNewNotificationCount > config.BATCH_SIZE
        ? config.BATCH_SIZE
        : totalNewNotificationCount
  }))
  setStorageData(storageKey, {
    notifications: newNotificationsList,
    distinct_id: distinctId
  })
}

function getNotificationsApi(
  { distinctId, workspaceKey, setNotificationData, storageKey },
  dataRef
) {
  const notificationData = dataRef.current
  const newAfter = notificationData.last_after
    ? notificationData.last_after
    : Date.now() - 30 * 24 * 60 * 60 * 1000
  const currentFetchingOn = Date.now()

  getNotifications({ distinctId, workspaceKey, after: newAfter })
    .then((res) => res.json())
    .then((response) => {
      processNotificationData({
        response,
        notificationData,
        setNotificationData,
        currentFetchingOn,
        storageKey,
        distinctId
      })
    })
    .catch((err) => {
      console.log('ERROR', err)
    })
}

function SuprsendInbox({
  workspaceKey = '',
  distinctId = '',
  children,
  toastProps,
  bellProps,
  badgeProps,
  headerProps,
  buttonClickHandler
}) {
  const storageKey = getStorageKey(workspaceKey)
  const storedData = getStorageData(storageKey)
  const isSameUser = storedData?.distinct_id === distinctId

  const [openInbox, toggleInbox] = useState(false)
  const [referenceElement, setReferenceElement] = useState(null)
  const [popperElement, setPopperElement] = useState(null)
  const [arrowElement, setArrowElement] = useState(null)
  const [notificationData, setNotificationData] = useState({
    notifications: isSameUser ? storedData?.notifications || [] : [],
    count: 0,
    last_after: null
  })
  const dataRef = useRef(notificationData)

  useEffect(() => {
    dataRef.current = notificationData
  }, [notificationData])

  useEffect(() => {
    const storedData = getStorageData(storageKey)
    const resetData = {
      notifications: isSameUser ? storedData?.notifications || [] : [],
      count: 0,
      last_after: null
    }
    setNotificationData(resetData)
    dataRef.current = resetData
    const props = {
      distinctId,
      workspaceKey,
      notificationData,
      setNotificationData,
      storageKey
    }
    getNotificationsApi(props, dataRef)
    const timerId = setInterval(() => {
      getNotificationsApi(props, dataRef)
    }, config.DELAY)
    return () => {
      clearInterval(timerId)
    }
  }, [distinctId, workspaceKey])

  useClickOutside({ current: popperElement }, () => {
    toggleInbox((prev) => !prev)
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
        notificationData,
        setNotificationData,
        toggleInbox,
        buttonClickHandler
      }}
    >
      <div
        css={css`
          position: relative;
          display: inline-block;
          background-color: transparent;
        `}
      >
        <div
          onClick={() => {
            setNotificationData((prev) => ({ ...prev, count: 0 }))
            toggleInbox((prev) => !prev)
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
        {openInbox && (
          <div
            ref={setPopperElement}
            style={{ ...styles.popper, zIndex: 999 }}
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
