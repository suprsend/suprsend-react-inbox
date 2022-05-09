import React from 'react'
import ClickableNotification from './ClickableNotification'

const notificationData = [
  {
    button: 'Click Here',
    header: 'Notification Header',
    image: '',
    text: 'This is notification body',
    url: ''
  },
  {
    button: 'Click Here',
    header: 'Notification Header',
    image: '',
    text: 'This is notification body',
    url: ''
  },
  {
    button: 'Click Here',
    header: 'Notification Header',
    image: '',
    text: 'This is notification body',
    url: ''
  },
  {
    button: 'Click Here',
    header: 'Notification Header',
    image: '',
    text: 'This is notification body',
    url: ''
  },
  {
    button: 'Click Here',
    header: 'Notification Header',
    image: '',
    text: 'This is notification body',
    url: ''
  },
  {
    button: 'Click Here',
    header: 'Notification Header',
    image: '',
    text: 'This is notification body',
    url: ''
  },
  {
    button: 'Click Here',
    header: 'Notification Header',
    image: '',
    text: 'This is notification body',
    url: ''
  },
  {
    button: 'Click Here',
    header: 'Notification Header',
    image: '',
    text: 'This is notification body',
    url: ''
  }
]

export default function NotificationsList() {
  return notificationData.map((notification, index) => (
    <ClickableNotification notificationData={notification} key={index} />
  ))
}
