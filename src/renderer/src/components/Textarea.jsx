import { useEffect } from 'react'
import { useStore } from '../hooks/useStore'

function Textarea() {
  const contentText = useStore((state) => state.contentText)
  const setContentText = useStore((state) => state.setContentText)

  useEffect(() => {
    const fetchFileContent = async () => {
      const fileContent = await window.api.readFile()
      setContentText(fileContent)
    }

    fetchFileContent().catch(console.error)
  }, [])

  function handleChange(event) {
    setContentText(event.target.value)
  }

  return (
    <textarea
      className="mt-1 block w-full p-2.5 text-sm text-gray-900 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
      value={contentText}
      onChange={handleChange}
      placeholder="Type something..."
    />
  )
}

export default Textarea
