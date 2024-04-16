import { useStore } from './useStore';
import { useEffect } from 'react';

export const useIPCEvents = () => {
  const setMessageLog = useStore((state) => state.setMessageLog);
  const contentText = useStore((state) => state.contentText);
  const runToast = useStore((state) => state.runToast);

  const runMailer = ({ selectedMailIndex, shouldShutdown }) => {
    window.electron.ipcRenderer.send('run-mailer', { selectedMailIndex, shouldShutdown });
    runToast('Bot started!');
  };

  const writeMailContentToTxt = () => {
    window.electron.ipcRenderer.send('save-data', contentText);
    runToast('Mail content saved!');
  };

  useEffect(() => {
    const handleMessage = (event, arg) => {
      setMessageLog(arg);
    };

    const removePongListener = window.electron.ipcRenderer.on('message', handleMessage);

    return () => {
      removePongListener();
    };
  }, []);

  return { runMailer, writeMailContentToTxt };
};
