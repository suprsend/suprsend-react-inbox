import React from 'react'
import { lightColors } from '../../utils/styles'

const ReadIcon = ({ style }) => {
  const height = style?.height || 16
  const width = style?.width || 16
  const color = style?.color || lightColors.primaryText

  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 16 17'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M14.1334 6.26471C14.4667 6.51805 14.6667 6.91138 14.6667 7.33138V13.998C14.6667 14.3517 14.5262 14.6908 14.2762 14.9409C14.0261 15.1909 13.687 15.3314 13.3334 15.3314H2.66671C2.31309 15.3314 1.97395 15.1909 1.7239 14.9409C1.47385 14.6908 1.33337 14.3517 1.33337 13.998V7.33138C1.33337 7.12439 1.38157 6.92024 1.47414 6.7351C1.56671 6.54995 1.70111 6.38891 1.86671 6.26471L7.20004 2.26471C7.43084 2.09162 7.71155 1.99805 8.00004 1.99805C8.28853 1.99805 8.56925 2.09162 8.80004 2.26471L14.1334 6.26471Z'
        stroke={color}
        strokeWidth='1.33333'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M14.6667 7.33105L8.68668 11.1311C8.48086 11.26 8.24289 11.3284 8.00001 11.3284C7.75713 11.3284 7.51916 11.26 7.31334 11.1311L1.33334 7.33105'
        stroke={color}
        strokeWidth='1.33333'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

export default ReadIcon
