import React from 'react'
import Notification from './Notification'
import { useInbox } from '../utils/context'
import { formatActionLink } from '../utils'

export default function ClickableNotification({ notificationData }) {
  const { notificationClickHandler, inbox, openLinksInNewTab } = useInbox()

  const urlTarget = openLinksInNewTab ? '_blank' : '_self'

  const navigateUser = () => {
    if (typeof notificationClickHandler === 'function') {
      notificationClickHandler(notificationData)
    } else {
      if (notificationData?.message?.url) {
        window.open(formatActionLink(notificationData.message.url), urlTarget)
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
    const actionUrl = notificationData.message.url
    markNotificationClicked()
    if (!clicked && link) {
      setTimeout(() => {
        if (actionUrl) {
          window.open(formatActionLink(actionUrl), urlTarget)
        }
      }, 1000)
    } else {
      if (actionUrl) {
        window.open(formatActionLink(actionUrl), urlTarget)
      }
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
