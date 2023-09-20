import { deepClone } from "@bluesyoung/utils";
import { ref } from "vue";
export const useQuery = (QUERY_TEMP, cbk) => {
  const query = ref(deepClone(QUERY_TEMP));
  const reset = () => {
    query.value = deepClone(QUERY_TEMP);
    cbk();
  };
  return {
    query,
    reset
  };
};
