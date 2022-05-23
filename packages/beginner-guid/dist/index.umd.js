(function(l,d){typeof exports=="object"&&typeof module!="undefined"?d(exports):typeof define=="function"&&define.amd?define(["exports"],d):(l=typeof globalThis!="undefined"?globalThis:l||self,d(l.YoungBeginnerGuid={}))})(this,function(l){"use strict";var d=`#mask {
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
}`,g='<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--ion" width="24" height="24" preserveAspectRatio="xMidYMid meet" viewBox="0 0 512 512"><path d="M331.3 308.7L278.6 256l52.7-52.7c6.2-6.2 6.2-16.4 0-22.6-6.2-6.2-16.4-6.2-22.6 0L256 233.4l-52.7-52.7c-6.2-6.2-15.6-7.1-22.6 0-7.1 7.1-6 16.6 0 22.6l52.7 52.7-52.7 52.7c-6.7 6.7-6.4 16.3 0 22.6 6.4 6.4 16.4 6.2 22.6 0l52.7-52.7 52.7 52.7c6.2 6.2 16.4 6.2 22.6 0 6.3-6.2 6.3-16.4 0-22.6z" fill="#434343"></path><path d="M256 76c48.1 0 93.3 18.7 127.3 52.7S436 207.9 436 256s-18.7 93.3-52.7 127.3S304.1 436 256 436c-48.1 0-93.3-18.7-127.3-52.7S76 304.1 76 256s18.7-93.3 52.7-127.3S207.9 76 256 76m0-28C141.1 48 48 141.1 48 256s93.1 208 208 208 208-93.1 208-208S370.9 48 256 48z" fill="currentColor"></path></svg>';const c=(s={},t="div")=>{const e=document.createElement(t);return Object.entries(s).forEach(([n,i])=>{e.setAttribute(n,i)}),e},b=(s,t="3000")=>{const e=c({id:"mask"}),n=document.createElement("div");n.setAttribute("id","dialog"),n.innerHTML=`
  ${s.force?"":`<div id="dialog-close" title="\u5173\u95ED\u65B0\u624B\u5F15\u5BFC">${g}</div>`}
  <div class="btns">
    <button id="prev" type="button">\u4E0A\u4E00\u6B65</button>
    <button id="next" type="button">\u4E0B\u4E00\u6B65</button>
  </div>
  `,n.querySelector("#prev").addEventListener("click",()=>s.prev()),n.querySelector("#next").addEventListener("click",()=>{s.index===s.guids.length-1?s.hide():s.next()}),!s.force&&n.querySelector("#dialog-close").addEventListener("click",()=>s.hide());const i=c({class:"title"},"h3");i.setAttribute("slot","title");const r=c({class:"content"});r.setAttribute("slot","content"),n.prepend(r),n.prepend(i);const o=c(),u=c({},"style");return u.innerHTML=`
  #mask {
    z-index: ${t};
  }
  #dialog {
    z-index: ${+t+1};
  }
  ${d}
  `,o.prepend(u),o.appendChild(e),o.appendChild(n),o},y=s=>{const t=document.querySelector(s),{left:e,top:n,right:i,bottom:r}=t.getBoundingClientRect();let o="left",u="top",h=i+50,p=n;return window.innerWidth-i<400&&(o="right",h=window.innerWidth-e+50),window.innerHeight-n<300&&(u="bottom",p=r),{x:h,y:p,positionX:o,positionY:u}},f={immdiate:!1,force:!1};class a extends HTMLElement{constructor(t){super(),this.handler=t,this.zIndex="3000";const e=b(t),n=this.attachShadow({mode:"closed"});n.appendChild(e),this.root=n}changeVisiable(t){t.visible?this.style.display="block":this.style.display="none"}changeDialog(t,e){const{x:n,y:i,positionX:r,positionY:o}=y(t.step.el);e.style.top=null,e.style.bottom=null,e.style.left=null,e.style.right=null,e.style[r]=n+"px",e.style[o]=i+"px"}changeContent(t,e){const n=e.querySelector(".title"),i=e.querySelector(".content");n.innerHTML=t.step.title,i.innerHTML=t.step.content}changeButton(t,e){const n=e.querySelector("#prev"),i=e.querySelector("#next");t.index===0?n.setAttribute("disabled","disabled"):n.removeAttribute("disabled"),t.index===this.handler.guids.length-1?i.innerHTML="\u5173\u95ED":i.innerHTML="\u4E0B\u4E00\u6B65"}saveSnapAndChange(t){const e=document.querySelector(t.step.el);this.snap={el:t.step.el,style:{border:e.style.border,zIndex:e.style.zIndex,position:e.style.position}},e.style.zIndex=`${+this.zIndex+2}`,e.style.border="2px solid red",e.style.position="relative"}restoreSnap(){var e;const t=document.querySelector((e=this.snap)==null?void 0:e.el);t&&(t.style.border=this.snap.style.border,t.style.zIndex=this.snap.style.zIndex,t.style.position=this.snap.style.position)}render(t){this.saveSnapAndChange(t),this.changeVisiable(t);const e=this.root.querySelector("#dialog");this.changeDialog(t,e),this.changeContent(t,e),this.changeButton(t,e)}}window.customElements.get("young-beginner-guid")||window.customElements.define("young-beginner-guid",a);class x{constructor(t,e={}){if(this.index=0,this.immdiate=!1,this.force=!1,!t.length)throw new Error("guids array can't be null");this.guids=t,e=Object.assign(f,e),this.immdiate=e.immdiate,this.force=e.force,this.el=new a(this),window.addEventListener("load",()=>{this.immdiate&&this.show()})}show(t=0,e=!0){var n,i;this.el.isConnected||document.body.appendChild(this.el),this.index=t,!((i=(n=globalThis==null?void 0:globalThis.process)==null?void 0:n.env)!=null&&i.TEST)&&(this.el.restoreSnap(),this.el.render({visible:e,index:t,step:this.guids[t]}))}next(){this.index<this.guids.length-1&&(this.index++,this.show(this.index))}prev(){this.index>0&&(this.index--,this.show(this.index))}hide(){this.show(this.index,!1),this.el.restoreSnap()}destory(){this.index=0,document.body.removeChild(this.el),this.el.restoreSnap()}}l.YoungBeginnerGuid=a,l.YoungBeginnerGuidController=x,Object.defineProperties(l,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});
//# sourceMappingURL=index.umd.js.map
