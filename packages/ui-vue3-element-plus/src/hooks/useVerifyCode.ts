/*
 * @Author: zhangyang
 * @Date: 2023-03-10 16:49:30
 * @LastEditTime: 2023-09-28 17:24:04
 * @Description:
 */
import { ref, computed } from 'vue';

export const useVerifyCode = (
  cbk: () => any | Promise<any>,
  default_wait = 60,
  default_tip = '获取验证码',
) => {
  const count = ref(default_wait);
  const tip = ref(default_tip);
  const timer = ref<NodeJS.Timer>();

  const disabled = computed(() => count.value !== default_wait);

  const startCountDown = () => {
    count.value--;
    tip.value = `${count.value} 秒后重试`;
    timer.value = setInterval(() => {
      if (count.value > 0) {
        count.value--;
        tip.value = `${count.value} 秒后重试`;
      } else {
        endCountDown();
      }
    }, 1000);
  };

  const endCountDown = () => {
    count.value = default_wait;
    tip.value = default_tip;
    clearInterval(timer.value);
  };

  const showSlider = ref(false);
  const start = () => {
    showSlider.value = true;
  };
  const pass = async () => {
    console.log('验证通过');
    showSlider.value = false;
    await cbk();
    startCountDown();
  };
  const cancel = () => {
    console.log('取消验证');
    showSlider.value = false;
  };

  const getCode = () => {
    if (count.value !== default_wait) {
      return;
    }
    start();
  };

  return {
    getCode,
    tip,
    showSlider,
    pass,
    cancel,
    disabled,
  };
};
