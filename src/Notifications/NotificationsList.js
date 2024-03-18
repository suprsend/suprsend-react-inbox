import React from 'react'
import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'
import ClickableNotification from './ClickableNotification'
import EmptyNotificationIcon from './Icons/EmptyNotificationIcon'
import { useInbox, useTheme } from '../utils/context'
import { CText, HeadingText, lightColors } from '../utils/styles'
import InfiniteScroll from 'react-infinite-scroll-component'

function Loader({ style, size }) {
  const color = style?.color
  return (
    <SpinnerContainer>
      <Spinner style={style} color={color} size={size} />
    </SpinnerContainer>
  )
}

export default function NotificationsList() {
  const {
    notificationsData: { storeData, hasNext, initialLoading, activeStoreId },
    noNotificationsComponent,
    loaderComponent,
    pagination,
    changingActiveStore,
    inbox
  } = useInbox()
  const { notificationsContainer } = useTheme()
  const notifications = storeData?.[activeStoreId]?.notifications || []

  if (initialLoading) {
    return (
      <InitialLoader>
        <Loader style={notificationsContainer?.loader} size='large' />
      </InitialLoader>
    )
  }

  if (notifications.length <= 0) {
    if (noNotificationsComponent) {
      const NoNotificationsComponent = noNotificationsComponent
      return <NoNotificationsComponent />
    }
    return (
      <EmptyNotificationsContainer>
        <EmptyNotificationIcon />
        <EmptyText style={notificationsContainer?.noNotificationsText}>
          No notifications yet
        </EmptyText>
        <EmptySubText style={notificationsContainer?.noNotificationsSubtext}>
          We'll let you know when we've got something new for you.
        </EmptySubText>
      </EmptyNotificationsContainer>
    )
  }

  if (changingActiveStore) {
    return null
  }
  return (
    <ScrollDiv>
      <InfiniteScroll
        scrollableTarget='ss-notification-container'
        dataLength={notifications.length}
        next={() => {
          inbox.feed.fetchNotifications()
        }}
        hasMore={pagination && hasNext}
        loader={
          loaderComponent?.() || (
            <Loader style={notificationsContainer?.loader} />
          )
        }
      >
        {notifications.map((notification) => (
          <ClickableNotification
            notificationData={notification}
            key={notification.n_id}
          />
        ))}
      </InfiniteScroll>
    </ScrollDiv>
  )
}

const ScrollDiv = styled.div`
  //  margin-bottom: 30px;
  // padding-bottom: 5px;
`

const EmptyNotificationsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 32px;
  margin-top: 40px;
`

const EmptyText = styled(HeadingText)`
  font-weight: 600;
  text-align: center;
  background-color: transparent;
  margin: 20px 0px;
  margin-bottom: 16px;
  color: ${lightColors.primaryText};
`

const EmptySubText = styled(CText)`
  color: ${lightColors.secondaryText};
  text-align: center;
`

const spin = keyframes`
0% {
  transform: rotate(0deg);
}
100% {
  transform: rotate(360deg);
}
`

const Spinner = styled.div`
  border: ${(props) =>
    props.size === 'large'
      ? `5px solid ${lightColors.border}`
      : `3px solid ${lightColors.border}`};
  border-top: ${(props) =>
    props.size === 'large' ? '5px solid' : '3px solid'};
  border-top-color: ${(props) =>
    props.color ? props.color : lightColors.primary};
  border-radius: 50%;
  width: ${(props) => (props.size === 'large' ? '20px' : '10px')};
  height: ${(props) => (props.size === 'large' ? '20px' : '10px')};
  animation: ${spin} 1s linear infinite;
  margin: 5px;
`

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const InitialLoader = styled.div`
  margin-top: 32px;
`
