/*
 * @Author: zhangyang
 * @Date: 2023-01-05 10:47:55
 * @LastEditTime: 2023-01-05 11:09:17
 * @Description:
 */
import type { Ref } from 'vue';
import { ref, watchEffect, nextTick } from 'vue';
import { useIntersectionObserver } from '@vueuse/core';
export const useAutoLoad = <T>(
  list: Ref<T[]>,
  allData: Ref<T[]>,
  pageSize = 10,
  pause = ref(false),
) => {
  const elArr = ref<HTMLDivElement[]>([]);
  const touchEndEl = ref(false);
  const page = ref(1);

  const load = () => {
    const { stop } = useIntersectionObserver(
      elArr.value[list.value.length - 1],
      ([{ isIntersecting }]) => {
        if (isIntersecting) {
          touchEndEl.value = isIntersecting;
          stop();
        }
      },
    );
  };

  watchEffect(async () => {
    if (pause.value) {
      return;
    }

    if (touchEndEl.value) {
      if (list.value.length === allData.value.length) {
        return;
      }
      page.value++;
      const slicePart = allData.value.slice(pageSize * (page.value - 1), pageSize * page.value);
      if (slicePart.length === 0) {
        return;
      }
      list.value.push(...slicePart);
      touchEndEl.value = false;
      await nextTick();
      load();
    }
  });

  return {
    elArr,
    touchEndEl,
    page,
    load,
  };
};
