/** @jsx jsx */
import { jsx } from '@emotion/react'
import { Toaster, toast } from 'react-hot-toast'
import { ToastNotification } from './ToastNotification'
import { markSeen } from '../utils/api'

export default function Toast({ position, ...otherProps }) {
  const toastPosition = !position
    ? window.innerWidth > 425
      ? 'bottom-right'
      : 'bottom-center'
    : position

  return (
    <Toaster
      position={toastPosition}
      gutter={8}
      toastOptions={{ duration: 3000, animation: 'none' }}
      {...otherProps}
    />
  )
}

export function notify({
  workspaceKey,
  notificationsData,
  toastProps,
  buttonClickHandler,
  setNotificationsData
}) {
  const navigateUser = (notificationData) => {
    if (typeof buttonClickHandler === 'function') {
      buttonClickHandler(notificationData)
    } else {
      if (notificationData?.message?.url) {
        window.location.href = notificationData.message.url
      }
    }
  }

  const handleClick = (e, notificationData) => {
    e.stopPropagation()
    if (notificationData.seen_on) return
    markSeen(workspaceKey, notificationData.n_id)
      .then((res) => {
        if (res.status === 202) {
          setNotificationsData((prev) => {
            for (const notificationItem of prev.notifications) {
              if (notificationItem.n_id === notificationData.n_id) {
                notificationItem.seen_on = Date.now()
              }
            }
            return { ...prev, count: 0 }
          })
        }
      })
      .catch(() => {})
      .finally(() => {
        navigateUser(notificationData)
      })
  }

  const ToastNotificationComponent =
    toastProps?.toastComponent || ToastNotification

  notificationsData.map((item) => {
    toast.custom((t) => (
      <ToastNotificationComponent
        t={t}
        notificationData={item}
        markClicked={handleClick}
        dismissToast={() => {
          toast.dismiss(t.id)
        }}
      />
    ))
  })
}
