import React from 'react'
import { lightColors } from '../../utils/styles'

const ArchiveIcon = ({ style }) => {
  const height = style?.height || 17
  const width = style?.width || 16
  const color = style?.color || lightColors.secondaryText

  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 16 17'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M14 2.33789H1.99998C1.63179 2.33789 1.33331 2.63637 1.33331 3.00456V5.00456C1.33331 5.37275 1.63179 5.67122 1.99998 5.67122H14C14.3682 5.67122 14.6666 5.37275 14.6666 5.00456V3.00456C14.6666 2.63637 14.3682 2.33789 14 2.33789Z'
        stroke={color}
        strokeWidth='1.33333'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M2.66669 5.67188V13.0052C2.66669 13.3588 2.80716 13.698 3.05721 13.948C3.30726 14.1981 3.6464 14.3385 4.00002 14.3385H12C12.3536 14.3385 12.6928 14.1981 12.9428 13.948C13.1929 13.698 13.3334 13.3588 13.3334 13.0052V5.67188'
        stroke={color}
        strokeWidth='1.33333'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M6.66669 8.33789H9.33335'
        stroke={color}
        strokeWidth='1.33333'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

export default ArchiveIcon
