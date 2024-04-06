import Versions from './components/Versions'
import { useIPCEvents } from './hooks/useIPCEvents'
import Textarea from './components/Textarea'
import ConsoleTextarea from './components/ConsoleTextarea'
import Settings from './components/Settings'
import Toast from './components/Toast'
import Selector from './components/Selector'
import { useStore } from './hooks/useStore'

function App() {
  const { runMailer, writeMailContentToTxt } = useIPCEvents()
  const selectedIndex = useStore((state) => state.selectedIndex)

  return (
    <div className="bg-fuchsia-300 p-2 flex justify-center">
      <div className="max-w-3xl">
        <div className="flex flex-col items-center justify-center p-4">
          <button
            className="bg-green-500 hover:bg-green-700 text-neutral-900 font-bold py-2 px-4 rounded"
            onClick={() => runMailer(selectedIndex)}
          >
            Start Mailbot
          </button>
        </div>
        <Selector />
        <Textarea onSave={writeMailContentToTxt} />
        <ConsoleTextarea />
        <Settings />
        <Versions></Versions>
        <Toast />
      </div>
    </div>
  )
}

export default App
