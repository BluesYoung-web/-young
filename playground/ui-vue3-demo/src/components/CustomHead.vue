<!--
 * @Author: wurangkun wurangkun@qq.com
 * @Date: 2023-05-29 10:25:11
 * @LastEditors: wurangkun wurangkun@qq.com
 * @LastEditTime: 2023-05-30 09:13:14
 * @FilePath: \young\playground\ui-vue3-demo\src\components\CustomHead.vue
 * @Description: 自定义表头工具
-->
<script lang="ts" setup>
import {
  ElPopover,
} from 'element-plus';
import { onMounted, ref } from 'vue'
import type { TableHeadItem } from '@bluesyoung/ui-vue3-element-plus';
import Drag from './drag.vue';
import { useEventListener } from '@vueuse/core';
type Props = {
  height: number | string;
  /**
   * 表头数据
   */
  tableHead: TableHeadItem[];
}
withDefaults(defineProps<Props>(), {
  height: '100%'
})

const emit = defineEmits<{
  (e: 'change', item: TableHeadItem, check: boolean): void,
  (e: 'drag-end', tableHead: TableHeadItem[]): void
}>()

const showPopover = ref(false)

const handleDragend = (list: TableHeadItem[]) => {
  emit('drag-end', list)
}

const handleChange = (item: TableHeadItem, check: boolean) => {
  emit("change", item, check)
}

onMounted(() => {
  useEventListener('click', (e) => {
    console.log(e);
    showPopover.value = false
  })
})

</script>
<template>
  <ElPopover ref="popoverRef" trigger="click" :visible="showPopover" placement='bottom-end' popper-style="padding:0"
    width="250" :show-arrow="false">
    <template #reference>
      <div ref="buttonRef" @click.stop="showPopover = true" class="absolute top-0 right-0 border setting"
        :style="{ height, width: height }" title='表头配置'>
        <svg xmlns='http://www.w3.org/2000/svg' width='1.5rem' height='1.5rem' viewBox='0 0 24 24'>
          <path fill='currentColor'
            d='M13.875 22h-3.75q-.375 0-.65-.25t-.325-.625l-.3-2.325q-.325-.125-.613-.3t-.562-.375l-2.175.9q-.35.125-.7.025t-.55-.425L2.4 15.4q-.2-.325-.125-.7t.375-.6l1.875-1.425Q4.5 12.5 4.5 12.337v-.674q0-.163.025-.338L2.65 9.9q-.3-.225-.375-.6t.125-.7l1.85-3.225q.175-.35.537-.438t.713.038l2.175.9q.275-.2.575-.375t.6-.3l.3-2.325q.05-.375.325-.625t.65-.25h3.75q.375 0 .65.25t.325.625l.3 2.325q.325.125.613.3t.562.375l2.175-.9q.35-.125.7-.025t.55.425L21.6 8.6q.2.325.125.7t-.375.6l-1.875 1.425q.025.175.025.338v.674q0 .163-.05.338l1.875 1.425q.3.225.375.6t-.125.7l-1.85 3.2q-.2.325-.563.438t-.712-.013l-2.125-.9q-.275.2-.575.375t-.6.3l-.3 2.325q-.05.375-.325.625t-.65.25Zm-1.825-6.5q1.45 0 2.475-1.025T15.55 12q0-1.45-1.025-2.475T12.05 8.5q-1.475 0-2.488 1.025T8.55 12q0 1.45 1.012 2.475T12.05 15.5Zm0-2q-.625 0-1.063-.438T10.55 12q0-.625.438-1.063t1.062-.437q.625 0 1.063.438T13.55 12q0 .625-.438 1.063t-1.062.437ZM12 12Zm-1 8h1.975l.35-2.65q.775-.2 1.438-.588t1.212-.937l2.475 1.025l.975-1.7l-2.15-1.625q.125-.35.175-.737T17.5 12q0-.4-.05-.787t-.175-.738l2.15-1.625l-.975-1.7l-2.475 1.05q-.55-.575-1.212-.962t-1.438-.588L13 4h-1.975l-.35 2.65q-.775.2-1.437.588t-1.213.937L5.55 7.15l-.975 1.7l2.15 1.6q-.125.375-.175.75t-.05.8q0 .4.05.775t.175.75l-2.15 1.625l.975 1.7l2.475-1.05q.55.575 1.213.963t1.437.587L11 20Z'>
          </path>
        </svg>
      </div>
    </template>
    <!-- <span> Some content </span> -->
    <div class="popover_title" @click.stop>
      表头设置
      <div class="svg" @click.stop="showPopover = false">
        <svg t="1685331774841" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
          p-id="5481" width="18" height="18">
          <path
            d="M512 1024C229.376 1024 0 794.624 0 512S229.376 0 512 0s512 229.376 512 512-229.376 512-512 512z m0-975.36C257.024 48.64 48.64 257.024 48.64 512c0 254.976 207.872 463.36 463.36 463.36S975.36 767.488 975.36 512 766.976 48.64 512 48.64z"
            fill="#8A8A8A" p-id="5482"></path>
          <path
            d="M548.864 512l195.072-195.072c9.728-9.728 9.728-25.6 0-36.864l-1.536-1.536c-9.728-9.728-25.6-9.728-35.328 0L512 475.136 316.928 280.064c-9.728-9.728-25.6-9.728-35.328 0l-1.536 1.536c-9.728 9.728-9.728 25.6 0 36.864L475.136 512 280.064 707.072c-9.728 9.728-9.728 25.6 0 36.864l1.536 1.536c9.728 9.728 25.6 9.728 35.328 0L512 548.864l195.072 195.072c9.728 9.728 25.6 9.728 35.328 0l1.536-1.536c9.728-9.728 9.728-25.6 0-36.864L548.864 512z"
            fill="#8A8A8A" p-id="5483"></path>
        </svg>
      </div>
    </div>
    <div class="popover_content">
      <!-- <div v-for="item in tableHead_1" class="header_item">{{ item.label }}</div> -->
      <Drag :list="tableHead" @drag-end="handleDragend" @change="handleChange" />
    </div>
  </ElPopover>
</template>

<style scoped>
.setting {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 2;
  cursor: pointer;
  background: #fff;
  /* padding: 0 5px; */
  display: flex;
  justify-content: center;
  align-items: center;
}

.border {
  border: 1px solid #ebeef5;
  border-right: 0;
  border-top: 0;
}

.popover_title {
  height: 24px;
  line-height: 24px;
  text-align: center;
  font-weight: bold;
  color: #333;
  border-bottom: 1px solid #ebeef5;
  position: relative;
  padding: 12px;
}

.popover_title .svg {
  position: absolute;
  right: 12px;
  top: 15px;
  cursor: pointer;
}

.popover_content {
  height: 400px;
  overflow-y: auto;
}

/* 针对 Webkit 浏览器 */
::-webkit-scrollbar {
  width: 0;
  height: 0;
}

/* 针对 Firefox 浏览器 */
::-moz-scrollbar {
  width: 0;
  height: 0;
}

.popover_content .header_item {
  padding: 8px;
  cursor: pointer;
}

.popover_content .header_item:hover {
  background: #eee;
}
</style>