/** @jsx jsx */
import { css, jsx } from '@emotion/react'

export default function Badge({
  count,
  badgeStyle = '',
  badgeComponent,
  ...otherProps
}) {
  if (count > 0) {
    if (badgeComponent) {
      const BadgeComponent = badgeComponent
      return <BadgeComponent count={count} {...otherProps} />
    }
    return (
      <span
        css={css`
          font-size: 10px;
          position: absolute;
          padding: 3px 6px;
          border-radius: 50%;
          background-color: gray;
          color: white;
          text-align: center;
          display: inline-block;
          right: -3px;
          top: -7px;
          ${badgeStyle}
        `}
      >
        {count}
      </span>
    )
  }
  return null
}
