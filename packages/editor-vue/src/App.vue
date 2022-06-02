<!--
 * @Author: zhangyang
 * @Date: 2022-05-29 14:23:36
 * @LastEditTime: 2022-06-02 16:02:14
 * @Description: 
-->
<script lang="ts" setup>
import { ref } from 'vue';
import Editor from './component';

const content = ref('');
</script>

<template>
  <div>
    <Editor v-model="content" />
    <div style="padding: 30px">
      {{ content }}
    </div>
  </div>
</template>