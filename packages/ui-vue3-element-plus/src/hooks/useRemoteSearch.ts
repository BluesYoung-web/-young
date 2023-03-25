/*
 * @Author: zhangyang
 * @Date: 2023-03-25 17:30:47
 * @LastEditTime: 2023-03-25 17:30:47
 * @Description:
 */
import { ref } from 'vue';
import type { SelectOptionItem } from '..';

export const useRemoteSearch = (cbk: (key: string) => Promise<SelectOptionItem[] | void>) => {
  const loading = ref(false);
  const searchStr = ref<string | number | string[] | number[]>('');

  const options = ref<SelectOptionItem[]>([]);

  const search = async (str: string) => {
    str = str.trim();
    const res = await cbk(str);
    if (res) {
      options.value = res;
    }
  };

  const init = ref(false);

  return {
    loading,
    search,
    searchStr,
    options,
    init,
  };
};
