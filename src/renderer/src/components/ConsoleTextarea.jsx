import { useStore } from '../hooks/useStore';
import { arrayToConsoleString } from '../utils/array-to-console-string';

function Textarea() {
  const messageLog = useStore((state) => state.messageLog);
  const log = arrayToConsoleString(messageLog);

  return (
    <textarea
      ref={(el) => {
        // Scroll to the bottom of the textarea
        if (el) {
          el.scrollTop = el.scrollHeight;
        }
      }}
      className="resize-none block w-full max-h-full p-2.5 text-sm text-white shadow-md bg-4 bg-clip-padding rounded transition ease-in-out m-0 focus:grey focus:bg-white focus:border-select focus:outline-none"
      value={log}
      placeholder="idle..."
      readOnly
    />
  );
}

export default Textarea;
