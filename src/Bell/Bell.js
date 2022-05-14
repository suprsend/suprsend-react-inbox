import React from 'react'
import DefaultBellIcon from './DefaultBellIcon'

function Bell({ style = {}, bellComponent, ...otherProps }) {
  if (bellComponent) {
    const BellComponent = bellComponent
    return <BellComponent {...otherProps} />
  }
  return <DefaultBellIcon style={style} />
}

export default Bell
