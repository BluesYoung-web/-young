# 基于 postMessage(MessageChannel) 的远程调用库

## 特性

🌟 基于 [`postMessage`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/postMessage) + [`MessageChannel`](https://developer.mozilla.org/zh-CN/docs/Web/API/MessageChannel)

🌟 可用于 `window.open` 打开的页面及 `iframe` 嵌套的子页面与父页面之间的通信(远程函数调用)

🌟 **无视跨域限制，拥有安全限制，阻隔恶意消息**

🌟 `100% TypeScript`，拥有**完美的类型提示**

🌟 `esm | cjs | umd`，各种环境一应俱全

🌟 `IOC` 通信与调用解耦

## 安装

### 使用包管理器安装

```bash
# 选择一个你喜欢的包管理器
# NPM
$ npm install @bluesyoung/rpc --save

# Yarn
$ yarn add @bluesyoung/rpc

# pnpm
$ pnpm add @bluesyoung/rpc
```

### cdn 引入

```html
<!-- unpkg -->
<script src="//unpkg.com/@bluesyoung/rpc"></script>
<!-- jsdelivr -->
<script src="//cdn.jsdelivr.net/npm/@bluesyoung/rpc"></script>
<script>
const { YoungRPCMaster, YoungRPCSlave } = new window.YoungRPC;
</script>
```

## 使用示例

```ts
// test.ts 所有可调用的函数列表
export default {
  add: ({a, b}:{a: number, b: number}) => a + b,
  dec: ({a, b}:{a: number, b: number}) => a - b,
  getUsers: async () => {
    const res = await (await fetch('https://lf3-static.bytednsdoc.com/obj/eden-cn/beeh7uvzhq/users.json')).json();
    return res as {
      key: string;
      name: string;
      age: number;
      country: string;
    };
 }
};
```

```ts
//  子页面
import { YoungRPCSlave } from '@bluesyoung/rpc';
// 此时为使用值推导类型
// 实际应用中建议先定义函数签名，使用签名以达到更精准的类型提示
import fns from './test';

const app = new YoungRPCSlave<typeof fns>();
// 调用方式一：
const addFn = app.setHandler('add', {
  success: console.log,
  fail: console.error
});
addFn({ a: 1, b: 2 });
// 调用方式二
app.setHandler('add', {
  success: console.log,
  fail: console.error
});
app.trigger('add', { a: 1, b: 2 });
```

```ts
// 父页面
import { YoungRPCMaster } from '@bluesyoung/rpc';
// 此时为使用值推导类型
// 实际应用中建议先定义函数签名，使用签名以达到更精准的类型提示
import fns from './test';

const masterApp = new YoungRPCMaster<typeof fns>();
// 批量设置消息处理函数，默认直接透传
for (const [cmd, fn] of Object.entries(fns) as [[cmd: keyof typeof fns, fn: typeof fns[keyof typeof fns]]]) {
  if (typeof fn === 'function') {
    masterApp.setHandler(cmd, async (params) => {
      try {
        const data = await fn(params as any);
        masterApp.sendMsg({
          ok: true,
          data,
          cmd
        });
      } catch (error) {
        masterApp.sendMsg({
          ok: false,
          data: (error as Error).message,
          cmd
        });
      }
    });
  } else {
    throw new Error('cmd handler must be a function !');
  }
}
// 需要特殊处理的函数单独定义，覆盖之前的
masterApp.setHandler('getUsers', async () => {
  try {
    const data = await fns['getUsers']();
    masterApp.sendMsg({
      ok: true,
      data: {
        inject: 'master',
        data
      },
      cmd: 'getUsers'
    });
  } catch (error) {
    masterApp.sendMsg({
      ok: false,
      data: (error as Error).message,
      cmd: 'getUsers'
    });
  }
});
```