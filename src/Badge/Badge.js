import React from 'react'
import styled from '@emotion/styled'
import { useInbox, useTheme } from '../utils/context'
import { lightColors, CText } from '../utils/styles'

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

const CountText = styled(CText)`
  position: absolute;
  right: -3px;
  top: -7px;
  display: inline-block;
  font-size: 10px;
  line-height: 1;
  padding: 3px 6px;
  border-radius: 50%;
  background-color: ${lightColors.primary};
  color: ${lightColors.main};
  text-align: center;
`
