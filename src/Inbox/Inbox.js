import React, { useState } from 'react'
import { usePopper } from 'react-popper'
import styled from '@emotion/styled'
import Bell from '../Bell'
import Badge from '../Badge'
import NotificationsContainer from '../NotificationsContainer'
import useClickOutside from '../utils/useClickOutside'
import { useInbox } from '../utils/context'

export default function Inbox({ openInbox, toggleInbox, popperPosition }) {
  const [referenceElement, setReferenceElement] = useState(null)
  const [popperElement, setPopperElement] = useState(null)

  const { setNotificationsData } = useInbox()

  useClickOutside({ current: popperElement }, () => {
    toggleInbox((prev) => !prev)
  })

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: popperPosition,
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 5]
        }
      }
    ]
  })

  const handleBellClick = () => {
    setNotificationsData((prev) => ({ ...prev, count: 0 }))
    toggleInbox((prev) => !prev)
  }

  return (
    <Container>
      <BellContainer onClick={handleBellClick} ref={setReferenceElement}>
        <Badge />
        <Bell />
      </BellContainer>
      {openInbox && (
        <div
          ref={setPopperElement}
          style={{ ...styles.popper, zIndex: 999 }}
          {...attributes.popper}
        >
          <NotificationsContainer />
        </div>
      )}
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  display: inline-block;
  background-color: transparent;
  line-height: 1;
`

const BellContainer = styled.div`
  position: relative;
  margin-top: 12px;
  margin-right: 12px;
  cursor: pointer;
`
