import React from 'react'
import ClickableNotification from './ClickableNotification'

const notificationData = [
  {
    button: 'Click Here',
    header: 'Buy Back offer sale is on',
    image: '',
    text: 'This diwali buy any item above 500rs and get 2000rs cashback only on suprsend',
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
