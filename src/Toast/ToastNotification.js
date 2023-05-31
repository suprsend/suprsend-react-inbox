import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import { marked } from 'marked'
import DOMPurify from 'dompurify'
import { CText, lightColors } from '../utils/styles'
import { useTheme, useInbox } from '../utils/context'
import AvatarIcon from '../Notifications/AvatarIcon'
import { isImgUrl, markdownRenderer } from '../utils'

export function ToastNotification({ notificationData, dismissToast }) {
  const { toast } = useTheme()
  const { toggleInbox } = useInbox()
  const { message } = notificationData

  const [validAvatar, setValidAvatar] = useState(false)

  marked.use({
    renderer: markdownRenderer({
      linkColor: toast?.bodyText?.linkColor || lightColors.primary,
      blockquoteColor: toast?.bodyText?.blockquoteColor || lightColors.border
    })
  })

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
        <BodyText
          style={toast?.bodyText}
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(marked(message.text))
          }}
        />
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
`

const HeaderText = styled(CText)`
  font-size: 13px;
  line-height: 16px;
  font-weight: 700;
  margin: 10px 0px;
`

const BodyText = styled(CText)`
  font-size: 12px;
  line-height: 18px;
  margin: 10px 0px;
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
