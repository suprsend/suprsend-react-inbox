import { useContext, useEffect } from 'react'
import { InboxContext } from './SuprSendProvider'

export default function useEvent(eventName, callback) {
  const inboxData = useContext(InboxContext)

  useEffect(() => {
    const emitter = inboxData?.inbox?.emitter
    if (emitter) {
      emitter.on(eventName, callback)
    }

    return () => emitter?.off(eventName)
  }, [inboxData?.inbox])
}
