/** @jsx jsx */
import { useContext } from 'react'
import { css, jsx } from '@emotion/react'
import { CText, SubHeadingText } from '../utils/styles'
import { toast } from 'react-hot-toast'
import { uuid, epochMilliseconds, InboxContext } from '../utils'
import { markSeen } from '../utils/api'

export function ToastNotification({ notificationData, toastId }) {
  const {
    workspaceKey,
    setNotificationData,
    notifications,
    notificationData: storeData,
    buttonClickHandler
  } = useContext(InboxContext)

  const handleClick = (e, isButtonClick) => {
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
          if (!isButtonClick) {
            toast.dismiss(toastId)
          }
        })
        .catch((err) => {
          console.log('ERROR', err)
        })
        .finally(() => {
          if (isButtonClick) {
            if (typeof buttonClickHandler === 'function') {
              buttonClickHandler(notificationData)
            } else {
              if (notificationData?.message?.url) {
                window.location.href = notificationData.message.url
              }
            }
          }
        })
    }
  }
  const { message } = notificationData
  return (
    <div
      css={css`
        padding: 7px 14px;
        background-color: #fff;
        cursor: pointer;
        border: 1px solid #f0f0f0;
        margin-right: 15px;
        border-radius: 5px;
        max-width: 450px;
        box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.2),
          0 2px 1px 0 rgba(0, 0, 0, 0.1);
      `}
      onClick={handleClick}
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
        <CText
          onClick={(e) => {
            handleClick(e, true)
          }}
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
        >
          {message.button}
        </CText>
      )}
    </div>
  )
}

export function ManyNotificationsToast({ notificationCount, toastId }) {
  const { toggleInbox } = useContext(InboxContext)

  return (
    <SubHeadingText
      onClick={() => {
        toggleInbox(true)
        toast.dismiss(toastId)
      }}
      css={css`
        box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.2),
          0 2px 1px 0 rgba(0, 0, 0, 0.1);
        padding: 20px 30px;
        border-radius: 5px;
        cursor: pointer;
        background-color: #fff;
      `}
    >{`You have ${notificationCount} new notifications`}</SubHeadingText>
  )
}
