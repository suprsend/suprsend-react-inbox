import { useCallback, useContext } from 'react'
import allLanguages from './Languages'
import { InboxContext } from '../utils/context'

const DEFAULT_LANG = 'en'

export const useTranslation = (language = DEFAULT_LANG) => {
  const { translations } = useContext(InboxContext)

  const t = useCallback(
    (key) => {
      const finalLanguage =
        language && language in allLanguages ? language : DEFAULT_LANG

      return (
        translations?.[key] ||
        allLanguages?.[finalLanguage]?.translations?.[key] ||
        allLanguages[DEFAULT_LANG]?.translations?.[key]
      )
    },
    [language, translations]
  )

  return { t, language }
}
