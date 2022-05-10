/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import { useState } from 'react'
import { usePopper } from 'react-popper'
import useClickOutside from '../utils/useClickOutside'
import MenuIcon from './MenuIcon'

export default function Notification({ notificationData, isRead = true }) {
  const [openMenu, toggleMenu] = useState(false)
  const [referenceElement, setReferenceElement] = useState(null)
  const [popperElement, setPopperElement] = useState(null)

  useClickOutside({ current: popperElement }, () => {
    toggleMenu((prev) => !prev)
  })

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'left'
  })

  return (
    <div
      css={css`
        padding: 7px 14px;
        border-radius: 5px;
        cursor: pointer;
        &:hover {
          background-color: #f0f0f0;
        }
      `}
    >
      <div
        css={css`
          display: flex;
          align-items: center;
          flexdirection: row;
        `}
      >
        <div
          css={css`
            flex: 1;
            margin-right: 15px;
          `}
        >
          <p
            css={css`
              font-size: 16px;
              margin: 10px 0px;
            `}
          >
            {notificationData.header}
          </p>
          <p
            css={css`
              font-size: 14px;
              margin: 10px 0px;
            `}
          >
            {notificationData.text}
          </p>
          {notificationData.button && (
            <p
              css={css`
                background-color: #358adf;
                color: #fff;
                border-radius: 5px;
                text-align: center;
                margin: 10px 0px;
                padding: 1px 0px;
                font-size: 14px;
              `}
              onClick={(e) => {
                e.stopPropagation()
                console.log('button clicked')
                // redirect to notificationData.url
              }}
            >
              {notificationData.button}
            </p>
          )}
        </div>
        <div
          css={css`
            display: flex;
            align-items: center;
            flex-direction: row;
          `}
        >
          {!isRead ? (
            <div
              css={css`
                margin-left: 10px;
              `}
            >
              <div
                css={css`
                  background: #358adf;
                  border-radius: 50%;
                  width: 6px;
                  height: 6px;
                `}
              />
            </div>
          ) : (
            <div
              css={css`
                position: relative;
              `}
            >
              <div
                ref={setReferenceElement}
                onClick={(e) => {
                  e.stopPropagation()
                  toggleMenu((prev) => !prev)
                }}
              >
                <MenuIcon />
              </div>
              {openMenu && (
                <div
                  css={css`
                    background-color: #fff;
                    position: absolute;
                    border: 1px solid #f0f0f0;
                    border-radius: 5px;
                    box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.2),
                      0 6px 20px 0 rgba(0, 0, 0, 0.19);
                  `}
                  ref={setPopperElement}
                  style={styles.popper}
                  {...attributes.popper}
                  onClick={(e) => {
                    e.stopPropagation()
                    console.log('Mark as unread')
                  }}
                  onMouseLeave={(e) => {
                    e.stopPropagation()
                    toggleMenu(false)
                  }}
                >
                  <p
                    css={css`
                      font-size: 12px;
                      padding: 6px;
                      width: 100%;
                      margin: 0px;
                    `}
                  >
                    UnRead
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <p
        css={css`
          font-size: 12px;
          margin: 0px;
          color: #2c394b;
        `}
      >
        Yesterday at 2:35pm
      </p>
    </div>
  )
}
