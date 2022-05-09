/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import NotificationList from '../Notifications/NotificationList'
import Header from './Header'

export default function NotificationContainer() {
  return (
    <div
      css={css`
        min-height: 100px;
        max-height: 500px;
        width: 350px;
        border-radius: 5px;
        background-color: '#fff';
        border: 1px solid #f0f0f0;
        display: inline-block;
        overflow: scroll;
        box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.2),
          0 6px 20px 0 rgba(0, 0, 0, 0.19);
      `}
    >
      <Header />
      <NotificationList />
    </div>
  )
}
