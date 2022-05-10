/** @jsx jsx */
import { css, jsx } from '@emotion/react'

export default function Header() {
  return (
    <div
      css={css`
        display: flex;
        justify-content: space-between;
        position: sticky;
        top: 0;
        background-color: #fff;
        padding: 12px;
        border-bottom: 1px solid #f0f0f0;
        align-items: center;
        background-color: #fff;
        z-index: 1000;
      `}
    >
      <p
        css={css`
          margin: 0px;
          font-weight: 600;
        `}
      >
        Notifications
      </p>
      <p
        css={css`
          margin: 0px;
          cursor: pointer;
          font-size: 14px;
        `}
      >
        Mark All Read
      </p>
    </div>
  )
}
