"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.triggerEvent = exports.triggerClick = void 0;
const triggerEvent = function (elm, name, ...opts) {
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
exports.triggerEvent = triggerEvent;
const triggerClick = function (elm, ...opts) {
  triggerEvent(elm, "mousedown", ...opts);
  triggerEvent(elm, "mouseup", ...opts);
  return elm;
};
exports.triggerClick = triggerClick;