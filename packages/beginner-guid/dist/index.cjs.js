"use strict";Object.defineProperties(exports,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}});var u=`#mask {
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
}`,g='<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--ion" width="24" height="24" preserveAspectRatio="xMidYMid meet" viewBox="0 0 512 512"><path d="M331.3 308.7L278.6 256l52.7-52.7c6.2-6.2 6.2-16.4 0-22.6-6.2-6.2-16.4-6.2-22.6 0L256 233.4l-52.7-52.7c-6.2-6.2-15.6-7.1-22.6 0-7.1 7.1-6 16.6 0 22.6l52.7 52.7-52.7 52.7c-6.7 6.7-6.4 16.3 0 22.6 6.4 6.4 16.4 6.2 22.6 0l52.7-52.7 52.7 52.7c6.2 6.2 16.4 6.2 22.6 0 6.3-6.2 6.3-16.4 0-22.6z" fill="#434343"></path><path d="M256 76c48.1 0 93.3 18.7 127.3 52.7S436 207.9 436 256s-18.7 93.3-52.7 127.3S304.1 436 256 436c-48.1 0-93.3-18.7-127.3-52.7S76 304.1 76 256s18.7-93.3 52.7-127.3S207.9 76 256 76m0-28C141.1 48 48 141.1 48 256s93.1 208 208 208 208-93.1 208-208S370.9 48 256 48z" fill="currentColor"></path></svg>';const r=(s={},e="div")=>{const t=document.createElement(e);return Object.entries(s).forEach(([i,n])=>{t.setAttribute(i,n)}),t},p=(s,e=3e3)=>{const t=r({id:"mask"}),i=document.createElement("div");i.setAttribute("id","dialog"),i.innerHTML=`
  ${s.force?"":`<div id="dialog-close" title="\u5173\u95ED\u65B0\u624B\u5F15\u5BFC">${g}</div>`}
  <div class="btns">
    <button id="prev" type="button">\u4E0A\u4E00\u6B65</button>
    <button id="next" type="button">\u4E0B\u4E00\u6B65</button>
  </div>
  `,i.querySelector("#prev").addEventListener("click",()=>s.prev()),i.querySelector("#next").addEventListener("click",()=>{s.index===s.guids.length-1?s.hide():s.next()}),!s.force&&i.querySelector("#dialog-close").addEventListener("click",()=>s.hide());const n=r({class:"title"},"h3");n.setAttribute("slot","title"),n.innerText="lallallalallalla";const l=r({class:"content"});l.setAttribute("slot","content"),l.innerText="hhhhhhhhhhhhhhhhhhhhh",i.prepend(l),i.prepend(n);const o=r(),d=r({},"style");return d.innerHTML=`
  #mask {
    z-index: ${e};
  }
  #dialog {
    z-index: ${e+1};
  }
  ${u}
  `,o.prepend(d),o.appendChild(t),o.appendChild(i),o},b=s=>{const e=document.querySelector(s),{left:t,top:i,right:n,bottom:l}=e.getBoundingClientRect();let o="left",d="top",h=n+50,a=i;return window.innerWidth-n<400&&(o="right",h=t-50),window.innerHeight-i<300&&(d="bottom",a=l),{x:h,y:a,positionX:o,positionY:d}},x={immdiate:!1,force:!1};class c extends HTMLElement{constructor(e){super(),this.handler=e;const t=p(e),i=this.attachShadow({mode:"closed"});i.appendChild(t),this.root=i}changeVisiable(e){e.visible?this.style.display="block":this.style.display="none"}changeDialog(e,t){const{x:i,y:n,positionX:l,positionY:o}=b(e.step.el);t.style[l]=i+"px",t.style[o]=n+"px"}changeButton(e,t){const i=t.querySelector("#prev"),n=t.querySelector("#next");e.index===0?i.setAttribute("disabled","disabled"):i.removeAttribute("disabled"),e.index===this.handler.guids.length-1?n.innerHTML="\u5173\u95ED":n.innerHTML="\u4E0B\u4E00\u6B65"}render(e){var i,n;if((n=(i=globalThis==null?void 0:globalThis.process)==null?void 0:i.env)!=null&&n.TEST)return;this.changeVisiable(e);const t=this.root.querySelector("#dialog");this.changeDialog(e,t),this.changeButton(e,t)}}window.customElements.get("young-beginner-guid")||window.customElements.define("young-beginner-guid",c);class f{constructor(e,t={}){this.index=0,this.immdiate=!1,this.force=!1,this.guids=e,t=Object.assign(x,t),this.immdiate=t.immdiate,this.force=t.force,this.el=new c(this),window.addEventListener("load",()=>{this.immdiate&&this.show()})}show(e=0,t=!0){this.el.isConnected||document.body.appendChild(this.el),this.index=e,this.el.render({visible:t,index:e,step:this.guids[e]})}next(){this.index<this.guids.length-1&&(this.index++,this.show(this.index))}prev(){this.index>0&&(this.index--,this.show(this.index))}hide(){this.show(this.index,!1)}destory(){this.index=0,document.body.removeChild(this.el)}}exports.YoungBeginnerGuidController=f;exports.default=c;
//# sourceMappingURL=index.cjs.js.map
