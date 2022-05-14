import config from '../config'

export function getNotifications({ distinctId, workspaceKey, after = 0 }) {
  return window.fetch(
    `${config.API_BASE_URL}/fetch?distinct_id=${distinctId}&after=${after}`,
    {
      method: 'GET',
      headers: {
        Authorization: workspaceKey + ':'
      }
    }
  )
}

export function markSeen(workspaceKey, body) {
  return window.fetch(`${config.CLICK_API_BASE_URL}/event/`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      'x-amz-date': new Date().toGMTString(),
      Authorization: workspaceKey + ':'
    }
  })
}
