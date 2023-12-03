import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import { CText, lightColors } from '../utils/styles'
import { useTheme, useInbox } from '../utils/context'
import AvatarIcon from '../Notifications/AvatarIcon'
import { isImgUrl } from '../utils'
import Markdown from 'react-markdown'

export function ToastNotification({ notificationData, dismissToast }) {
  const { toast, notification } = useTheme()
  const { toggleInbox } = useInbox()
  const { message } = notificationData

  const blockquoteColor =
    notification?.bodyText?.blockquoteColor || lightColors.border
  const linkColor = notification?.bodyText?.linkColor || lightColors.primary

  const [validAvatar, setValidAvatar] = useState(false)

  useEffect(() => {
    const isValidAvatar = isImgUrl(message?.avatar?.avatar_url)
    isValidAvatar.then((res) => setValidAvatar(res))
  }, [notificationData])

  return (
    <Container
      style={toast?.container}
      onClick={(e) => {
        toggleInbox(true)
        dismissToast()
      }}
    >
      <AvatarView>
        {message?.avatar?.avatar_url && validAvatar ? (
          <AvatarImage src={message.avatar.avatar_url} alt='avatar' />
        ) : (
          <AvatarIcon />
        )}
      </AvatarView>
      <div>
        <HeaderText style={toast?.headerText}>{message.header}</HeaderText>
        <BodyText style={notification?.bodyText}>{message?.text}</BodyText>
      </div>
    </Container>
  )
}

const Container = styled.div`
  max-width: 450px;
  min-width: 300px;
  background-color: ${lightColors.main};
  cursor: pointer;
  padding: 7px 14px;
  border: 1px solid ${lightColors.border};
  border-radius: 5px;
  box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.2), 0 2px 1px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  overflow-wrap: anywhere;
`

const HeaderText = styled(CText)`
  font-size: 13px;
  line-height: 16px;
  font-weight: 700;
  margin: 10px 0px;
`

const BodyText = styled.div`
  font-size: 12px;
  line-height: 18px;
  margin: 10px 0px;
  font-weight: 400;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica,
    Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  color: ${lightColors.primaryText};
`

const AvatarImage = styled.img`
  height: 32px;
  width: 32px;
  border-radius: 100px;
`

const AvatarView = styled.div`
  margin-top: 10px;
  margin-right: 10px;
`
