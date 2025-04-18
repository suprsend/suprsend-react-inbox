# Integrating Inbox

Integrating SuprSend Inbox channel in React websites can be done in two ways:

- **SuprSendInbox** component which comes with UI and customizing props.
- **SuprSendProvider** headless component and hooks, incase you want to totally take control of UI. (example: Full page notifications).

This document will cover the methods to integrate Suprsend SDK in your React applications using **SuprSendInbox**. Adding this SDK to your app will introduce a bell icon where all the inbox notifications can be viewed. A typical inbox, toast message will look like this.

**Stage 1.** Bell icon count and toast message as soon as the notification is delivered

![](https://files.readme.io/259b66b-image.png)

**Stage 2.** Inbox view after clicking on the bell icon

![](https://files.readme.io/9bdbeae-image.png)

<br />

You can also customize your inbox based on simple [customization options](https://github.com/suprsend/suprsend-react-inbox/blob/main/docs/customization.md) available in our SDK

<br />

## Installation

You can install SuprSend inbox SDK using npm/yarn

```javascript npm
npm i @suprsend/react-inbox
```

```javascript yarn
yarn add @suprsend/react-inbox
```

<br />

## Integration

> 📘 Migrating to v3.x.x
>
> From v3.2.0 you have to add `react-toastify` css file in your code if you are using toast notifications as shown in below code snippet.

After installing, Import the component in your code and use it as given below. Replace the variables with actual values.

```javascript index.js
import SuprSendInbox from '@suprsend/react-inbox'
import 'react-toastify/dist/ReactToastify.css' // needed for toast notifications, can be ignored if hideToast=true

// add to your react component
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

We use [react-toastify](https://github.com/fkhadra/react-toastify) internally to show toast notifications. So importing toastify styles is needed. This can be ignored if toast notifications are not used ie.. hideToast = true.

| Field        | Type                 | Description                                                                                                                                                                                          |
| :----------- | :------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| workspaceKey | string (Mandatory)   | You can find it in SuprSend Dashboard inside _Settings -> API Keys_.                                                                                                                                 |
| distinctId   | any (Mandatory)      | Unique identifier for the user.                                                                                                                                                                      |
| subscriberId | string (Mandatory)   | This is unique string for every distinctId used for authentication to inbox service. You check [generation docs](https://github.com/suprsend/suprsend-react-inbox/blob/main/docs/authentication.md). |
| tenantId     | string (Optional)    | If you use multi-tenant architecture you can get inbox notifications for that specific tenant/brand only.                                                                                            |
| stores       | IStore\[] (Optional) | Pass stores array if you ant to use [multi-tab feature](https://github.com/suprsend/suprsend-react-inbox/blob/main/docs/multi-tab.md).                                                               |
| pageSize     | number (Optional)    | Notifications to get in one api call. Used for pagination to get older notifications. Maximum allowed is 50. Defaults to 20.                                                                         |
| pagination   | boolean (Optional)   | By default infinite scroll will be enabled to get older notifications on scroll. It can be disabled by passing false.                                                                                |
