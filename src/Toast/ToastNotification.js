import React from 'react'
import styled from '@emotion/styled'
import { CText } from '../utils/styles'
import { useTheme, useInbox } from '../utils/context'

export function ToastNotification({ notificationData, markClicked }) {
  const { toast } = useTheme()
  const { message } = notificationData
  return (
    <Container
      style={toast?.container}
      onClick={(e) => {
        markClicked(e, notificationData)
      }}
    >
      <HeaderText style={toast?.headerText}>{message.header}</HeaderText>
      <BodyText style={toast?.bodyText}>{message.text}</BodyText>
    </Container>
  )
}

export function MultipleNotifications({ notificationsCount, dismissToast }) {
  const { collapseToastNotification } = useTheme()
  const { toggleInbox } = useInbox()
  return (
    <CollapseNotification
      style={collapseToastNotification}
      onClick={() => {
        toggleInbox(true)
        dismissToast()
      }}
    >
      You have {notificationsCount} new notifications
    </CollapseNotification>
  )
}

const Container = styled.div`
  max-width: 450px;
  min-width: 300px;
  background-color: #fff;
  cursor: pointer;
  padding: 7px 14px;
  border: 1px solid #f0f0f0;
  border-radius: 5px;
  box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.2), 0 2px 1px 0 rgba(0, 0, 0, 0.1);
`

const HeaderText = styled(CText)`
  font-size: 16px;
  margin: 10px 0px;
`

const BodyText = styled(CText)`
  font-size: 14px;
  margin: 10px 0px;
`

const CollapseNotification = styled(CText)`
  max-width: 450px;
  min-width: 300px;
  background-color: #fff;
  cursor: pointer;
  padding: 10px 14px;
  border: 1px solid #f0f0f0;
  border-radius: 5px;
  box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.2), 0 2px 1px 0 rgba(0, 0, 0, 0.1);
`
