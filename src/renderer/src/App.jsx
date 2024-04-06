import Versions from './components/Versions'
import { useIPCEvents } from './hooks/useIPCEvents'
import Textarea from './components/Textarea'
import ConsoleTextarea from './components/ConsoleTextarea'
import Settings from './components/Settings'

function App() {
  const { runMailer, writeMailContentToTxt } = useIPCEvents()

  return (
    <>
      <div className="actions">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={runMailer}
        >
          run mailer
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={writeMailContentToTxt}
        >
          write txt
        </button>
      </div>
      <Textarea />
      <ConsoleTextarea />
      <Settings />
      <Versions></Versions>
    </>
  )
}

export default App
