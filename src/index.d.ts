import { IStore } from '@suprsend/js-inbox'

interface Dictionary {
  [key: string]: any
}

interface IToastProps {
  position?: string
  duration?: number
  limit?: number
  toastComponent?: ({
    notificationData
  }: {
    notificationData: any
  }) => JSX.Element
}

interface ISuprSendInbox {
  workspaceKey: string
  distinctId: string | null
  subscriberId: string | null
  inboxId?: string | null
  tenantId?: string
  stores?: IStore[]
  themeType?: 'light' | 'dark'
  hideAvatar?: boolean
  hideInbox?: boolean
  hideToast?: boolean
  noNotificationsComponent?: () => JSX.Element
  notificationComponent?: ({
    notificationData
  }: {
    notificationData: any
  }) => JSX.Element
  bellComponent?: () => JSX.Element
  badgeComponent?: ({ count }: { count: number | null }) => JSX.Element
  loaderComponent?: () => JSX.Element
  tabBadgeComponent?: ({ count }: { count: number }) => JSX.Element
  notificationClickHandler?: (notificationData: any) => void
  toastProps?: IToastProps
  theme?: Dictionary
  pagination?: boolean
  pageSize?: number
  popperPosition?: 'top' | 'bottom' | 'left' | 'right'
  showUnreadCountOnTabs?: boolean
}

declare function SuprSendInbox({
  distinctId,
  subscriberId,
  workspaceKey,
  inboxId,
  tenantId,
  themeType,
  hideAvatar,
  hideInbox,
  hideToast,
  noNotificationsComponent,
  notificationComponent,
  bellComponent,
  badgeComponent,
  loaderComponent,
  tabBadgeComponent,
  notificationClickHandler,
  toastProps,
  theme,
  pageSize,
  pagination,
  popperPosition,
  showUnreadCountOnTabs
}: ISuprSendInbox): JSX.Element

export default SuprSendInbox

// ========================================= //

interface IActionObject {
  name: string
  url: string
  open_in_new_tab?: boolean
}

interface IAvatarObject {
  action_url?: string
  avatar_url: string
}

interface ISubTextObject {
  action_url?: string
  text: string
}

interface IRemoteNotificationMessage {
  schema: string
  header?: string
  text: string
  url?: string
  open_in_new_tab?: boolean
  extra_data?: string
  actions?: IActionObject[]
  avatar?: IAvatarObject
  subtext?: ISubTextObject
}

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

interface ISuprSendProvider {
  children: JSX.Element
  workspaceKey: string
  distinctId?: string
  subscriberId?: string
  inboxId?: string
  tenantId?: string
  stores?: IStore[]
  pageSize?: number
}

export function SuprSendProvider({
  children,
  workspaceKey,
  distinctId,
  subscriberId,
  inboxId,
  tenantId,
  stores,
  pageSize
}: ISuprSendProvider): JSX.Element

export function useBell(): {
  unSeenCount: number
  markAllSeen: () => Promise<void>
}

export function useUnseenCount(): {
  unSeenCount: number
  markAllSeen: () => Promise<void>
}

export function useStoreUnseenCount(storeId?: string): {
  unSeenCount: number
}

export function useStoresUnseenCount(): {
  [key: string]: number
}

export function useEvent(
  eventName: string,
  callback: (notification: IRemoteNotification) => void
): void

export function useNotifications(storeId?: string): {
  notifications: IRemoteNotification[]
  initialLoading: boolean
  hasNext: boolean
  fetchMoreLoading: boolean
  markClicked: (n_id: string) => void
  markAllSeen: () => void
  fetchPrevious: () => void
  markAllRead: () => void
  markRead(n_id: string): void
  markUnRead(n_id: string): void
  markArchived(n_id: string): void
}
