# 画廊(图片/视频，类轮播)展示

基于 Web Components + [lit](https://lit.dev/docs/) 实现

## 使用

```html
<young-preview-gallary item-width="420" num="5">
  <young-preview-gallary-item>
    <img width="420" src="https://source.unsplash.com/collection/94734566/1920x1080" alt="" srcset="">
  </young-preview-gallary-item>

  <young-preview-gallary-item>
    <img width="420" src="https://source.unsplash.com/collection/94734566/1920x1080" alt="" srcset="">
  </young-preview-gallary-item>

  <young-preview-gallary-item>
    <img width="420" src="https://source.unsplash.com/collection/94734566/1920x1080" alt="" srcset="">
  </young-preview-gallary-item>

  <young-preview-gallary-item>
    <img width="420" src="https://source.unsplash.com/collection/94734566/1920x1080" alt="" srcset="">
  </young-preview-gallary-item>

  <young-preview-gallary-item>
    <img width="420" src="https://source.unsplash.com/collection/94734566/1920x1080" alt="" srcset="">
  </young-preview-gallary-item>
</young-preview-gallary>
```

### 使用包管理器

```bash
# 选择一个你喜欢的包管理器
# NPM
$ npm install @bluesyoung/preview-gallary --save

# Yarn
$ yarn add @bluesyoung/preview-gallary

# pnpm
$ pnpm add @bluesyoung/preview-gallary
```

```html
<script setup lang="ts">
import '@bluesyoung/preview-gallary';
</script>
```

### 浏览器直接引入

```html
<!-- unpkg -->
<script src="//unpkg.com/@bluesyoung/preview-gallary"></script>
<!-- or jsdelivr -->
<script src="//cdn.jsdelivr.net/npm/@bluesyoung/preview-gallary"></script>
```