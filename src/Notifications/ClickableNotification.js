import React, { useContext } from 'react'
import Notification from './Notification'
import { markSeen } from '../utils/api'
import { uuid, epochMilliseconds, InboxContext } from '../utils'

export default function ClickableNotification({
  notificationData,
  buttonClickHandler
}) {
  const {
    workspaceKey,
    setNotificationData,
    notifications,
    notificationData: storeData
  } = useContext(InboxContext)

  const handleClick = (e) => {
    e.stopPropagation()
    if (!notificationData.seen_on) {
      const body = {
        event: '$notification_clicked',
        env: workspaceKey,
        $insert_id: uuid(),
        $time: epochMilliseconds(),
        properties: { id: notificationData.n_id }
      }
      markSeen(workspaceKey, body)
        .then((res) => {
          if (res.status === 202) {
            for (const notification of notifications) {
              if (notification.n_id === notificationData.n_id) {
                notification.seen_on = Date.now()
              }
            }
            setNotificationData({
              ...storeData,
              unread: storeData.unread - 1,
              notifications
            })
          }
        })
        .catch((err) => {
          console.log('MARK SEEN ERROR ', err)
        })
    }
  }

  return (
    <div onClick={handleClick}>
      <Notification
        notificationData={notificationData}
        buttonClickHandler={buttonClickHandler}
      />
    </div>
  )
}
