import React, { useState, useEffect, useRef } from 'react'
import Inbox from './Inbox'
import Toast, { notify } from './Toast'
import config from './config'
import { getNotifications, markBellClicked } from './utils/api'
import { getStorageKey, getStorageData, setStorageData } from './utils'
import { InboxContext, InboxThemeContext } from './utils/context'

function processNotifications(props) {
  const {
    subscriberId,
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

  // show toast for new notifications
  if (!firstCall && newFetchedUnseenNotifications.length > 0) {
    notify({
      notificationsData: newFetchedUnseenNotifications,
      setNotificationsData,
      ...otherProps
    })
  }

  // set in state
  setNotificationsData(() => ({
    notifications: newNotificationsList,
    last_after: currentFetchingOn,
    count: notificationsData.count + response.unread
  }))

  // set in localstorage
  setStorageData(storageKey, {
    notifications: newNotificationsList,
    subscriber_id: subscriberId
  })
}

function getNotificationsApi(props, notificationsDataRef) {
  const { workspaceKey, workspaceSecret, subscriberId, distinctId } = props
  const notificationsData = notificationsDataRef.current
  const newAfter = notificationsData.last_after
    ? notificationsData.last_after
    : Date.now() - 30 * 24 * 60 * 60 * 1000
  const currentFetchingOn = Date.now()

  getNotifications({
    workspaceKey,
    workspaceSecret,
    subscriberId,
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
  subscriberId = '',
  toastProps,
  notificationClickHandler,
  theme,
  bellComponent,
  badgeComponent,
  notificationComponent,
  noNotificationsComponent,
  hideInbox,
  hideToast
}) {
  const storageKey = getStorageKey(workspaceKey)
  const storedData = getStorageData(storageKey)
  const isSameUser = storedData?.subscriber_id === subscriberId

  const [openInbox, toggleInbox] = useState(false)
  const [notificationsData, setNotificationsData] = useState({
    notifications: isSameUser ? storedData?.notifications || [] : [],
    count: 0,
    last_after: null
  })
  const notificationsDataRef = useRef(notificationsData)

  useEffect(() => {
    notificationsDataRef.current = notificationsData
  }, [notificationsData])

  useEffect(() => {
    if (openInbox && subscriberId) {
      markBellClicked({
        distinctId,
        workspaceKey,
        workspaceSecret,
        subscriberId
      })
    }
  }, [openInbox, subscriberId])

  // get notifications and start polling for new ones
  useEffect(() => {
    if (!subscriberId) return
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
      subscriberId,
      distinctId,
      setNotificationsData,
      storageKey,
      toastProps,
      notificationClickHandler
    }
    getNotificationsApi(props, notificationsDataRef)
    const timerId = setInterval(() => {
      getNotificationsApi(props, notificationsDataRef)
    }, config.DELAY)
    return () => {
      clearInterval(timerId)
    }
  }, [subscriberId, workspaceKey])

  return (
    <InboxThemeContext.Provider value={theme || {}}>
      <InboxContext.Provider
        value={{
          workspaceKey,
          notificationsData,
          setNotificationsData,
          notificationClickHandler,
          bellComponent,
          badgeComponent,
          notificationComponent,
          noNotificationsComponent
        }}
      >
        {!hideInbox && (
          <Inbox openInbox={openInbox} toggleInbox={toggleInbox} />
        )}
        {!hideToast && <Toast {...toastProps} />}
      </InboxContext.Provider>
    </InboxThemeContext.Provider>
  )
}

export default SuprsendInbox
