import React from 'react'
import Notification from './Notification'
import { useInbox } from '../utils/context'
import { formatActionLink } from '../utils'

export default function ClickableNotification({ notificationData }) {
  const { notificationClickHandler, inbox, openLinksInNewTab } = useInbox()

  function getURLTarget(localTarget) {
    let target

    if (localTarget === true) {
      target = '_blank'
    } else if (localTarget === false) {
      target = '_self'
    } else {
      if (openLinksInNewTab === true) {
        target = '_blank'
      } else {
        target = '_self'
      }
    }
    return target
  }

  const cardClickNavigation = () => {
    if (typeof notificationClickHandler === 'function') {
      notificationClickHandler(notificationData)
    } else {
      const message = notificationData?.message
      if (message?.url) {
        const actionUrlTarget = getURLTarget(message?.open_in_new_tab)
        window.open(
          formatActionLink(notificationData.message.url),
          actionUrlTarget
        )
      }
    }
  }

  const markNotificationClicked = () => {
    inbox.feed.markClicked(notificationData.n_id)
  }

  const handleCardClick = (e) => {
    e.stopPropagation()

    const clicked = notificationData.interacted_on

    markNotificationClicked()

    if (!clicked) {
      setTimeout(() => {
        cardClickNavigation()
      }, 1000)
    } else {
      cardClickNavigation()
    }
  }

  const handleActionClick = (e, clickData) => {
    e.stopPropagation()

    const clicked = notificationData.interacted_on

    markNotificationClicked()

    if (!clicked) {
      setTimeout(() => {
        if (clickData?.url) {
          const actionUrlTarget = getURLTarget(clickData?.localTarget)
          window.open(formatActionLink(clickData.url), actionUrlTarget)
        } else {
          cardClickNavigation()
        }
      }, 1000)
    } else {
      if (clickData?.url) {
        const actionUrlTarget = getURLTarget(clickData?.localTarget)
        window.open(formatActionLink(clickData.url), actionUrlTarget)
      } else {
        cardClickNavigation()
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
