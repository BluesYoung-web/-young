"use strict";Object.defineProperties(exports,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}});var h=`#mask {
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
}`,p='<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--ion" width="24" height="24" preserveAspectRatio="xMidYMid meet" viewBox="0 0 512 512"><path d="M331.3 308.7L278.6 256l52.7-52.7c6.2-6.2 6.2-16.4 0-22.6-6.2-6.2-16.4-6.2-22.6 0L256 233.4l-52.7-52.7c-6.2-6.2-15.6-7.1-22.6 0-7.1 7.1-6 16.6 0 22.6l52.7 52.7-52.7 52.7c-6.7 6.7-6.4 16.3 0 22.6 6.4 6.4 16.4 6.2 22.6 0l52.7-52.7 52.7 52.7c6.2 6.2 16.4 6.2 22.6 0 6.3-6.2 6.3-16.4 0-22.6z" fill="#434343"></path><path d="M256 76c48.1 0 93.3 18.7 127.3 52.7S436 207.9 436 256s-18.7 93.3-52.7 127.3S304.1 436 256 436c-48.1 0-93.3-18.7-127.3-52.7S76 304.1 76 256s18.7-93.3 52.7-127.3S207.9 76 256 76m0-28C141.1 48 48 141.1 48 256s93.1 208 208 208 208-93.1 208-208S370.9 48 256 48z" fill="currentColor"></path></svg>';const d=(s={},e="div")=>{const t=document.createElement(e);return Object.entries(s).forEach(([n,i])=>{t.setAttribute(n,i)}),t},g=(s,e=3e3)=>{const t=d({id:"mask"}),n=document.createElement("div");n.setAttribute("id","dialog"),n.innerHTML=`
  ${s.force?"":`<div id="dialog-close" title="\u5173\u95ED\u65B0\u624B\u5F15\u5BFC">${p}</div>`}
  <div class="btns">
    <button id="prev" type="button">\u4E0A\u4E00\u6B65</button>
    <button id="next" type="button">\u4E0B\u4E00\u6B65</button>
  </div>
  `,n.querySelector("#prev").addEventListener("click",()=>s.prev()),n.querySelector("#next").addEventListener("click",()=>{s.index===s.guids.length-1?s.hide():s.next()}),!s.force&&n.querySelector("#dialog-close").addEventListener("click",()=>s.hide());const i=d({class:"title"},"h3");i.setAttribute("slot","title");const l=d({class:"content"});l.setAttribute("slot","content"),n.prepend(l),n.prepend(i);const o=d(),r=d({},"style");return r.innerHTML=`
  #mask {
    z-index: ${e};
  }
  #dialog {
    z-index: ${e+1};
  }
  ${h}
  `,o.prepend(r),o.appendChild(t),o.appendChild(n),o},b=s=>{const e=document.querySelector(s),{left:t,top:n,right:i,bottom:l}=e.getBoundingClientRect();let o="left",r="top",a=i+50,u=n;return window.innerWidth-i<400&&(o="right",a=t-50),window.innerHeight-n<300&&(r="bottom",u=l),{x:a,y:u,positionX:o,positionY:r}},x={immdiate:!1,force:!1};class c extends HTMLElement{constructor(e){super(),this.handler=e;const t=g(e),n=this.attachShadow({mode:"closed"});n.appendChild(t),this.root=n}changeVisiable(e){e.visible?this.style.display="block":this.style.display="none"}changeDialog(e,t){const{x:n,y:i,positionX:l,positionY:o}=b(e.step.el);t.style[l]=n+"px",t.style[o]=i+"px"}changeContent(e,t){const n=t.querySelector(".title"),i=t.querySelector(".content");n.innerHTML=e.step.title,i.innerHTML=e.step.content}changeButton(e,t){const n=t.querySelector("#prev"),i=t.querySelector("#next");e.index===0?n.setAttribute("disabled","disabled"):n.removeAttribute("disabled"),e.index===this.handler.guids.length-1?i.innerHTML="\u5173\u95ED":i.innerHTML="\u4E0B\u4E00\u6B65"}saveSnapAndChange(e){const t=document.querySelector(e.step.el);this.snap={el:e.step.el,style:t.style.border},t.style.border="2px solid red"}restoreSnap(){var t;const e=document.querySelector((t=this.snap)==null?void 0:t.el);e&&(e.style.border=this.snap.style)}render(e){var n,i;if((i=(n=globalThis==null?void 0:globalThis.process)==null?void 0:n.env)!=null&&i.TEST)return;this.saveSnapAndChange(e),this.changeVisiable(e);const t=this.root.querySelector("#dialog");this.changeDialog(e,t),this.changeContent(e,t),this.changeButton(e,t)}}window.customElements.get("young-beginner-guid")||window.customElements.define("young-beginner-guid",c);class y{constructor(e,t={}){this.index=0,this.immdiate=!1,this.force=!1,this.guids=e,t=Object.assign(x,t),this.immdiate=t.immdiate,this.force=t.force,this.el=new c(this),window.addEventListener("load",()=>{this.immdiate&&this.show()})}show(e=0,t=!0){this.el.isConnected||document.body.appendChild(this.el),this.index=e,this.el.restoreSnap(),this.el.render({visible:t,index:e,step:this.guids[e]})}next(){this.index<this.guids.length-1&&(this.index++,this.show(this.index))}prev(){this.index>0&&(this.index--,this.show(this.index))}hide(){this.show(this.index,!1),this.el.restoreSnap()}destory(){this.index=0,document.body.removeChild(this.el),this.el.restoreSnap()}}exports.YoungBeginnerGuid=c;exports.YoungBeginnerGuidController=y;
//# sourceMappingURL=index.cjs.js.map
