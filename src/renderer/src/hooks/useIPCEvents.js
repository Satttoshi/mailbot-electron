import { useStore } from './useStore'
import { useEffect } from 'react'

export const useIPCEvents = () => {
  const setMessageLog = useStore((state) => state.setMessageLog)
  const contentText = useStore((state) => state.contentText)
  const runMailer = () => window.electron.ipcRenderer.send('run-mailer')
  const writeMailContentToTxt = () => window.electron.ipcRenderer.send('save-data', contentText)

  useEffect(() => {
    const handleMessage = (event, arg) => {
      setMessageLog(arg)
    }

    const removePongListener = window.electron.ipcRenderer.on('message', handleMessage)

    return () => {
      removePongListener()
    }
  }, [])

  return { runMailer, writeMailContentToTxt }
}
