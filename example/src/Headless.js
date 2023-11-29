import React from 'react'
import {
  useNotifications,
  SuprSendProvider,
  useBell,
  useEvent
} from '@suprsend/react-inbox'

export default function Headless() {
  return (
    <SuprSendProvider
      workspaceKey={process.env.REACT_APP_WORKSPACE_KEY || ''}
      subscriberId={process.env.REACT_APP_SUBSCRIBER_ID || ''}
      distinctId={process.env.REACT_APP_DISTINCT_ID || ''}
    >
      <Notifications />
    </SuprSendProvider>
  )
}

function Notifications() {
  const { notifications, fetchPrevious, markClicked, markAllRead } =
    useNotifications()
  const { unSeenCount, markAllSeen } = useBell()

  useEvent('new_notification', (data) => {
    console.log('event data is===>', data)
  })

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <h3
          onClick={() => {
            markAllSeen()
            markAllRead()
          }}
          style={{ marginRight: 100 }}
        >
          Notifications {unSeenCount}
        </h3>
        <p onClick={fetchPrevious}>Fetch More</p>
      </div>
      {notifications.map((notification) => {
        return (
          <NotificationItem
            notification={notification}
            key={notification.n_id}
            markClicked={markClicked}
          />
        )
      })}
    </div>
  )
}

function NotificationItem({ notification, markClicked }) {
  return (
    <div
      style={{ display: 'flex' }}
      onClick={() => {
        markClicked(notification.n_id)
      }}
    >
      <p>{notification.n_id}</p>
      {!notification.seen_on && <p>*</p>}
    </div>
  )
}
