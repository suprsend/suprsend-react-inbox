import { useContext } from 'react'
import { InboxContext } from './SuprSendProvider'

export function useStoreUnseenCount(storeId) {
  const inboxData = useContext(InboxContext)

  return {
    unSeenCount: inboxData.notificationsData.storeData?.[storeId]?.unseenCount
  }
}

export function useStoresUnseenCount() {
  const inboxData = useContext(InboxContext)
  const storeData = inboxData.notificationsData.storeData
  const storeCount = {}

  for (const storeId in storeData) {
    const store = storeData[storeId]
    storeCount[storeId] = store.unseenCount
  }

  return storeCount
}
