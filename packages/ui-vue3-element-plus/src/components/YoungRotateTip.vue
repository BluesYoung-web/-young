<!--
 * @Author: zhangyang
 * @Date: 2023-09-20 15:56:20
 * @LastEditTime: 2023-09-20 16:00:50
 * @Description: 
-->
<script lang="ts" setup>
import { ref, computed, watchEffect } from 'vue';
import { useEventListener, useWindowSize } from '@vueuse/core';
import { ElOverlay } from 'element-plus';

const props = withDefaults(defineProps<{
  maxWidth?: number;
}>(), {
  maxWidth: 768
});

const element = ref<HTMLDivElement>();
const showTip = ref(false);
const show = () => (showTip.value = true);
const hide = () => (showTip.value = false);

const { width, height } = useWindowSize();
const isSmallDevices = computed(
  () => width.value < height.value || width.value < props.maxWidth,
);

watchEffect(() => {
  if (isSmallDevices.value) {
    show();
  } else {
    hide();
  }
});

useEventListener(element, 'animationend', (e) => {
  hide();
});
</script>

<template>
  <ElOverlay v-if="showTip" v-bind="$attrs" mask style="width: 100vw; height: 100vh;">
    <div class="center">
      <img ref="element" src="landscape" class="rotate-tip" />
      <div class="tip">
        为了更好的用户体验，请横屏使用
      </div>
    </div>
  </ElOverlay>
</template>

<style scoped>
.center {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.tip {
  color: white;
  margin-top: 2.5rem;
  font-size: 1.25rem;
  line-height: 1.75rem;
}

@keyframes rotate {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(90deg);
  }
}

.rotate-tip {
  width: 200px;
  animation-name: rotate;
  animation-iteration-count: 6;
  animation-duration: 1s;
  animation-direction: alternate;
  animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
</style>