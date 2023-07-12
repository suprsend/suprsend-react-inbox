import React from 'react'
import styled from '@emotion/styled'
import { HeadingText, lightColors } from '../utils/styles'
import { useTheme, useInbox } from '../utils/context'

export default function Header() {
  const { header } = useTheme()
  const { inbox, notificationsData } = useInbox()

  const isEmpty = notificationsData?.notifications.length <= 0
  return (
    <Container style={header?.container}>
      <HeaderText style={header?.headerText}>Notifications</HeaderText>
      {!isEmpty && (
        <AllReadButton
          style={header?.markAllReadText}
          onClick={(e) => {
            e.stopPropagation()
            inbox.feed.markAllRead()
          }}
        >
          Mark all read
        </AllReadButton>
      )}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  padding: 14px;
  z-index: 1000;
  background-color: ${lightColors.main};
  border-bottom: 1px solid ${lightColors.border};
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
`
const HeaderText = styled(HeadingText)`
  font-weight: 600;
  font-size: 16px;
`

const AllReadButton = styled(HeadingText)`
  color: ${lightColors.primary};
  font-size: 12px;
  cursor: pointer;
`
