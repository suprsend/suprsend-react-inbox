import React from 'react'
import SuprsendInbox from '@suprsend/react-inbox'

const App = () => {
  return (
    <div style={{ marginLeft: 50 }}>
      <SuprsendInbox
        workspaceKey={process.env.REACT_APP_WORKSPACE_KEY}
        workspaceSecret={process.env.REACT_APP_WORKSPACE_SECRET}
        subscriberId={process.env.REACT_APP_SUBSCRIBER_ID}
        distinctId={process.env.REACT_APP_DISTINCT_ID}
      />
    </div>
  )
}

export default App
