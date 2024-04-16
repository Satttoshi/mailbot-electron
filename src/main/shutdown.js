import { exec } from 'child_process';

export function shutdownComputer(log) {
  exec('shutdown /s /f /t 0', (error, stdout, stderr) => {
    if (error) {
      log(`exec shutdown error: ${error}`);
      return;
    }
    log(`stdout: ${stdout}`);
    log(`stderr: ${stderr}`);
  });
}
