export function getStorageKey(str) {
  let newStr = ''
  for (let i = 0; i < str.length; i = i + 2) {
    newStr += str[i].toLowerCase()
  }
  return `_suprsend_inbox_${newStr}`
}

export function getStorageData(key) {
  try {
    const item = window.localStorage.getItem(key)
    if (item) {
      return JSON.parse(item)
    }
  } catch (error) {
    console.log('ERROR LOCAL_STORAGE:', error)
  }
}

export function setStorageData(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.log('ERROR LOCAL_STORAGE:', error)
  }
}

export function removeStorage(key) {
  try {
    window.localStorage.removeItem(key)
  } catch (error) {
    console.log('ERROR LOCAL_STORAGE:', error)
  }
}

function isObject(item) {
  return item && typeof item === 'object' && !Array.isArray(item)
}

export function mergeDeep(target, source) {
  const output = Object.assign({}, target)
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key) => {
      if (isObject(source[key])) {
        if (!(key in target)) Object.assign(output, { [key]: source[key] })
        else output[key] = mergeDeep(target[key], source[key])
      } else {
        Object.assign(output, { [key]: source[key] })
      }
    })
  }
  return output
}

export async function isImgUrl(url) {
  if (url) {
    const img = new window.Image()
    img.src = url
    return new Promise((resolve) => {
      img.onerror = () => resolve(false)
      img.onload = () => resolve(true)
    })
  }
}

export function formatActionLink(link) {
  if (!link) return
  if (link.startsWith('http') || link.startsWith('/')) {
    return link
  } else {
    return `https://${link}`
  }
}

export function getLongFormattedTime(value, unit) {
  switch (unit) {
    case 'second':
      return 'a minute'
    case 'minute':
      return value === 1 ? `${value} minute` : `${value} minutes`
    case 'hour':
      return value === 1 ? `${value} hour` : `${value} hours`
    case 'day':
      return value === 1 ? `${value} day` : `${value} days`
    case 'week':
      return value === 1 ? `${value} week` : `${value} weeks`
    case 'month':
      return value === 1 ? `${value} month` : `${value} months`
    case 'year':
      return value === 1 ? `${value} year` : `${value} years`
    default:
      return value
  }
}

export function getShortFormattedTime(value, unit) {
  switch (unit) {
    case 'second':
      return '1m'
    case 'minute':
      return `${value}m`
    case 'hour':
      return `${value}h`
    case 'day':
      return `${value}d`
    case 'week':
      return `${value}w`
    case 'month':
      return `${value}mo`
    case 'year':
      return `${value}y`
    default:
      return value
  }
}
