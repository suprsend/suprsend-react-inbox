/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import { ColorConfig, CText } from '../utils/styles'

export default function Notification({ notificationData, isRead = false }) {
  return (
    <div
      css={css`
        padding: 7px 14px;
        cursor: pointer;
        border-bottom: 1px solid #f0f0f0;
        &:hover {
          background-color: #f0f0f0;
        }
      `}
    >
      <div
        css={css`
          display: flex;
          align-items: center;
          flex-direction: row;
          justify-content: flex-start;
        `}
      >
        <div
          css={css`
            flex: 1;
            margin-right: 15px;
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
        <div
          css={css`
            display: flex;
            align-items: center;
            flex-direction: row;
            align-self: flex-start;
            margin-top: 16px;
          `}
        >
          {!isRead ? (
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
          ) : null}
        </div>
      </div>
      <CText
        css={css`
          font-size: 12px;
          margin: 0px;
          color: ${ColorConfig.lightGray1};
        `}
      >
        Yesterday at 2:35pm
      </CText>
    </div>
  )
}
