import Versions from './components/Versions'
import { useStore } from './hooks/useStore'
import { useIPCEvents } from './hooks/useIPCEvents'

function App() {
  const { ipcHandle } = useIPCEvents()
  const messageLog = useStore((state) => state.messageLog)

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
        {messageLog.map((dataItem, index) => (
          <span key={index}>{dataItem}</span>
        ))}
      </div>
      <Versions></Versions>
    </>
  )
}

export default App
