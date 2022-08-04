# 微信公众号网页授权

- [网页授权文档](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/Wechat_webpage_authorization.html)
- [网站应用登录](https://developers.weixin.qq.com/doc/oplatform/Website_App/WeChat_Login/Wechat_Login.html)
- [微信JSSDK](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html)

## 安装

### 使用包管理器安装

```bash
# 选择一个你喜欢的包管理器
# NPM
$ npm install @bluesyoung/wechat-auth --save

# Yarn
$ yarn add @bluesyoung/wechat-auth

# pnpm
$ pnpm add @bluesyoung/wechat-auth
```

### cdn 引入

```html
<!-- unpkg -->
<script src="//unpkg.com/@bluesyoung/wechat-auth"></script>
<!-- jsdelivr -->
<script src="//cdn.jsdelivr.net/npm/@bluesyoung/wechat-auth"></script>
<script>
const code = new window.YoungWechatAuth().getCode();
</script>
```

## 使用示例

```ts
import YoungWechatAuth from '@bluesyoung/wechat-auth';
// 网页获取授权码
const code = new YoungWechatAuth({
  appid: 'wx520c15f417810387',
  // state: 'young_wechat_auth',
  // redirect: location.href
}).getCode();
// 网页授权登录，微信外扫码，微信内网页授权登陆(snsapi_userinfo)
const code = new YoungWechatAuth({
  appid: 'wx520c15f417810387',
  // state: 'young_wechat_auth',
  // redirect: location.href
}).getCode('login');

if (code) {
  // do sth
}
```