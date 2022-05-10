import React from 'react'
import DefaultBellIcon from './DefaultBellIcon'

function Bell({
  bellHeight,
  bellWidth,
  bellColor,
  bellType,
  bellComponent,
  ...otherProps
}) {
  if (bellComponent) {
    const BellComponent = bellComponent
    return <BellComponent {...otherProps} />
  }
  return (
    <DefaultBellIcon
      bellHeight={bellHeight}
      bellWidth={bellWidth}
      bellColor={bellColor}
      bellType={bellType}
      {...otherProps}
    />
  )
}

export default Bell
