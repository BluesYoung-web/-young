/*
 * @Author: zhangyang
 * @Date: 2023-03-25 17:30:18
 * @LastEditTime: 2023-11-23 12:00:56
 * @Description:
 */
import { deepClone } from '@bluesyoung/utils';
import { ref } from 'vue';

export const useQuery = <T>(QUERY_TEMP: T, cbk: Function) => {
  const query = ref(deepClone(QUERY_TEMP));

  const reset = () => {
    query.value = deepClone<any>(QUERY_TEMP);
    cbk();
  };

  return {
    query,
    reset,
  };
};
