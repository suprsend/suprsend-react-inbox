import { IStore } from '@suprsend/js-inbox'

interface Dictionary {
  [key: string]: any
}

interface IToastOptions {
  duration?: number
}

interface IToastProps {
  position?: string
  toastOptions?: IToastOptions
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
  collapseToastNotifications?: boolean
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
  collapseToastNotifications,
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

interface IRemoteNotificationMessage {
  schema: string
  header: string
  text: string
  url: string
  open_in_new_tab?: boolean
  extra_data?: string
  tags?: string[]
  actions?: IActionObject[]
}

interface IRemoteNotification {
  n_id: string
  n_category: string
  created_on: number
  seen_on?: number
  interacted_on?: number
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

export function useStoreUnseenCount(): {
  unSeenCount: number
}

export function useStoresUnseenCount(): {
  [key: string]: number
}

export function useEvent(
  eventName: string,
  callback: (notification: IRemoteNotification) => void
): void

export function useNotifications(): {
  notifications: IRemoteNotification[]
  initialLoading: boolean
  hasNext: boolean
  fetchMoreLoading: boolean
  markClicked: (n_id: string) => void
  markAllSeen: () => void
  fetchPrevious: () => void
  markAllRead: () => void
}
