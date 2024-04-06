import { useStore } from './useStore'
import { useEffect } from 'react'

export const useIPCEvents = () => {
  const setMessageLog = useStore((state) => state.setMessageLog)
  const ipcHandle = () => window.electron.ipcRenderer.send('run-mailer')

  useEffect(() => {
    const handlePong = (event, arg) => {
      setMessageLog(arg)
    }

    const removePongListener = window.electron.ipcRenderer.on('message', handlePong)

    return () => {
      removePongListener()
    }
  }, [])

  return { ipcHandle }
}
