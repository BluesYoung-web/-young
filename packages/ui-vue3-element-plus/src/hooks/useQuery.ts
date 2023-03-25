/*
 * @Author: zhangyang
 * @Date: 2023-03-25 17:30:18
 * @LastEditTime: 2023-03-25 17:30:18
 * @Description:
 */
import { deepClone } from '@bluesyoung/utils';
import { ref } from 'vue';

export const useQuery = <T>(QUERY_TEMP: T, cbk: Function) => {
  const query = ref(deepClone(QUERY_TEMP));

  const reset = () => {
    // @ts-ignore
    query.value = deepClone(QUERY_TEMP);
    cbk();
  };

  return {
    query,
    reset,
  };
};
