# 新手引导组件

基于 Web Components 实现([更加复杂的操作可以使用 shepherd](https://github.com/shipshapecode/shepherd))
## 使用

[vue demo](../../playground/beginner-guid-demo/src/App.vue)

## 注意

**底层依赖 `webcomponents` 和 `css clip-path`**，特殊环境请自行 `polyfill`

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
import { YoungBeginnerGuidController } from '@bluesyoung/beginner-guid';
/**
 * 极简形态
 */
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
  }
]);

/**
 * 完全形态
 */
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
  }
], {
  // 页面加载完毕之后自动开始
  immdiate: true,
  // 禁止中途关闭
  force: true
});
</script>

<template>
  <button @click="guid.show()">开始引导</button>
</template>
```

### 浏览器直接引入

```html
<!-- 国内推荐使用 jsdelivr -->
<script src="//cdn.jsdelivr.net/npm/@bluesyoung/beginner-guid"></script>
<!-- or -->
<script src="//unpkg.com/@bluesyoung/beginner-guid"></script>

<script>
const { YoungBeginnerGuidController } = window.YoungBeginnerGuid;
const guid = new YoungBeginnerGuidController();

guid.show();
</script>
```

## 开发环境

```bash
node: 16.13.1
pnpm: 6.26.1
```

## 开发

```bash
# 基于 vitest 的 TDD
pnpm dev
# 执行单元测试
pnpm test

# 基于 vite/rollup 打包
# tsup 打出来的包在部分环境下无法正常使用，所以目前只是用来生成 dts 文件
pnpm build
```

## 打包

```bash
# 产出所有格式的包
pnpm build
```