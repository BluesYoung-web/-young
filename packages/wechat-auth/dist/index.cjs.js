"use strict";const a={state:"young_wechat_auth",scope:"snsapi_base"};class o{constructor(e){e=Object.assign(a,e);const t=new URLSearchParams(location.search),s=t.get("code");if(t.get("state"))return s;location.href=`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${e.appid}&redirect_uri=${encodeURIComponent(location.href)}&response_type=code&scope=${e.scope}&state=${e.state}#wechat_redirect`}}module.exports=o;
//# sourceMappingURL=index.cjs.js.map
