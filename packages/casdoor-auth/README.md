# 基于 Casdoor 二次封装的 SDK

## 使用

### 使用包管理器

```bash
# 选择一个你喜欢的包管理器
# NPM
$ npm install @bluesyoung/casdoor-auth --save

# Yarn
$ yarn add @bluesyoung/casdoor-auth

# pnpm
$ pnpm add @bluesyoung/casdoor-auth
```

```html
<script setup lang="ts">
import { YoungAuth } from '@bluesyoung/casdoor-auth';
/**
 * 默认配置
 * 
const defaultConf: SdkConfig = {
  serverUrl: 'https://door.casdoor.com',
  clientId: '014ae4bd048734ca2dea',
  organizationName: 'casbin',
  appName: 'app-casnode',
  redirectPath: window.location.pathname
};
 */
const auth = new YoungAuth();
await auth.init();
</script>

<template>
  <button @click="openHandler">启动APP</button>
</template>
```

### 浏览器直接引入

```html
<!-- 国内推荐使用 jsdelivr -->
<script src="//cdn.jsdelivr.net/npm/@bluesyoung/casdoor-auth"></script>
<!-- or -->
<script src="//unpkg.com/@bluesyoung/casdoor-auth"></script>

<script>
const auth = new window.YoungCasdoorAuth(config);

auth.init();
</script>
```

### 从主应用打开子应用无感登录

[逻辑解耦，父子通信使用 @bluesyoung/rpc](../rpc/README.md)