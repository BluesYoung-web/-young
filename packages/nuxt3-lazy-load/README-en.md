# Nuxt3 Resource Lazy Loading

[中文](./README.md)

## 🚀 Features

- 🌠 Lazy loading for images
- 🎧 Lazy loading for audios
- 📀 Lazy loading for videos
- 🖼️ Lazy loading for iframes
- ✨ Image processing capabilities based on OSS hosting providers

## 📦 Installation

```bash
npm i @bluesyoung/nuxt3-lazy-load -D
yarn add @bluesyoung/nuxt3-lazy-load -D
pnpm add @bluesyoung/nuxt3-lazy-load -D
```

## 🔨 Usage

```ts
// nuxt.config.ts
{
  modules: [
    // Module registration
    '@bluesyoung/nuxt3-lazy-load'
  ],
  // Detailed configuration, all optional, see the table below for configuration options
  '@bluesyoung/nuxt3-lazy-load': {}
}
```

### 📝 Configuration Options

Type | Default Value | Description
--- | --- | ----
`images` | `true` | Enable lazy loading for images
`audios` | `true` | Enable lazy loading for audios
`videos` | `true` | Enable lazy loading for videos
`iframes` | `true` | Enable lazy loading for iframes
`native` | `false` | Use only native `loading="lazy"`
`directiveOnly` | `false` | Use directives only, overriding previous configurations when enabled
`defaultImage` | `''` | Default placeholder image
`loadingClass` | `isLoading` | Class name for loading state
`loadedClass` | `isLoaded` | Class name for loaded state
`appendClass` | `lazyLoad` | Appended class name
`observerConfig` | `{}` | Additional configuration for `IntersectionObserver`
`OSSProvider` | `aliyun` | Hosting provider for `oss`, available values: `aliyun`, `tencent`, `qiniu`, `baidu`, `163yun`, `huawei`. Selecting a corresponding value will automatically add image processing parameters (convert to `75%` `webp` format)
`OSSProcess` | Optional | 1. If not configured, the provider's configuration will be used <br> 2. **Passing a string value will use the provided value for processing*without `?` needed***<br> 3. Passing `false` will disable image processing based on `oss` <br> 4. To process a specific element individually, set the element attribute: `data-image-process="specific provider query parameters"`, **higher priority**

## 📝 Usage Examples

### Using Default Configuration for All

- Simply use as usual, no need to modify the code intentionally, **all lazy loading is enabled by default**

#### Disabling Lazy Loading for Certain Content

```html
<img data-not-lazy src="https://img.yzcdn.cn/vant/logo.png" />
```

### Custom Directives

- `v-lazy-load`
- `v-not-lazy`

## Inspiration

[nuxt-lazy-load](https://gitlab.com/broj42/nuxt-lazy-load)

> The original repository lacks TypeScript support, causing issues with type hints in practical usage. Therefore, I forked the repository and made some modifications.