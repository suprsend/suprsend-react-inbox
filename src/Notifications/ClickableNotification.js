import React from 'react'
import Notification from './Notification'
import { markClicked } from '../utils/api'
import { useInbox } from '../utils/context'
import { formatActionLink } from '../utils'

export default function ClickableNotification({ notificationData }) {
  const {
    workspaceKey,
    setNotificationsData,
    notificationClickHandler,
    openLinksInNewTab
  } = useInbox()

  const urlTarget = openLinksInNewTab ? '_blank' : '_self'

  const navigateUser = () => {
    // redirect after mark seen logic
    if (typeof notificationClickHandler === 'function') {
      notificationClickHandler(notificationData)
    } else {
      if (notificationData?.message?.url) {
        window.open(formatActionLink(notificationData.message.url), urlTarget)
      }
    }
  }

  const markNotificationClickedWithNav = () => {
    if (!notificationData.interacted_on) {
      markClicked(workspaceKey, notificationData.n_id)
        .then((res) => {
          if (res.status === 202) {
            setNotificationsData((prev) => {
              for (const notificationItem of prev.notifications) {
                if (notificationItem.n_id === notificationData.n_id) {
                  notificationItem.seen_on = Date.now()
                  notificationItem.interacted_on = Date.now()
                }
              }
              return { ...prev }
            })
            navigateUser()
          }
        })
        .catch((err) => {
          console.log('MARK SEEN ERROR ', err)
          navigateUser()
        })
    } else {
      navigateUser()
    }
  }

  const markNotificationClicked = (link) => {
    if (!notificationData.interacted_on) {
      markClicked(workspaceKey, notificationData.n_id)
        .then((res) => {
          if (res.status === 202) {
            setNotificationsData((prev) => {
              for (const notificationItem of prev.notifications) {
                if (notificationItem.n_id === notificationData.n_id) {
                  notificationItem.seen_on = Date.now()
                  notificationItem.interacted_on = Date.now()
                }
              }
              return { ...prev }
            })
            if (link) {
              window.open(formatActionLink(link), urlTarget)
            }
          }
        })
        .catch((err) => {
          console.log('MARK SEEN ERROR ', err)
          if (link) {
            window.open(formatActionLink(link), urlTarget)
          }
        })
    } else {
      if (link) {
        window.open(formatActionLink(link), urlTarget)
      }
    }
  }

  const handleClick = async (e) => {
    e.stopPropagation()
    markNotificationClickedWithNav()
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
