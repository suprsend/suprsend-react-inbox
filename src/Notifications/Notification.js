/** @jsx jsx */
import { css, jsx } from '@emotion/react'

export default function Notification({ notificationData, isRead = false }) {
  return (
    <div
      css={css`
        padding: 7px 14px;
        border-radius: 5px;
        cursor: pointer;
        &:hover {
          background-color: #f0f0f0;
        }
      `}
    >
      <div
        css={css`
          display: flex;
          align-items: center;
          flexdirection: row;
        `}
      >
        <div
          css={css`
            flex: 1;
            margin-right: 15px;
          `}
        >
          <p
            css={css`
              font-size: 16px;
              margin: 10px 0px;
            `}
          >
            {notificationData.header}
          </p>
          <p
            css={css`
              font-size: 14px;
              margin: 10px 0px;
            `}
          >
            {notificationData.text}
          </p>
          {notificationData.button && (
            <p
              css={css`
                background-color: #358adf;
                color: #fff;
                border-radius: 5px;
                text-align: center;
                margin: 10px 0px;
              `}
              onClick={(e) => {
                e.stopPropagation()
                console.log('button clicked')
                // redirect to notificationData.url
              }}
            >
              {notificationData.button}
            </p>
          )}
        </div>
        <div
          css={css`
            display: flex;
            align-items: center;
            flex-direction: row;
          `}
        >
          <p
            css={css`
              font-size: 16px;
            `}
          >
            1d
          </p>
          {isRead ? (
            <div
              css={css`
                margin-left: 10px;
              `}
            >
              <div
                css={css`
                  background: #358adf;
                  border-radius: 50%;
                  width: 6px;
                  height: 6px;
                `}
              />
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  )
}
