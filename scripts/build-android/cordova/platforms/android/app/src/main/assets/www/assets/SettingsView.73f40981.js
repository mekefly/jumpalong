import{ap as F,dp as bt,b as X,c as a,a as m,d as s,bi as Ne,cp as gt,cq as mt,f as Fe,u as Ke,h as we,dq as pt,aC as We,n as V,au as Xe,aB as Ye,aw as He,aK as $e,b4 as wt,q as De,cO as xt,d4 as Me,j as d,b7 as yt,b8 as _t,w as kt,b9 as Ct,ba as Rt,aL as me,aN as pe,r as se,i as Ae,e as Ee,dr as zt,o as Y,cn as Te,b1 as E,ds as Be,v as q,N as St,av as Vt,bs as $t,y as qe,I as Tt,aP as Bt,br as Dt,z as Mt,A as _,H as v,C as w,D as Ue,F as je,O as g,dt as Ft,du as Pt,ah as U}from"./index.de60ca02.js";import{_ as It}from"./Thing.d82451c6.js";import{u as Nt}from"./composables.0dd76f13.js";import{N as Ht}from"./Icon.919891f2.js";import{a as At,_ as Et}from"./ListItem.e483f558.js";function Le(t){return window.TouchEvent&&t instanceof window.TouchEvent}function Oe(){const t=F(new Map),l=$=>C=>{t.value.set($,C)};return bt(()=>t.value.clear()),[t,l]}const Ut=X([a("slider",`
 display: block;
 padding: calc((var(--n-handle-size) - var(--n-rail-height)) / 2) 0;
 position: relative;
 z-index: 0;
 width: 100%;
 cursor: pointer;
 user-select: none;
 -webkit-user-select: none;
 `,[m("reverse",[a("slider-handles",[a("slider-handle-wrapper",`
 transform: translate(50%, -50%);
 `)]),a("slider-dots",[a("slider-dot",`
 transform: translateX(50%, -50%);
 `)]),m("vertical",[a("slider-handles",[a("slider-handle-wrapper",`
 transform: translate(-50%, -50%);
 `)]),a("slider-marks",[a("slider-mark",`
 transform: translateY(calc(-50% + var(--n-dot-height) / 2));
 `)]),a("slider-dots",[a("slider-dot",`
 transform: translateX(-50%) translateY(0);
 `)])])]),m("vertical",`
 padding: 0 calc((var(--n-handle-size) - var(--n-rail-height)) / 2);
 width: var(--n-rail-width-vertical);
 height: 100%;
 `,[a("slider-handles",`
 top: calc(var(--n-handle-size) / 2);
 right: 0;
 bottom: calc(var(--n-handle-size) / 2);
 left: 0;
 `,[a("slider-handle-wrapper",`
 top: unset;
 left: 50%;
 transform: translate(-50%, 50%);
 `)]),a("slider-rail",`
 height: 100%;
 `,[s("fill",`
 top: unset;
 right: 0;
 bottom: unset;
 left: 0;
 `)]),m("with-mark",`
 width: var(--n-rail-width-vertical);
 margin: 0 32px 0 8px;
 `),a("slider-marks",`
 top: calc(var(--n-handle-size) / 2);
 right: unset;
 bottom: calc(var(--n-handle-size) / 2);
 left: 22px;
 font-size: var(--n-mark-font-size);
 `,[a("slider-mark",`
 transform: translateY(50%);
 white-space: nowrap;
 `)]),a("slider-dots",`
 top: calc(var(--n-handle-size) / 2);
 right: unset;
 bottom: calc(var(--n-handle-size) / 2);
 left: 50%;
 `,[a("slider-dot",`
 transform: translateX(-50%) translateY(50%);
 `)])]),m("disabled",`
 cursor: not-allowed;
 opacity: var(--n-opacity-disabled);
 `,[a("slider-handle",`
 cursor: not-allowed;
 `)]),m("with-mark",`
 width: 100%;
 margin: 8px 0 32px 0;
 `),X("&:hover",[a("slider-rail",{backgroundColor:"var(--n-rail-color-hover)"},[s("fill",{backgroundColor:"var(--n-fill-color-hover)"})]),a("slider-handle",{boxShadow:"var(--n-handle-box-shadow-hover)"})]),m("active",[a("slider-rail",{backgroundColor:"var(--n-rail-color-hover)"},[s("fill",{backgroundColor:"var(--n-fill-color-hover)"})]),a("slider-handle",{boxShadow:"var(--n-handle-box-shadow-hover)"})]),a("slider-marks",`
 position: absolute;
 top: 18px;
 left: calc(var(--n-handle-size) / 2);
 right: calc(var(--n-handle-size) / 2);
 `,[a("slider-mark",`
 position: absolute;
 transform: translateX(-50%);
 white-space: nowrap;
 `)]),a("slider-rail",`
 width: 100%;
 position: relative;
 height: var(--n-rail-height);
 background-color: var(--n-rail-color);
 transition: background-color .3s var(--n-bezier);
 border-radius: calc(var(--n-rail-height) / 2);
 `,[s("fill",`
 position: absolute;
 top: 0;
 bottom: 0;
 border-radius: calc(var(--n-rail-height) / 2);
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-fill-color);
 `)]),a("slider-handles",`
 position: absolute;
 top: 0;
 right: calc(var(--n-handle-size) / 2);
 bottom: 0;
 left: calc(var(--n-handle-size) / 2);
 `,[a("slider-handle-wrapper",`
 outline: none;
 position: absolute;
 top: 50%;
 transform: translate(-50%, -50%);
 cursor: pointer;
 display: flex;
 `,[a("slider-handle",`
 height: var(--n-handle-size);
 width: var(--n-handle-size);
 border-radius: 50%;
 overflow: hidden;
 transition: box-shadow .2s var(--n-bezier), background-color .3s var(--n-bezier);
 background-color: var(--n-handle-color);
 box-shadow: var(--n-handle-box-shadow);
 `,[X("&:hover",`
 box-shadow: var(--n-handle-box-shadow-hover);
 `)]),X("&:focus",[a("slider-handle",`
 box-shadow: var(--n-handle-box-shadow-focus);
 `,[X("&:hover",`
 box-shadow: var(--n-handle-box-shadow-active);
 `)])])])]),a("slider-dots",`
 position: absolute;
 top: 50%;
 left: calc(var(--n-handle-size) / 2);
 right: calc(var(--n-handle-size) / 2);
 `,[m("transition-disabled",[a("slider-dot","transition: none;")]),a("slider-dot",`
 transition:
 border-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 position: absolute;
 transform: translate(-50%, -50%);
 height: var(--n-dot-height);
 width: var(--n-dot-width);
 border-radius: var(--n-dot-border-radius);
 overflow: hidden;
 box-sizing: border-box;
 border: var(--n-dot-border);
 background-color: var(--n-dot-color);
 `,[m("active","border: var(--n-dot-border-active);")])])]),a("slider-handle-indicator",`
 font-size: var(--n-font-size);
 padding: 6px 10px;
 border-radius: var(--n-indicator-border-radius);
 color: var(--n-indicator-text-color);
 background-color: var(--n-indicator-color);
 box-shadow: var(--n-indicator-box-shadow);
 `,[Ne()]),a("slider-handle-indicator",`
 font-size: var(--n-font-size);
 padding: 6px 10px;
 border-radius: var(--n-indicator-border-radius);
 color: var(--n-indicator-text-color);
 background-color: var(--n-indicator-color);
 box-shadow: var(--n-indicator-box-shadow);
 `,[m("top",`
 margin-bottom: 12px;
 `),m("right",`
 margin-left: 12px;
 `),m("bottom",`
 margin-top: 12px;
 `),m("left",`
 margin-right: 12px;
 `),Ne()]),gt(a("slider",[a("slider-dot","background-color: var(--n-dot-color-modal);")])),mt(a("slider",[a("slider-dot","background-color: var(--n-dot-color-popover);")]))]),jt=0,Lt=Object.assign(Object.assign({},we.props),{to:Me.propTo,defaultValue:{type:[Number,Array],default:0},marks:Object,disabled:{type:Boolean,default:void 0},formatTooltip:Function,keyboard:{type:Boolean,default:!0},min:{type:Number,default:0},max:{type:Number,default:100},step:{type:[Number,String],default:1},range:Boolean,value:[Number,Array],placement:String,showTooltip:{type:Boolean,default:void 0},tooltip:{type:Boolean,default:!0},vertical:Boolean,reverse:Boolean,"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array]}),Ot=Fe({name:"Slider",props:Lt,setup(t){const{mergedClsPrefixRef:l,namespaceRef:$,inlineThemeDisabled:C}=Ke(t),u=we("Slider","-slider",Ut,pt,t,l),b=F(null),[h,p]=Oe(),[j,x]=Oe(),P=F(new Set),I=We(t),{mergedDisabledRef:f}=I,y=V(()=>{const{step:e}=t;if(e<=0||e==="mark")return 0;const n=e.toString();let o=0;return n.includes(".")&&(o=n.length-n.indexOf(".")-1),o}),D=F(t.defaultValue),xe=Xe(t,"value"),te=Ye(xe,D),T=V(()=>{const{value:e}=te;return(t.range?e:[e]).map(O)}),de=V(()=>T.value.length>2),ye=V(()=>t.placement===void 0?t.vertical?"right":"top":t.placement),ce=V(()=>{const{marks:e}=t;return e?Object.keys(e).map(parseFloat):null}),B=F(-1),ne=F(-1),S=F(-1),r=F(!1),A=F(!1),L=V(()=>{const{vertical:e,reverse:n}=t;return e?n?"top":"bottom":n?"right":"left"}),G=V(()=>{if(de.value)return;const e=T.value,n=J(t.range?Math.min(...e):t.min),o=J(t.range?Math.max(...e):e[0]),{value:i}=L;return t.vertical?{[i]:`${n}%`,height:`${o-n}%`}:{[i]:`${n}%`,width:`${o-n}%`}}),oe=V(()=>{const e=[],{marks:n}=t;if(n){const o=T.value.slice();o.sort((R,z)=>R-z);const{value:i}=L,{value:c}=de,{range:k}=t,H=c?()=>!1:R=>k?R>=o[0]&&R<=o[o.length-1]:R<=o[0];for(const R of Object.keys(n)){const z=Number(R);e.push({active:H(z),label:n[R],style:{[i]:`${J(z)}%`}})}}return e});function ae(e,n){const o=J(e),{value:i}=L;return{[i]:`${o}%`,zIndex:n===B.value?1:0}}function ue(e){return t.showTooltip||S.value===e||B.value===e&&r.value}function _e(e){return r.value?!(B.value===e&&ne.value===e):!0}function ke(e){var n;~e&&(B.value=e,(n=h.value.get(e))===null||n===void 0||n.focus())}function Ce(){j.value.forEach((e,n)=>{ue(n)&&e.syncPosition()})}function N(e){const{"onUpdate:value":n,onUpdateValue:o}=t,{nTriggerFormInput:i,nTriggerFormChange:c}=I;o&&se(o,e),n&&se(n,e),D.value=e,i(),c()}function he(e){const{range:n}=t;if(n){if(Array.isArray(e)){const{value:o}=T;e.join()!==o.join()&&N(e)}}else Array.isArray(e)||T.value[0]!==e&&N(e)}function ie(e,n){if(t.range){const o=T.value.slice();o.splice(n,1,e),he(o)}else he(e)}function M(e,n,o){const i=o!==void 0;o||(o=e-n>0?1:-1);const c=ce.value||[],{step:k}=t;if(k==="mark"){const z=K(e,c.concat(n),i?o:void 0);return z?z.value:n}if(k<=0)return n;const{value:H}=y;let R;if(i){const z=Number((n/k).toFixed(H)),W=Math.floor(z),Se=z>W?W:W-1,Ve=z<W?W:W+1;R=K(n,[Number((Se*k).toFixed(H)),Number((Ve*k).toFixed(H)),...c],o)}else{const z=ze(e);R=K(e,[...c,z])}return R?O(R.value):n}function O(e){return Math.min(t.max,Math.max(t.min,e))}function J(e){const{max:n,min:o}=t;return(e-o)/(n-o)*100}function Re(e){const{max:n,min:o}=t;return o+(n-o)*e}function ze(e){const{step:n,min:o}=t;if(n<=0||n==="mark")return e;const i=Math.round((e-o)/n)*n+o;return Number(i.toFixed(y.value))}function K(e,n=ce.value,o){if(!(n!=null&&n.length))return null;let i=null,c=-1;for(;++c<n.length;){const k=n[c]-e,H=Math.abs(k);(o===void 0||k*o>0)&&(i===null||H<i.distance)&&(i={index:c,distance:H,value:n[c]})}return i}function Q(e){const n=b.value;if(!n)return;const o=Le(e)?e.touches[0]:e,i=n.getBoundingClientRect();let c;return t.vertical?c=(i.bottom-o.clientY)/i.height:c=(o.clientX-i.left)/i.width,t.reverse&&(c=1-c),Re(c)}function le(e){if(f.value||!t.keyboard)return;const{vertical:n,reverse:o}=t;switch(e.key){case"ArrowUp":e.preventDefault(),fe(n&&o?-1:1);break;case"ArrowRight":e.preventDefault(),fe(!n&&o?-1:1);break;case"ArrowDown":e.preventDefault(),fe(n&&o?1:-1);break;case"ArrowLeft":e.preventDefault(),fe(!n&&o?1:-1);break}}function fe(e){const n=B.value;if(n===-1)return;const{step:o}=t,i=T.value[n],c=o<=0||o==="mark"?i:i+o*e;ie(M(c,i,e>0?1:-1),n)}function Ge(e){var n,o;if(f.value||!Le(e)&&e.button!==jt)return;const i=Q(e);if(i===void 0)return;const c=T.value.slice(),k=t.range?(o=(n=K(i,c))===null||n===void 0?void 0:n.index)!==null&&o!==void 0?o:-1:0;k!==-1&&(e.preventDefault(),ke(k),Je(),ie(M(i,T.value[k]),k))}function Je(){r.value||(r.value=!0,me("touchend",document,ge),me("mouseup",document,ge),me("touchmove",document,be),me("mousemove",document,be))}function ve(){r.value&&(r.value=!1,pe("touchend",document,ge),pe("mouseup",document,ge),pe("touchmove",document,be),pe("mousemove",document,be))}function be(e){const{value:n}=B;if(!r.value||n===-1){ve();return}const o=Q(e);ie(M(o,T.value[n]),n)}function ge(){ve()}function Qe(e){B.value=e,f.value||(S.value=e)}function Ze(e){B.value===e&&(B.value=-1,ve()),S.value===e&&(S.value=-1)}function et(e){S.value=e}function tt(e){S.value===e&&(S.value=-1)}He(B,(e,n)=>void $e(()=>ne.value=n)),He(te,()=>{if(t.marks){if(A.value)return;A.value=!0,$e(()=>{A.value=!1})}$e(Ce)}),wt(()=>{ve()});const Pe=V(()=>{const{self:{markFontSize:e,railColor:n,railColorHover:o,fillColor:i,fillColorHover:c,handleColor:k,opacityDisabled:H,dotColor:R,dotColorModal:z,handleBoxShadow:W,handleBoxShadowHover:Se,handleBoxShadowActive:Ve,handleBoxShadowFocus:nt,dotBorder:ot,dotBoxShadow:at,railHeight:it,railWidthVertical:lt,handleSize:rt,dotHeight:st,dotWidth:dt,dotBorderRadius:ct,fontSize:ut,dotBorderActive:ht,dotColorPopover:ft},common:{cubicBezierEaseInOut:vt}}=u.value;return{"--n-bezier":vt,"--n-dot-border":ot,"--n-dot-border-active":ht,"--n-dot-border-radius":ct,"--n-dot-box-shadow":at,"--n-dot-color":R,"--n-dot-color-modal":z,"--n-dot-color-popover":ft,"--n-dot-height":st,"--n-dot-width":dt,"--n-fill-color":i,"--n-fill-color-hover":c,"--n-font-size":ut,"--n-handle-box-shadow":W,"--n-handle-box-shadow-active":Ve,"--n-handle-box-shadow-focus":nt,"--n-handle-box-shadow-hover":Se,"--n-handle-color":k,"--n-handle-size":rt,"--n-opacity-disabled":H,"--n-rail-color":n,"--n-rail-color-hover":o,"--n-rail-height":it,"--n-rail-width-vertical":lt,"--n-mark-font-size":e}}),Z=C?De("slider",void 0,Pe,t):void 0,Ie=V(()=>{const{self:{fontSize:e,indicatorColor:n,indicatorBoxShadow:o,indicatorTextColor:i,indicatorBorderRadius:c}}=u.value;return{"--n-font-size":e,"--n-indicator-border-radius":c,"--n-indicator-box-shadow":o,"--n-indicator-color":n,"--n-indicator-text-color":i}}),ee=C?De("slider-indicator",void 0,Ie,t):void 0;return{mergedClsPrefix:l,namespace:$,uncontrolledValue:D,mergedValue:te,mergedDisabled:f,mergedPlacement:ye,isMounted:xt(),adjustedTo:Me(t),dotTransitionDisabled:A,markInfos:oe,isShowTooltip:ue,shouldKeepTooltipTransition:_e,handleRailRef:b,setHandleRefs:p,setFollowerRefs:x,fillStyle:G,getHandleStyle:ae,activeIndex:B,arrifiedValues:T,followerEnabledIndexSet:P,handleRailMouseDown:Ge,handleHandleFocus:Qe,handleHandleBlur:Ze,handleHandleMouseEnter:et,handleHandleMouseLeave:tt,handleRailKeyDown:le,indicatorCssVars:C?void 0:Ie,indicatorThemeClass:ee==null?void 0:ee.themeClass,indicatorOnRender:ee==null?void 0:ee.onRender,cssVars:C?void 0:Pe,themeClass:Z==null?void 0:Z.themeClass,onRender:Z==null?void 0:Z.onRender}},render(){var t;const{mergedClsPrefix:l,themeClass:$,formatTooltip:C}=this;return(t=this.onRender)===null||t===void 0||t.call(this),d("div",{class:[`${l}-slider`,$,{[`${l}-slider--disabled`]:this.mergedDisabled,[`${l}-slider--active`]:this.activeIndex!==-1,[`${l}-slider--with-mark`]:this.marks,[`${l}-slider--vertical`]:this.vertical,[`${l}-slider--reverse`]:this.reverse}],style:this.cssVars,onKeydown:this.handleRailKeyDown,onMousedown:this.handleRailMouseDown,onTouchstart:this.handleRailMouseDown},d("div",{class:`${l}-slider-rail`},d("div",{class:`${l}-slider-rail__fill`,style:this.fillStyle}),this.marks?d("div",{class:[`${l}-slider-dots`,this.dotTransitionDisabled&&`${l}-slider-dots--transition-disabled`]},this.markInfos.map(u=>d("div",{key:u.label,class:[`${l}-slider-dot`,{[`${l}-slider-dot--active`]:u.active}],style:u.style}))):null,d("div",{ref:"handleRailRef",class:`${l}-slider-handles`},this.arrifiedValues.map((u,b)=>{const h=this.isShowTooltip(b);return d(yt,null,{default:()=>[d(_t,null,{default:()=>d("div",{ref:this.setHandleRefs(b),class:`${l}-slider-handle-wrapper`,tabindex:this.mergedDisabled?-1:0,style:this.getHandleStyle(u,b),onFocus:()=>this.handleHandleFocus(b),onBlur:()=>this.handleHandleBlur(b),onMouseenter:()=>this.handleHandleMouseEnter(b),onMouseleave:()=>this.handleHandleMouseLeave(b)},kt(this.$slots.thumb,()=>[d("div",{class:`${l}-slider-handle`})]))}),this.tooltip&&d(Ct,{ref:this.setFollowerRefs(b),show:h,to:this.adjustedTo,enabled:this.showTooltip&&!this.range||this.followerEnabledIndexSet.has(b),teleportDisabled:this.adjustedTo===Me.tdkey,placement:this.mergedPlacement,containerClass:this.namespace},{default:()=>d(Rt,{name:"fade-in-scale-up-transition",appear:this.isMounted,css:this.shouldKeepTooltipTransition(b),onEnter:()=>{this.followerEnabledIndexSet.add(b)},onAfterLeave:()=>{this.followerEnabledIndexSet.delete(b)}},{default:()=>{var p;return h?((p=this.indicatorOnRender)===null||p===void 0||p.call(this),d("div",{class:[`${l}-slider-handle-indicator`,this.indicatorThemeClass,`${l}-slider-handle-indicator--${this.mergedPlacement}`],style:this.indicatorCssVars},typeof C=="function"?C(u):u)):null}})})]})})),this.marks?d("div",{class:`${l}-slider-marks`},this.markInfos.map(u=>d("div",{key:u.label,class:`${l}-slider-mark`,style:u.style},u.label))):null))}}),Kt=a("switch",`
 height: var(--n-height);
 min-width: var(--n-width);
 vertical-align: middle;
 user-select: none;
 -webkit-user-select: none;
 display: inline-flex;
 outline: none;
 justify-content: center;
 align-items: center;
`,[s("children-placeholder",`
 height: var(--n-rail-height);
 display: flex;
 flex-direction: column;
 overflow: hidden;
 pointer-events: none;
 visibility: hidden;
 `),s("rail-placeholder",`
 display: flex;
 flex-wrap: none;
 `),s("button-placeholder",`
 width: calc(1.75 * var(--n-rail-height));
 height: var(--n-rail-height);
 `),a("base-loading",`
 position: absolute;
 top: 50%;
 left: 50%;
 transform: translateX(-50%) translateY(-50%);
 font-size: calc(var(--n-button-width) - 4px);
 color: var(--n-loading-color);
 transition: color .3s var(--n-bezier);
 `,[Ae({left:"50%",top:"50%",originalTransform:"translateX(-50%) translateY(-50%)"})]),s("checked, unchecked",`
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
 box-sizing: border-box;
 position: absolute;
 white-space: nowrap;
 top: 0;
 bottom: 0;
 display: flex;
 align-items: center;
 line-height: 1;
 `),s("checked",`
 right: 0;
 padding-right: calc(1.25 * var(--n-rail-height) - var(--n-offset));
 `),s("unchecked",`
 left: 0;
 justify-content: flex-end;
 padding-left: calc(1.25 * var(--n-rail-height) - var(--n-offset));
 `),X("&:focus",[s("rail",`
 box-shadow: var(--n-box-shadow-focus);
 `)]),m("round",[s("rail","border-radius: calc(var(--n-rail-height) / 2);",[s("button","border-radius: calc(var(--n-button-height) / 2);")])]),Ee("disabled",[Ee("icon",[m("rubber-band",[m("pressed",[s("rail",[s("button","max-width: var(--n-button-width-pressed);")])]),s("rail",[X("&:active",[s("button","max-width: var(--n-button-width-pressed);")])]),m("active",[m("pressed",[s("rail",[s("button","left: calc(100% - var(--n-offset) - var(--n-button-width-pressed));")])]),s("rail",[X("&:active",[s("button","left: calc(100% - var(--n-offset) - var(--n-button-width-pressed));")])])])])])]),m("active",[s("rail",[s("button","left: calc(100% - var(--n-button-width) - var(--n-offset))")])]),s("rail",`
 overflow: hidden;
 height: var(--n-rail-height);
 min-width: var(--n-rail-width);
 border-radius: var(--n-rail-border-radius);
 cursor: pointer;
 position: relative;
 transition:
 opacity .3s var(--n-bezier),
 background .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 background-color: var(--n-rail-color);
 `,[s("button-icon",`
 color: var(--n-icon-color);
 transition: color .3s var(--n-bezier);
 font-size: calc(var(--n-button-height) - 4px);
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 display: flex;
 justify-content: center;
 align-items: center;
 line-height: 1;
 `,[Ae()]),s("button",`
 align-items: center; 
 top: var(--n-offset);
 left: var(--n-offset);
 height: var(--n-button-height);
 width: var(--n-button-width-pressed);
 max-width: var(--n-button-width);
 border-radius: var(--n-button-border-radius);
 background-color: var(--n-button-color);
 box-shadow: var(--n-button-box-shadow);
 box-sizing: border-box;
 cursor: inherit;
 content: "";
 position: absolute;
 transition:
 background-color .3s var(--n-bezier),
 left .3s var(--n-bezier),
 opacity .3s var(--n-bezier),
 max-width .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 `)]),m("active",[s("rail","background-color: var(--n-rail-color-active);")]),m("loading",[s("rail",`
 cursor: wait;
 `)]),m("disabled",[s("rail",`
 cursor: not-allowed;
 opacity: .5;
 `)])]),Wt=Object.assign(Object.assign({},we.props),{size:{type:String,default:"medium"},value:{type:[String,Number,Boolean],default:void 0},loading:Boolean,defaultValue:{type:[String,Number,Boolean],default:!1},disabled:{type:Boolean,default:void 0},round:{type:Boolean,default:!0},"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],checkedValue:{type:[String,Number,Boolean],default:!0},uncheckedValue:{type:[String,Number,Boolean],default:!1},railStyle:Function,rubberBand:{type:Boolean,default:!0},onChange:[Function,Array]});let re;const Xt=Fe({name:"Switch",props:Wt,setup(t){re===void 0&&(typeof CSS<"u"?typeof CSS.supports<"u"?re=CSS.supports("width","max(1px)"):re=!1:re=!0);const{mergedClsPrefixRef:l,inlineThemeDisabled:$}=Ke(t),C=we("Switch","-switch",Kt,zt,t,l),u=We(t),{mergedSizeRef:b,mergedDisabledRef:h}=u,p=F(t.defaultValue),j=Xe(t,"value"),x=Ye(j,p),P=V(()=>x.value===t.checkedValue),I=F(!1),f=F(!1),y=V(()=>{const{railStyle:r}=t;if(!!r)return r({focused:f.value,checked:P.value})});function D(r){const{"onUpdate:value":A,onChange:L,onUpdateValue:G}=t,{nTriggerFormInput:oe,nTriggerFormChange:ae}=u;A&&se(A,r),G&&se(G,r),L&&se(L,r),p.value=r,oe(),ae()}function xe(){const{nTriggerFormFocus:r}=u;r()}function te(){const{nTriggerFormBlur:r}=u;r()}function T(){t.loading||h.value||(x.value!==t.checkedValue?D(t.checkedValue):D(t.uncheckedValue))}function de(){f.value=!0,xe()}function ye(){f.value=!1,te(),I.value=!1}function ce(r){t.loading||h.value||r.key===" "&&(x.value!==t.checkedValue?D(t.checkedValue):D(t.uncheckedValue),I.value=!1)}function B(r){t.loading||h.value||r.key===" "&&(r.preventDefault(),I.value=!0)}const ne=V(()=>{const{value:r}=b,{self:{opacityDisabled:A,railColor:L,railColorActive:G,buttonBoxShadow:oe,buttonColor:ae,boxShadowFocus:ue,loadingColor:_e,textColor:ke,iconColor:Ce,[Y("buttonHeight",r)]:N,[Y("buttonWidth",r)]:he,[Y("buttonWidthPressed",r)]:ie,[Y("railHeight",r)]:M,[Y("railWidth",r)]:O,[Y("railBorderRadius",r)]:J,[Y("buttonBorderRadius",r)]:Re},common:{cubicBezierEaseInOut:ze}}=C.value;let K,Q,le;return re?(K=`calc((${M} - ${N}) / 2)`,Q=`max(${M}, ${N})`,le=`max(${O}, calc(${O} + ${N} - ${M}))`):(K=Te((E(M)-E(N))/2),Q=Te(Math.max(E(M),E(N))),le=E(M)>E(N)?O:Te(E(O)+E(N)-E(M))),{"--n-bezier":ze,"--n-button-border-radius":Re,"--n-button-box-shadow":oe,"--n-button-color":ae,"--n-button-width":he,"--n-button-width-pressed":ie,"--n-button-height":N,"--n-height":Q,"--n-offset":K,"--n-opacity-disabled":A,"--n-rail-border-radius":J,"--n-rail-color":L,"--n-rail-color-active":G,"--n-rail-height":M,"--n-rail-width":O,"--n-width":le,"--n-box-shadow-focus":ue,"--n-loading-color":_e,"--n-text-color":ke,"--n-icon-color":Ce}}),S=$?De("switch",V(()=>b.value[0]),ne,t):void 0;return{handleClick:T,handleBlur:ye,handleFocus:de,handleKeyup:ce,handleKeydown:B,mergedRailStyle:y,pressed:I,mergedClsPrefix:l,mergedValue:x,checked:P,mergedDisabled:h,cssVars:$?void 0:ne,themeClass:S==null?void 0:S.themeClass,onRender:S==null?void 0:S.onRender}},render(){const{mergedClsPrefix:t,mergedDisabled:l,checked:$,mergedRailStyle:C,onRender:u,$slots:b}=this;u==null||u();const{checked:h,unchecked:p,icon:j,"checked-icon":x,"unchecked-icon":P}=b,I=!(Be(j)&&Be(x)&&Be(P));return d("div",{role:"switch","aria-checked":$,class:[`${t}-switch`,this.themeClass,I&&`${t}-switch--icon`,$&&`${t}-switch--active`,l&&`${t}-switch--disabled`,this.round&&`${t}-switch--round`,this.loading&&`${t}-switch--loading`,this.pressed&&`${t}-switch--pressed`,this.rubberBand&&`${t}-switch--rubber-band`],tabindex:this.mergedDisabled?void 0:0,style:this.cssVars,onClick:this.handleClick,onFocus:this.handleFocus,onBlur:this.handleBlur,onKeyup:this.handleKeyup,onKeydown:this.handleKeydown},d("div",{class:`${t}-switch__rail`,"aria-hidden":"true",style:C},q(h,f=>q(p,y=>f||y?d("div",{"aria-hidden":!0,class:`${t}-switch__children-placeholder`},d("div",{class:`${t}-switch__rail-placeholder`},d("div",{class:`${t}-switch__button-placeholder`}),f),d("div",{class:`${t}-switch__rail-placeholder`},d("div",{class:`${t}-switch__button-placeholder`}),y)):null)),d("div",{class:`${t}-switch__button`},q(j,f=>q(x,y=>q(P,D=>d(St,null,{default:()=>this.loading?d(Vt,{key:"loading",clsPrefix:t,strokeWidth:20}):this.checked&&(y||f)?d("div",{class:`${t}-switch__button-icon`,key:y?"checked-icon":"icon"},y||f):!this.checked&&(D||f)?d("div",{class:`${t}-switch__button-icon`,key:D?"unchecked-icon":"icon"},D||f):null})))),q(h,f=>f&&d("div",{key:"checked",class:`${t}-switch__checked`},f)),q(p,f=>f&&d("div",{key:"unchecked",class:`${t}-switch__unchecked`},f)))))}}),Yt={},qt={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 24 24"},Gt=Bt("path",{d:"M7.38 21.01c.49.49 1.28.49 1.77 0l8.31-8.31a.996.996 0 0 0 0-1.41L9.15 2.98c-.49-.49-1.28-.49-1.77 0s-.49 1.28 0 1.77L14.62 12l-7.25 7.25c-.48.48-.48 1.28.01 1.76z",fill:"currentColor"},null,-1),Jt=[Gt];function Qt(t,l){return qe(),Tt("svg",qt,Jt)}const Zt=$t(Yt,[["render",Qt]]),ln=Fe({__name:"SettingsView",setup(t){const l=Nt();Dt();function $(){l.warning({title:g("warning"),content:g("clear_local_storage_warning"),positiveText:g("yes"),negativeText:g("no"),onPositiveClick:()=>{localStorage.clear(),location.reload()},onNegativeClick:()=>{}})}function C(){l.info({title:g("info"),content:g("are_you_sure"),positiveText:g("yes"),negativeText:g("no"),onPositiveClick:()=>{Ft(),location.reload()},onNegativeClick:()=>{}})}function u(){l.info({title:g("info"),content:g("are_you_sure"),positiveText:g("yes"),negativeText:g("no"),onPositiveClick:()=>{Pt(),location.reload()},onNegativeClick:()=>{}})}return(b,h)=>{const p=It,j=Ht,x=At,P=Xt,I=Ot,f=Et;return qe(),Mt(f,{clickable:"",hoverable:""},{default:_(()=>[v(x,{onClick:h[0]||(h[0]=()=>b.$router.push({name:"content-blacklist-view"}))},{suffix:_(()=>[v(j,null,{default:_(()=>[v(Zt)]),_:1})]),default:_(()=>[v(p,{title:w(g)("hide_rules")},null,8,["title"])]),_:1}),v(x,{onClick:C},{default:_(()=>[v(p,{title:w(g)("clear_expired_cache")},null,8,["title"])]),_:1}),v(x,{onClick:u},{default:_(()=>[v(p,{title:w(g)("clear_all_caches")},null,8,["title"])]),_:1}),v(x,{onClick:$},{default:_(()=>[v(p,{title:w(g)("clear_local_storage")},null,8,["title"])]),_:1}),v(x,null,{suffix:_(()=>[v(P,{value:w(U).autoPing,"onUpdate:value":h[1]||(h[1]=y=>w(U).autoPing=y)},null,8,["value"])]),default:_(()=>[v(p,{title:w(g)("automatic_ping")},null,8,["title"])]),_:1}),v(x,null,{suffix:_(()=>[v(P,{value:w(U).enablePapawTree,"onUpdate:value":h[2]||(h[2]=y=>w(U).enablePapawTree=y)},null,8,["value"])]),default:_(()=>[v(p,{title:w(g)("enable_papaw_tree")},null,8,["title"])]),_:1}),v(x,null,{suffix:_(()=>[v(P,{value:w(U).enablePapawTreeLazyMode,"onUpdate:value":h[3]||(h[3]=y=>w(U).enablePapawTreeLazyMode=y)},null,8,["value"])]),default:_(()=>[v(p,{title:w(g)("enable_papaw_tree_lazy_mode")},null,8,["title"])]),_:1}),v(x,null,{default:_(()=>[v(p,{description:w(g)("lazy_delay_for_papaw_tip"),titleExtra:String(w(U).lazyDelayForPapaw)},{header:_(()=>[Ue(je(w(g)("lazy_delay_for_papaw")),1)]),footer:_(()=>[v(I,{value:w(U).lazyDelayForPapaw,"onUpdate:value":h[4]||(h[4]=y=>w(U).lazyDelayForPapaw=y),step:50,min:0,max:1e3},null,8,["value"])]),_:1},8,["description","titleExtra"])]),_:1}),v(x,{onClick:h[5]||(h[5]=()=>b.$router.push({name:"move-house"}))},{default:_(()=>[v(p,{description:w(g)("move_house_description")},{header:_(()=>[Ue(je(w(g)("move_house")),1)]),_:1},8,["description"])]),_:1})]),_:1})}}});export{ln as default};
