import { useStore } from './useStore';
import { useEffect } from 'react';

export const useIPCEvents = () => {
  const setMessageLog = useStore((state) => state.setMessageLog);
  const contentText = useStore((state) => state.contentText);
  const runToast = useStore((state) => state.runToast);
  const setIsRunning = useStore((state) => state.setIsRunning);

  const runMailer = (mailerArgs) => {
    window.electron.ipcRenderer.send('run-mailer', mailerArgs);
    setIsRunning(true);
    runToast('Bot started!');
  };

  const writeMailContentToTxt = () => {
    window.electron.ipcRenderer.send('save-data', contentText);
    runToast('Mail content saved!');
  };

  useEffect(() => {
    const handleMessage = (_event, arg) => {
      setMessageLog(arg);
    };

    const handleTrigger = (_event, arg) => {
      if (arg === 'mailSender-stop') {
        setIsRunning(false);
      }
    };

    const messageListener = window.electron.ipcRenderer.on('message', handleMessage);
    const triggerListener = window.electron.ipcRenderer.on('trigger', handleTrigger);

    return () => {
      messageListener();
      triggerListener();
    };
  }, []);

  return { runMailer, writeMailContentToTxt };
};
