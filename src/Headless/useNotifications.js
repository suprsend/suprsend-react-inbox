import { useContext } from 'react'
import { InboxContext } from './SuprSendProvider'

export default function useNotifications() {
  const inboxData = useContext(InboxContext)
  const notificationsFeed = inboxData.inbox?.feed

  return {
    notifications: inboxData.notificationsData.notifications,
    unSeenCount: inboxData.notificationsData.unseenCount,
    initialLoading: inboxData.notificationsData.initialLoading,
    hasNext: inboxData.notificationsData.hasNext,
    fetchMoreLoading: inboxData.notificationsData.fetchMoreLoading,

    markClicked: notificationsFeed?.markClicked.bind(notificationsFeed),
    markAllSeen: notificationsFeed?.markAllSeen.bind(notificationsFeed),
    markAllRead: notificationsFeed?.markAllRead.bind(notificationsFeed),
    fetchPrevious: notificationsFeed?.fetchNotifications.bind(notificationsFeed)
  }
}
