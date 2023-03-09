import React from 'react'
import SuprsendInbox from '@suprsend/react-inbox'

const App = () => {
  const [themeType, setThemeType] = React.useState('light')

  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        paddingLeft: 50,
        backgroundColor: themeType === 'light' ? 'white' : 'black'
      }}
    >
      <SuprsendInbox
        workspaceKey={process.env.REACT_APP_WORKSPACE_KEY}
        workspaceSecret={process.env.REACT_APP_WORKSPACE_SECRET}
        subscriberId={process.env.REACT_APP_SUBSCRIBER_ID}
        distinctId={process.env.REACT_APP_DISTINCT_ID}
        themeType={themeType}
        // hideInbox={false}
        // hideToast={false}
        // collapseToastNotifications={true}
        // bellComponent={() => <p>Hello world</p>}
        // badgeComponent={({ count }) => <p>{count}</p>}
        // notificationComponent={({ notificationData }) => (
        //   <p>{JSON.stringify(notificationData)}</p>
        // )}
        // notificationClickHandler={(notificationData) => {
        //   console.log('notification clicked', notificationData)
        // }}
        // noNotificationsComponent={() => <p>No Notifications Yet</p>}
        // toastProps={{
        //   toastOptions: { duration: 10000 },
        //   position: 'top-center',
        //   toastComponent: ({ notificationData }) => {
        //     return <p>I am notification</p>
        //   }
        // }}

        theme={
          {
            // bell: { color: 'blue' }
            // badge: { backgroundColor: 'pink', color: 'black' }
            // notificationsContainer: {
            //   container: { height: 300 },
            //   noNotificationsText: { color: 'blue' },
            //   noNotificationsSubtext: { color: 'blue' }
            // }
            // header: { container: { backgroundColor: 'gray' }, headertext: {} }
            // notification: {
            //   container: { backgroundColor: 'gray' },
            //   headerText: { color: 'red' },
            //   bodyText: { color: 'blue' },
            //   unseenDot: { backgroundColor: 'red' }
            // },
            // toast: {
            //   container: { backgroundColor: 'red' },
            //   headerText: { color: 'white' },
            //   bodyText: { color: 'white' }
            // },
            // collapseToastNotification: { backgroundColor: 'red' }
          }
        }
      />
      <div>
        <button
          onClick={() => {
            if (themeType === 'light') {
              setThemeType('dark')
            } else {
              setThemeType('light')
            }
          }}
        >
          Toggle Theme
        </button>
      </div>
    </div>
  )
}

export default App
