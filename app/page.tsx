'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import useHistory from './hooks/history'

import Help from './commands/help'
import Banner from './commands/banner'
import About from './commands/about'
import Projects from './commands/projects'
import Sumfetch from './commands/sumfetch'
import { useLanguage } from './components/language-context'

const commands: { [key: string]: JSX.Element } = {
  help: <Help />,
  banner: <Banner />,
  whoami: <About />,
  projects: <Projects />,
  sumfetch: <Sumfetch />,
}

const actions: { [key: string]: () => Window | null } = {
  github: () => window.open('https://github.com/edulustosa', '_blank'),
  email: () => window.open('mailto:eduardolustosa26@gmail.com', '_blank'),
  linkedin: () =>
    window.open('https://www.linkedin.com/in/eduardolustosa/', '_blank'),
}

const autocompleteCommands = [
  ...Object.keys(commands),
  ...Object.keys(actions),
  'clear',
  'lang en',
  'lang pt-br',
].filter((command, index, list) => list.indexOf(command) === index)

const getLevenshteinDistance = (source: string, target: string) => {
  if (source === target) {
    return 0
  }

  if (source.length === 0) {
    return target.length
  }

  if (target.length === 0) {
    return source.length
  }

  const matrix = Array.from({ length: source.length + 1 }, () =>
    new Array(target.length + 1).fill(0),
  )

  for (let i = 0; i <= source.length; i += 1) {
    matrix[i][0] = i
  }

  for (let j = 0; j <= target.length; j += 1) {
    matrix[0][j] = j
  }

  for (let i = 1; i <= source.length; i += 1) {
    for (let j = 1; j <= target.length; j += 1) {
      const substitutionCost = source[i - 1] === target[j - 1] ? 0 : 1

      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + substitutionCost,
      )
    }
  }

  return matrix[source.length][target.length]
}

const getCommandScore = (query: string, command: string) => {
  if (command === query) {
    return 0
  }

  if (command.startsWith(query)) {
    return 0.1 + (command.length - query.length) / 100
  }

  if (command.includes(query)) {
    return 0.5 + command.indexOf(query) / 100
  }

  const queryTokens = query.split(/\s+/).filter(Boolean)
  const commandTokens = command.split(/\s+/).filter(Boolean)
  const fullDistance = getLevenshteinDistance(query, command)

  if (queryTokens.length === 0 || commandTokens.length === 0) {
    return fullDistance
  }

  const tokenDistance = Math.min(
    ...queryTokens.flatMap((queryToken) =>
      commandTokens.map((commandToken) =>
        getLevenshteinDistance(queryToken, commandToken),
      ),
    ),
  )

  return Math.min(fullDistance, tokenDistance + 1)
}

const getFuzzySuggestions = (query: string, limit = 6) => {
  if (!query) {
    return []
  }

  const maxDistance = Math.max(1, Math.floor(query.length * 0.5))

  const rankedCommands = autocompleteCommands
    .map((command) => ({
      command,
      score: getCommandScore(query, command),
    }))
    .sort((a, b) => a.score - b.score || a.command.length - b.command.length)

  return rankedCommands
    .filter(({ command, score }, index) => {
      const hasDirectMatch =
        command.startsWith(query) || command.includes(query)

      // Always keep the top match, then keep only reasonably close results.
      return hasDirectMatch || index === 0 || score <= maxDistance
    })
    .slice(0, limit)
    .map(({ command }) => command)
}

