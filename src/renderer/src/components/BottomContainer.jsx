import ConsoleTextarea from './ConsoleTextarea';
import Button from './Button';
import { useStore } from '../hooks/useStore';
import ShutdownToggle from './ShutdownToggle';
import Selector from './Selector';

const BottomContainer = ({ runMailer }) => {
  const selectedMailIndex = useStore((state) => state.selectedMailIndex);
  const shouldShutdown = useStore((state) => state.shouldShutdown);
  const mailTitle = useStore((state) => state.mailTitle);
  const isRunning = useStore((state) => state.isRunning);
  const mailList = useStore((state) => state.mailList);

  const mailerArgs = { selectedMailIndex, mailTitle, mailList };

  return (
    <div className="w-full h-full flex gap-4 bg-2 rounded p-4">
      <div className="flex flex-col gap-2">
        <Button
          onClick={() => runMailer(mailerArgs)}
          label="Start Mailbot"
          variant="green"
          loading={isRunning}
        />
        <Selector />
        <ShutdownToggle shouldShutdown={shouldShutdown} />
      </div>
      <ConsoleTextarea />
    </div>
  );
};

export default BottomContainer;
