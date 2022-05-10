/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import { useState } from 'react'
import { usePopper } from 'react-popper'
import Bell from './Bell'
import Badge from './Badge'
import Toaster from './Toast'
import NotificationContainer from './NotificationContainer'
import useClickOutside from './utils/useClickOutside'

const count = 5

function SuprsendInbox({
  children,
  toastProps,
  bellProps,
  badgeProps,
  headerProps,
  notificationProps
}) {
  const [isOpen, toggleOpen] = useState(false)
  const [referenceElement, setReferenceElement] = useState(null)
  const [popperElement, setPopperElement] = useState(null)
  const [arrowElement, setArrowElement] = useState(null)

  const NotificationBox = children ? children : NotificationContainer

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
        <Badge count={count} {...badgeProps} />
        <Bell {...bellProps} />
      </div>
      {isOpen && (
        <div
          ref={setPopperElement}
          style={styles.popper}
          {...attributes.popper}
        >
          <div ref={setArrowElement} style={arrowStyle} />
          <NotificationBox headerProps={headerProps} />
        </div>
      )}
      <Toaster {...toastProps} />
    </div>
  )
}

export default SuprsendInbox
