import React from 'react'
import styled from '@emotion/styled'
import { CText, lightColors } from '../utils/styles'

export default function Footer() {
  return (
    <Container>
      <img
        src={require('./assets/SuprSendLogo.png')}
        alt='suprsend'
        height={18}
        width={18}
      />
      <PoweredByText>
        Powered by{' '}
        <SuprSendText href='https://suprsend.com'>SuprSend</SuprSendText>
      </PoweredByText>
    </Container>
  )
}

const Container = styled.div`
  position: absolute;
  bottom: 4px;
  right: 16px;
  left: 16px;
  padding: 5px;
  z-index: 1000;
  background-color: ${lightColors.main};
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.1);
  cursor: default;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  @media (max-width: 425px) {
    right: 1px;
    left: 1px;
    border-radius: 0px;
  }
`

const PoweredByText = styled(CText)`
  font-size: 12px;
  color: ${lightColors.secondaryText};
  margin-left: 5px;
`

const SuprSendText = styled.a`
  font-size: 12px;
  color: ${lightColors.secondaryText};
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`
