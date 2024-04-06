import { useStore } from '../hooks/useStore'

const Selector = () => {
  const mailNames = useStore((state) => state.mailNames)

  const selectedIndex = useStore((state) => state.selectedIndex)
  const setSelectedIndex = useStore((state) => state.setSelectedIndex)

  return (
    <div className="flex flex-row gap-4 items-center justify-center py-4 flex-wrap">
      {mailNames.map((element, index) => (
        <button
          key={index}
          className={`border-2 ${
            selectedIndex === index
              ? 'border-blue-500 bg-purple-950 text-white'
              : 'text-white border-gray-300 bg-purple-900'
          } px-4 py-2 rounded hover:bg-purple-950 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
          onClick={() => setSelectedIndex(index)}
        >
          {element}
        </button>
      ))}
    </div>
  )
}

export default Selector
