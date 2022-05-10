/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import { useState, useEffect } from 'react'
import { usePopper } from 'react-popper'
import Bell from './Bell'
import Badge from './Badge'
import Toaster, { toast } from './Toast'
import NotificationsContainer from './NotificationContainer'
import useClickOutside from './utils/useClickOutside'

const count = 5

function SuprsendInbox({ children }) {
  const [isOpen, toggleOpen] = useState(false)
  const [referenceElement, setReferenceElement] = useState(null)
  const [popperElement, setPopperElement] = useState(null)
  const [arrowElement, setArrowElement] = useState(null)

  const notificationBox = children ? children() : <NotificationsContainer />

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

  useEffect(() => {
    toast('call it buddy')
  }, [])

  useClickOutside({ current: popperElement }, () => {
    toggleOpen((prev) => !prev)
  })

  const arrowStyle = {
    ...styles.arrow,
    ...{
      width: 0,
      height: 0,
      borderLeft: '10px solid transparent',
      borderRight: '10px solid transparent',
      borderBottom: '10px solid white',
      top: -8
    }
  }

  return (
    <div
      css={css`
        position: relative;
        display: inline-block;
      `}
    >
      <div
        onClick={() => {
          toggleOpen((prev) => !prev)
        }}
        ref={setReferenceElement}
        css={css`
          position: relative;
          margin-top: 12px;
          margin-right: 12px;
          cursor: pointer;
        `}
      >
        <Badge count={count} />
        <Bell />
      </div>
      {isOpen && (
        <div
          ref={setPopperElement}
          style={styles.popper}
          {...attributes.popper}
        >
          <div ref={setArrowElement} style={arrowStyle} />
          {notificationBox}
        </div>
      )}
      <Toaster />
    </div>
  )
}

export default SuprsendInbox
