"use strict";"use client";var z=Object.create;var g=Object.defineProperty;var A=Object.getOwnPropertyDescriptor;var N=Object.getOwnPropertyNames;var B=Object.getPrototypeOf,I=Object.prototype.hasOwnProperty;var J=(r,e)=>()=>(e||r((e={exports:{}}).exports,e),e.exports),U=(r,e)=>{for(var t in e)g(r,t,{get:e[t],enumerable:!0})},O=(r,e,t,o)=>{if(e&&typeof e=="object"||typeof e=="function")for(let n of N(e))!I.call(r,n)&&n!==t&&g(r,n,{get:()=>e[n],enumerable:!(o=A(e,n))||o.enumerable});return r};var W=(r,e,t)=>(t=r!=null?z(B(r)):{},O(e||!r||!r.__esModule?g(t,"default",{value:r,enumerable:!0}):t,r)),_=r=>O(g({},"__esModule",{value:!0}),r);var T=J((se,E)=>{"use strict";var h=Object.defineProperty,G=Object.getOwnPropertyDescriptor,H=Object.getOwnPropertyNames,Q=Object.prototype.hasOwnProperty,V=(r,e)=>{for(var t in e)h(r,t,{get:e[t],enumerable:!0})},X=(r,e,t,o)=>{if(e&&typeof e=="object"||typeof e=="function")for(let n of H(e))!Q.call(r,n)&&n!==t&&h(r,n,{get:()=>e[n],enumerable:!(o=G(e,n))||o.enumerable});return r},Y=r=>X(h({},"__esModule",{value:!0}),r),P={};V(P,{Logger:()=>x,default:()=>re,logger:()=>j});E.exports=Y(P);var Z={info:"color: #2196F3; font-weight: bold;",warn:"color: #FF9800; font-weight: bold;",error:"color: #F44336; font-weight: bold;",success:"color: #4CAF50; font-weight: bold;",debug:"color: #9C27B0; font-weight: bold;"},k={info:"\u2139\uFE0F",warn:"\u26A0\uFE0F",error:"\u274C",success:"\u2705",debug:"\u{1F41E}"},x=class D{context;constructor(e){this.context=e}log(e,t,o,n={}){let{showTimestamp:u=!0}=n,i=u?`[${new Date().toLocaleTimeString()}]`:"",l=this.context?`[${this.context}]`:"";console.log(`%c${k[e]} ${i} ${l} %c${t}`,Z[e],"color: #fff;",...o?[o]:[])}info(e,t,o){this.log("info",e,t,o)}warn(e,t,o){this.log("warn",e,t,o)}error(e,t,o){this.log("error",e,t,o)}success(e,t,o){this.log("success",e,t,o)}debug(e,t,o){this.log("debug",e,t,o)}static createLogger(e){return new D(e)}},j=new x,ee=(r,e,t)=>j.info(r,e,t),re=ee});var oe={};U(oe,{useKeyPress:()=>te});module.exports=_(oe);var f=require("react"),C=require("@rsxt/react-listener"),L=W(T()),te=(r,e=[],t={})=>{let{preventDefault:o=!0,debug:n=!1,enabled:u=!0}=t,i=(0,f.useRef)([]),l=(0,f.useRef)(null),d=(s,c)=>{n&&L.logger.debug(s,c)},p=s=>s.length===1?s.toLowerCase():s,S=(0,f.useCallback)(s=>{if(!u)return;let c=p(s.key),a={ctrl:s.ctrlKey,meta:s.metaKey,alt:s.altKey,shift:s.shiftKey};d("Key Pressed",{key:c,...a}),e.forEach(({keys:b,ctrl:m,meta:w,alt:K,shift:v,ordered:$})=>{let y=b.map(p),q=i.current.length,F=(m===void 0||a.ctrl===m)&&(w===void 0||a.meta===w)&&(K===void 0||a.alt===K)&&(v===void 0||a.shift===v);if($)y[q]===c&&F?(i.current.push(c),d("Sequence Progress",{sequence:i.current}),i.current.join(" ")===y.join(" ")&&(o&&s.preventDefault(),d("Ordered Sequence Triggered",{shortcut:b}),r(s),i.current=[])):i.current=[];else{let M=new Set([...i.current,c]);y.every(R=>M.has(R))&&F&&(o&&s.preventDefault(),d("Unordered Shortcut Triggered",{shortcut:b}),r(s),i.current=[])}}),l.current&&clearTimeout(l.current),l.current=setTimeout(()=>{i.current=[]},1e3)},[r,e,u,o]);(0,C.useListener)(window,"keydown",S,{enabled:u})};
//# sourceMappingURL=index.js.map
