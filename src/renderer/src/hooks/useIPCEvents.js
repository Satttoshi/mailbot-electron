import { useStore } from './useStore';
import { useEffect } from 'react';

export const useIPCEvents = () => {
  const setMessageLog = useStore((state) => state.setMessageLog);
  const contentText = useStore((state) => state.contentText);
  const runToast = useStore((state) => state.runToast);
  const setIsRunning = useStore((state) => state.setIsRunning);
  const updateMailSendStatus = useStore((state) => state.updateMailSendStatus);
  const shouldShutdown = useStore((state) => state.shouldShutdown);

  const runMailer = (mailerArgs) => {
    window.electron.ipcRenderer.send('run-mailer', mailerArgs);
    setIsRunning(true);
    runToast('Bot started!');
  };

  const writeMailContentToTxt = () => {
    window.electron.ipcRenderer.send('save-data', contentText);
    localStorage.setItem('mailContent', contentText);
    runToast('Mail content saved!');
  };

  useEffect(() => {
    const handleMessage = (_event, arg) => {
      setMessageLog(arg);
    };

    const handleTrigger = (_event, args) => {
      if (args.trigger.message === 'mailSender-stop') {
        setIsRunning(false);
        if (shouldShutdown) {
          window.electron.ipcRenderer.send('shutdown');
        }
      }
      if (args.trigger.message === 'mailSent') {
        updateMailSendStatus(args.trigger.mail);
      }
    };

    const messageListener = window.electron.ipcRenderer.on('message', handleMessage);
    const triggerListener = window.electron.ipcRenderer.on('trigger', handleTrigger);

    return () => {
      messageListener();
      triggerListener();
    };
  }, [shouldShutdown]);

  return { runMailer, writeMailContentToTxt };
};
