<!--
 * @Author: zhangyang
 * @Date: 2022-05-29 14:23:36
 * @LastEditTime: 2022-05-29 15:31:40
 * @Description: 
-->
<script lang="ts" setup>
import { ref } from 'vue';
import Editor from './component';

const content = ref('');
</script>

<template>
  <div>
    {{ content }}
    <Editor v-model="content" />
  </div>
</template>