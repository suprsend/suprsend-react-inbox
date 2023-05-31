import React from 'react'
import Notification from './Notification'
import { useInbox } from '../utils/context'
import { formatActionLink } from '../utils'

export default function ClickableNotification({ notificationData }) {
  const { notificationClickHandler, inbox } = useInbox()

  const navigateUser = () => {
    if (typeof notificationClickHandler === 'function') {
      notificationClickHandler(notificationData)
    } else {
      if (notificationData?.message?.url) {
        window.location.href = formatActionLink(notificationData.message.url)
      }
    }
  }

  const markNotificationClicked = () => {
    inbox.feed.markClicked(notificationData.n_id)
  }

  const handleClick = (e) => {
    e.stopPropagation()
    markNotificationClicked()
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
