import React from 'react'
import styled from '@emotion/styled'
import { HeadingText } from '../utils/styles'

export default function Header({ containerStyle = {}, headerTextStyle = {} }) {
  return (
    <Container style={containerStyle}>
      <HeadingText style={headerTextStyle}>Notifications</HeadingText>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  background-color: #fff;
  padding: 12px;
  border-bottom: 1px solid #f0f0f0;
  z-index: 1000;
`
