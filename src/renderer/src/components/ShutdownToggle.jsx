import { useStore } from '../hooks/useStore'

const ShutdownToggle = ({ shouldShutdown }) => {
  const toggleShouldShutdown = useStore((state) => state.toggleShouldShutdown)

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex items-center justify-between w-full max-w-xs px-6 py-2 mb-4 bg-purple-900 shadow-lg rounded-md">
        <label className="font-medium text-white">should computer shutdown?</label>
        <button
          onClick={toggleShouldShutdown}
          className={`${
            shouldShutdown ? 'bg-blue-500' : 'bg-neutral-800'
          } ml-4 relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50`}
        >
          <span
            className={`${
              shouldShutdown ? 'translate-x-6' : 'translate-x-1'
            } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
          />
        </button>
      </div>
    </div>
  )
}

export default ShutdownToggle
