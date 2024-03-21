import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import { CText, lightColors } from '../utils/styles'
import { useTheme, useInbox } from '../utils/context'
import AvatarIcon from '../Notifications/Icons/AvatarIcon'
import { isImgUrl } from '../utils'
import Markdown from 'react-markdown'

export function ToastNotification({ notificationData, closeToast }) {
  const { toast } = useTheme()
  const { toggleInbox } = useInbox()
  const { message } = notificationData

  const [validAvatar, setValidAvatar] = useState(false)

  useEffect(() => {
    const isValidAvatar = isImgUrl(message?.avatar?.avatar_url)
    isValidAvatar.then((res) => setValidAvatar(res))
  }, [notificationData])

  const blockquoteColor = toast?.bodyText?.blockquoteColor || lightColors.border
  const linkColor = toast?.bodyText?.linkColor || lightColors.primary

  return (
    <Container
      style={toast?.container}
      onClick={(e) => {
        toggleInbox(true)
        closeToast()
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
        <BodyText style={toast?.bodyText}>
          <Markdown
            components={{
              a({ children, href }) {
                return (
                  <a
                    href={href}
                    style={{ color: linkColor, textDecoration: 'none' }}
                  >
                    {children}
                  </a>
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
    </Container>
  )
}

const Container = styled.div`
  background-color: ${lightColors.main};
  cursor: pointer;
  padding: 7px 14px;
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
  font-weight: 400;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica,
    Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  color: ${lightColors.primaryText};
  margin: 10px 0px;
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
