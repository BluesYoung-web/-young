(function(o,d){typeof exports=="object"&&typeof module!="undefined"?d(exports):typeof define=="function"&&define.amd?define(["exports"],d):(o=typeof globalThis!="undefined"?globalThis:o||self,d(o.YoungBeginnerGuid={}))})(this,function(o){"use strict";const d=i=>{const e=document.createElement("div");return e.setAttribute("id","mask"),e.setAttribute("style",`
    width: 100vw;
    height: 100vh;
    background-color: gray;
    opacity: 0.6;
    position: fixed;
    top: 0;
    z-index: ${i};
  `),e},g=i=>{const e=document.createElement("div");return e.setAttribute("id","dialog"),e.setAttribute("style",`
    width: 400px;
    height: 300px;
    background-color: #fff;
    position: fixed;
    top: 0;
    z-index: ${i};
  `),e},f=(i=3e3)=>{const e=d(i),t=g(i+1),s=document.createElement("div");return s.appendChild(e),s.appendChild(t),s},m=i=>{const e=document.querySelector(i),{left:t,top:s,right:n,bottom:h}=e.getBoundingClientRect();let l="left",c="top",u=n+50,a=s;return window.innerWidth-n<400&&(l="right",u=t-50),window.innerHeight-s<300&&(c="bottom",a=h),{x:u,y:a,positionX:l,positionY:c}},p={immdiate:!1,force:!1};class r extends HTMLElement{constructor(e,t){super(),this.nums=e,this.force=t;const s=f(),n=this.attachShadow({mode:"closed"});n.appendChild(s),this.root=n}render(e){e.visible?this.style.display="block":this.style.display="none";const{x:t,y:s,positionX:n,positionY:h}=m(e.step.el),l=this.root.querySelector("#dialog");l.style[n]=t+"px",l.style[h]=s+"px"}}window.customElements.get("young-beginner-guid")||window.customElements.define("young-beginner-guid",r);class y{constructor(e,t={}){this.index=0,this.immdiate=!1,this.force=!1,this.guids=e,t=Object.assign(p,t),this.immdiate=t.immdiate,this.force=t.force,this.el=new r(this.guids.length,this.force),this.immdiate&&this.show()}show(e=0,t=!0){this.el.isConnected||document.body.appendChild(this.el),this.index=e,this.el.render({visible:t,index:e,step:this.guids[e]})}next(){this.index<this.guids.length-1&&(this.index++,this.show(this.index))}prev(){this.index>0&&(this.index--,this.show(this.index))}hide(){this.show(this.index,!1)}destory(){this.index=0,document.body.removeChild(this.el)}}o.YoungBeginnerGuidController=y,o.default=r,Object.defineProperties(o,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});
//# sourceMappingURL=index.umd.js.map
