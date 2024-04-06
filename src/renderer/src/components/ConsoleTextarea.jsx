import { useStore } from '../hooks/useStore'
import { arrayToConsoleString } from '../utils/array-to-console-string'

function Textarea() {
  const messageLog = useStore((state) => state.messageLog)
  const log = arrayToConsoleString(messageLog)

  return (
    <textarea
      ref={(el) => {
        // Scroll to the bottom of the textarea
        if (el) {
          el.scrollTop = el.scrollHeight
        }
      }}
      className="mt-1 block w-full h-56 p-2.5 text-sm text-gray-900 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
      value={log}
      placeholder="idle..."
      readOnly
    />
  )
}

export default Textarea
