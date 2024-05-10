import { useStore } from '../hooks/useStore';
import Button from './Button';

function Textarea({ onSave }) {
  const content = useStore((state) => state.contentText);
  const setContentText = useStore((state) => state.setContentText);
  const initialData = useStore((state) => state.initialData);

  const isChanging = content !== initialData.contentSettings.contentText;

  function handleChange(event) {
    setContentText(event.target.value);
  }

  return (
    <>
      <div className="flex-grow flex flex-col items-center justify-center mt-2 pb-3">
        <label className="self-start text-white text-sm font-bold mb-2 w-full flex justify-between">
          Content
          {isChanging && (
            <span className="text-error-lighten font-light italic">
              changes detected, save changes!
            </span>
          )}
        </label>

        <textarea
          className="resize-none w-full flex-grow p-2.5 text-sm text-grey shadow-md bg-white border border-solid border-grey rounded transition ease-in-out focus:border-select focus:outline-none"
          value={content}
          onChange={handleChange}
          placeholder="Type something..."
        />
        <Button className="mt-3" label="Save Changes" variant="blue" onClick={onSave} />
      </div>
    </>
  );
}

export default Textarea;
