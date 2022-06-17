/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import { useState, useEffect, useRef } from 'react'
import { usePopper } from 'react-popper'
import Bell from './Bell'
import Badge from './Badge'
import Toast, { notify } from './Toast'
import NotificationsContainer from './NotificationsContainer'
import useClickOutside from './utils/useClickOutside'
import config from './config'
import { getNotifications } from './utils/api'
import {
  InboxContext,
  getStorageKey,
  getStorageData,
  setStorageData
} from './utils'
export { default as NotificationsBox } from './NotificationsContainer'
export { default as NotificationsList } from './Notifications/NotificationsList'

function processNotifications(props) {
  const {
    distinctId,
    response,
    notificationsData,
    setNotificationsData,
    currentFetchingOn,
    storageKey,
    ...otherProps
  } = props
  let newNotificationsList = [] // final notifications list after adding old and new notifications
  let newFetchedNotificationsList = [] // only new notifications, used for showing toast
  const firstCall = !notificationsData.last_after
  const badgeCount = response.results.reduce((acc, item) => {
    return !item.seen_on ? acc + 1 : acc
  }, 0)

  if (response.results.length > config.BATCH_SIZE) {
    newNotificationsList = response.results.slice(0, config.BATCH_SIZE)
    newFetchedNotificationsList = newNotificationsList
  } else {
    newNotificationsList = firstCall
      ? response.results
      : [...response.results, ...notificationsData.notifications]
    newNotificationsList = newNotificationsList.slice(0, config.BATCH_SIZE)
    newFetchedNotificationsList = response.results
  }

  // filter unseen notification from new notifications
  const newFetchedUnseenNotifications = newFetchedNotificationsList.filter(
    (notification) => !notification.seen_on
  )

  const newFetchedUnseenNotificationsCount =
    newFetchedUnseenNotifications.length

  // show toast for new notifications
  if (!firstCall && newFetchedUnseenNotificationsCount > 0) {
    notify({
      notificationsData: newFetchedUnseenNotifications,
      setNotificationsData,
      ...otherProps
    })
  }

  const totalNewNotificationCount = notificationsData.count + badgeCount

  // set in state
  setNotificationsData(() => ({
    notifications: newNotificationsList,
    last_after: currentFetchingOn,
    count:
      totalNewNotificationCount > config.BATCH_SIZE
        ? config.BATCH_SIZE
        : totalNewNotificationCount
  }))

  // set in localstorage
  setStorageData(storageKey, {
    notifications: newNotificationsList,
    distinct_id: distinctId
  })
}

function getNotificationsApi(props, notificationsDataRef) {
  const { workspaceKey, workspaceSecret, distinctId } = props
  const notificationsData = notificationsDataRef.current
  const newAfter = notificationsData.last_after
    ? notificationsData.last_after
    : Date.now() - 30 * 24 * 60 * 60 * 1000
  const currentFetchingOn = Date.now()

  getNotifications({
    workspaceKey,
    workspaceSecret,
    distinctId,
    after: newAfter
  })
    .then((res) => res.json())
    .then((response) => {
      processNotifications({
        response,
        notificationsData,
        currentFetchingOn,
        ...props
      })
    })
    .catch((err) => {
      console.log('ERROR', err)
    })
}

function SuprsendInbox({
  workspaceKey = '',
  workspaceSecret = '',
  distinctId = '',
  children,
  containerStyle,
  bellProps,
  badgeProps,
  notificationContainerProps,
  headerProps,
  notificationProps,
  toastProps,
  buttonClickHandler
}) {
  const storageKey = getStorageKey(workspaceKey)
  const storedData = getStorageData(storageKey)
  const isSameUser = storedData?.distinct_id === distinctId

  const [openInbox, toggleInbox] = useState(false)
  const [referenceElement, setReferenceElement] = useState(null)
  const [popperElement, setPopperElement] = useState(null)
  const [arrowElement, setArrowElement] = useState(null)
  const [notificationsData, setNotificationsData] = useState({
    notifications: isSameUser ? storedData?.notifications || [] : [],
    count: 0,
    last_after: null
  })
  const notificationsDataRef = useRef(notificationsData)
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

  // listen to click outside inbox container
  useClickOutside({ current: popperElement }, () => {
    toggleInbox((prev) => !prev)
  })

  useEffect(() => {
    notificationsDataRef.current = notificationsData
  }, [notificationsData])

  useEffect(() => {
    if (openInbox) {
      console.log('make post request')
    }
  }, [openInbox])

  // get notifications and start polling for new ones
  useEffect(() => {
    const storedData = getStorageData(storageKey)
    const resetData = {
      notifications: isSameUser ? storedData?.notifications || [] : [],
      count: 0,
      last_after: null
    }
    setNotificationsData(resetData)
    notificationsDataRef.current = resetData
    const props = {
      workspaceKey,
      workspaceSecret,
      distinctId,
      setNotificationsData,
      storageKey,
      toastProps,
      buttonClickHandler
    }
    getNotificationsApi(props, notificationsDataRef)
    const timerId = setInterval(() => {
      getNotificationsApi(props, notificationsDataRef)
    }, config.DELAY)
    return () => {
      clearInterval(timerId)
    }
  }, [distinctId, workspaceKey])

  const handleBellClick = () => {
    setNotificationsData((prev) => ({ ...prev, count: 0 }))
    toggleInbox((prev) => !prev)
  }

  const arrowStyle = {
    ...styles.arrow,
    ...{
      width: 0,
      height: 0,
      borderLeft: '10px solid transparent',
      borderRight: '10px solid transparent',
      borderBottom: '10px solid white',
      top: -8
    },
    ...{
      borderBottomColor: headerProps?.containerStyle?.backgroundColor || 'white'
    }
  }
  const NotificationsBox = children || NotificationsContainer

  return (
    <InboxContext.Provider
      value={{
        distinctId,
        workspaceKey,
        notificationsData,
        setNotificationsData,
        toggleInbox,
        buttonClickHandler,
        notificationProps
      }}
    >
      <div
        css={css`
          position: relative;
          display: inline-block;
          background-color: transparent;
          ${containerStyle}
        `}
      >
        <div
          onClick={handleBellClick}
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
            <NotificationsBox
              headerProps={headerProps}
              notificationContainerProps={notificationContainerProps}
            />
          </div>
        )}
      </div>
      <Toast {...toastProps} />
    </InboxContext.Provider>
  )
}

export default SuprsendInbox
