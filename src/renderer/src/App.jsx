import Versions from './components/Versions';
import { useIPCEvents } from './hooks/useIPCEvents';
import ConsoleTextarea from './components/ConsoleTextarea';
import Settings from './components/Settings';
import Toast from './components/Toast';
import Selector from './components/Selector';
import { useStore } from './hooks/useStore';
import ShutdownToggle from './components/ShutdownToggle';
import MailContentSettings from './components/MailContentSettings';
import Button from './components/Button';
import BottomContainer from './components/BottomContainer';

function App() {
  const { runMailer, writeMailContentToTxt } = useIPCEvents();

  return (
    <div className="bg-fuchsia-300 p-2 flex flex-col items-center justify-center">
      <div className="max-w-3xl">
        <Selector />
        <MailContentSettings onSave={writeMailContentToTxt} />
        <Settings />
        <Versions></Versions>
        <Toast />
      </div>
      <BottomContainer runMailer={runMailer} />
    </div>
  );
}

export default App;
