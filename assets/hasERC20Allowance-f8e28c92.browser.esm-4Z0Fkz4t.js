import{l,p as w}from"./index-CiL9jNrD.js";async function g(e,a,t){const n=e.getProvider(),r=(await l(()=>import("./index-CiL9jNrD.js").then(i=>i.dm),__vite__mapDeps([0,1]))).default,s=new w(n,a,r,{},e.storage),o=await e.getSignerAddress(),d=e.address;return(await s.read("allowance",[o,d])).gte(t)}export{g as h};
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/index-CiL9jNrD.js","assets/index-JX8AfnXq.css"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
