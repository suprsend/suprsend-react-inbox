import React from 'react'
import { useInbox } from '../utils/context'
import ClickableNotification from './ClickableNotification'
import { HelperText } from '../utils/styles'
import styled from '@emotion/styled'

export default function NotificationsList({
  emptyComponent,
  emptyTextStyle = {}
}) {
  const {
    notificationsData: { notifications }
  } = useInbox()

  if (notifications.length <= 0) {
    if (emptyComponent) {
      const EmptyComponent = emptyComponent
      return <EmptyComponent />
    }
    return <EmptyText style={emptyTextStyle}>No Notifications</EmptyText>
  }
  return notifications.map((notification, index) => (
    <ClickableNotification notificationData={notification} key={index} />
  ))
}

const EmptyText = styled(HelperText)`
  text-align: center;
  font-style: italic;
  margin: 20px 0px;
  background-color: transparent;
`
