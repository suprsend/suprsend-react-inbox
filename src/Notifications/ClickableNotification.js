import React, { useContext } from 'react'
import Notification from './Notification'
import { markSeen } from '../utils/api'
import { InboxContext } from '../utils'

export default function ClickableNotification({ notificationData }) {
  const { workspaceKey, setNotificationsData, buttonClickHandler } =
    useContext(InboxContext)

  const navigateUser = () => {
    // redirect after mark seen logic
    if (typeof buttonClickHandler === 'function') {
      buttonClickHandler(notificationData)
    } else {
      if (notificationData?.message?.url) {
        window.location.href = notificationData.message.url
      }
    }
  }

  const handleClick = (e) => {
    e.stopPropagation()
    if (notificationData.seen_on) {
      navigateUser()
    } else {
      markSeen(workspaceKey, notificationData.n_id)
        .then((res) => {
          if (res.status === 202) {
            setNotificationsData((prev) => {
              for (const notificationItem of prev.notifications) {
                if (notificationItem.n_id === notificationData.n_id) {
                  notificationItem.seen_on = Date.now()
                }
              }
              return { ...prev }
            })
          }
        })
        .catch((err) => {
          console.log('MARK SEEN ERROR ', err)
        })
        .finally(() => {
          navigateUser()
        })
    }
  }

  return (
    <div onClick={handleClick}>
      <Notification notificationData={notificationData} />
    </div>
  )
}
