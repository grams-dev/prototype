var d=Object.defineProperty;var g=(s,a,t)=>a in s?d(s,a,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[a]=t;var e=(s,a,t)=>(g(s,typeof a!="symbol"?a+"":a,t),t);import{N as l,p as C,A as W,a2 as f,q as w,r as y,s as T,t as o,T as R}from"./index-CiL9jNrD.js";import{C as E,a as S,G as b,b as A}from"./contract-appuri-3d68505c.browser.esm-CgtTHMym.js";import{C as B}from"./contract-interceptor-d7b164a7.browser.esm-C_yNedqZ.js";import{C as M,a as O}from"./contract-owner-1f113a23.browser.esm-DX8tHKct.js";import{C as v}from"./contract-platform-fee-789b7ae1.browser.esm-Cpz36eha.js";import{C as I}from"./contract-roles-423d8c8f.browser.esm-h52AslJi.js";import{C as P}from"./contract-sales-c7829960.browser.esm-1O_UQ4nu.js";import{S as k}from"./erc-721-standard-af039d94.browser.esm-GavixmQr.js";import{E as x}from"./erc-721-91c6bacf.browser.esm-h7pkytFL.js";import"./setErc20Allowance-0fd3045e.browser.esm-O_jhrzKi.js";import"./QueryParams-c67b6cd4.browser.esm-DkxvioIB.js";import"./index-DmeCaq8p.js";import"./assertEnabled-0bc21898.browser.esm-CSJHrFi2.js";import"./drop-claim-conditions-171f45b9.browser.esm-C943X4Zm.js";const c=class c extends k{constructor(t,r,n){let h=arguments.length>3&&arguments[3]!==void 0?arguments[3]:{},i=arguments.length>4?arguments[4]:void 0,m=arguments.length>5?arguments[5]:void 0,u=arguments.length>6&&arguments[6]!==void 0?arguments[6]:new C(t,r,i,h,n);super(u,n,m);e(this,"mint",o(async t=>this.erc721.mint.prepare(t)));e(this,"mintTo",o(async(t,r)=>this.erc721.mintTo.prepare(t,r)));e(this,"mintBatch",o(async t=>this.erc721.mintBatch.prepare(t)));e(this,"mintBatchTo",o(async(t,r)=>this.erc721.mintBatchTo.prepare(t,r)));e(this,"burn",o(t=>this.erc721.burn.prepare(t)));this.abi=W.parse(i||[]),this.metadata=new E(this.contractWrapper,f,this.storage),this.app=new S(this.contractWrapper,this.metadata,this.storage),this.roles=new I(this.contractWrapper,c.contractRoles),this.royalties=new M(this.contractWrapper,this.metadata),this.sales=new P(this.contractWrapper),this.encoder=new w(this.contractWrapper),this.estimator=new b(this.contractWrapper),this.events=new A(this.contractWrapper),this.platformFees=new v(this.contractWrapper),this.interceptor=new B(this.contractWrapper),this.signature=new x(this.contractWrapper,this.storage),this.owner=new O(this.contractWrapper)}onNetworkUpdated(t){this.contractWrapper.updateSignerOrProvider(t)}getAddress(){return this.contractWrapper.address}async isTransferRestricted(){return!await this.contractWrapper.read("hasRole",[y("transfer"),T])}async getMintTransaction(t,r){return this.erc721.getMintTransaction(t,r)}async prepare(t,r,n){return R.fromContractWrapper({contractWrapper:this.contractWrapper,method:t,args:r,overrides:n})}async call(t,r,n){return this.contractWrapper.call(t,r,n)}};e(c,"contractRoles",l);let p=c;export{p as NFTCollection};
