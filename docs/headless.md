# Build your own UI (Headless)

This Headless Inbox can be used if you want more control on the UI of Inbox Notifications like showing notifications in Sidepanel or in Fullscreen etc.

# Installation

```shell npm
npm install @suprsend/react-inbox
```

```shell yarn
yarn add @suprsend/react-inbox
```

<br />

# Adding SuprSend Inbox component

## SuprSendProvider Component

Enclose your notifications component in **SuprSendProvider**. SuprSend hooks can only be used in children of SuprSendProvider component.

```javascript Syntax
import { SuprSendProvider } from '@suprsend/react-inbox'
;<SuprSendProvider
  workspaceKey='<workspace_key>'
  subscriberId='<subscriber_id>'
  distinctId='<distinct_id>'
>
  <YourCode />
</SuprSendProvider>
```

| Props        | Type                 | Description                                                                                                                                                                                          |
| :----------- | :------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| workspaceKey | string (Mandatory)   | You can find it in SuprSend Dashboard inside _Settings -> API Keys_.                                                                                                                                 |
| distinctId   | string (Mandatory)   | Unique identifier for the user.                                                                                                                                                                      |
| subscriberId | string (Mandatory)   | This is unique string for every distinctId used for authentication to inbox service. You check [generation docs](https://github.com/suprsend/suprsend-react-inbox/blob/main/docs/authentication.md). |
| tenantId     | string (Optional)    | If you use multi-tenant architecture you can get inbox notifications for that specific tenant/brand only.                                                                                            |
| pageSize     | number (Optional)    | Notifications to get in one api call. Used for pagination to get older notifications. Maximum allowed is 50. Defaults to 20.                                                                         |
| stores       | IStore\[] (Optional) | Pass stores array if you want to use [multi-tab feature](https://github.com/suprsend/suprsend-react-inbox/blob/main/docs/multi-tab.md).                                                              |

> 🚧 SuprSend uses socket.io to get realtime updates in inbox channel.
>
> Make sure that you have only one active SuprSend's socket connection at a time (inspect -> network -> ws tab) to avoid unexpected issues.

<br />

## useUnseenCount hook

This hook provides unSeenCount, markAllSeen which you can show on Bell icon.

```javascript Syntax
import { useUnseenCount } from '@suprsend/react-inbox'

const { unSeenCount, markAllSeen } = useUnseenCount()
```

| Returns     | Type   | Description                                                                                                                     |
| :---------- | :----- | :------------------------------------------------------------------------------------------------------------------------------ |
| unSeenCount | number | Use this variable to show the unseen notification count anywhere in your application.                                           |
| markAllSeen | method | Used to mark seen for all notifications. Call this method on clicking the bell icon so that it will reset the unSeenCount to 0. |

<br />

## useNotifications hook

This hook is used to get notifications related data and methods

```javascript Syntax
import { useNotifications } from '@suprsend/react-inbox'

const {
  notifications,
  markClicked,
  markAllRead,
  initialLoading,
  hasNext,
  fetchPrevious,
  fetchMoreLoading
} = useNotifications(storeId)
```

| Parameter | Type              | Description                                                                                                                                                 |
| :-------- | :---------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| storeId   | string (Optional) | Optional parameter which return data of that specific store if you are using multi-tab feature. You can ignore this if you are not using multi-tab feature. |

| Returns          | Type                   | Description                                                                                                           |
| :--------------- | :--------------------- | :-------------------------------------------------------------------------------------------------------------------- |
| notifications    | IRemoteNotification\[] | Contains information related to notifications. This array can be looped to display notifications.                     |
| markClicked      | (id: string) => void   | used to mark notification as clicked.                                                                                 |
| markRead         | (id: string) => void   | used to mark notification as read.                                                                                    |
| markUnRead       | (id: string) => void   | used to mark notification as unread.                                                                                  |
| markArchived     | (id: string) => void   | used to mark notification as archived                                                                                 |
| markAllRead      | ( ) => void            | Method used to mark all notifications as read.                                                                        |
| initialLoading   | boolean                | used for showing initial loader while fetching notifications first time                                               |
| hasNext          | boolean                | check if older notifications are present and then call _fetchPrevious_ method if its true to get older notifications. |
| fetchPrevious    | ( ) => void            | used to get older notifications if you implement pagination, by checking _hasNext_ flag                               |
| fetchMoreLoading | boolean                | used to show loader while getting fetch older notifications.                                                          |

```javascript IRemoteNotification
interface IRemoteNotification {
  n_id: string
  n_category: string
  created_on: number
  seen_on?: number
  interacted_on?: number
  tags?: string[]
  is_pinned?: boolean
  can_user_unpin?: boolean
  is_expiry_visible?: boolean
  expiry?: number
  archived?: boolean
  message: IRemoteNotificationMessage
}

interface IRemoteNotificationMessage {
  header?: string
  schema: string
  text: string
  url?: string
  open_in_new_tab?: boolean
  extra_data?: string
  actions?: { url: string, name: string, open_in_new_tab?: boolean}[]
  avatar?: { avatar_url: string; action_url?: string }
  subtext?: { text: string; action_url?: string }
}
```

<br />

### useStoreUnseenCount hook

This hook can be used to get unread notifications count of a specific store, Use it only if you are using multi-tab.

```javascript Syntax
import { useStoreUnseenCount } from '@suprsend/react-inbox'

const { unSeenCount } = useUnseenCount()
```

<br />

### useStoresUnseenCount hook

This hook can be used to get unread notifications count of all stores, Use it only if you are using multi-tab.

```javascript Syntax
import { useStoresUnseenCount } from "@suprsend/react-inbox";

const { [storeId: string]: number } = useUnseenCount();
```

<br />

### useEvent hook

This hook is an event emitter, takes arguments event type and callback function(called when event occurs). Must be called anywhere inside SuprSendProvider.

```javascript Syntax
import { useEvent } from "@suprsend/react-inbox";

useEvent(event_name: string, (notification: IRemoteNotification)=> void)
```

**Handled Event Names:**

1. **new_notification**: Called when the new notification occurs, can be used to show toast notification in your application.

```javascript Sample.js
import { useEvent } from '@suprsend/react-inbox'

function Home() {
  useEvent('new_notification', (notificationData) => {
    alert('You have new notifications')
  })

  return <p>Home</p>
}
```
