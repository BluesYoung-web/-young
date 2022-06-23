<!--
 * @Author: zhangyang
 * @Date: 2022-06-23 15:42:16
 * @LastEditTime: 2022-06-23 15:47:13
 * @Description: 
-->
<script setup lang="ts">
import { YoungImgSlider } from '@bluesyoung/slide-verify';

const slider = new YoungImgSlider(() => {
  console.log('验证通过！')
});

</script>

<template>
  <div>
    <button @click="slider.show()">开始</button>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
