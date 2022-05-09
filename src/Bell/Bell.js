import React from 'react'
import DefaultBellIcon from './DefaultBellIcon'

function Bell({ bellHeight, bellWidth, bellColor, bellType, bellComponent }) {
  if (bellComponent) {
    return bellComponent
  }
  return (
    <DefaultBellIcon
      bellHeight={bellHeight}
      bellWidth={bellWidth}
      bellColor={bellColor}
      bellType={bellType}
    />
  )
}

export default Bell
