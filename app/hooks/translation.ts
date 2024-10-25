import { useLanguage } from '../components/language-context'
import en from '../locales/en.json'
import pt from '../locales/pt-br.json'

const translations = { en, 'pt-br': pt }

export default function useTranslation() {
  const { locale } = useLanguage()
  const t = translations[locale as keyof typeof translations]

  return t
}
