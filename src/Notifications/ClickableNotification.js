import React from 'react'
import Notification from './Notification'

export default function ClickableNotification({ notificationData }) {
  return (
    <div
      onClick={(e) => {
        e.stopPropagation()
        console.log('notification me')
      }}
    >
      <Notification notificationData={notificationData} />
    </div>
  )
}
