<!--
 * @Author: zhangyang
 * @Date: 2023-09-20 13:53:10
 * @LastEditTime: 2023-09-20 14:09:05
 * @Description: 
-->
<script lang="ts" setup>
import { ref, watchEffect } from 'vue';
import { ElTimeSelect, ElTimePicker } from 'element-plus';

interface Props {
  start: string;
  end: string;
  startTime?: string;
  endTime?: string;
  step?: string;
  /**
   * 是否精确到秒
   */
  second?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  startTime: '00:00',
  endTime: '23:59',
  step: '00:01',
  second: false
});

const emit = defineEmits<{
  (e: 'update:start', value: string): void;
  (e: 'update:end', value: string): void;
  (e: 'change'): void;
}>();

const timePicker = ref<[Date, Date]>();
watchEffect(() => {
  if (props.start && props.end) {
    timePicker.value = [
      new Date(`2022 02 02 ${props.start}`),
      new Date(`2022 02 02 ${props.end}${props.second ? ':59' : ''}`),
    ];
  } else {
    timePicker.value = undefined;
  }
});

const update = (v: [Date, Date] | null) => {
  if (!v) {
    emit('update:start', '');
    emit('update:end', '');
  } else {
    const [start, end] = v;
    emit('update:start', start.toLocaleString().match(/\d\d:\d\d:\d\d/)?.[0] ?? '');
    emit('update:end', end.toLocaleString().match(/\d\d:\d\d:\d\d/)?.[0] ?? '');
  }
  emit('change');
};
</script>

<template>
  <div v-if="!second">
    <ElTimeSelect v-bind="$attrs" :model-value="start" class='w-120px mr-2' :max-time="end" placeholder='开始时间'
      :start="startTime" :step="step" :end="endTime" @update:model-value="(v) => emit('update:start', v)" />
    - &nbsp;
    <ElTimeSelect v-bind="$attrs" :model-value="end" class='w-120px' :min-time="start" placeholder='结束时间'
      :start="startTime" :step="step" :end="endTime" @update:model-value="(v) => emit('update:end', v)" />
  </div>
  <div v-else>
    <ElTimePicker v-bind="$attrs" :model-value="timePicker" is-range start-placeholder="开始时间" end-placeholder="结束时间"
      @update:model-value="update" />
  </div>
</template>