<template>
  <transition-group class="list">
    <div @dragstart="dragstart(index)" @dragenter="dragenter($event, index)" sssssss @dragover="dragover($event, index)"
      @dragend="dragend" :draggable="draggable" v-for="(item, index) in list" :key="item.label" class="list-item"
      :class="{ active: item.check }">
      <div @mouseover="draggable = true" @mouseout="draggable = false" class="draggable">
        <svg t="1685340487689" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
          p-id="6483" width="16" height="16">
          <path
            d="M867.995 459.647h-711.99c-27.921 0-52.353 24.434-52.353 52.353s24.434 52.353 52.353 52.353h711.99c27.921 0 52.353-24.434 52.353-52.353s-24.434-52.353-52.353-52.353z"
            p-id="6484"></path>
          <path
            d="M867.995 763.291h-711.99c-27.921 0-52.353 24.434-52.353 52.353s24.434 52.353 52.353 52.353h711.99c27.921 0 52.353-24.434 52.353-52.353s-24.434-52.353-52.353-52.353z"
            p-id="6485"></path>
          <path
            d="M156.005 260.709h711.99c27.921 0 52.353-24.434 52.353-52.353s-24.434-52.353-52.353-52.353h-711.99c-27.921 0-52.353 24.434-52.353 52.353s24.434 52.353 52.353 52.353z"
            p-id="6486"></path>
        </svg>
      </div>
      <div class="label" @click.stop="handleChangeCheck(item)" :title="item.label">{{ item.label }}</div>
      <div class="check" v-show="item.check">
        <svg t="1685343385305" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
          p-id="7463" width="18" height="18">
          <path
            d="M186.4 480.3l219.5 253.8c7.8 9 21.4 10 30.4 2.2 0.6-0.5 1.2-1.1 1.7-1.7L839.6 300c7.6-8.2 7.6-20.9-0.1-29.1-7.7-8.2-20.4-9.1-29.2-2.1L433.8 573.6c-7.3 5.9-17.5 6.4-25.3 1.3l-194-126.3c-9-5.8-20.8-4.2-27.9 3.8-7.1 7.9-7.1 19.9-0.2 27.9z"
            fill="#409eff " p-id="7464"></path>
        </svg>
      </div>
    </div>
  </transition-group>
</template>

<script lang="ts" setup>
import { ref, toRef } from 'vue'
import type { TableHeadItem } from '@bluesyoung/ui-vue3-element-plus';
type Props = {
  list: TableHeadItem[]
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'drag-end', list: TableHeadItem[]): void,
  (e: 'change', list: TableHeadItem, check: boolean): void,
}>()

const draggable = ref(false)

// const list = ref<TableHeaderItem[]>(props);
const list = toRef(props, 'list')
const isDrag = ref(false)
let dragIndex = -1
let timeout: NodeJS.Timeout | null = null

function dragstart(index: number) {
  console.log('start index ===>>> ', index)
  dragIndex = index
}

function dragenter(e: DragEvent, index: number) {
  e.preventDefault();
  if (timeout !== null) {
    clearTimeout(timeout)
  }
  isDrag.value = true
  // 拖拽事件的防抖
  timeout = setTimeout(() => {
    if (dragIndex !== index) {
      const source = list.value[dragIndex]
      list.value.splice(dragIndex, 1)
      list.value.splice(index, 0, source)
      // 排序变化后目标对象的索引变成源对象的索引
      dragIndex = index;
    }
    isDrag.value = false
  }, 100);
}

function dragend() {
  if (!isDrag.value) {
    emit('drag-end', list.value)
  } else {
    setTimeout(() => {
      dragend()
    }, 100);
  }
}

function dragover(e: DragEvent, index: number) {
  e.preventDefault();
}

const handleChangeCheck = (item: TableHeadItem) => {
  emit('change', item, !item.check)
} 
</script>

<style scoped>
.list {
  list-style: none;

}

.list-item {
  transition: transform .3s;
  cursor: move;
  border-radius: 4px;
  color: #333;
  height: 36px;
  line-height: 36px;
  text-align: center;
  display: flex;
  align-items: center;
}

.list-item:hover {
  background: #eee;
}

.list-item.active {
  color: #409eff !important;
}

.list-item .label {
  text-align: left;
  cursor: pointer;
  flex: 1;
  padding: 0 12px 0 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  /* 显示省略号 */
}

.list-item .draggable {
  text-align: center;
  display: flex;
  align-items: center;
  padding: 0 12px;
  height: 100%;
}

.list-item .check {
  text-align: center;
  display: flex;
  align-items: center;
  padding: 0 12px;
  height: 100%;
}
</style>
