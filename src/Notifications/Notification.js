import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import TimeAgo from 'react-timeago'
import { CText, HelperText, lightColors } from '../utils/styles'
import { useInbox, useTheme } from '../utils/context'
import { isImgUrl, getLongFormattedTime, getShortFormattedTime } from '../utils'
import AvatarIcon from './Icons/AvatarIcon'
import MoreIcon from './Icons/MoreIcon'
import PinnedNotificationIcon from './Icons/PinnedNotificationIcon'
import UnReadIcon from './Icons/UnReadIcon'
import ReadIcon from './Icons/ReadIcon'
import ArchiveIcon from './Icons/ArchiveIcon'
import { useTranslation } from '../i18n/useTranslations'

function ExpiryTime({ dateInput, style, t }) {
  const date = dateInput
  const [, setTime] = useState(Date.now())

  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 10000)
    return () => {
      clearInterval(interval)
    }
  }, [])

  const isExpiring = date - Date.now() <= 3600000
  const expiredAlready = Date.now() >= date

  if (typeof dateInput === 'number') {
    return (
      <div>
        <ExpiresText
          style={{
            ...style,
            color: isExpiring
              ? style?.expiringColor || lightColors.error
              : style?.color || lightColors.secondaryText,
            backgroundColor: isExpiring
              ? style?.expiringBackgroundColor || 'rgba(217, 45, 32, 0.09)'
              : style?.backgroundColor || 'rgba(100, 116, 139, 0.09)'
          }}
        >
          {t('expiresIn')}{' '}
          {expiredAlready ? (
            'a minute'
          ) : (
            <TimeAgo
              date={date}
              live={false}
              formatter={getLongFormattedTime}
            />
          )}
        </ExpiresText>
      </div>
    )
  } else {
    return null
  }
}

