/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import { HeadingText } from '../utils/styles'

export default function Header({ containerStyle = {}, textStyle = {} }) {
  return (
    <div
      css={css`
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: sticky;
        top: 0;
        background-color: #fff;
        padding: 12px;
        border-bottom: 1px solid #f0f0f0;
        z-index: 1000;
        ${containerStyle}
      `}
    >
      <HeadingText
        css={css`
          ${textStyle}
        `}
      >
        Notifications
      </HeadingText>
    </div>
  )
}
