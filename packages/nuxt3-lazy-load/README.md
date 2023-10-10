# nuxt3 资源懒加载

[English](./README-en.md)

## 🚀 特性

- 🌠 图片懒加载
- 🎧 音频懒加载
- 📀 视频懒加载
- 🖼️ iframe 懒加载
- ✨ 基于 oss 托管服务商的图片处理能力

## 📦 安装

```bash
npm i @bluesyoung/nuxt3-lazy-load -D
yarn add @bluesyoung/nuxt3-lazy-load -D
pnpm add @bluesyoung/nuxt3-lazy-load -D
```

## 🔨 使用

```ts
// nuxt.config.ts
{
  modules: [
    // 模块注册
    '@bluesyoung/nuxt3-lazy-load'
  ],
  // 详细配置，全部可选，配置项见下表
  '@bluesyoung/nuxt3-lazy-load': {}
}
```

### 📝 配置项

类型 | 默认值 | 说明
--- | --- | ----
`images` | `true` | 启用图片懒加载
`audios` | `true` | 启用音频懒加载
`videos` | `true` | 启用视频懒加载
`iframes` | `true` | 启用 iframe 懒加载
`native` | `false` | 仅使用原生的 loading="lazy"
`directiveOnly` | `false` | 仅使用指令，启用之后会覆盖之前的配置
`defaultImage` | `''` | 默认占位图
`loadingClass` | `isLoading` | 加载时的类名
`loadedClass` | `isLoaded` | 加载完成时的类名
`appendClass` | `lazyLoad` | 追加的类名
`observerConfig` | `{}` | `IntersectionObserver` 的额外配置
`OSSProvider` | `aliyun` | `oss` 托管服务商，可选值：`aliyun`、`tencent`、`qiniu`、`baidu`、`163yun`、`huawei`，选中对应的值，会自动添加对应的图片处理参数(转换为 `75%` 的 `webp`)
`OSSProcess` | 非必须参数 | 1. 不配置则使用服务商配置 <br> 2. **传递字符串默认使用传入值进行处理*无需 `?`***<br> 3. 传递 `false` 则关闭基于 `oss` 的图片处理功能 <br> 4. 单独处理某个元素，设置元素属性： `data-image-process="具体服务商的查询参数"`, **优先级更高**

## 📝 使用示例

### 全部使用默认配置

- 正常使用即可，无需刻意修改代码，**默认全部懒加载**

#### 部分内容不使用懒加载

```html
<img data-not-lazy src="https://img.yzcdn.cn/vant/logo.png" />
```

### 自定义指令

- `v-lazy-load`
- `v-pre-load="true/false"` 是否与加载对应的图片
- `v-not-lazy`

## 灵感来源

[nuxt-lazy-load](https://gitlab.com/broj42/nuxt-lazy-load)

> 原仓库没有使用 ts，导致在实际使用中类型提示有问题，因此 fork 了该仓库，并进行了部分修改