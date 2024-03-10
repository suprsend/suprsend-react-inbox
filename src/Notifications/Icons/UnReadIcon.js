import React from 'react'
import { lightColors } from '../../utils/styles'

const UnReadIcon = ({ style }) => {
  const height = style?.height || 16
  const width = style?.width || 16
  const color = style?.color || lightColors.primaryText

  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M14.416 3H4.00013C2.34327 3 1.00013 4.34315 1.00013 6V6.98313C0.999958 6.99375 0.999958 7.00437 1.00013 7.01499V18C1.00013 19.6569 2.34327 21 4.00013 21H20.0001C21.657 21 23.0001 19.6569 23.0001 18V9.21078H21.0001V18C21.0001 18.5523 20.5524 19 20.0001 19H4.00013C3.44784 19 3.00013 18.5523 3.00013 18V8.82027L10.4338 13.544L10.4392 13.5474C10.9071 13.8405 11.448 13.996 12.0001 13.996C12.5522 13.996 13.0932 13.8405 13.5611 13.5474L13.5665 13.544L19.5 9.21078H16.5L12.4992 11.8526L12.497 11.854C12.3479 11.9468 12.1758 11.996 12.0001 11.996C11.8245 11.996 11.6524 11.9468 11.5033 11.854L3.00013 6.45063V6C3.00013 5.44772 3.44784 5 4.00013 5H14.416V3Z'
        fill={color}
      />
      <circle cx='20' cy='4' r='4' fill={color} />
    </svg>
  )
}

export default UnReadIcon
