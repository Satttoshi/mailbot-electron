import { useEffect } from 'react';
import { useStore } from '../hooks/useStore';
import Button from './Button';

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
      <div className="flex-grow flex flex-col items-center justify-center mt-2">
        <label className="self-start block text-white text-sm font-bold mb-2">Content</label>
        <textarea
          className="resize-none w-full flex-grow p-2.5 text-sm text-gray-800 shadow-md bg-white border border-solid border-gray-300 rounded transition ease-in-out focus:border-blue-600 focus:outline-none"
          value={contentText}
          onChange={handleChange}
          placeholder="Type something..."
        />
        <Button className="mt-3" label="Save Content" variant="blue" onClick={onSave} />
      </div>
    </>
  );
}

export default Textarea;
