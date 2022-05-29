<!--
 * @Author: zhangyang
 * @Date: 2022-05-29 15:07:39
 * @LastEditTime: 2022-05-29 15:26:53
 * @Description: 
-->
<template>
  <div class="loading" :tip="text || '加载中...'" :spinning="loading">
    <slot />
  </div>
</template>

<script setup lang="ts" name="YoungLoading">
defineProps<{
  text?: string
  loading: boolean
}>();
</script>
<style scoped>
.loading {
  padding: 20px;
  display: block;
}

.ant-spin-nested-loading {
  position: inherit;
}
.ant-spin-nested-loading .ant-spin-container {
  position: inherit;
}
</style>
