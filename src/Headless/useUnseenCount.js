import { useContext } from 'react'
import { InboxContext } from './SuprSendProvider'

// DEPRECATED: use useUnseenCount
export function useBell() {
  const inboxData = useContext(InboxContext)

  return {
    unSeenCount: inboxData.notificationsData.count,
    markAllSeen: inboxData.inbox?.feed.markAllSeen?.bind(inboxData.inbox?.feed)
  }
}

export function useUnseenCount() {
  const inboxData = useContext(InboxContext)

  return {
    unSeenCount: inboxData.notificationsData.count,
    markAllSeen: inboxData.inbox?.feed.markAllSeen?.bind(inboxData.inbox?.feed)
  }
}
