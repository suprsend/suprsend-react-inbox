import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { CText, HelperText, lightColors } from '../utils/styles'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import updateLocale from 'dayjs/plugin/updateLocale'
import { useInbox, useTheme } from '../utils/context'
import AvatarIcon from './AvatarIcon'
import { isImgUrl } from '../utils'
import Markdown from 'react-markdown'

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
    M: '1mo',
    MM: '%dmo',
    y: '1y',
    yy: '%dy'
  }
})

export default function Notification({ notificationData, handleActionClick }) {
  const [validAvatar, setValidAvatar] = useState(false)
  const { message, seen_on: seenOn, created_on: createdOn } = notificationData
  const { notificationComponent, hideAvatar } = useInbox()
  const { notification } = useTheme()

  const blockquoteColor =
    notification?.bodyText?.blockquoteColor || lightColors.border
  const linkColor = notification?.bodyText?.linkColor || lightColors.primary

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
          {!hideAvatar && (
            <AvatarView
              onClick={(e) => {
                const avatarData = message?.avatar
                handleActionClick(e, {
                  type: 'avatar',
                  url: avatarData?.action_url,
                  target: avatarData?.open_in_new_tab
                })
              }}
            >
              {message?.avatar?.avatar_url && validAvatar ? (
                <AvatarImage
                  src={message.avatar.avatar_url}
                  alt='avatar'
                  style={notification?.avatar}
                />
              ) : (
                <AvatarIcon />
              )}
            </AvatarView>
          )}
          <div>
            <HeaderText style={notification?.headerText}>
              {message.header}
            </HeaderText>
            <BodyText style={notification?.bodyText}>
              <Markdown
                components={{
                  a({ children, href }) {
                    return (
                      <span
                        onClick={(e) => {
                          e.preventDefault()
                          handleActionClick(e, {
                            type: 'markdown_link',
                            url: href
                          })
                        }}
                        style={{ color: linkColor, textDecoration: 'none' }}
                      >
                        {children}
                      </span>
                    )
                  },
                  p({ children }) {
                    return (
                      <p style={{ margin: 0, overflowWrap: 'anywhere' }}>
                        {children}
                      </p>
                    )
                  },
                  blockquote({ children }) {
                    return (
                      <blockquote
                        style={{
                          margin: 0,
                          paddingLeft: 10,
                          borderLeft: `3px ${blockquoteColor} solid`,
                          marginBottom: 5
                        }}
                      >
                        {children}
                      </blockquote>
                    )
                  },
                  ul({ children }) {
                    return (
                      <ul
                        style={{
                          whiteSpace: 'normal',
                          margin: 0,
                          paddingLeft: 10
                        }}
                      >
                        {children}
                      </ul>
                    )
                  },
                  ol({ children }) {
                    return (
                      <ol
                        style={{
                          whiteSpace: 'normal',
                          margin: 0,
                          paddingLeft: 10
                        }}
                      >
                        {children}
                      </ol>
                    )
                  },
                  img(props) {
                    return (
                      <img
                        style={{ maxWidth: '100%', objectFit: 'contain' }}
                        {...props}
                      />
                    )
                  }
                }}
              >
                {message?.text
                  ?.replaceAll('\\\n', '&nbsp;')
                  ?.replaceAll('\n', '  \n')
                  ?.replaceAll('&nbsp;', '&nbsp;  \n')}
              </Markdown>
            </BodyText>
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
        <SubTextView
          link={message?.subtext?.action_url}
          onClick={(e) => {
            const subTextData = message?.subtext
            handleActionClick(e, {
              type: 'subtext',
              url: subTextData?.action_url,
              target: subTextData?.open_in_new_tab
            })
          }}
        >
          <SubText style={notification?.subtext} hideAvatar={hideAvatar}>
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
                handleActionClick(e, {
                  type: 'action_button',
                  url: actionOne.url,
                  target: actionOne.open_in_new_tab
                })
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
                handleActionClick(e, {
                  type: 'action_button',
                  url: actionTwo.url,
                  target: actionTwo.open_in_new_tab
                })
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
  margin-left: ${(props) => (props.hideAvatar ? '0px' : '42px')};
  color: ${lightColors.secondaryText};
`

const SubTextView = styled.div`
  text-decoration: none;
  overflow-wrap: anywhere;
  &:hover {
    text-decoration: ${(props) => (props.link ? 'underline' : 'none')};
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
  overflow-wrap: anywhere;
  line-height: 16px;
  font-weight: 700;
`

const BodyText = styled.div`
  font-size: 13px;
  line-height: 18px;
  margin: 10px 0px 5px 0px;
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
  overflow-wrap: anywhere;
`

const ButtonView = styled.div`
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
  overflow-wrap: anywhere;
`

const AvatarView = styled.div`
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
