import React from 'react'
import styled from '@emotion/styled'
import { ColorConfig, CText } from '../utils/styles'
import dayjs from 'dayjs'
import calendar from 'dayjs/plugin/calendar'
import { useInbox, useTheme } from '../utils/context'

dayjs.extend(calendar)

export default function Notification({ notificationData }) {
  const { message, seen_on: seenOn, created_on: createdOn } = notificationData
  const { notificationComponent } = useInbox()
  const { notification } = useTheme()

  if (notificationComponent) {
    const NotificationComponent = notificationComponent
    return <NotificationComponent notificationData={notificationData} />
  }

  return (
    <Container style={notification?.container}>
      <NotificationView>
        <div>
          <HeaderText style={notification?.headerText}>
            {message.header}
          </HeaderText>
          <BodyText style={notification?.bodyText}>{message.text}</BodyText>
        </div>
        {!seenOn && (
          <div>
            <UnseenDot style={notification?.unseenDot} />
          </div>
        )}
      </NotificationView>
      <CreatedText>
        {dayjs(createdOn).calendar(null, {
          sameDay: '[Today at] h:mm A',
          nextDay: '[Tomorrow at] h:mm A',
          nextWeek: 'dddd [at] h:mm A',
          lastDay: '[Yesterday at] h:mm A',
          lastWeek: '[Last] dddd [at] h:mm A',
          sameElse: 'DD/MM/YYYY [at] h:mm A'
        })}
      </CreatedText>
    </Container>
  )
}

const Container = styled.div`
  padding: 7px 14px;
  cursor: pointer;
  background-color: #fff;
  border-bottom: 1px solid #f0f0f0;
  &:hover {
    background-color: #f0f0f0;
  }
`

const NotificationView = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
`
const HeaderText = styled(CText)`
  font-size: 16px;
  margin: 10px 0px;
  white-space: pre-line;
`

const BodyText = styled(CText)`
  font-size: 14px;
  margin: 10px 0px;
  white-space: pre-line;
`

const UnseenDot = styled.div`
  background: #358adf;
  border-radius: 50%;
  width: 7px;
  height: 7px;
  margin-top: 18px;
`

const CreatedText = styled(CText)`
  font-size: 12px;
  margin: 0px;
  color: ${ColorConfig.lightGray1};
`
