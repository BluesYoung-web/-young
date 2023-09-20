import { ref } from "vue";
export const useRemoteSearch = (cbk) => {
  const loading = ref(false);
  const searchStr = ref("");
  const options = ref([]);
  const search = async (str) => {
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
    init
  };
};
