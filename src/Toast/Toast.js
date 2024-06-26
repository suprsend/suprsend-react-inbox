import React from 'react'
import styled from '@emotion/styled'
import { ToastContainer, toast } from 'react-toastify'
import { ToastNotification } from './ToastNotification'

export default function Toast({ position, duration, limit }) {
  const toastDuration = duration || 3000
  const toastsLimit = limit || 3
  const toastPosition = !position
    ? window.innerWidth > 425
      ? 'bottom-right'
      : 'bottom-center'
    : position

  return (
    <StyledContainer
      autoClose={toastDuration}
      position={toastPosition}
      limit={toastsLimit}
      hideProgressBar
      pauseOnHover={false}
      closeButton={false}
      pauseOnFocusLoss={false}
    />
  )
}

export function notify({ notificationsData, toastProps }) {
  const ToastNotificationComponent =
    toastProps?.toastComponent || ToastNotification

  if (document.hidden) return

  const toastId = toast(
    <ToastNotificationComponent
      notificationData={notificationsData}
      closeToast={() => {
        toast.dismiss({ id: toastId })
      }}
    />
  )
}

const StyledContainer = styled(ToastContainer)`
  &.Toastify__toast-container {
    max-width: 450px;
    min-width: 300px;
    padding: 0px;
    width: unset;
  }

  .Toastify__toast-theme--light,
  .Toastify__toast-theme--default,
  .Toastify__toast-theme--dark {
    padding: 0px;
    border-radius: 5px;
    background-color: transparent;
  }

  .Toastify__toast-body {
    padding: 0px;
  }
`
