import React from 'react'
import styled from '@emotion/styled'
import { useInbox, useTheme } from '../utils/context'
import { lightColors } from '../utils/styles'

export default function Badge() {
  const {
    notificationsData: { count },
    badgeComponent
  } = useInbox()
  const { badge } = useTheme()

  if (count > 0) {
    if (badgeComponent) {
      const BagdeComponent = badgeComponent
      return <BagdeComponent count={count} />
    }
    return <CountText style={badge}>{count}</CountText>
  }
  return null
}

const CountText = styled.span`
  position: absolute;
  right: -3px;
  top: -7px;
  display: inline-block;
  font-size: 10px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica,
    Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  padding: 3px 6px;
  border-radius: 50%;
  background-color: ${lightColors.primary};
  color: #fff;
  text-align: center;
`