export default function Notification({ notificationData, handleActionClick }) {
  const [validAvatar, setValidAvatar] = useState(false)
  const [showMore, setShowMore] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)

  const { message, seen_on: seenOn, created_on: createdOn } = notificationData
  const {
    notificationComponent,
    hideAvatar,
    inbox,
    themeType,
    primaryActionClickHandler,
    secondaryActionClickHandler,
    language
  } = useInbox()
  const { notification } = useTheme()
  const { t } = useTranslation(language)

  const tableBorderColor =
    notification?.bodyText?.tableBorderColor || 'rgba(100, 116, 139, 0.3)'
  const blockquoteColor =
    notification?.bodyText?.blockquoteColor || 'rgba(100, 116, 139, 0.3)'
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
    return (
      <NotificationComponent
        notificationData={notificationData}
        markRead={(e) => {
          if (e?.stopPropagation) {
            e.stopPropagation()
          }
          inbox.feed.markRead(notificationData.n_id)
        }}
        markUnRead={(e) => {
          if (e?.stopPropagation) {
            e.stopPropagation()
          }
          inbox.feed.markUnRead(notificationData.n_id)
        }}
        markArchived={(e) => {
          if (e?.stopPropagation) {
            e.stopPropagation()
          }
          inbox.feed.markArchived(notificationData.n_id)
        }}
      />
    )
  }

  return (
    <Container
      style={notification?.container}
      read={!!seenOn}
      onMouseEnter={() => {
        setShowMore(true)
        setMoreOpen(false)
      }}
      onMouseLeave={() => {
        setShowMore(false)
        setMoreOpen(false)
      }}
      onClick={(e) => {
        if (moreOpen) {
          e.stopPropagation()
          setMoreOpen(false)
        }
      }}
    >
      {notificationData.is_pinned && (
        <PinnedView hideAvatar={hideAvatar}>
          <PinnedNotificationIcon style={notification?.pinnedIcon} />
          <PinnedNotificationText style={notification?.pinnedText}>
            {t('pinned')}
          </PinnedNotificationText>
        </PinnedView>
      )}
      <NotificationView>
        <LeftView>
          <LeftAvatarView>
            <UnseenDot style={notification?.unseenDot} show={!seenOn} />
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
                  <AvatarIcon type={themeType} />
                )}
              </AvatarView>
            )}
          </LeftAvatarView>
          <ContentView>
            {message.header && (
              <HeaderText style={notification?.headerText}>
                {message.header}
              </HeaderText>
            )}
            <BodyText style={notification?.bodyText}>
              <Markdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={{
                  a({ children, href, style }) {
                    return (
                      <span
                        onClick={(e) => {
                          e.preventDefault()
                          handleActionClick(e, {
                            type: 'markdown_link',
                            url: href
                          })
                        }}
                        style={{
                          color: linkColor,
                          textDecoration: 'none',
                          ...(style || {})
                        }}
                      >
                        {children}
                      </span>
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
                          borderLeft: `3px ${blockquoteColor} solid`,
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
            {!!message?.subtext?.text && (
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
                <SubText style={notification?.subtext}>
                  {message.subtext.text}
                </SubText>
              </SubTextView>
            )}
            {notificationData.expiry && notificationData?.is_expiry_visible && (
              <ExpiryTime
                dateInput={notificationData.expiry}
                style={notification?.expiresText}
                t={t}
              />
            )}
            {hasButtons && (
              <ButtonContainer>
                {actionOne && (
                  <ButtonView
                    style={notification?.actions?.[0]?.container}
                    key={actionOne.id}
                    onClick={(e) => {
                      handleActionClick(e, {
                        type: 'primary_action_button',
                        url: actionOne.url,
                        target: actionOne.open_in_new_tab,
                        customClickHandler: primaryActionClickHandler
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
                        type: 'secondary_action_button',
                        url: actionTwo.url,
                        target: actionTwo.open_in_new_tab,
                        customClickHandler: secondaryActionClickHandler
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
          </ContentView>
        </LeftView>
        <RightView>
          <CreatedText style={notification?.createdOnText}>
            <TimeAgo
              date={createdOn}
              live={false}
              formatter={getShortFormattedTime}
            />
          </CreatedText>
          <CMenuView showMore={showMore}>
            <CMenuButton
              hoverBGColor={notification?.actionsMenuIcon?.hoverBackgroundColor}
              onClick={(e) => {
                e.stopPropagation()
                setMoreOpen((prev) => !prev)
              }}
            >
              <MoreIcon style={notification?.actionsMenuIcon} />
            </CMenuButton>
            <CMenuPopup moreOpen={moreOpen} style={notification?.actionsMenu}>
              {notificationData.seen_on ? (
                <CMenuItem
                  style={notification?.actionsMenuItem}
                  onClick={(e) => {
                    e.stopPropagation()
                    inbox.feed.markUnRead(notificationData.n_id)
                    setMoreOpen(false)
                  }}
                >
                  <UnReadIcon style={notification?.actionsMenuItemIcon} />
                  <CMenuText style={notification?.actionsMenuItemText}>
                    {t('markAsUnread')}
                  </CMenuText>
                </CMenuItem>
              ) : (
                <CMenuItem
                  style={notification?.actionsMenuItem}
                  onClick={(e) => {
                    e.stopPropagation()
                    inbox.feed.markRead(notificationData.n_id)
                    setMoreOpen(false)
                  }}
                >
                  <ReadIcon style={notification?.actionsMenuItemIcon} />
                  <CMenuText style={notification?.actionsMenuItemText}>
                    {t('markAsRead')}
                  </CMenuText>
                </CMenuItem>
              )}
              {!notificationData?.archived && (
                <CMenuItem
                  style={notification?.actionsMenuItem}
                  onClick={(e) => {
                    e.stopPropagation()
                    inbox.feed.markArchived(notificationData.n_id)
                  }}
                >
                  <ArchiveIcon style={notification?.actionsMenuItemIcon} />
                  <CMenuText style={notification?.actionsMenuItemText}>
                    {t('archive')}
                  </CMenuText>
                </CMenuItem>
              )}
            </CMenuPopup>
          </CMenuView>
        </RightView>
      </NotificationView>
    </Container>
  )
}

const Container = styled.div`
  padding: 16px;
  cursor: pointer;
  background-color: ${(props) => {
    return props.read
      ? props?.style?.readBackgroundColor || lightColors.main
      : props?.style?.unreadBackgroundColor || '#edf3ff'
  }};
  border-bottom: 0.5px solid ${lightColors.border};
  &:hover {
    background-color: ${(props) =>
      props?.style?.hoverBackgroundColor || '#DBE7FF'}
`

const PinnedView = styled.div`
  display: flex;
  align-items: center;
  margin-left: ${(props) => (props.hideAvatar ? '0px' : '52px')};
  gap: 4px;
`

const PinnedNotificationText = styled(HelperText)``

const SubText = styled(HelperText)`
  color: #64748b;
`

const SubTextView = styled.div`
  text-decoration: none;
  overflow-wrap: anywhere;
  display: inline-block;
  &:hover {
    text-decoration: ${(props) => (props.link ? 'underline' : 'none')};
    text-decoration-color: ${lightColors.secondaryText};
  }
`

const ExpiresText = styled(HelperText)`
  margin-top: 8px;
  display: inline-block;
  padding: 1px 6px;
  border-radius: 4px;
`

const NotificationView = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
`

const HeaderText = styled(CText)`
  margin: 8px 0px 0px 0px;
  overflow-wrap: anywhere;
  line-height: 18px;
  font-weight: 700;
`

const BodyText = styled.div`
  font-size: 14px;
  line-height: 20px;
  margin: 8px 0px 6px;
  font-weight: 400;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica,
    Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  color: ${lightColors.secondaryText};
`

const UnseenDot = styled.div`
  background-color: ${lightColors.primary};
  border-radius: 50%;
  width: 7px;
  height: 7px;
  visibility: ${(props) => (props.show ? 'visible' : 'hidden')};
`

const CreatedText = styled(HelperText)``

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  margin-bottom: 6px;
  margin-top: 12px;
  overflow-wrap: anywhere;
`

const ButtonView = styled.div`
  max-width: 50%;
  background: ${lightColors.primary};
  border-radius: 5px;
  text-decoration: none;
  padding: 4px 16px;
  &:hover {
    background-color: ${(props) =>
      props.style?.hoverBackgroundColor || '#265cbf'} !important;
  }
`

const ButtonText = styled(CText)`
  color: ${lightColors.main};
  text-align: center;
  word-break: break-all;
  font-weight: 600;
  font-size: 13px;
`

const ButtonOutlineView = styled(ButtonView)`
  background: ${lightColors.main};
  border-color: ${lightColors.border};
  border-style: solid;
  border-width: 1.2px;
  &:hover {
    background-color: ${(props) =>
      props.style?.hoverBackgroundColor || '#f7f7f9'} !important;
  }
`

const ButtonOutlineText = styled(ButtonText)`
  color: ${lightColors.secondaryText};
`

const LeftView = styled.div`
  display: flex;
  overflow-wrap: anywhere;
  flex-grow: 1;
`

const LeftAvatarView = styled.div`
  display: flex;
  margin-top: 8px;
  margin-right: 12px;
`

const AvatarView = styled.div``

const ContentView = styled.div`
  flex: 1;
`

const RightView = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5px;
  max-width: 40px;
  gap: 5px;
`

const AvatarImage = styled.img`
  height: 36px;
  width: 36px;
  border-radius: 100px;
`

const CMenuPopup = styled.div`
  position: absolute;
  right: 0px;
  display: ${(props) => (props.moreOpen ? 'block' : 'none')};
  min-width: 150px;
  padding: 2px;
  background-color: ${lightColors.main};
  border: 1px solid;
  border-color: ${lightColors.border};
  border-radius: 4px;
  box-shadow: 1px 1px 20px 1px rgba(0, 0, 0, 0.1);
  z-index: 100;
`

const CMenuItem = styled.div`
  padding: 7px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 8px;
  &:hover {
    background-color: ${(props) =>
      props?.style?.hoverBackgroundColor || 'rgba(100, 116, 139, 0.09)'};
  }
`

const CMenuText = styled(CText)``

const CMenuView = styled.div`
  position: relative;
  visibility: ${(props) => (props?.showMore ? 'visible' : 'hidden')};
`

const CMenuButton = styled.div`
  height: 20px;
  width: 20px;
  &:hover {
    border-radius: 50%;
    background-color: ${(props) =>
      props?.hoverBGColor || 'rgba(100, 116, 139, 0.09)'};
  }
`
