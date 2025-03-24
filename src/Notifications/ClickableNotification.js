import React from 'react'
import Notification from './Notification'
import { useInbox } from '../utils/context'
import { formatActionLink } from '../utils'

function getURLTarget(target) {
  return target ? '_blank' : '_self'
}

export default function ClickableNotification({
  notificationData,
  notificationList
}) {
  const { notificationClickHandler, inbox } = useInbox()

  const cardClickNavigation = () => {
    if (typeof notificationClickHandler === 'function') {
      notificationClickHandler(notificationData)
    } else {
      const message = notificationData?.message
      if (message?.url) {
        const actionUrlTarget = getURLTarget(message?.open_in_new_tab)
        window.open(formatActionLink(message.url), actionUrlTarget)
      }
    }
  }

  const markNotificationClicked = () => {
    inbox.feed.markClicked(notificationData.n_id)
  }

  const handleCardClick = (e) => {
    e.stopPropagation()

    const clicked = notificationData.interacted_on
    const actionUrlTarget = getURLTarget(
      notificationData?.message?.open_in_new_tab
    )

    markNotificationClicked()

    if (!clicked && actionUrlTarget === '_self') {
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
    const actionUrlTarget = getURLTarget(clickData?.target)

    markNotificationClicked()

    if (!clicked && actionUrlTarget === '_self') {
      setTimeout(() => {
        if (clickData.customClickHandler) {
          clickData.customClickHandler(notificationData)
        } else if (clickData?.url) {
          window.open(formatActionLink(clickData.url), actionUrlTarget)
        } else {
          cardClickNavigation()
        }
      }, 1000)
    } else {
      if (clickData.customClickHandler) {
        clickData.customClickHandler(notificationData)
      } else if (clickData?.url) {
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
        notificationList={notificationList}
      />
    </div>
  )
}
