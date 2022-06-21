import React from 'react'
import DefaultBellIcon from './DefaultBellIcon'
import { useInbox, useTheme } from '../utils/context'

export default function Bell() {
  const { bellComponent } = useInbox()
  const { bell } = useTheme()

  if (bellComponent) {
    const BellComponent = bellComponent
    return <BellComponent />
  }
  return <DefaultBellIcon style={bell} />
}
