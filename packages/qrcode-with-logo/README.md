# 生成带 logo 的二维码

[灵感来源](https://github.com/zxpsuper/qrcode-with-logos)

## 改进

**使用 vite 打包**

**支持 esm**

### 使用包管理器

```bash
# 选择一个你喜欢的包管理器
# NPM
$ npm install @bluesyoung/qrcode-with-logo --save

# Yarn
$ yarn add @bluesyoung/qrcode-with-logo

# pnpm
$ pnpm add @bluesyoung/qrcode-with-logo
```

```html
<script setup lang="ts">
import YoungQRCodeLogo from '@bluesyoung/qrcode-with-logo';
const qrcode_src = await (await new YoungQRCodeLogo({
  content: '链接目标地址',
  logo: {
    src: 'logo 图片地址',
  }
}).getCanvas()).toDataURL();
</script>
```

### 浏览器直接引入

```html
<!-- 国内推荐使用 jsdelivr -->
<script src="//cdn.jsdelivr.net/npm/@bluesyoung/qrcode-with-logo"></script>
<!-- or -->
<script src="//unpkg.com/@bluesyoung/qrcode-with-logo"></script>

<script>
const qrcode_src = await (await new window.YoungQRCodeLogo({
  content: '链接目标地址',
  logo: {
    src: 'logo 图片地址',
  }
}).getCanvas()).toDataURL();
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