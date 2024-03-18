# @suprsend/react-inbox

Integrating SuprSend Inbox channel in React websites can be done in two ways:

- **SuprSendInbox** component which comes with UI and customizing props.
- **SuprSendProvider** headless component and hooks, incase you want to totally take control of UI. (example: Full page notifications).

Detailed documentaion can be found here: https://docs.suprsend.com/docs/inbox-react
<br>

## Installation

You can install SuprSend inbox SDK using npm/yarn

```javascript npm
npm install @suprsend/react-inbox
```

## SuprSendInbox Integration

After installing, Import the component in your code and use it as given below. Replace the variables with actual values.

```javascript index.js
import SuprSendInbox from '@suprsend/react-inbox'

// add to your react component;
;<SuprSendInbox
  workspaceKey='<workspace_key>'
  subscriberId='<subscriber_id>'
  distinctId='<distinct_id>'
/>
```

```javascript ISuprSendInbox
interface ISuprSendInbox {
  workspaceKey: string
  distinctId: string | null
  subscriberId: string | null
  tenantId?: string
  stores?: IStore[]
  pageSize?: number
  pagination?: boolean
  ...
}
```

<br>

| Field        | Type                 | Description                                                                                                                                                           |
| :----------- | :------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| workspaceKey | string (Mandatory)   | You can find it in SuprSend Dashboard inside _Settings -> API Keys_.                                                                                                  |
| distinctId   | any (Mandatory)      | Unique identifier for the user.                                                                                                                                       |
| subscriberId | string (Mandatory)   | This is unique string for every distinctId used for authentication to inbox service. You check [generation docs](https://docs.suprsend.com/docs/hmac-authentication). |
| tenantId     | string (Optional)    | If you use multi-tenant architecture you can get inbox notifications for that specific tenant/brand only.                                                             |
| stores       | IStore\[] (Optional) | Pass stores array if you ant to use [multi-tab feature](https://docs.suprsend.com/docs/multi-tabs).                                                                   |
| pageSize     | number (Optional)    | Notifications to get in one api call. Used for pagination to get older notifications. Maximum allowed is 50. Defaults to 20.                                          |
| pagination   | boolean (Optional)   | By default infinite scroll will be enabled to get older notifications on scroll. It can be disabled by passing false.                                                 |

<br>
Apart from props provided above, SuprSendInbox also takes other props for customization.

```javascript ISuprSendInbox
interface ISuprSendInbox {
  ....
  themeType?: 'light' | 'dark'
  hideInbox?: boolean
  hideToast?: boolean
  hideAvatar?: boolean
  noNotificationsComponent?: () => JSX.Element
  notificationComponent?: ({notificationData}: {notificationData: any}) => JSX.Element
  bellComponent?: () => JSX.Element
  badgeComponent?: ({ count }: { count: number | null }) => JSX.Element
  loaderComponent?: () => JSX.Element
  tabBadgeComponent?: ({ count }: { count: number }) => JSX.Element
  notificationClickHandler?: (notificationData: any) => void
  toastProps?: IToastProps
  theme?: Dictionary
  popperPosition?: 'top' | 'bottom' | 'left' | 'right'
}
```

```typescript ThemeExample
// Example theme object

const darkColors = {
  primary: '#066AF3',
  primaryText: '#EFEFEF',
  secondaryText: '#B8B8B8',
  border: '#434343',
  main: '#202020',
  error: '#F97066'
}

const sampleDarkTheme = {
  bell: { color: '#fff' },
  badge: { backgroundColor: darkColors.primary },
  header: {
    container: {
      backgroundColor: darkColors.main,
      borderBottom: `0.5px solid ${darkColors.border}`,
      boxShadow: '0 0 5px 0 rgba(0, 0, 0, 0.5)'
    },
    headerText: { color: darkColors.primaryText },
    markAllReadText: { color: '#3B8EFF' }
  },
  tabs: {
    color: darkColors.primaryText,
    unselectedColor: darkColors.secondaryText,
    bottomColor: darkColors.primary,
    badgeColor: darkColors.primary,
    badgeText: darkColors.primaryText
  },
  notificationsContainer: {
    container: {
      backgroundColor: darkColors.main,
      borderColor: darkColors.border
    },
    noNotificationsText: {
      color: darkColors.primaryText
    },
    noNotificationsSubtext: {
      color: darkColors.secondaryText
    },
    loader: { color: darkColors.primary }
  },
  notification: {
    container: {
      borderBottom: `1px solid ${darkColors.border}`,
      unreadBackgroundColor: '#292929',
      unreadHoverBackgroundColor: '#3E3E3E',
      readBackgroundColor: darkColors.main,
      readHoverBackgroundColor: '#121212'
    },
    pinnedText: {
      color: darkColors?.secondaryText
    },
    headerText: { color: darkColors.primaryText },
    bodyText: {
      color: darkColors.primaryText,
      blockquoteColor: darkColors.border
    },
    unseenDot: { backgroundColor: darkColors.primary },
    createdOnText: { color: darkColors.secondaryText },
    subtext: { color: darkColors.secondaryText },
    actions: [{ container: { backgroundColor: darkColors.primary } }],
    expiresText: {
      backgroundColor: 'rgba(100, 116, 139, 0.14)',
      color: darkColors.secondaryText,
      expiringBackgroundColor: 'rgba(217, 45, 32, 0.5)',
      expiringColor: darkColors.error
    },
    actionsMenuIcon: {
      color: darkColors.primaryText,
      hoverBackgroundColor: 'rgba(100, 116, 139, 0.5)'
    },
    actionsMenu: {
      backgroundColor: darkColors.main,
      borderColor: darkColors.border
    },
    actionsMenuItem: { hoverBackgroundColor: '#121212' },
    actionsMenuItemIcon: { color: darkColors.primaryText },
    actionsMenuItemText: {
      color: darkColors.primaryText
    }
  },
  toast: {
    container: {
      backgroundColor: darkColors.main,
      borderColor: darkColors.border
    },
    headerText: { color: darkColors.primaryText },
    bodyText: {
      color: darkColors.primaryText,
      blockquoteColor: darkColors.border
    }
  }
}
```

<br>

## SuprSendProvider Integration (headless)

### SuprSendProvider Component

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

| Props        | Type                 | Description                                                                                                                                                           |
| :----------- | :------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| workspaceKey | string (Mandatory)   | You can find it in SuprSend Dashboard inside _Settings -> API Keys_.                                                                                                  |
| distinctId   | string (Mandatory)   | Unique identifier for the user.                                                                                                                                       |
| subscriberId | string (Mandatory)   | This is unique string for every distinctId used for authentication to inbox service. You check [generation docs](https://docs.suprsend.com/docs/hmac-authentication). |
| tenantId     | string (Optional)    | If you use multi-tenant architecture you can get inbox notifications for that specific tenant/brand only.                                                             |
| pageSize     | number (Optional)    | Notifications to get in one api call. Used for pagination to get older notifications. Maximum allowed is 50. Defaults to 20.                                          |
| stores       | IStore\[] (Optional) | Pass stores array if you ant to use [multi-tab feature](https://docs.suprsend.com/docs/multi-tabs).                                                                   |

```javascript IStore
interface IStore {
  storeId: string
  label: string
  query?: {
    tags?: string | string[]
    categories?: string | string[]
    read?: boolean
  }
}
```

> 🚧 SuprSend uses socket.io to get realtime updates in inbox channel.
>
> Make sure that you have only one active SuprSend's socket connection at a time (inspect -> network -> ws tab) to avoid unexpected issues.

<br>

### useUnseenCount hook

This hook provides unSeenCount, markAllSeen which you can show on Bell icon.

```javascript Syntax
import { useUnseenCount } from '@suprsend/react-inbox'

const { unSeenCount, markAllSeen } = useUnseenCount()
```

| Returns     | Type   | Description                                                                                                                     |
| :---------- | :----- | :------------------------------------------------------------------------------------------------------------------------------ |
| unSeenCount | number | Use this variable to show the unseen notification count anywhere in your application.                                           |
| markAllSeen | method | Used to mark seen for all notifications. Call this method on clicking the bell icon so that it will reset the unSeenCount to 0. |

<br>

### useNotifications hook

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

<br>

### useStoreUnseenCount hook

This hook can be used to get unread notifications count of a specific store, Use it only if you are using multi-tab.

```javascript Syntax
import { useStoreUnseenCount } from '@suprsend/react-inbox'

const { unSeenCount } = useUnseenCount()
```

<br>

### useStoresUnseenCount hook

This hook can be used to get unread notifications count of all stores, Use it only if you are using multi-tab.

```javascript Syntax
import { useStoresUnseenCount } from "@suprsend/react-inbox";

const { [storeId: string]: number } = useUnseenCount();
```

<br>

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

<br>

## License

MIT © [https://github.com/suprsend](https://github.com/suprsend)
