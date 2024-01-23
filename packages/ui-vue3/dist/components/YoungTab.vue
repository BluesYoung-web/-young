<!--
 * @Author: zhangyang
 * @Date: 2023-11-24 11:11:22
 * @LastEditTime: 2024-01-23 16:46:29
 * @Description: 
-->
<script lang="ts" setup>
import { ref, type CSSProperties } from 'vue';

interface Props {
  /**
   * 标题样式
   * @default {
        cursor: 'pointer',
        marginBottom: '20px'
      }
   */
  titleStyle?: CSSProperties
  /**
   * tab 选中样式
   * @default {
        color: '#409eff',
        borderBottom: '2px solid #409eff',
      }
   */
  activeStyle?: CSSProperties
  /**
   * tab 未选中样式
   * @default {
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
    cursor: 'pointer',
    marginBottom: '20px'
  }),
  activeStyle: () => ({
    color: '#409eff',
    borderBottom: '2px solid #409eff',
  }),
  inactiveStyle: () => ({
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