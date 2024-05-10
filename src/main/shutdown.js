import { exec } from 'child_process';
import { getEventSender, initEventSender } from './event-sender';
import { delay } from '../utils/delay';
import { is } from '@electron-toolkit/utils';

function shutdownComputer(log) {
  if (is.dev) {
    log('Dev Mode: Would have shut down the computer now');
    return;
  }
  delay(5000).then(() => {
    log('Gute Nacht! Shutting down...');
    exec('shutdown /s /f /t 0', (error, stdout, stderr) => {
      if (error) {
        log(`exec shutdown error: ${error}`);
        return;
      }
      log(`stdout: ${stdout}`);
      log(`stderr: ${stderr}`);
    });
  });
}

export function shutdown(event) {
  console.log('Shutting down...');
  initEventSender(event);
  shutdownComputer(getEventSender());
}
