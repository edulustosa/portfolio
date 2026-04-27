import { useEffect, useState } from 'react'

export default function useHistory() {
  const [history, setHistory] = useState<string[]>([])
  const [position, setPosition] = useState(0)

  useEffect(() => setPosition(history.length), [history])

  const setHistoryPosition = (newPosition: number) => {
    if (newPosition >= 0 && newPosition <= history.length) {
      setPosition(newPosition)
    }
  }

  return {
    history,
    position,
    setHistory,
    setHistoryPosition,
  }
}
