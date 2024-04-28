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

function App() {
  const { runMailer, writeMailContentToTxt } = useIPCEvents();
  const selectedMailIndex = useStore((state) => state.selectedMailIndex);
  const shouldShutdown = useStore((state) => state.shouldShutdown);
  const mailTitle = useStore((state) => state.mailTitle);

  return (
    <div className="bg-fuchsia-300 p-2 flex justify-center">
      <div className="max-w-3xl">
        <div className="flex flex-col items-center justify-center p-4">
          <Button
            onClick={() => runMailer({ selectedMailIndex, shouldShutdown, mailTitle })}
            label="Start Mailbot"
            variant="green"
          />
        </div>
        <Selector />
        <ShutdownToggle shouldShutdown={shouldShutdown} />
        <MailContentSettings onSave={writeMailContentToTxt} />
        <ConsoleTextarea />
        <Settings />
        <Versions></Versions>
        <Toast />
      </div>
    </div>
  );
}

export default App;
