import useTranslation from '../hooks/translation'

export default function Help() {
  const t = useTranslation()

  return (
    <div>
      <p>{t.commands}</p>
      <ul>
        {Object.entries(t.help).map(([key, value]) => (
          <li key={key}>
            {key} - {value}
          </li>
        ))}
      </ul>
    </div>
  )
}
