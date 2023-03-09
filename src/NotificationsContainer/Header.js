import React from 'react'
import styled from '@emotion/styled'
import { CText, lightColors } from '../utils/styles'
import { useTheme } from '../utils/context'

export default function Header() {
  const { header } = useTheme()

  return (
    <Container style={header?.container}>
      <HeaderText style={header?.headerText}>Notifications</HeaderText>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  padding: 14px;
  z-index: 1000;
  background-color: ${lightColors.main};
  border-bottom: 1px solid ${lightColors.border};
`
const HeaderText = styled(CText)`
  font-weight: 600;
`
