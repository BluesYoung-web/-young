"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useRemoteSearch = void 0;
var _vue = require("vue");
const useRemoteSearch = cbk => {
  const loading = (0, _vue.ref)(false);
  const searchStr = (0, _vue.ref)("");
  const options = (0, _vue.ref)([]);
  const search = async str => {
    str = str.trim();
    const res = await cbk(str);
    if (res) {
      options.value = res;
    }
  };
  const init = (0, _vue.ref)(false);
  return {
    loading,
    search,
    searchStr,
    options,
    init
  };
};
exports.useRemoteSearch = useRemoteSearch;