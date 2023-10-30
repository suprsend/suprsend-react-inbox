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

interface ISuprSendProviderProps {
  workspaceKey: string
  distinctId: string | null
  subscriberId: string | null
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
  notificationClickHandler?: (notificationData: any) => void
  toastProps?: IToastProps
  theme?: Dictionary
  openLinksInNewTab?: boolean
  popperPosition: 'top' | 'bottom' | 'left' | 'right'
}

declare function SuprSendInbox({
  distinctId,
  subscriberId,
  workspaceKey,
  themeType,
  hideAvatar,
  hideInbox,
  hideToast,
  collapseToastNotifications,
  noNotificationsComponent,
  notificationComponent,
  bellComponent,
  badgeComponent,
  notificationClickHandler,
  toastProps,
  theme,
  openLinksInNewTab,
  popperPosition
}: ISuprSendProviderProps): JSX.Element
export default SuprSendInbox
