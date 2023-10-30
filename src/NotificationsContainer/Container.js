import React from 'react'
import styled from '@emotion/styled'
import NotificationsList from '../Notifications/NotificationsList'
import Header from './Header'
import { useTheme } from '../utils/context'
import { lightColors } from '../utils/styles'

export default function NotificationsContainer() {
  const { notificationsContainer } = useTheme()
  return (
    <Container style={notificationsContainer?.container}>
      <Header />
      <NotificationsList />
    </Container>
  )
}

const Container = styled.div`
  height: 400px;
  width: 400px;
  margin: 0px 15px;
  border-radius: 5px;
  background-color: ${lightColors.main};
  border: 1px solid ${lightColors.border};
  display: inline-block;
  overflow: scroll;
  box-shadow: 0 0px 7px 0 rgba(0, 0, 0, 0.2);
  @media (max-width: 425px) {
    width: 99.5vw;
    margin: 0px;
    border-radius: 0px;
  }
`
