import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { CText, HelperText, lightColors } from '../utils/styles'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import updateLocale from 'dayjs/plugin/updateLocale'
import { useInbox, useTheme } from '../utils/context'
import AvatarIcon from './AvatarIcon'
import { isImgUrl, formatActionLink } from '../utils'
import { marked } from 'marked'
import DOMPurify from 'dompurify'

const renderer = ({ linkColor, blockquoteColor }) => ({
  link(href, _, text) {
    return `<a href=${href} style="color:${linkColor};text-decoration:none;">${text}</a>`
  },
  paragraph(text) {
    return `<p style="margin:0px;"}}>${text}</p>`
  },
  list(body, ordered) {
    if (ordered) {
      return `<ol style="white-space:normal;margin:0px;padding-left:10px;">${body}</ol>`
    } else {
      return `<ul style="white-space:normal;margin:0px;padding-left:10px">${body}</ul>`
    }
  },
  blockquote(src) {
    return `<blockquote style="margin:0px;padding-left:10px;border-left:3px ${blockquoteColor} solid;margin-top:5px; margin-bottom:5px;">${src}</blockquote>`
  }
})

dayjs.extend(relativeTime)
dayjs.extend(updateLocale)
dayjs.updateLocale('en', {
  relativeTime: {
    past: '%ss',
    s: '1m',
    m: '1m',
    mm: '%dm',
    h: '1h',
    hh: '%dh',
    d: '1d',
    dd: '%dd',
    M: '1m',
    MM: '%dm',
    y: '1y',
    yy: '%dy'
  }
})

export default function Notification({ notificationData, markClicked }) {
  const [validAvatar, setValidAvatar] = useState(false)
  const { message, seen_on: seenOn, created_on: createdOn } = notificationData
  const { notificationComponent } = useInbox()
  const { notification } = useTheme()
  marked.use({
    renderer: renderer({
      linkColor: notification?.bodyText?.linkColor || lightColors.primary,
      blockquoteColor:
        notification?.bodyText?.blockquoteColor || lightColors.border
    })
  })

  const actionOne = message?.actions?.[0]
  const actionTwo = message?.actions?.[1]
  const hasButtons = actionOne || actionTwo

  useEffect(() => {
    const isValidAvatar = isImgUrl(message?.avatar?.avatar_url)
    isValidAvatar.then((res) => setValidAvatar(res))
  }, [notificationData])

  if (notificationComponent) {
    const NotificationComponent = notificationComponent
    return <NotificationComponent notificationData={notificationData} />
  }

  return (
    <Container style={notification?.container} read={!!seenOn}>
      <NotificationView>
        <LeftView>
          <AvatarView href={formatActionLink(message?.avatar?.action_url)}>
            {message?.avatar?.avatar_url && validAvatar ? (
              <AvatarImage src={message.avatar.avatar_url} alt='avatar' />
            ) : (
              <AvatarIcon />
            )}
          </AvatarView>
          <div>
            <HeaderText style={notification?.headerText}>
              {message.header}
            </HeaderText>
            <BodyText
              style={notification?.bodyText}
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(marked(message.text))
              }}
            />
          </div>
        </LeftView>
        <RightView>
          <CreatedText style={notification?.createdOnText}>
            {dayjs(createdOn).fromNow(true)}
          </CreatedText>
          {!seenOn && (
            <div>
              <UnseenDot style={notification?.unseenDot} />
            </div>
          )}
        </RightView>
      </NotificationView>
      {message?.subtext?.text && (
        <SubTextView href={formatActionLink(message?.subtext?.action_url)}>
          <SubText style={notification?.subtext}>
            {message.subtext.text}
          </SubText>
        </SubTextView>
      )}
      {hasButtons && (
        <ButtonContainer>
          {actionOne && (
            <ButtonView
              style={notification?.actions?.[0]?.container}
              key={actionOne.id}
              onClick={(e) => {
                e.stopPropagation()
                markClicked()
                if (actionOne?.url) {
                  window.location.href = formatActionLink(actionOne.url)
                }
              }}
            >
              <ButtonText style={notification?.actions?.[0]?.text}>
                {actionOne.name}
              </ButtonText>
            </ButtonView>
          )}
          {actionTwo && (
            <ButtonOutlineView
              key={actionTwo.id}
              style={notification?.actions?.[1]?.container}
              onClick={(e) => {
                e.stopPropagation()
                markClicked()
                if (actionTwo?.url) {
                  window.location.href = formatActionLink(actionTwo.url)
                }
              }}
            >
              <ButtonOutlineText style={notification?.actions?.[1]?.text}>
                {actionTwo.name}
              </ButtonOutlineText>
            </ButtonOutlineView>
          )}
        </ButtonContainer>
      )}
    </Container>
  )
}

const Container = styled.div`
  padding: 12px 14px;
  cursor: pointer;
  background-color: ${(props) => {
    return props.read
      ? props?.style?.readBackgroundColor || '#FFF'
      : props?.style?.unreadBackgroundColor || '#F4F9FF'
  }};
  border-bottom: 0.5px solid ${lightColors.border};
  &:hover {
    background-color: ${(props) =>
      props.read
        ? props?.style?.readHoverBackgroundColor || '#F6F6F6'
        : props?.style?.unreadHoverBackgroundColor || '#DFECFF'};
  }
`

const SubText = styled(HelperText)`
  font-size: 11px;
  margin-left: 40px;
  color: ${lightColors.secondaryText};
`

const SubTextView = styled.a`
  text-decoration: none;
  &:hover {
    text-decoration: ${(props) => (props.href ? 'underline' : 'none')};
    text-decoration-color: ${lightColors.secondaryText};
  }
`

const NotificationView = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
`

const HeaderText = styled(CText)`
  margin: 10px 0px;
  white-space: pre-line;
  line-height: 16px;
  font-weight: 700;
`

const BodyText = styled.div`
  font-size: 13px;
  line-height: 18px;
  margin: 10px 0px 5px 0px;
  white-space: pre-line;
  font-weight: 400;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica,
    Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  color: ${lightColors.primaryText};
`

const UnseenDot = styled.div`
  background-color: ${lightColors.primary};
  border-radius: 50%;
  width: 7px;
  height: 7px;
  margin-top: 10px;
`

const CreatedText = styled(HelperText)``

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  margin-bottom: 5px;
  margin-left: 40px;
  margin-top: 10px;
`

const ButtonView = styled.a`
  max-width: 50%;
  background: #066af3;
  border-radius: 5px;
  text-decoration: none;
  padding: 4px 16px;
`

const ButtonText = styled(CText)`
  color: #fff;
  text-align: center;
  word-break: break-all;
  font-weight: 600;
  font-size: 13px;
`

const ButtonOutlineView = styled(ButtonView)`
  background: #fff;
  border-color: ${lightColors.border};
  border-style: solid;
  border-width: 0.5px;
`

const ButtonOutlineText = styled(ButtonText)`
  color: #434343;
`

const LeftView = styled.div`
  display: flex;
`

const AvatarView = styled.a`
  margin-top: 10px;
  margin-right: 10px;
`

const RightView = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5px;
`

const AvatarImage = styled.img`
  height: 32px;
  width: 32px;
  border-radius: 100px;
`
