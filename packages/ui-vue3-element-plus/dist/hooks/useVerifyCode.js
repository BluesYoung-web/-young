"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useVerifyCode = void 0;
var _vue = require("vue");
const useVerifyCode = (cbk, default_wait = 60, default_tip = "\u83B7\u53D6\u9A8C\u8BC1\u7801") => {
  const count = (0, _vue.ref)(default_wait);
  const tip = (0, _vue.ref)(default_tip);
  const timer = (0, _vue.ref)();
  const disabled = (0, _vue.computed)(() => count.value !== default_wait);
  const startCountDown = () => {
    count.value--;
    tip.value = `${count.value} \u79D2\u540E\u91CD\u8BD5`;
    timer.value = setInterval(() => {
      if (count.value > 0) {
        count.value--;
        tip.value = `${count.value} \u79D2\u540E\u91CD\u8BD5`;
      } else {
        endCountDown();
      }
    }, 1e3);
  };
  const endCountDown = () => {
    count.value = default_wait;
    tip.value = default_tip;
    clearInterval(timer.value);
  };
  const showSlider = (0, _vue.ref)(false);
  const start = () => {
    showSlider.value = true;
  };
  const pass = async () => {
    console.log("\u9A8C\u8BC1\u901A\u8FC7");
    showSlider.value = false;
    await cbk();
    startCountDown();
  };
  const cancel = () => {
    console.log("\u53D6\u6D88\u9A8C\u8BC1");
    showSlider.value = false;
  };
  const getCode = () => {
    if (count.value !== default_wait) {
      return;
    }
    start();
  };
  return {
    getCode,
    tip,
    showSlider,
    pass,
    cancel,
    disabled
  };
};
exports.useVerifyCode = useVerifyCode;