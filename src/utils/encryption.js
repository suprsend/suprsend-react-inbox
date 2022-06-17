function getUtf8Bytes(str) {
  return new Uint8Array(
    [...decodeURI(encodeURIComponent(str))].map((c) => c.charCodeAt(0))
  )
}

export default async function createSignature({
  workspaceSecret,
  date,
  method,
  body = '',
  route,
  contentType = ''
}) {
  if (!window.crypto) return
  const message = `${method}\n${body}\n${contentType}\n${date}\n${route}`
  const keyBytes = getUtf8Bytes(workspaceSecret)
  const messageBytes = getUtf8Bytes(message)
  const cryptoKey = await window.crypto.subtle.importKey(
    'raw',
    keyBytes,
    { name: 'HMAC', hash: 'SHA-256' },
    true,
    ['sign']
  )
  const sig = await window.crypto.subtle.sign('HMAC', cryptoKey, messageBytes)

  // to base64
  return window.btoa(String.fromCharCode(...new Uint8Array(sig)))
}
