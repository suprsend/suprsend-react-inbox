/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import { useContext } from 'react'
import { ColorConfig, CText } from '../utils/styles'
import dayjs from 'dayjs'
import calendar from 'dayjs/plugin/calendar'
import { InboxContext } from '../utils'

dayjs.extend(calendar)

export default function Notification({ notificationData }) {
  const { message, seen_on: seenOn, created_on: createdOn } = notificationData
  const { notificationProps = {} } = useContext(InboxContext)

  if (notificationProps?.notificationComponent) {
    const NotificationComponent = notificationProps.notificationComponent
    return <NotificationComponent notificationData={notificationData} />
  }

  const {
    containerStyle = {},
    headerTextStyle = {},
    bodyTextStyle = {},
    unseenDotStyle = {}
  } = notificationProps
  return (
    <div
      css={css`
        padding: 7px 14px;
        cursor: pointer;
        background-color: #fff;
        border-bottom: 1px solid #f0f0f0;
        &:hover {
          background-color: #f0f0f0;
        }
        ${containerStyle}
      `}
    >
      <div
        css={css`
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          justify-content: space-between;
        `}
      >
        <div>
          <CText
            css={css`
              font-size: 16px;
              margin: 10px 0px;
              white-space: pre-line;
              ${headerTextStyle}
            `}
          >
            {message.header}
          </CText>
          <CText
            css={css`
              font-size: 14px;
              margin: 10px 0px;
              white-space: pre-line;
              ${bodyTextStyle}
            `}
          >
            {message.text}
          </CText>
        </div>
        {!seenOn && (
          <div>
            <div
              css={css`
                background: #358adf;
                border-radius: 50%;
                width: 7px;
                height: 7px;
                margin-top: 18px;
                ${unseenDotStyle}
              `}
            />
          </div>
        )}
      </div>
      <CText
        css={css`
          font-size: 12px;
          margin: 0px;
          color: ${ColorConfig.lightGray1};
        `}
      >
        {dayjs(createdOn).calendar(null, {
          sameDay: '[Today at] h:mm A',
          nextDay: '[Tomorrow at] h:mm A',
          nextWeek: 'dddd [at] h:mm A',
          lastDay: '[Yesterday at] h:mm A',
          lastWeek: '[Last] dddd [at] h:mm A',
          sameElse: 'DD/MM/YYYY [at] h:mm A'
        })}
      </CText>
    </div>
  )
}
