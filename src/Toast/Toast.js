import React from 'react'
import { Toaster } from 'react-hot-toast'

export default function Toast({ position = 'bottom-right', ...props }) {
  return <Toaster position={position} {...props} />
}
