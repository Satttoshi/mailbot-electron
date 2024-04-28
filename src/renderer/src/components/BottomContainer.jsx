import ConsoleTextarea from './ConsoleTextarea';
import Button from './Button';
import { useStore } from '../hooks/useStore';
import ShutdownToggle from './ShutdownToggle';

const BottomContainer = ({ runMailer }) => {
  const selectedMailIndex = useStore((state) => state.selectedMailIndex);
  const shouldShutdown = useStore((state) => state.shouldShutdown);
  const mailTitle = useStore((state) => state.mailTitle);

  return (
    <div className="w-full h-full flex gap-4 bg-purple-300 rounded p-4">
      <div className="flex flex-col gap-2">
        <Button
          onClick={() => runMailer({ selectedMailIndex, shouldShutdown, mailTitle })}
          label="Start Mailbot"
          variant="green"
        />
        <ShutdownToggle shouldShutdown={shouldShutdown} />
      </div>
      <ConsoleTextarea />
    </div>
  );
};

export default BottomContainer;
