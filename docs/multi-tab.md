# Multi-tab support (stores)

SuprSend Inbox supports multiple tabs for grouping and filtering notifications.

## Define Stores in SDK's

For supporting multiple tabs, list of stores need to be defined while initializing inbox SDK. If stores is ignored you can get all notifications.

```javascript IStore
interface IStore {
  storeId: string
  label?: string
  query?: {
    tags?: string | string[]
    categories?: string
    read?: boolean
    archived?: boolean
  }
}
```

| Property   | Description                                                                                                                                                                                                                                                                                                  |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| storeId    | Unique identifier that identifies the store from list of stores. This can be any string.                                                                                                                                                                                                                     |
| label      | This is used to show name on Tab for that store. If not provided storeId will be shown on tab, if you are using inbox with SuprSend's UI.                                                                                                                                                                    |
| query      | depending on usecase you can design query for grouping inbox notifications in specific store/tab. Ignore this field if you want to get all notifications.                                                                                                                                                    |
| tags       | Pass string or array of string to filter notifications that only has any one of those tags. Ignore this field to get all notifications irrespective of tags. <br>You can add tags while designing inbox template inside Advanced configuration section. After publishing it you can click on tag to copy it. |
| categories | Filter notifications based on notification category. Ignore this field to get all notifications irrespective of category.                                                                                                                                                                                    |
| read       | Used to get all notifications which are in read state. Ignore this field to get all notifications irrespective of read status.                                                                                                                                                                               |
| archived   | Used to get all notifications which are archived. Ignore this field to get all unarchived notifications.                                                                                                                                                                                                     |

```javascript Example
stores = [
  {
    storeId: 'testing',
    label: 'Test',
    query: {
      categories: 'transactional',
      read: true,
      tags: ['profile', 'user']
    }
  }
]
```

The above example gets notifications which belong to transactional category and in read state and has profile or user tag.
