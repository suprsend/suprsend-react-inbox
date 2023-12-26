import React, { useEffect, useState, createContext } from 'react'
import SuprsendJSInbox from '@suprsend/js-inbox'

const initialNotificationData = {
  storeData: {},
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
  stores,
  pageSize
}) {
  if (inboxId) {
    subscriberId = inboxId
  }

  const [inbox, setInbox] = useState()
  const [notificationsData, setNotificationsData] = useState({
    ...initialNotificationData
  })

  useEffect(() => {
    const inboxInst = new SuprsendJSInbox(workspaceKey, {
      pageSize,
      tenantID: tenantId,
      stores
    })
    setInbox(inboxInst)

    inboxInst.emitter.on('sync_notif_store', () => {
      const inboxData = inboxInst.feed.data
      setNotificationsData({
        storeData: inboxData?.stores || {},
        count: inboxData?.unseenCount || 0,
        hasNext: inboxData?.hasNext,
        initialLoading: inboxData?.initialLoading,
        fetchMoreLoading: inboxData?.fetchMoreLoading,
        activeStoreId: inboxData?.activeStoreId
      })
    })

    return () => {
      inboxInst.emitter.all.clear()
    }
  }, [])

  useEffect(() => {
    if (!subscriberId || !inbox) return

    inbox.identifyUser(distinctId, subscriberId)
    inbox.feed.fetchNotifications()

    return () => {
      inbox.resetUser()
    }
  }, [subscriberId, inbox])

  return (
    <InboxContext.Provider value={{ inbox, notificationsData, subscriberId }}>
      {children}
    </InboxContext.Provider>
  )
}

export default SuprSendProvider
