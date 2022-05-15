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

export function epochMilliseconds() {
  return Math.round(Date.now())
}

export const InboxContext = createContext({})

export function formatWorkspaceKey(str) {
  let newStr = ''
  for (let i = 0; i < str.length; i = i + 2) {
    newStr += str[i].toLowerCase()
  }
  return newStr
}
