"use strict";Object.defineProperties(exports,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}});const n=require("vue"),E=require("@vueuse/core"),R=n.defineComponent({props:{zIndex:{type:Number,default:2e3}},setup(a,{expose:c,slots:f}){const u=n.ref(!1),g=()=>u.value=!0,d=()=>u.value=!1,S=l=>{l.composedPath()[0]===l.currentTarget&&d()};c({show:g,hide:d});const e=n.ref(),v=l=>{l.ctrlKey&&l.key.toLocaleLowerCase()==="k"&&(l.preventDefault(),u.value?d():(g(),n.nextTick(()=>{var r;(r=e.value)==null||r.focus()})))};return n.onMounted(()=>{window.addEventListener("keydown",v)}),n.onUnmounted(()=>{window.removeEventListener("keydown",v)}),()=>n.createVNode(n.Teleport,{to:"body"},{default:()=>[n.createVNode("div",{onClick:l=>S(l),style:{display:u.value?"block":"none",backgroundColor:"rgba(0, 0, 0, 0.6)",width:"100vw",height:"100vh",position:"absolute",left:0,top:0,zIndex:a.zIndex}},[n.createVNode("div",{style:{position:"relative",left:"50%",top:"50%",transform:"translate(-50%, -50%)",width:"min(600px, 70%)",maxHeight:"min(520px, 60%)",overflow:"auto",borderRadius:"1rem",border:"1px solid rgb(219, 234, 254)",backgroundColor:"white",padding:"2rem",boxShadow:"rgba(0, 0, 0, 0) 0 0 0 0, rgba(0, 0, 0, 0) 0 0 0 0, 0 4px 6px -1px rgb(0 0 0/0.1), 0 2px 4px -2px rgb(0 0 0/0.1)"}},[f.default?f.default({el:e}):n.createVNode("input",{ref:e,type:"text"},null)])])]})}}),_=n.defineComponent({props:{titleStyle:{type:Object,default:()=>({})},activeStyle:{type:[Object,String],required:!0},inactiveStyle:{type:[Object,String],required:!0},titles:{type:Array,required:!0}},setup(a,{slots:c}){const f=n.ref(0);return()=>{var u;return n.createVNode(n.Fragment,null,[n.createVNode("div",{style:{display:"flex",width:"100%",justifyContent:"space-between",...a.titleStyle}},[a.titles.map((g,d)=>n.createVNode("div",{key:d+"adjhskse",style:d===f.value?a.activeStyle:a.inactiveStyle,onClick:()=>f.value=d},[g]))]),(u=c[`index_${f.value}`])==null?void 0:u.call(c)])}}}),F=n.defineComponent({props:{modelValue:{type:Boolean,required:!0},menuList:{type:Object,required:!0}},emits:["update:modelValue","clickItem"],setup(a,{emit:c}){const{x:f,y:u}=E.useMouse(),g=n.ref(0),d=n.ref(0),S=n.ref();n.watch(()=>a.modelValue,(l,r)=>{l&&!r&&n.nextTick(()=>{console.log(S.value);const{width:w,height:N}=window.getComputedStyle(S.value),{innerWidth:X,innerHeight:V}=window,C=f.value,T=u.value,M=parseFloat(w),s=parseFloat(N);g.value=X-C>M?C:X-M,d.value=V-T>s?T:V-s})});const e=l=>{c("clickItem",l)},v=()=>{c("update:modelValue",!1)};return()=>n.createVNode(n.Teleport,{to:"body"},{default:()=>[a.modelValue&&n.createVNode("div",{style:{backgroundColor:"rgba(200, 200, 200, 0)",position:"absolute",width:"100vw",height:"100vh",top:0,zIndex:1001},onClick:()=>v()},[n.createVNode("ul",{ref:S,style:{left:g.value+"px",top:d.value+"px",margin:0,background:"#fff",zIndex:3e3,position:"absolute",listStyleType:"none",padding:"5px 0",borderRadius:"4px",fontSize:"12px",fontWeight:400,color:"#333",boxShadow:"2px 2px 3px 0 rgba(0, 0, 0, .3)"}},[a.menuList.map((l,r)=>n.createVNode("li",{key:r+"fdasjhe",style:{margin:0,padding:"7px 16px",cursor:"pointer"},onClick:w=>{w.stopPropagation(),e(l.handlerName)},onMouseover:w=>w.currentTarget.style.background="#eee",onMouseleave:w=>w.currentTarget.style.background="#fff"},[l.title]))])])]})}}),j=n.defineComponent({props:{canvasWidth:{type:Number,default:310},canvasHeight:{type:Number,default:160},show:{type:Boolean,default:!1},puzzleScale:{type:Number,default:1},sliderSize:{type:Number,default:50},range:{type:Number,default:10},imgs:{type:Array,default:void 0},successText:{type:String,default:"\u9A8C\u8BC1\u901A\u8FC7\uFF01"},failText:{type:String,default:"\u9A8C\u8BC1\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5"},sliderText:{type:String,default:"\u62D6\u52A8\u6ED1\u5757\u5B8C\u6210\u62FC\u56FE"},zIndex:{type:Number,default:10001}},emits:["success","fail","close"],setup(a,{emit:c,attrs:f}){const u=n.ref(),g=n.ref(),d=n.ref(),S=n.ref(),e=n.reactive({mouseDown:!1,startWidth:50,startX:0,newX:0,pinX:0,pinY:0,loading:!1,isCanSlide:!1,error:!1,infoBoxShow:!1,infoText:"",infoBoxFail:!1,timer1:void 0,closeDown:!1,isSuccess:!1,imgIndex:-1,isSubmting:!1});n.watch(()=>a.show,i=>{i?(document.body.classList.add("vue-puzzle-overflow"),k()):(e.isSubmting=!1,e.isSuccess=!1,e.infoBoxShow=!1,document.body.classList.remove("vue-puzzle-overflow"))});const v=n.computed(()=>{const i=e.startWidth+e.newX-e.startX;return i<r.value?r.value:i>a.canvasWidth?a.canvasWidth:i}),l=n.computed(()=>Math.round(Math.max(Math.min(a.puzzleScale,2),.2)*52.5+6)),r=n.computed(()=>Math.max(Math.min(Math.round(a.sliderSize),Math.round(a.canvasWidth*.5)),10)),w=()=>{e.mouseDown||(e.timer1&&clearTimeout(e.timer1),c("close"))},N=()=>{e.closeDown=!0},X=()=>{e.closeDown&&w(),e.closeDown=!1},V=i=>{var t,h;e.isCanSlide&&(e.mouseDown=!0,e.startWidth=(h=(t=u.value)==null?void 0:t.clientWidth)!=null?h:0,e.newX=i.clientX||i.changedTouches[0].clientX,e.startX=i.clientX||i.changedTouches[0].clientX)},C=i=>{e.mouseDown&&(i.preventDefault(),e.newX=i.clientX||i.changedTouches[0].clientX)},T=()=>{e.mouseDown&&(e.mouseDown=!1,P())},M=(i=!1)=>{var D;if(e.loading&&!i)return;e.loading=!0,e.isCanSlide=!1;const t=g.value,h=d.value,m=S.value,o=t==null?void 0:t.getContext("2d"),b=h==null?void 0:h.getContext("2d"),p=m==null?void 0:m.getContext("2d");if(!o||!b||!p){console.error("not found ctx / ctx2 / ctx3");return}const L=navigator.userAgent.indexOf("Firefox")>=0&&navigator.userAgent.indexOf("Windows")>=0,y=document.createElement("img");if(o.fillStyle="rgba(255,255,255,1)",p.fillStyle="rgba(255,255,255,1)",o.clearRect(0,0,a.canvasWidth,a.canvasHeight),b.clearRect(0,0,a.canvasWidth,a.canvasHeight),e.pinX=s(l.value+20,a.canvasWidth-l.value-10),e.pinY=s(20,a.canvasHeight-l.value-10),y.crossOrigin="anonymous",y.onload=()=>{const[x,Y,I,W]=H(y);o.save(),z(o),o.closePath(),L?(o.clip(),o.save(),o.shadowOffsetX=0,o.shadowOffsetY=0,o.shadowColor="#000",o.shadowBlur=3,o.fill(),o.restore()):(o.shadowOffsetX=0,o.shadowOffsetY=0,o.shadowColor="#000",o.shadowBlur=3,o.fill(),o.clip()),o.drawImage(y,x,Y,I,W),p.fillRect(0,0,a.canvasWidth,a.canvasHeight),p.drawImage(y,x,Y,I,W),o.globalCompositeOperation="source-atop",z(o),o.arc(e.pinX+Math.ceil(l.value/2),e.pinY+Math.ceil(l.value/2),l.value*1.2,0,Math.PI*2,!0),o.closePath(),o.shadowColor="rgba(255, 255, 255, .8)",o.shadowOffsetX=-1,o.shadowOffsetY=-1,o.shadowBlur=Math.min(Math.ceil(8*a.puzzleScale),12),o.fillStyle="#ffffaa",o.fill();const O=o.getImageData(e.pinX-3,e.pinY-20,e.pinX+l.value+5,e.pinY+l.value+5);b.putImageData(O,0,e.pinY-20),o.restore(),o.clearRect(0,0,a.canvasWidth,a.canvasHeight),o.save(),z(o),o.globalAlpha=.8,o.fillStyle="#ffffff",o.fill(),o.restore(),o.save(),o.globalCompositeOperation="source-atop",z(o),o.arc(e.pinX+Math.ceil(l.value/2),e.pinY+Math.ceil(l.value/2),l.value*1.2,0,Math.PI*2,!0),o.shadowColor="#000",o.shadowOffsetX=2,o.shadowOffsetY=2,o.shadowBlur=16,o.fill(),o.restore(),o.save(),o.globalCompositeOperation="destination-over",o.drawImage(y,x,Y,I,W),o.restore(),e.loading=!1,e.isCanSlide=!0},y.onerror=()=>{M(!0)},!i&&((D=a.imgs)==null?void 0:D.length)){let x=s(0,a.imgs.length-1);x===e.imgIndex&&(x===a.imgs.length-1?x=0:x++),e.imgIndex=x,y.src=a.imgs[x]}else y.src=$()},s=(i,t)=>Math.ceil(Math.random()*(t-i)+i),H=i=>{const t=i.width/i.height,h=a.canvasWidth/a.canvasHeight;let m=0,o=0,b=0,p=0;return t>h?(p=a.canvasHeight,b=t*p,o=0,m=(a.canvasWidth-b)/2):(b=a.canvasWidth,p=b/t,m=0,o=(a.canvasHeight-p)/2),[m,o,b,p]},z=i=>{const t=Math.ceil(15*a.puzzleScale);i.beginPath(),i.moveTo(e.pinX,e.pinY),i.lineTo(e.pinX+t,e.pinY),i.arcTo(e.pinX+t,e.pinY-t/2,e.pinX+t+t/2,e.pinY-t/2,t/2),i.arcTo(e.pinX+t+t,e.pinY-t/2,e.pinX+t+t,e.pinY,t/2),i.lineTo(e.pinX+t+t+t,e.pinY),i.lineTo(e.pinX+t+t+t,e.pinY+t),i.arcTo(e.pinX+t+t+t+t/2,e.pinY+t,e.pinX+t+t+t+t/2,e.pinY+t+t/2,t/2),i.arcTo(e.pinX+t+t+t+t/2,e.pinY+t+t,e.pinX+t+t+t,e.pinY+t+t,t/2),i.lineTo(e.pinX+t+t+t,e.pinY+t+t+t),i.lineTo(e.pinX,e.pinY+t+t+t),i.lineTo(e.pinX,e.pinY+t+t),i.arcTo(e.pinX+t/2,e.pinY+t+t,e.pinX+t/2,e.pinY+t+t/2,t/2),i.arcTo(e.pinX+t/2,e.pinY+t,e.pinX,e.pinY+t,t/2),i.lineTo(e.pinX,e.pinY)},$=()=>{const i=document.createElement("canvas"),t=i.getContext("2d");if(!t)return console.error("not found ctx"),"";i.width=a.canvasWidth,i.height=a.canvasHeight,t.fillStyle=`rgb(${s(100,255)},${s(100,255)},${s(100,255)})`,t.fillRect(0,0,a.canvasWidth,a.canvasHeight);for(let h=0;h<12;h++)if(t.fillStyle=`rgb(${s(100,255)},${s(100,255)},${s(100,255)})`,t.strokeStyle=`rgb(${s(100,255)},${s(100,255)},${s(100,255)})`,s(0,2)>1)t.save(),t.rotate(s(-90,90)*Math.PI/180),t.fillRect(s(-20,i.width-20),s(-20,i.height-20),s(10,i.width/2+10),s(10,i.height/2+10)),t.restore();else{t.beginPath();const m=s(-Math.PI,Math.PI);t.arc(s(0,i.width),s(0,i.height),s(10,i.height/2+10),m,m+Math.PI*1.5),t.closePath(),t.fill()}return i.toDataURL("image/png")},P=()=>{e.isSubmting=!0;const i=Math.abs(e.pinX-(v.value-r.value)+(l.value-r.value)*((v.value-r.value)/(a.canvasWidth-r.value))-3);i<a.range?(e.infoText=a.successText,e.infoBoxFail=!1,e.infoBoxShow=!0,e.isCanSlide=!1,e.isSuccess=!0,e.timer1&&clearTimeout(e.timer1),e.timer1=setTimeout(()=>{e.isSubmting=!1,c("success",i)},800)):(e.infoText=a.failText,e.infoBoxFail=!0,e.infoBoxShow=!0,e.isCanSlide=!1,c("fail",i),e.timer1&&clearTimeout(e.timer1),e.timer1=setTimeout(()=>{e.isSubmting=!1,k()},800))},B=()=>{e.infoBoxFail=!1,e.infoBoxShow=!1,e.isCanSlide=!1,e.isSuccess=!1,e.startWidth=r.value,e.startX=0,e.newX=0},k=()=>{e.isSubmting||(B(),M())};return n.onMounted(()=>{document.addEventListener("mousemove",C,!1),document.addEventListener("mouseup",T,!1),document.addEventListener("touchmove",C,{passive:!1}),document.addEventListener("touchend",T,!1),a.show&&(document.body.classList.add("vue-puzzle-overflow"),k())}),n.onUnmounted(()=>{e.timer1&&clearTimeout(e.timer1),document.removeEventListener("mousemove",C,!1),document.removeEventListener("mouseup",T,!1),document.removeEventListener("touchmove",C),document.removeEventListener("touchend",T,!1)}),()=>n.createVNode("div",n.mergeProps(f,{style:{position:"fixed",top:0,left:0,bottom:0,right:0,backgroundColor:"rgba(0, 0, 0, 0.3)",zIndex:a.zIndex,opacity:a.show?1:0,pointerEvents:a.show?"auto":"none",transition:"opacity 200ms"},onMousedown:N,onMouseup:X,onTouchstart:N,onTouchend:X}),[n.createVNode("style",null,[`
            @keyframes load {
              0% {
                opacity: 1;
                transform: scale(1.3);
              }
              100% {
                opacity: 0.2;
                transform: scale(0.3);
              }
            }
            .loading_item {
              display: inline-block;
              width: 5px;
              height: 100%;
              margin-left: 2px;
              border-radius: 50%;
              background-color: #888;
              animation: load 1.04s ease infinite;
            }
            .reset_ {
              position: absolute;
              top: 2px;
              right: 2px;
              width: 35px;
              height: auto;
              z-index: 12;
              cursor: pointer;
              transition: transform 200ms;
              transform: rotate(0deg);
            }
            .reset_:hover {
              transform: rotate(-90deg);
            }

            .auth-control_ .range-box {
              position: relative;
              width: 100%;
              background-color: #eef1f8;
              margin-top: 20px;
              border-radius: 3px;
              box-shadow: 0 0 8px rgba(240, 240, 240, 0.6) inset;
            }

            .auth-control_ .range-text {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              font-size: 14px;
              color: #b7bcd1;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              text-align: center;
              width: 100%;
            }
            .auth-control_ .range-slider {
              position: absolute;
              height: 100%;
              width: 50px;
              background-color: rgba(106, 160, 255, 0.8);
              border-radius: 3px;
            }
            .vue-puzzle-overflow {
              overflow: hidden !important;
            }
            .range-slider .range-btn {
              position: absolute;
              display: flex;
              align-items: center;
              justify-content: center;
              right: 0;
              width: 50px;
              height: 100%;
              background-color: #fff;
              border-radius: 3px;
              box-shadow: 0 0 4px #ccc;
              cursor: pointer;
            }

            .range-slider .range-btn > div {
              width: 0;
              height: 40%;
              transition: all 200ms;
              border: solid 1px #6aa0ff;
            }

            .range-slider .range-btn > div:nth-child(2) {
              margin: 0 4px;
            }

            .range-slider .range-btn:hover > div:nth-child(1), .range-slider .range-btn.isDown > div:nth-child(1) {
              border: solid 4px transparent;
              height: 0;
              border-right-color: #6aa0ff;
            }

            .range-slider .range-btn:hover > div:nth-child(2), .range-slider .range-btn.isDown > div:nth-child(2) {
              border-width: 3px;
              height: 0;
              border-radius: 3px;
              margin: 0 6px;
              border-right-color: #6aa0ff;
            }

            .range-slider .range-btn:hover > div:nth-child(3), .range-slider .range-btn.isDown > div:nth-child(3) {
              border: solid 4px transparent;
              height: 0;
              border-left-color: #6aa0ff;
            }
            `]),n.createVNode("div",{style:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",padding:"20px",background:"#fff",userSelect:"none",borderRadius:"3px",boxShadow:"0 1px 3px rgba(0, 0, 0, 0.3)"},onMousedown:i=>i.stopPropagation(),onTouchstart:i=>i.stopPropagation()},[n.createVNode("div",{style:{position:"relative",overflow:"hidden",borderRadius:"3px",height:`${a.canvasHeight}px`}},[n.createVNode("canvas",{ref:g,width:a.canvasWidth,height:a.canvasHeight,style:{width:`${a.canvasWidth}px`,height:`${a.canvasHeight}px`}},null),n.createVNode("canvas",{ref:S,style:{position:"absolute",top:0,left:0,opacity:e.isSuccess?1:0,zIndex:3,transition:"opacity 600ms",width:`${a.canvasWidth}px`,height:`${a.canvasHeight}px`},width:a.canvasWidth,height:a.canvasHeight},null),n.createVNode("canvas",{ref:d,style:{position:"absolute",top:0,left:0,width:`${l.value}px`,height:`${a.canvasHeight}px`,zIndex:2,transform:`translateX(${v.value-r.value-(l.value-r.value)*((v.value-r.value)/(a.canvasWidth-r.value))}px)`},width:l.value,height:a.canvasHeight},null),n.createVNode("div",{style:{position:"absolute",top:0,left:0,bottom:0,right:0,backgroundColor:"rgba(0, 0, 0, 0.8)",zIndex:20,opacity:e.loading?1:0,pointerEvents:e.loading?"auto":"none",transition:"opacity 100ms",display:"flex",alignItems:"center",justifyContent:"center"}},[n.createVNode("div",{style:{flex:"none",height:"5px",lineHeight:0}},[n.createVNode("span",{class:"loading_item",style:{animationPlayState:e.loading?"":"paused",marginLeft:0}},null),n.createVNode("span",{class:"loading_item",style:{animationPlayState:e.loading?"":"paused",animationDelay:"0.13s"}},null),n.createVNode("span",{class:"loading_item",style:{animationPlayState:e.loading?"":"paused",animationDelay:"0.26s"}},null),n.createVNode("span",{class:"loading_item",style:{animationPlayState:e.loading?"":"paused",animationDelay:"0.39s"}},null),n.createVNode("span",{class:"loading_item",style:{animationPlayState:e.loading?"":"paused",animationDelay:"0.52s"}},null)])]),n.createVNode("div",{style:{position:"absolute",left:0,bottom:0,width:"100%",height:"24px",lineHeight:"24px",textAlign:"center",overflow:"hidden",fontSize:"13px",backgroundColor:e.infoBoxFail?"#ce594b":"#83ce3f",opacity:e.infoBoxShow?.95:0,transform:`translateY(${e.infoBoxShow?0:"24px"})`,transition:"all 200ms",color:"#fff",zIndex:10}},[e.infoText]),n.createVNode("div",{style:{position:"absolute",top:0,left:0,width:"30px",height:"100%",backgroundColor:"rgba(255, 255, 255, 0.1)",zIndex:3,transform:`translateX(${e.isSuccess?`${a.canvasWidth+a.canvasHeight*.578}px`:`-${a.canvasHeight*.578}px`}) skew(-30deg, 0)`,transition:e.isSuccess?"transform 600ms":""}},null),n.createVNode("img",{class:"reset_",title:"\u5237\u65B0",onClick:k,src:"data:image/svg+xml;utf8,%3Csvg preserveAspectRatio='xMidYMid meet' viewBox='0 0 21 24' width='1em' height='1em' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath fill='%2343CF96' d='m7.5 21l2.999-3v1.5a7.501 7.501 0 0 0 5.299-12.811l2.114-2.124A10.465 10.465 0 0 1 21 12.002C21 17.8 16.3 22.5 10.502 22.5H10.5V24zM0 12C.007 6.204 4.704 1.507 10.499 1.5h.001V0l3 3l-3 3V4.5h-.002a7.502 7.502 0 0 0-5.299 12.812l-2.112 2.124a10.397 10.397 0 0 1-3.088-7.407v-.03v.002z'/%3E%3C/svg%3E"},null)]),n.createVNode("div",{class:"auth-control_"},[n.createVNode("div",{class:"range-box",style:{height:`${r.value}px`}},[n.createVNode("div",{class:"range-text"},[a.sliderText]),n.createVNode("div",{ref:u,class:"range-slider",style:{width:`${v.value}px`}},[n.createVNode("div",{class:`${e.mouseDown?"range-btn isDown":"range-btn"}`,style:{width:`${r.value}px`},onMousedown:V,onTouchstart:V},[n.createVNode("div",null,null),n.createVNode("div",null,null),n.createVNode("div",null,null)])])])])])])}});exports.YoungCmdPopup=R;exports.YoungContextMenu=F;exports.YoungSlideVerify=j;exports.YoungTab=_;
//# sourceMappingURL=index.cjs.js.map
