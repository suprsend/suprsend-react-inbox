import { createContext } from 'react'

export function uuid() {
  var dt = new Date().getTime()
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
    /[xy]/g,
    function (c) {
      var r = (dt + Math.random() * 16) % 16 | 0
      dt = Math.floor(dt / 16)
      return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16)
    }
  )
  return uuid
}

export function epochNow() {
  return Math.round(Date.now())
}

export function utcNow() {
  return new Date().toGMTString()
}

export const InboxContext = createContext({})

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
