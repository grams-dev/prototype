import{l,p as w}from"./index-C2ZmoRTG.js";async function g(e,a,t){const n=e.getProvider(),r=(await l(()=>import("./index-C2ZmoRTG.js").then(i=>i.dm),__vite__mapDeps([0,1]))).default,s=new w(n,a,r,{},e.storage),o=await e.getSignerAddress(),d=e.address;return(await s.read("allowance",[o,d])).gte(t)}export{g as h};
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/index-C2ZmoRTG.js","assets/index-JX8AfnXq.css"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
