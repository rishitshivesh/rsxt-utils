var l={info:"color: #2196F3; font-weight: bold;",warn:"color: #FF9800; font-weight: bold;",error:"color: #F44336; font-weight: bold;",success:"color: #4CAF50; font-weight: bold;",debug:"color: #9C27B0; font-weight: bold;"},u={info:"\u2139\uFE0F",warn:"\u26A0\uFE0F",error:"\u274C",success:"\u2705",debug:"\u{1F41E}"},s=class n{context;constructor(o){this.context=o}log(o,t,e,i={}){let{showTimestamp:r=!0}=i,g=r?`[${new Date().toLocaleTimeString()}]`:"",c=this.context?`[${this.context}]`:"";console.log(`%c${u[o]} ${g} ${c} %c${t}`,l[o],...e?[e]:[])}info(o,t,e){this.log("info",o,t,e)}warn(o,t,e){this.log("warn",o,t,e)}error(o,t,e){this.log("error",o,t,e)}success(o,t,e){this.log("success",o,t,e)}debug(o,t,e){this.log("debug",o,t,e)}static createLogger(o){return new n(o)}},a=new s,b=(n,o,t)=>a.info(n,o,t);var p=b;export{s as Logger,p as default,a as logger};
//# sourceMappingURL=index.js.map
