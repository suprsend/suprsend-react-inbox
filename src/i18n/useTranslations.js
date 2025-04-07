import { useCallback, useContext, useMemo } from 'react'
import defaultTranslations from './Languages'
import { InboxContext } from '../utils/context'
import { mergeDeep } from '../utils'

const DEFAULT_LANG = 'en'

export const useTranslation = (language = DEFAULT_LANG) => {
  const { translations: propTranslations } = useContext(InboxContext)

  const allTranslations = useMemo(() => {
    if (!propTranslations || Object.keys(propTranslations).length === 0) {
      return defaultTranslations
    }
    return mergeDeep(defaultTranslations, propTranslations)
  }, [propTranslations])

  const t = useCallback(
    (key) => {
      return (
        allTranslations[language]?.translations?.[key] ||
        allTranslations[DEFAULT_LANG]?.translations?.[key]
      )
    },
    [language, allTranslations]
  )

  return { t, language }
}
