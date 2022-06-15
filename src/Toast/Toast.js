/** @jsx jsx */
import { jsx } from '@emotion/react'
import { Toaster, resolveValue, toast } from 'react-hot-toast'
import { ToastNotification } from './ToastNotification'
import { markSeen } from '../utils/api'

export default function Toast({ position, ...otherProps }) {
  const toastPosition = !position
    ? window.innerWidth > 425
      ? 'bottom-right'
      : 'bottom-center'
    : position

  return (
    <Toaster position={toastPosition} {...otherProps}>
      {(t) => resolveValue(t.message, t)}
    </Toaster>
  )
}

export function notify({
  workspaceKey,
  notificationsData,
  toastProps,
  buttonClickHandler,
  setNotificationsData
}) {
  const navigateUser = () => {
    if (typeof buttonClickHandler === 'function') {
      buttonClickHandler(notificationsData)
    } else {
      if (notificationsData?.message?.url) {
        window.location.href = notificationsData.message.url
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
        navigateUser()
      })
  }

  const NotificationComponent = toastProps
    ? toastProps.toastComponent
    : ToastNotification

  notificationsData.map((item) => {
    const toastId = toast(() => (
      <NotificationComponent
        notificationData={item}
        markClicked={handleClick}
        dismissToast={() => {
          toast.dismiss(toastId)
        }}
      />
    ))
  })
}
