var F=Object.defineProperty;var U=(C,e,r)=>e in C?F(C,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):C[e]=r;var W=(C,e,r)=>(U(C,typeof e!="symbol"?e+"":e,r),r);import{G as f,b6 as A,a7 as _,aU as b,aV as D,B as y,K as O,aW as V,z as Q,l as Z,p as H,t as v,s as z,aX as G,q as P,T as S,aw as E}from"./index-CiL9jNrD.js";import{t as N,l as k,n as M,C as n,c as x,f as K,p as X,d as j,e as L,g as I,u as q,h as J,i as R}from"./index-DmeCaq8p.js";import{h as T,d as u}from"./contract-appuri-3d68505c.browser.esm-CgtTHMym.js";class re{constructor(e,r,t){W(this,"set",v((()=>{var e=this;return async function(r){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1,i=r;if(e.isLegacySinglePhaseDrop(e.contractWrapper)||e.isNewSinglePhaseDrop(e.contractWrapper)){if(t=!0,r.length===0)i=[{startTime:new Date(0),currencyAddress:z,price:0,maxClaimableSupply:0,maxClaimablePerWallet:0,waitInSeconds:0,merkleRootHash:G([0],32),snapshot:[]}];else if(r.length>1)throw new Error("Single phase drop contract cannot have multiple claim conditions, only one is allowed")}(e.isNewSinglePhaseDrop(e.contractWrapper)||e.isNewMultiphaseDrop(e.contractWrapper))&&i.forEach(a=>{var s;if(a.snapshot&&a.snapshot.length>0&&(a.maxClaimablePerWallet===void 0||a.maxClaimablePerWallet==="unlimited"))throw new Error(`maxClaimablePerWallet must be set to a specific value when an allowlist is set.
Example: Set it to 0 to only allow addresses in the allowlist to claim the amount specified in the allowlist.
contract.claimConditions.set([{ snapshot: [{ address: '0x...', maxClaimable: 1 }], maxClaimablePerWallet: 0 }])`);if(a.snapshot&&a.snapshot.length>0&&((s=a.maxClaimablePerWallet)==null?void 0:s.toString())==="0"&&a.snapshot.map(h=>{var w;return typeof h=="string"?0:Number(((w=h.maxClaimable)==null?void 0:w.toString())||0)}).reduce((h,w)=>h+w,0)===0)throw new Error("maxClaimablePerWallet is set to 0, and all addresses in the allowlist have max claimable 0. This means that no one can claim.")});const{snapshotInfos:l,sortedConditions:o}=await X(i,await e.getTokenDecimals(),e.contractWrapper.getProvider(),e.storage,e.getSnapshotFormatVersion()),p={};l.forEach(a=>{p[a.merkleRoot]=a.snapshotUri});const g=await e.metadata.get(),m=[];if(!j(g.merkle,p)){const a=await e.metadata.parseInputMetadata({...g,merkle:p}),s=await e.metadata._parseAndUploadMetadata(a);if(T("setContractURI",e.contractWrapper)){const h=new P(e.contractWrapper);m.push(h.encode("setContractURI",[s]))}else throw new Error("Setting a merkle root requires implementing ContractMetadata in your contract to support storing a merkle root.")}const c=e.contractWrapper,d=new P(c);if(e.isLegacySinglePhaseDrop(c)){const a=new P(c);m.push(a.encode("setClaimConditions",[L(o[0]),t]))}else if(e.isLegacyMultiPhaseDrop(c))m.push(d.encode("setClaimConditions",[o.map(L),t]));else if(e.isNewSinglePhaseDrop(c))m.push(d.encode("setClaimConditions",[I(o[0]),t]));else if(e.isNewMultiphaseDrop(c))m.push(d.encode("setClaimConditions",[o.map(I),t]));else throw new Error("Contract does not support claim conditions");if(T("multicall",e.contractWrapper))return S.fromContractWrapper({contractWrapper:e.contractWrapper,method:"multicall",args:[m]});throw new Error("Contract does not support multicall")}})()));W(this,"update",v(async(e,r)=>{const t=await this.getAll(),i=await q(e,r,t);return await this.set.prepare(i)}));this.storage=t,this.contractWrapper=e,this.metadata=r}async getActive(e){const[r,t,i]=await Promise.all([this.get(),this.metadata.get(),this.getTokenDecimals()]);return await N(r,i,this.contractWrapper.getProvider(),t.merkle||{},this.storage,(e==null?void 0:e.withAllowList)||!1)}async get(e){if(this.isLegacySinglePhaseDrop(this.contractWrapper)){const r=await this.contractWrapper.read("claimCondition",[]);return k(r)}else if(this.isLegacyMultiPhaseDrop(this.contractWrapper)){const r=e!==void 0?e:await this.contractWrapper.read("getActiveClaimConditionId",[]),t=await this.contractWrapper.read("getClaimConditionById",[r]);return k(t)}else if(this.isNewSinglePhaseDrop(this.contractWrapper)){const r=await this.contractWrapper.read("claimCondition",[]);return M(r)}else if(this.isNewMultiphaseDrop(this.contractWrapper)){const r=e!==void 0?e:await this.contractWrapper.read("getActiveClaimConditionId",[]),t=await this.contractWrapper.read("getClaimConditionById",[r]);return M(t)}else throw new Error("Contract does not support claim conditions")}async getAll(e){if(this.isLegacyMultiPhaseDrop(this.contractWrapper)||this.isNewMultiphaseDrop(this.contractWrapper)){const[r,t]=await this.contractWrapper.read("claimCondition",[]),i=r.toNumber(),l=t.toNumber(),o=[];for(let c=i;c<i+l;c++)o.push(this.get(c));const[p,g,...m]=await Promise.all([this.metadata.get(),this.getTokenDecimals(),...o]);return Promise.all(m.map(c=>N(c,g,this.contractWrapper.getProvider(),p.merkle,this.storage,(e==null?void 0:e.withAllowList)||!1)))}else return[await this.getActive(e)]}async canClaim(e,r){return r&&(r=await f(r)),(await this.getClaimIneligibilityReasons(e,r)).length===0}async getClaimIneligibilityReasons(e,r){const t=[];let i,l;if(r===void 0)try{r=await this.contractWrapper.getSignerAddress()}catch(a){console.warn("failed to get signer address",a)}if(!r)return[n.NoWallet];const[o,p]=await Promise.all([f(r),this.getTokenDecimals()]),g=A(_.parse(e),p);try{l=await this.getActive()}catch(a){return b(a,"!CONDITION")||b(a,"no active mint condition")?(t.push(n.NoClaimConditionSet),t):(console.warn("failed to get active claim condition",a),t.push(n.Unknown),t)}if(l.availableSupply!=="unlimited"&&A(l.availableSupply,p).lt(g))return t.push(n.NotEnoughSupply),t;const c=D(l.merkleRootHash).length>0;let d=null;if(c){if(d=await this.getClaimerProofs(o),!d&&(this.isLegacySinglePhaseDrop(this.contractWrapper)||this.isLegacyMultiPhaseDrop(this.contractWrapper)))return t.push(n.AddressNotAllowed),t;if(d)try{const a=await this.prepareClaim(e,!1,p,o);let s;if(this.isLegacyMultiPhaseDrop(this.contractWrapper)){if(i=await this.contractWrapper.read("getActiveClaimConditionId",[]),[s]=await this.contractWrapper.read("verifyClaimMerkleProof",[i,o,e,a.proofs,a.maxClaimable]),!s)return t.push(n.AddressNotAllowed),t}else if(this.isLegacySinglePhaseDrop(this.contractWrapper)){if([s]=await this.contractWrapper.read("verifyClaimMerkleProof",[o,e,{proof:a.proofs,maxQuantityInAllowlist:a.maxClaimable}]),!s)return t.push(n.AddressNotAllowed),t}else this.isNewSinglePhaseDrop(this.contractWrapper)?await this.contractWrapper.read("verifyClaim",[o,e,a.currencyAddress,a.price,{proof:a.proofs,quantityLimitPerWallet:a.maxClaimable,currency:a.currencyAddressInProof,pricePerToken:a.priceInProof}]):this.isNewMultiphaseDrop(this.contractWrapper)&&(i=await this.contractWrapper.read("getActiveClaimConditionId",[]),await this.contractWrapper.read("verifyClaim",[i,o,e,a.currencyAddress,a.price,{proof:a.proofs,quantityLimitPerWallet:a.maxClaimable,currency:a.currencyAddressInProof,pricePerToken:a.priceInProof}]))}catch(a){switch(console.warn("Merkle proof verification failed:","reason"in a?a.reason:a),a.reason){case"!Qty":t.push(n.OverMaxClaimablePerWallet);break;case"!PriceOrCurrency":t.push(n.WrongPriceOrCurrency);break;case"!MaxSupply":t.push(n.NotEnoughSupply);break;case"cant claim yet":t.push(n.ClaimPhaseNotStarted);break;default:{t.push(n.AddressNotAllowed);break}}return t}}if(this.isNewSinglePhaseDrop(this.contractWrapper)||this.isNewMultiphaseDrop(this.contractWrapper)){let a=y.from(0),s=x(l.maxClaimablePerWallet,p);try{a=await this.getSupplyClaimedByWallet(o)}catch{}if(d&&(s=x(d.maxClaimable,p)),s.gt(0)&&s.lt(a.add(g)))return t.push(n.OverMaxClaimablePerWallet),t;if((!c||c&&!d)&&(s.lte(a)||s.eq(0)))return t.push(n.AddressNotAllowed),t}if(this.isLegacySinglePhaseDrop(this.contractWrapper)||this.isLegacyMultiPhaseDrop(this.contractWrapper)){let[a,s]=[y.from(0),y.from(0)];this.isLegacyMultiPhaseDrop(this.contractWrapper)?(i=await this.contractWrapper.read("getActiveClaimConditionId",[]),[a,s]=await this.contractWrapper.read("getClaimTimestamp",[i,o])):this.isLegacySinglePhaseDrop(this.contractWrapper)&&([a,s]=await this.contractWrapper.read("getClaimTimestamp",[o]));const h=y.from(Date.now()).div(1e3);if(a.gt(0)&&h.lt(s))return s.eq(O)?t.push(n.AlreadyClaimed):t.push(n.WaitBeforeNextClaimTransaction),t}if(l.price.gt(0)&&V()){const a=l.price.mul(y.from(e)),s=this.contractWrapper.getProvider();if(Q(l.currencyAddress))(await s.getBalance(o)).lt(a)&&t.push(n.NotEnoughTokens);else{const h=(await Z(()=>import("./index-CiL9jNrD.js").then(B=>B.dm),__vite__mapDeps([0,1]))).default;(await new H(s,l.currencyAddress,h,{},this.storage).read("balanceOf",[o])).lt(a)&&t.push(n.NotEnoughTokens)}}return t}async getClaimerProofs(e,r){const i=(await this.get(r)).merkleRoot;if(D(i).length>0){const[o,p]=await Promise.all([this.metadata.get(),f(e)]);return await K(p,i.toString(),o.merkle,this.contractWrapper.getProvider(),this.storage,this.getSnapshotFormatVersion())}else return null}async getSupplyClaimedByWallet(e){const r=await f(e);if(this.isNewSinglePhaseDrop(this.contractWrapper))return await this.contractWrapper.read("getSupplyClaimedByWallet",[r]);if(this.isNewMultiphaseDrop(this.contractWrapper)){const t=await this.contractWrapper.read("getActiveClaimConditionId",[]);return await this.contractWrapper.read("getSupplyClaimedByWallet",[t,r])}throw new Error("This contract does not support the getSupplyClaimedByWallet function")}async getTokenDecimals(){return u(this.contractWrapper,"ERC20")?this.contractWrapper.read("decimals",[]):Promise.resolve(0)}async prepareClaim(e,r){let t=arguments.length>2&&arguments[2]!==void 0?arguments[2]:0,i=arguments.length>3?arguments[3]:void 0;const[l,o]=await Promise.all([i||this.contractWrapper.getSignerAddress(),this.getActive()]);return J(l,e,o,async()=>(await this.metadata.get()).merkle,t,this.contractWrapper,this.storage,r,this.getSnapshotFormatVersion())}async getClaimArguments(e,r,t){const i=await f(e);return this.isLegacyMultiPhaseDrop(this.contractWrapper)?[i,r,t.currencyAddress,t.price,t.proofs,t.maxClaimable]:this.isLegacySinglePhaseDrop(this.contractWrapper)?[i,r,t.currencyAddress,t.price,{proof:t.proofs,maxQuantityInAllowlist:t.maxClaimable},E("")]:[i,r,t.currencyAddress,t.price,{proof:t.proofs,quantityLimitPerWallet:t.maxClaimable,pricePerToken:t.priceInProof,currency:t.currencyAddressInProof},E("")]}async getClaimTransaction(e,r,t){if(t!=null&&t.pricePerToken)throw new Error("Price per token is be set via claim conditions by calling `contract.erc721.claimConditions.set()`");const i=await this.prepareClaim(r,(t==null?void 0:t.checkERC20Allowance)===void 0?!0:t.checkERC20Allowance,await this.getTokenDecimals());return S.fromContractWrapper({contractWrapper:this.contractWrapper,method:"claim",args:await this.getClaimArguments(e,r,i),overrides:i.overrides})}isNewSinglePhaseDrop(e){return u(e,"ERC721ClaimConditionsV2")||u(e,"ERC20ClaimConditionsV2")}isNewMultiphaseDrop(e){return u(e,"ERC721ClaimPhasesV2")||u(e,"ERC20ClaimPhasesV2")}isLegacySinglePhaseDrop(e){return u(e,"ERC721ClaimConditionsV1")||u(e,"ERC20ClaimConditionsV1")}isLegacyMultiPhaseDrop(e){return u(e,"ERC721ClaimPhasesV1")||u(e,"ERC20ClaimPhasesV1")}getSnapshotFormatVersion(){return this.isLegacyMultiPhaseDrop(this.contractWrapper)||this.isLegacySinglePhaseDrop(this.contractWrapper)?R.V1:R.V2}}export{re as D};
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/index-CiL9jNrD.js","assets/index-JX8AfnXq.css"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
