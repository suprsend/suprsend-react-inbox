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

function InternalHeaderRightComponent({ isEmpty, header, inbox }) {
  if (isEmpty) return null
  return (
    <AllReadButton
      style={header?.markAllReadText}
      onClick={(e) => {
        e.stopPropagation()
        inbox.feed.markAllRead()
      }}
    >
      Mark all as read
    </AllReadButton>
  )
}

export default function Header() {
  const { header, tabs } = useTheme()
  const {
    inbox,
    notificationsData,
    activeStore,
    setActiveStore,
    setChangingActiveStore,
    showUnreadCountOnTabs,
    tabBadgeComponent,
    headerRightComponent,
    toggleInbox
  } = useInbox()

  const isEmpty = !hasNotifications(notificationsData?.storeData)
  const stores = inbox.feed.stores
  const hasStores = stores?.length > 0
  const TabBadgeComponent = tabBadgeComponent
  const HeaderRightComponent = headerRightComponent

  return (
    <Container style={header?.container}>
      <TopContainer hasStores={hasStores}>
        <HeaderText style={header?.headerText}>Notifications</HeaderText>
        {HeaderRightComponent ? (
          <HeaderRightComponent
            markAllRead={() => inbox.feed.markAllRead()}
            closeInboxPopup={() => {
              toggleInbox(false)
            }}
          />
        ) : (
          <InternalHeaderRightComponent
            isEmpty={isEmpty}
            header={header}
            inbox={inbox}
          />
        )}
      </TopContainer>
      {stores && stores.length > 0 && (
        <TabsContainer>
          {stores.map((store, index) => {
            const isActiveTab = activeStore === store.storeId
            const tabUnseenCount =
              notificationsData?.storeData?.[store.storeId]?.unseenCount || 0
            const showBadge = showUnreadCountOnTabs && tabUnseenCount > 0

            const selectedTabBottomColor = isActiveTab
              ? tabs?.bottomColor
              : 'none'
            const textColor = isActiveTab
              ? tabs?.color
              : tabs?.unselectedColor || tabs?.color

            return (
              <TabContainer
                style={{ borderBottomColor: selectedTabBottomColor }}
                key={index}
                selected={isActiveTab}
                onClick={() => {
                  setChangingActiveStore(true)
                  setActiveStore(store.storeId)
                  inbox.changeActiveStore(store.storeId)
                  setTimeout(() => {
                    setChangingActiveStore(false)
                  }, 0)
                }}
              >
                <TabText
                  selected={isActiveTab}
                  style={{
                    ...tabs,
                    color: textColor
                  }}
                >
                  {store.label}
                </TabText>
                {showBadge &&
                  (TabBadgeComponent ? (
                    <TabBadgeComponent count={tabUnseenCount} />
                  ) : (
                    <TabBadge
                      style={{
                        backgroundColor: tabs?.badgeColor,
                        color: tabs?.badgeText
                      }}
                    >
                      <TabBadgeText count={tabUnseenCount}>
                        {tabUnseenCount}
                      </TabBadgeText>
                    </TabBadge>
                  ))}
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
  padding: 16px;
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
  padding-bottom: ${(props) => (props.hasStores ? '0px' : '16px')};
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
  gap: 5px;
`

const TabText = styled(CText)`
  font-size: 14px;
  font-weight: 600;
  color: ${(props) => {
    return props.selected
      ? lightColors.primaryText
      : lightColors.secondaryText + 'D9'
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

const TabBadge = styled.div`
  height: 18px;
  width: 20px;
  border-radius: 50%;
  background-color: rgba(100, 116, 139, 0.09);
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${lightColors.primaryText};
`

const TabBadgeText = styled.p`
  margin: 0px;
  padding: 0px;
  font-size: ${(props) => {
    return props?.count > 99 ? '8px' : '10px'
  }};
  font-weight: 600;
  line-height: 1;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica,
    Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
`
