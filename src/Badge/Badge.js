import React from 'react'
import styled from '@emotion/styled'
import { useInbox } from '../utils/context'

export default function Badge() {
  const {
    notificationsData: { count },
    badgeProps
  } = useInbox()
  const { style = {}, badgeComponent } = badgeProps || {}

  if (count > 0) {
    if (badgeComponent) {
      const BagdeComponent = badgeComponent
      return <BagdeComponent count={count} />
    }
    return <CountText style={style}>{count}</CountText>
  }
  return null
}

const CountText = styled.span`
  font-size: 10px;
  position: absolute;
  padding: 3px 6px;
  border-radius: 50%;
  background-color: red;
  color: white;
  text-align: center;
  display: inline-block;
  right: -3px;
  top: -7px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica,
    Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
`
