import { useStore } from '../hooks/useStore';

const ShutdownToggle = ({ shouldShutdown }) => {
  const toggleShouldShutdown = useStore((state) => state.toggleShouldShutdown);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-2 pt-2 pb-3 w-full max-w-xs bg-purple-900 shadow-lg rounded">
        <label className="font-medium text-white whitespace-nowrap">shutdown?</label>
        <div className="flex gap-2">
          <button
            onClick={toggleShouldShutdown}
            className={`${
              shouldShutdown ? 'bg-blue-500' : 'bg-neutral-800'
            } relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50`}
          >
            <span
              className={`${
                shouldShutdown ? 'translate-x-6' : 'translate-x-1'
              } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
            />
          </button>
          <span className="text-white w-7">{shouldShutdown ? 'yes' : 'no'}</span>
        </div>
      </div>
    </div>
  );
};

export default ShutdownToggle;
