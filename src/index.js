import React, { useState, useEffect } from 'react'
import SuprsendJSInbox from '@suprsend/js-inbox'
import Inbox from './Inbox'
import Toast, { notify } from './Toast'
import { mergeDeep } from './utils'
import { InboxContext, InboxThemeContext } from './utils/context'
import { darkTheme } from './utils/styles'

function SuprsendInbox({
  workspaceKey = '',
  tenantId = '',
  distinctId = '',
  subscriberId = '', // subscriberId is deprecated use inboxId
  inboxId = '',
  stores,
  toastProps,
  notificationClickHandler,
  primaryActionClickHandler,
  secondaryActionClickHandler,
  bellComponent,
  badgeComponent,
  notificationComponent,
  noNotificationsComponent,
  loaderComponent,
  tabBadgeComponent,
  headerRightComponent,
  hideAvatar = false,
  hideInbox,
  hideToast,
  theme,
  themeType = 'light',
  pagination = true,
  pageSize,
  popperPosition = 'bottom',
  showUnreadCountOnTabs = true,
  host,
  language,
  disableMarkdown,
  translations
}) {
  if (inboxId) {
    subscriberId = inboxId
  }

  const [openInbox, toggleInbox] = useState(false)
  const [inbox, setInbox] = useState()
  const [notificationsData, setNotificationsData] = useState({
    storeData: {},
    count: 0
  })
  const [activeStore, setActiveStore] = useState('')
  const [changingActiveStore, setChangingActiveStore] = useState(false)

  useEffect(() => {
    const inboxInst = new SuprsendJSInbox(workspaceKey, {
      pageSize,
      tenantID: tenantId,
      stores,
      host
    })
    setInbox(inboxInst)

    inboxInst.emitter.on('sync_notif_store', () => {
      const inboxData = inboxInst.feed.data
      setNotificationsData({
        storeData: inboxData?.stores || {},
        count: inboxData?.unseenCount || 0,
        hasNext: inboxData?.hasNext,
        initialLoading: inboxData?.initialLoading,
        activeStoreId: inboxData?.activeStoreId
      })
      setActiveStore(inboxData?.activeStoreId)
    })

    inboxInst.emitter.on('new_notification', (notification) => {
      notify({
        notificationsData: notification,
        toastProps
      })
    })

    return () => {
      inboxInst.emitter.all.clear()
    }
  }, [])

  useEffect(() => {
    if (openInbox && subscriberId && inbox) {
      inbox.feed.markAllSeen()
    }
  }, [openInbox, subscriberId, inbox])

  useEffect(() => {
    if (!subscriberId || !inbox) return
    setNotificationsData({
      storeData: {},
      count: 0
    })
    inbox.identifyUser(distinctId, subscriberId)
    inbox.feed.fetchNotifications()

    return () => {
      inbox.resetUser()
    }
  }, [subscriberId, inbox])

  const themeValue =
    themeType === 'dark' ? mergeDeep(darkTheme, theme) : theme || {}

  return (
    <InboxThemeContext.Provider value={themeValue}>
      <InboxContext.Provider
        value={{
          workspaceKey,
          notificationsData,
          setNotificationsData,
          notificationClickHandler,
          primaryActionClickHandler,
          secondaryActionClickHandler,
          bellComponent,
          badgeComponent,
          notificationComponent,
          noNotificationsComponent,
          tabBadgeComponent,
          headerRightComponent,
          toggleInbox,
          inbox,
          loaderComponent,
          pagination,
          hideAvatar,
          activeStore,
          setActiveStore,
          changingActiveStore,
          setChangingActiveStore,
          showUnreadCountOnTabs,
          themeType,
          language,
          disableMarkdown,
          translations
        }}
      >
        {!hideInbox && (
          <Inbox
            openInbox={openInbox}
            toggleInbox={toggleInbox}
            popperPosition={popperPosition}
          />
        )}
        {!hideToast && <Toast {...toastProps} />}
      </InboxContext.Provider>
    </InboxThemeContext.Provider>
  )
}

export default SuprsendInbox
export * from './Headless'
