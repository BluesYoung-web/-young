<!--
 * @Author: zhangyang
 * @Date: 2023-11-24 10:51:46
 * @LastEditTime: 2023-11-24 11:03:13
 * @Description: 
-->
<script lang="ts" setup>
import { Teleport, nextTick, ref, watch } from 'vue';
import { useMouse } from '@vueuse/core';

interface ContextMenuItem {
  /**
   * 回调函数的名称
   */
  handlerName: string;
  /**
   * 展示的菜单名
   */
  title: string;
};

interface Props {
  /**
   * 是否展示
   */
  modelValue: boolean;
  /**
   * 菜单项
   */
  menuList: ContextMenuItem[];
};

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: 'update:modelValue', v: boolean): void;
  (e: 'clickItem', v: ContextMenuItem['handlerName']): void;
}>();

const { x, y } = useMouse();
const left = ref(0);
const top = ref(0);
const menu = ref();

watch(() => props.modelValue, (newVal, oldVal) => {
  if (newVal && !oldVal) {
    nextTick(() => {
      console.log(menu.value)
      const { width, height } = window.getComputedStyle(menu.value as HTMLElement);
      const { innerWidth, innerHeight } = window;
      // 此时鼠标的坐标
      const tx = x.value;
      const ty = y.value;
      // 此时自定义菜单的宽高
      const rw = parseFloat(width);
      const rh = parseFloat(height);
      // 处理边界值
      left.value = innerWidth - tx > rw ? tx : innerWidth - rw;
      top.value = innerHeight - ty > rh ? ty : innerHeight - rh;
    });
  }
});
</script>

<template>
  <Teleport to="body">
    <div v-if="modelValue" :style="{
      backgroundColor: 'rgba(200, 200, 200, 0)',
      position: 'absolute',
      width: '100vw',
      height: '100vh',
      top: 0,
      zIndex: 1001
    }" @click="emit('update:modelValue', false)">
      <ul ref="menu" :style="{
        left: left + 'px',
        top: top + 'px',
        margin: 0,
        background: '#fff',
        zIndex: 3000,
        position: 'absolute',
        listStyleType: 'none',
        padding: '5px 0',
        borderRadius: '4px',
        fontSize: '12px',
        fontWeight: 400,
        color: '#333',
        boxShadow: '2px 2px 3px 0 rgba(0, 0, 0, .3)'
      }">
        <li v-for="(item, index) in menuList" :key="index" :style="{
          margin: 0,
          padding: '7px 16px',
          cursor: 'pointer'
        }" @click.stop="emit('clickItem', item.handlerName)"
          @mouseover.stop="($event) => ($event.currentTarget as HTMLDivElement).style.background = '#eee'"
          @mouseleave.stop="($event) => ($event.currentTarget as HTMLDivElement).style.background = '#fff'">
          {{ item.title }}
        </li>
      </ul>
    </div>
  </Teleport>
</template>