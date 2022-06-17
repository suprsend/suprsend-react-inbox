import config from '../config'
import { epochMilliseconds, uuid } from '../utils'
import createSignature from './encryption'

export async function getNotifications({
  distinctId,
  workspaceKey,
  workspaceSecret,
  after = 0
}) {
  const requestedDate = new Date().toGMTString()
  const body = JSON.stringify({ distinct_id: distinctId, env: workspaceKey })
  const signature = await createSignature({
    workspaceSecret,
    date: requestedDate,
    method: 'GET',
    body,
    route: '/fetch/'
  })
  return window.fetch(
    `${config.API_BASE_URL}/fetch/?distinct_id=${distinctId}&after=${after}`,
    {
      method: 'GET',
      headers: {
        Authorization: `${workspaceKey}:${signature}`
      }
    }
  )
}

export function markSeen(workspaceKey, nId) {
  const body = {
    event: '$notification_clicked',
    env: workspaceKey,
    $insert_id: uuid(),
    $time: epochMilliseconds(),
    properties: { id: nId }
  }
  return window.fetch(`${config.CLICK_API_BASE_URL}/event/`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      'x-amz-date': new Date().toGMTString()
    }
  })
}
