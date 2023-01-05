"use strict";Object.defineProperties(exports,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}});const e=require("vue"),h=require("@vueuse/core"),w=e.defineComponent({props:{zIndex:{type:Number,default:2e3}},setup(o,{expose:a,slots:l}){const r=e.ref(!1),u=()=>r.value=!0,n=()=>r.value=!1,c=t=>{t.composedPath()[0]===t.currentTarget&&n()};a({show:u,hide:n});const s=e.ref(),p=t=>{t.ctrlKey&&t.key.toLocaleLowerCase()==="k"&&(t.preventDefault(),r.value?n():(u(),e.nextTick(()=>{var d;(d=s.value)==null||d.focus()})))};return e.onMounted(()=>{window.addEventListener("keydown",p)}),e.onUnmounted(()=>{window.removeEventListener("keydown",p)}),()=>e.createVNode(e.Teleport,{to:"body"},{default:()=>[e.createVNode("div",{onClick:t=>c(t),style:{display:r.value?"block":"none",backgroundColor:"rgba(0, 0, 0, 0.6)",width:"100vw",height:"100vh",position:"absolute",left:0,top:0,zIndex:o.zIndex}},[e.createVNode("div",{style:{position:"relative",left:"50%",top:"50%",transform:"translate(-50%, -50%)",width:"min(600px, 70%)",maxHeight:"min(520px, 60%)",overflow:"auto",borderRadius:"1rem",border:"1px solid rgb(219, 234, 254)",backgroundColor:"white",padding:"2rem",boxShadow:"rgba(0, 0, 0, 0) 0 0 0 0, rgba(0, 0, 0, 0) 0 0 0 0, 0 4px 6px -1px rgb(0 0 0/0.1), 0 2px 4px -2px rgb(0 0 0/0.1)"}},[l.default?l.default({el:s}):e.createVNode("input",{ref:s,type:"text"},null)])])]})}}),k=e.defineComponent({props:{titleStyle:{type:Object,default:()=>({})},activeStyle:{type:[Object,String],required:!0},inactiveStyle:{type:[Object,String],required:!0},titles:{type:Array,required:!0}},setup(o,{slots:a}){const l=e.ref(0);return()=>{var r;return e.createVNode(e.Fragment,null,[e.createVNode("div",{style:{display:"flex",width:"100%",justifyContent:"space-between",...o.titleStyle}},[o.titles.map((u,n)=>e.createVNode("div",{key:n+"adjhskse",style:n===l.value?o.activeStyle:o.inactiveStyle,onClick:()=>l.value=n},[u]))]),(r=a[`index_${l.value}`])==null?void 0:r.call(a)])}}}),C=e.defineComponent({props:{modelValue:{type:Boolean,required:!0},menuList:{type:Object,required:!0}},emits:["update:modelValue","clickItem"],setup(o,{emit:a}){const{x:l,y:r}=h.useMouse(),u=e.ref(0),n=e.ref(0),c=e.ref();e.watch(()=>o.modelValue,(t,d)=>{t&&!d&&e.nextTick(()=>{console.log(c.value);const{width:i,height:m}=window.getComputedStyle(c.value),{innerWidth:f,innerHeight:v}=window,g=l.value,y=r.value,b=parseFloat(i),x=parseFloat(m);u.value=f-g>b?g:f-b,n.value=v-y>x?y:v-x})});const s=t=>{a("clickItem",t)},p=()=>{a("update:modelValue",!1)};return()=>e.createVNode(e.Teleport,{to:"body"},{default:()=>[o.modelValue&&e.createVNode("div",{style:{backgroundColor:"rgba(200, 200, 200, 0)",position:"absolute",width:"100vw",height:"100vh",top:0,zIndex:1001},onClick:()=>p()},[e.createVNode("ul",{ref:c,style:{left:u.value+"px",top:n.value+"px",margin:0,background:"#fff",zIndex:3e3,position:"absolute",listStyleType:"none",padding:"5px 0",borderRadius:"4px",fontSize:"12px",fontWeight:400,color:"#333",boxShadow:"2px 2px 3px 0 rgba(0, 0, 0, .3)"}},[o.menuList.map((t,d)=>e.createVNode("li",{key:d+"fdasjhe",style:{margin:0,padding:"7px 16px",cursor:"pointer"},onClick:i=>{i.stopPropagation(),s(t.handlerName)},onMouseover:i=>i.currentTarget.style.background="#eee",onMouseleave:i=>i.currentTarget.style.background="#fff"},[t.title]))])])]})}});exports.YoungCmdPopup=w;exports.YoungContextMenu=C;exports.YoungTab=k;
//# sourceMappingURL=index.cjs.js.map
