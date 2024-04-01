import Versions from './components/Versions'
import { useEffect, useState } from 'react'

function App() {
  const [dataLog, setDataLog] = useState([])
  console.log('dataLog', dataLog)
  const ipcHandle = () => window.electron.ipcRenderer.send('run-mailer')

  useEffect(() => {
    const handlePong = (event, arg) => {
      setDataLog((oldDataLog) => [...oldDataLog, arg])
    }

    const removePongListener = window.electron.ipcRenderer.on('message', handlePong)

    return () => {
      removePongListener()
    }
  }, [])

  return (
    <>
      <div className="actions">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={ipcHandle}
        >
          handle IPC
        </button>
      </div>
      <div className="flex flex-col items-center">
        {dataLog.map((dataItem, index) => (
          <span key={index}>{dataItem}</span>
        ))}
      </div>
      <Versions></Versions>
    </>
  )
}

export default App
