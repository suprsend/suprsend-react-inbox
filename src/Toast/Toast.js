import React from 'react'
import { Toaster } from 'react-hot-toast'

export default function Toast({ position = 'bottom-right' }) {
  return <Toaster position={position} />
}
