/** @jsx jsx */
import { useContext } from 'react'
import { css, jsx } from '@emotion/react'
import { CText, SubHeadingText } from '../utils/styles'
import { toast } from 'react-hot-toast'
import { uuid, epochMilliseconds, InboxContext } from '../utils'
import { markSeen } from '../utils/api'

export function ToastNotification({ notificationData }) {
  const {
    workspaceKey,
    notificationData: { notifications },
    setNotificationData,
    buttonClickHandler
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
            setNotificationData((prev) => ({
              ...prev,
              notifications,
              count: 0
            }))
          }
        })
        .catch((err) => {
          console.log('ERROR', err)
        })
        .finally(() => {
          navigateUser()
        })
    }
  }

  const { message } = notificationData

  return (
    <div
      css={css`
        max-width: 450px;
        min-width: 300px;
        background-color: #fff;
        cursor: pointer;
        padding: 7px 14px;
        border: 1px solid #f0f0f0;
        margin: 15px;
        border-radius: 5px;
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
    </div>
  )
}

export function ManyNotificationsToast({ notificationCount, toastId }) {
  const { setNotificationData, toggleInbox } = useContext(InboxContext)

  return (
    <SubHeadingText
      onClick={() => {
        setNotificationData((prev) => ({ ...prev, count: 0 }))
        toggleInbox(true)
        toast.dismiss(toastId)
      }}
      css={css`
        background-color: #fff;
        cursor: pointer;
        padding: 20px 30px;
        border-radius: 5px;
        box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.2),
          0 2px 1px 0 rgba(0, 0, 0, 0.1);
        @media (max-width: 425px) {
          flex: 1;
        }
      `}
    >{`You have ${notificationCount} new notifications`}</SubHeadingText>
  )
}
