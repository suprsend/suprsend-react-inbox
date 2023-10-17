/** @jsx jsx */
import { jsx } from '@emotion/react'
import { Toaster, toast } from 'react-hot-toast'
import { ToastNotification, MultipleNotifications } from './ToastNotification'

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
      toastOptions={{ duration: 3000 }}
      {...otherProps}
    />
  )
}

export function notify({
  notificationsData,
  toastProps,
  collapseToastNotifications
}) {
  const ToastNotificationComponent =
    toastProps?.toastComponent || ToastNotification

  if (collapseToastNotifications && notificationsData.length > 1) {
    toast.custom((t) => (
      <MultipleNotifications
        t={t}
        notificationsCount={notificationsData.length}
        dismissToast={() => {
          toast.dismiss(t.id)
        }}
      />
    ))
  } else {
    for (let i = 0; i < notificationsData.length; i++) {
      setTimeout(() => {
        toast.custom((t) => (
          <ToastNotificationComponent
            t={t}
            notificationData={notificationsData[i]}
            dismissToast={() => {
              toast.dismiss(t.id)
            }}
          />
        ))
      }, i * 1000)
    }
  }
}
