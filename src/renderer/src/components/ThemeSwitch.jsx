import Button from './Button';
import { useStore } from '../hooks/useStore';

const availableThemes = ['default', 'theme2', 'theme3'];

const ThemeSwitch = () => {
  const setTheme = useStore((state) => state.setTheme);
  const theme = useStore((state) => state.theme);

  function cycleThemes() {
    const currentIndex = availableThemes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % availableThemes.length;
    setTheme(availableThemes[nextIndex]);
  }

  return (
    <div className="my-10 w-full px-4 flex justify-between items-end">
      <div className="flex-grow flex-row overflow-hidden mr-4">
        <label className="block text-white text-sm font-bold mb-2">Theme:</label>
        <div className="w-full flex border-2 rounded hover:cursor-pointer" onClick={cycleThemes}>
          <div className="flex-grow h-10 bg-black"></div>
          <div className="flex-grow h-10 bg-dark"></div>
          <div className="flex-grow h-10 bg-grey"></div>
          <div className="flex-grow h-10 bg-lightgrey"></div>
          <div className="flex-grow h-10 bg-white"></div>
          <div className="flex-grow h-10 bg-1"></div>
          <div className="flex-grow h-10 bg-2"></div>
          <div className="flex-grow h-10 bg-3"></div>
          <div className="flex-grow h-10 bg-4"></div>
          <div className="flex-grow h-10 bg-select"></div>
          <div className="flex-grow h-10 bg-select-darken"></div>
          <div className="flex-grow h-10 bg-start"></div>
          <div className="flex-grow h-10 bg-start-running"></div>
          <div className="flex-grow h-10 bg-start-darken"></div>
          <div className="flex-grow h-10 bg-error-lighten"></div>
          <div className="flex-grow h-10 bg-error"></div>
          <div className="flex-grow h-10 bg-error-darken"></div>
        </div>
      </div>
      <Button className="h-11" variant="blue" label="change!" type="button" onClick={cycleThemes} />
    </div>
  );
};

export default ThemeSwitch;
