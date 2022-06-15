/** @jsx jsx */
import { useContext } from 'react'
import { css, jsx } from '@emotion/react'
import { toast } from 'react-hot-toast'
import { InboxContext } from '../utils'
import { CText, SubHeadingText } from '../utils/styles'

export function ToastNotification({ notificationData, markClicked }) {
  const { message } = notificationData
  return (
    <div
      onClick={(e) => {
        markClicked(e, notificationData)
      }}
      css={css`
        max-width: 450px;
        min-width: 300px;
        background-color: #fff;
        cursor: pointer;
        padding: 7px 14px;
        border: 1px solid #f0f0f0;
        border-radius: 5px;
        box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.2),
          0 2px 1px 0 rgba(0, 0, 0, 0.1);
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
    </div>
  )
}

export function ManyNotificationsToast({ notificationCount, toastId }) {
  const { setNotificationsData, toggleInbox } = useContext(InboxContext)

  return (
    <SubHeadingText
      onClick={() => {
        setNotificationsData((prev) => ({ ...prev, count: 0 }))
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
