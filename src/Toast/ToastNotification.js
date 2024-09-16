import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import { CText, lightColors } from '../utils/styles'
import { useTheme, useInbox } from '../utils/context'
import AvatarIcon from '../Notifications/Icons/AvatarIcon'
import { isImgUrl } from '../utils'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'

export function ToastNotification({ notificationData, closeToast }) {
  const { toast } = useTheme()
  const { toggleInbox, themeType } = useInbox()
  const { message } = notificationData

  const [validAvatar, setValidAvatar] = useState(false)

  useEffect(() => {
    const isValidAvatar = isImgUrl(message?.avatar?.avatar_url)
    isValidAvatar.then((res) => setValidAvatar(res))
  }, [notificationData])

  const tableBorderColor =
    toast?.bodyText?.tableBorderColor || lightColors.border
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
          <AvatarIcon type={themeType} />
        )}
      </AvatarView>
      <div>
        <HeaderText style={toast?.headerText}>{message.header}</HeaderText>
        <BodyText style={toast?.bodyText}>
          <Markdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={{
              a({ children, href, style }) {
                return (
                  <a
                    href={href}
                    style={{
                      color: linkColor,
                      textDecoration: 'none',
                      ...(style || {})
                    }}
                  >
                    {children}
                  </a>
                )
              },
              p({ children, style }) {
                return (
                  <p
                    style={{
                      margin: 0,
                      overflowWrap: 'anywhere',
                      ...(style || {})
                    }}
                  >
                    {children}
                  </p>
                )
              },
              blockquote({ children, style }) {
                return (
                  <blockquote
                    style={{
                      margin: 0,
                      paddingLeft: 10,
                      borderLeft: `3px solid ${blockquoteColor}`,
                      marginBottom: 5,
                      marginTop: 5,
                      ...(style || {})
                    }}
                  >
                    {children}
                  </blockquote>
                )
              },
              ul({ children, style }) {
                return (
                  <ul
                    style={{
                      whiteSpace: 'normal',
                      margin: 0,
                      paddingLeft: 10,
                      ...(style || {})
                    }}
                  >
                    {children}
                  </ul>
                )
              },
              ol({ children, style }) {
                return (
                  <ol
                    style={{
                      whiteSpace: 'normal',
                      margin: 0,
                      paddingLeft: 10,
                      ...(style || {})
                    }}
                  >
                    {children}
                  </ol>
                )
              },
              img(props) {
                return (
                  <img
                    style={{
                      maxWidth: '100%',
                      objectFit: 'contain',
                      ...(props?.style || {})
                    }}
                    {...props}
                  />
                )
              },
              table({ children, style }) {
                return (
                  <table
                    style={{
                      overflowWrap: 'break-word',
                      borderCollapse: 'collapse',
                      ...(style || {})
                    }}
                  >
                    {children}
                  </table>
                )
              },
              th({ children, style }) {
                return (
                  <th
                    style={{
                      textAlign: 'left',
                      whiteSpace: 'nowrap',
                      border: `1px solid ${tableBorderColor}`,
                      padding: 5,
                      ...(style || {})
                    }}
                  >
                    {children}
                  </th>
                )
              },
              td({ children, style }) {
                return (
                  <td
                    style={{
                      border: `1px solid ${tableBorderColor}`,
                      padding: 5,
                      ...(style || {})
                    }}
                  >
                    {children}
                  </td>
                )
              },
              h1({ children, style }) {
                return (
                  <h1
                    style={{
                      margin: 0,
                      ...(style || {})
                    }}
                  >
                    {children}
                  </h1>
                )
              },
              h2({ children, style }) {
                return (
                  <h2
                    style={{
                      margin: 0,
                      ...(style || {})
                    }}
                  >
                    {children}
                  </h2>
                )
              },
              h3({ children, style }) {
                return (
                  <h3
                    style={{
                      margin: 0,
                      ...(style || {})
                    }}
                  >
                    {children}
                  </h3>
                )
              },
              h4({ children, style }) {
                return (
                  <h4
                    style={{
                      margin: 0,
                      ...(style || {})
                    }}
                  >
                    {children}
                  </h4>
                )
              },
              h5({ children, style }) {
                return (
                  <h5
                    style={{
                      margin: 0,
                      ...(style || {})
                    }}
                  >
                    {children}
                  </h5>
                )
              },
              h6({ children, style }) {
                return (
                  <h6
                    style={{
                      margin: 0,
                      ...(style || {})
                    }}
                  >
                    {children}
                  </h6>
                )
              },
              script() {
                return null
              },
              link() {
                return null
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
  padding: 14px;
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
  height: 36px;
  width: 36px;
  border-radius: 100px;
`

const AvatarView = styled.div`
  margin-top: 8px;
  margin-right: 12px;
`
