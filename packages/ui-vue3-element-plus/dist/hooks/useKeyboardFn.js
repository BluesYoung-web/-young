"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useKeyUp = void 0;
const useKeyUp = (e, fn, key = "enter") => {
  if (e.key.toLocaleLowerCase() === key) {
    e.preventDefault();
    fn();
  }
};
exports.useKeyUp = useKeyUp;