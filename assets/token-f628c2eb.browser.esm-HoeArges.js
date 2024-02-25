var w=Object.defineProperty;var C=(i,e,t)=>e in i?w(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var o=(i,e,t)=>(C(i,typeof e!="symbol"?e+"":e,t),t);import{N as y,p as T,A as b,bH as E,q as v,G as d,r as A,s as u,t as p,T as g,B as f,Q as R}from"./index-CiL9jNrD.js";import{C as S,a as B,b as O,G as F}from"./contract-appuri-3d68505c.browser.esm-CgtTHMym.js";import{C as V}from"./contract-interceptor-d7b164a7.browser.esm-C_yNedqZ.js";import{C as H}from"./contract-platform-fee-789b7ae1.browser.esm-Cpz36eha.js";import{C as M}from"./contract-roles-423d8c8f.browser.esm-h52AslJi.js";import{C as N}from"./contract-sales-c7829960.browser.esm-1O_UQ4nu.js";import{a as P}from"./erc-20-ce512258.browser.esm-Cu-_ox5u.js";import{S as x}from"./erc-20-standard-e52e0cd6.browser.esm-CiAtKtKZ.js";import"./assertEnabled-0bc21898.browser.esm-CSJHrFi2.js";import"./drop-claim-conditions-171f45b9.browser.esm-C943X4Zm.js";import"./index-DmeCaq8p.js";import"./setErc20Allowance-0fd3045e.browser.esm-O_jhrzKi.js";class D{constructor(e,t){this.contractWrapper=e,this.events=t}async getAllHolderBalances(){const t=(await this.events.getEvents("Transfer")).map(a=>a.data),r={};t.forEach(a=>{const n=a==null?void 0:a.from,c=a==null?void 0:a.to,m=a==null?void 0:a.value;n!==u&&(n in r||(r[n]=f.from(0)),r[n]=r[n].sub(m)),c!==u&&(c in r||(r[c]=f.from(0)),r[c]=r[c].add(m))});const s=Object.entries(r),l=await Promise.all(s.map(a=>{let[,n]=a;return R(this.contractWrapper.getProvider(),this.contractWrapper.address,n)}));return s.map((a,n)=>{let[c]=a;return{holder:c,balance:l[n]}})}}const h=class h extends x{constructor(t,r,s){let l=arguments.length>3&&arguments[3]!==void 0?arguments[3]:{},a=arguments.length>4?arguments[4]:void 0,n=arguments.length>5?arguments[5]:void 0,c=arguments.length>6&&arguments[6]!==void 0?arguments[6]:new T(t,r,a,l,s);super(c,s,n);o(this,"mint",p(async t=>this.erc20.mint.prepare(t)));o(this,"mintTo",p(async(t,r)=>this.erc20.mintTo.prepare(t,r)));o(this,"mintBatchTo",p(async t=>this.erc20.mintBatchTo.prepare(t)));o(this,"delegateTo",p(async t=>g.fromContractWrapper({contractWrapper:this.contractWrapper,method:"delegate",args:[await d(t)]})));o(this,"burn",p(t=>this.erc20.burn.prepare(t)));o(this,"burnFrom",p(async(t,r)=>this.erc20.burnFrom.prepare(t,r)));this.abi=b.parse(a||[]),this.metadata=new S(this.contractWrapper,E,this.storage),this.app=new B(this.contractWrapper,this.metadata,this.storage),this.roles=new M(this.contractWrapper,h.contractRoles),this.sales=new N(this.contractWrapper),this.events=new O(this.contractWrapper),this.history=new D(this.contractWrapper,this.events),this.encoder=new v(this.contractWrapper),this.estimator=new F(this.contractWrapper),this.platformFees=new H(this.contractWrapper),this.interceptor=new V(this.contractWrapper),this.signature=new P(this.contractWrapper,this.roles)}async getVoteBalance(){return await this.getVoteBalanceOf(await this.contractWrapper.getSignerAddress())}async getVoteBalanceOf(t){return await this.erc20.getValue(await this.contractWrapper.read("getVotes",[t]))}async getDelegation(){return await this.getDelegationOf(await this.contractWrapper.getSignerAddress())}async getDelegationOf(t){return await this.contractWrapper.read("delegates",[await d(t)])}async isTransferRestricted(){return!await this.contractWrapper.read("hasRole",[A("transfer"),u])}async getMintTransaction(t,r){return this.erc20.getMintTransaction(t,r)}async prepare(t,r,s){return g.fromContractWrapper({contractWrapper:this.contractWrapper,method:t,args:r,overrides:s})}async call(t,r,s){return this.contractWrapper.call(t,r,s)}};o(h,"contractRoles",y);let W=h;export{W as Token};
