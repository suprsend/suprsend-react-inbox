import config from '../config'
import { epochMilliseconds, uuid } from '../utils'
import createSignature from './encryption'

export async function getNotifications({
  subscriberId,
  workspaceKey,
  workspaceSecret,
  after = 0
}) {
  const requestedDate = new Date().toGMTString()
  const requestPath = `/fetch/?subscriber_id=${subscriberId}&after=${after}`
  const signature = await createSignature({
    workspaceSecret,
    date: requestedDate,
    method: 'GET',
    body: '',
    route: requestPath
  })
  return window.fetch(`${config.API_BASE_URL}${requestPath}`, {
    method: 'GET',
    headers: {
      Authorization: `${workspaceKey}:${signature}`,
      'x-amz-date': requestedDate
    }
  })
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
