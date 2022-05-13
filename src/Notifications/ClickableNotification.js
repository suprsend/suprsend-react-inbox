import React, { useContext } from 'react'
import Notification from './Notification'
import { markSeen } from '../utils/api'
import { uuid, epochMilliseconds } from '../utils'
import { InboxContext } from '../index'

export default function ClickableNotification({ notificationData }) {
  const { workspaceKey, setNotificationData, notifications } =
    useContext(InboxContext)

  const handleClick = (e) => {
    e.stopPropagation()
    if (!notificationData.seen_on) {
      const body = {
        event: '$notification_clicked',
        env: workspaceKey,
        $insert_id: uuid(),
        $time: epochMilliseconds(),
        properties: { id: notificationData.id }
      }
      markSeen(workspaceKey, body)
        .then((res) => res.json())
        .then((json) => {
          console.log('RESPONSE', json)
          for (const notification of notifications) {
            if (notification.n_id === notificationData.n_id) {
              notification.seen_on = Date.now()
            }
          }
          setNotificationData((prev) => ({
            ...prev,
            unread: prev.unread - 1,
            notifications
          }))
        })
        .catch((err) => {
          console.log('ERROR', err)
          // // -------------------- //
          // for (const notification of notifications) {
          //   if (notification.n_id === notificationData.n_id) {
          //     notification.seen_on = Date.now()
          //   }
          // }
          // setNotificationData((prev) => ({
          //   ...prev,
          //   unread: prev.unread - 1,
          //   notifications
          // }))
          // // --------------------- //
        })
    }
  }

  return (
    <div onClick={handleClick}>
      <Notification notificationData={notificationData} />
    </div>
  )
}
