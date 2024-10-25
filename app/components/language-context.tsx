'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'

interface LanguageContextProps {
  locale: string
  setLocale: (locale: string) => void
}

const LanguageContext = createContext<LanguageContextProps | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState('en')

  return (
    <LanguageContext.Provider value={{ locale, setLocale }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
