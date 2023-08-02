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

  const handleCardClick = (e) => {
    const clicked = notificationData.interacted_on
    e.stopPropagation()
    markNotificationClicked()
    if (!clicked) {
      setTimeout(() => {
        navigateUser()
      }, 1000)
    } else {
      navigateUser()
    }
  }

  const handleActionClick = (e, link) => {
    e.stopPropagation()
    const clicked = notificationData.interacted_on
    markNotificationClicked()
    if (!clicked && link) {
      setTimeout(() => {
        window.location.href = formatActionLink(notificationData.message.url)
      }, 1000)
    } else {
      window.location.href = formatActionLink(notificationData.message.url)
    }
  }

  return (
    <div onClick={handleCardClick}>
      <Notification
        notificationData={notificationData}
        handleActionClick={handleActionClick}
      />
    </div>
  )
}
