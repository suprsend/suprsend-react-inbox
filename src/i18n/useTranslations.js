import { useCallback } from 'react'
import translations from './Languages'

const DEFAULT_LANG = 'en'

export const useTranslation = (language = DEFAULT_LANG) => {
  const t = useCallback(
    (key) => {
      return (
        translations[language]?.translations?.[key] ||
        translations[DEFAULT_LANG]?.translations?.[key]
      )
    },
    [language]
  )

  return { t, language }
}
