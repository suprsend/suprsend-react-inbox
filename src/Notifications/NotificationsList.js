import React from 'react'
import styled from '@emotion/styled'
import ClickableNotification from './ClickableNotification'
import EmptyNotificationIcon from './EmptyNotificationIcon'
import { useInbox, useTheme } from '../utils/context'
import { CText, HeadingText, lightColors } from '../utils/styles'

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
      <EmptyNotificationsContainer>
        <EmptyNotificationIcon />
        <EmptyText style={notificationsContainer?.noNotificationsText}>
          No notifications yet
        </EmptyText>
        <EmptySubText style={notificationsContainer?.noNotificationsSubtext}>
          We'll let you know when we've got something new for you.
        </EmptySubText>
      </EmptyNotificationsContainer>
    )
  }

  return notifications.map((notification, index) => (
    <ClickableNotification notificationData={notification} key={index} />
  ))
}

const EmptyNotificationsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 32px;
  margin-top: 40px;
`

const EmptyText = styled(HeadingText)`
  font-weight: 600;
  text-align: center;
  background-color: transparent;
  margin: 20px 0px;
  margin-bottom: 16px;
  color: ${lightColors.primaryText};
`

const EmptySubText = styled(CText)`
  color: ${lightColors.secondaryText};
  text-align: center;
`
