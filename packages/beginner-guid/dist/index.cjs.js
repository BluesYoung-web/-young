"use strict";Object.defineProperties(exports,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}});const a=i=>{const t=document.createElement("div");return t.setAttribute("id","mask"),t.setAttribute("style",`
    width: 100vw;
    height: 100vh;
    background-color: gray;
    opacity: 0.6;
    position: fixed;
    top: 0;
    z-index: ${i};
  `),t},u=i=>{const t=document.createElement("div");return t.setAttribute("id","dialog"),t.setAttribute("style",`
    width: 400px;
    height: 300px;
    background-color: #fff;
    position: fixed;
    top: 0;
    z-index: ${i};
  `),t},g=(i=3e3)=>{const t=a(i),e=u(i+1),s=document.createElement("div");return s.appendChild(t),s.appendChild(e),s},m=i=>{const t=document.querySelector(i),{left:e,top:s,right:o,bottom:d}=t.getBoundingClientRect();let n="left",l="top",h=o+50,c=s;return window.innerWidth-o<400&&(n="right",h=e-50),window.innerHeight-s<300&&(l="bottom",c=d),{x:h,y:c,positionX:n,positionY:l}},f={immdiate:!1,force:!1};class r extends HTMLElement{constructor(t,e){super(),this.nums=t,this.force=e;const s=g(),o=this.attachShadow({mode:"closed"});o.appendChild(s),this.root=o}render(t){t.visible?this.style.display="block":this.style.display="none";const{x:e,y:s,positionX:o,positionY:d}=m(t.step.el),n=this.root.querySelector("#dialog");n.style[o]=e+"px",n.style[d]=s+"px"}}window.customElements.get("young-beginner-guid")||window.customElements.define("young-beginner-guid",r);class p{constructor(t,e={}){this.index=0,this.immdiate=!1,this.force=!1,this.guids=t,e=Object.assign(f,e),this.immdiate=e.immdiate,this.force=e.force,this.el=new r(this.guids.length,this.force),this.immdiate&&this.show()}show(t=0,e=!0){this.el.isConnected||document.body.appendChild(this.el),this.index=t,this.el.render({visible:e,index:t,step:this.guids[t]})}next(){this.index<this.guids.length-1&&(this.index++,this.show(this.index))}prev(){this.index>0&&(this.index--,this.show(this.index))}hide(){this.show(this.index,!1)}destory(){this.index=0,document.body.removeChild(this.el)}}exports.YoungBeginnerGuidController=p;exports.default=r;
//# sourceMappingURL=index.cjs.js.map
