import React from 'react'
import Notification from './Notification'
import { markClicked } from '../utils/api'
import { useInbox } from '../utils/context'
import { formatActionLink } from '../utils'

export default function ClickableNotification({ notificationData }) {
  const { workspaceKey, setNotificationsData, notificationClickHandler } =
    useInbox()

  const navigateUser = () => {
    // redirect after mark seen logic
    if (typeof notificationClickHandler === 'function') {
      notificationClickHandler(notificationData)
    } else {
      if (notificationData?.message?.url) {
        window.location.href = formatActionLink(notificationData.message.url)
      }
    }
  }

  const markNotificationClicked = () => {
    if (notificationData.seen_on) {
      navigateUser()
    } else {
      markClicked(workspaceKey, notificationData.n_id)
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
    }
  }

  const handleClick = async (e) => {
    e.stopPropagation()
    await markNotificationClicked()
    navigateUser()
  }

  return (
    <div onClick={handleClick}>
      <Notification
        notificationData={notificationData}
        markClicked={markNotificationClicked}
      />
    </div>
  )
}
