/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import { useContext } from 'react'
import { ColorConfig, CText } from '../utils/styles'
import dayjs from 'dayjs'
import calendar from 'dayjs/plugin/calendar'
import { markSeen } from '../utils/api'
import { uuid, epochMilliseconds, InboxContext } from '../utils'

dayjs.extend(calendar)

export default function Notification({ notificationData, buttonClickHandler }) {
  const { message, seen_on: seenOn, created_on: createdOn } = notificationData

  const {
    workspaceKey,
    setNotificationData,
    notifications,
    notificationData: storeData
  } = useContext(InboxContext)

  const navigateUser = () => {
    // redirect after mark seen logic
    if (typeof buttonClickHandler === 'function') {
      buttonClickHandler(notificationData)
    } else {
      if (notificationData?.message?.url) {
        window.location.href = notificationData.message.url
      }
    }
  }

  const handleClick = (e) => {
    e.stopPropagation()
    if (!notificationData.seen_on) {
      const body = {
        event: '$notification_clicked',
        env: workspaceKey,
        $insert_id: uuid(),
        $time: epochMilliseconds(),
        properties: { id: notificationData.n_id }
      }
      markSeen(workspaceKey, body)
        .then((res) => {
          if (res.status === 202) {
            for (const notification of notifications) {
              if (notification.n_id === notificationData.n_id) {
                notification.seen_on = Date.now()
              }
            }
            setNotificationData({
              ...storeData,
              unread: storeData.unread - 1,
              notifications
            })
          }
        })
        .catch((err) => {
          console.log('MARK SEEN ERROR ', err)
        })
        .finally(() => {
          navigateUser()
        })
    } else {
      navigateUser()
    }
  }

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
            {message.header}
          </CText>
          <CText
            css={css`
              font-size: 14px;
              margin: 10px 0px;
            `}
          >
            {message.text}
          </CText>
          {message.button && (
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
                onClick={handleClick}
              >
                {message.button}
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
          {!seenOn && (
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
          )}
        </div>
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
