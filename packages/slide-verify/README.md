# 滑块验证码

基于 Web Components + [lit](https://lit.dev/docs/) 实现

## 使用

[vue demo](../../playground/slide-verify-demo/src/App.vue)


### 使用包管理器

```bash
# 选择一个你喜欢的包管理器
# NPM
$ npm install @bluesyoung/beginner-guid --save

# Yarn
$ yarn add @bluesyoung/beginner-guid

# pnpm
$ pnpm add @bluesyoung/beginner-guid
```

```html
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
```

### 浏览器直接引入

```html
<!-- 国内推荐使用 jsdelivr -->
<script src="//cdn.jsdelivr.net/npm/@bluesyoung/slide-verify"></script>
<!-- or -->
<script src="//unpkg.com/@bluesyoung/slide-verify"></script>

<script>
const { YoungImgSlider } = window.YoungSlideVerify;
const slide = new YoungBeginnerGuidController();

slide.show();
</script>
```

## 开发环境

```bash
node: 16.13.1
pnpm: 7.1.9
```