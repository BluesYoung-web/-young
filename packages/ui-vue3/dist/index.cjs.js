"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const n=require("vue"),E=require("@vueuse/core"),R=n.defineComponent({props:{zIndex:{type:Number,default:2e3}},setup(a,{expose:c,slots:h}){const u=n.ref(!1),f=()=>u.value=!0,d=()=>u.value=!1,y=l=>{l.composedPath()[0]===l.currentTarget&&d()};c({show:f,hide:d});const e=n.ref(),g=l=>{l.ctrlKey&&l.key.toLocaleLowerCase()==="k"&&(l.preventDefault(),u.value?d():(f(),n.nextTick(()=>{var r;(r=e.value)==null||r.focus()})))};return n.onMounted(()=>{window.addEventListener("keydown",g)}),n.onUnmounted(()=>{window.removeEventListener("keydown",g)}),()=>n.createVNode(n.Teleport,{to:"body"},{default:()=>[n.createVNode("div",{onClick:l=>y(l),style:{display:u.value?"block":"none",backgroundColor:"rgba(0, 0, 0, 0.6)",width:"100vw",height:"100vh",position:"absolute",left:0,top:0,zIndex:a.zIndex}},[n.createVNode("div",{style:{position:"relative",left:"50%",top:"50%",transform:"translate(-50%, -50%)",width:"min(600px, 70%)",maxHeight:"min(520px, 60%)",overflow:"auto",borderRadius:"1rem",border:"1px solid rgb(219, 234, 254)",backgroundColor:"white",padding:"2rem",boxShadow:"rgba(0, 0, 0, 0) 0 0 0 0, rgba(0, 0, 0, 0) 0 0 0 0, 0 4px 6px -1px rgb(0 0 0/0.1), 0 2px 4px -2px rgb(0 0 0/0.1)"}},[h.default?h.default({el:e}):n.createVNode("input",{ref:e,type:"text"},null)])])]})}}),_=n.defineComponent({props:{titleStyle:{type:Object,default:()=>({fontSize:"24px",width:"220px"})},activeStyle:{type:[Object,String],default:()=>({color:"#409eff",cursor:"pointer",borderBottom:"2px solid #409eff",marginBottom:"20px"})},inactiveStyle:{type:[Object,String],default:()=>({cursor:"pointer",marginBottom:"20px"})},titles:{type:Array,required:!0}},setup(a,{slots:c}){const h=n.ref(0);return()=>{var u;return n.createVNode(n.Fragment,null,[n.createVNode("div",{style:{display:"flex",width:"100%",justifyContent:"space-between",...a.titleStyle}},[a.titles.map((f,d)=>n.createVNode("div",{key:d+"adjhskse",style:d===h.value?a.activeStyle:a.inactiveStyle,onClick:()=>h.value=d},[f]))]),(u=c[`index_${h.value}`])==null?void 0:u.call(c)])}}}),F=n.defineComponent({props:{modelValue:{type:Boolean,required:!0},menuList:{type:Object,required:!0}},emits:["update:modelValue","clickItem"],setup(a,{emit:c}){const{x:h,y:u}=E.useMouse(),f=n.ref(0),d=n.ref(0),y=n.ref();n.watch(()=>a.modelValue,(l,r)=>{l&&!r&&n.nextTick(()=>{console.log(y.value);const{width:x,height:M}=window.getComputedStyle(y.value),{innerWidth:X,innerHeight:V}=window,C=h.value,T=u.value,N=parseFloat(x),s=parseFloat(M);f.value=X-C>N?C:X-N,d.value=V-T>s?T:V-s})});const e=l=>{c("clickItem",l)},g=()=>{c("update:modelValue",!1)};return()=>n.createVNode(n.Teleport,{to:"body"},{default:()=>[a.modelValue&&n.createVNode("div",{style:{backgroundColor:"rgba(200, 200, 200, 0)",position:"absolute",width:"100vw",height:"100vh",top:0,zIndex:1001},onClick:()=>g()},[n.createVNode("ul",{ref:y,style:{left:f.value+"px",top:d.value+"px",margin:0,background:"#fff",zIndex:3e3,position:"absolute",listStyleType:"none",padding:"5px 0",borderRadius:"4px",fontSize:"12px",fontWeight:400,color:"#333",boxShadow:"2px 2px 3px 0 rgba(0, 0, 0, .3)"}},[a.menuList.map((l,r)=>n.createVNode("li",{key:r+"fdasjhe",style:{margin:0,padding:"7px 16px",cursor:"pointer"},onClick:x=>{x.stopPropagation(),e(l.handlerName)},onMouseover:x=>x.currentTarget.style.background="#eee",onMouseleave:x=>x.currentTarget.style.background="#fff"},[l.title]))])])]})}}),j=n.defineComponent({props:{canvasWidth:{type:Number,default:310},canvasHeight:{type:Number,default:160},show:{type:Boolean,default:!1},puzzleScale:{type:Number,default:1},sliderSize:{type:Number,default:50},range:{type:Number,default:10},imgs:{type:Array,default:void 0},successText:{type:String,default:"验证通过！"},failText:{type:String,default:"验证失败，请重试"},sliderText:{type:String,default:"拖动滑块完成拼图"},zIndex:{type:Number,default:10001}},emits:["success","fail","close"],setup(a,{emit:c,attrs:h}){const u=n.ref(),f=n.ref(),d=n.ref(),y=n.ref(),e=n.reactive({mouseDown:!1,startWidth:50,startX:0,newX:0,pinX:0,pinY:0,loading:!1,isCanSlide:!1,error:!1,infoBoxShow:!1,infoText:"",infoBoxFail:!1,timer1:void 0,closeDown:!1,isSuccess:!1,imgIndex:-1,isSubmting:!1});n.watch(()=>a.show,o=>{o?(document.body.classList.add("vue-puzzle-overflow"),k()):(e.isSubmting=!1,e.isSuccess=!1,e.infoBoxShow=!1,document.body.classList.remove("vue-puzzle-overflow"))});const g=n.computed(()=>{const o=e.startWidth+e.newX-e.startX;return o<r.value?r.value:o>a.canvasWidth?a.canvasWidth:o}),l=n.computed(()=>Math.round(Math.max(Math.min(a.puzzleScale,2),.2)*52.5+6)),r=n.computed(()=>Math.max(Math.min(Math.round(a.sliderSize),Math.round(a.canvasWidth*.5)),10)),x=()=>{e.mouseDown||(e.timer1&&clearTimeout(e.timer1),c("close"))},M=()=>{e.closeDown=!0},X=()=>{e.closeDown&&x(),e.closeDown=!1},V=o=>{var t;e.isCanSlide&&(e.mouseDown=!0,e.startWidth=((t=u.value)==null?void 0:t.clientWidth)??0,e.newX=o.clientX||o.changedTouches[0].clientX,e.startX=o.clientX||o.changedTouches[0].clientX)},C=o=>{e.mouseDown&&(o.preventDefault(),e.newX=o.clientX||o.changedTouches[0].clientX)},T=()=>{e.mouseDown&&(e.mouseDown=!1,B())},N=(o=!1)=>{var D;if(e.loading&&!o)return;e.loading=!0,e.isCanSlide=!1;const t=f.value,S=d.value,v=y.value,i=t==null?void 0:t.getContext("2d"),w=S==null?void 0:S.getContext("2d"),m=v==null?void 0:v.getContext("2d");if(!i||!w||!m){console.error("not found ctx / ctx2 / ctx3");return}const L=navigator.userAgent.indexOf("Firefox")>=0&&navigator.userAgent.indexOf("Windows")>=0,b=document.createElement("img");if(i.fillStyle="rgba(255,255,255,1)",m.fillStyle="rgba(255,255,255,1)",i.clearRect(0,0,a.canvasWidth,a.canvasHeight),w.clearRect(0,0,a.canvasWidth,a.canvasHeight),e.pinX=s(l.value+20,a.canvasWidth-l.value-10),e.pinY=s(20,a.canvasHeight-l.value-10),b.crossOrigin="anonymous",b.onload=()=>{const[p,Y,I,W]=H(b);i.save(),z(i),i.closePath(),L?(i.clip(),i.save(),i.shadowOffsetX=0,i.shadowOffsetY=0,i.shadowColor="#000",i.shadowBlur=3,i.fill(),i.restore()):(i.shadowOffsetX=0,i.shadowOffsetY=0,i.shadowColor="#000",i.shadowBlur=3,i.fill(),i.clip()),i.drawImage(b,p,Y,I,W),m.fillRect(0,0,a.canvasWidth,a.canvasHeight),m.drawImage(b,p,Y,I,W),i.globalCompositeOperation="source-atop",z(i),i.arc(e.pinX+Math.ceil(l.value/2),e.pinY+Math.ceil(l.value/2),l.value*1.2,0,Math.PI*2,!0),i.closePath(),i.shadowColor="rgba(255, 255, 255, .8)",i.shadowOffsetX=-1,i.shadowOffsetY=-1,i.shadowBlur=Math.min(Math.ceil(8*a.puzzleScale),12),i.fillStyle="#ffffaa",i.fill();const O=i.getImageData(e.pinX-3,e.pinY-20,e.pinX+l.value+5,e.pinY+l.value+5);w.putImageData(O,0,e.pinY-20),i.restore(),i.clearRect(0,0,a.canvasWidth,a.canvasHeight),i.save(),z(i),i.globalAlpha=.8,i.fillStyle="#ffffff",i.fill(),i.restore(),i.save(),i.globalCompositeOperation="source-atop",z(i),i.arc(e.pinX+Math.ceil(l.value/2),e.pinY+Math.ceil(l.value/2),l.value*1.2,0,Math.PI*2,!0),i.shadowColor="#000",i.shadowOffsetX=2,i.shadowOffsetY=2,i.shadowBlur=16,i.fill(),i.restore(),i.save(),i.globalCompositeOperation="destination-over",i.drawImage(b,p,Y,I,W),i.restore(),e.loading=!1,e.isCanSlide=!0},b.onerror=()=>{N(!0)},!o&&((D=a.imgs)!=null&&D.length)){let p=s(0,a.imgs.length-1);p===e.imgIndex&&(p===a.imgs.length-1?p=0:p++),e.imgIndex=p,b.src=a.imgs[p]}else b.src=$()},s=(o,t)=>Math.ceil(Math.random()*(t-o)+o),H=o=>{const t=o.width/o.height,S=a.canvasWidth/a.canvasHeight;let v=0,i=0,w=0,m=0;return t>S?(m=a.canvasHeight,w=t*m,i=0,v=(a.canvasWidth-w)/2):(w=a.canvasWidth,m=w/t,v=0,i=(a.canvasHeight-m)/2),[v,i,w,m]},z=o=>{const t=Math.ceil(15*a.puzzleScale);o.beginPath(),o.moveTo(e.pinX,e.pinY),o.lineTo(e.pinX+t,e.pinY),o.arcTo(e.pinX+t,e.pinY-t/2,e.pinX+t+t/2,e.pinY-t/2,t/2),o.arcTo(e.pinX+t+t,e.pinY-t/2,e.pinX+t+t,e.pinY,t/2),o.lineTo(e.pinX+t+t+t,e.pinY),o.lineTo(e.pinX+t+t+t,e.pinY+t),o.arcTo(e.pinX+t+t+t+t/2,e.pinY+t,e.pinX+t+t+t+t/2,e.pinY+t+t/2,t/2),o.arcTo(e.pinX+t+t+t+t/2,e.pinY+t+t,e.pinX+t+t+t,e.pinY+t+t,t/2),o.lineTo(e.pinX+t+t+t,e.pinY+t+t+t),o.lineTo(e.pinX,e.pinY+t+t+t),o.lineTo(e.pinX,e.pinY+t+t),o.arcTo(e.pinX+t/2,e.pinY+t+t,e.pinX+t/2,e.pinY+t+t/2,t/2),o.arcTo(e.pinX+t/2,e.pinY+t,e.pinX,e.pinY+t,t/2),o.lineTo(e.pinX,e.pinY)},$=()=>{const o=document.createElement("canvas"),t=o.getContext("2d");if(!t)return console.error("not found ctx"),"";o.width=a.canvasWidth,o.height=a.canvasHeight,t.fillStyle=`rgb(${s(100,255)},${s(100,255)},${s(100,255)})`,t.fillRect(0,0,a.canvasWidth,a.canvasHeight);for(let S=0;S<12;S++)if(t.fillStyle=`rgb(${s(100,255)},${s(100,255)},${s(100,255)})`,t.strokeStyle=`rgb(${s(100,255)},${s(100,255)},${s(100,255)})`,s(0,2)>1)t.save(),t.rotate(s(-90,90)*Math.PI/180),t.fillRect(s(-20,o.width-20),s(-20,o.height-20),s(10,o.width/2+10),s(10,o.height/2+10)),t.restore();else{t.beginPath();const v=s(-Math.PI,Math.PI);t.arc(s(0,o.width),s(0,o.height),s(10,o.height/2+10),v,v+Math.PI*1.5),t.closePath(),t.fill()}return o.toDataURL("image/png")},B=()=>{e.isSubmting=!0;const o=Math.abs(e.pinX-(g.value-r.value)+(l.value-r.value)*((g.value-r.value)/(a.canvasWidth-r.value))-3);o<a.range?(e.infoText=a.successText,e.infoBoxFail=!1,e.infoBoxShow=!0,e.isCanSlide=!1,e.isSuccess=!0,e.timer1&&clearTimeout(e.timer1),e.timer1=setTimeout(()=>{e.isSubmting=!1,c("success",o)},800)):(e.infoText=a.failText,e.infoBoxFail=!0,e.infoBoxShow=!0,e.isCanSlide=!1,c("fail",o),e.timer1&&clearTimeout(e.timer1),e.timer1=setTimeout(()=>{e.isSubmting=!1,k()},800))},P=()=>{e.infoBoxFail=!1,e.infoBoxShow=!1,e.isCanSlide=!1,e.isSuccess=!1,e.startWidth=r.value,e.startX=0,e.newX=0},k=()=>{e.isSubmting||(P(),N())};return n.onMounted(()=>{document.addEventListener("mousemove",C,!1),document.addEventListener("mouseup",T,!1),document.addEventListener("touchmove",C,{passive:!1}),document.addEventListener("touchend",T,!1),a.show&&(document.body.classList.add("vue-puzzle-overflow"),k())}),n.onUnmounted(()=>{e.timer1&&clearTimeout(e.timer1),document.removeEventListener("mousemove",C,!1),document.removeEventListener("mouseup",T,!1),document.removeEventListener("touchmove",C),document.removeEventListener("touchend",T,!1)}),()=>n.createVNode("div",n.mergeProps(h,{style:{position:"fixed",top:0,left:0,bottom:0,right:0,backgroundColor:"rgba(0, 0, 0, 0.3)",zIndex:a.zIndex,opacity:a.show?1:0,pointerEvents:a.show?"auto":"none",transition:"opacity 200ms"},onMousedown:M,onMouseup:X,onTouchstart:M,onTouchend:X}),[n.createVNode("style",null,[`
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
            `]),n.createVNode("div",{style:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",padding:"20px",background:"#fff",userSelect:"none",borderRadius:"3px",boxShadow:"0 1px 3px rgba(0, 0, 0, 0.3)"},onMousedown:o=>o.stopPropagation(),onTouchstart:o=>o.stopPropagation()},[n.createVNode("div",{style:{position:"relative",overflow:"hidden",borderRadius:"3px",height:`${a.canvasHeight}px`}},[n.createVNode("canvas",{ref:f,width:a.canvasWidth,height:a.canvasHeight,style:{width:`${a.canvasWidth}px`,height:`${a.canvasHeight}px`}},null),n.createVNode("canvas",{ref:y,style:{position:"absolute",top:0,left:0,opacity:e.isSuccess?1:0,zIndex:3,transition:"opacity 600ms",width:`${a.canvasWidth}px`,height:`${a.canvasHeight}px`},width:a.canvasWidth,height:a.canvasHeight},null),n.createVNode("canvas",{ref:d,style:{position:"absolute",top:0,left:0,width:`${l.value}px`,height:`${a.canvasHeight}px`,zIndex:2,transform:`translateX(${g.value-r.value-(l.value-r.value)*((g.value-r.value)/(a.canvasWidth-r.value))}px)`},width:l.value,height:a.canvasHeight},null),n.createVNode("div",{style:{position:"absolute",top:0,left:0,bottom:0,right:0,backgroundColor:"rgba(0, 0, 0, 0.8)",zIndex:20,opacity:e.loading?1:0,pointerEvents:e.loading?"auto":"none",transition:"opacity 100ms",display:"flex",alignItems:"center",justifyContent:"center"}},[n.createVNode("div",{style:{flex:"none",height:"5px",lineHeight:0}},[n.createVNode("span",{class:"loading_item",style:{animationPlayState:e.loading?"":"paused",marginLeft:0}},null),n.createVNode("span",{class:"loading_item",style:{animationPlayState:e.loading?"":"paused",animationDelay:"0.13s"}},null),n.createVNode("span",{class:"loading_item",style:{animationPlayState:e.loading?"":"paused",animationDelay:"0.26s"}},null),n.createVNode("span",{class:"loading_item",style:{animationPlayState:e.loading?"":"paused",animationDelay:"0.39s"}},null),n.createVNode("span",{class:"loading_item",style:{animationPlayState:e.loading?"":"paused",animationDelay:"0.52s"}},null)])]),n.createVNode("div",{style:{position:"absolute",left:0,bottom:0,width:"100%",height:"24px",lineHeight:"24px",textAlign:"center",overflow:"hidden",fontSize:"13px",backgroundColor:e.infoBoxFail?"#ce594b":"#83ce3f",opacity:e.infoBoxShow?.95:0,transform:`translateY(${e.infoBoxShow?0:"24px"})`,transition:"all 200ms",color:"#fff",zIndex:10}},[e.infoText]),n.createVNode("div",{style:{position:"absolute",top:0,left:0,width:"30px",height:"100%",backgroundColor:"rgba(255, 255, 255, 0.1)",zIndex:3,transform:`translateX(${e.isSuccess?`${a.canvasWidth+a.canvasHeight*.578}px`:`-${a.canvasHeight*.578}px`}) skew(-30deg, 0)`,transition:e.isSuccess?"transform 600ms":""}},null),n.createVNode("img",{class:"reset_",title:"刷新",onClick:k,src:"data:image/svg+xml;utf8,%3Csvg preserveAspectRatio='xMidYMid meet' viewBox='0 0 21 24' width='1em' height='1em' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath fill='%2343CF96' d='m7.5 21l2.999-3v1.5a7.501 7.501 0 0 0 5.299-12.811l2.114-2.124A10.465 10.465 0 0 1 21 12.002C21 17.8 16.3 22.5 10.502 22.5H10.5V24zM0 12C.007 6.204 4.704 1.507 10.499 1.5h.001V0l3 3l-3 3V4.5h-.002a7.502 7.502 0 0 0-5.299 12.812l-2.112 2.124a10.397 10.397 0 0 1-3.088-7.407v-.03v.002z'/%3E%3C/svg%3E"},null)]),n.createVNode("div",{class:"auth-control_"},[n.createVNode("div",{class:"range-box",style:{height:`${r.value}px`}},[n.createVNode("div",{class:"range-text"},[a.sliderText]),n.createVNode("div",{ref:u,class:"range-slider",style:{width:`${g.value}px`}},[n.createVNode("div",{class:`${e.mouseDown?"range-btn isDown":"range-btn"}`,style:{width:`${r.value}px`},onMousedown:V,onTouchstart:V},[n.createVNode("div",null,null),n.createVNode("div",null,null),n.createVNode("div",null,null)])])])])])])}});exports.YoungCmdPopup=R;exports.YoungContextMenu=F;exports.YoungSlideVerify=j;exports.YoungTab=_;
//# sourceMappingURL=index.cjs.js.map
