import React, { useEffect, useState, createContext } from 'react'
import SuprsendJSInbox from '@suprsend/js-inbox'
import { getStorageKey, getStorageData, setStorageData } from '../utils'

const initialNotificationData = {
  notifications: [],
  unseenCount: 0,
  hasNext: false,
  initialLoading: false,
  fetchMoreLoading: false
}

export const InboxContext = createContext({
  notificationsData: initialNotificationData
})

function SuprSendProvider({
  children,
  workspaceKey,
  distinctId,
  subscriberId,
  inboxId,
  tenantId,
  pageSize
}) {
  if (inboxId) {
    subscriberId = inboxId
  }
  const storageKey = getStorageKey(workspaceKey)
  const storedData = getStorageData(storageKey)
  const isSameUser = storedData?.subscriber_id === subscriberId

  const [inbox, setInbox] = useState()
  const [notificationsData, setNotificationsData] = useState({
    ...initialNotificationData,
    notifications: isSameUser ? storedData?.notifications || [] : []
  })

  useEffect(() => {
    if (!subscriberId) return

    const inboxInst = new SuprsendJSInbox(workspaceKey, {
      pageSize,
      tenantID: tenantId
    })
    setInbox(inboxInst)
    inboxInst.identifyUser(distinctId, subscriberId)

    inboxInst.emitter.on('sync_notif_store', () => {
      const inboxData = inboxInst.feed.data

      if (inboxData.initialLoading && inboxData?.notifications.length) {
        return
      }

      setNotificationsData({
        notifications: inboxData?.notifications || [],
        unseenCount: inboxData?.unseenCount || 0,
        hasNext: inboxData?.hasNext,
        initialLoading: inboxData.initialLoading,
        fetchMoreLoading: inboxData.fetchMoreLoading
      })
      setStorageData(storageKey, {
        notifications: inboxData?.notifications?.slice(0, 20),
        subscriber_id: subscriberId
      })
    })

    inboxInst.feed.fetchNotifications()

    return () => {
      inboxInst.resetUser()
    }
  }, [subscriberId, workspaceKey, tenantId])

  return (
    <InboxContext.Provider value={{ inbox, notificationsData }}>
      {children}
    </InboxContext.Provider>
  )
}

export default SuprSendProvider
