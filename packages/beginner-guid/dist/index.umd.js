(function(c,g){typeof exports=="object"&&typeof module!="undefined"?g(exports):typeof define=="function"&&define.amd?define(["exports"],g):(c=typeof globalThis!="undefined"?globalThis:c||self,g(c.YoungBeginnerGuid={}))})(this,function(c){"use strict";var g=`#mask {
  width: 100vw;
  height: 100vh;
  background-color: gray;
  opacity: 0.6;
  position: fixed;
  top: 0;
}
#dialog {
  width: 400px;
  height: 300px;
  background-color: #fff;
  position: fixed;
  top: 0;
}
#dialog .title {
  text-align: center;
}

#dialog .content {
  text-align: center;
}

#dialog .btns {
  position: absolute;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-justify-content: space-around;
      -ms-flex-pack: distribute;
          justify-content: space-around;
  bottom: 0;
  width: 100%;
  padding: 10%;
  -webkit-box-sizing: border-box;
          box-sizing: border-box;
}
#dialog .btns button {
  cursor: pointer;
}

#dialog-close {
  position: absolute;
  right: 0;
  top: 0;
  padding: 0.6rem;
  cursor: pointer;
}`,m='<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--ion" width="24" height="24" preserveAspectRatio="xMidYMid meet" viewBox="0 0 512 512"><path d="M331.3 308.7L278.6 256l52.7-52.7c6.2-6.2 6.2-16.4 0-22.6-6.2-6.2-16.4-6.2-22.6 0L256 233.4l-52.7-52.7c-6.2-6.2-15.6-7.1-22.6 0-7.1 7.1-6 16.6 0 22.6l52.7 52.7-52.7 52.7c-6.7 6.7-6.4 16.3 0 22.6 6.4 6.4 16.4 6.2 22.6 0l52.7-52.7 52.7 52.7c6.2 6.2 16.4 6.2 22.6 0 6.3-6.2 6.3-16.4 0-22.6z" fill="#434343"></path><path d="M256 76c48.1 0 93.3 18.7 127.3 52.7S436 207.9 436 256s-18.7 93.3-52.7 127.3S304.1 436 256 436c-48.1 0-93.3-18.7-127.3-52.7S76 304.1 76 256s18.7-93.3 52.7-127.3S207.9 76 256 76m0-28C141.1 48 48 141.1 48 256s93.1 208 208 208 208-93.1 208-208S370.9 48 256 48z" fill="currentColor"></path></svg>';const f=(s={},e="div")=>{const t=document.createElement(e);return Object.entries(s).forEach(([n,i])=>{t.setAttribute(n,i)}),t},$=(s,e="3000")=>{const t=f({id:"mask"}),n=document.createElement("div");n.setAttribute("id","dialog"),n.innerHTML=`
  ${s.force?"":`<div id="dialog-close" title="\u5173\u95ED\u65B0\u624B\u5F15\u5BFC">${m}</div>`}
  <div class="btns">
    <button id="prev" type="button">\u4E0A\u4E00\u6B65</button>
    <button id="next" type="button">\u4E0B\u4E00\u6B65</button>
  </div>
  `,n.querySelector("#prev").addEventListener("click",()=>s.prev()),n.querySelector("#next").addEventListener("click",()=>{s.index===s.guids.length-1?s.hide():s.next()}),!s.force&&n.querySelector("#dialog-close").addEventListener("click",()=>s.hide());const i=f({class:"title"},"h3");i.setAttribute("slot","title");const o=f({class:"content"});o.setAttribute("slot","content"),n.prepend(o),n.prepend(i);const l=f(),r=f({},"style");return r.innerHTML=`
  #mask {
    z-index: ${e};
  }
  #dialog {
    z-index: ${+e+1};
  }
  ${g}
  `,l.prepend(r),l.appendChild(t),l.appendChild(n),l},v=s=>{const e=document.querySelector(s),{left:t,top:n,right:i,x:o,y:l,width:r,height:u}=e.getBoundingClientRect(),d=10,h=400,a=300;let p="left",x="top",b=i+d,y=n+d;return window.innerWidth-i<h+d&&(p="right",b=window.innerWidth-t+d,b<h+d&&(p="left",b=o,x="top",y=l+u+d)),window.innerHeight-y<a&&(p="left",x="top",b=window.innerWidth-h>>1,y=window.innerHeight-a>>1),{x:b,y,srcX:o,srcY:l,width:r,height:u,positionX:p,positionY:x}},S=(s,e,t,n)=>{const i=window.innerWidth,o=window.innerHeight,l=s+t,r=e+n,u=`M 0 0 H 0 V ${o} H ${s} V ${o} H${s} V 0 Z`,d=`M ${s} 0 H ${s} V ${e} H ${i} V ${e} H ${i} V ${r} H ${i} V 0 Z`,h=`M ${s} ${r} H ${s} V ${o} H ${i} V ${o} H ${i} V ${r} Z`,a=`M ${l} ${e} H ${l} V ${r} H ${i} V ${r} H ${i} V ${e} Z`;return`${u} ${d} ${h} ${a}`},H={immdiate:!1,force:!1};class w extends HTMLElement{constructor(e){super(),this.handler=e,this.zIndex="3000";const t=$(e),n=this.attachShadow({mode:"closed"});n.appendChild(t),this.root=n}changeVisiable(e){e.visible?this.style.display="block":this.style.display="none"}changeDialog(e,t,n){const{x:i,y:o,positionX:l,positionY:r,srcX:u,srcY:d,width:h,height:a}=v(e.step.el);t.style.top=null,t.style.bottom=null,t.style.left=null,t.style.right=null,t.style[l]=i+"px",t.style[r]=o+"px";const p=S(u,d,h,a);n.style.clipPath=`path('${p}')`}changeContent(e,t){const n=t.querySelector(".title"),i=t.querySelector(".content");n.innerHTML=e.step.title,i.innerHTML=e.step.content}changeButton(e,t){const n=t.querySelector("#prev"),i=t.querySelector("#next");e.index===0?n.setAttribute("disabled","disabled"):n.removeAttribute("disabled"),e.index===this.handler.guids.length-1?i.innerHTML="\u5173\u95ED":i.innerHTML="\u4E0B\u4E00\u6B65"}saveSnapAndChange(e){const t=document.querySelector(e.step.el);t&&(this.snap={el:e.step.el,style:{border:t.style.border,zIndex:t.style.zIndex}},t.style.zIndex=`${+this.zIndex+2}`,t.style.border="2px solid red")}restoreSnap(){var t;const e=document.querySelector((t=this.snap)==null?void 0:t.el);e&&(e.style.border=this.snap.style.border,e.style.zIndex=this.snap.style.zIndex)}render(e){this.saveSnapAndChange(e),this.changeVisiable(e);const t=this.root.querySelector("#dialog"),n=this.root.querySelector("#mask");t&&n&&(this.changeDialog(e,t,n),this.changeContent(e,t),this.changeButton(e,t))}}window.customElements.get("young-beginner-guid")||window.customElements.define("young-beginner-guid",w);class E{constructor(e,t={}){if(this.index=0,this.immdiate=!1,this.force=!1,!e.length)throw new Error("guids array can't be null");this.guids=e,t=Object.assign(H,t),this.immdiate=t.immdiate,this.force=t.force,this.el=new w(this),window.addEventListener("load",()=>{this.immdiate&&this.show()})}show(e=0,t=!0){var n,i;this.el.isConnected||document.body.appendChild(this.el),this.index=e,!((i=(n=globalThis==null?void 0:globalThis.process)==null?void 0:n.env)!=null&&i.TEST)&&(this.el.restoreSnap(),this.el.render({visible:t,index:e,step:this.guids[e]}))}next(){this.index<this.guids.length-1&&(this.index++,this.show(this.index))}prev(){this.index>0&&(this.index--,this.show(this.index))}hide(){this.show(this.index,!1),this.el.restoreSnap()}destory(){this.index=0,document.body.removeChild(this.el),this.el.restoreSnap()}}c.YoungBeginnerGuid=w,c.YoungBeginnerGuidController=E,Object.defineProperties(c,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});
//# sourceMappingURL=index.umd.js.map
