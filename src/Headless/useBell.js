import { useContext } from 'react'
import { InboxContext } from './SuprSendProvider'

export default function useBell() {
  const inboxData = useContext(InboxContext)

  return {
    unSeenCount: inboxData.notificationsData.unseenCount,
    markAllSeen: inboxData.inbox?.feed.markAllSeen?.bind(inboxData.inbox?.feed)
  }
}
