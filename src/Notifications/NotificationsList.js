import React, { useContext } from 'react'
import { InboxContext } from '../utils'
import ClickableNotification from './ClickableNotification'
import { HelperText } from '../utils/styles'
import styled from '@emotion/styled'

export default function NotificationsList() {
  const {
    notificationsData: { notifications }
  } = useContext(InboxContext)

  if (notifications.length <= 0) {
    return <EmptyText>No Notifications</EmptyText>
  }
  return notifications.map((notification, index) => (
    <ClickableNotification notificationData={notification} key={index} />
  ))
}

const EmptyText = styled(HelperText)`
  text-align: center;
  font-style: italic;
  margin: 20px 0px;
  background-color: #fff;
`
