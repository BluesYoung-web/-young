<!--
 * @Author: zhangyang
 * @Date: 2022-05-17 12:19:18
 * @LastEditTime: 2022-06-10 10:55:56
 * @Description: 
-->
<script setup lang="ts">
import { YoungBeginnerGuidControllerNext } from '@bluesyoung/beginner-guid';
// import { YoungBeginnerGuidControllerNext } from '../../../packages/beginner-guid/src/index';

// const guid = new YoungBeginnerGuidController([
const guid = new YoungBeginnerGuidControllerNext([
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
    title: 'fdakjfadkjgsfd',
    style_title: `color: red;`
  },
  {
    el: '#step4',
    content: 'test4',
    title: 'fdakjfadkjgsfd',
  },
  {
    el: '#step5',
    content: 'test5',
    title: 'fdakjfadkjgsfd',
  },
  {
    el: '#step6',
    content: 'test6',
    title: 'fdakjfadkjgsfd',
  },
  {
    el: '.btn',
    content: 'test---button',
    title: 'fdakjfadkjgsfd',
  },
  {
    el: 'h1',
    content: 'test---full',
    title: 'fdakjfadkjgsfd',
    style_content: 'background-color: skyblue;'
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
      <h1>啦啦啦啦</h1>
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
