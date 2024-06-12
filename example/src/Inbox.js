import React from 'react'
import SuprsendInbox from '@suprsend/react-inbox'
import 'react-toastify/dist/ReactToastify.css'

function Buttons({ themeType, setThemeType, setDid, setSid }) {
  return (
    <div style={{ display: 'flex', gap: 10 }}>
      <button
        onClick={() => {
          const theme = themeType === 'light' ? 'dark' : 'light'
          setThemeType(theme)
        }}
      >
        Change Theme
      </button>
      <button
        onClick={() => {
          setSid('')
          setDid('')
        }}
      >
        Remove Person
      </button>
      <button
        onClick={() => {
          setDid(process.env.REACT_APP_DISTINCT_ID)
          setSid(process.env.REACT_APP_SUBSCRIBER_ID)
        }}
      >
        Set Person 1
      </button>
      <button
        onClick={() => {
          setDid(process.env.REACT_APP_DISTINCT_ID1)
          setSid(process.env.REACT_APP_SUBSCRIBER_ID1)
        }}
      >
        Set Person 2
      </button>
    </div>
  )
}

const App = () => {
  const [themeType, setThemeType] = React.useState('light')
  const [dId, setDid] = React.useState(process.env.REACT_APP_DISTINCT_ID)
  const [sId, setSid] = React.useState(process.env.REACT_APP_SUBSCRIBER_ID)

  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        paddingLeft: 50,
        backgroundColor: themeType === 'light' ? 'white' : 'black'
      }}
    >
      <Buttons
        themeType={themeType}
        setThemeType={setThemeType}
        setDid={setDid}
        setSid={setSid}
      />
      <SuprsendInbox
        workspaceKey={process.env.REACT_APP_WORKSPACE_KEY}
        subscriberId={sId}
        distinctId={dId}
        // stores={[
        //   {
        //     storeId: 'test',
        //     label: 'Testing'
        //   },
        //   {
        //     storeId: 'test1',
        //     label: 'Test2'
        //   }
        // ]}
        // tabBadgeComponent={({ count }) => {
        //   return <p>{count}</p>
        // }}
        // tenantId='test'
        themeType={themeType}
        // hideAvatar={true}
        // hideInbox={false}
        // hideToast={false}
        // showUnreadCountOnTabs={true}
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

        // theme={{
        //   tabs: {
        //     color: 'red',
        //     unselectedColor: 'red',
        //     bottomColor: 'pink',
        //     badgeColor: 'yellow',
        //     badgeText: 'red'
        //   },
        //   bell: { color: 'blue' },
        //   badge: { backgroundColor: 'pink', color: 'black' },
        //   notificationsContainer: {
        //     container: { borderColor: 'red', backgroundColor: 'red' },
        //     noNotificationsText: { color: 'blue' },
        //     noNotificationsSubtext: { color: 'blue' }
        //   },
        //   header: { container: { backgroundColor: 'gray' }, headertext: {} },
        //   notification: {
        //     pinnedIcon: { color: 'red' },
        //     pinnedText: { color: 'yellow' },
        //     container: { backgroundColor: 'gray' },
        //     headerText: { color: 'red' },
        //     bodyText: { color: 'blue' },
        //     unseenDot: { backgroundColor: 'red' },
        //     expiresText: {
        //       backgroundColor: 'pink',
        //       color: 'yellow',
        //       expiringBackgroundColor: 'yellow',
        //       expiringColor: 'blue'
        //     }
        //   },
        //   toast: {
        //     container: { backgroundColor: 'red' },
        //     headerText: { color: 'white' },
        //     bodyText: { color: 'white' }
        //   }
        // }}
      />
    </div>
  )
}

export default App
