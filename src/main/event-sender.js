let eventSender;

function createEventSender(event) {
  return function sendEvent(message) {
    // if Object has trigger property, send trigger event to renderer
    if (typeof message === 'object' && message) {
      if (event?.sender) {
        // use Trigger like <trigger({ trigger: { message: 'mailSent', mail } })>
        console.log('Trigger:', message);
        event.sender.send('trigger', message);
      }
      // else send message to renderer
    } else {
      if (event?.sender) {
        console.log(message);
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
