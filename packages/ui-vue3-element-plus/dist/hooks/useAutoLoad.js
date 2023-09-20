"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAutoLoad = void 0;
var _vue = require("vue");
var _core = require("@vueuse/core");
const useAutoLoad = (list, allData, pageSize = 10, pause = (0, _vue.ref)(false)) => {
  const elArr = (0, _vue.ref)([]);
  const touchEndEl = (0, _vue.ref)(false);
  const page = (0, _vue.ref)(1);
  const load = () => {
    const {
      stop
    } = (0, _core.useIntersectionObserver)(elArr.value[list.value.length - 1], ([{
      isIntersecting
    }]) => {
      if (isIntersecting) {
        touchEndEl.value = isIntersecting;
        stop();
      }
    });
  };
  (0, _vue.watchEffect)(async () => {
    if (pause.value) {
      return;
    }
    if (touchEndEl.value) {
      if (list.value.length === allData.value.length) {
        return;
      }
      page.value++;
      const slicePart = allData.value.slice(pageSize * (page.value - 1), pageSize * page.value);
      if (slicePart.length === 0) {
        return;
      }
      list.value.push(...slicePart);
      touchEndEl.value = false;
      await (0, _vue.nextTick)();
      load();
    }
  });
  return {
    elArr,
    touchEndEl,
    page,
    load
  };
};
exports.useAutoLoad = useAutoLoad;