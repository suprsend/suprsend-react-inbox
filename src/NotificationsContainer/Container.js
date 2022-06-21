import React from 'react'
import styled from '@emotion/styled'
import NotificationsList from '../Notifications/NotificationsList'
import Header from './Header'
import { useTheme } from '../utils/context'

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
  min-height: 100px;
  max-height: 400px;
  width: 350px;
  margin: 0px 15px;
  border-radius: 5px;
  background-color: #fff;
  border: 1px solid #f0f0f0;
  display: inline-block;
  overflow: scroll;
  box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  @media (max-width: 425px) {
    width: 99.5vw;
    margin: 0px;
    border-radius: 0px;
  }
`
