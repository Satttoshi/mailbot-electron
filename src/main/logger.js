let logger;

function createLogger(event) {
  return function log(message) {
    console.log(message);
    if (event?.sender) {
      event.sender.send('message', message);
    }
  };
}

export function initLogger(event) {
  logger = createLogger(event);
}

export function getLogger() {
  if (!logger) {
    throw new Error('Logger not initialized, call initLogger first.');
  }
  return logger;
}
