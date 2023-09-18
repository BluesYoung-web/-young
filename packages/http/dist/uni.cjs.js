"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const g=require("./index-3f21b585.js"),{Axios:H,AxiosError:v,CanceledError:P,isCancel:K,CancelToken:N,VERSION:V,all:W,Cancel:j,isAxiosError:J,spread:B,toFormData:G,AxiosHeaders:z,HttpStatusCode:Q,formToJSON:X,getAdapter:Y,mergeConfig:Z}=g.axios;var L=e=>{let{method:m="GET"}=e;switch(m.toLocaleLowerCase()){case"download":return"download";case"upload":return"upload";default:return"request"}},M=e=>({...e}),R=(e,m)=>{var i,o,c,d,l;let p=e.data,f=e.responseType==="arraybuffer"?"arraybuffer":"text",r=f==="text"?"json":void 0,s=e.headers;if(e.auth){let E=e.auth.username||"",O=e.auth.password?unescape(encodeURIComponent(e.auth.password)):"";s.set("Authorization","Basic "+btoa(E+":"+O))}let u=g.buildFullPath(e.baseURL,e.url),w=(o=(i=e==null?void 0:e.method)==null?void 0:i.toUpperCase())!=null?o:"GET",b=g.buildURL(u,e.params,e.paramsSerializer),t=e.timeout||6e4,n=(c=e.withCredentials)!=null?c:!1,a=(d=e.sslVerify)!=null?d:!0,h=(l=e.firstIpv4)!=null?l:!1,T={};if(p&&typeof p=="string")try{T=JSON.parse(p)}catch{}let y=s.toJSON();return{...e,url:b,data:p,header:y,method:w,responseType:f,dataType:r,timeout:t,withCredentials:n,sslVerify:a,firstIpv4:h,formData:T}},q=(e,m)=>{let i=0,o=g.speedometer(50,250);return c=>{let d=c.totalBytesWritten,l=c.totalBytesExpectedToWrite,p=d-i,f=o(p),r=d<=l;i=d;let s={loaded:d,total:l,progress:l?d/l:void 0,bytes:p,rate:f||void 0,estimated:f&&l&&r?(l-d)/f:void 0,event:c};s[m?"download":"upload"]=!0,e(s)}},C=class{constructor(e){this.config=e}subscribe(e,m){(this.config.cancelToken||this.config.signal)&&(this.onCanceled=i=>{e&&(m(!i||i.type?new P(void 0,void 0,this.config,e):i),e.abort(),e=null)},this.config.cancelToken&&this.config.cancelToken.subscribe(this.onCanceled),this.config.signal&&this.config.signal.addEventListener&&(this.config.signal.aborted?this.onCanceled():this.config.signal.addEventListener("abort",this.onCanceled)))}unsubscribe(){this.config.cancelToken&&this.config.cancelToken.unsubscribe(this.onCanceled),this.config.signal&&this.config.signal.removeEventListener&&this.config.signal.removeEventListener("abort",this.onCanceled)}},x=(e,m)=>new Promise((i,o)=>{let{url:c,header:d,timeout:l,filePath:p}=R(e),f=new C(e),r=uni.downloadFile({url:c,header:d,timeout:l,filePath:p,success(s){var u;if(!r)return;let w={config:e,data:s.tempFilePath,headers:{},status:s.statusCode,statusText:(u=s.errMsg)!=null?u:"OK",request:r};g.settle(i,o,w),r=null},fail(s){let{errMsg:u=""}=s??{};u&&(u==="downloadFile:fail timeout"&&o(new v(u,v.ETIMEDOUT,e,r)),u==="downloadFile:fail"&&o(new v(u,v.ERR_NETWORK,e,r))),o(new v(s.errMsg,void 0,e,r)),r=null},complete(){f.unsubscribe()}});typeof e.onDownloadProgress=="function"&&r.onProgressUpdate(q(e.onDownloadProgress,!0)),typeof e.onHeadersReceived=="function"&&r.onHeadersReceived(e.onHeadersReceived),f.subscribe(r,o)}),k=x,_=(e,m)=>new Promise((i,o)=>{let{url:c,files:d,fileType:l,file:p,filePath:f,name:r,header:s,timeout:u,formData:w}=R(e),b=new C(e),t=uni.uploadFile({url:c,files:d,fileType:l,file:p,filePath:f,name:r,header:s,timeout:u,formData:w,success(n){var a;if(!t)return;let h={config:e,data:n.data,headers:{},status:n.statusCode,statusText:(a=n.errMsg)!=null?a:"OK",request:t};g.settle(i,o,h),t=null},fail(n){let{errMsg:a=""}=n??{};if(a){let h=a==="uploadFile:fail timeout",T=a==="uploadFile:fail file error";h&&o(new v(a,v.ETIMEDOUT,e,t)),T&&o(new v(a,v.ERR_NETWORK,e,t))}o(new v(n.errMsg,void 0,e,t)),t=null},complete(){b.unsubscribe()}});typeof e.onHeadersReceived=="function"&&t.onHeadersReceived(e.onHeadersReceived),b.subscribe(t,o)}),F=_,U=(e,m)=>new Promise((i,o)=>{let{url:c,data:d,header:l,method:p,timeout:f,dataType:r,responseType:s,sslVerify:u,withCredentials:w,firstIpv4:b}=R(e),t=new C(e),n=uni.request({url:c,data:d,header:l,method:p,timeout:f,dataType:r,responseType:s,sslVerify:u,withCredentials:w,firstIpv4:b,success(a){var h;if(!n)return;let T={config:e,data:a.data,headers:a.header,status:a.statusCode,statusText:(h=a.errMsg)!=null?h:"OK",request:n,cookies:a.cookies};g.settle(i,o,T),n=null},fail(a){let{errMsg:h=""}=a??{};if(h){let T=h==="request:fail timeout",y=h==="request:fail";T&&o(new v(h,v.ETIMEDOUT,e,n)),y&&o(new v(h,v.ERR_NETWORK,e,n))}o(new v(a.errMsg,void 0,e,n)),n=null},complete(){t.unsubscribe()}});typeof e.onHeadersReceived=="function"&&n.onHeadersReceived(e.onHeadersReceived),t.subscribe(n,o)}),D=U,I=e=>{switch(L(e)){case"download":return k;case"upload":return F;default:return D}},A=(e={})=>{let m=M(e);return H.prototype.download=function(i,o){return this.request({url:i,method:"download",...o})},H.prototype.upload=function(i,o,c){return this.request({url:i,method:"upload",data:o,...c})},i=>I(i)(i,m)};const S=(e={})=>{const m=g.defu(e,g.defaultConfig),{baseURL:i,lazyBaseURL:o,method:c,timeout:d,headers:l,checkFn:p,loading:f,fail:r}=m,s=g.axios.create({method:c,timeout:d,adapter:A()});let u=0;function w(){u++,f.start()}function b(){--u===0&&f.end()}return s.interceptors.request.use(t=>(!t.notLoading&&w(),t.baseURL||(t.baseURL=(o==null?void 0:o())??i),t),t=>(r(t),Promise.reject(t))),s.interceptors.response.use(t=>{!t.config.notLoading&&b();const n=t.data;try{return p(n)}catch(a){r(a)}},t=>{t&&t.config&&!t.config.notLoading&&b(),r(t)}),{get:void 0,post:void 0,delete:void 0,put:void 0,patch:void 0,head:void 0,purge:void 0,options:void 0,link:void 0,unlink:void 0,__instance__:s,__mixin__(t){for(const n in t)if(Object.prototype.hasOwnProperty.call(t,n)){const a=this[n]||{},h=t[n];this[n]={...a,...h}}return this},freeReq:t=>s.request({...t,headers:{...l.getCommonHeaders(),...t==null?void 0:t.headers}}),authReq:t=>s.request({...t,headers:{...l.getCommonHeaders(),...l.getAuthHeaders(t),...t==null?void 0:t.headers}})}};exports.useHttp=S;
//# sourceMappingURL=uni.cjs.js.map
