import React, { useState, useEffect } from 'react'
import SuprsendJSInbox from '@suprsend/js-inbox'
import Inbox from './Inbox'
import Toast, { notify } from './Toast'
import {
  getStorageKey,
  getStorageData,
  mergeDeep,
  setStorageData
} from './utils'
import { InboxContext, InboxThemeContext } from './utils/context'
import { darkTheme } from './utils/styles'

function SuprsendInbox({
  workspaceKey = '',
  tenantId = '',
  distinctId = '',
  subscriberId = '', // subscriberId is deprecated use inboxId
  inboxId = '',
  toastProps,
  notificationClickHandler,
  bellComponent,
  badgeComponent,
  notificationComponent,
  noNotificationsComponent,
  loaderComponent,
  hideAvatar = false,
  hideInbox,
  hideToast,
  theme,
  themeType = 'light',
  pagination = true,
  pageSize,
  openLinksInNewTab = false
}) {
  if (inboxId) {
    subscriberId = inboxId
  }
  const storageKey = getStorageKey(workspaceKey)
  const storedData = getStorageData(storageKey)
  const isSameUser = storedData?.subscriber_id === subscriberId

  const [openInbox, toggleInbox] = useState(false)
  const [inbox, setInbox] = useState()
  const [notificationsData, setNotificationsData] = useState({
    notifications: isSameUser ? storedData?.notifications || [] : [],
    count: 0
  })

  useEffect(() => {
    if (openInbox && subscriberId && inbox) {
      inbox.feed.markAllSeen()
    }
  }, [openInbox, subscriberId, inbox])

  useEffect(() => {
    if (!subscriberId) return
    const storedData = getStorageData(storageKey)
    const isSameUser = storedData?.subscriber_id === subscriberId
    const resetData = {
      notifications: isSameUser ? storedData?.notifications || [] : [],
      count: 0
    }

    setNotificationsData(resetData)
    const inboxInst = new SuprsendJSInbox(workspaceKey, {
      pageSize,
      tenantID: tenantId
    })
    setInbox(inboxInst)
    inboxInst.identifyUser(distinctId, subscriberId)

    inboxInst.emitter.on('sync_notif_store', () => {
      const inboxData = inboxInst.feed.data
      if (inboxData.initialLoading && notificationsData.notifications.length) {
        return
      }
      setNotificationsData({
        notifications: inboxData?.notifications || [],
        count: inboxData?.unseenCount || 0,
        hasNext: inboxData?.hasNext,
        initialLoading: inboxData.initialLoading
      })
      setStorageData(storageKey, {
        notifications: inboxData?.notifications?.slice(0, 20),
        subscriber_id: subscriberId
      })
    })

    inboxInst.emitter.on('new_notification', (notification) => {
      notify({
        notificationsData: notification,
        toastProps
      })
    })

    inboxInst.feed.fetchNotifications()
    return () => {
      inboxInst.resetUser()
    }
  }, [subscriberId, workspaceKey, tenantId])

  const themeValue =
    themeType === 'dark' ? mergeDeep(darkTheme, theme) : theme || {}

  return (
    <InboxThemeContext.Provider value={themeValue}>
      <InboxContext.Provider
        value={{
          workspaceKey,
          notificationsData,
          setNotificationsData,
          notificationClickHandler,
          bellComponent,
          badgeComponent,
          notificationComponent,
          noNotificationsComponent,
          toggleInbox,
          inbox,
          loaderComponent,
          pagination,
          hideAvatar,
          openLinksInNewTab
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
