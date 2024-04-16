import { useEffect } from 'react';
import { useStore } from '../hooks/useStore';

function Textarea({ onSave }) {
  const contentText = useStore((state) => state.contentText);
  const setContentText = useStore((state) => state.setContentText);

  useEffect(() => {
    const fetchFileContent = async () => {
      const fileContent = await window.api.readContentFile();
      setContentText(fileContent);
    };

    fetchFileContent().catch(console.error);
  }, []);

  function handleChange(event) {
    setContentText(event.target.value);
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <textarea
          className="mb-4 block w-full h-64 p-2.5 text-sm text-gray-800 shadow-md bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-blue-600 focus:outline-none"
          value={contentText}
          onChange={handleChange}
          placeholder="Type something..."
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={onSave}
        >
          update mail content
        </button>
      </div>
    </>
  );
}

export default Textarea;
