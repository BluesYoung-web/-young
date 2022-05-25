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

```ts
// 主应用
import { Master } from '@bluesyoung/casdoor-auth';

new Master({
  /**
   * 主应用收到子应用的消息
   * cmd 校验通过之后，执行的回调函数
   */
  onmsg_cbk: (e) => {
    const from = e.origin;

    // 传递给子应用的登录凭证
    // 字符串为 token，undefined 表示主应用登录过期
    const token = 'dsafadsfasd' | undefined;

    (e.source as Window)?.postMessage(token, from);
  }
}, cmd = 'I want to login');

// 子应用
import { Slave } from '@bluesyoung/casdoor-auth';

const slave = new Slave({
  master_url: '主应用源地址(location.origin)',
  /**
   * 子应用加载完成之后会发送一条 cmd 校验消息给主应用
   * 主应用校验通过之后会回复 token
   * 子应用校验消息的 origin 字段与主应用相同后，执行回调函数
   */
  onmsg_cbk: async (token) => {
    if (e) {
      // 根据 token 内容请求登录
    } else {
      // 主应用登录失效，执行子应用的默认登录程序或者重定向到主应用
    }
  }
}, cmd = 'I want to login');

onMounted(() => {
  // 子应用判断当前页面是否为主应用打开的
  //    如果是主应用打开的则发送 cmd 校验消息给主应用
  //    否则执行传入的回调函数
  slave.init(dingding_init);
});
```