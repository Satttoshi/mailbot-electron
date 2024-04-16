import { useStore } from '../hooks/useStore';

const Selector = () => {
  const mailNames = useStore((state) => state.mailNames);
  const selectedMailIndex = useStore((state) => state.selectedMailIndex);
  const setSelectedMailIndex = useStore((state) => state.setSelectedMailIndex);

  return (
    <div className="flex flex-row gap-4 items-center justify-center py-4 flex-wrap">
      {mailNames.map((element, index) => (
        <button
          key={index}
          className={`border-2 ${
            selectedMailIndex === index
              ? 'border-blue-500 bg-purple-950 text-white'
              : 'text-white border-gray-300 bg-purple-900'
          } px-4 py-2 rounded hover:bg-purple-950 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
          onClick={() => setSelectedMailIndex(index)}
        >
          {element}
        </button>
      ))}
    </div>
  );
};

export default Selector;
