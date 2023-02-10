/*
 * @Author: zhangyang
 * @Date: 2023-01-05 17:10:41
 * @LastEditTime: 2023-01-05 18:57:15
 * @Description:
 */
import { deepClone } from '@bluesyoung/utils';
import { ElMessageBox } from 'element-plus';
import { ref } from 'vue';

type Cbk<T> = {
  addCbk?: () => Promise<void | boolean>;
  modCbk?: () => Promise<void | boolean>;
  delCbk?: (row: T) => void;
  cpEffect?: (row: T) => Promise<void>;
  cgEffect?: () => void;
  disableclear?: boolean;
};
type ValidFn = () => Promise<boolean>;

export const useFormMode = <T>(
  FORM_TEMP: T,
  { addCbk, modCbk, delCbk, cpEffect, cgEffect, disableclear }: Cbk<T>,
  tip = '确认删除该条数据？',
) => {
  const isAdd = ref(false);
  const isEdit = ref(false);
  const isMore = ref(false);

  const form = ref<T>(deepClone(FORM_TEMP));
  const formRef = ref();
  const validForm: ValidFn = async () => {
    const res = await new Promise((resolve) => {
      formRef.value
        ?.validate(async (valid) => {
          if (valid) {
            resolve(true);
          }
        })
        .catch((err) => {
          resolve(false);
        });
    });
    return res as boolean;
  };
  const clear = () => {
    isAdd.value = false;
    isEdit.value = false;
    isMore.value = false;
    // @ts-ignore
    form.value = deepClone(FORM_TEMP);
  };

  const del = (row: any) => {
    ElMessageBox.confirm(tip, '提示', {
      type: 'warning',
    })
      .then(async () => {
        await delCbk?.(row);
        cgEffect?.();
      })
      .catch(() => null);
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

  const edit = async (row: any) => {
    await cpEffect?.(row);
    form.value = deepClone(row);
    isEdit.value = true;
  };
  const more = async (row: any) => {
    await cpEffect?.(row);
    form.value = deepClone(row);
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
    validForm,
  };
};
