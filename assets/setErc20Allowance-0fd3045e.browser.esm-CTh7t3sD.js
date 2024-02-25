import{z as w,l as f,p as N,a5 as n,aY as l,aZ as h,a_ as c}from"./index-C2ZmoRTG.js";const r=n.object({}).catchall(n.union([c,n.unknown()])),u=n.union([n.array(r),r]).optional().nullable(),x=n.object({name:n.union([n.string(),n.number()]).optional().nullable(),description:n.string().nullable().optional().nullable(),image:l.nullable().optional(),animation_url:l.optional().nullable()}),p=x.extend({external_url:l.nullable().optional(),background_color:h.optional().nullable(),properties:u,attributes:u}).catchall(n.union([c,n.unknown()])),O=n.union([p,n.string()]),S=p.extend({id:n.string(),uri:n.string(),image:n.string().nullable().optional(),external_url:n.string().nullable().optional(),animation_url:n.string().nullable().optional()});async function F(a,t,e,o){if(w(e))o.value=t;else{const g=(await f(()=>import("./index-C2ZmoRTG.js").then(_=>_.dm),__vite__mapDeps([0,1]))).default,m=a.getSigner(),b=a.getProvider(),i=new N(m||b,e,g,a.options,a.storage),d=await a.getSignerAddress(),s=a.address;return(await i.read("allowance",[d,s])).lt(t)&&await i.sendTransaction("approve",[s,t]),o}}export{x as B,p as C,O as N,S as a,F as s};
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/index-C2ZmoRTG.js","assets/index-JX8AfnXq.css"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
