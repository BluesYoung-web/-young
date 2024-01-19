<!--
 * @Author: zhangyang
 * @Date: 2023-11-23 19:45:21
 * @LastEditTime: 2023-11-23 19:49:06
 * @Description: 
-->
<script lang="ts" setup>
import { ref, onMounted, onUnmounted, nextTick, Teleport } from 'vue';

withDefaults(defineProps<{
  zIndex?: number
}>(), {
  zIndex: 2000
})

const showPopup = ref(false);

const show = () => showPopup.value = true;
const hide = () => showPopup.value = false;

defineExpose({
  show,
  hide
});

const el = ref<HTMLInputElement>();

const onKeyShow = (e: KeyboardEvent) => {
  if (e.ctrlKey && e.key.toLocaleLowerCase() === 'k') {
    e.preventDefault();
    if (!showPopup.value) {
      show();
      nextTick(() => {
        el.value?.focus();
      });
    } else {
      hide();
    }
  }
};

onMounted(() => {
  window.addEventListener('keydown', onKeyShow);
});
onUnmounted(() => {
  window.removeEventListener('keydown', onKeyShow);
});
</script>

<template>
  <Teleport to="body">
    <div @click.self.stop="hide" :style="{
      display: showPopup ? 'block' : 'none',
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      width: '100vw',
      height: '100vh',
      position: 'absolute',
      left: 0,
      top: 0,
      zIndex: zIndex
    }">
      <div :style="{
        position: 'relative', left: '50%', top: '50%', transform: 'translate(-50%, -50%)',
        width: 'min(600px, 70%)', maxHeight: 'min(520px, 60%)', overflow: 'auto', borderRadius: '1rem',
        border: '1px solid rgb(219, 234, 254)', backgroundColor: 'white', padding: '2rem',
        boxShadow: 'rgba(0, 0, 0, 0) 0 0 0 0, rgba(0, 0, 0, 0) 0 0 0 0, 0 4px 6px -1px rgb(0 0 0/0.1), 0 2px 4px -2px rgb(0 0 0/0.1)'
      }">
        <slot :el="el">
          <input ref="el" type="text" />
        </slot>
      </div>
    </div>
  </Teleport>
</template>