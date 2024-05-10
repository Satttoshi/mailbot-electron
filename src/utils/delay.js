// Delay function like sleep() in python
export function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}
