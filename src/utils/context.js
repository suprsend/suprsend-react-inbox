import { createContext, useContext } from 'react'

export const InboxContext = createContext({})
export const InboxThemeContext = createContext({})

export function useInbox() {
  return useContext(InboxContext)
}

export function useTheme() {
  return useContext(InboxThemeContext)
}
