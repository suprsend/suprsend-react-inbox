/** @jsx jsx */
import { jsx } from '@emotion/react'
import { Toaster, toast } from 'react-hot-toast'
import { ToastNotification } from './ToastNotification'

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

export function notify({ notificationsData, toastProps }) {
  const ToastNotificationComponent =
    toastProps?.toastComponent || ToastNotification

  toast.custom((t) => (
    <ToastNotificationComponent
      t={t}
      notificationData={notificationsData}
      dismissToast={() => {
        toast.dismiss(t.id)
      }}
    />
  ))
}
