var f=Object.defineProperty;var g=(c,e,t)=>e in c?f(c,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):c[e]=t;var s=(c,e,t)=>(g(c,typeof e!="symbol"?e+"":e,t),t);import{D as h}from"./QueryParams-c67b6cd4.browser.esm-DkxvioIB.js";import{N as w,p as W,A as T,a3 as b,q as y,a4 as A,B as i,r as S,s as E,t as p,T as N}from"./index-CiL9jNrD.js";import{C as R,a as U,G as k,b as M}from"./contract-appuri-3d68505c.browser.esm-CgtTHMym.js";import{C as I}from"./contract-interceptor-d7b164a7.browser.esm-C_yNedqZ.js";import{C as x,D as F,a as L}from"./contract-owner-1f113a23.browser.esm-DX8tHKct.js";import{C as _}from"./contract-platform-fee-789b7ae1.browser.esm-Cpz36eha.js";import{C as v}from"./contract-roles-423d8c8f.browser.esm-h52AslJi.js";import{C as B}from"./contract-sales-c7829960.browser.esm-1O_UQ4nu.js";import{D}from"./drop-claim-conditions-171f45b9.browser.esm-C943X4Zm.js";import{S as O}from"./erc-721-standard-af039d94.browser.esm-GavixmQr.js";import{E as d}from"./erc-721-91c6bacf.browser.esm-h7pkytFL.js";import{P as G}from"./thirdweb-checkout-23db4ad3.browser.esm-OPkQEP2y.js";import"./setErc20Allowance-0fd3045e.browser.esm-O_jhrzKi.js";import"./index-DmeCaq8p.js";import"./assertEnabled-0bc21898.browser.esm-CSJHrFi2.js";const m=class m extends O{constructor(t,r,a){let n=arguments.length>3&&arguments[3]!==void 0?arguments[3]:{},o=arguments.length>4?arguments[4]:void 0,l=arguments.length>5?arguments[5]:void 0,C=arguments.length>6&&arguments[6]!==void 0?arguments[6]:new W(t,r,o,n,a);super(C,a,l);s(this,"createBatch",p(async(t,r)=>this.erc721.lazyMint.prepare(t,r)));s(this,"claimTo",p(async(t,r,a)=>this.erc721.claimTo.prepare(t,r,a)));s(this,"claim",p(async(t,r)=>this.erc721.claim.prepare(t,r)));s(this,"burn",p(async t=>this.erc721.burn.prepare(t)));this.abi=T.parse(o||[]),this.metadata=new R(this.contractWrapper,b,this.storage),this.app=new U(this.contractWrapper,this.metadata,this.storage),this.roles=new v(this.contractWrapper,m.contractRoles),this.royalties=new x(this.contractWrapper,this.metadata),this.sales=new B(this.contractWrapper),this.encoder=new y(this.contractWrapper),this.estimator=new k(this.contractWrapper),this.events=new M(this.contractWrapper),this.platformFees=new _(this.contractWrapper),this.interceptor=new I(this.contractWrapper),this.claimConditions=new D(this.contractWrapper,this.metadata,this.storage),this.signature=new d(this.contractWrapper,this.storage),this.revealer=new F(this.contractWrapper,this.storage,A.name,()=>this.erc721.nextTokenIdToMint()),this.signature=new d(this.contractWrapper,this.storage),this.owner=new L(this.contractWrapper),this.checkout=new G(this.contractWrapper)}onNetworkUpdated(t){this.contractWrapper.updateSignerOrProvider(t)}getAddress(){return this.contractWrapper.address}async totalSupply(){const[t,r]=await Promise.all([this.totalClaimedSupply(),this.totalUnclaimedSupply()]);return t.add(r)}async getAllClaimed(t){const r=i.from((t==null?void 0:t.start)||0).toNumber(),a=i.from((t==null?void 0:t.count)||h).toNumber(),n=Math.min((await this.totalClaimedSupply()).toNumber(),r+a);return await Promise.all(Array.from(Array(n).keys()).map(o=>this.get(o.toString())))}async getAllUnclaimed(t){const r=i.from((t==null?void 0:t.start)||0).toNumber(),a=i.from((t==null?void 0:t.count)||h).toNumber(),n=i.from(Math.max((await this.totalClaimedSupply()).toNumber(),r)),o=i.from(Math.min((await this.contractWrapper.read("nextTokenIdToMint",[])).toNumber(),n.toNumber()+a));return await Promise.all(Array.from(Array(o.sub(n).toNumber()).keys()).map(l=>this.erc721.getTokenMetadata(n.add(l).toString())))}async totalClaimedSupply(){return this.erc721.totalClaimedSupply()}async totalUnclaimedSupply(){return this.erc721.totalUnclaimedSupply()}async isTransferRestricted(){return!await this.contractWrapper.read("hasRole",[S("transfer"),E])}async getClaimTransaction(t,r,a){return this.erc721.getClaimTransaction(t,r,a)}async prepare(t,r,a){return N.fromContractWrapper({contractWrapper:this.contractWrapper,method:t,args:r,overrides:a})}async call(t,r,a){return this.contractWrapper.call(t,r,a)}};s(m,"contractRoles",w);let u=m;export{u as SignatureDrop};
