import { useContext, useEffect } from 'react'
import { InboxContext } from './SuprSendProvider'

export default function useNotifications(storeId) {
  const inboxData = useContext(InboxContext)
  const notificationsFeed = inboxData.inbox?.feed

  useEffect(() => {
    if (inboxData?.inbox && storeId) {
      inboxData.inbox.changeActiveStore(storeId)
    }
  }, [storeId, inboxData?.inbox, inboxData?.subscriberId])

  const firstStore = notificationsFeed?.stores?.[0]?.storeId || 'default_store'
  const activeStoreId = storeId || firstStore

  const activeStoreData =
    inboxData?.notificationsData?.storeData?.[activeStoreId]

  return {
    notifications: activeStoreData?.notifications || [],
    initialLoading: inboxData.notificationsData.initialLoading,
    hasNext: inboxData.notificationsData.hasNext,
    fetchMoreLoading: inboxData.notificationsData.fetchMoreLoading,

    markClicked: notificationsFeed?.markClicked.bind(notificationsFeed),
    markRead: notificationsFeed?.markRead.bind(notificationsFeed),
    markUnRead: notificationsFeed?.markUnRead.bind(notificationsFeed),
    markArchived: notificationsFeed?.markArchived.bind(notificationsFeed),
    markAllSeen: notificationsFeed?.markAllSeen.bind(notificationsFeed),
    markAllRead: notificationsFeed?.markAllRead.bind(notificationsFeed),
    fetchPrevious: notificationsFeed?.fetchNotifications.bind(notificationsFeed)
  }
}
