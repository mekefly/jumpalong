import{f as K,ap as $,bL as lt,bM as dt,j as d,bN as ue,bO as ct,bP as G,bQ as bt,l as ft,m as Re,t as ut,n as Y,bb as vt,L as pt,x as ht,bR as gt,bc as mt,bS as xt,bT as yt,c as r,a as m,b as T,d as I,e as wt,u as Rt,h as Ce,bU as Ct,bV as ve,k as Q,aB as St,aw as Z,aK as ee,p as Tt,au as F,bW as zt,aG as $t,o as B,q as Pt,v as pe,aJ as he,r as X,bX as _t,bY as Wt,bZ as Lt,b_ as At}from"./index.de60ca02.js";const Bt=ue(".v-x-scroll",{overflow:"auto",scrollbarWidth:"none"},[ue("&::-webkit-scrollbar",{width:0,height:0})]),Et=K({name:"XScroll",props:{disabled:Boolean,onScroll:Function},setup(){const e=$(null);function n(s){!(s.currentTarget.offsetWidth<s.currentTarget.scrollWidth)||s.deltaY===0||(s.currentTarget.scrollLeft+=s.deltaY+s.deltaX,s.preventDefault())}const o=lt();return Bt.mount({id:"vueuc/x-scroll",head:!0,anchorMetaName:dt,ssr:o}),Object.assign({selfRef:e,handleWheel:n},{scrollTo(...s){var x;(x=e.value)===null||x===void 0||x.scrollTo(...s)}})},render(){return d("div",{ref:"selfRef",onScroll:this.onScroll,onWheel:this.disabled?void 0:this.handleWheel,class:"v-x-scroll"},this.$slots)}});var kt=/\s/;function jt(e){for(var n=e.length;n--&&kt.test(e.charAt(n)););return n}var It=/^\s+/;function Ot(e){return e&&e.slice(0,jt(e)+1).replace(It,"")}var ge=0/0,Ft=/^[-+]0x[0-9a-f]+$/i,Ht=/^0b[01]+$/i,Mt=/^0o[0-7]+$/i,Dt=parseInt;function me(e){if(typeof e=="number")return e;if(ct(e))return ge;if(G(e)){var n=typeof e.valueOf=="function"?e.valueOf():e;e=G(n)?n+"":n}if(typeof e!="string")return e===0?e:+e;e=Ot(e);var o=Ht.test(e);return o||Mt.test(e)?Dt(e.slice(2),o?2:8):Ft.test(e)?ge:+e}var Nt=function(){return bt.Date.now()};const te=Nt;var Vt="Expected a function",Ut=Math.max,Xt=Math.min;function Yt(e,n,o){var f,s,x,u,c,v,y=0,S=!1,p=!1,h=!0;if(typeof e!="function")throw new TypeError(Vt);n=me(n)||0,G(o)&&(S=!!o.leading,p="maxWait"in o,x=p?Ut(me(o.maxWait)||0,n):x,h="trailing"in o?!!o.trailing:h);function R(g){var W=f,k=s;return f=s=void 0,y=g,u=e.apply(k,W),u}function C(g){return y=g,c=setTimeout(_,n),S?R(g):u}function L(g){var W=g-v,k=g-y,O=n-W;return p?Xt(O,x-k):O}function z(g){var W=g-v,k=g-y;return v===void 0||W>=n||W<0||p&&k>=x}function _(){var g=te();if(z(g))return b(g);c=setTimeout(_,L(g))}function b(g){return c=void 0,h&&f?R(g):(f=s=void 0,u)}function w(){c!==void 0&&clearTimeout(c),y=0,f=v=s=c=void 0}function E(){return c===void 0?u:b(te())}function D(){var g=te(),W=z(g);if(f=arguments,s=this,v=g,W){if(c===void 0)return C(v);if(p)return clearTimeout(c),c=setTimeout(_,n),R(v)}return c===void 0&&(c=setTimeout(_,n)),u}return D.cancel=w,D.flush=E,D}var Gt="Expected a function";function ae(e,n,o){var f=!0,s=!0;if(typeof e!="function")throw new TypeError(Gt);return G(o)&&(f="leading"in o?!!o.leading:f,s="trailing"in o?!!o.trailing:s),Yt(e,n,{leading:f,maxWait:n,trailing:s})}const oe=ft("n-tabs"),Se={tab:[String,Number,Object,Function],name:{type:[String,Number],required:!0},disabled:Boolean,displayDirective:{type:String,default:"if"},closable:{type:Boolean,default:void 0},tabProps:Object,label:[String,Number,Object,Function]},Zt=K({__TAB_PANE__:!0,name:"TabPane",alias:["TabPanel"],props:Se,setup(e){const n=Re(oe,null);return n||ut("tab-pane","`n-tab-pane` must be placed inside `n-tabs`."),{style:n.paneStyleRef,class:n.paneClassRef,mergedClsPrefix:n.mergedClsPrefixRef}},render(){return d("div",{class:[`${this.mergedClsPrefix}-tab-pane`,this.class],style:this.style},this.$slots)}}),Kt=Object.assign({internalLeftPadded:Boolean,internalAddable:Boolean,internalCreatedByPane:Boolean},yt(Se,["displayDirective"])),re=K({__TAB__:!0,inheritAttrs:!1,name:"Tab",props:Kt,setup(e){const{mergedClsPrefixRef:n,valueRef:o,typeRef:f,closableRef:s,tabStyleRef:x,tabChangeIdRef:u,onBeforeLeaveRef:c,triggerRef:v,handleAdd:y,activateTab:S,handleClose:p}=Re(oe);return{trigger:v,mergedClosable:Y(()=>{if(e.internalAddable)return!1;const{closable:h}=e;return h===void 0?s.value:h}),style:x,clsPrefix:n,value:o,type:f,handleClose(h){h.stopPropagation(),!e.disabled&&p(e.name)},activateTab(){if(e.disabled)return;if(e.internalAddable){y();return}const{name:h}=e,R=++u.id;if(h!==o.value){const{value:C}=c;C?Promise.resolve(C(e.name,o.value)).then(L=>{L&&u.id===R&&S(h)}):S(h)}}}},render(){const{internalAddable:e,clsPrefix:n,name:o,disabled:f,label:s,tab:x,value:u,mergedClosable:c,style:v,trigger:y,$slots:{default:S}}=this,p=s!=null?s:x;return d("div",{class:`${n}-tabs-tab-wrapper`},this.internalLeftPadded?d("div",{class:`${n}-tabs-tab-pad`}):null,d("div",Object.assign({key:o,"data-name":o,"data-disabled":f?!0:void 0},vt({class:[`${n}-tabs-tab`,u===o&&`${n}-tabs-tab--active`,f&&`${n}-tabs-tab--disabled`,c&&`${n}-tabs-tab--closable`,e&&`${n}-tabs-tab--addable`],onClick:y==="click"?this.activateTab:void 0,onMouseenter:y==="hover"?this.activateTab:void 0,style:e?void 0:v},this.internalCreatedByPane?this.tabProps||{}:this.$attrs)),d("span",{class:`${n}-tabs-tab__label`},e?d(pt,null,d("div",{class:`${n}-tabs-tab__height-placeholder`},"\xA0"),d(ht,{clsPrefix:n},{default:()=>d(gt,null)})):S?S():typeof p=="object"?p:mt(p!=null?p:o)),c&&this.type==="card"?d(xt,{clsPrefix:n,class:`${n}-tabs-tab__close`,onClick:this.handleClose,disabled:f}):null))}}),qt=r("tabs",`
 box-sizing: border-box;
 width: 100%;
 display: flex;
 flex-direction: column;
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
`,[m("segment-type",[r("tabs-rail",[T("&.transition-disabled","color: red;",[r("tabs-tab",`
 transition: none;
 `)])])]),m("left, right",`
 flex-direction: row;
 `,[r("tabs-bar",`
 width: 2px;
 right: 0;
 transition:
 top .2s var(--n-bezier),
 max-height .2s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `),r("tabs-tab",`
 padding: var(--n-tab-padding-vertical); 
 `)]),m("right",`
 flex-direction: row-reverse;
 `,[r("tabs-bar",`
 left: 0;
 `)]),m("bottom",`
 flex-direction: column-reverse;
 justify-content: flex-end;
 `,[r("tabs-bar",`
 top: 0;
 `)]),r("tabs-rail",`
 padding: 3px;
 border-radius: var(--n-tab-border-radius);
 width: 100%;
 background-color: var(--n-color-segment);
 transition: background-color .3s var(--n-bezier);
 display: flex;
 align-items: center;
 `,[r("tabs-tab-wrapper",`
 flex-basis: 0;
 flex-grow: 1;
 display: flex;
 align-items: center;
 justify-content: center;
 `,[r("tabs-tab",`
 overflow: hidden;
 border-radius: var(--n-tab-border-radius);
 width: 100%;
 display: flex;
 align-items: center;
 justify-content: center;
 `,[m("active",`
 font-weight: var(--n-font-weight-strong);
 color: var(--n-tab-text-color-active);
 background-color: var(--n-tab-color-segment);
 box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .08);
 `),T("&:hover",`
 color: var(--n-tab-text-color-hover);
 `)])])]),m("flex",[r("tabs-nav",{width:"100%"},[r("tabs-wrapper",{width:"100%"},[r("tabs-tab",{marginRight:0})])])]),r("tabs-nav",`
 box-sizing: border-box;
 line-height: 1.5;
 display: flex;
 transition: border-color .3s var(--n-bezier);
 `,[I("prefix, suffix",`
 display: flex;
 align-items: center;
 `),I("prefix","padding-right: 16px;"),I("suffix","padding-left: 16px;")]),r("tabs-nav-scroll-wrapper",`
 flex: 1;
 position: relative;
 overflow: hidden;
 `,[m("shadow-before",[T("&::before",`
 box-shadow: inset 10px 0 8px -8px rgba(0, 0, 0, .12);
 `)]),m("shadow-after",[T("&::after",`
 box-shadow: inset -10px 0 8px -8px rgba(0, 0, 0, .12);
 `)]),r("tabs-nav-y-scroll",`
 height: 100%;
 width: 100%;
 overflow-y: auto; 
 scrollbar-width: none;
 `,[T("&::-webkit-scrollbar",`
 width: 0;
 height: 0;
 `)]),T("&::before, &::after",`
 transition: box-shadow .3s var(--n-bezier);
 pointer-events: none;
 content: "";
 position: absolute;
 top: 0;
 bottom: 0;
 width: 20px;
 z-index: 1;
 `),T("&::before",`
 left: 0;
 `),T("&::after",`
 right: 0;
 `)]),r("tabs-nav-scroll-content",`
 display: flex;
 position: relative;
 min-width: 100%;
 width: fit-content;
 `),r("tabs-wrapper",`
 display: inline-flex;
 flex-wrap: nowrap;
 position: relative;
 `),r("tabs-tab-wrapper",`
 display: flex;
 flex-wrap: nowrap;
 flex-shrink: 0;
 flex-grow: 0;
 `),r("tabs-tab",`
 cursor: pointer;
 white-space: nowrap;
 flex-wrap: nowrap;
 display: inline-flex;
 align-items: center;
 color: var(--n-tab-text-color);
 font-size: var(--n-tab-font-size);
 background-clip: padding-box;
 padding: var(--n-tab-padding);
 transition:
 box-shadow .3s var(--n-bezier),
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `,[m("disabled",{cursor:"not-allowed"}),I("close",`
 margin-left: 6px;
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `),I("label",`
 display: flex;
 align-items: center;
 `)]),r("tabs-bar",`
 position: absolute;
 bottom: 0;
 height: 2px;
 border-radius: 1px;
 background-color: var(--n-bar-color);
 transition:
 left .2s var(--n-bezier),
 max-width .2s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `,[T("&.transition-disabled",`
 transition: none;
 `),m("disabled",`
 background-color: var(--n-tab-text-color-disabled)
 `)]),r("tabs-pane-wrapper",`
 position: relative;
 overflow: hidden;
 transition: max-height .2s var(--n-bezier);
 `),r("tab-pane",`
 color: var(--n-pane-text-color);
 width: 100%;
 padding: var(--n-pane-padding);
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 opacity .2s var(--n-bezier);
 left: 0;
 right: 0;
 top: 0;
 `,[T("&.next-transition-leave-active, &.prev-transition-leave-active, &.next-transition-enter-active, &.prev-transition-enter-active",`
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 transform .2s var(--n-bezier),
 opacity .2s var(--n-bezier);
 `),T("&.next-transition-leave-active, &.prev-transition-leave-active",`
 position: absolute;
 `),T("&.next-transition-enter-from, &.prev-transition-leave-to",`
 transform: translateX(32px);
 opacity: 0;
 `),T("&.next-transition-leave-to, &.prev-transition-enter-from",`
 transform: translateX(-32px);
 opacity: 0;
 `),T("&.next-transition-leave-from, &.next-transition-enter-to, &.prev-transition-leave-from, &.prev-transition-enter-to",`
 transform: translateX(0);
 opacity: 1;
 `)]),r("tabs-tab-pad",`
 width: var(--n-tab-gap);
 flex-grow: 0;
 flex-shrink: 0;
 `),m("line-type, bar-type",[r("tabs-tab",`
 font-weight: var(--n-tab-font-weight);
 box-sizing: border-box;
 vertical-align: bottom;
 `,[T("&:hover",{color:"var(--n-tab-text-color-hover)"}),m("active",`
 color: var(--n-tab-text-color-active);
 font-weight: var(--n-tab-font-weight-active);
 `),m("disabled",{color:"var(--n-tab-text-color-disabled)"})])]),r("tabs-nav",[m("line-type",[I("prefix, suffix",`
 transition: border-color .3s var(--n-bezier);
 border-bottom: 1px solid var(--n-tab-border-color);
 `),r("tabs-nav-scroll-content",`
 transition: border-color .3s var(--n-bezier);
 border-bottom: 1px solid var(--n-tab-border-color);
 `),r("tabs-bar",`
 border-radius: 0;
 bottom: -1px;
 `)]),m("card-type",[I("prefix, suffix",`
 transition: border-color .3s var(--n-bezier);
 border-bottom: 1px solid var(--n-tab-border-color);
 `),r("tabs-pad",`
 flex-grow: 1;
 transition: border-color .3s var(--n-bezier);
 border-bottom: 1px solid var(--n-tab-border-color);
 `),r("tabs-tab-pad",`
 transition: border-color .3s var(--n-bezier);
 border-bottom: 1px solid var(--n-tab-border-color);
 `),r("tabs-tab",`
 font-weight: var(--n-tab-font-weight);
 border: 1px solid var(--n-tab-border-color);
 border-top-left-radius: var(--n-tab-border-radius);
 border-top-right-radius: var(--n-tab-border-radius);
 background-color: var(--n-tab-color);
 box-sizing: border-box;
 position: relative;
 vertical-align: bottom;
 display: flex;
 justify-content: space-between;
 font-size: var(--n-tab-font-size);
 color: var(--n-tab-text-color);
 `,[m("addable",`
 padding-left: 8px;
 padding-right: 8px;
 font-size: 16px;
 `,[I("height-placeholder",`
 width: 0;
 font-size: var(--n-tab-font-size);
 `),wt("disabled",[T("&:hover",`
 color: var(--n-tab-text-color-hover);
 `)])]),m("closable","padding-right: 6px;"),m("active",`
 border-bottom: 1px solid #0000;
 background-color: #0000;
 font-weight: var(--n-tab-font-weight-active);
 color: var(--n-tab-text-color-active);
 `),m("disabled","color: var(--n-tab-text-color-disabled);")]),r("tabs-scroll-padding","border-bottom: 1px solid var(--n-tab-border-color);")]),m("left, right",[r("tabs-wrapper",`
 flex-direction: column;
 `,[r("tabs-tab-wrapper",`
 flex-direction: column;
 `,[r("tabs-tab-pad",`
 height: var(--n-tab-gap);
 width: 100%;
 `)])]),r("tabs-nav-scroll-content",`
 border-bottom: none;
 `)]),m("left",[r("tabs-nav-scroll-content",`
 box-sizing: border-box;
 border-right: 1px solid var(--n-tab-border-color);
 `)]),m("right",[r("tabs-nav-scroll-content",`
 border-left: 1px solid var(--n-tab-border-color);
 `)]),m("bottom",[r("tabs-nav-scroll-content",`
 border-top: 1px solid var(--n-tab-border-color);
 border-bottom: none;
 `)])])]),Jt=Object.assign(Object.assign({},Ce.props),{value:[String,Number],defaultValue:[String,Number],trigger:{type:String,default:"click"},type:{type:String,default:"bar"},closable:Boolean,justifyContent:String,size:{type:String,default:"medium"},placement:{type:String,default:"top"},tabStyle:[String,Object],barWidth:Number,paneClass:String,paneStyle:[String,Object],addable:[Boolean,Object],tabsPadding:{type:Number,default:0},animated:Boolean,onBeforeLeave:Function,onAdd:Function,"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],onClose:[Function,Array],labelSize:String,activeName:[String,Number],onActiveNameChange:[Function,Array]}),ea=K({name:"Tabs",props:Jt,setup(e,{slots:n}){var o,f,s,x;const{mergedClsPrefixRef:u,inlineThemeDisabled:c}=Rt(e),v=Ce("Tabs","-tabs",qt,Ct,e,u),y=$(null),S=$(null),p=$(null),h=$(null),R=$(null),C=$(!0),L=$(!0),z=ve(e,["labelSize","size"]),_=ve(e,["activeName","value"]),b=$((f=(o=_.value)!==null&&o!==void 0?o:e.defaultValue)!==null&&f!==void 0?f:n.default?(x=(s=Q(n.default())[0])===null||s===void 0?void 0:s.props)===null||x===void 0?void 0:x.name:null),w=St(_,b),E={id:0},D=Y(()=>{if(!(!e.justifyContent||e.type==="card"))return{display:"flex",justifyContent:e.justifyContent}});Z(w,()=>{E.id=0,O(),ie()});function g(){var t;const{value:a}=w;return a===null?null:(t=y.value)===null||t===void 0?void 0:t.querySelector(`[data-name="${a}"]`)}function W(t){if(e.type==="card")return;const{value:a}=S;if(!!a&&t){const i=`${u.value}-tabs-bar--disabled`,{barWidth:l,placement:A}=e;if(t.dataset.disabled==="true"?a.classList.add(i):a.classList.remove(i),["top","bottom"].includes(A)){if(k(["top","maxHeight","height"]),typeof l=="number"&&t.offsetWidth>=l){const P=Math.floor((t.offsetWidth-l)/2)+t.offsetLeft;a.style.left=`${P}px`,a.style.maxWidth=`${l}px`}else a.style.left=`${t.offsetLeft}px`,a.style.maxWidth=`${t.offsetWidth}px`;a.style.width="8192px",a.offsetWidth}else{if(k(["left","maxWidth","width"]),typeof l=="number"&&t.offsetHeight>=l){const P=Math.floor((t.offsetHeight-l)/2)+t.offsetTop;a.style.top=`${P}px`,a.style.maxHeight=`${l}px`}else a.style.top=`${t.offsetTop}px`,a.style.maxHeight=`${t.offsetHeight}px`;a.style.height="8192px",a.offsetHeight}}}function k(t){const{value:a}=S;if(!!a)for(const i of t)a.style[i]=""}function O(){if(e.type==="card")return;const t=g();t&&W(t)}function ie(t){var a;const i=(a=R.value)===null||a===void 0?void 0:a.$el;if(!i)return;const l=g();if(!l)return;const{scrollLeft:A,offsetWidth:P}=i,{offsetLeft:M,offsetWidth:U}=l;A>M?i.scrollTo({top:0,left:M,behavior:"smooth"}):M+U>A+P&&i.scrollTo({top:0,left:M+U-P,behavior:"smooth"})}const N=$(null);let q=0,j=null;function Te(t){const a=N.value;if(a){q=t.getBoundingClientRect().height;const i=`${q}px`,l=()=>{a.style.height=i,a.style.maxHeight=i};j?(l(),j(),j=null):j=l}}function ze(t){const a=N.value;if(a){const i=t.getBoundingClientRect().height,l=()=>{document.body.offsetHeight,a.style.maxHeight=`${i}px`,a.style.height=`${Math.max(q,i)}px`};j?(j(),j=null,l()):j=l}}function $e(){const t=N.value;t&&(t.style.maxHeight="",t.style.height="")}const se={value:[]},le=$("next");function Pe(t){const a=w.value;let i="next";for(const l of se.value){if(l===a)break;if(l===t){i="prev";break}}le.value=i,_e(t)}function _e(t){const{onActiveNameChange:a,onUpdateValue:i,"onUpdate:value":l}=e;a&&X(a,t),i&&X(i,t),l&&X(l,t),b.value=t}function We(t){const{onClose:a}=e;a&&X(a,t)}function de(){const{value:t}=S;if(!t)return;const a="transition-disabled";t.classList.add(a),O(),t.classList.remove(a)}let ce=0;function Le(t){var a;if(t.contentRect.width===0&&t.contentRect.height===0||ce===t.contentRect.width)return;ce=t.contentRect.width;const{type:i}=e;(i==="line"||i==="bar")&&de(),i!=="segment"&&J((a=R.value)===null||a===void 0?void 0:a.$el)}const Ae=ae(Le,64);Z([()=>e.justifyContent,()=>e.size],()=>{ee(()=>{const{type:t}=e;(t==="line"||t==="bar")&&de()})});const V=$(!1);function Be(t){var a;const{target:i,contentRect:{width:l}}=t,A=i.parentElement.offsetWidth;if(!V.value)A<l&&(V.value=!0);else{const{value:P}=h;if(!P)return;A-l>P.$el.offsetWidth&&(V.value=!1)}J((a=R.value)===null||a===void 0?void 0:a.$el)}const Ee=ae(Be,64);function ke(){const{onAdd:t}=e;t&&t(),ee(()=>{const a=g(),{value:i}=R;!a||!i||i.scrollTo({left:a.offsetLeft,top:0,behavior:"smooth"})})}function J(t){if(!t)return;const{scrollLeft:a,scrollWidth:i,offsetWidth:l}=t;C.value=a<=0,L.value=a+l>=i}const je=ae(t=>{J(t.target)},64);Tt(oe,{triggerRef:F(e,"trigger"),tabStyleRef:F(e,"tabStyle"),paneClassRef:F(e,"paneClass"),paneStyleRef:F(e,"paneStyle"),mergedClsPrefixRef:u,typeRef:F(e,"type"),closableRef:F(e,"closable"),valueRef:w,tabChangeIdRef:E,onBeforeLeaveRef:F(e,"onBeforeLeave"),activateTab:Pe,handleClose:We,handleAdd:ke}),zt(()=>{O(),ie()}),$t(()=>{const{value:t}=p;if(!t||["left","right"].includes(e.placement))return;const{value:a}=u,i=`${a}-tabs-nav-scroll-wrapper--shadow-before`,l=`${a}-tabs-nav-scroll-wrapper--shadow-after`;C.value?t.classList.remove(i):t.classList.add(i),L.value?t.classList.remove(l):t.classList.add(l)});const be=$(null);Z(w,()=>{if(e.type==="segment"){const t=be.value;t&&ee(()=>{t.classList.add("transition-disabled"),t.offsetWidth,t.classList.remove("transition-disabled")})}});const Ie={syncBarPosition:()=>{O()}},fe=Y(()=>{const{value:t}=z,{type:a}=e,i={card:"Card",bar:"Bar",line:"Line",segment:"Segment"}[a],l=`${t}${i}`,{self:{barColor:A,closeIconColor:P,closeIconColorHover:M,closeIconColorPressed:U,tabColor:Oe,tabBorderColor:Fe,paneTextColor:He,tabFontWeight:Me,tabBorderRadius:De,tabFontWeightActive:Ne,colorSegment:Ve,fontWeightStrong:Ue,tabColorSegment:Xe,closeSize:Ye,closeIconSize:Ge,closeColorHover:Ke,closeColorPressed:qe,closeBorderRadius:Je,[B("panePadding",t)]:Qe,[B("tabPadding",l)]:Ze,[B("tabPaddingVertical",l)]:et,[B("tabGap",l)]:tt,[B("tabTextColor",a)]:at,[B("tabTextColorActive",a)]:nt,[B("tabTextColorHover",a)]:rt,[B("tabTextColorDisabled",a)]:ot,[B("tabFontSize",t)]:it},common:{cubicBezierEaseInOut:st}}=v.value;return{"--n-bezier":st,"--n-color-segment":Ve,"--n-bar-color":A,"--n-tab-font-size":it,"--n-tab-text-color":at,"--n-tab-text-color-active":nt,"--n-tab-text-color-disabled":ot,"--n-tab-text-color-hover":rt,"--n-pane-text-color":He,"--n-tab-border-color":Fe,"--n-tab-border-radius":De,"--n-close-size":Ye,"--n-close-icon-size":Ge,"--n-close-color-hover":Ke,"--n-close-color-pressed":qe,"--n-close-border-radius":Je,"--n-close-icon-color":P,"--n-close-icon-color-hover":M,"--n-close-icon-color-pressed":U,"--n-tab-color":Oe,"--n-tab-font-weight":Me,"--n-tab-font-weight-active":Ne,"--n-tab-padding":Ze,"--n-tab-padding-vertical":et,"--n-tab-gap":tt,"--n-pane-padding":Qe,"--n-font-weight-strong":Ue,"--n-tab-color-segment":Xe}}),H=c?Pt("tabs",Y(()=>`${z.value[0]}${e.type[0]}`),fe,e):void 0;return Object.assign({mergedClsPrefix:u,mergedValue:w,renderedNames:new Set,tabsRailElRef:be,tabsPaneWrapperRef:N,tabsElRef:y,barElRef:S,addTabInstRef:h,xScrollInstRef:R,scrollWrapperElRef:p,addTabFixed:V,tabWrapperStyle:D,handleNavResize:Ae,mergedSize:z,handleScroll:je,handleTabsResize:Ee,cssVars:c?void 0:fe,themeClass:H==null?void 0:H.themeClass,animationDirection:le,renderNameListRef:se,onAnimationBeforeLeave:Te,onAnimationEnter:ze,onAnimationAfterEnter:$e,onRender:H==null?void 0:H.onRender},Ie)},render(){const{mergedClsPrefix:e,type:n,placement:o,addTabFixed:f,addable:s,mergedSize:x,renderNameListRef:u,onRender:c,$slots:{default:v,prefix:y,suffix:S}}=this;c==null||c();const p=v?Q(v()).filter(b=>b.type.__TAB_PANE__===!0):[],h=v?Q(v()).filter(b=>b.type.__TAB__===!0):[],R=!h.length,C=n==="card",L=n==="segment",z=!C&&!L&&this.justifyContent;u.value=[];const _=()=>{const b=d("div",{style:this.tabWrapperStyle,class:[`${e}-tabs-wrapper`]},z?null:d("div",{class:`${e}-tabs-scroll-padding`,style:{width:`${this.tabsPadding}px`}}),R?p.map((w,E)=>(u.value.push(w.props.name),ne(d(re,Object.assign({},w.props,{internalCreatedByPane:!0,internalLeftPadded:E!==0&&(!z||z==="center"||z==="start"||z==="end")}),w.children?{default:w.children.tab}:void 0)))):h.map((w,E)=>(u.value.push(w.props.name),ne(E!==0&&!z?we(w):w))),!f&&s&&C?ye(s,(R?p.length:h.length)!==0):null,z?null:d("div",{class:`${e}-tabs-scroll-padding`,style:{width:`${this.tabsPadding}px`}}));return d("div",{ref:"tabsElRef",class:`${e}-tabs-nav-scroll-content`},C&&s?d(he,{onResize:this.handleTabsResize},{default:()=>b}):b,C?d("div",{class:`${e}-tabs-pad`}):null,C?null:d("div",{ref:"barElRef",class:`${e}-tabs-bar`}))};return d("div",{class:[`${e}-tabs`,this.themeClass,`${e}-tabs--${n}-type`,`${e}-tabs--${x}-size`,z&&`${e}-tabs--flex`,`${e}-tabs--${o}`],style:this.cssVars},d("div",{class:[`${e}-tabs-nav--${n}-type`,`${e}-tabs-nav--${o}`,`${e}-tabs-nav`]},pe(y,b=>b&&d("div",{class:`${e}-tabs-nav__prefix`},b)),L?d("div",{class:`${e}-tabs-rail`,ref:"tabsRailElRef"},R?p.map((b,w)=>(u.value.push(b.props.name),d(re,Object.assign({},b.props,{internalCreatedByPane:!0,internalLeftPadded:w!==0}),b.children?{default:b.children.tab}:void 0))):h.map((b,w)=>(u.value.push(b.props.name),w===0?b:we(b)))):d(he,{onResize:this.handleNavResize},{default:()=>d("div",{class:`${e}-tabs-nav-scroll-wrapper`,ref:"scrollWrapperElRef"},["top","bottom"].includes(o)?d(Et,{ref:"xScrollInstRef",onScroll:this.handleScroll},{default:_}):d("div",{class:`${e}-tabs-nav-y-scroll`},_()))}),f&&s&&C?ye(s,!0):null,pe(S,b=>b&&d("div",{class:`${e}-tabs-nav__suffix`},b))),R&&(this.animated?d("div",{ref:"tabsPaneWrapperRef",class:`${e}-tabs-pane-wrapper`},xe(p,this.mergedValue,this.renderedNames,this.onAnimationBeforeLeave,this.onAnimationEnter,this.onAnimationAfterEnter,this.animationDirection)):xe(p,this.mergedValue,this.renderedNames)))}});function xe(e,n,o,f,s,x,u){const c=[];return e.forEach(v=>{const{name:y,displayDirective:S,"display-directive":p}=v.props,h=C=>S===C||p===C,R=n===y;if(v.key!==void 0&&(v.key=y),R||h("show")||h("show:lazy")&&o.has(y)){o.has(y)||o.add(y);const C=!h("if");c.push(C?_t(v,[[Wt,R]]):v)}}),u?d(Lt,{name:`${u}-transition`,onBeforeLeave:f,onEnter:s,onAfterEnter:x},{default:()=>c}):c}function ye(e,n){return d(re,{ref:"addTabInstRef",key:"__addable",name:"__addable",internalCreatedByPane:!0,internalAddable:!0,internalLeftPadded:n,disabled:typeof e=="object"&&e.disabled})}function we(e){const n=At(e);return n.props?n.props.internalLeftPadded=!0:n.props={internalLeftPadded:!0},n}function ne(e){return Array.isArray(e.dynamicProps)?e.dynamicProps.includes("internalLeftPadded")||e.dynamicProps.push("internalLeftPadded"):e.dynamicProps=["internalLeftPadded"],e}export{Zt as _,ea as a};
