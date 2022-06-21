import React from 'react'
import DefaultBellIcon from './DefaultBellIcon'
import { useInbox } from '../utils/context'

export default function Bell() {
  const { bellProps } = useInbox()
  const { style = {}, bellComponent } = bellProps || {}

  if (bellComponent) {
    const BellComponent = bellComponent
    return <BellComponent />
  }
  return <DefaultBellIcon style={style} />
}
