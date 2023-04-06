var Vx=Object.defineProperty;var Kx=(e,t,r)=>t in e?Vx(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var ye=(e,t,r)=>(Kx(e,typeof t!="symbol"?t+"":t,r),r);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function r(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerpolicy&&(i.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?i.credentials="include":n.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(n){if(n.ep)return;n.ep=!0;const i=r(n);fetch(n.href,i)}})();class dc{constructor(t){ye(this,"data");ye(this,"prev");ye(this,"next");this.data=t,this.prev=null,this.next=null}}class Ja{constructor(){ye(this,"head");ye(this,"tail");ye(this,"size");this.head=null,this.tail=null,this.size=0}[Symbol.iterator](){let r=this.head;return{[Symbol.iterator](){return this},next(){if(r){const o=r;return r=r.next,{value:o}}else return{value:null,done:!0}}}}add(t){let r=new dc(t);this.head==null?(this.head=r,this.tail=r):(r.prev=this.tail,this.tail.next=r,this.tail=r),this.size++}insertBefore(t,r){let o=new dc(r);t.prev==null?(this.head=o,t.prev=o,o.next=t):(o.next=t,o.prev=t.prev,t.prev.next=o,t.prev=o),this.size++}insertAfter(t,r){let o=new dc(r);t.next==null?(this.tail=o,t.next=o,o.prev=t):(o.next=t.next,t.next.prev=o,o.prev=t,t.next=o),this.size++}delete(t){this.head==null||t==null||(this.head==t&&(this.head=this.head.next,this.head!=null&&(this.head.prev=null)),this.tail==t&&(this.tail=this.tail.prev,this.tail!=null&&(this.tail.next=null)),t.prev!=null&&(t.prev.next=t.next),t.next!=null&&(t.next.prev=t.prev),this.size--)}traverseForward(t){let r=this.head,o=0;for(;r!=null;)t(r.data,o,r,this),r=r.next,o++}traverseBackward(t){let r=this.tail,o=0;for(;r!=null;)t(r.data,o,r,this),r=r.prev,o++}getHead(){return this.head}getTail(){return this.tail}toArray(){let t=[],r=this.head;for(;r!=null;)t.push(r.data),r=r.next;return t}toArrayOfTraverseBackward(){let t=[];return this.traverseBackward(r=>{t.push(r)}),t}static from(t){let r=new Ja;for(let o of t)r.add(o);return r}}function qx(){return{initialization(e){e.assignConfig({format(t,r,o){return t.getConfig().origin?[`%c[${t.chain.toArrayOfTraverseBackward().join(">")}]
`,Gc[r],...o]:[`%c[${t.namespace}]
`,Gc[r],...o]}},!1)},config:{origin:!0}}}function Gx(){return{filter(e){let t=e.getConfig().include;return e.chain.traverseBackward(r=>{if(typeof t=="boolean")return t;if(t===void 0)return!1;t=t[r]}),typeof t=="boolean"?t:!1},config:{include:!0}}}const Xx={[0]:"error",[1]:"warn",[2]:"log",[3]:"info",[4]:"info",[5]:"debug",[6]:"info"},Gc={[2]:"color: green;",[1]:"color: orange;",[0]:"color: red;",[3]:"color: #4bcffa",[4]:"color: #ccae62",[5]:"color: #7158e2",[6]:"color: #3d3d3d"},Yx=(e,t,r)=>[`%c${e.namespace}`,Gc[t],...r],un=class{constructor(t="root",r=null,o){ye(this,"namespace");ye(this,"config",null);ye(this,"parent");ye(this,"plugins");ye(this,"chain",new Ja);var n;o&&(this.config=o),this.namespace=t,this.plugins=(n=r==null?void 0:r.plugins)!=null?n:[],this.setParrent(r)}get format(){var t;return(t=this.getConfig().format)!=null?t:Yx}setConfig(t){return this.config=t,this}getConfig(){var t,r,o;return(o=(r=this.config)!=null?r:(t=this.parent)==null?void 0:t.getConfig())!=null?o:this.config={}}assignConfig(t,r=!0){return this.setConfig(r?Object.assign({},this.config,t):Object.assign(this.config,t)),this}for(t){var n,i;if(t===void 0)return un.lastLogger=(n=un.lastLogger)!=null?n:Qa;let r=(i=un.lastLogger)!=null?i:Qa,o=new un(t,r);return un.lastLogger=o,o}setParrent(t){this.parent=t;const r=new Ja;this.chain=r;let o=this;const n=new Set;for(;o;){const i=o.namespace;if(n.has(i)){r.add(o.namespace),this.parent=null;return}n.add(i),r.add(o.namespace),o=o.parent}}addPlugin(t){var r;return t.config&&this.assignConfig(t.config),(r=t.initialization)==null||r.call(t,this),this.plugins.push(t),this}_log(t,r){this.plugins.every(o=>{var n,i;return(i=(n=o.filter)==null?void 0:n.call(o,this))!=null?i:!0})&&console[Xx[t]](...this.format(this,t,r))}log(t,...r){return this._log(t,r),this}silly(...t){return this._log(6,t),this}debug(...t){return this._log(5,t),this}verbose(...t){return this._log(4,t),this}http(...t){return this._log(3,t),this}info(...t){return this._log(2,t),this}warn(...t){return this._log(1,t),this}error(...t){return this._log(0,t),this}};let ja=un;ye(ja,"lastLogger",null);function Zx(){return new ja().addPlugin(Gx()).addPlugin(qx())}const Qa=Zx();try{window&&(window.logger=Qa),global&&(global.logger=Qa)}catch{}logger.assignConfig({origin:!0});function Yu(e,t){const r=Object.create(null),o=e.split(",");for(let n=0;n<o.length;n++)r[o[n]]=!0;return t?n=>!!r[n.toLowerCase()]:n=>!!r[n]}const Jx="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",Qx=Yu(Jx);function im(e){return!!e||e===""}function $i(e){if(we(e)){const t={};for(let r=0;r<e.length;r++){const o=e[r],n=ft(o)?rC(o):$i(o);if(n)for(const i in n)t[i]=n[i]}return t}else{if(ft(e))return e;if(st(e))return e}}const eC=/;(?![^(]*\))/g,tC=/:(.+)/;function rC(e){const t={};return e.split(eC).forEach(r=>{if(r){const o=r.split(tC);o.length>1&&(t[o[0].trim()]=o[1].trim())}}),t}function Sl(e){let t="";if(ft(e))t=e;else if(we(e))for(let r=0;r<e.length;r++){const o=Sl(e[r]);o&&(t+=o+" ")}else if(st(e))for(const r in e)e[r]&&(t+=r+" ");return t.trim()}function DF(e){if(!e)return null;let{class:t,style:r}=e;return t&&!ft(t)&&(e.class=Sl(t)),r&&(e.style=$i(r)),e}const zF=e=>ft(e)?e:e==null?"":we(e)||st(e)&&(e.toString===cm||!ke(e.toString))?JSON.stringify(e,sm,2):String(e),sm=(e,t)=>t&&t.__v_isRef?sm(e,t.value):Zn(t)?{[`Map(${t.size})`]:[...t.entries()].reduce((r,[o,n])=>(r[`${o} =>`]=n,r),{})}:am(t)?{[`Set(${t.size})`]:[...t.values()]}:st(t)&&!we(t)&&!um(t)?String(t):t,Je={},Yn=[],Sr=()=>{},oC=()=>!1,nC=/^on[^a-z]/,El=e=>nC.test(e),Zu=e=>e.startsWith("onUpdate:"),St=Object.assign,Ju=(e,t)=>{const r=e.indexOf(t);r>-1&&e.splice(r,1)},iC=Object.prototype.hasOwnProperty,Me=(e,t)=>iC.call(e,t),we=Array.isArray,Zn=e=>_l(e)==="[object Map]",am=e=>_l(e)==="[object Set]",ke=e=>typeof e=="function",ft=e=>typeof e=="string",Qu=e=>typeof e=="symbol",st=e=>e!==null&&typeof e=="object",lm=e=>st(e)&&ke(e.then)&&ke(e.catch),cm=Object.prototype.toString,_l=e=>cm.call(e),sC=e=>_l(e).slice(8,-1),um=e=>_l(e)==="[object Object]",ed=e=>ft(e)&&e!=="NaN"&&e[0]!=="-"&&""+parseInt(e,10)===e,Wa=Yu(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),Tl=e=>{const t=Object.create(null);return r=>t[r]||(t[r]=e(r))},aC=/-(\w)/g,zr=Tl(e=>e.replace(aC,(t,r)=>r?r.toUpperCase():"")),lC=/\B([A-Z])/g,Ln=Tl(e=>e.replace(lC,"-$1").toLowerCase()),$l=Tl(e=>e.charAt(0).toUpperCase()+e.slice(1)),fc=Tl(e=>e?`on${$l(e)}`:""),xs=(e,t)=>!Object.is(e,t),os=(e,t)=>{for(let r=0;r<e.length;r++)e[r](t)},el=(e,t,r)=>{Object.defineProperty(e,t,{configurable:!0,enumerable:!1,value:r})},dm=e=>{const t=parseFloat(e);return isNaN(t)?e:t};let zf;const cC=()=>zf||(zf=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});let Qt;class fm{constructor(t=!1){this.detached=t,this.active=!0,this.effects=[],this.cleanups=[],this.parent=Qt,!t&&Qt&&(this.index=(Qt.scopes||(Qt.scopes=[])).push(this)-1)}run(t){if(this.active){const r=Qt;try{return Qt=this,t()}finally{Qt=r}}}on(){Qt=this}off(){Qt=this.parent}stop(t){if(this.active){let r,o;for(r=0,o=this.effects.length;r<o;r++)this.effects[r].stop();for(r=0,o=this.cleanups.length;r<o;r++)this.cleanups[r]();if(this.scopes)for(r=0,o=this.scopes.length;r<o;r++)this.scopes[r].stop(!0);if(!this.detached&&this.parent&&!t){const n=this.parent.scopes.pop();n&&n!==this&&(this.parent.scopes[this.index]=n,n.index=this.index)}this.parent=void 0,this.active=!1}}}function uC(e){return new fm(e)}function dC(e,t=Qt){t&&t.active&&t.effects.push(e)}function fC(){return Qt}function hC(e){Qt&&Qt.cleanups.push(e)}const td=e=>{const t=new Set(e);return t.w=0,t.n=0,t},hm=e=>(e.w&Fo)>0,pm=e=>(e.n&Fo)>0,pC=({deps:e})=>{if(e.length)for(let t=0;t<e.length;t++)e[t].w|=Fo},gC=e=>{const{deps:t}=e;if(t.length){let r=0;for(let o=0;o<t.length;o++){const n=t[o];hm(n)&&!pm(n)?n.delete(e):t[r++]=n,n.w&=~Fo,n.n&=~Fo}t.length=r}},Xc=new WeakMap;let Ji=0,Fo=1;const Yc=30;let xr;const bn=Symbol(""),Zc=Symbol("");class rd{constructor(t,r=null,o){this.fn=t,this.scheduler=r,this.active=!0,this.deps=[],this.parent=void 0,dC(this,o)}run(){if(!this.active)return this.fn();let t=xr,r=Bo;for(;t;){if(t===this)return;t=t.parent}try{return this.parent=xr,xr=this,Bo=!0,Fo=1<<++Ji,Ji<=Yc?pC(this):Ff(this),this.fn()}finally{Ji<=Yc&&gC(this),Fo=1<<--Ji,xr=this.parent,Bo=r,this.parent=void 0,this.deferStop&&this.stop()}}stop(){xr===this?this.deferStop=!0:this.active&&(Ff(this),this.onStop&&this.onStop(),this.active=!1)}}function Ff(e){const{deps:t}=e;if(t.length){for(let r=0;r<t.length;r++)t[r].delete(e);t.length=0}}let Bo=!0;const gm=[];function Pi(){gm.push(Bo),Bo=!1}function Li(){const e=gm.pop();Bo=e===void 0?!0:e}function ir(e,t,r){if(Bo&&xr){let o=Xc.get(e);o||Xc.set(e,o=new Map);let n=o.get(r);n||o.set(r,n=td()),mm(n)}}function mm(e,t){let r=!1;Ji<=Yc?pm(e)||(e.n|=Fo,r=!hm(e)):r=!e.has(xr),r&&(e.add(xr),xr.deps.push(e))}function ro(e,t,r,o,n,i){const s=Xc.get(e);if(!s)return;let a=[];if(t==="clear")a=[...s.values()];else if(r==="length"&&we(e))s.forEach((l,c)=>{(c==="length"||c>=o)&&a.push(l)});else switch(r!==void 0&&a.push(s.get(r)),t){case"add":we(e)?ed(r)&&a.push(s.get("length")):(a.push(s.get(bn)),Zn(e)&&a.push(s.get(Zc)));break;case"delete":we(e)||(a.push(s.get(bn)),Zn(e)&&a.push(s.get(Zc)));break;case"set":Zn(e)&&a.push(s.get(bn));break}if(a.length===1)a[0]&&Jc(a[0]);else{const l=[];for(const c of a)c&&l.push(...c);Jc(td(l))}}function Jc(e,t){const r=we(e)?e:[...e];for(const o of r)o.computed&&Nf(o);for(const o of r)o.computed||Nf(o)}function Nf(e,t){(e!==xr||e.allowRecurse)&&(e.scheduler?e.scheduler():e.run())}const mC=Yu("__proto__,__v_isRef,__isVue"),bm=new Set(Object.getOwnPropertyNames(Symbol).filter(e=>e!=="arguments"&&e!=="caller").map(e=>Symbol[e]).filter(Qu)),bC=od(),vC=od(!1,!0),yC=od(!0),jf=xC();function xC(){const e={};return["includes","indexOf","lastIndexOf"].forEach(t=>{e[t]=function(...r){const o=We(this);for(let i=0,s=this.length;i<s;i++)ir(o,"get",i+"");const n=o[t](...r);return n===-1||n===!1?o[t](...r.map(We)):n}}),["push","pop","shift","unshift","splice"].forEach(t=>{e[t]=function(...r){Pi();const o=We(this)[t].apply(this,r);return Li(),o}}),e}function od(e=!1,t=!1){return function(o,n,i){if(n==="__v_isReactive")return!e;if(n==="__v_isReadonly")return e;if(n==="__v_isShallow")return t;if(n==="__v_raw"&&i===(e?t?MC:wm:t?Cm:xm).get(o))return o;const s=we(o);if(!e&&s&&Me(jf,n))return Reflect.get(jf,n,i);const a=Reflect.get(o,n,i);return(Qu(n)?bm.has(n):mC(n))||(e||ir(o,"get",n),t)?a:yt(a)?s&&ed(n)?a:a.value:st(a)?e?oo(a):Gt(a):a}}const CC=vm(),wC=vm(!0);function vm(e=!1){return function(r,o,n,i){let s=r[o];if(li(s)&&yt(s)&&!yt(n))return!1;if(!e&&(!tl(n)&&!li(n)&&(s=We(s),n=We(n)),!we(r)&&yt(s)&&!yt(n)))return s.value=n,!0;const a=we(r)&&ed(o)?Number(o)<r.length:Me(r,o),l=Reflect.set(r,o,n,i);return r===We(i)&&(a?xs(n,s)&&ro(r,"set",o,n):ro(r,"add",o,n)),l}}function SC(e,t){const r=Me(e,t);e[t];const o=Reflect.deleteProperty(e,t);return o&&r&&ro(e,"delete",t,void 0),o}function EC(e,t){const r=Reflect.has(e,t);return(!Qu(t)||!bm.has(t))&&ir(e,"has",t),r}function _C(e){return ir(e,"iterate",we(e)?"length":bn),Reflect.ownKeys(e)}const ym={get:bC,set:CC,deleteProperty:SC,has:EC,ownKeys:_C},TC={get:yC,set(e,t){return!0},deleteProperty(e,t){return!0}},$C=St({},ym,{get:vC,set:wC}),nd=e=>e,Pl=e=>Reflect.getPrototypeOf(e);function ua(e,t,r=!1,o=!1){e=e.__v_raw;const n=We(e),i=We(t);r||(t!==i&&ir(n,"get",t),ir(n,"get",i));const{has:s}=Pl(n),a=o?nd:r?ad:Cs;if(s.call(n,t))return a(e.get(t));if(s.call(n,i))return a(e.get(i));e!==n&&e.get(t)}function da(e,t=!1){const r=this.__v_raw,o=We(r),n=We(e);return t||(e!==n&&ir(o,"has",e),ir(o,"has",n)),e===n?r.has(e):r.has(e)||r.has(n)}function fa(e,t=!1){return e=e.__v_raw,!t&&ir(We(e),"iterate",bn),Reflect.get(e,"size",e)}function Wf(e){e=We(e);const t=We(this);return Pl(t).has.call(t,e)||(t.add(e),ro(t,"add",e,e)),this}function Uf(e,t){t=We(t);const r=We(this),{has:o,get:n}=Pl(r);let i=o.call(r,e);i||(e=We(e),i=o.call(r,e));const s=n.call(r,e);return r.set(e,t),i?xs(t,s)&&ro(r,"set",e,t):ro(r,"add",e,t),this}function Vf(e){const t=We(this),{has:r,get:o}=Pl(t);let n=r.call(t,e);n||(e=We(e),n=r.call(t,e)),o&&o.call(t,e);const i=t.delete(e);return n&&ro(t,"delete",e,void 0),i}function Kf(){const e=We(this),t=e.size!==0,r=e.clear();return t&&ro(e,"clear",void 0,void 0),r}function ha(e,t){return function(o,n){const i=this,s=i.__v_raw,a=We(s),l=t?nd:e?ad:Cs;return!e&&ir(a,"iterate",bn),s.forEach((c,u)=>o.call(n,l(c),l(u),i))}}function pa(e,t,r){return function(...o){const n=this.__v_raw,i=We(n),s=Zn(i),a=e==="entries"||e===Symbol.iterator&&s,l=e==="keys"&&s,c=n[e](...o),u=r?nd:t?ad:Cs;return!t&&ir(i,"iterate",l?Zc:bn),{next(){const{value:d,done:f}=c.next();return f?{value:d,done:f}:{value:a?[u(d[0]),u(d[1])]:u(d),done:f}},[Symbol.iterator](){return this}}}}function po(e){return function(...t){return e==="delete"?!1:this}}function PC(){const e={get(i){return ua(this,i)},get size(){return fa(this)},has:da,add:Wf,set:Uf,delete:Vf,clear:Kf,forEach:ha(!1,!1)},t={get(i){return ua(this,i,!1,!0)},get size(){return fa(this)},has:da,add:Wf,set:Uf,delete:Vf,clear:Kf,forEach:ha(!1,!0)},r={get(i){return ua(this,i,!0)},get size(){return fa(this,!0)},has(i){return da.call(this,i,!0)},add:po("add"),set:po("set"),delete:po("delete"),clear:po("clear"),forEach:ha(!0,!1)},o={get(i){return ua(this,i,!0,!0)},get size(){return fa(this,!0)},has(i){return da.call(this,i,!0)},add:po("add"),set:po("set"),delete:po("delete"),clear:po("clear"),forEach:ha(!0,!0)};return["keys","values","entries",Symbol.iterator].forEach(i=>{e[i]=pa(i,!1,!1),r[i]=pa(i,!0,!1),t[i]=pa(i,!1,!0),o[i]=pa(i,!0,!0)}),[e,r,t,o]}const[LC,kC,IC,RC]=PC();function id(e,t){const r=t?e?RC:IC:e?kC:LC;return(o,n,i)=>n==="__v_isReactive"?!e:n==="__v_isReadonly"?e:n==="__v_raw"?o:Reflect.get(Me(r,n)&&n in o?r:o,n,i)}const OC={get:id(!1,!1)},AC={get:id(!1,!0)},BC={get:id(!0,!1)},xm=new WeakMap,Cm=new WeakMap,wm=new WeakMap,MC=new WeakMap;function HC(e){switch(e){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function DC(e){return e.__v_skip||!Object.isExtensible(e)?0:HC(sC(e))}function Gt(e){return li(e)?e:sd(e,!1,ym,OC,xm)}function zC(e){return sd(e,!1,$C,AC,Cm)}function oo(e){return sd(e,!0,TC,BC,wm)}function sd(e,t,r,o,n){if(!st(e)||e.__v_raw&&!(t&&e.__v_isReactive))return e;const i=n.get(e);if(i)return i;const s=DC(e);if(s===0)return e;const a=new Proxy(e,s===2?o:r);return n.set(e,a),a}function Jn(e){return li(e)?Jn(e.__v_raw):!!(e&&e.__v_isReactive)}function li(e){return!!(e&&e.__v_isReadonly)}function tl(e){return!!(e&&e.__v_isShallow)}function Sm(e){return Jn(e)||li(e)}function We(e){const t=e&&e.__v_raw;return t?We(t):e}function rl(e){return el(e,"__v_skip",!0),e}const Cs=e=>st(e)?Gt(e):e,ad=e=>st(e)?oo(e):e;function Em(e){Bo&&xr&&(e=We(e),mm(e.dep||(e.dep=td())))}function _m(e,t){e=We(e),e.dep&&Jc(e.dep)}function yt(e){return!!(e&&e.__v_isRef===!0)}function K(e){return Tm(e,!1)}function ld(e){return Tm(e,!0)}function Tm(e,t){return yt(e)?e:new FC(e,t)}class FC{constructor(t,r){this.__v_isShallow=r,this.dep=void 0,this.__v_isRef=!0,this._rawValue=r?t:We(t),this._value=r?t:Cs(t)}get value(){return Em(this),this._value}set value(t){const r=this.__v_isShallow||tl(t)||li(t);t=r?t:We(t),xs(t,this._rawValue)&&(this._rawValue=t,this._value=r?t:Cs(t),_m(this))}}function hr(e){return yt(e)?e.value:e}const NC={get:(e,t,r)=>hr(Reflect.get(e,t,r)),set:(e,t,r,o)=>{const n=e[t];return yt(n)&&!yt(r)?(n.value=r,!0):Reflect.set(e,t,r,o)}};function $m(e){return Jn(e)?e:new Proxy(e,NC)}function FF(e){const t=we(e)?new Array(e.length):{};for(const r in e)t[r]=Be(e,r);return t}class jC{constructor(t,r,o){this._object=t,this._key=r,this._defaultValue=o,this.__v_isRef=!0}get value(){const t=this._object[this._key];return t===void 0?this._defaultValue:t}set value(t){this._object[this._key]=t}}function Be(e,t,r){const o=e[t];return yt(o)?o:new jC(e,t,r)}var Pm;class WC{constructor(t,r,o,n){this._setter=r,this.dep=void 0,this.__v_isRef=!0,this[Pm]=!1,this._dirty=!0,this.effect=new rd(t,()=>{this._dirty||(this._dirty=!0,_m(this))}),this.effect.computed=this,this.effect.active=this._cacheable=!n,this.__v_isReadonly=o}get value(){const t=We(this);return Em(t),(t._dirty||!t._cacheable)&&(t._dirty=!1,t._value=t.effect.run()),t._value}set value(t){this._setter(t)}}Pm="__v_isReadonly";function UC(e,t,r=!1){let o,n;const i=ke(e);return i?(o=e,n=Sr):(o=e.get,n=e.set),new WC(o,n,i||!n,r)}function Mo(e,t,r,o){let n;try{n=o?e(...o):e()}catch(i){Ll(i,t,r)}return n}function pr(e,t,r,o){if(ke(e)){const i=Mo(e,t,r,o);return i&&lm(i)&&i.catch(s=>{Ll(s,t,r)}),i}const n=[];for(let i=0;i<e.length;i++)n.push(pr(e[i],t,r,o));return n}function Ll(e,t,r,o=!0){const n=t?t.vnode:null;if(t){let i=t.parent;const s=t.proxy,a=r;for(;i;){const c=i.ec;if(c){for(let u=0;u<c.length;u++)if(c[u](e,s,a)===!1)return}i=i.parent}const l=t.appContext.config.errorHandler;if(l){Mo(l,null,10,[e,s,a]);return}}VC(e,r,n,o)}function VC(e,t,r,o=!0){console.error(e)}let ws=!1,Qc=!1;const At=[];let Br=0;const Qn=[];let Jr=null,sn=0;const Lm=Promise.resolve();let cd=null;function zt(e){const t=cd||Lm;return e?t.then(this?e.bind(this):e):t}function KC(e){let t=Br+1,r=At.length;for(;t<r;){const o=t+r>>>1;Ss(At[o])<e?t=o+1:r=o}return t}function ud(e){(!At.length||!At.includes(e,ws&&e.allowRecurse?Br+1:Br))&&(e.id==null?At.push(e):At.splice(KC(e.id),0,e),km())}function km(){!ws&&!Qc&&(Qc=!0,cd=Lm.then(Rm))}function qC(e){const t=At.indexOf(e);t>Br&&At.splice(t,1)}function GC(e){we(e)?Qn.push(...e):(!Jr||!Jr.includes(e,e.allowRecurse?sn+1:sn))&&Qn.push(e),km()}function qf(e,t=ws?Br+1:0){for(;t<At.length;t++){const r=At[t];r&&r.pre&&(At.splice(t,1),t--,r())}}function Im(e){if(Qn.length){const t=[...new Set(Qn)];if(Qn.length=0,Jr){Jr.push(...t);return}for(Jr=t,Jr.sort((r,o)=>Ss(r)-Ss(o)),sn=0;sn<Jr.length;sn++)Jr[sn]();Jr=null,sn=0}}const Ss=e=>e.id==null?1/0:e.id,XC=(e,t)=>{const r=Ss(e)-Ss(t);if(r===0){if(e.pre&&!t.pre)return-1;if(t.pre&&!e.pre)return 1}return r};function Rm(e){Qc=!1,ws=!0,At.sort(XC);const t=Sr;try{for(Br=0;Br<At.length;Br++){const r=At[Br];r&&r.active!==!1&&Mo(r,null,14)}}finally{Br=0,At.length=0,Im(),ws=!1,cd=null,(At.length||Qn.length)&&Rm()}}function YC(e,t,...r){if(e.isUnmounted)return;const o=e.vnode.props||Je;let n=r;const i=t.startsWith("update:"),s=i&&t.slice(7);if(s&&s in o){const u=`${s==="modelValue"?"model":s}Modifiers`,{number:d,trim:f}=o[u]||Je;f&&(n=r.map(h=>h.trim())),d&&(n=r.map(dm))}let a,l=o[a=fc(t)]||o[a=fc(zr(t))];!l&&i&&(l=o[a=fc(Ln(t))]),l&&pr(l,e,6,n);const c=o[a+"Once"];if(c){if(!e.emitted)e.emitted={};else if(e.emitted[a])return;e.emitted[a]=!0,pr(c,e,6,n)}}function Om(e,t,r=!1){const o=t.emitsCache,n=o.get(e);if(n!==void 0)return n;const i=e.emits;let s={},a=!1;if(!ke(e)){const l=c=>{const u=Om(c,t,!0);u&&(a=!0,St(s,u))};!r&&t.mixins.length&&t.mixins.forEach(l),e.extends&&l(e.extends),e.mixins&&e.mixins.forEach(l)}return!i&&!a?(st(e)&&o.set(e,null),null):(we(i)?i.forEach(l=>s[l]=null):St(s,i),st(e)&&o.set(e,s),s)}function kl(e,t){return!e||!El(t)?!1:(t=t.slice(2).replace(/Once$/,""),Me(e,t[0].toLowerCase()+t.slice(1))||Me(e,Ln(t))||Me(e,t))}let Bt=null,Il=null;function ol(e){const t=Bt;return Bt=e,Il=e&&e.type.__scopeId||null,t}function NF(e){Il=e}function jF(){Il=null}function Or(e,t=Bt,r){if(!t||e._n)return e;const o=(...n)=>{o._d&&ih(-1);const i=ol(t);let s;try{s=e(...n)}finally{ol(i),o._d&&ih(1)}return s};return o._n=!0,o._c=!0,o._d=!0,o}function hc(e){const{type:t,vnode:r,proxy:o,withProxy:n,props:i,propsOptions:[s],slots:a,attrs:l,emit:c,render:u,renderCache:d,data:f,setupState:h,ctx:p,inheritAttrs:m}=e;let y,g;const w=ol(e);try{if(r.shapeFlag&4){const x=n||o;y=Ar(u.call(x,x,d,i,h,f,p)),g=l}else{const x=t;y=Ar(x.length>1?x(i,{attrs:l,slots:a,emit:c}):x(i,null)),g=t.props?l:ZC(l)}}catch(x){is.length=0,Ll(x,e,1),y=ct(Ft)}let T=y;if(g&&m!==!1){const x=Object.keys(g),{shapeFlag:C}=T;x.length&&C&7&&(s&&x.some(Zu)&&(g=JC(g,s)),T=_r(T,g))}return r.dirs&&(T=_r(T),T.dirs=T.dirs?T.dirs.concat(r.dirs):r.dirs),r.transition&&(T.transition=r.transition),y=T,ol(w),y}const ZC=e=>{let t;for(const r in e)(r==="class"||r==="style"||El(r))&&((t||(t={}))[r]=e[r]);return t},JC=(e,t)=>{const r={};for(const o in e)(!Zu(o)||!(o.slice(9)in t))&&(r[o]=e[o]);return r};function QC(e,t,r){const{props:o,children:n,component:i}=e,{props:s,children:a,patchFlag:l}=t,c=i.emitsOptions;if(t.dirs||t.transition)return!0;if(r&&l>=0){if(l&1024)return!0;if(l&16)return o?Gf(o,s,c):!!s;if(l&8){const u=t.dynamicProps;for(let d=0;d<u.length;d++){const f=u[d];if(s[f]!==o[f]&&!kl(c,f))return!0}}}else return(n||a)&&(!a||!a.$stable)?!0:o===s?!1:o?s?Gf(o,s,c):!0:!!s;return!1}function Gf(e,t,r){const o=Object.keys(t);if(o.length!==Object.keys(e).length)return!0;for(let n=0;n<o.length;n++){const i=o[n];if(t[i]!==e[i]&&!kl(r,i))return!0}return!1}function ew({vnode:e,parent:t},r){for(;t&&t.subTree===e;)(e=t.vnode).el=r,t=t.parent}const Am=e=>e.__isSuspense;function tw(e,t){t&&t.pendingBranch?we(e)?t.effects.push(...e):t.effects.push(e):GC(e)}function qe(e,t){if(wt){let r=wt.provides;const o=wt.parent&&wt.parent.provides;o===r&&(r=wt.provides=Object.create(o)),r[e]=t}}function Se(e,t,r=!1){const o=wt||Bt;if(o){const n=o.parent==null?o.vnode.appContext&&o.vnode.appContext.provides:o.parent.provides;if(n&&e in n)return n[e];if(arguments.length>1)return r&&ke(t)?t.call(o.proxy):t}}function Er(e,t){return dd(e,null,t)}const Xf={};function et(e,t,r){return dd(e,t,r)}function dd(e,t,{immediate:r,deep:o,flush:n,onTrack:i,onTrigger:s}=Je){const a=wt;let l,c=!1,u=!1;if(yt(e)?(l=()=>e.value,c=tl(e)):Jn(e)?(l=()=>e,o=!0):we(e)?(u=!0,c=e.some(g=>Jn(g)||tl(g)),l=()=>e.map(g=>{if(yt(g))return g.value;if(Jn(g))return dn(g);if(ke(g))return Mo(g,a,2)})):ke(e)?t?l=()=>Mo(e,a,2):l=()=>{if(!(a&&a.isUnmounted))return d&&d(),pr(e,a,3,[f])}:l=Sr,t&&o){const g=l;l=()=>dn(g())}let d,f=g=>{d=y.onStop=()=>{Mo(g,a,4)}};if(Ts)return f=Sr,t?r&&pr(t,a,3,[l(),u?[]:void 0,f]):l(),Sr;let h=u?[]:Xf;const p=()=>{if(!!y.active)if(t){const g=y.run();(o||c||(u?g.some((w,T)=>xs(w,h[T])):xs(g,h)))&&(d&&d(),pr(t,a,3,[g,h===Xf?void 0:h,f]),h=g)}else y.run()};p.allowRecurse=!!t;let m;n==="sync"?m=p:n==="post"?m=()=>Et(p,a&&a.suspense):(p.pre=!0,a&&(p.id=a.uid),m=()=>ud(p));const y=new rd(l,m);return t?r?p():h=y.run():n==="post"?Et(y.run.bind(y),a&&a.suspense):y.run(),()=>{y.stop(),a&&a.scope&&Ju(a.scope.effects,y)}}function rw(e,t,r){const o=this.proxy,n=ft(e)?e.includes(".")?Bm(o,e):()=>o[e]:e.bind(o,o);let i;ke(t)?i=t:(i=t.handler,r=t);const s=wt;fi(this);const a=dd(n,i.bind(o),r);return s?fi(s):xn(),a}function Bm(e,t){const r=t.split(".");return()=>{let o=e;for(let n=0;n<r.length&&o;n++)o=o[r[n]];return o}}function dn(e,t){if(!st(e)||e.__v_skip||(t=t||new Set,t.has(e)))return e;if(t.add(e),yt(e))dn(e.value,t);else if(we(e))for(let r=0;r<e.length;r++)dn(e[r],t);else if(am(e)||Zn(e))e.forEach(r=>{dn(r,t)});else if(um(e))for(const r in e)dn(e[r],t);return e}function Mm(){const e={isMounted:!1,isLeaving:!1,isUnmounting:!1,leavingVNodes:new Map};return Lt(()=>{e.isMounted=!0}),xt(()=>{e.isUnmounting=!0}),e}const ar=[Function,Array],ow={name:"BaseTransition",props:{mode:String,appear:Boolean,persisted:Boolean,onBeforeEnter:ar,onEnter:ar,onAfterEnter:ar,onEnterCancelled:ar,onBeforeLeave:ar,onLeave:ar,onAfterLeave:ar,onLeaveCancelled:ar,onBeforeAppear:ar,onAppear:ar,onAfterAppear:ar,onAppearCancelled:ar},setup(e,{slots:t}){const r=gr(),o=Mm();let n;return()=>{const i=t.default&&fd(t.default(),!0);if(!i||!i.length)return;let s=i[0];if(i.length>1){for(const m of i)if(m.type!==Ft){s=m;break}}const a=We(e),{mode:l}=a;if(o.isLeaving)return pc(s);const c=Yf(s);if(!c)return pc(s);const u=Es(c,a,o,r);ci(c,u);const d=r.subTree,f=d&&Yf(d);let h=!1;const{getTransitionKey:p}=c.type;if(p){const m=p();n===void 0?n=m:m!==n&&(n=m,h=!0)}if(f&&f.type!==Ft&&(!an(c,f)||h)){const m=Es(f,a,o,r);if(ci(f,m),l==="out-in")return o.isLeaving=!0,m.afterLeave=()=>{o.isLeaving=!1,r.update()},pc(s);l==="in-out"&&c.type!==Ft&&(m.delayLeave=(y,g,w)=>{const T=Dm(o,f);T[String(f.key)]=f,y._leaveCb=()=>{g(),y._leaveCb=void 0,delete u.delayedLeave},u.delayedLeave=w})}return s}}},Hm=ow;function Dm(e,t){const{leavingVNodes:r}=e;let o=r.get(t.type);return o||(o=Object.create(null),r.set(t.type,o)),o}function Es(e,t,r,o){const{appear:n,mode:i,persisted:s=!1,onBeforeEnter:a,onEnter:l,onAfterEnter:c,onEnterCancelled:u,onBeforeLeave:d,onLeave:f,onAfterLeave:h,onLeaveCancelled:p,onBeforeAppear:m,onAppear:y,onAfterAppear:g,onAppearCancelled:w}=t,T=String(e.key),x=Dm(r,e),C=(L,k)=>{L&&pr(L,o,9,k)},$=(L,k)=>{const I=k[1];C(L,k),we(L)?L.every(A=>A.length<=1)&&I():L.length<=1&&I()},S={mode:i,persisted:s,beforeEnter(L){let k=a;if(!r.isMounted)if(n)k=m||a;else return;L._leaveCb&&L._leaveCb(!0);const I=x[T];I&&an(e,I)&&I.el._leaveCb&&I.el._leaveCb(),C(k,[L])},enter(L){let k=l,I=c,A=u;if(!r.isMounted)if(n)k=y||l,I=g||c,A=w||u;else return;let R=!1;const F=L._enterCb=H=>{R||(R=!0,H?C(A,[L]):C(I,[L]),S.delayedLeave&&S.delayedLeave(),L._enterCb=void 0)};k?$(k,[L,F]):F()},leave(L,k){const I=String(e.key);if(L._enterCb&&L._enterCb(!0),r.isUnmounting)return k();C(d,[L]);let A=!1;const R=L._leaveCb=F=>{A||(A=!0,k(),F?C(p,[L]):C(h,[L]),L._leaveCb=void 0,x[I]===e&&delete x[I])};x[I]=e,f?$(f,[L,R]):R()},clone(L){return Es(L,t,r,o)}};return S}function pc(e){if(Rl(e))return e=_r(e),e.children=null,e}function Yf(e){return Rl(e)?e.children?e.children[0]:void 0:e}function ci(e,t){e.shapeFlag&6&&e.component?ci(e.component.subTree,t):e.shapeFlag&128?(e.ssContent.transition=t.clone(e.ssContent),e.ssFallback.transition=t.clone(e.ssFallback)):e.transition=t}function fd(e,t=!1,r){let o=[],n=0;for(let i=0;i<e.length;i++){let s=e[i];const a=r==null?s.key:String(r)+String(s.key!=null?s.key:i);s.type===Qe?(s.patchFlag&128&&n++,o=o.concat(fd(s.children,t,a))):(t||s.type!==Ft)&&o.push(a!=null?_r(s,{key:a}):s)}if(n>1)for(let i=0;i<o.length;i++)o[i].patchFlag=-2;return o}function be(e){return ke(e)?{setup:e,name:e.name}:e}const ei=e=>!!e.type.__asyncLoader,Rl=e=>e.type.__isKeepAlive,nw={name:"KeepAlive",__isKeepAlive:!0,props:{include:[String,RegExp,Array],exclude:[String,RegExp,Array],max:[String,Number]},setup(e,{slots:t}){const r=gr(),o=r.ctx;if(!o.renderer)return()=>{const w=t.default&&t.default();return w&&w.length===1?w[0]:w};const n=new Map,i=new Set;let s=null;const a=r.suspense,{renderer:{p:l,m:c,um:u,o:{createElement:d}}}=o,f=d("div");o.activate=(w,T,x,C,$)=>{const S=w.component;c(w,T,x,0,a),l(S.vnode,w,T,x,S,a,C,w.slotScopeIds,$),Et(()=>{S.isDeactivated=!1,S.a&&os(S.a);const L=w.props&&w.props.onVnodeMounted;L&&ur(L,S.parent,w)},a)},o.deactivate=w=>{const T=w.component;c(w,f,null,1,a),Et(()=>{T.da&&os(T.da);const x=w.props&&w.props.onVnodeUnmounted;x&&ur(x,T.parent,w),T.isDeactivated=!0},a)};function h(w){gc(w),u(w,r,a,!0)}function p(w){n.forEach((T,x)=>{const C=su(T.type);C&&(!w||!w(C))&&m(x)})}function m(w){const T=n.get(w);!s||T.type!==s.type?h(T):s&&gc(s),n.delete(w),i.delete(w)}et(()=>[e.include,e.exclude],([w,T])=>{w&&p(x=>Qi(w,x)),T&&p(x=>!Qi(T,x))},{flush:"post",deep:!0});let y=null;const g=()=>{y!=null&&n.set(y,mc(r.subTree))};return Lt(g),hd(g),xt(()=>{n.forEach(w=>{const{subTree:T,suspense:x}=r,C=mc(T);if(w.type===C.type){gc(C);const $=C.component.da;$&&Et($,x);return}h(w)})}),()=>{if(y=null,!t.default)return null;const w=t.default(),T=w[0];if(w.length>1)return s=null,w;if(!ui(T)||!(T.shapeFlag&4)&&!(T.shapeFlag&128))return s=null,T;let x=mc(T);const C=x.type,$=su(ei(x)?x.type.__asyncResolved||{}:C),{include:S,exclude:L,max:k}=e;if(S&&(!$||!Qi(S,$))||L&&$&&Qi(L,$))return s=x,T;const I=x.key==null?C:x.key,A=n.get(I);return x.el&&(x=_r(x),T.shapeFlag&128&&(T.ssContent=x)),y=I,A?(x.el=A.el,x.component=A.component,x.transition&&ci(x,x.transition),x.shapeFlag|=512,i.delete(I),i.add(I)):(i.add(I),k&&i.size>parseInt(k,10)&&m(i.values().next().value)),x.shapeFlag|=256,s=x,Am(T.type)?T:x}}},iw=nw;function Qi(e,t){return we(e)?e.some(r=>Qi(r,t)):ft(e)?e.split(",").includes(t):e.test?e.test(t):!1}function zm(e,t){Nm(e,"a",t)}function Fm(e,t){Nm(e,"da",t)}function Nm(e,t,r=wt){const o=e.__wdc||(e.__wdc=()=>{let n=r;for(;n;){if(n.isDeactivated)return;n=n.parent}return e()});if(Ol(t,o,r),r){let n=r.parent;for(;n&&n.parent;)Rl(n.parent.vnode)&&sw(o,t,r,n),n=n.parent}}function sw(e,t,r,o){const n=Ol(t,e,o,!0);pd(()=>{Ju(o[t],n)},r)}function gc(e){let t=e.shapeFlag;t&256&&(t-=256),t&512&&(t-=512),e.shapeFlag=t}function mc(e){return e.shapeFlag&128?e.ssContent:e}function Ol(e,t,r=wt,o=!1){if(r){const n=r[e]||(r[e]=[]),i=t.__weh||(t.__weh=(...s)=>{if(r.isUnmounted)return;Pi(),fi(r);const a=pr(t,r,e,s);return xn(),Li(),a});return o?n.unshift(i):n.push(i),i}}const ao=e=>(t,r=wt)=>(!Ts||e==="sp")&&Ol(e,(...o)=>t(...o),r),Vo=ao("bm"),Lt=ao("m"),aw=ao("bu"),hd=ao("u"),xt=ao("bum"),pd=ao("um"),lw=ao("sp"),cw=ao("rtg"),uw=ao("rtc");function dw(e,t=wt){Ol("ec",e,t)}function Fr(e,t){const r=Bt;if(r===null)return e;const o=Hl(r)||r.proxy,n=e.dirs||(e.dirs=[]);for(let i=0;i<t.length;i++){let[s,a,l,c=Je]=t[i];ke(s)&&(s={mounted:s,updated:s}),s.deep&&dn(a),n.push({dir:s,instance:o,value:a,oldValue:void 0,arg:l,modifiers:c})}return e}function Qo(e,t,r,o){const n=e.dirs,i=t&&t.dirs;for(let s=0;s<n.length;s++){const a=n[s];i&&(a.oldValue=i[s].value);let l=a.dir[o];l&&(Pi(),pr(l,r,8,[e.el,a,e,t]),Li())}}const gd="components";function fw(e,t){return Wm(gd,e,!0,t)||e}const jm=Symbol();function hw(e){return ft(e)?Wm(gd,e,!1)||e:e||jm}function Wm(e,t,r=!0,o=!1){const n=Bt||wt;if(n){const i=n.type;if(e===gd){const a=su(i,!1);if(a&&(a===t||a===zr(t)||a===$l(zr(t))))return i}const s=Zf(n[e]||i[e],t)||Zf(n.appContext[e],t);return!s&&o?i:s}}function Zf(e,t){return e&&(e[t]||e[zr(t)]||e[$l(zr(t))])}function WF(e,t,r,o){let n;const i=r&&r[o];if(we(e)||ft(e)){n=new Array(e.length);for(let s=0,a=e.length;s<a;s++)n[s]=t(e[s],s,void 0,i&&i[s])}else if(typeof e=="number"){n=new Array(e);for(let s=0;s<e;s++)n[s]=t(s+1,s,void 0,i&&i[s])}else if(st(e))if(e[Symbol.iterator])n=Array.from(e,(s,a)=>t(s,a,void 0,i&&i[a]));else{const s=Object.keys(e);n=new Array(s.length);for(let a=0,l=s.length;a<l;a++){const c=s[a];n[a]=t(e[c],c,a,i&&i[a])}}else n=[];return r&&(r[o]=n),n}function UF(e,t){for(let r=0;r<t.length;r++){const o=t[r];if(we(o))for(let n=0;n<o.length;n++)e[o[n].name]=o[n].fn;else o&&(e[o.name]=o.key?(...n)=>{const i=o.fn(...n);return i&&(i.key=o.key),i}:o.fn)}return e}function md(e,t,r={},o,n){if(Bt.isCE||Bt.parent&&ei(Bt.parent)&&Bt.parent.isCE)return ct("slot",t==="default"?null:{name:t},o&&o());let i=e[t];i&&i._c&&(i._d=!1),vn();const s=i&&Um(i(r)),a=yn(Qe,{key:r.key||s&&s.key||`_${t}`},s||(o?o():[]),s&&e._===1?64:-2);return!n&&a.scopeId&&(a.slotScopeIds=[a.scopeId+"-s"]),i&&i._c&&(i._d=!0),a}function Um(e){return e.some(t=>ui(t)?!(t.type===Ft||t.type===Qe&&!Um(t.children)):!0)?e:null}const eu=e=>e?e0(e)?Hl(e)||e.proxy:eu(e.parent):null,nl=St(Object.create(null),{$:e=>e,$el:e=>e.vnode.el,$data:e=>e.data,$props:e=>e.props,$attrs:e=>e.attrs,$slots:e=>e.slots,$refs:e=>e.refs,$parent:e=>eu(e.parent),$root:e=>eu(e.root),$emit:e=>e.emit,$options:e=>bd(e),$forceUpdate:e=>e.f||(e.f=()=>ud(e.update)),$nextTick:e=>e.n||(e.n=zt.bind(e.proxy)),$watch:e=>rw.bind(e)}),pw={get({_:e},t){const{ctx:r,setupState:o,data:n,props:i,accessCache:s,type:a,appContext:l}=e;let c;if(t[0]!=="$"){const h=s[t];if(h!==void 0)switch(h){case 1:return o[t];case 2:return n[t];case 4:return r[t];case 3:return i[t]}else{if(o!==Je&&Me(o,t))return s[t]=1,o[t];if(n!==Je&&Me(n,t))return s[t]=2,n[t];if((c=e.propsOptions[0])&&Me(c,t))return s[t]=3,i[t];if(r!==Je&&Me(r,t))return s[t]=4,r[t];tu&&(s[t]=0)}}const u=nl[t];let d,f;if(u)return t==="$attrs"&&ir(e,"get",t),u(e);if((d=a.__cssModules)&&(d=d[t]))return d;if(r!==Je&&Me(r,t))return s[t]=4,r[t];if(f=l.config.globalProperties,Me(f,t))return f[t]},set({_:e},t,r){const{data:o,setupState:n,ctx:i}=e;return n!==Je&&Me(n,t)?(n[t]=r,!0):o!==Je&&Me(o,t)?(o[t]=r,!0):Me(e.props,t)||t[0]==="$"&&t.slice(1)in e?!1:(i[t]=r,!0)},has({_:{data:e,setupState:t,accessCache:r,ctx:o,appContext:n,propsOptions:i}},s){let a;return!!r[s]||e!==Je&&Me(e,s)||t!==Je&&Me(t,s)||(a=i[0])&&Me(a,s)||Me(o,s)||Me(nl,s)||Me(n.config.globalProperties,s)},defineProperty(e,t,r){return r.get!=null?e._.accessCache[t]=0:Me(r,"value")&&this.set(e,t,r.value,null),Reflect.defineProperty(e,t,r)}};let tu=!0;function gw(e){const t=bd(e),r=e.proxy,o=e.ctx;tu=!1,t.beforeCreate&&Jf(t.beforeCreate,e,"bc");const{data:n,computed:i,methods:s,watch:a,provide:l,inject:c,created:u,beforeMount:d,mounted:f,beforeUpdate:h,updated:p,activated:m,deactivated:y,beforeDestroy:g,beforeUnmount:w,destroyed:T,unmounted:x,render:C,renderTracked:$,renderTriggered:S,errorCaptured:L,serverPrefetch:k,expose:I,inheritAttrs:A,components:R,directives:F,filters:H}=t;if(c&&mw(c,o,null,e.appContext.config.unwrapInjectedRef),s)for(const Z in s){const se=s[Z];ke(se)&&(o[Z]=se.bind(r))}if(n){const Z=n.call(r,r);st(Z)&&(e.data=Gt(Z))}if(tu=!0,i)for(const Z in i){const se=i[Z],ve=ke(se)?se.bind(r,r):ke(se.get)?se.get.bind(r,r):Sr,Le=!ke(se)&&ke(se.set)?se.set.bind(r):Sr,_e=q({get:ve,set:Le});Object.defineProperty(o,Z,{enumerable:!0,configurable:!0,get:()=>_e.value,set:Ae=>_e.value=Ae})}if(a)for(const Z in a)Vm(a[Z],o,r,Z);if(l){const Z=ke(l)?l.call(r):l;Reflect.ownKeys(Z).forEach(se=>{qe(se,Z[se])})}u&&Jf(u,e,"c");function Y(Z,se){we(se)?se.forEach(ve=>Z(ve.bind(r))):se&&Z(se.bind(r))}if(Y(Vo,d),Y(Lt,f),Y(aw,h),Y(hd,p),Y(zm,m),Y(Fm,y),Y(dw,L),Y(uw,$),Y(cw,S),Y(xt,w),Y(pd,x),Y(lw,k),we(I))if(I.length){const Z=e.exposed||(e.exposed={});I.forEach(se=>{Object.defineProperty(Z,se,{get:()=>r[se],set:ve=>r[se]=ve})})}else e.exposed||(e.exposed={});C&&e.render===Sr&&(e.render=C),A!=null&&(e.inheritAttrs=A),R&&(e.components=R),F&&(e.directives=F)}function mw(e,t,r=Sr,o=!1){we(e)&&(e=ru(e));for(const n in e){const i=e[n];let s;st(i)?"default"in i?s=Se(i.from||n,i.default,!0):s=Se(i.from||n):s=Se(i),yt(s)&&o?Object.defineProperty(t,n,{enumerable:!0,configurable:!0,get:()=>s.value,set:a=>s.value=a}):t[n]=s}}function Jf(e,t,r){pr(we(e)?e.map(o=>o.bind(t.proxy)):e.bind(t.proxy),t,r)}function Vm(e,t,r,o){const n=o.includes(".")?Bm(r,o):()=>r[o];if(ft(e)){const i=t[e];ke(i)&&et(n,i)}else if(ke(e))et(n,e.bind(r));else if(st(e))if(we(e))e.forEach(i=>Vm(i,t,r,o));else{const i=ke(e.handler)?e.handler.bind(r):t[e.handler];ke(i)&&et(n,i,e)}}function bd(e){const t=e.type,{mixins:r,extends:o}=t,{mixins:n,optionsCache:i,config:{optionMergeStrategies:s}}=e.appContext,a=i.get(t);let l;return a?l=a:!n.length&&!r&&!o?l=t:(l={},n.length&&n.forEach(c=>il(l,c,s,!0)),il(l,t,s)),st(t)&&i.set(t,l),l}function il(e,t,r,o=!1){const{mixins:n,extends:i}=t;i&&il(e,i,r,!0),n&&n.forEach(s=>il(e,s,r,!0));for(const s in t)if(!(o&&s==="expose")){const a=bw[s]||r&&r[s];e[s]=a?a(e[s],t[s]):t[s]}return e}const bw={data:Qf,props:on,emits:on,methods:on,computed:on,beforeCreate:Ht,created:Ht,beforeMount:Ht,mounted:Ht,beforeUpdate:Ht,updated:Ht,beforeDestroy:Ht,beforeUnmount:Ht,destroyed:Ht,unmounted:Ht,activated:Ht,deactivated:Ht,errorCaptured:Ht,serverPrefetch:Ht,components:on,directives:on,watch:yw,provide:Qf,inject:vw};function Qf(e,t){return t?e?function(){return St(ke(e)?e.call(this,this):e,ke(t)?t.call(this,this):t)}:t:e}function vw(e,t){return on(ru(e),ru(t))}function ru(e){if(we(e)){const t={};for(let r=0;r<e.length;r++)t[e[r]]=e[r];return t}return e}function Ht(e,t){return e?[...new Set([].concat(e,t))]:t}function on(e,t){return e?St(St(Object.create(null),e),t):t}function yw(e,t){if(!e)return t;if(!t)return e;const r=St(Object.create(null),e);for(const o in t)r[o]=Ht(e[o],t[o]);return r}function xw(e,t,r,o=!1){const n={},i={};el(i,Bl,1),e.propsDefaults=Object.create(null),Km(e,t,n,i);for(const s in e.propsOptions[0])s in n||(n[s]=void 0);r?e.props=o?n:zC(n):e.type.props?e.props=n:e.props=i,e.attrs=i}function Cw(e,t,r,o){const{props:n,attrs:i,vnode:{patchFlag:s}}=e,a=We(n),[l]=e.propsOptions;let c=!1;if((o||s>0)&&!(s&16)){if(s&8){const u=e.vnode.dynamicProps;for(let d=0;d<u.length;d++){let f=u[d];if(kl(e.emitsOptions,f))continue;const h=t[f];if(l)if(Me(i,f))h!==i[f]&&(i[f]=h,c=!0);else{const p=zr(f);n[p]=ou(l,a,p,h,e,!1)}else h!==i[f]&&(i[f]=h,c=!0)}}}else{Km(e,t,n,i)&&(c=!0);let u;for(const d in a)(!t||!Me(t,d)&&((u=Ln(d))===d||!Me(t,u)))&&(l?r&&(r[d]!==void 0||r[u]!==void 0)&&(n[d]=ou(l,a,d,void 0,e,!0)):delete n[d]);if(i!==a)for(const d in i)(!t||!Me(t,d)&&!0)&&(delete i[d],c=!0)}c&&ro(e,"set","$attrs")}function Km(e,t,r,o){const[n,i]=e.propsOptions;let s=!1,a;if(t)for(let l in t){if(Wa(l))continue;const c=t[l];let u;n&&Me(n,u=zr(l))?!i||!i.includes(u)?r[u]=c:(a||(a={}))[u]=c:kl(e.emitsOptions,l)||(!(l in o)||c!==o[l])&&(o[l]=c,s=!0)}if(i){const l=We(r),c=a||Je;for(let u=0;u<i.length;u++){const d=i[u];r[d]=ou(n,l,d,c[d],e,!Me(c,d))}}return s}function ou(e,t,r,o,n,i){const s=e[r];if(s!=null){const a=Me(s,"default");if(a&&o===void 0){const l=s.default;if(s.type!==Function&&ke(l)){const{propsDefaults:c}=n;r in c?o=c[r]:(fi(n),o=c[r]=l.call(null,t),xn())}else o=l}s[0]&&(i&&!a?o=!1:s[1]&&(o===""||o===Ln(r))&&(o=!0))}return o}function qm(e,t,r=!1){const o=t.propsCache,n=o.get(e);if(n)return n;const i=e.props,s={},a=[];let l=!1;if(!ke(e)){const u=d=>{l=!0;const[f,h]=qm(d,t,!0);St(s,f),h&&a.push(...h)};!r&&t.mixins.length&&t.mixins.forEach(u),e.extends&&u(e.extends),e.mixins&&e.mixins.forEach(u)}if(!i&&!l)return st(e)&&o.set(e,Yn),Yn;if(we(i))for(let u=0;u<i.length;u++){const d=zr(i[u]);eh(d)&&(s[d]=Je)}else if(i)for(const u in i){const d=zr(u);if(eh(d)){const f=i[u],h=s[d]=we(f)||ke(f)?{type:f}:f;if(h){const p=oh(Boolean,h.type),m=oh(String,h.type);h[0]=p>-1,h[1]=m<0||p<m,(p>-1||Me(h,"default"))&&a.push(d)}}}const c=[s,a];return st(e)&&o.set(e,c),c}function eh(e){return e[0]!=="$"}function th(e){const t=e&&e.toString().match(/^\s*function (\w+)/);return t?t[1]:e===null?"null":""}function rh(e,t){return th(e)===th(t)}function oh(e,t){return we(t)?t.findIndex(r=>rh(r,e)):ke(t)&&rh(t,e)?0:-1}const Gm=e=>e[0]==="_"||e==="$stable",vd=e=>we(e)?e.map(Ar):[Ar(e)],ww=(e,t,r)=>{if(t._n)return t;const o=Or((...n)=>vd(t(...n)),r);return o._c=!1,o},Xm=(e,t,r)=>{const o=e._ctx;for(const n in e){if(Gm(n))continue;const i=e[n];if(ke(i))t[n]=ww(n,i,o);else if(i!=null){const s=vd(i);t[n]=()=>s}}},Ym=(e,t)=>{const r=vd(t);e.slots.default=()=>r},Sw=(e,t)=>{if(e.vnode.shapeFlag&32){const r=t._;r?(e.slots=We(t),el(t,"_",r)):Xm(t,e.slots={})}else e.slots={},t&&Ym(e,t);el(e.slots,Bl,1)},Ew=(e,t,r)=>{const{vnode:o,slots:n}=e;let i=!0,s=Je;if(o.shapeFlag&32){const a=t._;a?r&&a===1?i=!1:(St(n,t),!r&&a===1&&delete n._):(i=!t.$stable,Xm(t,n)),s=t}else t&&(Ym(e,t),s={default:1});if(i)for(const a in n)!Gm(a)&&!(a in s)&&delete n[a]};function Zm(){return{app:null,config:{isNativeTag:oC,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let _w=0;function Tw(e,t){return function(o,n=null){ke(o)||(o=Object.assign({},o)),n!=null&&!st(n)&&(n=null);const i=Zm(),s=new Set;let a=!1;const l=i.app={_uid:_w++,_component:o,_props:n,_container:null,_context:i,_instance:null,version:Uw,get config(){return i.config},set config(c){},use(c,...u){return s.has(c)||(c&&ke(c.install)?(s.add(c),c.install(l,...u)):ke(c)&&(s.add(c),c(l,...u))),l},mixin(c){return i.mixins.includes(c)||i.mixins.push(c),l},component(c,u){return u?(i.components[c]=u,l):i.components[c]},directive(c,u){return u?(i.directives[c]=u,l):i.directives[c]},mount(c,u,d){if(!a){const f=ct(o,n);return f.appContext=i,u&&t?t(f,c):e(f,c,d),a=!0,l._container=c,c.__vue_app__=l,Hl(f.component)||f.component.proxy}},unmount(){a&&(e(null,l._container),delete l._container.__vue_app__)},provide(c,u){return i.provides[c]=u,l}};return l}}function nu(e,t,r,o,n=!1){if(we(e)){e.forEach((f,h)=>nu(f,t&&(we(t)?t[h]:t),r,o,n));return}if(ei(o)&&!n)return;const i=o.shapeFlag&4?Hl(o.component)||o.component.proxy:o.el,s=n?null:i,{i:a,r:l}=e,c=t&&t.r,u=a.refs===Je?a.refs={}:a.refs,d=a.setupState;if(c!=null&&c!==l&&(ft(c)?(u[c]=null,Me(d,c)&&(d[c]=null)):yt(c)&&(c.value=null)),ke(l))Mo(l,a,12,[s,u]);else{const f=ft(l),h=yt(l);if(f||h){const p=()=>{if(e.f){const m=f?Me(d,l)?d[l]:u[l]:l.value;n?we(m)&&Ju(m,i):we(m)?m.includes(i)||m.push(i):f?(u[l]=[i],Me(d,l)&&(d[l]=u[l])):(l.value=[i],e.k&&(u[e.k]=l.value))}else f?(u[l]=s,Me(d,l)&&(d[l]=s)):h&&(l.value=s,e.k&&(u[e.k]=s))};s?(p.id=-1,Et(p,r)):p()}}}const Et=tw;function $w(e){return Pw(e)}function Pw(e,t){const r=cC();r.__VUE__=!0;const{insert:o,remove:n,patchProp:i,createElement:s,createText:a,createComment:l,setText:c,setElementText:u,parentNode:d,nextSibling:f,setScopeId:h=Sr,insertStaticContent:p}=e,m=(_,b,v,P=null,O=null,M=null,V=!1,X=null,U=!!b.dynamicChildren)=>{if(_===b)return;_&&!an(_,b)&&(P=te(_),Ae(_,O,M,!0),_=null),b.patchFlag===-2&&(U=!1,b.dynamicChildren=null);const{type:z,ref:B,shapeFlag:D}=b;switch(z){case Al:y(_,b,v,P);break;case Ft:g(_,b,v,P);break;case Ua:_==null&&w(b,v,P,V);break;case Qe:R(_,b,v,P,O,M,V,X,U);break;default:D&1?C(_,b,v,P,O,M,V,X,U):D&6?F(_,b,v,P,O,M,V,X,U):(D&64||D&128)&&z.process(_,b,v,P,O,M,V,X,U,ae)}B!=null&&O&&nu(B,_&&_.ref,M,b||_,!b)},y=(_,b,v,P)=>{if(_==null)o(b.el=a(b.children),v,P);else{const O=b.el=_.el;b.children!==_.children&&c(O,b.children)}},g=(_,b,v,P)=>{_==null?o(b.el=l(b.children||""),v,P):b.el=_.el},w=(_,b,v,P)=>{[_.el,_.anchor]=p(_.children,b,v,P,_.el,_.anchor)},T=({el:_,anchor:b},v,P)=>{let O;for(;_&&_!==b;)O=f(_),o(_,v,P),_=O;o(b,v,P)},x=({el:_,anchor:b})=>{let v;for(;_&&_!==b;)v=f(_),n(_),_=v;n(b)},C=(_,b,v,P,O,M,V,X,U)=>{V=V||b.type==="svg",_==null?$(b,v,P,O,M,V,X,U):k(_,b,O,M,V,X,U)},$=(_,b,v,P,O,M,V,X)=>{let U,z;const{type:B,props:D,shapeFlag:ce,transition:pe,dirs:$e}=_;if(U=_.el=s(_.type,M,D&&D.is,D),ce&8?u(U,_.children):ce&16&&L(_.children,U,null,P,O,M&&B!=="foreignObject",V,X),$e&&Qo(_,null,P,"created"),D){for(const Oe in D)Oe!=="value"&&!Wa(Oe)&&i(U,Oe,null,D[Oe],M,_.children,P,O,Q);"value"in D&&i(U,"value",null,D.value),(z=D.onVnodeBeforeMount)&&ur(z,P,_)}S(U,_,_.scopeId,V,P),$e&&Qo(_,null,P,"beforeMount");const He=(!O||O&&!O.pendingBranch)&&pe&&!pe.persisted;He&&pe.beforeEnter(U),o(U,b,v),((z=D&&D.onVnodeMounted)||He||$e)&&Et(()=>{z&&ur(z,P,_),He&&pe.enter(U),$e&&Qo(_,null,P,"mounted")},O)},S=(_,b,v,P,O)=>{if(v&&h(_,v),P)for(let M=0;M<P.length;M++)h(_,P[M]);if(O){let M=O.subTree;if(b===M){const V=O.vnode;S(_,V,V.scopeId,V.slotScopeIds,O.parent)}}},L=(_,b,v,P,O,M,V,X,U=0)=>{for(let z=U;z<_.length;z++){const B=_[z]=X?Lo(_[z]):Ar(_[z]);m(null,B,b,v,P,O,M,V,X)}},k=(_,b,v,P,O,M,V)=>{const X=b.el=_.el;let{patchFlag:U,dynamicChildren:z,dirs:B}=b;U|=_.patchFlag&16;const D=_.props||Je,ce=b.props||Je;let pe;v&&en(v,!1),(pe=ce.onVnodeBeforeUpdate)&&ur(pe,v,b,_),B&&Qo(b,_,v,"beforeUpdate"),v&&en(v,!0);const $e=O&&b.type!=="foreignObject";if(z?I(_.dynamicChildren,z,X,v,P,$e,M):V||se(_,b,X,null,v,P,$e,M,!1),U>0){if(U&16)A(X,b,D,ce,v,P,O);else if(U&2&&D.class!==ce.class&&i(X,"class",null,ce.class,O),U&4&&i(X,"style",D.style,ce.style,O),U&8){const He=b.dynamicProps;for(let Oe=0;Oe<He.length;Oe++){const at=He[Oe],It=D[at],Pr=ce[at];(Pr!==It||at==="value")&&i(X,at,It,Pr,O,_.children,v,P,Q)}}U&1&&_.children!==b.children&&u(X,b.children)}else!V&&z==null&&A(X,b,D,ce,v,P,O);((pe=ce.onVnodeUpdated)||B)&&Et(()=>{pe&&ur(pe,v,b,_),B&&Qo(b,_,v,"updated")},P)},I=(_,b,v,P,O,M,V)=>{for(let X=0;X<b.length;X++){const U=_[X],z=b[X],B=U.el&&(U.type===Qe||!an(U,z)||U.shapeFlag&70)?d(U.el):v;m(U,z,B,null,P,O,M,V,!0)}},A=(_,b,v,P,O,M,V)=>{if(v!==P){if(v!==Je)for(const X in v)!Wa(X)&&!(X in P)&&i(_,X,v[X],null,V,b.children,O,M,Q);for(const X in P){if(Wa(X))continue;const U=P[X],z=v[X];U!==z&&X!=="value"&&i(_,X,z,U,V,b.children,O,M,Q)}"value"in P&&i(_,"value",v.value,P.value)}},R=(_,b,v,P,O,M,V,X,U)=>{const z=b.el=_?_.el:a(""),B=b.anchor=_?_.anchor:a("");let{patchFlag:D,dynamicChildren:ce,slotScopeIds:pe}=b;pe&&(X=X?X.concat(pe):pe),_==null?(o(z,v,P),o(B,v,P),L(b.children,v,B,O,M,V,X,U)):D>0&&D&64&&ce&&_.dynamicChildren?(I(_.dynamicChildren,ce,v,O,M,V,X),(b.key!=null||O&&b===O.subTree)&&yd(_,b,!0)):se(_,b,v,B,O,M,V,X,U)},F=(_,b,v,P,O,M,V,X,U)=>{b.slotScopeIds=X,_==null?b.shapeFlag&512?O.ctx.activate(b,v,P,V,U):H(b,v,P,O,M,V,U):J(_,b,U)},H=(_,b,v,P,O,M,V)=>{const X=_.component=Dw(_,P,O);if(Rl(_)&&(X.ctx.renderer=ae),zw(X),X.asyncDep){if(O&&O.registerDep(X,Y),!_.el){const U=X.subTree=ct(Ft);g(null,U,b,v)}return}Y(X,_,b,v,O,M,V)},J=(_,b,v)=>{const P=b.component=_.component;if(QC(_,b,v))if(P.asyncDep&&!P.asyncResolved){Z(P,b,v);return}else P.next=b,qC(P.update),P.update();else b.el=_.el,P.vnode=b},Y=(_,b,v,P,O,M,V)=>{const X=()=>{if(_.isMounted){let{next:B,bu:D,u:ce,parent:pe,vnode:$e}=_,He=B,Oe;en(_,!1),B?(B.el=$e.el,Z(_,B,V)):B=$e,D&&os(D),(Oe=B.props&&B.props.onVnodeBeforeUpdate)&&ur(Oe,pe,B,$e),en(_,!0);const at=hc(_),It=_.subTree;_.subTree=at,m(It,at,d(It.el),te(It),_,O,M),B.el=at.el,He===null&&ew(_,at.el),ce&&Et(ce,O),(Oe=B.props&&B.props.onVnodeUpdated)&&Et(()=>ur(Oe,pe,B,$e),O)}else{let B;const{el:D,props:ce}=b,{bm:pe,m:$e,parent:He}=_,Oe=ei(b);if(en(_,!1),pe&&os(pe),!Oe&&(B=ce&&ce.onVnodeBeforeMount)&&ur(B,He,b),en(_,!0),D&&me){const at=()=>{_.subTree=hc(_),me(D,_.subTree,_,O,null)};Oe?b.type.__asyncLoader().then(()=>!_.isUnmounted&&at()):at()}else{const at=_.subTree=hc(_);m(null,at,v,P,_,O,M),b.el=at.el}if($e&&Et($e,O),!Oe&&(B=ce&&ce.onVnodeMounted)){const at=b;Et(()=>ur(B,He,at),O)}(b.shapeFlag&256||He&&ei(He.vnode)&&He.vnode.shapeFlag&256)&&_.a&&Et(_.a,O),_.isMounted=!0,b=v=P=null}},U=_.effect=new rd(X,()=>ud(z),_.scope),z=_.update=()=>U.run();z.id=_.uid,en(_,!0),z()},Z=(_,b,v)=>{b.component=_;const P=_.vnode.props;_.vnode=b,_.next=null,Cw(_,b.props,P,v),Ew(_,b.children,v),Pi(),qf(),Li()},se=(_,b,v,P,O,M,V,X,U=!1)=>{const z=_&&_.children,B=_?_.shapeFlag:0,D=b.children,{patchFlag:ce,shapeFlag:pe}=b;if(ce>0){if(ce&128){Le(z,D,v,P,O,M,V,X,U);return}else if(ce&256){ve(z,D,v,P,O,M,V,X,U);return}}pe&8?(B&16&&Q(z,O,M),D!==z&&u(v,D)):B&16?pe&16?Le(z,D,v,P,O,M,V,X,U):Q(z,O,M,!0):(B&8&&u(v,""),pe&16&&L(D,v,P,O,M,V,X,U))},ve=(_,b,v,P,O,M,V,X,U)=>{_=_||Yn,b=b||Yn;const z=_.length,B=b.length,D=Math.min(z,B);let ce;for(ce=0;ce<D;ce++){const pe=b[ce]=U?Lo(b[ce]):Ar(b[ce]);m(_[ce],pe,v,null,O,M,V,X,U)}z>B?Q(_,O,M,!0,!1,D):L(b,v,P,O,M,V,X,U,D)},Le=(_,b,v,P,O,M,V,X,U)=>{let z=0;const B=b.length;let D=_.length-1,ce=B-1;for(;z<=D&&z<=ce;){const pe=_[z],$e=b[z]=U?Lo(b[z]):Ar(b[z]);if(an(pe,$e))m(pe,$e,v,null,O,M,V,X,U);else break;z++}for(;z<=D&&z<=ce;){const pe=_[D],$e=b[ce]=U?Lo(b[ce]):Ar(b[ce]);if(an(pe,$e))m(pe,$e,v,null,O,M,V,X,U);else break;D--,ce--}if(z>D){if(z<=ce){const pe=ce+1,$e=pe<B?b[pe].el:P;for(;z<=ce;)m(null,b[z]=U?Lo(b[z]):Ar(b[z]),v,$e,O,M,V,X,U),z++}}else if(z>ce)for(;z<=D;)Ae(_[z],O,M,!0),z++;else{const pe=z,$e=z,He=new Map;for(z=$e;z<=ce;z++){const Wt=b[z]=U?Lo(b[z]):Ar(b[z]);Wt.key!=null&&He.set(Wt.key,z)}let Oe,at=0;const It=ce-$e+1;let Pr=!1,ca=0;const ho=new Array(It);for(z=0;z<It;z++)ho[z]=0;for(z=pe;z<=D;z++){const Wt=_[z];if(at>=It){Ae(Wt,O,M,!0);continue}let ee;if(Wt.key!=null)ee=He.get(Wt.key);else for(Oe=$e;Oe<=ce;Oe++)if(ho[Oe-$e]===0&&an(Wt,b[Oe])){ee=Oe;break}ee===void 0?Ae(Wt,O,M,!0):(ho[ee-$e]=z+1,ee>=ca?ca=ee:Pr=!0,m(Wt,b[ee],v,null,O,M,V,X,U),at++)}const Vr=Pr?Lw(ho):Yn;for(Oe=Vr.length-1,z=It-1;z>=0;z--){const Wt=$e+z,ee=b[Wt],ge=Wt+1<B?b[Wt+1].el:P;ho[z]===0?m(null,ee,v,ge,O,M,V,X,U):Pr&&(Oe<0||z!==Vr[Oe]?_e(ee,v,ge,2):Oe--)}}},_e=(_,b,v,P,O=null)=>{const{el:M,type:V,transition:X,children:U,shapeFlag:z}=_;if(z&6){_e(_.component.subTree,b,v,P);return}if(z&128){_.suspense.move(b,v,P);return}if(z&64){V.move(_,b,v,ae);return}if(V===Qe){o(M,b,v);for(let D=0;D<U.length;D++)_e(U[D],b,v,P);o(_.anchor,b,v);return}if(V===Ua){T(_,b,v);return}if(P!==2&&z&1&&X)if(P===0)X.beforeEnter(M),o(M,b,v),Et(()=>X.enter(M),O);else{const{leave:D,delayLeave:ce,afterLeave:pe}=X,$e=()=>o(M,b,v),He=()=>{D(M,()=>{$e(),pe&&pe()})};ce?ce(M,$e,He):He()}else o(M,b,v)},Ae=(_,b,v,P=!1,O=!1)=>{const{type:M,props:V,ref:X,children:U,dynamicChildren:z,shapeFlag:B,patchFlag:D,dirs:ce}=_;if(X!=null&&nu(X,null,v,_,!0),B&256){b.ctx.deactivate(_);return}const pe=B&1&&ce,$e=!ei(_);let He;if($e&&(He=V&&V.onVnodeBeforeUnmount)&&ur(He,b,_),B&6)j(_.component,v,P);else{if(B&128){_.suspense.unmount(v,P);return}pe&&Qo(_,null,b,"beforeUnmount"),B&64?_.type.remove(_,b,v,O,ae,P):z&&(M!==Qe||D>0&&D&64)?Q(z,b,v,!1,!0):(M===Qe&&D&384||!O&&B&16)&&Q(U,b,v),P&&ut(_)}($e&&(He=V&&V.onVnodeUnmounted)||pe)&&Et(()=>{He&&ur(He,b,_),pe&&Qo(_,null,b,"unmounted")},v)},ut=_=>{const{type:b,el:v,anchor:P,transition:O}=_;if(b===Qe){Ue(v,P);return}if(b===Ua){x(_);return}const M=()=>{n(v),O&&!O.persisted&&O.afterLeave&&O.afterLeave()};if(_.shapeFlag&1&&O&&!O.persisted){const{leave:V,delayLeave:X}=O,U=()=>V(v,M);X?X(_.el,M,U):U()}else M()},Ue=(_,b)=>{let v;for(;_!==b;)v=f(_),n(_),_=v;n(b)},j=(_,b,v)=>{const{bum:P,scope:O,update:M,subTree:V,um:X}=_;P&&os(P),O.stop(),M&&(M.active=!1,Ae(V,_,b,v)),X&&Et(X,b),Et(()=>{_.isUnmounted=!0},b),b&&b.pendingBranch&&!b.isUnmounted&&_.asyncDep&&!_.asyncResolved&&_.suspenseId===b.pendingId&&(b.deps--,b.deps===0&&b.resolve())},Q=(_,b,v,P=!1,O=!1,M=0)=>{for(let V=M;V<_.length;V++)Ae(_[V],b,v,P,O)},te=_=>_.shapeFlag&6?te(_.component.subTree):_.shapeFlag&128?_.suspense.next():f(_.anchor||_.el),de=(_,b,v)=>{_==null?b._vnode&&Ae(b._vnode,null,null,!0):m(b._vnode||null,_,b,null,null,null,v),qf(),Im(),b._vnode=_},ae={p:m,um:Ae,m:_e,r:ut,mt:H,mc:L,pc:se,pbc:I,n:te,o:e};let Te,me;return t&&([Te,me]=t(ae)),{render:de,hydrate:Te,createApp:Tw(de,Te)}}function en({effect:e,update:t},r){e.allowRecurse=t.allowRecurse=r}function yd(e,t,r=!1){const o=e.children,n=t.children;if(we(o)&&we(n))for(let i=0;i<o.length;i++){const s=o[i];let a=n[i];a.shapeFlag&1&&!a.dynamicChildren&&((a.patchFlag<=0||a.patchFlag===32)&&(a=n[i]=Lo(n[i]),a.el=s.el),r||yd(s,a))}}function Lw(e){const t=e.slice(),r=[0];let o,n,i,s,a;const l=e.length;for(o=0;o<l;o++){const c=e[o];if(c!==0){if(n=r[r.length-1],e[n]<c){t[o]=n,r.push(o);continue}for(i=0,s=r.length-1;i<s;)a=i+s>>1,e[r[a]]<c?i=a+1:s=a;c<e[r[i]]&&(i>0&&(t[o]=r[i-1]),r[i]=o)}}for(i=r.length,s=r[i-1];i-- >0;)r[i]=s,s=t[s];return r}const kw=e=>e.__isTeleport,ns=e=>e&&(e.disabled||e.disabled===""),nh=e=>typeof SVGElement<"u"&&e instanceof SVGElement,iu=(e,t)=>{const r=e&&e.to;return ft(r)?t?t(r):null:r},Iw={__isTeleport:!0,process(e,t,r,o,n,i,s,a,l,c){const{mc:u,pc:d,pbc:f,o:{insert:h,querySelector:p,createText:m,createComment:y}}=c,g=ns(t.props);let{shapeFlag:w,children:T,dynamicChildren:x}=t;if(e==null){const C=t.el=m(""),$=t.anchor=m("");h(C,r,o),h($,r,o);const S=t.target=iu(t.props,p),L=t.targetAnchor=m("");S&&(h(L,S),s=s||nh(S));const k=(I,A)=>{w&16&&u(T,I,A,n,i,s,a,l)};g?k(r,$):S&&k(S,L)}else{t.el=e.el;const C=t.anchor=e.anchor,$=t.target=e.target,S=t.targetAnchor=e.targetAnchor,L=ns(e.props),k=L?r:$,I=L?C:S;if(s=s||nh($),x?(f(e.dynamicChildren,x,k,n,i,s,a),yd(e,t,!0)):l||d(e,t,k,I,n,i,s,a,!1),g)L||ga(t,r,C,c,1);else if((t.props&&t.props.to)!==(e.props&&e.props.to)){const A=t.target=iu(t.props,p);A&&ga(t,A,null,c,0)}else L&&ga(t,$,S,c,1)}},remove(e,t,r,o,{um:n,o:{remove:i}},s){const{shapeFlag:a,children:l,anchor:c,targetAnchor:u,target:d,props:f}=e;if(d&&i(u),(s||!ns(f))&&(i(c),a&16))for(let h=0;h<l.length;h++){const p=l[h];n(p,t,r,!0,!!p.dynamicChildren)}},move:ga,hydrate:Rw};function ga(e,t,r,{o:{insert:o},m:n},i=2){i===0&&o(e.targetAnchor,t,r);const{el:s,anchor:a,shapeFlag:l,children:c,props:u}=e,d=i===2;if(d&&o(s,t,r),(!d||ns(u))&&l&16)for(let f=0;f<c.length;f++)n(c[f],t,r,2);d&&o(a,t,r)}function Rw(e,t,r,o,n,i,{o:{nextSibling:s,parentNode:a,querySelector:l}},c){const u=t.target=iu(t.props,l);if(u){const d=u._lpa||u.firstChild;if(t.shapeFlag&16)if(ns(t.props))t.anchor=c(s(e),t,a(e),r,o,n,i),t.targetAnchor=d;else{t.anchor=s(e);let f=d;for(;f;)if(f=s(f),f&&f.nodeType===8&&f.data==="teleport anchor"){t.targetAnchor=f,u._lpa=t.targetAnchor&&s(t.targetAnchor);break}c(d,t,u,r,o,n,i)}}return t.anchor&&s(t.anchor)}const Ws=Iw,Qe=Symbol(void 0),Al=Symbol(void 0),Ft=Symbol(void 0),Ua=Symbol(void 0),is=[];let Cr=null;function vn(e=!1){is.push(Cr=e?null:[])}function Ow(){is.pop(),Cr=is[is.length-1]||null}let _s=1;function ih(e){_s+=e}function Jm(e){return e.dynamicChildren=_s>0?Cr||Yn:null,Ow(),_s>0&&Cr&&Cr.push(e),e}function VF(e,t,r,o,n,i){return Jm(ss(e,t,r,o,n,i,!0))}function yn(e,t,r,o,n){return Jm(ct(e,t,r,o,n,!0))}function ui(e){return e?e.__v_isVNode===!0:!1}function an(e,t){return e.type===t.type&&e.key===t.key}const Bl="__vInternal",Qm=({key:e})=>e!=null?e:null,Va=({ref:e,ref_key:t,ref_for:r})=>e!=null?ft(e)||yt(e)||ke(e)?{i:Bt,r:e,k:t,f:!!r}:e:null;function ss(e,t=null,r=null,o=0,n=null,i=e===Qe?0:1,s=!1,a=!1){const l={__v_isVNode:!0,__v_skip:!0,type:e,props:t,key:t&&Qm(t),ref:t&&Va(t),scopeId:Il,slotScopeIds:null,children:r,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetAnchor:null,staticCount:0,shapeFlag:i,patchFlag:o,dynamicProps:n,dynamicChildren:null,appContext:null};return a?(xd(l,r),i&128&&e.normalize(l)):r&&(l.shapeFlag|=ft(r)?8:16),_s>0&&!s&&Cr&&(l.patchFlag>0||i&6)&&l.patchFlag!==32&&Cr.push(l),l}const ct=Aw;function Aw(e,t=null,r=null,o=0,n=null,i=!1){if((!e||e===jm)&&(e=Ft),ui(e)){const a=_r(e,t,!0);return r&&xd(a,r),_s>0&&!i&&Cr&&(a.shapeFlag&6?Cr[Cr.indexOf(e)]=a:Cr.push(a)),a.patchFlag|=-2,a}if(Ww(e)&&(e=e.__vccOpts),t){t=Bw(t);let{class:a,style:l}=t;a&&!ft(a)&&(t.class=Sl(a)),st(l)&&(Sm(l)&&!we(l)&&(l=St({},l)),t.style=$i(l))}const s=ft(e)?1:Am(e)?128:kw(e)?64:st(e)?4:ke(e)?2:0;return ss(e,t,r,o,n,s,i,!0)}function Bw(e){return e?Sm(e)||Bl in e?St({},e):e:null}function _r(e,t,r=!1){const{props:o,ref:n,patchFlag:i,children:s}=e,a=t?Ml(o||{},t):o;return{__v_isVNode:!0,__v_skip:!0,type:e.type,props:a,key:a&&Qm(a),ref:t&&t.ref?r&&n?we(n)?n.concat(Va(t)):[n,Va(t)]:Va(t):n,scopeId:e.scopeId,slotScopeIds:e.slotScopeIds,children:s,target:e.target,targetAnchor:e.targetAnchor,staticCount:e.staticCount,shapeFlag:e.shapeFlag,patchFlag:t&&e.type!==Qe?i===-1?16:i|16:i,dynamicProps:e.dynamicProps,dynamicChildren:e.dynamicChildren,appContext:e.appContext,dirs:e.dirs,transition:e.transition,component:e.component,suspense:e.suspense,ssContent:e.ssContent&&_r(e.ssContent),ssFallback:e.ssFallback&&_r(e.ssFallback),el:e.el,anchor:e.anchor}}function di(e=" ",t=0){return ct(Al,null,e,t)}function KF(e,t){const r=ct(Ua,null,e);return r.staticCount=t,r}function qF(e="",t=!1){return t?(vn(),yn(Ft,null,e)):ct(Ft,null,e)}function Ar(e){return e==null||typeof e=="boolean"?ct(Ft):we(e)?ct(Qe,null,e.slice()):typeof e=="object"?Lo(e):ct(Al,null,String(e))}function Lo(e){return e.el===null&&e.patchFlag!==-1||e.memo?e:_r(e)}function xd(e,t){let r=0;const{shapeFlag:o}=e;if(t==null)t=null;else if(we(t))r=16;else if(typeof t=="object")if(o&65){const n=t.default;n&&(n._c&&(n._d=!1),xd(e,n()),n._c&&(n._d=!0));return}else{r=32;const n=t._;!n&&!(Bl in t)?t._ctx=Bt:n===3&&Bt&&(Bt.slots._===1?t._=1:(t._=2,e.patchFlag|=1024))}else ke(t)?(t={default:t,_ctx:Bt},r=32):(t=String(t),o&64?(r=16,t=[di(t)]):r=8);e.children=t,e.shapeFlag|=r}function Ml(...e){const t={};for(let r=0;r<e.length;r++){const o=e[r];for(const n in o)if(n==="class")t.class!==o.class&&(t.class=Sl([t.class,o.class]));else if(n==="style")t.style=$i([t.style,o.style]);else if(El(n)){const i=t[n],s=o[n];s&&i!==s&&!(we(i)&&i.includes(s))&&(t[n]=i?[].concat(i,s):s)}else n!==""&&(t[n]=o[n])}return t}function ur(e,t,r,o=null){pr(e,t,7,[r,o])}const Mw=Zm();let Hw=0;function Dw(e,t,r){const o=e.type,n=(t?t.appContext:e.appContext)||Mw,i={uid:Hw++,vnode:e,type:o,parent:t,appContext:n,root:null,next:null,subTree:null,effect:null,update:null,scope:new fm(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:t?t.provides:Object.create(n.provides),accessCache:null,renderCache:[],components:null,directives:null,propsOptions:qm(o,n),emitsOptions:Om(o,n),emit:null,emitted:null,propsDefaults:Je,inheritAttrs:o.inheritAttrs,ctx:Je,data:Je,props:Je,attrs:Je,slots:Je,refs:Je,setupState:Je,setupContext:null,suspense:r,suspenseId:r?r.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return i.ctx={_:i},i.root=t?t.root:i,i.emit=YC.bind(null,i),e.ce&&e.ce(i),i}let wt=null;const gr=()=>wt||Bt,fi=e=>{wt=e,e.scope.on()},xn=()=>{wt&&wt.scope.off(),wt=null};function e0(e){return e.vnode.shapeFlag&4}let Ts=!1;function zw(e,t=!1){Ts=t;const{props:r,children:o}=e.vnode,n=e0(e);xw(e,r,n,t),Sw(e,o);const i=n?Fw(e,t):void 0;return Ts=!1,i}function Fw(e,t){const r=e.type;e.accessCache=Object.create(null),e.proxy=rl(new Proxy(e.ctx,pw));const{setup:o}=r;if(o){const n=e.setupContext=o.length>1?jw(e):null;fi(e),Pi();const i=Mo(o,e,0,[e.props,n]);if(Li(),xn(),lm(i)){if(i.then(xn,xn),t)return i.then(s=>{sh(e,s,t)}).catch(s=>{Ll(s,e,0)});e.asyncDep=i}else sh(e,i,t)}else t0(e,t)}function sh(e,t,r){ke(t)?e.type.__ssrInlineRender?e.ssrRender=t:e.render=t:st(t)&&(e.setupState=$m(t)),t0(e,r)}let ah;function t0(e,t,r){const o=e.type;if(!e.render){if(!t&&ah&&!o.render){const n=o.template||bd(e).template;if(n){const{isCustomElement:i,compilerOptions:s}=e.appContext.config,{delimiters:a,compilerOptions:l}=o,c=St(St({isCustomElement:i,delimiters:a},s),l);o.render=ah(n,c)}}e.render=o.render||Sr}fi(e),Pi(),gw(e),Li(),xn()}function Nw(e){return new Proxy(e.attrs,{get(t,r){return ir(e,"get","$attrs"),t[r]}})}function jw(e){const t=o=>{e.exposed=o||{}};let r;return{get attrs(){return r||(r=Nw(e))},slots:e.slots,emit:e.emit,expose:t}}function Hl(e){if(e.exposed)return e.exposeProxy||(e.exposeProxy=new Proxy($m(rl(e.exposed)),{get(t,r){if(r in t)return t[r];if(r in nl)return nl[r](e)}}))}function su(e,t=!0){return ke(e)?e.displayName||e.name:e.name||t&&e.__name}function Ww(e){return ke(e)&&"__vccOpts"in e}const q=(e,t)=>UC(e,t,Ts);function E(e,t,r){const o=arguments.length;return o===2?st(t)&&!we(t)?ui(t)?ct(e,null,[t]):ct(e,t):ct(e,null,t):(o>3?r=Array.prototype.slice.call(arguments,2):o===3&&ui(r)&&(r=[r]),ct(e,t,r))}const Uw="3.2.41",Vw="http://www.w3.org/2000/svg",ln=typeof document<"u"?document:null,lh=ln&&ln.createElement("template"),Kw={insert:(e,t,r)=>{t.insertBefore(e,r||null)},remove:e=>{const t=e.parentNode;t&&t.removeChild(e)},createElement:(e,t,r,o)=>{const n=t?ln.createElementNS(Vw,e):ln.createElement(e,r?{is:r}:void 0);return e==="select"&&o&&o.multiple!=null&&n.setAttribute("multiple",o.multiple),n},createText:e=>ln.createTextNode(e),createComment:e=>ln.createComment(e),setText:(e,t)=>{e.nodeValue=t},setElementText:(e,t)=>{e.textContent=t},parentNode:e=>e.parentNode,nextSibling:e=>e.nextSibling,querySelector:e=>ln.querySelector(e),setScopeId(e,t){e.setAttribute(t,"")},insertStaticContent(e,t,r,o,n,i){const s=r?r.previousSibling:t.lastChild;if(n&&(n===i||n.nextSibling))for(;t.insertBefore(n.cloneNode(!0),r),!(n===i||!(n=n.nextSibling)););else{lh.innerHTML=o?`<svg>${e}</svg>`:e;const a=lh.content;if(o){const l=a.firstChild;for(;l.firstChild;)a.appendChild(l.firstChild);a.removeChild(l)}t.insertBefore(a,r)}return[s?s.nextSibling:t.firstChild,r?r.previousSibling:t.lastChild]}};function qw(e,t,r){const o=e._vtc;o&&(t=(t?[t,...o]:[...o]).join(" ")),t==null?e.removeAttribute("class"):r?e.setAttribute("class",t):e.className=t}function Gw(e,t,r){const o=e.style,n=ft(r);if(r&&!n){for(const i in r)au(o,i,r[i]);if(t&&!ft(t))for(const i in t)r[i]==null&&au(o,i,"")}else{const i=o.display;n?t!==r&&(o.cssText=r):t&&e.removeAttribute("style"),"_vod"in e&&(o.display=i)}}const ch=/\s*!important$/;function au(e,t,r){if(we(r))r.forEach(o=>au(e,t,o));else if(r==null&&(r=""),t.startsWith("--"))e.setProperty(t,r);else{const o=Xw(e,t);ch.test(r)?e.setProperty(Ln(o),r.replace(ch,""),"important"):e[o]=r}}const uh=["Webkit","Moz","ms"],bc={};function Xw(e,t){const r=bc[t];if(r)return r;let o=zr(t);if(o!=="filter"&&o in e)return bc[t]=o;o=$l(o);for(let n=0;n<uh.length;n++){const i=uh[n]+o;if(i in e)return bc[t]=i}return t}const dh="http://www.w3.org/1999/xlink";function Yw(e,t,r,o,n){if(o&&t.startsWith("xlink:"))r==null?e.removeAttributeNS(dh,t.slice(6,t.length)):e.setAttributeNS(dh,t,r);else{const i=Qx(t);r==null||i&&!im(r)?e.removeAttribute(t):e.setAttribute(t,i?"":r)}}function Zw(e,t,r,o,n,i,s){if(t==="innerHTML"||t==="textContent"){o&&s(o,n,i),e[t]=r==null?"":r;return}if(t==="value"&&e.tagName!=="PROGRESS"&&!e.tagName.includes("-")){e._value=r;const l=r==null?"":r;(e.value!==l||e.tagName==="OPTION")&&(e.value=l),r==null&&e.removeAttribute(t);return}let a=!1;if(r===""||r==null){const l=typeof e[t];l==="boolean"?r=im(r):r==null&&l==="string"?(r="",a=!0):l==="number"&&(r=0,a=!0)}try{e[t]=r}catch{}a&&e.removeAttribute(t)}function Jw(e,t,r,o){e.addEventListener(t,r,o)}function Qw(e,t,r,o){e.removeEventListener(t,r,o)}function e2(e,t,r,o,n=null){const i=e._vei||(e._vei={}),s=i[t];if(o&&s)s.value=o;else{const[a,l]=t2(t);if(o){const c=i[t]=n2(o,n);Jw(e,a,c,l)}else s&&(Qw(e,a,s,l),i[t]=void 0)}}const fh=/(?:Once|Passive|Capture)$/;function t2(e){let t;if(fh.test(e)){t={};let o;for(;o=e.match(fh);)e=e.slice(0,e.length-o[0].length),t[o[0].toLowerCase()]=!0}return[e[2]===":"?e.slice(3):Ln(e.slice(2)),t]}let vc=0;const r2=Promise.resolve(),o2=()=>vc||(r2.then(()=>vc=0),vc=Date.now());function n2(e,t){const r=o=>{if(!o._vts)o._vts=Date.now();else if(o._vts<=r.attached)return;pr(i2(o,r.value),t,5,[o])};return r.value=e,r.attached=o2(),r}function i2(e,t){if(we(t)){const r=e.stopImmediatePropagation;return e.stopImmediatePropagation=()=>{r.call(e),e._stopped=!0},t.map(o=>n=>!n._stopped&&o&&o(n))}else return t}const hh=/^on[a-z]/,s2=(e,t,r,o,n=!1,i,s,a,l)=>{t==="class"?qw(e,o,n):t==="style"?Gw(e,r,o):El(t)?Zu(t)||e2(e,t,r,o,s):(t[0]==="."?(t=t.slice(1),!0):t[0]==="^"?(t=t.slice(1),!1):a2(e,t,o,n))?Zw(e,t,o,i,s,a,l):(t==="true-value"?e._trueValue=o:t==="false-value"&&(e._falseValue=o),Yw(e,t,o,n))};function a2(e,t,r,o){return o?!!(t==="innerHTML"||t==="textContent"||t in e&&hh.test(t)&&ke(r)):t==="spellcheck"||t==="draggable"||t==="translate"||t==="form"||t==="list"&&e.tagName==="INPUT"||t==="type"&&e.tagName==="TEXTAREA"||hh.test(t)&&ft(r)?!1:t in e}const go="transition",Fi="animation",qt=(e,{slots:t})=>E(Hm,o0(e),t);qt.displayName="Transition";const r0={name:String,type:String,css:{type:Boolean,default:!0},duration:[String,Number,Object],enterFromClass:String,enterActiveClass:String,enterToClass:String,appearFromClass:String,appearActiveClass:String,appearToClass:String,leaveFromClass:String,leaveActiveClass:String,leaveToClass:String},l2=qt.props=St({},Hm.props,r0),tn=(e,t=[])=>{we(e)?e.forEach(r=>r(...t)):e&&e(...t)},ph=e=>e?we(e)?e.some(t=>t.length>1):e.length>1:!1;function o0(e){const t={};for(const R in e)R in r0||(t[R]=e[R]);if(e.css===!1)return t;const{name:r="v",type:o,duration:n,enterFromClass:i=`${r}-enter-from`,enterActiveClass:s=`${r}-enter-active`,enterToClass:a=`${r}-enter-to`,appearFromClass:l=i,appearActiveClass:c=s,appearToClass:u=a,leaveFromClass:d=`${r}-leave-from`,leaveActiveClass:f=`${r}-leave-active`,leaveToClass:h=`${r}-leave-to`}=e,p=c2(n),m=p&&p[0],y=p&&p[1],{onBeforeEnter:g,onEnter:w,onEnterCancelled:T,onLeave:x,onLeaveCancelled:C,onBeforeAppear:$=g,onAppear:S=w,onAppearCancelled:L=T}=t,k=(R,F,H)=>{To(R,F?u:a),To(R,F?c:s),H&&H()},I=(R,F)=>{R._isLeaving=!1,To(R,d),To(R,h),To(R,f),F&&F()},A=R=>(F,H)=>{const J=R?S:w,Y=()=>k(F,R,H);tn(J,[F,Y]),gh(()=>{To(F,R?l:i),Zr(F,R?u:a),ph(J)||mh(F,o,m,Y)})};return St(t,{onBeforeEnter(R){tn(g,[R]),Zr(R,i),Zr(R,s)},onBeforeAppear(R){tn($,[R]),Zr(R,l),Zr(R,c)},onEnter:A(!1),onAppear:A(!0),onLeave(R,F){R._isLeaving=!0;const H=()=>I(R,F);Zr(R,d),i0(),Zr(R,f),gh(()=>{!R._isLeaving||(To(R,d),Zr(R,h),ph(x)||mh(R,o,y,H))}),tn(x,[R,H])},onEnterCancelled(R){k(R,!1),tn(T,[R])},onAppearCancelled(R){k(R,!0),tn(L,[R])},onLeaveCancelled(R){I(R),tn(C,[R])}})}function c2(e){if(e==null)return null;if(st(e))return[yc(e.enter),yc(e.leave)];{const t=yc(e);return[t,t]}}function yc(e){return dm(e)}function Zr(e,t){t.split(/\s+/).forEach(r=>r&&e.classList.add(r)),(e._vtc||(e._vtc=new Set)).add(t)}function To(e,t){t.split(/\s+/).forEach(o=>o&&e.classList.remove(o));const{_vtc:r}=e;r&&(r.delete(t),r.size||(e._vtc=void 0))}function gh(e){requestAnimationFrame(()=>{requestAnimationFrame(e)})}let u2=0;function mh(e,t,r,o){const n=e._endId=++u2,i=()=>{n===e._endId&&o()};if(r)return setTimeout(i,r);const{type:s,timeout:a,propCount:l}=n0(e,t);if(!s)return o();const c=s+"end";let u=0;const d=()=>{e.removeEventListener(c,f),i()},f=h=>{h.target===e&&++u>=l&&d()};setTimeout(()=>{u<l&&d()},a+1),e.addEventListener(c,f)}function n0(e,t){const r=window.getComputedStyle(e),o=p=>(r[p]||"").split(", "),n=o(go+"Delay"),i=o(go+"Duration"),s=bh(n,i),a=o(Fi+"Delay"),l=o(Fi+"Duration"),c=bh(a,l);let u=null,d=0,f=0;t===go?s>0&&(u=go,d=s,f=i.length):t===Fi?c>0&&(u=Fi,d=c,f=l.length):(d=Math.max(s,c),u=d>0?s>c?go:Fi:null,f=u?u===go?i.length:l.length:0);const h=u===go&&/\b(transform|all)(,|$)/.test(r[go+"Property"]);return{type:u,timeout:d,propCount:f,hasTransform:h}}function bh(e,t){for(;e.length<t.length;)e=e.concat(e);return Math.max(...t.map((r,o)=>vh(r)+vh(e[o])))}function vh(e){return Number(e.slice(0,-1).replace(",","."))*1e3}function i0(){return document.body.offsetHeight}const s0=new WeakMap,a0=new WeakMap,d2={name:"TransitionGroup",props:St({},l2,{tag:String,moveClass:String}),setup(e,{slots:t}){const r=gr(),o=Mm();let n,i;return hd(()=>{if(!n.length)return;const s=e.moveClass||`${e.name||"v"}-move`;if(!m2(n[0].el,r.vnode.el,s))return;n.forEach(h2),n.forEach(p2);const a=n.filter(g2);i0(),a.forEach(l=>{const c=l.el,u=c.style;Zr(c,s),u.transform=u.webkitTransform=u.transitionDuration="";const d=c._moveCb=f=>{f&&f.target!==c||(!f||/transform$/.test(f.propertyName))&&(c.removeEventListener("transitionend",d),c._moveCb=null,To(c,s))};c.addEventListener("transitionend",d)})}),()=>{const s=We(e),a=o0(s);let l=s.tag||Qe;n=i,i=t.default?fd(t.default()):[];for(let c=0;c<i.length;c++){const u=i[c];u.key!=null&&ci(u,Es(u,a,o,r))}if(n)for(let c=0;c<n.length;c++){const u=n[c];ci(u,Es(u,a,o,r)),s0.set(u,u.el.getBoundingClientRect())}return ct(l,null,i)}}},f2=d2;function h2(e){const t=e.el;t._moveCb&&t._moveCb(),t._enterCb&&t._enterCb()}function p2(e){a0.set(e,e.el.getBoundingClientRect())}function g2(e){const t=s0.get(e),r=a0.get(e),o=t.left-r.left,n=t.top-r.top;if(o||n){const i=e.el.style;return i.transform=i.webkitTransform=`translate(${o}px,${n}px)`,i.transitionDuration="0s",e}}function m2(e,t,r){const o=e.cloneNode();e._vtc&&e._vtc.forEach(s=>{s.split(/\s+/).forEach(a=>a&&o.classList.remove(a))}),r.split(/\s+/).forEach(s=>s&&o.classList.add(s)),o.style.display="none";const n=t.nodeType===1?t:t.parentNode;n.appendChild(o);const{hasTransform:i}=n0(o);return n.removeChild(o),i}const b2=["ctrl","shift","alt","meta"],v2={stop:e=>e.stopPropagation(),prevent:e=>e.preventDefault(),self:e=>e.target!==e.currentTarget,ctrl:e=>!e.ctrlKey,shift:e=>!e.shiftKey,alt:e=>!e.altKey,meta:e=>!e.metaKey,left:e=>"button"in e&&e.button!==0,middle:e=>"button"in e&&e.button!==1,right:e=>"button"in e&&e.button!==2,exact:(e,t)=>b2.some(r=>e[`${r}Key`]&&!t.includes(r))},GF=(e,t)=>(r,...o)=>{for(let n=0;n<t.length;n++){const i=v2[t[n]];if(i&&i(r,t))return}return e(r,...o)},y2={esc:"escape",space:" ",up:"arrow-up",left:"arrow-left",right:"arrow-right",down:"arrow-down",delete:"backspace"},XF=(e,t)=>r=>{if(!("key"in r))return;const o=Ln(r.key);if(t.some(n=>n===o||y2[n]===o))return e(r)},$s={beforeMount(e,{value:t},{transition:r}){e._vod=e.style.display==="none"?"":e.style.display,r&&t?r.beforeEnter(e):Ni(e,t)},mounted(e,{value:t},{transition:r}){r&&t&&r.enter(e)},updated(e,{value:t,oldValue:r},{transition:o}){!t!=!r&&(o?t?(o.beforeEnter(e),Ni(e,!0),o.enter(e)):o.leave(e,()=>{Ni(e,!1)}):Ni(e,t))},beforeUnmount(e,{value:t}){Ni(e,t)}};function Ni(e,t){e.style.display=t?e._vod:"none"}const x2=St({patchProp:s2},Kw);let yh;function C2(){return yh||(yh=$w(x2))}const w2=(...e)=>{const t=C2().createApp(...e),{mount:r}=t;return t.mount=o=>{const n=S2(o);if(!n)return;const i=t._component;!ke(i)&&!i.render&&!i.template&&(i.template=n.innerHTML),n.innerHTML="";const s=r(n,!1,n instanceof SVGElement);return n instanceof Element&&(n.removeAttribute("v-cloak"),n.setAttribute("data-v-app","")),s},t};function S2(e){return ft(e)?document.querySelector(e):e}let sl=[];const l0=new WeakMap;function E2(){sl.forEach(e=>e(...l0.get(e))),sl=[]}function c0(e,...t){l0.set(e,t),!sl.includes(e)&&sl.push(e)===1&&requestAnimationFrame(E2)}function Ps(e){return e.composedPath()[0]||null}function YF(e){return typeof e=="string"?e.endsWith("px")?Number(e.slice(0,e.length-2)):Number(e):e}function ZF(e){if(e!=null)return typeof e=="number"?`${e}px`:e.endsWith("px")?e:`${e}px`}function u0(e,t){const r=e.trim().split(/\s+/g),o={top:r[0]};switch(r.length){case 1:o.right=r[0],o.bottom=r[0],o.left=r[0];break;case 2:o.right=r[1],o.left=r[1],o.bottom=r[0];break;case 3:o.right=r[1],o.bottom=r[2],o.left=r[1];break;case 4:o.right=r[1],o.bottom=r[2],o.left=r[3];break;default:throw new Error("[seemly/getMargin]:"+e+" is not a valid value.")}return t===void 0?o:o[t]}function JF(e,t){const[r,o]=e.split(" ");return t?t==="row"?r:o:{row:r,col:o||r}}const xh={black:"#000",silver:"#C0C0C0",gray:"#808080",white:"#FFF",maroon:"#800000",red:"#F00",purple:"#800080",fuchsia:"#F0F",green:"#008000",lime:"#0F0",olive:"#808000",yellow:"#FF0",navy:"#000080",blue:"#00F",teal:"#008080",aqua:"#0FF",transparent:"#0000"},ki="^\\s*",Ii="\\s*$",fn="\\s*((\\.\\d+)|(\\d+(\\.\\d*)?))\\s*",hn="([0-9A-Fa-f])",pn="([0-9A-Fa-f]{2})",_2=new RegExp(`${ki}rgb\\s*\\(${fn},${fn},${fn}\\)${Ii}`),T2=new RegExp(`${ki}rgba\\s*\\(${fn},${fn},${fn},${fn}\\)${Ii}`),$2=new RegExp(`${ki}#${hn}${hn}${hn}${Ii}`),P2=new RegExp(`${ki}#${pn}${pn}${pn}${Ii}`),L2=new RegExp(`${ki}#${hn}${hn}${hn}${hn}${Ii}`),k2=new RegExp(`${ki}#${pn}${pn}${pn}${pn}${Ii}`);function Vt(e){return parseInt(e,16)}function no(e){try{let t;if(t=P2.exec(e))return[Vt(t[1]),Vt(t[2]),Vt(t[3]),1];if(t=_2.exec(e))return[Ot(t[1]),Ot(t[5]),Ot(t[9]),1];if(t=T2.exec(e))return[Ot(t[1]),Ot(t[5]),Ot(t[9]),as(t[13])];if(t=$2.exec(e))return[Vt(t[1]+t[1]),Vt(t[2]+t[2]),Vt(t[3]+t[3]),1];if(t=k2.exec(e))return[Vt(t[1]),Vt(t[2]),Vt(t[3]),as(Vt(t[4])/255)];if(t=L2.exec(e))return[Vt(t[1]+t[1]),Vt(t[2]+t[2]),Vt(t[3]+t[3]),as(Vt(t[4]+t[4])/255)];if(e in xh)return no(xh[e]);throw new Error(`[seemly/rgba]: Invalid color value ${e}.`)}catch(t){throw t}}function I2(e){return e>1?1:e<0?0:e}function lu(e,t,r,o){return`rgba(${Ot(e)}, ${Ot(t)}, ${Ot(r)}, ${I2(o)})`}function xc(e,t,r,o,n){return Ot((e*t*(1-o)+r*o)/n)}function he(e,t){Array.isArray(e)||(e=no(e)),Array.isArray(t)||(t=no(t));const r=e[3],o=t[3],n=as(r+o-r*o);return lu(xc(e[0],r,t[0],o,n),xc(e[1],r,t[1],o,n),xc(e[2],r,t[2],o,n),n)}function G(e,t){const[r,o,n,i=1]=Array.isArray(e)?e:no(e);return t.alpha?lu(r,o,n,t.alpha):lu(r,o,n,i)}function pt(e,t){const[r,o,n,i=1]=Array.isArray(e)?e:no(e),{lightness:s=1,alpha:a=1}=t;return R2([r*s,o*s,n*s,i*a])}function as(e){const t=Math.round(Number(e)*100)/100;return t>1?1:t<0?0:t}function Ot(e){const t=Math.round(Number(e));return t>255?255:t<0?0:t}function R2(e){const[t,r,o]=e;return 3 in e?`rgba(${Ot(t)}, ${Ot(r)}, ${Ot(o)}, ${as(e[3])})`:`rgba(${Ot(t)}, ${Ot(r)}, ${Ot(o)}, 1)`}function _n(e=8){return Math.random().toString(16).slice(2,2+e)}function QF(e,t){const r=[];for(let o=0;o<e;++o)r.push(t);return r}function hi(e,t=[],r){const o={};return t.forEach(n=>{o[n]=e[n]}),Object.assign(o,r)}function Cd(e,t=[],r){const o={};return Object.getOwnPropertyNames(e).forEach(i=>{t.includes(i)||(o[i]=e[i])}),Object.assign(o,r)}function cu(e,t=!0,r=[]){return e.forEach(o=>{if(o!==null){if(typeof o!="object"){(typeof o=="string"||typeof o=="number")&&r.push(di(String(o)));return}if(Array.isArray(o)){cu(o,t,r);return}if(o.type===Qe){if(o.children===null)return;Array.isArray(o.children)&&cu(o.children,t,r)}else o.type!==Ft&&r.push(o)}}),r}function or(e,...t){if(Array.isArray(e))e.forEach(r=>or(r,...t));else return e(...t)}function Dl(e){return Object.keys(e)}const er=(e,...t)=>typeof e=="function"?e(...t):typeof e=="string"?di(e):typeof e=="number"?di(String(e)):null;function Ls(e,t){console.error(`[naive/${e}]: ${t}`)}function kn(e,t){throw new Error(`[naive/${e}]: ${t}`)}function uu(e,t="default",r=void 0){const o=e[t];if(!o)return Ls("getFirstSlotVNode",`slot[${t}] is empty`),null;const n=cu(o(r));return n.length===1?n[0]:(Ls("getFirstSlotVNode",`slot[${t}] should have exactly one child`),null)}function e9(e){return e}function Us(e){return e.some(t=>ui(t)?!(t.type===Ft||t.type===Qe&&!Us(t.children)):!0)?e:null}function du(e,t){return e&&Us(e())||t()}function t9(e,t,r){return e&&Us(e(t))||r(t)}function tr(e,t){const r=e&&Us(e());return t(r||null)}function fu(e){return!(e&&Us(e()))}const Ch=be({render(){var e,t;return(t=(e=this.$slots).default)===null||t===void 0?void 0:t.call(e)}}),O2=/^(\d|\.)+$/,wh=/(\d|\.)+/;function Qr(e,{c:t=1,offset:r=0,attachPx:o=!0}={}){if(typeof e=="number"){const n=(e+r)*t;return n===0?"0":`${n}px`}else if(typeof e=="string")if(O2.test(e)){const n=(Number(e)+r)*t;return o?n===0?"0":`${n}px`:`${n}`}else{const n=wh.exec(e);return n?e.replace(wh,String((Number(n[0])+r)*t)):e}return e}function Sh(e){return e.replace(/#|\(|\)|,|\s/g,"_")}function A2(e){let t=0;for(let r=0;r<e.length;++r)e[r]==="&"&&++t;return t}const d0=/\s*,(?![^(]*\))\s*/g,B2=/\s+/g;function M2(e,t){const r=[];return t.split(d0).forEach(o=>{let n=A2(o);if(n){if(n===1){e.forEach(s=>{r.push(o.replace("&",s))});return}}else{e.forEach(s=>{r.push((s&&s+" ")+o)});return}let i=[o];for(;n--;){const s=[];i.forEach(a=>{e.forEach(l=>{s.push(a.replace("&",l))})}),i=s}i.forEach(s=>r.push(s))}),r}function H2(e,t){const r=[];return t.split(d0).forEach(o=>{e.forEach(n=>{r.push((n&&n+" ")+o)})}),r}function D2(e){let t=[""];return e.forEach(r=>{r=r&&r.trim(),r&&(r.includes("&")?t=M2(t,r):t=H2(t,r))}),t.join(", ").replace(B2," ")}function Eh(e){if(!e)return;const t=e.parentElement;t&&t.removeChild(e)}function zl(e){return document.querySelector(`style[cssr-id="${e}"]`)}function z2(e){const t=document.createElement("style");return t.setAttribute("cssr-id",e),t}function ma(e){return e?/^\s*@(s|m)/.test(e):!1}const F2=/[A-Z]/g;function f0(e){return e.replace(F2,t=>"-"+t.toLowerCase())}function N2(e,t="  "){return typeof e=="object"&&e!==null?` {
`+Object.entries(e).map(r=>t+`  ${f0(r[0])}: ${r[1]};`).join(`
`)+`
`+t+"}":`: ${e};`}function j2(e,t,r){return typeof e=="function"?e({context:t.context,props:r}):e}function _h(e,t,r,o){if(!t)return"";const n=j2(t,r,o);if(!n)return"";if(typeof n=="string")return`${e} {
${n}
}`;const i=Object.keys(n);if(i.length===0)return r.config.keepEmptyBlock?e+` {
}`:"";const s=e?[e+" {"]:[];return i.forEach(a=>{const l=n[a];if(a==="raw"){s.push(`
`+l+`
`);return}a=f0(a),l!=null&&s.push(`  ${a}${N2(l)}`)}),e&&s.push("}"),s.join(`
`)}function hu(e,t,r){!e||e.forEach(o=>{if(Array.isArray(o))hu(o,t,r);else if(typeof o=="function"){const n=o(t);Array.isArray(n)?hu(n,t,r):n&&r(n)}else o&&r(o)})}function h0(e,t,r,o,n,i){const s=e.$;let a="";if(!s||typeof s=="string")ma(s)?a=s:t.push(s);else if(typeof s=="function"){const u=s({context:o.context,props:n});ma(u)?a=u:t.push(u)}else if(s.before&&s.before(o.context),!s.$||typeof s.$=="string")ma(s.$)?a=s.$:t.push(s.$);else if(s.$){const u=s.$({context:o.context,props:n});ma(u)?a=u:t.push(u)}const l=D2(t),c=_h(l,e.props,o,n);a?(r.push(`${a} {`),i&&c&&i.insertRule(`${a} {
${c}
}
`)):(i&&c&&i.insertRule(c),!i&&c.length&&r.push(c)),e.children&&hu(e.children,{context:o.context,props:n},u=>{if(typeof u=="string"){const d=_h(l,{raw:u},o,n);i?i.insertRule(d):r.push(d)}else h0(u,t,r,o,n,i)}),t.pop(),a&&r.push("}"),s&&s.after&&s.after(o.context)}function p0(e,t,r,o=!1){const n=[];return h0(e,[],n,t,r,o?e.instance.__styleSheet:void 0),o?"":n.join(`

`)}function ks(e){for(var t=0,r,o=0,n=e.length;n>=4;++o,n-=4)r=e.charCodeAt(o)&255|(e.charCodeAt(++o)&255)<<8|(e.charCodeAt(++o)&255)<<16|(e.charCodeAt(++o)&255)<<24,r=(r&65535)*1540483477+((r>>>16)*59797<<16),r^=r>>>24,t=(r&65535)*1540483477+((r>>>16)*59797<<16)^(t&65535)*1540483477+((t>>>16)*59797<<16);switch(n){case 3:t^=(e.charCodeAt(o+2)&255)<<16;case 2:t^=(e.charCodeAt(o+1)&255)<<8;case 1:t^=e.charCodeAt(o)&255,t=(t&65535)*1540483477+((t>>>16)*59797<<16)}return t^=t>>>13,t=(t&65535)*1540483477+((t>>>16)*59797<<16),((t^t>>>15)>>>0).toString(36)}typeof window<"u"&&(window.__cssrContext={});function W2(e,t,r){const{els:o}=t;if(r===void 0)o.forEach(Eh),t.els=[];else{const n=zl(r);n&&o.includes(n)&&(Eh(n),t.els=o.filter(i=>i!==n))}}function Th(e,t){e.push(t)}function U2(e,t,r,o,n,i,s,a,l){if(i&&!l){if(r===void 0){console.error("[css-render/mount]: `id` is required in `silent` mode.");return}const f=window.__cssrContext;f[r]||(f[r]=!0,p0(t,e,o,i));return}let c;if(r===void 0&&(c=t.render(o),r=ks(c)),l){l.adapter(r,c!=null?c:t.render(o));return}const u=zl(r);if(u!==null&&!s)return u;const d=u!=null?u:z2(r);if(c===void 0&&(c=t.render(o)),d.textContent=c,u!==null)return u;if(a){const f=document.head.querySelector(`meta[name="${a}"]`);if(f)return document.head.insertBefore(d,f),Th(t.els,d),d}return n?document.head.insertBefore(d,document.head.querySelector("style, link")):document.head.appendChild(d),Th(t.els,d),d}function V2(e){return p0(this,this.instance,e)}function K2(e={}){const{id:t,ssr:r,props:o,head:n=!1,silent:i=!1,force:s=!1,anchorMetaName:a}=e;return U2(this.instance,this,t,o,n,i,s,a,r)}function q2(e={}){const{id:t}=e;W2(this.instance,this,t)}const ba=function(e,t,r,o){return{instance:e,$:t,props:r,children:o,els:[],render:V2,mount:K2,unmount:q2}},G2=function(e,t,r,o){return Array.isArray(t)?ba(e,{$:null},null,t):Array.isArray(r)?ba(e,t,null,r):Array.isArray(o)?ba(e,t,r,o):ba(e,t,r,null)};function g0(e={}){let t=null;const r={c:(...o)=>G2(r,...o),use:(o,...n)=>o.install(r,...n),find:zl,context:{},config:e,get __styleSheet(){if(!t){const o=document.createElement("style");return document.head.appendChild(o),t=document.styleSheets[document.styleSheets.length-1],t}return t}};return r}function X2(e,t){if(e===void 0)return!1;if(t){const{context:{ids:r}}=t;return r.has(e)}return zl(e)!==null}function Y2(e){let t=".",r="__",o="--",n;if(e){let p=e.blockPrefix;p&&(t=p),p=e.elementPrefix,p&&(r=p),p=e.modifierPrefix,p&&(o=p)}const i={install(p){n=p.c;const m=p.context;m.bem={},m.bem.b=null,m.bem.els=null}};function s(p){let m,y;return{before(g){m=g.bem.b,y=g.bem.els,g.bem.els=null},after(g){g.bem.b=m,g.bem.els=y},$({context:g,props:w}){return p=typeof p=="string"?p:p({context:g,props:w}),g.bem.b=p,`${(w==null?void 0:w.bPrefix)||t}${g.bem.b}`}}}function a(p){let m;return{before(y){m=y.bem.els},after(y){y.bem.els=m},$({context:y,props:g}){return p=typeof p=="string"?p:p({context:y,props:g}),y.bem.els=p.split(",").map(w=>w.trim()),y.bem.els.map(w=>`${(g==null?void 0:g.bPrefix)||t}${y.bem.b}${r}${w}`).join(", ")}}}function l(p){return{$({context:m,props:y}){p=typeof p=="string"?p:p({context:m,props:y});const g=p.split(",").map(x=>x.trim());function w(x){return g.map(C=>`&${(y==null?void 0:y.bPrefix)||t}${m.bem.b}${x!==void 0?`${r}${x}`:""}${o}${C}`).join(", ")}const T=m.bem.els;return T!==null?w(T[0]):w()}}}function c(p){return{$({context:m,props:y}){p=typeof p=="string"?p:p({context:m,props:y});const g=m.bem.els;return`&:not(${(y==null?void 0:y.bPrefix)||t}${m.bem.b}${g!==null&&g.length>0?`${r}${g[0]}`:""}${o}${p})`}}}return Object.assign(i,{cB:(...p)=>n(s(p[0]),p[1],p[2]),cE:(...p)=>n(a(p[0]),p[1],p[2]),cM:(...p)=>n(l(p[0]),p[1],p[2]),cNotM:(...p)=>n(c(p[0]),p[1],p[2])}),i}function Ce(e,t){return e+(t==="default"?"":t.replace(/^[a-z]/,r=>r.toUpperCase()))}Ce("abc","def");const Z2="n",Is=`.${Z2}-`,J2="__",Q2="--",m0=g0(),b0=Y2({blockPrefix:Is,elementPrefix:J2,modifierPrefix:Q2});m0.use(b0);const{c:N,find:r9}=m0,{cB:W,cE:oe,cM:re,cNotM:Cn}=b0;function v0(e){return N(({props:{bPrefix:t}})=>`${t||Is}modal, ${t||Is}drawer`,[e])}function eS(e){return N(({props:{bPrefix:t}})=>`${t||Is}popover`,[e])}function y0(e){return N(({props:{bPrefix:t}})=>`&${t||Is}modal`,e)}const tS=(...e)=>N(">",[W(...e)]);let Cc;function rS(){return Cc===void 0&&(Cc=navigator.userAgent.includes("Node.js")||navigator.userAgent.includes("jsdom")),Cc}const In=typeof document<"u"&&typeof window<"u",x0=new WeakSet;function o9(e){x0.add(e)}function oS(e){return!x0.has(e)}function nS(e){const t=K(!!e.value);if(t.value)return oo(t);const r=et(e,o=>{o&&(t.value=!0,r())});return oo(t)}function io(e){const t=q(e),r=K(t.value);return et(t,o=>{r.value=o}),typeof e=="function"?r:{__v_isRef:!0,get value(){return r.value},set value(o){e.set(o)}}}function C0(){return gr()!==null}const wd=typeof window<"u";let ti,ls;const iS=()=>{var e,t;ti=wd?(t=(e=document)===null||e===void 0?void 0:e.fonts)===null||t===void 0?void 0:t.ready:void 0,ls=!1,ti!==void 0?ti.then(()=>{ls=!0}):ls=!0};iS();function sS(e){if(ls)return;let t=!1;Lt(()=>{ls||ti==null||ti.then(()=>{t||e()})}),xt(()=>{t=!0})}function Ka(e){return e.composedPath()[0]}const aS={mousemoveoutside:new WeakMap,clickoutside:new WeakMap};function lS(e,t,r){if(e==="mousemoveoutside"){const o=n=>{t.contains(Ka(n))||r(n)};return{mousemove:o,touchstart:o}}else if(e==="clickoutside"){let o=!1;const n=s=>{o=!t.contains(Ka(s))},i=s=>{!o||t.contains(Ka(s))||r(s)};return{mousedown:n,mouseup:i,touchstart:n,touchend:i}}return console.error(`[evtd/create-trap-handler]: name \`${e}\` is invalid. This could be a bug of evtd.`),{}}function w0(e,t,r){const o=aS[e];let n=o.get(t);n===void 0&&o.set(t,n=new WeakMap);let i=n.get(r);return i===void 0&&n.set(r,i=lS(e,t,r)),i}function cS(e,t,r,o){if(e==="mousemoveoutside"||e==="clickoutside"){const n=w0(e,t,r);return Object.keys(n).forEach(i=>{mt(i,document,n[i],o)}),!0}return!1}function uS(e,t,r,o){if(e==="mousemoveoutside"||e==="clickoutside"){const n=w0(e,t,r);return Object.keys(n).forEach(i=>{tt(i,document,n[i],o)}),!0}return!1}function dS(){if(typeof window>"u")return{on:()=>{},off:()=>{}};const e=new WeakMap,t=new WeakMap;function r(){e.set(this,!0)}function o(){e.set(this,!0),t.set(this,!0)}function n(S,L,k){const I=S[L];return S[L]=function(){return k.apply(S,arguments),I.apply(S,arguments)},S}function i(S,L){S[L]=Event.prototype[L]}const s=new WeakMap,a=Object.getOwnPropertyDescriptor(Event.prototype,"currentTarget");function l(){var S;return(S=s.get(this))!==null&&S!==void 0?S:null}function c(S,L){a!==void 0&&Object.defineProperty(S,"currentTarget",{configurable:!0,enumerable:!0,get:L!=null?L:a.get})}const u={bubble:{},capture:{}},d={};function f(){const S=function(L){const{type:k,eventPhase:I,bubbles:A}=L,R=Ka(L);if(I===2)return;const F=I===1?"capture":"bubble";let H=R;const J=[];for(;H===null&&(H=window),J.push(H),H!==window;)H=H.parentNode||null;const Y=u.capture[k],Z=u.bubble[k];if(n(L,"stopPropagation",r),n(L,"stopImmediatePropagation",o),c(L,l),F==="capture"){if(Y===void 0)return;for(let se=J.length-1;se>=0&&!e.has(L);--se){const ve=J[se],Le=Y.get(ve);if(Le!==void 0){s.set(L,ve);for(const _e of Le){if(t.has(L))break;_e(L)}}if(se===0&&!A&&Z!==void 0){const _e=Z.get(ve);if(_e!==void 0)for(const Ae of _e){if(t.has(L))break;Ae(L)}}}}else if(F==="bubble"){if(Z===void 0)return;for(let se=0;se<J.length&&!e.has(L);++se){const ve=J[se],Le=Z.get(ve);if(Le!==void 0){s.set(L,ve);for(const _e of Le){if(t.has(L))break;_e(L)}}}}i(L,"stopPropagation"),i(L,"stopImmediatePropagation"),c(L)};return S.displayName="evtdUnifiedHandler",S}function h(){const S=function(L){const{type:k,eventPhase:I}=L;if(I!==2)return;const A=d[k];A!==void 0&&A.forEach(R=>R(L))};return S.displayName="evtdUnifiedWindowEventHandler",S}const p=f(),m=h();function y(S,L){const k=u[S];return k[L]===void 0&&(k[L]=new Map,window.addEventListener(L,p,S==="capture")),k[L]}function g(S){return d[S]===void 0&&(d[S]=new Set,window.addEventListener(S,m)),d[S]}function w(S,L){let k=S.get(L);return k===void 0&&S.set(L,k=new Set),k}function T(S,L,k,I){const A=u[L][k];if(A!==void 0){const R=A.get(S);if(R!==void 0&&R.has(I))return!0}return!1}function x(S,L){const k=d[S];return!!(k!==void 0&&k.has(L))}function C(S,L,k,I){let A;if(typeof I=="object"&&I.once===!0?A=Y=>{$(S,L,A,I),k(Y)}:A=k,cS(S,L,A,I))return;const F=I===!0||typeof I=="object"&&I.capture===!0?"capture":"bubble",H=y(F,S),J=w(H,L);if(J.has(A)||J.add(A),L===window){const Y=g(S);Y.has(A)||Y.add(A)}}function $(S,L,k,I){if(uS(S,L,k,I))return;const R=I===!0||typeof I=="object"&&I.capture===!0,F=R?"capture":"bubble",H=y(F,S),J=w(H,L);if(L===window&&!T(L,R?"bubble":"capture",S,k)&&x(S,k)){const Z=d[S];Z.delete(k),Z.size===0&&(window.removeEventListener(S,m),d[S]=void 0)}J.has(k)&&J.delete(k),J.size===0&&H.delete(L),H.size===0&&(window.removeEventListener(S,p,F==="capture"),u[F][S]=void 0)}return{on:C,off:$}}const{on:mt,off:tt}=dS(),es=K(null);function $h(e){if(e.clientX>0||e.clientY>0)es.value={x:e.clientX,y:e.clientY};else{const{target:t}=e;if(t instanceof Element){const{left:r,top:o,width:n,height:i}=t.getBoundingClientRect();r>0||o>0?es.value={x:r+n/2,y:o+i/2}:es.value={x:0,y:0}}else es.value=null}}let va=0,Ph=!0;function S0(){if(!wd)return oo(K(null));va===0&&mt("click",document,$h,!0);const e=()=>{va+=1};return Ph&&(Ph=C0())?(Vo(e),xt(()=>{va-=1,va===0&&tt("click",document,$h,!0)})):e(),oo(es)}const fS=K(void 0);let ya=0;function Lh(){fS.value=Date.now()}let kh=!0;function E0(e){if(!wd)return oo(K(!1));const t=K(!1);let r=null;function o(){r!==null&&window.clearTimeout(r)}function n(){o(),t.value=!0,r=window.setTimeout(()=>{t.value=!1},e)}ya===0&&mt("click",window,Lh,!0);const i=()=>{ya+=1,mt("click",window,n,!0)};return kh&&(kh=C0())?(Vo(i),xt(()=>{ya-=1,ya===0&&tt("click",window,Lh,!0),tt("click",window,n,!0),o()})):i(),oo(t)}function _0(e,t){return et(e,r=>{r!==void 0&&(t.value=r)}),q(()=>e.value===void 0?t.value:e.value)}function Ri(){const e=K(!1);return Lt(()=>{e.value=!0}),oo(e)}function hS(e,t){return q(()=>{for(const r of t)if(e[r]!==void 0)return e[r];return e[t[t.length-1]]})}const pS=(typeof window>"u"?!1:/iPad|iPhone|iPod/.test(navigator.platform)||navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1)&&!window.MSStream;function gS(){return pS}const n9="n-internal-select-menu",mS="n-internal-select-menu-body",Sd="n-modal-body",T0="n-modal",Ed="n-drawer-body",i9="n-drawer",_d="n-popover-body",$0="__disabled__";function pi(e){const t=Se(Sd,null),r=Se(Ed,null),o=Se(_d,null),n=Se(mS,null),i=K();if(typeof document<"u"){i.value=document.fullscreenElement;const s=()=>{i.value=document.fullscreenElement};Lt(()=>{mt("fullscreenchange",document,s)}),xt(()=>{tt("fullscreenchange",document,s)})}return io(()=>{var s;const{to:a}=e;return a!==void 0?a===!1?$0:a===!0?i.value||"body":a:t!=null&&t.value?(s=t.value.$el)!==null&&s!==void 0?s:t.value:r!=null&&r.value?r.value:o!=null&&o.value?o.value:n!=null&&n.value?n.value:a!=null?a:i.value||"body"})}pi.tdkey=$0;pi.propTo={type:[String,Object,Boolean],default:void 0};function pu(e,t,r="default"){const o=t[r];if(o===void 0)throw new Error(`[vueuc/${e}]: slot[${r}] is empty.`);return o()}function gu(e,t=!0,r=[]){return e.forEach(o=>{if(o!==null){if(typeof o!="object"){(typeof o=="string"||typeof o=="number")&&r.push(di(String(o)));return}if(Array.isArray(o)){gu(o,t,r);return}if(o.type===Qe){if(o.children===null)return;Array.isArray(o.children)&&gu(o.children,t,r)}else o.type!==Ft&&r.push(o)}}),r}function Ih(e,t,r="default"){const o=t[r];if(o===void 0)throw new Error(`[vueuc/${e}]: slot[${r}] is empty.`);const n=gu(o());if(n.length===1)return n[0];throw new Error(`[vueuc/${e}]: slot[${r}] should have exactly one child.`)}let mo=null;function P0(){if(mo===null&&(mo=document.getElementById("v-binder-view-measurer"),mo===null)){mo=document.createElement("div"),mo.id="v-binder-view-measurer";const{style:e}=mo;e.position="fixed",e.left="0",e.right="0",e.top="0",e.bottom="0",e.pointerEvents="none",e.visibility="hidden",document.body.appendChild(mo)}return mo.getBoundingClientRect()}function bS(e,t){const r=P0();return{top:t,left:e,height:0,width:0,right:r.width-e,bottom:r.height-t}}function wc(e){const t=e.getBoundingClientRect(),r=P0();return{left:t.left-r.left,top:t.top-r.top,bottom:r.height+r.top-t.bottom,right:r.width+r.left-t.right,width:t.width,height:t.height}}function vS(e){return e.nodeType===9?null:e.parentNode}function L0(e){if(e===null)return null;const t=vS(e);if(t===null)return null;if(t.nodeType===9)return document;if(t.nodeType===1){const{overflow:r,overflowX:o,overflowY:n}=getComputedStyle(t);if(/(auto|scroll|overlay)/.test(r+n+o))return t}return L0(t)}const yS=be({name:"Binder",props:{syncTargetWithParent:Boolean,syncTarget:{type:Boolean,default:!0}},setup(e){var t;qe("VBinder",(t=gr())===null||t===void 0?void 0:t.proxy);const r=Se("VBinder",null),o=K(null),n=g=>{o.value=g,r&&e.syncTargetWithParent&&r.setTargetRef(g)};let i=[];const s=()=>{let g=o.value;for(;g=L0(g),g!==null;)i.push(g);for(const w of i)mt("scroll",w,d,!0)},a=()=>{for(const g of i)tt("scroll",g,d,!0);i=[]},l=new Set,c=g=>{l.size===0&&s(),l.has(g)||l.add(g)},u=g=>{l.has(g)&&l.delete(g),l.size===0&&a()},d=()=>{c0(f)},f=()=>{l.forEach(g=>g())},h=new Set,p=g=>{h.size===0&&mt("resize",window,y),h.has(g)||h.add(g)},m=g=>{h.has(g)&&h.delete(g),h.size===0&&tt("resize",window,y)},y=()=>{h.forEach(g=>g())};return xt(()=>{tt("resize",window,y),a()}),{targetRef:o,setTargetRef:n,addScrollListener:c,removeScrollListener:u,addResizeListener:p,removeResizeListener:m}},render(){return pu("binder",this.$slots)}}),xS=yS,CS=be({name:"Target",setup(){const{setTargetRef:e,syncTarget:t}=Se("VBinder");return{syncTarget:t,setTargetDirective:{mounted:e,updated:e}}},render(){const{syncTarget:e,setTargetDirective:t}=this;return e?Fr(Ih("follower",this.$slots),[[t]]):Ih("follower",this.$slots)}}),Dn="@@mmoContext",wS={mounted(e,{value:t}){e[Dn]={handler:void 0},typeof t=="function"&&(e[Dn].handler=t,mt("mousemoveoutside",e,t))},updated(e,{value:t}){const r=e[Dn];typeof t=="function"?r.handler?r.handler!==t&&(tt("mousemoveoutside",e,r.handler),r.handler=t,mt("mousemoveoutside",e,t)):(e[Dn].handler=t,mt("mousemoveoutside",e,t)):r.handler&&(tt("mousemoveoutside",e,r.handler),r.handler=void 0)},unmounted(e){const{handler:t}=e[Dn];t&&tt("mousemoveoutside",e,t),e[Dn].handler=void 0}},SS=wS,zn="@@coContext",ES={mounted(e,{value:t,modifiers:r}){e[zn]={handler:void 0},typeof t=="function"&&(e[zn].handler=t,mt("clickoutside",e,t,{capture:r.capture}))},updated(e,{value:t,modifiers:r}){const o=e[zn];typeof t=="function"?o.handler?o.handler!==t&&(tt("clickoutside",e,o.handler,{capture:r.capture}),o.handler=t,mt("clickoutside",e,t,{capture:r.capture})):(e[zn].handler=t,mt("clickoutside",e,t,{capture:r.capture})):o.handler&&(tt("clickoutside",e,o.handler,{capture:r.capture}),o.handler=void 0)},unmounted(e,{modifiers:t}){const{handler:r}=e[zn];r&&tt("clickoutside",e,r,{capture:t.capture}),e[zn].handler=void 0}},mu=ES;function _S(e,t){console.error(`[vdirs/${e}]: ${t}`)}class TS{constructor(){this.elementZIndex=new Map,this.nextZIndex=2e3}get elementCount(){return this.elementZIndex.size}ensureZIndex(t,r){const{elementZIndex:o}=this;if(r!==void 0){t.style.zIndex=`${r}`,o.delete(t);return}const{nextZIndex:n}=this;o.has(t)&&o.get(t)+1===this.nextZIndex||(t.style.zIndex=`${n}`,o.set(t,n),this.nextZIndex=n+1,this.squashState())}unregister(t,r){const{elementZIndex:o}=this;o.has(t)?o.delete(t):r===void 0&&_S("z-index-manager/unregister-element","Element not found when unregistering."),this.squashState()}squashState(){const{elementCount:t}=this;t||(this.nextZIndex=2e3),this.nextZIndex-t>2500&&this.rearrange()}rearrange(){const t=Array.from(this.elementZIndex.entries());t.sort((r,o)=>r[1]-o[1]),this.nextZIndex=2e3,t.forEach(r=>{const o=r[0],n=this.nextZIndex++;`${n}`!==o.style.zIndex&&(o.style.zIndex=`${n}`)})}}const Sc=new TS,Fn="@@ziContext",$S={mounted(e,t){const{value:r={}}=t,{zIndex:o,enabled:n}=r;e[Fn]={enabled:!!n,initialized:!1},n&&(Sc.ensureZIndex(e,o),e[Fn].initialized=!0)},updated(e,t){const{value:r={}}=t,{zIndex:o,enabled:n}=r,i=e[Fn].enabled;n&&!i&&(Sc.ensureZIndex(e,o),e[Fn].initialized=!0),e[Fn].enabled=!!n},unmounted(e,t){if(!e[Fn].initialized)return;const{value:r={}}=t,{zIndex:o}=r;Sc.unregister(e,o)}},Fl=$S,k0=Symbol("@css-render/vue3-ssr");function PS(e,t){return`<style cssr-id="${e}">
${t}
</style>`}function LS(e,t){const r=Se(k0,null);if(r===null){console.error("[css-render/vue3-ssr]: no ssr context found.");return}const{styles:o,ids:n}=r;n.has(e)||o!==null&&(n.add(e),o.push(PS(e,t)))}const kS=typeof document<"u";function Vs(){if(kS)return;const e=Se(k0,null);if(e!==null)return{adapter:LS,context:e}}function Rh(e,t){console.error(`[vueuc/${e}]: ${t}`)}const{c:xa}=g0(),IS="vueuc-style";function Oh(e){return typeof e=="string"?document.querySelector(e):e()}const Td=be({name:"LazyTeleport",props:{to:{type:[String,Object],default:void 0},disabled:Boolean,show:{type:Boolean,required:!0}},setup(e){return{showTeleport:nS(Be(e,"show")),mergedTo:q(()=>{const{to:t}=e;return t!=null?t:"body"})}},render(){return this.showTeleport?this.disabled?pu("lazy-teleport",this.$slots):E(Ws,{disabled:this.disabled,to:this.mergedTo},pu("lazy-teleport",this.$slots)):null}}),Ca={top:"bottom",bottom:"top",left:"right",right:"left"},Ah={start:"end",center:"center",end:"start"},Ec={top:"height",bottom:"height",left:"width",right:"width"},RS={"bottom-start":"top left",bottom:"top center","bottom-end":"top right","top-start":"bottom left",top:"bottom center","top-end":"bottom right","right-start":"top left",right:"center left","right-end":"bottom left","left-start":"top right",left:"center right","left-end":"bottom right"},OS={"bottom-start":"bottom left",bottom:"bottom center","bottom-end":"bottom right","top-start":"top left",top:"top center","top-end":"top right","right-start":"top right",right:"center right","right-end":"bottom right","left-start":"top left",left:"center left","left-end":"bottom left"},AS={"bottom-start":"right","bottom-end":"left","top-start":"right","top-end":"left","right-start":"bottom","right-end":"top","left-start":"bottom","left-end":"top"},Bh={top:!0,bottom:!1,left:!0,right:!1},Mh={top:"end",bottom:"start",left:"end",right:"start"};function BS(e,t,r,o,n,i){if(!n||i)return{placement:e,top:0,left:0};const[s,a]=e.split("-");let l=a!=null?a:"center",c={top:0,left:0};const u=(h,p,m)=>{let y=0,g=0;const w=r[h]-t[p]-t[h];return w>0&&o&&(m?g=Bh[p]?w:-w:y=Bh[p]?w:-w),{left:y,top:g}},d=s==="left"||s==="right";if(l!=="center"){const h=AS[e],p=Ca[h],m=Ec[h];if(r[m]>t[m]){if(t[h]+t[m]<r[m]){const y=(r[m]-t[m])/2;t[h]<y||t[p]<y?t[h]<t[p]?(l=Ah[a],c=u(m,p,d)):c=u(m,h,d):l="center"}}else r[m]<t[m]&&t[p]<0&&t[h]>t[p]&&(l=Ah[a])}else{const h=s==="bottom"||s==="top"?"left":"top",p=Ca[h],m=Ec[h],y=(r[m]-t[m])/2;(t[h]<y||t[p]<y)&&(t[h]>t[p]?(l=Mh[h],c=u(m,h,d)):(l=Mh[p],c=u(m,p,d)))}let f=s;return t[s]<r[Ec[s]]&&t[s]<t[Ca[s]]&&(f=Ca[s]),{placement:l!=="center"?`${f}-${l}`:f,left:c.left,top:c.top}}function MS(e,t){return t?OS[e]:RS[e]}function HS(e,t,r,o,n,i){if(i)switch(e){case"bottom-start":return{top:`${Math.round(r.top-t.top+r.height)}px`,left:`${Math.round(r.left-t.left)}px`,transform:"translateY(-100%)"};case"bottom-end":return{top:`${Math.round(r.top-t.top+r.height)}px`,left:`${Math.round(r.left-t.left+r.width)}px`,transform:"translateX(-100%) translateY(-100%)"};case"top-start":return{top:`${Math.round(r.top-t.top)}px`,left:`${Math.round(r.left-t.left)}px`,transform:""};case"top-end":return{top:`${Math.round(r.top-t.top)}px`,left:`${Math.round(r.left-t.left+r.width)}px`,transform:"translateX(-100%)"};case"right-start":return{top:`${Math.round(r.top-t.top)}px`,left:`${Math.round(r.left-t.left+r.width)}px`,transform:"translateX(-100%)"};case"right-end":return{top:`${Math.round(r.top-t.top+r.height)}px`,left:`${Math.round(r.left-t.left+r.width)}px`,transform:"translateX(-100%) translateY(-100%)"};case"left-start":return{top:`${Math.round(r.top-t.top)}px`,left:`${Math.round(r.left-t.left)}px`,transform:""};case"left-end":return{top:`${Math.round(r.top-t.top+r.height)}px`,left:`${Math.round(r.left-t.left)}px`,transform:"translateY(-100%)"};case"top":return{top:`${Math.round(r.top-t.top)}px`,left:`${Math.round(r.left-t.left+r.width/2)}px`,transform:"translateX(-50%)"};case"right":return{top:`${Math.round(r.top-t.top+r.height/2)}px`,left:`${Math.round(r.left-t.left+r.width)}px`,transform:"translateX(-100%) translateY(-50%)"};case"left":return{top:`${Math.round(r.top-t.top+r.height/2)}px`,left:`${Math.round(r.left-t.left)}px`,transform:"translateY(-50%)"};case"bottom":default:return{top:`${Math.round(r.top-t.top+r.height)}px`,left:`${Math.round(r.left-t.left+r.width/2)}px`,transform:"translateX(-50%) translateY(-100%)"}}switch(e){case"bottom-start":return{top:`${Math.round(r.top-t.top+r.height+o)}px`,left:`${Math.round(r.left-t.left+n)}px`,transform:""};case"bottom-end":return{top:`${Math.round(r.top-t.top+r.height+o)}px`,left:`${Math.round(r.left-t.left+r.width+n)}px`,transform:"translateX(-100%)"};case"top-start":return{top:`${Math.round(r.top-t.top+o)}px`,left:`${Math.round(r.left-t.left+n)}px`,transform:"translateY(-100%)"};case"top-end":return{top:`${Math.round(r.top-t.top+o)}px`,left:`${Math.round(r.left-t.left+r.width+n)}px`,transform:"translateX(-100%) translateY(-100%)"};case"right-start":return{top:`${Math.round(r.top-t.top+o)}px`,left:`${Math.round(r.left-t.left+r.width+n)}px`,transform:""};case"right-end":return{top:`${Math.round(r.top-t.top+r.height+o)}px`,left:`${Math.round(r.left-t.left+r.width+n)}px`,transform:"translateY(-100%)"};case"left-start":return{top:`${Math.round(r.top-t.top+o)}px`,left:`${Math.round(r.left-t.left+n)}px`,transform:"translateX(-100%)"};case"left-end":return{top:`${Math.round(r.top-t.top+r.height+o)}px`,left:`${Math.round(r.left-t.left+n)}px`,transform:"translateX(-100%) translateY(-100%)"};case"top":return{top:`${Math.round(r.top-t.top+o)}px`,left:`${Math.round(r.left-t.left+r.width/2+n)}px`,transform:"translateY(-100%) translateX(-50%)"};case"right":return{top:`${Math.round(r.top-t.top+r.height/2+o)}px`,left:`${Math.round(r.left-t.left+r.width+n)}px`,transform:"translateY(-50%)"};case"left":return{top:`${Math.round(r.top-t.top+r.height/2+o)}px`,left:`${Math.round(r.left-t.left+n)}px`,transform:"translateY(-50%) translateX(-100%)"};case"bottom":default:return{top:`${Math.round(r.top-t.top+r.height+o)}px`,left:`${Math.round(r.left-t.left+r.width/2+n)}px`,transform:"translateX(-50%)"}}}const DS=xa([xa(".v-binder-follower-container",{position:"absolute",left:"0",right:"0",top:"0",height:"0",pointerEvents:"none",zIndex:"auto"}),xa(".v-binder-follower-content",{position:"absolute",zIndex:"auto"},[xa("> *",{pointerEvents:"all"})])]),zS=be({name:"Follower",inheritAttrs:!1,props:{show:Boolean,enabled:{type:Boolean,default:void 0},placement:{type:String,default:"bottom"},syncTrigger:{type:Array,default:["resize","scroll"]},to:[String,Object],flip:{type:Boolean,default:!0},internalShift:Boolean,x:Number,y:Number,width:String,minWidth:String,containerClass:String,teleportDisabled:Boolean,zindexable:{type:Boolean,default:!0},zIndex:Number,overlap:Boolean},setup(e){const t=Se("VBinder"),r=io(()=>e.enabled!==void 0?e.enabled:e.show),o=K(null),n=K(null),i=()=>{const{syncTrigger:f}=e;f.includes("scroll")&&t.addScrollListener(l),f.includes("resize")&&t.addResizeListener(l)},s=()=>{t.removeScrollListener(l),t.removeResizeListener(l)};Lt(()=>{r.value&&(l(),i())});const a=Vs();DS.mount({id:"vueuc/binder",head:!0,anchorMetaName:IS,ssr:a}),xt(()=>{s()}),sS(()=>{r.value&&l()});const l=()=>{if(!r.value)return;const f=o.value;if(f===null)return;const h=t.targetRef,{x:p,y:m,overlap:y}=e,g=p!==void 0&&m!==void 0?bS(p,m):wc(h);f.style.setProperty("--v-target-width",`${Math.round(g.width)}px`),f.style.setProperty("--v-target-height",`${Math.round(g.height)}px`);const{width:w,minWidth:T,placement:x,internalShift:C,flip:$}=e;f.setAttribute("v-placement",x),y?f.setAttribute("v-overlap",""):f.removeAttribute("v-overlap");const{style:S}=f;w==="target"?S.width=`${g.width}px`:w!==void 0?S.width=w:S.width="",T==="target"?S.minWidth=`${g.width}px`:T!==void 0?S.minWidth=T:S.minWidth="";const L=wc(f),k=wc(n.value),{left:I,top:A,placement:R}=BS(x,g,L,C,$,y),F=MS(R,y),{left:H,top:J,transform:Y}=HS(R,k,g,A,I,y);f.setAttribute("v-placement",R),f.style.setProperty("--v-offset-left",`${Math.round(I)}px`),f.style.setProperty("--v-offset-top",`${Math.round(A)}px`),f.style.transform=`translateX(${H}) translateY(${J}) ${Y}`,f.style.setProperty("--v-transform-origin",F),f.style.transformOrigin=F};et(r,f=>{f?(i(),c()):s()});const c=()=>{zt().then(l).catch(f=>console.error(f))};["placement","x","y","internalShift","flip","width","overlap","minWidth"].forEach(f=>{et(Be(e,f),l)}),["teleportDisabled"].forEach(f=>{et(Be(e,f),c)}),et(Be(e,"syncTrigger"),f=>{f.includes("resize")?t.addResizeListener(l):t.removeResizeListener(l),f.includes("scroll")?t.addScrollListener(l):t.removeScrollListener(l)});const u=Ri(),d=io(()=>{const{to:f}=e;if(f!==void 0)return f;u.value});return{VBinder:t,mergedEnabled:r,offsetContainerRef:n,followerRef:o,mergedTo:d,syncPosition:l}},render(){return E(Td,{show:this.show,to:this.mergedTo,disabled:this.teleportDisabled},{default:()=>{var e,t;const r=E("div",{class:["v-binder-follower-container",this.containerClass],ref:"offsetContainerRef"},[E("div",{class:"v-binder-follower-content",ref:"followerRef"},(t=(e=this.$slots).default)===null||t===void 0?void 0:t.call(e))]);return this.zindexable?Fr(r,[[Fl,{enabled:this.mergedEnabled,zIndex:this.zIndex}]]):r}})}});var wn=[],FS=function(){return wn.some(function(e){return e.activeTargets.length>0})},NS=function(){return wn.some(function(e){return e.skippedTargets.length>0})},Hh="ResizeObserver loop completed with undelivered notifications.",jS=function(){var e;typeof ErrorEvent=="function"?e=new ErrorEvent("error",{message:Hh}):(e=document.createEvent("Event"),e.initEvent("error",!1,!1),e.message=Hh),window.dispatchEvent(e)},Rs;(function(e){e.BORDER_BOX="border-box",e.CONTENT_BOX="content-box",e.DEVICE_PIXEL_CONTENT_BOX="device-pixel-content-box"})(Rs||(Rs={}));var Sn=function(e){return Object.freeze(e)},WS=function(){function e(t,r){this.inlineSize=t,this.blockSize=r,Sn(this)}return e}(),I0=function(){function e(t,r,o,n){return this.x=t,this.y=r,this.width=o,this.height=n,this.top=this.y,this.left=this.x,this.bottom=this.top+this.height,this.right=this.left+this.width,Sn(this)}return e.prototype.toJSON=function(){var t=this,r=t.x,o=t.y,n=t.top,i=t.right,s=t.bottom,a=t.left,l=t.width,c=t.height;return{x:r,y:o,top:n,right:i,bottom:s,left:a,width:l,height:c}},e.fromRect=function(t){return new e(t.x,t.y,t.width,t.height)},e}(),$d=function(e){return e instanceof SVGElement&&"getBBox"in e},R0=function(e){if($d(e)){var t=e.getBBox(),r=t.width,o=t.height;return!r&&!o}var n=e,i=n.offsetWidth,s=n.offsetHeight;return!(i||s||e.getClientRects().length)},Dh=function(e){var t;if(e instanceof Element)return!0;var r=(t=e==null?void 0:e.ownerDocument)===null||t===void 0?void 0:t.defaultView;return!!(r&&e instanceof r.Element)},US=function(e){switch(e.tagName){case"INPUT":if(e.type!=="image")break;case"VIDEO":case"AUDIO":case"EMBED":case"OBJECT":case"CANVAS":case"IFRAME":case"IMG":return!0}return!1},cs=typeof window<"u"?window:{},wa=new WeakMap,zh=/auto|scroll/,VS=/^tb|vertical/,KS=/msie|trident/i.test(cs.navigator&&cs.navigator.userAgent),Lr=function(e){return parseFloat(e||"0")},ri=function(e,t,r){return e===void 0&&(e=0),t===void 0&&(t=0),r===void 0&&(r=!1),new WS((r?t:e)||0,(r?e:t)||0)},Fh=Sn({devicePixelContentBoxSize:ri(),borderBoxSize:ri(),contentBoxSize:ri(),contentRect:new I0(0,0,0,0)}),O0=function(e,t){if(t===void 0&&(t=!1),wa.has(e)&&!t)return wa.get(e);if(R0(e))return wa.set(e,Fh),Fh;var r=getComputedStyle(e),o=$d(e)&&e.ownerSVGElement&&e.getBBox(),n=!KS&&r.boxSizing==="border-box",i=VS.test(r.writingMode||""),s=!o&&zh.test(r.overflowY||""),a=!o&&zh.test(r.overflowX||""),l=o?0:Lr(r.paddingTop),c=o?0:Lr(r.paddingRight),u=o?0:Lr(r.paddingBottom),d=o?0:Lr(r.paddingLeft),f=o?0:Lr(r.borderTopWidth),h=o?0:Lr(r.borderRightWidth),p=o?0:Lr(r.borderBottomWidth),m=o?0:Lr(r.borderLeftWidth),y=d+c,g=l+u,w=m+h,T=f+p,x=a?e.offsetHeight-T-e.clientHeight:0,C=s?e.offsetWidth-w-e.clientWidth:0,$=n?y+w:0,S=n?g+T:0,L=o?o.width:Lr(r.width)-$-C,k=o?o.height:Lr(r.height)-S-x,I=L+y+C+w,A=k+g+x+T,R=Sn({devicePixelContentBoxSize:ri(Math.round(L*devicePixelRatio),Math.round(k*devicePixelRatio),i),borderBoxSize:ri(I,A,i),contentBoxSize:ri(L,k,i),contentRect:new I0(d,l,L,k)});return wa.set(e,R),R},A0=function(e,t,r){var o=O0(e,r),n=o.borderBoxSize,i=o.contentBoxSize,s=o.devicePixelContentBoxSize;switch(t){case Rs.DEVICE_PIXEL_CONTENT_BOX:return s;case Rs.BORDER_BOX:return n;default:return i}},qS=function(){function e(t){var r=O0(t);this.target=t,this.contentRect=r.contentRect,this.borderBoxSize=Sn([r.borderBoxSize]),this.contentBoxSize=Sn([r.contentBoxSize]),this.devicePixelContentBoxSize=Sn([r.devicePixelContentBoxSize])}return e}(),B0=function(e){if(R0(e))return 1/0;for(var t=0,r=e.parentNode;r;)t+=1,r=r.parentNode;return t},GS=function(){var e=1/0,t=[];wn.forEach(function(s){if(s.activeTargets.length!==0){var a=[];s.activeTargets.forEach(function(c){var u=new qS(c.target),d=B0(c.target);a.push(u),c.lastReportedSize=A0(c.target,c.observedBox),d<e&&(e=d)}),t.push(function(){s.callback.call(s.observer,a,s.observer)}),s.activeTargets.splice(0,s.activeTargets.length)}});for(var r=0,o=t;r<o.length;r++){var n=o[r];n()}return e},Nh=function(e){wn.forEach(function(r){r.activeTargets.splice(0,r.activeTargets.length),r.skippedTargets.splice(0,r.skippedTargets.length),r.observationTargets.forEach(function(n){n.isActive()&&(B0(n.target)>e?r.activeTargets.push(n):r.skippedTargets.push(n))})})},XS=function(){var e=0;for(Nh(e);FS();)e=GS(),Nh(e);return NS()&&jS(),e>0},_c,M0=[],YS=function(){return M0.splice(0).forEach(function(e){return e()})},ZS=function(e){if(!_c){var t=0,r=document.createTextNode(""),o={characterData:!0};new MutationObserver(function(){return YS()}).observe(r,o),_c=function(){r.textContent="".concat(t?t--:t++)}}M0.push(e),_c()},JS=function(e){ZS(function(){requestAnimationFrame(e)})},qa=0,QS=function(){return!!qa},eE=250,tE={attributes:!0,characterData:!0,childList:!0,subtree:!0},jh=["resize","load","transitionend","animationend","animationstart","animationiteration","keyup","keydown","mouseup","mousedown","mouseover","mouseout","blur","focus"],Wh=function(e){return e===void 0&&(e=0),Date.now()+e},Tc=!1,rE=function(){function e(){var t=this;this.stopped=!0,this.listener=function(){return t.schedule()}}return e.prototype.run=function(t){var r=this;if(t===void 0&&(t=eE),!Tc){Tc=!0;var o=Wh(t);JS(function(){var n=!1;try{n=XS()}finally{if(Tc=!1,t=o-Wh(),!QS())return;n?r.run(1e3):t>0?r.run(t):r.start()}})}},e.prototype.schedule=function(){this.stop(),this.run()},e.prototype.observe=function(){var t=this,r=function(){return t.observer&&t.observer.observe(document.body,tE)};document.body?r():cs.addEventListener("DOMContentLoaded",r)},e.prototype.start=function(){var t=this;this.stopped&&(this.stopped=!1,this.observer=new MutationObserver(this.listener),this.observe(),jh.forEach(function(r){return cs.addEventListener(r,t.listener,!0)}))},e.prototype.stop=function(){var t=this;this.stopped||(this.observer&&this.observer.disconnect(),jh.forEach(function(r){return cs.removeEventListener(r,t.listener,!0)}),this.stopped=!0)},e}(),bu=new rE,Uh=function(e){!qa&&e>0&&bu.start(),qa+=e,!qa&&bu.stop()},oE=function(e){return!$d(e)&&!US(e)&&getComputedStyle(e).display==="inline"},nE=function(){function e(t,r){this.target=t,this.observedBox=r||Rs.CONTENT_BOX,this.lastReportedSize={inlineSize:0,blockSize:0}}return e.prototype.isActive=function(){var t=A0(this.target,this.observedBox,!0);return oE(this.target)&&(this.lastReportedSize=t),this.lastReportedSize.inlineSize!==t.inlineSize||this.lastReportedSize.blockSize!==t.blockSize},e}(),iE=function(){function e(t,r){this.activeTargets=[],this.skippedTargets=[],this.observationTargets=[],this.observer=t,this.callback=r}return e}(),Sa=new WeakMap,Vh=function(e,t){for(var r=0;r<e.length;r+=1)if(e[r].target===t)return r;return-1},Ea=function(){function e(){}return e.connect=function(t,r){var o=new iE(t,r);Sa.set(t,o)},e.observe=function(t,r,o){var n=Sa.get(t),i=n.observationTargets.length===0;Vh(n.observationTargets,r)<0&&(i&&wn.push(n),n.observationTargets.push(new nE(r,o&&o.box)),Uh(1),bu.schedule())},e.unobserve=function(t,r){var o=Sa.get(t),n=Vh(o.observationTargets,r),i=o.observationTargets.length===1;n>=0&&(i&&wn.splice(wn.indexOf(o),1),o.observationTargets.splice(n,1),Uh(-1))},e.disconnect=function(t){var r=this,o=Sa.get(t);o.observationTargets.slice().forEach(function(n){return r.unobserve(t,n.target)}),o.activeTargets.splice(0,o.activeTargets.length)},e}(),sE=function(){function e(t){if(arguments.length===0)throw new TypeError("Failed to construct 'ResizeObserver': 1 argument required, but only 0 present.");if(typeof t!="function")throw new TypeError("Failed to construct 'ResizeObserver': The callback provided as parameter 1 is not a function.");Ea.connect(this,t)}return e.prototype.observe=function(t,r){if(arguments.length===0)throw new TypeError("Failed to execute 'observe' on 'ResizeObserver': 1 argument required, but only 0 present.");if(!Dh(t))throw new TypeError("Failed to execute 'observe' on 'ResizeObserver': parameter 1 is not of type 'Element");Ea.observe(this,t,r)},e.prototype.unobserve=function(t){if(arguments.length===0)throw new TypeError("Failed to execute 'unobserve' on 'ResizeObserver': 1 argument required, but only 0 present.");if(!Dh(t))throw new TypeError("Failed to execute 'unobserve' on 'ResizeObserver': parameter 1 is not of type 'Element");Ea.unobserve(this,t)},e.prototype.disconnect=function(){Ea.disconnect(this)},e.toString=function(){return"function ResizeObserver () { [polyfill code] }"},e}();class aE{constructor(){this.handleResize=this.handleResize.bind(this),this.observer=new(typeof window<"u"&&window.ResizeObserver||sE)(this.handleResize),this.elHandlersMap=new Map}handleResize(t){for(const r of t){const o=this.elHandlersMap.get(r.target);o!==void 0&&o(r)}}registerHandler(t,r){this.elHandlersMap.set(t,r),this.observer.observe(t)}unregisterHandler(t){!this.elHandlersMap.has(t)||(this.elHandlersMap.delete(t),this.observer.unobserve(t))}}const Kh=new aE,qh=be({name:"ResizeObserver",props:{onResize:Function},setup(e){let t=!1;const r=gr().proxy;function o(n){const{onResize:i}=e;i!==void 0&&i(n)}Lt(()=>{const n=r.$el;if(n===void 0){Rh("resize-observer","$el does not exist.");return}if(n.nextElementSibling!==n.nextSibling&&n.nodeType===3&&n.nodeValue!==""){Rh("resize-observer","$el can not be observed (it may be a text node).");return}n.nextElementSibling!==null&&(Kh.registerHandler(n.nextElementSibling,o),t=!0)}),xt(()=>{t&&Kh.unregisterHandler(r.$el.nextElementSibling)})},render(){return md(this.$slots,"default")}});function H0(e){return e instanceof HTMLElement}function D0(e){for(let t=0;t<e.childNodes.length;t++){const r=e.childNodes[t];if(H0(r)&&(F0(r)||D0(r)))return!0}return!1}function z0(e){for(let t=e.childNodes.length-1;t>=0;t--){const r=e.childNodes[t];if(H0(r)&&(F0(r)||z0(r)))return!0}return!1}function F0(e){if(!lE(e))return!1;try{e.focus({preventScroll:!0})}catch{}return document.activeElement===e}function lE(e){if(e.tabIndex>0||e.tabIndex===0&&e.getAttribute("tabIndex")!==null)return!0;if(e.getAttribute("disabled"))return!1;switch(e.nodeName){case"A":return!!e.href&&e.rel!=="ignore";case"INPUT":return e.type!=="hidden"&&e.type!=="file";case"BUTTON":case"SELECT":case"TEXTAREA":return!0;default:return!1}}let ji=[];const N0=be({name:"FocusTrap",props:{disabled:Boolean,active:Boolean,autoFocus:{type:Boolean,default:!0},onEsc:Function,initialFocusTo:String,finalFocusTo:String,returnFocusOnDeactivated:{type:Boolean,default:!0}},setup(e){const t=_n(),r=K(null),o=K(null);let n=!1,i=!1;const s=typeof document>"u"?null:document.activeElement;function a(){return ji[ji.length-1]===t}function l(y){var g;y.code==="Escape"&&a()&&((g=e.onEsc)===null||g===void 0||g.call(e,y))}Lt(()=>{et(()=>e.active,y=>{y?(d(),mt("keydown",document,l)):(tt("keydown",document,l),n&&f())},{immediate:!0})}),xt(()=>{tt("keydown",document,l),n&&f()});function c(y){if(!i&&a()){const g=u();if(g===null||g.contains(Ps(y)))return;h("first")}}function u(){const y=r.value;if(y===null)return null;let g=y;for(;g=g.nextSibling,!(g===null||g instanceof Element&&g.tagName==="DIV"););return g}function d(){var y;if(!e.disabled){if(ji.push(t),e.autoFocus){const{initialFocusTo:g}=e;g===void 0?h("first"):(y=Oh(g))===null||y===void 0||y.focus({preventScroll:!0})}n=!0,document.addEventListener("focus",c,!0)}}function f(){var y;if(e.disabled||(document.removeEventListener("focus",c,!0),ji=ji.filter(w=>w!==t),a()))return;const{finalFocusTo:g}=e;g!==void 0?(y=Oh(g))===null||y===void 0||y.focus({preventScroll:!0}):e.returnFocusOnDeactivated&&s instanceof HTMLElement&&(i=!0,s.focus({preventScroll:!0}),i=!1)}function h(y){if(!!a()&&e.active){const g=r.value,w=o.value;if(g!==null&&w!==null){const T=u();if(T==null||T===w){i=!0,g.focus({preventScroll:!0}),i=!1;return}i=!0;const x=y==="first"?D0(T):z0(T);i=!1,x||(i=!0,g.focus({preventScroll:!0}),i=!1)}}}function p(y){if(i)return;const g=u();g!==null&&(y.relatedTarget!==null&&g.contains(y.relatedTarget)?h("last"):h("first"))}function m(y){i||(y.relatedTarget!==null&&y.relatedTarget===r.value?h("last"):h("first"))}return{focusableStartRef:r,focusableEndRef:o,focusableStyle:"position: absolute; height: 0; width: 0;",handleStartFocus:p,handleEndFocus:m}},render(){const{default:e}=this.$slots;if(e===void 0)return null;if(this.disabled)return e();const{active:t,focusableStyle:r}=this;return E(Qe,null,[E("div",{"aria-hidden":"true",tabindex:t?"0":"-1",ref:"focusableStartRef",style:r,onFocus:this.handleStartFocus}),e(),E("div",{"aria-hidden":"true",style:r,ref:"focusableEndRef",tabindex:t?"0":"-1",onFocus:this.handleEndFocus})])}});let Nn=0,Gh="",Xh="",Yh="",Zh="";const Jh=K("0px");function cE(e){if(typeof document>"u")return;const t=document.documentElement;let r,o=!1;const n=()=>{t.style.marginRight=Gh,t.style.overflow=Xh,t.style.overflowX=Yh,t.style.overflowY=Zh,Jh.value="0px"};Lt(()=>{r=et(e,i=>{if(i){if(!Nn){const s=window.innerWidth-t.offsetWidth;s>0&&(Gh=t.style.marginRight,t.style.marginRight=`${s}px`,Jh.value=`${s}px`),Xh=t.style.overflow,Yh=t.style.overflowX,Zh=t.style.overflowY,t.style.overflow="hidden",t.style.overflowX="hidden",t.style.overflowY="hidden"}o=!0,Nn++}else Nn--,Nn||n(),o=!1},{immediate:!0})}),xt(()=>{r==null||r(),o&&(Nn--,Nn||n(),o=!1)})}const Pd=K(!1),Qh=()=>{Pd.value=!0},ep=()=>{Pd.value=!1};let Wi=0;const uE=()=>(In&&(Vo(()=>{Wi||(window.addEventListener("compositionstart",Qh),window.addEventListener("compositionend",ep)),Wi++}),xt(()=>{Wi<=1?(window.removeEventListener("compositionstart",Qh),window.removeEventListener("compositionend",ep),Wi=0):Wi--})),Pd);function dE(e){const t={isDeactivated:!1};let r=!1;return zm(()=>{if(t.isDeactivated=!1,!r){r=!0;return}e()}),Fm(()=>{t.isDeactivated=!0,r||(r=!0)}),t}const tp="n-form-item";function j0(e,{defaultSize:t="medium",mergedSize:r,mergedDisabled:o}={}){const n=Se(tp,null);qe(tp,null);const i=q(r?()=>r(n):()=>{const{size:l}=e;if(l)return l;if(n){const{mergedSize:c}=n;if(c.value!==void 0)return c.value}return t}),s=q(o?()=>o(n):()=>{const{disabled:l}=e;return l!==void 0?l:n?n.disabled.value:!1}),a=q(()=>{const{status:l}=e;return l||(n==null?void 0:n.mergedValidationStatus.value)});return xt(()=>{n&&n.restoreValidation()}),{mergedSizeRef:i,mergedDisabledRef:s,mergedStatusRef:a,nTriggerFormBlur(){n&&n.handleContentBlur()},nTriggerFormChange(){n&&n.handleContentChange()},nTriggerFormFocus(){n&&n.handleContentFocus()},nTriggerFormInput(){n&&n.handleContentInput()}}}var fE=typeof global=="object"&&global&&global.Object===Object&&global;const W0=fE;var hE=typeof self=="object"&&self&&self.Object===Object&&self,pE=W0||hE||Function("return this")();const jr=pE;var gE=jr.Symbol;const No=gE;var U0=Object.prototype,mE=U0.hasOwnProperty,bE=U0.toString,Ui=No?No.toStringTag:void 0;function vE(e){var t=mE.call(e,Ui),r=e[Ui];try{e[Ui]=void 0;var o=!0}catch{}var n=bE.call(e);return o&&(t?e[Ui]=r:delete e[Ui]),n}var yE=Object.prototype,xE=yE.toString;function CE(e){return xE.call(e)}var wE="[object Null]",SE="[object Undefined]",rp=No?No.toStringTag:void 0;function Rn(e){return e==null?e===void 0?SE:wE:rp&&rp in Object(e)?vE(e):CE(e)}function jo(e){return e!=null&&typeof e=="object"}var EE="[object Symbol]";function Ld(e){return typeof e=="symbol"||jo(e)&&Rn(e)==EE}function V0(e,t){for(var r=-1,o=e==null?0:e.length,n=Array(o);++r<o;)n[r]=t(e[r],r,e);return n}var _E=Array.isArray;const mr=_E;var TE=1/0,op=No?No.prototype:void 0,np=op?op.toString:void 0;function K0(e){if(typeof e=="string")return e;if(mr(e))return V0(e,K0)+"";if(Ld(e))return np?np.call(e):"";var t=e+"";return t=="0"&&1/e==-TE?"-0":t}function Ko(e){var t=typeof e;return e!=null&&(t=="object"||t=="function")}function kd(e){return e}var $E="[object AsyncFunction]",PE="[object Function]",LE="[object GeneratorFunction]",kE="[object Proxy]";function Id(e){if(!Ko(e))return!1;var t=Rn(e);return t==PE||t==LE||t==$E||t==kE}var IE=jr["__core-js_shared__"];const $c=IE;var ip=function(){var e=/[^.]+$/.exec($c&&$c.keys&&$c.keys.IE_PROTO||"");return e?"Symbol(src)_1."+e:""}();function RE(e){return!!ip&&ip in e}var OE=Function.prototype,AE=OE.toString;function On(e){if(e!=null){try{return AE.call(e)}catch{}try{return e+""}catch{}}return""}var BE=/[\\^$.*+?()[\]{}|]/g,ME=/^\[object .+?Constructor\]$/,HE=Function.prototype,DE=Object.prototype,zE=HE.toString,FE=DE.hasOwnProperty,NE=RegExp("^"+zE.call(FE).replace(BE,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");function jE(e){if(!Ko(e)||RE(e))return!1;var t=Id(e)?NE:ME;return t.test(On(e))}function WE(e,t){return e==null?void 0:e[t]}function An(e,t){var r=WE(e,t);return jE(r)?r:void 0}var UE=An(jr,"WeakMap");const vu=UE;var sp=Object.create,VE=function(){function e(){}return function(t){if(!Ko(t))return{};if(sp)return sp(t);e.prototype=t;var r=new e;return e.prototype=void 0,r}}();const KE=VE;function qE(e,t,r){switch(r.length){case 0:return e.call(t);case 1:return e.call(t,r[0]);case 2:return e.call(t,r[0],r[1]);case 3:return e.call(t,r[0],r[1],r[2])}return e.apply(t,r)}function GE(e,t){var r=-1,o=e.length;for(t||(t=Array(o));++r<o;)t[r]=e[r];return t}var XE=800,YE=16,ZE=Date.now;function JE(e){var t=0,r=0;return function(){var o=ZE(),n=YE-(o-r);if(r=o,n>0){if(++t>=XE)return arguments[0]}else t=0;return e.apply(void 0,arguments)}}function QE(e){return function(){return e}}var e_=function(){try{var e=An(Object,"defineProperty");return e({},"",{}),e}catch{}}();const al=e_;var t_=al?function(e,t){return al(e,"toString",{configurable:!0,enumerable:!1,value:QE(t),writable:!0})}:kd;const r_=t_;var o_=JE(r_);const n_=o_;var i_=9007199254740991,s_=/^(?:0|[1-9]\d*)$/;function Rd(e,t){var r=typeof e;return t=t==null?i_:t,!!t&&(r=="number"||r!="symbol"&&s_.test(e))&&e>-1&&e%1==0&&e<t}function Od(e,t,r){t=="__proto__"&&al?al(e,t,{configurable:!0,enumerable:!0,value:r,writable:!0}):e[t]=r}function Ks(e,t){return e===t||e!==e&&t!==t}var a_=Object.prototype,l_=a_.hasOwnProperty;function c_(e,t,r){var o=e[t];(!(l_.call(e,t)&&Ks(o,r))||r===void 0&&!(t in e))&&Od(e,t,r)}function u_(e,t,r,o){var n=!r;r||(r={});for(var i=-1,s=t.length;++i<s;){var a=t[i],l=o?o(r[a],e[a],a,r,e):void 0;l===void 0&&(l=e[a]),n?Od(r,a,l):c_(r,a,l)}return r}var ap=Math.max;function d_(e,t,r){return t=ap(t===void 0?e.length-1:t,0),function(){for(var o=arguments,n=-1,i=ap(o.length-t,0),s=Array(i);++n<i;)s[n]=o[t+n];n=-1;for(var a=Array(t+1);++n<t;)a[n]=o[n];return a[t]=r(s),qE(e,this,a)}}function f_(e,t){return n_(d_(e,t,kd),e+"")}var h_=9007199254740991;function Ad(e){return typeof e=="number"&&e>-1&&e%1==0&&e<=h_}function Oi(e){return e!=null&&Ad(e.length)&&!Id(e)}function p_(e,t,r){if(!Ko(r))return!1;var o=typeof t;return(o=="number"?Oi(r)&&Rd(t,r.length):o=="string"&&t in r)?Ks(r[t],e):!1}function g_(e){return f_(function(t,r){var o=-1,n=r.length,i=n>1?r[n-1]:void 0,s=n>2?r[2]:void 0;for(i=e.length>3&&typeof i=="function"?(n--,i):void 0,s&&p_(r[0],r[1],s)&&(i=n<3?void 0:i,n=1),t=Object(t);++o<n;){var a=r[o];a&&e(t,a,o,i)}return t})}var m_=Object.prototype;function Bd(e){var t=e&&e.constructor,r=typeof t=="function"&&t.prototype||m_;return e===r}function b_(e,t){for(var r=-1,o=Array(e);++r<e;)o[r]=t(r);return o}var v_="[object Arguments]";function lp(e){return jo(e)&&Rn(e)==v_}var q0=Object.prototype,y_=q0.hasOwnProperty,x_=q0.propertyIsEnumerable,C_=lp(function(){return arguments}())?lp:function(e){return jo(e)&&y_.call(e,"callee")&&!x_.call(e,"callee")};const ll=C_;function w_(){return!1}var G0=typeof exports=="object"&&exports&&!exports.nodeType&&exports,cp=G0&&typeof module=="object"&&module&&!module.nodeType&&module,S_=cp&&cp.exports===G0,up=S_?jr.Buffer:void 0,E_=up?up.isBuffer:void 0,__=E_||w_;const cl=__;var T_="[object Arguments]",$_="[object Array]",P_="[object Boolean]",L_="[object Date]",k_="[object Error]",I_="[object Function]",R_="[object Map]",O_="[object Number]",A_="[object Object]",B_="[object RegExp]",M_="[object Set]",H_="[object String]",D_="[object WeakMap]",z_="[object ArrayBuffer]",F_="[object DataView]",N_="[object Float32Array]",j_="[object Float64Array]",W_="[object Int8Array]",U_="[object Int16Array]",V_="[object Int32Array]",K_="[object Uint8Array]",q_="[object Uint8ClampedArray]",G_="[object Uint16Array]",X_="[object Uint32Array]",it={};it[N_]=it[j_]=it[W_]=it[U_]=it[V_]=it[K_]=it[q_]=it[G_]=it[X_]=!0;it[T_]=it[$_]=it[z_]=it[P_]=it[F_]=it[L_]=it[k_]=it[I_]=it[R_]=it[O_]=it[A_]=it[B_]=it[M_]=it[H_]=it[D_]=!1;function Y_(e){return jo(e)&&Ad(e.length)&&!!it[Rn(e)]}function Z_(e){return function(t){return e(t)}}var X0=typeof exports=="object"&&exports&&!exports.nodeType&&exports,us=X0&&typeof module=="object"&&module&&!module.nodeType&&module,J_=us&&us.exports===X0,Pc=J_&&W0.process,Q_=function(){try{var e=us&&us.require&&us.require("util").types;return e||Pc&&Pc.binding&&Pc.binding("util")}catch{}}();const dp=Q_;var fp=dp&&dp.isTypedArray,e5=fp?Z_(fp):Y_;const Md=e5;var t5=Object.prototype,r5=t5.hasOwnProperty;function Y0(e,t){var r=mr(e),o=!r&&ll(e),n=!r&&!o&&cl(e),i=!r&&!o&&!n&&Md(e),s=r||o||n||i,a=s?b_(e.length,String):[],l=a.length;for(var c in e)(t||r5.call(e,c))&&!(s&&(c=="length"||n&&(c=="offset"||c=="parent")||i&&(c=="buffer"||c=="byteLength"||c=="byteOffset")||Rd(c,l)))&&a.push(c);return a}function Z0(e,t){return function(r){return e(t(r))}}var o5=Z0(Object.keys,Object);const n5=o5;var i5=Object.prototype,s5=i5.hasOwnProperty;function a5(e){if(!Bd(e))return n5(e);var t=[];for(var r in Object(e))s5.call(e,r)&&r!="constructor"&&t.push(r);return t}function Hd(e){return Oi(e)?Y0(e):a5(e)}function l5(e){var t=[];if(e!=null)for(var r in Object(e))t.push(r);return t}var c5=Object.prototype,u5=c5.hasOwnProperty;function d5(e){if(!Ko(e))return l5(e);var t=Bd(e),r=[];for(var o in e)o=="constructor"&&(t||!u5.call(e,o))||r.push(o);return r}function J0(e){return Oi(e)?Y0(e,!0):d5(e)}var f5=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,h5=/^\w*$/;function Dd(e,t){if(mr(e))return!1;var r=typeof e;return r=="number"||r=="symbol"||r=="boolean"||e==null||Ld(e)?!0:h5.test(e)||!f5.test(e)||t!=null&&e in Object(t)}var p5=An(Object,"create");const Os=p5;function g5(){this.__data__=Os?Os(null):{},this.size=0}function m5(e){var t=this.has(e)&&delete this.__data__[e];return this.size-=t?1:0,t}var b5="__lodash_hash_undefined__",v5=Object.prototype,y5=v5.hasOwnProperty;function x5(e){var t=this.__data__;if(Os){var r=t[e];return r===b5?void 0:r}return y5.call(t,e)?t[e]:void 0}var C5=Object.prototype,w5=C5.hasOwnProperty;function S5(e){var t=this.__data__;return Os?t[e]!==void 0:w5.call(t,e)}var E5="__lodash_hash_undefined__";function _5(e,t){var r=this.__data__;return this.size+=this.has(e)?0:1,r[e]=Os&&t===void 0?E5:t,this}function Tn(e){var t=-1,r=e==null?0:e.length;for(this.clear();++t<r;){var o=e[t];this.set(o[0],o[1])}}Tn.prototype.clear=g5;Tn.prototype.delete=m5;Tn.prototype.get=x5;Tn.prototype.has=S5;Tn.prototype.set=_5;function T5(){this.__data__=[],this.size=0}function Nl(e,t){for(var r=e.length;r--;)if(Ks(e[r][0],t))return r;return-1}var $5=Array.prototype,P5=$5.splice;function L5(e){var t=this.__data__,r=Nl(t,e);if(r<0)return!1;var o=t.length-1;return r==o?t.pop():P5.call(t,r,1),--this.size,!0}function k5(e){var t=this.__data__,r=Nl(t,e);return r<0?void 0:t[r][1]}function I5(e){return Nl(this.__data__,e)>-1}function R5(e,t){var r=this.__data__,o=Nl(r,e);return o<0?(++this.size,r.push([e,t])):r[o][1]=t,this}function lo(e){var t=-1,r=e==null?0:e.length;for(this.clear();++t<r;){var o=e[t];this.set(o[0],o[1])}}lo.prototype.clear=T5;lo.prototype.delete=L5;lo.prototype.get=k5;lo.prototype.has=I5;lo.prototype.set=R5;var O5=An(jr,"Map");const As=O5;function A5(){this.size=0,this.__data__={hash:new Tn,map:new(As||lo),string:new Tn}}function B5(e){var t=typeof e;return t=="string"||t=="number"||t=="symbol"||t=="boolean"?e!=="__proto__":e===null}function jl(e,t){var r=e.__data__;return B5(t)?r[typeof t=="string"?"string":"hash"]:r.map}function M5(e){var t=jl(this,e).delete(e);return this.size-=t?1:0,t}function H5(e){return jl(this,e).get(e)}function D5(e){return jl(this,e).has(e)}function z5(e,t){var r=jl(this,e),o=r.size;return r.set(e,t),this.size+=r.size==o?0:1,this}function co(e){var t=-1,r=e==null?0:e.length;for(this.clear();++t<r;){var o=e[t];this.set(o[0],o[1])}}co.prototype.clear=A5;co.prototype.delete=M5;co.prototype.get=H5;co.prototype.has=D5;co.prototype.set=z5;var F5="Expected a function";function zd(e,t){if(typeof e!="function"||t!=null&&typeof t!="function")throw new TypeError(F5);var r=function(){var o=arguments,n=t?t.apply(this,o):o[0],i=r.cache;if(i.has(n))return i.get(n);var s=e.apply(this,o);return r.cache=i.set(n,s)||i,s};return r.cache=new(zd.Cache||co),r}zd.Cache=co;var N5=500;function j5(e){var t=zd(e,function(o){return r.size===N5&&r.clear(),o}),r=t.cache;return t}var W5=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,U5=/\\(\\)?/g,V5=j5(function(e){var t=[];return e.charCodeAt(0)===46&&t.push(""),e.replace(W5,function(r,o,n,i){t.push(n?i.replace(U5,"$1"):o||r)}),t});const K5=V5;function Wl(e){return e==null?"":K0(e)}function Q0(e,t){return mr(e)?e:Dd(e,t)?[e]:K5(Wl(e))}var q5=1/0;function Ul(e){if(typeof e=="string"||Ld(e))return e;var t=e+"";return t=="0"&&1/e==-q5?"-0":t}function eb(e,t){t=Q0(t,e);for(var r=0,o=t.length;e!=null&&r<o;)e=e[Ul(t[r++])];return r&&r==o?e:void 0}function G5(e,t,r){var o=e==null?void 0:eb(e,t);return o===void 0?r:o}function X5(e,t){for(var r=-1,o=t.length,n=e.length;++r<o;)e[n+r]=t[r];return e}var Y5=Z0(Object.getPrototypeOf,Object);const tb=Y5;var Z5="[object Object]",J5=Function.prototype,Q5=Object.prototype,rb=J5.toString,e3=Q5.hasOwnProperty,t3=rb.call(Object);function r3(e){if(!jo(e)||Rn(e)!=Z5)return!1;var t=tb(e);if(t===null)return!0;var r=e3.call(t,"constructor")&&t.constructor;return typeof r=="function"&&r instanceof r&&rb.call(r)==t3}function o3(e,t,r){var o=-1,n=e.length;t<0&&(t=-t>n?0:n+t),r=r>n?n:r,r<0&&(r+=n),n=t>r?0:r-t>>>0,t>>>=0;for(var i=Array(n);++o<n;)i[o]=e[o+t];return i}function n3(e,t,r){var o=e.length;return r=r===void 0?o:r,!t&&r>=o?e:o3(e,t,r)}var i3="\\ud800-\\udfff",s3="\\u0300-\\u036f",a3="\\ufe20-\\ufe2f",l3="\\u20d0-\\u20ff",c3=s3+a3+l3,u3="\\ufe0e\\ufe0f",d3="\\u200d",f3=RegExp("["+d3+i3+c3+u3+"]");function ob(e){return f3.test(e)}function h3(e){return e.split("")}var nb="\\ud800-\\udfff",p3="\\u0300-\\u036f",g3="\\ufe20-\\ufe2f",m3="\\u20d0-\\u20ff",b3=p3+g3+m3,v3="\\ufe0e\\ufe0f",y3="["+nb+"]",yu="["+b3+"]",xu="\\ud83c[\\udffb-\\udfff]",x3="(?:"+yu+"|"+xu+")",ib="[^"+nb+"]",sb="(?:\\ud83c[\\udde6-\\uddff]){2}",ab="[\\ud800-\\udbff][\\udc00-\\udfff]",C3="\\u200d",lb=x3+"?",cb="["+v3+"]?",w3="(?:"+C3+"(?:"+[ib,sb,ab].join("|")+")"+cb+lb+")*",S3=cb+lb+w3,E3="(?:"+[ib+yu+"?",yu,sb,ab,y3].join("|")+")",_3=RegExp(xu+"(?="+xu+")|"+E3+S3,"g");function T3(e){return e.match(_3)||[]}function $3(e){return ob(e)?T3(e):h3(e)}function P3(e){return function(t){t=Wl(t);var r=ob(t)?$3(t):void 0,o=r?r[0]:t.charAt(0),n=r?n3(r,1).join(""):t.slice(1);return o[e]()+n}}var L3=P3("toUpperCase");const k3=L3;function I3(e,t,r,o){var n=-1,i=e==null?0:e.length;for(o&&i&&(r=e[++n]);++n<i;)r=t(r,e[n],n,e);return r}function R3(e){return function(t){return e==null?void 0:e[t]}}var O3={\u00C0:"A",\u00C1:"A",\u00C2:"A",\u00C3:"A",\u00C4:"A",\u00C5:"A",\u00E0:"a",\u00E1:"a",\u00E2:"a",\u00E3:"a",\u00E4:"a",\u00E5:"a",\u00C7:"C",\u00E7:"c",\u00D0:"D",\u00F0:"d",\u00C8:"E",\u00C9:"E",\u00CA:"E",\u00CB:"E",\u00E8:"e",\u00E9:"e",\u00EA:"e",\u00EB:"e",\u00CC:"I",\u00CD:"I",\u00CE:"I",\u00CF:"I",\u00EC:"i",\u00ED:"i",\u00EE:"i",\u00EF:"i",\u00D1:"N",\u00F1:"n",\u00D2:"O",\u00D3:"O",\u00D4:"O",\u00D5:"O",\u00D6:"O",\u00D8:"O",\u00F2:"o",\u00F3:"o",\u00F4:"o",\u00F5:"o",\u00F6:"o",\u00F8:"o",\u00D9:"U",\u00DA:"U",\u00DB:"U",\u00DC:"U",\u00F9:"u",\u00FA:"u",\u00FB:"u",\u00FC:"u",\u00DD:"Y",\u00FD:"y",\u00FF:"y",\u00C6:"Ae",\u00E6:"ae",\u00DE:"Th",\u00FE:"th",\u00DF:"ss",\u0100:"A",\u0102:"A",\u0104:"A",\u0101:"a",\u0103:"a",\u0105:"a",\u0106:"C",\u0108:"C",\u010A:"C",\u010C:"C",\u0107:"c",\u0109:"c",\u010B:"c",\u010D:"c",\u010E:"D",\u0110:"D",\u010F:"d",\u0111:"d",\u0112:"E",\u0114:"E",\u0116:"E",\u0118:"E",\u011A:"E",\u0113:"e",\u0115:"e",\u0117:"e",\u0119:"e",\u011B:"e",\u011C:"G",\u011E:"G",\u0120:"G",\u0122:"G",\u011D:"g",\u011F:"g",\u0121:"g",\u0123:"g",\u0124:"H",\u0126:"H",\u0125:"h",\u0127:"h",\u0128:"I",\u012A:"I",\u012C:"I",\u012E:"I",\u0130:"I",\u0129:"i",\u012B:"i",\u012D:"i",\u012F:"i",\u0131:"i",\u0134:"J",\u0135:"j",\u0136:"K",\u0137:"k",\u0138:"k",\u0139:"L",\u013B:"L",\u013D:"L",\u013F:"L",\u0141:"L",\u013A:"l",\u013C:"l",\u013E:"l",\u0140:"l",\u0142:"l",\u0143:"N",\u0145:"N",\u0147:"N",\u014A:"N",\u0144:"n",\u0146:"n",\u0148:"n",\u014B:"n",\u014C:"O",\u014E:"O",\u0150:"O",\u014D:"o",\u014F:"o",\u0151:"o",\u0154:"R",\u0156:"R",\u0158:"R",\u0155:"r",\u0157:"r",\u0159:"r",\u015A:"S",\u015C:"S",\u015E:"S",\u0160:"S",\u015B:"s",\u015D:"s",\u015F:"s",\u0161:"s",\u0162:"T",\u0164:"T",\u0166:"T",\u0163:"t",\u0165:"t",\u0167:"t",\u0168:"U",\u016A:"U",\u016C:"U",\u016E:"U",\u0170:"U",\u0172:"U",\u0169:"u",\u016B:"u",\u016D:"u",\u016F:"u",\u0171:"u",\u0173:"u",\u0174:"W",\u0175:"w",\u0176:"Y",\u0177:"y",\u0178:"Y",\u0179:"Z",\u017B:"Z",\u017D:"Z",\u017A:"z",\u017C:"z",\u017E:"z",\u0132:"IJ",\u0133:"ij",\u0152:"Oe",\u0153:"oe",\u0149:"'n",\u017F:"s"},A3=R3(O3);const B3=A3;var M3=/[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g,H3="\\u0300-\\u036f",D3="\\ufe20-\\ufe2f",z3="\\u20d0-\\u20ff",F3=H3+D3+z3,N3="["+F3+"]",j3=RegExp(N3,"g");function W3(e){return e=Wl(e),e&&e.replace(M3,B3).replace(j3,"")}var U3=/[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;function V3(e){return e.match(U3)||[]}var K3=/[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;function q3(e){return K3.test(e)}var ub="\\ud800-\\udfff",G3="\\u0300-\\u036f",X3="\\ufe20-\\ufe2f",Y3="\\u20d0-\\u20ff",Z3=G3+X3+Y3,db="\\u2700-\\u27bf",fb="a-z\\xdf-\\xf6\\xf8-\\xff",J3="\\xac\\xb1\\xd7\\xf7",Q3="\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf",eT="\\u2000-\\u206f",tT=" \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000",hb="A-Z\\xc0-\\xd6\\xd8-\\xde",rT="\\ufe0e\\ufe0f",pb=J3+Q3+eT+tT,gb="['\u2019]",hp="["+pb+"]",oT="["+Z3+"]",mb="\\d+",nT="["+db+"]",bb="["+fb+"]",vb="[^"+ub+pb+mb+db+fb+hb+"]",iT="\\ud83c[\\udffb-\\udfff]",sT="(?:"+oT+"|"+iT+")",aT="[^"+ub+"]",yb="(?:\\ud83c[\\udde6-\\uddff]){2}",xb="[\\ud800-\\udbff][\\udc00-\\udfff]",Wn="["+hb+"]",lT="\\u200d",pp="(?:"+bb+"|"+vb+")",cT="(?:"+Wn+"|"+vb+")",gp="(?:"+gb+"(?:d|ll|m|re|s|t|ve))?",mp="(?:"+gb+"(?:D|LL|M|RE|S|T|VE))?",Cb=sT+"?",wb="["+rT+"]?",uT="(?:"+lT+"(?:"+[aT,yb,xb].join("|")+")"+wb+Cb+")*",dT="\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])",fT="\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])",hT=wb+Cb+uT,pT="(?:"+[nT,yb,xb].join("|")+")"+hT,gT=RegExp([Wn+"?"+bb+"+"+gp+"(?="+[hp,Wn,"$"].join("|")+")",cT+"+"+mp+"(?="+[hp,Wn+pp,"$"].join("|")+")",Wn+"?"+pp+"+"+gp,Wn+"+"+mp,fT,dT,mb,pT].join("|"),"g");function mT(e){return e.match(gT)||[]}function bT(e,t,r){return e=Wl(e),t=r?void 0:t,t===void 0?q3(e)?mT(e):V3(e):e.match(t)||[]}var vT="['\u2019]",yT=RegExp(vT,"g");function xT(e){return function(t){return I3(bT(W3(t).replace(yT,"")),e,"")}}function CT(){this.__data__=new lo,this.size=0}function wT(e){var t=this.__data__,r=t.delete(e);return this.size=t.size,r}function ST(e){return this.__data__.get(e)}function ET(e){return this.__data__.has(e)}var _T=200;function TT(e,t){var r=this.__data__;if(r instanceof lo){var o=r.__data__;if(!As||o.length<_T-1)return o.push([e,t]),this.size=++r.size,this;r=this.__data__=new co(o)}return r.set(e,t),this.size=r.size,this}function Dr(e){var t=this.__data__=new lo(e);this.size=t.size}Dr.prototype.clear=CT;Dr.prototype.delete=wT;Dr.prototype.get=ST;Dr.prototype.has=ET;Dr.prototype.set=TT;var Sb=typeof exports=="object"&&exports&&!exports.nodeType&&exports,bp=Sb&&typeof module=="object"&&module&&!module.nodeType&&module,$T=bp&&bp.exports===Sb,vp=$T?jr.Buffer:void 0,yp=vp?vp.allocUnsafe:void 0;function PT(e,t){if(t)return e.slice();var r=e.length,o=yp?yp(r):new e.constructor(r);return e.copy(o),o}function LT(e,t){for(var r=-1,o=e==null?0:e.length,n=0,i=[];++r<o;){var s=e[r];t(s,r,e)&&(i[n++]=s)}return i}function kT(){return[]}var IT=Object.prototype,RT=IT.propertyIsEnumerable,xp=Object.getOwnPropertySymbols,OT=xp?function(e){return e==null?[]:(e=Object(e),LT(xp(e),function(t){return RT.call(e,t)}))}:kT;const AT=OT;function BT(e,t,r){var o=t(e);return mr(e)?o:X5(o,r(e))}function Cp(e){return BT(e,Hd,AT)}var MT=An(jr,"DataView");const Cu=MT;var HT=An(jr,"Promise");const wu=HT;var DT=An(jr,"Set");const Su=DT;var wp="[object Map]",zT="[object Object]",Sp="[object Promise]",Ep="[object Set]",_p="[object WeakMap]",Tp="[object DataView]",FT=On(Cu),NT=On(As),jT=On(wu),WT=On(Su),UT=On(vu),nn=Rn;(Cu&&nn(new Cu(new ArrayBuffer(1)))!=Tp||As&&nn(new As)!=wp||wu&&nn(wu.resolve())!=Sp||Su&&nn(new Su)!=Ep||vu&&nn(new vu)!=_p)&&(nn=function(e){var t=Rn(e),r=t==zT?e.constructor:void 0,o=r?On(r):"";if(o)switch(o){case FT:return Tp;case NT:return wp;case jT:return Sp;case WT:return Ep;case UT:return _p}return t});const $p=nn;var VT=jr.Uint8Array;const ul=VT;function KT(e){var t=new e.constructor(e.byteLength);return new ul(t).set(new ul(e)),t}function qT(e,t){var r=t?KT(e.buffer):e.buffer;return new e.constructor(r,e.byteOffset,e.length)}function GT(e){return typeof e.constructor=="function"&&!Bd(e)?KE(tb(e)):{}}var XT="__lodash_hash_undefined__";function YT(e){return this.__data__.set(e,XT),this}function ZT(e){return this.__data__.has(e)}function dl(e){var t=-1,r=e==null?0:e.length;for(this.__data__=new co;++t<r;)this.add(e[t])}dl.prototype.add=dl.prototype.push=YT;dl.prototype.has=ZT;function JT(e,t){for(var r=-1,o=e==null?0:e.length;++r<o;)if(t(e[r],r,e))return!0;return!1}function QT(e,t){return e.has(t)}var e$=1,t$=2;function Eb(e,t,r,o,n,i){var s=r&e$,a=e.length,l=t.length;if(a!=l&&!(s&&l>a))return!1;var c=i.get(e),u=i.get(t);if(c&&u)return c==t&&u==e;var d=-1,f=!0,h=r&t$?new dl:void 0;for(i.set(e,t),i.set(t,e);++d<a;){var p=e[d],m=t[d];if(o)var y=s?o(m,p,d,t,e,i):o(p,m,d,e,t,i);if(y!==void 0){if(y)continue;f=!1;break}if(h){if(!JT(t,function(g,w){if(!QT(h,w)&&(p===g||n(p,g,r,o,i)))return h.push(w)})){f=!1;break}}else if(!(p===m||n(p,m,r,o,i))){f=!1;break}}return i.delete(e),i.delete(t),f}function r$(e){var t=-1,r=Array(e.size);return e.forEach(function(o,n){r[++t]=[n,o]}),r}function o$(e){var t=-1,r=Array(e.size);return e.forEach(function(o){r[++t]=o}),r}var n$=1,i$=2,s$="[object Boolean]",a$="[object Date]",l$="[object Error]",c$="[object Map]",u$="[object Number]",d$="[object RegExp]",f$="[object Set]",h$="[object String]",p$="[object Symbol]",g$="[object ArrayBuffer]",m$="[object DataView]",Pp=No?No.prototype:void 0,Lc=Pp?Pp.valueOf:void 0;function b$(e,t,r,o,n,i,s){switch(r){case m$:if(e.byteLength!=t.byteLength||e.byteOffset!=t.byteOffset)return!1;e=e.buffer,t=t.buffer;case g$:return!(e.byteLength!=t.byteLength||!i(new ul(e),new ul(t)));case s$:case a$:case u$:return Ks(+e,+t);case l$:return e.name==t.name&&e.message==t.message;case d$:case h$:return e==t+"";case c$:var a=r$;case f$:var l=o&n$;if(a||(a=o$),e.size!=t.size&&!l)return!1;var c=s.get(e);if(c)return c==t;o|=i$,s.set(e,t);var u=Eb(a(e),a(t),o,n,i,s);return s.delete(e),u;case p$:if(Lc)return Lc.call(e)==Lc.call(t)}return!1}var v$=1,y$=Object.prototype,x$=y$.hasOwnProperty;function C$(e,t,r,o,n,i){var s=r&v$,a=Cp(e),l=a.length,c=Cp(t),u=c.length;if(l!=u&&!s)return!1;for(var d=l;d--;){var f=a[d];if(!(s?f in t:x$.call(t,f)))return!1}var h=i.get(e),p=i.get(t);if(h&&p)return h==t&&p==e;var m=!0;i.set(e,t),i.set(t,e);for(var y=s;++d<l;){f=a[d];var g=e[f],w=t[f];if(o)var T=s?o(w,g,f,t,e,i):o(g,w,f,e,t,i);if(!(T===void 0?g===w||n(g,w,r,o,i):T)){m=!1;break}y||(y=f=="constructor")}if(m&&!y){var x=e.constructor,C=t.constructor;x!=C&&"constructor"in e&&"constructor"in t&&!(typeof x=="function"&&x instanceof x&&typeof C=="function"&&C instanceof C)&&(m=!1)}return i.delete(e),i.delete(t),m}var w$=1,Lp="[object Arguments]",kp="[object Array]",_a="[object Object]",S$=Object.prototype,Ip=S$.hasOwnProperty;function E$(e,t,r,o,n,i){var s=mr(e),a=mr(t),l=s?kp:$p(e),c=a?kp:$p(t);l=l==Lp?_a:l,c=c==Lp?_a:c;var u=l==_a,d=c==_a,f=l==c;if(f&&cl(e)){if(!cl(t))return!1;s=!0,u=!1}if(f&&!u)return i||(i=new Dr),s||Md(e)?Eb(e,t,r,o,n,i):b$(e,t,l,r,o,n,i);if(!(r&w$)){var h=u&&Ip.call(e,"__wrapped__"),p=d&&Ip.call(t,"__wrapped__");if(h||p){var m=h?e.value():e,y=p?t.value():t;return i||(i=new Dr),n(m,y,r,o,i)}}return f?(i||(i=new Dr),C$(e,t,r,o,n,i)):!1}function Fd(e,t,r,o,n){return e===t?!0:e==null||t==null||!jo(e)&&!jo(t)?e!==e&&t!==t:E$(e,t,r,o,Fd,n)}var _$=1,T$=2;function $$(e,t,r,o){var n=r.length,i=n,s=!o;if(e==null)return!i;for(e=Object(e);n--;){var a=r[n];if(s&&a[2]?a[1]!==e[a[0]]:!(a[0]in e))return!1}for(;++n<i;){a=r[n];var l=a[0],c=e[l],u=a[1];if(s&&a[2]){if(c===void 0&&!(l in e))return!1}else{var d=new Dr;if(o)var f=o(c,u,l,e,t,d);if(!(f===void 0?Fd(u,c,_$|T$,o,d):f))return!1}}return!0}function _b(e){return e===e&&!Ko(e)}function P$(e){for(var t=Hd(e),r=t.length;r--;){var o=t[r],n=e[o];t[r]=[o,n,_b(n)]}return t}function Tb(e,t){return function(r){return r==null?!1:r[e]===t&&(t!==void 0||e in Object(r))}}function L$(e){var t=P$(e);return t.length==1&&t[0][2]?Tb(t[0][0],t[0][1]):function(r){return r===e||$$(r,e,t)}}function k$(e,t){return e!=null&&t in Object(e)}function I$(e,t,r){t=Q0(t,e);for(var o=-1,n=t.length,i=!1;++o<n;){var s=Ul(t[o]);if(!(i=e!=null&&r(e,s)))break;e=e[s]}return i||++o!=n?i:(n=e==null?0:e.length,!!n&&Ad(n)&&Rd(s,n)&&(mr(e)||ll(e)))}function R$(e,t){return e!=null&&I$(e,t,k$)}var O$=1,A$=2;function B$(e,t){return Dd(e)&&_b(t)?Tb(Ul(e),t):function(r){var o=G5(r,e);return o===void 0&&o===t?R$(r,e):Fd(t,o,O$|A$)}}function M$(e){return function(t){return t==null?void 0:t[e]}}function H$(e){return function(t){return eb(t,e)}}function D$(e){return Dd(e)?M$(Ul(e)):H$(e)}function z$(e){return typeof e=="function"?e:e==null?kd:typeof e=="object"?mr(e)?B$(e[0],e[1]):L$(e):D$(e)}function F$(e){return function(t,r,o){for(var n=-1,i=Object(t),s=o(t),a=s.length;a--;){var l=s[e?a:++n];if(r(i[l],l,i)===!1)break}return t}}var N$=F$();const $b=N$;function j$(e,t){return e&&$b(e,t,Hd)}function W$(e,t){return function(r,o){if(r==null)return r;if(!Oi(r))return e(r,o);for(var n=r.length,i=t?n:-1,s=Object(r);(t?i--:++i<n)&&o(s[i],i,s)!==!1;);return r}}var U$=W$(j$);const V$=U$;function Eu(e,t,r){(r!==void 0&&!Ks(e[t],r)||r===void 0&&!(t in e))&&Od(e,t,r)}function K$(e){return jo(e)&&Oi(e)}function _u(e,t){if(!(t==="constructor"&&typeof e[t]=="function")&&t!="__proto__")return e[t]}function q$(e){return u_(e,J0(e))}function G$(e,t,r,o,n,i,s){var a=_u(e,r),l=_u(t,r),c=s.get(l);if(c){Eu(e,r,c);return}var u=i?i(a,l,r+"",e,t,s):void 0,d=u===void 0;if(d){var f=mr(l),h=!f&&cl(l),p=!f&&!h&&Md(l);u=l,f||h||p?mr(a)?u=a:K$(a)?u=GE(a):h?(d=!1,u=PT(l,!0)):p?(d=!1,u=qT(l,!0)):u=[]:r3(l)||ll(l)?(u=a,ll(a)?u=q$(a):(!Ko(a)||Id(a))&&(u=GT(l))):d=!1}d&&(s.set(l,u),n(u,l,o,i,s),s.delete(l)),Eu(e,r,u)}function Pb(e,t,r,o,n){e!==t&&$b(t,function(i,s){if(n||(n=new Dr),Ko(i))G$(e,t,s,r,Pb,o,n);else{var a=o?o(_u(e,s),i,s+"",e,t,n):void 0;a===void 0&&(a=i),Eu(e,s,a)}},J0)}function X$(e,t){var r=-1,o=Oi(e)?Array(e.length):[];return V$(e,function(n,i,s){o[++r]=t(n,i,s)}),o}function Y$(e,t){var r=mr(e)?V0:X$;return r(e,z$(t))}var Z$=xT(function(e,t,r){return e+(r?"-":"")+t.toLowerCase()});const J$=Z$;var Q$=g_(function(e,t,r){Pb(e,t,r)});const ts=Q$,qo={fontFamily:'v-sans, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',fontFamilyMono:"v-mono, SFMono-Regular, Menlo, Consolas, Courier, monospace",fontWeight:"400",fontWeightStrong:"500",cubicBezierEaseInOut:"cubic-bezier(.4, 0, .2, 1)",cubicBezierEaseOut:"cubic-bezier(0, 0, .2, 1)",cubicBezierEaseIn:"cubic-bezier(.4, 0, 1, 1)",borderRadius:"3px",borderRadiusSmall:"2px",fontSize:"14px",fontSizeMini:"12px",fontSizeTiny:"12px",fontSizeSmall:"14px",fontSizeMedium:"14px",fontSizeLarge:"15px",fontSizeHuge:"16px",lineHeight:"1.6",heightMini:"16px",heightTiny:"22px",heightSmall:"28px",heightMedium:"34px",heightLarge:"40px",heightHuge:"46px"},{fontSize:e4,fontFamily:t4,lineHeight:r4}=qo,Lb=N("body",`
 margin: 0;
 font-size: ${e4};
 font-family: ${t4};
 line-height: ${r4};
 -webkit-text-size-adjust: 100%;
 -webkit-tap-highlight-color: transparent;
`,[N("input",`
 font-family: inherit;
 font-size: inherit;
 `)]),Wo="n-config-provider",Bs="naive-ui-style";function Xe(e,t,r,o,n,i){const s=Vs(),a=Se(Wo,null);if(r){const c=()=>{const u=i==null?void 0:i.value;r.mount({id:u===void 0?t:u+t,head:!0,props:{bPrefix:u?`.${u}-`:void 0},anchorMetaName:Bs,ssr:s}),a!=null&&a.preflightStyleDisabled||Lb.mount({id:"n-global",head:!0,anchorMetaName:Bs,ssr:s})};s?c():Vo(c)}return q(()=>{var c;const{theme:{common:u,self:d,peers:f={}}={},themeOverrides:h={},builtinThemeOverrides:p={}}=n,{common:m,peers:y}=h,{common:g=void 0,[e]:{common:w=void 0,self:T=void 0,peers:x={}}={}}=(a==null?void 0:a.mergedThemeRef.value)||{},{common:C=void 0,[e]:$={}}=(a==null?void 0:a.mergedThemeOverridesRef.value)||{},{common:S,peers:L={}}=$,k=ts({},u||w||g||o.common,C,S,m),I=ts((c=d||T||o.self)===null||c===void 0?void 0:c(k),p,$,h);return{common:k,self:I,peers:ts({},o.peers,x,f),peerOverrides:ts({},p.peers,L,y)}})}Xe.props={theme:Object,themeOverrides:Object,builtinThemeOverrides:Object};const kb="n";function kt(e={},t={defaultBordered:!0}){const r=Se(Wo,null);return{inlineThemeDisabled:r==null?void 0:r.inlineThemeDisabled,mergedRtlRef:r==null?void 0:r.mergedRtlRef,mergedComponentPropsRef:r==null?void 0:r.mergedComponentPropsRef,mergedBreakpointsRef:r==null?void 0:r.mergedBreakpointsRef,mergedBorderedRef:q(()=>{var o,n;const{bordered:i}=e;return i!==void 0?i:(n=(o=r==null?void 0:r.mergedBorderedRef.value)!==null&&o!==void 0?o:t.defaultBordered)!==null&&n!==void 0?n:!0}),mergedClsPrefixRef:q(()=>(r==null?void 0:r.mergedClsPrefixRef.value)||kb),namespaceRef:q(()=>r==null?void 0:r.mergedNamespaceRef.value)}}const o4={name:"en-US",global:{undo:"Undo",redo:"Redo",confirm:"Confirm",clear:"Clear"},Popconfirm:{positiveText:"Confirm",negativeText:"Cancel"},Cascader:{placeholder:"Please Select",loading:"Loading",loadingRequiredMessage:e=>`Please load all ${e}'s descendants before checking it.`},Time:{dateFormat:"yyyy-MM-dd",dateTimeFormat:"yyyy-MM-dd HH:mm:ss"},DatePicker:{yearFormat:"yyyy",monthFormat:"MMM",dayFormat:"eeeeee",yearTypeFormat:"yyyy",monthTypeFormat:"yyyy-MM",dateFormat:"yyyy-MM-dd",dateTimeFormat:"yyyy-MM-dd HH:mm:ss",quarterFormat:"yyyy-qqq",clear:"Clear",now:"Now",confirm:"Confirm",selectTime:"Select Time",selectDate:"Select Date",datePlaceholder:"Select Date",datetimePlaceholder:"Select Date and Time",monthPlaceholder:"Select Month",yearPlaceholder:"Select Year",quarterPlaceholder:"Select Quarter",startDatePlaceholder:"Start Date",endDatePlaceholder:"End Date",startDatetimePlaceholder:"Start Date and Time",endDatetimePlaceholder:"End Date and Time",startMonthPlaceholder:"Start Month",endMonthPlaceholder:"End Month",monthBeforeYear:!0,firstDayOfWeek:6,today:"Today"},DataTable:{checkTableAll:"Select all in the table",uncheckTableAll:"Unselect all in the table",confirm:"Confirm",clear:"Clear"},LegacyTransfer:{sourceTitle:"Source",targetTitle:"Target"},Transfer:{selectAll:"Select all",unselectAll:"Unselect all",clearAll:"Clear",total:e=>`Total ${e} items`,selected:e=>`${e} items selected`},Empty:{description:"No Data"},Select:{placeholder:"Please Select"},TimePicker:{placeholder:"Select Time",positiveText:"OK",negativeText:"Cancel",now:"Now"},Pagination:{goto:"Goto",selectionSuffix:"page"},DynamicTags:{add:"Add"},Log:{loading:"Loading"},Input:{placeholder:"Please Input"},InputNumber:{placeholder:"Please Input"},DynamicInput:{create:"Create"},ThemeEditor:{title:"Theme Editor",clearAllVars:"Clear All Variables",clearSearch:"Clear Search",filterCompName:"Filter Component Name",filterVarName:"Filter Variable Name",import:"Import",export:"Export",restore:"Reset to Default"},Image:{tipPrevious:"Previous picture (\u2190)",tipNext:"Next picture (\u2192)",tipCounterclockwise:"Counterclockwise",tipClockwise:"Clockwise",tipZoomOut:"Zoom out",tipZoomIn:"Zoom in",tipClose:"Close (Esc)",tipOriginalSize:"Zoom to original size"}},n4=o4;function kc(e){return function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},r=t.width?String(t.width):e.defaultWidth,o=e.formats[r]||e.formats[e.defaultWidth];return o}}function Vi(e){return function(t,r){var o=r!=null&&r.context?String(r.context):"standalone",n;if(o==="formatting"&&e.formattingValues){var i=e.defaultFormattingWidth||e.defaultWidth,s=r!=null&&r.width?String(r.width):i;n=e.formattingValues[s]||e.formattingValues[i]}else{var a=e.defaultWidth,l=r!=null&&r.width?String(r.width):e.defaultWidth;n=e.values[l]||e.values[a]}var c=e.argumentCallback?e.argumentCallback(t):t;return n[c]}}function Ki(e){return function(t){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},o=r.width,n=o&&e.matchPatterns[o]||e.matchPatterns[e.defaultMatchWidth],i=t.match(n);if(!i)return null;var s=i[0],a=o&&e.parsePatterns[o]||e.parsePatterns[e.defaultParseWidth],l=Array.isArray(a)?s4(a,function(d){return d.test(s)}):i4(a,function(d){return d.test(s)}),c;c=e.valueCallback?e.valueCallback(l):l,c=r.valueCallback?r.valueCallback(c):c;var u=t.slice(s.length);return{value:c,rest:u}}}function i4(e,t){for(var r in e)if(e.hasOwnProperty(r)&&t(e[r]))return r}function s4(e,t){for(var r=0;r<e.length;r++)if(t(e[r]))return r}function a4(e){return function(t){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},o=t.match(e.matchPattern);if(!o)return null;var n=o[0],i=t.match(e.parsePattern);if(!i)return null;var s=e.valueCallback?e.valueCallback(i[0]):i[0];s=r.valueCallback?r.valueCallback(s):s;var a=t.slice(n.length);return{value:s,rest:a}}}var l4={lessThanXSeconds:{one:"less than a second",other:"less than {{count}} seconds"},xSeconds:{one:"1 second",other:"{{count}} seconds"},halfAMinute:"half a minute",lessThanXMinutes:{one:"less than a minute",other:"less than {{count}} minutes"},xMinutes:{one:"1 minute",other:"{{count}} minutes"},aboutXHours:{one:"about 1 hour",other:"about {{count}} hours"},xHours:{one:"1 hour",other:"{{count}} hours"},xDays:{one:"1 day",other:"{{count}} days"},aboutXWeeks:{one:"about 1 week",other:"about {{count}} weeks"},xWeeks:{one:"1 week",other:"{{count}} weeks"},aboutXMonths:{one:"about 1 month",other:"about {{count}} months"},xMonths:{one:"1 month",other:"{{count}} months"},aboutXYears:{one:"about 1 year",other:"about {{count}} years"},xYears:{one:"1 year",other:"{{count}} years"},overXYears:{one:"over 1 year",other:"over {{count}} years"},almostXYears:{one:"almost 1 year",other:"almost {{count}} years"}},c4=function(t,r,o){var n,i=l4[t];return typeof i=="string"?n=i:r===1?n=i.one:n=i.other.replace("{{count}}",r.toString()),o!=null&&o.addSuffix?o.comparison&&o.comparison>0?"in "+n:n+" ago":n};const u4=c4;var d4={full:"EEEE, MMMM do, y",long:"MMMM do, y",medium:"MMM d, y",short:"MM/dd/yyyy"},f4={full:"h:mm:ss a zzzz",long:"h:mm:ss a z",medium:"h:mm:ss a",short:"h:mm a"},h4={full:"{{date}} 'at' {{time}}",long:"{{date}} 'at' {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"},p4={date:kc({formats:d4,defaultWidth:"full"}),time:kc({formats:f4,defaultWidth:"full"}),dateTime:kc({formats:h4,defaultWidth:"full"})};const g4=p4;var m4={lastWeek:"'last' eeee 'at' p",yesterday:"'yesterday at' p",today:"'today at' p",tomorrow:"'tomorrow at' p",nextWeek:"eeee 'at' p",other:"P"},b4=function(t,r,o,n){return m4[t]};const v4=b4;var y4={narrow:["B","A"],abbreviated:["BC","AD"],wide:["Before Christ","Anno Domini"]},x4={narrow:["1","2","3","4"],abbreviated:["Q1","Q2","Q3","Q4"],wide:["1st quarter","2nd quarter","3rd quarter","4th quarter"]},C4={narrow:["J","F","M","A","M","J","J","A","S","O","N","D"],abbreviated:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],wide:["January","February","March","April","May","June","July","August","September","October","November","December"]},w4={narrow:["S","M","T","W","T","F","S"],short:["Su","Mo","Tu","We","Th","Fr","Sa"],abbreviated:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],wide:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},S4={narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"}},E4={narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"}},_4=function(t,r){var o=Number(t),n=o%100;if(n>20||n<10)switch(n%10){case 1:return o+"st";case 2:return o+"nd";case 3:return o+"rd"}return o+"th"},T4={ordinalNumber:_4,era:Vi({values:y4,defaultWidth:"wide"}),quarter:Vi({values:x4,defaultWidth:"wide",argumentCallback:function(t){return t-1}}),month:Vi({values:C4,defaultWidth:"wide"}),day:Vi({values:w4,defaultWidth:"wide"}),dayPeriod:Vi({values:S4,defaultWidth:"wide",formattingValues:E4,defaultFormattingWidth:"wide"})};const $4=T4;var P4=/^(\d+)(th|st|nd|rd)?/i,L4=/\d+/i,k4={narrow:/^(b|a)/i,abbreviated:/^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,wide:/^(before christ|before common era|anno domini|common era)/i},I4={any:[/^b/i,/^(a|c)/i]},R4={narrow:/^[1234]/i,abbreviated:/^q[1234]/i,wide:/^[1234](th|st|nd|rd)? quarter/i},O4={any:[/1/i,/2/i,/3/i,/4/i]},A4={narrow:/^[jfmasond]/i,abbreviated:/^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,wide:/^(january|february|march|april|may|june|july|august|september|october|november|december)/i},B4={narrow:[/^j/i,/^f/i,/^m/i,/^a/i,/^m/i,/^j/i,/^j/i,/^a/i,/^s/i,/^o/i,/^n/i,/^d/i],any:[/^ja/i,/^f/i,/^mar/i,/^ap/i,/^may/i,/^jun/i,/^jul/i,/^au/i,/^s/i,/^o/i,/^n/i,/^d/i]},M4={narrow:/^[smtwf]/i,short:/^(su|mo|tu|we|th|fr|sa)/i,abbreviated:/^(sun|mon|tue|wed|thu|fri|sat)/i,wide:/^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i},H4={narrow:[/^s/i,/^m/i,/^t/i,/^w/i,/^t/i,/^f/i,/^s/i],any:[/^su/i,/^m/i,/^tu/i,/^w/i,/^th/i,/^f/i,/^sa/i]},D4={narrow:/^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,any:/^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i},z4={any:{am:/^a/i,pm:/^p/i,midnight:/^mi/i,noon:/^no/i,morning:/morning/i,afternoon:/afternoon/i,evening:/evening/i,night:/night/i}},F4={ordinalNumber:a4({matchPattern:P4,parsePattern:L4,valueCallback:function(t){return parseInt(t,10)}}),era:Ki({matchPatterns:k4,defaultMatchWidth:"wide",parsePatterns:I4,defaultParseWidth:"any"}),quarter:Ki({matchPatterns:R4,defaultMatchWidth:"wide",parsePatterns:O4,defaultParseWidth:"any",valueCallback:function(t){return t+1}}),month:Ki({matchPatterns:A4,defaultMatchWidth:"wide",parsePatterns:B4,defaultParseWidth:"any"}),day:Ki({matchPatterns:M4,defaultMatchWidth:"wide",parsePatterns:H4,defaultParseWidth:"any"}),dayPeriod:Ki({matchPatterns:D4,defaultMatchWidth:"any",parsePatterns:z4,defaultParseWidth:"any"})};const N4=F4;var j4={code:"en-US",formatDistance:u4,formatLong:g4,formatRelative:v4,localize:$4,match:N4,options:{weekStartsOn:0,firstWeekContainsDate:1}};const W4=j4,U4={name:"en-US",locale:W4},V4=U4;function K4(e){const{mergedLocaleRef:t,mergedDateLocaleRef:r}=Se(Wo,null)||{},o=q(()=>{var i,s;return(s=(i=t==null?void 0:t.value)===null||i===void 0?void 0:i[e])!==null&&s!==void 0?s:n4[e]});return{dateLocaleRef:q(()=>{var i;return(i=r==null?void 0:r.value)!==null&&i!==void 0?i:V4}),localeRef:o}}function Vl(e,t,r){if(!t)return;const o=Vs(),n=Se(Wo,null),i=()=>{const s=r==null?void 0:r.value;t.mount({id:s===void 0?e:s+e,head:!0,anchorMetaName:Bs,props:{bPrefix:s?`.${s}-`:void 0},ssr:o}),n!=null&&n.preflightStyleDisabled||Lb.mount({id:"n-global",head:!0,anchorMetaName:Bs,ssr:o})};o?i():Vo(i)}function br(e,t,r,o){var n;r||kn("useThemeClass","cssVarsRef is not passed");const i=(n=Se(Wo,null))===null||n===void 0?void 0:n.mergedThemeHashRef,s=K(""),a=Vs();let l;const c=`__${e}`,u=()=>{let d=c;const f=t?t.value:void 0,h=i==null?void 0:i.value;h&&(d+="-"+h),f&&(d+="-"+f);const{themeOverrides:p,builtinThemeOverrides:m}=o;p&&(d+="-"+ks(JSON.stringify(p))),m&&(d+="-"+ks(JSON.stringify(m))),s.value=d,l=()=>{const y=r.value;let g="";for(const w in y)g+=`${w}: ${y[w]};`;N(`.${d}`,g).mount({id:d,ssr:a}),l=void 0}};return Er(()=>{u()}),{themeClass:s,onRender:()=>{l==null||l()}}}function qs(e,t,r){if(!t)return;const o=Vs(),n=q(()=>{const{value:s}=t;if(!s)return;const a=s[e];if(!!a)return a}),i=()=>{Er(()=>{const{value:s}=r,a=`${s}${e}Rtl`;if(X2(a,o))return;const{value:l}=n;!l||l.style.mount({id:a,head:!0,anchorMetaName:Bs,props:{bPrefix:s?`.${s}-`:void 0},ssr:o})})};return o?i():Vo(i),n}const q4=be({name:"Add",render(){return E("svg",{width:"512",height:"512",viewBox:"0 0 512 512",fill:"none",xmlns:"http://www.w3.org/2000/svg"},E("path",{d:"M256 112V400M400 256H112",stroke:"currentColor","stroke-width":"32","stroke-linecap":"round","stroke-linejoin":"round"}))}});function Xt(e,t){return be({name:k3(e),setup(){var r;const o=(r=Se(Wo,null))===null||r===void 0?void 0:r.mergedIconsRef;return()=>{var n;const i=(n=o==null?void 0:o.value)===null||n===void 0?void 0:n[e];return i?i():t}}})}const G4=Xt("attach",E("svg",{viewBox:"0 0 16 16",version:"1.1",xmlns:"http://www.w3.org/2000/svg"},E("g",{stroke:"none","stroke-width":"1",fill:"none","fill-rule":"evenodd"},E("g",{fill:"currentColor","fill-rule":"nonzero"},E("path",{d:"M3.25735931,8.70710678 L7.85355339,4.1109127 C8.82986412,3.13460197 10.4127766,3.13460197 11.3890873,4.1109127 C12.365398,5.08722343 12.365398,6.67013588 11.3890873,7.64644661 L6.08578644,12.9497475 C5.69526215,13.3402718 5.06209717,13.3402718 4.67157288,12.9497475 C4.28104858,12.5592232 4.28104858,11.9260582 4.67157288,11.5355339 L9.97487373,6.23223305 C10.1701359,6.0369709 10.1701359,5.72038841 9.97487373,5.52512627 C9.77961159,5.32986412 9.4630291,5.32986412 9.26776695,5.52512627 L3.96446609,10.8284271 C3.18341751,11.6094757 3.18341751,12.8758057 3.96446609,13.6568542 C4.74551468,14.4379028 6.01184464,14.4379028 6.79289322,13.6568542 L12.0961941,8.35355339 C13.4630291,6.98671837 13.4630291,4.77064094 12.0961941,3.40380592 C10.7293591,2.0369709 8.51328163,2.0369709 7.14644661,3.40380592 L2.55025253,8 C2.35499039,8.19526215 2.35499039,8.51184464 2.55025253,8.70710678 C2.74551468,8.90236893 3.06209717,8.90236893 3.25735931,8.70710678 Z"}))))),X4=Xt("close",E("svg",{viewBox:"0 0 12 12",version:"1.1",xmlns:"http://www.w3.org/2000/svg","aria-hidden":!0},E("g",{stroke:"none","stroke-width":"1",fill:"none","fill-rule":"evenodd"},E("g",{fill:"currentColor","fill-rule":"nonzero"},E("path",{d:"M2.08859116,2.2156945 L2.14644661,2.14644661 C2.32001296,1.97288026 2.58943736,1.95359511 2.7843055,2.08859116 L2.85355339,2.14644661 L6,5.293 L9.14644661,2.14644661 C9.34170876,1.95118446 9.65829124,1.95118446 9.85355339,2.14644661 C10.0488155,2.34170876 10.0488155,2.65829124 9.85355339,2.85355339 L6.707,6 L9.85355339,9.14644661 C10.0271197,9.32001296 10.0464049,9.58943736 9.91140884,9.7843055 L9.85355339,9.85355339 C9.67998704,10.0271197 9.41056264,10.0464049 9.2156945,9.91140884 L9.14644661,9.85355339 L6,6.707 L2.85355339,9.85355339 C2.65829124,10.0488155 2.34170876,10.0488155 2.14644661,9.85355339 C1.95118446,9.65829124 1.95118446,9.34170876 2.14644661,9.14644661 L5.293,6 L2.14644661,2.85355339 C1.97288026,2.67998704 1.95359511,2.41056264 2.08859116,2.2156945 L2.14644661,2.14644661 L2.08859116,2.2156945 Z"}))))),Y4=be({name:"Eye",render(){return E("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512"},E("path",{d:"M255.66 112c-77.94 0-157.89 45.11-220.83 135.33a16 16 0 0 0-.27 17.77C82.92 340.8 161.8 400 255.66 400c92.84 0 173.34-59.38 221.79-135.25a16.14 16.14 0 0 0 0-17.47C428.89 172.28 347.8 112 255.66 112z",fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32"}),E("circle",{cx:"256",cy:"256",r:"80",fill:"none",stroke:"currentColor","stroke-miterlimit":"10","stroke-width":"32"}))}}),Z4=Xt("trash",E("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512"},E("path",{d:"M432,144,403.33,419.74A32,32,0,0,1,371.55,448H140.46a32,32,0,0,1-31.78-28.26L80,144",style:"fill: none; stroke: currentcolor; stroke-linecap: round; stroke-linejoin: round; stroke-width: 32px;"}),E("rect",{x:"32",y:"64",width:"448",height:"80",rx:"16",ry:"16",style:"fill: none; stroke: currentcolor; stroke-linecap: round; stroke-linejoin: round; stroke-width: 32px;"}),E("line",{x1:"312",y1:"240",x2:"200",y2:"352",style:"fill: none; stroke: currentcolor; stroke-linecap: round; stroke-linejoin: round; stroke-width: 32px;"}),E("line",{x1:"312",y1:"352",x2:"200",y2:"240",style:"fill: none; stroke: currentcolor; stroke-linecap: round; stroke-linejoin: round; stroke-width: 32px;"}))),J4=Xt("download",E("svg",{viewBox:"0 0 16 16",version:"1.1",xmlns:"http://www.w3.org/2000/svg"},E("g",{stroke:"none","stroke-width":"1",fill:"none","fill-rule":"evenodd"},E("g",{fill:"currentColor","fill-rule":"nonzero"},E("path",{d:"M3.5,13 L12.5,13 C12.7761424,13 13,13.2238576 13,13.5 C13,13.7454599 12.8231248,13.9496084 12.5898756,13.9919443 L12.5,14 L3.5,14 C3.22385763,14 3,13.7761424 3,13.5 C3,13.2545401 3.17687516,13.0503916 3.41012437,13.0080557 L3.5,13 L12.5,13 L3.5,13 Z M7.91012437,1.00805567 L8,1 C8.24545989,1 8.44960837,1.17687516 8.49194433,1.41012437 L8.5,1.5 L8.5,10.292 L11.1819805,7.6109127 C11.3555469,7.43734635 11.6249713,7.4180612 11.8198394,7.55305725 L11.8890873,7.6109127 C12.0626536,7.78447906 12.0819388,8.05390346 11.9469427,8.2487716 L11.8890873,8.31801948 L8.35355339,11.8535534 C8.17998704,12.0271197 7.91056264,12.0464049 7.7156945,11.9114088 L7.64644661,11.8535534 L4.1109127,8.31801948 C3.91565056,8.12275734 3.91565056,7.80617485 4.1109127,7.6109127 C4.28447906,7.43734635 4.55390346,7.4180612 4.7487716,7.55305725 L4.81801948,7.6109127 L7.5,10.292 L7.5,1.5 C7.5,1.25454011 7.67687516,1.05039163 7.91012437,1.00805567 L8,1 L7.91012437,1.00805567 Z"}))))),Gs=Xt("error",E("svg",{viewBox:"0 0 48 48",version:"1.1",xmlns:"http://www.w3.org/2000/svg"},E("g",{stroke:"none","stroke-width":"1","fill-rule":"evenodd"},E("g",{"fill-rule":"nonzero"},E("path",{d:"M24,4 C35.045695,4 44,12.954305 44,24 C44,35.045695 35.045695,44 24,44 C12.954305,44 4,35.045695 4,24 C4,12.954305 12.954305,4 24,4 Z M17.8838835,16.1161165 L17.7823881,16.0249942 C17.3266086,15.6583353 16.6733914,15.6583353 16.2176119,16.0249942 L16.1161165,16.1161165 L16.0249942,16.2176119 C15.6583353,16.6733914 15.6583353,17.3266086 16.0249942,17.7823881 L16.1161165,17.8838835 L22.233,24 L16.1161165,30.1161165 L16.0249942,30.2176119 C15.6583353,30.6733914 15.6583353,31.3266086 16.0249942,31.7823881 L16.1161165,31.8838835 L16.2176119,31.9750058 C16.6733914,32.3416647 17.3266086,32.3416647 17.7823881,31.9750058 L17.8838835,31.8838835 L24,25.767 L30.1161165,31.8838835 L30.2176119,31.9750058 C30.6733914,32.3416647 31.3266086,32.3416647 31.7823881,31.9750058 L31.8838835,31.8838835 L31.9750058,31.7823881 C32.3416647,31.3266086 32.3416647,30.6733914 31.9750058,30.2176119 L31.8838835,30.1161165 L25.767,24 L31.8838835,17.8838835 L31.9750058,17.7823881 C32.3416647,17.3266086 32.3416647,16.6733914 31.9750058,16.2176119 L31.8838835,16.1161165 L31.7823881,16.0249942 C31.3266086,15.6583353 30.6733914,15.6583353 30.2176119,16.0249942 L30.1161165,16.1161165 L24,22.233 L17.8838835,16.1161165 L17.7823881,16.0249942 L17.8838835,16.1161165 Z"}))))),gi=Xt("info",E("svg",{viewBox:"0 0 28 28",version:"1.1",xmlns:"http://www.w3.org/2000/svg"},E("g",{stroke:"none","stroke-width":"1","fill-rule":"evenodd"},E("g",{"fill-rule":"nonzero"},E("path",{d:"M14,2 C20.6274,2 26,7.37258 26,14 C26,20.6274 20.6274,26 14,26 C7.37258,26 2,20.6274 2,14 C2,7.37258 7.37258,2 14,2 Z M14,11 C13.4477,11 13,11.4477 13,12 L13,12 L13,20 C13,20.5523 13.4477,21 14,21 C14.5523,21 15,20.5523 15,20 L15,20 L15,12 C15,11.4477 14.5523,11 14,11 Z M14,6.75 C13.3096,6.75 12.75,7.30964 12.75,8 C12.75,8.69036 13.3096,9.25 14,9.25 C14.6904,9.25 15.25,8.69036 15.25,8 C15.25,7.30964 14.6904,6.75 14,6.75 Z"}))))),Xs=Xt("success",E("svg",{viewBox:"0 0 48 48",version:"1.1",xmlns:"http://www.w3.org/2000/svg"},E("g",{stroke:"none","stroke-width":"1","fill-rule":"evenodd"},E("g",{"fill-rule":"nonzero"},E("path",{d:"M24,4 C35.045695,4 44,12.954305 44,24 C44,35.045695 35.045695,44 24,44 C12.954305,44 4,35.045695 4,24 C4,12.954305 12.954305,4 24,4 Z M32.6338835,17.6161165 C32.1782718,17.1605048 31.4584514,17.1301307 30.9676119,17.5249942 L30.8661165,17.6161165 L20.75,27.732233 L17.1338835,24.1161165 C16.6457281,23.6279612 15.8542719,23.6279612 15.3661165,24.1161165 C14.9105048,24.5717282 14.8801307,25.2915486 15.2749942,25.7823881 L15.3661165,25.8838835 L19.8661165,30.3838835 C20.3217282,30.8394952 21.0415486,30.8698693 21.5323881,30.4750058 L21.6338835,30.3838835 L32.6338835,19.3838835 C33.1220388,18.8957281 33.1220388,18.1042719 32.6338835,17.6161165 Z"}))))),Ys=Xt("warning",E("svg",{viewBox:"0 0 24 24",version:"1.1",xmlns:"http://www.w3.org/2000/svg"},E("g",{stroke:"none","stroke-width":"1","fill-rule":"evenodd"},E("g",{"fill-rule":"nonzero"},E("path",{d:"M12,2 C17.523,2 22,6.478 22,12 C22,17.522 17.523,22 12,22 C6.477,22 2,17.522 2,12 C2,6.478 6.477,2 12,2 Z M12.0018002,15.0037242 C11.450254,15.0037242 11.0031376,15.4508407 11.0031376,16.0023869 C11.0031376,16.553933 11.450254,17.0010495 12.0018002,17.0010495 C12.5533463,17.0010495 13.0004628,16.553933 13.0004628,16.0023869 C13.0004628,15.4508407 12.5533463,15.0037242 12.0018002,15.0037242 Z M11.99964,7 C11.4868042,7.00018474 11.0642719,7.38637706 11.0066858,7.8837365 L11,8.00036004 L11.0018003,13.0012393 L11.00857,13.117858 C11.0665141,13.6151758 11.4893244,14.0010638 12.0021602,14.0008793 C12.514996,14.0006946 12.9375283,13.6145023 12.9951144,13.1171428 L13.0018002,13.0005193 L13,7.99964009 L12.9932303,7.8830214 C12.9352861,7.38570354 12.5124758,6.99981552 11.99964,7 Z"}))))),Q4=Xt("cancel",E("svg",{viewBox:"0 0 16 16",version:"1.1",xmlns:"http://www.w3.org/2000/svg"},E("g",{stroke:"none","stroke-width":"1",fill:"none","fill-rule":"evenodd"},E("g",{fill:"currentColor","fill-rule":"nonzero"},E("path",{d:"M2.58859116,2.7156945 L2.64644661,2.64644661 C2.82001296,2.47288026 3.08943736,2.45359511 3.2843055,2.58859116 L3.35355339,2.64644661 L8,7.293 L12.6464466,2.64644661 C12.8417088,2.45118446 13.1582912,2.45118446 13.3535534,2.64644661 C13.5488155,2.84170876 13.5488155,3.15829124 13.3535534,3.35355339 L8.707,8 L13.3535534,12.6464466 C13.5271197,12.820013 13.5464049,13.0894374 13.4114088,13.2843055 L13.3535534,13.3535534 C13.179987,13.5271197 12.9105626,13.5464049 12.7156945,13.4114088 L12.6464466,13.3535534 L8,8.707 L3.35355339,13.3535534 C3.15829124,13.5488155 2.84170876,13.5488155 2.64644661,13.3535534 C2.45118446,13.1582912 2.45118446,12.8417088 2.64644661,12.6464466 L7.293,8 L2.64644661,3.35355339 C2.47288026,3.17998704 2.45359511,2.91056264 2.58859116,2.7156945 L2.64644661,2.64644661 L2.58859116,2.7156945 Z"}))))),e6=Xt("retry",E("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512"},E("path",{d:"M320,146s24.36-12-64-12A160,160,0,1,0,416,294",style:"fill: none; stroke: currentcolor; stroke-linecap: round; stroke-miterlimit: 10; stroke-width: 32px;"}),E("polyline",{points:"256 58 336 138 256 218",style:"fill: none; stroke: currentcolor; stroke-linecap: round; stroke-linejoin: round; stroke-width: 32px;"}))),t6=Xt("rotateClockwise",E("svg",{viewBox:"0 0 20 20",fill:"none",xmlns:"http://www.w3.org/2000/svg"},E("path",{d:"M3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10C17 12.7916 15.3658 15.2026 13 16.3265V14.5C13 14.2239 12.7761 14 12.5 14C12.2239 14 12 14.2239 12 14.5V17.5C12 17.7761 12.2239 18 12.5 18H15.5C15.7761 18 16 17.7761 16 17.5C16 17.2239 15.7761 17 15.5 17H13.8758C16.3346 15.6357 18 13.0128 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 10.2761 2.22386 10.5 2.5 10.5C2.77614 10.5 3 10.2761 3 10Z",fill:"currentColor"}),E("path",{d:"M10 12C11.1046 12 12 11.1046 12 10C12 8.89543 11.1046 8 10 8C8.89543 8 8 8.89543 8 10C8 11.1046 8.89543 12 10 12ZM10 11C9.44772 11 9 10.5523 9 10C9 9.44772 9.44772 9 10 9C10.5523 9 11 9.44772 11 10C11 10.5523 10.5523 11 10 11Z",fill:"currentColor"}))),r6=Xt("rotateClockwise",E("svg",{viewBox:"0 0 20 20",fill:"none",xmlns:"http://www.w3.org/2000/svg"},E("path",{d:"M17 10C17 6.13401 13.866 3 10 3C6.13401 3 3 6.13401 3 10C3 12.7916 4.63419 15.2026 7 16.3265V14.5C7 14.2239 7.22386 14 7.5 14C7.77614 14 8 14.2239 8 14.5V17.5C8 17.7761 7.77614 18 7.5 18H4.5C4.22386 18 4 17.7761 4 17.5C4 17.2239 4.22386 17 4.5 17H6.12422C3.66539 15.6357 2 13.0128 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10C18 10.2761 17.7761 10.5 17.5 10.5C17.2239 10.5 17 10.2761 17 10Z",fill:"currentColor"}),E("path",{d:"M10 12C8.89543 12 8 11.1046 8 10C8 8.89543 8.89543 8 10 8C11.1046 8 12 8.89543 12 10C12 11.1046 11.1046 12 10 12ZM10 11C10.5523 11 11 10.5523 11 10C11 9.44772 10.5523 9 10 9C9.44772 9 9 9.44772 9 10C9 10.5523 9.44772 11 10 11Z",fill:"currentColor"}))),o6=Xt("zoomIn",E("svg",{viewBox:"0 0 20 20",fill:"none",xmlns:"http://www.w3.org/2000/svg"},E("path",{d:"M11.5 8.5C11.5 8.22386 11.2761 8 11 8H9V6C9 5.72386 8.77614 5.5 8.5 5.5C8.22386 5.5 8 5.72386 8 6V8H6C5.72386 8 5.5 8.22386 5.5 8.5C5.5 8.77614 5.72386 9 6 9H8V11C8 11.2761 8.22386 11.5 8.5 11.5C8.77614 11.5 9 11.2761 9 11V9H11C11.2761 9 11.5 8.77614 11.5 8.5Z",fill:"currentColor"}),E("path",{d:"M8.5 3C11.5376 3 14 5.46243 14 8.5C14 9.83879 13.5217 11.0659 12.7266 12.0196L16.8536 16.1464C17.0488 16.3417 17.0488 16.6583 16.8536 16.8536C16.68 17.0271 16.4106 17.0464 16.2157 16.9114L16.1464 16.8536L12.0196 12.7266C11.0659 13.5217 9.83879 14 8.5 14C5.46243 14 3 11.5376 3 8.5C3 5.46243 5.46243 3 8.5 3ZM8.5 4C6.01472 4 4 6.01472 4 8.5C4 10.9853 6.01472 13 8.5 13C10.9853 13 13 10.9853 13 8.5C13 6.01472 10.9853 4 8.5 4Z",fill:"currentColor"}))),n6=Xt("zoomOut",E("svg",{viewBox:"0 0 20 20",fill:"none",xmlns:"http://www.w3.org/2000/svg"},E("path",{d:"M11 8C11.2761 8 11.5 8.22386 11.5 8.5C11.5 8.77614 11.2761 9 11 9H6C5.72386 9 5.5 8.77614 5.5 8.5C5.5 8.22386 5.72386 8 6 8H11Z",fill:"currentColor"}),E("path",{d:"M14 8.5C14 5.46243 11.5376 3 8.5 3C5.46243 3 3 5.46243 3 8.5C3 11.5376 5.46243 14 8.5 14C9.83879 14 11.0659 13.5217 12.0196 12.7266L16.1464 16.8536L16.2157 16.9114C16.4106 17.0464 16.68 17.0271 16.8536 16.8536C17.0488 16.6583 17.0488 16.3417 16.8536 16.1464L12.7266 12.0196C13.5217 11.0659 14 9.83879 14 8.5ZM4 8.5C4 6.01472 6.01472 4 8.5 4C10.9853 4 13 6.01472 13 8.5C13 10.9853 10.9853 13 8.5 13C6.01472 13 4 10.9853 4 8.5Z",fill:"currentColor"}))),i6=be({name:"ResizeSmall",render(){return E("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20"},E("g",{fill:"none"},E("path",{d:"M5.5 4A1.5 1.5 0 0 0 4 5.5v1a.5.5 0 0 1-1 0v-1A2.5 2.5 0 0 1 5.5 3h1a.5.5 0 0 1 0 1h-1zM16 5.5A1.5 1.5 0 0 0 14.5 4h-1a.5.5 0 0 1 0-1h1A2.5 2.5 0 0 1 17 5.5v1a.5.5 0 0 1-1 0v-1zm0 9a1.5 1.5 0 0 1-1.5 1.5h-1a.5.5 0 0 0 0 1h1a2.5 2.5 0 0 0 2.5-2.5v-1a.5.5 0 0 0-1 0v1zm-12 0A1.5 1.5 0 0 0 5.5 16h1.25a.5.5 0 0 1 0 1H5.5A2.5 2.5 0 0 1 3 14.5v-1.25a.5.5 0 0 1 1 0v1.25zM8.5 7A1.5 1.5 0 0 0 7 8.5v3A1.5 1.5 0 0 0 8.5 13h3a1.5 1.5 0 0 0 1.5-1.5v-3A1.5 1.5 0 0 0 11.5 7h-3zM8 8.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-3z",fill:"currentColor"})))}}),Kl=be({name:"BaseIconSwitchTransition",setup(e,{slots:t}){const r=Ri();return()=>E(qt,{name:"icon-switch-transition",appear:r.value},t)}}),ql=be({name:"FadeInExpandTransition",props:{appear:Boolean,group:Boolean,mode:String,onLeave:Function,onAfterLeave:Function,onAfterEnter:Function,width:Boolean,reverse:Boolean},setup(e,{slots:t}){function r(a){e.width?a.style.maxWidth=`${a.offsetWidth}px`:a.style.maxHeight=`${a.offsetHeight}px`,a.offsetWidth}function o(a){e.width?a.style.maxWidth="0":a.style.maxHeight="0",a.offsetWidth;const{onLeave:l}=e;l&&l()}function n(a){e.width?a.style.maxWidth="":a.style.maxHeight="";const{onAfterLeave:l}=e;l&&l()}function i(a){if(a.style.transition="none",e.width){const l=a.offsetWidth;a.style.maxWidth="0",a.offsetWidth,a.style.transition="",a.style.maxWidth=`${l}px`}else if(e.reverse)a.style.maxHeight=`${a.offsetHeight}px`,a.offsetHeight,a.style.transition="",a.style.maxHeight="0";else{const l=a.offsetHeight;a.style.maxHeight="0",a.offsetWidth,a.style.transition="",a.style.maxHeight=`${l}px`}a.offsetWidth}function s(a){var l;e.width?a.style.maxWidth="":e.reverse||(a.style.maxHeight=""),(l=e.onAfterEnter)===null||l===void 0||l.call(e)}return()=>{const a=e.group?f2:qt;return E(a,{name:e.width?"fade-in-width-expand-transition":"fade-in-height-expand-transition",mode:e.mode,appear:e.appear,onEnter:i,onAfterEnter:s,onBeforeLeave:r,onLeave:o,onAfterLeave:n},t)}}}),s6=W("base-icon",`
 height: 1em;
 width: 1em;
 line-height: 1em;
 text-align: center;
 display: inline-block;
 position: relative;
 fill: currentColor;
 transform: translateZ(0);
`,[N("svg",`
 height: 1em;
 width: 1em;
 `)]),dt=be({name:"BaseIcon",props:{role:String,ariaLabel:String,ariaDisabled:{type:Boolean,default:void 0},ariaHidden:{type:Boolean,default:void 0},clsPrefix:{type:String,required:!0},onClick:Function,onMousedown:Function,onMouseup:Function},setup(e){Vl("-base-icon",s6,Be(e,"clsPrefix"))},render(){return E("i",{class:`${this.clsPrefix}-base-icon`,onClick:this.onClick,onMousedown:this.onMousedown,onMouseup:this.onMouseup,role:this.role,"aria-label":this.ariaLabel,"aria-hidden":this.ariaHidden,"aria-disabled":this.ariaDisabled},this.$slots)}}),a6=W("base-close",`
 display: flex;
 align-items: center;
 justify-content: center;
 cursor: pointer;
 background-color: transparent;
 color: var(--n-close-icon-color);
 border-radius: var(--n-close-border-radius);
 height: var(--n-close-size);
 width: var(--n-close-size);
 font-size: var(--n-close-icon-size);
 outline: none;
 border: none;
 position: relative;
 padding: 0;
`,[re("absolute",`
 height: var(--n-close-icon-size);
 width: var(--n-close-icon-size);
 `),N("&::before",`
 content: "";
 position: absolute;
 width: var(--n-close-size);
 height: var(--n-close-size);
 left: 50%;
 top: 50%;
 transform: translateY(-50%) translateX(-50%);
 transition: inherit;
 border-radius: inherit;
 `),Cn("disabled",[N("&:hover",`
 color: var(--n-close-icon-color-hover);
 `),N("&:hover::before",`
 background-color: var(--n-close-color-hover);
 `),N("&:focus::before",`
 background-color: var(--n-close-color-hover);
 `),N("&:active",`
 color: var(--n-close-icon-color-pressed);
 `),N("&:active::before",`
 background-color: var(--n-close-color-pressed);
 `)]),re("disabled",`
 cursor: not-allowed;
 color: var(--n-close-icon-color-disabled);
 background-color: transparent;
 `),re("round",[N("&::before",`
 border-radius: 50%;
 `)])]),Gl=be({name:"BaseClose",props:{isButtonTag:{type:Boolean,default:!0},clsPrefix:{type:String,required:!0},disabled:{type:Boolean,default:void 0},focusable:{type:Boolean,default:!0},round:Boolean,onClick:Function,absolute:Boolean},setup(e){return Vl("-base-close",a6,Be(e,"clsPrefix")),()=>{const{clsPrefix:t,disabled:r,absolute:o,round:n,isButtonTag:i}=e;return E(i?"button":"div",{type:i?"button":void 0,tabindex:r||!e.focusable?-1:0,"aria-disabled":r,"aria-label":"close",role:i?void 0:"button",disabled:r,class:[`${t}-base-close`,o&&`${t}-base-close--absolute`,r&&`${t}-base-close--disabled`,n&&`${t}-base-close--round`],onMousedown:a=>{e.focusable||a.preventDefault()},onClick:e.onClick},E(dt,{clsPrefix:t},{default:()=>E(X4,null)}))}}}),{cubicBezierEaseInOut:l6}=qo;function Ms({originalTransform:e="",left:t=0,top:r=0,transition:o=`all .3s ${l6} !important`}={}){return[N("&.icon-switch-transition-enter-from, &.icon-switch-transition-leave-to",{transform:e+" scale(0.75)",left:t,top:r,opacity:0}),N("&.icon-switch-transition-enter-to, &.icon-switch-transition-leave-from",{transform:`scale(1) ${e}`,left:t,top:r,opacity:1}),N("&.icon-switch-transition-enter-active, &.icon-switch-transition-leave-active",{transformOrigin:"center",position:"absolute",left:t,top:r,transition:o})]}const c6=N([N("@keyframes loading-container-rotate",`
 to {
 -webkit-transform: rotate(360deg);
 transform: rotate(360deg);
 }
 `),N("@keyframes loading-layer-rotate",`
 12.5% {
 -webkit-transform: rotate(135deg);
 transform: rotate(135deg);
 }
 25% {
 -webkit-transform: rotate(270deg);
 transform: rotate(270deg);
 }
 37.5% {
 -webkit-transform: rotate(405deg);
 transform: rotate(405deg);
 }
 50% {
 -webkit-transform: rotate(540deg);
 transform: rotate(540deg);
 }
 62.5% {
 -webkit-transform: rotate(675deg);
 transform: rotate(675deg);
 }
 75% {
 -webkit-transform: rotate(810deg);
 transform: rotate(810deg);
 }
 87.5% {
 -webkit-transform: rotate(945deg);
 transform: rotate(945deg);
 }
 100% {
 -webkit-transform: rotate(1080deg);
 transform: rotate(1080deg);
 } 
 `),N("@keyframes loading-left-spin",`
 from {
 -webkit-transform: rotate(265deg);
 transform: rotate(265deg);
 }
 50% {
 -webkit-transform: rotate(130deg);
 transform: rotate(130deg);
 }
 to {
 -webkit-transform: rotate(265deg);
 transform: rotate(265deg);
 }
 `),N("@keyframes loading-right-spin",`
 from {
 -webkit-transform: rotate(-265deg);
 transform: rotate(-265deg);
 }
 50% {
 -webkit-transform: rotate(-130deg);
 transform: rotate(-130deg);
 }
 to {
 -webkit-transform: rotate(-265deg);
 transform: rotate(-265deg);
 }
 `),W("base-loading",`
 position: relative;
 line-height: 0;
 width: 1em;
 height: 1em;
 `,[oe("transition-wrapper",`
 position: absolute;
 width: 100%;
 height: 100%;
 `,[Ms()]),oe("container",`
 display: inline-flex;
 position: relative;
 direction: ltr;
 line-height: 0;
 animation: loading-container-rotate 1568.2352941176ms linear infinite;
 font-size: 0;
 letter-spacing: 0;
 white-space: nowrap;
 opacity: 1;
 width: 100%;
 height: 100%;
 `,[oe("svg",`
 stroke: var(--n-text-color);
 fill: transparent;
 position: absolute;
 height: 100%;
 overflow: hidden;
 `),oe("container-layer",`
 position: absolute;
 width: 100%;
 height: 100%;
 animation: loading-layer-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;
 `,[oe("container-layer-left",`
 display: inline-flex;
 position: relative;
 width: 50%;
 height: 100%;
 overflow: hidden;
 `,[oe("svg",`
 animation: loading-left-spin 1333ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;
 width: 200%;
 `)]),oe("container-layer-patch",`
 position: absolute;
 top: 0;
 left: 47.5%;
 box-sizing: border-box;
 width: 5%;
 height: 100%;
 overflow: hidden;
 `,[oe("svg",`
 left: -900%;
 width: 2000%;
 transform: rotate(180deg);
 `)]),oe("container-layer-right",`
 display: inline-flex;
 position: relative;
 width: 50%;
 height: 100%;
 overflow: hidden;
 `,[oe("svg",`
 animation: loading-right-spin 1333ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;
 left: -100%;
 width: 200%;
 `)])])]),oe("placeholder",`
 position: absolute;
 left: 50%;
 top: 50%;
 transform: translateX(-50%) translateY(-50%);
 `,[Ms({left:"50%",top:"50%",originalTransform:"translateX(-50%) translateY(-50%)"})])])]),u6={strokeWidth:{type:Number,default:28},stroke:{type:String,default:void 0}},Ib=be({name:"BaseLoading",props:Object.assign({clsPrefix:{type:String,required:!0},show:{type:Boolean,default:!0},scale:{type:Number,default:1},radius:{type:Number,default:100}},u6),setup(e){Vl("-base-loading",c6,Be(e,"clsPrefix"))},render(){const{clsPrefix:e,radius:t,strokeWidth:r,stroke:o,scale:n}=this,i=t/n;return E("div",{class:`${e}-base-loading`,role:"img","aria-label":"loading"},E(Kl,null,{default:()=>this.show?E("div",{key:"icon",class:`${e}-base-loading__transition-wrapper`},E("div",{class:`${e}-base-loading__container`},E("div",{class:`${e}-base-loading__container-layer`},E("div",{class:`${e}-base-loading__container-layer-left`},E("svg",{class:`${e}-base-loading__svg`,viewBox:`0 0 ${2*i} ${2*i}`,xmlns:"http://www.w3.org/2000/svg",style:{color:o}},E("circle",{fill:"none",stroke:"currentColor","stroke-width":r,"stroke-linecap":"round",cx:i,cy:i,r:t-r/2,"stroke-dasharray":4.91*t,"stroke-dashoffset":2.46*t}))),E("div",{class:`${e}-base-loading__container-layer-patch`},E("svg",{class:`${e}-base-loading__svg`,viewBox:`0 0 ${2*i} ${2*i}`,xmlns:"http://www.w3.org/2000/svg",style:{color:o}},E("circle",{fill:"none",stroke:"currentColor","stroke-width":r,"stroke-linecap":"round",cx:i,cy:i,r:t-r/2,"stroke-dasharray":4.91*t,"stroke-dashoffset":2.46*t}))),E("div",{class:`${e}-base-loading__container-layer-right`},E("svg",{class:`${e}-base-loading__svg`,viewBox:`0 0 ${2*i} ${2*i}`,xmlns:"http://www.w3.org/2000/svg",style:{color:o}},E("circle",{fill:"none",stroke:"currentColor","stroke-width":r,"stroke-linecap":"round",cx:i,cy:i,r:t-r/2,"stroke-dasharray":4.91*t,"stroke-dashoffset":2.46*t})))))):E("div",{key:"placeholder",class:`${e}-base-loading__placeholder`},this.$slots)}))}}),ue={neutralBase:"#000",neutralInvertBase:"#fff",neutralTextBase:"#fff",neutralPopover:"rgb(72, 72, 78)",neutralCard:"rgb(24, 24, 28)",neutralModal:"rgb(44, 44, 50)",neutralBody:"rgb(16, 16, 20)",alpha1:"0.9",alpha2:"0.82",alpha3:"0.52",alpha4:"0.38",alpha5:"0.28",alphaClose:"0.52",alphaDisabled:"0.38",alphaDisabledInput:"0.06",alphaPending:"0.09",alphaTablePending:"0.06",alphaTableStriped:"0.05",alphaPressed:"0.05",alphaAvatar:"0.18",alphaRail:"0.2",alphaProgressRail:"0.12",alphaBorder:"0.24",alphaDivider:"0.09",alphaInput:"0.1",alphaAction:"0.06",alphaTab:"0.04",alphaScrollbar:"0.2",alphaScrollbarHover:"0.3",alphaCode:"0.12",alphaTag:"0.2",primaryHover:"#7fe7c4",primaryDefault:"#63e2b7",primaryActive:"#5acea7",primarySuppl:"rgb(42, 148, 125)",infoHover:"#8acbec",infoDefault:"#70c0e8",infoActive:"#66afd3",infoSuppl:"rgb(56, 137, 197)",errorHover:"#e98b8b",errorDefault:"#e88080",errorActive:"#e57272",errorSuppl:"rgb(208, 58, 82)",warningHover:"#f5d599",warningDefault:"#f2c97d",warningActive:"#e6c260",warningSuppl:"rgb(240, 138, 0)",successHover:"#7fe7c4",successDefault:"#63e2b7",successActive:"#5acea7",successSuppl:"rgb(42, 148, 125)"},d6=no(ue.neutralBase),Rb=no(ue.neutralInvertBase),f6="rgba("+Rb.slice(0,3).join(", ")+", ";function Ne(e){return f6+String(e)+")"}function h6(e){const t=Array.from(Rb);return t[3]=Number(e),he(d6,t)}const p6=Object.assign(Object.assign({name:"common"},qo),{baseColor:ue.neutralBase,primaryColor:ue.primaryDefault,primaryColorHover:ue.primaryHover,primaryColorPressed:ue.primaryActive,primaryColorSuppl:ue.primarySuppl,infoColor:ue.infoDefault,infoColorHover:ue.infoHover,infoColorPressed:ue.infoActive,infoColorSuppl:ue.infoSuppl,successColor:ue.successDefault,successColorHover:ue.successHover,successColorPressed:ue.successActive,successColorSuppl:ue.successSuppl,warningColor:ue.warningDefault,warningColorHover:ue.warningHover,warningColorPressed:ue.warningActive,warningColorSuppl:ue.warningSuppl,errorColor:ue.errorDefault,errorColorHover:ue.errorHover,errorColorPressed:ue.errorActive,errorColorSuppl:ue.errorSuppl,textColorBase:ue.neutralTextBase,textColor1:Ne(ue.alpha1),textColor2:Ne(ue.alpha2),textColor3:Ne(ue.alpha3),textColorDisabled:Ne(ue.alpha4),placeholderColor:Ne(ue.alpha4),placeholderColorDisabled:Ne(ue.alpha5),iconColor:Ne(ue.alpha4),iconColorDisabled:Ne(ue.alpha5),iconColorHover:Ne(Number(ue.alpha4)*1.25),iconColorPressed:Ne(Number(ue.alpha4)*.8),opacity1:ue.alpha1,opacity2:ue.alpha2,opacity3:ue.alpha3,opacity4:ue.alpha4,opacity5:ue.alpha5,dividerColor:Ne(ue.alphaDivider),borderColor:Ne(ue.alphaBorder),closeIconColorHover:Ne(Number(ue.alphaClose)),closeIconColor:Ne(Number(ue.alphaClose)),closeIconColorPressed:Ne(Number(ue.alphaClose)),closeColorHover:"rgba(255, 255, 255, .12)",closeColorPressed:"rgba(255, 255, 255, .08)",clearColor:Ne(ue.alpha4),clearColorHover:pt(Ne(ue.alpha4),{alpha:1.25}),clearColorPressed:pt(Ne(ue.alpha4),{alpha:.8}),scrollbarColor:Ne(ue.alphaScrollbar),scrollbarColorHover:Ne(ue.alphaScrollbarHover),scrollbarWidth:"5px",scrollbarHeight:"5px",scrollbarBorderRadius:"5px",progressRailColor:Ne(ue.alphaProgressRail),railColor:Ne(ue.alphaRail),popoverColor:ue.neutralPopover,tableColor:ue.neutralCard,cardColor:ue.neutralCard,modalColor:ue.neutralModal,bodyColor:ue.neutralBody,tagColor:h6(ue.alphaTag),avatarColor:Ne(ue.alphaAvatar),invertedColor:ue.neutralBase,inputColor:Ne(ue.alphaInput),codeColor:Ne(ue.alphaCode),tabColor:Ne(ue.alphaTab),actionColor:Ne(ue.alphaAction),tableHeaderColor:Ne(ue.alphaAction),hoverColor:Ne(ue.alphaPending),tableColorHover:Ne(ue.alphaTablePending),tableColorStriped:Ne(ue.alphaTableStriped),pressedColor:Ne(ue.alphaPressed),opacityDisabled:ue.alphaDisabled,inputColorDisabled:Ne(ue.alphaDisabledInput),buttonColor2:"rgba(255, 255, 255, .08)",buttonColor2Hover:"rgba(255, 255, 255, .12)",buttonColor2Pressed:"rgba(255, 255, 255, .08)",boxShadow1:"0 1px 2px -2px rgba(0, 0, 0, .24), 0 3px 6px 0 rgba(0, 0, 0, .18), 0 5px 12px 4px rgba(0, 0, 0, .12)",boxShadow2:"0 3px 6px -4px rgba(0, 0, 0, .24), 0 6px 12px 0 rgba(0, 0, 0, .16), 0 9px 18px 8px rgba(0, 0, 0, .10)",boxShadow3:"0 6px 16px -9px rgba(0, 0, 0, .08), 0 9px 28px 0 rgba(0, 0, 0, .05), 0 12px 48px 16px rgba(0, 0, 0, .03)"}),ne=p6,xe={neutralBase:"#FFF",neutralInvertBase:"#000",neutralTextBase:"#000",neutralPopover:"#fff",neutralCard:"#fff",neutralModal:"#fff",neutralBody:"#fff",alpha1:"0.82",alpha2:"0.72",alpha3:"0.38",alpha4:"0.24",alpha5:"0.18",alphaClose:"0.6",alphaDisabled:"0.5",alphaDisabledInput:"0.02",alphaPending:"0.05",alphaTablePending:"0.02",alphaPressed:"0.07",alphaAvatar:"0.2",alphaRail:"0.14",alphaProgressRail:".08",alphaBorder:"0.12",alphaDivider:"0.06",alphaInput:"0",alphaAction:"0.02",alphaTab:"0.04",alphaScrollbar:"0.25",alphaScrollbarHover:"0.4",alphaCode:"0.05",alphaTag:"0.02",primaryHover:"#36ad6a",primaryDefault:"#18a058",primaryActive:"#0c7a43",primarySuppl:"#36ad6a",infoHover:"#4098fc",infoDefault:"#2080f0",infoActive:"#1060c9",infoSuppl:"#4098fc",errorHover:"#de576d",errorDefault:"#d03050",errorActive:"#ab1f3f",errorSuppl:"#de576d",warningHover:"#fcb040",warningDefault:"#f0a020",warningActive:"#c97c10",warningSuppl:"#fcb040",successHover:"#36ad6a",successDefault:"#18a058",successActive:"#0c7a43",successSuppl:"#36ad6a"},g6=no(xe.neutralBase),Ob=no(xe.neutralInvertBase),m6="rgba("+Ob.slice(0,3).join(", ")+", ";function Rp(e){return m6+String(e)+")"}function Rt(e){const t=Array.from(Ob);return t[3]=Number(e),he(g6,t)}const b6=Object.assign(Object.assign({name:"common"},qo),{baseColor:xe.neutralBase,primaryColor:xe.primaryDefault,primaryColorHover:xe.primaryHover,primaryColorPressed:xe.primaryActive,primaryColorSuppl:xe.primarySuppl,infoColor:xe.infoDefault,infoColorHover:xe.infoHover,infoColorPressed:xe.infoActive,infoColorSuppl:xe.infoSuppl,successColor:xe.successDefault,successColorHover:xe.successHover,successColorPressed:xe.successActive,successColorSuppl:xe.successSuppl,warningColor:xe.warningDefault,warningColorHover:xe.warningHover,warningColorPressed:xe.warningActive,warningColorSuppl:xe.warningSuppl,errorColor:xe.errorDefault,errorColorHover:xe.errorHover,errorColorPressed:xe.errorActive,errorColorSuppl:xe.errorSuppl,textColorBase:xe.neutralTextBase,textColor1:"rgb(31, 34, 37)",textColor2:"rgb(51, 54, 57)",textColor3:"rgb(118, 124, 130)",textColorDisabled:Rt(xe.alpha4),placeholderColor:Rt(xe.alpha4),placeholderColorDisabled:Rt(xe.alpha5),iconColor:Rt(xe.alpha4),iconColorHover:pt(Rt(xe.alpha4),{lightness:.75}),iconColorPressed:pt(Rt(xe.alpha4),{lightness:.9}),iconColorDisabled:Rt(xe.alpha5),opacity1:xe.alpha1,opacity2:xe.alpha2,opacity3:xe.alpha3,opacity4:xe.alpha4,opacity5:xe.alpha5,dividerColor:"rgb(239, 239, 245)",borderColor:"rgb(224, 224, 230)",closeIconColor:Rt(Number(xe.alphaClose)),closeIconColorHover:Rt(Number(xe.alphaClose)),closeIconColorPressed:Rt(Number(xe.alphaClose)),closeColorHover:"rgba(0, 0, 0, .09)",closeColorPressed:"rgba(0, 0, 0, .13)",clearColor:Rt(xe.alpha4),clearColorHover:pt(Rt(xe.alpha4),{lightness:.75}),clearColorPressed:pt(Rt(xe.alpha4),{lightness:.9}),scrollbarColor:Rp(xe.alphaScrollbar),scrollbarColorHover:Rp(xe.alphaScrollbarHover),scrollbarWidth:"5px",scrollbarHeight:"5px",scrollbarBorderRadius:"5px",progressRailColor:Rt(xe.alphaProgressRail),railColor:"rgb(219, 219, 223)",popoverColor:xe.neutralPopover,tableColor:xe.neutralCard,cardColor:xe.neutralCard,modalColor:xe.neutralModal,bodyColor:xe.neutralBody,tagColor:"#eee",avatarColor:Rt(xe.alphaAvatar),invertedColor:"rgb(0, 20, 40)",inputColor:Rt(xe.alphaInput),codeColor:"rgb(244, 244, 248)",tabColor:"rgb(247, 247, 250)",actionColor:"rgb(250, 250, 252)",tableHeaderColor:"rgb(250, 250, 252)",hoverColor:"rgb(243, 243, 245)",tableColorHover:"rgba(0, 0, 100, 0.03)",tableColorStriped:"rgba(0, 0, 100, 0.02)",pressedColor:"rgb(237, 237, 239)",opacityDisabled:xe.alphaDisabled,inputColorDisabled:"rgb(250, 250, 252)",buttonColor2:"rgba(46, 51, 56, .05)",buttonColor2Hover:"rgba(46, 51, 56, .09)",buttonColor2Pressed:"rgba(46, 51, 56, .13)",boxShadow1:"0 1px 2px -2px rgba(0, 0, 0, .08), 0 3px 6px 0 rgba(0, 0, 0, .06), 0 5px 12px 4px rgba(0, 0, 0, .04)",boxShadow2:"0 3px 6px -4px rgba(0, 0, 0, .12), 0 6px 16px 0 rgba(0, 0, 0, .08), 0 9px 28px 8px rgba(0, 0, 0, .05)",boxShadow3:"0 6px 16px -9px rgba(0, 0, 0, .08), 0 9px 28px 0 rgba(0, 0, 0, .05), 0 12px 48px 16px rgba(0, 0, 0, .03)"}),ie=b6,v6={iconSizeSmall:"34px",iconSizeMedium:"40px",iconSizeLarge:"46px",iconSizeHuge:"52px"},Ab=e=>{const{textColorDisabled:t,iconColor:r,textColor2:o,fontSizeSmall:n,fontSizeMedium:i,fontSizeLarge:s,fontSizeHuge:a}=e;return Object.assign(Object.assign({},v6),{fontSizeSmall:n,fontSizeMedium:i,fontSizeLarge:s,fontSizeHuge:a,textColor:t,iconColor:r,extraTextColor:o})},y6={name:"Empty",common:ie,self:Ab},uo=y6,x6={name:"Empty",common:ne,self:Ab},Bn=x6,Bb=e=>{const{scrollbarColor:t,scrollbarColorHover:r}=e;return{color:t,colorHover:r}},C6={name:"Scrollbar",common:ie,self:Bb},Nt=C6,w6={name:"Scrollbar",common:ne,self:Bb},Yt=w6,{cubicBezierEaseInOut:Op}=qo;function Hs({name:e="fade-in",enterDuration:t="0.2s",leaveDuration:r="0.2s",enterCubicBezier:o=Op,leaveCubicBezier:n=Op}={}){return[N(`&.${e}-transition-enter-active`,{transition:`all ${t} ${o}!important`}),N(`&.${e}-transition-leave-active`,{transition:`all ${r} ${n}!important`}),N(`&.${e}-transition-enter-from, &.${e}-transition-leave-to`,{opacity:0}),N(`&.${e}-transition-leave-from, &.${e}-transition-enter-to`,{opacity:1})]}const S6=W("scrollbar",`
 overflow: hidden;
 position: relative;
 z-index: auto;
 height: 100%;
 width: 100%;
`,[N(">",[W("scrollbar-container",`
 width: 100%;
 overflow: scroll;
 height: 100%;
 max-height: inherit;
 scrollbar-width: none;
 `,[N("&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb",`
 width: 0;
 height: 0;
 display: none;
 `),N(">",[W("scrollbar-content",`
 box-sizing: border-box;
 min-width: 100%;
 `)])])]),N(">, +",[W("scrollbar-rail",`
 position: absolute;
 pointer-events: none;
 user-select: none;
 -webkit-user-select: none;
 `,[re("horizontal",`
 left: 2px;
 right: 2px;
 bottom: 4px;
 height: var(--n-scrollbar-height);
 `,[N(">",[oe("scrollbar",`
 height: var(--n-scrollbar-height);
 border-radius: var(--n-scrollbar-border-radius);
 right: 0;
 `)])]),re("vertical",`
 right: 4px;
 top: 2px;
 bottom: 2px;
 width: var(--n-scrollbar-width);
 `,[N(">",[oe("scrollbar",`
 width: var(--n-scrollbar-width);
 border-radius: var(--n-scrollbar-border-radius);
 bottom: 0;
 `)])]),re("disabled",[N(">",[oe("scrollbar",{pointerEvents:"none"})])]),N(">",[oe("scrollbar",`
 position: absolute;
 cursor: pointer;
 pointer-events: all;
 background-color: var(--n-scrollbar-color);
 transition: background-color .2s var(--n-scrollbar-bezier);
 `,[Hs(),N("&:hover",{backgroundColor:"var(--n-scrollbar-color-hover)"})])])])])]),E6=Object.assign(Object.assign({},Xe.props),{size:{type:Number,default:5},duration:{type:Number,default:0},scrollable:{type:Boolean,default:!0},xScrollable:Boolean,trigger:{type:String,default:"hover"},useUnifiedContainer:Boolean,triggerDisplayManually:Boolean,container:Function,content:Function,containerClass:String,containerStyle:[String,Object],contentClass:String,contentStyle:[String,Object],horizontalRailStyle:[String,Object],verticalRailStyle:[String,Object],onScroll:Function,onWheel:Function,onResize:Function,internalOnUpdateScrollLeft:Function,internalHoistYRail:Boolean}),Mb=be({name:"Scrollbar",props:E6,inheritAttrs:!1,setup(e){const{mergedClsPrefixRef:t,inlineThemeDisabled:r,mergedRtlRef:o}=kt(e),n=qs("Scrollbar",o,t),i=K(null),s=K(null),a=K(null),l=K(null),c=K(null),u=K(null),d=K(null),f=K(null),h=K(null),p=K(null),m=K(null),y=K(0),g=K(0),w=K(!1),T=K(!1);let x=!1,C=!1,$,S,L=0,k=0,I=0,A=0;const R=gS(),F=q(()=>{const{value:ee}=f,{value:ge}=u,{value:Ee}=p;return ee===null||ge===null||Ee===null?0:Math.min(ee,Ee*ee/ge+e.size*1.5)}),H=q(()=>`${F.value}px`),J=q(()=>{const{value:ee}=h,{value:ge}=d,{value:Ee}=m;return ee===null||ge===null||Ee===null?0:Ee*ee/ge+e.size*1.5}),Y=q(()=>`${J.value}px`),Z=q(()=>{const{value:ee}=f,{value:ge}=y,{value:Ee}=u,{value:nt}=p;if(ee===null||Ee===null||nt===null)return 0;{const bt=Ee-ee;return bt?ge/bt*(nt-F.value):0}}),se=q(()=>`${Z.value}px`),ve=q(()=>{const{value:ee}=h,{value:ge}=g,{value:Ee}=d,{value:nt}=m;if(ee===null||Ee===null||nt===null)return 0;{const bt=Ee-ee;return bt?ge/bt*(nt-J.value):0}}),Le=q(()=>`${ve.value}px`),_e=q(()=>{const{value:ee}=f,{value:ge}=u;return ee!==null&&ge!==null&&ge>ee}),Ae=q(()=>{const{value:ee}=h,{value:ge}=d;return ee!==null&&ge!==null&&ge>ee}),ut=q(()=>{const{trigger:ee}=e;return ee==="none"||w.value}),Ue=q(()=>{const{trigger:ee}=e;return ee==="none"||T.value}),j=q(()=>{const{container:ee}=e;return ee?ee():s.value}),Q=q(()=>{const{content:ee}=e;return ee?ee():a.value}),te=dE(()=>{e.container||Te({top:y.value,left:g.value})}),de=()=>{te.isDeactivated||ce()},ae=ee=>{if(te.isDeactivated)return;const{onResize:ge}=e;ge&&ge(ee),ce()},Te=(ee,ge)=>{if(!e.scrollable)return;if(typeof ee=="number"){_(ge!=null?ge:0,ee,0,!1,"auto");return}const{left:Ee,top:nt,index:bt,elSize:Ut,position:Kr,behavior:ht,el:qr,debounce:zi=!0}=ee;(Ee!==void 0||nt!==void 0)&&_(Ee!=null?Ee:0,nt!=null?nt:0,0,!1,ht),qr!==void 0?_(0,qr.offsetTop,qr.offsetHeight,zi,ht):bt!==void 0&&Ut!==void 0?_(0,bt*Ut,Ut,zi,ht):Kr==="bottom"?_(0,Number.MAX_SAFE_INTEGER,0,!1,ht):Kr==="top"&&_(0,0,0,!1,ht)},me=(ee,ge)=>{if(!e.scrollable)return;const{value:Ee}=j;!Ee||(typeof ee=="object"?Ee.scrollBy(ee):Ee.scrollBy(ee,ge||0))};function _(ee,ge,Ee,nt,bt){const{value:Ut}=j;if(!!Ut){if(nt){const{scrollTop:Kr,offsetHeight:ht}=Ut;if(ge>Kr){ge+Ee<=Kr+ht||Ut.scrollTo({left:ee,top:ge+Ee-ht,behavior:bt});return}}Ut.scrollTo({left:ee,top:ge,behavior:bt})}}function b(){V(),X(),ce()}function v(){P()}function P(){O(),M()}function O(){S!==void 0&&window.clearTimeout(S),S=window.setTimeout(()=>{T.value=!1},e.duration)}function M(){$!==void 0&&window.clearTimeout($),$=window.setTimeout(()=>{w.value=!1},e.duration)}function V(){$!==void 0&&window.clearTimeout($),w.value=!0}function X(){S!==void 0&&window.clearTimeout(S),T.value=!0}function U(ee){const{onScroll:ge}=e;ge&&ge(ee),z()}function z(){const{value:ee}=j;ee&&(y.value=ee.scrollTop,g.value=ee.scrollLeft*(n!=null&&n.value?-1:1))}function B(){const{value:ee}=Q;ee&&(u.value=ee.offsetHeight,d.value=ee.offsetWidth);const{value:ge}=j;ge&&(f.value=ge.offsetHeight,h.value=ge.offsetWidth);const{value:Ee}=c,{value:nt}=l;Ee&&(m.value=Ee.offsetWidth),nt&&(p.value=nt.offsetHeight)}function D(){const{value:ee}=j;ee&&(y.value=ee.scrollTop,g.value=ee.scrollLeft*(n!=null&&n.value?-1:1),f.value=ee.offsetHeight,h.value=ee.offsetWidth,u.value=ee.scrollHeight,d.value=ee.scrollWidth);const{value:ge}=c,{value:Ee}=l;ge&&(m.value=ge.offsetWidth),Ee&&(p.value=Ee.offsetHeight)}function ce(){!e.scrollable||(e.useUnifiedContainer?D():(B(),z()))}function pe(ee){var ge;return!(!((ge=i.value)===null||ge===void 0)&&ge.contains(Ps(ee)))}function $e(ee){ee.preventDefault(),ee.stopPropagation(),C=!0,mt("mousemove",window,He,!0),mt("mouseup",window,Oe,!0),k=g.value,I=n!=null&&n.value?window.innerWidth-ee.clientX:ee.clientX}function He(ee){if(!C)return;$!==void 0&&window.clearTimeout($),S!==void 0&&window.clearTimeout(S);const{value:ge}=h,{value:Ee}=d,{value:nt}=J;if(ge===null||Ee===null)return;const Ut=(n!=null&&n.value?window.innerWidth-ee.clientX-I:ee.clientX-I)*(Ee-ge)/(ge-nt),Kr=Ee-ge;let ht=k+Ut;ht=Math.min(Kr,ht),ht=Math.max(ht,0);const{value:qr}=j;if(qr){qr.scrollLeft=ht*(n!=null&&n.value?-1:1);const{internalOnUpdateScrollLeft:zi}=e;zi&&zi(ht)}}function Oe(ee){ee.preventDefault(),ee.stopPropagation(),tt("mousemove",window,He,!0),tt("mouseup",window,Oe,!0),C=!1,ce(),pe(ee)&&P()}function at(ee){ee.preventDefault(),ee.stopPropagation(),x=!0,mt("mousemove",window,It,!0),mt("mouseup",window,Pr,!0),L=y.value,A=ee.clientY}function It(ee){if(!x)return;$!==void 0&&window.clearTimeout($),S!==void 0&&window.clearTimeout(S);const{value:ge}=f,{value:Ee}=u,{value:nt}=F;if(ge===null||Ee===null)return;const Ut=(ee.clientY-A)*(Ee-ge)/(ge-nt),Kr=Ee-ge;let ht=L+Ut;ht=Math.min(Kr,ht),ht=Math.max(ht,0);const{value:qr}=j;qr&&(qr.scrollTop=ht)}function Pr(ee){ee.preventDefault(),ee.stopPropagation(),tt("mousemove",window,It,!0),tt("mouseup",window,Pr,!0),x=!1,ce(),pe(ee)&&P()}Er(()=>{const{value:ee}=Ae,{value:ge}=_e,{value:Ee}=t,{value:nt}=c,{value:bt}=l;nt&&(ee?nt.classList.remove(`${Ee}-scrollbar-rail--disabled`):nt.classList.add(`${Ee}-scrollbar-rail--disabled`)),bt&&(ge?bt.classList.remove(`${Ee}-scrollbar-rail--disabled`):bt.classList.add(`${Ee}-scrollbar-rail--disabled`))}),Lt(()=>{e.container||ce()}),xt(()=>{$!==void 0&&window.clearTimeout($),S!==void 0&&window.clearTimeout(S),tt("mousemove",window,It,!0),tt("mouseup",window,Pr,!0)});const ca=Xe("Scrollbar","-scrollbar",S6,Nt,e,t),ho=q(()=>{const{common:{cubicBezierEaseInOut:ee,scrollbarBorderRadius:ge,scrollbarHeight:Ee,scrollbarWidth:nt},self:{color:bt,colorHover:Ut}}=ca.value;return{"--n-scrollbar-bezier":ee,"--n-scrollbar-color":bt,"--n-scrollbar-color-hover":Ut,"--n-scrollbar-border-radius":ge,"--n-scrollbar-width":nt,"--n-scrollbar-height":Ee}}),Vr=r?br("scrollbar",void 0,ho,e):void 0;return Object.assign(Object.assign({},{scrollTo:Te,scrollBy:me,sync:ce,syncUnifiedContainer:D,handleMouseEnterWrapper:b,handleMouseLeaveWrapper:v}),{mergedClsPrefix:t,rtlEnabled:n,containerScrollTop:y,wrapperRef:i,containerRef:s,contentRef:a,yRailRef:l,xRailRef:c,needYBar:_e,needXBar:Ae,yBarSizePx:H,xBarSizePx:Y,yBarTopPx:se,xBarLeftPx:Le,isShowXBar:ut,isShowYBar:Ue,isIos:R,handleScroll:U,handleContentResize:de,handleContainerResize:ae,handleYScrollMouseDown:at,handleXScrollMouseDown:$e,cssVars:r?void 0:ho,themeClass:Vr==null?void 0:Vr.themeClass,onRender:Vr==null?void 0:Vr.onRender})},render(){var e;const{$slots:t,mergedClsPrefix:r,triggerDisplayManually:o,rtlEnabled:n,internalHoistYRail:i}=this;if(!this.scrollable)return(e=t.default)===null||e===void 0?void 0:e.call(t);const s=this.trigger==="none",a=()=>E("div",{ref:"yRailRef",class:[`${r}-scrollbar-rail`,`${r}-scrollbar-rail--vertical`],"data-scrollbar-rail":!0,style:this.verticalRailStyle,"aria-hidden":!0},E(s?Ch:qt,s?null:{name:"fade-in-transition"},{default:()=>this.needYBar&&this.isShowYBar&&!this.isIos?E("div",{class:`${r}-scrollbar-rail__scrollbar`,style:{height:this.yBarSizePx,top:this.yBarTopPx},onMousedown:this.handleYScrollMouseDown}):null})),l=()=>{var u,d;return(u=this.onRender)===null||u===void 0||u.call(this),E("div",Ml(this.$attrs,{role:"none",ref:"wrapperRef",class:[`${r}-scrollbar`,this.themeClass,n&&`${r}-scrollbar--rtl`],style:this.cssVars,onMouseenter:o?void 0:this.handleMouseEnterWrapper,onMouseleave:o?void 0:this.handleMouseLeaveWrapper}),[this.container?(d=t.default)===null||d===void 0?void 0:d.call(t):E("div",{role:"none",ref:"containerRef",class:[`${r}-scrollbar-container`,this.containerClass],style:this.containerStyle,onScroll:this.handleScroll,onWheel:this.onWheel},E(qh,{onResize:this.handleContentResize},{default:()=>E("div",{ref:"contentRef",role:"none",style:[{width:this.xScrollable?"fit-content":null},this.contentStyle],class:[`${r}-scrollbar-content`,this.contentClass]},t)})),i?null:a(),this.xScrollable&&E("div",{ref:"xRailRef",class:[`${r}-scrollbar-rail`,`${r}-scrollbar-rail--horizontal`],style:this.horizontalRailStyle,"data-scrollbar-rail":!0,"aria-hidden":!0},E(s?Ch:qt,s?null:{name:"fade-in-transition"},{default:()=>this.needXBar&&this.isShowXBar&&!this.isIos?E("div",{class:`${r}-scrollbar-rail__scrollbar`,style:{width:this.xBarSizePx,right:n?this.xBarLeftPx:void 0,left:n?void 0:this.xBarLeftPx},onMousedown:this.handleXScrollMouseDown}):null}))])},c=this.container?l():E(qh,{onResize:this.handleContainerResize},{default:l});return i?E(Qe,null,c,a()):c}}),Hb=Mb,_6=Mb,T6={height:"calc(var(--n-option-height) * 7.6)",paddingSmall:"4px 0",paddingMedium:"4px 0",paddingLarge:"4px 0",paddingHuge:"4px 0",optionPaddingSmall:"0 12px",optionPaddingMedium:"0 12px",optionPaddingLarge:"0 12px",optionPaddingHuge:"0 12px",loadingSize:"18px"},Db=e=>{const{borderRadius:t,popoverColor:r,textColor3:o,dividerColor:n,textColor2:i,primaryColorPressed:s,textColorDisabled:a,primaryColor:l,opacityDisabled:c,hoverColor:u,fontSizeSmall:d,fontSizeMedium:f,fontSizeLarge:h,fontSizeHuge:p,heightSmall:m,heightMedium:y,heightLarge:g,heightHuge:w}=e;return Object.assign(Object.assign({},T6),{optionFontSizeSmall:d,optionFontSizeMedium:f,optionFontSizeLarge:h,optionFontSizeHuge:p,optionHeightSmall:m,optionHeightMedium:y,optionHeightLarge:g,optionHeightHuge:w,borderRadius:t,color:r,groupHeaderTextColor:o,actionDividerColor:n,optionTextColor:i,optionTextColorPressed:s,optionTextColorDisabled:a,optionTextColorActive:l,optionOpacityDisabled:c,optionCheckColor:l,optionColorPending:u,optionColorActive:"rgba(0, 0, 0, 0)",optionColorActivePending:u,actionTextColor:i,loadingColor:l})},$6={name:"InternalSelectMenu",common:ie,peers:{Scrollbar:Nt,Empty:uo},self:Db},Zs=$6,P6={name:"InternalSelectMenu",common:ne,peers:{Scrollbar:Yt,Empty:Bn},self:Db},Js=P6,{cubicBezierEaseIn:Ap,cubicBezierEaseOut:Bp}=qo;function zb({transformOrigin:e="inherit",duration:t=".2s",enterScale:r=".9",originalTransform:o="",originalTransition:n=""}={}){return[N("&.fade-in-scale-up-transition-leave-active",{transformOrigin:e,transition:`opacity ${t} ${Ap}, transform ${t} ${Ap} ${n&&","+n}`}),N("&.fade-in-scale-up-transition-enter-active",{transformOrigin:e,transition:`opacity ${t} ${Bp}, transform ${t} ${Bp} ${n&&","+n}`}),N("&.fade-in-scale-up-transition-enter-from, &.fade-in-scale-up-transition-leave-to",{opacity:0,transform:`${o} scale(${r})`}),N("&.fade-in-scale-up-transition-leave-from, &.fade-in-scale-up-transition-enter-to",{opacity:1,transform:`${o} scale(1)`})]}const L6=W("base-wave",`
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 border-radius: inherit;
`),k6=be({name:"BaseWave",props:{clsPrefix:{type:String,required:!0}},setup(e){Vl("-base-wave",L6,Be(e,"clsPrefix"));const t=K(null),r=K(!1);let o=null;return xt(()=>{o!==null&&window.clearTimeout(o)}),{active:r,selfRef:t,play(){o!==null&&(window.clearTimeout(o),r.value=!1,o=null),zt(()=>{var n;(n=t.value)===null||n===void 0||n.offsetHeight,r.value=!0,o=window.setTimeout(()=>{r.value=!1,o=null},1e3)})}}},render(){const{clsPrefix:e}=this;return E("div",{ref:"selfRef","aria-hidden":!0,class:[`${e}-base-wave`,this.active&&`${e}-base-wave--active`]})}}),I6={space:"6px",spaceArrow:"10px",arrowOffset:"10px",arrowOffsetVertical:"10px",arrowHeight:"6px",padding:"8px 14px"},Fb=e=>{const{boxShadow2:t,popoverColor:r,textColor2:o,borderRadius:n,fontSize:i,dividerColor:s}=e;return Object.assign(Object.assign({},I6),{fontSize:i,borderRadius:n,color:r,dividerColor:s,textColor:o,boxShadow:t})},R6={name:"Popover",common:ie,self:Fb},Go=R6,O6={name:"Popover",common:ne,self:Fb},Mn=O6,Ic={top:"bottom",bottom:"top",left:"right",right:"left"},vt="var(--n-arrow-height) * 1.414",A6=N([W("popover",`
 transition:
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 position: relative;
 font-size: var(--n-font-size);
 color: var(--n-text-color);
 box-shadow: var(--n-box-shadow);
 word-break: break-word;
 `,[N(">",[W("scrollbar",`
 height: inherit;
 max-height: inherit;
 `)]),Cn("raw",`
 background-color: var(--n-color);
 border-radius: var(--n-border-radius);
 `,[Cn("scrollable",[Cn("show-header-or-footer","padding: var(--n-padding);")])]),oe("header",`
 padding: var(--n-padding);
 border-bottom: 1px solid var(--n-divider-color);
 transition: border-color .3s var(--n-bezier);
 `),oe("footer",`
 padding: var(--n-padding);
 border-top: 1px solid var(--n-divider-color);
 transition: border-color .3s var(--n-bezier);
 `),re("scrollable, show-header-or-footer",[oe("content",`
 padding: var(--n-padding);
 `)])]),W("popover-shared",`
 transform-origin: inherit;
 `,[W("popover-arrow-wrapper",`
 position: absolute;
 overflow: hidden;
 pointer-events: none;
 `,[W("popover-arrow",`
 transition: background-color .3s var(--n-bezier);
 position: absolute;
 display: block;
 width: calc(${vt});
 height: calc(${vt});
 box-shadow: 0 0 8px 0 rgba(0, 0, 0, .12);
 transform: rotate(45deg);
 background-color: var(--n-color);
 pointer-events: all;
 `)]),N("&.popover-transition-enter-from, &.popover-transition-leave-to",`
 opacity: 0;
 transform: scale(.85);
 `),N("&.popover-transition-enter-to, &.popover-transition-leave-from",`
 transform: scale(1);
 opacity: 1;
 `),N("&.popover-transition-enter-active",`
 transition:
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier),
 opacity .15s var(--n-bezier-ease-out),
 transform .15s var(--n-bezier-ease-out);
 `),N("&.popover-transition-leave-active",`
 transition:
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier),
 opacity .15s var(--n-bezier-ease-in),
 transform .15s var(--n-bezier-ease-in);
 `)]),lr("top-start",`
 top: calc(${vt} / -2);
 left: calc(${Gr("top-start")} - var(--v-offset-left));
 `),lr("top",`
 top: calc(${vt} / -2);
 transform: translateX(calc(${vt} / -2)) rotate(45deg);
 left: 50%;
 `),lr("top-end",`
 top: calc(${vt} / -2);
 right: calc(${Gr("top-end")} + var(--v-offset-left));
 `),lr("bottom-start",`
 bottom: calc(${vt} / -2);
 left: calc(${Gr("bottom-start")} - var(--v-offset-left));
 `),lr("bottom",`
 bottom: calc(${vt} / -2);
 transform: translateX(calc(${vt} / -2)) rotate(45deg);
 left: 50%;
 `),lr("bottom-end",`
 bottom: calc(${vt} / -2);
 right: calc(${Gr("bottom-end")} + var(--v-offset-left));
 `),lr("left-start",`
 left: calc(${vt} / -2);
 top: calc(${Gr("left-start")} - var(--v-offset-top));
 `),lr("left",`
 left: calc(${vt} / -2);
 transform: translateY(calc(${vt} / -2)) rotate(45deg);
 top: 50%;
 `),lr("left-end",`
 left: calc(${vt} / -2);
 bottom: calc(${Gr("left-end")} + var(--v-offset-top));
 `),lr("right-start",`
 right: calc(${vt} / -2);
 top: calc(${Gr("right-start")} - var(--v-offset-top));
 `),lr("right",`
 right: calc(${vt} / -2);
 transform: translateY(calc(${vt} / -2)) rotate(45deg);
 top: 50%;
 `),lr("right-end",`
 right: calc(${vt} / -2);
 bottom: calc(${Gr("right-end")} + var(--v-offset-top));
 `),...Y$({top:["right-start","left-start"],right:["top-end","bottom-end"],bottom:["right-end","left-end"],left:["top-start","bottom-start"]},(e,t)=>{const r=["right","left"].includes(t),o=r?"width":"height";return e.map(n=>{const i=n.split("-")[1]==="end",a=`calc((${`var(--v-target-${o}, 0px)`} - ${vt}) / 2)`,l=Gr(n);return N(`[v-placement="${n}"] >`,[W("popover-shared",[re("center-arrow",[W("popover-arrow",`${t}: calc(max(${a}, ${l}) ${i?"+":"-"} var(--v-offset-${r?"left":"top"}));`)])])])})})]);function Gr(e){return["top","bottom"].includes(e.split("-")[0])?"var(--n-arrow-offset)":"var(--n-arrow-offset-vertical)"}function lr(e,t){const r=e.split("-")[0],o=["top","bottom"].includes(r)?"height: var(--n-space-arrow);":"width: var(--n-space-arrow);";return N(`[v-placement="${e}"] >`,[W("popover-shared",`
 margin-${Ic[r]}: var(--n-space);
 `,[re("show-arrow",`
 margin-${Ic[r]}: var(--n-space-arrow);
 `),re("overlap",`
 margin: 0;
 `),tS("popover-arrow-wrapper",`
 right: 0;
 left: 0;
 top: 0;
 bottom: 0;
 ${r}: 100%;
 ${Ic[r]}: auto;
 ${o}
 `,[W("popover-arrow",t)])])])}const Nb=Object.assign(Object.assign({},Xe.props),{to:pi.propTo,show:Boolean,trigger:String,showArrow:Boolean,delay:Number,duration:Number,raw:Boolean,arrowPointToCenter:Boolean,arrowStyle:[String,Object],displayDirective:String,x:Number,y:Number,flip:Boolean,overlap:Boolean,placement:String,width:[Number,String],keepAliveOnHover:Boolean,scrollable:Boolean,contentStyle:[Object,String],headerStyle:[Object,String],footerStyle:[Object,String],internalDeactivateImmediately:Boolean,animated:Boolean,onClickoutside:Function,internalTrapFocus:Boolean,internalOnAfterLeave:Function,minWidth:Number,maxWidth:Number}),B6=({arrowStyle:e,clsPrefix:t})=>E("div",{key:"__popover-arrow__",class:`${t}-popover-arrow-wrapper`},E("div",{class:`${t}-popover-arrow`,style:e})),M6=be({name:"PopoverBody",inheritAttrs:!1,props:Nb,setup(e,{slots:t,attrs:r}){const{namespaceRef:o,mergedClsPrefixRef:n,inlineThemeDisabled:i}=kt(e),s=Xe("Popover","-popover",A6,Go,e,n),a=K(null),l=Se("NPopover"),c=K(null),u=K(e.show),d=K(!1);Er(()=>{const{show:S}=e;S&&!rS()&&!e.internalDeactivateImmediately&&(d.value=!0)});const f=q(()=>{const{trigger:S,onClickoutside:L}=e,k=[],{positionManuallyRef:{value:I}}=l;return I||(S==="click"&&!L&&k.push([mu,x,void 0,{capture:!0}]),S==="hover"&&k.push([SS,T])),L&&k.push([mu,x,void 0,{capture:!0}]),(e.displayDirective==="show"||e.animated&&d.value)&&k.push([$s,e.show]),k}),h=q(()=>{const S=e.width==="trigger"?void 0:Qr(e.width),L=[];S&&L.push({width:S});const{maxWidth:k,minWidth:I}=e;return k&&L.push({maxWidth:Qr(k)}),I&&L.push({maxWidth:Qr(I)}),i||L.push(p.value),L}),p=q(()=>{const{common:{cubicBezierEaseInOut:S,cubicBezierEaseIn:L,cubicBezierEaseOut:k},self:{space:I,spaceArrow:A,padding:R,fontSize:F,textColor:H,dividerColor:J,color:Y,boxShadow:Z,borderRadius:se,arrowHeight:ve,arrowOffset:Le,arrowOffsetVertical:_e}}=s.value;return{"--n-box-shadow":Z,"--n-bezier":S,"--n-bezier-ease-in":L,"--n-bezier-ease-out":k,"--n-font-size":F,"--n-text-color":H,"--n-color":Y,"--n-divider-color":J,"--n-border-radius":se,"--n-arrow-height":ve,"--n-arrow-offset":Le,"--n-arrow-offset-vertical":_e,"--n-padding":R,"--n-space":I,"--n-space-arrow":A}}),m=i?br("popover",void 0,p,e):void 0;l.setBodyInstance({syncPosition:y}),xt(()=>{l.setBodyInstance(null)}),et(Be(e,"show"),S=>{e.animated||(S?u.value=!0:u.value=!1)});function y(){var S;(S=a.value)===null||S===void 0||S.syncPosition()}function g(S){e.trigger==="hover"&&e.keepAliveOnHover&&e.show&&l.handleMouseEnter(S)}function w(S){e.trigger==="hover"&&e.keepAliveOnHover&&l.handleMouseLeave(S)}function T(S){e.trigger==="hover"&&!C().contains(Ps(S))&&l.handleMouseMoveOutside(S)}function x(S){(e.trigger==="click"&&!C().contains(Ps(S))||e.onClickoutside)&&l.handleClickOutside(S)}function C(){return l.getTriggerElement()}qe(_d,c),qe(Ed,null),qe(Sd,null);function $(){if(m==null||m.onRender(),!(e.displayDirective==="show"||e.show||e.animated&&d.value))return null;let L;const k=l.internalRenderBodyRef.value,{value:I}=n;if(k)L=k([`${I}-popover-shared`,m==null?void 0:m.themeClass.value,e.overlap&&`${I}-popover-shared--overlap`,e.showArrow&&`${I}-popover-shared--show-arrow`,e.arrowPointToCenter&&`${I}-popover-shared--center-arrow`],c,h.value,g,w);else{const{value:A}=l.extraClassRef,{internalTrapFocus:R}=e,F=!fu(t.header)||!fu(t.footer),H=()=>{var J;const Y=F?E(Qe,null,tr(t.header,ve=>ve?E("div",{class:`${I}-popover__header`,style:e.headerStyle},ve):null),tr(t.default,ve=>ve?E("div",{class:`${I}-popover__content`,style:e.contentStyle},t):null),tr(t.footer,ve=>ve?E("div",{class:`${I}-popover__footer`,style:e.footerStyle},ve):null)):e.scrollable?(J=t.default)===null||J===void 0?void 0:J.call(t):E("div",{class:`${I}-popover__content`,style:e.contentStyle},t),Z=e.scrollable?E(_6,{contentClass:F?void 0:`${I}-popover__content`,contentStyle:F?void 0:e.contentStyle},{default:()=>Y}):Y,se=e.showArrow?B6({arrowStyle:e.arrowStyle,clsPrefix:I}):null;return[Z,se]};L=E("div",Ml({class:[`${I}-popover`,`${I}-popover-shared`,m==null?void 0:m.themeClass.value,A.map(J=>`${I}-${J}`),{[`${I}-popover--scrollable`]:e.scrollable,[`${I}-popover--show-header-or-footer`]:F,[`${I}-popover--raw`]:e.raw,[`${I}-popover-shared--overlap`]:e.overlap,[`${I}-popover-shared--show-arrow`]:e.showArrow,[`${I}-popover-shared--center-arrow`]:e.arrowPointToCenter}],ref:c,style:h.value,onKeydown:l.handleKeydown,onMouseenter:g,onMouseleave:w},r),R?E(N0,{active:e.show,autoFocus:!0},{default:H}):H())}return Fr(L,f.value)}return{displayed:d,namespace:o,isMounted:l.isMountedRef,zIndex:l.zIndexRef,followerRef:a,adjustedTo:pi(e),followerEnabled:u,renderContentNode:$}},render(){return E(zS,{ref:"followerRef",zIndex:this.zIndex,show:this.show,enabled:this.followerEnabled,to:this.adjustedTo,x:this.x,y:this.y,flip:this.flip,placement:this.placement,containerClass:this.namespace,overlap:this.overlap,width:this.width==="trigger"?"target":void 0,teleportDisabled:this.adjustedTo===pi.tdkey},{default:()=>this.animated?E(qt,{name:"popover-transition",appear:this.isMounted,onEnter:()=>{this.followerEnabled=!0},onAfterLeave:()=>{var e;(e=this.internalOnAfterLeave)===null||e===void 0||e.call(this),this.followerEnabled=!1,this.displayed=!1}},{default:this.renderContentNode}):this.renderContentNode()})}}),H6=Object.keys(Nb),D6={focus:["onFocus","onBlur"],click:["onClick"],hover:["onMouseenter","onMouseleave"],manual:[],nested:["onFocus","onBlur","onMouseenter","onMouseleave","onClick"]};function z6(e,t,r){D6[t].forEach(o=>{e.props?e.props=Object.assign({},e.props):e.props={};const n=e.props[o],i=r[o];n?e.props[o]=(...s)=>{n(...s),i(...s)}:e.props[o]=i})}const F6=di("").type,jb={show:{type:Boolean,default:void 0},defaultShow:Boolean,showArrow:{type:Boolean,default:!0},trigger:{type:String,default:"hover"},delay:{type:Number,default:100},duration:{type:Number,default:100},raw:Boolean,placement:{type:String,default:"top"},x:Number,y:Number,arrowPointToCenter:Boolean,disabled:Boolean,getDisabled:Function,displayDirective:{type:String,default:"if"},arrowStyle:[String,Object],flip:{type:Boolean,default:!0},animated:{type:Boolean,default:!0},width:{type:[Number,String],default:void 0},overlap:Boolean,keepAliveOnHover:{type:Boolean,default:!0},zIndex:Number,to:pi.propTo,scrollable:Boolean,contentStyle:[Object,String],headerStyle:[Object,String],footerStyle:[Object,String],onClickoutside:Function,"onUpdate:show":[Function,Array],onUpdateShow:[Function,Array],internalDeactivateImmediately:Boolean,internalSyncTargetWithParent:Boolean,internalInheritedEventHandlers:{type:Array,default:()=>[]},internalTrapFocus:Boolean,internalExtraClass:{type:Array,default:()=>[]},onShow:[Function,Array],onHide:[Function,Array],arrow:{type:Boolean,default:void 0},minWidth:Number,maxWidth:Number},N6=Object.assign(Object.assign(Object.assign({},Xe.props),jb),{internalOnAfterLeave:Function,internalRenderBody:Function}),j6=be({name:"Popover",inheritAttrs:!1,props:N6,__popover__:!0,setup(e){const t=Ri(),r=K(null),o=q(()=>e.show),n=K(e.defaultShow),i=_0(o,n),s=io(()=>e.disabled?!1:i.value),a=()=>{if(e.disabled)return!0;const{getDisabled:H}=e;return!!(H!=null&&H())},l=()=>a()?!1:i.value,c=hS(e,["arrow","showArrow"]),u=q(()=>e.overlap?!1:c.value);let d=null;const f=K(null),h=K(null),p=io(()=>e.x!==void 0&&e.y!==void 0);function m(H){const{"onUpdate:show":J,onUpdateShow:Y,onShow:Z,onHide:se}=e;n.value=H,J&&or(J,H),Y&&or(Y,H),H&&Z&&or(Z,!0),H&&se&&or(se,!1)}function y(){d&&d.syncPosition()}function g(){const{value:H}=f;H&&(window.clearTimeout(H),f.value=null)}function w(){const{value:H}=h;H&&(window.clearTimeout(H),h.value=null)}function T(){const H=a();if(e.trigger==="focus"&&!H){if(l())return;m(!0)}}function x(){const H=a();if(e.trigger==="focus"&&!H){if(!l())return;m(!1)}}function C(){const H=a();if(e.trigger==="hover"&&!H){if(w(),f.value!==null||l())return;const J=()=>{m(!0),f.value=null},{delay:Y}=e;Y===0?J():f.value=window.setTimeout(J,Y)}}function $(){const H=a();if(e.trigger==="hover"&&!H){if(g(),h.value!==null||!l())return;const J=()=>{m(!1),h.value=null},{duration:Y}=e;Y===0?J():h.value=window.setTimeout(J,Y)}}function S(){$()}function L(H){var J;!l()||(e.trigger==="click"&&(g(),w(),m(!1)),(J=e.onClickoutside)===null||J===void 0||J.call(e,H))}function k(){if(e.trigger==="click"&&!a()){g(),w();const H=!l();m(H)}}function I(H){!e.internalTrapFocus||H.key==="Escape"&&(g(),w(),m(!1))}function A(H){n.value=H}function R(){var H;return(H=r.value)===null||H===void 0?void 0:H.targetRef}function F(H){d=H}return qe("NPopover",{getTriggerElement:R,handleKeydown:I,handleMouseEnter:C,handleMouseLeave:$,handleClickOutside:L,handleMouseMoveOutside:S,setBodyInstance:F,positionManuallyRef:p,isMountedRef:t,zIndexRef:Be(e,"zIndex"),extraClassRef:Be(e,"internalExtraClass"),internalRenderBodyRef:Be(e,"internalRenderBody")}),Er(()=>{i.value&&a()&&m(!1)}),{binderInstRef:r,positionManually:p,mergedShowConsideringDisabledProp:s,uncontrolledShow:n,mergedShowArrow:u,getMergedShow:l,setShow:A,handleClick:k,handleMouseEnter:C,handleMouseLeave:$,handleFocus:T,handleBlur:x,syncPosition:y}},render(){var e;const{positionManually:t,$slots:r}=this;let o,n=!1;if(!t&&(r.activator?o=uu(r,"activator"):o=uu(r,"trigger"),o)){o=_r(o),o=o.type===F6?E("span",[o]):o;const i={onClick:this.handleClick,onMouseenter:this.handleMouseEnter,onMouseleave:this.handleMouseLeave,onFocus:this.handleFocus,onBlur:this.handleBlur};if(!((e=o.type)===null||e===void 0)&&e.__popover__)n=!0,o.props||(o.props={internalSyncTargetWithParent:!0,internalInheritedEventHandlers:[]}),o.props.internalSyncTargetWithParent=!0,o.props.internalInheritedEventHandlers?o.props.internalInheritedEventHandlers=[i,...o.props.internalInheritedEventHandlers]:o.props.internalInheritedEventHandlers=[i];else{const{internalInheritedEventHandlers:s}=this,a=[i,...s],l={onBlur:c=>{a.forEach(u=>{u.onBlur(c)})},onFocus:c=>{a.forEach(u=>{u.onFocus(c)})},onClick:c=>{a.forEach(u=>{u.onClick(c)})},onMouseenter:c=>{a.forEach(u=>{u.onMouseenter(c)})},onMouseleave:c=>{a.forEach(u=>{u.onMouseleave(c)})}};z6(o,s?"nested":t?"manual":this.trigger,l)}}return E(xS,{ref:"binderInstRef",syncTarget:!n,syncTargetWithParent:this.internalSyncTargetWithParent},{default:()=>{this.mergedShowConsideringDisabledProp;const i=this.getMergedShow();return[this.internalTrapFocus&&i?Fr(E("div",{style:{position:"fixed",inset:0}}),[[Fl,{enabled:i,zIndex:this.zIndex}]]):null,t?null:E(CS,null,{default:()=>o}),E(M6,hi(this.$props,H6,Object.assign(Object.assign({},this.$attrs),{showArrow:this.mergedShowArrow,show:i})),{default:()=>{var s,a;return(a=(s=this.$slots).default)===null||a===void 0?void 0:a.call(s)},header:()=>{var s,a;return(a=(s=this.$slots).header)===null||a===void 0?void 0:a.call(s)},footer:()=>{var s,a;return(a=(s=this.$slots).footer)===null||a===void 0?void 0:a.call(s)}})]}})}}),Wb={closeIconSizeTiny:"12px",closeIconSizeSmall:"12px",closeIconSizeMedium:"14px",closeIconSizeLarge:"14px",closeSizeTiny:"16px",closeSizeSmall:"16px",closeSizeMedium:"18px",closeSizeLarge:"18px",padding:"0 7px",closeMargin:"0 0 0 4px",closeMarginRtl:"0 4px 0 0"},W6={name:"Tag",common:ne,self(e){const{textColor2:t,primaryColorHover:r,primaryColorPressed:o,primaryColor:n,infoColor:i,successColor:s,warningColor:a,errorColor:l,baseColor:c,borderColor:u,tagColor:d,opacityDisabled:f,closeIconColor:h,closeIconColorHover:p,closeIconColorPressed:m,closeColorHover:y,closeColorPressed:g,borderRadiusSmall:w,fontSizeMini:T,fontSizeTiny:x,fontSizeSmall:C,fontSizeMedium:$,heightMini:S,heightTiny:L,heightSmall:k,heightMedium:I,buttonColor2Hover:A,buttonColor2Pressed:R,fontWeightStrong:F}=e;return Object.assign(Object.assign({},Wb),{closeBorderRadius:w,heightTiny:S,heightSmall:L,heightMedium:k,heightLarge:I,borderRadius:w,opacityDisabled:f,fontSizeTiny:T,fontSizeSmall:x,fontSizeMedium:C,fontSizeLarge:$,fontWeightStrong:F,textColorCheckable:t,textColorHoverCheckable:t,textColorPressedCheckable:t,textColorChecked:c,colorCheckable:"#0000",colorHoverCheckable:A,colorPressedCheckable:R,colorChecked:n,colorCheckedHover:r,colorCheckedPressed:o,border:`1px solid ${u}`,textColor:t,color:d,colorBordered:"#0000",closeIconColor:h,closeIconColorHover:p,closeIconColorPressed:m,closeColorHover:y,closeColorPressed:g,borderPrimary:`1px solid ${G(n,{alpha:.3})}`,textColorPrimary:n,colorPrimary:G(n,{alpha:.16}),colorBorderedPrimary:"#0000",closeIconColorPrimary:pt(n,{lightness:.7}),closeIconColorHoverPrimary:pt(n,{lightness:.7}),closeIconColorPressedPrimary:pt(n,{lightness:.7}),closeColorHoverPrimary:G(n,{alpha:.16}),closeColorPressedPrimary:G(n,{alpha:.12}),borderInfo:`1px solid ${G(i,{alpha:.3})}`,textColorInfo:i,colorInfo:G(i,{alpha:.16}),colorBorderedInfo:"#0000",closeIconColorInfo:pt(i,{alpha:.7}),closeIconColorHoverInfo:pt(i,{alpha:.7}),closeIconColorPressedInfo:pt(i,{alpha:.7}),closeColorHoverInfo:G(i,{alpha:.16}),closeColorPressedInfo:G(i,{alpha:.12}),borderSuccess:`1px solid ${G(s,{alpha:.3})}`,textColorSuccess:s,colorSuccess:G(s,{alpha:.16}),colorBorderedSuccess:"#0000",closeIconColorSuccess:pt(s,{alpha:.7}),closeIconColorHoverSuccess:pt(s,{alpha:.7}),closeIconColorPressedSuccess:pt(s,{alpha:.7}),closeColorHoverSuccess:G(s,{alpha:.16}),closeColorPressedSuccess:G(s,{alpha:.12}),borderWarning:`1px solid ${G(a,{alpha:.3})}`,textColorWarning:a,colorWarning:G(a,{alpha:.16}),colorBorderedWarning:"#0000",closeIconColorWarning:pt(a,{alpha:.7}),closeIconColorHoverWarning:pt(a,{alpha:.7}),closeIconColorPressedWarning:pt(a,{alpha:.7}),closeColorHoverWarning:G(a,{alpha:.16}),closeColorPressedWarning:G(a,{alpha:.11}),borderError:`1px solid ${G(l,{alpha:.3})}`,textColorError:l,colorError:G(l,{alpha:.16}),colorBorderedError:"#0000",closeIconColorError:pt(l,{alpha:.7}),closeIconColorHoverError:pt(l,{alpha:.7}),closeIconColorPressedError:pt(l,{alpha:.7}),closeColorHoverError:G(l,{alpha:.16}),closeColorPressedError:G(l,{alpha:.12})})}},Ub=W6,U6=e=>{const{textColor2:t,primaryColorHover:r,primaryColorPressed:o,primaryColor:n,infoColor:i,successColor:s,warningColor:a,errorColor:l,baseColor:c,borderColor:u,opacityDisabled:d,tagColor:f,closeIconColor:h,closeIconColorHover:p,closeIconColorPressed:m,borderRadiusSmall:y,fontSizeMini:g,fontSizeTiny:w,fontSizeSmall:T,fontSizeMedium:x,heightMini:C,heightTiny:$,heightSmall:S,heightMedium:L,closeColorHover:k,closeColorPressed:I,buttonColor2Hover:A,buttonColor2Pressed:R,fontWeightStrong:F}=e;return Object.assign(Object.assign({},Wb),{closeBorderRadius:y,heightTiny:C,heightSmall:$,heightMedium:S,heightLarge:L,borderRadius:y,opacityDisabled:d,fontSizeTiny:g,fontSizeSmall:w,fontSizeMedium:T,fontSizeLarge:x,fontWeightStrong:F,textColorCheckable:t,textColorHoverCheckable:t,textColorPressedCheckable:t,textColorChecked:c,colorCheckable:"#0000",colorHoverCheckable:A,colorPressedCheckable:R,colorChecked:n,colorCheckedHover:r,colorCheckedPressed:o,border:`1px solid ${u}`,textColor:t,color:f,colorBordered:"rgb(250, 250, 252)",closeIconColor:h,closeIconColorHover:p,closeIconColorPressed:m,closeColorHover:k,closeColorPressed:I,borderPrimary:`1px solid ${G(n,{alpha:.3})}`,textColorPrimary:n,colorPrimary:G(n,{alpha:.12}),colorBorderedPrimary:G(n,{alpha:.1}),closeIconColorPrimary:n,closeIconColorHoverPrimary:n,closeIconColorPressedPrimary:n,closeColorHoverPrimary:G(n,{alpha:.12}),closeColorPressedPrimary:G(n,{alpha:.18}),borderInfo:`1px solid ${G(i,{alpha:.3})}`,textColorInfo:i,colorInfo:G(i,{alpha:.12}),colorBorderedInfo:G(i,{alpha:.1}),closeIconColorInfo:i,closeIconColorHoverInfo:i,closeIconColorPressedInfo:i,closeColorHoverInfo:G(i,{alpha:.12}),closeColorPressedInfo:G(i,{alpha:.18}),borderSuccess:`1px solid ${G(s,{alpha:.3})}`,textColorSuccess:s,colorSuccess:G(s,{alpha:.12}),colorBorderedSuccess:G(s,{alpha:.1}),closeIconColorSuccess:s,closeIconColorHoverSuccess:s,closeIconColorPressedSuccess:s,closeColorHoverSuccess:G(s,{alpha:.12}),closeColorPressedSuccess:G(s,{alpha:.18}),borderWarning:`1px solid ${G(a,{alpha:.35})}`,textColorWarning:a,colorWarning:G(a,{alpha:.15}),colorBorderedWarning:G(a,{alpha:.12}),closeIconColorWarning:a,closeIconColorHoverWarning:a,closeIconColorPressedWarning:a,closeColorHoverWarning:G(a,{alpha:.12}),closeColorPressedWarning:G(a,{alpha:.18}),borderError:`1px solid ${G(l,{alpha:.23})}`,textColorError:l,colorError:G(l,{alpha:.1}),colorBorderedError:G(l,{alpha:.08}),closeIconColorError:l,closeIconColorHoverError:l,closeIconColorPressedError:l,closeColorHoverError:G(l,{alpha:.12}),closeColorPressedError:G(l,{alpha:.18})})},V6={name:"Tag",common:ie,self:U6},Vb=V6,Kb={paddingSingle:"0 26px 0 12px",paddingMultiple:"3px 26px 0 12px",clearSize:"16px",arrowSize:"16px"},K6=e=>{const{borderRadius:t,textColor2:r,textColorDisabled:o,inputColor:n,inputColorDisabled:i,primaryColor:s,primaryColorHover:a,warningColor:l,warningColorHover:c,errorColor:u,errorColorHover:d,borderColor:f,iconColor:h,iconColorDisabled:p,clearColor:m,clearColorHover:y,clearColorPressed:g,placeholderColor:w,placeholderColorDisabled:T,fontSizeTiny:x,fontSizeSmall:C,fontSizeMedium:$,fontSizeLarge:S,heightTiny:L,heightSmall:k,heightMedium:I,heightLarge:A}=e;return Object.assign(Object.assign({},Kb),{fontSizeTiny:x,fontSizeSmall:C,fontSizeMedium:$,fontSizeLarge:S,heightTiny:L,heightSmall:k,heightMedium:I,heightLarge:A,borderRadius:t,textColor:r,textColorDisabled:o,placeholderColor:w,placeholderColorDisabled:T,color:n,colorDisabled:i,colorActive:n,border:`1px solid ${f}`,borderHover:`1px solid ${a}`,borderActive:`1px solid ${s}`,borderFocus:`1px solid ${a}`,boxShadowHover:"none",boxShadowActive:`0 0 0 2px ${G(s,{alpha:.2})}`,boxShadowFocus:`0 0 0 2px ${G(s,{alpha:.2})}`,caretColor:s,arrowColor:h,arrowColorDisabled:p,loadingColor:s,borderWarning:`1px solid ${l}`,borderHoverWarning:`1px solid ${c}`,borderActiveWarning:`1px solid ${l}`,borderFocusWarning:`1px solid ${c}`,boxShadowHoverWarning:"none",boxShadowActiveWarning:`0 0 0 2px ${G(l,{alpha:.2})}`,boxShadowFocusWarning:`0 0 0 2px ${G(l,{alpha:.2})}`,colorActiveWarning:n,caretColorWarning:l,borderError:`1px solid ${u}`,borderHoverError:`1px solid ${d}`,borderActiveError:`1px solid ${u}`,borderFocusError:`1px solid ${d}`,boxShadowHoverError:"none",boxShadowActiveError:`0 0 0 2px ${G(u,{alpha:.2})}`,boxShadowFocusError:`0 0 0 2px ${G(u,{alpha:.2})}`,colorActiveError:n,caretColorError:u,clearColor:m,clearColorHover:y,clearColorPressed:g})},q6={name:"InternalSelection",common:ie,peers:{Popover:Go},self:K6},Nd=q6,G6={name:"InternalSelection",common:ne,peers:{Popover:Mn},self(e){const{borderRadius:t,textColor2:r,textColorDisabled:o,inputColor:n,inputColorDisabled:i,primaryColor:s,primaryColorHover:a,warningColor:l,warningColorHover:c,errorColor:u,errorColorHover:d,iconColor:f,iconColorDisabled:h,clearColor:p,clearColorHover:m,clearColorPressed:y,placeholderColor:g,placeholderColorDisabled:w,fontSizeTiny:T,fontSizeSmall:x,fontSizeMedium:C,fontSizeLarge:$,heightTiny:S,heightSmall:L,heightMedium:k,heightLarge:I}=e;return Object.assign(Object.assign({},Kb),{fontSizeTiny:T,fontSizeSmall:x,fontSizeMedium:C,fontSizeLarge:$,heightTiny:S,heightSmall:L,heightMedium:k,heightLarge:I,borderRadius:t,textColor:r,textColorDisabled:o,placeholderColor:g,placeholderColorDisabled:w,color:n,colorDisabled:i,colorActive:G(s,{alpha:.1}),border:"1px solid #0000",borderHover:`1px solid ${a}`,borderActive:`1px solid ${s}`,borderFocus:`1px solid ${a}`,boxShadowHover:"none",boxShadowActive:`0 0 8px 0 ${G(s,{alpha:.4})}`,boxShadowFocus:`0 0 8px 0 ${G(s,{alpha:.4})}`,caretColor:s,arrowColor:f,arrowColorDisabled:h,loadingColor:s,borderWarning:`1px solid ${l}`,borderHoverWarning:`1px solid ${c}`,borderActiveWarning:`1px solid ${l}`,borderFocusWarning:`1px solid ${c}`,boxShadowHoverWarning:"none",boxShadowActiveWarning:`0 0 8px 0 ${G(l,{alpha:.4})}`,boxShadowFocusWarning:`0 0 8px 0 ${G(l,{alpha:.4})}`,colorActiveWarning:G(l,{alpha:.1}),caretColorWarning:l,borderError:`1px solid ${u}`,borderHoverError:`1px solid ${d}`,borderActiveError:`1px solid ${u}`,borderFocusError:`1px solid ${d}`,boxShadowHoverError:"none",boxShadowActiveError:`0 0 8px 0 ${G(u,{alpha:.4})}`,boxShadowFocusError:`0 0 8px 0 ${G(u,{alpha:.4})}`,colorActiveError:G(u,{alpha:.1}),caretColorError:u,clearColor:p,clearColorHover:m,clearColorPressed:y})}},jd=G6,{cubicBezierEaseInOut:bo}=qo;function X6({duration:e=".2s",delay:t=".1s"}={}){return[N("&.fade-in-width-expand-transition-leave-from, &.fade-in-width-expand-transition-enter-to",{opacity:1}),N("&.fade-in-width-expand-transition-leave-to, &.fade-in-width-expand-transition-enter-from",`
 opacity: 0!important;
 margin-left: 0!important;
 margin-right: 0!important;
 `),N("&.fade-in-width-expand-transition-leave-active",`
 overflow: hidden;
 transition:
 opacity ${e} ${bo},
 max-width ${e} ${bo} ${t},
 margin-left ${e} ${bo} ${t},
 margin-right ${e} ${bo} ${t};
 `),N("&.fade-in-width-expand-transition-enter-active",`
 overflow: hidden;
 transition:
 opacity ${e} ${bo} ${t},
 max-width ${e} ${bo},
 margin-left ${e} ${bo},
 margin-right ${e} ${bo};
 `)]}const qb={iconMargin:"11px 8px 0 12px",iconMarginRtl:"11px 12px 0 8px",iconSize:"24px",closeIconSize:"16px",closeSize:"20px",closeMargin:"13px 14px 0 0",closeMarginRtl:"13px 0 0 14px",padding:"13px"},Y6={name:"Alert",common:ne,self(e){const{lineHeight:t,borderRadius:r,fontWeightStrong:o,dividerColor:n,inputColor:i,textColor1:s,textColor2:a,closeColorHover:l,closeColorPressed:c,closeIconColor:u,closeIconColorHover:d,closeIconColorPressed:f,infoColorSuppl:h,successColorSuppl:p,warningColorSuppl:m,errorColorSuppl:y,fontSize:g}=e;return Object.assign(Object.assign({},qb),{fontSize:g,lineHeight:t,titleFontWeight:o,borderRadius:r,border:`1px solid ${n}`,color:i,titleTextColor:s,iconColor:a,contentTextColor:a,closeBorderRadius:r,closeColorHover:l,closeColorPressed:c,closeIconColor:u,closeIconColorHover:d,closeIconColorPressed:f,borderInfo:`1px solid ${G(h,{alpha:.35})}`,colorInfo:G(h,{alpha:.25}),titleTextColorInfo:s,iconColorInfo:h,contentTextColorInfo:a,closeColorHoverInfo:l,closeColorPressedInfo:c,closeIconColorInfo:u,closeIconColorHoverInfo:d,closeIconColorPressedInfo:f,borderSuccess:`1px solid ${G(p,{alpha:.35})}`,colorSuccess:G(p,{alpha:.25}),titleTextColorSuccess:s,iconColorSuccess:p,contentTextColorSuccess:a,closeColorHoverSuccess:l,closeColorPressedSuccess:c,closeIconColorSuccess:u,closeIconColorHoverSuccess:d,closeIconColorPressedSuccess:f,borderWarning:`1px solid ${G(m,{alpha:.35})}`,colorWarning:G(m,{alpha:.25}),titleTextColorWarning:s,iconColorWarning:m,contentTextColorWarning:a,closeColorHoverWarning:l,closeColorPressedWarning:c,closeIconColorWarning:u,closeIconColorHoverWarning:d,closeIconColorPressedWarning:f,borderError:`1px solid ${G(y,{alpha:.35})}`,colorError:G(y,{alpha:.25}),titleTextColorError:s,iconColorError:y,contentTextColorError:a,closeColorHoverError:l,closeColorPressedError:c,closeIconColorError:u,closeIconColorHoverError:d,closeIconColorPressedError:f})}},Z6=Y6,J6=e=>{const{lineHeight:t,borderRadius:r,fontWeightStrong:o,baseColor:n,dividerColor:i,actionColor:s,textColor1:a,textColor2:l,closeColorHover:c,closeColorPressed:u,closeIconColor:d,closeIconColorHover:f,closeIconColorPressed:h,infoColor:p,successColor:m,warningColor:y,errorColor:g,fontSize:w}=e;return Object.assign(Object.assign({},qb),{fontSize:w,lineHeight:t,titleFontWeight:o,borderRadius:r,border:`1px solid ${i}`,color:s,titleTextColor:a,iconColor:l,contentTextColor:l,closeBorderRadius:r,closeColorHover:c,closeColorPressed:u,closeIconColor:d,closeIconColorHover:f,closeIconColorPressed:h,borderInfo:`1px solid ${he(n,G(p,{alpha:.25}))}`,colorInfo:he(n,G(p,{alpha:.08})),titleTextColorInfo:a,iconColorInfo:p,contentTextColorInfo:l,closeColorHoverInfo:c,closeColorPressedInfo:u,closeIconColorInfo:d,closeIconColorHoverInfo:f,closeIconColorPressedInfo:h,borderSuccess:`1px solid ${he(n,G(m,{alpha:.25}))}`,colorSuccess:he(n,G(m,{alpha:.08})),titleTextColorSuccess:a,iconColorSuccess:m,contentTextColorSuccess:l,closeColorHoverSuccess:c,closeColorPressedSuccess:u,closeIconColorSuccess:d,closeIconColorHoverSuccess:f,closeIconColorPressedSuccess:h,borderWarning:`1px solid ${he(n,G(y,{alpha:.33}))}`,colorWarning:he(n,G(y,{alpha:.08})),titleTextColorWarning:a,iconColorWarning:y,contentTextColorWarning:l,closeColorHoverWarning:c,closeColorPressedWarning:u,closeIconColorWarning:d,closeIconColorHoverWarning:f,closeIconColorPressedWarning:h,borderError:`1px solid ${he(n,G(g,{alpha:.25}))}`,colorError:he(n,G(g,{alpha:.08})),titleTextColorError:a,iconColorError:g,contentTextColorError:l,closeColorHoverError:c,closeColorPressedError:u,closeIconColorError:d,closeIconColorHoverError:f,closeIconColorPressedError:h})},Q6={name:"Alert",common:ie,self:J6},eP=Q6,{cubicBezierEaseInOut:kr,cubicBezierEaseOut:tP,cubicBezierEaseIn:rP}=qo;function Tu({overflow:e="hidden",duration:t=".3s",originalTransition:r="",leavingDelay:o="0s",foldPadding:n=!1,enterToProps:i=void 0,leaveToProps:s=void 0,reverse:a=!1}={}){const l=a?"leave":"enter",c=a?"enter":"leave";return[N(`&.fade-in-height-expand-transition-${c}-from,
 &.fade-in-height-expand-transition-${l}-to`,Object.assign(Object.assign({},i),{opacity:1})),N(`&.fade-in-height-expand-transition-${c}-to,
 &.fade-in-height-expand-transition-${l}-from`,Object.assign(Object.assign({},s),{opacity:0,marginTop:"0 !important",marginBottom:"0 !important",paddingTop:n?"0 !important":void 0,paddingBottom:n?"0 !important":void 0})),N(`&.fade-in-height-expand-transition-${c}-active`,`
 overflow: ${e};
 transition:
 max-height ${t} ${kr} ${o},
 opacity ${t} ${tP} ${o},
 margin-top ${t} ${kr} ${o},
 margin-bottom ${t} ${kr} ${o},
 padding-top ${t} ${kr} ${o},
 padding-bottom ${t} ${kr} ${o}
 ${r?","+r:""}
 `),N(`&.fade-in-height-expand-transition-${l}-active`,`
 overflow: ${e};
 transition:
 max-height ${t} ${kr},
 opacity ${t} ${rP},
 margin-top ${t} ${kr},
 margin-bottom ${t} ${kr},
 padding-top ${t} ${kr},
 padding-bottom ${t} ${kr}
 ${r?","+r:""}
 `)]}const oP={linkFontSize:"13px",linkPadding:"0 0 0 16px",railWidth:"4px"},Gb=e=>{const{borderRadius:t,railColor:r,primaryColor:o,primaryColorHover:n,primaryColorPressed:i,textColor2:s}=e;return Object.assign(Object.assign({},oP),{borderRadius:t,railColor:r,railColorActive:o,linkColor:G(o,{alpha:.15}),linkTextColor:s,linkTextColorHover:n,linkTextColorPressed:i,linkTextColorActive:o})},nP={name:"Anchor",common:ie,self:Gb},iP=nP,sP={name:"Anchor",common:ne,self:Gb},aP=sP,lP=In&&"chrome"in window;In&&navigator.userAgent.includes("Firefox");const cP=In&&navigator.userAgent.includes("Safari")&&!lP,Xb={paddingTiny:"0 8px",paddingSmall:"0 10px",paddingMedium:"0 12px",paddingLarge:"0 14px",clearSize:"16px"},uP={name:"Input",common:ne,self(e){const{textColor2:t,textColor3:r,textColorDisabled:o,primaryColor:n,primaryColorHover:i,inputColor:s,inputColorDisabled:a,warningColor:l,warningColorHover:c,errorColor:u,errorColorHover:d,borderRadius:f,lineHeight:h,fontSizeTiny:p,fontSizeSmall:m,fontSizeMedium:y,fontSizeLarge:g,heightTiny:w,heightSmall:T,heightMedium:x,heightLarge:C,clearColor:$,clearColorHover:S,clearColorPressed:L,placeholderColor:k,placeholderColorDisabled:I,iconColor:A,iconColorDisabled:R,iconColorHover:F,iconColorPressed:H}=e;return Object.assign(Object.assign({},Xb),{countTextColorDisabled:o,countTextColor:r,heightTiny:w,heightSmall:T,heightMedium:x,heightLarge:C,fontSizeTiny:p,fontSizeSmall:m,fontSizeMedium:y,fontSizeLarge:g,lineHeight:h,lineHeightTextarea:h,borderRadius:f,iconSize:"16px",groupLabelColor:s,textColor:t,textColorDisabled:o,textDecorationColor:t,groupLabelTextColor:t,caretColor:n,placeholderColor:k,placeholderColorDisabled:I,color:s,colorDisabled:a,colorFocus:G(n,{alpha:.1}),groupLabelBorder:"1px solid #0000",border:"1px solid #0000",borderHover:`1px solid ${i}`,borderDisabled:"1px solid #0000",borderFocus:`1px solid ${i}`,boxShadowFocus:`0 0 8px 0 ${G(n,{alpha:.3})}`,loadingColor:n,loadingColorWarning:l,borderWarning:`1px solid ${l}`,borderHoverWarning:`1px solid ${c}`,colorFocusWarning:G(l,{alpha:.1}),borderFocusWarning:`1px solid ${c}`,boxShadowFocusWarning:`0 0 8px 0 ${G(l,{alpha:.3})}`,caretColorWarning:l,loadingColorError:u,borderError:`1px solid ${u}`,borderHoverError:`1px solid ${d}`,colorFocusError:G(u,{alpha:.1}),borderFocusError:`1px solid ${d}`,boxShadowFocusError:`0 0 8px 0 ${G(u,{alpha:.3})}`,caretColorError:u,clearColor:$,clearColorHover:S,clearColorPressed:L,iconColor:A,iconColorDisabled:R,iconColorHover:F,iconColorPressed:H,suffixTextColor:t})}},vr=uP,dP=e=>{const{textColor2:t,textColor3:r,textColorDisabled:o,primaryColor:n,primaryColorHover:i,inputColor:s,inputColorDisabled:a,borderColor:l,warningColor:c,warningColorHover:u,errorColor:d,errorColorHover:f,borderRadius:h,lineHeight:p,fontSizeTiny:m,fontSizeSmall:y,fontSizeMedium:g,fontSizeLarge:w,heightTiny:T,heightSmall:x,heightMedium:C,heightLarge:$,actionColor:S,clearColor:L,clearColorHover:k,clearColorPressed:I,placeholderColor:A,placeholderColorDisabled:R,iconColor:F,iconColorDisabled:H,iconColorHover:J,iconColorPressed:Y}=e;return Object.assign(Object.assign({},Xb),{countTextColorDisabled:o,countTextColor:r,heightTiny:T,heightSmall:x,heightMedium:C,heightLarge:$,fontSizeTiny:m,fontSizeSmall:y,fontSizeMedium:g,fontSizeLarge:w,lineHeight:p,lineHeightTextarea:p,borderRadius:h,iconSize:"16px",groupLabelColor:S,groupLabelTextColor:t,textColor:t,textColorDisabled:o,textDecorationColor:t,caretColor:n,placeholderColor:A,placeholderColorDisabled:R,color:s,colorDisabled:a,colorFocus:s,groupLabelBorder:`1px solid ${l}`,border:`1px solid ${l}`,borderHover:`1px solid ${i}`,borderDisabled:`1px solid ${l}`,borderFocus:`1px solid ${i}`,boxShadowFocus:`0 0 0 2px ${G(n,{alpha:.2})}`,loadingColor:n,loadingColorWarning:c,borderWarning:`1px solid ${c}`,borderHoverWarning:`1px solid ${u}`,colorFocusWarning:s,borderFocusWarning:`1px solid ${u}`,boxShadowFocusWarning:`0 0 0 2px ${G(c,{alpha:.2})}`,caretColorWarning:c,loadingColorError:d,borderError:`1px solid ${d}`,borderHoverError:`1px solid ${f}`,colorFocusError:s,borderFocusError:`1px solid ${f}`,boxShadowFocusError:`0 0 0 2px ${G(d,{alpha:.2})}`,caretColorError:d,clearColor:L,clearColorHover:k,clearColorPressed:I,iconColor:F,iconColorDisabled:H,iconColorHover:J,iconColorPressed:Y,suffixTextColor:t})},fP={name:"Input",common:ie,self:dP},yr=fP;function Yb(e){const{boxShadow2:t}=e;return{menuBoxShadow:t}}const hP={name:"AutoComplete",common:ie,peers:{InternalSelectMenu:Zs,Input:yr},self:Yb},pP=hP,gP={name:"AutoComplete",common:ne,peers:{InternalSelectMenu:Js,Input:vr},self:Yb},mP=gP,Rc=In&&"loading"in document.createElement("img"),bP=(e={})=>{var t;const{root:r=null}=e;return{hash:`${e.rootMargin||"0px 0px 0px 0px"}-${Array.isArray(e.threshold)?e.threshold.join(","):(t=e.threshold)!==null&&t!==void 0?t:"0"}`,options:Object.assign(Object.assign({},e),{root:(typeof r=="string"?document.querySelector(r):r)||document.documentElement})}},Oc=new WeakMap,Ac=new WeakMap,Bc=new WeakMap,vP=(e,t,r)=>{if(!e)return()=>{};const o=bP(t),{root:n}=o.options;let i;const s=Oc.get(n);s?i=s:(i=new Map,Oc.set(n,i));let a,l;i.has(o.hash)?(l=i.get(o.hash),l[1].has(e)||(a=l[0],l[1].add(e),a.observe(e))):(a=new IntersectionObserver(d=>{d.forEach(f=>{if(f.isIntersecting){const h=Ac.get(f.target),p=Bc.get(f.target);h&&h(),p&&(p.value=!0)}})},o.options),a.observe(e),l=[a,new Set([e])],i.set(o.hash,l));let c=!1;const u=()=>{c||(Ac.delete(e),Bc.delete(e),c=!0,l[1].has(e)&&(l[0].unobserve(e),l[1].delete(e)),l[1].size<=0&&i.delete(o.hash),i.size||Oc.delete(n))};return Ac.set(e,u),Bc.set(e,r),u},Zb=e=>{const{borderRadius:t,avatarColor:r,cardColor:o,fontSize:n,heightTiny:i,heightSmall:s,heightMedium:a,heightLarge:l,heightHuge:c,modalColor:u,popoverColor:d}=e;return{borderRadius:t,fontSize:n,border:`2px solid ${o}`,heightTiny:i,heightSmall:s,heightMedium:a,heightLarge:l,heightHuge:c,color:he(o,r),colorModal:he(u,r),colorPopover:he(d,r)}},yP={name:"Avatar",common:ie,self:Zb},Jb=yP,xP={name:"Avatar",common:ne,self:Zb},Qb=xP,ev=()=>({gap:"-12px"}),CP={name:"AvatarGroup",common:ie,peers:{Avatar:Jb},self:ev},wP=CP,SP={name:"AvatarGroup",common:ne,peers:{Avatar:Qb},self:ev},EP=SP,tv={width:"44px",height:"44px",borderRadius:"22px",iconSize:"26px"},_P={name:"BackTop",common:ne,self(e){const{popoverColor:t,textColor2:r,primaryColorHover:o,primaryColorPressed:n}=e;return Object.assign(Object.assign({},tv),{color:t,textColor:r,iconColor:r,iconColorHover:o,iconColorPressed:n,boxShadow:"0 2px 8px 0px rgba(0, 0, 0, .12)",boxShadowHover:"0 2px 12px 0px rgba(0, 0, 0, .18)",boxShadowPressed:"0 2px 12px 0px rgba(0, 0, 0, .18)"})}},TP=_P,$P=e=>{const{popoverColor:t,textColor2:r,primaryColorHover:o,primaryColorPressed:n}=e;return Object.assign(Object.assign({},tv),{color:t,textColor:r,iconColor:r,iconColorHover:o,iconColorPressed:n,boxShadow:"0 2px 8px 0px rgba(0, 0, 0, .12)",boxShadowHover:"0 2px 12px 0px rgba(0, 0, 0, .18)",boxShadowPressed:"0 2px 12px 0px rgba(0, 0, 0, .18)"})},PP={name:"BackTop",common:ie,self:$P},LP=PP,kP={name:"Badge",common:ne,self(e){const{errorColorSuppl:t,infoColorSuppl:r,successColorSuppl:o,warningColorSuppl:n,fontFamily:i}=e;return{color:t,colorInfo:r,colorSuccess:o,colorError:t,colorWarning:n,fontSize:"12px",fontFamily:i}}},IP=kP,RP=e=>{const{errorColor:t,infoColor:r,successColor:o,warningColor:n,fontFamily:i}=e;return{color:t,colorInfo:r,colorSuccess:o,colorError:t,colorWarning:n,fontSize:"12px",fontFamily:i}},OP={name:"Badge",common:ie,self:RP},AP=OP,BP={fontWeightActive:"400"},rv=e=>{const{fontSize:t,textColor3:r,textColor2:o,borderRadius:n,buttonColor2Hover:i,buttonColor2Pressed:s}=e;return Object.assign(Object.assign({},BP),{fontSize:t,itemLineHeight:"1.25",itemTextColor:r,itemTextColorHover:o,itemTextColorPressed:o,itemTextColorActive:o,itemBorderRadius:n,itemColorHover:i,itemColorPressed:s,separatorColor:r})},MP={name:"Breadcrumb",common:ie,self:rv},HP=MP,DP={name:"Breadcrumb",common:ne,self:rv},zP=DP;function rn(e){return he(e,[255,255,255,.16])}function Ta(e){return he(e,[0,0,0,.12])}const FP="n-button-group",NP={paddingTiny:"0 6px",paddingSmall:"0 10px",paddingMedium:"0 14px",paddingLarge:"0 18px",paddingRoundTiny:"0 10px",paddingRoundSmall:"0 14px",paddingRoundMedium:"0 18px",paddingRoundLarge:"0 22px",iconMarginTiny:"6px",iconMarginSmall:"6px",iconMarginMedium:"6px",iconMarginLarge:"6px",iconSizeTiny:"14px",iconSizeSmall:"18px",iconSizeMedium:"18px",iconSizeLarge:"20px",rippleDuration:".6s"},ov=e=>{const{heightTiny:t,heightSmall:r,heightMedium:o,heightLarge:n,borderRadius:i,fontSizeTiny:s,fontSizeSmall:a,fontSizeMedium:l,fontSizeLarge:c,opacityDisabled:u,textColor2:d,textColor3:f,primaryColorHover:h,primaryColorPressed:p,borderColor:m,primaryColor:y,baseColor:g,infoColor:w,infoColorHover:T,infoColorPressed:x,successColor:C,successColorHover:$,successColorPressed:S,warningColor:L,warningColorHover:k,warningColorPressed:I,errorColor:A,errorColorHover:R,errorColorPressed:F,fontWeight:H,buttonColor2:J,buttonColor2Hover:Y,buttonColor2Pressed:Z,fontWeightStrong:se}=e;return Object.assign(Object.assign({},NP),{heightTiny:t,heightSmall:r,heightMedium:o,heightLarge:n,borderRadiusTiny:i,borderRadiusSmall:i,borderRadiusMedium:i,borderRadiusLarge:i,fontSizeTiny:s,fontSizeSmall:a,fontSizeMedium:l,fontSizeLarge:c,opacityDisabled:u,colorOpacitySecondary:"0.16",colorOpacitySecondaryHover:"0.22",colorOpacitySecondaryPressed:"0.28",colorSecondary:J,colorSecondaryHover:Y,colorSecondaryPressed:Z,colorTertiary:J,colorTertiaryHover:Y,colorTertiaryPressed:Z,colorQuaternary:"#0000",colorQuaternaryHover:Y,colorQuaternaryPressed:Z,color:"#0000",colorHover:"#0000",colorPressed:"#0000",colorFocus:"#0000",colorDisabled:"#0000",textColor:d,textColorTertiary:f,textColorHover:h,textColorPressed:p,textColorFocus:h,textColorDisabled:d,textColorText:d,textColorTextHover:h,textColorTextPressed:p,textColorTextFocus:h,textColorTextDisabled:d,textColorGhost:d,textColorGhostHover:h,textColorGhostPressed:p,textColorGhostFocus:h,textColorGhostDisabled:d,border:`1px solid ${m}`,borderHover:`1px solid ${h}`,borderPressed:`1px solid ${p}`,borderFocus:`1px solid ${h}`,borderDisabled:`1px solid ${m}`,rippleColor:y,colorPrimary:y,colorHoverPrimary:h,colorPressedPrimary:p,colorFocusPrimary:h,colorDisabledPrimary:y,textColorPrimary:g,textColorHoverPrimary:g,textColorPressedPrimary:g,textColorFocusPrimary:g,textColorDisabledPrimary:g,textColorTextPrimary:y,textColorTextHoverPrimary:h,textColorTextPressedPrimary:p,textColorTextFocusPrimary:h,textColorTextDisabledPrimary:d,textColorGhostPrimary:y,textColorGhostHoverPrimary:h,textColorGhostPressedPrimary:p,textColorGhostFocusPrimary:h,textColorGhostDisabledPrimary:y,borderPrimary:`1px solid ${y}`,borderHoverPrimary:`1px solid ${h}`,borderPressedPrimary:`1px solid ${p}`,borderFocusPrimary:`1px solid ${h}`,borderDisabledPrimary:`1px solid ${y}`,rippleColorPrimary:y,colorInfo:w,colorHoverInfo:T,colorPressedInfo:x,colorFocusInfo:T,colorDisabledInfo:w,textColorInfo:g,textColorHoverInfo:g,textColorPressedInfo:g,textColorFocusInfo:g,textColorDisabledInfo:g,textColorTextInfo:w,textColorTextHoverInfo:T,textColorTextPressedInfo:x,textColorTextFocusInfo:T,textColorTextDisabledInfo:d,textColorGhostInfo:w,textColorGhostHoverInfo:T,textColorGhostPressedInfo:x,textColorGhostFocusInfo:T,textColorGhostDisabledInfo:w,borderInfo:`1px solid ${w}`,borderHoverInfo:`1px solid ${T}`,borderPressedInfo:`1px solid ${x}`,borderFocusInfo:`1px solid ${T}`,borderDisabledInfo:`1px solid ${w}`,rippleColorInfo:w,colorSuccess:C,colorHoverSuccess:$,colorPressedSuccess:S,colorFocusSuccess:$,colorDisabledSuccess:C,textColorSuccess:g,textColorHoverSuccess:g,textColorPressedSuccess:g,textColorFocusSuccess:g,textColorDisabledSuccess:g,textColorTextSuccess:C,textColorTextHoverSuccess:$,textColorTextPressedSuccess:S,textColorTextFocusSuccess:$,textColorTextDisabledSuccess:d,textColorGhostSuccess:C,textColorGhostHoverSuccess:$,textColorGhostPressedSuccess:S,textColorGhostFocusSuccess:$,textColorGhostDisabledSuccess:C,borderSuccess:`1px solid ${C}`,borderHoverSuccess:`1px solid ${$}`,borderPressedSuccess:`1px solid ${S}`,borderFocusSuccess:`1px solid ${$}`,borderDisabledSuccess:`1px solid ${C}`,rippleColorSuccess:C,colorWarning:L,colorHoverWarning:k,colorPressedWarning:I,colorFocusWarning:k,colorDisabledWarning:L,textColorWarning:g,textColorHoverWarning:g,textColorPressedWarning:g,textColorFocusWarning:g,textColorDisabledWarning:g,textColorTextWarning:L,textColorTextHoverWarning:k,textColorTextPressedWarning:I,textColorTextFocusWarning:k,textColorTextDisabledWarning:d,textColorGhostWarning:L,textColorGhostHoverWarning:k,textColorGhostPressedWarning:I,textColorGhostFocusWarning:k,textColorGhostDisabledWarning:L,borderWarning:`1px solid ${L}`,borderHoverWarning:`1px solid ${k}`,borderPressedWarning:`1px solid ${I}`,borderFocusWarning:`1px solid ${k}`,borderDisabledWarning:`1px solid ${L}`,rippleColorWarning:L,colorError:A,colorHoverError:R,colorPressedError:F,colorFocusError:R,colorDisabledError:A,textColorError:g,textColorHoverError:g,textColorPressedError:g,textColorFocusError:g,textColorDisabledError:g,textColorTextError:A,textColorTextHoverError:R,textColorTextPressedError:F,textColorTextFocusError:R,textColorTextDisabledError:d,textColorGhostError:A,textColorGhostHoverError:R,textColorGhostPressedError:F,textColorGhostFocusError:R,textColorGhostDisabledError:A,borderError:`1px solid ${A}`,borderHoverError:`1px solid ${R}`,borderPressedError:`1px solid ${F}`,borderFocusError:`1px solid ${R}`,borderDisabledError:`1px solid ${A}`,rippleColorError:A,waveOpacity:"0.6",fontWeight:H,fontWeightStrong:se})},jP={name:"Button",common:ie,self:ov},jt=jP,WP={name:"Button",common:ne,self(e){const t=ov(e);return t.waveOpacity="0.8",t.colorOpacitySecondary="0.16",t.colorOpacitySecondaryHover="0.2",t.colorOpacitySecondaryPressed="0.12",t}},Zt=WP,UP=N([W("button",`
 margin: 0;
 font-weight: var(--n-font-weight);
 line-height: 1;
 font-family: inherit;
 padding: var(--n-padding);
 height: var(--n-height);
 font-size: var(--n-font-size);
 border-radius: var(--n-border-radius);
 color: var(--n-text-color);
 background-color: var(--n-color);
 width: var(--n-width);
 white-space: nowrap;
 outline: none;
 position: relative;
 z-index: auto;
 border: none;
 display: inline-flex;
 flex-wrap: nowrap;
 flex-shrink: 0;
 align-items: center;
 justify-content: center;
 user-select: none;
 -webkit-user-select: none;
 text-align: center;
 cursor: pointer;
 text-decoration: none;
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 opacity .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `,[re("color",[oe("border",{borderColor:"var(--n-border-color)"}),re("disabled",[oe("border",{borderColor:"var(--n-border-color-disabled)"})]),Cn("disabled",[N("&:focus",[oe("state-border",{borderColor:"var(--n-border-color-focus)"})]),N("&:hover",[oe("state-border",{borderColor:"var(--n-border-color-hover)"})]),N("&:active",[oe("state-border",{borderColor:"var(--n-border-color-pressed)"})]),re("pressed",[oe("state-border",{borderColor:"var(--n-border-color-pressed)"})])])]),re("disabled",{backgroundColor:"var(--n-color-disabled)",color:"var(--n-text-color-disabled)"},[oe("border",{border:"var(--n-border-disabled)"})]),Cn("disabled",[N("&:focus",{backgroundColor:"var(--n-color-focus)",color:"var(--n-text-color-focus)"},[oe("state-border",{border:"var(--n-border-focus)"})]),N("&:hover",{backgroundColor:"var(--n-color-hover)",color:"var(--n-text-color-hover)"},[oe("state-border",{border:"var(--n-border-hover)"})]),N("&:active",{backgroundColor:"var(--n-color-pressed)",color:"var(--n-text-color-pressed)"},[oe("state-border",{border:"var(--n-border-pressed)"})]),re("pressed",{backgroundColor:"var(--n-color-pressed)",color:"var(--n-text-color-pressed)"},[oe("state-border",{border:"var(--n-border-pressed)"})])]),re("loading","cursor: wait;"),W("base-wave",`
 pointer-events: none;
 top: 0;
 right: 0;
 bottom: 0;
 left: 0;
 animation-iteration-count: 1;
 animation-duration: var(--n-ripple-duration);
 animation-timing-function: var(--n-bezier-ease-out), var(--n-bezier-ease-out);
 `,[re("active",{zIndex:1,animationName:"button-wave-spread, button-wave-opacity"})]),In&&"MozBoxSizing"in document.createElement("div").style?N("&::moz-focus-inner",{border:0}):null,oe("border, state-border",`
 position: absolute;
 left: 0;
 top: 0;
 right: 0;
 bottom: 0;
 border-radius: inherit;
 transition: border-color .3s var(--n-bezier);
 pointer-events: none;
 `),oe("border",{border:"var(--n-border)"}),oe("state-border",{border:"var(--n-border)",borderColor:"#0000",zIndex:1}),oe("icon",`
 margin: var(--n-icon-margin);
 margin-left: 0;
 height: var(--n-icon-size);
 width: var(--n-icon-size);
 max-width: var(--n-icon-size);
 font-size: var(--n-icon-size);
 position: relative;
 flex-shrink: 0;
 `,[W("icon-slot",`
 height: var(--n-icon-size);
 width: var(--n-icon-size);
 position: absolute;
 left: 0;
 top: 50%;
 transform: translateY(-50%);
 display: flex;
 align-items: center;
 justify-content: center;
 `,[Ms({top:"50%",originalTransform:"translateY(-50%)"})]),X6()]),oe("content",`
 display: flex;
 align-items: center;
 flex-wrap: nowrap;
 min-width: 0;
 `,[N("~",[oe("icon",{margin:"var(--n-icon-margin)",marginRight:0})])]),re("block",`
 display: flex;
 width: 100%;
 `),re("dashed",[oe("border, state-border",{borderStyle:"dashed !important"})]),re("disabled",{cursor:"not-allowed",opacity:"var(--n-opacity-disabled)"})]),N("@keyframes button-wave-spread",{from:{boxShadow:"0 0 0.5px 0 var(--n-ripple-color)"},to:{boxShadow:"0 0 0.5px 4.5px var(--n-ripple-color)"}}),N("@keyframes button-wave-opacity",{from:{opacity:"var(--n-wave-opacity)"},to:{opacity:0}})]),VP=Object.assign(Object.assign({},Xe.props),{color:String,textColor:String,text:Boolean,block:Boolean,loading:Boolean,disabled:Boolean,circle:Boolean,size:String,ghost:Boolean,round:Boolean,secondary:Boolean,tertiary:Boolean,quaternary:Boolean,strong:Boolean,focusable:{type:Boolean,default:!0},keyboard:{type:Boolean,default:!0},tag:{type:String,default:"button"},type:{type:String,default:"default"},dashed:Boolean,renderIcon:Function,iconPlacement:{type:String,default:"left"},attrType:{type:String,default:"button"},bordered:{type:Boolean,default:!0},onClick:[Function,Array],nativeFocusBehavior:{type:Boolean,default:!cP}}),KP=be({name:"Button",props:VP,setup(e){const t=K(null),r=K(null),o=K(!1),n=io(()=>!e.quaternary&&!e.tertiary&&!e.secondary&&!e.text&&(!e.color||e.ghost||e.dashed)&&e.bordered),i=Se(FP,{}),{mergedSizeRef:s}=j0({},{defaultSize:"medium",mergedSize:x=>{const{size:C}=e;if(C)return C;const{size:$}=i;if($)return $;const{mergedSize:S}=x||{};return S?S.value:"medium"}}),a=q(()=>e.focusable&&!e.disabled),l=x=>{var C;a.value||x.preventDefault(),!e.nativeFocusBehavior&&(x.preventDefault(),!e.disabled&&a.value&&((C=t.value)===null||C===void 0||C.focus({preventScroll:!0})))},c=x=>{var C;if(!e.disabled&&!e.loading){const{onClick:$}=e;$&&or($,x),e.text||(C=r.value)===null||C===void 0||C.play()}},u=x=>{switch(x.key){case"Enter":if(!e.keyboard)return;o.value=!1}},d=x=>{switch(x.key){case"Enter":if(!e.keyboard||e.loading){x.preventDefault();return}o.value=!0}},f=()=>{o.value=!1},{inlineThemeDisabled:h,mergedClsPrefixRef:p,mergedRtlRef:m}=kt(e),y=Xe("Button","-button",UP,jt,e,p),g=qs("Button",m,p),w=q(()=>{const x=y.value,{common:{cubicBezierEaseInOut:C,cubicBezierEaseOut:$},self:S}=x,{rippleDuration:L,opacityDisabled:k,fontWeight:I,fontWeightStrong:A}=S,R=s.value,{dashed:F,type:H,ghost:J,text:Y,color:Z,round:se,circle:ve,textColor:Le,secondary:_e,tertiary:Ae,quaternary:ut,strong:Ue}=e,j={"font-weight":Ue?A:I};let Q={"--n-color":"initial","--n-color-hover":"initial","--n-color-pressed":"initial","--n-color-focus":"initial","--n-color-disabled":"initial","--n-ripple-color":"initial","--n-text-color":"initial","--n-text-color-hover":"initial","--n-text-color-pressed":"initial","--n-text-color-focus":"initial","--n-text-color-disabled":"initial"};const te=H==="tertiary",de=H==="default",ae=te?"default":H;if(Y){const U=Le||Z;Q={"--n-color":"#0000","--n-color-hover":"#0000","--n-color-pressed":"#0000","--n-color-focus":"#0000","--n-color-disabled":"#0000","--n-ripple-color":"#0000","--n-text-color":U||S[Ce("textColorText",ae)],"--n-text-color-hover":U?rn(U):S[Ce("textColorTextHover",ae)],"--n-text-color-pressed":U?Ta(U):S[Ce("textColorTextPressed",ae)],"--n-text-color-focus":U?rn(U):S[Ce("textColorTextHover",ae)],"--n-text-color-disabled":U||S[Ce("textColorTextDisabled",ae)]}}else if(J||F){const U=Le||Z;Q={"--n-color":"#0000","--n-color-hover":"#0000","--n-color-pressed":"#0000","--n-color-focus":"#0000","--n-color-disabled":"#0000","--n-ripple-color":Z||S[Ce("rippleColor",ae)],"--n-text-color":U||S[Ce("textColorGhost",ae)],"--n-text-color-hover":U?rn(U):S[Ce("textColorGhostHover",ae)],"--n-text-color-pressed":U?Ta(U):S[Ce("textColorGhostPressed",ae)],"--n-text-color-focus":U?rn(U):S[Ce("textColorGhostHover",ae)],"--n-text-color-disabled":U||S[Ce("textColorGhostDisabled",ae)]}}else if(_e){const U=de?S.textColor:te?S.textColorTertiary:S[Ce("color",ae)],z=Z||U,B=H!=="default"&&H!=="tertiary";Q={"--n-color":B?G(z,{alpha:Number(S.colorOpacitySecondary)}):S.colorSecondary,"--n-color-hover":B?G(z,{alpha:Number(S.colorOpacitySecondaryHover)}):S.colorSecondaryHover,"--n-color-pressed":B?G(z,{alpha:Number(S.colorOpacitySecondaryPressed)}):S.colorSecondaryPressed,"--n-color-focus":B?G(z,{alpha:Number(S.colorOpacitySecondaryHover)}):S.colorSecondaryHover,"--n-color-disabled":S.colorSecondary,"--n-ripple-color":"#0000","--n-text-color":z,"--n-text-color-hover":z,"--n-text-color-pressed":z,"--n-text-color-focus":z,"--n-text-color-disabled":z}}else if(Ae||ut){const U=de?S.textColor:te?S.textColorTertiary:S[Ce("color",ae)],z=Z||U;Ae?(Q["--n-color"]=S.colorTertiary,Q["--n-color-hover"]=S.colorTertiaryHover,Q["--n-color-pressed"]=S.colorTertiaryPressed,Q["--n-color-focus"]=S.colorSecondaryHover,Q["--n-color-disabled"]=S.colorTertiary):(Q["--n-color"]=S.colorQuaternary,Q["--n-color-hover"]=S.colorQuaternaryHover,Q["--n-color-pressed"]=S.colorQuaternaryPressed,Q["--n-color-focus"]=S.colorQuaternaryHover,Q["--n-color-disabled"]=S.colorQuaternary),Q["--n-ripple-color"]="#0000",Q["--n-text-color"]=z,Q["--n-text-color-hover"]=z,Q["--n-text-color-pressed"]=z,Q["--n-text-color-focus"]=z,Q["--n-text-color-disabled"]=z}else Q={"--n-color":Z||S[Ce("color",ae)],"--n-color-hover":Z?rn(Z):S[Ce("colorHover",ae)],"--n-color-pressed":Z?Ta(Z):S[Ce("colorPressed",ae)],"--n-color-focus":Z?rn(Z):S[Ce("colorFocus",ae)],"--n-color-disabled":Z||S[Ce("colorDisabled",ae)],"--n-ripple-color":Z||S[Ce("rippleColor",ae)],"--n-text-color":Le||(Z?S.textColorPrimary:te?S.textColorTertiary:S[Ce("textColor",ae)]),"--n-text-color-hover":Le||(Z?S.textColorHoverPrimary:S[Ce("textColorHover",ae)]),"--n-text-color-pressed":Le||(Z?S.textColorPressedPrimary:S[Ce("textColorPressed",ae)]),"--n-text-color-focus":Le||(Z?S.textColorFocusPrimary:S[Ce("textColorFocus",ae)]),"--n-text-color-disabled":Le||(Z?S.textColorDisabledPrimary:S[Ce("textColorDisabled",ae)])};let Te={"--n-border":"initial","--n-border-hover":"initial","--n-border-pressed":"initial","--n-border-focus":"initial","--n-border-disabled":"initial"};Y?Te={"--n-border":"none","--n-border-hover":"none","--n-border-pressed":"none","--n-border-focus":"none","--n-border-disabled":"none"}:Te={"--n-border":S[Ce("border",ae)],"--n-border-hover":S[Ce("borderHover",ae)],"--n-border-pressed":S[Ce("borderPressed",ae)],"--n-border-focus":S[Ce("borderFocus",ae)],"--n-border-disabled":S[Ce("borderDisabled",ae)]};const{[Ce("height",R)]:me,[Ce("fontSize",R)]:_,[Ce("padding",R)]:b,[Ce("paddingRound",R)]:v,[Ce("iconSize",R)]:P,[Ce("borderRadius",R)]:O,[Ce("iconMargin",R)]:M,waveOpacity:V}=S,X={"--n-width":ve&&!Y?me:"initial","--n-height":Y?"initial":me,"--n-font-size":_,"--n-padding":ve||Y?"initial":se?v:b,"--n-icon-size":P,"--n-icon-margin":M,"--n-border-radius":Y?"initial":ve||se?me:O};return Object.assign(Object.assign(Object.assign(Object.assign({"--n-bezier":C,"--n-bezier-ease-out":$,"--n-ripple-duration":L,"--n-opacity-disabled":k,"--n-wave-opacity":V},j),Q),Te),X)}),T=h?br("button",q(()=>{let x="";const{dashed:C,type:$,ghost:S,text:L,color:k,round:I,circle:A,textColor:R,secondary:F,tertiary:H,quaternary:J,strong:Y}=e;C&&(x+="a"),S&&(x+="b"),L&&(x+="c"),I&&(x+="d"),A&&(x+="e"),F&&(x+="f"),H&&(x+="g"),J&&(x+="h"),Y&&(x+="i"),k&&(x+="j"+Sh(k)),R&&(x+="k"+Sh(R));const{value:Z}=s;return x+="l"+Z[0],x+="m"+$[0],x}),w,e):void 0;return{selfElRef:t,waveElRef:r,mergedClsPrefix:p,mergedFocusable:a,mergedSize:s,showBorder:n,enterPressed:o,rtlEnabled:g,handleMousedown:l,handleKeydown:d,handleBlur:f,handleKeyup:u,handleClick:c,customColorCssVars:q(()=>{const{color:x}=e;if(!x)return null;const C=rn(x);return{"--n-border-color":x,"--n-border-color-hover":C,"--n-border-color-pressed":Ta(x),"--n-border-color-focus":C,"--n-border-color-disabled":x}}),cssVars:h?void 0:w,themeClass:T==null?void 0:T.themeClass,onRender:T==null?void 0:T.onRender}},render(){const{mergedClsPrefix:e,tag:t,onRender:r}=this;r==null||r();const o=tr(this.$slots.default,n=>n&&E("span",{class:`${e}-button__content`},n));return E(t,{ref:"selfElRef",class:[this.themeClass,`${e}-button`,`${e}-button--${this.type}-type`,`${e}-button--${this.mergedSize}-type`,this.rtlEnabled&&`${e}-button--rtl`,this.disabled&&`${e}-button--disabled`,this.block&&`${e}-button--block`,this.enterPressed&&`${e}-button--pressed`,!this.text&&this.dashed&&`${e}-button--dashed`,this.color&&`${e}-button--color`,this.secondary&&`${e}-button--secondary`,this.loading&&`${e}-button--loading`,this.ghost&&`${e}-button--ghost`],tabindex:this.mergedFocusable?0:-1,type:this.attrType,style:this.cssVars,disabled:this.disabled,onClick:this.handleClick,onBlur:this.handleBlur,onMousedown:this.handleMousedown,onKeyup:this.handleKeyup,onKeydown:this.handleKeydown},this.iconPlacement==="right"&&o,E(ql,{width:!0},{default:()=>tr(this.$slots.icon,n=>(this.loading||this.renderIcon||n)&&E("span",{class:`${e}-button__icon`,style:{margin:fu(this.$slots.default)?"0":""}},E(Kl,null,{default:()=>this.loading?E(Ib,{clsPrefix:e,key:"loading",class:`${e}-icon-slot`,strokeWidth:20}):E("div",{key:"icon",class:`${e}-icon-slot`,role:"none"},this.renderIcon?this.renderIcon():n)})))}),this.iconPlacement==="left"&&o,this.text?null:E(k6,{ref:"waveElRef",clsPrefix:e}),this.showBorder?E("div",{"aria-hidden":!0,class:`${e}-button__border`,style:this.customColorCssVars}):null,this.showBorder?E("div",{"aria-hidden":!0,class:`${e}-button__state-border`,style:this.customColorCssVars}):null)}}),qn=KP,qP={titleFontSize:"22px"},nv=e=>{const{borderRadius:t,fontSize:r,lineHeight:o,textColor2:n,textColor1:i,textColorDisabled:s,dividerColor:a,fontWeightStrong:l,primaryColor:c,baseColor:u,hoverColor:d,cardColor:f,modalColor:h,popoverColor:p}=e;return Object.assign(Object.assign({},qP),{borderRadius:t,borderColor:he(f,a),borderColorModal:he(h,a),borderColorPopover:he(p,a),textColor:n,titleFontWeight:l,titleTextColor:i,dayTextColor:s,fontSize:r,lineHeight:o,dateColorCurrent:c,dateTextColorCurrent:u,cellColorHover:he(f,d),cellColorHoverModal:he(h,d),cellColorHoverPopover:he(p,d),cellColor:f,cellColorModal:h,cellColorPopover:p,barColor:c})},GP={name:"Calendar",common:ie,peers:{Button:jt},self:nv},XP=GP,YP={name:"Calendar",common:ne,peers:{Button:Zt},self:nv},ZP=YP,iv=e=>{const{fontSize:t,boxShadow2:r,popoverColor:o,textColor2:n,borderRadius:i,borderColor:s,heightSmall:a,heightMedium:l,heightLarge:c,fontSizeSmall:u,fontSizeMedium:d,fontSizeLarge:f,dividerColor:h}=e;return{panelFontSize:t,boxShadow:r,color:o,textColor:n,borderRadius:i,border:`1px solid ${s}`,heightSmall:a,heightMedium:l,heightLarge:c,fontSizeSmall:u,fontSizeMedium:d,fontSizeLarge:f,dividerColor:h}},JP={name:"ColorPicker",common:ie,peers:{Input:yr,Button:jt},self:iv},QP=JP,eL={name:"ColorPicker",common:ne,peers:{Input:vr,Button:Zt},self:iv},tL=eL,rL={paddingSmall:"12px 16px 12px",paddingMedium:"19px 24px 20px",paddingLarge:"23px 32px 24px",paddingHuge:"27px 40px 28px",titleFontSizeSmall:"16px",titleFontSizeMedium:"18px",titleFontSizeLarge:"18px",titleFontSizeHuge:"18px",closeIconSize:"18px",closeSize:"22px"},sv=e=>{const{primaryColor:t,borderRadius:r,lineHeight:o,fontSize:n,cardColor:i,textColor2:s,textColor1:a,dividerColor:l,fontWeightStrong:c,closeIconColor:u,closeIconColorHover:d,closeIconColorPressed:f,closeColorHover:h,closeColorPressed:p,modalColor:m,boxShadow1:y,popoverColor:g,actionColor:w}=e;return Object.assign(Object.assign({},rL),{lineHeight:o,color:i,colorModal:m,colorPopover:g,colorTarget:t,colorEmbedded:w,colorEmbeddedModal:w,colorEmbeddedPopover:w,textColor:s,titleTextColor:a,borderColor:l,actionColor:w,titleFontWeight:c,closeColorHover:h,closeColorPressed:p,closeBorderRadius:r,closeIconColor:u,closeIconColorHover:d,closeIconColorPressed:f,fontSizeSmall:n,fontSizeMedium:n,fontSizeLarge:n,fontSizeHuge:n,boxShadow:y,borderRadius:r})},oL={name:"Card",common:ie,self:sv},Wd=oL,nL={name:"Card",common:ne,self(e){const t=sv(e),{cardColor:r,modalColor:o,popoverColor:n}=e;return t.colorEmbedded=r,t.colorEmbeddedModal=o,t.colorEmbeddedPopover=n,t}},av=nL,iL=N([W("card",`
 font-size: var(--n-font-size);
 line-height: var(--n-line-height);
 display: flex;
 flex-direction: column;
 width: 100%;
 box-sizing: border-box;
 position: relative;
 border-radius: var(--n-border-radius);
 background-color: var(--n-color);
 color: var(--n-text-color);
 word-break: break-word;
 transition: 
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `,[y0({background:"var(--n-color-modal)"}),re("hoverable",[N("&:hover","box-shadow: var(--n-box-shadow);")]),re("content-segmented",[N(">",[oe("content",{paddingTop:"var(--n-padding-bottom)"})])]),re("content-soft-segmented",[N(">",[oe("content",`
 margin: 0 var(--n-padding-left);
 padding: var(--n-padding-bottom) 0;
 `)])]),re("footer-segmented",[N(">",[oe("footer",{paddingTop:"var(--n-padding-bottom)"})])]),re("footer-soft-segmented",[N(">",[oe("footer",`
 padding: var(--n-padding-bottom) 0;
 margin: 0 var(--n-padding-left);
 `)])]),N(">",[W("card-header",`
 box-sizing: border-box;
 display: flex;
 align-items: center;
 font-size: var(--n-title-font-size);
 padding:
 var(--n-padding-top)
 var(--n-padding-left)
 var(--n-padding-bottom)
 var(--n-padding-left);
 `,[oe("main",`
 font-weight: var(--n-title-font-weight);
 transition: color .3s var(--n-bezier);
 flex: 1;
 min-width: 0;
 color: var(--n-title-text-color);
 `),oe("extra",`
 display: flex;
 align-items: center;
 font-size: var(--n-font-size);
 font-weight: 400;
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
 `),oe("close",`
 margin: 0 0 0 8px;
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `)]),oe("action",`
 box-sizing: border-box;
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 background-clip: padding-box;
 background-color: var(--n-action-color);
 `),oe("content","flex: 1; min-width: 0;"),oe("content, footer",`
 box-sizing: border-box;
 padding: 0 var(--n-padding-left) var(--n-padding-bottom) var(--n-padding-left);
 font-size: var(--n-font-size);
 `,[N("&:first-child",{paddingTop:"var(--n-padding-bottom)"})]),oe("action",`
 background-color: var(--n-action-color);
 padding: var(--n-padding-bottom) var(--n-padding-left);
 border-bottom-left-radius: var(--n-border-radius);
 border-bottom-right-radius: var(--n-border-radius);
 `)]),W("card-cover",`
 overflow: hidden;
 width: 100%;
 border-radius: var(--n-border-radius) var(--n-border-radius) 0 0;
 `,[N("img",`
 display: block;
 width: 100%;
 `)]),re("bordered",`
 border: 1px solid var(--n-border-color);
 `,[N("&:target","border-color: var(--n-color-target);")]),re("action-segmented",[N(">",[oe("action",[N("&:not(:first-child)",{borderTop:"1px solid var(--n-border-color)"})])])]),re("content-segmented, content-soft-segmented",[N(">",[oe("content",{transition:"border-color 0.3s var(--n-bezier)"},[N("&:not(:first-child)",{borderTop:"1px solid var(--n-border-color)"})])])]),re("footer-segmented, footer-soft-segmented",[N(">",[oe("footer",{transition:"border-color 0.3s var(--n-bezier)"},[N("&:not(:first-child)",{borderTop:"1px solid var(--n-border-color)"})])])]),re("embedded",`
 background-color: var(--n-color-embedded);
 `)]),v0(W("card",`
 background: var(--n-color-modal);
 `,[re("embedded",`
 background-color: var(--n-color-embedded-modal);
 `)])),eS(W("card",`
 background: var(--n-color-popover);
 `,[re("embedded",`
 background-color: var(--n-color-embedded-popover);
 `)]))]),Ud={title:String,contentStyle:[Object,String],headerStyle:[Object,String],headerExtraStyle:[Object,String],footerStyle:[Object,String],embedded:Boolean,segmented:{type:[Boolean,Object],default:!1},size:{type:String,default:"medium"},bordered:{type:Boolean,default:!0},closable:Boolean,hoverable:Boolean,role:String,onClose:[Function,Array],tag:{type:String,default:"div"}},sL=Dl(Ud),aL=Object.assign(Object.assign({},Xe.props),Ud),lL=be({name:"Card",props:aL,setup(e){const t=()=>{const{onClose:c}=e;c&&or(c)},{inlineThemeDisabled:r,mergedClsPrefixRef:o,mergedRtlRef:n}=kt(e),i=Xe("Card","-card",iL,Wd,e,o),s=qs("Card",n,o),a=q(()=>{const{size:c}=e,{self:{color:u,colorModal:d,colorTarget:f,textColor:h,titleTextColor:p,titleFontWeight:m,borderColor:y,actionColor:g,borderRadius:w,lineHeight:T,closeIconColor:x,closeIconColorHover:C,closeIconColorPressed:$,closeColorHover:S,closeColorPressed:L,closeBorderRadius:k,closeIconSize:I,closeSize:A,boxShadow:R,colorPopover:F,colorEmbedded:H,colorEmbeddedModal:J,colorEmbeddedPopover:Y,[Ce("padding",c)]:Z,[Ce("fontSize",c)]:se,[Ce("titleFontSize",c)]:ve},common:{cubicBezierEaseInOut:Le}}=i.value,{top:_e,left:Ae,bottom:ut}=u0(Z);return{"--n-bezier":Le,"--n-border-radius":w,"--n-color":u,"--n-color-modal":d,"--n-color-popover":F,"--n-color-embedded":H,"--n-color-embedded-modal":J,"--n-color-embedded-popover":Y,"--n-color-target":f,"--n-text-color":h,"--n-line-height":T,"--n-action-color":g,"--n-title-text-color":p,"--n-title-font-weight":m,"--n-close-icon-color":x,"--n-close-icon-color-hover":C,"--n-close-icon-color-pressed":$,"--n-close-color-hover":S,"--n-close-color-pressed":L,"--n-border-color":y,"--n-box-shadow":R,"--n-padding-top":_e,"--n-padding-bottom":ut,"--n-padding-left":Ae,"--n-font-size":se,"--n-title-font-size":ve,"--n-close-size":A,"--n-close-icon-size":I,"--n-close-border-radius":k}}),l=r?br("card",q(()=>e.size[0]),a,e):void 0;return{rtlEnabled:s,mergedClsPrefix:o,mergedTheme:i,handleCloseClick:t,cssVars:r?void 0:a,themeClass:l==null?void 0:l.themeClass,onRender:l==null?void 0:l.onRender}},render(){const{segmented:e,bordered:t,hoverable:r,mergedClsPrefix:o,rtlEnabled:n,onRender:i,embedded:s,tag:a,$slots:l}=this;return i==null||i(),E(a,{class:[`${o}-card`,this.themeClass,s&&`${o}-card--embedded`,{[`${o}-card--rtl`]:n,[`${o}-card--content${typeof e!="boolean"&&e.content==="soft"?"-soft":""}-segmented`]:e===!0||e!==!1&&e.content,[`${o}-card--footer${typeof e!="boolean"&&e.footer==="soft"?"-soft":""}-segmented`]:e===!0||e!==!1&&e.footer,[`${o}-card--action-segmented`]:e===!0||e!==!1&&e.action,[`${o}-card--bordered`]:t,[`${o}-card--hoverable`]:r}],style:this.cssVars,role:this.role},tr(l.cover,c=>c&&E("div",{class:`${o}-card-cover`,role:"none"},c)),tr(l.header,c=>c||this.title||this.closable?E("div",{class:`${o}-card-header`,style:this.headerStyle},E("div",{class:`${o}-card-header__main`,role:"heading"},c||this.title),tr(l["header-extra"],u=>u&&E("div",{class:`${o}-card-header__extra`,style:this.headerExtraStyle},u)),this.closable?E(Gl,{clsPrefix:o,class:`${o}-card-header__close`,onClick:this.handleCloseClick,absolute:!0}):null):null),tr(l.default,c=>c&&E("div",{class:`${o}-card__content`,style:this.contentStyle,role:"none"},c)),tr(l.footer,c=>c&&[E("div",{class:`${o}-card__footer`,style:this.footerStyle,role:"none"},c)]),tr(l.action,c=>c&&E("div",{class:`${o}-card__action`,role:"none"},c)))}}),lv=e=>({dotSize:"8px",dotColor:"rgba(255, 255, 255, .3)",dotColorActive:"rgba(255, 255, 255, 1)",dotColorFocus:"rgba(255, 255, 255, .5)",dotLineWidth:"16px",dotLineWidthActive:"24px",arrowColor:"#eee"}),cL={name:"Carousel",common:ie,self:lv},uL=cL,dL={name:"Carousel",common:ne,self:lv},fL=dL,hL={sizeSmall:"14px",sizeMedium:"16px",sizeLarge:"18px",labelPadding:"0 8px",labelFontWeight:"400"},cv=e=>{const{baseColor:t,inputColorDisabled:r,cardColor:o,modalColor:n,popoverColor:i,textColorDisabled:s,borderColor:a,primaryColor:l,textColor2:c,fontSizeSmall:u,fontSizeMedium:d,fontSizeLarge:f,borderRadiusSmall:h,lineHeight:p}=e;return Object.assign(Object.assign({},hL),{labelLineHeight:p,fontSizeSmall:u,fontSizeMedium:d,fontSizeLarge:f,borderRadius:h,color:t,colorChecked:l,colorDisabled:r,colorDisabledChecked:r,colorTableHeader:o,colorTableHeaderModal:n,colorTableHeaderPopover:i,checkMarkColor:t,checkMarkColorDisabled:s,checkMarkColorDisabledChecked:s,border:`1px solid ${a}`,borderDisabled:`1px solid ${a}`,borderDisabledChecked:`1px solid ${a}`,borderChecked:`1px solid ${l}`,borderFocus:`1px solid ${l}`,boxShadowFocus:`0 0 0 2px ${G(l,{alpha:.3})}`,textColor:c,textColorDisabled:s})},pL={name:"Checkbox",common:ie,self:cv},Ai=pL,gL={name:"Checkbox",common:ne,self(e){const{cardColor:t}=e,r=cv(e);return r.color="#0000",r.checkMarkColor=t,r}},Bi=gL,uv=e=>{const{borderRadius:t,boxShadow2:r,popoverColor:o,textColor2:n,textColor3:i,primaryColor:s,textColorDisabled:a,dividerColor:l,hoverColor:c,fontSizeMedium:u,heightMedium:d}=e;return{menuBorderRadius:t,menuColor:o,menuBoxShadow:r,menuDividerColor:l,menuHeight:"calc(var(--n-option-height) * 6.6)",optionArrowColor:i,optionHeight:d,optionFontSize:u,optionColorHover:c,optionTextColor:n,optionTextColorActive:s,optionTextColorDisabled:a,optionCheckMarkColor:s,loadingColor:s,columnWidth:"180px"}},mL={name:"Cascader",common:ie,peers:{InternalSelectMenu:Zs,InternalSelection:Nd,Scrollbar:Nt,Checkbox:Ai,Empty:uo},self:uv},bL=mL,vL={name:"Cascader",common:ne,peers:{InternalSelectMenu:Js,InternalSelection:jd,Scrollbar:Yt,Checkbox:Bi,Empty:uo},self:uv},yL=vL,xL={name:"Code",common:ne,self(e){const{textColor2:t,fontSize:r,fontWeightStrong:o,textColor3:n}=e;return{textColor:t,fontSize:r,fontWeightStrong:o,"mono-3":"#5c6370","hue-1":"#56b6c2","hue-2":"#61aeee","hue-3":"#c678dd","hue-4":"#98c379","hue-5":"#e06c75","hue-5-2":"#be5046","hue-6":"#d19a66","hue-6-2":"#e6c07b",lineNumberTextColor:n}}},dv=xL,CL=e=>{const{textColor2:t,fontSize:r,fontWeightStrong:o,textColor3:n}=e;return{textColor:t,fontSize:r,fontWeightStrong:o,"mono-3":"#a0a1a7","hue-1":"#0184bb","hue-2":"#4078f2","hue-3":"#a626a4","hue-4":"#50a14f","hue-5":"#e45649","hue-5-2":"#c91243","hue-6":"#986801","hue-6-2":"#c18401",lineNumberTextColor:n}},wL={name:"Code",common:ie,self:CL},fv=wL,hv=e=>{const{fontWeight:t,textColor1:r,textColor2:o,textColorDisabled:n,dividerColor:i,fontSize:s}=e;return{titleFontSize:s,titleFontWeight:t,dividerColor:i,titleTextColor:r,titleTextColorDisabled:n,fontSize:s,textColor:o,arrowColor:o,arrowColorDisabled:n,itemMargin:"16px 0 0 0"}},SL={name:"Collapse",common:ie,self:hv},EL=SL,_L={name:"Collapse",common:ne,self:hv},TL=_L,pv=e=>{const{cubicBezierEaseInOut:t}=e;return{bezier:t}},$L={name:"CollapseTransition",common:ie,self:pv},PL=$L,LL={name:"CollapseTransition",common:ne,self:pv},kL=LL,IL={abstract:Boolean,bordered:{type:Boolean,default:void 0},clsPrefix:String,locale:Object,dateLocale:Object,namespace:String,rtl:Array,tag:{type:String,default:"div"},hljs:Object,katex:Object,theme:Object,themeOverrides:Object,componentOptions:Object,icons:Object,breakpoints:Object,preflightStyleDisabled:Boolean,inlineThemeDisabled:{type:Boolean,default:void 0},as:{type:String,validator:()=>(Ls("config-provider","`as` is deprecated, please use `tag` instead."),!0),default:void 0}},RL=be({name:"ConfigProvider",alias:["App"],props:IL,setup(e){const t=Se(Wo,null),r=q(()=>{const{theme:p}=e;if(p===null)return;const m=t==null?void 0:t.mergedThemeRef.value;return p===void 0?m:m===void 0?p:Object.assign({},m,p)}),o=q(()=>{const{themeOverrides:p}=e;if(p!==null){if(p===void 0)return t==null?void 0:t.mergedThemeOverridesRef.value;{const m=t==null?void 0:t.mergedThemeOverridesRef.value;return m===void 0?p:ts({},m,p)}}}),n=io(()=>{const{namespace:p}=e;return p===void 0?t==null?void 0:t.mergedNamespaceRef.value:p}),i=io(()=>{const{bordered:p}=e;return p===void 0?t==null?void 0:t.mergedBorderedRef.value:p}),s=q(()=>{const{icons:p}=e;return p===void 0?t==null?void 0:t.mergedIconsRef.value:p}),a=q(()=>{const{componentOptions:p}=e;return p!==void 0?p:t==null?void 0:t.mergedComponentPropsRef.value}),l=q(()=>{const{clsPrefix:p}=e;return p!==void 0?p:t==null?void 0:t.mergedClsPrefixRef.value}),c=q(()=>{var p;const{rtl:m}=e;if(m===void 0)return t==null?void 0:t.mergedRtlRef.value;const y={};for(const g of m)y[g.name]=rl(g),(p=g.peers)===null||p===void 0||p.forEach(w=>{w.name in y||(y[w.name]=rl(w))});return y}),u=q(()=>e.breakpoints||(t==null?void 0:t.mergedBreakpointsRef.value)),d=e.inlineThemeDisabled||(t==null?void 0:t.inlineThemeDisabled),f=e.preflightStyleDisabled||(t==null?void 0:t.preflightStyleDisabled),h=q(()=>{const{value:p}=r,{value:m}=o,y=m&&Object.keys(m).length!==0,g=p==null?void 0:p.name;return g?y?`${g}-${ks(JSON.stringify(o.value))}`:g:y?ks(JSON.stringify(o.value)):""});return qe(Wo,{mergedThemeHashRef:h,mergedBreakpointsRef:u,mergedRtlRef:c,mergedIconsRef:s,mergedComponentPropsRef:a,mergedBorderedRef:i,mergedNamespaceRef:n,mergedClsPrefixRef:l,mergedLocaleRef:q(()=>{const{locale:p}=e;if(p!==null)return p===void 0?t==null?void 0:t.mergedLocaleRef.value:p}),mergedDateLocaleRef:q(()=>{const{dateLocale:p}=e;if(p!==null)return p===void 0?t==null?void 0:t.mergedDateLocaleRef.value:p}),mergedHljsRef:q(()=>{const{hljs:p}=e;return p===void 0?t==null?void 0:t.mergedHljsRef.value:p}),mergedKatexRef:q(()=>{const{katex:p}=e;return p===void 0?t==null?void 0:t.mergedKatexRef.value:p}),mergedThemeRef:r,mergedThemeOverridesRef:o,inlineThemeDisabled:d||!1,preflightStyleDisabled:f||!1}),{mergedClsPrefix:l,mergedBordered:i,mergedNamespace:n,mergedTheme:r,mergedThemeOverrides:o}},render(){var e,t,r,o;return this.abstract?(o=(r=this.$slots).default)===null||o===void 0?void 0:o.call(r):E(this.as||this.tag,{class:`${this.mergedClsPrefix||kb}-config-provider`},(t=(e=this.$slots).default)===null||t===void 0?void 0:t.call(e))}}),OL={name:"Popselect",common:ne,peers:{Popover:Mn,InternalSelectMenu:Js}},gv=OL;function AL(e){const{boxShadow2:t}=e;return{menuBoxShadow:t}}const BL={name:"Popselect",common:ie,peers:{Popover:Go,InternalSelectMenu:Zs},self:AL},mv=BL;function bv(e){const{boxShadow2:t}=e;return{menuBoxShadow:t}}const ML={name:"Select",common:ie,peers:{InternalSelection:Nd,InternalSelectMenu:Zs},self:bv},vv=ML,HL={name:"Select",common:ne,peers:{InternalSelection:jd,InternalSelectMenu:Js},self:bv},yv=HL,DL={itemPaddingSmall:"0 4px",itemMarginSmall:"0 0 0 8px",itemMarginSmallRtl:"0 8px 0 0",itemPaddingMedium:"0 4px",itemMarginMedium:"0 0 0 8px",itemMarginMediumRtl:"0 8px 0 0",itemPaddingLarge:"0 4px",itemMarginLarge:"0 0 0 8px",itemMarginLargeRtl:"0 8px 0 0",buttonIconSizeSmall:"14px",buttonIconSizeMedium:"16px",buttonIconSizeLarge:"18px",inputWidthSmall:"60px",selectWidthSmall:"unset",inputMarginSmall:"0 0 0 8px",inputMarginSmallRtl:"0 8px 0 0",selectMarginSmall:"0 0 0 8px",prefixMarginSmall:"0 8px 0 0",suffixMarginSmall:"0 0 0 8px",inputWidthMedium:"60px",selectWidthMedium:"unset",inputMarginMedium:"0 0 0 8px",inputMarginMediumRtl:"0 8px 0 0",selectMarginMedium:"0 0 0 8px",prefixMarginMedium:"0 8px 0 0",suffixMarginMedium:"0 0 0 8px",inputWidthLarge:"60px",selectWidthLarge:"unset",inputMarginLarge:"0 0 0 8px",inputMarginLargeRtl:"0 8px 0 0",selectMarginLarge:"0 0 0 8px",prefixMarginLarge:"0 8px 0 0",suffixMarginLarge:"0 0 0 8px"},xv=e=>{const{textColor2:t,primaryColor:r,primaryColorHover:o,primaryColorPressed:n,inputColorDisabled:i,textColorDisabled:s,borderColor:a,borderRadius:l,fontSizeTiny:c,fontSizeSmall:u,fontSizeMedium:d,heightTiny:f,heightSmall:h,heightMedium:p}=e;return Object.assign(Object.assign({},DL),{buttonColor:"#0000",buttonColorHover:"#0000",buttonColorPressed:"#0000",buttonBorder:`1px solid ${a}`,buttonBorderHover:`1px solid ${a}`,buttonBorderPressed:`1px solid ${a}`,buttonIconColor:t,buttonIconColorHover:t,buttonIconColorPressed:t,itemTextColor:t,itemTextColorHover:o,itemTextColorPressed:n,itemTextColorActive:r,itemTextColorDisabled:s,itemColor:"#0000",itemColorHover:"#0000",itemColorPressed:"#0000",itemColorActive:"#0000",itemColorActiveHover:"#0000",itemColorDisabled:i,itemBorder:"1px solid #0000",itemBorderHover:"1px solid #0000",itemBorderPressed:"1px solid #0000",itemBorderActive:`1px solid ${r}`,itemBorderDisabled:`1px solid ${a}`,itemBorderRadius:l,itemSizeSmall:f,itemSizeMedium:h,itemSizeLarge:p,itemFontSizeSmall:c,itemFontSizeMedium:u,itemFontSizeLarge:d,jumperFontSizeSmall:c,jumperFontSizeMedium:u,jumperFontSizeLarge:d,jumperTextColor:t,jumperTextColorDisabled:s})},zL={name:"Pagination",common:ie,peers:{Select:vv,Input:yr,Popselect:mv},self:xv},Cv=zL,FL={name:"Pagination",common:ne,peers:{Select:yv,Input:vr,Popselect:gv},self(e){const{primaryColor:t,opacity3:r}=e,o=G(t,{alpha:Number(r)}),n=xv(e);return n.itemBorderActive=`1px solid ${o}`,n.itemBorderDisabled="1px solid #0000",n}},wv=FL,Sv={padding:"8px 14px"},NL={name:"Tooltip",common:ne,peers:{Popover:Mn},self(e){const{borderRadius:t,boxShadow2:r,popoverColor:o,textColor2:n}=e;return Object.assign(Object.assign({},Sv),{borderRadius:t,boxShadow:r,color:o,textColor:n})}},Xl=NL,jL=e=>{const{borderRadius:t,boxShadow2:r,baseColor:o}=e;return Object.assign(Object.assign({},Sv),{borderRadius:t,boxShadow:r,color:he(o,"rgba(0, 0, 0, .85)"),textColor:o})},WL={name:"Tooltip",common:ie,peers:{Popover:Go},self:jL},Qs=WL,UL={name:"Ellipsis",common:ne,peers:{Tooltip:Xl}},Ev=UL,VL={name:"Ellipsis",common:ie,peers:{Tooltip:Qs}},_v=VL,Tv={radioSizeSmall:"14px",radioSizeMedium:"16px",radioSizeLarge:"18px",labelPadding:"0 8px",labelFontWeight:"400"},KL={name:"Radio",common:ne,self(e){const{borderColor:t,primaryColor:r,baseColor:o,textColorDisabled:n,inputColorDisabled:i,textColor2:s,opacityDisabled:a,borderRadius:l,fontSizeSmall:c,fontSizeMedium:u,fontSizeLarge:d,heightSmall:f,heightMedium:h,heightLarge:p,lineHeight:m}=e;return Object.assign(Object.assign({},Tv),{labelLineHeight:m,buttonHeightSmall:f,buttonHeightMedium:h,buttonHeightLarge:p,fontSizeSmall:c,fontSizeMedium:u,fontSizeLarge:d,boxShadow:`inset 0 0 0 1px ${t}`,boxShadowActive:`inset 0 0 0 1px ${r}`,boxShadowFocus:`inset 0 0 0 1px ${r}, 0 0 0 2px ${G(r,{alpha:.3})}`,boxShadowHover:`inset 0 0 0 1px ${r}`,boxShadowDisabled:`inset 0 0 0 1px ${t}`,color:"#0000",colorDisabled:i,colorActive:"#0000",textColor:s,textColorDisabled:n,dotColorActive:r,dotColorDisabled:t,buttonBorderColor:t,buttonBorderColorActive:r,buttonBorderColorHover:r,buttonColor:"#0000",buttonColorActive:r,buttonTextColor:s,buttonTextColorActive:o,buttonTextColorHover:r,opacityDisabled:a,buttonBoxShadowFocus:`inset 0 0 0 1px ${r}, 0 0 0 2px ${G(r,{alpha:.3})}`,buttonBoxShadowHover:`inset 0 0 0 1px ${r}`,buttonBoxShadow:"inset 0 0 0 1px #0000",buttonBorderRadius:l})}},$v=KL,qL=e=>{const{borderColor:t,primaryColor:r,baseColor:o,textColorDisabled:n,inputColorDisabled:i,textColor2:s,opacityDisabled:a,borderRadius:l,fontSizeSmall:c,fontSizeMedium:u,fontSizeLarge:d,heightSmall:f,heightMedium:h,heightLarge:p,lineHeight:m}=e;return Object.assign(Object.assign({},Tv),{labelLineHeight:m,buttonHeightSmall:f,buttonHeightMedium:h,buttonHeightLarge:p,fontSizeSmall:c,fontSizeMedium:u,fontSizeLarge:d,boxShadow:`inset 0 0 0 1px ${t}`,boxShadowActive:`inset 0 0 0 1px ${r}`,boxShadowFocus:`inset 0 0 0 1px ${r}, 0 0 0 2px ${G(r,{alpha:.2})}`,boxShadowHover:`inset 0 0 0 1px ${r}`,boxShadowDisabled:`inset 0 0 0 1px ${t}`,color:o,colorDisabled:i,colorActive:"#0000",textColor:s,textColorDisabled:n,dotColorActive:r,dotColorDisabled:t,buttonBorderColor:t,buttonBorderColorActive:r,buttonBorderColorHover:t,buttonColor:o,buttonColorActive:o,buttonTextColor:s,buttonTextColorActive:r,buttonTextColorHover:r,opacityDisabled:a,buttonBoxShadowFocus:`inset 0 0 0 1px ${r}, 0 0 0 2px ${G(r,{alpha:.3})}`,buttonBoxShadowHover:"inset 0 0 0 1px #0000",buttonBoxShadow:"inset 0 0 0 1px #0000",buttonBorderRadius:l})},GL={name:"Radio",common:ie,self:qL},Pv=GL,XL={padding:"4px 0",optionIconSizeSmall:"14px",optionIconSizeMedium:"16px",optionIconSizeLarge:"16px",optionIconSizeHuge:"18px",optionSuffixWidthSmall:"14px",optionSuffixWidthMedium:"14px",optionSuffixWidthLarge:"16px",optionSuffixWidthHuge:"16px",optionIconSuffixWidthSmall:"32px",optionIconSuffixWidthMedium:"32px",optionIconSuffixWidthLarge:"36px",optionIconSuffixWidthHuge:"36px",optionPrefixWidthSmall:"14px",optionPrefixWidthMedium:"14px",optionPrefixWidthLarge:"16px",optionPrefixWidthHuge:"16px",optionIconPrefixWidthSmall:"36px",optionIconPrefixWidthMedium:"36px",optionIconPrefixWidthLarge:"40px",optionIconPrefixWidthHuge:"40px"},Lv=e=>{const{primaryColor:t,textColor2:r,dividerColor:o,hoverColor:n,popoverColor:i,invertedColor:s,borderRadius:a,fontSizeSmall:l,fontSizeMedium:c,fontSizeLarge:u,fontSizeHuge:d,heightSmall:f,heightMedium:h,heightLarge:p,heightHuge:m,textColor3:y,opacityDisabled:g}=e;return Object.assign(Object.assign({},XL),{optionHeightSmall:f,optionHeightMedium:h,optionHeightLarge:p,optionHeightHuge:m,borderRadius:a,fontSizeSmall:l,fontSizeMedium:c,fontSizeLarge:u,fontSizeHuge:d,optionTextColor:r,optionTextColorHover:r,optionTextColorActive:t,optionTextColorChildActive:t,color:i,dividerColor:o,suffixColor:r,prefixColor:r,optionColorHover:n,optionColorActive:G(t,{alpha:.1}),groupHeaderTextColor:y,optionTextColorInverted:"#BBB",optionTextColorHoverInverted:"#FFF",optionTextColorActiveInverted:"#FFF",optionTextColorChildActiveInverted:"#FFF",colorInverted:s,dividerColorInverted:"#BBB",suffixColorInverted:"#BBB",prefixColorInverted:"#BBB",optionColorHoverInverted:t,optionColorActiveInverted:t,groupHeaderTextColorInverted:"#AAA",optionOpacityDisabled:g})},YL={name:"Dropdown",common:ie,peers:{Popover:Go},self:Lv},Vd=YL,ZL={name:"Dropdown",common:ne,peers:{Popover:Mn},self(e){const{primaryColorSuppl:t,primaryColor:r,popoverColor:o}=e,n=Lv(e);return n.colorInverted=o,n.optionColorActive=G(r,{alpha:.15}),n.optionColorActiveInverted=t,n.optionColorHoverInverted=t,n}},Kd=ZL,JL={thPaddingSmall:"8px",thPaddingMedium:"12px",thPaddingLarge:"12px",tdPaddingSmall:"8px",tdPaddingMedium:"12px",tdPaddingLarge:"12px",sorterSize:"15px",resizableContainerSize:"8px",resizableSize:"2px",filterSize:"15px",paginationMargin:"12px 0 0 0",emptyPadding:"48px 0",actionPadding:"8px 12px",actionButtonMargin:"0 8px 0 0"},kv=e=>{const{cardColor:t,modalColor:r,popoverColor:o,textColor2:n,textColor1:i,tableHeaderColor:s,tableColorHover:a,iconColor:l,primaryColor:c,fontWeightStrong:u,borderRadius:d,lineHeight:f,fontSizeSmall:h,fontSizeMedium:p,fontSizeLarge:m,dividerColor:y,heightSmall:g,opacityDisabled:w,tableColorStriped:T}=e;return Object.assign(Object.assign({},JL),{actionDividerColor:y,lineHeight:f,borderRadius:d,fontSizeSmall:h,fontSizeMedium:p,fontSizeLarge:m,borderColor:he(t,y),tdColorHover:he(t,a),tdColorStriped:he(t,T),thColor:he(t,s),thColorHover:he(he(t,s),a),tdColor:t,tdTextColor:n,thTextColor:i,thFontWeight:u,thButtonColorHover:a,thIconColor:l,thIconColorActive:c,borderColorModal:he(r,y),tdColorHoverModal:he(r,a),tdColorStripedModal:he(r,T),thColorModal:he(r,s),thColorHoverModal:he(he(r,s),a),tdColorModal:r,borderColorPopover:he(o,y),tdColorHoverPopover:he(o,a),tdColorStripedPopover:he(o,T),thColorPopover:he(o,s),thColorHoverPopover:he(he(o,s),a),tdColorPopover:o,boxShadowBefore:"inset -12px 0 8px -12px rgba(0, 0, 0, .18)",boxShadowAfter:"inset 12px 0 8px -12px rgba(0, 0, 0, .18)",loadingColor:c,loadingSize:g,opacityLoading:w})},QL={name:"DataTable",common:ie,peers:{Button:jt,Checkbox:Ai,Radio:Pv,Pagination:Cv,Scrollbar:Nt,Empty:uo,Popover:Go,Ellipsis:_v,Dropdown:Vd},self:kv},e8=QL,t8={name:"DataTable",common:ne,peers:{Button:Zt,Checkbox:Bi,Radio:$v,Pagination:wv,Scrollbar:Yt,Empty:Bn,Popover:Mn,Ellipsis:Ev,Dropdown:Kd},self(e){const t=kv(e);return t.boxShadowAfter="inset 12px 0 8px -12px rgba(0, 0, 0, .36)",t.boxShadowBefore="inset -12px 0 8px -12px rgba(0, 0, 0, .36)",t}},r8=t8,o8=Object.assign(Object.assign({},jb),Xe.props),n8=be({name:"Tooltip",props:o8,__popover__:!0,setup(e){const t=Xe("Tooltip","-tooltip",void 0,Qs,e),r=K(null);return Object.assign(Object.assign({},{syncPosition(){r.value.syncPosition()},setShow(n){r.value.setShow(n)}}),{popoverRef:r,mergedTheme:t,popoverThemeOverrides:q(()=>t.value.self)})},render(){const{mergedTheme:e,internalExtraClass:t}=this;return E(j6,Object.assign(Object.assign({},this.$props),{theme:e.peers.Popover,themeOverrides:e.peerOverrides.Popover,builtinThemeOverrides:this.popoverThemeOverrides,internalExtraClass:t.concat("tooltip"),ref:"popoverRef"}),this.$slots)}}),Iv=e=>{const{textColorBase:t,opacity1:r,opacity2:o,opacity3:n,opacity4:i,opacity5:s}=e;return{color:t,opacity1Depth:r,opacity2Depth:o,opacity3Depth:n,opacity4Depth:i,opacity5Depth:s}},i8={name:"Icon",common:ie,self:Iv},s8=i8,a8={name:"Icon",common:ne,self:Iv},l8=a8,c8={itemFontSize:"12px",itemHeight:"36px",itemWidth:"52px",panelActionPadding:"8px 0"},Rv=e=>{const{popoverColor:t,textColor2:r,primaryColor:o,hoverColor:n,dividerColor:i,opacityDisabled:s,boxShadow2:a,borderRadius:l,iconColor:c,iconColorDisabled:u}=e;return Object.assign(Object.assign({},c8),{panelColor:t,panelBoxShadow:a,panelDividerColor:i,itemTextColor:r,itemTextColorActive:o,itemColorHover:n,itemOpacityDisabled:s,itemBorderRadius:l,borderRadius:l,iconColor:c,iconColorDisabled:u})},u8={name:"TimePicker",common:ie,peers:{Scrollbar:Nt,Button:jt,Input:yr},self:Rv},Ov=u8,d8={name:"TimePicker",common:ne,peers:{Scrollbar:Yt,Button:Zt,Input:vr},self:Rv},Av=d8,f8={itemSize:"24px",itemCellWidth:"38px",itemCellHeight:"32px",scrollItemWidth:"80px",scrollItemHeight:"40px",panelExtraFooterPadding:"8px 12px",panelActionPadding:"8px 12px",calendarTitlePadding:"0",calendarTitleHeight:"28px",arrowSize:"14px",panelHeaderPadding:"8px 12px",calendarDaysHeight:"32px",calendarTitleGridTempateColumns:"28px 28px 1fr 28px 28px",calendarLeftPaddingDate:"6px 12px 4px 12px",calendarLeftPaddingDatetime:"4px 12px",calendarLeftPaddingDaterange:"6px 12px 4px 12px",calendarLeftPaddingDatetimerange:"4px 12px",calendarLeftPaddingMonth:"0",calendarLeftPaddingYear:"0",calendarLeftPaddingQuarter:"0",calendarLeftPaddingMonthrange:"0",calendarLeftPaddingQuarterrange:"0",calendarLeftPaddingYearrange:"0",calendarRightPaddingDate:"6px 12px 4px 12px",calendarRightPaddingDatetime:"4px 12px",calendarRightPaddingDaterange:"6px 12px 4px 12px",calendarRightPaddingDatetimerange:"4px 12px",calendarRightPaddingMonth:"0",calendarRightPaddingYear:"0",calendarRightPaddingQuarter:"0",calendarRightPaddingMonthrange:"0",calendarRightPaddingQuarterrange:"0",calendarRightPaddingYearrange:"0"},Bv=e=>{const{hoverColor:t,fontSize:r,textColor2:o,textColorDisabled:n,popoverColor:i,primaryColor:s,borderRadiusSmall:a,iconColor:l,iconColorDisabled:c,textColor1:u,dividerColor:d,boxShadow2:f,borderRadius:h,fontWeightStrong:p}=e;return Object.assign(Object.assign({},f8),{itemFontSize:r,calendarDaysFontSize:r,calendarTitleFontSize:r,itemTextColor:o,itemTextColorDisabled:n,itemTextColorActive:i,itemTextColorCurrent:s,itemColorIncluded:G(s,{alpha:.1}),itemColorHover:t,itemColorDisabled:t,itemColorActive:s,itemBorderRadius:a,panelColor:i,panelTextColor:o,arrowColor:l,calendarTitleTextColor:u,calendarTitleColorHover:t,calendarDaysTextColor:o,panelHeaderDividerColor:d,calendarDaysDividerColor:d,calendarDividerColor:d,panelActionDividerColor:d,panelBoxShadow:f,panelBorderRadius:h,calendarTitleFontWeight:p,scrollItemBorderRadius:h,iconColor:l,iconColorDisabled:c})},h8={name:"DatePicker",common:ie,peers:{Input:yr,Button:jt,TimePicker:Ov,Scrollbar:Nt},self:Bv},p8=h8,g8={name:"DatePicker",common:ne,peers:{Input:vr,Button:Zt,TimePicker:Av,Scrollbar:Yt},self(e){const{popoverColor:t,hoverColor:r,primaryColor:o}=e,n=Bv(e);return n.itemColorDisabled=he(t,r),n.itemColorIncluded=G(o,{alpha:.15}),n.itemColorHover=he(t,r),n}},m8=g8;function b8(e){var t=e.default;if(typeof t=="function"){var r=function(){return t.apply(this,arguments)};r.prototype=t.prototype}else r={};return Object.defineProperty(r,"__esModule",{value:!0}),Object.keys(e).forEach(function(o){var n=Object.getOwnPropertyDescriptor(e,o);Object.defineProperty(r,o,n.get?n:{enumerable:!0,get:function(){return e[o]}})}),r}const v8={thPaddingBorderedSmall:"8px 12px",thPaddingBorderedMedium:"12px 16px",thPaddingBorderedLarge:"16px 24px",thPaddingSmall:"0",thPaddingMedium:"0",thPaddingLarge:"0",tdPaddingBorderedSmall:"8px 12px",tdPaddingBorderedMedium:"12px 16px",tdPaddingBorderedLarge:"16px 24px",tdPaddingSmall:"0 0 8px 0",tdPaddingMedium:"0 0 12px 0",tdPaddingLarge:"0 0 16px 0"},Mv=e=>{const{tableHeaderColor:t,textColor2:r,textColor1:o,cardColor:n,modalColor:i,popoverColor:s,dividerColor:a,borderRadius:l,fontWeightStrong:c,lineHeight:u,fontSizeSmall:d,fontSizeMedium:f,fontSizeLarge:h}=e;return Object.assign(Object.assign({},v8),{lineHeight:u,fontSizeSmall:d,fontSizeMedium:f,fontSizeLarge:h,titleTextColor:o,thColor:he(n,t),thColorModal:he(i,t),thColorPopover:he(s,t),thTextColor:o,thFontWeight:c,tdTextColor:r,tdColor:n,tdColorModal:i,tdColorPopover:s,borderColor:he(n,a),borderColorModal:he(i,a),borderColorPopover:he(s,a),borderRadius:l})},y8={name:"Descriptions",common:ie,self:Mv},x8=y8,C8={name:"Descriptions",common:ne,self:Mv},w8=C8,S8={titleFontSize:"18px",padding:"16px 28px 20px 28px",iconSize:"28px",actionSpace:"12px",contentMargin:"8px 0 16px 0",iconMargin:"0 4px 0 0",iconMarginIconTop:"4px 0 8px 0",closeSize:"22px",closeIconSize:"18px",closeMargin:"20px 26px 0 0",closeMarginIconTop:"10px 16px 0 0"},Hv=e=>{const{textColor1:t,textColor2:r,modalColor:o,closeIconColor:n,closeIconColorHover:i,closeIconColorPressed:s,closeColorHover:a,closeColorPressed:l,infoColor:c,successColor:u,warningColor:d,errorColor:f,primaryColor:h,dividerColor:p,borderRadius:m,fontWeightStrong:y,lineHeight:g,fontSize:w}=e;return Object.assign(Object.assign({},S8),{fontSize:w,lineHeight:g,border:`1px solid ${p}`,titleTextColor:t,textColor:r,color:o,closeColorHover:a,closeColorPressed:l,closeIconColor:n,closeIconColorHover:i,closeIconColorPressed:s,closeBorderRadius:m,iconColor:h,iconColorInfo:c,iconColorSuccess:u,iconColorWarning:d,iconColorError:f,borderRadius:m,titleFontWeight:y})},E8={name:"Dialog",common:ie,peers:{Button:jt},self:Hv},qd=E8,_8={name:"Dialog",common:ne,peers:{Button:Zt},self:Hv},Dv=_8,Yl={icon:Function,type:{type:String,default:"default"},title:[String,Function],closable:{type:Boolean,default:!0},negativeText:String,positiveText:String,positiveButtonProps:Object,negativeButtonProps:Object,content:[String,Function],action:Function,showIcon:{type:Boolean,default:!0},loading:Boolean,bordered:Boolean,iconPlacement:String,onPositiveClick:Function,onNegativeClick:Function,onClose:Function},zv=Dl(Yl),T8=N([W("dialog",`
 word-break: break-word;
 line-height: var(--n-line-height);
 position: relative;
 background: var(--n-color);
 color: var(--n-text-color);
 box-sizing: border-box;
 margin: auto;
 border-radius: var(--n-border-radius);
 padding: var(--n-padding);
 transition: 
 border-color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `,[oe("icon",{color:"var(--n-icon-color)"}),re("bordered",{border:"var(--n-border)"}),re("icon-top",[oe("close",{margin:"var(--n-close-margin)"}),oe("icon",{margin:"var(--n-icon-margin)"}),oe("content",{textAlign:"center"}),oe("title",{justifyContent:"center"}),oe("action",{justifyContent:"center"})]),re("icon-left",[oe("icon",{margin:"var(--n-icon-margin)"}),re("closable",[oe("title",`
 padding-right: calc(var(--n-close-size) + 6px);
 `)])]),oe("close",`
 position: absolute;
 right: 0;
 top: 0;
 margin: var(--n-close-margin);
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 z-index: 1;
 `),oe("content",`
 font-size: var(--n-font-size);
 margin: var(--n-content-margin);
 position: relative;
 word-break: break-word;
 `,[re("last","margin-bottom: 0;")]),oe("action",`
 display: flex;
 justify-content: flex-end;
 `,[N("> *:not(:last-child)",{marginRight:"var(--n-action-space)"})]),oe("icon",{fontSize:"var(--n-icon-size)",transition:"color .3s var(--n-bezier)"}),oe("title",`
 transition: color .3s var(--n-bezier);
 display: flex;
 align-items: center;
 font-size: var(--n-title-font-size);
 font-weight: var(--n-title-font-weight);
 color: var(--n-title-text-color);
 `),W("dialog-icon-container",{display:"flex",justifyContent:"center"})]),v0(W("dialog",`
 width: 446px;
 max-width: calc(100vw - 32px);
 `)),W("dialog",[y0(`
 width: 446px;
 max-width: calc(100vw - 32px);
 `)])]),$8={default:()=>E(gi,null),info:()=>E(gi,null),success:()=>E(Xs,null),warning:()=>E(Ys,null),error:()=>E(Gs,null)},Fv=be({name:"Dialog",alias:["NimbusConfirmCard","Confirm"],props:Object.assign(Object.assign({},Xe.props),Yl),setup(e){const{mergedComponentPropsRef:t,mergedClsPrefixRef:r,inlineThemeDisabled:o}=kt(e),n=q(()=>{var d,f;const{iconPlacement:h}=e;return h||((f=(d=t==null?void 0:t.value)===null||d===void 0?void 0:d.Dialog)===null||f===void 0?void 0:f.iconPlacement)||"left"});function i(d){const{onPositiveClick:f}=e;f&&f(d)}function s(d){const{onNegativeClick:f}=e;f&&f(d)}function a(){const{onClose:d}=e;d&&d()}const l=Xe("Dialog","-dialog",T8,qd,e,r),c=q(()=>{const{type:d}=e,f=n.value,{common:{cubicBezierEaseInOut:h},self:{fontSize:p,lineHeight:m,border:y,titleTextColor:g,textColor:w,color:T,closeBorderRadius:x,closeColorHover:C,closeColorPressed:$,closeIconColor:S,closeIconColorHover:L,closeIconColorPressed:k,closeIconSize:I,borderRadius:A,titleFontWeight:R,titleFontSize:F,padding:H,iconSize:J,actionSpace:Y,contentMargin:Z,closeSize:se,[f==="top"?"iconMarginIconTop":"iconMargin"]:ve,[f==="top"?"closeMarginIconTop":"closeMargin"]:Le,[Ce("iconColor",d)]:_e}}=l.value;return{"--n-font-size":p,"--n-icon-color":_e,"--n-bezier":h,"--n-close-margin":Le,"--n-icon-margin":ve,"--n-icon-size":J,"--n-close-size":se,"--n-close-icon-size":I,"--n-close-border-radius":x,"--n-close-color-hover":C,"--n-close-color-pressed":$,"--n-close-icon-color":S,"--n-close-icon-color-hover":L,"--n-close-icon-color-pressed":k,"--n-color":T,"--n-text-color":w,"--n-border-radius":A,"--n-padding":H,"--n-line-height":m,"--n-border":y,"--n-content-margin":Z,"--n-title-font-size":F,"--n-title-font-weight":R,"--n-title-text-color":g,"--n-action-space":Y}}),u=o?br("dialog",q(()=>`${e.type[0]}${n.value[0]}`),c,e):void 0;return{mergedClsPrefix:r,mergedIconPlacement:n,mergedTheme:l,handlePositiveClick:i,handleNegativeClick:s,handleCloseClick:a,cssVars:o?void 0:c,themeClass:u==null?void 0:u.themeClass,onRender:u==null?void 0:u.onRender}},render(){var e;const{bordered:t,mergedIconPlacement:r,cssVars:o,closable:n,showIcon:i,title:s,content:a,action:l,negativeText:c,positiveText:u,positiveButtonProps:d,negativeButtonProps:f,handlePositiveClick:h,handleNegativeClick:p,mergedTheme:m,loading:y,type:g,mergedClsPrefix:w}=this;(e=this.onRender)===null||e===void 0||e.call(this);const T=i?E(dt,{clsPrefix:w,class:`${w}-dialog__icon`},{default:()=>tr(this.$slots.icon,C=>C||(this.icon?er(this.icon):$8[this.type]()))}):null,x=tr(this.$slots.action,C=>C||u||c||l?E("div",{class:`${w}-dialog__action`},C||(l?[er(l)]:[this.negativeText&&E(qn,Object.assign({theme:m.peers.Button,themeOverrides:m.peerOverrides.Button,ghost:!0,size:"small",onClick:p},f),{default:()=>er(this.negativeText)}),this.positiveText&&E(qn,Object.assign({theme:m.peers.Button,themeOverrides:m.peerOverrides.Button,size:"small",type:g==="default"?"primary":g,disabled:y,loading:y,onClick:h},d),{default:()=>er(this.positiveText)})])):null);return E("div",{class:[`${w}-dialog`,this.themeClass,this.closable&&`${w}-dialog--closable`,`${w}-dialog--icon-${r}`,t&&`${w}-dialog--bordered`],style:o,role:"dialog"},n?E(Gl,{clsPrefix:w,class:`${w}-dialog__close`,onClick:this.handleCloseClick}):null,i&&r==="top"?E("div",{class:`${w}-dialog-icon-container`},T):null,E("div",{class:`${w}-dialog__title`},i&&r==="left"?T:null,du(this.$slots.header,()=>[er(s)])),E("div",{class:[`${w}-dialog__content`,x?"":`${w}-dialog__content--last`]},du(this.$slots.default,()=>[er(a)])),x)}}),Nv="n-dialog-provider",P8="n-dialog-api",L8="n-dialog-reactive-list",jv=e=>{const{modalColor:t,textColor2:r,boxShadow3:o}=e;return{color:t,textColor:r,boxShadow:o}},k8={name:"Modal",common:ie,peers:{Scrollbar:Nt,Dialog:qd,Card:Wd},self:jv},Wv=k8,I8={name:"Modal",common:ne,peers:{Scrollbar:Yt,Dialog:Dv,Card:av},self:jv},R8=I8,Gd=Object.assign(Object.assign({},Ud),Yl),O8=Dl(Gd),A8=be({name:"ModalBody",inheritAttrs:!1,props:Object.assign(Object.assign({show:{type:Boolean,required:!0},preset:String,displayDirective:{type:String,required:!0},trapFocus:{type:Boolean,default:!0},autoFocus:{type:Boolean,default:!0},blockScroll:Boolean},Gd),{renderMask:Function,onClickoutside:Function,onBeforeLeave:{type:Function,required:!0},onAfterLeave:{type:Function,required:!0},onPositiveClick:{type:Function,required:!0},onNegativeClick:{type:Function,required:!0},onClose:{type:Function,required:!0},onAfterEnter:Function,onEsc:Function}),setup(e){const t=K(null),r=K(null),o=K(e.show),n=K(null),i=K(null);et(Be(e,"show"),y=>{y&&(o.value=!0)}),cE(q(()=>e.blockScroll&&o.value));const s=Se(T0);function a(){if(s.transformOriginRef.value==="center")return"";const{value:y}=n,{value:g}=i;if(y===null||g===null)return"";if(r.value){const w=r.value.containerScrollTop;return`${y}px ${g+w}px`}return""}function l(y){if(s.transformOriginRef.value==="center")return;const g=s.getMousePosition();if(!g||!r.value)return;const w=r.value.containerScrollTop,{offsetLeft:T,offsetTop:x}=y;if(g){const C=g.y,$=g.x;n.value=-(T-$),i.value=-(x-C-w)}y.style.transformOrigin=a()}function c(y){zt(()=>{l(y)})}function u(y){y.style.transformOrigin=a(),e.onBeforeLeave()}function d(){o.value=!1,n.value=null,i.value=null,e.onAfterLeave()}function f(){const{onClose:y}=e;y&&y()}function h(){e.onNegativeClick()}function p(){e.onPositiveClick()}const m=K(null);return et(m,y=>{y&&zt(()=>{const g=y.el;g&&t.value!==g&&(t.value=g)})}),qe(Sd,t),qe(Ed,null),qe(_d,null),{mergedTheme:s.mergedThemeRef,appear:s.appearRef,isMounted:s.isMountedRef,mergedClsPrefix:s.mergedClsPrefixRef,bodyRef:t,scrollbarRef:r,displayed:o,childNodeRef:m,handlePositiveClick:p,handleNegativeClick:h,handleCloseClick:f,handleAfterLeave:d,handleBeforeLeave:u,handleEnter:c}},render(){const{$slots:e,$attrs:t,handleEnter:r,handleAfterLeave:o,handleBeforeLeave:n,preset:i,mergedClsPrefix:s}=this;let a=null;if(!i){if(a=uu(e),!a){Ls("modal","default slot is empty");return}a=_r(a),a.props=Ml({class:`${s}-modal`},t,a.props||{})}return this.displayDirective==="show"||this.displayed||this.show?Fr(E("div",{role:"none",class:`${s}-modal-body-wrapper`},E(Hb,{ref:"scrollbarRef",theme:this.mergedTheme.peers.Scrollbar,themeOverrides:this.mergedTheme.peerOverrides.Scrollbar,contentClass:`${s}-modal-scroll-content`},{default:()=>{var l;return[(l=this.renderMask)===null||l===void 0?void 0:l.call(this),E(N0,{disabled:!this.trapFocus,active:this.show,onEsc:this.onEsc,autoFocus:this.autoFocus},{default:()=>{var c;return E(qt,{name:"fade-in-scale-up-transition",appear:(c=this.appear)!==null&&c!==void 0?c:this.isMounted,onEnter:r,onAfterEnter:this.onAfterEnter,onAfterLeave:o,onBeforeLeave:n},{default:()=>{const u=[[$s,this.show]],{onClickoutside:d}=this;return d&&u.push([mu,this.onClickoutside,void 0,{capture:!0}]),Fr(this.preset==="confirm"||this.preset==="dialog"?E(Fv,Object.assign({},this.$attrs,{class:[`${s}-modal`,this.$attrs.class],ref:"bodyRef",theme:this.mergedTheme.peers.Dialog,themeOverrides:this.mergedTheme.peerOverrides.Dialog},hi(this.$props,zv),{"aria-modal":"true"}),e):this.preset==="card"?E(lL,Object.assign({},this.$attrs,{ref:"bodyRef",class:[`${s}-modal`,this.$attrs.class],theme:this.mergedTheme.peers.Card,themeOverrides:this.mergedTheme.peerOverrides.Card},hi(this.$props,sL),{"aria-modal":"true",role:"dialog"}),e):this.childNodeRef=a,u)}})}})]}})),[[$s,this.displayDirective==="if"||this.displayed||this.show]]):null}}),B8=N([W("modal-container",`
 position: fixed;
 left: 0;
 top: 0;
 height: 0;
 width: 0;
 display: flex;
 `),W("modal-mask",`
 position: fixed;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 background-color: rgba(0, 0, 0, .4);
 `,[Hs({enterDuration:".25s",leaveDuration:".25s",enterCubicBezier:"var(--n-bezier-ease-out)",leaveCubicBezier:"var(--n-bezier-ease-out)"})]),W("modal-body-wrapper",`
 position: fixed;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 overflow: visible;
 `,[W("modal-scroll-content",`
 min-height: 100%;
 display: flex;
 position: relative;
 `)]),W("modal",`
 position: relative;
 align-self: center;
 color: var(--n-text-color);
 margin: auto;
 box-shadow: var(--n-box-shadow);
 `,[zb({duration:".25s",enterScale:".5"})])]),M8=Object.assign(Object.assign(Object.assign(Object.assign({},Xe.props),{show:Boolean,unstableShowMask:{type:Boolean,default:!0},maskClosable:{type:Boolean,default:!0},preset:String,to:[String,Object],displayDirective:{type:String,default:"if"},transformOrigin:{type:String,default:"mouse"},zIndex:Number,autoFocus:{type:Boolean,default:!0},trapFocus:{type:Boolean,default:!0},closeOnEsc:{type:Boolean,default:!0},blockScroll:{type:Boolean,default:!0}}),Gd),{onEsc:Function,"onUpdate:show":[Function,Array],onUpdateShow:[Function,Array],onAfterEnter:Function,onBeforeLeave:Function,onAfterLeave:Function,onClose:Function,onPositiveClick:Function,onNegativeClick:Function,onMaskClick:Function,internalDialog:Boolean,internalAppear:{type:Boolean,default:void 0},overlayStyle:[String,Object],onBeforeHide:Function,onAfterHide:Function,onHide:Function}),H8=be({name:"Modal",inheritAttrs:!1,props:M8,setup(e){const t=K(null),{mergedClsPrefixRef:r,namespaceRef:o,inlineThemeDisabled:n}=kt(e),i=Xe("Modal","-modal",B8,Wv,e,r),s=E0(64),a=S0(),l=Ri(),c=e.internalDialog?Se(Nv,null):null,u=uE();function d(C){const{onUpdateShow:$,"onUpdate:show":S,onHide:L}=e;$&&or($,C),S&&or(S,C),L&&!C&&L(C)}function f(){const{onClose:C}=e;C?Promise.resolve(C()).then($=>{$!==!1&&d(!1)}):d(!1)}function h(){const{onPositiveClick:C}=e;C?Promise.resolve(C()).then($=>{$!==!1&&d(!1)}):d(!1)}function p(){const{onNegativeClick:C}=e;C?Promise.resolve(C()).then($=>{$!==!1&&d(!1)}):d(!1)}function m(){const{onBeforeLeave:C,onBeforeHide:$}=e;C&&or(C),$&&$()}function y(){const{onAfterLeave:C,onAfterHide:$}=e;C&&or(C),$&&$()}function g(C){var $;const{onMaskClick:S}=e;S&&S(C),e.maskClosable&&!(($=t.value)===null||$===void 0)&&$.contains(Ps(C))&&d(!1)}function w(C){var $;($=e.onEsc)===null||$===void 0||$.call(e),e.show&&e.closeOnEsc&&oS(C)&&!u.value&&d(!1)}qe(T0,{getMousePosition:()=>{if(c){const{clickedRef:C,clickPositionRef:$}=c;if(C.value&&$.value)return $.value}return s.value?a.value:null},mergedClsPrefixRef:r,mergedThemeRef:i,isMountedRef:l,appearRef:Be(e,"internalAppear"),transformOriginRef:Be(e,"transformOrigin")});const T=q(()=>{const{common:{cubicBezierEaseOut:C},self:{boxShadow:$,color:S,textColor:L}}=i.value;return{"--n-bezier-ease-out":C,"--n-box-shadow":$,"--n-color":S,"--n-text-color":L}}),x=n?br("theme-class",void 0,T,e):void 0;return{mergedClsPrefix:r,namespace:o,isMounted:l,containerRef:t,presetProps:q(()=>hi(e,O8)),handleEsc:w,handleAfterLeave:y,handleClickoutside:g,handleBeforeLeave:m,doUpdateShow:d,handleNegativeClick:p,handlePositiveClick:h,handleCloseClick:f,cssVars:n?void 0:T,themeClass:x==null?void 0:x.themeClass,onRender:x==null?void 0:x.onRender}},render(){const{mergedClsPrefix:e}=this;return E(Td,{to:this.to,show:this.show},{default:()=>{var t;(t=this.onRender)===null||t===void 0||t.call(this);const{unstableShowMask:r}=this;return Fr(E("div",{role:"none",ref:"containerRef",class:[`${e}-modal-container`,this.themeClass,this.namespace],style:this.cssVars},E(A8,Object.assign({style:this.overlayStyle},this.$attrs,{ref:"bodyWrapper",displayDirective:this.displayDirective,show:this.show,preset:this.preset,autoFocus:this.autoFocus,trapFocus:this.trapFocus,blockScroll:this.blockScroll},this.presetProps,{onEsc:this.handleEsc,onClose:this.handleCloseClick,onNegativeClick:this.handleNegativeClick,onPositiveClick:this.handlePositiveClick,onBeforeLeave:this.handleBeforeLeave,onAfterEnter:this.onAfterEnter,onAfterLeave:this.handleAfterLeave,onClickoutside:r?void 0:this.handleClickoutside,renderMask:r?()=>{var o;return E(qt,{name:"fade-in-transition",key:"mask",appear:(o=this.internalAppear)!==null&&o!==void 0?o:this.isMounted},{default:()=>this.show?E("div",{"aria-hidden":!0,ref:"containerRef",class:`${e}-modal-mask`,onClick:this.handleClickoutside}):null})}:void 0}),this.$slots)),[[Fl,{zIndex:this.zIndex,enabled:this.show}]])}})}}),D8=Object.assign(Object.assign({},Yl),{onAfterEnter:Function,onAfterLeave:Function,transformOrigin:String,blockScroll:{type:Boolean,default:!0},closeOnEsc:{type:Boolean,default:!0},onEsc:Function,autoFocus:{type:Boolean,default:!0},internalStyle:[String,Object],maskClosable:{type:Boolean,default:!0},onPositiveClick:Function,onNegativeClick:Function,onClose:Function,onMaskClick:Function}),z8=be({name:"DialogEnvironment",props:Object.assign(Object.assign({},D8),{internalKey:{type:String,required:!0},to:[String,Object],onInternalAfterLeave:{type:Function,required:!0}}),setup(e){const t=K(!0);function r(){const{onInternalAfterLeave:u,internalKey:d,onAfterLeave:f}=e;u&&u(d),f&&f()}function o(u){const{onPositiveClick:d}=e;d?Promise.resolve(d(u)).then(f=>{f!==!1&&l()}):l()}function n(u){const{onNegativeClick:d}=e;d?Promise.resolve(d(u)).then(f=>{f!==!1&&l()}):l()}function i(){const{onClose:u}=e;u?Promise.resolve(u()).then(d=>{d!==!1&&l()}):l()}function s(u){const{onMaskClick:d,maskClosable:f}=e;d&&(d(u),f&&l())}function a(){const{onEsc:u}=e;u&&u()}function l(){t.value=!1}function c(u){t.value=u}return{show:t,hide:l,handleUpdateShow:c,handleAfterLeave:r,handleCloseClick:i,handleNegativeClick:n,handlePositiveClick:o,handleMaskClick:s,handleEsc:a}},render(){const{handlePositiveClick:e,handleUpdateShow:t,handleNegativeClick:r,handleCloseClick:o,handleAfterLeave:n,handleMaskClick:i,handleEsc:s,to:a,maskClosable:l,show:c}=this;return E(H8,{show:c,onUpdateShow:t,onMaskClick:i,onEsc:s,to:a,maskClosable:l,onAfterEnter:this.onAfterEnter,onAfterLeave:n,closeOnEsc:this.closeOnEsc,blockScroll:this.blockScroll,autoFocus:this.autoFocus,transformOrigin:this.transformOrigin,internalAppear:!0,internalDialog:!0},{default:()=>E(Fv,Object.assign({},hi(this.$props,zv),{style:this.internalStyle,onClose:o,onNegativeClick:r,onPositiveClick:e}))})}}),F8={injectionKey:String,to:[String,Object]},N8=be({name:"DialogProvider",props:F8,setup(){const e=K([]),t={};function r(a={}){const l=_n(),c=Gt(Object.assign(Object.assign({},a),{key:l,destroy:()=>{t[`n-dialog-${l}`].hide()}}));return e.value.push(c),c}const o=["info","success","warning","error"].map(a=>l=>r(Object.assign(Object.assign({},l),{type:a})));function n(a){const{value:l}=e;l.splice(l.findIndex(c=>c.key===a),1)}function i(){Object.values(t).forEach(a=>a.hide())}const s={create:r,destroyAll:i,info:o[0],success:o[1],warning:o[2],error:o[3]};return qe(P8,s),qe(Nv,{clickedRef:E0(64),clickPositionRef:S0()}),qe(L8,e),Object.assign(Object.assign({},s),{dialogList:e,dialogInstRefs:t,handleAfterLeave:n})},render(){var e,t;return E(Qe,null,[this.dialogList.map(r=>E(z8,Cd(r,["destroy","style"],{internalStyle:r.style,to:this.to,ref:o=>{o===null?delete this.dialogInstRefs[`n-dialog-${r.key}`]:this.dialogInstRefs[`n-dialog-${r.key}`]=o},internalKey:r.key,onInternalAfterLeave:this.handleAfterLeave}))),(t=(e=this.$slots).default)===null||t===void 0?void 0:t.call(e)])}}),Uv=e=>{const{textColor1:t,dividerColor:r,fontWeightStrong:o}=e;return{textColor:t,color:r,fontWeight:o}},j8={name:"Divider",common:ie,self:Uv},W8=j8,U8={name:"Divider",common:ne,self:Uv},V8=U8,Vv=e=>{const{modalColor:t,textColor1:r,textColor2:o,boxShadow3:n,lineHeight:i,fontWeightStrong:s,dividerColor:a,closeColorHover:l,closeColorPressed:c,closeIconColor:u,closeIconColorHover:d,closeIconColorPressed:f,borderRadius:h,primaryColorHover:p}=e;return{bodyPadding:"16px 24px",headerPadding:"16px 24px",footerPadding:"16px 24px",color:t,textColor:o,titleTextColor:r,titleFontSize:"18px",titleFontWeight:s,boxShadow:n,lineHeight:i,headerBorderBottom:`1px solid ${a}`,footerBorderTop:`1px solid ${a}`,closeIconColor:u,closeIconColorHover:d,closeIconColorPressed:f,closeSize:"22px",closeIconSize:"18px",closeColorHover:l,closeColorPressed:c,closeBorderRadius:h,resizableTriggerColorHover:p}},K8={name:"Drawer",common:ie,peers:{Scrollbar:Nt},self:Vv},q8=K8,G8={name:"Drawer",common:ne,peers:{Scrollbar:Yt},self:Vv},X8=G8,Kv={actionMargin:"0 0 0 20px",actionMarginRtl:"0 20px 0 0"},Y8={name:"DynamicInput",common:ne,peers:{Input:vr,Button:Zt},self(){return Kv}},Z8=Y8,J8=()=>Kv,Q8={name:"DynamicInput",common:ie,peers:{Input:yr,Button:jt},self:J8},ek=Q8,qv={gapSmall:"4px 8px",gapMedium:"8px 12px",gapLarge:"12px 16px"},tk={name:"Space",self(){return qv}},Gv=tk,rk=()=>qv,ok={name:"Space",self:rk},Xv=ok,nk={name:"DynamicTags",common:ne,peers:{Input:vr,Button:Zt,Tag:Ub,Space:Gv},self(){return{inputWidth:"64px"}}},ik=nk,sk={name:"DynamicTags",common:ie,peers:{Input:yr,Button:jt,Tag:Vb,Space:Xv},self(){return{inputWidth:"64px"}}},ak=sk,lk={name:"Element",common:ne},ck=lk,uk={name:"Element",common:ie},dk=uk,fk={feedbackPadding:"4px 0 0 2px",feedbackHeightSmall:"24px",feedbackHeightMedium:"24px",feedbackHeightLarge:"26px",feedbackFontSizeSmall:"13px",feedbackFontSizeMedium:"14px",feedbackFontSizeLarge:"14px",labelFontSizeLeftSmall:"14px",labelFontSizeLeftMedium:"14px",labelFontSizeLeftLarge:"15px",labelFontSizeTopSmall:"13px",labelFontSizeTopMedium:"14px",labelFontSizeTopLarge:"14px",labelHeightSmall:"24px",labelHeightMedium:"26px",labelHeightLarge:"28px",labelPaddingVertical:"0 0 6px 2px",labelPaddingHorizontal:"0 12px 0 0",labelTextAlignVertical:"left",labelTextAlignHorizontal:"right",labelFontWeight:"400"},Yv=e=>{const{heightSmall:t,heightMedium:r,heightLarge:o,textColor1:n,errorColor:i,warningColor:s,lineHeight:a,textColor3:l}=e;return Object.assign(Object.assign({},fk),{blankHeightSmall:t,blankHeightMedium:r,blankHeightLarge:o,lineHeight:a,labelTextColor:n,asteriskColor:i,feedbackTextColorError:i,feedbackTextColorWarning:s,feedbackTextColor:l})},hk={name:"Form",common:ie,self:Yv},pk=hk,gk={name:"Form",common:ne,self:Yv},mk=gk,bk={name:"GradientText",common:ne,self(e){const{primaryColor:t,successColor:r,warningColor:o,errorColor:n,infoColor:i,primaryColorSuppl:s,successColorSuppl:a,warningColorSuppl:l,errorColorSuppl:c,infoColorSuppl:u,fontWeightStrong:d}=e;return{fontWeight:d,rotate:"252deg",colorStartPrimary:t,colorEndPrimary:s,colorStartInfo:i,colorEndInfo:u,colorStartWarning:o,colorEndWarning:l,colorStartError:n,colorEndError:c,colorStartSuccess:r,colorEndSuccess:a}}},vk=bk,yk=e=>{const{primaryColor:t,successColor:r,warningColor:o,errorColor:n,infoColor:i,fontWeightStrong:s}=e;return{fontWeight:s,rotate:"252deg",colorStartPrimary:G(t,{alpha:.6}),colorEndPrimary:t,colorStartInfo:G(i,{alpha:.6}),colorEndInfo:i,colorStartWarning:G(o,{alpha:.6}),colorEndWarning:o,colorStartError:G(n,{alpha:.6}),colorEndError:n,colorStartSuccess:G(r,{alpha:.6}),colorEndSuccess:r}},xk={name:"GradientText",common:ie,self:yk},Ck=xk,Zv=e=>{const{primaryColor:t,baseColor:r}=e;return{color:t,iconColor:r}},wk={name:"IconWrapper",common:ie,self:Zv},Sk=wk,Ek={name:"IconWrapper",common:ne,self:Zv},_k=Ek,Xd=Object.assign(Object.assign({},Xe.props),{showToolbar:{type:Boolean,default:!0},showToolbarTooltip:Boolean}),Jv="n-image";function Tk(){return{toolbarIconColor:"rgba(255, 255, 255, .9)",toolbarColor:"rgba(0, 0, 0, .35)",toolbarBoxShadow:"none",toolbarBorderRadius:"24px"}}const Qv={name:"Image",common:ie,peers:{Tooltip:Qs},self:Tk},$k={closeMargin:"16px 12px",closeSize:"20px",closeIconSize:"16px",width:"365px",padding:"16px",titleFontSize:"16px",metaFontSize:"12px",descriptionFontSize:"12px"},e1=e=>{const{textColor2:t,successColor:r,infoColor:o,warningColor:n,errorColor:i,popoverColor:s,closeIconColor:a,closeIconColorHover:l,closeIconColorPressed:c,closeColorHover:u,closeColorPressed:d,textColor1:f,textColor3:h,borderRadius:p,fontWeightStrong:m,boxShadow2:y,lineHeight:g,fontSize:w}=e;return Object.assign(Object.assign({},$k),{borderRadius:p,lineHeight:g,fontSize:w,headerFontWeight:m,iconColor:t,iconColorSuccess:r,iconColorInfo:o,iconColorWarning:n,iconColorError:i,color:s,textColor:t,closeIconColor:a,closeIconColorHover:l,closeIconColorPressed:c,closeBorderRadius:p,closeColorHover:u,closeColorPressed:d,headerTextColor:f,descriptionTextColor:h,actionTextColor:t,boxShadow:y})},Pk={name:"Notification",common:ie,peers:{Scrollbar:Nt},self:e1},t1=Pk,Lk={name:"Notification",common:ne,peers:{Scrollbar:Yt},self:e1},kk=Lk,Ik={margin:"0 0 8px 0",padding:"10px 20px",maxWidth:"720px",minWidth:"420px",iconMargin:"0 10px 0 0",closeMargin:"0 0 0 10px",closeSize:"20px",closeIconSize:"16px",iconSize:"20px",fontSize:"14px"},r1=e=>{const{textColor2:t,closeIconColor:r,closeIconColorHover:o,closeIconColorPressed:n,infoColor:i,successColor:s,errorColor:a,warningColor:l,popoverColor:c,boxShadow2:u,primaryColor:d,lineHeight:f,borderRadius:h,closeColorHover:p,closeColorPressed:m}=e;return Object.assign(Object.assign({},Ik),{closeBorderRadius:h,textColor:t,textColorInfo:t,textColorSuccess:t,textColorError:t,textColorWarning:t,textColorLoading:t,color:c,colorInfo:c,colorSuccess:c,colorError:c,colorWarning:c,colorLoading:c,boxShadow:u,boxShadowInfo:u,boxShadowSuccess:u,boxShadowError:u,boxShadowWarning:u,boxShadowLoading:u,iconColor:t,iconColorInfo:i,iconColorSuccess:s,iconColorWarning:l,iconColorError:a,iconColorLoading:d,closeColorHover:p,closeColorPressed:m,closeIconColor:r,closeIconColorHover:o,closeIconColorPressed:n,closeColorHoverInfo:p,closeColorPressedInfo:m,closeIconColorInfo:r,closeIconColorHoverInfo:o,closeIconColorPressedInfo:n,closeColorHoverSuccess:p,closeColorPressedSuccess:m,closeIconColorSuccess:r,closeIconColorHoverSuccess:o,closeIconColorPressedSuccess:n,closeColorHoverError:p,closeColorPressedError:m,closeIconColorError:r,closeIconColorHoverError:o,closeIconColorPressedError:n,closeColorHoverWarning:p,closeColorPressedWarning:m,closeIconColorWarning:r,closeIconColorHoverWarning:o,closeIconColorPressedWarning:n,closeColorHoverLoading:p,closeColorPressedLoading:m,closeIconColorLoading:r,closeIconColorHoverLoading:o,closeIconColorPressedLoading:n,loadingColor:d,lineHeight:f,borderRadius:h})},Rk={name:"Message",common:ie,self:r1},o1=Rk,Ok={name:"Message",common:ne,self:r1},Ak=Ok,Bk={name:"ButtonGroup",common:ne},Mk=Bk,Hk={name:"ButtonGroup",common:ie},Dk=Hk,zk={name:"InputNumber",common:ne,peers:{Button:Zt,Input:vr},self(e){const{textColorDisabled:t}=e;return{iconColorDisabled:t}}},Fk=zk,Nk=e=>{const{textColorDisabled:t}=e;return{iconColorDisabled:t}},jk={name:"InputNumber",common:ie,peers:{Button:jt,Input:yr},self:Nk},Wk=jk,Uk={name:"Layout",common:ne,peers:{Scrollbar:Yt},self(e){const{textColor2:t,bodyColor:r,popoverColor:o,cardColor:n,dividerColor:i,scrollbarColor:s,scrollbarColorHover:a}=e;return{textColor:t,textColorInverted:t,color:r,colorEmbedded:r,headerColor:n,headerColorInverted:n,footerColor:n,footerColorInverted:n,headerBorderColor:i,headerBorderColorInverted:i,footerBorderColor:i,footerBorderColorInverted:i,siderBorderColor:i,siderBorderColorInverted:i,siderColor:n,siderColorInverted:n,siderToggleButtonBorder:"1px solid transparent",siderToggleButtonColor:o,siderToggleButtonIconColor:t,siderToggleButtonIconColorInverted:t,siderToggleBarColor:he(r,s),siderToggleBarColorHover:he(r,a),__invertScrollbar:"false"}}},Vk=Uk,Kk=e=>{const{baseColor:t,textColor2:r,bodyColor:o,cardColor:n,dividerColor:i,actionColor:s,scrollbarColor:a,scrollbarColorHover:l,invertedColor:c}=e;return{textColor:r,textColorInverted:"#FFF",color:o,colorEmbedded:s,headerColor:n,headerColorInverted:c,footerColor:s,footerColorInverted:c,headerBorderColor:i,headerBorderColorInverted:c,footerBorderColor:i,footerBorderColorInverted:c,siderBorderColor:i,siderBorderColorInverted:c,siderColor:n,siderColorInverted:c,siderToggleButtonBorder:`1px solid ${i}`,siderToggleButtonColor:t,siderToggleButtonIconColor:r,siderToggleButtonIconColorInverted:r,siderToggleBarColor:he(o,a),siderToggleBarColorHover:he(o,l),__invertScrollbar:"true"}},qk={name:"Layout",common:ie,peers:{Scrollbar:Nt},self:Kk},Gk=qk,n1=e=>{const{textColor2:t,cardColor:r,modalColor:o,popoverColor:n,dividerColor:i,borderRadius:s,fontSize:a,hoverColor:l}=e;return{textColor:t,color:r,colorHover:l,colorModal:o,colorHoverModal:he(o,l),colorPopover:n,colorHoverPopover:he(n,l),borderColor:i,borderColorModal:he(o,i),borderColorPopover:he(n,i),borderRadius:s,fontSize:a}},Xk={name:"List",common:ie,self:n1},Yk=Xk,Zk={name:"List",common:ne,self:n1},Jk=Zk,Qk={name:"LoadingBar",common:ne,self(e){const{primaryColor:t}=e;return{colorError:"red",colorLoading:t,height:"2px"}}},eI=Qk,tI=e=>{const{primaryColor:t,errorColor:r}=e;return{colorError:r,colorLoading:t,height:"2px"}},rI={name:"LoadingBar",common:ie,self:tI},i1=rI,oI={name:"Log",common:ne,peers:{Scrollbar:Yt,Code:dv},self(e){const{textColor2:t,inputColor:r,fontSize:o,primaryColor:n}=e;return{loaderFontSize:o,loaderTextColor:t,loaderColor:r,loaderBorder:"1px solid #0000",loadingColor:n}}},nI=oI,iI=e=>{const{textColor2:t,modalColor:r,borderColor:o,fontSize:n,primaryColor:i}=e;return{loaderFontSize:n,loaderTextColor:t,loaderColor:r,loaderBorder:`1px solid ${o}`,loadingColor:i}},sI={name:"Log",common:ie,peers:{Scrollbar:Nt,Code:fv},self:iI},aI=sI,lI={name:"Mention",common:ne,peers:{InternalSelectMenu:Js,Input:vr},self(e){const{boxShadow2:t}=e;return{menuBoxShadow:t}}},cI=lI,uI=e=>{const{boxShadow2:t}=e;return{menuBoxShadow:t}},dI={name:"Mention",common:ie,peers:{InternalSelectMenu:Zs,Input:yr},self:uI},fI=dI;function hI(e,t,r,o){return{itemColorHoverInverted:"#0000",itemColorActiveInverted:t,itemColorActiveHoverInverted:t,itemColorActiveCollapsedInverted:t,itemTextColorInverted:e,itemTextColorHoverInverted:r,itemTextColorChildActiveInverted:r,itemTextColorChildActiveHoverInverted:r,itemTextColorActiveInverted:r,itemTextColorActiveHoverInverted:r,itemTextColorHorizontalInverted:e,itemTextColorHoverHorizontalInverted:r,itemTextColorChildActiveHorizontalInverted:r,itemTextColorChildActiveHoverHorizontalInverted:r,itemTextColorActiveHorizontalInverted:r,itemTextColorActiveHoverHorizontalInverted:r,itemIconColorInverted:e,itemIconColorHoverInverted:r,itemIconColorActiveInverted:r,itemIconColorActiveHoverInverted:r,itemIconColorChildActiveInverted:r,itemIconColorChildActiveHoverInverted:r,itemIconColorCollapsedInverted:e,itemIconColorHorizontalInverted:e,itemIconColorHoverHorizontalInverted:r,itemIconColorActiveHorizontalInverted:r,itemIconColorActiveHoverHorizontalInverted:r,itemIconColorChildActiveHorizontalInverted:r,itemIconColorChildActiveHoverHorizontalInverted:r,arrowColorInverted:e,arrowColorHoverInverted:r,arrowColorActiveInverted:r,arrowColorActiveHoverInverted:r,arrowColorChildActiveInverted:r,arrowColorChildActiveHoverInverted:r,groupTextColorInverted:o}}const s1=e=>{const{borderRadius:t,textColor3:r,primaryColor:o,textColor2:n,textColor1:i,fontSize:s,dividerColor:a,hoverColor:l,primaryColorHover:c}=e;return Object.assign({borderRadius:t,color:"#0000",groupTextColor:r,itemColorHover:l,itemColorActive:G(o,{alpha:.1}),itemColorActiveHover:G(o,{alpha:.1}),itemColorActiveCollapsed:G(o,{alpha:.1}),itemTextColor:n,itemTextColorHover:n,itemTextColorActive:o,itemTextColorActiveHover:o,itemTextColorChildActive:o,itemTextColorChildActiveHover:o,itemTextColorHorizontal:n,itemTextColorHoverHorizontal:c,itemTextColorActiveHorizontal:o,itemTextColorActiveHoverHorizontal:o,itemTextColorChildActiveHorizontal:o,itemTextColorChildActiveHoverHorizontal:o,itemIconColor:i,itemIconColorHover:i,itemIconColorActive:o,itemIconColorActiveHover:o,itemIconColorChildActive:o,itemIconColorChildActiveHover:o,itemIconColorCollapsed:i,itemIconColorHorizontal:i,itemIconColorHoverHorizontal:c,itemIconColorActiveHorizontal:o,itemIconColorActiveHoverHorizontal:o,itemIconColorChildActiveHorizontal:o,itemIconColorChildActiveHoverHorizontal:o,itemHeight:"42px",arrowColor:n,arrowColorHover:n,arrowColorActive:o,arrowColorActiveHover:o,arrowColorChildActive:o,arrowColorChildActiveHover:o,colorInverted:"#0000",borderColorHorizontal:"#0000",fontSize:s,dividerColor:a},hI("#BBB",o,"#FFF","#AAA"))},pI={name:"Menu",common:ie,peers:{Tooltip:Qs,Dropdown:Vd},self:s1},gI=pI,mI={name:"Menu",common:ne,peers:{Tooltip:Xl,Dropdown:Kd},self(e){const{primaryColor:t,primaryColorSuppl:r}=e,o=s1(e);return o.itemColorActive=G(t,{alpha:.15}),o.itemColorActiveHover=G(t,{alpha:.15}),o.itemColorActiveCollapsed=G(t,{alpha:.15}),o.itemColorActiveInverted=r,o.itemColorActiveHoverInverted=r,o.itemColorActiveCollapsedInverted=r,o}},bI=mI,vI={titleFontSize:"18px",backSize:"22px"};function a1(e){const{textColor1:t,textColor2:r,textColor3:o,fontSize:n,fontWeightStrong:i,primaryColorHover:s,primaryColorPressed:a}=e;return Object.assign(Object.assign({},vI),{titleFontWeight:i,fontSize:n,titleTextColor:t,backColor:r,backColorHover:s,backColorPressed:a,subtitleTextColor:o})}const yI={name:"PageHeader",common:ie,self:a1},xI={name:"PageHeader",common:ne,self:a1},CI={iconSize:"22px"},l1=e=>{const{fontSize:t,warningColor:r}=e;return Object.assign(Object.assign({},CI),{fontSize:t,iconColor:r})},wI={name:"Popconfirm",common:ie,peers:{Button:jt,Popover:Go},self:l1},SI=wI,EI={name:"Popconfirm",common:ne,peers:{Button:Zt,Popover:Mn},self:l1},_I=EI,c1=e=>{const{infoColor:t,successColor:r,warningColor:o,errorColor:n,textColor2:i,progressRailColor:s,fontSize:a,fontWeight:l}=e;return{fontSize:a,fontSizeCircle:"28px",fontWeightCircle:l,railColor:s,railHeight:"8px",iconSizeCircle:"36px",iconSizeLine:"18px",iconColor:t,iconColorInfo:t,iconColorSuccess:r,iconColorWarning:o,iconColorError:n,textColorCircle:i,textColorLineInner:"rgb(255, 255, 255)",textColorLineOuter:i,fillColor:t,fillColorInfo:t,fillColorSuccess:r,fillColorWarning:o,fillColorError:n,lineBgProcessing:"linear-gradient(90deg, rgba(255, 255, 255, .3) 0%, rgba(255, 255, 255, .5) 100%)"}},TI={name:"Progress",common:ie,self:c1},Yd=TI,$I={name:"Progress",common:ne,self(e){const t=c1(e);return t.textColorLineInner="rgb(0, 0, 0)",t.lineBgProcessing="linear-gradient(90deg, rgba(255, 255, 255, .3) 0%, rgba(255, 255, 255, .5) 100%)",t}},u1=$I,PI={name:"Rate",common:ne,self(e){const{railColor:t}=e;return{itemColor:t,itemColorActive:"#CCAA33",itemSize:"20px",sizeSmall:"16px",sizeMedium:"20px",sizeLarge:"24px"}}},LI=PI,kI=e=>{const{railColor:t}=e;return{itemColor:t,itemColorActive:"#FFCC33",sizeSmall:"16px",sizeMedium:"20px",sizeLarge:"24px"}},II={name:"Rate",common:ie,self:kI},RI=II,OI={titleFontSizeSmall:"26px",titleFontSizeMedium:"32px",titleFontSizeLarge:"40px",titleFontSizeHuge:"48px",fontSizeSmall:"14px",fontSizeMedium:"14px",fontSizeLarge:"15px",fontSizeHuge:"16px",iconSizeSmall:"64px",iconSizeMedium:"80px",iconSizeLarge:"100px",iconSizeHuge:"125px",iconColor418:void 0,iconColor404:void 0,iconColor403:void 0,iconColor500:void 0},d1=e=>{const{textColor2:t,textColor1:r,errorColor:o,successColor:n,infoColor:i,warningColor:s,lineHeight:a,fontWeightStrong:l}=e;return Object.assign(Object.assign({},OI),{lineHeight:a,titleFontWeight:l,titleTextColor:r,textColor:t,iconColorError:o,iconColorSuccess:n,iconColorInfo:i,iconColorWarning:s})},AI={name:"Result",common:ie,self:d1},BI=AI,MI={name:"Result",common:ne,self:d1},HI=MI,f1={railHeight:"4px",railWidthVertical:"4px",handleSize:"18px",dotHeight:"8px",dotWidth:"8px",dotBorderRadius:"4px"},DI={name:"Slider",common:ne,self(e){const t="0 2px 8px 0 rgba(0, 0, 0, 0.12)",{railColor:r,modalColor:o,primaryColorSuppl:n,popoverColor:i,textColor2:s,cardColor:a,borderRadius:l,fontSize:c,opacityDisabled:u}=e;return Object.assign(Object.assign({},f1),{fontSize:c,markFontSize:c,railColor:r,railColorHover:r,fillColor:n,fillColorHover:n,opacityDisabled:u,handleColor:"#FFF",dotColor:a,dotColorModal:o,dotColorPopover:i,handleBoxShadow:"0px 2px 4px 0 rgba(0, 0, 0, 0.4)",handleBoxShadowHover:"0px 2px 4px 0 rgba(0, 0, 0, 0.4)",handleBoxShadowActive:"0px 2px 4px 0 rgba(0, 0, 0, 0.4)",handleBoxShadowFocus:"0px 2px 4px 0 rgba(0, 0, 0, 0.4)",indicatorColor:i,indicatorBoxShadow:t,indicatorTextColor:s,indicatorBorderRadius:l,dotBorder:`2px solid ${r}`,dotBorderActive:`2px solid ${n}`,dotBoxShadow:""})}},zI=DI,FI=e=>{const t="rgba(0, 0, 0, .85)",r="0 2px 8px 0 rgba(0, 0, 0, 0.12)",{railColor:o,primaryColor:n,baseColor:i,cardColor:s,modalColor:a,popoverColor:l,borderRadius:c,fontSize:u,opacityDisabled:d}=e;return Object.assign(Object.assign({},f1),{fontSize:u,markFontSize:u,railColor:o,railColorHover:o,fillColor:n,fillColorHover:n,opacityDisabled:d,handleColor:"#FFF",dotColor:s,dotColorModal:a,dotColorPopover:l,handleBoxShadow:"0 1px 4px 0 rgba(0, 0, 0, 0.3), inset 0 0 1px 0 rgba(0, 0, 0, 0.05)",handleBoxShadowHover:"0 1px 4px 0 rgba(0, 0, 0, 0.3), inset 0 0 1px 0 rgba(0, 0, 0, 0.05)",handleBoxShadowActive:"0 1px 4px 0 rgba(0, 0, 0, 0.3), inset 0 0 1px 0 rgba(0, 0, 0, 0.05)",handleBoxShadowFocus:"0 1px 4px 0 rgba(0, 0, 0, 0.3), inset 0 0 1px 0 rgba(0, 0, 0, 0.05)",indicatorColor:t,indicatorBoxShadow:r,indicatorTextColor:i,indicatorBorderRadius:c,dotBorder:`2px solid ${o}`,dotBorderActive:`2px solid ${n}`,dotBoxShadow:""})},NI={name:"Slider",common:ie,self:FI},jI=NI,h1=e=>{const{opacityDisabled:t,heightTiny:r,heightSmall:o,heightMedium:n,heightLarge:i,heightHuge:s,primaryColor:a,fontSize:l}=e;return{fontSize:l,textColor:a,sizeTiny:r,sizeSmall:o,sizeMedium:n,sizeLarge:i,sizeHuge:s,color:a,opacitySpinning:t}},WI={name:"Spin",common:ie,self:h1},UI=WI,VI={name:"Spin",common:ne,self:h1},KI=VI,p1=e=>{const{textColor2:t,textColor3:r,fontSize:o,fontWeight:n}=e;return{labelFontSize:o,labelFontWeight:n,valueFontWeight:n,valueFontSize:"24px",labelTextColor:r,valuePrefixTextColor:t,valueSuffixTextColor:t,valueTextColor:t}},qI={name:"Statistic",common:ie,self:p1},GI=qI,XI={name:"Statistic",common:ne,self:p1},YI=XI,ZI={stepHeaderFontSizeSmall:"14px",stepHeaderFontSizeMedium:"16px",indicatorIndexFontSizeSmall:"14px",indicatorIndexFontSizeMedium:"16px",indicatorSizeSmall:"22px",indicatorSizeMedium:"28px",indicatorIconSizeSmall:"14px",indicatorIconSizeMedium:"18px"},g1=e=>{const{fontWeightStrong:t,baseColor:r,textColorDisabled:o,primaryColor:n,errorColor:i,textColor1:s,textColor2:a}=e;return Object.assign(Object.assign({},ZI),{stepHeaderFontWeight:t,indicatorTextColorProcess:r,indicatorTextColorWait:o,indicatorTextColorFinish:n,indicatorTextColorError:i,indicatorBorderColorProcess:n,indicatorBorderColorWait:o,indicatorBorderColorFinish:n,indicatorBorderColorError:i,indicatorColorProcess:n,indicatorColorWait:"#0000",indicatorColorFinish:"#0000",indicatorColorError:"#0000",splitorColorProcess:o,splitorColorWait:o,splitorColorFinish:n,splitorColorError:o,headerTextColorProcess:s,headerTextColorWait:o,headerTextColorFinish:o,headerTextColorError:i,descriptionTextColorProcess:a,descriptionTextColorWait:o,descriptionTextColorFinish:o,descriptionTextColorError:i})},JI={name:"Steps",common:ie,self:g1},QI=JI,eR={name:"Steps",common:ne,self:g1},tR=eR,m1={buttonHeightSmall:"14px",buttonHeightMedium:"18px",buttonHeightLarge:"22px",buttonWidthSmall:"14px",buttonWidthMedium:"18px",buttonWidthLarge:"22px",buttonWidthPressedSmall:"20px",buttonWidthPressedMedium:"24px",buttonWidthPressedLarge:"28px",railHeightSmall:"18px",railHeightMedium:"22px",railHeightLarge:"26px",railWidthSmall:"32px",railWidthMedium:"40px",railWidthLarge:"48px"},rR={name:"Switch",common:ne,self(e){const{primaryColorSuppl:t,opacityDisabled:r,borderRadius:o,primaryColor:n,textColor2:i,baseColor:s}=e,a="rgba(255, 255, 255, .20)";return Object.assign(Object.assign({},m1),{iconColor:s,textColor:i,loadingColor:t,opacityDisabled:r,railColor:a,railColorActive:t,buttonBoxShadow:"0px 2px 4px 0 rgba(0, 0, 0, 0.4)",buttonColor:"#FFF",railBorderRadiusSmall:o,railBorderRadiusMedium:o,railBorderRadiusLarge:o,buttonBorderRadiusSmall:o,buttonBorderRadiusMedium:o,buttonBorderRadiusLarge:o,boxShadowFocus:`0 0 8px 0 ${G(n,{alpha:.3})}`})}},oR=rR,nR=e=>{const{primaryColor:t,opacityDisabled:r,borderRadius:o,textColor3:n}=e,i="rgba(0, 0, 0, .14)";return Object.assign(Object.assign({},m1),{iconColor:n,textColor:"white",loadingColor:t,opacityDisabled:r,railColor:i,railColorActive:t,buttonBoxShadow:"0 1px 4px 0 rgba(0, 0, 0, 0.3), inset 0 0 1px 0 rgba(0, 0, 0, 0.05)",buttonColor:"#FFF",railBorderRadiusSmall:o,railBorderRadiusMedium:o,railBorderRadiusLarge:o,buttonBorderRadiusSmall:o,buttonBorderRadiusMedium:o,buttonBorderRadiusLarge:o,boxShadowFocus:`0 0 0 2px ${G(t,{alpha:.2})}`})},iR={name:"Switch",common:ie,self:nR},sR=iR,aR={thPaddingSmall:"6px",thPaddingMedium:"12px",thPaddingLarge:"12px",tdPaddingSmall:"6px",tdPaddingMedium:"12px",tdPaddingLarge:"12px"},b1=e=>{const{dividerColor:t,cardColor:r,modalColor:o,popoverColor:n,tableHeaderColor:i,tableColorStriped:s,textColor1:a,textColor2:l,borderRadius:c,fontWeightStrong:u,lineHeight:d,fontSizeSmall:f,fontSizeMedium:h,fontSizeLarge:p}=e;return Object.assign(Object.assign({},aR),{fontSizeSmall:f,fontSizeMedium:h,fontSizeLarge:p,lineHeight:d,borderRadius:c,borderColor:he(r,t),borderColorModal:he(o,t),borderColorPopover:he(n,t),tdColor:r,tdColorModal:o,tdColorPopover:n,tdColorStriped:he(r,s),tdColorStripedModal:he(o,s),tdColorStripedPopover:he(n,s),thColor:he(r,i),thColorModal:he(o,i),thColorPopover:he(n,i),thTextColor:a,tdTextColor:l,thFontWeight:u})},lR={name:"Table",common:ie,self:b1},cR=lR,uR={name:"Table",common:ne,self:b1},dR=uR,fR={tabFontSizeSmall:"14px",tabFontSizeMedium:"14px",tabFontSizeLarge:"16px",tabGapSmallLine:"36px",tabGapMediumLine:"36px",tabGapLargeLine:"36px",tabPaddingSmallLine:"6px 0",tabPaddingMediumLine:"10px 0",tabPaddingLargeLine:"14px 0",tabPaddingVerticalSmallLine:"0 6px",tabPaddingVerticalMediumLine:"0 10px",tabPaddingVerticalLargeLine:"0 14px",tabGapSmallBar:"36px",tabGapMediumBar:"36px",tabGapLargeBar:"36px",tabPaddingSmallBar:"4px 0",tabPaddingMediumBar:"6px 0",tabPaddingLargeBar:"10px 0",tabPaddingVerticalSmallBar:"0 4px",tabPaddingVerticalMediumBar:"0 6px ",tabPaddingVerticalLargeBar:"0 10px ",tabGapSmallCard:"4px",tabGapMediumCard:"4px",tabGapLargeCard:"4px",tabPaddingSmallCard:"6px 10px",tabPaddingMediumCard:"8px 12px",tabPaddingLargeCard:"8px 16px",tabPaddingSmallSegment:"4px 0",tabPaddingMediumSegment:"6px 0",tabPaddingLargeSegment:"8px 0",tabPaddingVerticalLargeSegment:"0 8px",tabPaddingVerticalSmallCard:"10px 6px",tabPaddingVerticalMediumCard:"12px 8px",tabPaddingVerticalLargeCard:"16px 8px",tabPaddingVerticalSmallSegment:"0 4px",tabPaddingVerticalMediumSegment:"0 6px",tabGapSmallSegment:"0",tabGapMediumSegment:"0",tabGapLargeSegment:"0",panePaddingSmall:"8px 0 0 0",panePaddingMedium:"12px 0 0 0",panePaddingLarge:"16px 0 0 0",closeSize:"18px",closeIconSize:"14px"},v1=e=>{const{textColor2:t,primaryColor:r,textColorDisabled:o,closeIconColor:n,closeIconColorHover:i,closeIconColorPressed:s,closeColorHover:a,closeColorPressed:l,tabColor:c,baseColor:u,dividerColor:d,fontWeight:f,textColor1:h,borderRadius:p,fontSize:m,fontWeightStrong:y}=e;return Object.assign(Object.assign({},fR),{colorSegment:c,tabFontSizeCard:m,tabTextColorLine:h,tabTextColorActiveLine:r,tabTextColorHoverLine:r,tabTextColorDisabledLine:o,tabTextColorSegment:h,tabTextColorActiveSegment:t,tabTextColorHoverSegment:t,tabTextColorDisabledSegment:o,tabTextColorBar:h,tabTextColorActiveBar:r,tabTextColorHoverBar:r,tabTextColorDisabledBar:o,tabTextColorCard:h,tabTextColorHoverCard:h,tabTextColorActiveCard:r,tabTextColorDisabledCard:o,barColor:r,closeIconColor:n,closeIconColorHover:i,closeIconColorPressed:s,closeColorHover:a,closeColorPressed:l,closeBorderRadius:p,tabColor:c,tabColorSegment:u,tabBorderColor:d,tabFontWeightActive:f,tabFontWeight:f,tabBorderRadius:p,paneTextColor:t,fontWeightStrong:y})},hR={name:"Tabs",common:ie,self:v1},pR=hR,gR={name:"Tabs",common:ne,self(e){const t=v1(e),{inputColor:r}=e;return t.colorSegment=r,t.tabColorSegment=r,t}},mR=gR,y1=e=>{const{textColor1:t,textColor2:r,fontWeightStrong:o,fontSize:n}=e;return{fontSize:n,titleTextColor:t,textColor:r,titleFontWeight:o}},bR={name:"Thing",common:ie,self:y1},vR=bR,yR={name:"Thing",common:ne,self:y1},xR=yR,x1={titleMarginMedium:"0 0 6px 0",titleMarginLarge:"-2px 0 6px 0",titleFontSizeMedium:"14px",titleFontSizeLarge:"16px",iconSizeMedium:"14px",iconSizeLarge:"14px"},CR={name:"Timeline",common:ne,self(e){const{textColor3:t,infoColorSuppl:r,errorColorSuppl:o,successColorSuppl:n,warningColorSuppl:i,textColor1:s,textColor2:a,railColor:l,fontWeightStrong:c,fontSize:u}=e;return Object.assign(Object.assign({},x1),{contentFontSize:u,titleFontWeight:c,circleBorder:`2px solid ${t}`,circleBorderInfo:`2px solid ${r}`,circleBorderError:`2px solid ${o}`,circleBorderSuccess:`2px solid ${n}`,circleBorderWarning:`2px solid ${i}`,iconColor:t,iconColorInfo:r,iconColorError:o,iconColorSuccess:n,iconColorWarning:i,titleTextColor:s,contentTextColor:a,metaTextColor:t,lineColor:l})}},wR=CR,SR=e=>{const{textColor3:t,infoColor:r,errorColor:o,successColor:n,warningColor:i,textColor1:s,textColor2:a,railColor:l,fontWeightStrong:c,fontSize:u}=e;return Object.assign(Object.assign({},x1),{contentFontSize:u,titleFontWeight:c,circleBorder:`2px solid ${t}`,circleBorderInfo:`2px solid ${r}`,circleBorderError:`2px solid ${o}`,circleBorderSuccess:`2px solid ${n}`,circleBorderWarning:`2px solid ${i}`,iconColor:t,iconColorInfo:r,iconColorError:o,iconColorSuccess:n,iconColorWarning:i,titleTextColor:s,contentTextColor:a,metaTextColor:t,lineColor:l})},ER={name:"Timeline",common:ie,self:SR},_R=ER,C1={extraFontSizeSmall:"12px",extraFontSizeMedium:"12px",extraFontSizeLarge:"14px",titleFontSizeSmall:"14px",titleFontSizeMedium:"16px",titleFontSizeLarge:"16px",closeSize:"20px",closeIconSize:"16px",headerHeightSmall:"44px",headerHeightMedium:"44px",headerHeightLarge:"50px"},TR={name:"Transfer",common:ne,peers:{Checkbox:Bi,Scrollbar:Yt,Input:vr,Empty:Bn,Button:Zt},self(e){const{fontWeight:t,fontSizeLarge:r,fontSizeMedium:o,fontSizeSmall:n,heightLarge:i,heightMedium:s,borderRadius:a,inputColor:l,tableHeaderColor:c,textColor1:u,textColorDisabled:d,textColor2:f,textColor3:h,hoverColor:p,closeColorHover:m,closeColorPressed:y,closeIconColor:g,closeIconColorHover:w,closeIconColorPressed:T,dividerColor:x}=e;return Object.assign(Object.assign({},C1),{itemHeightSmall:s,itemHeightMedium:s,itemHeightLarge:i,fontSizeSmall:n,fontSizeMedium:o,fontSizeLarge:r,borderRadius:a,dividerColor:x,borderColor:"#0000",listColor:l,headerColor:c,titleTextColor:u,titleTextColorDisabled:d,extraTextColor:h,extraTextColorDisabled:d,itemTextColor:f,itemTextColorDisabled:d,itemColorPending:p,titleFontWeight:t,closeColorHover:m,closeColorPressed:y,closeIconColor:g,closeIconColorHover:w,closeIconColorPressed:T})}},$R=TR,PR=e=>{const{fontWeight:t,fontSizeLarge:r,fontSizeMedium:o,fontSizeSmall:n,heightLarge:i,heightMedium:s,borderRadius:a,cardColor:l,tableHeaderColor:c,textColor1:u,textColorDisabled:d,textColor2:f,textColor3:h,borderColor:p,hoverColor:m,closeColorHover:y,closeColorPressed:g,closeIconColor:w,closeIconColorHover:T,closeIconColorPressed:x}=e;return Object.assign(Object.assign({},C1),{itemHeightSmall:s,itemHeightMedium:s,itemHeightLarge:i,fontSizeSmall:n,fontSizeMedium:o,fontSizeLarge:r,borderRadius:a,dividerColor:p,borderColor:p,listColor:l,headerColor:he(l,c),titleTextColor:u,titleTextColorDisabled:d,extraTextColor:h,extraTextColorDisabled:d,itemTextColor:f,itemTextColorDisabled:d,itemColorPending:m,titleFontWeight:t,closeColorHover:y,closeColorPressed:g,closeIconColor:w,closeIconColorHover:T,closeIconColorPressed:x})},LR={name:"Transfer",common:ie,peers:{Checkbox:Ai,Scrollbar:Nt,Input:yr,Empty:uo,Button:jt},self:PR},kR=LR,w1=e=>{const{borderRadiusSmall:t,hoverColor:r,pressedColor:o,primaryColor:n,textColor3:i,textColor2:s,textColorDisabled:a,fontSize:l}=e;return{fontSize:l,nodeBorderRadius:t,nodeColorHover:r,nodeColorPressed:o,nodeColorActive:G(n,{alpha:.1}),arrowColor:i,nodeTextColor:s,nodeTextColorDisabled:a,loadingColor:n,dropMarkColor:n}},IR={name:"Tree",common:ie,peers:{Checkbox:Ai,Scrollbar:Nt,Empty:uo},self:w1},S1=IR,RR={name:"Tree",common:ne,peers:{Checkbox:Bi,Scrollbar:Yt,Empty:Bn},self(e){const{primaryColor:t}=e,r=w1(e);return r.nodeColorActive=G(t,{alpha:.15}),r}},E1=RR,OR={name:"TreeSelect",common:ne,peers:{Tree:E1,Empty:Bn,InternalSelection:jd}},AR=OR,BR=e=>{const{popoverColor:t,boxShadow2:r,borderRadius:o,heightMedium:n,dividerColor:i,textColor2:s}=e;return{menuPadding:"4px",menuColor:t,menuBoxShadow:r,menuBorderRadius:o,menuHeight:`calc(${n} * 7.6)`,actionDividerColor:i,actionTextColor:s,actionPadding:"8px 12px"}},MR={name:"TreeSelect",common:ie,peers:{Tree:S1,Empty:uo,InternalSelection:Nd},self:BR},HR=MR,DR={headerFontSize1:"30px",headerFontSize2:"22px",headerFontSize3:"18px",headerFontSize4:"16px",headerFontSize5:"16px",headerFontSize6:"16px",headerMargin1:"28px 0 20px 0",headerMargin2:"28px 0 20px 0",headerMargin3:"28px 0 20px 0",headerMargin4:"28px 0 18px 0",headerMargin5:"28px 0 18px 0",headerMargin6:"28px 0 18px 0",headerPrefixWidth1:"16px",headerPrefixWidth2:"16px",headerPrefixWidth3:"12px",headerPrefixWidth4:"12px",headerPrefixWidth5:"12px",headerPrefixWidth6:"12px",headerBarWidth1:"4px",headerBarWidth2:"4px",headerBarWidth3:"3px",headerBarWidth4:"3px",headerBarWidth5:"3px",headerBarWidth6:"3px",pMargin:"16px 0 16px 0",liMargin:".25em 0 0 0",olPadding:"0 0 0 2em",ulPadding:"0 0 0 2em"},_1=e=>{const{primaryColor:t,textColor2:r,borderColor:o,lineHeight:n,fontSize:i,borderRadiusSmall:s,dividerColor:a,fontWeightStrong:l,textColor1:c,textColor3:u,infoColor:d,warningColor:f,errorColor:h,successColor:p,codeColor:m}=e;return Object.assign(Object.assign({},DR),{aTextColor:t,blockquoteTextColor:r,blockquotePrefixColor:o,blockquoteLineHeight:n,blockquoteFontSize:i,codeBorderRadius:s,liTextColor:r,liLineHeight:n,liFontSize:i,hrColor:a,headerFontWeight:l,headerTextColor:c,pTextColor:r,pTextColor1Depth:c,pTextColor2Depth:r,pTextColor3Depth:u,pLineHeight:n,pFontSize:i,headerBarColor:t,headerBarColorPrimary:t,headerBarColorInfo:d,headerBarColorError:h,headerBarColorWarning:f,headerBarColorSuccess:p,textColor:r,textColor1Depth:c,textColor2Depth:r,textColor3Depth:u,textColorPrimary:t,textColorInfo:d,textColorSuccess:p,textColorWarning:f,textColorError:h,codeTextColor:r,codeColor:m,codeBorder:"1px solid #0000"})},zR={name:"Typography",common:ie,self:_1},FR=zR,NR={name:"Typography",common:ne,self:_1},jR=NR,T1=e=>{const{iconColor:t,primaryColor:r,errorColor:o,textColor2:n,successColor:i,opacityDisabled:s,actionColor:a,borderColor:l,hoverColor:c,lineHeight:u,borderRadius:d,fontSize:f}=e;return{fontSize:f,lineHeight:u,borderRadius:d,draggerColor:a,draggerBorder:`1px dashed ${l}`,draggerBorderHover:`1px dashed ${r}`,itemColorHover:c,itemColorHoverError:G(o,{alpha:.06}),itemTextColor:n,itemTextColorError:o,itemTextColorSuccess:i,itemIconColor:t,itemDisabledOpacity:s,itemBorderImageCardError:`1px solid ${o}`,itemBorderImageCard:`1px solid ${l}`}},WR={name:"Upload",common:ie,peers:{Button:jt,Progress:Yd},self:T1},$1=WR,UR={name:"Upload",common:ne,peers:{Button:Zt,Progress:u1},self(e){const{errorColor:t}=e,r=T1(e);return r.itemColorHoverError=G(t,{alpha:.09}),r}},VR=UR,KR={name:"Watermark",common:ne,self(e){const{fontFamily:t}=e;return{fontFamily:t}}},qR=KR,GR={name:"Watermark",common:ie,self(e){const{fontFamily:t}=e;return{fontFamily:t}}},XR=GR,YR={name:"Row",common:ie},ZR=YR,JR={name:"Row",common:ne},QR=JR,eO={name:"Image",common:ne,peers:{Tooltip:Xl},self:e=>{const{textColor2:t}=e;return{toolbarIconColor:t,toolbarColor:"rgba(0, 0, 0, .35)",toolbarBoxShadow:"none",toolbarBorderRadius:"24px"}}},tO=E("svg",{viewBox:"0 0 20 20",fill:"none",xmlns:"http://www.w3.org/2000/svg"},E("path",{d:"M6 5C5.75454 5 5.55039 5.17688 5.50806 5.41012L5.5 5.5V14.5C5.5 14.7761 5.72386 15 6 15C6.24546 15 6.44961 14.8231 6.49194 14.5899L6.5 14.5V5.5C6.5 5.22386 6.27614 5 6 5ZM13.8536 5.14645C13.68 4.97288 13.4106 4.9536 13.2157 5.08859L13.1464 5.14645L8.64645 9.64645C8.47288 9.82001 8.4536 10.0894 8.58859 10.2843L8.64645 10.3536L13.1464 14.8536C13.3417 15.0488 13.6583 15.0488 13.8536 14.8536C14.0271 14.68 14.0464 14.4106 13.9114 14.2157L13.8536 14.1464L9.70711 10L13.8536 5.85355C14.0488 5.65829 14.0488 5.34171 13.8536 5.14645Z",fill:"currentColor"})),rO=E("svg",{viewBox:"0 0 20 20",fill:"none",xmlns:"http://www.w3.org/2000/svg"},E("path",{d:"M13.5 5C13.7455 5 13.9496 5.17688 13.9919 5.41012L14 5.5V14.5C14 14.7761 13.7761 15 13.5 15C13.2545 15 13.0504 14.8231 13.0081 14.5899L13 14.5V5.5C13 5.22386 13.2239 5 13.5 5ZM5.64645 5.14645C5.82001 4.97288 6.08944 4.9536 6.28431 5.08859L6.35355 5.14645L10.8536 9.64645C11.0271 9.82001 11.0464 10.0894 10.9114 10.2843L10.8536 10.3536L6.35355 14.8536C6.15829 15.0488 5.84171 15.0488 5.64645 14.8536C5.47288 14.68 5.4536 14.4106 5.58859 14.2157L5.64645 14.1464L9.79289 10L5.64645 5.85355C5.45118 5.65829 5.45118 5.34171 5.64645 5.14645Z",fill:"currentColor"})),oO=E("svg",{viewBox:"0 0 20 20",fill:"none",xmlns:"http://www.w3.org/2000/svg"},E("path",{d:"M4.089 4.216l.057-.07a.5.5 0 0 1 .638-.057l.07.057L10 9.293l5.146-5.147a.5.5 0 0 1 .638-.057l.07.057a.5.5 0 0 1 .057.638l-.057.07L10.707 10l5.147 5.146a.5.5 0 0 1 .057.638l-.057.07a.5.5 0 0 1-.638.057l-.07-.057L10 10.707l-5.146 5.147a.5.5 0 0 1-.638.057l-.07-.057a.5.5 0 0 1-.057-.638l.057-.07L9.293 10L4.146 4.854a.5.5 0 0 1-.057-.638l.057-.07l-.057.07z",fill:"currentColor"})),nO=N([N("body >",[W("image-container","position: fixed;")]),W("image-preview-container",`
 position: fixed;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 display: flex;
 `),W("image-preview-overlay",`
 z-index: -1;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 background: rgba(0, 0, 0, .3);
 `,[Hs()]),W("image-preview-toolbar",`
 z-index: 1;
 position: absolute;
 left: 50%;
 transform: translateX(-50%);
 border-radius: var(--n-toolbar-border-radius);
 height: 48px;
 bottom: 40px;
 padding: 0 12px;
 background: var(--n-toolbar-color);
 box-shadow: var(--n-toolbar-box-shadow);
 color: var(--n-toolbar-icon-color);
 transition: color .3s var(--n-bezier);
 display: flex;
 align-items: center;
 `,[W("base-icon",`
 padding: 0 8px;
 font-size: 28px;
 cursor: pointer;
 `),Hs()]),W("image-preview-wrapper",`
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 display: flex;
 pointer-events: none;
 `,[zb()]),W("image-preview",`
 user-select: none;
 -webkit-user-select: none;
 pointer-events: all;
 margin: auto;
 max-height: calc(100vh - 32px);
 max-width: calc(100vw - 32px);
 transition: transform .3s var(--n-bezier);
 `),W("image",`
 display: inline-flex;
 max-height: 100%;
 max-width: 100%;
 `,[Cn("preview-disabled",`
 cursor: pointer;
 `),N("img",`
 border-radius: inherit;
 `)])]),$a=32,P1=be({name:"ImagePreview",props:Object.assign(Object.assign({},Xd),{onNext:Function,onPrev:Function,clsPrefix:{type:String,required:!0}}),setup(e){const t=Xe("Image","-image",nO,Qv,e,Be(e,"clsPrefix"));let r=null;const o=K(null),n=K(null),i=K(void 0),s=K(!1),a=K(!1),{localeRef:l}=K4("Image");function c(){const{value:_}=n;if(!r||!_)return;const{style:b}=_,v=r.getBoundingClientRect(),P=v.left+v.width/2,O=v.top+v.height/2;b.transformOrigin=`${P}px ${O}px`}function u(_){var b,v;switch(_.key){case" ":_.preventDefault();break;case"ArrowLeft":(b=e.onPrev)===null||b===void 0||b.call(e);break;case"ArrowRight":(v=e.onNext)===null||v===void 0||v.call(e);break;case"Escape":j();break}}et(s,_=>{_?mt("keydown",document,u):tt("keydown",document,u)}),xt(()=>{tt("keydown",document,u)});let d=0,f=0,h=0,p=0,m=0,y=0,g=0,w=0,T=!1;function x(_){const{clientX:b,clientY:v}=_;h=b-d,p=v-f,c0(Ue)}function C(_){const{mouseUpClientX:b,mouseUpClientY:v,mouseDownClientX:P,mouseDownClientY:O}=_,M=P-b,V=O-v,X=`vertical${V>0?"Top":"Bottom"}`,U=`horizontal${M>0?"Left":"Right"}`;return{moveVerticalDirection:X,moveHorizontalDirection:U,deltaHorizontal:M,deltaVertical:V}}function $(_){const{value:b}=o;if(!b)return{offsetX:0,offsetY:0};const v=b.getBoundingClientRect(),{moveVerticalDirection:P,moveHorizontalDirection:O,deltaHorizontal:M,deltaVertical:V}=_||{};let X=0,U=0;return v.width<=window.innerWidth?X=0:v.left>0?X=(v.width-window.innerWidth)/2:v.right<window.innerWidth?X=-(v.width-window.innerWidth)/2:O==="horizontalRight"?X=Math.min((v.width-window.innerWidth)/2,m-(M!=null?M:0)):X=Math.max(-((v.width-window.innerWidth)/2),m-(M!=null?M:0)),v.height<=window.innerHeight?U=0:v.top>0?U=(v.height-window.innerHeight)/2:v.bottom<window.innerHeight?U=-(v.height-window.innerHeight)/2:P==="verticalBottom"?U=Math.min((v.height-window.innerHeight)/2,y-(V!=null?V:0)):U=Math.max(-((v.height-window.innerHeight)/2),y-(V!=null?V:0)),{offsetX:X,offsetY:U}}function S(_){tt("mousemove",document,x),tt("mouseup",document,S);const{clientX:b,clientY:v}=_;T=!1;const P=C({mouseUpClientX:b,mouseUpClientY:v,mouseDownClientX:g,mouseDownClientY:w}),O=$(P);h=O.offsetX,p=O.offsetY,Ue()}const L=Se(Jv,null);function k(_){var b,v;if((v=(b=L==null?void 0:L.previewedImgPropsRef.value)===null||b===void 0?void 0:b.onMousedown)===null||v===void 0||v.call(b,_),_.button!==0)return;const{clientX:P,clientY:O}=_;T=!0,d=P-h,f=O-p,m=h,y=p,g=P,w=O,Ue(),mt("mousemove",document,x),mt("mouseup",document,S)}function I(_){var b,v;(v=(b=L==null?void 0:L.previewedImgPropsRef.value)===null||b===void 0?void 0:b.onDblclick)===null||v===void 0||v.call(b,_);const P=_e();F=F===P?1:P,Ue()}const A=1.5;let R=0,F=1,H=0;function J(){F=1,R=0}function Y(){var _;J(),H=0,(_=e.onPrev)===null||_===void 0||_.call(e)}function Z(){var _;J(),H=0,(_=e.onNext)===null||_===void 0||_.call(e)}function se(){H-=90,Ue()}function ve(){H+=90,Ue()}function Le(){const{value:_}=o;if(!_)return 1;const{innerWidth:b,innerHeight:v}=window,P=Math.max(1,_.naturalHeight/(v-$a)),O=Math.max(1,_.naturalWidth/(b-$a));return Math.max(3,P*2,O*2)}function _e(){const{value:_}=o;if(!_)return 1;const{innerWidth:b,innerHeight:v}=window,P=_.naturalHeight/(v-$a),O=_.naturalWidth/(b-$a);return P<1&&O<1?1:Math.max(P,O)}function Ae(){const _=Le();F<_&&(R+=1,F=Math.min(_,Math.pow(A,R)),Ue())}function ut(){if(F>.5){const _=F;R-=1,F=Math.max(.5,Math.pow(A,R));const b=_-F;Ue(!1);const v=$();F+=b,Ue(!1),F-=b,h=v.offsetX,p=v.offsetY,Ue()}}function Ue(_=!0){var b;const{value:v}=o;if(!v)return;const{style:P}=v,O=$i((b=L==null?void 0:L.previewedImgPropsRef.value)===null||b===void 0?void 0:b.style);let M="";if(typeof O=="string")M=O+";";else for(const X in O)M+=`${J$(X)}: ${O[X]};`;const V=`transform-origin: center; transform: translateX(${h}px) translateY(${p}px) rotate(${H}deg) scale(${F});`;T?P.cssText=M+"cursor: grabbing; transition: none;"+V:P.cssText=M+"cursor: grab;"+V+(_?"":"transition: none;"),_||v.offsetHeight}function j(){s.value=!s.value,a.value=!0}function Q(){F=_e(),R=Math.ceil(Math.log(F)/Math.log(A)),h=0,p=0,Ue()}const te={setPreviewSrc:_=>{i.value=_},setThumbnailEl:_=>{r=_},toggleShow:j};function de(_,b){if(e.showToolbarTooltip){const{value:v}=t;return E(n8,{to:!1,theme:v.peers.Tooltip,themeOverrides:v.peerOverrides.Tooltip,keepAliveOnHover:!1},{default:()=>l.value[b],trigger:()=>_})}else return _}const ae=q(()=>{const{common:{cubicBezierEaseInOut:_},self:{toolbarIconColor:b,toolbarBorderRadius:v,toolbarBoxShadow:P,toolbarColor:O}}=t.value;return{"--n-bezier":_,"--n-toolbar-icon-color":b,"--n-toolbar-color":O,"--n-toolbar-border-radius":v,"--n-toolbar-box-shadow":P}}),{inlineThemeDisabled:Te}=kt(),me=Te?br("image-preview",void 0,ae,e):void 0;return Object.assign({previewRef:o,previewWrapperRef:n,previewSrc:i,show:s,appear:Ri(),displayed:a,previewedImgProps:L==null?void 0:L.previewedImgPropsRef,handleWheel(_){_.preventDefault()},handlePreviewMousedown:k,handlePreviewDblclick:I,syncTransformOrigin:c,handleAfterLeave:()=>{J(),H=0,a.value=!1},handleDragStart:_=>{var b,v;(v=(b=L==null?void 0:L.previewedImgPropsRef.value)===null||b===void 0?void 0:b.onDragstart)===null||v===void 0||v.call(b,_),_.preventDefault()},zoomIn:Ae,zoomOut:ut,rotateCounterclockwise:se,rotateClockwise:ve,handleSwitchPrev:Y,handleSwitchNext:Z,withTooltip:de,resizeToOrignalImageSize:Q,cssVars:Te?void 0:ae,themeClass:me==null?void 0:me.themeClass,onRender:me==null?void 0:me.onRender},te)},render(){var e,t;const{clsPrefix:r}=this;return E(Qe,null,(t=(e=this.$slots).default)===null||t===void 0?void 0:t.call(e),E(Td,{show:this.show},{default:()=>{var o;return this.show||this.displayed?((o=this.onRender)===null||o===void 0||o.call(this),Fr(E("div",{class:[`${r}-image-preview-container`,this.themeClass],style:this.cssVars,onWheel:this.handleWheel},E(qt,{name:"fade-in-transition",appear:this.appear},{default:()=>this.show?E("div",{class:`${r}-image-preview-overlay`,onClick:this.toggleShow}):null}),this.showToolbar?E(qt,{name:"fade-in-transition",appear:this.appear},{default:()=>{if(!this.show)return null;const{withTooltip:n}=this;return E("div",{class:`${r}-image-preview-toolbar`},this.onPrev?E(Qe,null,n(E(dt,{clsPrefix:r,onClick:this.handleSwitchPrev},{default:()=>tO}),"tipPrevious"),n(E(dt,{clsPrefix:r,onClick:this.handleSwitchNext},{default:()=>rO}),"tipNext")):null,n(E(dt,{clsPrefix:r,onClick:this.rotateCounterclockwise},{default:()=>E(r6,null)}),"tipCounterclockwise"),n(E(dt,{clsPrefix:r,onClick:this.rotateClockwise},{default:()=>E(t6,null)}),"tipClockwise"),n(E(dt,{clsPrefix:r,onClick:this.resizeToOrignalImageSize},{default:()=>E(i6,null)}),"tipOriginalSize"),n(E(dt,{clsPrefix:r,onClick:this.zoomOut},{default:()=>E(n6,null)}),"tipZoomOut"),n(E(dt,{clsPrefix:r,onClick:this.zoomIn},{default:()=>E(o6,null)}),"tipZoomIn"),n(E(dt,{clsPrefix:r,onClick:this.toggleShow},{default:()=>oO}),"tipClose"))}}):null,E(qt,{name:"fade-in-scale-up-transition",onAfterLeave:this.handleAfterLeave,appear:this.appear,onEnter:this.syncTransformOrigin,onBeforeLeave:this.syncTransformOrigin},{default:()=>{const{previewedImgProps:n={}}=this;return Fr(E("div",{class:`${r}-image-preview-wrapper`,ref:"previewWrapperRef"},E("img",Object.assign({},n,{draggable:!1,onMousedown:this.handlePreviewMousedown,onDblclick:this.handlePreviewDblclick,class:[`${r}-image-preview`,n.class],key:this.previewSrc,src:this.previewSrc,ref:"previewRef",onDragstart:this.handleDragStart}))),[[$s,this.show]])}})),[[Fl,{enabled:this.show}]])):null}}))}}),L1="n-image-group",iO=Xd,sO=be({name:"ImageGroup",props:iO,setup(e){let t;const{mergedClsPrefixRef:r}=kt(e),o=`c${_n()}`,n=gr(),i=l=>{var c;t=l,(c=a.value)===null||c===void 0||c.setPreviewSrc(l)};function s(l){if(!(n!=null&&n.proxy))return;const u=n.proxy.$el.parentElement.querySelectorAll(`[data-group-id=${o}]:not([data-error=true])`);if(!u.length)return;const d=Array.from(u).findIndex(f=>f.dataset.previewSrc===t);~d?i(u[(d+l+u.length)%u.length].dataset.previewSrc):i(u[0].dataset.previewSrc)}qe(L1,{mergedClsPrefixRef:r,setPreviewSrc:i,setThumbnailEl:l=>{var c;(c=a.value)===null||c===void 0||c.setThumbnailEl(l)},toggleShow:()=>{var l;(l=a.value)===null||l===void 0||l.toggleShow()},groupId:o});const a=K(null);return{mergedClsPrefix:r,previewInstRef:a,next:()=>s(1),prev:()=>s(-1)}},render(){return E(P1,{theme:this.theme,themeOverrides:this.themeOverrides,clsPrefix:this.mergedClsPrefix,ref:"previewInstRef",onPrev:this.prev,onNext:this.next,showToolbar:this.showToolbar,showToolbarTooltip:this.showToolbarTooltip},this.$slots)}}),aO=Object.assign({alt:String,height:[String,Number],imgProps:Object,previewedImgProps:Object,lazy:Boolean,intersectionObserverOptions:Object,objectFit:{type:String,default:"fill"},previewSrc:String,fallbackSrc:String,width:[String,Number],src:String,previewDisabled:Boolean,loadDescription:String,onError:Function,onLoad:Function},Xd),lO=be({name:"Image",props:aO,inheritAttrs:!1,setup(e){const t=K(null),r=K(!1),o=K(null),n=Se(L1,null),{mergedClsPrefixRef:i}=n||kt(e),s={click:()=>{if(e.previewDisabled||r.value)return;const c=e.previewSrc||e.src;if(n){n.setPreviewSrc(c),n.setThumbnailEl(t.value),n.toggleShow();return}const{value:u}=o;!u||(u.setPreviewSrc(c),u.setThumbnailEl(t.value),u.toggleShow())}},a=K(!e.lazy);Lt(()=>{var c;(c=t.value)===null||c===void 0||c.setAttribute("data-group-id",(n==null?void 0:n.groupId)||"")}),Lt(()=>{if(Rc)return;let c;const u=Er(()=>{c==null||c(),c=void 0,e.lazy&&(c=vP(t.value,e.intersectionObserverOptions,a))});xt(()=>{u(),c==null||c()})}),Er(()=>{var c;e.src,(c=e.imgProps)===null||c===void 0||c.src,r.value=!1});const l=K(!1);return qe(Jv,{previewedImgPropsRef:Be(e,"previewedImgProps")}),Object.assign({mergedClsPrefix:i,groupId:n==null?void 0:n.groupId,previewInstRef:o,imageRef:t,showError:r,shouldStartLoading:a,loaded:l,mergedOnClick:c=>{var u,d;s.click(),(d=(u=e.imgProps)===null||u===void 0?void 0:u.onClick)===null||d===void 0||d.call(u,c)},mergedOnError:c=>{if(!a.value)return;r.value=!0;const{onError:u,imgProps:{onError:d}={}}=e;u==null||u(c),d==null||d(c)},mergedOnLoad:c=>{const{onLoad:u,imgProps:{onLoad:d}={}}=e;u==null||u(c),d==null||d(c),l.value=!0}},s)},render(){var e,t;const{mergedClsPrefix:r,imgProps:o={},loaded:n,$attrs:i,lazy:s}=this,a=(t=(e=this.$slots).placeholder)===null||t===void 0?void 0:t.call(e),l=this.src||o.src||"",c=E("img",Object.assign(Object.assign({},o),{ref:"imageRef",width:this.width||o.width,height:this.height||o.height,src:Rc?l:this.showError?this.fallbackSrc:this.shouldStartLoading?l:void 0,alt:this.alt||o.alt,"aria-label":this.alt||o.alt,onClick:this.mergedOnClick,onError:this.mergedOnError,onLoad:this.mergedOnLoad,loading:Rc&&s&&!this.intersectionObserverOptions?"lazy":"eager",style:[o.style||"",a&&!n?{height:"0",width:"0",visibility:"hidden"}:"",{objectFit:this.objectFit}],"data-error":this.showError,"data-preview-src":this.previewSrc||this.src}));return E("div",Object.assign({},i,{role:"none",class:[i.class,`${r}-image`,(this.previewDisabled||this.showError)&&`${r}-image--preview-disabled`]}),this.groupId?c:E(P1,{theme:this.theme,themeOverrides:this.themeOverrides,clsPrefix:r,ref:"previewInstRef",showToolbar:this.showToolbar,showToolbarTooltip:this.showToolbarTooltip},{default:()=>c}),!n&&a)}}),k1={extraFontSize:"12px",width:"440px"},cO={name:"Transfer",common:ne,peers:{Checkbox:Bi,Scrollbar:Yt,Input:vr,Empty:Bn,Button:Zt},self(e){const{iconColorDisabled:t,iconColor:r,fontWeight:o,fontSizeLarge:n,fontSizeMedium:i,fontSizeSmall:s,heightLarge:a,heightMedium:l,heightSmall:c,borderRadius:u,inputColor:d,tableHeaderColor:f,textColor1:h,textColorDisabled:p,textColor2:m,hoverColor:y}=e;return Object.assign(Object.assign({},k1),{itemHeightSmall:c,itemHeightMedium:l,itemHeightLarge:a,fontSizeSmall:s,fontSizeMedium:i,fontSizeLarge:n,borderRadius:u,borderColor:"#0000",listColor:d,headerColor:f,titleTextColor:h,titleTextColorDisabled:p,extraTextColor:m,filterDividerColor:"#0000",itemTextColor:m,itemTextColorDisabled:p,itemColorPending:y,titleFontWeight:o,iconColor:r,iconColorDisabled:t})}},uO=cO,dO=e=>{const{fontWeight:t,iconColorDisabled:r,iconColor:o,fontSizeLarge:n,fontSizeMedium:i,fontSizeSmall:s,heightLarge:a,heightMedium:l,heightSmall:c,borderRadius:u,cardColor:d,tableHeaderColor:f,textColor1:h,textColorDisabled:p,textColor2:m,borderColor:y,hoverColor:g}=e;return Object.assign(Object.assign({},k1),{itemHeightSmall:c,itemHeightMedium:l,itemHeightLarge:a,fontSizeSmall:s,fontSizeMedium:i,fontSizeLarge:n,borderRadius:u,borderColor:y,listColor:d,headerColor:he(d,f),titleTextColor:h,titleTextColorDisabled:p,extraTextColor:m,filterDividerColor:y,itemTextColor:m,itemTextColorDisabled:p,itemColorPending:g,titleFontWeight:t,iconColor:o,iconColorDisabled:r})},fO={name:"Transfer",common:ie,peers:{Checkbox:Ai,Scrollbar:Nt,Input:yr,Empty:uo,Button:jt},self:dO},hO=fO,I1="n-loading-bar",R1="n-loading-bar-api",pO=W("loading-bar-container",`
 z-index: 5999;
 position: fixed;
 top: 0;
 left: 0;
 right: 0;
 height: 2px;
`,[Hs({enterDuration:"0.3s",leaveDuration:"0.8s"}),W("loading-bar",`
 width: 100%;
 transition:
 max-width 4s linear,
 background .2s linear;
 height: var(--n-height);
 `,[re("starting",`
 background: var(--n-color-loading);
 `),re("finishing",`
 background: var(--n-color-loading);
 transition:
 max-width .2s linear,
 background .2s linear;
 `),re("error",`
 background: var(--n-color-error);
 transition:
 max-width .2s linear,
 background .2s linear;
 `)])]);var Mc=globalThis&&globalThis.__awaiter||function(e,t,r,o){function n(i){return i instanceof r?i:new r(function(s){s(i)})}return new(r||(r=Promise))(function(i,s){function a(u){try{c(o.next(u))}catch(d){s(d)}}function l(u){try{c(o.throw(u))}catch(d){s(d)}}function c(u){u.done?i(u.value):n(u.value).then(a,l)}c((o=o.apply(e,t||[])).next())})};function Pa(e,t){return`${t}-loading-bar ${t}-loading-bar--${e}`}const gO=be({name:"LoadingBar",props:{containerStyle:[String,Object]},setup(){const{inlineThemeDisabled:e}=kt(),{props:t,mergedClsPrefixRef:r}=Se(I1),o=K(null),n=K(!1),i=K(!1),s=K(!1),a=K(!1);let l=!1;const c=K(!1),u=q(()=>{const{loadingBarStyle:C}=t;return C?C[c.value?"error":"loading"]:""});function d(){return Mc(this,void 0,void 0,function*(){n.value=!1,s.value=!1,l=!1,c.value=!1,a.value=!0,yield zt(),a.value=!1})}function f(C=0,$=80,S="starting"){return Mc(this,void 0,void 0,function*(){yield d(),s.value=!0,i.value=!0,yield zt();const L=o.value;!L||(L.style.maxWidth=`${C}%`,L.style.transition="none",L.offsetWidth,L.className=Pa(S,r.value),L.style.transition="",L.style.maxWidth=`${$}%`)})}function h(){if(l||c.value||!s.value)return;l=!0;const C=o.value;!C||(C.className=Pa("finishing",r.value),C.style.maxWidth="100%",C.offsetWidth,s.value=!1)}function p(){if(!(l||c.value))if(!s.value)f(100,100,"error").then(()=>{c.value=!0;const C=o.value;!C||(C.className=Pa("error",r.value),C.offsetWidth,s.value=!1)});else{c.value=!0;const C=o.value;if(!C)return;C.className=Pa("error",r.value),C.style.maxWidth="100%",C.offsetWidth,s.value=!1}}function m(){n.value=!0}function y(){n.value=!1}function g(){return Mc(this,void 0,void 0,function*(){yield d()})}const w=Xe("LoadingBar","-loading-bar",pO,i1,t,r),T=q(()=>{const{self:{height:C,colorError:$,colorLoading:S}}=w.value;return{"--n-height":C,"--n-color-loading":S,"--n-color-error":$}}),x=e?br("loading-bar",void 0,T,t):void 0;return{mergedClsPrefix:r,loadingBarRef:o,started:i,loading:s,entering:n,transitionDisabled:a,start:f,error:p,finish:h,handleEnter:m,handleAfterEnter:y,handleAfterLeave:g,mergedLoadingBarStyle:u,cssVars:e?void 0:T,themeClass:x==null?void 0:x.themeClass,onRender:x==null?void 0:x.onRender}},render(){if(!this.started)return null;const{mergedClsPrefix:e}=this;return E(qt,{name:"fade-in-transition",appear:!0,onEnter:this.handleEnter,onAfterEnter:this.handleAfterEnter,onAfterLeave:this.handleAfterLeave,css:!this.transitionDisabled},{default:()=>{var t;return(t=this.onRender)===null||t===void 0||t.call(this),Fr(E("div",{class:[`${e}-loading-bar-container`,this.themeClass],style:this.containerStyle},E("div",{ref:"loadingBarRef",class:[`${e}-loading-bar`],style:[this.cssVars,this.mergedLoadingBarStyle]})),[[$s,this.loading||!this.loading&&this.entering]])}})}}),mO=Object.assign(Object.assign({},Xe.props),{to:{type:[String,Object,Boolean],default:void 0},containerStyle:[String,Object],loadingBarStyle:{type:Object}}),bO=be({name:"LoadingBarProvider",props:mO,setup(e){const t=Ri(),r=K(null),o={start(){var i;t.value?(i=r.value)===null||i===void 0||i.start():zt(()=>{var s;(s=r.value)===null||s===void 0||s.start()})},error(){var i;t.value?(i=r.value)===null||i===void 0||i.error():zt(()=>{var s;(s=r.value)===null||s===void 0||s.error()})},finish(){var i;t.value?(i=r.value)===null||i===void 0||i.finish():zt(()=>{var s;(s=r.value)===null||s===void 0||s.finish()})}},{mergedClsPrefixRef:n}=kt(e);return qe(R1,o),qe(I1,{props:e,mergedClsPrefixRef:n}),Object.assign(o,{loadingBarRef:r})},render(){var e,t;return E(Qe,null,E(Ws,{disabled:this.to===!1,to:this.to||"body"},E(gO,{ref:"loadingBarRef",containerStyle:this.containerStyle})),(t=(e=this.$slots).default)===null||t===void 0?void 0:t.call(e))}});function vO(){const e=Se(R1,null);return e===null&&kn("use-loading-bar","No outer <n-loading-bar-provider /> founded."),e}const O1={icon:Function,type:{type:String,default:"info"},content:[String,Number,Function],showIcon:{type:Boolean,default:!0},closable:Boolean,keepAliveOnHover:Boolean,onClose:Function,onMouseenter:Function,onMouseleave:Function},A1="n-message-api",B1="n-message-provider",yO=N([W("message-wrapper",`
 margin: var(--n-margin);
 z-index: 0;
 transform-origin: top center;
 display: flex;
 `,[Tu({overflow:"visible",originalTransition:"transform .3s var(--n-bezier)",enterToProps:{transform:"scale(1)"},leaveToProps:{transform:"scale(0.85)"}})]),W("message",`
 box-sizing: border-box;
 display: flex;
 align-items: center;
 transition:
 color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 opacity .3s var(--n-bezier),
 transform .3s var(--n-bezier),
 margin-bottom .3s var(--n-bezier);
 padding: var(--n-padding);
 border-radius: var(--n-border-radius);
 flex-wrap: nowrap;
 overflow: hidden;
 max-width: var(--n-max-width);
 color: var(--n-text-color);
 background-color: var(--n-color);
 box-shadow: var(--n-box-shadow);
 `,[oe("content",`
 display: inline-block;
 line-height: var(--n-line-height);
 font-size: var(--n-font-size);
 `),oe("icon",`
 position: relative;
 margin: var(--n-icon-margin);
 height: var(--n-icon-size);
 width: var(--n-icon-size);
 font-size: var(--n-icon-size);
 flex-shrink: 0;
 `,[["default","info","success","warning","error","loading"].map(e=>re(`${e}-type`,[N("> *",`
 color: var(--n-icon-color-${e});
 transition: color .3s var(--n-bezier);
 `)])),N("> *",`
 position: absolute;
 left: 0;
 top: 0;
 right: 0;
 bottom: 0;
 `,[Ms()])]),oe("close",`
 margin: var(--n-close-margin);
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 flex-shrink: 0;
 `,[N("&:hover",`
 color: var(--n-close-icon-color-hover);
 `),N("&:active",`
 color: var(--n-close-icon-color-pressed);
 `)])]),W("message-container",`
 z-index: 6000;
 position: fixed;
 height: 0;
 overflow: visible;
 display: flex;
 flex-direction: column;
 align-items: center;
 `,[re("top",`
 top: 12px;
 left: 0;
 right: 0;
 `),re("top-left",`
 top: 12px;
 left: 12px;
 right: 0;
 align-items: flex-start;
 `),re("top-right",`
 top: 12px;
 left: 0;
 right: 12px;
 align-items: flex-end;
 `),re("bottom",`
 bottom: 4px;
 left: 0;
 right: 0;
 justify-content: flex-end;
 `),re("bottom-left",`
 bottom: 4px;
 left: 12px;
 right: 0;
 justify-content: flex-end;
 align-items: flex-start;
 `),re("bottom-right",`
 bottom: 4px;
 left: 0;
 right: 12px;
 justify-content: flex-end;
 align-items: flex-end;
 `)])]),xO={info:()=>E(gi,null),success:()=>E(Xs,null),warning:()=>E(Ys,null),error:()=>E(Gs,null),default:()=>null},CO=be({name:"Message",props:Object.assign(Object.assign({},O1),{render:Function}),setup(e){const{inlineThemeDisabled:t,mergedRtlRef:r}=kt(e),{props:o,mergedClsPrefixRef:n}=Se(B1),i=qs("Message",r,n),s=Xe("Message","-message",yO,o1,o,n),a=q(()=>{const{type:c}=e,{common:{cubicBezierEaseInOut:u},self:{padding:d,margin:f,maxWidth:h,iconMargin:p,closeMargin:m,closeSize:y,iconSize:g,fontSize:w,lineHeight:T,borderRadius:x,iconColorInfo:C,iconColorSuccess:$,iconColorWarning:S,iconColorError:L,iconColorLoading:k,closeIconSize:I,closeBorderRadius:A,[Ce("textColor",c)]:R,[Ce("boxShadow",c)]:F,[Ce("color",c)]:H,[Ce("closeColorHover",c)]:J,[Ce("closeColorPressed",c)]:Y,[Ce("closeIconColor",c)]:Z,[Ce("closeIconColorPressed",c)]:se,[Ce("closeIconColorHover",c)]:ve}}=s.value;return{"--n-bezier":u,"--n-margin":f,"--n-padding":d,"--n-max-width":h,"--n-font-size":w,"--n-icon-margin":p,"--n-icon-size":g,"--n-close-icon-size":I,"--n-close-border-radius":A,"--n-close-size":y,"--n-close-margin":m,"--n-text-color":R,"--n-color":H,"--n-box-shadow":F,"--n-icon-color-info":C,"--n-icon-color-success":$,"--n-icon-color-warning":S,"--n-icon-color-error":L,"--n-icon-color-loading":k,"--n-close-color-hover":J,"--n-close-color-pressed":Y,"--n-close-icon-color":Z,"--n-close-icon-color-pressed":se,"--n-close-icon-color-hover":ve,"--n-line-height":T,"--n-border-radius":x}}),l=t?br("message",q(()=>e.type[0]),a,{}):void 0;return{mergedClsPrefix:n,rtlEnabled:i,messageProviderProps:o,handleClose(){var c;(c=e.onClose)===null||c===void 0||c.call(e)},cssVars:t?void 0:a,themeClass:l==null?void 0:l.themeClass,onRender:l==null?void 0:l.onRender,placement:o.placement}},render(){const{render:e,type:t,closable:r,content:o,mergedClsPrefix:n,cssVars:i,themeClass:s,onRender:a,icon:l,handleClose:c,showIcon:u}=this;a==null||a();let d;return E("div",{class:[`${n}-message-wrapper`,s],onMouseenter:this.onMouseenter,onMouseleave:this.onMouseleave,style:[{alignItems:this.placement.startsWith("top")?"flex-start":"flex-end"},i]},e?e(this.$props):E("div",{class:[`${n}-message ${n}-message--${t}-type`,this.rtlEnabled&&`${n}-message--rtl`]},(d=wO(l,t,n))&&u?E("div",{class:`${n}-message__icon ${n}-message__icon--${t}-type`},E(Kl,null,{default:()=>d})):null,E("div",{class:`${n}-message__content`},er(o)),r?E(Gl,{clsPrefix:n,class:`${n}-message__close`,onClick:c,absolute:!0}):null))}});function wO(e,t,r){if(typeof e=="function")return e();{const o=t==="loading"?E(Ib,{clsPrefix:r,strokeWidth:24,scale:.85}):xO[t]();return o?E(dt,{clsPrefix:r,key:t},{default:()=>o}):null}}const SO=be({name:"MessageEnvironment",props:Object.assign(Object.assign({},O1),{duration:{type:Number,default:3e3},onAfterLeave:Function,onLeave:Function,internalKey:{type:String,required:!0},onInternalAfterLeave:Function,onHide:Function,onAfterHide:Function}),setup(e){let t=null;const r=K(!0);Lt(()=>{o()});function o(){const{duration:u}=e;u&&(t=window.setTimeout(s,u))}function n(u){u.currentTarget===u.target&&t!==null&&(window.clearTimeout(t),t=null)}function i(u){u.currentTarget===u.target&&o()}function s(){const{onHide:u}=e;r.value=!1,t&&(window.clearTimeout(t),t=null),u&&u()}function a(){const{onClose:u}=e;u&&u(),s()}function l(){const{onAfterLeave:u,onInternalAfterLeave:d,onAfterHide:f,internalKey:h}=e;u&&u(),d&&d(h),f&&f()}function c(){s()}return{show:r,hide:s,handleClose:a,handleAfterLeave:l,handleMouseleave:i,handleMouseenter:n,deactivate:c}},render(){return E(ql,{appear:!0,onAfterLeave:this.handleAfterLeave,onLeave:this.onLeave},{default:()=>[this.show?E(CO,{content:this.content,type:this.type,icon:this.icon,showIcon:this.showIcon,closable:this.closable,onClose:this.handleClose,onMouseenter:this.keepAliveOnHover?this.handleMouseenter:void 0,onMouseleave:this.keepAliveOnHover?this.handleMouseleave:void 0}):null]})}}),EO=Object.assign(Object.assign({},Xe.props),{to:[String,Object],duration:{type:Number,default:3e3},keepAliveOnHover:Boolean,max:Number,placement:{type:String,default:"top"},closable:Boolean,containerStyle:[String,Object]}),_O=be({name:"MessageProvider",props:EO,setup(e){const{mergedClsPrefixRef:t}=kt(e),r=K([]),o=K({}),n={create(l,c){return i(l,Object.assign({type:"default"},c))},info(l,c){return i(l,Object.assign(Object.assign({},c),{type:"info"}))},success(l,c){return i(l,Object.assign(Object.assign({},c),{type:"success"}))},warning(l,c){return i(l,Object.assign(Object.assign({},c),{type:"warning"}))},error(l,c){return i(l,Object.assign(Object.assign({},c),{type:"error"}))},loading(l,c){return i(l,Object.assign(Object.assign({},c),{type:"loading"}))},destroyAll:a};qe(B1,{props:e,mergedClsPrefixRef:t}),qe(A1,n);function i(l,c){const u=_n(),d=Gt(Object.assign(Object.assign({},c),{content:l,key:u,destroy:()=>{var h;(h=o.value[u])===null||h===void 0||h.hide()}})),{max:f}=e;return f&&r.value.length>=f&&r.value.shift(),r.value.push(d),d}function s(l){r.value.splice(r.value.findIndex(c=>c.key===l),1),delete o.value[l]}function a(){Object.values(o.value).forEach(l=>{l.hide()})}return Object.assign({mergedClsPrefix:t,messageRefs:o,messageList:r,handleAfterLeave:s},n)},render(){var e,t,r;return E(Qe,null,(t=(e=this.$slots).default)===null||t===void 0?void 0:t.call(e),this.messageList.length?E(Ws,{to:(r=this.to)!==null&&r!==void 0?r:"body"},E("div",{class:[`${this.mergedClsPrefix}-message-container`,`${this.mergedClsPrefix}-message-container--${this.placement}`],key:"message-container",style:this.containerStyle},this.messageList.map(o=>E(SO,Object.assign({ref:n=>{n&&(this.messageRefs[o.key]=n)},internalKey:o.key,onInternalAfterLeave:this.handleAfterLeave},Cd(o,["destroy"],void 0),{duration:o.duration===void 0?this.duration:o.duration,keepAliveOnHover:o.keepAliveOnHover===void 0?this.keepAliveOnHover:o.keepAliveOnHover,closable:o.closable===void 0?this.closable:o.closable}))))):null)}});function TO(){const e=Se(A1,null);return e===null&&kn("use-message","No outer <n-message-provider /> founded. See prerequisite in https://www.naiveui.com/en-US/os-theme/components/message for more details. If you want to use `useMessage` outside setup, please check https://www.naiveui.com/zh-CN/os-theme/components/message#Q-&-A."),e}const Zl="n-notification-provider",$O=be({name:"NotificationContainer",props:{scrollable:{type:Boolean,required:!0},placement:{type:String,required:!0}},setup(){const{mergedThemeRef:e,mergedClsPrefixRef:t,wipTransitionCountRef:r}=Se(Zl),o=K(null);return Er(()=>{var n,i;r.value>0?(n=o==null?void 0:o.value)===null||n===void 0||n.classList.add("transitioning"):(i=o==null?void 0:o.value)===null||i===void 0||i.classList.remove("transitioning")}),{selfRef:o,mergedTheme:e,mergedClsPrefix:t,transitioning:r}},render(){const{$slots:e,scrollable:t,mergedClsPrefix:r,mergedTheme:o,placement:n}=this;return E("div",{ref:"selfRef",class:[`${r}-notification-container`,t&&`${r}-notification-container--scrollable`,`${r}-notification-container--${n}`]},t?E(Hb,{theme:o.peers.Scrollbar,themeOverrides:o.peerOverrides.Scrollbar,contentStyle:{overflow:"hidden"}},e):e)}}),PO={info:()=>E(gi,null),success:()=>E(Xs,null),warning:()=>E(Ys,null),error:()=>E(Gs,null),default:()=>null},Zd={closable:{type:Boolean,default:!0},type:{type:String,default:"default"},avatar:Function,title:[String,Function],description:[String,Function],content:[String,Function],meta:[String,Function],action:[String,Function],onClose:{type:Function,required:!0},keepAliveOnHover:Boolean,onMouseenter:Function,onMouseleave:Function},LO=Dl(Zd),kO=be({name:"Notification",props:Zd,setup(e){const{mergedClsPrefixRef:t,mergedThemeRef:r,props:o}=Se(Zl),{inlineThemeDisabled:n,mergedRtlRef:i}=kt(),s=qs("Notification",i,t),a=q(()=>{const{type:c}=e,{self:{color:u,textColor:d,closeIconColor:f,closeIconColorHover:h,closeIconColorPressed:p,headerTextColor:m,descriptionTextColor:y,actionTextColor:g,borderRadius:w,headerFontWeight:T,boxShadow:x,lineHeight:C,fontSize:$,closeMargin:S,closeSize:L,width:k,padding:I,closeIconSize:A,closeBorderRadius:R,closeColorHover:F,closeColorPressed:H,titleFontSize:J,metaFontSize:Y,descriptionFontSize:Z,[Ce("iconColor",c)]:se},common:{cubicBezierEaseOut:ve,cubicBezierEaseIn:Le,cubicBezierEaseInOut:_e}}=r.value,{left:Ae,right:ut,top:Ue,bottom:j}=u0(I);return{"--n-color":u,"--n-font-size":$,"--n-text-color":d,"--n-description-text-color":y,"--n-action-text-color":g,"--n-title-text-color":m,"--n-title-font-weight":T,"--n-bezier":_e,"--n-bezier-ease-out":ve,"--n-bezier-ease-in":Le,"--n-border-radius":w,"--n-box-shadow":x,"--n-close-border-radius":R,"--n-close-color-hover":F,"--n-close-color-pressed":H,"--n-close-icon-color":f,"--n-close-icon-color-hover":h,"--n-close-icon-color-pressed":p,"--n-line-height":C,"--n-icon-color":se,"--n-close-margin":S,"--n-close-size":L,"--n-close-icon-size":A,"--n-width":k,"--n-padding-left":Ae,"--n-padding-right":ut,"--n-padding-top":Ue,"--n-padding-bottom":j,"--n-title-font-size":J,"--n-meta-font-size":Y,"--n-description-font-size":Z}}),l=n?br("notification",q(()=>e.type[0]),a,o):void 0;return{mergedClsPrefix:t,showAvatar:q(()=>e.avatar||e.type!=="default"),handleCloseClick(){e.onClose()},rtlEnabled:s,cssVars:n?void 0:a,themeClass:l==null?void 0:l.themeClass,onRender:l==null?void 0:l.onRender}},render(){var e;const{mergedClsPrefix:t}=this;return(e=this.onRender)===null||e===void 0||e.call(this),E("div",{class:[`${t}-notification-wrapper`,this.themeClass],onMouseenter:this.onMouseenter,onMouseleave:this.onMouseleave,style:this.cssVars},E("div",{class:[`${t}-notification`,this.rtlEnabled&&`${t}-notification--rtl`,this.themeClass,{[`${t}-notification--closable`]:this.closable,[`${t}-notification--show-avatar`]:this.showAvatar}],style:this.cssVars},this.showAvatar?E("div",{class:`${t}-notification__avatar`},this.avatar?er(this.avatar):this.type!=="default"?E(dt,{clsPrefix:t},{default:()=>PO[this.type]()}):null):null,this.closable?E(Gl,{clsPrefix:t,class:`${t}-notification__close`,onClick:this.handleCloseClick}):null,E("div",{ref:"bodyRef",class:`${t}-notification-main`},this.title?E("div",{class:`${t}-notification-main__header`},er(this.title)):null,this.description?E("div",{class:`${t}-notification-main__description`},er(this.description)):null,this.content?E("pre",{class:`${t}-notification-main__content`},er(this.content)):null,this.meta||this.action?E("div",{class:`${t}-notification-main-footer`},this.meta?E("div",{class:`${t}-notification-main-footer__meta`},er(this.meta)):null,this.action?E("div",{class:`${t}-notification-main-footer__action`},er(this.action)):null):null)))}}),IO=Object.assign(Object.assign({},Zd),{duration:Number,onClose:Function,onLeave:Function,onAfterEnter:Function,onAfterLeave:Function,onHide:Function,onAfterShow:Function,onAfterHide:Function}),RO=be({name:"NotificationEnvironment",props:Object.assign(Object.assign({},IO),{internalKey:{type:String,required:!0},onInternalAfterLeave:{type:Function,required:!0}}),setup(e){const{wipTransitionCountRef:t}=Se(Zl),r=K(!0);let o=null;function n(){r.value=!1,o&&window.clearTimeout(o)}function i(p){t.value++,zt(()=>{p.style.height=`${p.offsetHeight}px`,p.style.maxHeight="0",p.style.transition="none",p.offsetHeight,p.style.transition="",p.style.maxHeight=p.style.height})}function s(p){t.value--,p.style.height="",p.style.maxHeight="";const{onAfterEnter:m,onAfterShow:y}=e;m&&m(),y&&y()}function a(p){t.value++,p.style.maxHeight=`${p.offsetHeight}px`,p.style.height=`${p.offsetHeight}px`,p.offsetHeight}function l(p){const{onHide:m}=e;m&&m(),p.style.maxHeight="0",p.offsetHeight}function c(){t.value--;const{onAfterLeave:p,onInternalAfterLeave:m,onAfterHide:y,internalKey:g}=e;p&&p(),m(g),y&&y()}function u(){const{duration:p}=e;p&&(o=window.setTimeout(n,p))}function d(p){p.currentTarget===p.target&&o!==null&&(window.clearTimeout(o),o=null)}function f(p){p.currentTarget===p.target&&u()}function h(){const{onClose:p}=e;p?Promise.resolve(p()).then(m=>{m!==!1&&n()}):n()}return Lt(()=>{e.duration&&(o=window.setTimeout(n,e.duration))}),{show:r,hide:n,handleClose:h,handleAfterLeave:c,handleLeave:l,handleBeforeLeave:a,handleAfterEnter:s,handleBeforeEnter:i,handleMouseenter:d,handleMouseleave:f}},render(){return E(qt,{name:"notification-transition",appear:!0,onBeforeEnter:this.handleBeforeEnter,onAfterEnter:this.handleAfterEnter,onBeforeLeave:this.handleBeforeLeave,onLeave:this.handleLeave,onAfterLeave:this.handleAfterLeave},{default:()=>this.show?E(kO,Object.assign({},hi(this.$props,LO),{onClose:this.handleClose,onMouseenter:this.duration&&this.keepAliveOnHover?this.handleMouseenter:void 0,onMouseleave:this.duration&&this.keepAliveOnHover?this.handleMouseleave:void 0})):null})}}),OO=N([W("notification-container",`
 z-index: 4000;
 position: fixed;
 overflow: visible;
 display: flex;
 flex-direction: column;
 align-items: flex-end;
 `,[N(">",[W("scrollbar",`
 width: initial;
 overflow: visible;
 height: -moz-fit-content !important;
 height: fit-content !important;
 max-height: 100vh !important;
 `,[N(">",[W("scrollbar-container",`
 height: -moz-fit-content !important;
 height: fit-content !important;
 max-height: 100vh !important;
 `,[W("scrollbar-content",`
 padding-top: 12px;
 padding-bottom: 33px;
 `)])])])]),re("top, top-right, top-left",`
 top: 12px;
 `,[N("&.transitioning >",[W("scrollbar",[N(">",[W("scrollbar-container",`
 min-height: 100vh !important;
 `)])])])]),re("bottom, bottom-right, bottom-left",`
 bottom: 12px;
 `,[N(">",[W("scrollbar",[N(">",[W("scrollbar-container",[W("scrollbar-content",`
 padding-bottom: 12px;
 `)])])])]),W("notification-wrapper",`
 display: flex;
 align-items: flex-end;
 margin-bottom: 0;
 margin-top: 12px;
 `)]),re("top, bottom",`
 left: 50%;
 transform: translateX(-50%);
 `,[W("notification-wrapper",[N("&.notification-transition-enter-from, &.notification-transition-leave-to",`
 transform: scale(0.85);
 `),N("&.notification-transition-leave-from, &.notification-transition-enter-to",`
 transform: scale(1);
 `)])]),re("top",[W("notification-wrapper",`
 transform-origin: top center;
 `)]),re("bottom",[W("notification-wrapper",`
 transform-origin: bottom center;
 `)]),re("top-right, bottom-right",[W("notification",`
 margin-left: 28px;
 margin-right: 16px;
 `)]),re("top-left, bottom-left",[W("notification",`
 margin-left: 16px;
 margin-right: 28px;
 `)]),re("top-right",`
 right: 0;
 `,[La("top-right")]),re("top-left",`
 left: 0;
 `,[La("top-left")]),re("bottom-right",`
 right: 0;
 `,[La("bottom-right")]),re("bottom-left",`
 left: 0;
 `,[La("bottom-left")]),re("scrollable",[re("top-right",`
 top: 0;
 `),re("top-left",`
 top: 0;
 `),re("bottom-right",`
 bottom: 0;
 `),re("bottom-left",`
 bottom: 0;
 `)]),W("notification-wrapper",`
 margin-bottom: 12px;
 `,[N("&.notification-transition-enter-from, &.notification-transition-leave-to",`
 opacity: 0;
 margin-top: 0 !important;
 margin-bottom: 0 !important;
 `),N("&.notification-transition-leave-from, &.notification-transition-enter-to",`
 opacity: 1;
 `),N("&.notification-transition-leave-active",`
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier),
 opacity .3s var(--n-bezier),
 transform .3s var(--n-bezier-ease-in),
 max-height .3s var(--n-bezier),
 margin-top .3s linear,
 margin-bottom .3s linear,
 box-shadow .3s var(--n-bezier);
 `),N("&.notification-transition-enter-active",`
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier),
 opacity .3s var(--n-bezier),
 transform .3s var(--n-bezier-ease-out),
 max-height .3s var(--n-bezier),
 margin-top .3s linear,
 margin-bottom .3s linear,
 box-shadow .3s var(--n-bezier);
 `)]),W("notification",`
 background-color: var(--n-color);
 color: var(--n-text-color);
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier),
 opacity .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 font-family: inherit;
 font-size: var(--n-font-size);
 font-weight: 400;
 position: relative;
 display: flex;
 overflow: hidden;
 flex-shrink: 0;
 padding-left: var(--n-padding-left);
 padding-right: var(--n-padding-right);
 width: var(--n-width);
 border-radius: var(--n-border-radius);
 box-shadow: var(--n-box-shadow);
 box-sizing: border-box;
 opacity: 1;
 `,[oe("avatar",[W("icon",{color:"var(--n-icon-color)"}),W("base-icon",{color:"var(--n-icon-color)"})]),re("show-avatar",[W("notification-main",`
 margin-left: 40px;
 width: calc(100% - 40px); 
 `)]),re("closable",[W("notification-main",[N("> *:first-child",{paddingRight:"20px"})]),oe("close",`
 position: absolute;
 top: 0;
 right: 0;
 margin: var(--n-close-margin);
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `)]),oe("avatar",`
 position: absolute;
 top: var(--n-padding-top);
 left: var(--n-padding-left);
 width: 28px;
 height: 28px;
 font-size: 28px;
 display: flex;
 align-items: center;
 justify-content: center;
 `,[W("icon","transition: color .3s var(--n-bezier);")]),W("notification-main",`
 padding-top: var(--n-padding-top);
 padding-bottom: var(--n-padding-bottom);
 box-sizing: border-box;
 display: flex;
 flex-direction: column;
 margin-left: 8px;
 width: calc(100% - 8px);
 `,[W("notification-main-footer",`
 display: flex;
 align-items: center;
 justify-content: space-between;
 margin-top: 12px;
 `,[oe("meta",`
 font-size: var(--n-meta-font-size);
 transition: color .3s var(--n-bezier-ease-out);
 color: var(--n-description-text-color);
 `),oe("action",`
 cursor: pointer;
 transition: color .3s var(--n-bezier-ease-out);
 color: var(--n-action-text-color);
 `)]),oe("header",`
 font-weight: var(--n-title-font-weight);
 font-size: var(--n-title-font-size);
 transition: color .3s var(--n-bezier-ease-out);
 color: var(--n-title-text-color);
 `),oe("description",`
 margin-top: 8px;
 font-size: var(--n-description-font-size);
 transition: color .3s var(--n-bezier-ease-out);
 color: var(--n-description-text-color);
 `),oe("content",`
 line-height: var(--n-line-height);
 margin: 12px 0 0 0;
 font-family: inherit;
 white-space: pre-wrap;
 word-wrap: break-word;
 transition: color .3s var(--n-bezier-ease-out);
 color: var(--n-text-color);
 `,[N("&:first-child",{margin:0})])])])])]);function La(e){const r=e.split("-")[1]==="left"?"calc(-100%)":"calc(100%)",o="0";return W("notification-wrapper",[N("&.notification-transition-enter-from, &.notification-transition-leave-to",`
 transform: translate(${r}, 0);
 `),N("&.notification-transition-leave-from, &.notification-transition-enter-to",`
 transform: translate(${o}, 0);
 `)])}const AO="n-notification-api",BO=Object.assign(Object.assign({},Xe.props),{containerStyle:[String,Object],to:[String,Object],scrollable:{type:Boolean,default:!0},max:Number,placement:{type:String,default:"top-right"},keepAliveOnHover:Boolean}),MO=be({name:"NotificationProvider",props:BO,setup(e){const{mergedClsPrefixRef:t}=kt(e),r=K([]),o={},n=new Set;function i(h){const p=_n(),m=()=>{n.add(p),o[p]&&o[p].hide()},y=Gt(Object.assign(Object.assign({},h),{key:p,destroy:m,hide:m,deactivate:m})),{max:g}=e;if(g&&r.value.length-n.size>=g){let w=!1,T=0;for(const x of r.value){if(!n.has(x.key)){o[x.key]&&(x.destroy(),w=!0);break}T++}w||r.value.splice(T,1)}return r.value.push(y),y}const s=["info","success","warning","error"].map(h=>p=>i(Object.assign(Object.assign({},p),{type:h})));function a(h){n.delete(h),r.value.splice(r.value.findIndex(p=>p.key===h),1)}const l=Xe("Notification","-notification",OO,t1,e,t),c={create:i,info:s[0],success:s[1],warning:s[2],error:s[3],open:d,destroyAll:f},u=K(0);qe(AO,c),qe(Zl,{props:e,mergedClsPrefixRef:t,mergedThemeRef:l,wipTransitionCountRef:u});function d(h){return i(h)}function f(){Object.values(r.value).forEach(h=>{h.hide()})}return Object.assign({mergedClsPrefix:t,notificationList:r,notificationRefs:o,handleAfterLeave:a},c)},render(){var e,t,r;const{placement:o}=this;return E(Qe,null,(t=(e=this.$slots).default)===null||t===void 0?void 0:t.call(e),this.notificationList.length?E(Ws,{to:(r=this.to)!==null&&r!==void 0?r:"body"},E($O,{style:this.containerStyle,scrollable:this.scrollable&&o!=="top"&&o!=="bottom",placement:o},{default:()=>this.notificationList.map(n=>E(RO,Object.assign({ref:i=>{const s=n.key;i===null?delete this.notificationRefs[s]:this.notificationRefs[s]=i}},Cd(n,["destroy","hide","deactivate"]),{internalKey:n.key,onInternalAfterLeave:this.handleAfterLeave,keepAliveOnHover:n.keepAliveOnHover===void 0?this.keepAliveOnHover:n.keepAliveOnHover})))})):null)}}),HO=N([W("progress",{display:"inline-block"},[W("progress-icon",`
 color: var(--n-icon-color);
 transition: color .3s var(--n-bezier);
 `),re("line",`
 width: 100%;
 display: block;
 `,[W("progress-content",`
 display: flex;
 align-items: center;
 `,[W("progress-graph",{flex:1})]),W("progress-custom-content",{marginLeft:"14px"}),W("progress-icon",`
 width: 30px;
 padding-left: 14px;
 height: var(--n-icon-size-line);
 line-height: var(--n-icon-size-line);
 font-size: var(--n-icon-size-line);
 `,[re("as-text",`
 color: var(--n-text-color-line-outer);
 text-align: center;
 width: 40px;
 font-size: var(--n-font-size);
 padding-left: 4px;
 transition: color .3s var(--n-bezier);
 `)])]),re("circle, dashboard",{width:"120px"},[W("progress-custom-content",`
 position: absolute;
 left: 50%;
 top: 50%;
 transform: translateX(-50%) translateY(-50%);
 display: flex;
 align-items: center;
 justify-content: center;
 `),W("progress-text",`
 position: absolute;
 left: 50%;
 top: 50%;
 transform: translateX(-50%) translateY(-50%);
 display: flex;
 align-items: center;
 color: inherit;
 font-size: var(--n-font-size-circle);
 color: var(--n-text-color-circle);
 font-weight: var(--n-font-weight-circle);
 transition: color .3s var(--n-bezier);
 white-space: nowrap;
 `),W("progress-icon",`
 position: absolute;
 left: 50%;
 top: 50%;
 transform: translateX(-50%) translateY(-50%);
 display: flex;
 align-items: center;
 color: var(--n-icon-color);
 font-size: var(--n-icon-size-circle);
 `)]),re("multiple-circle",`
 width: 200px;
 color: inherit;
 `,[W("progress-text",`
 font-weight: var(--n-font-weight-circle);
 color: var(--n-text-color-circle);
 position: absolute;
 left: 50%;
 top: 50%;
 transform: translateX(-50%) translateY(-50%);
 display: flex;
 align-items: center;
 justify-content: center;
 transition: color .3s var(--n-bezier);
 `)]),W("progress-content",{position:"relative"}),W("progress-graph",{position:"relative"},[W("progress-graph-circle",[N("svg",{verticalAlign:"bottom"}),W("progress-graph-circle-fill",`
 stroke: var(--n-fill-color);
 transition:
 opacity .3s var(--n-bezier),
 stroke .3s var(--n-bezier),
 stroke-dasharray .3s var(--n-bezier);
 `,[re("empty",{opacity:0})]),W("progress-graph-circle-rail",`
 transition: stroke .3s var(--n-bezier);
 overflow: hidden;
 stroke: var(--n-rail-color);
 `)]),W("progress-graph-line",[re("indicator-inside",[W("progress-graph-line-rail",`
 height: 16px;
 line-height: 16px;
 border-radius: 10px;
 `,[W("progress-graph-line-fill",`
 height: inherit;
 border-radius: 10px;
 `),W("progress-graph-line-indicator",`
 background: #0000;
 white-space: nowrap;
 text-align: right;
 margin-left: 14px;
 margin-right: 14px;
 height: inherit;
 font-size: 12px;
 color: var(--n-text-color-line-inner);
 transition: color .3s var(--n-bezier);
 `)])]),re("indicator-inside-label",`
 height: 16px;
 display: flex;
 align-items: center;
 `,[W("progress-graph-line-rail",`
 flex: 1;
 transition: background-color .3s var(--n-bezier);
 `),W("progress-graph-line-indicator",`
 background: var(--n-fill-color);
 font-size: 12px;
 transform: translateZ(0);
 display: flex;
 vertical-align: middle;
 height: 16px;
 line-height: 16px;
 padding: 0 10px;
 border-radius: 10px;
 position: absolute;
 white-space: nowrap;
 color: var(--n-text-color-line-inner);
 transition:
 right .2s var(--n-bezier),
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `)]),W("progress-graph-line-rail",`
 position: relative;
 overflow: hidden;
 height: var(--n-rail-height);
 border-radius: 5px;
 background-color: var(--n-rail-color);
 transition: background-color .3s var(--n-bezier);
 `,[W("progress-graph-line-fill",`
 background: var(--n-fill-color);
 position: relative;
 border-radius: 5px;
 height: inherit;
 width: 100%;
 max-width: 0%;
 transition:
 background-color .3s var(--n-bezier),
 max-width .2s var(--n-bezier);
 `,[re("processing",[N("&::after",`
 content: "";
 background-image: var(--n-line-bg-processing);
 animation: progress-processing-animation 2s var(--n-bezier) infinite;
 `)])])])])])]),N("@keyframes progress-processing-animation",`
 0% {
 position: absolute;
 left: 0;
 top: 0;
 bottom: 0;
 right: 100%;
 opacity: 1;
 }
 66% {
 position: absolute;
 left: 0;
 top: 0;
 bottom: 0;
 right: 0;
 opacity: 0;
 }
 100% {
 position: absolute;
 left: 0;
 top: 0;
 bottom: 0;
 right: 0;
 opacity: 0;
 }
 `)]),DO={success:E(Xs,null),error:E(Gs,null),warning:E(Ys,null),info:E(gi,null)},zO=be({name:"ProgressLine",props:{clsPrefix:{type:String,required:!0},percentage:{type:Number,default:0},railColor:String,railStyle:[String,Object],fillColor:String,status:{type:String,required:!0},indicatorPlacement:{type:String,required:!0},indicatorTextColor:String,unit:{type:String,default:"%"},processing:{type:Boolean,required:!0},showIndicator:{type:Boolean,required:!0},height:[String,Number],railBorderRadius:[String,Number],fillBorderRadius:[String,Number]},setup(e,{slots:t}){const r=q(()=>Qr(e.height)),o=q(()=>e.railBorderRadius!==void 0?Qr(e.railBorderRadius):e.height!==void 0?Qr(e.height,{c:.5}):""),n=q(()=>e.fillBorderRadius!==void 0?Qr(e.fillBorderRadius):e.railBorderRadius!==void 0?Qr(e.railBorderRadius):e.height!==void 0?Qr(e.height,{c:.5}):"");return()=>{const{indicatorPlacement:i,railColor:s,railStyle:a,percentage:l,unit:c,indicatorTextColor:u,status:d,showIndicator:f,fillColor:h,processing:p,clsPrefix:m}=e;return E("div",{class:`${m}-progress-content`,role:"none"},E("div",{class:`${m}-progress-graph`,"aria-hidden":!0},E("div",{class:[`${m}-progress-graph-line`,{[`${m}-progress-graph-line--indicator-${i}`]:!0}]},E("div",{class:`${m}-progress-graph-line-rail`,style:[{backgroundColor:s,height:r.value,borderRadius:o.value},a]},E("div",{class:[`${m}-progress-graph-line-fill`,p&&`${m}-progress-graph-line-fill--processing`],style:{maxWidth:`${e.percentage}%`,backgroundColor:h,height:r.value,lineHeight:r.value,borderRadius:n.value}},i==="inside"?E("div",{class:`${m}-progress-graph-line-indicator`,style:{color:u}},l,c):null)))),f&&i==="outside"?E("div",null,t.default?E("div",{class:`${m}-progress-custom-content`,style:{color:u},role:"none"},t.default()):d==="default"?E("div",{role:"none",class:`${m}-progress-icon ${m}-progress-icon--as-text`,style:{color:u}},l,c):E("div",{class:`${m}-progress-icon`,"aria-hidden":!0},E(dt,{clsPrefix:m},{default:()=>DO[d]}))):null)}}}),FO={success:E(Xs,null),error:E(Gs,null),warning:E(Ys,null),info:E(gi,null)},NO=be({name:"ProgressCircle",props:{clsPrefix:{type:String,required:!0},status:{type:String,required:!0},strokeWidth:{type:Number,required:!0},fillColor:String,railColor:String,railStyle:[String,Object],percentage:{type:Number,default:0},offsetDegree:{type:Number,default:0},showIndicator:{type:Boolean,required:!0},indicatorTextColor:String,unit:String,viewBoxWidth:{type:Number,required:!0},gapDegree:{type:Number,required:!0},gapOffsetDegree:{type:Number,default:0}},setup(e,{slots:t}){function r(o,n,i){const{gapDegree:s,viewBoxWidth:a,strokeWidth:l}=e,c=50,u=0,d=c,f=0,h=2*c,p=50+l/2,m=`M ${p},${p} m ${u},${d}
      a ${c},${c} 0 1 1 ${f},${-h}
      a ${c},${c} 0 1 1 ${-f},${h}`,y=Math.PI*2*c,g={stroke:i,strokeDasharray:`${o/100*(y-s)}px ${a*8}px`,strokeDashoffset:`-${s/2}px`,transformOrigin:n?"center":void 0,transform:n?`rotate(${n}deg)`:void 0};return{pathString:m,pathStyle:g}}return()=>{const{fillColor:o,railColor:n,strokeWidth:i,offsetDegree:s,status:a,percentage:l,showIndicator:c,indicatorTextColor:u,unit:d,gapOffsetDegree:f,clsPrefix:h}=e,{pathString:p,pathStyle:m}=r(100,0,n),{pathString:y,pathStyle:g}=r(l,s,o),w=100+i;return E("div",{class:`${h}-progress-content`,role:"none"},E("div",{class:`${h}-progress-graph`,"aria-hidden":!0},E("div",{class:`${h}-progress-graph-circle`,style:{transform:f?`rotate(${f}deg)`:void 0}},E("svg",{viewBox:`0 0 ${w} ${w}`},E("g",null,E("path",{class:`${h}-progress-graph-circle-rail`,d:p,"stroke-width":i,"stroke-linecap":"round",fill:"none",style:m})),E("g",null,E("path",{class:[`${h}-progress-graph-circle-fill`,l===0&&`${h}-progress-graph-circle-fill--empty`],d:y,"stroke-width":i,"stroke-linecap":"round",fill:"none",style:g}))))),c?E("div",null,t.default?E("div",{class:`${h}-progress-custom-content`,role:"none"},t.default()):a!=="default"?E("div",{class:`${h}-progress-icon`,"aria-hidden":!0},E(dt,{clsPrefix:h},{default:()=>FO[a]})):E("div",{class:`${h}-progress-text`,style:{color:u},role:"none"},E("span",{class:`${h}-progress-text__percentage`},l),E("span",{class:`${h}-progress-text__unit`},d))):null)}}});function Mp(e,t,r=100){return`m ${r/2} ${r/2-e} a ${e} ${e} 0 1 1 0 ${2*e} a ${e} ${e} 0 1 1 0 -${2*e}`}const jO=be({name:"ProgressMultipleCircle",props:{clsPrefix:{type:String,required:!0},viewBoxWidth:{type:Number,required:!0},percentage:{type:Array,default:[0]},strokeWidth:{type:Number,required:!0},circleGap:{type:Number,required:!0},showIndicator:{type:Boolean,required:!0},fillColor:{type:Array,default:()=>[]},railColor:{type:Array,default:()=>[]},railStyle:{type:Array,default:()=>[]}},setup(e,{slots:t}){const r=q(()=>e.percentage.map((n,i)=>`${Math.PI*n/100*(e.viewBoxWidth/2-e.strokeWidth/2*(1+2*i)-e.circleGap*i)*2}, ${e.viewBoxWidth*8}`));return()=>{const{viewBoxWidth:o,strokeWidth:n,circleGap:i,showIndicator:s,fillColor:a,railColor:l,railStyle:c,percentage:u,clsPrefix:d}=e;return E("div",{class:`${d}-progress-content`,role:"none"},E("div",{class:`${d}-progress-graph`,"aria-hidden":!0},E("div",{class:`${d}-progress-graph-circle`},E("svg",{viewBox:`0 0 ${o} ${o}`},u.map((f,h)=>E("g",{key:h},E("path",{class:`${d}-progress-graph-circle-rail`,d:Mp(o/2-n/2*(1+2*h)-i*h,n,o),"stroke-width":n,"stroke-linecap":"round",fill:"none",style:[{strokeDashoffset:0,stroke:l[h]},c[h]]}),E("path",{class:[`${d}-progress-graph-circle-fill`,f===0&&`${d}-progress-graph-circle-fill--empty`],d:Mp(o/2-n/2*(1+2*h)-i*h,n,o),"stroke-width":n,"stroke-linecap":"round",fill:"none",style:{strokeDasharray:r.value[h],strokeDashoffset:0,stroke:a[h]}})))))),s&&t.default?E("div",null,E("div",{class:`${d}-progress-text`},t.default())):null)}}}),WO=Object.assign(Object.assign({},Xe.props),{processing:Boolean,type:{type:String,default:"line"},gapDegree:Number,gapOffsetDegree:Number,status:{type:String,default:"default"},railColor:[String,Array],railStyle:[String,Array],color:[String,Array],viewBoxWidth:{type:Number,default:100},strokeWidth:{type:Number,default:7},percentage:[Number,Array],unit:{type:String,default:"%"},showIndicator:{type:Boolean,default:!0},indicatorPosition:{type:String,default:"outside"},indicatorPlacement:{type:String,default:"outside"},indicatorTextColor:String,circleGap:{type:Number,default:1},height:Number,borderRadius:[String,Number],fillBorderRadius:[String,Number],offsetDegree:Number}),UO=be({name:"Progress",props:WO,setup(e){const t=q(()=>e.indicatorPlacement||e.indicatorPosition),r=q(()=>{if(e.gapDegree||e.gapDegree===0)return e.gapDegree;if(e.type==="dashboard")return 75}),{mergedClsPrefixRef:o,inlineThemeDisabled:n}=kt(e),i=Xe("Progress","-progress",HO,Yd,e,o),s=q(()=>{const{status:l}=e,{common:{cubicBezierEaseInOut:c},self:{fontSize:u,fontSizeCircle:d,railColor:f,railHeight:h,iconSizeCircle:p,iconSizeLine:m,textColorCircle:y,textColorLineInner:g,textColorLineOuter:w,lineBgProcessing:T,fontWeightCircle:x,[Ce("iconColor",l)]:C,[Ce("fillColor",l)]:$}}=i.value;return{"--n-bezier":c,"--n-fill-color":$,"--n-font-size":u,"--n-font-size-circle":d,"--n-font-weight-circle":x,"--n-icon-color":C,"--n-icon-size-circle":p,"--n-icon-size-line":m,"--n-line-bg-processing":T,"--n-rail-color":f,"--n-rail-height":h,"--n-text-color-circle":y,"--n-text-color-line-inner":g,"--n-text-color-line-outer":w}}),a=n?br("progress",q(()=>e.status[0]),s,e):void 0;return{mergedClsPrefix:o,mergedIndicatorPlacement:t,gapDeg:r,cssVars:n?void 0:s,themeClass:a==null?void 0:a.themeClass,onRender:a==null?void 0:a.onRender}},render(){const{type:e,cssVars:t,indicatorTextColor:r,showIndicator:o,status:n,railColor:i,railStyle:s,color:a,percentage:l,viewBoxWidth:c,strokeWidth:u,mergedIndicatorPlacement:d,unit:f,borderRadius:h,fillBorderRadius:p,height:m,processing:y,circleGap:g,mergedClsPrefix:w,gapDeg:T,gapOffsetDegree:x,themeClass:C,$slots:$,onRender:S}=this;return S==null||S(),E("div",{class:[C,`${w}-progress`,`${w}-progress--${e}`,`${w}-progress--${n}`],style:t,"aria-valuemax":100,"aria-valuemin":0,"aria-valuenow":l,role:e==="circle"||e==="line"||e==="dashboard"?"progressbar":"none"},e==="circle"||e==="dashboard"?E(NO,{clsPrefix:w,status:n,showIndicator:o,indicatorTextColor:r,railColor:i,fillColor:a,railStyle:s,offsetDegree:this.offsetDegree,percentage:l,viewBoxWidth:c,strokeWidth:u,gapDegree:T===void 0?e==="dashboard"?75:0:T,gapOffsetDegree:x,unit:f},$):e==="line"?E(zO,{clsPrefix:w,status:n,showIndicator:o,indicatorTextColor:r,railColor:i,fillColor:a,railStyle:s,percentage:l,processing:y,indicatorPlacement:d,unit:f,fillBorderRadius:p,railBorderRadius:h,height:m},$):e==="multiple-circle"?E(jO,{clsPrefix:w,strokeWidth:u,railColor:i,fillColor:a,railStyle:s,viewBoxWidth:c,percentage:l,showIndicator:o,circleGap:g},$):null)}}),VO={name:"Skeleton",common:ne,self(e){const{heightSmall:t,heightMedium:r,heightLarge:o,borderRadius:n}=e;return{color:"rgba(255, 255, 255, 0.12)",colorEnd:"rgba(255, 255, 255, 0.18)",borderRadius:n,heightSmall:t,heightMedium:r,heightLarge:o}}},KO=e=>{const{heightSmall:t,heightMedium:r,heightLarge:o,borderRadius:n}=e;return{color:"#eee",colorEnd:"#ddd",borderRadius:n,heightSmall:t,heightMedium:r,heightLarge:o}},qO={name:"Skeleton",common:ie,self:KO},Mi="n-upload",M1="__UPLOAD_DRAGGER__",GO=be({name:"UploadDragger",[M1]:!0,setup(e,{slots:t}){const r=Se(Mi,null);return r||kn("upload-dragger","`n-upload-dragger` must be placed inside `n-upload`."),()=>{const{mergedClsPrefixRef:{value:o},mergedDisabledRef:{value:n},maxReachedRef:{value:i}}=r;return E("div",{class:[`${o}-upload-dragger`,(n||i)&&`${o}-upload-dragger--disabled`]},t)}}});var H1=globalThis&&globalThis.__awaiter||function(e,t,r,o){function n(i){return i instanceof r?i:new r(function(s){s(i)})}return new(r||(r=Promise))(function(i,s){function a(u){try{c(o.next(u))}catch(d){s(d)}}function l(u){try{c(o.throw(u))}catch(d){s(d)}}function c(u){u.done?i(u.value):n(u.value).then(a,l)}c((o=o.apply(e,t||[])).next())})};const D1=e=>e.includes("image/"),Hp=(e="")=>{const t=e.split("/"),o=t[t.length-1].split(/#|\?/)[0];return(/\.[^./\\]*$/.exec(o)||[""])[0]},Dp=/(webp|svg|png|gif|jpg|jpeg|jfif|bmp|dpg|ico)$/i,z1=e=>{if(e.type)return D1(e.type);const t=Hp(e.name||"");if(Dp.test(t))return!0;const r=e.thumbnailUrl||e.url||"",o=Hp(r);return!!(/^data:image\//.test(r)||Dp.test(o))};function XO(e){return H1(this,void 0,void 0,function*(){return yield new Promise(t=>{if(!e.type||!D1(e.type)){t("");return}t(window.URL.createObjectURL(e))})})}const YO=In&&window.FileReader&&window.File;function ZO(e){return e.isDirectory}function JO(e){return e.isFile}function QO(e,t){return H1(this,void 0,void 0,function*(){const r=[];let o,n=0;function i(){n++}function s(){n--,n||o(r)}function a(l){l.forEach(c=>{if(!!c){if(i(),t&&ZO(c)){const u=c.createReader();i(),u.readEntries(d=>{a(d),s()},()=>{s()})}else JO(c)&&(i(),c.file(u=>{r.push({file:u,entry:c,source:"dnd"}),s()},()=>{s()}));s()}})}return yield new Promise(l=>{o=l,a(e)}),r})}function Ds(e){const{id:t,name:r,percentage:o,status:n,url:i,file:s,thumbnailUrl:a,type:l,fullPath:c,batchId:u}=e;return{id:t,name:r,percentage:o!=null?o:null,status:n,url:i!=null?i:null,file:s!=null?s:null,thumbnailUrl:a!=null?a:null,type:l!=null?l:null,fullPath:c!=null?c:null,batchId:u!=null?u:null}}function eA(e,t,r){return e=e.toLowerCase(),t=t.toLocaleLowerCase(),r=r.toLocaleLowerCase(),r.split(",").map(n=>n.trim()).filter(Boolean).some(n=>{if(n.startsWith(".")){if(e.endsWith(n))return!0}else if(n.includes("/")){const[i,s]=t.split("/"),[a,l]=n.split("/");if((a==="*"||i&&a&&a===i)&&(l==="*"||s&&l&&l===s))return!0}else return!0;return!1})}const tA=(e,t)=>{if(!e)return;const r=document.createElement("a");r.href=e,t!==void 0&&(r.download=t),document.body.appendChild(r),r.click(),document.body.removeChild(r)},F1=be({name:"UploadTrigger",props:{abstract:Boolean},setup(e,{slots:t}){const r=Se(Mi,null);r||kn("upload-trigger","`n-upload-trigger` must be placed inside `n-upload`.");const{mergedClsPrefixRef:o,mergedDisabledRef:n,maxReachedRef:i,listTypeRef:s,dragOverRef:a,openOpenFileDialog:l,draggerInsideRef:c,handleFileAddition:u,mergedDirectoryDndRef:d,triggerStyleRef:f}=r,h=q(()=>s.value==="image-card");function p(){n.value||i.value||l()}function m(T){T.preventDefault(),a.value=!0}function y(T){T.preventDefault(),a.value=!0}function g(T){T.preventDefault(),a.value=!1}function w(T){var x;if(T.preventDefault(),!c.value||n.value||i.value){a.value=!1;return}const C=(x=T.dataTransfer)===null||x===void 0?void 0:x.items;C!=null&&C.length?QO(Array.from(C).map($=>$.webkitGetAsEntry()),d.value).then($=>{u($)}).finally(()=>{a.value=!1}):a.value=!1}return()=>{var T;const{value:x}=o;return e.abstract?(T=t.default)===null||T===void 0?void 0:T.call(t,{handleClick:p,handleDrop:w,handleDragOver:m,handleDragEnter:y,handleDragLeave:g}):E("div",{class:[`${x}-upload-trigger`,(n.value||i.value)&&`${x}-upload-trigger--disabled`,h.value&&`${x}-upload-trigger--image-card`],style:f.value,onClick:p,onDrop:w,onDragover:m,onDragenter:y,onDragleave:g},h.value?E(GO,null,{default:()=>du(t.default,()=>[E(dt,{clsPrefix:x},{default:()=>E(q4,null)})])}):t)}}}),rA=be({name:"UploadProgress",props:{show:Boolean,percentage:{type:Number,required:!0},status:{type:String,required:!0}},setup(){return{mergedTheme:Se(Mi).mergedThemeRef}},render(){return E(ql,null,{default:()=>this.show?E(UO,{type:"line",showIndicator:!1,percentage:this.percentage,status:this.status,height:2,theme:this.mergedTheme.peers.Progress,themeOverrides:this.mergedTheme.peerOverrides.Progress}):null})}}),oA=E("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 28 28"},E("g",{fill:"none"},E("path",{d:"M21.75 3A3.25 3.25 0 0 1 25 6.25v15.5A3.25 3.25 0 0 1 21.75 25H6.25A3.25 3.25 0 0 1 3 21.75V6.25A3.25 3.25 0 0 1 6.25 3h15.5zm.583 20.4l-7.807-7.68a.75.75 0 0 0-.968-.07l-.084.07l-7.808 7.68c.183.065.38.1.584.1h15.5c.204 0 .4-.035.583-.1l-7.807-7.68l7.807 7.68zM21.75 4.5H6.25A1.75 1.75 0 0 0 4.5 6.25v15.5c0 .208.036.408.103.593l7.82-7.692a2.25 2.25 0 0 1 3.026-.117l.129.117l7.82 7.692c.066-.185.102-.385.102-.593V6.25a1.75 1.75 0 0 0-1.75-1.75zm-3.25 3a2.5 2.5 0 1 1 0 5a2.5 2.5 0 0 1 0-5zm0 1.5a1 1 0 1 0 0 2a1 1 0 0 0 0-2z",fill:"currentColor"}))),nA=E("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 28 28"},E("g",{fill:"none"},E("path",{d:"M6.4 2A2.4 2.4 0 0 0 4 4.4v19.2A2.4 2.4 0 0 0 6.4 26h15.2a2.4 2.4 0 0 0 2.4-2.4V11.578c0-.729-.29-1.428-.805-1.944l-6.931-6.931A2.4 2.4 0 0 0 14.567 2H6.4zm-.9 2.4a.9.9 0 0 1 .9-.9H14V10a2 2 0 0 0 2 2h6.5v11.6a.9.9 0 0 1-.9.9H6.4a.9.9 0 0 1-.9-.9V4.4zm16.44 6.1H16a.5.5 0 0 1-.5-.5V4.06l6.44 6.44z",fill:"currentColor"})));var iA=globalThis&&globalThis.__awaiter||function(e,t,r,o){function n(i){return i instanceof r?i:new r(function(s){s(i)})}return new(r||(r=Promise))(function(i,s){function a(u){try{c(o.next(u))}catch(d){s(d)}}function l(u){try{c(o.throw(u))}catch(d){s(d)}}function c(u){u.done?i(u.value):n(u.value).then(a,l)}c((o=o.apply(e,t||[])).next())})};const ka={paddingMedium:"0 3px",heightMedium:"24px",iconSizeMedium:"18px"},sA=be({name:"UploadFile",props:{clsPrefix:{type:String,required:!0},file:{type:Object,required:!0},listType:{type:String,required:!0}},setup(e){const t=Se(Mi),r=K(null),o=K(""),n=q(()=>{const{file:C}=e;return C.status==="finished"?"success":C.status==="error"?"error":"info"}),i=q(()=>{const{file:C}=e;if(C.status==="error")return"error"}),s=q(()=>{const{file:C}=e;return C.status==="uploading"}),a=q(()=>{if(!t.showCancelButtonRef.value)return!1;const{file:C}=e;return["uploading","pending","error"].includes(C.status)}),l=q(()=>{if(!t.showRemoveButtonRef.value)return!1;const{file:C}=e;return["finished"].includes(C.status)}),c=q(()=>{if(!t.showDownloadButtonRef.value)return!1;const{file:C}=e;return["finished"].includes(C.status)}),u=q(()=>{if(!t.showRetryButtonRef.value)return!1;const{file:C}=e;return["error"].includes(C.status)}),d=io(()=>o.value||e.file.thumbnailUrl||e.file.url),f=q(()=>{if(!t.showPreviewButtonRef.value)return!1;const{file:{status:C},listType:$}=e;return["finished"].includes(C)&&d.value&&$==="image-card"});function h(){t.submit(e.file.id)}function p(C){C.preventDefault();const{file:$}=e;["finished","pending","error"].includes($.status)?y($):["uploading"].includes($.status)?w($):Ls("upload","The button clicked type is unknown.")}function m(C){C.preventDefault(),g(e.file)}function y(C){const{xhrMap:$,doChange:S,onRemoveRef:{value:L},mergedFileListRef:{value:k}}=t;Promise.resolve(L?L({file:Object.assign({},C),fileList:k}):!0).then(I=>{if(I===!1)return;const A=Object.assign({},C,{status:"removed"});$.delete(C.id),S(A,void 0,{remove:!0})})}function g(C){const{onDownloadRef:{value:$}}=t;Promise.resolve($?$(Object.assign({},C)):!0).then(S=>{S!==!1&&tA(C.url,C.name)})}function w(C){const{xhrMap:$}=t,S=$.get(C.id);S==null||S.abort(),y(Object.assign({},C))}function T(){const{onPreviewRef:{value:C}}=t;if(C)C(e.file);else if(e.listType==="image-card"){const{value:$}=r;if(!$)return;$.click()}}const x=()=>iA(this,void 0,void 0,function*(){const{listType:C}=e;C!=="image"&&C!=="image-card"||t.shouldUseThumbnailUrlRef.value(e.file)&&(o.value=yield t.getFileThumbnailUrlResolver(e.file))});return Er(()=>{x()}),{mergedTheme:t.mergedThemeRef,progressStatus:n,buttonType:i,showProgress:s,disabled:t.mergedDisabledRef,showCancelButton:a,showRemoveButton:l,showDownloadButton:c,showRetryButton:u,showPreviewButton:f,mergedThumbnailUrl:d,shouldUseThumbnailUrl:t.shouldUseThumbnailUrlRef,renderIcon:t.renderIconRef,imageRef:r,handleRemoveOrCancelClick:p,handleDownloadClick:m,handleRetryClick:h,handlePreviewClick:T}},render(){const{clsPrefix:e,mergedTheme:t,listType:r,file:o,renderIcon:n}=this;let i;const s=r==="image";s||r==="image-card"?i=!this.shouldUseThumbnailUrl(o)||!this.mergedThumbnailUrl?E("span",{class:`${e}-upload-file-info__thumbnail`},n?n(o):z1(o)?E(dt,{clsPrefix:e},{default:()=>oA}):E(dt,{clsPrefix:e},{default:()=>nA})):E("a",{rel:"noopener noreferer",target:"_blank",href:o.url||void 0,class:`${e}-upload-file-info__thumbnail`,onClick:this.handlePreviewClick},r==="image-card"?E(lO,{src:this.mergedThumbnailUrl||void 0,previewSrc:o.url||void 0,alt:o.name,ref:"imageRef"}):E("img",{src:this.mergedThumbnailUrl||void 0,alt:o.name})):i=E("span",{class:`${e}-upload-file-info__thumbnail`},n?n(o):E(dt,{clsPrefix:e},{default:()=>E(G4,null)}));const l=E(rA,{show:this.showProgress,percentage:o.percentage||0,status:this.progressStatus}),c=r==="text"||r==="image";return E("div",{class:[`${e}-upload-file`,`${e}-upload-file--${this.progressStatus}-status`,o.url&&o.status!=="error"&&r!=="image-card"&&`${e}-upload-file--with-url`,`${e}-upload-file--${r}-type`]},E("div",{class:`${e}-upload-file-info`},i,E("div",{class:`${e}-upload-file-info__name`},c&&(o.url&&o.status!=="error"?E("a",{rel:"noopener noreferer",target:"_blank",href:o.url||void 0,onClick:this.handlePreviewClick},o.name):E("span",{onClick:this.handlePreviewClick},o.name)),s&&l),E("div",{class:[`${e}-upload-file-info__action`,`${e}-upload-file-info__action--${r}-type`]},this.showPreviewButton?E(qn,{key:"preview",quaternary:!0,type:this.buttonType,onClick:this.handlePreviewClick,theme:t.peers.Button,themeOverrides:t.peerOverrides.Button,builtinThemeOverrides:ka},{icon:()=>E(dt,{clsPrefix:e},{default:()=>E(Y4,null)})}):null,(this.showRemoveButton||this.showCancelButton)&&!this.disabled&&E(qn,{key:"cancelOrTrash",theme:t.peers.Button,themeOverrides:t.peerOverrides.Button,quaternary:!0,builtinThemeOverrides:ka,type:this.buttonType,onClick:this.handleRemoveOrCancelClick},{icon:()=>E(Kl,null,{default:()=>this.showRemoveButton?E(dt,{clsPrefix:e,key:"trash"},{default:()=>E(Z4,null)}):E(dt,{clsPrefix:e,key:"cancel"},{default:()=>E(Q4,null)})})}),this.showRetryButton&&!this.disabled&&E(qn,{key:"retry",quaternary:!0,type:this.buttonType,onClick:this.handleRetryClick,theme:t.peers.Button,themeOverrides:t.peerOverrides.Button,builtinThemeOverrides:ka},{icon:()=>E(dt,{clsPrefix:e},{default:()=>E(e6,null)})}),this.showDownloadButton?E(qn,{key:"download",quaternary:!0,type:this.buttonType,onClick:this.handleDownloadClick,theme:t.peers.Button,themeOverrides:t.peerOverrides.Button,builtinThemeOverrides:ka},{icon:()=>E(dt,{clsPrefix:e},{default:()=>E(J4,null)})}):null)),!s&&l)}}),aA=be({name:"UploadFileList",setup(e,{slots:t}){const r=Se(Mi,null);r||kn("upload-file-list","`n-upload-file-list` must be placed inside `n-upload`.");const{abstractRef:o,mergedClsPrefixRef:n,listTypeRef:i,mergedFileListRef:s,fileListStyleRef:a,cssVarsRef:l,themeClassRef:c,maxReachedRef:u,showTriggerRef:d,imageGroupPropsRef:f}=r,h=q(()=>i.value==="image-card"),p=()=>s.value.map(y=>E(sA,{clsPrefix:n.value,key:y.id,file:y,listType:i.value})),m=()=>h.value?E(sO,Object.assign({},f.value),{default:p}):E(ql,{group:!0},{default:p});return()=>{const{value:y}=n,{value:g}=o;return E("div",{class:[`${y}-upload-file-list`,h.value&&`${y}-upload-file-list--grid`,g?c==null?void 0:c.value:void 0],style:[g&&l?l.value:"",a.value]},m(),d.value&&!u.value&&h.value&&E(F1,null,t))}}}),lA=N([W("upload","width: 100%;",[re("dragger-inside",[W("upload-trigger",`
 display: block;
 `)]),re("drag-over",[W("upload-dragger",`
 border: var(--n-dragger-border-hover);
 `)])]),W("upload-dragger",`
 cursor: pointer;
 box-sizing: border-box;
 width: 100%;
 text-align: center;
 border-radius: var(--n-border-radius);
 padding: 24px;
 opacity: 1;
 transition:
 opacity .3s var(--n-bezier),
 border-color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 background-color: var(--n-dragger-color);
 border: var(--n-dragger-border);
 `,[N("&:hover",`
 border: var(--n-dragger-border-hover);
 `),re("disabled",`
 cursor: not-allowed;
 `)]),W("upload-trigger",`
 display: inline-block;
 box-sizing: border-box;
 opacity: 1;
 transition: opacity .3s var(--n-bezier);
 `,[N("+",[W("upload-file-list","margin-top: 8px;")]),re("disabled",`
 opacity: var(--n-item-disabled-opacity);
 cursor: not-allowed;
 `),re("image-card",`
 width: 96px;
 height: 96px;
 `,[W("base-icon",`
 font-size: 24px;
 `),W("upload-dragger",`
 padding: 0;
 height: 100%;
 width: 100%;
 display: flex;
 align-items: center;
 justify-content: center;
 `)])]),W("upload-file-list",`
 line-height: var(--n-line-height);
 opacity: 1;
 transition: opacity .3s var(--n-bezier);
 `,[N("a, img","outline: none;"),re("disabled",`
 opacity: var(--n-item-disabled-opacity);
 cursor: not-allowed;
 `,[W("upload-file","cursor: not-allowed;")]),re("grid",`
 display: grid;
 grid-template-columns: repeat(auto-fill, 96px);
 grid-gap: 8px;
 margin-top: 0;
 `),W("upload-file",`
 display: block;
 box-sizing: border-box;
 cursor: default;
 padding: 0px 12px 0 6px;
 transition: background-color .3s var(--n-bezier);
 border-radius: var(--n-border-radius);
 `,[Tu(),W("progress",[Tu({foldPadding:!0})]),N("&:hover",`
 background-color: var(--n-item-color-hover);
 `,[W("upload-file-info",[oe("action",`
 opacity: 1;
 `)])]),re("image-type",`
 border-radius: var(--n-border-radius);
 text-decoration: underline;
 text-decoration-color: #0000;
 `,[W("upload-file-info",`
 padding-top: 0px;
 padding-bottom: 0px;
 width: 100%;
 height: 100%;
 display: flex;
 justify-content: space-between;
 align-items: center;
 padding: 6px 0;
 `,[W("progress",`
 padding: 2px 0;
 margin-bottom: 0;
 `),oe("name",`
 padding: 0 8px;
 `),oe("thumbnail",`
 width: 32px;
 height: 32px;
 font-size: 28px;
 display: flex;
 justify-content: center;
 align-items: center;
 `,[N("img",`
 width: 100%;
 `)])])]),re("text-type",[W("progress",`
 box-sizing: border-box;
 padding-bottom: 6px;
 margin-bottom: 6px;
 `)]),re("image-card-type",`
 position: relative;
 width: 96px;
 height: 96px;
 border: var(--n-item-border-image-card);
 border-radius: var(--n-border-radius);
 padding: 0;
 display: flex;
 align-items: center;
 justify-content: center;
 transition: border-color .3s var(--n-bezier), background-color .3s var(--n-bezier);
 border-radius: var(--n-border-radius);
 overflow: hidden;
 `,[W("progress",`
 position: absolute;
 left: 8px;
 bottom: 8px;
 right: 8px;
 width: unset;
 `),W("upload-file-info",`
 padding: 0;
 width: 100%;
 height: 100%;
 `,[oe("thumbnail",`
 width: 100%;
 height: 100%;
 display: flex;
 flex-direction: column;
 align-items: center;
 justify-content: center;
 font-size: 36px;
 `,[N("img",`
 width: 100%;
 `)])]),N("&::before",`
 position: absolute;
 z-index: 1;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 border-radius: inherit;
 opacity: 0;
 transition: opacity .2s var(--n-bezier);
 content: "";
 `),N("&:hover",[N("&::before","opacity: 1;"),W("upload-file-info",[oe("thumbnail","opacity: .12;")])])]),re("error-status",[N("&:hover",`
 background-color: var(--n-item-color-hover-error);
 `),W("upload-file-info",[oe("name","color: var(--n-item-text-color-error);"),oe("thumbnail","color: var(--n-item-text-color-error);")]),re("image-card-type",`
 border: var(--n-item-border-image-card-error);
 `)]),re("with-url",`
 cursor: pointer;
 `,[W("upload-file-info",[oe("name",`
 color: var(--n-item-text-color-success);
 text-decoration-color: var(--n-item-text-color-success);
 `,[N("a",`
 text-decoration: underline;
 `)])])]),W("upload-file-info",`
 position: relative;
 padding-top: 6px;
 padding-bottom: 6px;
 display: flex;
 flex-wrap: nowrap;
 `,[oe("thumbnail",`
 font-size: 18px;
 opacity: 1;
 transition: opacity .2s var(--n-bezier);
 color: var(--n-item-icon-color);
 `,[W("base-icon",`
 margin-right: 2px;
 vertical-align: middle;
 transition: color .3s var(--n-bezier);
 `)]),oe("action",`
 padding-top: inherit;
 padding-bottom: inherit;
 position: absolute;
 right: 0;
 top: 0;
 bottom: 0;
 width: 80px;
 display: flex;
 align-items: center;
 transition: opacity .2s var(--n-bezier);
 justify-content: flex-end;
 opacity: 0;
 `,[W("button",[N("&:not(:last-child)",{marginRight:"4px"}),W("base-icon",[N("svg",[Ms()])])]),re("image-type",`
 position: relative;
 max-width: 80px;
 width: auto;
 `),re("image-card-type",`
 z-index: 2;
 position: absolute;
 width: 100%;
 height: 100%;
 left: 0;
 right: 0;
 bottom: 0;
 top: 0;
 display: flex;
 justify-content: center;
 align-items: center;
 `)]),oe("name",`
 color: var(--n-item-text-color);
 flex: 1;
 display: flex;
 justify-content: center;
 text-overflow: ellipsis;
 overflow: hidden;
 flex-direction: column;
 text-decoration-color: #0000;
 font-size: var(--n-font-size);
 transition:
 color .3s var(--n-bezier),
 text-decoration-color .3s var(--n-bezier); 
 `,[N("a",`
 color: inherit;
 text-decoration: underline;
 `)])])])]),W("upload-file-input",`
 display: block;
 width: 0;
 height: 0;
 opacity: 0;
 `)]);var zp=globalThis&&globalThis.__awaiter||function(e,t,r,o){function n(i){return i instanceof r?i:new r(function(s){s(i)})}return new(r||(r=Promise))(function(i,s){function a(u){try{c(o.next(u))}catch(d){s(d)}}function l(u){try{c(o.throw(u))}catch(d){s(d)}}function c(u){u.done?i(u.value):n(u.value).then(a,l)}c((o=o.apply(e,t||[])).next())})};function cA(e,t,r){const{doChange:o,xhrMap:n}=e;let i=0;function s(l){var c;let u=Object.assign({},t,{status:"error",percentage:i});n.delete(t.id),u=Ds(((c=e.onError)===null||c===void 0?void 0:c.call(e,{file:u,event:l}))||u),o(u,l)}function a(l){var c;if(e.isErrorState){if(e.isErrorState(r)){s(l);return}}else if(r.status<200||r.status>=300){s(l);return}let u=Object.assign({},t,{status:"finished",percentage:i});n.delete(t.id),u=Ds(((c=e.onFinish)===null||c===void 0?void 0:c.call(e,{file:u,event:l}))||u),o(u,l)}return{handleXHRLoad:a,handleXHRError:s,handleXHRAbort(l){const c=Object.assign({},t,{status:"removed",file:null,percentage:i});n.delete(t.id),o(c,l)},handleXHRProgress(l){const c=Object.assign({},t,{status:"uploading"});if(l.lengthComputable){const u=Math.ceil(l.loaded/l.total*100);c.percentage=u,i=u}o(c,l)}}}function uA(e){const{inst:t,file:r,data:o,headers:n,withCredentials:i,action:s,customRequest:a}=e,{doChange:l}=e.inst;let c=0;a({file:r,data:o,headers:n,withCredentials:i,action:s,onProgress(u){const d=Object.assign({},r,{status:"uploading"}),f=u.percent;d.percentage=f,c=f,l(d)},onFinish(){var u;let d=Object.assign({},r,{status:"finished",percentage:c});d=Ds(((u=t.onFinish)===null||u===void 0?void 0:u.call(t,{file:d}))||d),l(d)},onError(){var u;let d=Object.assign({},r,{status:"error",percentage:c});d=Ds(((u=t.onError)===null||u===void 0?void 0:u.call(t,{file:d}))||d),l(d)}})}function dA(e,t,r){const o=cA(e,t,r);r.onabort=o.handleXHRAbort,r.onerror=o.handleXHRError,r.onload=o.handleXHRLoad,r.upload&&(r.upload.onprogress=o.handleXHRProgress)}function N1(e,t){return typeof e=="function"?e({file:t}):e||{}}function fA(e,t,r){const o=N1(t,r);!o||Object.keys(o).forEach(n=>{e.setRequestHeader(n,o[n])})}function hA(e,t,r){const o=N1(t,r);!o||Object.keys(o).forEach(n=>{e.append(n,o[n])})}function pA(e,t,r,{method:o,action:n,withCredentials:i,responseType:s,headers:a,data:l}){const c=new XMLHttpRequest;c.responseType=s,e.xhrMap.set(r.id,c),c.withCredentials=i;const u=new FormData;if(hA(u,l,r),u.append(t,r.file),dA(e,r,c),n!==void 0){c.open(o.toUpperCase(),n),fA(c,a,r),c.send(u);const d=Object.assign({},r,{status:"uploading"});e.doChange(d)}}const gA=Object.assign(Object.assign({},Xe.props),{name:{type:String,default:"file"},accept:String,action:String,customRequest:Function,directory:Boolean,directoryDnd:{type:Boolean,default:void 0},method:{type:String,default:"POST"},multiple:Boolean,showFileList:{type:Boolean,default:!0},data:[Object,Function],headers:[Object,Function],withCredentials:Boolean,responseType:{type:String,default:""},disabled:{type:Boolean,default:void 0},onChange:Function,onRemove:Function,onFinish:Function,onError:Function,onBeforeUpload:Function,isErrorState:Function,onDownload:Function,defaultUpload:{type:Boolean,default:!0},fileList:Array,"onUpdate:fileList":[Function,Array],onUpdateFileList:[Function,Array],fileListStyle:[String,Object],defaultFileList:{type:Array,default:()=>[]},showCancelButton:{type:Boolean,default:!0},showRemoveButton:{type:Boolean,default:!0},showDownloadButton:Boolean,showRetryButton:{type:Boolean,default:!0},showPreviewButton:{type:Boolean,default:!0},listType:{type:String,default:"text"},onPreview:Function,shouldUseThumbnailUrl:{type:Function,default:e=>YO?z1(e):!1},createThumbnailUrl:Function,abstract:Boolean,max:Number,showTrigger:{type:Boolean,default:!0},imageGroupProps:Object,inputProps:Object,triggerStyle:[String,Object],renderIcon:Object}),mA=be({name:"Upload",props:gA,setup(e){e.abstract&&e.listType==="image-card"&&kn("upload","when the list-type is image-card, abstract is not supported.");const{mergedClsPrefixRef:t,inlineThemeDisabled:r}=kt(e),o=Xe("Upload","-upload",lA,$1,e,t),n=j0(e),i=q(()=>{const{max:k}=e;return k!==void 0?h.value.length>=k:!1}),s=K(e.defaultFileList),a=Be(e,"fileList"),l=K(null),c={value:!1},u=K(!1),d=new Map,f=_0(a,s),h=q(()=>f.value.map(Ds));function p(){var k;(k=l.value)===null||k===void 0||k.click()}function m(k){const I=k.target;w(I.files?Array.from(I.files).map(A=>({file:A,entry:null,source:"input"})):null,k),I.value=""}function y(k){const{"onUpdate:fileList":I,onUpdateFileList:A}=e;I&&or(I,k),A&&or(A,k),s.value=k}const g=q(()=>e.multiple||e.directory);function w(k,I){if(!k||k.length===0)return;const{onBeforeUpload:A}=e;k=g.value?k:[k[0]];const{max:R,accept:F}=e;k=k.filter(({file:J,source:Y})=>Y==="dnd"&&(F==null?void 0:F.trim())?eA(J.name,J.type,F):!0),R&&(k=k.slice(0,R-h.value.length));const H=_n();Promise.all(k.map(({file:J,entry:Y})=>zp(this,void 0,void 0,function*(){var Z;const se={id:_n(),batchId:H,name:J.name,status:"pending",percentage:0,file:J,url:null,type:J.type,thumbnailUrl:null,fullPath:(Z=Y==null?void 0:Y.fullPath)!==null&&Z!==void 0?Z:`/${J.webkitRelativePath||J.name}`};return!A||(yield A({file:se,fileList:h.value}))!==!1?se:null}))).then(J=>zp(this,void 0,void 0,function*(){let Y=Promise.resolve();return J.forEach(Z=>{Y=Y.then(zt).then(()=>{Z&&x(Z,I,{append:!0})})}),yield Y})).then(()=>{e.defaultUpload&&T()})}function T(k){const{method:I,action:A,withCredentials:R,headers:F,data:H,name:J}=e,Y=k!==void 0?h.value.filter(se=>se.id===k):h.value,Z=k!==void 0;Y.forEach(se=>{const{status:ve}=se;(ve==="pending"||ve==="error"&&Z)&&(e.customRequest?uA({inst:{doChange:x,xhrMap:d,onFinish:e.onFinish,onError:e.onError},file:se,action:A,withCredentials:R,headers:F,data:H,customRequest:e.customRequest}):pA({doChange:x,xhrMap:d,onFinish:e.onFinish,onError:e.onError,isErrorState:e.isErrorState},J,se,{method:I,action:A,withCredentials:R,responseType:e.responseType,headers:F,data:H}))})}const x=(k,I,A={append:!1,remove:!1})=>{const{append:R,remove:F}=A,H=Array.from(h.value),J=H.findIndex(Y=>Y.id===k.id);if(R||F||~J){R?H.push(k):F?H.splice(J,1):H.splice(J,1,k);const{onChange:Y}=e;Y&&Y({file:k,fileList:H,event:I}),y(H)}};function C(k){var I;if(k.thumbnailUrl)return k.thumbnailUrl;const{createThumbnailUrl:A}=e;return A?(I=A(k.file,k))!==null&&I!==void 0?I:k.url||"":k.url?k.url:k.file?XO(k.file):""}const $=q(()=>{const{common:{cubicBezierEaseInOut:k},self:{draggerColor:I,draggerBorder:A,draggerBorderHover:R,itemColorHover:F,itemColorHoverError:H,itemTextColorError:J,itemTextColorSuccess:Y,itemTextColor:Z,itemIconColor:se,itemDisabledOpacity:ve,lineHeight:Le,borderRadius:_e,fontSize:Ae,itemBorderImageCardError:ut,itemBorderImageCard:Ue}}=o.value;return{"--n-bezier":k,"--n-border-radius":_e,"--n-dragger-border":A,"--n-dragger-border-hover":R,"--n-dragger-color":I,"--n-font-size":Ae,"--n-item-color-hover":F,"--n-item-color-hover-error":H,"--n-item-disabled-opacity":ve,"--n-item-icon-color":se,"--n-item-text-color":Z,"--n-item-text-color-error":J,"--n-item-text-color-success":Y,"--n-line-height":Le,"--n-item-border-image-card-error":ut,"--n-item-border-image-card":Ue}}),S=r?br("upload",void 0,$,e):void 0;qe(Mi,{mergedClsPrefixRef:t,mergedThemeRef:o,showCancelButtonRef:Be(e,"showCancelButton"),showDownloadButtonRef:Be(e,"showDownloadButton"),showRemoveButtonRef:Be(e,"showRemoveButton"),showRetryButtonRef:Be(e,"showRetryButton"),onRemoveRef:Be(e,"onRemove"),onDownloadRef:Be(e,"onDownload"),mergedFileListRef:h,triggerStyleRef:Be(e,"triggerStyle"),shouldUseThumbnailUrlRef:Be(e,"shouldUseThumbnailUrl"),renderIconRef:Be(e,"renderIcon"),xhrMap:d,submit:T,doChange:x,showPreviewButtonRef:Be(e,"showPreviewButton"),onPreviewRef:Be(e,"onPreview"),getFileThumbnailUrlResolver:C,listTypeRef:Be(e,"listType"),dragOverRef:u,openOpenFileDialog:p,draggerInsideRef:c,handleFileAddition:w,mergedDisabledRef:n.mergedDisabledRef,maxReachedRef:i,fileListStyleRef:Be(e,"fileListStyle"),abstractRef:Be(e,"abstract"),acceptRef:Be(e,"accept"),cssVarsRef:r?void 0:$,themeClassRef:S==null?void 0:S.themeClass,onRender:S==null?void 0:S.onRender,showTriggerRef:Be(e,"showTrigger"),imageGroupPropsRef:Be(e,"imageGroupProps"),mergedDirectoryDndRef:q(()=>{var k;return(k=e.directoryDnd)!==null&&k!==void 0?k:e.directory})});const L={clear:()=>{s.value=[]},submit:T,openOpenFileDialog:p};return Object.assign({mergedClsPrefix:t,draggerInsideRef:c,inputElRef:l,mergedTheme:o,dragOver:u,mergedMultiple:g,cssVars:r?void 0:$,themeClass:S==null?void 0:S.themeClass,onRender:S==null?void 0:S.onRender,handleFileInputChange:m},L)},render(){var e,t;const{draggerInsideRef:r,mergedClsPrefix:o,$slots:n,directory:i,onRender:s}=this;if(n.default&&!this.abstract){const l=n.default()[0];!((e=l==null?void 0:l.type)===null||e===void 0)&&e[M1]&&(r.value=!0)}const a=E("input",Object.assign({},this.inputProps,{ref:"inputElRef",type:"file",class:`${o}-upload-file-input`,accept:this.accept,multiple:this.mergedMultiple,onChange:this.handleFileInputChange,webkitdirectory:i||void 0,directory:i||void 0}));return this.abstract?E(Qe,null,(t=n.default)===null||t===void 0?void 0:t.call(n),E(Ws,{to:"body"},a)):(s==null||s(),E("div",{class:[`${o}-upload`,r.value&&`${o}-upload--dragger-inside`,this.dragOver&&`${o}-upload--drag-over`,this.themeClass],style:this.cssVars},a,this.showTrigger&&this.listType!=="image-card"&&E(F1,null,n),this.showFileList&&E(aA,null,n)))}}),j1=()=>({}),bA={name:"Equation",common:ie,self:j1},vA=bA,yA={name:"Equation",common:ne,self:j1},xA=yA,CA={name:"dark",common:ne,Alert:Z6,Anchor:aP,AutoComplete:mP,Avatar:Qb,AvatarGroup:EP,BackTop:TP,Badge:IP,Breadcrumb:zP,Button:Zt,ButtonGroup:Mk,Calendar:ZP,Card:av,Carousel:fL,Cascader:yL,Checkbox:Bi,Code:dv,Collapse:TL,CollapseTransition:kL,ColorPicker:tL,DataTable:r8,DatePicker:m8,Descriptions:w8,Dialog:Dv,Divider:V8,Drawer:X8,Dropdown:Kd,DynamicInput:Z8,DynamicTags:ik,Element:ck,Empty:Bn,Ellipsis:Ev,Equation:xA,Form:mk,GradientText:vk,Icon:l8,IconWrapper:_k,Image:eO,Input:vr,InputNumber:Fk,LegacyTransfer:uO,Layout:Vk,List:Jk,LoadingBar:eI,Log:nI,Menu:bI,Mention:cI,Message:Ak,Modal:R8,Notification:kk,PageHeader:xI,Pagination:wv,Popconfirm:_I,Popover:Mn,Popselect:gv,Progress:u1,Radio:$v,Rate:LI,Result:HI,Row:QR,Scrollbar:Yt,Select:yv,Skeleton:VO,Slider:zI,Space:Gv,Spin:KI,Statistic:YI,Steps:tR,Switch:oR,Table:dR,Tabs:mR,Tag:Ub,Thing:xR,TimePicker:Av,Timeline:wR,Tooltip:Xl,Transfer:$R,Tree:E1,TreeSelect:AR,Typography:jR,Upload:VR,Watermark:qR},W1={name:"light",common:ie,Alert:eP,Anchor:iP,AutoComplete:pP,Avatar:Jb,AvatarGroup:wP,BackTop:LP,Badge:AP,Breadcrumb:HP,Button:jt,ButtonGroup:Dk,Calendar:XP,Card:Wd,Carousel:uL,Cascader:bL,Checkbox:Ai,Code:fv,Collapse:EL,CollapseTransition:PL,ColorPicker:QP,DataTable:e8,DatePicker:p8,Descriptions:x8,Dialog:qd,Divider:W8,Drawer:q8,Dropdown:Vd,DynamicInput:ek,DynamicTags:ak,Element:dk,Empty:uo,Equation:vA,Ellipsis:_v,Form:pk,GradientText:Ck,Icon:s8,IconWrapper:Sk,Image:Qv,Input:yr,InputNumber:Wk,Layout:Gk,LegacyTransfer:hO,List:Yk,LoadingBar:i1,Log:aI,Menu:gI,Mention:fI,Message:o1,Modal:Wv,Notification:t1,PageHeader:yI,Pagination:Cv,Popconfirm:SI,Popover:Go,Popselect:mv,Progress:Yd,Radio:Pv,Rate:RI,Row:ZR,Result:BI,Scrollbar:Nt,Skeleton:qO,Select:vv,Slider:jI,Space:Xv,Spin:UI,Statistic:GI,Steps:QI,Switch:sR,Table:cR,Tabs:pR,Tag:Vb,Thing:vR,TimePicker:Ov,Timeline:_R,Tooltip:Qs,Transfer:kR,Tree:S1,TreeSelect:HR,Typography:FR,Upload:$1,Watermark:XR};var Fp;const ea=typeof window<"u",wA=e=>typeof e=="function",SA=e=>typeof e=="string",ds=()=>{};ea&&((Fp=window==null?void 0:window.navigator)==null?void 0:Fp.userAgent)&&/iP(ad|hone|od)/.test(window.navigator.userAgent);function eo(e){return typeof e=="function"?e():hr(e)}function Jd(e,t){function r(...o){e(()=>t.apply(this,o),{fn:t,thisArg:this,args:o})}return r}const U1=e=>e();function EA(e,t={}){let r,o;return i=>{const s=eo(e),a=eo(t.maxWait);if(r&&clearTimeout(r),s<=0||a!==void 0&&a<=0)return o&&(clearTimeout(o),o=null),i();a&&!o&&(o=setTimeout(()=>{r&&clearTimeout(r),o=null,i()},a)),r=setTimeout(()=>{o&&clearTimeout(o),o=null,i()},s)}}function _A(e,t=!0,r=!0){let o=0,n,i=!0;const s=()=>{n&&(clearTimeout(n),n=void 0)};return l=>{const c=eo(e),u=Date.now()-o;if(s(),c<=0)return o=Date.now(),l();u>c&&(r||!i)?(o=Date.now(),l()):t&&(n=setTimeout(()=>{o=Date.now(),i=!0,s(),l()},c)),!r&&!n&&(n=setTimeout(()=>i=!0,c)),i=!1}}function TA(e=U1){const t=K(!0);function r(){t.value=!1}function o(){t.value=!0}return{isActive:t,pause:r,resume:o,eventFilter:(...i)=>{t.value&&e(...i)}}}function $A(e){return e}function PA(e){const t=Symbol("InjectionState");return[(...n)=>{qe(t,e(...n))},()=>Se(t)]}function V1(e){return fC()?(hC(e),!0):!1}function LA(e,t=200,r={}){return Jd(EA(t,r),e)}function kA(e,t=200,r=!1,o=!0){return Jd(_A(t,r,o),e)}function Qd(e,t=!0){gr()?Lt(e):t?e():zt(e)}var Np=Object.getOwnPropertySymbols,IA=Object.prototype.hasOwnProperty,RA=Object.prototype.propertyIsEnumerable,OA=(e,t)=>{var r={};for(var o in e)IA.call(e,o)&&t.indexOf(o)<0&&(r[o]=e[o]);if(e!=null&&Np)for(var o of Np(e))t.indexOf(o)<0&&RA.call(e,o)&&(r[o]=e[o]);return r};function AA(e,t,r={}){const o=r,{eventFilter:n=U1}=o,i=OA(o,["eventFilter"]);return et(e,Jd(n,t),i)}var BA=Object.defineProperty,MA=Object.defineProperties,HA=Object.getOwnPropertyDescriptors,fl=Object.getOwnPropertySymbols,K1=Object.prototype.hasOwnProperty,q1=Object.prototype.propertyIsEnumerable,jp=(e,t,r)=>t in e?BA(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,DA=(e,t)=>{for(var r in t||(t={}))K1.call(t,r)&&jp(e,r,t[r]);if(fl)for(var r of fl(t))q1.call(t,r)&&jp(e,r,t[r]);return e},zA=(e,t)=>MA(e,HA(t)),FA=(e,t)=>{var r={};for(var o in e)K1.call(e,o)&&t.indexOf(o)<0&&(r[o]=e[o]);if(e!=null&&fl)for(var o of fl(e))t.indexOf(o)<0&&q1.call(e,o)&&(r[o]=e[o]);return r};function NA(e,t,r={}){const o=r,{eventFilter:n}=o,i=FA(o,["eventFilter"]),{eventFilter:s,pause:a,resume:l,isActive:c}=TA(n);return{stop:AA(e,t,zA(DA({},i),{eventFilter:s})),pause:a,resume:l,isActive:c}}function Oo(e){var t;const r=eo(e);return(t=r==null?void 0:r.$el)!=null?t:r}const $n=ea?window:void 0;ea&&window.document;ea&&window.navigator;ea&&window.location;function Hr(...e){let t,r,o,n;if(SA(e[0])?([r,o,n]=e,t=$n):[t,r,o,n]=e,!t)return ds;let i=ds;const s=et(()=>Oo(t),l=>{i(),l&&(l.addEventListener(r,o,n),i=()=>{l.removeEventListener(r,o,n),i=ds})},{immediate:!0,flush:"post"}),a=()=>{s(),i()};return V1(a),a}function s9(e,t,r={}){const{window:o=$n,ignore:n,capture:i=!0,detectIframe:s=!1}=r;if(!o)return;const a=K(!0);let l;const c=h=>{o.clearTimeout(l);const p=Oo(e);!p||p===h.target||h.composedPath().includes(p)||!a.value||t(h)},u=h=>n&&n.some(p=>{const m=Oo(p);return m&&(h.target===m||h.composedPath().includes(m))}),d=[Hr(o,"click",c,{passive:!0,capture:i}),Hr(o,"pointerdown",h=>{const p=Oo(e);a.value=!!p&&!h.composedPath().includes(p)&&!u(h)},{passive:!0}),Hr(o,"pointerup",h=>{if(h.button===0){const p=h.composedPath();h.composedPath=()=>p,l=o.setTimeout(()=>c(h),50)}},{passive:!0}),s&&Hr(o,"blur",h=>{var p;const m=Oo(e);((p=document.activeElement)==null?void 0:p.tagName)==="IFRAME"&&!(m!=null&&m.contains(document.activeElement))&&t(h)})].filter(Boolean);return()=>d.forEach(h=>h())}function jA(e,t=!1){const r=K(),o=()=>r.value=Boolean(e());return o(),Qd(o,t),r}const $u=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},Pu="__vueuse_ssr_handlers__";$u[Pu]=$u[Pu]||{};const WA=$u[Pu];function UA(e,t){return WA[e]||t}function VA(e){return e==null?"any":e instanceof Set?"set":e instanceof Map?"map":e instanceof Date?"date":typeof e=="boolean"?"boolean":typeof e=="string"?"string":typeof e=="object"||Array.isArray(e)?"object":Number.isNaN(e)?"any":"number"}var KA=Object.defineProperty,Wp=Object.getOwnPropertySymbols,qA=Object.prototype.hasOwnProperty,GA=Object.prototype.propertyIsEnumerable,Up=(e,t,r)=>t in e?KA(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,Vp=(e,t)=>{for(var r in t||(t={}))qA.call(t,r)&&Up(e,r,t[r]);if(Wp)for(var r of Wp(t))GA.call(t,r)&&Up(e,r,t[r]);return e};const XA={boolean:{read:e=>e==="true",write:e=>String(e)},object:{read:e=>JSON.parse(e),write:e=>JSON.stringify(e)},number:{read:e=>Number.parseFloat(e),write:e=>String(e)},any:{read:e=>e,write:e=>String(e)},string:{read:e=>e,write:e=>String(e)},map:{read:e=>new Map(JSON.parse(e)),write:e=>JSON.stringify(Array.from(e.entries()))},set:{read:e=>new Set(JSON.parse(e)),write:e=>JSON.stringify(Array.from(e))},date:{read:e=>new Date(e),write:e=>e.toISOString()}};function YA(e,t,r,o={}){var n;const{flush:i="pre",deep:s=!0,listenToStorageChanges:a=!0,writeDefaults:l=!0,mergeDefaults:c=!1,shallow:u,window:d=$n,eventFilter:f,onError:h=S=>{console.error(S)}}=o,p=(u?ld:K)(t);if(!r)try{r=UA("getDefaultStorage",()=>{var S;return(S=$n)==null?void 0:S.localStorage})()}catch(S){h(S)}if(!r)return p;const m=eo(t),y=VA(m),g=(n=o.serializer)!=null?n:XA[y],{pause:w,resume:T}=NA(p,()=>x(p.value),{flush:i,deep:s,eventFilter:f});return d&&a&&Hr(d,"storage",$),$(),p;function x(S){try{S==null?r.removeItem(e):r.setItem(e,g.write(S))}catch(L){h(L)}}function C(S){w();try{const L=S?S.newValue:r.getItem(e);if(L==null)return l&&m!==null&&r.setItem(e,g.write(m)),m;if(!S&&c){const k=g.read(L);return wA(c)?c(k,m):y==="object"&&!Array.isArray(k)?Vp(Vp({},m),k):k}else return typeof L!="string"?L:g.read(L)}catch(L){h(L)}finally{T()}}function $(S){if(!(S&&S.storageArea!==r)){if(S&&S.key===null){p.value=m;return}S&&S.key!==e||(p.value=C(S))}}}var Kp=Object.getOwnPropertySymbols,ZA=Object.prototype.hasOwnProperty,JA=Object.prototype.propertyIsEnumerable,QA=(e,t)=>{var r={};for(var o in e)ZA.call(e,o)&&t.indexOf(o)<0&&(r[o]=e[o]);if(e!=null&&Kp)for(var o of Kp(e))t.indexOf(o)<0&&JA.call(e,o)&&(r[o]=e[o]);return r};function eB(e,t,r={}){const o=r,{window:n=$n}=o,i=QA(o,["window"]);let s;const a=jA(()=>n&&"ResizeObserver"in n),l=()=>{s&&(s.disconnect(),s=void 0)},c=et(()=>Oo(e),d=>{l(),a.value&&n&&d&&(s=new ResizeObserver(t),s.observe(d,i))},{immediate:!0,flush:"post"}),u=()=>{l(),c()};return V1(u),{isSupported:a,stop:u}}function a9(e,t={}){const{reset:r=!0,windowResize:o=!0,windowScroll:n=!0,immediate:i=!0}=t,s=K(0),a=K(0),l=K(0),c=K(0),u=K(0),d=K(0),f=K(0),h=K(0);function p(){const m=Oo(e);if(!m){r&&(s.value=0,a.value=0,l.value=0,c.value=0,u.value=0,d.value=0,f.value=0,h.value=0);return}const y=m.getBoundingClientRect();s.value=y.height,a.value=y.bottom,l.value=y.left,c.value=y.right,u.value=y.top,d.value=y.width,f.value=y.x,h.value=y.y}return eB(e,p),et(()=>Oo(e),m=>!m&&p()),n&&Hr("scroll",p,{passive:!0}),o&&Hr("resize",p,{passive:!0}),Qd(()=>{i&&p()}),{height:s,bottom:a,left:l,right:c,top:u,width:d,x:f,y:h,update:p}}const qp=1;function l9(e,t={}){const{throttle:r=0,idle:o=200,onStop:n=ds,onScroll:i=ds,offset:s={left:0,right:0,top:0,bottom:0},eventListenerOptions:a={capture:!1,passive:!0},behavior:l="auto"}=t,c=K(0),u=K(0),d=q({get(){return c.value},set(T){h(T,void 0)}}),f=q({get(){return u.value},set(T){h(void 0,T)}});function h(T,x){var C,$,S;const L=eo(e);!L||(S=L instanceof Document?document.body:L)==null||S.scrollTo({top:(C=eo(x))!=null?C:f.value,left:($=eo(T))!=null?$:d.value,behavior:eo(l)})}const p=K(!1),m=Gt({left:!0,right:!1,top:!0,bottom:!1}),y=Gt({left:!1,right:!1,top:!1,bottom:!1}),g=LA(T=>{p.value=!1,y.left=!1,y.right=!1,y.top=!1,y.bottom=!1,n(T)},r+o),w=T=>{const x=T.target===document?T.target.documentElement:T.target,C=x.scrollLeft;y.left=C<c.value,y.right=C>u.value,m.left=C<=0+(s.left||0),m.right=C+x.clientWidth>=x.scrollWidth-(s.right||0)-qp,c.value=C;let $=x.scrollTop;T.target===document&&!$&&($=document.body.scrollTop),y.top=$<u.value,y.bottom=$>u.value,m.top=$<=0+(s.top||0),m.bottom=$+x.clientHeight>=x.scrollHeight-(s.bottom||0)-qp,u.value=$,p.value=!0,g(T),i(T)};return Hr(e,"scroll",r?kA(w,r):w,a),{x:d,y:f,isScrolling:p,arrivedState:m,directions:y}}function G1(e,t,r={}){const{window:o=$n}=r;return YA(e,t,o==null?void 0:o.localStorage,r)}var Gp;(function(e){e.UP="UP",e.RIGHT="RIGHT",e.DOWN="DOWN",e.LEFT="LEFT",e.NONE="NONE"})(Gp||(Gp={}));var tB=Object.defineProperty,Xp=Object.getOwnPropertySymbols,rB=Object.prototype.hasOwnProperty,oB=Object.prototype.propertyIsEnumerable,Yp=(e,t,r)=>t in e?tB(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,nB=(e,t)=>{for(var r in t||(t={}))rB.call(t,r)&&Yp(e,r,t[r]);if(Xp)for(var r of Xp(t))oB.call(t,r)&&Yp(e,r,t[r]);return e};const iB={easeInSine:[.12,0,.39,0],easeOutSine:[.61,1,.88,1],easeInOutSine:[.37,0,.63,1],easeInQuad:[.11,0,.5,0],easeOutQuad:[.5,1,.89,1],easeInOutQuad:[.45,0,.55,1],easeInCubic:[.32,0,.67,0],easeOutCubic:[.33,1,.68,1],easeInOutCubic:[.65,0,.35,1],easeInQuart:[.5,0,.75,0],easeOutQuart:[.25,1,.5,1],easeInOutQuart:[.76,0,.24,1],easeInQuint:[.64,0,.78,0],easeOutQuint:[.22,1,.36,1],easeInOutQuint:[.83,0,.17,1],easeInExpo:[.7,0,.84,0],easeOutExpo:[.16,1,.3,1],easeInOutExpo:[.87,0,.13,1],easeInCirc:[.55,0,1,.45],easeOutCirc:[0,.55,.45,1],easeInOutCirc:[.85,0,.15,1],easeInBack:[.36,0,.66,-.56],easeOutBack:[.34,1.56,.64,1],easeInOutBack:[.68,-.6,.32,1.6]};nB({linear:$A},iB);function c9(e={}){const{window:t=$n,initialWidth:r=1/0,initialHeight:o=1/0,listenOrientation:n=!0,includeScrollbar:i=!0}=e,s=K(r),a=K(o),l=()=>{t&&(i?(s.value=t.innerWidth,a.value=t.innerHeight):(s.value=t.document.documentElement.clientWidth,a.value=t.document.documentElement.clientHeight))};return l(),Qd(l),Hr("resize",l,{passive:!0}),n&&Hr("orientationchange",l,{passive:!0}),{width:s,height:a}}const X1=[W1,CA],Lu=K(W1);let fs=G1("theme",0);function u9(){fs.value++,fs.value=fs.value%X1.length}et(fs,()=>{Lu.value=X1[fs.value]},{immediate:!0});const[sB,aB]=PA(()=>{const e=K(null);return{bufferOpt:e,setBufferOpt:t=>{e.value=t}}});function d9(e){const t=aB();Er(()=>{var o;const r=(o=e.value)==null?void 0:o.feat.loadBufferOpt;r!=null&&r.isLoading&&(t==null||t.setBufferOpt(r))}),Er(()=>{var o;const r=(o=e.value)==null?void 0:o.feat.refreshBufferOpt;r!=null&&r.isLoading&&(t==null||t.setBufferOpt(r))})}const lB=be({__name:"LoadProgressProvide",setup(e){return sB(),(t,r)=>md(t.$slots,"default")}});function f9(){return/(https?|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]*/g}function h9(){return/#\[(\d+)\]/g}function cB(){return/https:\/\/nostr.build\/i\/nostr.build_[a-zA-Z0-9]*(.[a-zA-Z]+)?/}const uB=G1("app-config",()=>({getOtherUrlsRequestLimitSize:50,localStorage:{kind10002:500,duration:1e3*60*60*24*7},eventCacheDuration:1e3*60*20,pullRelayConfig:{interval:1e3*60*60*24,debounce:1e3},stopHideLongArticles:!1,enablePapawTree:!1,enablePapawTreeLazyMode:!0,lazyDelayForPapaw:0,syncInterval:1e3*60,syncInterval1:1e3*60*5,syncInterval2:1e3*60*15,syncInterval3:1e3*60*45,syncInterval4:1e3*60*60,syncInterval5:1e3*60*60*3,syncInterval6:1e3*60*60*8,syncInterval7:1e3*60*60*24,syncInterval8:1e3*60*60*24*3,syncInterval9:1e3*60*60*24*7,autoPing:!0}),{deep:!0});let oi=null,ef=uB.value,tf=null,dB=null,Ho=null;function Ia(e){e.relayEmiter&&(tf=e.relayEmiter),e.relayPool&&(dB=e.relayPool),e.rootEventBeltline&&(Ho=e.rootEventBeltline),e.relayConfigurator&&(oi=e.relayConfigurator),e.config&&Object.assign(ef,e.config)}const hl={useMemoryCache:!0,useLocalStorage:!0,requestMerge:!0,cacheError:!0};function fB(e,t=36e5){return{value:e,updateTime:Date.now(),duration:t}}function hB(e){return`${e.updateTime},${e.duration}|${JSON.stringify(e.value)}`}function Jl(e){const t=pB(e,"|",15,36);if(t===-1)throw new Error("CacheString:Expecting a '|'");const[r,o]=e.slice(0,t).split(","),n=e.slice(t+1),i=parseInt(r),s=parseInt(o),a=JSON.parse(n);return{updateTime:i,duration:s,value:a}}function pB(e,t,r,o){e.length-1<o&&(o=e.length-1);for(let n=r;n<=o;n++)if(e[n]===t)return n;return-1}class gB{constructor(t){ye(this,"CACHE_LIST_KEY");ye(this,"cacheList");this.CACHE_LIST_KEY=t;const r=localStorage.getItem(t);if(!r){this.cacheList=new Set;return}const o=JSON.parse(r);if(!Array.isArray(o)){this.cacheList=new Set;return}this.cacheList=new Set(o)}addCacheKey(t){this.cacheList.add(t),this.reviseCacheList()}deleteCacheKey(t){this.cacheList.delete(t),this.reviseCacheList()}getCacheList(){return this.cacheList}reviseCacheList(){const t=JSON.stringify(Array.from(this.cacheList));localStorage.setItem(this.CACHE_LIST_KEY,t)}}const ta=new gB("__cache_key_list_");setTimeout(()=>{mB()});function mB(){const e=window.localStorage,t=ta.getCacheList();for(const r of t)try{const o=e.getItem(r);if(!o)continue;const n=Jl(o);if(!sf(n))continue;nf(n)}catch{e.removeItem(r)}}window.clearCache=bB;function bB(){const e=window.localStorage,t=ta.getCacheList();for(const r of t)try{const o=e.getItem(r);if(!o)continue;const n=Jl(o);if(!sf(n))continue;e.removeItem(r)}catch{}}window.clearCacheAll=vB;function vB(){const e=window.localStorage,t=e.length;for(let r=0;r<t;r++){const o=e.key(r);if(!o)continue;const n=e.getItem(o);if(!!n)try{const i=Jl(n);if(!sf(i))continue;e.removeItem(o)}catch{continue}}}var Hn={exports:{}},ni=typeof Reflect=="object"?Reflect:null,Zp=ni&&typeof ni.apply=="function"?ni.apply:function(t,r,o){return Function.prototype.apply.call(t,r,o)},Ga;ni&&typeof ni.ownKeys=="function"?Ga=ni.ownKeys:Object.getOwnPropertySymbols?Ga=function(t){return Object.getOwnPropertyNames(t).concat(Object.getOwnPropertySymbols(t))}:Ga=function(t){return Object.getOwnPropertyNames(t)};function yB(e){console&&console.warn&&console.warn(e)}var Y1=Number.isNaN||function(t){return t!==t};function Ye(){Ye.init.call(this)}Hn.exports=Ye;Hn.exports.once=SB;Ye.EventEmitter=Ye;Ye.prototype._events=void 0;Ye.prototype._eventsCount=0;Ye.prototype._maxListeners=void 0;var Jp=10;function Ql(e){if(typeof e!="function")throw new TypeError('The "listener" argument must be of type Function. Received type '+typeof e)}Object.defineProperty(Ye,"defaultMaxListeners",{enumerable:!0,get:function(){return Jp},set:function(e){if(typeof e!="number"||e<0||Y1(e))throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received '+e+".");Jp=e}});Ye.init=function(){(this._events===void 0||this._events===Object.getPrototypeOf(this)._events)&&(this._events=Object.create(null),this._eventsCount=0),this._maxListeners=this._maxListeners||void 0};Ye.prototype.setMaxListeners=function(t){if(typeof t!="number"||t<0||Y1(t))throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received '+t+".");return this._maxListeners=t,this};function Z1(e){return e._maxListeners===void 0?Ye.defaultMaxListeners:e._maxListeners}Ye.prototype.getMaxListeners=function(){return Z1(this)};Ye.prototype.emit=function(t){for(var r=[],o=1;o<arguments.length;o++)r.push(arguments[o]);var n=t==="error",i=this._events;if(i!==void 0)n=n&&i.error===void 0;else if(!n)return!1;if(n){var s;if(r.length>0&&(s=r[0]),s instanceof Error)throw s;var a=new Error("Unhandled error."+(s?" ("+s.message+")":""));throw a.context=s,a}var l=i[t];if(l===void 0)return!1;if(typeof l=="function")Zp(l,this,r);else for(var c=l.length,u=ry(l,c),o=0;o<c;++o)Zp(u[o],this,r);return!0};function J1(e,t,r,o){var n,i,s;if(Ql(r),i=e._events,i===void 0?(i=e._events=Object.create(null),e._eventsCount=0):(i.newListener!==void 0&&(e.emit("newListener",t,r.listener?r.listener:r),i=e._events),s=i[t]),s===void 0)s=i[t]=r,++e._eventsCount;else if(typeof s=="function"?s=i[t]=o?[r,s]:[s,r]:o?s.unshift(r):s.push(r),n=Z1(e),n>0&&s.length>n&&!s.warned){s.warned=!0;var a=new Error("Possible EventEmitter memory leak detected. "+s.length+" "+String(t)+" listeners added. Use emitter.setMaxListeners() to increase limit");a.name="MaxListenersExceededWarning",a.emitter=e,a.type=t,a.count=s.length,yB(a)}return e}Ye.prototype.addListener=function(t,r){return J1(this,t,r,!1)};Ye.prototype.on=Ye.prototype.addListener;Ye.prototype.prependListener=function(t,r){return J1(this,t,r,!0)};function xB(){if(!this.fired)return this.target.removeListener(this.type,this.wrapFn),this.fired=!0,arguments.length===0?this.listener.call(this.target):this.listener.apply(this.target,arguments)}function Q1(e,t,r){var o={fired:!1,wrapFn:void 0,target:e,type:t,listener:r},n=xB.bind(o);return n.listener=r,o.wrapFn=n,n}Ye.prototype.once=function(t,r){return Ql(r),this.on(t,Q1(this,t,r)),this};Ye.prototype.prependOnceListener=function(t,r){return Ql(r),this.prependListener(t,Q1(this,t,r)),this};Ye.prototype.removeListener=function(t,r){var o,n,i,s,a;if(Ql(r),n=this._events,n===void 0)return this;if(o=n[t],o===void 0)return this;if(o===r||o.listener===r)--this._eventsCount===0?this._events=Object.create(null):(delete n[t],n.removeListener&&this.emit("removeListener",t,o.listener||r));else if(typeof o!="function"){for(i=-1,s=o.length-1;s>=0;s--)if(o[s]===r||o[s].listener===r){a=o[s].listener,i=s;break}if(i<0)return this;i===0?o.shift():CB(o,i),o.length===1&&(n[t]=o[0]),n.removeListener!==void 0&&this.emit("removeListener",t,a||r)}return this};Ye.prototype.off=Ye.prototype.removeListener;Ye.prototype.removeAllListeners=function(t){var r,o,n;if(o=this._events,o===void 0)return this;if(o.removeListener===void 0)return arguments.length===0?(this._events=Object.create(null),this._eventsCount=0):o[t]!==void 0&&(--this._eventsCount===0?this._events=Object.create(null):delete o[t]),this;if(arguments.length===0){var i=Object.keys(o),s;for(n=0;n<i.length;++n)s=i[n],s!=="removeListener"&&this.removeAllListeners(s);return this.removeAllListeners("removeListener"),this._events=Object.create(null),this._eventsCount=0,this}if(r=o[t],typeof r=="function")this.removeListener(t,r);else if(r!==void 0)for(n=r.length-1;n>=0;n--)this.removeListener(t,r[n]);return this};function ey(e,t,r){var o=e._events;if(o===void 0)return[];var n=o[t];return n===void 0?[]:typeof n=="function"?r?[n.listener||n]:[n]:r?wB(n):ry(n,n.length)}Ye.prototype.listeners=function(t){return ey(this,t,!0)};Ye.prototype.rawListeners=function(t){return ey(this,t,!1)};Ye.listenerCount=function(e,t){return typeof e.listenerCount=="function"?e.listenerCount(t):ty.call(e,t)};Ye.prototype.listenerCount=ty;function ty(e){var t=this._events;if(t!==void 0){var r=t[e];if(typeof r=="function")return 1;if(r!==void 0)return r.length}return 0}Ye.prototype.eventNames=function(){return this._eventsCount>0?Ga(this._events):[]};function ry(e,t){for(var r=new Array(t),o=0;o<t;++o)r[o]=e[o];return r}function CB(e,t){for(;t+1<e.length;t++)e[t]=e[t+1];e.pop()}function wB(e){for(var t=new Array(e.length),r=0;r<t.length;++r)t[r]=e[r].listener||e[r];return t}function SB(e,t){return new Promise(function(r,o){function n(s){e.removeListener(t,i),o(s)}function i(){typeof e.removeListener=="function"&&e.removeListener("error",n),r([].slice.call(arguments))}oy(e,t,i,{once:!0}),t!=="error"&&EB(e,n,{once:!0})})}function EB(e,t,r){typeof e.on=="function"&&oy(e,"error",t,r)}function oy(e,t,r,o){if(typeof e.on=="function")o.once?e.once(t,r):e.on(t,r);else if(typeof e.addEventListener=="function")e.addEventListener(t,function n(i){o.once&&e.removeEventListener(t,n),r(i)});else throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type '+typeof e)}let rf={};const Un=new Hn.exports.EventEmitter;Un.setMaxListeners(1e3);function of(e,t,r=hl,...o){BB(r,hl);try{return iy(e,r)}catch{return _B(e,t,r,o)}}const Xa=Symbol("noCache"),Qp=Symbol("skip");function _B(e,t,r,o){const n=i=>(zs(e,i,r),i);return r.requestMerge?TB(e,t,r,o):ny(e,t,r,o,i=>i.then(n,r.cacheError?n:void 0))}function TB(e,t,r,o){const n=`res:${e}`,i=`rej:${e}`,s=c=>Un.emit(n,c),a=c=>Un.emit(i,c),l=()=>new Promise((c,u)=>{Un.once(n,c),Un.once(i,u)});return Un.listenerCount(n)>0?l():ny(e,t,r,o,c=>(c.then(u=>{zs(e,u,r),s(u)},u=>{r.cacheError&&zs(e,u,r),a(u)}),l()))}function ny(e,t,r,o,n){const i=t(...o);return MB(i)?n(i):(zs(e,i,r),i)}function iy(e,t=hl){try{if(!t.useMemoryCache)throw Qp;return $B(e)}catch{if(!t.useLocalStorage)throw Qp;return PB(e)}}function p9(e,t){try{return iy(e,t)}catch{return null}}function zs(e,t,r){const o=fB(t,r==null?void 0:r.duration);r!=null&&r.useMemoryCache&&OB(e,o),r!=null&&r.useLocalStorage&&AB(e,o)}function $B(e){const t=rf[e];return nf(t),t.value}function PB(e){const t=RB(e);try{const r=Jl(t);return nf(r),r.value}catch(r){throw ta.deleteCacheKey(e),r}}function LB(e){IB(e),kB(e)}function kB(e){delete rf[e]}function IB(e){ta.deleteCacheKey(e),localStorage.removeItem(e)}function RB(e){const t=localStorage.getItem(e);if(!t)throw Xa;return t}function OB(e,t){rf[e]=t}function AB(e,t){ta.addCacheKey(e),localStorage.setItem(e,hB(t))}function g9(e){localStorage.removeItem(e)}function nf(e){if(!e)throw Xa;const t=Date.now(),r=e.updateTime,o=e.duration;try{if(!(t-r<o))throw Xa}catch{throw Xa}}function sf(e){return!(!e||typeof e!="object"||typeof e.updateTime!="number"||typeof e.duration!="number")}function m9(e){if(navigator.clipboard)navigator.clipboard.writeText(e);else{var t=document.createElement("textarea");document.body.appendChild(t),t.style.position="fixed",t.style.clip="rect(0 0 0 0)",t.style.top="10px",t.value=e,t.select(),document.execCommand("copy",!0),document.body.removeChild(t)}}function eg(){return Math.floor(Date.now()/1e3)}function BB(e,t){var r;if(!e)return{...t};if(!t)return e;for(const o in t)(r=e[o])!=null||(e[o]=t[o]);return e}async function ku(e=0){return new Promise((t,r)=>{setTimeout(()=>{t()},e)})}function MB(e){return!!e&&typeof e.then=="function"}function HB(){return Math.random().toString().slice(2)}function sy(e,t=1e3,r=t*4){if(t<=0)return e;let o,n;const i=(...s)=>{clearTimeout(o),o=setTimeout(()=>{clearTimeout(n),e(...s)},t),n=setTimeout(()=>{clearTimeout(o),e(...s)},r)};return i.clear=()=>{clearTimeout(o)},i}function DB(e,t,...r){const o=e.length,n=a=>ay(e[a],r);if(t<n(0))return 0;if(t>n(o-1))return o;let i=0,s=o-1;for(;i<s;){let a=Math.floor(i+(s-i)/2);if(n(a)===t)return a;n(a)>t?s=a:i=a+1}return i}function zB(e,t,...r){const o=e.length,n=a=>ay(e[a],r);if(t>n(0))return 0;if(t<n(o-1))return o;let i=0,s=o-1;for(;i<s;){let a=Math.floor(i+(s-i)/2),l=n(a);if(l===t)return a;t>l?s=a:i=a+1}return s}function ay(e,t){return t.reduce((r,o)=>{if(r!==void 0)return r[o]},e)}function FB(e,t){const r=new Set;return t.forEach(o=>{!e.has(o)&&r.add(o)}),r}function NB(e,t){const r=e.indexOf(t);r!==-1&&e.splice(r,1)}function b9(...e){const t=new Set;for(const r of e)for(const o of r)t.add(o);return t}async function v9(e,t=2e3){const r=Date.now();return new Promise(async(o,n)=>{try{await fetch(`${window.location.protocol}//${e}/`,{mode:"no-cors"}),o(Date.now()-r)}catch(i){String(i).includes("Failed to fetch")?n("\u65E0\u6CD5\u8FDE\u63A5"):n("\u672A\u77E5\u539F\u56E0\u65E0\u6CD5\u8FDE\u63A5")}setTimeout(()=>{n(`\u8D85\u65F6:${Date.now()-r}`)},t)})}function jB(e,...t){for(const r of t)for(const o of r)e.add(o);return e}function y9(e,t,r=ef.syncInterval){if(r===0){t();return}of(JSON.stringify(e),()=>(t(),!0),{duration:r})}function WB(e){return e!==e}function x9(e){return typeof e=="number"&&!WB(e)}function C9(e,t,r){const o=UB(e,t,r);return`rgb(${o*255},${255-o*255},${255})`}function UB(e,t,r){return e>=r?1:e<=t?0:e/(r-t)}async function VB(e,t){return new Promise((r,o)=>{const n=new XMLHttpRequest;n.open(t.method,e),n.upload.onprogress=i=>{i.lengthComputable&&t.onProgress({percent:i.loaded/i.total*100})},n.onerror=i=>{o(i)},n.onabort=()=>{o("\u5DF2\u53D6\u6D88\u4E0A\u4F20")},n.upload.onabort=()=>{o("\u5DF2\u53D6\u6D88\u4E0A\u4F20")},n.onload=i=>{n.status===200&&r({text:i.target.responseText,event:i})},n.send(t.body)})}function w9(e=0){return{count:e,reduce(){this.count++},clear(){this.count=0},set(t){this.count=t}}}function S9(){return`#${Math.floor(Math.random()*16777216).toString(16).padStart(6,"0")}`}function KB(){return{isRun:!1,queue:[],run(){this.isRun=!0;const e=this.queue.pop();if(!e){this.isRun=!1;return}e(),setTimeout(()=>this.run())},unShift(e){this.queue.unshift(e),!this.isRun&&this.run()}}}const ly=new Hn.exports,cy=K(null),rs=K([]);function qB(){return cy}function GB(){return async e=>{var r;const t=rs.value;rs.value=[e],await ku(0),((r=cy.value)==null?void 0:r.submit).call(r),await ku(0),rs.value=t,rs.value.push(e)}}const ii=K(!1);function E9(){return{isShow:ii,show(){ii.value=!0},hidden(){ii.value=!1}}}const tg=void 0;function uy(){return et(ii,()=>{clearTimeout(tg)}),()=>{clearTimeout(tg),ii.value=!0,setTimeout(()=>{ii.value=!1},3e3)}}function _9(){const e=GB(),t=uy();return async r=>new Promise((o,n)=>{t();const i={id:HB(),name:r.name,file:r,status:"pending"};ly.once(i.id,s=>{o(s)}),e(i)})}function XB(){return rs}function YB(){const e=TO(),t=uy();return async({file:o,data:n,headers:i,withCredentials:s,action:a,onFinish:l,onError:c,onProgress:u})=>{const d=new FormData;d.append("fileToUpload",o.file),VB("https://nostr.build/upload.php",{method:"post",body:d,onProgress:u}).then(({text:h})=>{const p=h,m=cB()[Symbol.match](p);if(!m)return Promise.reject("\u6CA1\u6709\u627E\u5230url");const y=m[0];if(!y)return Promise.reject("");o.url=y,l(),ly.emit(o.id,{file:o,url:y}),e.success("\u4E0A\u4F20\u6210\u529F"),t()}).catch(h=>{e.error("\u4E0A\u4F20\u5931\u8D25",h),console.error("\u4E0A\u4F20\u5931\u8D25",h),c()})}}const ZB=be({__name:"UploadProvide",setup(e){const t=qB(),r=XB(),o=YB();return(n,i)=>{const s=mA;return vn(),yn(s,{abstract:"",ref_key:"uploadRef",ref:t,fileList:hr(r),"onUpdate:fileList":i[0]||(i[0]=a=>yt(r)?r.value=a:null),"show-preview-button":"","show-download-button":"","show-cancel-button":"","show-remove-button":"",customRequest:hr(o)},{default:Or(()=>[md(n.$slots,"default")]),_:3},8,["fileList","customRequest"])}}});/*!
  * vue-router v4.1.6
  * (c) 2022 Eduardo San Martin Morote
  * @license MIT
  */const Vn=typeof window<"u";function JB(e){return e.__esModule||e[Symbol.toStringTag]==="Module"}const Ke=Object.assign;function Hc(e,t){const r={};for(const o in t){const n=t[o];r[o]=Tr(n)?n.map(e):e(n)}return r}const hs=()=>{},Tr=Array.isArray,QB=/\/$/,eM=e=>e.replace(QB,"");function Dc(e,t,r="/"){let o,n={},i="",s="";const a=t.indexOf("#");let l=t.indexOf("?");return a<l&&a>=0&&(l=-1),l>-1&&(o=t.slice(0,l),i=t.slice(l+1,a>-1?a:t.length),n=e(i)),a>-1&&(o=o||t.slice(0,a),s=t.slice(a,t.length)),o=nM(o!=null?o:t,r),{fullPath:o+(i&&"?")+i+s,path:o,query:n,hash:s}}function tM(e,t){const r=t.query?e(t.query):"";return t.path+(r&&"?")+r+(t.hash||"")}function rg(e,t){return!t||!e.toLowerCase().startsWith(t.toLowerCase())?e:e.slice(t.length)||"/"}function rM(e,t,r){const o=t.matched.length-1,n=r.matched.length-1;return o>-1&&o===n&&mi(t.matched[o],r.matched[n])&&dy(t.params,r.params)&&e(t.query)===e(r.query)&&t.hash===r.hash}function mi(e,t){return(e.aliasOf||e)===(t.aliasOf||t)}function dy(e,t){if(Object.keys(e).length!==Object.keys(t).length)return!1;for(const r in e)if(!oM(e[r],t[r]))return!1;return!0}function oM(e,t){return Tr(e)?og(e,t):Tr(t)?og(t,e):e===t}function og(e,t){return Tr(t)?e.length===t.length&&e.every((r,o)=>r===t[o]):e.length===1&&e[0]===t}function nM(e,t){if(e.startsWith("/"))return e;if(!e)return t;const r=t.split("/"),o=e.split("/");let n=r.length-1,i,s;for(i=0;i<o.length;i++)if(s=o[i],s!==".")if(s==="..")n>1&&n--;else break;return r.slice(0,n).join("/")+"/"+o.slice(i-(i===o.length?1:0)).join("/")}var Fs;(function(e){e.pop="pop",e.push="push"})(Fs||(Fs={}));var ps;(function(e){e.back="back",e.forward="forward",e.unknown=""})(ps||(ps={}));function iM(e){if(!e)if(Vn){const t=document.querySelector("base");e=t&&t.getAttribute("href")||"/",e=e.replace(/^\w+:\/\/[^\/]+/,"")}else e="/";return e[0]!=="/"&&e[0]!=="#"&&(e="/"+e),eM(e)}const sM=/^[^#]+#/;function aM(e,t){return e.replace(sM,"#")+t}function lM(e,t){const r=document.documentElement.getBoundingClientRect(),o=e.getBoundingClientRect();return{behavior:t.behavior,left:o.left-r.left-(t.left||0),top:o.top-r.top-(t.top||0)}}const ec=()=>({left:window.pageXOffset,top:window.pageYOffset});function cM(e){let t;if("el"in e){const r=e.el,o=typeof r=="string"&&r.startsWith("#"),n=typeof r=="string"?o?document.getElementById(r.slice(1)):document.querySelector(r):r;if(!n)return;t=lM(n,e)}else t=e;"scrollBehavior"in document.documentElement.style?window.scrollTo(t):window.scrollTo(t.left!=null?t.left:window.pageXOffset,t.top!=null?t.top:window.pageYOffset)}function ng(e,t){return(history.state?history.state.position-t:-1)+e}const Iu=new Map;function uM(e,t){Iu.set(e,t)}function dM(e){const t=Iu.get(e);return Iu.delete(e),t}let fM=()=>location.protocol+"//"+location.host;function fy(e,t){const{pathname:r,search:o,hash:n}=t,i=e.indexOf("#");if(i>-1){let a=n.includes(e.slice(i))?e.slice(i).length:1,l=n.slice(a);return l[0]!=="/"&&(l="/"+l),rg(l,"")}return rg(r,e)+o+n}function hM(e,t,r,o){let n=[],i=[],s=null;const a=({state:f})=>{const h=fy(e,location),p=r.value,m=t.value;let y=0;if(f){if(r.value=h,t.value=f,s&&s===p){s=null;return}y=m?f.position-m.position:0}else o(h);n.forEach(g=>{g(r.value,p,{delta:y,type:Fs.pop,direction:y?y>0?ps.forward:ps.back:ps.unknown})})};function l(){s=r.value}function c(f){n.push(f);const h=()=>{const p=n.indexOf(f);p>-1&&n.splice(p,1)};return i.push(h),h}function u(){const{history:f}=window;!f.state||f.replaceState(Ke({},f.state,{scroll:ec()}),"")}function d(){for(const f of i)f();i=[],window.removeEventListener("popstate",a),window.removeEventListener("beforeunload",u)}return window.addEventListener("popstate",a),window.addEventListener("beforeunload",u),{pauseListeners:l,listen:c,destroy:d}}function ig(e,t,r,o=!1,n=!1){return{back:e,current:t,forward:r,replaced:o,position:window.history.length,scroll:n?ec():null}}function pM(e){const{history:t,location:r}=window,o={value:fy(e,r)},n={value:t.state};n.value||i(o.value,{back:null,current:o.value,forward:null,position:t.length-1,replaced:!0,scroll:null},!0);function i(l,c,u){const d=e.indexOf("#"),f=d>-1?(r.host&&document.querySelector("base")?e:e.slice(d))+l:fM()+e+l;try{t[u?"replaceState":"pushState"](c,"",f),n.value=c}catch(h){console.error(h),r[u?"replace":"assign"](f)}}function s(l,c){const u=Ke({},t.state,ig(n.value.back,l,n.value.forward,!0),c,{position:n.value.position});i(l,u,!0),o.value=l}function a(l,c){const u=Ke({},n.value,t.state,{forward:l,scroll:ec()});i(u.current,u,!0);const d=Ke({},ig(o.value,l,null),{position:u.position+1},c);i(l,d,!1),o.value=l}return{location:o,state:n,push:a,replace:s}}function gM(e){e=iM(e);const t=pM(e),r=hM(e,t.state,t.location,t.replace);function o(i,s=!0){s||r.pauseListeners(),history.go(i)}const n=Ke({location:"",base:e,go:o,createHref:aM.bind(null,e)},t,r);return Object.defineProperty(n,"location",{enumerable:!0,get:()=>t.location.value}),Object.defineProperty(n,"state",{enumerable:!0,get:()=>t.state.value}),n}function mM(e){return e=location.host?e||location.pathname+location.search:"",e.includes("#")||(e+="#"),gM(e)}function bM(e){return typeof e=="string"||e&&typeof e=="object"}function hy(e){return typeof e=="string"||typeof e=="symbol"}const vo={path:"/",name:void 0,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:void 0},py=Symbol("");var sg;(function(e){e[e.aborted=4]="aborted",e[e.cancelled=8]="cancelled",e[e.duplicated=16]="duplicated"})(sg||(sg={}));function bi(e,t){return Ke(new Error,{type:e,[py]:!0},t)}function Xr(e,t){return e instanceof Error&&py in e&&(t==null||!!(e.type&t))}const ag="[^/]+?",vM={sensitive:!1,strict:!1,start:!0,end:!0},yM=/[.+*?^${}()[\]/\\]/g;function xM(e,t){const r=Ke({},vM,t),o=[];let n=r.start?"^":"";const i=[];for(const c of e){const u=c.length?[]:[90];r.strict&&!c.length&&(n+="/");for(let d=0;d<c.length;d++){const f=c[d];let h=40+(r.sensitive?.25:0);if(f.type===0)d||(n+="/"),n+=f.value.replace(yM,"\\$&"),h+=40;else if(f.type===1){const{value:p,repeatable:m,optional:y,regexp:g}=f;i.push({name:p,repeatable:m,optional:y});const w=g||ag;if(w!==ag){h+=10;try{new RegExp(`(${w})`)}catch(x){throw new Error(`Invalid custom RegExp for param "${p}" (${w}): `+x.message)}}let T=m?`((?:${w})(?:/(?:${w}))*)`:`(${w})`;d||(T=y&&c.length<2?`(?:/${T})`:"/"+T),y&&(T+="?"),n+=T,h+=20,y&&(h+=-8),m&&(h+=-20),w===".*"&&(h+=-50)}u.push(h)}o.push(u)}if(r.strict&&r.end){const c=o.length-1;o[c][o[c].length-1]+=.7000000000000001}r.strict||(n+="/?"),r.end?n+="$":r.strict&&(n+="(?:/|$)");const s=new RegExp(n,r.sensitive?"":"i");function a(c){const u=c.match(s),d={};if(!u)return null;for(let f=1;f<u.length;f++){const h=u[f]||"",p=i[f-1];d[p.name]=h&&p.repeatable?h.split("/"):h}return d}function l(c){let u="",d=!1;for(const f of e){(!d||!u.endsWith("/"))&&(u+="/"),d=!1;for(const h of f)if(h.type===0)u+=h.value;else if(h.type===1){const{value:p,repeatable:m,optional:y}=h,g=p in c?c[p]:"";if(Tr(g)&&!m)throw new Error(`Provided param "${p}" is an array but it is not repeatable (* or + modifiers)`);const w=Tr(g)?g.join("/"):g;if(!w)if(y)f.length<2&&(u.endsWith("/")?u=u.slice(0,-1):d=!0);else throw new Error(`Missing required param "${p}"`);u+=w}}return u||"/"}return{re:s,score:o,keys:i,parse:a,stringify:l}}function CM(e,t){let r=0;for(;r<e.length&&r<t.length;){const o=t[r]-e[r];if(o)return o;r++}return e.length<t.length?e.length===1&&e[0]===40+40?-1:1:e.length>t.length?t.length===1&&t[0]===40+40?1:-1:0}function wM(e,t){let r=0;const o=e.score,n=t.score;for(;r<o.length&&r<n.length;){const i=CM(o[r],n[r]);if(i)return i;r++}if(Math.abs(n.length-o.length)===1){if(lg(o))return 1;if(lg(n))return-1}return n.length-o.length}function lg(e){const t=e[e.length-1];return e.length>0&&t[t.length-1]<0}const SM={type:0,value:""},EM=/[a-zA-Z0-9_]/;function _M(e){if(!e)return[[]];if(e==="/")return[[SM]];if(!e.startsWith("/"))throw new Error(`Invalid path "${e}"`);function t(h){throw new Error(`ERR (${r})/"${c}": ${h}`)}let r=0,o=r;const n=[];let i;function s(){i&&n.push(i),i=[]}let a=0,l,c="",u="";function d(){!c||(r===0?i.push({type:0,value:c}):r===1||r===2||r===3?(i.length>1&&(l==="*"||l==="+")&&t(`A repeatable param (${c}) must be alone in its segment. eg: '/:ids+.`),i.push({type:1,value:c,regexp:u,repeatable:l==="*"||l==="+",optional:l==="*"||l==="?"})):t("Invalid state to consume buffer"),c="")}function f(){c+=l}for(;a<e.length;){if(l=e[a++],l==="\\"&&r!==2){o=r,r=4;continue}switch(r){case 0:l==="/"?(c&&d(),s()):l===":"?(d(),r=1):f();break;case 4:f(),r=o;break;case 1:l==="("?r=2:EM.test(l)?f():(d(),r=0,l!=="*"&&l!=="?"&&l!=="+"&&a--);break;case 2:l===")"?u[u.length-1]=="\\"?u=u.slice(0,-1)+l:r=3:u+=l;break;case 3:d(),r=0,l!=="*"&&l!=="?"&&l!=="+"&&a--,u="";break;default:t("Unknown state");break}}return r===2&&t(`Unfinished custom RegExp for param "${c}"`),d(),s(),n}function TM(e,t,r){const o=xM(_M(e.path),r),n=Ke(o,{record:e,parent:t,children:[],alias:[]});return t&&!n.record.aliasOf==!t.record.aliasOf&&t.children.push(n),n}function $M(e,t){const r=[],o=new Map;t=dg({strict:!1,end:!0,sensitive:!1},t);function n(u){return o.get(u)}function i(u,d,f){const h=!f,p=PM(u);p.aliasOf=f&&f.record;const m=dg(t,u),y=[p];if("alias"in u){const T=typeof u.alias=="string"?[u.alias]:u.alias;for(const x of T)y.push(Ke({},p,{components:f?f.record.components:p.components,path:x,aliasOf:f?f.record:p}))}let g,w;for(const T of y){const{path:x}=T;if(d&&x[0]!=="/"){const C=d.record.path,$=C[C.length-1]==="/"?"":"/";T.path=d.record.path+(x&&$+x)}if(g=TM(T,d,m),f?f.alias.push(g):(w=w||g,w!==g&&w.alias.push(g),h&&u.name&&!ug(g)&&s(u.name)),p.children){const C=p.children;for(let $=0;$<C.length;$++)i(C[$],g,f&&f.children[$])}f=f||g,(g.record.components&&Object.keys(g.record.components).length||g.record.name||g.record.redirect)&&l(g)}return w?()=>{s(w)}:hs}function s(u){if(hy(u)){const d=o.get(u);d&&(o.delete(u),r.splice(r.indexOf(d),1),d.children.forEach(s),d.alias.forEach(s))}else{const d=r.indexOf(u);d>-1&&(r.splice(d,1),u.record.name&&o.delete(u.record.name),u.children.forEach(s),u.alias.forEach(s))}}function a(){return r}function l(u){let d=0;for(;d<r.length&&wM(u,r[d])>=0&&(u.record.path!==r[d].record.path||!gy(u,r[d]));)d++;r.splice(d,0,u),u.record.name&&!ug(u)&&o.set(u.record.name,u)}function c(u,d){let f,h={},p,m;if("name"in u&&u.name){if(f=o.get(u.name),!f)throw bi(1,{location:u});m=f.record.name,h=Ke(cg(d.params,f.keys.filter(w=>!w.optional).map(w=>w.name)),u.params&&cg(u.params,f.keys.map(w=>w.name))),p=f.stringify(h)}else if("path"in u)p=u.path,f=r.find(w=>w.re.test(p)),f&&(h=f.parse(p),m=f.record.name);else{if(f=d.name?o.get(d.name):r.find(w=>w.re.test(d.path)),!f)throw bi(1,{location:u,currentLocation:d});m=f.record.name,h=Ke({},d.params,u.params),p=f.stringify(h)}const y=[];let g=f;for(;g;)y.unshift(g.record),g=g.parent;return{name:m,path:p,params:h,matched:y,meta:kM(y)}}return e.forEach(u=>i(u)),{addRoute:i,resolve:c,removeRoute:s,getRoutes:a,getRecordMatcher:n}}function cg(e,t){const r={};for(const o of t)o in e&&(r[o]=e[o]);return r}function PM(e){return{path:e.path,redirect:e.redirect,name:e.name,meta:e.meta||{},aliasOf:void 0,beforeEnter:e.beforeEnter,props:LM(e),children:e.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:"components"in e?e.components||null:e.component&&{default:e.component}}}function LM(e){const t={},r=e.props||!1;if("component"in e)t.default=r;else for(const o in e.components)t[o]=typeof r=="boolean"?r:r[o];return t}function ug(e){for(;e;){if(e.record.aliasOf)return!0;e=e.parent}return!1}function kM(e){return e.reduce((t,r)=>Ke(t,r.meta),{})}function dg(e,t){const r={};for(const o in e)r[o]=o in t?t[o]:e[o];return r}function gy(e,t){return t.children.some(r=>r===e||gy(e,r))}const my=/#/g,IM=/&/g,RM=/\//g,OM=/=/g,AM=/\?/g,by=/\+/g,BM=/%5B/g,MM=/%5D/g,vy=/%5E/g,HM=/%60/g,yy=/%7B/g,DM=/%7C/g,xy=/%7D/g,zM=/%20/g;function af(e){return encodeURI(""+e).replace(DM,"|").replace(BM,"[").replace(MM,"]")}function FM(e){return af(e).replace(yy,"{").replace(xy,"}").replace(vy,"^")}function Ru(e){return af(e).replace(by,"%2B").replace(zM,"+").replace(my,"%23").replace(IM,"%26").replace(HM,"`").replace(yy,"{").replace(xy,"}").replace(vy,"^")}function NM(e){return Ru(e).replace(OM,"%3D")}function jM(e){return af(e).replace(my,"%23").replace(AM,"%3F")}function WM(e){return e==null?"":jM(e).replace(RM,"%2F")}function pl(e){try{return decodeURIComponent(""+e)}catch{}return""+e}function UM(e){const t={};if(e===""||e==="?")return t;const o=(e[0]==="?"?e.slice(1):e).split("&");for(let n=0;n<o.length;++n){const i=o[n].replace(by," "),s=i.indexOf("="),a=pl(s<0?i:i.slice(0,s)),l=s<0?null:pl(i.slice(s+1));if(a in t){let c=t[a];Tr(c)||(c=t[a]=[c]),c.push(l)}else t[a]=l}return t}function fg(e){let t="";for(let r in e){const o=e[r];if(r=NM(r),o==null){o!==void 0&&(t+=(t.length?"&":"")+r);continue}(Tr(o)?o.map(i=>i&&Ru(i)):[o&&Ru(o)]).forEach(i=>{i!==void 0&&(t+=(t.length?"&":"")+r,i!=null&&(t+="="+i))})}return t}function VM(e){const t={};for(const r in e){const o=e[r];o!==void 0&&(t[r]=Tr(o)?o.map(n=>n==null?null:""+n):o==null?o:""+o)}return t}const KM=Symbol(""),hg=Symbol(""),tc=Symbol(""),lf=Symbol(""),Ou=Symbol("");function qi(){let e=[];function t(o){return e.push(o),()=>{const n=e.indexOf(o);n>-1&&e.splice(n,1)}}function r(){e=[]}return{add:t,list:()=>e,reset:r}}function ko(e,t,r,o,n){const i=o&&(o.enterCallbacks[n]=o.enterCallbacks[n]||[]);return()=>new Promise((s,a)=>{const l=d=>{d===!1?a(bi(4,{from:r,to:t})):d instanceof Error?a(d):bM(d)?a(bi(2,{from:t,to:d})):(i&&o.enterCallbacks[n]===i&&typeof d=="function"&&i.push(d),s())},c=e.call(o&&o.instances[n],t,r,l);let u=Promise.resolve(c);e.length<3&&(u=u.then(l)),u.catch(d=>a(d))})}function zc(e,t,r,o){const n=[];for(const i of e)for(const s in i.components){let a=i.components[s];if(!(t!=="beforeRouteEnter"&&!i.instances[s]))if(qM(a)){const c=(a.__vccOpts||a)[t];c&&n.push(ko(c,r,o,i,s))}else{let l=a();n.push(()=>l.then(c=>{if(!c)return Promise.reject(new Error(`Couldn't resolve component "${s}" at "${i.path}"`));const u=JB(c)?c.default:c;i.components[s]=u;const f=(u.__vccOpts||u)[t];return f&&ko(f,r,o,i,s)()}))}}return n}function qM(e){return typeof e=="object"||"displayName"in e||"props"in e||"__vccOpts"in e}function pg(e){const t=Se(tc),r=Se(lf),o=q(()=>t.resolve(hr(e.to))),n=q(()=>{const{matched:l}=o.value,{length:c}=l,u=l[c-1],d=r.matched;if(!u||!d.length)return-1;const f=d.findIndex(mi.bind(null,u));if(f>-1)return f;const h=gg(l[c-2]);return c>1&&gg(u)===h&&d[d.length-1].path!==h?d.findIndex(mi.bind(null,l[c-2])):f}),i=q(()=>n.value>-1&&ZM(r.params,o.value.params)),s=q(()=>n.value>-1&&n.value===r.matched.length-1&&dy(r.params,o.value.params));function a(l={}){return YM(l)?t[hr(e.replace)?"replace":"push"](hr(e.to)).catch(hs):Promise.resolve()}return{route:o,href:q(()=>o.value.href),isActive:i,isExactActive:s,navigate:a}}const GM=be({name:"RouterLink",compatConfig:{MODE:3},props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:"page"}},useLink:pg,setup(e,{slots:t}){const r=Gt(pg(e)),{options:o}=Se(tc),n=q(()=>({[mg(e.activeClass,o.linkActiveClass,"router-link-active")]:r.isActive,[mg(e.exactActiveClass,o.linkExactActiveClass,"router-link-exact-active")]:r.isExactActive}));return()=>{const i=t.default&&t.default(r);return e.custom?i:E("a",{"aria-current":r.isExactActive?e.ariaCurrentValue:null,href:r.href,onClick:r.navigate,class:n.value},i)}}}),XM=GM;function YM(e){if(!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)&&!e.defaultPrevented&&!(e.button!==void 0&&e.button!==0)){if(e.currentTarget&&e.currentTarget.getAttribute){const t=e.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(t))return}return e.preventDefault&&e.preventDefault(),!0}}function ZM(e,t){for(const r in t){const o=t[r],n=e[r];if(typeof o=="string"){if(o!==n)return!1}else if(!Tr(n)||n.length!==o.length||o.some((i,s)=>i!==n[s]))return!1}return!0}function gg(e){return e?e.aliasOf?e.aliasOf.path:e.path:""}const mg=(e,t,r)=>e!=null?e:t!=null?t:r,JM=be({name:"RouterView",inheritAttrs:!1,props:{name:{type:String,default:"default"},route:Object},compatConfig:{MODE:3},setup(e,{attrs:t,slots:r}){const o=Se(Ou),n=q(()=>e.route||o.value),i=Se(hg,0),s=q(()=>{let c=hr(i);const{matched:u}=n.value;let d;for(;(d=u[c])&&!d.components;)c++;return c}),a=q(()=>n.value.matched[s.value]);qe(hg,q(()=>s.value+1)),qe(KM,a),qe(Ou,n);const l=K();return et(()=>[l.value,a.value,e.name],([c,u,d],[f,h,p])=>{u&&(u.instances[d]=c,h&&h!==u&&c&&c===f&&(u.leaveGuards.size||(u.leaveGuards=h.leaveGuards),u.updateGuards.size||(u.updateGuards=h.updateGuards))),c&&u&&(!h||!mi(u,h)||!f)&&(u.enterCallbacks[d]||[]).forEach(m=>m(c))},{flush:"post"}),()=>{const c=n.value,u=e.name,d=a.value,f=d&&d.components[u];if(!f)return bg(r.default,{Component:f,route:c});const h=d.props[u],p=h?h===!0?c.params:typeof h=="function"?h(c):h:null,y=E(f,Ke({},p,t,{onVnodeUnmounted:g=>{g.component.isUnmounted&&(d.instances[u]=null)},ref:l}));return bg(r.default,{Component:y,route:c})||y}}});function bg(e,t){if(!e)return null;const r=e(t);return r.length===1?r[0]:r}const QM=JM;function eH(e){const t=$M(e.routes,e),r=e.parseQuery||UM,o=e.stringifyQuery||fg,n=e.history,i=qi(),s=qi(),a=qi(),l=ld(vo);let c=vo;Vn&&e.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");const u=Hc.bind(null,j=>""+j),d=Hc.bind(null,WM),f=Hc.bind(null,pl);function h(j,Q){let te,de;return hy(j)?(te=t.getRecordMatcher(j),de=Q):de=j,t.addRoute(de,te)}function p(j){const Q=t.getRecordMatcher(j);Q&&t.removeRoute(Q)}function m(){return t.getRoutes().map(j=>j.record)}function y(j){return!!t.getRecordMatcher(j)}function g(j,Q){if(Q=Ke({},Q||l.value),typeof j=="string"){const _=Dc(r,j,Q.path),b=t.resolve({path:_.path},Q),v=n.createHref(_.fullPath);return Ke(_,b,{params:f(b.params),hash:pl(_.hash),redirectedFrom:void 0,href:v})}let te;if("path"in j)te=Ke({},j,{path:Dc(r,j.path,Q.path).path});else{const _=Ke({},j.params);for(const b in _)_[b]==null&&delete _[b];te=Ke({},j,{params:d(j.params)}),Q.params=d(Q.params)}const de=t.resolve(te,Q),ae=j.hash||"";de.params=u(f(de.params));const Te=tM(o,Ke({},j,{hash:FM(ae),path:de.path})),me=n.createHref(Te);return Ke({fullPath:Te,hash:ae,query:o===fg?VM(j.query):j.query||{}},de,{redirectedFrom:void 0,href:me})}function w(j){return typeof j=="string"?Dc(r,j,l.value.path):Ke({},j)}function T(j,Q){if(c!==j)return bi(8,{from:Q,to:j})}function x(j){return S(j)}function C(j){return x(Ke(w(j),{replace:!0}))}function $(j){const Q=j.matched[j.matched.length-1];if(Q&&Q.redirect){const{redirect:te}=Q;let de=typeof te=="function"?te(j):te;return typeof de=="string"&&(de=de.includes("?")||de.includes("#")?de=w(de):{path:de},de.params={}),Ke({query:j.query,hash:j.hash,params:"path"in de?{}:j.params},de)}}function S(j,Q){const te=c=g(j),de=l.value,ae=j.state,Te=j.force,me=j.replace===!0,_=$(te);if(_)return S(Ke(w(_),{state:typeof _=="object"?Ke({},ae,_.state):ae,force:Te,replace:me}),Q||te);const b=te;b.redirectedFrom=Q;let v;return!Te&&rM(o,de,te)&&(v=bi(16,{to:b,from:de}),Le(de,de,!0,!1)),(v?Promise.resolve(v):k(b,de)).catch(P=>Xr(P)?Xr(P,2)?P:ve(P):Z(P,b,de)).then(P=>{if(P){if(Xr(P,2))return S(Ke({replace:me},w(P.to),{state:typeof P.to=="object"?Ke({},ae,P.to.state):ae,force:Te}),Q||b)}else P=A(b,de,!0,me,ae);return I(b,de,P),P})}function L(j,Q){const te=T(j,Q);return te?Promise.reject(te):Promise.resolve()}function k(j,Q){let te;const[de,ae,Te]=tH(j,Q);te=zc(de.reverse(),"beforeRouteLeave",j,Q);for(const _ of de)_.leaveGuards.forEach(b=>{te.push(ko(b,j,Q))});const me=L.bind(null,j,Q);return te.push(me),jn(te).then(()=>{te=[];for(const _ of i.list())te.push(ko(_,j,Q));return te.push(me),jn(te)}).then(()=>{te=zc(ae,"beforeRouteUpdate",j,Q);for(const _ of ae)_.updateGuards.forEach(b=>{te.push(ko(b,j,Q))});return te.push(me),jn(te)}).then(()=>{te=[];for(const _ of j.matched)if(_.beforeEnter&&!Q.matched.includes(_))if(Tr(_.beforeEnter))for(const b of _.beforeEnter)te.push(ko(b,j,Q));else te.push(ko(_.beforeEnter,j,Q));return te.push(me),jn(te)}).then(()=>(j.matched.forEach(_=>_.enterCallbacks={}),te=zc(Te,"beforeRouteEnter",j,Q),te.push(me),jn(te))).then(()=>{te=[];for(const _ of s.list())te.push(ko(_,j,Q));return te.push(me),jn(te)}).catch(_=>Xr(_,8)?_:Promise.reject(_))}function I(j,Q,te){for(const de of a.list())de(j,Q,te)}function A(j,Q,te,de,ae){const Te=T(j,Q);if(Te)return Te;const me=Q===vo,_=Vn?history.state:{};te&&(de||me?n.replace(j.fullPath,Ke({scroll:me&&_&&_.scroll},ae)):n.push(j.fullPath,ae)),l.value=j,Le(j,Q,te,me),ve()}let R;function F(){R||(R=n.listen((j,Q,te)=>{if(!Ue.listening)return;const de=g(j),ae=$(de);if(ae){S(Ke(ae,{replace:!0}),de).catch(hs);return}c=de;const Te=l.value;Vn&&uM(ng(Te.fullPath,te.delta),ec()),k(de,Te).catch(me=>Xr(me,12)?me:Xr(me,2)?(S(me.to,de).then(_=>{Xr(_,20)&&!te.delta&&te.type===Fs.pop&&n.go(-1,!1)}).catch(hs),Promise.reject()):(te.delta&&n.go(-te.delta,!1),Z(me,de,Te))).then(me=>{me=me||A(de,Te,!1),me&&(te.delta&&!Xr(me,8)?n.go(-te.delta,!1):te.type===Fs.pop&&Xr(me,20)&&n.go(-1,!1)),I(de,Te,me)}).catch(hs)}))}let H=qi(),J=qi(),Y;function Z(j,Q,te){ve(j);const de=J.list();return de.length?de.forEach(ae=>ae(j,Q,te)):console.error(j),Promise.reject(j)}function se(){return Y&&l.value!==vo?Promise.resolve():new Promise((j,Q)=>{H.add([j,Q])})}function ve(j){return Y||(Y=!j,F(),H.list().forEach(([Q,te])=>j?te(j):Q()),H.reset()),j}function Le(j,Q,te,de){const{scrollBehavior:ae}=e;if(!Vn||!ae)return Promise.resolve();const Te=!te&&dM(ng(j.fullPath,0))||(de||!te)&&history.state&&history.state.scroll||null;return zt().then(()=>ae(j,Q,Te)).then(me=>me&&cM(me)).catch(me=>Z(me,j,Q))}const _e=j=>n.go(j);let Ae;const ut=new Set,Ue={currentRoute:l,listening:!0,addRoute:h,removeRoute:p,hasRoute:y,getRoutes:m,resolve:g,options:e,push:x,replace:C,go:_e,back:()=>_e(-1),forward:()=>_e(1),beforeEach:i.add,beforeResolve:s.add,afterEach:a.add,onError:J.add,isReady:se,install(j){const Q=this;j.component("RouterLink",XM),j.component("RouterView",QM),j.config.globalProperties.$router=Q,Object.defineProperty(j.config.globalProperties,"$route",{enumerable:!0,get:()=>hr(l)}),Vn&&!Ae&&l.value===vo&&(Ae=!0,x(n.location).catch(ae=>{}));const te={};for(const ae in vo)te[ae]=q(()=>l.value[ae]);j.provide(tc,Q),j.provide(lf,Gt(te)),j.provide(Ou,l);const de=j.unmount;ut.add(j),j.unmount=function(){ut.delete(j),ut.size<1&&(c=vo,R&&R(),R=null,l.value=vo,Ae=!1,Y=!1),de()}}};return Ue}function jn(e){return e.reduce((t,r)=>t.then(()=>r()),Promise.resolve())}function tH(e,t){const r=[],o=[],n=[],i=Math.max(t.matched.length,e.matched.length);for(let s=0;s<i;s++){const a=t.matched[s];a&&(e.matched.find(c=>mi(c,a))?o.push(a):r.push(a));const l=e.matched[s];l&&(t.matched.find(c=>mi(c,l))||n.push(l))}return[r,o,n]}function rH(){return Se(tc)}function T9(){return Se(lf)}const oH=be({__name:"Main",setup(e){const t=rH(),r=vO();return t.beforeEach(()=>{r.start()}),t.afterEach(()=>{r.finish()}),(o,n)=>{const i=fw("router-view");return vn(),yn(i,null,{default:Or(({Component:s})=>[(vn(),yn(iw,null,[(vn(),yn(hw(s)))],1024))]),_:1})}}});const Cy=(e,t)=>{const r=e.__vccOpts||e;for(const[o,n]of t)r[o]=n;return r},nH=Cy(oH,[["__scopeId","data-v-f0e70ca7"]]),iH={class:"container"},sH={class:"w-full h-screen overflow-hidden"},aH=be({__name:"App",setup(e){return logger.for("app.vue").info("\u8FDB\u5165app.vue"),(t,r)=>{const o=bO,n=MO,i=_O,s=N8;return vn(),yn(hr(RL),{theme:hr(Lu)},{default:Or(()=>{var a;return[ss("div",{class:"body",style:$i({backgroundColor:(a=hr(Lu))==null?void 0:a.common.bodyColor})},[ss("div",iH,[ss("div",sH,[ct(s,null,{default:Or(()=>[ct(i,null,{default:Or(()=>[ct(n,{placement:"bottom"},{default:Or(()=>[ct(o,null,{default:Or(()=>[ct(lB,null,{default:Or(()=>[ct(ZB,null,{default:Or(()=>[ct(nH)]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})])])],4)]}),_:1},8,["theme"])}}});const lH=Cy(aH,[["__scopeId","data-v-08c8a36b"]]),cH="modulepreload",uH=function(e,t){return new URL(e,t).href},vg={},Ze=function(t,r,o){if(!r||r.length===0)return t();const n=document.getElementsByTagName("link");return Promise.all(r.map(i=>{if(i=uH(i,o),i in vg)return;vg[i]=!0;const s=i.endsWith(".css"),a=s?'[rel="stylesheet"]':"";if(!!o)for(let u=n.length-1;u>=0;u--){const d=n[u];if(d.href===i&&(!s||d.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${i}"]${a}`))return;const c=document.createElement("link");if(c.rel=s?"stylesheet":cH,s||(c.as="script",c.crossOrigin=""),c.href=i,document.head.appendChild(c),s)return new Promise((u,d)=>{c.addEventListener("load",u),c.addEventListener("error",()=>d(new Error(`Unable to preload CSS for ${i}`)))})})).then(()=>t())},dH=(e,t)=>{const r=e[t];return r?typeof r=="function"?r():Promise.resolve(r):new Promise((o,n)=>{(typeof queueMicrotask=="function"?queueMicrotask:setTimeout)(n.bind(null,new Error("Unknown variable dynamic import: "+t)))})};/*!
  * shared v9.2.2
  * (c) 2022 kazuya kawaguchi
  * Released under the MIT License.
  */const fH=typeof window<"u",hH=typeof Symbol=="function"&&typeof Symbol.toStringTag=="symbol",Xo=e=>hH?Symbol(e):e,pH=(e,t,r)=>gH({l:e,k:t,s:r}),gH=e=>JSON.stringify(e).replace(/\u2028/g,"\\u2028").replace(/\u2029/g,"\\u2029").replace(/\u0027/g,"\\u0027"),_t=e=>typeof e=="number"&&isFinite(e),mH=e=>uf(e)==="[object Date]",Uo=e=>uf(e)==="[object RegExp]",rc=e=>Pe(e)&&Object.keys(e).length===0;function bH(e,t){typeof console<"u"&&(console.warn("[intlify] "+e),t&&console.warn(t.stack))}const $t=Object.assign;function yg(e){return e.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&apos;")}const vH=Object.prototype.hasOwnProperty;function cf(e,t){return vH.call(e,t)}const rt=Array.isArray,gt=e=>typeof e=="function",fe=e=>typeof e=="string",Fe=e=>typeof e=="boolean",ot=e=>e!==null&&typeof e=="object",wy=Object.prototype.toString,uf=e=>wy.call(e),Pe=e=>uf(e)==="[object Object]",yH=e=>e==null?"":rt(e)||Pe(e)&&e.toString===wy?JSON.stringify(e,null,2):String(e);/*!
  * message-compiler v9.2.2
  * (c) 2022 kazuya kawaguchi
  * Released under the MIT License.
  */const je={EXPECTED_TOKEN:1,INVALID_TOKEN_IN_PLACEHOLDER:2,UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER:3,UNKNOWN_ESCAPE_SEQUENCE:4,INVALID_UNICODE_ESCAPE_SEQUENCE:5,UNBALANCED_CLOSING_BRACE:6,UNTERMINATED_CLOSING_BRACE:7,EMPTY_PLACEHOLDER:8,NOT_ALLOW_NEST_PLACEHOLDER:9,INVALID_LINKED_FORMAT:10,MUST_HAVE_MESSAGES_IN_PLURAL:11,UNEXPECTED_EMPTY_LINKED_MODIFIER:12,UNEXPECTED_EMPTY_LINKED_KEY:13,UNEXPECTED_LEXICAL_ANALYSIS:14,__EXTEND_POINT__:15};function oc(e,t,r={}){const{domain:o,messages:n,args:i}=r,s=e,a=new SyntaxError(String(s));return a.code=e,t&&(a.location=t),a.domain=o,a}function xH(e){throw e}function CH(e,t,r){return{line:e,column:t,offset:r}}function Au(e,t,r){const o={start:e,end:t};return r!=null&&(o.source=r),o}const Yr=" ",wH="\r",Dt=`
`,SH=String.fromCharCode(8232),EH=String.fromCharCode(8233);function _H(e){const t=e;let r=0,o=1,n=1,i=0;const s=S=>t[S]===wH&&t[S+1]===Dt,a=S=>t[S]===Dt,l=S=>t[S]===EH,c=S=>t[S]===SH,u=S=>s(S)||a(S)||l(S)||c(S),d=()=>r,f=()=>o,h=()=>n,p=()=>i,m=S=>s(S)||l(S)||c(S)?Dt:t[S],y=()=>m(r),g=()=>m(r+i);function w(){return i=0,u(r)&&(o++,n=0),s(r)&&r++,r++,n++,t[r]}function T(){return s(r+i)&&i++,i++,t[r+i]}function x(){r=0,o=1,n=1,i=0}function C(S=0){i=S}function $(){const S=r+i;for(;S!==r;)w();i=0}return{index:d,line:f,column:h,peekOffset:p,charAt:m,currentChar:y,currentPeek:g,next:w,peek:T,reset:x,resetPeek:C,skipToPeek:$}}const yo=void 0,xg="'",TH="tokenizer";function $H(e,t={}){const r=t.location!==!1,o=_H(e),n=()=>o.index(),i=()=>CH(o.line(),o.column(),o.index()),s=i(),a=n(),l={currentType:14,offset:a,startLoc:s,endLoc:s,lastType:14,lastOffset:a,lastStartLoc:s,lastEndLoc:s,braceNest:0,inLinked:!1,text:""},c=()=>l,{onError:u}=t;function d(b,v,P,...O){const M=c();if(v.column+=P,v.offset+=P,u){const V=Au(M.startLoc,v),X=oc(b,V,{domain:TH,args:O});u(X)}}function f(b,v,P){b.endLoc=i(),b.currentType=v;const O={type:v};return r&&(O.loc=Au(b.startLoc,b.endLoc)),P!=null&&(O.value=P),O}const h=b=>f(b,14);function p(b,v){return b.currentChar()===v?(b.next(),v):(d(je.EXPECTED_TOKEN,i(),0,v),"")}function m(b){let v="";for(;b.currentPeek()===Yr||b.currentPeek()===Dt;)v+=b.currentPeek(),b.peek();return v}function y(b){const v=m(b);return b.skipToPeek(),v}function g(b){if(b===yo)return!1;const v=b.charCodeAt(0);return v>=97&&v<=122||v>=65&&v<=90||v===95}function w(b){if(b===yo)return!1;const v=b.charCodeAt(0);return v>=48&&v<=57}function T(b,v){const{currentType:P}=v;if(P!==2)return!1;m(b);const O=g(b.currentPeek());return b.resetPeek(),O}function x(b,v){const{currentType:P}=v;if(P!==2)return!1;m(b);const O=b.currentPeek()==="-"?b.peek():b.currentPeek(),M=w(O);return b.resetPeek(),M}function C(b,v){const{currentType:P}=v;if(P!==2)return!1;m(b);const O=b.currentPeek()===xg;return b.resetPeek(),O}function $(b,v){const{currentType:P}=v;if(P!==8)return!1;m(b);const O=b.currentPeek()===".";return b.resetPeek(),O}function S(b,v){const{currentType:P}=v;if(P!==9)return!1;m(b);const O=g(b.currentPeek());return b.resetPeek(),O}function L(b,v){const{currentType:P}=v;if(!(P===8||P===12))return!1;m(b);const O=b.currentPeek()===":";return b.resetPeek(),O}function k(b,v){const{currentType:P}=v;if(P!==10)return!1;const O=()=>{const V=b.currentPeek();return V==="{"?g(b.peek()):V==="@"||V==="%"||V==="|"||V===":"||V==="."||V===Yr||!V?!1:V===Dt?(b.peek(),O()):g(V)},M=O();return b.resetPeek(),M}function I(b){m(b);const v=b.currentPeek()==="|";return b.resetPeek(),v}function A(b){const v=m(b),P=b.currentPeek()==="%"&&b.peek()==="{";return b.resetPeek(),{isModulo:P,hasSpace:v.length>0}}function R(b,v=!0){const P=(M=!1,V="",X=!1)=>{const U=b.currentPeek();return U==="{"?V==="%"?!1:M:U==="@"||!U?V==="%"?!0:M:U==="%"?(b.peek(),P(M,"%",!0)):U==="|"?V==="%"||X?!0:!(V===Yr||V===Dt):U===Yr?(b.peek(),P(!0,Yr,X)):U===Dt?(b.peek(),P(!0,Dt,X)):!0},O=P();return v&&b.resetPeek(),O}function F(b,v){const P=b.currentChar();return P===yo?yo:v(P)?(b.next(),P):null}function H(b){return F(b,P=>{const O=P.charCodeAt(0);return O>=97&&O<=122||O>=65&&O<=90||O>=48&&O<=57||O===95||O===36})}function J(b){return F(b,P=>{const O=P.charCodeAt(0);return O>=48&&O<=57})}function Y(b){return F(b,P=>{const O=P.charCodeAt(0);return O>=48&&O<=57||O>=65&&O<=70||O>=97&&O<=102})}function Z(b){let v="",P="";for(;v=J(b);)P+=v;return P}function se(b){y(b);const v=b.currentChar();return v!=="%"&&d(je.EXPECTED_TOKEN,i(),0,v),b.next(),"%"}function ve(b){let v="";for(;;){const P=b.currentChar();if(P==="{"||P==="}"||P==="@"||P==="|"||!P)break;if(P==="%")if(R(b))v+=P,b.next();else break;else if(P===Yr||P===Dt)if(R(b))v+=P,b.next();else{if(I(b))break;v+=P,b.next()}else v+=P,b.next()}return v}function Le(b){y(b);let v="",P="";for(;v=H(b);)P+=v;return b.currentChar()===yo&&d(je.UNTERMINATED_CLOSING_BRACE,i(),0),P}function _e(b){y(b);let v="";return b.currentChar()==="-"?(b.next(),v+=`-${Z(b)}`):v+=Z(b),b.currentChar()===yo&&d(je.UNTERMINATED_CLOSING_BRACE,i(),0),v}function Ae(b){y(b),p(b,"'");let v="",P="";const O=V=>V!==xg&&V!==Dt;for(;v=F(b,O);)v==="\\"?P+=ut(b):P+=v;const M=b.currentChar();return M===Dt||M===yo?(d(je.UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER,i(),0),M===Dt&&(b.next(),p(b,"'")),P):(p(b,"'"),P)}function ut(b){const v=b.currentChar();switch(v){case"\\":case"'":return b.next(),`\\${v}`;case"u":return Ue(b,v,4);case"U":return Ue(b,v,6);default:return d(je.UNKNOWN_ESCAPE_SEQUENCE,i(),0,v),""}}function Ue(b,v,P){p(b,v);let O="";for(let M=0;M<P;M++){const V=Y(b);if(!V){d(je.INVALID_UNICODE_ESCAPE_SEQUENCE,i(),0,`\\${v}${O}${b.currentChar()}`);break}O+=V}return`\\${v}${O}`}function j(b){y(b);let v="",P="";const O=M=>M!=="{"&&M!=="}"&&M!==Yr&&M!==Dt;for(;v=F(b,O);)P+=v;return P}function Q(b){let v="",P="";for(;v=H(b);)P+=v;return P}function te(b){const v=(P=!1,O)=>{const M=b.currentChar();return M==="{"||M==="%"||M==="@"||M==="|"||!M||M===Yr?O:M===Dt?(O+=M,b.next(),v(P,O)):(O+=M,b.next(),v(!0,O))};return v(!1,"")}function de(b){y(b);const v=p(b,"|");return y(b),v}function ae(b,v){let P=null;switch(b.currentChar()){case"{":return v.braceNest>=1&&d(je.NOT_ALLOW_NEST_PLACEHOLDER,i(),0),b.next(),P=f(v,2,"{"),y(b),v.braceNest++,P;case"}":return v.braceNest>0&&v.currentType===2&&d(je.EMPTY_PLACEHOLDER,i(),0),b.next(),P=f(v,3,"}"),v.braceNest--,v.braceNest>0&&y(b),v.inLinked&&v.braceNest===0&&(v.inLinked=!1),P;case"@":return v.braceNest>0&&d(je.UNTERMINATED_CLOSING_BRACE,i(),0),P=Te(b,v)||h(v),v.braceNest=0,P;default:let M=!0,V=!0,X=!0;if(I(b))return v.braceNest>0&&d(je.UNTERMINATED_CLOSING_BRACE,i(),0),P=f(v,1,de(b)),v.braceNest=0,v.inLinked=!1,P;if(v.braceNest>0&&(v.currentType===5||v.currentType===6||v.currentType===7))return d(je.UNTERMINATED_CLOSING_BRACE,i(),0),v.braceNest=0,me(b,v);if(M=T(b,v))return P=f(v,5,Le(b)),y(b),P;if(V=x(b,v))return P=f(v,6,_e(b)),y(b),P;if(X=C(b,v))return P=f(v,7,Ae(b)),y(b),P;if(!M&&!V&&!X)return P=f(v,13,j(b)),d(je.INVALID_TOKEN_IN_PLACEHOLDER,i(),0,P.value),y(b),P;break}return P}function Te(b,v){const{currentType:P}=v;let O=null;const M=b.currentChar();switch((P===8||P===9||P===12||P===10)&&(M===Dt||M===Yr)&&d(je.INVALID_LINKED_FORMAT,i(),0),M){case"@":return b.next(),O=f(v,8,"@"),v.inLinked=!0,O;case".":return y(b),b.next(),f(v,9,".");case":":return y(b),b.next(),f(v,10,":");default:return I(b)?(O=f(v,1,de(b)),v.braceNest=0,v.inLinked=!1,O):$(b,v)||L(b,v)?(y(b),Te(b,v)):S(b,v)?(y(b),f(v,12,Q(b))):k(b,v)?(y(b),M==="{"?ae(b,v)||O:f(v,11,te(b))):(P===8&&d(je.INVALID_LINKED_FORMAT,i(),0),v.braceNest=0,v.inLinked=!1,me(b,v))}}function me(b,v){let P={type:14};if(v.braceNest>0)return ae(b,v)||h(v);if(v.inLinked)return Te(b,v)||h(v);switch(b.currentChar()){case"{":return ae(b,v)||h(v);case"}":return d(je.UNBALANCED_CLOSING_BRACE,i(),0),b.next(),f(v,3,"}");case"@":return Te(b,v)||h(v);default:if(I(b))return P=f(v,1,de(b)),v.braceNest=0,v.inLinked=!1,P;const{isModulo:M,hasSpace:V}=A(b);if(M)return V?f(v,0,ve(b)):f(v,4,se(b));if(R(b))return f(v,0,ve(b));break}return P}function _(){const{currentType:b,offset:v,startLoc:P,endLoc:O}=l;return l.lastType=b,l.lastOffset=v,l.lastStartLoc=P,l.lastEndLoc=O,l.offset=n(),l.startLoc=i(),o.currentChar()===yo?f(l,14):me(o,l)}return{nextToken:_,currentOffset:n,currentPosition:i,context:c}}const PH="parser",LH=/(?:\\\\|\\'|\\u([0-9a-fA-F]{4})|\\U([0-9a-fA-F]{6}))/g;function kH(e,t,r){switch(e){case"\\\\":return"\\";case"\\'":return"'";default:{const o=parseInt(t||r,16);return o<=55295||o>=57344?String.fromCodePoint(o):"\uFFFD"}}}function IH(e={}){const t=e.location!==!1,{onError:r}=e;function o(g,w,T,x,...C){const $=g.currentPosition();if($.offset+=x,$.column+=x,r){const S=Au(T,$),L=oc(w,S,{domain:PH,args:C});r(L)}}function n(g,w,T){const x={type:g,start:w,end:w};return t&&(x.loc={start:T,end:T}),x}function i(g,w,T,x){g.end=w,x&&(g.type=x),t&&g.loc&&(g.loc.end=T)}function s(g,w){const T=g.context(),x=n(3,T.offset,T.startLoc);return x.value=w,i(x,g.currentOffset(),g.currentPosition()),x}function a(g,w){const T=g.context(),{lastOffset:x,lastStartLoc:C}=T,$=n(5,x,C);return $.index=parseInt(w,10),g.nextToken(),i($,g.currentOffset(),g.currentPosition()),$}function l(g,w){const T=g.context(),{lastOffset:x,lastStartLoc:C}=T,$=n(4,x,C);return $.key=w,g.nextToken(),i($,g.currentOffset(),g.currentPosition()),$}function c(g,w){const T=g.context(),{lastOffset:x,lastStartLoc:C}=T,$=n(9,x,C);return $.value=w.replace(LH,kH),g.nextToken(),i($,g.currentOffset(),g.currentPosition()),$}function u(g){const w=g.nextToken(),T=g.context(),{lastOffset:x,lastStartLoc:C}=T,$=n(8,x,C);return w.type!==12?(o(g,je.UNEXPECTED_EMPTY_LINKED_MODIFIER,T.lastStartLoc,0),$.value="",i($,x,C),{nextConsumeToken:w,node:$}):(w.value==null&&o(g,je.UNEXPECTED_LEXICAL_ANALYSIS,T.lastStartLoc,0,Ir(w)),$.value=w.value||"",i($,g.currentOffset(),g.currentPosition()),{node:$})}function d(g,w){const T=g.context(),x=n(7,T.offset,T.startLoc);return x.value=w,i(x,g.currentOffset(),g.currentPosition()),x}function f(g){const w=g.context(),T=n(6,w.offset,w.startLoc);let x=g.nextToken();if(x.type===9){const C=u(g);T.modifier=C.node,x=C.nextConsumeToken||g.nextToken()}switch(x.type!==10&&o(g,je.UNEXPECTED_LEXICAL_ANALYSIS,w.lastStartLoc,0,Ir(x)),x=g.nextToken(),x.type===2&&(x=g.nextToken()),x.type){case 11:x.value==null&&o(g,je.UNEXPECTED_LEXICAL_ANALYSIS,w.lastStartLoc,0,Ir(x)),T.key=d(g,x.value||"");break;case 5:x.value==null&&o(g,je.UNEXPECTED_LEXICAL_ANALYSIS,w.lastStartLoc,0,Ir(x)),T.key=l(g,x.value||"");break;case 6:x.value==null&&o(g,je.UNEXPECTED_LEXICAL_ANALYSIS,w.lastStartLoc,0,Ir(x)),T.key=a(g,x.value||"");break;case 7:x.value==null&&o(g,je.UNEXPECTED_LEXICAL_ANALYSIS,w.lastStartLoc,0,Ir(x)),T.key=c(g,x.value||"");break;default:o(g,je.UNEXPECTED_EMPTY_LINKED_KEY,w.lastStartLoc,0);const C=g.context(),$=n(7,C.offset,C.startLoc);return $.value="",i($,C.offset,C.startLoc),T.key=$,i(T,C.offset,C.startLoc),{nextConsumeToken:x,node:T}}return i(T,g.currentOffset(),g.currentPosition()),{node:T}}function h(g){const w=g.context(),T=w.currentType===1?g.currentOffset():w.offset,x=w.currentType===1?w.endLoc:w.startLoc,C=n(2,T,x);C.items=[];let $=null;do{const k=$||g.nextToken();switch($=null,k.type){case 0:k.value==null&&o(g,je.UNEXPECTED_LEXICAL_ANALYSIS,w.lastStartLoc,0,Ir(k)),C.items.push(s(g,k.value||""));break;case 6:k.value==null&&o(g,je.UNEXPECTED_LEXICAL_ANALYSIS,w.lastStartLoc,0,Ir(k)),C.items.push(a(g,k.value||""));break;case 5:k.value==null&&o(g,je.UNEXPECTED_LEXICAL_ANALYSIS,w.lastStartLoc,0,Ir(k)),C.items.push(l(g,k.value||""));break;case 7:k.value==null&&o(g,je.UNEXPECTED_LEXICAL_ANALYSIS,w.lastStartLoc,0,Ir(k)),C.items.push(c(g,k.value||""));break;case 8:const I=f(g);C.items.push(I.node),$=I.nextConsumeToken||null;break}}while(w.currentType!==14&&w.currentType!==1);const S=w.currentType===1?w.lastOffset:g.currentOffset(),L=w.currentType===1?w.lastEndLoc:g.currentPosition();return i(C,S,L),C}function p(g,w,T,x){const C=g.context();let $=x.items.length===0;const S=n(1,w,T);S.cases=[],S.cases.push(x);do{const L=h(g);$||($=L.items.length===0),S.cases.push(L)}while(C.currentType!==14);return $&&o(g,je.MUST_HAVE_MESSAGES_IN_PLURAL,T,0),i(S,g.currentOffset(),g.currentPosition()),S}function m(g){const w=g.context(),{offset:T,startLoc:x}=w,C=h(g);return w.currentType===14?C:p(g,T,x,C)}function y(g){const w=$H(g,$t({},e)),T=w.context(),x=n(0,T.offset,T.startLoc);return t&&x.loc&&(x.loc.source=g),x.body=m(w),T.currentType!==14&&o(w,je.UNEXPECTED_LEXICAL_ANALYSIS,T.lastStartLoc,0,g[T.offset]||""),i(x,w.currentOffset(),w.currentPosition()),x}return{parse:y}}function Ir(e){if(e.type===14)return"EOF";const t=(e.value||"").replace(/\r?\n/gu,"\\n");return t.length>10?t.slice(0,9)+"\u2026":t}function RH(e,t={}){const r={ast:e,helpers:new Set};return{context:()=>r,helper:i=>(r.helpers.add(i),i)}}function Cg(e,t){for(let r=0;r<e.length;r++)df(e[r],t)}function df(e,t){switch(e.type){case 1:Cg(e.cases,t),t.helper("plural");break;case 2:Cg(e.items,t);break;case 6:df(e.key,t),t.helper("linked"),t.helper("type");break;case 5:t.helper("interpolate"),t.helper("list");break;case 4:t.helper("interpolate"),t.helper("named");break}}function OH(e,t={}){const r=RH(e);r.helper("normalize"),e.body&&df(e.body,r);const o=r.context();e.helpers=Array.from(o.helpers)}function AH(e,t){const{sourceMap:r,filename:o,breakLineCode:n,needIndent:i}=t,s={source:e.loc.source,filename:o,code:"",column:1,line:1,offset:0,map:void 0,breakLineCode:n,needIndent:i,indentLevel:0},a=()=>s;function l(m,y){s.code+=m}function c(m,y=!0){const g=y?n:"";l(i?g+"  ".repeat(m):g)}function u(m=!0){const y=++s.indentLevel;m&&c(y)}function d(m=!0){const y=--s.indentLevel;m&&c(y)}function f(){c(s.indentLevel)}return{context:a,push:l,indent:u,deindent:d,newline:f,helper:m=>`_${m}`,needIndent:()=>s.needIndent}}function BH(e,t){const{helper:r}=e;e.push(`${r("linked")}(`),vi(e,t.key),t.modifier?(e.push(", "),vi(e,t.modifier),e.push(", _type")):e.push(", undefined, _type"),e.push(")")}function MH(e,t){const{helper:r,needIndent:o}=e;e.push(`${r("normalize")}([`),e.indent(o());const n=t.items.length;for(let i=0;i<n&&(vi(e,t.items[i]),i!==n-1);i++)e.push(", ");e.deindent(o()),e.push("])")}function HH(e,t){const{helper:r,needIndent:o}=e;if(t.cases.length>1){e.push(`${r("plural")}([`),e.indent(o());const n=t.cases.length;for(let i=0;i<n&&(vi(e,t.cases[i]),i!==n-1);i++)e.push(", ");e.deindent(o()),e.push("])")}}function DH(e,t){t.body?vi(e,t.body):e.push("null")}function vi(e,t){const{helper:r}=e;switch(t.type){case 0:DH(e,t);break;case 1:HH(e,t);break;case 2:MH(e,t);break;case 6:BH(e,t);break;case 8:e.push(JSON.stringify(t.value),t);break;case 7:e.push(JSON.stringify(t.value),t);break;case 5:e.push(`${r("interpolate")}(${r("list")}(${t.index}))`,t);break;case 4:e.push(`${r("interpolate")}(${r("named")}(${JSON.stringify(t.key)}))`,t);break;case 9:e.push(JSON.stringify(t.value),t);break;case 3:e.push(JSON.stringify(t.value),t);break}}const zH=(e,t={})=>{const r=fe(t.mode)?t.mode:"normal",o=fe(t.filename)?t.filename:"message.intl",n=!!t.sourceMap,i=t.breakLineCode!=null?t.breakLineCode:r==="arrow"?";":`
`,s=t.needIndent?t.needIndent:r!=="arrow",a=e.helpers||[],l=AH(e,{mode:r,filename:o,sourceMap:n,breakLineCode:i,needIndent:s});l.push(r==="normal"?"function __msg__ (ctx) {":"(ctx) => {"),l.indent(s),a.length>0&&(l.push(`const { ${a.map(d=>`${d}: _${d}`).join(", ")} } = ctx`),l.newline()),l.push("return "),vi(l,e),l.deindent(s),l.push("}");const{code:c,map:u}=l.context();return{ast:e,code:c,map:u?u.toJSON():void 0}};function FH(e,t={}){const r=$t({},t),n=IH(r).parse(e);return OH(n,r),zH(n,r)}/*!
  * devtools-if v9.2.2
  * (c) 2022 kazuya kawaguchi
  * Released under the MIT License.
  */const NH={I18nInit:"i18n:init",FunctionTranslate:"function:translate"};/*!
  * core-base v9.2.2
  * (c) 2022 kazuya kawaguchi
  * Released under the MIT License.
  */const Yo=[];Yo[0]={w:[0],i:[3,0],["["]:[4],o:[7]};Yo[1]={w:[1],["."]:[2],["["]:[4],o:[7]};Yo[2]={w:[2],i:[3,0],[0]:[3,0]};Yo[3]={i:[3,0],[0]:[3,0],w:[1,1],["."]:[2,1],["["]:[4,1],o:[7,1]};Yo[4]={["'"]:[5,0],['"']:[6,0],["["]:[4,2],["]"]:[1,3],o:8,l:[4,0]};Yo[5]={["'"]:[4,0],o:8,l:[5,0]};Yo[6]={['"']:[4,0],o:8,l:[6,0]};const jH=/^\s?(?:true|false|-?[\d.]+|'[^']*'|"[^"]*")\s?$/;function WH(e){return jH.test(e)}function UH(e){const t=e.charCodeAt(0),r=e.charCodeAt(e.length-1);return t===r&&(t===34||t===39)?e.slice(1,-1):e}function VH(e){if(e==null)return"o";switch(e.charCodeAt(0)){case 91:case 93:case 46:case 34:case 39:return e;case 95:case 36:case 45:return"i";case 9:case 10:case 13:case 160:case 65279:case 8232:case 8233:return"w"}return"i"}function KH(e){const t=e.trim();return e.charAt(0)==="0"&&isNaN(parseInt(e))?!1:WH(t)?UH(t):"*"+t}function qH(e){const t=[];let r=-1,o=0,n=0,i,s,a,l,c,u,d;const f=[];f[0]=()=>{s===void 0?s=a:s+=a},f[1]=()=>{s!==void 0&&(t.push(s),s=void 0)},f[2]=()=>{f[0](),n++},f[3]=()=>{if(n>0)n--,o=4,f[0]();else{if(n=0,s===void 0||(s=KH(s),s===!1))return!1;f[1]()}};function h(){const p=e[r+1];if(o===5&&p==="'"||o===6&&p==='"')return r++,a="\\"+p,f[0](),!0}for(;o!==null;)if(r++,i=e[r],!(i==="\\"&&h())){if(l=VH(i),d=Yo[o],c=d[l]||d.l||8,c===8||(o=c[0],c[1]!==void 0&&(u=f[c[1]],u&&(a=i,u()===!1))))return;if(o===7)return t}}const wg=new Map;function GH(e,t){return ot(e)?e[t]:null}function XH(e,t){if(!ot(e))return null;let r=wg.get(t);if(r||(r=qH(t),r&&wg.set(t,r)),!r)return null;const o=r.length;let n=e,i=0;for(;i<o;){const s=n[r[i]];if(s===void 0)return null;n=s,i++}return n}const YH=e=>e,ZH=e=>"",JH="text",QH=e=>e.length===0?"":e.join(""),eD=yH;function Sg(e,t){return e=Math.abs(e),t===2?e?e>1?1:0:1:e?Math.min(e,2):0}function tD(e){const t=_t(e.pluralIndex)?e.pluralIndex:-1;return e.named&&(_t(e.named.count)||_t(e.named.n))?_t(e.named.count)?e.named.count:_t(e.named.n)?e.named.n:t:t}function rD(e,t){t.count||(t.count=e),t.n||(t.n=e)}function oD(e={}){const t=e.locale,r=tD(e),o=ot(e.pluralRules)&&fe(t)&&gt(e.pluralRules[t])?e.pluralRules[t]:Sg,n=ot(e.pluralRules)&&fe(t)&&gt(e.pluralRules[t])?Sg:void 0,i=g=>g[o(r,g.length,n)],s=e.list||[],a=g=>s[g],l=e.named||{};_t(e.pluralIndex)&&rD(r,l);const c=g=>l[g];function u(g){const w=gt(e.messages)?e.messages(g):ot(e.messages)?e.messages[g]:!1;return w||(e.parent?e.parent.message(g):ZH)}const d=g=>e.modifiers?e.modifiers[g]:YH,f=Pe(e.processor)&&gt(e.processor.normalize)?e.processor.normalize:QH,h=Pe(e.processor)&&gt(e.processor.interpolate)?e.processor.interpolate:eD,p=Pe(e.processor)&&fe(e.processor.type)?e.processor.type:JH,y={list:a,named:c,plural:i,linked:(g,...w)=>{const[T,x]=w;let C="text",$="";w.length===1?ot(T)?($=T.modifier||$,C=T.type||C):fe(T)&&($=T||$):w.length===2&&(fe(T)&&($=T||$),fe(x)&&(C=x||C));let S=u(g)(y);return C==="vnode"&&rt(S)&&$&&(S=S[0]),$?d($)(S,C):S},message:u,type:p,interpolate:h,normalize:f};return y}let nD=null;NH.FunctionTranslate;function iD(e){return t=>nD}const sD={NOT_FOUND_KEY:1,FALLBACK_TO_TRANSLATE:2,CANNOT_FORMAT_NUMBER:3,FALLBACK_TO_NUMBER_FORMAT:4,CANNOT_FORMAT_DATE:5,FALLBACK_TO_DATE_FORMAT:6,__EXTEND_POINT__:7};function aD(e,t,r){return[...new Set([r,...rt(t)?t:ot(t)?Object.keys(t):fe(t)?[t]:[r]])]}function Sy(e,t,r){const o=fe(r)?r:ra,n=e;n.__localeChainCache||(n.__localeChainCache=new Map);let i=n.__localeChainCache.get(o);if(!i){i=[];let s=[r];for(;rt(s);)s=Eg(i,s,t);const a=rt(t)||!Pe(t)?t:t.default?t.default:null;s=fe(a)?[a]:a,rt(s)&&Eg(i,s,!1),n.__localeChainCache.set(o,i)}return i}function Eg(e,t,r){let o=!0;for(let n=0;n<t.length&&Fe(o);n++){const i=t[n];fe(i)&&(o=lD(e,t[n],r))}return o}function lD(e,t,r){let o;const n=t.split("-");do{const i=n.join("-");o=cD(e,i,r),n.splice(-1,1)}while(n.length&&o===!0);return o}function cD(e,t,r){let o=!1;if(!e.includes(t)&&(o=!0,t)){o=t[t.length-1]!=="!";const n=t.replace(/!/g,"");e.push(n),(rt(r)||Pe(r))&&r[n]&&(o=r[n])}return o}const uD="9.2.2",nc=-1,ra="en-US",_g="",Tg=e=>`${e.charAt(0).toLocaleUpperCase()}${e.substr(1)}`;function dD(){return{upper:(e,t)=>t==="text"&&fe(e)?e.toUpperCase():t==="vnode"&&ot(e)&&"__v_isVNode"in e?e.children.toUpperCase():e,lower:(e,t)=>t==="text"&&fe(e)?e.toLowerCase():t==="vnode"&&ot(e)&&"__v_isVNode"in e?e.children.toLowerCase():e,capitalize:(e,t)=>t==="text"&&fe(e)?Tg(e):t==="vnode"&&ot(e)&&"__v_isVNode"in e?Tg(e.children):e}}let Ey;function fD(e){Ey=e}let _y;function hD(e){_y=e}let Ty;function pD(e){Ty=e}let $g=0;function gD(e={}){const t=fe(e.version)?e.version:uD,r=fe(e.locale)?e.locale:ra,o=rt(e.fallbackLocale)||Pe(e.fallbackLocale)||fe(e.fallbackLocale)||e.fallbackLocale===!1?e.fallbackLocale:r,n=Pe(e.messages)?e.messages:{[r]:{}},i=Pe(e.datetimeFormats)?e.datetimeFormats:{[r]:{}},s=Pe(e.numberFormats)?e.numberFormats:{[r]:{}},a=$t({},e.modifiers||{},dD()),l=e.pluralRules||{},c=gt(e.missing)?e.missing:null,u=Fe(e.missingWarn)||Uo(e.missingWarn)?e.missingWarn:!0,d=Fe(e.fallbackWarn)||Uo(e.fallbackWarn)?e.fallbackWarn:!0,f=!!e.fallbackFormat,h=!!e.unresolving,p=gt(e.postTranslation)?e.postTranslation:null,m=Pe(e.processor)?e.processor:null,y=Fe(e.warnHtmlMessage)?e.warnHtmlMessage:!0,g=!!e.escapeParameter,w=gt(e.messageCompiler)?e.messageCompiler:Ey,T=gt(e.messageResolver)?e.messageResolver:_y||GH,x=gt(e.localeFallbacker)?e.localeFallbacker:Ty||aD,C=ot(e.fallbackContext)?e.fallbackContext:void 0,$=gt(e.onWarn)?e.onWarn:bH,S=e,L=ot(S.__datetimeFormatters)?S.__datetimeFormatters:new Map,k=ot(S.__numberFormatters)?S.__numberFormatters:new Map,I=ot(S.__meta)?S.__meta:{};$g++;const A={version:t,cid:$g,locale:r,fallbackLocale:o,messages:n,modifiers:a,pluralRules:l,missing:c,missingWarn:u,fallbackWarn:d,fallbackFormat:f,unresolving:h,postTranslation:p,processor:m,warnHtmlMessage:y,escapeParameter:g,messageCompiler:w,messageResolver:T,localeFallbacker:x,fallbackContext:C,onWarn:$,__meta:I};return A.datetimeFormats=i,A.numberFormats=s,A.__datetimeFormatters=L,A.__numberFormatters=k,A}function ff(e,t,r,o,n){const{missing:i,onWarn:s}=e;if(i!==null){const a=i(e,r,t,n);return fe(a)?a:t}else return t}function Gi(e,t,r){const o=e;o.__localeChainCache=new Map,e.localeFallbacker(e,r,t)}const mD=e=>e;let Pg=Object.create(null);function bD(e,t={}){{const o=(t.onCacheKey||mD)(e),n=Pg[o];if(n)return n;let i=!1;const s=t.onError||xH;t.onError=c=>{i=!0,s(c)};const{code:a}=FH(e,t),l=new Function(`return ${a}`)();return i?l:Pg[o]=l}}let $y=je.__EXTEND_POINT__;const Fc=()=>++$y,Gn={INVALID_ARGUMENT:$y,INVALID_DATE_ARGUMENT:Fc(),INVALID_ISO_DATE_ARGUMENT:Fc(),__EXTEND_POINT__:Fc()};function Xn(e){return oc(e,null,void 0)}const Lg=()=>"",En=e=>gt(e);function kg(e,...t){const{fallbackFormat:r,postTranslation:o,unresolving:n,messageCompiler:i,fallbackLocale:s,messages:a}=e,[l,c]=Bu(...t),u=Fe(c.missingWarn)?c.missingWarn:e.missingWarn,d=Fe(c.fallbackWarn)?c.fallbackWarn:e.fallbackWarn,f=Fe(c.escapeParameter)?c.escapeParameter:e.escapeParameter,h=!!c.resolvedMessage,p=fe(c.default)||Fe(c.default)?Fe(c.default)?i?l:()=>l:c.default:r?i?l:()=>l:"",m=r||p!=="",y=fe(c.locale)?c.locale:e.locale;f&&vD(c);let[g,w,T]=h?[l,y,a[y]||{}]:Py(e,l,y,s,d,u),x=g,C=l;if(!h&&!(fe(x)||En(x))&&m&&(x=p,C=x),!h&&(!(fe(x)||En(x))||!fe(w)))return n?nc:l;let $=!1;const S=()=>{$=!0},L=En(x)?x:Ly(e,l,w,x,C,S);if($)return x;const k=CD(e,w,T,c),I=oD(k),A=yD(e,L,I);return o?o(A,l):A}function vD(e){rt(e.list)?e.list=e.list.map(t=>fe(t)?yg(t):t):ot(e.named)&&Object.keys(e.named).forEach(t=>{fe(e.named[t])&&(e.named[t]=yg(e.named[t]))})}function Py(e,t,r,o,n,i){const{messages:s,onWarn:a,messageResolver:l,localeFallbacker:c}=e,u=c(e,o,r);let d={},f,h=null;const p="translate";for(let m=0;m<u.length&&(f=u[m],d=s[f]||{},(h=l(d,t))===null&&(h=d[t]),!(fe(h)||gt(h)));m++){const y=ff(e,t,f,i,p);y!==t&&(h=y)}return[h,f,d]}function Ly(e,t,r,o,n,i){const{messageCompiler:s,warnHtmlMessage:a}=e;if(En(o)){const c=o;return c.locale=c.locale||r,c.key=c.key||t,c}if(s==null){const c=()=>o;return c.locale=r,c.key=t,c}const l=s(o,xD(e,r,n,o,a,i));return l.locale=r,l.key=t,l.source=o,l}function yD(e,t,r){return t(r)}function Bu(...e){const[t,r,o]=e,n={};if(!fe(t)&&!_t(t)&&!En(t))throw Xn(Gn.INVALID_ARGUMENT);const i=_t(t)?String(t):(En(t),t);return _t(r)?n.plural=r:fe(r)?n.default=r:Pe(r)&&!rc(r)?n.named=r:rt(r)&&(n.list=r),_t(o)?n.plural=o:fe(o)?n.default=o:Pe(o)&&$t(n,o),[i,n]}function xD(e,t,r,o,n,i){return{warnHtmlMessage:n,onError:s=>{throw i&&i(s),s},onCacheKey:s=>pH(t,r,s)}}function CD(e,t,r,o){const{modifiers:n,pluralRules:i,messageResolver:s,fallbackLocale:a,fallbackWarn:l,missingWarn:c,fallbackContext:u}=e,f={locale:t,modifiers:n,pluralRules:i,messages:h=>{let p=s(r,h);if(p==null&&u){const[,,m]=Py(u,h,t,a,l,c);p=s(m,h)}if(fe(p)){let m=!1;const g=Ly(e,h,t,p,h,()=>{m=!0});return m?Lg:g}else return En(p)?p:Lg}};return e.processor&&(f.processor=e.processor),o.list&&(f.list=o.list),o.named&&(f.named=o.named),_t(o.plural)&&(f.pluralIndex=o.plural),f}function Ig(e,...t){const{datetimeFormats:r,unresolving:o,fallbackLocale:n,onWarn:i,localeFallbacker:s}=e,{__datetimeFormatters:a}=e,[l,c,u,d]=Mu(...t),f=Fe(u.missingWarn)?u.missingWarn:e.missingWarn;Fe(u.fallbackWarn)?u.fallbackWarn:e.fallbackWarn;const h=!!u.part,p=fe(u.locale)?u.locale:e.locale,m=s(e,n,p);if(!fe(l)||l==="")return new Intl.DateTimeFormat(p,d).format(c);let y={},g,w=null;const T="datetime format";for(let $=0;$<m.length&&(g=m[$],y=r[g]||{},w=y[l],!Pe(w));$++)ff(e,l,g,f,T);if(!Pe(w)||!fe(g))return o?nc:l;let x=`${g}__${l}`;rc(d)||(x=`${x}__${JSON.stringify(d)}`);let C=a.get(x);return C||(C=new Intl.DateTimeFormat(g,$t({},w,d)),a.set(x,C)),h?C.formatToParts(c):C.format(c)}const ky=["localeMatcher","weekday","era","year","month","day","hour","minute","second","timeZoneName","formatMatcher","hour12","timeZone","dateStyle","timeStyle","calendar","dayPeriod","numberingSystem","hourCycle","fractionalSecondDigits"];function Mu(...e){const[t,r,o,n]=e,i={};let s={},a;if(fe(t)){const l=t.match(/(\d{4}-\d{2}-\d{2})(T|\s)?(.*)/);if(!l)throw Xn(Gn.INVALID_ISO_DATE_ARGUMENT);const c=l[3]?l[3].trim().startsWith("T")?`${l[1].trim()}${l[3].trim()}`:`${l[1].trim()}T${l[3].trim()}`:l[1].trim();a=new Date(c);try{a.toISOString()}catch{throw Xn(Gn.INVALID_ISO_DATE_ARGUMENT)}}else if(mH(t)){if(isNaN(t.getTime()))throw Xn(Gn.INVALID_DATE_ARGUMENT);a=t}else if(_t(t))a=t;else throw Xn(Gn.INVALID_ARGUMENT);return fe(r)?i.key=r:Pe(r)&&Object.keys(r).forEach(l=>{ky.includes(l)?s[l]=r[l]:i[l]=r[l]}),fe(o)?i.locale=o:Pe(o)&&(s=o),Pe(n)&&(s=n),[i.key||"",a,i,s]}function Rg(e,t,r){const o=e;for(const n in r){const i=`${t}__${n}`;!o.__datetimeFormatters.has(i)||o.__datetimeFormatters.delete(i)}}function Og(e,...t){const{numberFormats:r,unresolving:o,fallbackLocale:n,onWarn:i,localeFallbacker:s}=e,{__numberFormatters:a}=e,[l,c,u,d]=Hu(...t),f=Fe(u.missingWarn)?u.missingWarn:e.missingWarn;Fe(u.fallbackWarn)?u.fallbackWarn:e.fallbackWarn;const h=!!u.part,p=fe(u.locale)?u.locale:e.locale,m=s(e,n,p);if(!fe(l)||l==="")return new Intl.NumberFormat(p,d).format(c);let y={},g,w=null;const T="number format";for(let $=0;$<m.length&&(g=m[$],y=r[g]||{},w=y[l],!Pe(w));$++)ff(e,l,g,f,T);if(!Pe(w)||!fe(g))return o?nc:l;let x=`${g}__${l}`;rc(d)||(x=`${x}__${JSON.stringify(d)}`);let C=a.get(x);return C||(C=new Intl.NumberFormat(g,$t({},w,d)),a.set(x,C)),h?C.formatToParts(c):C.format(c)}const Iy=["localeMatcher","style","currency","currencyDisplay","currencySign","useGrouping","minimumIntegerDigits","minimumFractionDigits","maximumFractionDigits","minimumSignificantDigits","maximumSignificantDigits","compactDisplay","notation","signDisplay","unit","unitDisplay","roundingMode","roundingPriority","roundingIncrement","trailingZeroDisplay"];function Hu(...e){const[t,r,o,n]=e,i={};let s={};if(!_t(t))throw Xn(Gn.INVALID_ARGUMENT);const a=t;return fe(r)?i.key=r:Pe(r)&&Object.keys(r).forEach(l=>{Iy.includes(l)?s[l]=r[l]:i[l]=r[l]}),fe(o)?i.locale=o:Pe(o)&&(s=o),Pe(n)&&(s=n),[i.key||"",a,i,s]}function Ag(e,t,r){const o=e;for(const n in r){const i=`${t}__${n}`;!o.__numberFormatters.has(i)||o.__numberFormatters.delete(i)}}/*!
  * vue-i18n v9.2.2
  * (c) 2022 kazuya kawaguchi
  * Released under the MIT License.
  */const wD="9.2.2";sD.__EXTEND_POINT__;let Ry=je.__EXTEND_POINT__;const Kt=()=>++Ry,Pt={UNEXPECTED_RETURN_TYPE:Ry,INVALID_ARGUMENT:Kt(),MUST_BE_CALL_SETUP_TOP:Kt(),NOT_INSLALLED:Kt(),NOT_AVAILABLE_IN_LEGACY_MODE:Kt(),REQUIRED_VALUE:Kt(),INVALID_VALUE:Kt(),CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN:Kt(),NOT_INSLALLED_WITH_PROVIDE:Kt(),UNEXPECTED_ERROR:Kt(),NOT_COMPATIBLE_LEGACY_VUE_I18N:Kt(),BRIDGE_SUPPORT_VUE_2_ONLY:Kt(),MUST_DEFINE_I18N_OPTION_IN_ALLOW_COMPOSITION:Kt(),NOT_AVAILABLE_COMPOSITION_IN_LEGACY:Kt(),__EXTEND_POINT__:Kt()};function Mt(e,...t){return oc(e,null,void 0)}const Du=Xo("__transrateVNode"),zu=Xo("__datetimeParts"),Fu=Xo("__numberParts"),Oy=Xo("__setPluralRules");Xo("__intlifyMeta");const Ay=Xo("__injectWithOption");function Nu(e){if(!ot(e))return e;for(const t in e)if(!!cf(e,t))if(!t.includes("."))ot(e[t])&&Nu(e[t]);else{const r=t.split("."),o=r.length-1;let n=e;for(let i=0;i<o;i++)r[i]in n||(n[r[i]]={}),n=n[r[i]];n[r[o]]=e[t],delete e[t],ot(n[r[o]])&&Nu(n[r[o]])}return e}function ic(e,t){const{messages:r,__i18n:o,messageResolver:n,flatJson:i}=t,s=Pe(r)?r:rt(o)?{}:{[e]:{}};if(rt(o)&&o.forEach(a=>{if("locale"in a&&"resource"in a){const{locale:l,resource:c}=a;l?(s[l]=s[l]||{},gs(c,s[l])):gs(c,s)}else fe(a)&&gs(JSON.parse(a),s)}),n==null&&i)for(const a in s)cf(s,a)&&Nu(s[a]);return s}const Ra=e=>!ot(e)||rt(e);function gs(e,t){if(Ra(e)||Ra(t))throw Mt(Pt.INVALID_VALUE);for(const r in e)cf(e,r)&&(Ra(e[r])||Ra(t[r])?t[r]=e[r]:gs(e[r],t[r]))}function SD(e){return e.type}function By(e,t,r){let o=ot(t.messages)?t.messages:{};"__i18nGlobal"in r&&(o=ic(e.locale.value,{messages:o,__i18n:r.__i18nGlobal}));const n=Object.keys(o);n.length&&n.forEach(i=>{e.mergeLocaleMessage(i,o[i])});{if(ot(t.datetimeFormats)){const i=Object.keys(t.datetimeFormats);i.length&&i.forEach(s=>{e.mergeDateTimeFormat(s,t.datetimeFormats[s])})}if(ot(t.numberFormats)){const i=Object.keys(t.numberFormats);i.length&&i.forEach(s=>{e.mergeNumberFormat(s,t.numberFormats[s])})}}}function Bg(e){return ct(Al,null,e,0)}let Mg=0;function Hg(e){return(t,r,o,n)=>e(r,o,gr()||void 0,n)}function hf(e={},t){const{__root:r}=e,o=r===void 0;let n=Fe(e.inheritLocale)?e.inheritLocale:!0;const i=K(r&&n?r.locale.value:fe(e.locale)?e.locale:ra),s=K(r&&n?r.fallbackLocale.value:fe(e.fallbackLocale)||rt(e.fallbackLocale)||Pe(e.fallbackLocale)||e.fallbackLocale===!1?e.fallbackLocale:i.value),a=K(ic(i.value,e)),l=K(Pe(e.datetimeFormats)?e.datetimeFormats:{[i.value]:{}}),c=K(Pe(e.numberFormats)?e.numberFormats:{[i.value]:{}});let u=r?r.missingWarn:Fe(e.missingWarn)||Uo(e.missingWarn)?e.missingWarn:!0,d=r?r.fallbackWarn:Fe(e.fallbackWarn)||Uo(e.fallbackWarn)?e.fallbackWarn:!0,f=r?r.fallbackRoot:Fe(e.fallbackRoot)?e.fallbackRoot:!0,h=!!e.fallbackFormat,p=gt(e.missing)?e.missing:null,m=gt(e.missing)?Hg(e.missing):null,y=gt(e.postTranslation)?e.postTranslation:null,g=r?r.warnHtmlMessage:Fe(e.warnHtmlMessage)?e.warnHtmlMessage:!0,w=!!e.escapeParameter;const T=r?r.modifiers:Pe(e.modifiers)?e.modifiers:{};let x=e.pluralRules||r&&r.pluralRules,C;C=(()=>{const B={version:wD,locale:i.value,fallbackLocale:s.value,messages:a.value,modifiers:T,pluralRules:x,missing:m===null?void 0:m,missingWarn:u,fallbackWarn:d,fallbackFormat:h,unresolving:!0,postTranslation:y===null?void 0:y,warnHtmlMessage:g,escapeParameter:w,messageResolver:e.messageResolver,__meta:{framework:"vue"}};return B.datetimeFormats=l.value,B.numberFormats=c.value,B.__datetimeFormatters=Pe(C)?C.__datetimeFormatters:void 0,B.__numberFormatters=Pe(C)?C.__numberFormatters:void 0,gD(B)})(),Gi(C,i.value,s.value);function S(){return[i.value,s.value,a.value,l.value,c.value]}const L=q({get:()=>i.value,set:B=>{i.value=B,C.locale=i.value}}),k=q({get:()=>s.value,set:B=>{s.value=B,C.fallbackLocale=s.value,Gi(C,i.value,B)}}),I=q(()=>a.value),A=q(()=>l.value),R=q(()=>c.value);function F(){return gt(y)?y:null}function H(B){y=B,C.postTranslation=B}function J(){return p}function Y(B){B!==null&&(m=Hg(B)),p=B,C.missing=m}const Z=(B,D,ce,pe,$e,He)=>{S();let Oe;if(Oe=B(C),_t(Oe)&&Oe===nc){const[at,It]=D();return r&&f?pe(r):$e(at)}else{if(He(Oe))return Oe;throw Mt(Pt.UNEXPECTED_RETURN_TYPE)}};function se(...B){return Z(D=>Reflect.apply(kg,null,[D,...B]),()=>Bu(...B),"translate",D=>Reflect.apply(D.t,D,[...B]),D=>D,D=>fe(D))}function ve(...B){const[D,ce,pe]=B;if(pe&&!ot(pe))throw Mt(Pt.INVALID_ARGUMENT);return se(D,ce,$t({resolvedMessage:!0},pe||{}))}function Le(...B){return Z(D=>Reflect.apply(Ig,null,[D,...B]),()=>Mu(...B),"datetime format",D=>Reflect.apply(D.d,D,[...B]),()=>_g,D=>fe(D))}function _e(...B){return Z(D=>Reflect.apply(Og,null,[D,...B]),()=>Hu(...B),"number format",D=>Reflect.apply(D.n,D,[...B]),()=>_g,D=>fe(D))}function Ae(B){return B.map(D=>fe(D)||_t(D)||Fe(D)?Bg(String(D)):D)}const Ue={normalize:Ae,interpolate:B=>B,type:"vnode"};function j(...B){return Z(D=>{let ce;const pe=D;try{pe.processor=Ue,ce=Reflect.apply(kg,null,[pe,...B])}finally{pe.processor=null}return ce},()=>Bu(...B),"translate",D=>D[Du](...B),D=>[Bg(D)],D=>rt(D))}function Q(...B){return Z(D=>Reflect.apply(Og,null,[D,...B]),()=>Hu(...B),"number format",D=>D[Fu](...B),()=>[],D=>fe(D)||rt(D))}function te(...B){return Z(D=>Reflect.apply(Ig,null,[D,...B]),()=>Mu(...B),"datetime format",D=>D[zu](...B),()=>[],D=>fe(D)||rt(D))}function de(B){x=B,C.pluralRules=x}function ae(B,D){const ce=fe(D)?D:i.value,pe=_(ce);return C.messageResolver(pe,B)!==null}function Te(B){let D=null;const ce=Sy(C,s.value,i.value);for(let pe=0;pe<ce.length;pe++){const $e=a.value[ce[pe]]||{},He=C.messageResolver($e,B);if(He!=null){D=He;break}}return D}function me(B){const D=Te(B);return D!=null?D:r?r.tm(B)||{}:{}}function _(B){return a.value[B]||{}}function b(B,D){a.value[B]=D,C.messages=a.value}function v(B,D){a.value[B]=a.value[B]||{},gs(D,a.value[B]),C.messages=a.value}function P(B){return l.value[B]||{}}function O(B,D){l.value[B]=D,C.datetimeFormats=l.value,Rg(C,B,D)}function M(B,D){l.value[B]=$t(l.value[B]||{},D),C.datetimeFormats=l.value,Rg(C,B,D)}function V(B){return c.value[B]||{}}function X(B,D){c.value[B]=D,C.numberFormats=c.value,Ag(C,B,D)}function U(B,D){c.value[B]=$t(c.value[B]||{},D),C.numberFormats=c.value,Ag(C,B,D)}Mg++,r&&fH&&(et(r.locale,B=>{n&&(i.value=B,C.locale=B,Gi(C,i.value,s.value))}),et(r.fallbackLocale,B=>{n&&(s.value=B,C.fallbackLocale=B,Gi(C,i.value,s.value))}));const z={id:Mg,locale:L,fallbackLocale:k,get inheritLocale(){return n},set inheritLocale(B){n=B,B&&r&&(i.value=r.locale.value,s.value=r.fallbackLocale.value,Gi(C,i.value,s.value))},get availableLocales(){return Object.keys(a.value).sort()},messages:I,get modifiers(){return T},get pluralRules(){return x||{}},get isGlobal(){return o},get missingWarn(){return u},set missingWarn(B){u=B,C.missingWarn=u},get fallbackWarn(){return d},set fallbackWarn(B){d=B,C.fallbackWarn=d},get fallbackRoot(){return f},set fallbackRoot(B){f=B},get fallbackFormat(){return h},set fallbackFormat(B){h=B,C.fallbackFormat=h},get warnHtmlMessage(){return g},set warnHtmlMessage(B){g=B,C.warnHtmlMessage=B},get escapeParameter(){return w},set escapeParameter(B){w=B,C.escapeParameter=B},t:se,getLocaleMessage:_,setLocaleMessage:b,mergeLocaleMessage:v,getPostTranslationHandler:F,setPostTranslationHandler:H,getMissingHandler:J,setMissingHandler:Y,[Oy]:de};return z.datetimeFormats=A,z.numberFormats=R,z.rt=ve,z.te=ae,z.tm=me,z.d=Le,z.n=_e,z.getDateTimeFormat=P,z.setDateTimeFormat=O,z.mergeDateTimeFormat=M,z.getNumberFormat=V,z.setNumberFormat=X,z.mergeNumberFormat=U,z[Ay]=e.__injectWithOption,z[Du]=j,z[zu]=te,z[Fu]=Q,z}function ED(e){const t=fe(e.locale)?e.locale:ra,r=fe(e.fallbackLocale)||rt(e.fallbackLocale)||Pe(e.fallbackLocale)||e.fallbackLocale===!1?e.fallbackLocale:t,o=gt(e.missing)?e.missing:void 0,n=Fe(e.silentTranslationWarn)||Uo(e.silentTranslationWarn)?!e.silentTranslationWarn:!0,i=Fe(e.silentFallbackWarn)||Uo(e.silentFallbackWarn)?!e.silentFallbackWarn:!0,s=Fe(e.fallbackRoot)?e.fallbackRoot:!0,a=!!e.formatFallbackMessages,l=Pe(e.modifiers)?e.modifiers:{},c=e.pluralizationRules,u=gt(e.postTranslation)?e.postTranslation:void 0,d=fe(e.warnHtmlInMessage)?e.warnHtmlInMessage!=="off":!0,f=!!e.escapeParameterHtml,h=Fe(e.sync)?e.sync:!0;let p=e.messages;if(Pe(e.sharedMessages)){const C=e.sharedMessages;p=Object.keys(C).reduce((S,L)=>{const k=S[L]||(S[L]={});return $t(k,C[L]),S},p||{})}const{__i18n:m,__root:y,__injectWithOption:g}=e,w=e.datetimeFormats,T=e.numberFormats,x=e.flatJson;return{locale:t,fallbackLocale:r,messages:p,flatJson:x,datetimeFormats:w,numberFormats:T,missing:o,missingWarn:n,fallbackWarn:i,fallbackRoot:s,fallbackFormat:a,modifiers:l,pluralRules:c,postTranslation:u,warnHtmlMessage:d,escapeParameter:f,messageResolver:e.messageResolver,inheritLocale:h,__i18n:m,__root:y,__injectWithOption:g}}function ju(e={},t){{const r=hf(ED(e)),o={id:r.id,get locale(){return r.locale.value},set locale(n){r.locale.value=n},get fallbackLocale(){return r.fallbackLocale.value},set fallbackLocale(n){r.fallbackLocale.value=n},get messages(){return r.messages.value},get datetimeFormats(){return r.datetimeFormats.value},get numberFormats(){return r.numberFormats.value},get availableLocales(){return r.availableLocales},get formatter(){return{interpolate(){return[]}}},set formatter(n){},get missing(){return r.getMissingHandler()},set missing(n){r.setMissingHandler(n)},get silentTranslationWarn(){return Fe(r.missingWarn)?!r.missingWarn:r.missingWarn},set silentTranslationWarn(n){r.missingWarn=Fe(n)?!n:n},get silentFallbackWarn(){return Fe(r.fallbackWarn)?!r.fallbackWarn:r.fallbackWarn},set silentFallbackWarn(n){r.fallbackWarn=Fe(n)?!n:n},get modifiers(){return r.modifiers},get formatFallbackMessages(){return r.fallbackFormat},set formatFallbackMessages(n){r.fallbackFormat=n},get postTranslation(){return r.getPostTranslationHandler()},set postTranslation(n){r.setPostTranslationHandler(n)},get sync(){return r.inheritLocale},set sync(n){r.inheritLocale=n},get warnHtmlInMessage(){return r.warnHtmlMessage?"warn":"off"},set warnHtmlInMessage(n){r.warnHtmlMessage=n!=="off"},get escapeParameterHtml(){return r.escapeParameter},set escapeParameterHtml(n){r.escapeParameter=n},get preserveDirectiveContent(){return!0},set preserveDirectiveContent(n){},get pluralizationRules(){return r.pluralRules||{}},__composer:r,t(...n){const[i,s,a]=n,l={};let c=null,u=null;if(!fe(i))throw Mt(Pt.INVALID_ARGUMENT);const d=i;return fe(s)?l.locale=s:rt(s)?c=s:Pe(s)&&(u=s),rt(a)?c=a:Pe(a)&&(u=a),Reflect.apply(r.t,r,[d,c||u||{},l])},rt(...n){return Reflect.apply(r.rt,r,[...n])},tc(...n){const[i,s,a]=n,l={plural:1};let c=null,u=null;if(!fe(i))throw Mt(Pt.INVALID_ARGUMENT);const d=i;return fe(s)?l.locale=s:_t(s)?l.plural=s:rt(s)?c=s:Pe(s)&&(u=s),fe(a)?l.locale=a:rt(a)?c=a:Pe(a)&&(u=a),Reflect.apply(r.t,r,[d,c||u||{},l])},te(n,i){return r.te(n,i)},tm(n){return r.tm(n)},getLocaleMessage(n){return r.getLocaleMessage(n)},setLocaleMessage(n,i){r.setLocaleMessage(n,i)},mergeLocaleMessage(n,i){r.mergeLocaleMessage(n,i)},d(...n){return Reflect.apply(r.d,r,[...n])},getDateTimeFormat(n){return r.getDateTimeFormat(n)},setDateTimeFormat(n,i){r.setDateTimeFormat(n,i)},mergeDateTimeFormat(n,i){r.mergeDateTimeFormat(n,i)},n(...n){return Reflect.apply(r.n,r,[...n])},getNumberFormat(n){return r.getNumberFormat(n)},setNumberFormat(n,i){r.setNumberFormat(n,i)},mergeNumberFormat(n,i){r.mergeNumberFormat(n,i)},getChoiceIndex(n,i){return-1},__onComponentInstanceCreated(n){const{componentInstanceCreatedListener:i}=e;i&&i(n,o)}};return o}}const pf={tag:{type:[String,Object]},locale:{type:String},scope:{type:String,validator:e=>e==="parent"||e==="global",default:"parent"},i18n:{type:Object}};function _D({slots:e},t){return t.length===1&&t[0]==="default"?(e.default?e.default():[]).reduce((o,n)=>o=[...o,...rt(n.children)?n.children:[n]],[]):t.reduce((r,o)=>{const n=e[o];return n&&(r[o]=n()),r},{})}function My(e){return Qe}$t({keypath:{type:String,required:!0},plural:{type:[Number,String],validator:e=>_t(e)||!isNaN(e)}},pf);function TD(e){return rt(e)&&!fe(e[0])}function Hy(e,t,r,o){const{slots:n,attrs:i}=t;return()=>{const s={part:!0};let a={};e.locale&&(s.locale=e.locale),fe(e.format)?s.key=e.format:ot(e.format)&&(fe(e.format.key)&&(s.key=e.format.key),a=Object.keys(e.format).reduce((f,h)=>r.includes(h)?$t({},f,{[h]:e.format[h]}):f,{}));const l=o(e.value,s,a);let c=[s.key];rt(l)?c=l.map((f,h)=>{const p=n[f.type],m=p?p({[f.type]:f.value,index:h,parts:l}):[f.value];return TD(m)&&(m[0].key=`${f.type}-${h}`),m}):fe(l)&&(c=[l]);const u=$t({},i),d=fe(e.tag)||ot(e.tag)?e.tag:My();return E(d,u,c)}}$t({value:{type:Number,required:!0},format:{type:[String,Object]}},pf);$t({value:{type:[Number,Date],required:!0},format:{type:[String,Object]}},pf);function $D(e,t,r){return{beforeCreate(){const o=gr();if(!o)throw Mt(Pt.UNEXPECTED_ERROR);const n=this.$options;if(n.i18n){const i=n.i18n;n.__i18n&&(i.__i18n=n.__i18n),i.__root=t,this===this.$root?this.$i18n=Dg(e,i):(i.__injectWithOption=!0,this.$i18n=ju(i))}else n.__i18n?this===this.$root?this.$i18n=Dg(e,n):this.$i18n=ju({__i18n:n.__i18n,__injectWithOption:!0,__root:t}):this.$i18n=e;n.__i18nGlobal&&By(t,n,n),e.__onComponentInstanceCreated(this.$i18n),r.__setInstance(o,this.$i18n),this.$t=(...i)=>this.$i18n.t(...i),this.$rt=(...i)=>this.$i18n.rt(...i),this.$tc=(...i)=>this.$i18n.tc(...i),this.$te=(i,s)=>this.$i18n.te(i,s),this.$d=(...i)=>this.$i18n.d(...i),this.$n=(...i)=>this.$i18n.n(...i),this.$tm=i=>this.$i18n.tm(i)},mounted(){},unmounted(){const o=gr();if(!o)throw Mt(Pt.UNEXPECTED_ERROR);delete this.$t,delete this.$rt,delete this.$tc,delete this.$te,delete this.$d,delete this.$n,delete this.$tm,r.__deleteInstance(o),delete this.$i18n}}}function Dg(e,t){e.locale=t.locale||e.locale,e.fallbackLocale=t.fallbackLocale||e.fallbackLocale,e.missing=t.missing||e.missing,e.silentTranslationWarn=t.silentTranslationWarn||e.silentFallbackWarn,e.silentFallbackWarn=t.silentFallbackWarn||e.silentFallbackWarn,e.formatFallbackMessages=t.formatFallbackMessages||e.formatFallbackMessages,e.postTranslation=t.postTranslation||e.postTranslation,e.warnHtmlInMessage=t.warnHtmlInMessage||e.warnHtmlInMessage,e.escapeParameterHtml=t.escapeParameterHtml||e.escapeParameterHtml,e.sync=t.sync||e.sync,e.__composer[Oy](t.pluralizationRules||e.pluralizationRules);const r=ic(e.locale,{messages:t.messages,__i18n:t.__i18n});return Object.keys(r).forEach(o=>e.mergeLocaleMessage(o,r[o])),t.datetimeFormats&&Object.keys(t.datetimeFormats).forEach(o=>e.mergeDateTimeFormat(o,t.datetimeFormats[o])),t.numberFormats&&Object.keys(t.numberFormats).forEach(o=>e.mergeNumberFormat(o,t.numberFormats[o])),e}const PD=Xo("global-vue-i18n");function LD(e={},t){const r=Fe(e.legacy)?e.legacy:!0,o=Fe(e.globalInjection)?e.globalInjection:!0,n=r?!!e.allowComposition:!0,i=new Map,[s,a]=kD(e,r),l=Xo("");function c(f){return i.get(f)||null}function u(f,h){i.set(f,h)}function d(f){i.delete(f)}{const f={get mode(){return r?"legacy":"composition"},get allowComposition(){return n},async install(h,...p){h.__VUE_I18N_SYMBOL__=l,h.provide(h.__VUE_I18N_SYMBOL__,f),!r&&o&&zD(h,f.global),r&&h.mixin($D(a,a.__composer,f));const m=h.unmount;h.unmount=()=>{f.dispose(),m()}},get global(){return a},dispose(){s.stop()},__instances:i,__getInstance:c,__setInstance:u,__deleteInstance:d};return f}}function gf(e={}){const t=gr();if(t==null)throw Mt(Pt.MUST_BE_CALL_SETUP_TOP);if(!t.isCE&&t.appContext.app!=null&&!t.appContext.app.__VUE_I18N_SYMBOL__)throw Mt(Pt.NOT_INSLALLED);const r=ID(t),o=OD(r),n=SD(t),i=RD(e,n);if(r.mode==="legacy"&&!e.__useComponent){if(!r.allowComposition)throw Mt(Pt.NOT_AVAILABLE_IN_LEGACY_MODE);return MD(t,i,o,e)}if(i==="global")return By(o,e,n),o;if(i==="parent"){let l=AD(r,t,e.__useComponent);return l==null&&(l=o),l}const s=r;let a=s.__getInstance(t);if(a==null){const l=$t({},e);"__i18n"in n&&(l.__i18n=n.__i18n),o&&(l.__root=o),a=hf(l),BD(s,t),s.__setInstance(t,a)}return a}function kD(e,t,r){const o=uC();{const n=t?o.run(()=>ju(e)):o.run(()=>hf(e));if(n==null)throw Mt(Pt.UNEXPECTED_ERROR);return[o,n]}}function ID(e){{const t=Se(e.isCE?PD:e.appContext.app.__VUE_I18N_SYMBOL__);if(!t)throw Mt(e.isCE?Pt.NOT_INSLALLED_WITH_PROVIDE:Pt.UNEXPECTED_ERROR);return t}}function RD(e,t){return rc(e)?"__i18n"in t?"local":"global":e.useScope?e.useScope:"local"}function OD(e){return e.mode==="composition"?e.global:e.global.__composer}function AD(e,t,r=!1){let o=null;const n=t.root;let i=t.parent;for(;i!=null;){const s=e;if(e.mode==="composition")o=s.__getInstance(i);else{const a=s.__getInstance(i);a!=null&&(o=a.__composer,r&&o&&!o[Ay]&&(o=null))}if(o!=null||n===i)break;i=i.parent}return o}function BD(e,t,r){Lt(()=>{},t),pd(()=>{e.__deleteInstance(t)},t)}function MD(e,t,r,o={}){const n=t==="local",i=ld(null);if(n&&e.proxy&&!(e.proxy.$options.i18n||e.proxy.$options.__i18n))throw Mt(Pt.MUST_DEFINE_I18N_OPTION_IN_ALLOW_COMPOSITION);const s=Fe(o.inheritLocale)?o.inheritLocale:!0,a=K(n&&s?r.locale.value:fe(o.locale)?o.locale:ra),l=K(n&&s?r.fallbackLocale.value:fe(o.fallbackLocale)||rt(o.fallbackLocale)||Pe(o.fallbackLocale)||o.fallbackLocale===!1?o.fallbackLocale:a.value),c=K(ic(a.value,o)),u=K(Pe(o.datetimeFormats)?o.datetimeFormats:{[a.value]:{}}),d=K(Pe(o.numberFormats)?o.numberFormats:{[a.value]:{}}),f=n?r.missingWarn:Fe(o.missingWarn)||Uo(o.missingWarn)?o.missingWarn:!0,h=n?r.fallbackWarn:Fe(o.fallbackWarn)||Uo(o.fallbackWarn)?o.fallbackWarn:!0,p=n?r.fallbackRoot:Fe(o.fallbackRoot)?o.fallbackRoot:!0,m=!!o.fallbackFormat,y=gt(o.missing)?o.missing:null,g=gt(o.postTranslation)?o.postTranslation:null,w=n?r.warnHtmlMessage:Fe(o.warnHtmlMessage)?o.warnHtmlMessage:!0,T=!!o.escapeParameter,x=n?r.modifiers:Pe(o.modifiers)?o.modifiers:{},C=o.pluralRules||n&&r.pluralRules;function $(){return[a.value,l.value,c.value,u.value,d.value]}const S=q({get:()=>i.value?i.value.locale.value:a.value,set:v=>{i.value&&(i.value.locale.value=v),a.value=v}}),L=q({get:()=>i.value?i.value.fallbackLocale.value:l.value,set:v=>{i.value&&(i.value.fallbackLocale.value=v),l.value=v}}),k=q(()=>i.value?i.value.messages.value:c.value),I=q(()=>u.value),A=q(()=>d.value);function R(){return i.value?i.value.getPostTranslationHandler():g}function F(v){i.value&&i.value.setPostTranslationHandler(v)}function H(){return i.value?i.value.getMissingHandler():y}function J(v){i.value&&i.value.setMissingHandler(v)}function Y(v){return $(),v()}function Z(...v){return i.value?Y(()=>Reflect.apply(i.value.t,null,[...v])):Y(()=>"")}function se(...v){return i.value?Reflect.apply(i.value.rt,null,[...v]):""}function ve(...v){return i.value?Y(()=>Reflect.apply(i.value.d,null,[...v])):Y(()=>"")}function Le(...v){return i.value?Y(()=>Reflect.apply(i.value.n,null,[...v])):Y(()=>"")}function _e(v){return i.value?i.value.tm(v):{}}function Ae(v,P){return i.value?i.value.te(v,P):!1}function ut(v){return i.value?i.value.getLocaleMessage(v):{}}function Ue(v,P){i.value&&(i.value.setLocaleMessage(v,P),c.value[v]=P)}function j(v,P){i.value&&i.value.mergeLocaleMessage(v,P)}function Q(v){return i.value?i.value.getDateTimeFormat(v):{}}function te(v,P){i.value&&(i.value.setDateTimeFormat(v,P),u.value[v]=P)}function de(v,P){i.value&&i.value.mergeDateTimeFormat(v,P)}function ae(v){return i.value?i.value.getNumberFormat(v):{}}function Te(v,P){i.value&&(i.value.setNumberFormat(v,P),d.value[v]=P)}function me(v,P){i.value&&i.value.mergeNumberFormat(v,P)}const _={get id(){return i.value?i.value.id:-1},locale:S,fallbackLocale:L,messages:k,datetimeFormats:I,numberFormats:A,get inheritLocale(){return i.value?i.value.inheritLocale:s},set inheritLocale(v){i.value&&(i.value.inheritLocale=v)},get availableLocales(){return i.value?i.value.availableLocales:Object.keys(c.value)},get modifiers(){return i.value?i.value.modifiers:x},get pluralRules(){return i.value?i.value.pluralRules:C},get isGlobal(){return i.value?i.value.isGlobal:!1},get missingWarn(){return i.value?i.value.missingWarn:f},set missingWarn(v){i.value&&(i.value.missingWarn=v)},get fallbackWarn(){return i.value?i.value.fallbackWarn:h},set fallbackWarn(v){i.value&&(i.value.missingWarn=v)},get fallbackRoot(){return i.value?i.value.fallbackRoot:p},set fallbackRoot(v){i.value&&(i.value.fallbackRoot=v)},get fallbackFormat(){return i.value?i.value.fallbackFormat:m},set fallbackFormat(v){i.value&&(i.value.fallbackFormat=v)},get warnHtmlMessage(){return i.value?i.value.warnHtmlMessage:w},set warnHtmlMessage(v){i.value&&(i.value.warnHtmlMessage=v)},get escapeParameter(){return i.value?i.value.escapeParameter:T},set escapeParameter(v){i.value&&(i.value.escapeParameter=v)},t:Z,getPostTranslationHandler:R,setPostTranslationHandler:F,getMissingHandler:H,setMissingHandler:J,rt:se,d:ve,n:Le,tm:_e,te:Ae,getLocaleMessage:ut,setLocaleMessage:Ue,mergeLocaleMessage:j,getDateTimeFormat:Q,setDateTimeFormat:te,mergeDateTimeFormat:de,getNumberFormat:ae,setNumberFormat:Te,mergeNumberFormat:me};function b(v){v.locale.value=a.value,v.fallbackLocale.value=l.value,Object.keys(c.value).forEach(P=>{v.mergeLocaleMessage(P,c.value[P])}),Object.keys(u.value).forEach(P=>{v.mergeDateTimeFormat(P,u.value[P])}),Object.keys(d.value).forEach(P=>{v.mergeNumberFormat(P,d.value[P])}),v.escapeParameter=T,v.fallbackFormat=m,v.fallbackRoot=p,v.fallbackWarn=h,v.missingWarn=f,v.warnHtmlMessage=w}return Vo(()=>{if(e.proxy==null||e.proxy.$i18n==null)throw Mt(Pt.NOT_AVAILABLE_COMPOSITION_IN_LEGACY);const v=i.value=e.proxy.$i18n.__composer;t==="global"?(a.value=v.locale.value,l.value=v.fallbackLocale.value,c.value=v.messages.value,u.value=v.datetimeFormats.value,d.value=v.numberFormats.value):n&&b(v)}),_}const HD=["locale","fallbackLocale","availableLocales"],DD=["t","rt","d","n","tm"];function zD(e,t){const r=Object.create(null);HD.forEach(o=>{const n=Object.getOwnPropertyDescriptor(t,o);if(!n)throw Mt(Pt.UNEXPECTED_ERROR);const i=yt(n.value)?{get(){return n.value.value},set(s){n.value.value=s}}:{get(){return n.get&&n.get()}};Object.defineProperty(r,o,i)}),e.config.globalProperties.$i18n=r,DD.forEach(o=>{const n=Object.getOwnPropertyDescriptor(t,o);if(!n||!n.value)throw Mt(Pt.UNEXPECTED_ERROR);Object.defineProperty(e.config.globalProperties,`$${o}`,n)})}fD(bD);hD(XH);pD(Sy);const ms=["en-US","zh-CN"],FD=UD(),mf=jD({locale:FD}),ND=(...e)=>mf.global.t(...e);window.t=ND;function jD(e){const t=LD({...e,globalInjection:!0,fallbackLocale:ms[0],messages:{}});return Dy(t,e.locale),t}function Dy(e,t){var r;e.mode==="legacy"?e.global.locale=t:e.global.locale.value=t,(r=document.querySelector("html"))==null||r.setAttribute("lang",t),WD(e,t)}function $9(e){ms.includes(e)&&(Dy(mf,e),localStorage.setItem("lang",e))}async function WD(e,t){const r=await dH(Object.assign({"./locales/en-US.ts":()=>Ze(()=>import("./en-US.686d9649.js"),[],import.meta.url),"./locales/zh-CN.ts":()=>Ze(()=>import("./zh-CN.d8c14e26.js"),[],import.meta.url)}),`./locales/${t}.ts`);return e.global.setLocaleMessage(t,r.default),zt()}function UD(){var t,r;let e=localStorage.getItem("lang");if(e){if(ms.includes(e))return e;localStorage.removeItem("lang")}for(const o of[(t=navigator.language)!=null?t:"",...(r=navigator.languages)!=null?r:[]])for(const n of ms)if(n.includes(o))return n;return ms[0]}const VD={},KD=Object.freeze(Object.defineProperty({__proto__:null,default:VD},Symbol.toStringTag,{value:"Module"}));/*! noble-secp256k1 - MIT License (c) 2019 Paul Miller (paulmillr.com) */const De=BigInt(0),lt=BigInt(1),Ao=BigInt(2),bs=BigInt(3),zg=BigInt(8),Ge=Object.freeze({a:De,b:BigInt(7),P:BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f"),n:BigInt("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141"),h:lt,Gx:BigInt("55066263022277343669578718895168534326250603453777594175500187360389116729240"),Gy:BigInt("32670510020758816978083085130507043184471273380659243275938904335757337482424"),beta:BigInt("0x7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee")}),Fg=(e,t)=>(e+t/Ao)/t,Oa={beta:BigInt("0x7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee"),splitScalar(e){const{n:t}=Ge,r=BigInt("0x3086d221a7d46bcde86c90e49284eb15"),o=-lt*BigInt("0xe4437ed6010e88286f547fa90abfe4c3"),n=BigInt("0x114ca50f7a8e2f3f657c1108d9d44cfd8"),i=r,s=BigInt("0x100000000000000000000000000000000"),a=Fg(i*e,t),l=Fg(-o*e,t);let c=le(e-a*r-l*n,t),u=le(-a*o-l*i,t);const d=c>s,f=u>s;if(d&&(c=t-c),f&&(u=t-u),c>s||u>s)throw new Error("splitScalarEndo: Endomorphism failed, k="+e);return{k1neg:d,k1:c,k2neg:f,k2:u}}},wr=32,yi=32,qD=32,gl=wr+1,ml=2*wr+1;function Ng(e){const{a:t,b:r}=Ge,o=le(e*e),n=le(o*e);return le(n+t*e+r)}const Aa=Ge.a===De;class bf extends Error{constructor(t){super(t)}}function jg(e){if(!(e instanceof Ve))throw new TypeError("JacobianPoint expected")}class Ve{constructor(t,r,o){this.x=t,this.y=r,this.z=o}static fromAffine(t){if(!(t instanceof ze))throw new TypeError("JacobianPoint#fromAffine: expected Point");return t.equals(ze.ZERO)?Ve.ZERO:new Ve(t.x,t.y,lt)}static toAffineBatch(t){const r=JD(t.map(o=>o.z));return t.map((o,n)=>o.toAffine(r[n]))}static normalizeZ(t){return Ve.toAffineBatch(t).map(Ve.fromAffine)}equals(t){jg(t);const{x:r,y:o,z:n}=this,{x:i,y:s,z:a}=t,l=le(n*n),c=le(a*a),u=le(r*c),d=le(i*l),f=le(le(o*a)*c),h=le(le(s*n)*l);return u===d&&f===h}negate(){return new Ve(this.x,le(-this.y),this.z)}double(){const{x:t,y:r,z:o}=this,n=le(t*t),i=le(r*r),s=le(i*i),a=t+i,l=le(Ao*(le(a*a)-n-s)),c=le(bs*n),u=le(c*c),d=le(u-Ao*l),f=le(c*(l-d)-zg*s),h=le(Ao*r*o);return new Ve(d,f,h)}add(t){jg(t);const{x:r,y:o,z:n}=this,{x:i,y:s,z:a}=t;if(i===De||s===De)return this;if(r===De||o===De)return t;const l=le(n*n),c=le(a*a),u=le(r*c),d=le(i*l),f=le(le(o*a)*c),h=le(le(s*n)*l),p=le(d-u),m=le(h-f);if(p===De)return m===De?this.double():Ve.ZERO;const y=le(p*p),g=le(p*y),w=le(u*y),T=le(m*m-g-Ao*w),x=le(m*(w-T)-f*g),C=le(n*a*p);return new Ve(T,x,C)}subtract(t){return this.add(t.negate())}multiplyUnsafe(t){const r=Ve.ZERO;if(typeof t=="bigint"&&t===De)return r;let o=Vg(t);if(o===lt)return this;if(!Aa){let d=r,f=this;for(;o>De;)o&lt&&(d=d.add(f)),f=f.double(),o>>=lt;return d}let{k1neg:n,k1:i,k2neg:s,k2:a}=Oa.splitScalar(o),l=r,c=r,u=this;for(;i>De||a>De;)i&lt&&(l=l.add(u)),a&lt&&(c=c.add(u)),u=u.double(),i>>=lt,a>>=lt;return n&&(l=l.negate()),s&&(c=c.negate()),c=new Ve(le(c.x*Oa.beta),c.y,c.z),l.add(c)}precomputeWindow(t){const r=Aa?128/t+1:256/t+1,o=[];let n=this,i=n;for(let s=0;s<r;s++){i=n,o.push(i);for(let a=1;a<2**(t-1);a++)i=i.add(n),o.push(i);n=i.double()}return o}wNAF(t,r){!r&&this.equals(Ve.BASE)&&(r=ze.BASE);const o=r&&r._WINDOW_SIZE||1;if(256%o)throw new Error("Point#wNAF: Invalid precomputation window, must be power of 2");let n=r&&Wu.get(r);n||(n=this.precomputeWindow(o),r&&o!==1&&(n=Ve.normalizeZ(n),Wu.set(r,n)));let i=Ve.ZERO,s=Ve.BASE;const a=1+(Aa?128/o:256/o),l=2**(o-1),c=BigInt(2**o-1),u=2**o,d=BigInt(o);for(let f=0;f<a;f++){const h=f*l;let p=Number(t&c);t>>=d,p>l&&(p-=u,t+=lt);const m=h,y=h+Math.abs(p)-1,g=f%2!==0,w=p<0;p===0?s=s.add(Ba(g,n[m])):i=i.add(Ba(w,n[y]))}return{p:i,f:s}}multiply(t,r){let o=Vg(t),n,i;if(Aa){const{k1neg:s,k1:a,k2neg:l,k2:c}=Oa.splitScalar(o);let{p:u,f:d}=this.wNAF(a,r),{p:f,f:h}=this.wNAF(c,r);u=Ba(s,u),f=Ba(l,f),f=new Ve(le(f.x*Oa.beta),f.y,f.z),n=u.add(f),i=d.add(h)}else{const{p:s,f:a}=this.wNAF(o,r);n=s,i=a}return Ve.normalizeZ([n,i])[0]}toAffine(t){const{x:r,y:o,z:n}=this,i=this.equals(Ve.ZERO);t==null&&(t=i?zg:Hi(n));const s=t,a=le(s*s),l=le(a*s),c=le(r*a),u=le(o*l),d=le(n*s);if(i)return ze.ZERO;if(d!==lt)throw new Error("invZ was invalid");return new ze(c,u)}}Ve.BASE=new Ve(Ge.Gx,Ge.Gy,lt);Ve.ZERO=new Ve(De,lt,De);function Ba(e,t){const r=t.negate();return e?r:t}const Wu=new WeakMap;class ze{constructor(t,r){this.x=t,this.y=r}_setWindowSize(t){this._WINDOW_SIZE=t,Wu.delete(this)}hasEvenY(){return this.y%Ao===De}static fromCompressedHex(t){const r=t.length===32,o=nr(r?t:t.subarray(1));if(!Ya(o))throw new Error("Point is not on curve");const n=Ng(o);let i=ZD(n);const s=(i&lt)===lt;r?s&&(i=le(-i)):(t[0]&1)===1!==s&&(i=le(-i));const a=new ze(o,i);return a.assertValidity(),a}static fromUncompressedHex(t){const r=nr(t.subarray(1,wr+1)),o=nr(t.subarray(wr+1,wr*2+1)),n=new ze(r,o);return n.assertValidity(),n}static fromHex(t){const r=Nr(t),o=r.length,n=r[0];if(o===wr)return this.fromCompressedHex(r);if(o===gl&&(n===2||n===3))return this.fromCompressedHex(r);if(o===ml&&n===4)return this.fromUncompressedHex(r);throw new Error(`Point.fromHex: received invalid point. Expected 32-${gl} compressed bytes or ${ml} uncompressed bytes, not ${o}`)}static fromPrivateKey(t){return ze.BASE.multiply(Pn(t))}static fromSignature(t,r,o){const{r:n,s:i}=zy(r);if(![0,1,2,3].includes(o))throw new Error("Cannot recover: invalid recovery bit");const s=vf(Nr(t)),{n:a}=Ge,l=o===2||o===3?n+a:n,c=Hi(l,a),u=le(-s*c,a),d=le(i*c,a),f=o&1?"03":"02",h=ze.fromHex(f+Do(l)),p=ze.BASE.multiplyAndAddUnsafe(h,u,d);if(!p)throw new Error("Cannot recover signature: point at infinify");return p.assertValidity(),p}toRawBytes(t=!1){return zo(this.toHex(t))}toHex(t=!1){const r=Do(this.x);return t?`${this.hasEvenY()?"02":"03"}${r}`:`04${r}${Do(this.y)}`}toHexX(){return this.toHex(!0).slice(2)}toRawX(){return this.toRawBytes(!0).slice(1)}assertValidity(){const t="Point is not on elliptic curve",{x:r,y:o}=this;if(!Ya(r)||!Ya(o))throw new Error(t);const n=le(o*o),i=Ng(r);if(le(n-i)!==De)throw new Error(t)}equals(t){return this.x===t.x&&this.y===t.y}negate(){return new ze(this.x,le(-this.y))}double(){return Ve.fromAffine(this).double().toAffine()}add(t){return Ve.fromAffine(this).add(Ve.fromAffine(t)).toAffine()}subtract(t){return this.add(t.negate())}multiply(t){return Ve.fromAffine(this).multiply(t,this).toAffine()}multiplyAndAddUnsafe(t,r,o){const n=Ve.fromAffine(this),i=r===De||r===lt||this!==ze.BASE?n.multiplyUnsafe(r):n.multiply(r),s=Ve.fromAffine(t).multiplyUnsafe(o),a=i.add(s);return a.equals(Ve.ZERO)?void 0:a.toAffine()}}ze.BASE=new ze(Ge.Gx,Ge.Gy);ze.ZERO=new ze(De,De);function Wg(e){return Number.parseInt(e[0],16)>=8?"00"+e:e}function Ug(e){if(e.length<2||e[0]!==2)throw new Error(`Invalid signature integer tag: ${xi(e)}`);const t=e[1],r=e.subarray(2,t+2);if(!t||r.length!==t)throw new Error("Invalid signature integer: wrong length");if(r[0]===0&&r[1]<=127)throw new Error("Invalid signature integer: trailing length");return{data:nr(r),left:e.subarray(t+2)}}function GD(e){if(e.length<2||e[0]!=48)throw new Error(`Invalid signature tag: ${xi(e)}`);if(e[1]!==e.length-2)throw new Error("Invalid signature: incorrect length");const{data:t,left:r}=Ug(e.subarray(2)),{data:o,left:n}=Ug(r);if(n.length)throw new Error(`Invalid signature: left bytes after parsing: ${xi(n)}`);return{r:t,s:o}}class to{constructor(t,r){this.r=t,this.s=r,this.assertValidity()}static fromCompact(t){const r=t instanceof Uint8Array,o="Signature.fromCompact";if(typeof t!="string"&&!r)throw new TypeError(`${o}: Expected string or Uint8Array`);const n=r?xi(t):t;if(n.length!==128)throw new Error(`${o}: Expected 64-byte hex`);return new to(bl(n.slice(0,64)),bl(n.slice(64,128)))}static fromDER(t){const r=t instanceof Uint8Array;if(typeof t!="string"&&!r)throw new TypeError("Signature.fromDER: Expected string or Uint8Array");const{r:o,s:n}=GD(r?t:zo(t));return new to(o,n)}static fromHex(t){return this.fromDER(t)}assertValidity(){const{r:t,s:r}=this;if(!wi(t))throw new Error("Invalid Signature: r must be 0 < r < n");if(!wi(r))throw new Error("Invalid Signature: s must be 0 < s < n")}hasHighS(){const t=Ge.n>>lt;return this.s>t}normalizeS(){return this.hasHighS()?new to(this.r,le(-this.s,Ge.n)):this}toDERRawBytes(){return zo(this.toDERHex())}toDERHex(){const t=Wg(Xi(this.s)),r=Wg(Xi(this.r)),o=t.length/2,n=r.length/2,i=Xi(o),s=Xi(n);return`30${Xi(n+o+4)}02${s}${r}02${i}${t}`}toRawBytes(){return this.toDERRawBytes()}toHex(){return this.toDERHex()}toCompactRawBytes(){return zo(this.toCompactHex())}toCompactHex(){return Do(this.r)+Do(this.s)}}function Ro(...e){if(!e.every(o=>o instanceof Uint8Array))throw new Error("Uint8Array list expected");if(e.length===1)return e[0];const t=e.reduce((o,n)=>o+n.length,0),r=new Uint8Array(t);for(let o=0,n=0;o<e.length;o++){const i=e[o];r.set(i,n),n+=i.length}return r}const XD=Array.from({length:256},(e,t)=>t.toString(16).padStart(2,"0"));function xi(e){if(!(e instanceof Uint8Array))throw new Error("Expected Uint8Array");let t="";for(let r=0;r<e.length;r++)t+=XD[e[r]];return t}const YD=BigInt("0x10000000000000000000000000000000000000000000000000000000000000000");function Do(e){if(typeof e!="bigint")throw new Error("Expected bigint");if(!(De<=e&&e<YD))throw new Error("Expected number 0 <= n < 2^256");return e.toString(16).padStart(64,"0")}function Ci(e){const t=zo(Do(e));if(t.length!==32)throw new Error("Error: expected 32 bytes");return t}function Xi(e){const t=e.toString(16);return t.length&1?`0${t}`:t}function bl(e){if(typeof e!="string")throw new TypeError("hexToNumber: expected string, got "+typeof e);return BigInt(`0x${e}`)}function zo(e){if(typeof e!="string")throw new TypeError("hexToBytes: expected string, got "+typeof e);if(e.length%2)throw new Error("hexToBytes: received invalid unpadded hex"+e.length);const t=new Uint8Array(e.length/2);for(let r=0;r<t.length;r++){const o=r*2,n=e.slice(o,o+2),i=Number.parseInt(n,16);if(Number.isNaN(i)||i<0)throw new Error("Invalid byte sequence");t[r]=i}return t}function nr(e){return bl(xi(e))}function Nr(e){return e instanceof Uint8Array?Uint8Array.from(e):zo(e)}function Vg(e){if(typeof e=="number"&&Number.isSafeInteger(e)&&e>0)return BigInt(e);if(typeof e=="bigint"&&wi(e))return e;throw new TypeError("Expected valid private scalar: 0 < scalar < curve.n")}function le(e,t=Ge.P){const r=e%t;return r>=De?r:t+r}function cr(e,t){const{P:r}=Ge;let o=e;for(;t-- >De;)o*=o,o%=r;return o}function ZD(e){const{P:t}=Ge,r=BigInt(6),o=BigInt(11),n=BigInt(22),i=BigInt(23),s=BigInt(44),a=BigInt(88),l=e*e*e%t,c=l*l*e%t,u=cr(c,bs)*c%t,d=cr(u,bs)*c%t,f=cr(d,Ao)*l%t,h=cr(f,o)*f%t,p=cr(h,n)*h%t,m=cr(p,s)*p%t,y=cr(m,a)*m%t,g=cr(y,s)*p%t,w=cr(g,bs)*c%t,T=cr(w,i)*h%t,x=cr(T,r)*l%t,C=cr(x,Ao);if(C*C%t!==e)throw new Error("Cannot find square root");return C}function Hi(e,t=Ge.P){if(e===De||t<=De)throw new Error(`invert: expected positive integers, got n=${e} mod=${t}`);let r=le(e,t),o=t,n=De,i=lt;for(;r!==De;){const a=o/r,l=o%r,c=n-i*a;o=r,r=l,n=i,i=c}if(o!==lt)throw new Error("invert: does not exist");return le(n,t)}function JD(e,t=Ge.P){const r=new Array(e.length),o=e.reduce((i,s,a)=>s===De?i:(r[a]=i,le(i*s,t)),lt),n=Hi(o,t);return e.reduceRight((i,s,a)=>s===De?i:(r[a]=le(i*r[a],t),le(i*s,t)),n),r}function QD(e){const t=e.length*8-yi*8,r=nr(e);return t>0?r>>BigInt(t):r}function vf(e,t=!1){const r=QD(e);if(t)return r;const{n:o}=Ge;return r>=o?r-o:r}let si,vs;class ez{constructor(t,r){if(this.hashLen=t,this.qByteLen=r,typeof t!="number"||t<2)throw new Error("hashLen must be a number");if(typeof r!="number"||r<2)throw new Error("qByteLen must be a number");this.v=new Uint8Array(t).fill(1),this.k=new Uint8Array(t).fill(0),this.counter=0}hmac(...t){return Re.hmacSha256(this.k,...t)}hmacSync(...t){return vs(this.k,...t)}checkSync(){if(typeof vs!="function")throw new bf("hmacSha256Sync needs to be set")}incr(){if(this.counter>=1e3)throw new Error("Tried 1,000 k values for sign(), all were invalid");this.counter+=1}async reseed(t=new Uint8Array){this.k=await this.hmac(this.v,Uint8Array.from([0]),t),this.v=await this.hmac(this.v),t.length!==0&&(this.k=await this.hmac(this.v,Uint8Array.from([1]),t),this.v=await this.hmac(this.v))}reseedSync(t=new Uint8Array){this.checkSync(),this.k=this.hmacSync(this.v,Uint8Array.from([0]),t),this.v=this.hmacSync(this.v),t.length!==0&&(this.k=this.hmacSync(this.v,Uint8Array.from([1]),t),this.v=this.hmacSync(this.v))}async generate(){this.incr();let t=0;const r=[];for(;t<this.qByteLen;){this.v=await this.hmac(this.v);const o=this.v.slice();r.push(o),t+=this.v.length}return Ro(...r)}generateSync(){this.checkSync(),this.incr();let t=0;const r=[];for(;t<this.qByteLen;){this.v=this.hmacSync(this.v);const o=this.v.slice();r.push(o),t+=this.v.length}return Ro(...r)}}function wi(e){return De<e&&e<Ge.n}function Ya(e){return De<e&&e<Ge.P}function tz(e,t,r,o=!0){const{n}=Ge,i=vf(e,!0);if(!wi(i))return;const s=Hi(i,n),a=ze.BASE.multiply(i),l=le(a.x,n);if(l===De)return;const c=le(s*le(t+r*l,n),n);if(c===De)return;let u=new to(l,c),d=(a.x===u.r?0:2)|Number(a.y&lt);return o&&u.hasHighS()&&(u=u.normalizeS(),d^=1),{sig:u,recovery:d}}function Pn(e){let t;if(typeof e=="bigint")t=e;else if(typeof e=="number"&&Number.isSafeInteger(e)&&e>0)t=BigInt(e);else if(typeof e=="string"){if(e.length!==2*yi)throw new Error("Expected 32 bytes of private key");t=bl(e)}else if(e instanceof Uint8Array){if(e.length!==yi)throw new Error("Expected 32 bytes of private key");t=nr(e)}else throw new TypeError("Expected valid private key");if(!wi(t))throw new Error("Expected private key: 0 < key < n");return t}function yf(e){return e instanceof ze?(e.assertValidity(),e):ze.fromHex(e)}function zy(e){if(e instanceof to)return e.assertValidity(),e;try{return to.fromDER(e)}catch{return to.fromCompact(e)}}function rz(e,t=!1){return ze.fromPrivateKey(e).toRawBytes(t)}function Kg(e){const t=e instanceof Uint8Array,r=typeof e=="string",o=(t||r)&&e.length;return t?o===gl||o===ml:r?o===gl*2||o===ml*2:e instanceof ze}function Fy(e,t,r=!1){if(Kg(e))throw new TypeError("getSharedSecret: first arg must be private key");if(!Kg(t))throw new TypeError("getSharedSecret: second arg must be public key");const o=yf(t);return o.assertValidity(),o.multiply(Pn(e)).toRawBytes(r)}function Ny(e){const t=e.length>wr?e.slice(0,wr):e;return nr(t)}function oz(e){const t=Ny(e),r=le(t,Ge.n);return jy(r<De?t:r)}function jy(e){return Ci(e)}function nz(e,t,r){if(e==null)throw new Error(`sign: expected valid message hash, not "${e}"`);const o=Nr(e),n=Pn(t),i=[jy(n),oz(o)];if(r!=null){r===!0&&(r=Re.randomBytes(wr));const l=Nr(r);if(l.length!==wr)throw new Error(`sign: Expected ${wr} bytes of extra data`);i.push(l)}const s=Ro(...i),a=Ny(o);return{seed:s,m:a,d:n}}function iz(e,t){const{sig:r,recovery:o}=e,{der:n,recovered:i}=Object.assign({canonical:!0,der:!0},t),s=n?r.toDERRawBytes():r.toCompactRawBytes();return i?[s,o]:s}function sz(e,t,r={}){const{seed:o,m:n,d:i}=nz(e,t,r.extraEntropy),s=new ez(qD,yi);s.reseedSync(o);let a;for(;!(a=tz(s.generateSync(),n,i,r.canonical));)s.reseedSync();return iz(a,r)}const az={strict:!0};function lz(e,t,r,o=az){let n;try{n=zy(e),t=Nr(t)}catch{return!1}const{r:i,s}=n;if(o.strict&&n.hasHighS())return!1;const a=vf(t);let l;try{l=yf(r)}catch{return!1}const{n:c}=Ge,u=Hi(s,c),d=le(a*u,c),f=le(i*u,c),h=ze.BASE.multiplyAndAddUnsafe(l,d,f);return h?le(h.x,c)===i:!1}function vl(e){return le(nr(e),Ge.n)}class Si{constructor(t,r){this.r=t,this.s=r,this.assertValidity()}static fromHex(t){const r=Nr(t);if(r.length!==64)throw new TypeError(`SchnorrSignature.fromHex: expected 64 bytes, not ${r.length}`);const o=nr(r.subarray(0,32)),n=nr(r.subarray(32,64));return new Si(o,n)}assertValidity(){const{r:t,s:r}=this;if(!Ya(t)||!wi(r))throw new Error("Invalid signature")}toHex(){return Do(this.r)+Do(this.s)}toRawBytes(){return zo(this.toHex())}}function cz(e){return ze.fromPrivateKey(e).toRawX()}class Wy{constructor(t,r,o=Re.randomBytes()){if(t==null)throw new TypeError(`sign: Expected valid message, not "${t}"`);this.m=Nr(t);const{x:n,scalar:i}=this.getScalar(Pn(r));if(this.px=n,this.d=i,this.rand=Nr(o),this.rand.length!==32)throw new TypeError("sign: Expected 32 bytes of aux randomness")}getScalar(t){const r=ze.fromPrivateKey(t),o=r.hasEvenY()?t:Ge.n-t;return{point:r,scalar:o,x:r.toRawX()}}initNonce(t,r){return Ci(t^nr(r))}finalizeNonce(t){const r=le(nr(t),Ge.n);if(r===De)throw new Error("sign: Creation of signature failed. k is zero");const{point:o,x:n,scalar:i}=this.getScalar(r);return{R:o,rx:n,k:i}}finalizeSig(t,r,o,n){return new Si(t.x,le(r+o*n,Ge.n)).toRawBytes()}error(){throw new Error("sign: Invalid signature produced")}async calc(){const{m:t,d:r,px:o,rand:n}=this,i=Re.taggedHash,s=this.initNonce(r,await i(Io.aux,n)),{R:a,rx:l,k:c}=this.finalizeNonce(await i(Io.nonce,s,o,t)),u=vl(await i(Io.challenge,l,o,t)),d=this.finalizeSig(a,c,u,r);return await Ky(d,t,o)||this.error(),d}calcSync(){const{m:t,d:r,px:o,rand:n}=this,i=Re.taggedHashSync,s=this.initNonce(r,i(Io.aux,n)),{R:a,rx:l,k:c}=this.finalizeNonce(i(Io.nonce,s,o,t)),u=vl(i(Io.challenge,l,o,t)),d=this.finalizeSig(a,c,u,r);return qy(d,t,o)||this.error(),d}}async function uz(e,t,r){return new Wy(e,t,r).calc()}function dz(e,t,r){return new Wy(e,t,r).calcSync()}function Uy(e,t,r){const o=e instanceof Si,n=o?e:Si.fromHex(e);return o&&n.assertValidity(),{...n,m:Nr(t),P:yf(r)}}function Vy(e,t,r,o){const n=ze.BASE.multiplyAndAddUnsafe(t,Pn(r),le(-o,Ge.n));return!(!n||!n.hasEvenY()||n.x!==e)}async function Ky(e,t,r){try{const{r:o,s:n,m:i,P:s}=Uy(e,t,r),a=vl(await Re.taggedHash(Io.challenge,Ci(o),s.toRawX(),i));return Vy(o,s,n,a)}catch{return!1}}function qy(e,t,r){try{const{r:o,s:n,m:i,P:s}=Uy(e,t,r),a=vl(Re.taggedHashSync(Io.challenge,Ci(o),s.toRawX(),i));return Vy(o,s,n,a)}catch(o){if(o instanceof bf)throw o;return!1}}const oa={Signature:Si,getPublicKey:cz,sign:uz,verify:Ky,signSync:dz,verifySync:qy};ze.BASE._setWindowSize(8);const Jt={node:KD,web:typeof self=="object"&&"crypto"in self?self.crypto:void 0},Io={challenge:"BIP0340/challenge",aux:"BIP0340/aux",nonce:"BIP0340/nonce"},Ma={},Re={bytesToHex:xi,hexToBytes:zo,concatBytes:Ro,mod:le,invert:Hi,isValidPrivateKey(e){try{return Pn(e),!0}catch{return!1}},_bigintTo32Bytes:Ci,_normalizePrivateKey:Pn,hashToPrivateKey:e=>{e=Nr(e);const t=yi+8;if(e.length<t||e.length>1024)throw new Error("Expected valid bytes of private key as per FIPS 186");const r=le(nr(e),Ge.n-lt)+lt;return Ci(r)},randomBytes:(e=32)=>{if(Jt.web)return Jt.web.getRandomValues(new Uint8Array(e));if(Jt.node){const{randomBytes:t}=Jt.node;return Uint8Array.from(t(e))}else throw new Error("The environment doesn't have randomBytes function")},randomPrivateKey:()=>Re.hashToPrivateKey(Re.randomBytes(yi+8)),precompute(e=8,t=ze.BASE){const r=t===ze.BASE?t:new ze(t.x,t.y);return r._setWindowSize(e),r.multiply(bs),r},sha256:async(...e)=>{if(Jt.web){const t=await Jt.web.subtle.digest("SHA-256",Ro(...e));return new Uint8Array(t)}else if(Jt.node){const{createHash:t}=Jt.node,r=t("sha256");return e.forEach(o=>r.update(o)),Uint8Array.from(r.digest())}else throw new Error("The environment doesn't have sha256 function")},hmacSha256:async(e,...t)=>{if(Jt.web){const r=await Jt.web.subtle.importKey("raw",e,{name:"HMAC",hash:{name:"SHA-256"}},!1,["sign"]),o=Ro(...t),n=await Jt.web.subtle.sign("HMAC",r,o);return new Uint8Array(n)}else if(Jt.node){const{createHmac:r}=Jt.node,o=r("sha256",e);return t.forEach(n=>o.update(n)),Uint8Array.from(o.digest())}else throw new Error("The environment doesn't have hmac-sha256 function")},sha256Sync:void 0,hmacSha256Sync:void 0,taggedHash:async(e,...t)=>{let r=Ma[e];if(r===void 0){const o=await Re.sha256(Uint8Array.from(e,n=>n.charCodeAt(0)));r=Ro(o,o),Ma[e]=r}return Re.sha256(r,...t)},taggedHashSync:(e,...t)=>{if(typeof si!="function")throw new bf("sha256Sync is undefined, you need to set it");let r=Ma[e];if(r===void 0){const o=si(Uint8Array.from(e,n=>n.charCodeAt(0)));r=Ro(o,o),Ma[e]=r}return si(r,...t)},_JacobianPoint:Ve};Object.defineProperties(Re,{sha256Sync:{configurable:!1,get(){return si},set(e){si||(si=e)}},hmacSha256Sync:{configurable:!1,get(){return vs},set(e){vs||(vs=e)}}});const qg={node:void 0,web:typeof self=="object"&&"crypto"in self?self.crypto:void 0};/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */const Nc=e=>new DataView(e.buffer,e.byteOffset,e.byteLength),Rr=(e,t)=>e<<32-t|e>>>t,fz=new Uint8Array(new Uint32Array([287454020]).buffer)[0]===68;if(!fz)throw new Error("Non little-endian hardware is not supported");Array.from({length:256},(e,t)=>t.toString(16).padStart(2,"0"));(()=>{const e=typeof module<"u"&&typeof module.require=="function"&&module.require.bind(module);try{if(e){const{setImmediate:t}=e("timers");return()=>new Promise(r=>t(r))}}catch{}return()=>new Promise(t=>setTimeout(t,0))})();function hz(e){if(typeof e!="string")throw new TypeError(`utf8ToBytes expected string, got ${typeof e}`);return new TextEncoder().encode(e)}function xf(e){if(typeof e=="string"&&(e=hz(e)),!(e instanceof Uint8Array))throw new TypeError(`Expected input type is Uint8Array (got ${typeof e})`);return e}function Gg(e){if(!Number.isSafeInteger(e)||e<0)throw new Error(`Wrong positive integer: ${e}`)}function pz(e){if(typeof e!="function"||typeof e.create!="function")throw new Error("Hash should be wrapped by utils.wrapConstructor");Gg(e.outputLen),Gg(e.blockLen)}class Uu{clone(){return this._cloneInto()}}function gz(e){const t=o=>e().update(xf(o)).digest(),r=e();return t.outputLen=r.outputLen,t.blockLen=r.blockLen,t.create=()=>e(),t}function mz(e=32){if(qg.web)return qg.web.getRandomValues(new Uint8Array(e));throw new Error("The environment doesn't have randomBytes function")}function bz(e,t,r,o){if(typeof e.setBigUint64=="function")return e.setBigUint64(t,r,o);const n=BigInt(32),i=BigInt(4294967295),s=Number(r>>n&i),a=Number(r&i),l=o?4:0,c=o?0:4;e.setUint32(t+l,s,o),e.setUint32(t+c,a,o)}class vz extends Uu{constructor(t,r,o,n){super(),this.blockLen=t,this.outputLen=r,this.padOffset=o,this.isLE=n,this.finished=!1,this.length=0,this.pos=0,this.destroyed=!1,this.buffer=new Uint8Array(t),this.view=Nc(this.buffer)}update(t){if(this.destroyed)throw new Error("instance is destroyed");const{view:r,buffer:o,blockLen:n,finished:i}=this;if(i)throw new Error("digest() was already called");t=xf(t);const s=t.length;for(let a=0;a<s;){const l=Math.min(n-this.pos,s-a);if(l===n){const c=Nc(t);for(;n<=s-a;a+=n)this.process(c,a);continue}o.set(t.subarray(a,a+l),this.pos),this.pos+=l,a+=l,this.pos===n&&(this.process(r,0),this.pos=0)}return this.length+=t.length,this.roundClean(),this}digestInto(t){if(this.destroyed)throw new Error("instance is destroyed");if(!(t instanceof Uint8Array)||t.length<this.outputLen)throw new Error("_Sha2: Invalid output buffer");if(this.finished)throw new Error("digest() was already called");this.finished=!0;const{buffer:r,view:o,blockLen:n,isLE:i}=this;let{pos:s}=this;r[s++]=128,this.buffer.subarray(s).fill(0),this.padOffset>n-s&&(this.process(o,0),s=0);for(let l=s;l<n;l++)r[l]=0;bz(o,n-8,BigInt(this.length*8),i),this.process(o,0);const a=Nc(t);this.get().forEach((l,c)=>a.setUint32(4*c,l,i))}digest(){const{buffer:t,outputLen:r}=this;this.digestInto(t);const o=t.slice(0,r);return this.destroy(),o}_cloneInto(t){t||(t=new this.constructor),t.set(...this.get());const{blockLen:r,buffer:o,length:n,finished:i,destroyed:s,pos:a}=this;return t.length=n,t.pos=a,t.finished=i,t.destroyed=s,n%r&&t.buffer.set(o),t}}const yz=(e,t,r)=>e&t^~e&r,xz=(e,t,r)=>e&t^e&r^t&r,Cz=new Uint32Array([1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298]),xo=new Uint32Array([1779033703,3144134277,1013904242,2773480762,1359893119,2600822924,528734635,1541459225]),Co=new Uint32Array(64);class wz extends vz{constructor(){super(64,32,8,!1),this.A=xo[0]|0,this.B=xo[1]|0,this.C=xo[2]|0,this.D=xo[3]|0,this.E=xo[4]|0,this.F=xo[5]|0,this.G=xo[6]|0,this.H=xo[7]|0}get(){const{A:t,B:r,C:o,D:n,E:i,F:s,G:a,H:l}=this;return[t,r,o,n,i,s,a,l]}set(t,r,o,n,i,s,a,l){this.A=t|0,this.B=r|0,this.C=o|0,this.D=n|0,this.E=i|0,this.F=s|0,this.G=a|0,this.H=l|0}process(t,r){for(let d=0;d<16;d++,r+=4)Co[d]=t.getUint32(r,!1);for(let d=16;d<64;d++){const f=Co[d-15],h=Co[d-2],p=Rr(f,7)^Rr(f,18)^f>>>3,m=Rr(h,17)^Rr(h,19)^h>>>10;Co[d]=m+Co[d-7]+p+Co[d-16]|0}let{A:o,B:n,C:i,D:s,E:a,F:l,G:c,H:u}=this;for(let d=0;d<64;d++){const f=Rr(a,6)^Rr(a,11)^Rr(a,25),h=u+f+yz(a,l,c)+Cz[d]+Co[d]|0,m=(Rr(o,2)^Rr(o,13)^Rr(o,22))+xz(o,n,i)|0;u=c,c=l,l=a,a=s+h|0,s=i,i=n,n=o,o=h+m|0}o=o+this.A|0,n=n+this.B|0,i=i+this.C|0,s=s+this.D|0,a=a+this.E|0,l=l+this.F|0,c=c+this.G|0,u=u+this.H|0,this.set(o,n,i,s,a,l,c,u)}roundClean(){Co.fill(0)}destroy(){this.set(0,0,0,0,0,0,0,0),this.buffer.fill(0)}}const na=gz(()=>new wz);/*! scure-base - MIT License (c) 2022 Paul Miller (paulmillr.com) */function Zo(e){if(!Number.isSafeInteger(e))throw new Error(`Wrong integer: ${e}`)}function $r(...e){const t=(n,i)=>s=>n(i(s)),r=Array.from(e).reverse().reduce((n,i)=>n?t(n,i.encode):i.encode,void 0),o=e.reduce((n,i)=>n?t(n,i.decode):i.decode,void 0);return{encode:r,decode:o}}function Wr(e){return{encode:t=>{if(!Array.isArray(t)||t.length&&typeof t[0]!="number")throw new Error("alphabet.encode input should be an array of numbers");return t.map(r=>{if(Zo(r),r<0||r>=e.length)throw new Error(`Digit index outside alphabet: ${r} (alphabet: ${e.length})`);return e[r]})},decode:t=>{if(!Array.isArray(t)||t.length&&typeof t[0]!="string")throw new Error("alphabet.decode input should be array of strings");return t.map(r=>{if(typeof r!="string")throw new Error(`alphabet.decode: not string element=${r}`);const o=e.indexOf(r);if(o===-1)throw new Error(`Unknown letter: "${r}". Allowed: ${e}`);return o})}}}function Ur(e=""){if(typeof e!="string")throw new Error("join separator should be string");return{encode:t=>{if(!Array.isArray(t)||t.length&&typeof t[0]!="string")throw new Error("join.encode input should be array of strings");for(let r of t)if(typeof r!="string")throw new Error(`join.encode: non-string input=${r}`);return t.join(e)},decode:t=>{if(typeof t!="string")throw new Error("join.decode input should be string");return t.split(e)}}}function ia(e,t="="){if(Zo(e),typeof t!="string")throw new Error("padding chr should be string");return{encode(r){if(!Array.isArray(r)||r.length&&typeof r[0]!="string")throw new Error("padding.encode input should be array of strings");for(let o of r)if(typeof o!="string")throw new Error(`padding.encode: non-string input=${o}`);for(;r.length*e%8;)r.push(t);return r},decode(r){if(!Array.isArray(r)||r.length&&typeof r[0]!="string")throw new Error("padding.encode input should be array of strings");for(let n of r)if(typeof n!="string")throw new Error(`padding.decode: non-string input=${n}`);let o=r.length;if(o*e%8)throw new Error("Invalid padding: string should have whole number of bytes");for(;o>0&&r[o-1]===t;o--)if(!((o-1)*e%8))throw new Error("Invalid padding: string has too much padding");return r.slice(0,o)}}}function Gy(e){if(typeof e!="function")throw new Error("normalize fn should be function");return{encode:t=>t,decode:t=>e(t)}}function Xg(e,t,r){if(t<2)throw new Error(`convertRadix: wrong from=${t}, base cannot be less than 2`);if(r<2)throw new Error(`convertRadix: wrong to=${r}, base cannot be less than 2`);if(!Array.isArray(e))throw new Error("convertRadix: data should be array");if(!e.length)return[];let o=0;const n=[],i=Array.from(e);for(i.forEach(s=>{if(Zo(s),s<0||s>=t)throw new Error(`Wrong integer: ${s}`)});;){let s=0,a=!0;for(let l=o;l<i.length;l++){const c=i[l],u=t*s+c;if(!Number.isSafeInteger(u)||t*s/t!==s||u-c!==t*s)throw new Error("convertRadix: carry overflow");if(s=u%r,i[l]=Math.floor(u/r),!Number.isSafeInteger(i[l])||i[l]*r+s!==u)throw new Error("convertRadix: carry overflow");if(a)i[l]?a=!1:o=l;else continue}if(n.push(s),a)break}for(let s=0;s<e.length-1&&e[s]===0;s++)n.push(0);return n.reverse()}const Xy=(e,t)=>t?Xy(t,e%t):e,yl=(e,t)=>e+(t-Xy(e,t));function Vu(e,t,r,o){if(!Array.isArray(e))throw new Error("convertRadix2: data should be array");if(t<=0||t>32)throw new Error(`convertRadix2: wrong from=${t}`);if(r<=0||r>32)throw new Error(`convertRadix2: wrong to=${r}`);if(yl(t,r)>32)throw new Error(`convertRadix2: carry overflow from=${t} to=${r} carryBits=${yl(t,r)}`);let n=0,i=0;const s=2**r-1,a=[];for(const l of e){if(Zo(l),l>=2**t)throw new Error(`convertRadix2: invalid data word=${l} from=${t}`);if(n=n<<t|l,i+t>32)throw new Error(`convertRadix2: carry overflow pos=${i} from=${t}`);for(i+=t;i>=r;i-=r)a.push((n>>i-r&s)>>>0);n&=2**i-1}if(n=n<<r-i&s,!o&&i>=t)throw new Error("Excess padding");if(!o&&n)throw new Error(`Non-zero padding: ${n}`);return o&&i>0&&a.push(n>>>0),a}function Yy(e){return Zo(e),{encode:t=>{if(!(t instanceof Uint8Array))throw new Error("radix.encode input should be Uint8Array");return Xg(Array.from(t),2**8,e)},decode:t=>{if(!Array.isArray(t)||t.length&&typeof t[0]!="number")throw new Error("radix.decode input should be array of strings");return Uint8Array.from(Xg(t,e,2**8))}}}function fo(e,t=!1){if(Zo(e),e<=0||e>32)throw new Error("radix2: bits should be in (0..32]");if(yl(8,e)>32||yl(e,8)>32)throw new Error("radix2: carry overflow");return{encode:r=>{if(!(r instanceof Uint8Array))throw new Error("radix2.encode input should be Uint8Array");return Vu(Array.from(r),8,e,!t)},decode:r=>{if(!Array.isArray(r)||r.length&&typeof r[0]!="number")throw new Error("radix2.decode input should be array of strings");return Uint8Array.from(Vu(r,e,8,t))}}}function Yg(e){if(typeof e!="function")throw new Error("unsafeWrapper fn should be function");return function(...t){try{return e.apply(null,t)}catch{}}}function Zy(e,t){if(Zo(e),typeof t!="function")throw new Error("checksum fn should be function");return{encode(r){if(!(r instanceof Uint8Array))throw new Error("checksum.encode: input should be Uint8Array");const o=t(r).slice(0,e),n=new Uint8Array(r.length+e);return n.set(r),n.set(o,r.length),n},decode(r){if(!(r instanceof Uint8Array))throw new Error("checksum.decode: input should be Uint8Array");const o=r.slice(0,-e),n=t(o).slice(0,e),i=r.slice(-e);for(let s=0;s<e;s++)if(n[s]!==i[s])throw new Error("Invalid checksum");return o}}}const Sz={alphabet:Wr,chain:$r,checksum:Zy,radix:Yy,radix2:fo,join:Ur,padding:ia},Jy=$r(fo(4),Wr("0123456789ABCDEF"),Ur("")),Qy=$r(fo(5),Wr("ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"),ia(5),Ur("")),Ez=$r(fo(5),Wr("0123456789ABCDEFGHIJKLMNOPQRSTUV"),ia(5),Ur("")),_z=$r(fo(5),Wr("0123456789ABCDEFGHJKMNPQRSTVWXYZ"),Ur(""),Gy(e=>e.toUpperCase().replace(/O/g,"0").replace(/[IL]/g,"1"))),Ei=$r(fo(6),Wr("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"),ia(6),Ur("")),ex=$r(fo(6),Wr("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"),ia(6),Ur("")),Cf=e=>$r(Yy(58),Wr(e),Ur("")),Ns=Cf("123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"),Tz=Cf("123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"),$z=Cf("rpshnaf39wBUDNEGHJKLM4PQRST7VWXYZ2bcdeCg65jkm8oFqi1tuvAxyz"),Zg=[0,2,3,5,6,7,9,10,11],tx={encode(e){let t="";for(let r=0;r<e.length;r+=8){const o=e.subarray(r,r+8);t+=Ns.encode(o).padStart(Zg[o.length],"1")}return t},decode(e){let t=[];for(let r=0;r<e.length;r+=11){const o=e.slice(r,r+11),n=Zg.indexOf(o.length),i=Ns.decode(o);for(let s=0;s<i.length-n;s++)if(i[s]!==0)throw new Error("base58xmr: wrong padding");t=t.concat(Array.from(i.slice(i.length-n)))}return Uint8Array.from(t)}},rx=e=>$r(Zy(4,t=>e(e(t))),Ns),Ku=$r(Wr("qpzry9x8gf2tvdw0s3jn54khce6mua7l"),Ur("")),Jg=[996825010,642813549,513874426,1027748829,705979059];function Yi(e){const t=e>>25;let r=(e&33554431)<<5;for(let o=0;o<Jg.length;o++)(t>>o&1)===1&&(r^=Jg[o]);return r}function Qg(e,t,r=1){const o=e.length;let n=1;for(let i=0;i<o;i++){const s=e.charCodeAt(i);if(s<33||s>126)throw new Error(`Invalid prefix (${e})`);n=Yi(n)^s>>5}n=Yi(n);for(let i=0;i<o;i++)n=Yi(n)^e.charCodeAt(i)&31;for(let i of t)n=Yi(n)^i;for(let i=0;i<6;i++)n=Yi(n);return n^=r,Ku.encode(Vu([n%2**30],30,5,!1))}function ox(e){const t=e==="bech32"?1:734539939,r=fo(5),o=r.decode,n=r.encode,i=Yg(o);function s(u,d,f=90){if(typeof u!="string")throw new Error(`bech32.encode prefix should be string, not ${typeof u}`);if(!Array.isArray(d)||d.length&&typeof d[0]!="number")throw new Error(`bech32.encode words should be array of numbers, not ${typeof d}`);const h=u.length+7+d.length;if(f!==!1&&h>f)throw new TypeError(`Length ${h} exceeds limit ${f}`);return u=u.toLowerCase(),`${u}1${Ku.encode(d)}${Qg(u,d,t)}`}function a(u,d=90){if(typeof u!="string")throw new Error(`bech32.decode input should be string, not ${typeof u}`);if(u.length<8||d!==!1&&u.length>d)throw new TypeError(`Wrong string length: ${u.length} (${u}). Expected (8..${d})`);const f=u.toLowerCase();if(u!==f&&u!==u.toUpperCase())throw new Error("String must be lowercase or uppercase");u=f;const h=u.lastIndexOf("1");if(h===0||h===-1)throw new Error('Letter "1" must be present between prefix and data only');const p=u.slice(0,h),m=u.slice(h+1);if(m.length<6)throw new Error("Data must be at least 6 characters long");const y=Ku.decode(m).slice(0,-6),g=Qg(p,y,t);if(!m.endsWith(g))throw new Error(`Invalid checksum in ${u}: expected "${g}"`);return{prefix:p,words:y}}const l=Yg(a);function c(u){const{prefix:d,words:f}=a(u,!1);return{prefix:d,words:f,bytes:o(f)}}return{encode:s,decode:a,decodeToBytes:c,decodeUnsafe:l,fromWords:o,fromWordsUnsafe:i,toWords:n}}const sr=ox("bech32"),Pz=ox("bech32m"),nx={encode:e=>new TextDecoder().decode(e),decode:e=>new TextEncoder().encode(e)},ix=$r(fo(4),Wr("0123456789abcdef"),Ur(""),Gy(e=>{if(typeof e!="string"||e.length%2)throw new TypeError(`hex.decode: expected string, got ${typeof e} with length ${e.length}`);return e.toLowerCase()})),js={utf8:nx,hex:ix,base16:Jy,base32:Qy,base64:Ei,base64url:ex,base58:Ns,base58xmr:tx},sx=`Invalid encoding type. Available types: ${Object.keys(js).join(", ")}`,ax=(e,t)=>{if(typeof e!="string"||!js.hasOwnProperty(e))throw new TypeError(sx);if(!(t instanceof Uint8Array))throw new TypeError("bytesToString() expects Uint8Array");return js[e].encode(t)},Lz=ax,lx=(e,t)=>{if(!js.hasOwnProperty(e))throw new TypeError(sx);if(typeof t!="string")throw new TypeError("stringToBytes() expects string");return js[e].decode(t)},kz=lx,Iz=Object.freeze(Object.defineProperty({__proto__:null,assertNumber:Zo,utils:Sz,base16:Jy,base32:Qy,base32hex:Ez,base32crockford:_z,base64:Ei,base64url:ex,base58:Ns,base58flickr:Tz,base58xrp:$z,base58xmr:tx,base58check:rx,bech32:sr,bech32m:Pz,utf8:nx,hex:ix,bytesToString:ax,str:Lz,stringToBytes:lx,bytes:kz},Symbol.toStringTag,{value:"Module"}));var wf={};Object.defineProperty(wf,"__esModule",{value:!0});var Sf=wf.wordlist=void 0;Sf=wf.wordlist=`abandon
ability
able
about
above
absent
absorb
abstract
absurd
abuse
access
accident
account
accuse
achieve
acid
acoustic
acquire
across
act
action
actor
actress
actual
adapt
add
addict
address
adjust
admit
adult
advance
advice
aerobic
affair
afford
afraid
again
age
agent
agree
ahead
aim
air
airport
aisle
alarm
album
alcohol
alert
alien
all
alley
allow
almost
alone
alpha
already
also
alter
always
amateur
amazing
among
amount
amused
analyst
anchor
ancient
anger
angle
angry
animal
ankle
announce
annual
another
answer
antenna
antique
anxiety
any
apart
apology
appear
apple
approve
april
arch
arctic
area
arena
argue
arm
armed
armor
army
around
arrange
arrest
arrive
arrow
art
artefact
artist
artwork
ask
aspect
assault
asset
assist
assume
asthma
athlete
atom
attack
attend
attitude
attract
auction
audit
august
aunt
author
auto
autumn
average
avocado
avoid
awake
aware
away
awesome
awful
awkward
axis
baby
bachelor
bacon
badge
bag
balance
balcony
ball
bamboo
banana
banner
bar
barely
bargain
barrel
base
basic
basket
battle
beach
bean
beauty
because
become
beef
before
begin
behave
behind
believe
below
belt
bench
benefit
best
betray
better
between
beyond
bicycle
bid
bike
bind
biology
bird
birth
bitter
black
blade
blame
blanket
blast
bleak
bless
blind
blood
blossom
blouse
blue
blur
blush
board
boat
body
boil
bomb
bone
bonus
book
boost
border
boring
borrow
boss
bottom
bounce
box
boy
bracket
brain
brand
brass
brave
bread
breeze
brick
bridge
brief
bright
bring
brisk
broccoli
broken
bronze
broom
brother
brown
brush
bubble
buddy
budget
buffalo
build
bulb
bulk
bullet
bundle
bunker
burden
burger
burst
bus
business
busy
butter
buyer
buzz
cabbage
cabin
cable
cactus
cage
cake
call
calm
camera
camp
can
canal
cancel
candy
cannon
canoe
canvas
canyon
capable
capital
captain
car
carbon
card
cargo
carpet
carry
cart
case
cash
casino
castle
casual
cat
catalog
catch
category
cattle
caught
cause
caution
cave
ceiling
celery
cement
census
century
cereal
certain
chair
chalk
champion
change
chaos
chapter
charge
chase
chat
cheap
check
cheese
chef
cherry
chest
chicken
chief
child
chimney
choice
choose
chronic
chuckle
chunk
churn
cigar
cinnamon
circle
citizen
city
civil
claim
clap
clarify
claw
clay
clean
clerk
clever
click
client
cliff
climb
clinic
clip
clock
clog
close
cloth
cloud
clown
club
clump
cluster
clutch
coach
coast
coconut
code
coffee
coil
coin
collect
color
column
combine
come
comfort
comic
common
company
concert
conduct
confirm
congress
connect
consider
control
convince
cook
cool
copper
copy
coral
core
corn
correct
cost
cotton
couch
country
couple
course
cousin
cover
coyote
crack
cradle
craft
cram
crane
crash
crater
crawl
crazy
cream
credit
creek
crew
cricket
crime
crisp
critic
crop
cross
crouch
crowd
crucial
cruel
cruise
crumble
crunch
crush
cry
crystal
cube
culture
cup
cupboard
curious
current
curtain
curve
cushion
custom
cute
cycle
dad
damage
damp
dance
danger
daring
dash
daughter
dawn
day
deal
debate
debris
decade
december
decide
decline
decorate
decrease
deer
defense
define
defy
degree
delay
deliver
demand
demise
denial
dentist
deny
depart
depend
deposit
depth
deputy
derive
describe
desert
design
desk
despair
destroy
detail
detect
develop
device
devote
diagram
dial
diamond
diary
dice
diesel
diet
differ
digital
dignity
dilemma
dinner
dinosaur
direct
dirt
disagree
discover
disease
dish
dismiss
disorder
display
distance
divert
divide
divorce
dizzy
doctor
document
dog
doll
dolphin
domain
donate
donkey
donor
door
dose
double
dove
draft
dragon
drama
drastic
draw
dream
dress
drift
drill
drink
drip
drive
drop
drum
dry
duck
dumb
dune
during
dust
dutch
duty
dwarf
dynamic
eager
eagle
early
earn
earth
easily
east
easy
echo
ecology
economy
edge
edit
educate
effort
egg
eight
either
elbow
elder
electric
elegant
element
elephant
elevator
elite
else
embark
embody
embrace
emerge
emotion
employ
empower
empty
enable
enact
end
endless
endorse
enemy
energy
enforce
engage
engine
enhance
enjoy
enlist
enough
enrich
enroll
ensure
enter
entire
entry
envelope
episode
equal
equip
era
erase
erode
erosion
error
erupt
escape
essay
essence
estate
eternal
ethics
evidence
evil
evoke
evolve
exact
example
excess
exchange
excite
exclude
excuse
execute
exercise
exhaust
exhibit
exile
exist
exit
exotic
expand
expect
expire
explain
expose
express
extend
extra
eye
eyebrow
fabric
face
faculty
fade
faint
faith
fall
false
fame
family
famous
fan
fancy
fantasy
farm
fashion
fat
fatal
father
fatigue
fault
favorite
feature
february
federal
fee
feed
feel
female
fence
festival
fetch
fever
few
fiber
fiction
field
figure
file
film
filter
final
find
fine
finger
finish
fire
firm
first
fiscal
fish
fit
fitness
fix
flag
flame
flash
flat
flavor
flee
flight
flip
float
flock
floor
flower
fluid
flush
fly
foam
focus
fog
foil
fold
follow
food
foot
force
forest
forget
fork
fortune
forum
forward
fossil
foster
found
fox
fragile
frame
frequent
fresh
friend
fringe
frog
front
frost
frown
frozen
fruit
fuel
fun
funny
furnace
fury
future
gadget
gain
galaxy
gallery
game
gap
garage
garbage
garden
garlic
garment
gas
gasp
gate
gather
gauge
gaze
general
genius
genre
gentle
genuine
gesture
ghost
giant
gift
giggle
ginger
giraffe
girl
give
glad
glance
glare
glass
glide
glimpse
globe
gloom
glory
glove
glow
glue
goat
goddess
gold
good
goose
gorilla
gospel
gossip
govern
gown
grab
grace
grain
grant
grape
grass
gravity
great
green
grid
grief
grit
grocery
group
grow
grunt
guard
guess
guide
guilt
guitar
gun
gym
habit
hair
half
hammer
hamster
hand
happy
harbor
hard
harsh
harvest
hat
have
hawk
hazard
head
health
heart
heavy
hedgehog
height
hello
helmet
help
hen
hero
hidden
high
hill
hint
hip
hire
history
hobby
hockey
hold
hole
holiday
hollow
home
honey
hood
hope
horn
horror
horse
hospital
host
hotel
hour
hover
hub
huge
human
humble
humor
hundred
hungry
hunt
hurdle
hurry
hurt
husband
hybrid
ice
icon
idea
identify
idle
ignore
ill
illegal
illness
image
imitate
immense
immune
impact
impose
improve
impulse
inch
include
income
increase
index
indicate
indoor
industry
infant
inflict
inform
inhale
inherit
initial
inject
injury
inmate
inner
innocent
input
inquiry
insane
insect
inside
inspire
install
intact
interest
into
invest
invite
involve
iron
island
isolate
issue
item
ivory
jacket
jaguar
jar
jazz
jealous
jeans
jelly
jewel
job
join
joke
journey
joy
judge
juice
jump
jungle
junior
junk
just
kangaroo
keen
keep
ketchup
key
kick
kid
kidney
kind
kingdom
kiss
kit
kitchen
kite
kitten
kiwi
knee
knife
knock
know
lab
label
labor
ladder
lady
lake
lamp
language
laptop
large
later
latin
laugh
laundry
lava
law
lawn
lawsuit
layer
lazy
leader
leaf
learn
leave
lecture
left
leg
legal
legend
leisure
lemon
lend
length
lens
leopard
lesson
letter
level
liar
liberty
library
license
life
lift
light
like
limb
limit
link
lion
liquid
list
little
live
lizard
load
loan
lobster
local
lock
logic
lonely
long
loop
lottery
loud
lounge
love
loyal
lucky
luggage
lumber
lunar
lunch
luxury
lyrics
machine
mad
magic
magnet
maid
mail
main
major
make
mammal
man
manage
mandate
mango
mansion
manual
maple
marble
march
margin
marine
market
marriage
mask
mass
master
match
material
math
matrix
matter
maximum
maze
meadow
mean
measure
meat
mechanic
medal
media
melody
melt
member
memory
mention
menu
mercy
merge
merit
merry
mesh
message
metal
method
middle
midnight
milk
million
mimic
mind
minimum
minor
minute
miracle
mirror
misery
miss
mistake
mix
mixed
mixture
mobile
model
modify
mom
moment
monitor
monkey
monster
month
moon
moral
more
morning
mosquito
mother
motion
motor
mountain
mouse
move
movie
much
muffin
mule
multiply
muscle
museum
mushroom
music
must
mutual
myself
mystery
myth
naive
name
napkin
narrow
nasty
nation
nature
near
neck
need
negative
neglect
neither
nephew
nerve
nest
net
network
neutral
never
news
next
nice
night
noble
noise
nominee
noodle
normal
north
nose
notable
note
nothing
notice
novel
now
nuclear
number
nurse
nut
oak
obey
object
oblige
obscure
observe
obtain
obvious
occur
ocean
october
odor
off
offer
office
often
oil
okay
old
olive
olympic
omit
once
one
onion
online
only
open
opera
opinion
oppose
option
orange
orbit
orchard
order
ordinary
organ
orient
original
orphan
ostrich
other
outdoor
outer
output
outside
oval
oven
over
own
owner
oxygen
oyster
ozone
pact
paddle
page
pair
palace
palm
panda
panel
panic
panther
paper
parade
parent
park
parrot
party
pass
patch
path
patient
patrol
pattern
pause
pave
payment
peace
peanut
pear
peasant
pelican
pen
penalty
pencil
people
pepper
perfect
permit
person
pet
phone
photo
phrase
physical
piano
picnic
picture
piece
pig
pigeon
pill
pilot
pink
pioneer
pipe
pistol
pitch
pizza
place
planet
plastic
plate
play
please
pledge
pluck
plug
plunge
poem
poet
point
polar
pole
police
pond
pony
pool
popular
portion
position
possible
post
potato
pottery
poverty
powder
power
practice
praise
predict
prefer
prepare
present
pretty
prevent
price
pride
primary
print
priority
prison
private
prize
problem
process
produce
profit
program
project
promote
proof
property
prosper
protect
proud
provide
public
pudding
pull
pulp
pulse
pumpkin
punch
pupil
puppy
purchase
purity
purpose
purse
push
put
puzzle
pyramid
quality
quantum
quarter
question
quick
quit
quiz
quote
rabbit
raccoon
race
rack
radar
radio
rail
rain
raise
rally
ramp
ranch
random
range
rapid
rare
rate
rather
raven
raw
razor
ready
real
reason
rebel
rebuild
recall
receive
recipe
record
recycle
reduce
reflect
reform
refuse
region
regret
regular
reject
relax
release
relief
rely
remain
remember
remind
remove
render
renew
rent
reopen
repair
repeat
replace
report
require
rescue
resemble
resist
resource
response
result
retire
retreat
return
reunion
reveal
review
reward
rhythm
rib
ribbon
rice
rich
ride
ridge
rifle
right
rigid
ring
riot
ripple
risk
ritual
rival
river
road
roast
robot
robust
rocket
romance
roof
rookie
room
rose
rotate
rough
round
route
royal
rubber
rude
rug
rule
run
runway
rural
sad
saddle
sadness
safe
sail
salad
salmon
salon
salt
salute
same
sample
sand
satisfy
satoshi
sauce
sausage
save
say
scale
scan
scare
scatter
scene
scheme
school
science
scissors
scorpion
scout
scrap
screen
script
scrub
sea
search
season
seat
second
secret
section
security
seed
seek
segment
select
sell
seminar
senior
sense
sentence
series
service
session
settle
setup
seven
shadow
shaft
shallow
share
shed
shell
sheriff
shield
shift
shine
ship
shiver
shock
shoe
shoot
shop
short
shoulder
shove
shrimp
shrug
shuffle
shy
sibling
sick
side
siege
sight
sign
silent
silk
silly
silver
similar
simple
since
sing
siren
sister
situate
six
size
skate
sketch
ski
skill
skin
skirt
skull
slab
slam
sleep
slender
slice
slide
slight
slim
slogan
slot
slow
slush
small
smart
smile
smoke
smooth
snack
snake
snap
sniff
snow
soap
soccer
social
sock
soda
soft
solar
soldier
solid
solution
solve
someone
song
soon
sorry
sort
soul
sound
soup
source
south
space
spare
spatial
spawn
speak
special
speed
spell
spend
sphere
spice
spider
spike
spin
spirit
split
spoil
sponsor
spoon
sport
spot
spray
spread
spring
spy
square
squeeze
squirrel
stable
stadium
staff
stage
stairs
stamp
stand
start
state
stay
steak
steel
stem
step
stereo
stick
still
sting
stock
stomach
stone
stool
story
stove
strategy
street
strike
strong
struggle
student
stuff
stumble
style
subject
submit
subway
success
such
sudden
suffer
sugar
suggest
suit
summer
sun
sunny
sunset
super
supply
supreme
sure
surface
surge
surprise
surround
survey
suspect
sustain
swallow
swamp
swap
swarm
swear
sweet
swift
swim
swing
switch
sword
symbol
symptom
syrup
system
table
tackle
tag
tail
talent
talk
tank
tape
target
task
taste
tattoo
taxi
teach
team
tell
ten
tenant
tennis
tent
term
test
text
thank
that
theme
then
theory
there
they
thing
this
thought
three
thrive
throw
thumb
thunder
ticket
tide
tiger
tilt
timber
time
tiny
tip
tired
tissue
title
toast
tobacco
today
toddler
toe
together
toilet
token
tomato
tomorrow
tone
tongue
tonight
tool
tooth
top
topic
topple
torch
tornado
tortoise
toss
total
tourist
toward
tower
town
toy
track
trade
traffic
tragic
train
transfer
trap
trash
travel
tray
treat
tree
trend
trial
tribe
trick
trigger
trim
trip
trophy
trouble
truck
true
truly
trumpet
trust
truth
try
tube
tuition
tumble
tuna
tunnel
turkey
turn
turtle
twelve
twenty
twice
twin
twist
two
type
typical
ugly
umbrella
unable
unaware
uncle
uncover
under
undo
unfair
unfold
unhappy
uniform
unique
unit
universe
unknown
unlock
until
unusual
unveil
update
upgrade
uphold
upon
upper
upset
urban
urge
usage
use
used
useful
useless
usual
utility
vacant
vacuum
vague
valid
valley
valve
van
vanish
vapor
various
vast
vault
vehicle
velvet
vendor
venture
venue
verb
verify
version
very
vessel
veteran
viable
vibrant
vicious
victory
video
view
village
vintage
violin
virtual
virus
visa
visit
visual
vital
vivid
vocal
voice
void
volcano
volume
vote
voyage
wage
wagon
wait
walk
wall
walnut
want
warfare
warm
warrior
wash
wasp
waste
water
wave
way
wealth
weapon
wear
weasel
weather
web
wedding
weekend
weird
welcome
west
wet
whale
what
wheat
wheel
when
where
whip
whisper
wide
width
wife
wild
will
win
window
wine
wing
wink
winner
winter
wire
wisdom
wise
wish
witness
wolf
woman
wonder
wood
wool
word
work
world
worry
worth
wrap
wreck
wrestle
wrist
write
wrong
yard
year
yellow
you
young
youth
zebra
zero
zone
zoo`.split(`
`);var rr={},Ct={};Object.defineProperty(Ct,"__esModule",{value:!0});Ct.output=Ct.exists=Ct.hash=Kn=Ct.bytes=Ct.bool=Ct.number=void 0;function xl(e){if(!Number.isSafeInteger(e)||e<0)throw new Error(`Wrong positive integer: ${e}`)}Ct.number=xl;function cx(e){if(typeof e!="boolean")throw new Error(`Expected boolean, not ${e}`)}Ct.bool=cx;function Ef(e,...t){if(!(e instanceof Uint8Array))throw new TypeError("Expected Uint8Array");if(t.length>0&&!t.includes(e.length))throw new TypeError(`Expected Uint8Array of length ${t}, not of length=${e.length}`)}var Kn=Ct.bytes=Ef;function ux(e){if(typeof e!="function"||typeof e.create!="function")throw new Error("Hash should be wrapped by utils.wrapConstructor");xl(e.outputLen),xl(e.blockLen)}Ct.hash=ux;function dx(e,t=!0){if(e.destroyed)throw new Error("Hash instance has been destroyed");if(t&&e.finished)throw new Error("Hash#digest() has already been called")}Ct.exists=dx;function fx(e,t){Ef(e);const r=t.outputLen;if(e.length<r)throw new Error(`digestInto() expects output buffer of length at least ${r}`)}Ct.output=fx;const Rz={number:xl,bool:cx,bytes:Ef,hash:ux,exists:dx,output:fx};Ct.default=Rz;var _i={},hx={},Tt={},sc={};Object.defineProperty(sc,"__esModule",{value:!0});sc.crypto=void 0;sc.crypto={node:void 0,web:typeof self=="object"&&"crypto"in self?self.crypto:void 0};(function(e){/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */Object.defineProperty(e,"__esModule",{value:!0}),e.randomBytes=e.wrapConstructorWithOpts=e.wrapConstructor=e.checkOpts=e.Hash=e.concatBytes=e.toBytes=e.utf8ToBytes=e.asyncLoop=e.nextTick=e.hexToBytes=e.bytesToHex=e.isLE=e.rotr=e.createView=e.u32=e.u8=void 0;const t=sc,r=x=>new Uint8Array(x.buffer,x.byteOffset,x.byteLength);e.u8=r;const o=x=>new Uint32Array(x.buffer,x.byteOffset,Math.floor(x.byteLength/4));e.u32=o;const n=x=>new DataView(x.buffer,x.byteOffset,x.byteLength);e.createView=n;const i=(x,C)=>x<<32-C|x>>>C;if(e.rotr=i,e.isLE=new Uint8Array(new Uint32Array([287454020]).buffer)[0]===68,!e.isLE)throw new Error("Non little-endian hardware is not supported");const s=Array.from({length:256},(x,C)=>C.toString(16).padStart(2,"0"));function a(x){if(!(x instanceof Uint8Array))throw new Error("Uint8Array expected");let C="";for(let $=0;$<x.length;$++)C+=s[x[$]];return C}e.bytesToHex=a;function l(x){if(typeof x!="string")throw new TypeError("hexToBytes: expected string, got "+typeof x);if(x.length%2)throw new Error("hexToBytes: received invalid unpadded hex");const C=new Uint8Array(x.length/2);for(let $=0;$<C.length;$++){const S=$*2,L=x.slice(S,S+2),k=Number.parseInt(L,16);if(Number.isNaN(k)||k<0)throw new Error("Invalid byte sequence");C[$]=k}return C}e.hexToBytes=l;const c=async()=>{};e.nextTick=c;async function u(x,C,$){let S=Date.now();for(let L=0;L<x;L++){$(L);const k=Date.now()-S;k>=0&&k<C||(await(0,e.nextTick)(),S+=k)}}e.asyncLoop=u;function d(x){if(typeof x!="string")throw new TypeError(`utf8ToBytes expected string, got ${typeof x}`);return new TextEncoder().encode(x)}e.utf8ToBytes=d;function f(x){if(typeof x=="string"&&(x=d(x)),!(x instanceof Uint8Array))throw new TypeError(`Expected input type is Uint8Array (got ${typeof x})`);return x}e.toBytes=f;function h(...x){if(!x.every(S=>S instanceof Uint8Array))throw new Error("Uint8Array list expected");if(x.length===1)return x[0];const C=x.reduce((S,L)=>S+L.length,0),$=new Uint8Array(C);for(let S=0,L=0;S<x.length;S++){const k=x[S];$.set(k,L),L+=k.length}return $}e.concatBytes=h;class p{clone(){return this._cloneInto()}}e.Hash=p;const m=x=>Object.prototype.toString.call(x)==="[object Object]"&&x.constructor===Object;function y(x,C){if(C!==void 0&&(typeof C!="object"||!m(C)))throw new TypeError("Options should be object or undefined");return Object.assign(x,C)}e.checkOpts=y;function g(x){const C=S=>x().update(f(S)).digest(),$=x();return C.outputLen=$.outputLen,C.blockLen=$.blockLen,C.create=()=>x(),C}e.wrapConstructor=g;function w(x){const C=(S,L)=>x(L).update(f(S)).digest(),$=x({});return C.outputLen=$.outputLen,C.blockLen=$.blockLen,C.create=S=>x(S),C}e.wrapConstructorWithOpts=w;function T(x=32){if(t.crypto.web)return t.crypto.web.getRandomValues(new Uint8Array(x));if(t.crypto.node)return new Uint8Array(t.crypto.node.randomBytes(x).buffer);throw new Error("The environment doesn't have randomBytes function")}e.randomBytes=T})(Tt);(function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.hmac=void 0;const t=Ct,r=Tt;class o extends r.Hash{constructor(s,a){super(),this.finished=!1,this.destroyed=!1,t.default.hash(s);const l=(0,r.toBytes)(a);if(this.iHash=s.create(),typeof this.iHash.update!="function")throw new TypeError("Expected instance of class which extends utils.Hash");this.blockLen=this.iHash.blockLen,this.outputLen=this.iHash.outputLen;const c=this.blockLen,u=new Uint8Array(c);u.set(l.length>c?s.create().update(l).digest():l);for(let d=0;d<u.length;d++)u[d]^=54;this.iHash.update(u),this.oHash=s.create();for(let d=0;d<u.length;d++)u[d]^=106;this.oHash.update(u),u.fill(0)}update(s){return t.default.exists(this),this.iHash.update(s),this}digestInto(s){t.default.exists(this),t.default.bytes(s,this.outputLen),this.finished=!0,this.iHash.digestInto(s),this.oHash.update(s),this.oHash.digestInto(s),this.destroy()}digest(){const s=new Uint8Array(this.oHash.outputLen);return this.digestInto(s),s}_cloneInto(s){s||(s=Object.create(Object.getPrototypeOf(this),{}));const{oHash:a,iHash:l,finished:c,destroyed:u,blockLen:d,outputLen:f}=this;return s=s,s.finished=c,s.destroyed=u,s.blockLen=d,s.outputLen=f,s.oHash=a._cloneInto(s.oHash),s.iHash=l._cloneInto(s.iHash),s}destroy(){this.destroyed=!0,this.oHash.destroy(),this.iHash.destroy()}}const n=(i,s,a)=>new o(i,s).update(a).digest();e.hmac=n,e.hmac.create=(i,s)=>new o(i,s)})(hx);Object.defineProperty(_i,"__esModule",{value:!0});_i.pbkdf2Async=_i.pbkdf2=void 0;const Ha=Ct,Oz=hx,ai=Tt;function px(e,t,r,o){Ha.default.hash(e);const n=(0,ai.checkOpts)({dkLen:32,asyncTick:10},o),{c:i,dkLen:s,asyncTick:a}=n;if(Ha.default.number(i),Ha.default.number(s),Ha.default.number(a),i<1)throw new Error("PBKDF2: iterations (c) should be >= 1");const l=(0,ai.toBytes)(t),c=(0,ai.toBytes)(r),u=new Uint8Array(s),d=Oz.hmac.create(e,l),f=d._cloneInto().update(c);return{c:i,dkLen:s,asyncTick:a,DK:u,PRF:d,PRFSalt:f}}function gx(e,t,r,o,n){return e.destroy(),t.destroy(),o&&o.destroy(),n.fill(0),r}function Az(e,t,r,o){const{c:n,dkLen:i,DK:s,PRF:a,PRFSalt:l}=px(e,t,r,o);let c;const u=new Uint8Array(4),d=(0,ai.createView)(u),f=new Uint8Array(a.outputLen);for(let h=1,p=0;p<i;h++,p+=a.outputLen){const m=s.subarray(p,p+a.outputLen);d.setInt32(0,h,!1),(c=l._cloneInto(c)).update(u).digestInto(f),m.set(f.subarray(0,m.length));for(let y=1;y<n;y++){a._cloneInto(c).update(f).digestInto(f);for(let g=0;g<m.length;g++)m[g]^=f[g]}}return gx(a,l,s,c,f)}_i.pbkdf2=Az;async function Bz(e,t,r,o){const{c:n,dkLen:i,asyncTick:s,DK:a,PRF:l,PRFSalt:c}=px(e,t,r,o);let u;const d=new Uint8Array(4),f=(0,ai.createView)(d),h=new Uint8Array(l.outputLen);for(let p=1,m=0;m<i;p++,m+=l.outputLen){const y=a.subarray(m,m+l.outputLen);f.setInt32(0,p,!1),(u=c._cloneInto(u)).update(d).digestInto(h),y.set(h.subarray(0,y.length)),await(0,ai.asyncLoop)(n-1,s,g=>{l._cloneInto(u).update(h).digestInto(h);for(let w=0;w<y.length;w++)y[w]^=h[w]})}return gx(l,c,a,u,h)}_i.pbkdf2Async=Bz;var Ti={},sa={};Object.defineProperty(sa,"__esModule",{value:!0});sa.SHA2=void 0;const jc=Ct,Zi=Tt;function Mz(e,t,r,o){if(typeof e.setBigUint64=="function")return e.setBigUint64(t,r,o);const n=BigInt(32),i=BigInt(4294967295),s=Number(r>>n&i),a=Number(r&i),l=o?4:0,c=o?0:4;e.setUint32(t+l,s,o),e.setUint32(t+c,a,o)}class Hz extends Zi.Hash{constructor(t,r,o,n){super(),this.blockLen=t,this.outputLen=r,this.padOffset=o,this.isLE=n,this.finished=!1,this.length=0,this.pos=0,this.destroyed=!1,this.buffer=new Uint8Array(t),this.view=(0,Zi.createView)(this.buffer)}update(t){jc.default.exists(this);const{view:r,buffer:o,blockLen:n}=this;t=(0,Zi.toBytes)(t);const i=t.length;for(let s=0;s<i;){const a=Math.min(n-this.pos,i-s);if(a===n){const l=(0,Zi.createView)(t);for(;n<=i-s;s+=n)this.process(l,s);continue}o.set(t.subarray(s,s+a),this.pos),this.pos+=a,s+=a,this.pos===n&&(this.process(r,0),this.pos=0)}return this.length+=t.length,this.roundClean(),this}digestInto(t){jc.default.exists(this),jc.default.output(t,this),this.finished=!0;const{buffer:r,view:o,blockLen:n,isLE:i}=this;let{pos:s}=this;r[s++]=128,this.buffer.subarray(s).fill(0),this.padOffset>n-s&&(this.process(o,0),s=0);for(let d=s;d<n;d++)r[d]=0;Mz(o,n-8,BigInt(this.length*8),i),this.process(o,0);const a=(0,Zi.createView)(t),l=this.outputLen;if(l%4)throw new Error("_sha2: outputLen should be aligned to 32bit");const c=l/4,u=this.get();if(c>u.length)throw new Error("_sha2: outputLen bigger than state");for(let d=0;d<c;d++)a.setUint32(4*d,u[d],i)}digest(){const{buffer:t,outputLen:r}=this;this.digestInto(t);const o=t.slice(0,r);return this.destroy(),o}_cloneInto(t){t||(t=new this.constructor),t.set(...this.get());const{blockLen:r,buffer:o,length:n,finished:i,destroyed:s,pos:a}=this;return t.length=n,t.pos=a,t.finished=i,t.destroyed=s,n%r&&t.buffer.set(o),t}}sa.SHA2=Hz;Object.defineProperty(Ti,"__esModule",{value:!0});Ti.sha224=ac=Ti.sha256=void 0;const Dz=sa,dr=Tt,zz=(e,t,r)=>e&t^~e&r,Fz=(e,t,r)=>e&t^e&r^t&r,Nz=new Uint32Array([1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298]),wo=new Uint32Array([1779033703,3144134277,1013904242,2773480762,1359893119,2600822924,528734635,1541459225]),So=new Uint32Array(64);class mx extends Dz.SHA2{constructor(){super(64,32,8,!1),this.A=wo[0]|0,this.B=wo[1]|0,this.C=wo[2]|0,this.D=wo[3]|0,this.E=wo[4]|0,this.F=wo[5]|0,this.G=wo[6]|0,this.H=wo[7]|0}get(){const{A:t,B:r,C:o,D:n,E:i,F:s,G:a,H:l}=this;return[t,r,o,n,i,s,a,l]}set(t,r,o,n,i,s,a,l){this.A=t|0,this.B=r|0,this.C=o|0,this.D=n|0,this.E=i|0,this.F=s|0,this.G=a|0,this.H=l|0}process(t,r){for(let d=0;d<16;d++,r+=4)So[d]=t.getUint32(r,!1);for(let d=16;d<64;d++){const f=So[d-15],h=So[d-2],p=(0,dr.rotr)(f,7)^(0,dr.rotr)(f,18)^f>>>3,m=(0,dr.rotr)(h,17)^(0,dr.rotr)(h,19)^h>>>10;So[d]=m+So[d-7]+p+So[d-16]|0}let{A:o,B:n,C:i,D:s,E:a,F:l,G:c,H:u}=this;for(let d=0;d<64;d++){const f=(0,dr.rotr)(a,6)^(0,dr.rotr)(a,11)^(0,dr.rotr)(a,25),h=u+f+zz(a,l,c)+Nz[d]+So[d]|0,m=((0,dr.rotr)(o,2)^(0,dr.rotr)(o,13)^(0,dr.rotr)(o,22))+Fz(o,n,i)|0;u=c,c=l,l=a,a=s+h|0,s=i,i=n,n=o,o=h+m|0}o=o+this.A|0,n=n+this.B|0,i=i+this.C|0,s=s+this.D|0,a=a+this.E|0,l=l+this.F|0,c=c+this.G|0,u=u+this.H|0,this.set(o,n,i,s,a,l,c,u)}roundClean(){So.fill(0)}destroy(){this.set(0,0,0,0,0,0,0,0),this.buffer.fill(0)}}class jz extends mx{constructor(){super(),this.A=-1056596264,this.B=914150663,this.C=812702999,this.D=-150054599,this.E=-4191439,this.F=1750603025,this.G=1694076839,this.H=-1090891868,this.outputLen=28}}var ac=Ti.sha256=(0,dr.wrapConstructor)(()=>new mx);Ti.sha224=(0,dr.wrapConstructor)(()=>new jz);var fr={},bx={};(function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.add=e.toBig=e.split=e.fromBig=void 0;const t=BigInt(2**32-1),r=BigInt(32);function o(I,A=!1){return A?{h:Number(I&t),l:Number(I>>r&t)}:{h:Number(I>>r&t)|0,l:Number(I&t)|0}}e.fromBig=o;function n(I,A=!1){let R=new Uint32Array(I.length),F=new Uint32Array(I.length);for(let H=0;H<I.length;H++){const{h:J,l:Y}=o(I[H],A);[R[H],F[H]]=[J,Y]}return[R,F]}e.split=n;const i=(I,A)=>BigInt(I>>>0)<<r|BigInt(A>>>0);e.toBig=i;const s=(I,A,R)=>I>>>R,a=(I,A,R)=>I<<32-R|A>>>R,l=(I,A,R)=>I>>>R|A<<32-R,c=(I,A,R)=>I<<32-R|A>>>R,u=(I,A,R)=>I<<64-R|A>>>R-32,d=(I,A,R)=>I>>>R-32|A<<64-R,f=(I,A)=>A,h=(I,A)=>I,p=(I,A,R)=>I<<R|A>>>32-R,m=(I,A,R)=>A<<R|I>>>32-R,y=(I,A,R)=>A<<R-32|I>>>64-R,g=(I,A,R)=>I<<R-32|A>>>64-R;function w(I,A,R,F){const H=(A>>>0)+(F>>>0);return{h:I+R+(H/2**32|0)|0,l:H|0}}e.add=w;const T=(I,A,R)=>(I>>>0)+(A>>>0)+(R>>>0),x=(I,A,R,F)=>A+R+F+(I/2**32|0)|0,C=(I,A,R,F)=>(I>>>0)+(A>>>0)+(R>>>0)+(F>>>0),$=(I,A,R,F,H)=>A+R+F+H+(I/2**32|0)|0,S=(I,A,R,F,H)=>(I>>>0)+(A>>>0)+(R>>>0)+(F>>>0)+(H>>>0),L=(I,A,R,F,H,J)=>A+R+F+H+J+(I/2**32|0)|0,k={fromBig:o,split:n,toBig:e.toBig,shrSH:s,shrSL:a,rotrSH:l,rotrSL:c,rotrBH:u,rotrBL:d,rotr32H:f,rotr32L:h,rotlSH:p,rotlSL:m,rotlBH:y,rotlBL:g,add:w,add3L:T,add3H:x,add4L:C,add4H:$,add5H:L,add5L:S};e.default=k})(bx);Object.defineProperty(fr,"__esModule",{value:!0});fr.sha384=fr.sha512_256=fr.sha512_224=qu=fr.sha512=fr.SHA512=void 0;const Wz=sa,Ie=bx,lc=Tt,[Uz,Vz]=Ie.default.split(["0x428a2f98d728ae22","0x7137449123ef65cd","0xb5c0fbcfec4d3b2f","0xe9b5dba58189dbbc","0x3956c25bf348b538","0x59f111f1b605d019","0x923f82a4af194f9b","0xab1c5ed5da6d8118","0xd807aa98a3030242","0x12835b0145706fbe","0x243185be4ee4b28c","0x550c7dc3d5ffb4e2","0x72be5d74f27b896f","0x80deb1fe3b1696b1","0x9bdc06a725c71235","0xc19bf174cf692694","0xe49b69c19ef14ad2","0xefbe4786384f25e3","0x0fc19dc68b8cd5b5","0x240ca1cc77ac9c65","0x2de92c6f592b0275","0x4a7484aa6ea6e483","0x5cb0a9dcbd41fbd4","0x76f988da831153b5","0x983e5152ee66dfab","0xa831c66d2db43210","0xb00327c898fb213f","0xbf597fc7beef0ee4","0xc6e00bf33da88fc2","0xd5a79147930aa725","0x06ca6351e003826f","0x142929670a0e6e70","0x27b70a8546d22ffc","0x2e1b21385c26c926","0x4d2c6dfc5ac42aed","0x53380d139d95b3df","0x650a73548baf63de","0x766a0abb3c77b2a8","0x81c2c92e47edaee6","0x92722c851482353b","0xa2bfe8a14cf10364","0xa81a664bbc423001","0xc24b8b70d0f89791","0xc76c51a30654be30","0xd192e819d6ef5218","0xd69906245565a910","0xf40e35855771202a","0x106aa07032bbd1b8","0x19a4c116b8d2d0c8","0x1e376c085141ab53","0x2748774cdf8eeb99","0x34b0bcb5e19b48a8","0x391c0cb3c5c95a63","0x4ed8aa4ae3418acb","0x5b9cca4f7763e373","0x682e6ff3d6b2b8a3","0x748f82ee5defb2fc","0x78a5636f43172f60","0x84c87814a1f0ab72","0x8cc702081a6439ec","0x90befffa23631e28","0xa4506cebde82bde9","0xbef9a3f7b2c67915","0xc67178f2e372532b","0xca273eceea26619c","0xd186b8c721c0c207","0xeada7dd6cde0eb1e","0xf57d4f7fee6ed178","0x06f067aa72176fba","0x0a637dc5a2c898a6","0x113f9804bef90dae","0x1b710b35131c471b","0x28db77f523047d84","0x32caab7b40c72493","0x3c9ebe0a15c9bebc","0x431d67c49c100d4c","0x4cc5d4becb3e42b6","0x597f299cfc657e2a","0x5fcb6fab3ad6faec","0x6c44198c4a475817"].map(e=>BigInt(e))),Eo=new Uint32Array(80),_o=new Uint32Array(80);class aa extends Wz.SHA2{constructor(){super(128,64,16,!1),this.Ah=1779033703,this.Al=-205731576,this.Bh=-1150833019,this.Bl=-2067093701,this.Ch=1013904242,this.Cl=-23791573,this.Dh=-1521486534,this.Dl=1595750129,this.Eh=1359893119,this.El=-1377402159,this.Fh=-1694144372,this.Fl=725511199,this.Gh=528734635,this.Gl=-79577749,this.Hh=1541459225,this.Hl=327033209}get(){const{Ah:t,Al:r,Bh:o,Bl:n,Ch:i,Cl:s,Dh:a,Dl:l,Eh:c,El:u,Fh:d,Fl:f,Gh:h,Gl:p,Hh:m,Hl:y}=this;return[t,r,o,n,i,s,a,l,c,u,d,f,h,p,m,y]}set(t,r,o,n,i,s,a,l,c,u,d,f,h,p,m,y){this.Ah=t|0,this.Al=r|0,this.Bh=o|0,this.Bl=n|0,this.Ch=i|0,this.Cl=s|0,this.Dh=a|0,this.Dl=l|0,this.Eh=c|0,this.El=u|0,this.Fh=d|0,this.Fl=f|0,this.Gh=h|0,this.Gl=p|0,this.Hh=m|0,this.Hl=y|0}process(t,r){for(let T=0;T<16;T++,r+=4)Eo[T]=t.getUint32(r),_o[T]=t.getUint32(r+=4);for(let T=16;T<80;T++){const x=Eo[T-15]|0,C=_o[T-15]|0,$=Ie.default.rotrSH(x,C,1)^Ie.default.rotrSH(x,C,8)^Ie.default.shrSH(x,C,7),S=Ie.default.rotrSL(x,C,1)^Ie.default.rotrSL(x,C,8)^Ie.default.shrSL(x,C,7),L=Eo[T-2]|0,k=_o[T-2]|0,I=Ie.default.rotrSH(L,k,19)^Ie.default.rotrBH(L,k,61)^Ie.default.shrSH(L,k,6),A=Ie.default.rotrSL(L,k,19)^Ie.default.rotrBL(L,k,61)^Ie.default.shrSL(L,k,6),R=Ie.default.add4L(S,A,_o[T-7],_o[T-16]),F=Ie.default.add4H(R,$,I,Eo[T-7],Eo[T-16]);Eo[T]=F|0,_o[T]=R|0}let{Ah:o,Al:n,Bh:i,Bl:s,Ch:a,Cl:l,Dh:c,Dl:u,Eh:d,El:f,Fh:h,Fl:p,Gh:m,Gl:y,Hh:g,Hl:w}=this;for(let T=0;T<80;T++){const x=Ie.default.rotrSH(d,f,14)^Ie.default.rotrSH(d,f,18)^Ie.default.rotrBH(d,f,41),C=Ie.default.rotrSL(d,f,14)^Ie.default.rotrSL(d,f,18)^Ie.default.rotrBL(d,f,41),$=d&h^~d&m,S=f&p^~f&y,L=Ie.default.add5L(w,C,S,Vz[T],_o[T]),k=Ie.default.add5H(L,g,x,$,Uz[T],Eo[T]),I=L|0,A=Ie.default.rotrSH(o,n,28)^Ie.default.rotrBH(o,n,34)^Ie.default.rotrBH(o,n,39),R=Ie.default.rotrSL(o,n,28)^Ie.default.rotrBL(o,n,34)^Ie.default.rotrBL(o,n,39),F=o&i^o&a^i&a,H=n&s^n&l^s&l;g=m|0,w=y|0,m=h|0,y=p|0,h=d|0,p=f|0,{h:d,l:f}=Ie.default.add(c|0,u|0,k|0,I|0),c=a|0,u=l|0,a=i|0,l=s|0,i=o|0,s=n|0;const J=Ie.default.add3L(I,R,H);o=Ie.default.add3H(J,k,A,F),n=J|0}({h:o,l:n}=Ie.default.add(this.Ah|0,this.Al|0,o|0,n|0)),{h:i,l:s}=Ie.default.add(this.Bh|0,this.Bl|0,i|0,s|0),{h:a,l}=Ie.default.add(this.Ch|0,this.Cl|0,a|0,l|0),{h:c,l:u}=Ie.default.add(this.Dh|0,this.Dl|0,c|0,u|0),{h:d,l:f}=Ie.default.add(this.Eh|0,this.El|0,d|0,f|0),{h,l:p}=Ie.default.add(this.Fh|0,this.Fl|0,h|0,p|0),{h:m,l:y}=Ie.default.add(this.Gh|0,this.Gl|0,m|0,y|0),{h:g,l:w}=Ie.default.add(this.Hh|0,this.Hl|0,g|0,w|0),this.set(o,n,i,s,a,l,c,u,d,f,h,p,m,y,g,w)}roundClean(){Eo.fill(0),_o.fill(0)}destroy(){this.buffer.fill(0),this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0)}}fr.SHA512=aa;class Kz extends aa{constructor(){super(),this.Ah=-1942145080,this.Al=424955298,this.Bh=1944164710,this.Bl=-1982016298,this.Ch=502970286,this.Cl=855612546,this.Dh=1738396948,this.Dl=1479516111,this.Eh=258812777,this.El=2077511080,this.Fh=2011393907,this.Fl=79989058,this.Gh=1067287976,this.Gl=1780299464,this.Hh=286451373,this.Hl=-1848208735,this.outputLen=28}}class qz extends aa{constructor(){super(),this.Ah=573645204,this.Al=-64227540,this.Bh=-1621794909,this.Bl=-934517566,this.Ch=596883563,this.Cl=1867755857,this.Dh=-1774684391,this.Dl=1497426621,this.Eh=-1775747358,this.El=-1467023389,this.Fh=-1101128155,this.Fl=1401305490,this.Gh=721525244,this.Gl=746961066,this.Hh=246885852,this.Hl=-2117784414,this.outputLen=32}}class Gz extends aa{constructor(){super(),this.Ah=-876896931,this.Al=-1056596264,this.Bh=1654270250,this.Bl=914150663,this.Ch=-1856437926,this.Cl=812702999,this.Dh=355462360,this.Dl=-150054599,this.Eh=1731405415,this.El=-4191439,this.Fh=-1900787065,this.Fl=1750603025,this.Gh=-619958771,this.Gl=1694076839,this.Hh=1203062813,this.Hl=-1090891868,this.outputLen=48}}var qu=fr.sha512=(0,lc.wrapConstructor)(()=>new aa);fr.sha512_224=(0,lc.wrapConstructor)(()=>new Kz);fr.sha512_256=(0,lc.wrapConstructor)(()=>new qz);fr.sha384=(0,lc.wrapConstructor)(()=>new Gz);const Xz=b8(Iz);Object.defineProperty(rr,"__esModule",{value:!0});var vx=rr.mnemonicToSeedSync=rr.mnemonicToSeed=Px=rr.validateMnemonic=rr.entropyToMnemonic=rr.mnemonicToEntropy=Ex=rr.generateMnemonic=void 0;/*! scure-bip39 - MIT License (c) 2022 Patricio Palladino, Paul Miller (paulmillr.com) */const yx=Ct,xx=_i,Yz=Ti,Cx=fr,Zz=Tt,Da=Xz,Jz=e=>e[0]==="\u3042\u3044\u3053\u304F\u3057\u3093";function wx(e){if(typeof e!="string")throw new TypeError(`Invalid mnemonic type: ${typeof e}`);return e.normalize("NFKD")}function _f(e){const t=wx(e),r=t.split(" ");if(![12,15,18,21,24].includes(r.length))throw new Error("Invalid mnemonic");return{nfkd:t,words:r}}function Sx(e){yx.default.bytes(e,16,20,24,28,32)}function Qz(e,t=128){if(yx.default.number(t),t%32!==0||t>256)throw new TypeError("Invalid entropy");return $x((0,Zz.randomBytes)(t/8),e)}var Ex=rr.generateMnemonic=Qz;const e7=e=>{const t=8-e.length/4;return new Uint8Array([(0,Yz.sha256)(e)[0]>>t<<t])};function _x(e){if(!Array.isArray(e)||e.length!==2048||typeof e[0]!="string")throw new Error("Worlist: expected array of 2048 strings");return e.forEach(t=>{if(typeof t!="string")throw new Error(`Wordlist: non-string element: ${t}`)}),Da.utils.chain(Da.utils.checksum(1,e7),Da.utils.radix2(11,!0),Da.utils.alphabet(e))}function Tx(e,t){const{words:r}=_f(e),o=_x(t).decode(r);return Sx(o),o}rr.mnemonicToEntropy=Tx;function $x(e,t){return Sx(e),_x(t).encode(e).join(Jz(t)?"\u3000":" ")}rr.entropyToMnemonic=$x;function t7(e,t){try{Tx(e,t)}catch{return!1}return!0}var Px=rr.validateMnemonic=t7;const Lx=e=>wx(`mnemonic${e}`);function r7(e,t=""){return(0,xx.pbkdf2Async)(Cx.sha512,_f(e).nfkd,Lx(t),{c:2048,dkLen:64})}rr.mnemonicToSeed=r7;function o7(e,t=""){return(0,xx.pbkdf2)(Cx.sha512,_f(e).nfkd,Lx(t),{c:2048,dkLen:64})}vx=rr.mnemonicToSeedSync=o7;function Gu(e){if(!Number.isSafeInteger(e)||e<0)throw new Error(`Wrong positive integer: ${e}`)}function n7(e){if(typeof e!="boolean")throw new Error(`Expected boolean, not ${e}`)}function kx(e,...t){if(!(e instanceof Uint8Array))throw new TypeError("Expected Uint8Array");if(t.length>0&&!t.includes(e.length))throw new TypeError(`Expected Uint8Array of length ${t}, not of length=${e.length}`)}function i7(e){if(typeof e!="function"||typeof e.create!="function")throw new Error("Hash should be wrapped by utils.wrapConstructor");Gu(e.outputLen),Gu(e.blockLen)}function s7(e,t=!0){if(e.destroyed)throw new Error("Hash instance has been destroyed");if(t&&e.finished)throw new Error("Hash#digest() has already been called")}function a7(e,t){kx(e);const r=t.outputLen;if(e.length<r)throw new Error(`digestInto() expects output buffer of length at least ${r}`)}const gn={number:Gu,bool:n7,bytes:kx,hash:i7,exists:s7,output:a7};/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */const Wc=e=>new DataView(e.buffer,e.byteOffset,e.byteLength),l7=new Uint8Array(new Uint32Array([287454020]).buffer)[0]===68;if(!l7)throw new Error("Non little-endian hardware is not supported");Array.from({length:256},(e,t)=>t.toString(16).padStart(2,"0"));function c7(e){if(typeof e!="string")throw new TypeError(`utf8ToBytes expected string, got ${typeof e}`);return new TextEncoder().encode(e)}function Tf(e){if(typeof e=="string"&&(e=c7(e)),!(e instanceof Uint8Array))throw new TypeError(`Expected input type is Uint8Array (got ${typeof e})`);return e}class Ix{clone(){return this._cloneInto()}}function u7(e){const t=o=>e().update(Tf(o)).digest(),r=e();return t.outputLen=r.outputLen,t.blockLen=r.blockLen,t.create=()=>e(),t}class Rx extends Ix{constructor(t,r){super(),this.finished=!1,this.destroyed=!1,gn.hash(t);const o=Tf(r);if(this.iHash=t.create(),typeof this.iHash.update!="function")throw new TypeError("Expected instance of class which extends utils.Hash");this.blockLen=this.iHash.blockLen,this.outputLen=this.iHash.outputLen;const n=this.blockLen,i=new Uint8Array(n);i.set(o.length>n?t.create().update(o).digest():o);for(let s=0;s<i.length;s++)i[s]^=54;this.iHash.update(i),this.oHash=t.create();for(let s=0;s<i.length;s++)i[s]^=106;this.oHash.update(i),i.fill(0)}update(t){return gn.exists(this),this.iHash.update(t),this}digestInto(t){gn.exists(this),gn.bytes(t,this.outputLen),this.finished=!0,this.iHash.digestInto(t),this.oHash.update(t),this.oHash.digestInto(t),this.destroy()}digest(){const t=new Uint8Array(this.oHash.outputLen);return this.digestInto(t),t}_cloneInto(t){t||(t=Object.create(Object.getPrototypeOf(this),{}));const{oHash:r,iHash:o,finished:n,destroyed:i,blockLen:s,outputLen:a}=this;return t=t,t.finished=n,t.destroyed=i,t.blockLen=s,t.outputLen=a,t.oHash=r._cloneInto(t.oHash),t.iHash=o._cloneInto(t.iHash),t}destroy(){this.destroyed=!0,this.oHash.destroy(),this.iHash.destroy()}}const Cl=(e,t,r)=>new Rx(e,t).update(r).digest();Cl.create=(e,t)=>new Rx(e,t);function d7(e,t,r,o){if(typeof e.setBigUint64=="function")return e.setBigUint64(t,r,o);const n=BigInt(32),i=BigInt(4294967295),s=Number(r>>n&i),a=Number(r&i),l=o?4:0,c=o?0:4;e.setUint32(t+l,s,o),e.setUint32(t+c,a,o)}class f7 extends Ix{constructor(t,r,o,n){super(),this.blockLen=t,this.outputLen=r,this.padOffset=o,this.isLE=n,this.finished=!1,this.length=0,this.pos=0,this.destroyed=!1,this.buffer=new Uint8Array(t),this.view=Wc(this.buffer)}update(t){gn.exists(this);const{view:r,buffer:o,blockLen:n}=this;t=Tf(t);const i=t.length;for(let s=0;s<i;){const a=Math.min(n-this.pos,i-s);if(a===n){const l=Wc(t);for(;n<=i-s;s+=n)this.process(l,s);continue}o.set(t.subarray(s,s+a),this.pos),this.pos+=a,s+=a,this.pos===n&&(this.process(r,0),this.pos=0)}return this.length+=t.length,this.roundClean(),this}digestInto(t){gn.exists(this),gn.output(t,this),this.finished=!0;const{buffer:r,view:o,blockLen:n,isLE:i}=this;let{pos:s}=this;r[s++]=128,this.buffer.subarray(s).fill(0),this.padOffset>n-s&&(this.process(o,0),s=0);for(let d=s;d<n;d++)r[d]=0;d7(o,n-8,BigInt(this.length*8),i),this.process(o,0);const a=Wc(t),l=this.outputLen;if(l%4)throw new Error("_sha2: outputLen should be aligned to 32bit");const c=l/4,u=this.get();if(c>u.length)throw new Error("_sha2: outputLen bigger than state");for(let d=0;d<c;d++)a.setUint32(4*d,u[d],i)}digest(){const{buffer:t,outputLen:r}=this;this.digestInto(t);const o=t.slice(0,r);return this.destroy(),o}_cloneInto(t){t||(t=new this.constructor),t.set(...this.get());const{blockLen:r,buffer:o,length:n,finished:i,destroyed:s,pos:a}=this;return t.length=n,t.pos=a,t.finished=i,t.destroyed=s,n%r&&t.buffer.set(o),t}}const h7=new Uint8Array([7,4,13,1,10,6,15,3,12,0,9,5,2,14,11,8]),Ox=Uint8Array.from({length:16},(e,t)=>t),p7=Ox.map(e=>(9*e+5)%16);let $f=[Ox],Pf=[p7];for(let e=0;e<4;e++)for(let t of[$f,Pf])t.push(t[e].map(r=>h7[r]));const Ax=[[11,14,15,12,5,8,7,9,11,13,14,15,6,7,9,8],[12,13,11,15,6,9,9,7,12,15,11,13,7,8,7,7],[13,15,14,11,7,7,6,8,13,14,13,12,5,5,6,9],[14,11,12,14,8,6,5,5,15,12,15,14,9,9,8,6],[15,12,13,13,9,5,8,6,14,11,12,11,8,6,5,5]].map(e=>new Uint8Array(e)),g7=$f.map((e,t)=>e.map(r=>Ax[t][r])),m7=Pf.map((e,t)=>e.map(r=>Ax[t][r])),b7=new Uint32Array([0,1518500249,1859775393,2400959708,2840853838]),v7=new Uint32Array([1352829926,1548603684,1836072691,2053994217,0]),za=(e,t)=>e<<t|e>>>32-t;function em(e,t,r,o){return e===0?t^r^o:e===1?t&r|~t&o:e===2?(t|~r)^o:e===3?t&o|r&~o:t^(r|~o)}const Fa=new Uint32Array(16);class y7 extends f7{constructor(){super(64,20,8,!0),this.h0=1732584193,this.h1=-271733879,this.h2=-1732584194,this.h3=271733878,this.h4=-1009589776}get(){const{h0:t,h1:r,h2:o,h3:n,h4:i}=this;return[t,r,o,n,i]}set(t,r,o,n,i){this.h0=t|0,this.h1=r|0,this.h2=o|0,this.h3=n|0,this.h4=i|0}process(t,r){for(let h=0;h<16;h++,r+=4)Fa[h]=t.getUint32(r,!0);let o=this.h0|0,n=o,i=this.h1|0,s=i,a=this.h2|0,l=a,c=this.h3|0,u=c,d=this.h4|0,f=d;for(let h=0;h<5;h++){const p=4-h,m=b7[h],y=v7[h],g=$f[h],w=Pf[h],T=g7[h],x=m7[h];for(let C=0;C<16;C++){const $=za(o+em(h,i,a,c)+Fa[g[C]]+m,T[C])+d|0;o=d,d=c,c=za(a,10)|0,a=i,i=$}for(let C=0;C<16;C++){const $=za(n+em(p,s,l,u)+Fa[w[C]]+y,x[C])+f|0;n=f,f=u,u=za(l,10)|0,l=s,s=$}}this.set(this.h1+a+u|0,this.h2+c+f|0,this.h3+d+n|0,this.h4+o+s|0,this.h0+i+l|0)}roundClean(){Fa.fill(0)}destroy(){this.destroyed=!0,this.buffer.fill(0),this.set(0,0,0,0,0)}}const x7=u7(()=>new y7);Re.hmacSha256Sync=(e,...t)=>Cl(ac,e,Re.concatBytes(...t));const Uc=rx(ac);function tm(e){return BigInt(`0x${Tt.bytesToHex(e)}`)}function C7(e){return Tt.hexToBytes(e.toString(16).padStart(64,"0"))}const w7=Tt.utf8ToBytes("Bitcoin seed"),Vc={private:76066276,public:76067358},Kc=2147483648,S7=e=>x7(ac(e)),E7=e=>Tt.createView(e).getUint32(0,!1),Na=e=>{if(!Number.isSafeInteger(e)||e<0||e>2**32-1)throw new Error(`Invalid number=${e}. Should be from 0 to 2 ** 32 - 1`);const t=new Uint8Array(4);return Tt.createView(t).setUint32(0,e,!1),t};class cn{constructor(t){if(this.depth=0,this.index=0,this.chainCode=null,this.parentFingerprint=0,!t||typeof t!="object")throw new Error("HDKey.constructor must not be called directly");if(this.versions=t.versions||Vc,this.depth=t.depth||0,this.chainCode=t.chainCode,this.index=t.index||0,this.parentFingerprint=t.parentFingerprint||0,!this.depth&&(this.parentFingerprint||this.index))throw new Error("HDKey: zero depth with non-zero index/parent fingerprint");if(t.publicKey&&t.privateKey)throw new Error("HDKey: publicKey and privateKey at same time.");if(t.privateKey){if(!Re.isValidPrivateKey(t.privateKey))throw new Error("Invalid private key");this.privKey=typeof t.privateKey=="bigint"?t.privateKey:tm(t.privateKey),this.privKeyBytes=C7(this.privKey),this.pubKey=rz(t.privateKey,!0)}else if(t.publicKey)this.pubKey=ze.fromHex(t.publicKey).toRawBytes(!0);else throw new Error("HDKey: no public or private key provided");this.pubHash=S7(this.pubKey)}get fingerprint(){if(!this.pubHash)throw new Error("No publicKey set!");return E7(this.pubHash)}get identifier(){return this.pubHash}get pubKeyHash(){return this.pubHash}get privateKey(){return this.privKeyBytes||null}get publicKey(){return this.pubKey||null}get privateExtendedKey(){const t=this.privateKey;if(!t)throw new Error("No private key");return Uc.encode(this.serialize(this.versions.private,Tt.concatBytes(new Uint8Array([0]),t)))}get publicExtendedKey(){if(!this.pubKey)throw new Error("No public key");return Uc.encode(this.serialize(this.versions.public,this.pubKey))}static fromMasterSeed(t,r=Vc){if(Kn(t),8*t.length<128||8*t.length>512)throw new Error(`HDKey: wrong seed length=${t.length}. Should be between 128 and 512 bits; 256 bits is advised)`);const o=Cl(qu,w7,t);return new cn({versions:r,chainCode:o.slice(32),privateKey:o.slice(0,32)})}static fromExtendedKey(t,r=Vc){const o=Uc.decode(t),n=Tt.createView(o),i=n.getUint32(0,!1),s={versions:r,depth:o[4],parentFingerprint:n.getUint32(5,!1),index:n.getUint32(9,!1),chainCode:o.slice(13,45)},a=o.slice(45),l=a[0]===0;if(i!==r[l?"private":"public"])throw new Error("Version mismatch");return l?new cn({...s,privateKey:a.slice(1)}):new cn({...s,publicKey:a})}static fromJSON(t){return cn.fromExtendedKey(t.xpriv)}derive(t){if(!/^[mM]'?/.test(t))throw new Error('Path must start with "m" or "M"');if(/^[mM]'?$/.test(t))return this;const r=t.replace(/^[mM]'?\//,"").split("/");let o=this;for(const n of r){const i=/^(\d+)('?)$/.exec(n);if(!i||i.length!==3)throw new Error(`Invalid child index: ${n}`);let s=+i[1];if(!Number.isSafeInteger(s)||s>=Kc)throw new Error("Invalid index");i[2]==="'"&&(s+=Kc),o=o.deriveChild(s)}return o}deriveChild(t){if(!this.pubKey||!this.chainCode)throw new Error("No publicKey or chainCode set");let r=Na(t);if(t>=Kc){const a=this.privateKey;if(!a)throw new Error("Could not derive hardened child key");r=Tt.concatBytes(new Uint8Array([0]),a,r)}else r=Tt.concatBytes(this.pubKey,r);const o=Cl(qu,this.chainCode,r),n=tm(o.slice(0,32)),i=o.slice(32);if(!Re.isValidPrivateKey(n))throw new Error("Tweak bigger than curve order");const s={versions:this.versions,chainCode:i,depth:this.depth+1,parentFingerprint:this.fingerprint,index:t};try{if(this.privateKey){const a=Re.mod(this.privKey+n,Ge.n);if(!Re.isValidPrivateKey(a))throw new Error("The tweak was out of range or the resulted private key is invalid");s.privateKey=a}else{const a=ze.fromHex(this.pubKey).add(ze.fromPrivateKey(n));if(a.equals(ze.ZERO))throw new Error("The tweak was equal to negative P, which made the result key invalid");s.publicKey=a.toRawBytes(!0)}return new cn(s)}catch{return this.deriveChild(t+1)}}sign(t){if(!this.privateKey)throw new Error("No privateKey set!");return Kn(t,32),sz(t,this.privKey,{canonical:!0,der:!1})}verify(t,r){if(Kn(t,32),Kn(r,64),!this.publicKey)throw new Error("No publicKey set!");let o;try{o=to.fromCompact(r)}catch{return!1}return lz(o,t,this.publicKey)}wipePrivateData(){return this.privKey=void 0,this.privKeyBytes&&(this.privKeyBytes.fill(0),this.privKeyBytes=void 0),this}toJSON(){return{xpriv:this.privateExtendedKey,xpub:this.publicExtendedKey}}serialize(t,r){if(!this.chainCode)throw new Error("No chainCode set");return Kn(r,33),Tt.concatBytes(Na(t),new Uint8Array([this.depth]),Na(this.parentFingerprint),Na(this.index),this.chainCode,r)}}class Bx extends Uu{constructor(t,r){super(),this.finished=!1,this.destroyed=!1,pz(t);const o=xf(r);if(this.iHash=t.create(),!(this.iHash instanceof Uu))throw new TypeError("Expected instance of class which extends utils.Hash");const n=this.blockLen=this.iHash.blockLen;this.outputLen=this.iHash.outputLen;const i=new Uint8Array(n);i.set(o.length>this.iHash.blockLen?t.create().update(o).digest():o);for(let s=0;s<i.length;s++)i[s]^=54;this.iHash.update(i),this.oHash=t.create();for(let s=0;s<i.length;s++)i[s]^=106;this.oHash.update(i),i.fill(0)}update(t){if(this.destroyed)throw new Error("instance is destroyed");return this.iHash.update(t),this}digestInto(t){if(this.destroyed)throw new Error("instance is destroyed");if(!(t instanceof Uint8Array)||t.length!==this.outputLen)throw new Error("HMAC: Invalid output buffer");if(this.finished)throw new Error("digest() was already called");this.finished=!0,this.iHash.digestInto(t),this.oHash.update(t),this.oHash.digestInto(t),this.destroy()}digest(){const t=new Uint8Array(this.oHash.outputLen);return this.digestInto(t),t}_cloneInto(t){t||(t=Object.create(Object.getPrototypeOf(this),{}));const{oHash:r,iHash:o,finished:n,destroyed:i,blockLen:s,outputLen:a}=this;return t=t,t.finished=n,t.destroyed=i,t.blockLen=s,t.outputLen=a,t.oHash=r._cloneInto(t.oHash),t.iHash=o._cloneInto(t.iHash),t}destroy(){this.destroyed=!0,this.oHash.destroy(),this.iHash.destroy()}}const Mx=(e,t,r)=>new Bx(e,t).update(r).digest();Mx.create=(e,t)=>new Bx(e,t);var _7=Object.defineProperty,Jo=(e,t)=>{for(var r in t)_7(e,r,{get:t[r],enumerable:!0})};function T7(){return Re.bytesToHex(Re.randomPrivateKey())}function Hx(e){return Re.bytesToHex(oa.getPublicKey(e))}var $7={};Jo($7,{insertEventIntoAscendingList:()=>k7,insertEventIntoDescendingList:()=>L7,normalizeURL:()=>P7,utf8Decoder:()=>mn,utf8Encoder:()=>so});var mn=new TextDecoder("utf-8"),so=new TextEncoder;function P7(e){let t=new URL(e);return t.pathname=t.pathname.replace(/\/+/g,"/"),t.pathname.endsWith("/")&&(t.pathname=t.pathname.slice(0,-1)),(t.port==="80"&&t.protocol==="ws:"||t.port==="443"&&t.protocol==="wss:")&&(t.port=""),t.searchParams.sort(),t.hash="",t.toString()}function L7(e,t){var s;let r=0,o=e.length-1,n,i=r;if(o<0)i=0;else if(t.created_at<e[o].created_at)i=o+1;else if(t.created_at>=e[r].created_at)i=r;else for(;;){if(o<=r+1){i=o;break}if(n=Math.floor(r+(o-r)/2),e[n].created_at>t.created_at)r=n;else if(e[n].created_at<t.created_at)o=n;else{i=n;break}}return((s=e[i])==null?void 0:s.id)!==t.id?[...e.slice(0,i),t,...e.slice(i)]:e}function k7(e,t){var s;let r=0,o=e.length-1,n,i=r;if(o<0)i=0;else if(t.created_at>e[o].created_at)i=o+1;else if(t.created_at<=e[r].created_at)i=r;else for(;;){if(o<=r+1){i=o;break}if(n=Math.floor(r+(o-r)/2),e[n].created_at<t.created_at)r=n;else if(e[n].created_at>t.created_at)o=n;else{i=n;break}}return((s=e[i])==null?void 0:s.id)!==t.id?[...e.slice(0,i),t,...e.slice(i)]:e}function I7(e){if(!kf(e))throw new Error("can't serialize event with wrong or missing properties");return JSON.stringify([0,e.pubkey,e.created_at,e.kind,e.tags,e.content])}function Lf(e){let t=na(so.encode(I7(e)));return Re.bytesToHex(t)}function kf(e){if(typeof e!="object"||typeof e.kind!="number"||typeof e.content!="string"||typeof e.created_at!="number"||typeof e.pubkey!="string"||!e.pubkey.match(/^[a-f0-9]{64}$/)||!Array.isArray(e.tags))return!1;for(let t=0;t<e.tags.length;t++){let r=e.tags[t];if(!Array.isArray(r))return!1;for(let o=0;o<r.length;o++)if(typeof r[o]=="object")return!1}return!0}function If(e){return oa.verifySync(e.sig,Lf(e),e.pubkey)}function R7(e,t){return Re.bytesToHex(oa.signSync(Lf(e),t))}var O7={};Jo(O7,{getHex64:()=>Rf,getInt:()=>Dx,getSubscriptionId:()=>A7,matchEventId:()=>B7,matchEventKind:()=>H7,matchEventPubkey:()=>M7});function Rf(e,t){let r=t.length+3,o=e.indexOf(`"${t}":`)+r,n=e.slice(o).indexOf('"')+o+1;return e.slice(n,n+64)}function Dx(e,t){let r=t.length,o=e.indexOf(`"${t}":`)+r+3,n=e.slice(o),i=Math.min(n.indexOf(","),n.indexOf("}"));return parseInt(n.slice(0,i),10)}function A7(e){let t=e.slice(0,22).indexOf('"EVENT"');if(t===-1)return null;let r=e.slice(t+7+1).indexOf('"');if(r===-1)return null;let o=t+7+1+r,n=e.slice(o+1,80).indexOf('"');if(n===-1)return null;let i=o+1+n;return e.slice(o+1,i)}function B7(e,t){return t===Rf(e,"id")}function M7(e,t){return t===Rf(e,"pubkey")}function H7(e,t){return t===Dx(e,"kind")}var D7={};Jo(D7,{decrypt:()=>F7,encrypt:()=>z7});async function z7(e,t,r){const o=Fy(e,"02"+t),n=zx(o);let i=Uint8Array.from(mz(16)),s=so.encode(r),a=await crypto.subtle.importKey("raw",n,{name:"AES-CBC"},!1,["encrypt"]),l=await crypto.subtle.encrypt({name:"AES-CBC",iv:i},a,s),c=Ei.encode(new Uint8Array(l)),u=Ei.encode(new Uint8Array(i.buffer));return`${c}?iv=${u}`}async function F7(e,t,r){let[o,n]=r.split("?iv="),i=Fy(e,"02"+t),s=zx(i),a=await crypto.subtle.importKey("raw",s,{name:"AES-CBC"},!1,["decrypt"]),l=Ei.decode(o),c=Ei.decode(n),u=await crypto.subtle.decrypt({name:"AES-CBC",iv:c},a,l);return mn.decode(u)}function zx(e){return e.slice(1,33)}var N7={};Jo(N7,{queryProfile:()=>U7,searchDomain:()=>W7,useFetchImplementation:()=>j7});var cc;try{cc=fetch}catch{}function j7(e){cc=e}async function W7(e,t=""){try{return(await(await cc(`https://${e}/.well-known/nostr.json?name=${t}`)).json()).names}catch{return{}}}async function U7(e){var s,a;let[t,r]=e.split("@");if(r||(r=t,t="_"),!t.match(/^[A-Za-z0-9-_]+$/))return null;let o;try{o=await(await cc(`https://${r}/.well-known/nostr.json?name=${t}`)).json()}catch{return null}if(!((s=o==null?void 0:o.names)!=null&&s[t]))return null;let n=o.names[t],i=((a=o.relays)==null?void 0:a[n])||[];return{pubkey:n,relays:i}}var V7={};Jo(V7,{generateSeedWords:()=>q7,privateKeyFromSeedWords:()=>K7,validateWords:()=>G7});function K7(e,t){let o=cn.fromMasterSeed(vx(e,t)).derive("m/44'/1237'/0'/0/0").privateKey;if(!o)throw new Error("could not derive private key");return Re.bytesToHex(o)}function q7(){return Ex(Sf)}function G7(e){return Px(e,Sf)}var uc={};Jo(uc,{decode:()=>X7,naddrEncode:()=>tF,neventEncode:()=>eF,noteEncode:()=>J7,nprofileEncode:()=>Q7,npubEncode:()=>Z7,nsecEncode:()=>Y7});var la=5e3;function X7(e){var n,i,s,a,l;let{prefix:t,words:r}=sr.decode(e,la),o=new Uint8Array(sr.fromWords(r));switch(t){case"nprofile":{let c=qc(o);if(!((n=c[0])!=null&&n[0]))throw new Error("missing TLV 0 for nprofile");if(c[0][0].length!==32)throw new Error("TLV 0 should be 32 bytes");return{type:"nprofile",data:{pubkey:Re.bytesToHex(c[0][0]),relays:c[1]?c[1].map(u=>mn.decode(u)):[]}}}case"nevent":{let c=qc(o);if(!((i=c[0])!=null&&i[0]))throw new Error("missing TLV 0 for nevent");if(c[0][0].length!==32)throw new Error("TLV 0 should be 32 bytes");return{type:"nevent",data:{id:Re.bytesToHex(c[0][0]),relays:c[1]?c[1].map(u=>mn.decode(u)):[]}}}case"naddr":{let c=qc(o);if(!((s=c[0])!=null&&s[0]))throw new Error("missing TLV 0 for naddr");if(!((a=c[2])!=null&&a[0]))throw new Error("missing TLV 2 for naddr");if(c[2][0].length!==32)throw new Error("TLV 2 should be 32 bytes");if(!((l=c[3])!=null&&l[0]))throw new Error("missing TLV 3 for naddr");if(c[3][0].length!==4)throw new Error("TLV 3 should be 4 bytes");return{type:"naddr",data:{identifier:mn.decode(c[0][0]),pubkey:Re.bytesToHex(c[2][0]),kind:parseInt(Re.bytesToHex(c[3][0]),16),relays:c[1]?c[1].map(u=>mn.decode(u)):[]}}}case"nsec":case"npub":case"note":return{type:t,data:Re.bytesToHex(o)};default:throw new Error(`unknown prefix ${t}`)}}function qc(e){let t={},r=e;for(;r.length>0;){let o=r[0],n=r[1],i=r.slice(2,2+n);r=r.slice(2+n),!(i.length<n)&&(t[o]=t[o]||[],t[o].push(i))}return t}function Y7(e){return Of("nsec",e)}function Z7(e){return Of("npub",e)}function J7(e){return Of("note",e)}function Of(e,t){let r=Re.hexToBytes(t),o=sr.toWords(r);return sr.encode(e,o,la)}function Q7(e){let t=Af({0:[Re.hexToBytes(e.pubkey)],1:(e.relays||[]).map(o=>so.encode(o))}),r=sr.toWords(t);return sr.encode("nprofile",r,la)}function eF(e){let t=Af({0:[Re.hexToBytes(e.id)],1:(e.relays||[]).map(o=>so.encode(o))}),r=sr.toWords(t);return sr.encode("nevent",r,la)}function tF(e){let t=new ArrayBuffer(4);new DataView(t).setUint32(0,e.kind,!1);let r=Af({0:[so.encode(e.identifier)],1:(e.relays||[]).map(n=>so.encode(n)),2:[Re.hexToBytes(e.pubkey)],3:[new Uint8Array(t)]}),o=sr.toWords(r);return sr.encode("naddr",o,la)}function Af(e){let t=[];return Object.entries(e).forEach(([r,o])=>{o.forEach(n=>{let i=new Uint8Array(n.length+2);i.set([parseInt(r)],0),i.set([n.length],1),i.set(n,2),t.push(i)})}),Re.concatBytes(...t)}var rF={};Jo(rF,{createDelegation:()=>oF,getDelegator:()=>nF});function oF(e,t){let r=[];(t.kind||-1)>=0&&r.push(`kind=${t.kind}`),t.until&&r.push(`created_at<${t.until}`),t.since&&r.push(`created_at>${t.since}`);let o=r.join("&");if(o==="")throw new Error("refusing to create a delegation without any conditions");let n=na(so.encode(`nostr:delegation:${t.pubkey}:${o}`)),i=Re.bytesToHex(oa.signSync(n,e));return{from:Hx(e),to:t.pubkey,cond:o,sig:i}}function nF(e){let t=e.tags.find(a=>a[0]==="delegation"&&a.length>=4);if(!t)return null;let r=t[1],o=t[2],n=t[3],i=o.split("&");for(let a=0;a<i.length;a++){let[l,c,u]=i[a].split(/\b/);if(!(l==="kind"&&c==="="&&e.kind===parseInt(u))){if(l==="created_at"&&c==="<"&&e.created_at<parseInt(u))continue;if(l==="created_at"&&c===">"&&e.created_at>parseInt(u))continue;return null}}let s=na(so.encode(`nostr:delegation:${e.pubkey}:${o}`));return oa.verifySync(n,s,r)?r:null}var iF={};Jo(iF,{getZapEndpoint:()=>aF,makeZapReceipt:()=>uF,makeZapRequest:()=>lF,useFetchImplementation:()=>sF,validateZapRequest:()=>cF});var Bf;try{Bf=fetch}catch{}function sF(e){Bf=e}async function aF(e){try{let t="",{lud06:r,lud16:o}=JSON.parse(e.content);if(r){let{words:s}=sr.decode(r,1e3),a=sr.fromWords(s);t=mn.decode(a)}else if(o){let[s,a]=o.split("@");t=`https://${a}/.well-known/lnurlp/${s}`}else return null;let i=await(await Bf(t)).json();if(i.allowsNostr&&i.nostrPubkey)return i.callback}catch{}return null}function lF({profile:e,event:t,amount:r,relays:o,comment:n=""}){if(!r)throw new Error("amount not given");if(!e)throw new Error("profile not given");let i={kind:9734,created_at:Math.round(Date.now()/1e3),content:n,tags:[["p",e],["amount",r.toString()],["relays",...o]]};return t&&i.tags.push(["e",t]),i}function cF(e){let t;try{t=JSON.parse(e)}catch{return"Invalid zap request JSON."}if(!kf(t))return"Zap request is not a valid Nostr event.";if(!If(t))return"Invalid signature on zap request.";let r=t.tags.find(([i,s])=>i==="p"&&s);if(!r)return"Zap request doesn't have a 'p' tag.";if(!r[1].match(/^[a-f0-9]{64}$/))return"Zap request 'p' tag is not valid hex.";let o=t.tags.find(([i,s])=>i==="e"&&s);return o&&!o[1].match(/^[a-f0-9]{64}$/)?"Zap request 'e' tag is not valid hex.":t.tags.find(([i,s])=>i==="relays"&&s)?null:"Zap request doesn't have a 'relays' tag."}function uF({zapRequest:e,preimage:t,bolt11:r,paidAt:o}){let i=JSON.parse(e).tags.filter(([a])=>a==="e"||a==="p"||a==="a"),s={kind:9735,created_at:Math.round(o.getTime()/1e3),content:"",tags:[...i,["bolt11",r],["description",e]]};return t&&s.tags.push(["preimage",t]),s}Re.hmacSha256Sync=(e,...t)=>Mx(na,e,Re.concatBytes(...t));Re.sha256Sync=(...e)=>na(Re.concatBytes(...e));function dF(e){var t,r;return(r=e==null?void 0:e.targetEventBeltline)!=null?r:((t=e==null?void 0:e.form)!=null?t:Ho).createChild(Object.assign({},e))}function P9(e){var t,r;return(r=e==null?void 0:e.targetEventBeltline)!=null?r:((t=e==null?void 0:e.form)!=null?t:Ho).createChild(Object.assign({slef:Gt({})},e))}var Mr=(e=>(e[e.NEXT=0]="NEXT",e[e.BREAK=1]="BREAK",e[e.CONTINUE=2]="CONTINUE",e[e.PREVENT_CIRCULAR_REFERENCES=3]="PREVENT_CIRCULAR_REFERENCES",e))(Mr||{});function L9(e){return e}function fF(){return hF}function hF(e){return e}function pF(){return{initialization(){this.beltline.onAfterReq(({subId:e})=>{this.beltline.getRelayEmiter().once("eose",e,()=>{this.beltline.closeReqBySubid(e)})})}}}function gF(e){return{push(t,r){return mF(t,e,r.length)?Mr.NEXT:Mr.BREAK}}}function mF(e,t,r){return t.length===0?!0:t.some(o=>bF(e,o,r))}function bF(e,t,r){const{ids:o,kinds:n,authors:i,since:s,until:a,limit:l,search:c}=t;return o&&!o.includes(e.id)||n&&!n.includes(e.kind)||i&&!i.includes(e.pubkey)||s&&!(e.created_at>=s)||a&&!(e.created_at<=a)||l&&!(r<l)?!1:vF(t,e.tags)?!(c&&!JSON.stringify(e).toLowerCase().includes(c.toLowerCase())):!1}function vF(e,t){for(let r in e)if(r[0]==="#"){let o=r.slice(1),n=e[`#${o}`];if(n&&!t.find(([i,s])=>i===o&&n.includes(s)))return!1}return!0}function yF(){const e=new Hn.exports.EventEmitter;return e.setMaxListeners(1e3),{push(t,r,{lastState:o,subId:n}){const i=r[0];return i?(t.created_at>i.created_at&&(r[0]=r[0],e.emit("update",t,n)),Mr.BREAK):(r[0]=t,e.emit("update",t,n),Mr.BREAK)},feat:{isHas(){return!!this.beltline.getList()[0]},getLatestEvent(){return this.beltline.getList()[0]},onUpdated(t){e.on("update",t)},onHasLatestEvent(t){const r=this.beltline.getList()[0];r&&t(r),e.on("update",t)},onHasLatestEventOnce(t){const r=this.beltline.getList()[0];r?t(r):e.once("update",t)}}}}const wl=class{constructor(t,r){ye(this,"name");ye(this,"localEvent",null);ye(this,"data");ye(this,"isChange",!1);ye(this,"changeAt",null);ye(this,"isSync",!1);ye(this,"changeCount",0);ye(this,"onSetData",null);this.name=t,wl.cacheList.push(this.name);const o=this.getLocalEvent();if(!o){this.data=r;return}this.setDataByEvent(o)}static clearAll(){for(const t of wl.cacheList)localStorage.removeItem(t)}setLocalEvent(t){this.localEvent=t,window.localStorage.setItem(this.name,JSON.stringify(t))}getLocalEvent(){const t=this.localEvent;if(t)return t;const r=localStorage.getItem(this.name);if(!r)return null;try{return JSON.parse(r)}catch{return localStorage.removeItem(this.name),null}}getChangeAt(){return this.changeAt}getUpdateAt(){var t;return(t=this.getLocalEvent())==null?void 0:t.created_at}toChanged(){return this.changeAt=eg(),this.isChange=!0,this.changeCount+=1}hasChange(){return this.isChange}isReChange(t){return this.changeCount!==t}setData(t){var r;this.data=t,(r=this.onSetData)==null||r.call(this,t)}getData(){return this.data}getDataAndChange(){return this.toChanged(),this.data}setDataByEvent(t){this.setData(this.serializeToData(t))}sync(t){var o;this.isSync=!0;const r=t!=null&&t.onlyUrl?new Set().add(t.onlyUrl):new Set([...(o=t==null?void 0:t.moreUrls)!=null?o:[],...oi.getWriteList(),...oi.getReadList()].slice(0,10));of(`cache:${this.name+[...r]}`,()=>{const n=this,i=new Set,s=dF().addFilters(this.getFilters()).addStaff({push(u,d,{subId:f}){var p;if(!f)return;const h=this.beltline.getUrlBySubId(f);!h||(i.add(h),(p=t==null?void 0:t.onEvent)==null||p.call(t,u,h))}}).addStaff(yF()).addStaff({initialization(){this.beltline.onAfterReq(({subId:u,url:d})=>{this.beltline.getRelayEmiter().once("eose",u,()=>{var f;if(!i.has(d)){const h=n.getLocalEvent();h&&s.publish(h,new Set().add(d)),(f=t==null?void 0:t.onPush)==null||f.call(t,d)}})})}}).addStaff(pF()).addRelayUrls(r);!(t!=null&&t.onlyUrl)&&s.addExtends(Ho);const a=this.getLocalEvent();a&&Ho.pushEvent(a);const l=new Set,c=sy((u,d)=>{this.syncByEvent(u,d,l,s)});return s.feat.onHasLatestEvent(c),!0},{duration:1e4})}syncOne(){this.isSync||this.sync()}syncByEvent(t,r,o,n){const i=n.getUrlBySubId(r!=null?r:""),s=this.getUpdateAt();if(!s||t.created_at>s)this.setDataByEvent(t),this.setLocalEvent(t),n.publish(t,o);else if(t.created_at<s&&i){const a=this.getLocalEvent();a&&n.publish(a,new Set().add(i))}!i||o.add(i)}save(){if(!this.isChange||!this.saveToEvent())return;const r=this.getLocalEvent();!r||(Ho.publish(r,oi.getWriteList()),this.isChange=!1)}saveToEvent(){var r;if(!this.data)return!1;const t=this.deserializeToEvent(this.data,(r=this.getChangeAt())!=null?r:eg());return this.setLocalEvent(t),!0}};let ys=wl;ye(ys,"cacheList",[]);const Mf="prikey";function xF(){return T7()}function CF(e){localStorage.setItem(Mf,e),setTimeout(()=>{Za.value=e})}function wF(e=xF()){return localStorage.setItem("newUserFlag",e),CF(e),e}function k9(){window.localStorage[Mf]="",ys.clearAll(),location.reload()}function I9(){const e=localStorage.getItem("newUserFlag"),t=localStorage.getItem("prikey");return!!(e&&e===t)}const Za=K((()=>{const e=localStorage.getItem(Mf);return e||wF()})()),Di=q(()=>({privateKey:Za.value,publicKey:Za.value?Hx(Za.value):""}));q(()=>uc.nprofileEncode({pubkey:Di.value.publicKey,relays:[]}));q(()=>uc.npubEncode(Di.value.publicKey));q(()=>uc.nsecEncode(Di.value.privateKey));function Fx(e){const{privateKey:t,publicKey:r}=Di.value;let o=Object.assign({kind:1,pubkey:r,created_at:Math.floor(Date.now()/1e3),tags:[],content:""},e);return o.id=Lf(o),o.sig=R7(o,t),o}class SF{createId(){return Math.random().toString().slice(2)}}class Nx{constructor(){ye(this,"eventEmiter",new Hn.exports);ye(this,"queue",KB());this.eventEmiter.setMaxListeners(1e3)}emit(t,r,o){this.queue.unShift(()=>{this.eventEmiter.emit(this.createEventName(t,r),o)})}emitEvent(t,r){this.eventEmiter.emit("event",r),this.emit("event",t,r)}onEvent(t){this.eventEmiter.on("event",t)}on(t,r,o,n){this.eventEmiter.on(this.createEventName(t,r),o),n!=null&&n.overtime&&setTimeout(()=>{this.removeListener(t,r,o)},n.overtime)}once(t,r,o){this.eventEmiter.once(this.createEventName(t,r),o)}removeListener(t,r,o){this.eventEmiter.removeListener(this.createEventName(t,r),o)}onRequest(t,r){this.eventEmiter.on(t,r)}emitRequest(t,r){this.queue.unShift(()=>{this.eventEmiter.emit(t,r)})}removeRequestListener(t,r){this.eventEmiter.removeListener(t,r)}removeRequestAllListener(t){this.eventEmiter.removeAllListeners(t)}removeRequestAllTypeListener(){for(const t of["req","closeReq","publish","close"])this.removeRequestAllListener(t)}removeAllListener(t){["eose","event","notice","ok"].forEach(r=>this.eventEmiter.removeAllListeners(this.createEventName(r,t)))}createEventName(t,r){return`${t}:${r}`}}const EF=fF()(()=>({initialization(){this.beltline.feat.pushEvent=function(e,t){t.push(e)}}})),$o=Symbol(),Po=Symbol();function _F(e){const t=new Set;for(const r of e)r[0]==="r"&&t.add(r[1]);return t.delete(""),t}function R9(e){for(const t of e)if(t[0]==="e"&&t[3]==="root")return t}function O9(e){for(const t of e)if(t[0]==="e")return t}function TF(e){const t=[];for(const r in e){const{read:o,write:n}=e[r];o&&n?t.push(["r",r]):o?t.push(["r",r,"read"]):n&&t.push(["r",r,"write"])}return t}function $F(e){var n,i;const{readUrl:t,writeUrl:r}=jx(e),o={[$o]:t,[Po]:r};for(const s of t)((n=o[s])!=null?n:o[s]={}).read=!0;for(const s of r)((i=o[s])!=null?i:o[s]={}).write=!0;return{relayConfiguration:o,readUrl:t,writeUrl:r}}function jx(e){const t=new Set,r=new Set,o=new Set;if(e)for(const n of e)n[0]==="r"&&(o.add(n[1]),n[2]==="read"?t.add(n[1]):(n[2]==="write"||t.add(n[1]),r.add(n[1])));return{readUrl:t,writeUrl:r,urls:o}}function A9(e){const t=[];for(const r of e)if(r[0]==="e"){const o={eventId:r[1],relay:r[2],marker:["reply","mention","root"].includes(r[3])?r[3]:"reply",type:""};t.push(o)}return t}function B9(e){var r;const t=[];for(const o of e)t.push(["e",o.eventId,(r=o.relay)!=null?r:"",o.marker]);return t}function M9(e){const t=[];for(const r of e)r[0]==="p"&&t.push({pubkey:r[1],relayUrl:r[2],name:r[3]});return t}const PF=function(e){return e.__proto__=this.__proto__,e};let rm=0;class Hf extends PF{constructor(r){var o,n,i,s,a,l;super((o=r==null?void 0:r.slef)!=null?o:{});ye(this,"relayConfigurator");ye(this,"__EventBeltline__",!0);ye(this,"id",rm++);ye(this,"name",String(rm));ye(this,"staffs",[]);ye(this,"feat");ye(this,"subidMap",new Map);ye(this,"options");ye(this,"urls",new Set);ye(this,"filters",[]);ye(this,"eventList",[]);ye(this,"parent",null);ye(this,"children",new Set);ye(this,"extends",new Set);ye(this,"extendTo",new Set);ye(this,"root");ye(this,"idGenerator");ye(this,"relayEmiter");ye(this,"eventEmitter",new Hn.exports.EventEmitter().setMaxListeners(200));this.options=r!=null?r:{},r!=null&&r.name&&(this.name=r.name),this.feat={beltline:this},r!=null&&r.describe&&(this.name=r==null?void 0:r.describe),this.relayEmiter=(n=r==null?void 0:r.relayEmiter)!=null?n:new Nx,this.root=(i=r==null?void 0:r.root)!=null?i:this,this.parent=(s=r==null?void 0:r.parent)!=null?s:null,this.relayConfigurator=r==null?void 0:r.relayConfigurator,this.idGenerator=(a=r==null?void 0:r.idGenerator)!=null?a:new SF,this.addFiltersStaff(this.filters,{unshift:!0});for(const c of this.staffs)(l=c==null?void 0:c.initialization)==null||l.call(c);this.addStaff(EF())}static isEventBeltlin(r){return typeof r=="object"&&Boolean(r.__EventBeltline__)}getRelayEmiter(){return this.relayEmiter}getRoot(){this.root}getExtends(){return this.extends}getExtendTo(){return this.extendTo}addExtends(r,o){if(this.extends.add(r),r.extendTo.add(this),o!=null&&o.preventPushHistory)return this;for(const n of r.getList())this.pushEvent(n);return this}pushEvent(r,o,n=new Set){var l,c,u,d,f;if(n.has(this))return;n.add(this);const{subId:i,url:s}=o!=null?o:{};for(const h of this.staffs)(l=h.beforePush)==null||l.call(h,r,this.eventList);let a=Mr.NEXT;for(const h of this.staffs){const p=(u=(c=h.push)==null?void 0:c.call(h,r,this.eventList,{lastState:a,subId:i,url:s}))!=null?u:Mr.NEXT;if(a=p,p!==Mr.NEXT)break}for(const h of this.staffs)a=(f=(d=h.afterPush)==null?void 0:d.call(h,r,this.eventList,a))!=null?f:a;a===Mr.NEXT&&this.feat.pushEvent(r,this.eventList,{lastState:a,subId:i,url:s}),a===Mr.NEXT&&this.extendTo.forEach(h=>{h.pushEvent(r,o,n)})}getRelayUrls(){return this.urls}addReadUrl(){return this.relayConfigurator&&this.addRelayUrls(this.relayConfigurator.getReadList()),this}addRelayUrl(r){return this.addRelayUrls(new Set().add(r)),this}addRelayUrls(r){if(!r)return this;if(r.size===0)return this;const o=FB(this.urls,r);for(const n of o)this.urls.add(n);return this.reqs(o,this.filters),this.eventEmitter.emit("add-relay-urls",o,r),this}onAddRelayUrlsAfter(r){return this.eventEmitter.on("add-relay-urls",r),this}getFilters(){return this.filters}addFilter(r){return this.addFilters([r]),this}addFilters(r){return this.filters.push(...r),this.reqs(this.urls,r),this.eventEmitter.emit("add-filters",r),this}onAddFilters(r){return this.eventEmitter.on("add-filters",r),this}removeStaff(r){NB(this.staffs,r)}addStaff(r,o){return this.initializationStaff(r),o!=null&&o.unshift?this.staffs.unshift(r):this.staffs.push(r),this}initializationStaff(r){var o;r.feat&&Object.assign(this.feat,r.feat),r.beltline=this,(o=r.initialization)==null||o.call(r)}addFilterStaff(r,o){return this.addFiltersStaff([r],o),this}addFiltersStaff(r,o){const n=gF(r);return this.addStaff(n,o),this}setParent(r){return this.parent=r,this}addChild(r){return this.children.add(r),this}createChild(r){const o=new Hf(Object.assign({},{relayEmiter:this.relayEmiter,idGenerator:this.idGenerator,relayConfigurator:this.relayConfigurator,root:this.root,parent:this,slef:{}},r));return this.addChild(o),o}closeReq(){var r;for(const o of this.staffs)(r=o.onClose)==null||r.call(o);for(const o of this.children)o.closeReq();for(const[o,n]of this.subidMap)this._closeReq(o,n);this.eventEmitter.removeAllListeners()}_closeReq(r,o){this.relayEmiter.emitRequest("closeReq",{subId:r,url:o})}closeReqBySubid(r){if(!r)return;const o=this.subidMap.get(r);!o||this._closeReq(r,o)}offLine(){}map(r){return this.eventList.map(r)}getList(){return this.eventList}addStaffOfSortByCreateAt(){return this.addStaff({initialization(){this.beltline.feat.pushEvent=function(r,o){const n=DB(o,r.created_at,"created_at");o.splice(n,0,r)}}}),this}addStaffOfReverseSortByCreateAt(){return this.addStaff({initialization(){this.beltline.feat.pushEvent=function(r,o){const n=zB(o,r.created_at,"created_at");o.splice(n,0,r)}}}),this}reqs(r,o){o.length!==0&&(r==null||r.forEach(async n=>{try{this.req(n,o)}catch(i){console.error(i)}}))}publish(r,o,n){var c,u;const i=new Set(o);let s=!1;try{!If(r)&&(s=!0)}catch{s=!0}if(s||(n==null?void 0:n.addUrl)){s=!0;const d=(c=r.tags)!=null?c:[],f=_F(d);for(const h of i)f.has(h)||d.push(["r",h]);jB(i,f),r.tags=d}let a=r;if(s){if(r.pubkey&&r.pubkey!==Di.value.publicKey)return;a=Fx(r)}this.pushEvent(a),n!=null&&n.onOK&&this.relayEmiter.on("ok",a.id,n.onOK);const l=new Set;for(const d of(u=n==null?void 0:n.autoPublishToTagR)==null||u?i:o)this.toPublish(d,a),l.add(d);for(const d of this.getRelayUrls())l.has(d)||this.toPublish(d,a);return this.onAddRelayUrlsAfter(d=>{for(const f of d)l.has(f)||this.toPublish(f,a)}),a}req(r,o){const n=this.idGenerator.createId();this.onReceiveEvent(n),this.setSubidMap(n,r),this.relayEmiter.emitRequest("req",{subId:n,url:r,filters:o})}onReceiveEvent(r,o=new WeakSet){o.has(this)||(o.add(this),this.relayEmiter.on("event",r,({event:n,url:i})=>{this.pushEvent(n,{subId:r,url:i})}),this.relayEmiter.once("eose",r,()=>{this.relayEmiter.removeAllListener(r)}))}async toPublish(r,o){this.relayEmiter.emitRequest("publish",{event:o,url:r})}setSubidMap(r,o){this.subidMap.set(r,o),this.eventEmitter.emit("afterReq",{subId:r,url:o})}onAfterReq(r){return this.eventEmitter.on("afterReq",r),this}getUrlBySubId(r){return this.subidMap.get(r)}}async function LF(e){return new Promise((t,r)=>{const o=new WebSocket(e);o.onopen=()=>{t(o)},o.onerror=n=>{r(n)}})}window.sendCount=0;class kF{constructor(t,r){ye(this,"pool");ye(this,"relayEmiter");ye(this,"allSubIds");var n;const o=(n=r==null?void 0:r.self)!=null?n:{};return o.__proto__=this.__proto__,o.relayEmiter=t,o.allSubIds=new Set,o.pool=new Map,o.listen(),o}async listen(){this.relayEmiter.onRequest("req",async({url:t,subId:r,filters:o})=>{(await this.getRelay(t)).req(o,r)}),this.relayEmiter.onRequest("closeReq",async({url:t,subId:r})=>{this.allSubIds.delete(r);const o=this.getRelayFromPool(t);!o||o.closeReq(r)}),this.relayEmiter.onRequest("publish",async({url:t,event:r})=>{(await this.getRelay(t)).publish(r)}),this.relayEmiter.onRequest("close",async({url:t})=>{const r=this.getRelayFromPool(t);!r||r.close()})}getPool(){return this.pool}async getRelay(t){const r=this.pool.get(t);return r||await this.createRelayPool(t)}getRelayFromPool(t){return this.pool.get(t)}async createRelayPool(t){return new Promise(async(r,o)=>{const n=await LF(t);n.onerror=s=>{var a,l;(a=this.pool.get(t))==null||a.close(),this.pool.delete(t),(l=this.getRelayFromPool(t))==null||l.close()},n.onclose=()=>{this.close(t)};const i=new IF(n,tf,this);this.pool.set(t,i),r(i)})}close(t){var r;(r=this.getRelayFromPool(t))==null||r.close(),this.pool.delete(t)}}class IF{constructor(t,r,o){ye(this,"ws");ye(this,"pool");ye(this,"subIds",new Set);ye(this,"timeout");ye(this,"isClose",!1);ye(this,"relayEmiter");ye(this,"publishIds",new Set);this.ws=t,this.ws.onmessage=this.handleMessage.bind(this),this.relayEmiter=r,this.pool=o}handleMessage(t){try{const r=JSON.parse(t.data);console.debug(this.ws.url,r),logger.for("Relay:onMessage:data").debug(r);let o="";if(Array.isArray(r))switch(r[0]){case"EVENT":o=r[1];let n=r[2];if(!kf(n)||!If(n))return;this.relayEmiter.emitEvent(o,{url:this.ws.url,event:n,subId:o});break;case"NOTICE":this.relayEmiter.emit("notice",o,{message:r[1],url:this.ws.url});break;case"EOSE":o=r[1],this.relayEmiter.emit("eose",o,{url:this.ws.url});break;case"OK":let i=r[1];this.relayEmiter.emit("ok",i,{ok:r[2],message:r[3],url:this.ws.url}),this.closePublish(i);break;case"AUTH":break;default:break}}catch{return}}send(t){window.sendCount++,this.ws.send(JSON.stringify(t))}createSubId(){return Math.random().toString().slice(2)}req(t,r=this.createSubId()){return console.debug("websocket:req:",t,this.ws.url),this.send(["REQ",r,...t]),this.addSubId(r),r}closePublish(t){!this.publishIds.has(t)||(this.publishIds.delete(t),this.autoClose())}publish(t){console.debug("websocket:publish",this.ws.url,t),this.send(["EVENT",t]),this.publishIds.add(t.id),setTimeout(()=>{this.closePublish(t.id)},6e4)}closeReq(t){!this.subIds.has(t)||(this.send(["CLOSE",t]),this.deleteSubId(t))}addSubId(t){this.subIds.add(t),this.pool.allSubIds.add(t),this.clearAutoClose()}deleteSubId(t){this.subIds.delete(t),this.pool.allSubIds.delete(t),this.relayEmiter.removeAllListener(t),this.autoClose()}close(){if(!this.isClose){for(const t of this.subIds)this.deleteSubId(t);this.isClose=!0,this.ws.close(),this.pool.close(this.ws.url)}}clearAutoClose(){clearTimeout(this.timeout),this.timeout=void 0}autoClose(){this.subIds.size>0||this.publishIds.size>0||(this.timeout=setTimeout(()=>{this.subIds.size>0||this.publishIds.size>0||this.close()},6e4))}}const RF=(e,t,r)=>et(e,sy(t,r.delay),r);var nm;const OF=(nm=window.defaultRelayUrls)!=null?nm:["wss://no.str.cr","wss://no-str.org","wss://nos.lol","wss://nostr.com.de","wss://relay.mostr.pub","wss://relay.nostr.wirednet.jp","wss://no-str.org","wss://brb.io"];class AF extends ys{setLocalEventByEvent(t){this.setLocalEvent(t)}constructor(){super("RelayConfigurator",{[$o]:new Set,[Po]:new Set})}getFilters(){return[{kinds:[10002],authors:[Di.value.publicKey]}]}serializeToData(t){const{relayConfiguration:r,readUrl:o,writeUrl:n}=$F(t.tags);return r}deserializeToEvent(t,r){const o=TF(t);return Fx({kind:10002,tags:o,created_at:r})}getConfiguration(){return this.getData()}getWriteList(){return this.getConfiguration()[Po]}getReadList(){return this.getConfiguration()[$o]}getOtherList(){return BF()}addWriteRead(t){this.addRead(t),this.addWrite(t)}addWrite(t){this.toChanged(),this.getRule(t).write=!0,this.getConfiguration()[Po].add(t)}remoteWrite(t){this.toChanged(),this.getRule(t).write=!1,this.getConfiguration()[Po].delete(t)}addRead(t){this.toChanged(),this.getRule(t).read=!0,this.getConfiguration()[$o].add(t)}remoteRead(t){this.toChanged(),this.getRule(t).read=!1,this.getConfiguration()[$o].delete(t)}remove(t){this.toChanged(),delete this.getData()[t],this.getConfiguration()[Po].delete(t),this.getConfiguration()[$o].delete(t)}setRule(t,r,o){if(this.toChanged(),!r&&!o)this.remove(t);else{const n=this.getRule(t);n.read=r,n.write=o,o?this.getConfiguration()[Po].add(t):this.getConfiguration()[Po].delete(t),r?this.getConfiguration()[$o].add(t):this.getConfiguration()[$o].delete(t)}}getRule(t){var r;return(r=this.getConfiguration()[t])!=null?r:this.getConfiguration()[t]={}}hasReadByUrl(t){return this.getReadList().has(t)}hasWriteByUrl(t){return this.getWriteList().has(t)}broadcast(t){var s;const r=this.getLocalEvent();if(!r||r.tags.length===0)return;const o=this.getOtherList(),n=Object.assign((s=t==null?void 0:t.slef)!=null?s:{},{numberOfErrors:0,numberOfSuccesses:0,numberOfOvertime:0,total:o.size}),i=new Set;return tf.on("ok",r.id,({ok:a,message:l,url:c})=>{i.add(c),a?n.numberOfSuccesses+=1:n.numberOfErrors+=1}),Ho.publish(r,o),setTimeout(()=>{o.forEach(a=>{i.has(a)||(n.numberOfOvertime+=1)})},1e3*30),n}}const Xu="__other_urls",Wx={...hl,useLocalStorage:!0,duration:1e3*60};function BF(){const e=of(Xu,om,Wx);return Array.isArray(e)?new Set(e):e instanceof Set?e:(LB(Xu),om())}function om(){const e=Gt(new Set),t=Ho.createChild().addFilter({kinds:[10002],limit:20}).addStaff({push(r){const{writeUrl:o,readUrl:n}=jx(r.tags);for(const i of o)e.add(i);for(const i of n)e.add(i)}});return setTimeout(async()=>{var n;const r=Array.from(new Set([...oi.getReadList(),...oi.getWriteList(),...OF].slice(0,10)));let o=0;for(;e.size<((n=ef.getOtherUrlsRequestLimitSize)!=null?n:50);){await ku(2e3);const i=r[o];if(!i)return;t.addRelayUrls(new Set().add(i)),o++}},0),RF(e,()=>{zs(Xu,[...e],Wx)},{deep:!0}),e}function MF(){const e=new Nx;Ia({relayEmiter:e});const t=new kF(e,{self:Gt({})});Ia({relayPool:t});const r=new Hf({preventCircularReferences:!0,relayEmiter:e});Ia({rootEventBeltline:r}),e.onEvent(({subId:n,event:i,url:s})=>{r.pushEvent(i,{subId:n})});const o=Gt(new AF);return r.relayConfigurator=o,Ia({relayConfigurator:o}),setTimeout(()=>{o.sync()}),{relayEmiter:e,relayPool:t,rootEventBeltline:r,relayConfigurator:o}}const Ux=eH({history:mM(),routes:[{path:"/login",name:"login",redirect:"/login/language",component:()=>Ze(()=>import("./LoginStepsView.845d66d6.js"),["./LoginStepsView.845d66d6.js","./LoginStepsView.e058e055.js","./Contact.a56396af.js","./getCacheStaff.283a43f7.js","./event.e2dea496.js","./autoAddRelayurlByEventIdStaff.73b12553.js","./user.a4fb9555.js","./channel.8f39afd5.js","./ContentBlacklistView.8c70f668.js","./Input.cc4eb912.js","./FollowChannel.2a5211f1.js","./get-slot.4ceacf82.js","./Checkmark.93029895.js"],import.meta.url),children:[{path:"/login/language",name:"language",alias:"/login-step-1",meta:{step:1},component:()=>Ze(()=>import("./LoginLanguageView.82f7bb8d.js"),["./LoginLanguageView.82f7bb8d.js","./ThemeButton.vue_vue_type_script_setup_true_lang.e34b8d0d.js","./Dropdown.fb4da711.js","./Icon.919891f2.js","./create.2deeaf6a.js","./create-ref-setter.fe4a2903.js","./LoginCard.vue_vue_type_script_setup_true_lang.6e39d75b.js","./use.9a2f80b1.js","./autoAddRelayurlByEventIdStaff.73b12553.js","./getCacheStaff.283a43f7.js","./Favicon.d50cbcc4.js","./Scrollbar.12236074.js","./Scrollbar.193872ed.js","./Scrollbar.f1879afa.css","./Space.b6c95bbe.js","./get-slot.4ceacf82.js"],import.meta.url)},{path:"/logon",name:"login-form",alias:"/login-step-2",meta:{step:2},component:()=>Ze(()=>import("./logonView.46624d23.js"),["./logonView.46624d23.js","./nostr.656ef4cd.js","./Input.cc4eb912.js","./use.9a2f80b1.js","./autoAddRelayurlByEventIdStaff.73b12553.js","./getCacheStaff.283a43f7.js","./LoginStepsView.e058e055.js","./Contact.a56396af.js","./event.e2dea496.js","./user.a4fb9555.js","./channel.8f39afd5.js","./ContentBlacklistView.8c70f668.js","./FollowChannel.2a5211f1.js","./UserMetadataEditing.vue_vue_type_script_setup_true_lang.c3ea86e1.js","./UploadButton.vue_vue_type_script_setup_true_lang.d95cad25.js","./CloudUpload.92ef62d3.js","./Icon.919891f2.js","./Tabs.f2f464ec.js","./LoginCard.vue_vue_type_script_setup_true_lang.6e39d75b.js","./Favicon.d50cbcc4.js","./Scrollbar.12236074.js","./Scrollbar.193872ed.js","./Scrollbar.f1879afa.css"],import.meta.url)},{path:"/relay/configuration",name:"relay-configuration",alias:"/login-step-3",meta:{step:3},component:()=>Ze(()=>import("./LoginRelaysView.b98d5132.js"),["./LoginRelaysView.b98d5132.js","./RelayConfig.vue_vue_type_script_setup_true_lang.a7941a72.js","./Scrollbar.193872ed.js","./Tooltip.vue_vue_type_script_setup_true_lang.0eb1f48d.js","./use-theme-vars.c1c11cee.js","./Close.92d57192.js","./Icon.919891f2.js","./RelayAddButton.vue_vue_type_script_setup_true_lang.8bc3537c.js","./use.9a2f80b1.js","./autoAddRelayurlByEventIdStaff.73b12553.js","./getCacheStaff.283a43f7.js","./AddButton.vue_vue_type_script_setup_true_lang.afbaf71a.js","./RelayInfoView.e65832c0.js","./Ellipsis.e5fc37f4.js","./Ellipsis.b57e5c64.css","./Empty.316516f4.js","./ListItem.e483f558.js","./RelayConnectListCard.vue_vue_type_script_setup_true_lang.1cd0d130.js","./RelayWritableButton.vue_vue_type_script_setup_true_lang.2d070553.js","./Input.cc4eb912.js","./Space.b6c95bbe.js","./get-slot.4ceacf82.js","./MdSearch.ac61994b.js","./composables.0dd76f13.js","./RelayConfig.5c39fc29.css","./Scrollbar.12236074.js","./Scrollbar.f1879afa.css","./Alert.b00417b1.js"],import.meta.url)},{path:"/login/complete",name:"login-complete",alias:"/login-step-4",meta:{step:4},component:()=>Ze(()=>import("./LoginCompleteView.5ca3a3ab.js"),["./LoginCompleteView.5ca3a3ab.js","./LoginCard.vue_vue_type_script_setup_true_lang.6e39d75b.js","./use.9a2f80b1.js","./autoAddRelayurlByEventIdStaff.73b12553.js","./getCacheStaff.283a43f7.js","./Favicon.d50cbcc4.js","./Scrollbar.12236074.js","./Icon.919891f2.js","./Scrollbar.193872ed.js","./Scrollbar.f1879afa.css","./Tooltip.vue_vue_type_script_setup_true_lang.0eb1f48d.js","./naiveUi.3b033277.js","./composables.0dd76f13.js","./Input.cc4eb912.js","./Checkbox.f4d92c20.js","./Alert.b00417b1.js","./Space.b6c95bbe.js","./get-slot.4ceacf82.js"],import.meta.url)}]},{path:"/",redirect:"/home",component:()=>Ze(()=>import("./LayoutView.876b30eb.js"),["./LayoutView.876b30eb.js","./Favicon.d50cbcc4.js","./CloudUpload.92ef62d3.js","./Icon.919891f2.js","./Empty.316516f4.js","./use.9a2f80b1.js","./autoAddRelayurlByEventIdStaff.73b12553.js","./getCacheStaff.283a43f7.js","./Ellipsis.e5fc37f4.js","./Ellipsis.b57e5c64.css","./MdSearch.ac61994b.js","./Input.cc4eb912.js","./Dropdown.fb4da711.js","./create.2deeaf6a.js","./create-ref-setter.fe4a2903.js","./naiveUi.3b033277.js","./composables.0dd76f13.js","./ThemeButton.vue_vue_type_script_setup_true_lang.e34b8d0d.js","./DrawerContent.4dbf8f07.js","./use-theme-vars.c1c11cee.js"],import.meta.url),children:[{path:"/home",component:()=>Ze(()=>import("./HomeView.b996f12e.js"),["./HomeView.b996f12e.js","./Content.167969e1.js","./getCacheStaff.283a43f7.js","./user.a4fb9555.js","./use.9a2f80b1.js","./autoAddRelayurlByEventIdStaff.73b12553.js","./event.e2dea496.js","./nostr.656ef4cd.js","./Tag.be4c6b01.js","./Icon.919891f2.js","./RelayAddButton.vue_vue_type_script_setup_true_lang.8bc3537c.js","./AddButton.vue_vue_type_script_setup_true_lang.afbaf71a.js","./RelayInfoView.e65832c0.js","./Ellipsis.e5fc37f4.js","./Ellipsis.b57e5c64.css","./use-theme-vars.c1c11cee.js","./Empty.316516f4.js","./ListItem.e483f558.js","./UserLink.vue_vue_type_script_setup_true_lang.c1cc397a.js","./DrawerContent.4dbf8f07.js","./ContentBlacklistView.8c70f668.js","./Input.cc4eb912.js","./Space.b6c95bbe.js","./get-slot.4ceacf82.js","./Scrollbar.12236074.js","./Scrollbar.193872ed.js","./Scrollbar.f1879afa.css","./naiveUi.3b033277.js","./composables.0dd76f13.js","./Popselect.8f632a4a.js","./create.2deeaf6a.js","./Checkmark.93029895.js","./create-ref-setter.fe4a2903.js","./Content.391a52b0.css","./RichTextEditBox.vue_vue_type_script_setup_true_lang.a2647517.js","./Result.ab067872.js","./Tabs.f2f464ec.js","./Close.92d57192.js","./UploadButton.vue_vue_type_script_setup_true_lang.d95cad25.js","./CloudUpload.92ef62d3.js","./Contact.a56396af.js","./channel.8f39afd5.js","./PostList.vue_vue_type_script_setup_true_lang.5af940c6.js","./PapawList.vue_vue_type_script_setup_true_lang.675ba8f6.js"],import.meta.url)},{path:"/relays",name:"relays",component:()=>Ze(()=>import("./RelaysView.69c330e6.js"),["./RelaysView.69c330e6.js","./RelayConfig.vue_vue_type_script_setup_true_lang.a7941a72.js","./Scrollbar.193872ed.js","./Tooltip.vue_vue_type_script_setup_true_lang.0eb1f48d.js","./use-theme-vars.c1c11cee.js","./Close.92d57192.js","./Icon.919891f2.js","./RelayAddButton.vue_vue_type_script_setup_true_lang.8bc3537c.js","./use.9a2f80b1.js","./autoAddRelayurlByEventIdStaff.73b12553.js","./getCacheStaff.283a43f7.js","./AddButton.vue_vue_type_script_setup_true_lang.afbaf71a.js","./RelayInfoView.e65832c0.js","./Ellipsis.e5fc37f4.js","./Ellipsis.b57e5c64.css","./Empty.316516f4.js","./ListItem.e483f558.js","./RelayConnectListCard.vue_vue_type_script_setup_true_lang.1cd0d130.js","./RelayWritableButton.vue_vue_type_script_setup_true_lang.2d070553.js","./Input.cc4eb912.js","./Space.b6c95bbe.js","./get-slot.4ceacf82.js","./MdSearch.ac61994b.js","./composables.0dd76f13.js","./RelayConfig.5c39fc29.css"],import.meta.url)},{path:"/channels",component:()=>Ze(()=>import("./ChannelsView.7c7bd719.js"),["./ChannelsView.7c7bd719.js","./FollowChannel.2a5211f1.js","./channel.8f39afd5.js","./getCacheStaff.283a43f7.js","./event.e2dea496.js","./autoAddRelayurlByEventIdStaff.73b12553.js","./user.a4fb9555.js","./ContentBlacklistView.8c70f668.js","./Input.cc4eb912.js","./Ellipsis.e5fc37f4.js","./Ellipsis.b57e5c64.css","./ListItem.e483f558.js"],import.meta.url)},{path:"/channel/message/:value",name:"channel-message",component:()=>Ze(()=>import("./ChannelMessageView.d8dfa69b.js"),["./ChannelMessageView.d8dfa69b.js","./channel.8f39afd5.js","./getCacheStaff.283a43f7.js","./event.e2dea496.js","./autoAddRelayurlByEventIdStaff.73b12553.js","./user.a4fb9555.js","./ContentBlacklistView.8c70f668.js","./Input.cc4eb912.js","./PapawList.vue_vue_type_script_setup_true_lang.675ba8f6.js","./use.9a2f80b1.js","./Content.167969e1.js","./nostr.656ef4cd.js","./Tag.be4c6b01.js","./Icon.919891f2.js","./RelayAddButton.vue_vue_type_script_setup_true_lang.8bc3537c.js","./AddButton.vue_vue_type_script_setup_true_lang.afbaf71a.js","./RelayInfoView.e65832c0.js","./Ellipsis.e5fc37f4.js","./Ellipsis.b57e5c64.css","./use-theme-vars.c1c11cee.js","./Empty.316516f4.js","./ListItem.e483f558.js","./UserLink.vue_vue_type_script_setup_true_lang.c1cc397a.js","./DrawerContent.4dbf8f07.js","./Space.b6c95bbe.js","./get-slot.4ceacf82.js","./Scrollbar.12236074.js","./Scrollbar.193872ed.js","./Scrollbar.f1879afa.css","./naiveUi.3b033277.js","./composables.0dd76f13.js","./Popselect.8f632a4a.js","./create.2deeaf6a.js","./Checkmark.93029895.js","./create-ref-setter.fe4a2903.js","./Content.391a52b0.css","./FollowChannel.2a5211f1.js","./RichTextEditBox.vue_vue_type_script_setup_true_lang.a2647517.js","./Result.ab067872.js","./Tabs.f2f464ec.js","./Close.92d57192.js","./UploadButton.vue_vue_type_script_setup_true_lang.d95cad25.js","./CloudUpload.92ef62d3.js","./PageHeader.15a93e5a.js"],import.meta.url)},{path:"/profile/:value",name:"profile",component:()=>Ze(()=>import("./ProfileView.c016d5ab.js"),["./ProfileView.c016d5ab.js","./Contact.a56396af.js","./getCacheStaff.283a43f7.js","./event.e2dea496.js","./autoAddRelayurlByEventIdStaff.73b12553.js","./user.a4fb9555.js","./channel.8f39afd5.js","./ContentBlacklistView.8c70f668.js","./Input.cc4eb912.js","./Content.167969e1.js","./use.9a2f80b1.js","./nostr.656ef4cd.js","./Tag.be4c6b01.js","./Icon.919891f2.js","./RelayAddButton.vue_vue_type_script_setup_true_lang.8bc3537c.js","./AddButton.vue_vue_type_script_setup_true_lang.afbaf71a.js","./RelayInfoView.e65832c0.js","./Ellipsis.e5fc37f4.js","./Ellipsis.b57e5c64.css","./use-theme-vars.c1c11cee.js","./Empty.316516f4.js","./ListItem.e483f558.js","./UserLink.vue_vue_type_script_setup_true_lang.c1cc397a.js","./DrawerContent.4dbf8f07.js","./Space.b6c95bbe.js","./get-slot.4ceacf82.js","./Scrollbar.12236074.js","./Scrollbar.193872ed.js","./Scrollbar.f1879afa.css","./naiveUi.3b033277.js","./composables.0dd76f13.js","./Popselect.8f632a4a.js","./create.2deeaf6a.js","./Checkmark.93029895.js","./create-ref-setter.fe4a2903.js","./Content.391a52b0.css","./PostList.vue_vue_type_script_setup_true_lang.5af940c6.js","./PapawList.vue_vue_type_script_setup_true_lang.675ba8f6.js","./RelayWritableButton.vue_vue_type_script_setup_true_lang.2d070553.js","./Tabs.f2f464ec.js","./UserMetadataEditing.vue_vue_type_script_setup_true_lang.c3ea86e1.js","./UploadButton.vue_vue_type_script_setup_true_lang.d95cad25.js","./CloudUpload.92ef62d3.js","./Dropdown.fb4da711.js","./ProfileView.db26d6b4.css"],import.meta.url)},{path:"/profile",component:()=>Ze(()=>import("./ProfileView.c016d5ab.js"),["./ProfileView.c016d5ab.js","./Contact.a56396af.js","./getCacheStaff.283a43f7.js","./event.e2dea496.js","./autoAddRelayurlByEventIdStaff.73b12553.js","./user.a4fb9555.js","./channel.8f39afd5.js","./ContentBlacklistView.8c70f668.js","./Input.cc4eb912.js","./Content.167969e1.js","./use.9a2f80b1.js","./nostr.656ef4cd.js","./Tag.be4c6b01.js","./Icon.919891f2.js","./RelayAddButton.vue_vue_type_script_setup_true_lang.8bc3537c.js","./AddButton.vue_vue_type_script_setup_true_lang.afbaf71a.js","./RelayInfoView.e65832c0.js","./Ellipsis.e5fc37f4.js","./Ellipsis.b57e5c64.css","./use-theme-vars.c1c11cee.js","./Empty.316516f4.js","./ListItem.e483f558.js","./UserLink.vue_vue_type_script_setup_true_lang.c1cc397a.js","./DrawerContent.4dbf8f07.js","./Space.b6c95bbe.js","./get-slot.4ceacf82.js","./Scrollbar.12236074.js","./Scrollbar.193872ed.js","./Scrollbar.f1879afa.css","./naiveUi.3b033277.js","./composables.0dd76f13.js","./Popselect.8f632a4a.js","./create.2deeaf6a.js","./Checkmark.93029895.js","./create-ref-setter.fe4a2903.js","./Content.391a52b0.css","./PostList.vue_vue_type_script_setup_true_lang.5af940c6.js","./PapawList.vue_vue_type_script_setup_true_lang.675ba8f6.js","./RelayWritableButton.vue_vue_type_script_setup_true_lang.2d070553.js","./Tabs.f2f464ec.js","./UserMetadataEditing.vue_vue_type_script_setup_true_lang.c3ea86e1.js","./UploadButton.vue_vue_type_script_setup_true_lang.d95cad25.js","./CloudUpload.92ef62d3.js","./Dropdown.fb4da711.js","./ProfileView.db26d6b4.css"],import.meta.url)},{path:"/task",component:()=>Ze(()=>import("./TaskView.23a8adab.js"),["./TaskView.23a8adab.js","./Space.b6c95bbe.js","./get-slot.4ceacf82.js"],import.meta.url)},{path:"/settings",component:()=>Ze(()=>import("./SettingsView.73f40981.js"),["./SettingsView.73f40981.js","./Thing.d82451c6.js","./composables.0dd76f13.js","./Icon.919891f2.js","./ListItem.e483f558.js"],import.meta.url)},{path:"/about",component:()=>Ze(()=>import("./AboutView.8665dd4f.js"),["./AboutView.8665dd4f.js","./Favicon.d50cbcc4.js","./Icon.919891f2.js"],import.meta.url)},{path:"/content/blacklist",name:"content-blacklist-view",component:()=>Ze(()=>import("./ContentBlacklistView.a914fe9a.js"),["./ContentBlacklistView.a914fe9a.js","./ContentBlacklistView.8c70f668.js","./Input.cc4eb912.js","./Checkbox.f4d92c20.js","./get-slot.4ceacf82.js","./Dropdown.fb4da711.js","./Icon.919891f2.js","./create.2deeaf6a.js","./create-ref-setter.fe4a2903.js","./Tag.be4c6b01.js","./Empty.316516f4.js","./Popselect.8f632a4a.js","./Checkmark.93029895.js"],import.meta.url)},{path:"/to-back",name:"to-back",component:()=>Ze(()=>import("./ToBackView.13849a24.js"),["./ToBackView.13849a24.js","./PageHeader.15a93e5a.js"],import.meta.url),children:[{path:"/notice",name:"notice",component:()=>Ze(()=>import("./NoticeView.fc6d90d4.js"),["./NoticeView.fc6d90d4.js","./PostList.vue_vue_type_script_setup_true_lang.5af940c6.js","./event.e2dea496.js","./getCacheStaff.283a43f7.js","./autoAddRelayurlByEventIdStaff.73b12553.js","./PapawList.vue_vue_type_script_setup_true_lang.675ba8f6.js","./use.9a2f80b1.js","./Content.167969e1.js","./user.a4fb9555.js","./nostr.656ef4cd.js","./Tag.be4c6b01.js","./Icon.919891f2.js","./RelayAddButton.vue_vue_type_script_setup_true_lang.8bc3537c.js","./AddButton.vue_vue_type_script_setup_true_lang.afbaf71a.js","./RelayInfoView.e65832c0.js","./Ellipsis.e5fc37f4.js","./Ellipsis.b57e5c64.css","./use-theme-vars.c1c11cee.js","./Empty.316516f4.js","./ListItem.e483f558.js","./UserLink.vue_vue_type_script_setup_true_lang.c1cc397a.js","./DrawerContent.4dbf8f07.js","./ContentBlacklistView.8c70f668.js","./Input.cc4eb912.js","./Space.b6c95bbe.js","./get-slot.4ceacf82.js","./Scrollbar.12236074.js","./Scrollbar.193872ed.js","./Scrollbar.f1879afa.css","./naiveUi.3b033277.js","./composables.0dd76f13.js","./Popselect.8f632a4a.js","./create.2deeaf6a.js","./Checkmark.93029895.js","./create-ref-setter.fe4a2903.js","./Content.391a52b0.css"],import.meta.url)},{path:"/search/:value?",name:"search",component:()=>Ze(()=>import("./SearchView.3f1971d0.js"),["./SearchView.3f1971d0.js","./event.e2dea496.js","./getCacheStaff.283a43f7.js","./autoAddRelayurlByEventIdStaff.73b12553.js","./user.a4fb9555.js","./Content.167969e1.js","./use.9a2f80b1.js","./nostr.656ef4cd.js","./Tag.be4c6b01.js","./Icon.919891f2.js","./RelayAddButton.vue_vue_type_script_setup_true_lang.8bc3537c.js","./AddButton.vue_vue_type_script_setup_true_lang.afbaf71a.js","./RelayInfoView.e65832c0.js","./Ellipsis.e5fc37f4.js","./Ellipsis.b57e5c64.css","./use-theme-vars.c1c11cee.js","./Empty.316516f4.js","./ListItem.e483f558.js","./UserLink.vue_vue_type_script_setup_true_lang.c1cc397a.js","./DrawerContent.4dbf8f07.js","./ContentBlacklistView.8c70f668.js","./Input.cc4eb912.js","./Space.b6c95bbe.js","./get-slot.4ceacf82.js","./Scrollbar.12236074.js","./Scrollbar.193872ed.js","./Scrollbar.f1879afa.css","./naiveUi.3b033277.js","./composables.0dd76f13.js","./Popselect.8f632a4a.js","./create.2deeaf6a.js","./Checkmark.93029895.js","./create-ref-setter.fe4a2903.js","./Content.391a52b0.css"],import.meta.url)},{path:"/short/text/note/:value",name:"short-text-note",component:()=>Ze(()=>import("./ShortTextNoteView.75e87ea4.js"),["./ShortTextNoteView.75e87ea4.js","./Content.167969e1.js","./getCacheStaff.283a43f7.js","./user.a4fb9555.js","./use.9a2f80b1.js","./autoAddRelayurlByEventIdStaff.73b12553.js","./event.e2dea496.js","./nostr.656ef4cd.js","./Tag.be4c6b01.js","./Icon.919891f2.js","./RelayAddButton.vue_vue_type_script_setup_true_lang.8bc3537c.js","./AddButton.vue_vue_type_script_setup_true_lang.afbaf71a.js","./RelayInfoView.e65832c0.js","./Ellipsis.e5fc37f4.js","./Ellipsis.b57e5c64.css","./use-theme-vars.c1c11cee.js","./Empty.316516f4.js","./ListItem.e483f558.js","./UserLink.vue_vue_type_script_setup_true_lang.c1cc397a.js","./DrawerContent.4dbf8f07.js","./ContentBlacklistView.8c70f668.js","./Input.cc4eb912.js","./Space.b6c95bbe.js","./get-slot.4ceacf82.js","./Scrollbar.12236074.js","./Scrollbar.193872ed.js","./Scrollbar.f1879afa.css","./naiveUi.3b033277.js","./composables.0dd76f13.js","./Popselect.8f632a4a.js","./create.2deeaf6a.js","./Checkmark.93029895.js","./create-ref-setter.fe4a2903.js","./Content.391a52b0.css","./PapawList.vue_vue_type_script_setup_true_lang.675ba8f6.js","./PostList.vue_vue_type_script_setup_true_lang.5af940c6.js","./RichTextEditBox.vue_vue_type_script_setup_true_lang.a2647517.js","./Result.ab067872.js","./Tabs.f2f464ec.js","./Close.92d57192.js","./UploadButton.vue_vue_type_script_setup_true_lang.d95cad25.js","./CloudUpload.92ef62d3.js"],import.meta.url)},{path:"/channel/create",name:"create-channel",component:()=>Ze(()=>import("./CreateChannelView.6ea1653a.js"),["./CreateChannelView.6ea1653a.js","./FollowChannel.2a5211f1.js","./channel.8f39afd5.js","./getCacheStaff.283a43f7.js","./event.e2dea496.js","./autoAddRelayurlByEventIdStaff.73b12553.js","./user.a4fb9555.js","./ContentBlacklistView.8c70f668.js","./Input.cc4eb912.js","./use.9a2f80b1.js","./ChannelMetadataEdit.vue_vue_type_script_setup_true_lang.99377c04.js","./UploadButton.vue_vue_type_script_setup_true_lang.d95cad25.js","./CloudUpload.92ef62d3.js","./Icon.919891f2.js","./Space.b6c95bbe.js","./get-slot.4ceacf82.js"],import.meta.url)},{path:"/channel/edit/:value",name:"edit-channel",component:()=>Ze(()=>import("./EditChannelView.b5502c81.js"),["./EditChannelView.b5502c81.js","./channel.8f39afd5.js","./getCacheStaff.283a43f7.js","./event.e2dea496.js","./autoAddRelayurlByEventIdStaff.73b12553.js","./user.a4fb9555.js","./ContentBlacklistView.8c70f668.js","./Input.cc4eb912.js","./ChannelMetadataEdit.vue_vue_type_script_setup_true_lang.99377c04.js","./UploadButton.vue_vue_type_script_setup_true_lang.d95cad25.js","./CloudUpload.92ef62d3.js","./Icon.919891f2.js","./Space.b6c95bbe.js","./get-slot.4ceacf82.js","./FollowChannel.2a5211f1.js","./nostr.656ef4cd.js","./use.9a2f80b1.js"],import.meta.url)},{path:"/move/house",name:"move-house",component:()=>Ze(()=>import("./MoveHouseView.97e229fa.js"),["./MoveHouseView.97e229fa.js","./AddButton.vue_vue_type_script_setup_true_lang.afbaf71a.js","./RelayInfoView.e65832c0.js","./Ellipsis.e5fc37f4.js","./Ellipsis.b57e5c64.css","./use.9a2f80b1.js","./autoAddRelayurlByEventIdStaff.73b12553.js","./getCacheStaff.283a43f7.js","./Icon.919891f2.js","./use-theme-vars.c1c11cee.js","./Empty.316516f4.js","./ListItem.e483f558.js","./UserLink.vue_vue_type_script_setup_true_lang.c1cc397a.js","./DrawerContent.4dbf8f07.js","./user.a4fb9555.js","./nostr.656ef4cd.js","./Scrollbar.12236074.js","./Scrollbar.193872ed.js","./Scrollbar.f1879afa.css","./Input.cc4eb912.js","./Thing.d82451c6.js","./RelayConnectListCard.vue_vue_type_script_setup_true_lang.1cd0d130.js","./Checkbox.f4d92c20.js","./Space.b6c95bbe.js","./get-slot.4ceacf82.js"],import.meta.url)}]}]},{path:"/to-back-1",name:"to-back-1",component:()=>Ze(()=>import("./ToBackView.13849a24.js"),["./ToBackView.13849a24.js","./PageHeader.15a93e5a.js"],import.meta.url),children:[{path:"/relay/info/:url",name:"relay-info",component:()=>Ze(()=>import("./RelayInfoView.ccc6001e.js"),["./RelayInfoView.ccc6001e.js","./user.a4fb9555.js","./getCacheStaff.283a43f7.js","./nostr.656ef4cd.js","./RelayInfoView.e65832c0.js","./Checkbox.f4d92c20.js","./create.2deeaf6a.js","./Tag.be4c6b01.js","./Empty.316516f4.js","./composables.0dd76f13.js","./Space.b6c95bbe.js","./get-slot.4ceacf82.js","./Result.ab067872.js"],import.meta.url)}]}]});Ux.beforeEach((e,t,r)=>{const o=localStorage.getItem("newUserFlag"),n=localStorage.getItem("prikey");e.path.startsWith("/login")||["relay-info","login"].some(i=>e.name===i)?r():o&&o===n?r({name:"login",query:{redirected:e.fullPath}}):r()});try{window.nostrApi=MF()}catch{}const Df=w2(lH);Df.use(Ux);Df.use(mf);Df.mount("#app");export{Fx as $,Or as A,hw as B,hr as C,di as D,X4 as E,zF as F,qF as G,ct as H,VF as I,WF as J,iw as K,Qe as L,fw as M,Kl as N,ND as O,I9 as P,T9 as Q,rH as R,Gt as S,ys as T,Di as U,M9 as V,A9 as W,Ho as X,yF as Y,B9 as Z,qn as _,re as a,Xv as a$,sy as a0,of as a1,P9 as a2,pF as a3,jB as a4,_F as a5,L9 as a6,Mr as a7,fF as a8,oi as a9,K4 as aA,_0 as aB,j0 as aC,io as aD,Lt as aE,gr as aF,Er as aG,u0 as aH,Hb as aI,qh as aJ,zt as aK,mt as aL,Y4 as aM,tt as aN,md as aO,ss as aP,ms as aQ,$9 as aR,mf as aS,Lu as aT,W1 as aU,u9 as aV,c9 as aW,Sl as aX,$i as aY,lL as aZ,In as a_,jx as aa,ku as ab,hl as ac,zs as ad,LB as ae,iy as af,y9 as ag,ef as ah,eg as ai,p9 as aj,w9 as ak,b9 as al,Hn as am,Re as an,NB as ao,K as ap,G1 as aq,BB as ar,Xt as as,Vl as at,Be as au,Ib as av,et as aw,t9 as ax,yr as ay,cP as az,N as b,FP as b$,JF as b0,YF as b1,C0 as b2,Vo as b3,xt as b4,oo as b5,_d as b6,xS as b7,CS as b8,zS as b9,Dl as bA,G5 as bB,qo as bC,_n as bD,tp as bE,yt as bF,Hx as bG,CF as bH,T7 as bI,uc as bJ,wF as bK,Vs as bL,IS as bM,xa as bN,Ld as bO,Ko as bP,jr as bQ,q4 as bR,Gl as bS,Cd as bT,pR as bU,hS as bV,sS as bW,Fr as bX,$s as bY,f2 as bZ,_r as b_,qt as ba,Ml as bb,er as bc,Ls as bd,B6 as be,_6 as bf,Sd as bg,Ed as bh,zb as bi,Vd as bj,hi as bk,j6 as bl,jb as bm,pd as bn,zm as bo,Fm as bp,Hr as bq,TO as br,Cy as bs,KF as bt,d9 as bu,FF as bv,l9 as bw,s8 as bx,Qr as by,pk as bz,W as c,f9 as c$,_9 as c0,F1 as c1,mA as c2,dB as c3,XF as c4,n8 as c5,Tu as c6,eP as c7,ql as c8,Gs as c9,C9 as cA,E9 as cB,aA as cC,XB as cD,Ws as cE,k9 as cF,XM as cG,wA as cH,aB as cI,UO as cJ,i9 as cK,mu as cL,cE as cM,N0 as cN,Ri as cO,q8 as cP,uE as cQ,Fl as cR,Td as cS,oS as cT,PL as cU,W8 as cV,HB as cW,fC as cX,hC as cY,a9 as cZ,S9 as c_,Ys as ca,gi as cb,Xs as cc,UF as cd,DF as ce,Bw as cf,GF as cg,g9 as ch,v9 as ci,Wo as cj,ie as ck,Hs as cl,UI as cm,ZF as cn,uo as co,v0 as cp,eS as cq,Yk as cr,NF as cs,jF as ct,P8 as cu,m9 as cv,Ai as cw,Gk as cx,dE as cy,gI as cz,oe as d,x9 as d0,lO as d1,h9 as d2,fI as d3,pi as d4,Ze as d5,R9 as d6,s9 as d7,BI as d8,Kh as d9,o9 as dA,Cv as dB,_v as dC,Pv as dD,Bs as dE,QF as dF,e8 as dG,O9 as dH,vO as dI,KB as dJ,S1 as dK,n9 as da,Zs as db,mS as dc,mv as dd,c0 as de,Vb as df,Sh as dg,Ux as dh,yI as di,Jb as dj,Rc as dk,vP as dl,H8 as dm,cR as dn,aw as dp,jI as dq,sR as dr,fu as ds,mB as dt,bB as du,vR as dv,Nd as dw,Ch as dx,vv as dy,Ps as dz,Cn as e,be as f,qs as g,Xe as h,Ms as i,E as j,cu as k,e9 as l,Se as m,q as n,Ce as o,qe as p,br as q,or as r,QI as s,kn as t,kt as u,tr as v,du as w,dt as x,vn as y,yn as z};
