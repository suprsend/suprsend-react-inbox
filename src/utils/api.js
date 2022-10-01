import config from '../config'
import { epochNow, uuid, utcNow } from '../utils'
import createSignature from './encryption'

export async function getNotifications({
  subscriberId,
  workspaceKey,
  workspaceSecret,
  distinctId,
  after = 0
}) {
  const date = utcNow()
  const route = `/fetch/?subscriber_id=${subscriberId}&after=${after}&distinct_id=${distinctId}`
  const signature = await createSignature({
    workspaceSecret,
    date,
    method: 'GET',
    route
  })
  return window.fetch(`${config.API_BASE_URL}${route}`, {
    method: 'GET',
    headers: {
      Authorization: `${workspaceKey}:${signature}`,
      'x-amz-date': date
    }
  })
}

export async function markBellClicked({
  subscriberId,
  workspaceKey,
  workspaceSecret,
  distinctId
}) {
  const date = utcNow()
  const route = '/bell-clicked/'
  const body = JSON.stringify({
    time: epochNow(),
    distinct_id: distinctId,
    subscriber_id: subscriberId
  })
  const signature = await createSignature({
    workspaceSecret,
    date,
    route,
    method: 'POST',
    contentType: 'application/json',
    body
  })
  return window.fetch(`${config.API_BASE_URL}${route}`, {
    method: 'POST',
    body,
    headers: {
      Authorization: `${workspaceKey}:${signature}`,
      'x-amz-date': date
    }
  })
}

export function markClicked(workspaceKey, nId) {
  const body = {
    event: '$notification_clicked',
    env: workspaceKey,
    $insert_id: uuid(),
    $time: epochNow(),
    properties: { id: nId }
  }
  return window.fetch(`${config.COLLECTOR_API_BASE_URL}/event/`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      Authorization: `${workspaceKey}:`,
      'Content-Type': 'application/json',
      'x-amz-date': utcNow()
    }
  })
}
