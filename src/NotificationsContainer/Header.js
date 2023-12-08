import React from 'react'
import styled from '@emotion/styled'
import { CText, HeadingText, lightColors } from '../utils/styles'
import { useTheme, useInbox } from '../utils/context'

const tabs = [
  { label: 'All', id: 'default' },
  { label: 'Marketing', id: 'marketing' },
  { label: 'Marketing1', id: 'marketing1' },
  { label: 'Marketing2', id: 'marketing2' },
  { label: 'Marketing3', id: 'marketing3' }
]

export default function Header() {
  const { header } = useTheme()
  const { inbox, notificationsData } = useInbox()
  const [selectedTab, setSelectedtab] = React.useState(tabs[0].id)

  const isEmpty = notificationsData?.notifications.length <= 0
  return (
    <Container style={header?.container}>
      <TopContainer>
        <HeaderText style={header?.headerText}>Notifications</HeaderText>
        {!isEmpty && (
          <AllReadButton
            style={header?.markAllReadText}
            onClick={(e) => {
              e.stopPropagation()
              inbox.feed.markAllRead()
            }}
          >
            Mark all as read
          </AllReadButton>
        )}
      </TopContainer>
      <TabsContainer>
        {tabs.map((item) => {
          return (
            <TabText
              selected={selectedTab === item.id}
              key={item.id}
              onClick={() => {
                setSelectedtab(item.id)
              }}
            >
              {item.label}
            </TabText>
          )
        })}
      </TabsContainer>
    </Container>
  )
}

const Container = styled.div`
  position: sticky;
  top: 0;
  padding: 14px;
  padding-bottom: 0px;
  z-index: 1000;
  background-color: ${lightColors.main};
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.1);
`

const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`

const TabsContainer = styled.div`
  display: flex;
  overflow: scroll;
`

const TabText = styled(CText)`
  font-size: 14px;
  font-weight: 600;
  color: ${(props) => {
    return props.selected ? lightColors.primaryText : lightColors.secondaryText
  }};
  padding: 5px 15px 3px 15px;
  border-bottom: ${(props) => {
    return props.selected ? `2px solid ${lightColors.primary}` : 'none'
  }};
  cursor: pointer;
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
