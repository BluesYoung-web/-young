<!--
 * @Author: zhangyang
 * @Date: 2022-05-17 12:19:18
 * @LastEditTime: 2022-05-20 17:47:01
 * @Description: 
-->
<script setup lang="ts">
import { onMounted } from 'vue';
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
onMounted(() => {
  guid.show();
  // guid.hide();
  [1, 2, 3].forEach((i) => {
    setTimeout(() => {
      guid.next();
    }, 1500 * i)
  })
  setTimeout(() => {
    [1, 2, 3].forEach((i) => {
      setTimeout(() => {
        guid.prev();
      }, 1500 * i)
    })
  }, 10000)
});
</script>

<template>
  <div id="step1">111111</div>
  <div id="step2">222222</div>
  <div id="step3">333333</div>
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
</style>
