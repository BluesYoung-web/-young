# unplugin-json-conf

在运行/打包过程中，加载指定位置的JSON文件的内容作为虚拟模块的默认导出内容

## 安装

```bash
# 选择一个你喜欢的包管理器
# NPM
$ npm install @bluesyoung/unplugin-json-conf --save

# Yarn
$ yarn add @bluesyoung/unplugin-json-conf

# pnpm
$ pnpm add @bluesyoung/unplugin-json-conf
```

## 使用

## 项目代码相关

```ts
// 注入环境变量(json 配置文件的路径)
VITE_JSON_CONF_URL = './data.json'

// 注入 env.d.ts
declare module 'virtual:json-conf' {
  const src: Record<string, any>
  export default src
}
// 使用
import json from 'virtual:json-conf';
```

## 配置相关

Vite

```ts
// vite.config.ts
import JsonConf from '@bluesyoung/unplugin-json-conf/vite'

export default defineConfig({
  plugins: [
    JsonConf({ /* options */ }),
  ],
})
```

Example: [`playground/`](../../playground/unplugin-json-conf-demo/vite.config.ts)

<br></details>

<details>
<summary>Rollup</summary><br>

```ts
// rollup.config.js
import JsonConf from '@bluesyoung/unplugin-json-conf/rollup'

export default {
  plugins: [
    JsonConf({ /* options */ }),
  ],
}
```

<br></details>


<details>
<summary>Webpack</summary><br>

```ts
// webpack.config.js
module.exports = {
  /* ... */
  plugins: [
    require('@bluesyoung/unplugin-json-conf/webpack')({ /* options */ })
  ]
}
```

<br></details>

<details>
<summary>Nuxt</summary><br>

```ts
// nuxt.config.js
export default {
  buildModules: [
    ['@bluesyoung/unplugin-json-conf/nuxt', { /* options */ }],
  ],
}
```

> This module works for both Nuxt 2 and [Nuxt Vite](https://github.com/nuxt/vite)

<br></details>

<details>
<summary>Vue CLI</summary><br>

```ts
// vue.config.js
module.exports = {
  configureWebpack: {
    plugins: [
      require('@bluesyoung/unplugin-json-conf/webpack')({ /* options */ }),
    ],
  },
}
```

<br></details>