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
</script>

<template>
  <button @click="auth.init()">立即登录</button>
</template>
```