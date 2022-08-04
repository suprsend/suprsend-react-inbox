import React from 'react'
import styled from '@emotion/styled'
import { ColorConfig, CText } from '../utils/styles'
import dayjs from 'dayjs'
import calendar from 'dayjs/plugin/calendar'
import { useInbox, useTheme } from '../utils/context'

dayjs.extend(calendar)

export default function Notification({ notificationData, markClicked }) {
  const { message, seen_on: seenOn, created_on: createdOn } = notificationData
  const { notificationComponent } = useInbox()
  const { notification } = useTheme()

  const actionOne = message?.actions?.[0]
  const actionTwo = message?.actions?.[1]
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
      <ButtonContainer>
        {actionOne && (
          <ButtonView
            key={actionOne.id}
            onClick={(e) => {
              e.stopPropagation()
              markClicked()
              if (actionOne?.url) {
                window.location.href = actionOne.url
              }
            }}
          >
            <ButtonText>{actionOne.name}</ButtonText>
          </ButtonView>
        )}
        {actionTwo && (
          <ButtonOutlineView
            key={actionTwo.id}
            onClick={(e) => {
              e.stopPropagation()
              markClicked()
              if (actionTwo?.url) {
                window.location.href = actionTwo.url
              }
            }}
          >
            <ButtonOutlineText>{actionTwo.name}</ButtonOutlineText>
          </ButtonOutlineView>
        )}
      </ButtonContainer>
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

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  margin-bottom: 5px;
`

const ButtonView = styled.a`
  width: 150px;
  background: #358adf;
  border-radius: 5px;
`

const ButtonText = styled(CText)`
  color: ${ColorConfig.white};
  padding: 5px 0px;
  text-align: center;
`

const ButtonOutlineView = styled(ButtonView)`
  background: ${ColorConfig.white};
  border-color: #358adf;
  border-style: solid;
  border-width: 1px;
`

const ButtonOutlineText = styled(ButtonText)`
  color: #358adf;
`