export default function Home() {
  const [cmd, setCommand] = useState('')
  const [bins, setBins] = useState<JSX.Element[]>([<Banner key={0} />])
  const [selectedSuggestion, setSelectedSuggestion] = useState(0)
  const { history, position, setHistory, setHistoryPosition } = useHistory()
  const { setLocale } = useLanguage()
  const inputRef = useRef<HTMLInputElement>(null)

  const normalizedInput = cmd.trim().toLowerCase()
  const suggestions = useMemo(() => {
    return getFuzzySuggestions(normalizedInput)
  }, [normalizedInput])

  useEffect(() => {
    setSelectedSuggestion(0)
  }, [normalizedInput])

  const autocompleteCommand = (command: string) => {
    setCommand(command)
    setSelectedSuggestion(0)
    inputRef.current?.focus()
  }

  const handleInput = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const normalizedCmd = cmd.trim().toLowerCase()

    if (!normalizedCmd) {
      setCommand('')
      return
    }

    setHistory((prev) => [...prev, normalizedCmd])

    if (normalizedCmd === 'clear') {
      setBins([])
      setCommand('')
      return
    }

    const [baseCommand, lang] = normalizedCmd.split(/\s+/)

    if (baseCommand === 'lang') {
      if (lang !== 'en' && lang !== 'pt-br') {
        setBins((prev) => [
          <p key={prev.length} className="text-main-orange">
            {'shell: invalid language. Use "lang en" or "lang pt-br".'}
          </p>,
          ...prev,
        ])
        setCommand('')
        return
      }

      setLocale(lang as 'en' | 'pt-br')
      setCommand('')
      return
    }

    const Command = commands[normalizedCmd]
    if (Command) {
      setBins((prev) => [Command, ...prev])
      setCommand('')
      return
    }

    const action = actions[normalizedCmd]
    if (action) {
      action()
      setCommand('')
      return
    }

    const closestCommand = getFuzzySuggestions(normalizedCmd, 1)[0]
    const suggestionMessage =
      closestCommand && closestCommand !== normalizedCmd
        ? ` Did you mean "${closestCommand}"?`
        : ''

    setBins((prev) => [
      <p key={prev.length} className="text-main-orange">
        shell: command not found: {normalizedCmd}. Try &apos;help&apos; to get
        started.
        {suggestionMessage}
      </p>,
      ...prev,
    ])
    setCommand('')
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Tab' && suggestions.length > 0) {
      event.preventDefault()
      autocompleteCommand(suggestions[selectedSuggestion] ?? suggestions[0])
      return
    }

    if (event.key !== 'ArrowUp' && event.key !== 'ArrowDown') {
      return
    }

    const canNavigateSuggestions =
      normalizedInput.length > 0 && suggestions.length > 0

    if (canNavigateSuggestions) {
      event.preventDefault()

      setSelectedSuggestion((prev) => {
        if (event.key === 'ArrowDown') {
          return prev === suggestions.length - 1 ? 0 : prev + 1
        }

        return prev === 0 ? suggestions.length - 1 : prev - 1
      })

      return
    }

    if (history.length === 0) {
      return
    }

    event.preventDefault()

    if (event.key === 'ArrowUp') {
      const nextPosition = Math.max(position - 1, 0)
      setHistoryPosition(nextPosition)
      setCommand(history[nextPosition] ?? '')
      return
    }

    const nextPosition = Math.min(position + 1, history.length)
    setHistoryPosition(nextPosition)
    setCommand(history[nextPosition] ?? '')
  }

  return (
    <main className="h-screen w-screen bg-background p-5 text-sm text-main-font-color shadow-lg shadow-background md:text-base lg:h-auto lg:w-3/5 lg:rounded-lg lg:text-base">
      <div className="mb-7 flex justify-center">
        <h1 className="text-secondary-font-color">terminal</h1>
      </div>

      <ul className="custom-scrollbar-hidden flex h-4/5 flex-col-reverse items-center gap-8 overflow-y-auto lg:h-[390px]">
        {bins.map((command, i) => (
          <li className="w-11/12" key={i}>
            {command}
          </li>
        ))}
      </ul>

      <div className="my-5 flex justify-center">
        <hr className="w-11/12 border-light-gray" />
      </div>

      <form onSubmit={handleInput}>
        <div className="flex gap-3">
          <span className="text-secondary-font-color">$</span>

          <input
            ref={inputRef}
            type="text"
            className="w-full bg-background caret-secondary-font-color outline-none"
            onKeyDown={handleKeyDown}
            value={cmd}
            onChange={(event) => setCommand(event.target.value)}
            autoFocus
            autoComplete="off"
            spellCheck="false"
          />
        </div>

        {normalizedInput.length > 0 && suggestions.length > 0 && (
          <div className="mt-3 pl-6">
            <p className="mb-2 text-xs text-main-font-color md:text-sm">
              Press Tab to autocomplete or click a command:
            </p>

            <ul className="flex flex-wrap gap-2">
              {suggestions.map((suggestion, index) => (
                <li key={suggestion}>
                  <button
                    type="button"
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => autocompleteCommand(suggestion)}
                    className={`rounded border px-2 py-1 text-xs transition-colors md:text-sm ${
                      index === selectedSuggestion
                        ? 'border-secondary-font-color text-secondary-font-color'
                        : 'border-light-gray text-main-font-color hover:border-main-orange hover:text-main-orange'
                    }`}
                  >
                    {suggestion}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </form>
    </main>
  )
}
