import React from 'react'
import styled from '@emotion/styled'
import { CText } from '../utils/styles'

export function ToastNotification({ notificationData, markClicked }) {
  const { message } = notificationData
  return (
    <Container
      onClick={(e) => {
        markClicked(e, notificationData)
      }}
    >
      <HeaderText>{message.header}</HeaderText>
      <BodyText>{message.text}</BodyText>
    </Container>
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
