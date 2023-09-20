import { deepClone } from "@bluesyoung/utils";
import { ElMessageBox } from "element-plus";
import { ref } from "vue";
export const useFormMode = (FORM_TEMP, { addCbk, modCbk, delCbk, cpEffect, cgEffect, clearEffect, disableclear }, tip = "\u786E\u8BA4\u5220\u9664\u8BE5\u6761\u6570\u636E\uFF1F") => {
  const isAdd = ref(false);
  const isEdit = ref(false);
  const isMore = ref(false);
  const form = ref(deepClone(FORM_TEMP));
  const formRef = ref();
  const validForm = async () => {
    const res = await new Promise((resolve) => {
      formRef.value?.validate(async (valid) => {
        if (valid) {
          resolve(true);
        }
      }).catch((err) => {
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
    form.value = deepClone(FORM_TEMP);
  };
  const del = (row) => {
    ElMessageBox.confirm(tip, "\u63D0\u793A", {
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
  const edit = async (row) => {
    const res = await cpEffect?.(row);
    form.value = deepClone(res || row);
    isEdit.value = true;
  };
  const more = async (row) => {
    const res = await cpEffect?.(row);
    form.value = deepClone(res || row);
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
