<!--
 * @Author: zhangyang
 * @Date: 2022-05-17 12:19:18
 * @LastEditTime: 2022-05-23 11:01:55
 * @Description: 
-->
<script setup lang="ts">
import { YoungBeginnerGuidController } from '@bluesyoung/beginner-guid';
// import { YoungBeginnerGuidController } from '../../../packages/beginner-guid/src/index';

const guid = new YoungBeginnerGuidController([
  {
    el: '#step1',
    des: 'test1'
  },
  {
    el: '#step2',
    des: 'test2'
  },
  {
    el: '#step3',
    des: 'test3'
  }
]);

</script>

<template>
  <div id="step1">111111</div>
  <div id="step2">222222</div>
  <div id="step3">333333</div>
  <button type="button" class="btn" @click="guid.show()">开始引导</button>
</template>

<style>
*, html, body {
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: antiquewhite;
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-rows: 2;
  grid-template-columns: 1;
  justify-items: center;
  align-items: stretch;
  justify-content: start;
}
.btn {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 10px;
}
</style>
