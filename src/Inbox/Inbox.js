import React, { useState } from 'react'
import { usePopper } from 'react-popper'
import styled from '@emotion/styled'
import Bell from '../Bell'
import Badge from '../Badge'
import NotificationsContainer from '../NotificationsContainer'
import useClickOutside from '../utils/useClickOutside'
import { useInbox } from '../utils/context'

export default function Inbox() {
  const [referenceElement, setReferenceElement] = useState(null)
  const [popperElement, setPopperElement] = useState(null)
  const [arrowElement, setArrowElement] = useState(null)
  const {
    toggleInbox,
    setNotificationsData,
    headerProps,
    openInbox,
    notificationContainerProps
  } = useInbox()
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'bottom',
    modifiers: [
      { name: 'arrow', options: { element: arrowElement } },
      {
        name: 'offset',
        options: {
          offset: [0, 5]
        }
      }
    ]
  })
  useClickOutside({ current: popperElement }, () => {
    toggleInbox((prev) => !prev)
  })

  const handleBellClick = () => {
    setNotificationsData((prev) => ({ ...prev, count: 0 }))
    toggleInbox((prev) => !prev)
  }

  const arrowStyle = {
    ...styles.arrow,
    ...{
      width: 0,
      height: 0,
      borderLeft: '10px solid transparent',
      borderRight: '10px solid transparent',
      borderBottom: '10px solid white',
      top: -8,
      borderBottomColor: headerProps?.containerStyle?.backgroundColor || 'white'
    }
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
          <div ref={setArrowElement} style={arrowStyle} />
          <NotificationsContainer
            headerProps={headerProps}
            notificationContainerProps={notificationContainerProps}
          />
        </div>
      )}
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  display: inline-block;
  background-color: transparent;
`
const BellContainer = styled.div`
  position: relative;
  margin-top: 12px;
  margin-right: 12px;
  cursor: pointer;
`
