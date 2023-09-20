"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useFormMode = void 0;
var _utils = require("@bluesyoung/utils");
var _elementPlus = require("element-plus");
var _vue = require("vue");
const useFormMode = (FORM_TEMP, {
  addCbk,
  modCbk,
  delCbk,
  cpEffect,
  cgEffect,
  clearEffect,
  disableclear
}, tip = "\u786E\u8BA4\u5220\u9664\u8BE5\u6761\u6570\u636E\uFF1F") => {
  const isAdd = (0, _vue.ref)(false);
  const isEdit = (0, _vue.ref)(false);
  const isMore = (0, _vue.ref)(false);
  const form = (0, _vue.ref)((0, _utils.deepClone)(FORM_TEMP));
  const formRef = (0, _vue.ref)();
  const validForm = async () => {
    const res = await new Promise(resolve => {
      formRef.value?.validate(async valid => {
        if (valid) {
          resolve(true);
        }
      }).catch(err => {
        resolve(false);
      });
    });
    return res;
  };
  const clear = () => {
    isAdd.value = false;
    isEdit.value = false;
    isMore.value = false;
    clearEffect?.();
    formRef.value?.resetFields();
    form.value = (0, _utils.deepClone)(FORM_TEMP);
  };
  const del = row => {
    _elementPlus.ElMessageBox.confirm(tip, "\u63D0\u793A", {
      confirmButtonText: "\u786E\u8BA4",
      cancelButtonText: "\u53D6\u6D88",
      type: "warning"
    }).then(async () => {
      await delCbk?.(row);
      cgEffect?.();
    }).catch(() => null);
  };
  const sure = async () => {
    if (isAdd.value) {
      const res = await addCbk?.();
      if (res === false) {
        return;
      }
    } else {
      const res = await modCbk?.();
      if (res === false) {
        return;
      }
    }
    !disableclear && clear();
    cgEffect?.();
  };
  const edit = async row => {
    const res = await cpEffect?.(row);
    form.value = (0, _utils.deepClone)(res || row);
    isEdit.value = true;
  };
  const more = async row => {
    const res = await cpEffect?.(row);
    form.value = (0, _utils.deepClone)(res || row);
    isMore.value = true;
  };
  return {
    isAdd,
    isEdit,
    isMore,
    clear,
    edit,
    more,
    form,
    del,
    sure,
    formRef,
    validForm
  };
};
exports.useFormMode = useFormMode;