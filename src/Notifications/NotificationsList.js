import React, { useContext } from 'react'
import { css } from '@emotion/react'
import { InboxContext } from '../utils'
import ClickableNotification from './ClickableNotification'
import { HelperText } from '../utils/styles'
import styled from '@emotion/styled'

export default function NotificationsList({
  emptyComponent,
  emptyTextStyle = {}
}) {
  const {
    notificationsData: { notifications }
  } = useContext(InboxContext)

  if (notifications.length <= 0) {
    if (emptyComponent) {
      const EmptyComponent = emptyComponent
      return <EmptyComponent />
    }
    return (
      <EmptyText
        css={css`
          ${emptyTextStyle}
        `}
      >
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
