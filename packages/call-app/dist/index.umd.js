(function(u,l){typeof exports=="object"&&typeof module!="undefined"?module.exports=l():typeof define=="function"&&define.amd?define(l):(u=typeof globalThis!="undefined"?globalThis:u||self,u.YoungCallApp=l())})(this,function(){"use strict";function u(e){let o;if(e.nodeName==="SELECT")e.focus(),o=e.value;else if(e.nodeName==="INPUT"||e.nodeName==="TEXTAREA"){var t=e.hasAttribute("readonly");t||e.setAttribute("readonly",""),e.select(),e.setSelectionRange(0,e.value.length),t||e.removeAttribute("readonly"),o=e.value}else{e.hasAttribute("contenteditable")&&e.focus();const r=window.getSelection(),i=document.createRange();i.selectNodeContents(e),r.removeAllRanges(),r.addRange(i),o=r.toString()}return o}function l(e,o){let t,r,i=!1;o=o||{},t=o.debug||!1;try{const n=document.documentElement.getAttribute("dir")=="rtl";r=document.createElement("textarea"),r.style.fontSize="12pt",r.style.border="0",r.style.padding="0",r.style.margin="0",r.style.position="absolute",r.style[n?"right":"left"]="-9999px";let s=window.pageYOffset||document.documentElement.scrollTop;if(r.style.top=`${s}px`,r.setAttribute("readonly",""),r.value=e,document.body.appendChild(r),u(r),!document.execCommand("copy"))throw new Error("copy command was unsuccessful");i=!0}catch(n){t&&console.error("unable to copy using execCommand: ",n),t&&console.warn("trying IE specific stuff");try{window.clipboardData.setData("text",e),i=!0}catch(s){t&&console.error("unable to copy using clipboardData: ",s)}}finally{r&&document.body.removeChild(r)}return i}function c(e){return function(o){return Object.prototype.toString.call(o)==="[object "+e+"]"}}function p(e,o){for(let t=0,r=e.length;t<r&&o.call(e,e[t],t)!==!1;t++);}class w{constructor(o){this._rules=o}_detect(o,t,r){const i=c("Function")(t)?t.call(null,r):t;if(!i)return null;const n={name:o,version:"0",codename:""};if(i===!0)return n;if(c("String")(i)){if(r.indexOf(i)!==-1)return n}else{if(c("Object")(i))return i.hasOwnProperty("version")&&(n.version=i.version),n;if(c("RegExp")(i)){const s=i.exec(r);if(s)return s.length>=2&&s[1]&&(n.version=s[1].replace(/_/g,".")),n}}}_parseItem(o,t,r,i){let n=this,s={name:"na",version:"0"};p(t,function(a){const f=n._detect(a[0],a[1],o);if(f)return s=f,!1}),r.call(i,s.name,s.version)}parse(o){o=(o||"").toLowerCase();const t={};return this._parseItem(o,this._rules.os,function(r,i){const n=parseFloat(i);t.os={name:r,version:n,fullVersion:i},t.os[r]=n},t),this._parseItem(o,this._rules.browser,function(r,i){let n=i;const s=parseFloat(i);t.browser={name:r,version:s,fullVersion:i,mode:parseFloat(n),fullMode:n},t.browser[r]=s},t),t}}const m=[["ios",function(e){return/\bcpu(?: iphone)? os /.test(e)?/\bcpu(?: iphone)? os ([0-9._]+)/:e.indexOf("iph os ")!==-1?/\biph os ([0-9_]+)/:/\bios\b/}],["android",function(e){return e.indexOf("android")>=0?/\bandroid[ \/-]?([0-9.x]+)?/:e.indexOf("adr")>=0?e.indexOf("mqqbrowser")>=0?/\badr[ ]\(linux; u; ([0-9.]+)?/:/\badr(?:[ ]([0-9.]+))?/:"android"}],["wp",function(e){return e.indexOf("windows phone ")!==-1?/\bwindows phone (?:os )?([0-9.]+)/:e.indexOf("xblwp")!==-1?/\bxblwp([0-9.]+)/:e.indexOf("zunewp")!==-1?/\bzunewp([0-9.]+)/:"windows phone"}],["symbian",/\bsymbian(?:os)?\/([0-9.]+)/],["chromeos",/\bcros i686 ([0-9.]+)/],["linux","linux"],["windowsce",/\bwindows ce(?: ([0-9.]+))?/]],h=[["micromessenger",/\bmicromessenger\/([\d.]+)/],["qq",/\bqq/i],["qzone",/qzone\/.*_qz_([\d.]+)/i],["qqbrowser",/\bm?qqbrowser\/([0-9.]+)/],["tt",/\btencenttraveler ([0-9.]+)/],["weibo",/weibo__([0-9.]+)/],["uc",function(e){return e.indexOf("ucbrowser/")>=0?/\bucbrowser\/([0-9.]+)/:e.indexOf("ubrowser/")>=0?/\bubrowser\/([0-9.]+)/:/\buc\/[0-9]/.test(e)?/\buc\/([0-9.]+)/:e.indexOf("ucweb")>=0?/\bucweb([0-9.]+)?/:/\b(?:ucbrowser|uc)\b/}],["360",function(e){return e.indexOf("360 aphone browser")!==-1?/\b360 aphone browser \(([^\)]+)\)/:/\b360(?:se|ee|chrome|browser)\b/}],["baidu",function(e){let o=0,t;return/ baiduboxapp\//i.test(e)?((t=/([\d+.]+)_(?:diordna|enohpi)_/.exec(e))?(t=t[1].split("."),o=t.reverse().join(".")):(t=/baiduboxapp\/([\d+.]+)/.exec(e))&&(o=t[1]),{version:o}):!1}],["baidubrowser",/\b(?:ba?idubrowser|baiduhd)[ \/]([0-9.x]+)/],["bdminivideo",/bdminivideo\/([0-9.]+)/],["sogou",function(e){return e.indexOf("sogoumobilebrowser")>=0?/sogoumobilebrowser\/([0-9.]+)/:e.indexOf("sogoumse")>=0?!0:/ se ([0-9.x]+)/}],["ali-ap",function(e){return e.indexOf("aliapp")>0?/\baliapp\(ap\/([0-9.]+)\)/:/\balipayclient\/([0-9.]+)\b/}],["ali-tb",/\baliapp\(tb\/([0-9.]+)\)/],["ali-tm",/\baliapp\(tm\/([0-9.]+)\)/],["tao",/\btaobrowser\/([0-9.]+)/],["mi",/\bmiuibrowser\/([0-9.]+)/],["oppo",/\boppobrowser\/([0-9.]+)/],["vivo",/\bvivobrowser\/([0-9.]+)/],["meizu",/\bmzbrowser\/([0-9.]+)/],["nokia",/\bnokiabrowser\/([0-9.]+)/],["samsung",/\bsamsungbrowser\/([0-9.]+)/],["maxthon",/\b(?:maxthon|mxbrowser)(?:[ \/]([0-9.]+))?/],["opera",function(e){const o=/\bopera.+version\/([0-9.ab]+)/,t=/\bopr\/([0-9.]+)/;return o.test(e)?o:t}],["edge",/edge\/([0-9.]+)/],["firefox",/\bfirefox\/([0-9.ab]+)/],["chrome",/ (?:chrome|crios|crmo)\/([0-9.]+)/],["android",function(e){if(e.indexOf("android")!==-1)return/\bversion\/([0-9.]+(?: beta)?)/}],["safari",/\bversion\/([0-9.]+(?: beta)?)(?: mobile(?:\/[a-z0-9]+)?)? safari\//],["webview",/\bcpu(?: iphone)? os (?:[0-9._]+).+\bapplewebkit\b/]],g=new w({os:m,browser:h}),x=navigator.userAgent+" "+navigator.appVersion+" "+navigator.vendor,d=g.parse(x),y=d.os.name==="ios",b=d.browser.name==="micromessenger",v={timeout:2500,mask:{wechat:()=>null},startCall:()=>console.log("---\u5F00\u59CB\u5524\u7AEF---"),callFail:()=>console.log("---\u5524\u8D77\u5931\u8D25\uFF0C\u8DF3\u8F6C\u4E0B\u8F7D---")};class O{constructor(o,t={}){this.options=Object.assign(v,t),this.generateScheme(o)}generateScheme(o){var n,s;let t="",r="",i="(\u590D\u5236\u6B64\u6D88\u606F\u6253\u5F00app)|";if(y?(t+=`${o.ios_shceme}://`,r=(o==null?void 0:o.download.ios)||o.landpage):(t+=`${o.android_shceme}://`,r=((n=o==null?void 0:o.download)==null?void 0:n.yyb)||o.landpage,b&&((s=o==null?void 0:o.download)==null?void 0:s.yyb)&&(r=o.download.yyb)),o.path&&(t+=o.path),o.params){const a=new URLSearchParams(o.params).toString();t+=`?${a}`,i+=a}this.scheme=t,this.download=r,this.info=i}call(){const{mask:o,startCall:t}=this.options;if(b&&o.wechat){o.wechat();return}this.copyInfo(),t==null||t(),window.location.href=this.scheme,this.fallback()}copyInfo(){l(this.info)}fallback(){const o=setTimeout(()=>{var t,r;(r=(t=this.options).callFail)==null||r.call(t),window.location.href=this.download},this.options.timeout);setTimeout(()=>{window.addEventListener("blur",()=>clearTimeout(o))},this.options.timeout-500)}}return O});
//# sourceMappingURL=index.umd.js.map
