import React from 'react'
import styled from '@emotion/styled'
import { CText, HeadingText, lightColors } from '../utils/styles'
import { useTheme, useInbox } from '../utils/context'

function hasNotifications(storeData) {
  let hasData = false
  for (const storeId in storeData) {
    const store = storeData[storeId]
    if (store?.notifications?.length > 0) {
      hasData = true
    }
  }
  return hasData
}

export default function Header() {
  const { header } = useTheme()
  const {
    inbox,
    notificationsData,
    activeStore,
    setActiveStore,
    setChangingActiveStore
  } = useInbox()

  const isEmpty = !hasNotifications(notificationsData?.storeData)
  const stores = inbox.feed.stores
  const hasStores = stores?.length > 0
  return (
    <Container style={header?.container}>
      <TopContainer hasStores={hasStores}>
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
      {stores && stores.length > 0 && (
        <TabsContainer>
          {stores.map((store, index) => {
            const tabUnseenCount =
              notificationsData?.storeData?.[store.storeId]?.unseenCount || 0
            return (
              <TabContainer
                key={index}
                selected={activeStore === store.storeId}
                onClick={() => {
                  setChangingActiveStore(true)
                  setActiveStore(store.storeId)
                  inbox.changeActiveStore(store.storeId)
                  setTimeout(() => {
                    setChangingActiveStore(false)
                  }, 0)
                }}
              >
                <TabText>{store.label}</TabText>
                {tabUnseenCount > 0 && (
                  <TabBadgeText>{tabUnseenCount}</TabBadgeText>
                )}
              </TabContainer>
            )
          })}
        </TabsContainer>
      )}
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
  margin-bottom: ${(props) => (props.hasStores ? '16px' : '0px')};
  padding-bottom: ${(props) => (props.hasStores ? '0px' : '10px')};
`

const TabsContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`

const TabContainer = styled.div`
  padding: 5px 15px 3px 15px;
  border-bottom: ${(props) => {
    return props.selected ? `2px solid ${lightColors.primary}` : 'none'
  }};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 3px;
`

const TabText = styled(CText)`
  font-size: 14px;
  font-weight: 600;
  color: ${(props) => {
    return props.selected ? lightColors.primaryText : lightColors.secondaryText
  }};
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

const TabBadgeText = styled.span`
  font-size: 10px;
  line-height: 1;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica,
    Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  padding: 3px 6px;
  border-radius: 50%;
  background-color: ${lightColors.primary};
  color: #fff;
  text-align: center;
`
