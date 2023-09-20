"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useQuery = void 0;
var _utils = require("@bluesyoung/utils");
var _vue = require("vue");
const useQuery = (QUERY_TEMP, cbk) => {
  const query = (0, _vue.ref)((0, _utils.deepClone)(QUERY_TEMP));
  const reset = () => {
    query.value = (0, _utils.deepClone)(QUERY_TEMP);
    cbk();
  };
  return {
    query,
    reset
  };
};
exports.useQuery = useQuery;