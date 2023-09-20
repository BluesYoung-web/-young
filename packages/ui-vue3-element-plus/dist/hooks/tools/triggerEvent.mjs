export const triggerEvent = function(elm, name, ...opts) {
  let eventName;
  if (/^mouse|click/.test(name)) {
    eventName = "MouseEvents";
  } else if (/^key/.test(name)) {
    eventName = "KeyboardEvent";
  } else {
    eventName = "HTMLEvents";
  }
  const evt = document.createEvent(eventName);
  evt.initEvent(name, ...opts);
  elm.dispatchEvent ? elm.dispatchEvent(evt) : elm.fireEvent("on" + name, evt);
  return elm;
};
export const triggerClick = function(elm, ...opts) {
  triggerEvent(elm, "mousedown", ...opts);
  triggerEvent(elm, "mouseup", ...opts);
  return elm;
};
