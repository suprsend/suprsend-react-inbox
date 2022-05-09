/** @jsx jsx */
import { css, jsx } from '@emotion/react'

export default function Badge({ count }) {
  if (count > 0) {
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
        `}
      >
        {count}
      </span>
    )
  }
  return null
}
