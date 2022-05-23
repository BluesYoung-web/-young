<!--
 * @Author: zhangyang
 * @Date: 2022-05-17 12:19:18
 * @LastEditTime: 2022-05-23 15:36:29
 * @Description: 
-->
<script setup lang="ts">
import { YoungBeginnerGuidController } from '@bluesyoung/beginner-guid';
// import { YoungBeginnerGuidController } from '../../../packages/beginner-guid/src/index';

const guid = new YoungBeginnerGuidController([
  {
    el: '#step1',
    content: 'test1',
    title: 'llllll'
  },
  {
    el: '#step2',
    content: 'test2',
    title: 'mmmmmmmmmmmm'
  },
  {
    el: '#step3',
    content: 'test3',
    title: '<span style="color: red;">fdakjfadkjgsfd</span>'
  },
  {
    el: '#step4',
    content: 'test4',
    title: '<span style="color: red;">fdakjfadkjgsfd</span>'
  },
  {
    el: '#step5',
    content: 'test5',
    title: '<span style="color: red;">fdakjfadkjgsfd</span>'
  },
  {
    el: '#step6',
    content: 'test6',
    title: '<span style="color: red;">fdakjfadkjgsfd</span>'
  },
  {
    el: '.btn',
    content: 'test---button',
    title: '<span style="color: red;">bye!</span>'
  }
]);

</script>

<template>
  <div>
    <div class="items">
      <div id="step1">111111</div>
      <div id="step2">222222</div>
      <div id="step3">333333</div>
      <div id="step4">444444</div>
      <div id="step5">555555</div>
      <div id="step6">666666</div>
    </div>
    <button type="button" class="btn" @click="guid.show()">开始引导</button>
  </div>
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
}
.items {
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-columns: 1fr 1fr;
  justify-items: stretch;
  justify-content: space-between;
  align-content: space-between;
}
.btn {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 10px;
}
</style>
