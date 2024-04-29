let eventSender;

function createEventSender(event) {
  return function sendEvent(message) {
    console.log(message);
    // if Object has trigger property, send trigger event to renderer
    if (typeof message === 'object' && message.trigger) {
      if (event?.sender) {
        event.sender.send('trigger', message.trigger);
      }
      // else send message to renderer
    } else {
      if (event?.sender) {
        event.sender.send('message', message);
      }
    }
  };
}

export function initEventSender(event) {
  eventSender = createEventSender(event);
}

export function getEventSender() {
  if (!eventSender) {
    throw new Error('eventSender not initialized, call initEventSender first.');
  }
  return eventSender;
}
