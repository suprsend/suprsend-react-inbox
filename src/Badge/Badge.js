/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import { useContext } from 'react'
import { InboxContext } from '../utils'

export default function Badge({ style = {}, badgeComponent, ...otherProps }) {
  const { unread: count } = useContext(InboxContext)

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
          background-color: red;
          color: white;
          text-align: center;
          display: inline-block;
          right: -3px;
          top: -7px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
            Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
            'Segoe UI Symbol';
          ${style}
        `}
      >
        {count}
      </span>
    )
  }
  return null
}
