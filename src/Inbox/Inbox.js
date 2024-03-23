import React, { useState } from 'react'
import { usePopper } from 'react-popper'
import styled from '@emotion/styled'
import Bell from '../Bell'
import Badge from '../Badge'
import NotificationsContainer from '../NotificationsContainer'
import useClickOutside from '../utils/useClickOutside'
import { useInbox, useTheme } from '../utils/context'
import { lightColors } from '../utils/styles'

function getArrowComponent(popperPosition = 'bottom') {
  switch (popperPosition) {
    case 'bottom':
      return ArrowTop
    case 'top':
      return ArrowBottom
    case 'right':
      return ArrowLeft
    case 'left':
      return ArrowRight
    default:
      return ArrowTop
  }
}

export default function Inbox({ openInbox, toggleInbox, popperPosition }) {
  const [referenceElement, setReferenceElement] = useState(null)
  const [popperElement, setPopperElement] = useState(null)
  const [arrowElement, setArrowElement] = useState(null)
  const { setNotificationsData } = useInbox()
  const { header, notificationsContainer } = useTheme()
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: popperPosition,
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

  const popperArrowPosition = attributes.popper?.['data-popper-placement']
  const PopperArrowComponent = getArrowComponent(popperArrowPosition)
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
          <PopperArrowComponent
            popperPosition={popperArrowPosition}
            ref={setArrowElement}
            style={styles.arrow}
            customStyles={{
              backgroundColor: header?.container?.backgroundColor,
              borderColor: notificationsContainer?.container?.borderColor
            }}
          />
          <NotificationsContainer />
        </div>
      )}
    </Container>
  )
}
const ArrowTop = styled.div`
  width: 0;
  height: 0;
  border-bottom: ${(props) =>
    `solid 10px ${props?.customStyles?.borderColor || lightColors.border}`};
  border-left: solid 10px transparent;
  border-right: solid 10px transparent;
  top: -8px;
  &:before {
    content: '';
    width: 0;
    height: 0;
    border-bottom: ${(props) =>
      `solid 12px ${props?.customStyles?.backgroundColor || lightColors.main}`};
    border-left: solid 12px transparent;
    border-right: solid 12px transparent;
    position: absolute;
    left: -12px;
    top: 1.5px;
  }
`

const ArrowBottom = styled.div`
  width: 0;
  height: 0;
  border-top: ${(props) =>
    `solid 8px ${props?.customStyles?.borderColor || lightColors.border}`};
  border-left: solid 8px transparent;
  border-right: solid 8px transparent;
  float: left;
  bottom: -6px;
  &:before {
    content: '';
    width: 0;
    height: 0;
    border-top: ${(props) =>
      `solid 10px ${props?.customStyles?.backgroundColor || lightColors.main}`};
    border-left: solid 10px transparent;
    border-right: solid 10px transparent;
    position: absolute;
    left: -10px;
    bottom: 1.2px;
  }
`

const ArrowLeft = styled.div`
  left: 16px;
  &:before {
    content: '';
    height: 0;
    width: 0;
    right: 100%;
    top: 50%;
    border: solid transparent;
    position: absolute;
    border-color: rgba(121, 141, 153, 0);
    border-right-color: ${(props) =>
      `${props?.customStyles?.borderColor || lightColors.border}`};
    border-width: 10px;
    margin-top: -10px;
  }
  &:after {
    content: '';
    height: 0;
    width: 0;
    right: 100%;
    top: 50%;
    border: solid transparent;
    position: absolute;
    border-color: rgba(255, 255, 255, 0);
    border-right-color: ${(props) =>
      `${props?.customStyles?.backgroundColor || lightColors.main}`};
    border-width: 8px;
    margin-top: -8px;
  }
`

const ArrowRight = styled.div`
  right: -5px;
  &:before {
    content: '';
    height: 0;
    width: 0;
    right: 100%;
    top: 50%;
    border: solid transparent;
    position: absolute;
    border-color: rgba(121, 141, 153, 0);
    border-left-color: ${(props) =>
      `${props?.customStyles?.borderColor || lightColors.border}`};
    border-width: 10px;
    margin-top: -10px;
    right: 1px;
  }
  &:after {
    content: '';
    height: 0;
    width: 0;
    right: 100%;
    top: 50%;
    border: solid transparent;
    position: absolute;
    border-color: rgba(255, 255, 255, 0);
    border-left-color: ${(props) =>
      `${props?.customStyles?.backgroundColor || lightColors.main}`};
    border-width: 8px;
    margin-top: -8px;
    right: 5px;
  }
`

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
