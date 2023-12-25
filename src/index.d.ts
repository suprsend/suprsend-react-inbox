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
  notificationClickHandler?: (notificationData: any) => void
  toastProps?: IToastProps
  theme?: Dictionary
  openLinksInNewTab?: boolean
  pagination?: boolean
  pageSize?: number
  popperPosition?: 'top' | 'bottom' | 'left' | 'right'
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
  notificationClickHandler,
  toastProps,
  theme,
  openLinksInNewTab,
  pageSize,
  pagination,
  popperPosition
}: ISuprSendInbox): JSX.Element

export default SuprSendInbox

// ========================================= //

interface IActionObject {
  name: string
  url: string
}

interface IRemoteNotificationMessage {
  header: string
  schema: string
  text: string
  url: string
  extra_data?: string
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
  pageSize?: number
}

export function SuprSendProvider({
  children,
  workspaceKey,
  distinctId,
  subscriberId,
  inboxId,
  tenantId,
  pageSize
}: ISuprSendProvider): JSX.Element

export function useBell(): {
  unSeenCount: number
  markAllSeen: () => Promise<void>
}

export function useEvent(
  eventName: string,
  callback: (notification: IRemoteNotification) => void
): void

export function useNotifications(): {
  notifications: IRemoteNotification[]
  unSeenCount: number
  initialLoading: boolean
  hasNext: boolean
  fetchMoreLoading: boolean
  markClicked: (n_id: string) => void
  markAllSeen: () => void
  fetchPrevious: () => void
  markAllRead: () => void
}
