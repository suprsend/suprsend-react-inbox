import React, { useContext } from 'react'
import { InboxContext } from '../index'
import ClickableNotification from './ClickableNotification'

export default function NotificationsList() {
  const { notifications } = useContext(InboxContext)

  return notifications.map((notification, index) => (
    <ClickableNotification notificationData={notification} key={index} />
  ))
}
