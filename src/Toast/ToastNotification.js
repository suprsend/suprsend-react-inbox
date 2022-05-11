/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import { CText } from '../utils/styles'

export default function ToastNotification({ notificationData }) {
  return (
    <div
      css={css`
        padding: 7px 14px;
        cursor: pointer;
        border: 1px solid #f0f0f0;
        margin-right: 15px;
        border-radius: 5px;
        max-width: 450px;
      `}
    >
      <CText
        css={css`
          font-size: 16px;
          margin: 10px 0px;
        `}
      >
        {notificationData.header}
      </CText>
      <CText
        css={css`
          font-size: 14px;
          margin: 10px 0px;
        `}
      >
        {notificationData.text}
      </CText>
      {notificationData.button && (
        <div>
          <CText
            css={css`
              background-color: #358adf;
              color: #fff;
              border-radius: 5px;
              text-align: center;
              margin: 10px 0px;
              padding: 4px 0px;
              font-size: 14px;
              @media (min-width: 425px) {
                width: fit-content;
                padding: 6px;
                min-width: 100px;
              }
            `}
            onClick={(e) => {
              e.stopPropagation()
              console.log('button clicked')
              // redirect to notificationData.url
            }}
          >
            {notificationData.button}
          </CText>
        </div>
      )}
    </div>
  )
}
