import * as React from 'react'

const AvatarIcon = (props) => (
  <svg
    width={32}
    height={32}
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <circle cx={16} cy={16} r={16} fill='#9B9B9B' />
    <path
      d='M21.212 12.697c0 2.727-2.14 4.939-4.782 4.939-2.64 0-4.782-2.212-4.782-4.94 0-2.727 2.141-4.938 4.782-4.938 2.642 0 4.782 2.21 4.782 4.939ZM21.213 18.605H11.65c-1.778 0-3.314 1.015-4.137 2.506 1.935 2.956 5.21 4.903 8.92 4.903 3.708 0 6.983-1.947 8.92-4.903-.826-1.49-2.36-2.506-4.139-2.506Z'
      fill='#fff'
    />
  </svg>
)

export default AvatarIcon
