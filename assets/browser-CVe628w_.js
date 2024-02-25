import{b1 as Y,cF as S,b0 as le}from"./index-CiL9jNrD.js";function pe(e,n){for(var t=0;t<n.length;t++){const i=n[t];if(typeof i!="string"&&!Array.isArray(i)){for(const s in i)if(s!=="default"&&!(s in e)){const r=Object.getOwnPropertyDescriptor(i,s);r&&Object.defineProperty(e,s,r.get?r:{enumerable:!0,get:()=>i[s]})}}}return Object.freeze(Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}))}const Z=e=>e==="injected"?"injected":e.endsWith(".ipc")?"ipc":e.startsWith("wss://")||e.startsWith("ws://")?"ws":e.startsWith("https://")||e.startsWith("http://")?"http":"";var me=(e,n)=>[].concat(...[].concat(e).map(t=>n[t]?n[t].map(i=>({type:t,location:i,protocol:Z(i)})):{type:"custom",location:t,protocol:Z(t)})).filter(t=>t.protocol||t.type==="injected"?!0:(console.log('eth-provider | Invalid provider preset/location: "'+t.location+'"'),!1)),K={},A={};Object.defineProperty(A,"__esModule",{value:!0});A.create=void 0;function ve(e,n=[],t,i){const s={id:t,method:e,params:n,jsonrpc:"2.0"};if(i&&(s.chainId=i),s.method==="eth_sendTransaction"){const r=ge(s);if(r)throw new Error(`Payload chainId (${r}) inconsistent with specified target chainId: ${i}`);return _e(s)}return s}A.create=ve;function ge(e){if(e.method!=="eth_sendTransaction")return!1;const n=e.params[0]||{},t=n.chainId;return"chainId"in n&&parseInt(t)!==parseInt(e.chainId||t)}function _e(e){const n=e.params[0]||{};return{...e,params:[{...n,chainId:n.chainId||e.chainId},...e.params.slice(1)]}}var ye=Y&&Y.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(K,"__esModule",{value:!0});const be=ye(S),we=A;class Se extends be.default{constructor(n){super(),this.promises={},this.attemptedSubscriptions=new Set,this.subscriptions=[],this.checkConnectionRunning=!1,this.nextId=1,this.connected=!1,this.accounts=[],this.selectedAddress=void 0,this.coinbase=void 0,this.enable=this.enable.bind(this),this.doSend=this.doSend.bind(this),this.send=this.send.bind(this),this.sendBatch=this.sendBatch.bind(this),this.subscribe=this.subscribe.bind(this),this.unsubscribe=this.unsubscribe.bind(this),this.resumeSubscriptions=this.resumeSubscriptions.bind(this),this.sendAsync=this.sendAsync.bind(this),this.sendAsyncBatch=this.sendAsyncBatch.bind(this),this.isConnected=this.isConnected.bind(this),this.close=this.close.bind(this),this.request=this.request.bind(this),this.connection=n,this.on("connect",this.resumeSubscriptions),this.connection.on("connect",()=>this.checkConnection(1e3)),this.connection.on("close",()=>{this.connected=!1,this.attemptedSubscriptions.clear(),this.emit("close"),this.emit("disconnect")}),this.connection.on("payload",t=>{const{id:i,method:s,error:r,result:o}=t;if(typeof i<"u"){if(this.promises[i]){const c=this.promises[i].method;if(c&&["eth_accounts","eth_requestAccounts"].includes(c)){const a=o||[];this.accounts=a,this.selectedAddress=a[0],this.coinbase=a[0]}t.error?this.promises[i].reject(r):this.promises[i].resolve(o),delete this.promises[i]}}else s&&s.indexOf("_subscription")>-1&&(this.emit(t.params.subscription,t.params.result),this.emit(s,t.params),this.emit("message",{type:t.method,data:{subscription:t.params.subscription,result:t.params.result}}),this.emit("data",t))}),this.on("newListener",t=>{Object.keys(this.eventHandlers).includes(t)&&!this.attemptedSubscription(t)&&this.connected&&(this.startSubscription(t),t==="networkChanged"&&console.warn("The networkChanged event is being deprecated, use chainChanged instead"))}),this.eventHandlers={networkChanged:t=>{this.networkVersion=typeof t=="string"?parseInt(t):t,this.emit("networkChanged",this.networkVersion)},chainChanged:t=>{this.providerChainId=t,this.manualChainId||this.emit("chainChanged",t)},chainsChanged:t=>{this.emit("chainsChanged",t)},accountsChanged:t=>{this.selectedAddress=t[0],this.emit("accountsChanged",t)},assetsChanged:t=>{this.emit("assetsChanged",t)}}}get chainId(){return this.manualChainId||this.providerChainId}async checkConnection(n=4e3){if(!(this.checkConnectionRunning||this.connected)){clearTimeout(this.checkConnectionTimer),this.checkConnectionTimer=void 0,this.checkConnectionRunning=!0;try{this.networkVersion=await this.doSend("net_version",[],void 0,!1),this.providerChainId=await this.doSend("eth_chainId",[],void 0,!1),this.connected=!0}catch{this.checkConnectionTimer=setTimeout(()=>this.checkConnection(),n),this.connected=!1}finally{this.checkConnectionRunning=!1,this.connected&&this.emit("connect",{chainId:this.providerChainId})}}}attemptedSubscription(n){return this.attemptedSubscriptions.has(n)}setSubscriptionAttempted(n){this.attemptedSubscriptions.add(n)}async startSubscription(n){console.debug(`starting subscription for ${n} events`),this.setSubscriptionAttempted(n);try{const t=await this.subscribe("eth_subscribe",n);this.on(t,this.eventHandlers[n])}catch(t){console.warn(`Unable to subscribe to ${n}`,t)}}resumeSubscriptions(){Object.keys(this.eventHandlers).forEach(n=>{this.listenerCount(n)&&!this.attemptedSubscription(n)&&this.startSubscription(n)})}async enable(){const n=await this.doSend("eth_accounts");if(n.length>0)return this.accounts=n,this.selectedAddress=n[0],this.coinbase=n[0],this.emit("enable"),n;{const t=new Error("User Denied Full Provider");throw t.code="4001",t}}doSend(n,t=[],i=this.manualChainId,s=!0){const r=(o,c)=>{const a=typeof n=="object"?n.method:n,d=typeof n=="object"?n.params:t,u=typeof n=="object"&&n.chainId||i;if(!a)return c(new Error("Method is not a valid string."));try{const h=(0,we.create)(a,d,this.nextId++,u);this.promises[h.id]={resolve:f=>o(f),reject:c,method:h.method},this.connection.send(h)}catch(h){c(h)}};return this.connected||!s?new Promise(r):new Promise((o,c)=>{const a=()=>(clearTimeout(d),o(new Promise(r))),d=setTimeout(()=>{this.off("connect",a),c(new Error("Not connected"))},5e3);this.once("connect",a)})}async send(n,t){if(typeof n=="string"&&(!t||Array.isArray(t))){const i=t;return this.doSend(n,i)}if(n&&typeof n=="object"&&typeof t=="function"){const i=t;return this.sendAsync(n,i)}return this.request(n)}sendBatch(n){return Promise.all(n.map(t=>this.doSend(t.method,t.params)))}async subscribe(n,t,i=[]){const s=await this.doSend(n,[t,...i]);return this.subscriptions.push(s),s}async unsubscribe(n,t){const i=await this.doSend(n,[t]);if(i)return this.subscriptions=this.subscriptions.filter(s=>s!==t),this.removeAllListeners(t),i}async sendAsync(n,t){if(!t||typeof t!="function")return new Error("Invalid or undefined callback provided to sendAsync");if(!n)return t(new Error("Invalid Payload"));if(Array.isArray(n)){const i=n.map(r=>({...r,jsonrpc:"2.0"})),s=t;return this.sendAsyncBatch(i,s)}else{const i={...n,jsonrpc:"2.0"},s=t;try{const r=await this.doSend(i.method,i.params);s(null,{id:i.id,jsonrpc:i.jsonrpc,result:r})}catch(r){s(r)}}}async sendAsyncBatch(n,t){try{const s=(await this.sendBatch(n)).map((r,o)=>({id:n[o].id,jsonrpc:n[o].jsonrpc,result:r}));t(null,s)}catch(i){t(i)}}isConnected(){return this.connected}close(){this.connection&&this.connection.close&&this.connection.close(),this.off("connect",this.resumeSubscriptions),this.connected=!1;const n=new Error("Provider closed, subscription lost, please subscribe again.");this.subscriptions.forEach(t=>this.emit(t,n)),this.subscriptions=[],this.manualChainId=void 0,this.providerChainId=void 0,this.networkVersion=void 0,this.selectedAddress=void 0,this.coinbase=void 0}async request(n){return this.doSend(n.method,n.params,n.chainId)}setChain(n){typeof n=="number"&&(n="0x"+n.toString(16));const t=n!==this.chainId;this.manualChainId=n,t&&this.emit("chainChanged",this.chainId)}}K.default=Se;const Ie=S;let Ce=class extends Ie{constructor(n,t,i){super(),this.targets=t,this.options=i,this.connections=n,this.connected=!1,this.status="loading",this.interval=i.interval||5e3,this.name=i.name||"default",this.inSetup=!0,this.connect()}connect(n=0){if(!(this.connection&&this.connection.status==="connected"&&n>=this.connection.index)){if(this.targets.length!==0){const{protocol:t,location:i}=this.targets[n];this.connection=this.connections[t](i,this.options);const s=r=>this.connectionError(n,r);this.connection.once("error",s),this.connection.on("connect",()=>{this.connection.off("error",s),this.connection.once("error",r=>this.onError(r)),this.connection.once("close",()=>{this.connected=!1,this.emitClose(),this.closing||this.refresh()}),this.connection.target=this.targets[n],this.connection.index=n,this.targets[n].status=this.connection.status,this.connected=!0,this.inSetup=!1,this.emit("connect")}),this.connection.on("data",r=>this.emit("data",r)),this.connection.on("payload",r=>this.emit("payload",r))}}}onError(n){if(this.listenerCount("error"))return this.emit("error",n);console.warn("[eth-provider] Uncaught connection error: "+n.message)}refresh(n=this.interval){clearTimeout(this.connectTimer),this.connectTimer=setTimeout(()=>this.connect(),n)}connectionError(n,t){this.connection&&this.connection.close&&this.connection.close(),this.targets[n].status=t,this.targets.length-1===n?(this.inSetup=!1,this.refresh()):this.connect(++n)}emitClose(){this.emit("close")}close(){this.closing=!0,this.connection&&this.connection.close&&!this.connection.closed?this.connection.close():this.emit("close"),clearTimeout(this.connectTimer),clearTimeout(this.setupTimer)}error(n,t,i=-1){this.emit("payload",{id:n.id,jsonrpc:n.jsonrpc,error:{message:t,code:i}})}send(n){this.inSetup?this.setupTimer=setTimeout(()=>this.send(n),100):this.connection.closed?this.error(n,"Not connected",4900):this.connection.send(n)}};var $e=Ce;const Ee=S,ke=K.default,Te=$e,z=e=>{function n(s){e.status=s,e instanceof Ee&&e.emit("status",s)}async function t(){try{await e.send("eth_syncing")&&n("syncing")}catch{}}async function i(){if(e.inSetup)return setTimeout(i,1e3);try{await e.send("eth_chainId"),n("connected"),setTimeout(t,500)}catch{n("disconnected")}}return n("loading"),i(),e.on("connect",()=>i()),e.on("close",()=>n("disconnected")),e};var Ae=(e,n,t)=>{if(e.injected.__isProvider&&n.map(s=>s.type).indexOf("injected")>-1)return delete e.injected.__isProvider,z(e.injected);const i=new ke(new Te(e,n,t));return i.setMaxListeners(128),z(i)},je=(e={})=>({injected:["injected"],frame:["ws://127.0.0.1:1248","http://127.0.0.1:1248"],direct:["ws://127.0.0.1:8546","http://127.0.0.1:8545"],infura:[`wss://mainnet.infura.io/ws/v3/${e.infuraId}`,`https://mainnet.infura.io/v3/${e.infuraId}`],alchemy:[`wss://eth-mainnet.ws.alchemyapi.io/v2/${e.alchemyId}`,`https://eth-mainnet.alchemyapi.io/v2/${e.alchemyId}`],infuraGoerli:[`wss://goerli.infura.io/ws/v3/${e.infuraId}`,`https://goerli.infura.io/v3/${e.infuraId}`],alchemyGoerli:[`wss://eth-goerli.ws.alchemyapi.io/v2/${e.alchemyId}`,`https://eth-goerli.alchemyapi.io/v2/${e.alchemyId}`],infuraPolygon:[`https://polygon-mainnet.infura.io/v3/${e.infuraId}`],infuraArbitrum:[`https://arbitrum-mainnet.infura.io/v3/${e.infuraId}`],infuraOptimism:[`https://optimism-mainnet.infura.io/v3/${e.infuraId}`],infuraSepolia:[`wss://sepolia.infura.io/ws/v3/${e.infuraId}`,`https://sepolia.infura.io/v3/${e.infuraId}`],gnosis:["https://rpc.gnosischain.com"],optimism:["https://mainnet.optimism.io"]}),W,ee;function Me(){if(ee)return W;ee=1;const e=S;class n extends e{constructor(i,s){super(),setTimeout(i?()=>this.onError(new Error("Injected web3 provider is not currently supported")):()=>this.onError(new Error("No injected provider found")),0)}onError(i){this.listenerCount("error")&&this.emit("error",i)}}return W=t=>i=>new n(t,i),W}const Oe=S;class Pe extends Oe{constructor(n){super(),setTimeout(()=>this.onError(new Error(n)),0)}onError(n){this.listenerCount("error")&&this.emit("error",n)}}var Ue=e=>()=>new Pe(e);let E,B;var Le=(e,n)=>{const t=[];e.replace(/\}[\n\r]?\{/g,"}|--|{").replace(/\}\][\n\r]?\[\{/g,"}]|--|[{").replace(/\}[\n\r]?\[\{/g,"}|--|[{").replace(/\}\][\n\r]?\{/g,"}]|--|{").split("|--|").forEach(i=>{E&&(i=E+i);let s;try{s=JSON.parse(i)}catch{E=i,clearTimeout(B),B=setTimeout(()=>n(new Error("Parse response timeout")),15*1e3);return}clearTimeout(B),E=null,s&&t.push(s)}),n(null,t)};const Re=S,De=Le;let C;class qe extends Re{constructor(n,t,i){super(),this.socketListeners=[],C=n,setTimeout(()=>this.create(t,i),0)}create(n,t){if(!C)return this.onError(new Error("No WebSocket transport available"));try{this.socket=new C(n,[],{origin:t.origin})}catch(i){return this.onError(i)}this.addSocketListener("error",this.onError.bind(this)),this.addSocketListener("open",this.onOpen.bind(this)),this.addSocketListener("close",this.onClose.bind(this))}addSocketListener(n,t){this.socket.addEventListener(n,t),this.socketListeners.push({event:n,handler:t})}removeAllSocketListeners(){this.socketListeners.forEach(({event:n,handler:t})=>{this.socket.removeEventListener(n,t)}),this.socketListeners=[]}onOpen(){this.emit("connect"),this.addSocketListener("message",this.onMessage.bind(this))}onMessage(n){const t=typeof n.data=="string"?n.data:"";De(t,(i,s)=>{i||s.forEach(r=>{Array.isArray(r)?r.forEach(o=>this.emit("payload",o)):this.emit("payload",r)})})}onError(n){this.listenerCount("error")&&this.emit("error",n)}onClose(n){n&&n.reason,n&&n.code,this.socket&&(this.removeAllSocketListeners(),this.socket=null),this.closed=!0,this.emit("close"),this.removeAllListeners()}close(){this.socket&&C&&this.socket.readyState!==C.CLOSED?(this.removeAllSocketListeners(),this.addSocketListener("error",()=>{}),this.addSocketListener("close",this.onClose.bind(this)),this.socket.terminate?this.socket.terminate():this.socket.close()):this.onClose()}error(n,t,i=-1){this.emit("payload",{id:n.id,jsonrpc:n.jsonrpc,error:{message:t,code:i}})}send(n){try{this.socket&&this.socket.readyState===this.socket.CONNECTING?setTimeout(t=>this.send(n),10):!this.socket||this.socket.readyState>1?(this.connected=!1,this.error(n,"Not connected")):this.socket.send(JSON.stringify(n))}catch(t){this.error(n,t.message)}}}var Ne=e=>(n,t)=>new qe(e,n,t),ie={},j={},M={};Object.defineProperty(M,"__esModule",{value:!0});M.default=He;let k;const xe=new Uint8Array(16);function He(){if(!k&&(k=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!k))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return k(xe)}var w={},I={},O={};Object.defineProperty(O,"__esModule",{value:!0});O.default=void 0;var We=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;O.default=We;Object.defineProperty(I,"__esModule",{value:!0});I.default=void 0;var Be=Ve(O);function Ve(e){return e&&e.__esModule?e:{default:e}}function Je(e){return typeof e=="string"&&Be.default.test(e)}var Fe=Je;I.default=Fe;Object.defineProperty(w,"__esModule",{value:!0});w.default=void 0;w.unsafeStringify=se;var Ge=Xe(I);function Xe(e){return e&&e.__esModule?e:{default:e}}const p=[];for(let e=0;e<256;++e)p.push((e+256).toString(16).slice(1));function se(e,n=0){return(p[e[n+0]]+p[e[n+1]]+p[e[n+2]]+p[e[n+3]]+"-"+p[e[n+4]]+p[e[n+5]]+"-"+p[e[n+6]]+p[e[n+7]]+"-"+p[e[n+8]]+p[e[n+9]]+"-"+p[e[n+10]]+p[e[n+11]]+p[e[n+12]]+p[e[n+13]]+p[e[n+14]]+p[e[n+15]]).toLowerCase()}function Ke(e,n=0){const t=se(e,n);if(!(0,Ge.default)(t))throw TypeError("Stringified UUID is invalid");return t}var Qe=Ke;w.default=Qe;Object.defineProperty(j,"__esModule",{value:!0});j.default=void 0;var Ye=ze(M),Ze=w;function ze(e){return e&&e.__esModule?e:{default:e}}let te,V,J=0,F=0;function et(e,n,t){let i=n&&t||0;const s=n||new Array(16);e=e||{};let r=e.node||te,o=e.clockseq!==void 0?e.clockseq:V;if(r==null||o==null){const f=e.random||(e.rng||Ye.default)();r==null&&(r=te=[f[0]|1,f[1],f[2],f[3],f[4],f[5]]),o==null&&(o=V=(f[6]<<8|f[7])&16383)}let c=e.msecs!==void 0?e.msecs:Date.now(),a=e.nsecs!==void 0?e.nsecs:F+1;const d=c-J+(a-F)/1e4;if(d<0&&e.clockseq===void 0&&(o=o+1&16383),(d<0||c>J)&&e.nsecs===void 0&&(a=0),a>=1e4)throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");J=c,F=a,V=o,c+=122192928e5;const u=((c&268435455)*1e4+a)%4294967296;s[i++]=u>>>24&255,s[i++]=u>>>16&255,s[i++]=u>>>8&255,s[i++]=u&255;const h=c/4294967296*1e4&268435455;s[i++]=h>>>8&255,s[i++]=h&255,s[i++]=h>>>24&15|16,s[i++]=h>>>16&255,s[i++]=o>>>8|128,s[i++]=o&255;for(let f=0;f<6;++f)s[i+f]=r[f];return n||(0,Ze.unsafeStringify)(s)}var tt=et;j.default=tt;var P={},b={},$={};Object.defineProperty($,"__esModule",{value:!0});$.default=void 0;var nt=it(I);function it(e){return e&&e.__esModule?e:{default:e}}function st(e){if(!(0,nt.default)(e))throw TypeError("Invalid UUID");let n;const t=new Uint8Array(16);return t[0]=(n=parseInt(e.slice(0,8),16))>>>24,t[1]=n>>>16&255,t[2]=n>>>8&255,t[3]=n&255,t[4]=(n=parseInt(e.slice(9,13),16))>>>8,t[5]=n&255,t[6]=(n=parseInt(e.slice(14,18),16))>>>8,t[7]=n&255,t[8]=(n=parseInt(e.slice(19,23),16))>>>8,t[9]=n&255,t[10]=(n=parseInt(e.slice(24,36),16))/1099511627776&255,t[11]=n/4294967296&255,t[12]=n>>>24&255,t[13]=n>>>16&255,t[14]=n>>>8&255,t[15]=n&255,t}var rt=st;$.default=rt;Object.defineProperty(b,"__esModule",{value:!0});b.URL=b.DNS=void 0;b.default=dt;var ot=w,ct=at($);function at(e){return e&&e.__esModule?e:{default:e}}function ut(e){e=unescape(encodeURIComponent(e));const n=[];for(let t=0;t<e.length;++t)n.push(e.charCodeAt(t));return n}const re="6ba7b810-9dad-11d1-80b4-00c04fd430c8";b.DNS=re;const oe="6ba7b811-9dad-11d1-80b4-00c04fd430c8";b.URL=oe;function dt(e,n,t){function i(s,r,o,c){var a;if(typeof s=="string"&&(s=ut(s)),typeof r=="string"&&(r=(0,ct.default)(r)),((a=r)===null||a===void 0?void 0:a.length)!==16)throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");let d=new Uint8Array(16+s.length);if(d.set(r),d.set(s,r.length),d=t(d),d[6]=d[6]&15|n,d[8]=d[8]&63|128,o){c=c||0;for(let u=0;u<16;++u)o[c+u]=d[u];return o}return(0,ot.unsafeStringify)(d)}try{i.name=e}catch{}return i.DNS=re,i.URL=oe,i}var U={};Object.defineProperty(U,"__esModule",{value:!0});U.default=void 0;function ht(e){if(typeof e=="string"){const n=unescape(encodeURIComponent(e));e=new Uint8Array(n.length);for(let t=0;t<n.length;++t)e[t]=n.charCodeAt(t)}return ft(lt(pt(e),e.length*8))}function ft(e){const n=[],t=e.length*32,i="0123456789abcdef";for(let s=0;s<t;s+=8){const r=e[s>>5]>>>s%32&255,o=parseInt(i.charAt(r>>>4&15)+i.charAt(r&15),16);n.push(o)}return n}function ce(e){return(e+64>>>9<<4)+14+1}function lt(e,n){e[n>>5]|=128<<n%32,e[ce(n)-1]=n;let t=1732584193,i=-271733879,s=-1732584194,r=271733878;for(let o=0;o<e.length;o+=16){const c=t,a=i,d=s,u=r;t=m(t,i,s,r,e[o],7,-680876936),r=m(r,t,i,s,e[o+1],12,-389564586),s=m(s,r,t,i,e[o+2],17,606105819),i=m(i,s,r,t,e[o+3],22,-1044525330),t=m(t,i,s,r,e[o+4],7,-176418897),r=m(r,t,i,s,e[o+5],12,1200080426),s=m(s,r,t,i,e[o+6],17,-1473231341),i=m(i,s,r,t,e[o+7],22,-45705983),t=m(t,i,s,r,e[o+8],7,1770035416),r=m(r,t,i,s,e[o+9],12,-1958414417),s=m(s,r,t,i,e[o+10],17,-42063),i=m(i,s,r,t,e[o+11],22,-1990404162),t=m(t,i,s,r,e[o+12],7,1804603682),r=m(r,t,i,s,e[o+13],12,-40341101),s=m(s,r,t,i,e[o+14],17,-1502002290),i=m(i,s,r,t,e[o+15],22,1236535329),t=v(t,i,s,r,e[o+1],5,-165796510),r=v(r,t,i,s,e[o+6],9,-1069501632),s=v(s,r,t,i,e[o+11],14,643717713),i=v(i,s,r,t,e[o],20,-373897302),t=v(t,i,s,r,e[o+5],5,-701558691),r=v(r,t,i,s,e[o+10],9,38016083),s=v(s,r,t,i,e[o+15],14,-660478335),i=v(i,s,r,t,e[o+4],20,-405537848),t=v(t,i,s,r,e[o+9],5,568446438),r=v(r,t,i,s,e[o+14],9,-1019803690),s=v(s,r,t,i,e[o+3],14,-187363961),i=v(i,s,r,t,e[o+8],20,1163531501),t=v(t,i,s,r,e[o+13],5,-1444681467),r=v(r,t,i,s,e[o+2],9,-51403784),s=v(s,r,t,i,e[o+7],14,1735328473),i=v(i,s,r,t,e[o+12],20,-1926607734),t=g(t,i,s,r,e[o+5],4,-378558),r=g(r,t,i,s,e[o+8],11,-2022574463),s=g(s,r,t,i,e[o+11],16,1839030562),i=g(i,s,r,t,e[o+14],23,-35309556),t=g(t,i,s,r,e[o+1],4,-1530992060),r=g(r,t,i,s,e[o+4],11,1272893353),s=g(s,r,t,i,e[o+7],16,-155497632),i=g(i,s,r,t,e[o+10],23,-1094730640),t=g(t,i,s,r,e[o+13],4,681279174),r=g(r,t,i,s,e[o],11,-358537222),s=g(s,r,t,i,e[o+3],16,-722521979),i=g(i,s,r,t,e[o+6],23,76029189),t=g(t,i,s,r,e[o+9],4,-640364487),r=g(r,t,i,s,e[o+12],11,-421815835),s=g(s,r,t,i,e[o+15],16,530742520),i=g(i,s,r,t,e[o+2],23,-995338651),t=_(t,i,s,r,e[o],6,-198630844),r=_(r,t,i,s,e[o+7],10,1126891415),s=_(s,r,t,i,e[o+14],15,-1416354905),i=_(i,s,r,t,e[o+5],21,-57434055),t=_(t,i,s,r,e[o+12],6,1700485571),r=_(r,t,i,s,e[o+3],10,-1894986606),s=_(s,r,t,i,e[o+10],15,-1051523),i=_(i,s,r,t,e[o+1],21,-2054922799),t=_(t,i,s,r,e[o+8],6,1873313359),r=_(r,t,i,s,e[o+15],10,-30611744),s=_(s,r,t,i,e[o+6],15,-1560198380),i=_(i,s,r,t,e[o+13],21,1309151649),t=_(t,i,s,r,e[o+4],6,-145523070),r=_(r,t,i,s,e[o+11],10,-1120210379),s=_(s,r,t,i,e[o+2],15,718787259),i=_(i,s,r,t,e[o+9],21,-343485551),t=y(t,c),i=y(i,a),s=y(s,d),r=y(r,u)}return[t,i,s,r]}function pt(e){if(e.length===0)return[];const n=e.length*8,t=new Uint32Array(ce(n));for(let i=0;i<n;i+=8)t[i>>5]|=(e[i/8]&255)<<i%32;return t}function y(e,n){const t=(e&65535)+(n&65535);return(e>>16)+(n>>16)+(t>>16)<<16|t&65535}function mt(e,n){return e<<n|e>>>32-n}function L(e,n,t,i,s,r){return y(mt(y(y(n,e),y(i,r)),s),t)}function m(e,n,t,i,s,r,o){return L(n&t|~n&i,e,n,s,r,o)}function v(e,n,t,i,s,r,o){return L(n&i|t&~i,e,n,s,r,o)}function g(e,n,t,i,s,r,o){return L(n^t^i,e,n,s,r,o)}function _(e,n,t,i,s,r,o){return L(t^(n|~i),e,n,s,r,o)}var vt=ht;U.default=vt;Object.defineProperty(P,"__esModule",{value:!0});P.default=void 0;var gt=ae(b),_t=ae(U);function ae(e){return e&&e.__esModule?e:{default:e}}const yt=(0,gt.default)("v3",48,_t.default);var bt=yt;P.default=bt;var R={},D={};Object.defineProperty(D,"__esModule",{value:!0});D.default=void 0;const wt=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto);var St={randomUUID:wt};D.default=St;Object.defineProperty(R,"__esModule",{value:!0});R.default=void 0;var ne=ue(D),It=ue(M),Ct=w;function ue(e){return e&&e.__esModule?e:{default:e}}function $t(e,n,t){if(ne.default.randomUUID&&!n&&!e)return ne.default.randomUUID();e=e||{};const i=e.random||(e.rng||It.default)();if(i[6]=i[6]&15|64,i[8]=i[8]&63|128,n){t=t||0;for(let s=0;s<16;++s)n[t+s]=i[s];return n}return(0,Ct.unsafeStringify)(i)}var Et=$t;R.default=Et;var q={},N={};Object.defineProperty(N,"__esModule",{value:!0});N.default=void 0;function kt(e,n,t,i){switch(e){case 0:return n&t^~n&i;case 1:return n^t^i;case 2:return n&t^n&i^t&i;case 3:return n^t^i}}function G(e,n){return e<<n|e>>>32-n}function Tt(e){const n=[1518500249,1859775393,2400959708,3395469782],t=[1732584193,4023233417,2562383102,271733878,3285377520];if(typeof e=="string"){const o=unescape(encodeURIComponent(e));e=[];for(let c=0;c<o.length;++c)e.push(o.charCodeAt(c))}else Array.isArray(e)||(e=Array.prototype.slice.call(e));e.push(128);const i=e.length/4+2,s=Math.ceil(i/16),r=new Array(s);for(let o=0;o<s;++o){const c=new Uint32Array(16);for(let a=0;a<16;++a)c[a]=e[o*64+a*4]<<24|e[o*64+a*4+1]<<16|e[o*64+a*4+2]<<8|e[o*64+a*4+3];r[o]=c}r[s-1][14]=(e.length-1)*8/Math.pow(2,32),r[s-1][14]=Math.floor(r[s-1][14]),r[s-1][15]=(e.length-1)*8&4294967295;for(let o=0;o<s;++o){const c=new Uint32Array(80);for(let l=0;l<16;++l)c[l]=r[o][l];for(let l=16;l<80;++l)c[l]=G(c[l-3]^c[l-8]^c[l-14]^c[l-16],1);let a=t[0],d=t[1],u=t[2],h=t[3],f=t[4];for(let l=0;l<80;++l){const Q=Math.floor(l/20),fe=G(a,5)+kt(Q,d,u,h)+f+n[Q]+c[l]>>>0;f=h,h=u,u=G(d,30)>>>0,d=a,a=fe}t[0]=t[0]+a>>>0,t[1]=t[1]+d>>>0,t[2]=t[2]+u>>>0,t[3]=t[3]+h>>>0,t[4]=t[4]+f>>>0}return[t[0]>>24&255,t[0]>>16&255,t[0]>>8&255,t[0]&255,t[1]>>24&255,t[1]>>16&255,t[1]>>8&255,t[1]&255,t[2]>>24&255,t[2]>>16&255,t[2]>>8&255,t[2]&255,t[3]>>24&255,t[3]>>16&255,t[3]>>8&255,t[3]&255,t[4]>>24&255,t[4]>>16&255,t[4]>>8&255,t[4]&255]}var At=Tt;N.default=At;Object.defineProperty(q,"__esModule",{value:!0});q.default=void 0;var jt=de(b),Mt=de(N);function de(e){return e&&e.__esModule?e:{default:e}}const Ot=(0,jt.default)("v5",80,Mt.default);var Pt=Ot;q.default=Pt;var x={};Object.defineProperty(x,"__esModule",{value:!0});x.default=void 0;var Ut="00000000-0000-0000-0000-000000000000";x.default=Ut;var H={};Object.defineProperty(H,"__esModule",{value:!0});H.default=void 0;var Lt=Rt(I);function Rt(e){return e&&e.__esModule?e:{default:e}}function Dt(e){if(!(0,Lt.default)(e))throw TypeError("Invalid UUID");return parseInt(e.slice(14,15),16)}var qt=Dt;H.default=qt;(function(e){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"NIL",{enumerable:!0,get:function(){return r.default}}),Object.defineProperty(e,"parse",{enumerable:!0,get:function(){return d.default}}),Object.defineProperty(e,"stringify",{enumerable:!0,get:function(){return a.default}}),Object.defineProperty(e,"v1",{enumerable:!0,get:function(){return n.default}}),Object.defineProperty(e,"v3",{enumerable:!0,get:function(){return t.default}}),Object.defineProperty(e,"v4",{enumerable:!0,get:function(){return i.default}}),Object.defineProperty(e,"v5",{enumerable:!0,get:function(){return s.default}}),Object.defineProperty(e,"validate",{enumerable:!0,get:function(){return c.default}}),Object.defineProperty(e,"version",{enumerable:!0,get:function(){return o.default}});var n=u(j),t=u(P),i=u(R),s=u(q),r=u(x),o=u(H),c=u(I),a=u(w),d=u($);function u(h){return h&&h.__esModule?h:{default:h}}})(ie);const Nt=S,{v4:xt}=ie;let X;class Ht extends Nt{constructor(n,t,i){super(),X=n,this.options=i,this.connected=!1,this.subscriptions=!1,this.status="loading",this.url=t,this.pollId=xt(),setTimeout(()=>this.create(),0),this._emit=(...s)=>this.closed?null:this.emit(...s)}onError(n){!this.closed&&this.listenerCount("error")&&this.emit("error",n)}create(){if(!X)return this.onError(new Error("No HTTP transport available"));this.on("error",()=>{this.connected&&this.close()}),this.init()}init(){this.send({jsonrpc:"2.0",method:"net_version",params:[],id:1},(n,t)=>{if(n)return this.onError(n);this.connected=!0,this._emit("connect"),this.send({jsonrpc:"2.0",id:1,method:"eth_pollSubscriptions",params:[this.pollId,"immediate"]},(i,s)=>{i||(this.subscriptions=!0,this.pollSubscriptions())})})}pollSubscriptions(){this.send({jsonrpc:"2.0",id:1,method:"eth_pollSubscriptions",params:[this.pollId]},(n,t)=>{if(n)return this.subscriptionTimeout=setTimeout(()=>this.pollSubscriptions(),1e4),this.onError(n);this.closed||(this.subscriptionTimeout=this.pollSubscriptions()),t&&t.map(i=>{let s;try{s=JSON.parse(i)}catch{s=!1}return s}).filter(i=>i).forEach(i=>this._emit("payload",i))})}close(){clearTimeout(this.subscriptionTimeout),this._emit("close"),this.closed=!0,this.removeAllListeners()}filterStatus(n){if(n.status>=200&&n.status<300)return n;const t=new Error(n.statusText);throw t.res=n,t.message}error(n,t,i=-1){this._emit("payload",{id:n.id,jsonrpc:n.jsonrpc,error:{message:t,code:i}})}send(n,t){if(this.closed)return this.error(n,"Not connected");if(n.method==="eth_subscribe")if(this.subscriptions)n.pollId=this.pollId;else return this.error(n,"Subscriptions are not supported by this HTTP endpoint");const i=new X;let s=!1;const r=(o,c)=>{if(!s)if(i.abort(),s=!0,t)t(o,c);else{const{id:a,jsonrpc:d}=n,u=o?{id:a,jsonrpc:d,error:{message:o.message,code:o.code}}:{id:a,jsonrpc:d,result:c};this._emit("payload",u)}};try{i.open("POST",this.url,!0),i.setRequestHeader("Content-Type","application/json"),i.timeout=60*1e3,i.onerror=r,i.ontimeout=r,i.onreadystatechange=()=>{if(i.readyState===4)try{const o=JSON.parse(i.responseText);r(o.error,o.result)}catch(o){r(o)}},i.send(JSON.stringify(n))}catch(o){r({message:o.message,code:-1})}}}var Wt=e=>(n,t)=>new Ht(e,n,t);const Bt=me,Vt=Ae,Jt=je,T={ethereum:typeof window<"u"&&typeof window.ethereum<"u"?window.ethereum:null,web3:typeof window<"u"&&typeof window.web3<"u"?window.web3.currentProvider:null},Ft=typeof window<"u"&&typeof window.WebSocket<"u"?window.WebSocket:null,Gt=typeof window<"u"&&typeof window.XMLHttpRequest<"u"?window.XMLHttpRequest:null;T.ethereum&&(T.ethereum.__isProvider=!0);const Xt={injected:T.ethereum||Me()(T.web3),ipc:Ue("IPC connections are unavliable in the browser"),ws:Ne(Ft),http:Wt(Gt)};var he=(e,n)=>{e&&!Array.isArray(e)&&typeof e=="object"&&!n&&(n=e,e=void 0),e||(e=["injected","frame"]),n||(n={}),e=[].concat(e),e.forEach(i=>{if(i.startsWith("alchemy")&&!n.alchemyId)throw new Error("Alchemy was included as a connection target but no Alchemy project ID was passed in options e.g. { alchemyId: '123abc' }");if(i.startsWith("infura")&&!n.infuraId)throw new Error("Infura was included as a connection target but no Infura project ID was passed in options e.g. { infuraId: '123abc' }")});const t=Jt(n);return Vt(Xt,Bt(e,t),n)};const Kt=le(he),Zt=pe({__proto__:null,default:Kt},[he]);export{Zt as b};
