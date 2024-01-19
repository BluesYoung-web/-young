<!--
 * @Author: zhangyang
 * @Date: 2023-11-24 11:11:22
 * @LastEditTime: 2023-11-24 11:21:21
 * @Description: 
-->
<script lang="ts" setup>
import { ref, type CSSProperties } from 'vue';

interface Props {
  /**
   * 标题样式
   * @default {
        color: '#409eff',
        cursor: 'pointer',
        borderBottom: '2px solid #409eff',
        marginBottom: '20px'
      }
   */
  titleStyle?: CSSProperties
  /**
   * tab 选中样式
   * @default {
        color: '#409eff',
        cursor: 'pointer',
        borderBottom: '2px solid #409eff',
        marginBottom: '20px'
      }
   */
  activeStyle?: CSSProperties
  /**
   * tab 未选中样式
   * @default {
        cursor: 'pointer',
        marginBottom: '20px'
      }
   */
  inactiveStyle?: CSSProperties
  /**
   * tab 项
   */
  titles: string[]
}

withDefaults(defineProps<Props>(), {
  titleStyle: () => ({
    color: '#409eff',
    cursor: 'pointer',
    borderBottom: '2px solid #409eff',
    marginBottom: '20px'
  }),
  activeStyle: () => ({
    color: '#409eff',
    cursor: 'pointer',
    borderBottom: '2px solid #409eff',
    marginBottom: '20px'
  }),
  inactiveStyle: () => ({
    cursor: 'pointer',
    marginBottom: '20px'
  })
})

const activeIndex = ref(0)
</script>

<template>
  <div v-bind="$attrs" :style="{
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    ...titleStyle
  }">
    <div v-for="(title, index) in titles" :key="index + 'dfaseioryopi'"
      :style="index === activeIndex ? activeStyle : inactiveStyle" @click="activeIndex = index">{{ title }}</div>
  </div>
  <slot :name="`index_${activeIndex}`" />
</template>