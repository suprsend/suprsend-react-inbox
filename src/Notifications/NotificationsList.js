import React from 'react'
import { useInbox, useTheme } from '../utils/context'
import ClickableNotification from './ClickableNotification'
import { HelperText } from '../utils/styles'
import styled from '@emotion/styled'

export default function NotificationsList() {
  const {
    notificationsData: { notifications },
    noNotificationsComponent
  } = useInbox()
  const { notificationsContainer } = useTheme()

  if (notifications.length <= 0) {
    if (noNotificationsComponent) {
      const NoNotificationsComponent = noNotificationsComponent
      return <NoNotificationsComponent />
    }
    return (
      <EmptyText style={notificationsContainer?.noNotificationsText}>
        No Notifications
      </EmptyText>
    )
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
