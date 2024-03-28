import React from 'react'
import styled from '@emotion/styled'
import NotificationsList from '../Notifications/NotificationsList'
import Header from './Header'
// import Footer from './Footer'
import { useTheme } from '../utils/context'
import { lightColors } from '../utils/styles'

export default function NotificationsContainer() {
  const { notificationsContainer } = useTheme()
  return (
    <Container
      style={notificationsContainer?.container}
      id='ss-notification-container'
    >
      <Header />
      <NotificationsList />
      {/* <Footer /> */}
    </Container>
  )
}

const Container = styled.div`
  height: 500px;
  width: 450px;
  margin: 0px 15px;
  border-radius: 5px;
  background-color: ${lightColors.main};
  border: 1px solid ${lightColors.border};
  display: inline-block;
  overflow: scroll;
  box-shadow: 0 0px 7px 0 rgba(0, 0, 0, 0.1);
  @media (max-width: 425px) {
    width: 99.5vw;
    margin: 0px;
    border-radius: 0px;
  }
`
