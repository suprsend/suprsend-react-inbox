import React from 'react'
import SuprsendInbox from '@suprsend/react-inbox'

const App = () => {
  return (
    <div style={{ marginLeft: 50 }}>
      <SuprsendInbox
        workspaceKey='kfWdrPL1nFqs7OUihiBn'
        workspaceSecret=''
        distinctId='katta.sivaram@suprsend.co'
        containerStyle={{ display: 'none' }}
        toastProps={{
          stackMultipleNotifications: true,
          toastComponent: ({ notificationData, markClicked, dismissToast }) => (
            <h1
              onClick={async (e) => {
                await markClicked(e, notificationData)
                dismissToast()
              }}
            >
              Hello world
            </h1>
          )
        }}
      />
    </div>
  )
}

export default App
