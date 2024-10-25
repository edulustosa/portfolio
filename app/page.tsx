'use client'

import { useState } from 'react'
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

export default function Home() {
  const [cmd, setCommand] = useState('')
  const [bins, setBins] = useState<JSX.Element[]>([<Banner key={0} />])
  const { history, position, setHistory, setHistoryPosition } = useHistory()
  const { setLocale } = useLanguage()

  const handleInput = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setHistory((prev) => [...prev, cmd])

    if (cmd === 'clear') {
      setBins([])
      setCommand('')
      return
    }

    if (cmd.startsWith('lang')) {
      const lang = cmd.split(' ')[1]
      if (lang !== 'en' && lang !== 'pt-br') {
        setBins((prev) => [
          <p key={prev.length} className="text-main-orange">
            shell: command not found: {cmd}. Try &apos;help&apos; to get
            started.
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

    const Command = commands[cmd]
    if (Command) {
      setBins((prev) => [Command, ...prev])
      setCommand('')
      return
    }

    const action = actions[cmd]
    if (action) {
      action()
      setCommand('')
      return
    }

    setBins((prev) => [
      <p key={prev.length} className="text-main-orange">
        shell: command not found: {cmd}. Try &apos;help&apos; to get started.
      </p>,
      ...prev,
    ])
    setCommand('')
  }

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault()

    if (e.key === 'ArrowUp') {
      setHistoryPosition(position - 1)
      setCommand(history[position])
    } else if (e.key === 'ArrowDown') {
      setHistoryPosition(position + 1)
      setCommand(history[position])
    }
  }

  return (
    <main className="w-3/5 rounded-lg bg-background p-5 text-main-font-color shadow-lg shadow-background">
      <div className="mb-7 flex justify-center">
        <h1 className="text-secondary-font-color">terminal</h1>
      </div>

      <ul className="custom-scrollbar-hidden flex h-[390px] max-h-[390px] flex-col-reverse items-center gap-8 overflow-y-auto">
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
            type="text"
            className="w-full bg-background caret-secondary-font-color outline-none"
            onKeyUp={handleKeyUp}
            value={cmd}
            onChange={(event) => setCommand(event.target.value)}
            autoFocus
            autoComplete="off"
            spellCheck="false"
          />
        </div>
      </form>
    </main>
  )
}
