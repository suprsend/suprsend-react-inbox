/** @jsx jsx */
import { jsx } from '@emotion/react'
import { Toaster, resolveValue, toast } from 'react-hot-toast'
import { ToastNotification, ManyNotificationsToast } from './ToastNotification'

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

export function notify({ notificationData, notificationCount = 0 }) {
  if (notificationCount > 1) {
    const toastId = toast(() => (
      <ManyNotificationsToast
        notificationCount={notificationCount}
        toastId={toastId}
      />
    ))
  } else {
    const toastId = toast(() => (
      <ToastNotification
        notificationData={notificationData}
        toastId={toastId}
      />
    ))
  }
}
