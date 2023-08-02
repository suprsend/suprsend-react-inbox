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
  if (link) {
    return link.startsWith('http') ? link : `https://${link}`
  }
}

export const markdownRenderer = ({ blockquoteColor }) => ({
  link(href, _, text) {
    return `<span>${text}</span>`
  },
  paragraph(text) {
    return `<p style="margin:0px;"}}>${text}</p>`
  },
  list(body, ordered) {
    if (ordered) {
      return `<ol style="white-space:normal;margin:0px;padding-left:10px;">${body}</ol>`
    } else {
      return `<ul style="white-space:normal;margin:0px;padding-left:10px">${body}</ul>`
    }
  },
  blockquote(src) {
    return `<blockquote style="margin:0px;padding-left:10px;border-left:3px ${blockquoteColor} solid;margin-top:5px; margin-bottom:5px;">${src}</blockquote>`
  }
})
