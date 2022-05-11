import React from 'react'
import { Toaster, resolveValue, toast } from 'react-hot-toast'
import ToastNotification from './ToastNotification'

export default function Toast({ position, ...props }) {
  const toastPosition = !position
    ? window.innerWidth > 425
      ? 'bottom-right'
      : 'bottom-center'
    : position
  return (
    <Toaster position={toastPosition} {...props}>
      {(t) => {
        return resolveValue(t.message, t)
      }}
    </Toaster>
  )
}

export function notify(notificationData) {
  return toast(() => <ToastNotification notificationData={notificationData} />)
}
