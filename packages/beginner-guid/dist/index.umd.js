(function(d,u){typeof exports=="object"&&typeof module!="undefined"?u(exports):typeof define=="function"&&define.amd?define(["exports"],u):(d=typeof globalThis!="undefined"?globalThis:d||self,u(d.YoungBeginnerGuid={}))})(this,function(d){"use strict";var u=`#mask {
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
}`,x='<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--ion" width="24" height="24" preserveAspectRatio="xMidYMid meet" viewBox="0 0 512 512"><path d="M331.3 308.7L278.6 256l52.7-52.7c6.2-6.2 6.2-16.4 0-22.6-6.2-6.2-16.4-6.2-22.6 0L256 233.4l-52.7-52.7c-6.2-6.2-15.6-7.1-22.6 0-7.1 7.1-6 16.6 0 22.6l52.7 52.7-52.7 52.7c-6.7 6.7-6.4 16.3 0 22.6 6.4 6.4 16.4 6.2 22.6 0l52.7-52.7 52.7 52.7c6.2 6.2 16.4 6.2 22.6 0 6.3-6.2 6.3-16.4 0-22.6z" fill="#434343"></path><path d="M256 76c48.1 0 93.3 18.7 127.3 52.7S436 207.9 436 256s-18.7 93.3-52.7 127.3S304.1 436 256 436c-48.1 0-93.3-18.7-127.3-52.7S76 304.1 76 256s18.7-93.3 52.7-127.3S207.9 76 256 76m0-28C141.1 48 48 141.1 48 256s93.1 208 208 208 208-93.1 208-208S370.9 48 256 48z" fill="currentColor"></path></svg>';const a=(s={},e="div")=>{const t=document.createElement(e);return Object.entries(s).forEach(([n,i])=>{t.setAttribute(n,i)}),t},w=(s,e="3000")=>{const t=a({id:"mask"}),n=document.createElement("div");n.setAttribute("id","dialog"),n.innerHTML=`
  ${s.force?"":`<div id="dialog-close" title="\u5173\u95ED\u65B0\u624B\u5F15\u5BFC">${x}</div>`}
  <div class="btns">
    <button id="prev" type="button">\u4E0A\u4E00\u6B65</button>
    <button id="next" type="button">\u4E0B\u4E00\u6B65</button>
  </div>
  `,n.querySelector("#prev").addEventListener("click",()=>s.prev()),n.querySelector("#next").addEventListener("click",()=>{s.index===s.guids.length-1?s.hide():s.next()}),!s.force&&n.querySelector("#dialog-close").addEventListener("click",()=>s.hide());const i=a({class:"title"},"h3");i.setAttribute("slot","title");const l=a({class:"content"});l.setAttribute("slot","content"),n.prepend(l),n.prepend(i);const r=a(),o=a({},"style");return o.innerHTML=`
  #mask {
    z-index: ${e};
  }
  #dialog {
    z-index: ${+e+1};
  }
  ${u}
  `,r.prepend(o),r.appendChild(t),r.appendChild(n),r},m=s=>{const e=document.querySelector(s),{left:t,top:n,right:i,bottom:l,x:r,y:o,width:p,height:g}=e.getBoundingClientRect();let c="left",h="top",b=i+50,y=n;return window.innerWidth-i<400&&(c="right",b=window.innerWidth-t+50),window.innerHeight-n<300&&(h="bottom",y=l),{x:b,y,srcX:r,srcY:o,width:p,height:g,positionX:c,positionY:h}},$=(s,e,t,n)=>{const i=window.innerWidth,l=window.innerHeight,r=s+t,o=e+n,p=`M 0 0 H 0 V ${l} H ${s} V ${l} H${s} V 0 Z`,g=`M ${s} 0 H ${s} V ${e} H ${i} V ${e} H ${i} V ${o} H ${i} V 0 Z`,c=`M ${s} ${o} H ${s} V ${l} H ${i} V ${l} H ${i} V ${o} Z`,h=`M ${r} ${e} H ${r} V ${o} H ${i} V ${o} H ${i} V ${e} Z`;return`${p} ${g} ${c} ${h}`},v={immdiate:!1,force:!1};class f extends HTMLElement{constructor(e){super(),this.handler=e,this.zIndex="3000";const t=w(e),n=this.attachShadow({mode:"closed"});n.appendChild(t),this.root=n}changeVisiable(e){e.visible?this.style.display="block":this.style.display="none"}changeDialog(e,t,n){const{x:i,y:l,positionX:r,positionY:o,srcX:p,srcY:g,width:c,height:h}=m(e.step.el);t.style.top=null,t.style.bottom=null,t.style.left=null,t.style.right=null,t.style[r]=i+"px",t.style[o]=l+"px";const b=$(p,g,c,h);n.style.clipPath=`path('${b}')`}changeContent(e,t){const n=t.querySelector(".title"),i=t.querySelector(".content");n.innerHTML=e.step.title,i.innerHTML=e.step.content}changeButton(e,t){const n=t.querySelector("#prev"),i=t.querySelector("#next");e.index===0?n.setAttribute("disabled","disabled"):n.removeAttribute("disabled"),e.index===this.handler.guids.length-1?i.innerHTML="\u5173\u95ED":i.innerHTML="\u4E0B\u4E00\u6B65"}saveSnapAndChange(e){const t=document.querySelector(e.step.el);t&&(this.snap={el:e.step.el,style:{border:t.style.border,zIndex:t.style.zIndex}},t.style.zIndex=`${+this.zIndex+2}`,t.style.border="2px solid red")}restoreSnap(){var t;const e=document.querySelector((t=this.snap)==null?void 0:t.el);e&&(e.style.border=this.snap.style.border,e.style.zIndex=this.snap.style.zIndex)}render(e){this.saveSnapAndChange(e),this.changeVisiable(e);const t=this.root.querySelector("#dialog"),n=this.root.querySelector("#mask");t&&n&&(this.changeDialog(e,t,n),this.changeContent(e,t),this.changeButton(e,t))}}window.customElements.get("young-beginner-guid")||window.customElements.define("young-beginner-guid",f);class S{constructor(e,t={}){if(this.index=0,this.immdiate=!1,this.force=!1,!e.length)throw new Error("guids array can't be null");this.guids=e,t=Object.assign(v,t),this.immdiate=t.immdiate,this.force=t.force,this.el=new f(this),window.addEventListener("load",()=>{this.immdiate&&this.show()})}show(e=0,t=!0){var n,i;this.el.isConnected||document.body.appendChild(this.el),this.index=e,!((i=(n=globalThis==null?void 0:globalThis.process)==null?void 0:n.env)!=null&&i.TEST)&&(this.el.restoreSnap(),this.el.render({visible:t,index:e,step:this.guids[e]}))}next(){this.index<this.guids.length-1&&(this.index++,this.show(this.index))}prev(){this.index>0&&(this.index--,this.show(this.index))}hide(){this.show(this.index,!1),this.el.restoreSnap()}destory(){this.index=0,document.body.removeChild(this.el),this.el.restoreSnap()}}d.YoungBeginnerGuid=f,d.YoungBeginnerGuidController=S,Object.defineProperties(d,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});
//# sourceMappingURL=index.umd.js.map
