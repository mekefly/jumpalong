import{aE as le,d9 as ee,b4 as re,f as C,j as f,m as W,da as J,aD as E,bc as ae,x as Ae,ba as Ve,c as k,d as T,a as R,b as z,e as Ke,bi as Ee,h as I,au as P,db as De,ap as $,n as S,aw as H,aK as U,b1 as He,o as B,aH as D,p as q,dc as Ue,q as se,v as qe,av as Ge,aI as We,w as Je,l as Qe,u as Xe,dd as de,bA as Ye,r as L,bk as Ze,bT as ce,bl as en,bm as ne}from"./index.de60ca02.js";import{a as nn,h as G,c as on}from"./create.2deeaf6a.js";import{F as tn}from"./Checkmark.93029895.js";import{V as ln}from"./Tag.be4c6b01.js";import{_ as rn}from"./Empty.316516f4.js";import{c as an}from"./create-ref-setter.fe4a2903.js";function j(e){const t=e.filter(o=>o!==void 0);if(t.length!==0)return t.length===1?t[0]:o=>{e.forEach(l=>{l&&l(o)})}}function sn(e,t){t&&(le(()=>{const{value:o}=e;o&&ee.registerHandler(o,t)}),re(()=>{const{value:o}=e;o&&ee.unregisterHandler(o)}))}const dn=C({props:{onFocus:Function,onBlur:Function},setup(e){return()=>f("div",{style:"width: 0; height: 0",tabindex:0,onFocus:e.onFocus,onBlur:e.onBlur})}});function cn(e,t){return f(Ve,{name:"fade-in-scale-up-transition"},{default:()=>e?f(Ae,{clsPrefix:t,class:`${t}-base-select-option__check`},{default:()=>f(tn)}):null})}const oe=C({name:"NBaseSelectOption",props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0}},setup(e){const{valueRef:t,pendingTmNodeRef:o,multipleRef:l,valueSetRef:s,renderLabelRef:c,renderOptionRef:r,labelFieldRef:a,valueFieldRef:h,showCheckmarkRef:b,nodePropsRef:x,handleOptionClick:M,handleOptionMouseEnter:u}=W(J),y=E(()=>{const{value:v}=o;return v?e.tmNode.key===v.key:!1});function d(v){const{tmNode:p}=e;p.disabled||M(v,p)}function g(v){const{tmNode:p}=e;p.disabled||u(v,p)}function w(v){const{tmNode:p}=e,{value:O}=y;p.disabled||O||u(v,p)}return{multiple:l,isGrouped:E(()=>{const{tmNode:v}=e,{parent:p}=v;return p&&p.rawNode.type==="group"}),showCheckmark:b,nodeProps:x,isPending:y,isSelected:E(()=>{const{value:v}=t,{value:p}=l;if(v===null)return!1;const O=e.tmNode.rawNode[h.value];if(p){const{value:V}=s;return V.has(O)}else return v===O}),labelField:a,renderLabel:c,renderOption:r,handleMouseMove:w,handleMouseEnter:g,handleClick:d}},render(){const{clsPrefix:e,tmNode:{rawNode:t},isSelected:o,isPending:l,isGrouped:s,showCheckmark:c,nodeProps:r,renderOption:a,renderLabel:h,handleClick:b,handleMouseEnter:x,handleMouseMove:M}=this,u=cn(o,e),y=h?[h(t,o),c&&u]:[ae(t[this.labelField],t,o),c&&u],d=r==null?void 0:r(t),g=f("div",Object.assign({},d,{class:[`${e}-base-select-option`,t.class,d==null?void 0:d.class,{[`${e}-base-select-option--disabled`]:t.disabled,[`${e}-base-select-option--selected`]:o,[`${e}-base-select-option--grouped`]:s,[`${e}-base-select-option--pending`]:l,[`${e}-base-select-option--show-checkmark`]:c}],style:[(d==null?void 0:d.style)||"",t.style||""],onClick:j([b,d==null?void 0:d.onClick]),onMouseenter:j([x,d==null?void 0:d.onMouseenter]),onMousemove:j([M,d==null?void 0:d.onMousemove])}),f("div",{class:`${e}-base-select-option__content`},y));return t.render?t.render({node:g,option:t,selected:o}):a?a({node:g,option:t,selected:o}):g}}),te=C({name:"NBaseSelectGroupHeader",props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0}},setup(){const{renderLabelRef:e,renderOptionRef:t,labelFieldRef:o,nodePropsRef:l}=W(J);return{labelField:o,nodeProps:l,renderLabel:e,renderOption:t}},render(){const{clsPrefix:e,renderLabel:t,renderOption:o,nodeProps:l,tmNode:{rawNode:s}}=this,c=l==null?void 0:l(s),r=t?t(s,!1):ae(s[this.labelField],s,!1),a=f("div",Object.assign({},c,{class:[`${e}-base-select-group-header`,c==null?void 0:c.class]}),r);return s.render?s.render({node:a,option:s}):o?o({node:a,option:s,selected:!1}):a}}),un=k("base-select-menu",`
 line-height: 1.5;
 outline: none;
 z-index: 0;
 position: relative;
 border-radius: var(--n-border-radius);
 transition:
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 background-color: var(--n-color);
`,[k("scrollbar",`
 max-height: var(--n-height);
 `),k("virtual-list",`
 max-height: var(--n-height);
 `),k("base-select-option",`
 min-height: var(--n-option-height);
 font-size: var(--n-option-font-size);
 display: flex;
 align-items: center;
 `,[T("content",`
 z-index: 1;
 white-space: nowrap;
 text-overflow: ellipsis;
 overflow: hidden;
 `)]),k("base-select-group-header",`
 min-height: var(--n-option-height);
 font-size: .93em;
 display: flex;
 align-items: center;
 `),k("base-select-menu-option-wrapper",`
 position: relative;
 width: 100%;
 `),T("loading, empty",`
 display: flex;
 padding: 12px 32px;
 flex: 1;
 justify-content: center;
 `),T("loading",`
 color: var(--n-loading-color);
 font-size: var(--n-loading-size);
 `),T("action",`
 padding: 8px var(--n-option-padding-left);
 font-size: var(--n-option-font-size);
 transition: 
 color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 border-top: 1px solid var(--n-action-divider-color);
 color: var(--n-action-text-color);
 `),k("base-select-group-header",`
 position: relative;
 cursor: default;
 padding: var(--n-option-padding);
 color: var(--n-group-header-text-color);
 `),k("base-select-option",`
 cursor: pointer;
 position: relative;
 padding: var(--n-option-padding);
 transition:
 color .3s var(--n-bezier),
 opacity .3s var(--n-bezier);
 box-sizing: border-box;
 color: var(--n-option-text-color);
 opacity: 1;
 `,[R("show-checkmark",`
 padding-right: calc(var(--n-option-padding-right) + 20px);
 `),z("&::before",`
 content: "";
 position: absolute;
 left: 4px;
 right: 4px;
 top: 0;
 bottom: 0;
 border-radius: var(--n-border-radius);
 transition: background-color .3s var(--n-bezier);
 `),z("&:active",`
 color: var(--n-option-text-color-pressed);
 `),R("grouped",`
 padding-left: calc(var(--n-option-padding-left) * 1.5);
 `),R("pending",[z("&::before",`
 background-color: var(--n-option-color-pending);
 `)]),R("selected",`
 color: var(--n-option-text-color-active);
 `,[z("&::before",`
 background-color: var(--n-option-color-active);
 `),R("pending",[z("&::before",`
 background-color: var(--n-option-color-active-pending);
 `)])]),R("disabled",`
 cursor: not-allowed;
 `,[Ke("selected",`
 color: var(--n-option-text-color-disabled);
 `),R("selected",`
 opacity: var(--n-option-opacity-disabled);
 `)]),T("check",`
 font-size: 16px;
 position: absolute;
 right: calc(var(--n-option-padding-right) - 4px);
 top: calc(50% - 7px);
 color: var(--n-option-check-color);
 transition: color .3s var(--n-bezier);
 `,[Ee({enterScale:"0.5"})])])]),fn=C({name:"InternalSelectMenu",props:Object.assign(Object.assign({},I.props),{clsPrefix:{type:String,required:!0},scrollable:{type:Boolean,default:!0},treeMate:{type:Object,required:!0},multiple:Boolean,size:{type:String,default:"medium"},value:{type:[String,Number,Array],default:null},autoPending:Boolean,virtualScroll:{type:Boolean,default:!0},show:{type:Boolean,default:!0},labelField:{type:String,default:"label"},valueField:{type:String,default:"value"},loading:Boolean,focusable:Boolean,renderLabel:Function,renderOption:Function,nodeProps:Function,showCheckmark:{type:Boolean,default:!0},onMousedown:Function,onScroll:Function,onFocus:Function,onBlur:Function,onKeyup:Function,onKeydown:Function,onTabOut:Function,onMouseenter:Function,onMouseleave:Function,onResize:Function,resetMenuOnOptionsChange:{type:Boolean,default:!0},inlineThemeDisabled:Boolean,onToggle:Function}),setup(e){const t=I("InternalSelectMenu","-internal-select-menu",un,De,e,P(e,"clsPrefix")),o=$(null),l=$(null),s=$(null),c=S(()=>e.treeMate.getFlattenedNodes()),r=S(()=>nn(c.value)),a=$(null);function h(){const{treeMate:n}=e;let i=null;const{value:m}=e;m===null?i=n.getFirstAvailableNode():(e.multiple?i=n.getNode((m||[])[(m||[]).length-1]):i=n.getNode(m),(!i||i.disabled)&&(i=n.getFirstAvailableNode())),_(i||null)}function b(){const{value:n}=a;n&&!e.treeMate.getNode(n.key)&&(a.value=null)}let x;H(()=>e.show,n=>{n?x=H(()=>e.treeMate,()=>{e.resetMenuOnOptionsChange?(e.autoPending?h():b(),U(X)):b()},{immediate:!0}):x==null||x()},{immediate:!0}),re(()=>{x==null||x()});const M=S(()=>He(t.value.self[B("optionHeight",e.size)])),u=S(()=>D(t.value.self[B("padding",e.size)])),y=S(()=>e.multiple&&Array.isArray(e.value)?new Set(e.value):new Set),d=S(()=>{const n=c.value;return n&&n.length===0});function g(n){const{onToggle:i}=e;i&&i(n)}function w(n){const{onScroll:i}=e;i&&i(n)}function v(n){var i;(i=s.value)===null||i===void 0||i.sync(),w(n)}function p(){var n;(n=s.value)===null||n===void 0||n.sync()}function O(){const{value:n}=a;return n||null}function V(n,i){i.disabled||_(i,!1)}function pe(n,i){i.disabled||g(i)}function ve(n){var i;G(n,"action")||(i=e.onKeyup)===null||i===void 0||i.call(e,n)}function he(n){var i;G(n,"action")||(i=e.onKeydown)===null||i===void 0||i.call(e,n)}function ge(n){var i;(i=e.onMousedown)===null||i===void 0||i.call(e,n),!e.focusable&&n.preventDefault()}function me(){const{value:n}=a;n&&_(n.getNext({loop:!0}),!0)}function be(){const{value:n}=a;n&&_(n.getPrev({loop:!0}),!0)}function _(n,i=!1){a.value=n,i&&X()}function X(){var n,i;const m=a.value;if(!m)return;const F=r.value(m.key);F!==null&&(e.virtualScroll?(n=l.value)===null||n===void 0||n.scrollTo({index:F}):(i=s.value)===null||i===void 0||i.scrollTo({index:F,elSize:M.value}))}function ye(n){var i,m;!((i=o.value)===null||i===void 0)&&i.contains(n.target)&&((m=e.onFocus)===null||m===void 0||m.call(e,n))}function xe(n){var i,m;!((i=o.value)===null||i===void 0)&&i.contains(n.relatedTarget)||(m=e.onBlur)===null||m===void 0||m.call(e,n)}q(J,{handleOptionMouseEnter:V,handleOptionClick:pe,valueSetRef:y,pendingTmNodeRef:a,nodePropsRef:P(e,"nodeProps"),showCheckmarkRef:P(e,"showCheckmark"),multipleRef:P(e,"multiple"),valueRef:P(e,"value"),renderLabelRef:P(e,"renderLabel"),renderOptionRef:P(e,"renderOption"),labelFieldRef:P(e,"labelField"),valueFieldRef:P(e,"valueField")}),q(Ue,o),le(()=>{const{value:n}=s;n&&n.sync()});const Y=S(()=>{const{size:n}=e,{common:{cubicBezierEaseInOut:i},self:{height:m,borderRadius:F,color:we,groupHeaderTextColor:Pe,actionDividerColor:Se,optionTextColorPressed:ke,optionTextColor:Re,optionTextColorDisabled:Oe,optionTextColorActive:Ne,optionOpacityDisabled:Ce,optionCheckColor:_e,actionTextColor:Fe,optionColorPending:Te,optionColorActive:ze,loadingColor:Be,loadingSize:Le,optionColorActivePending:$e,[B("optionFontSize",n)]:je,[B("optionHeight",n)]:Ie,[B("optionPadding",n)]:K}}=t.value;return{"--n-height":m,"--n-action-divider-color":Se,"--n-action-text-color":Fe,"--n-bezier":i,"--n-border-radius":F,"--n-color":we,"--n-option-font-size":je,"--n-group-header-text-color":Pe,"--n-option-check-color":_e,"--n-option-color-pending":Te,"--n-option-color-active":ze,"--n-option-color-active-pending":$e,"--n-option-height":Ie,"--n-option-opacity-disabled":Ce,"--n-option-text-color":Re,"--n-option-text-color-active":Ne,"--n-option-text-color-disabled":Oe,"--n-option-text-color-pressed":ke,"--n-option-padding":K,"--n-option-padding-left":D(K,"left"),"--n-option-padding-right":D(K,"right"),"--n-loading-color":Be,"--n-loading-size":Le}}),{inlineThemeDisabled:Z}=e,N=Z?se("internal-select-menu",S(()=>e.size[0]),Y,e):void 0,Me={selfRef:o,next:me,prev:be,getPendingTmNode:O};return sn(o,e.onResize),Object.assign({mergedTheme:t,virtualListRef:l,scrollbarRef:s,itemSize:M,padding:u,flattenedNodes:c,empty:d,virtualListContainer(){const{value:n}=l;return n==null?void 0:n.listElRef},virtualListContent(){const{value:n}=l;return n==null?void 0:n.itemsElRef},doScroll:w,handleFocusin:ye,handleFocusout:xe,handleKeyUp:ve,handleKeyDown:he,handleMouseDown:ge,handleVirtualListResize:p,handleVirtualListScroll:v,cssVars:Z?void 0:Y,themeClass:N==null?void 0:N.themeClass,onRender:N==null?void 0:N.onRender},Me)},render(){const{$slots:e,virtualScroll:t,clsPrefix:o,mergedTheme:l,themeClass:s,onRender:c}=this;return c==null||c(),f("div",{ref:"selfRef",tabindex:this.focusable?0:-1,class:[`${o}-base-select-menu`,s,this.multiple&&`${o}-base-select-menu--multiple`],style:this.cssVars,onFocusin:this.handleFocusin,onFocusout:this.handleFocusout,onKeyup:this.handleKeyUp,onKeydown:this.handleKeyDown,onMousedown:this.handleMouseDown,onMouseenter:this.onMouseenter,onMouseleave:this.onMouseleave},this.loading?f("div",{class:`${o}-base-select-menu__loading`},f(Ge,{clsPrefix:o,strokeWidth:20})):this.empty?f("div",{class:`${o}-base-select-menu__empty`,"data-empty":!0},Je(e.empty,()=>[f(rn,{theme:l.peers.Empty,themeOverrides:l.peerOverrides.Empty})])):f(We,{ref:"scrollbarRef",theme:l.peers.Scrollbar,themeOverrides:l.peerOverrides.Scrollbar,scrollable:this.scrollable,container:t?this.virtualListContainer:void 0,content:t?this.virtualListContent:void 0,onScroll:t?void 0:this.doScroll},{default:()=>t?f(ln,{ref:"virtualListRef",class:`${o}-virtual-list`,items:this.flattenedNodes,itemSize:this.itemSize,showScrollbar:!1,paddingTop:this.padding.top,paddingBottom:this.padding.bottom,onResize:this.handleVirtualListResize,onScroll:this.handleVirtualListScroll,itemResizable:!0},{default:({item:r})=>r.isGroup?f(te,{key:r.key,clsPrefix:o,tmNode:r}):r.ignored?null:f(oe,{clsPrefix:o,key:r.key,tmNode:r})}):f("div",{class:`${o}-base-select-menu-option-wrapper`,style:{paddingTop:this.padding.top,paddingBottom:this.padding.bottom}},this.flattenedNodes.map(r=>r.isGroup?f(te,{key:r.key,clsPrefix:o,tmNode:r}):f(oe,{clsPrefix:o,key:r.key,tmNode:r})))}),qe(e.action,r=>r&&[f("div",{class:`${o}-base-select-menu__action`,"data-action":!0,key:"action"},r),f(dn,{onFocus:this.onTabOut,key:"focus-detector"})]))}});function A(e){return e.type==="group"}function ue(e){return e.type==="ignored"}function Pn(e,t){try{return!!(1+t.toString().toLowerCase().indexOf(e.trim().toLowerCase()))}catch{return!1}}function pn(e,t){return{getIsGroup:A,getIgnored:ue,getKey(l){return A(l)?l.name||l.key||"key-required":l[e]},getChildren(l){return l[t]}}}function Sn(e,t,o,l){if(!t)return e;function s(c){if(!Array.isArray(c))return[];const r=[];for(const a of c)if(A(a)){const h=s(a[l]);h.length&&r.push(Object.assign({},a,{[l]:h}))}else{if(ue(a))continue;t(o,a)&&r.push(a)}return r}return s(e)}function kn(e,t,o){const l=new Map;return e.forEach(s=>{A(s)?s[o].forEach(c=>{l.set(c[t],c)}):l.set(s[t],s)}),l}const fe=Qe("n-popselect"),vn=k("popselect-menu",`
 box-shadow: var(--n-menu-box-shadow);
`),Q={multiple:Boolean,value:{type:[String,Number,Array],default:null},cancelable:Boolean,options:{type:Array,default:()=>[]},size:{type:String,default:"medium"},scrollable:Boolean,"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],onMouseenter:Function,onMouseleave:Function,renderLabel:Function,showCheckmark:{type:Boolean,default:void 0},nodeProps:Function,virtualScroll:Boolean,onChange:[Function,Array]},ie=Ye(Q),hn=C({name:"PopselectPanel",props:Q,setup(e){const t=W(fe),{mergedClsPrefixRef:o,inlineThemeDisabled:l}=Xe(e),s=I("Popselect","-pop-select",vn,de,t.props,o),c=S(()=>on(e.options,pn("value","children")));function r(u,y){const{onUpdateValue:d,"onUpdate:value":g,onChange:w}=e;d&&L(d,u,y),g&&L(g,u,y),w&&L(w,u,y)}function a(u){b(u.key)}function h(u){G(u,"action")||u.preventDefault()}function b(u){const{value:{getNode:y}}=c;if(e.multiple)if(Array.isArray(e.value)){const d=[],g=[];let w=!0;e.value.forEach(v=>{if(v===u){w=!1;return}const p=y(v);p&&(d.push(p.key),g.push(p.rawNode))}),w&&(d.push(u),g.push(y(u).rawNode)),r(d,g)}else{const d=y(u);d&&r([u],[d.rawNode])}else if(e.value===u&&e.cancelable)r(null,null);else{const d=y(u);d&&r(u,d.rawNode);const{"onUpdate:show":g,onUpdateShow:w}=t.props;g&&L(g,!1),w&&L(w,!1),t.setShow(!1)}U(()=>{t.syncPosition()})}H(P(e,"options"),()=>{U(()=>{t.syncPosition()})});const x=S(()=>{const{self:{menuBoxShadow:u}}=s.value;return{"--n-menu-box-shadow":u}}),M=l?se("select",void 0,x,t.props):void 0;return{mergedTheme:t.mergedThemeRef,mergedClsPrefix:o,treeMate:c,handleToggle:a,handleMenuMousedown:h,cssVars:l?void 0:x,themeClass:M==null?void 0:M.themeClass,onRender:M==null?void 0:M.onRender}},render(){var e;return(e=this.onRender)===null||e===void 0||e.call(this),f(fn,{clsPrefix:this.mergedClsPrefix,focusable:!0,nodeProps:this.nodeProps,class:[`${this.mergedClsPrefix}-popselect-menu`,this.themeClass],style:this.cssVars,theme:this.mergedTheme.peers.InternalSelectMenu,themeOverrides:this.mergedTheme.peerOverrides.InternalSelectMenu,multiple:this.multiple,treeMate:this.treeMate,size:this.size,value:this.value,virtualScroll:this.virtualScroll,scrollable:this.scrollable,renderLabel:this.renderLabel,onToggle:this.handleToggle,onMouseenter:this.onMouseenter,onMouseleave:this.onMouseenter,onMousedown:this.handleMenuMousedown,showCheckmark:this.showCheckmark},{action:()=>{var t,o;return((o=(t=this.$slots).action)===null||o===void 0?void 0:o.call(t))||[]},empty:()=>{var t,o;return((o=(t=this.$slots).empty)===null||o===void 0?void 0:o.call(t))||[]}})}}),gn=Object.assign(Object.assign(Object.assign(Object.assign({},I.props),ce(ne,["showArrow","arrow"])),{placement:Object.assign(Object.assign({},ne.placement),{default:"bottom"}),trigger:{type:String,default:"hover"}}),Q),Rn=C({name:"Popselect",props:gn,inheritAttrs:!1,__popover__:!0,setup(e){const t=I("Popselect","-popselect",void 0,de,e),o=$(null);function l(){var r;(r=o.value)===null||r===void 0||r.syncPosition()}function s(r){var a;(a=o.value)===null||a===void 0||a.setShow(r)}return q(fe,{props:e,mergedThemeRef:t,syncPosition:l,setShow:s}),Object.assign(Object.assign({},{syncPosition:l,setShow:s}),{popoverInstRef:o,mergedTheme:t})},render(){const{mergedTheme:e}=this,t={theme:e.peers.Popover,themeOverrides:e.peerOverrides.Popover,builtinThemeOverrides:{padding:"0"},ref:"popoverInstRef",internalRenderBody:(o,l,s,c,r)=>{const{$attrs:a}=this;return f(hn,Object.assign({},a,{class:[a.class,o],style:[a.style,s]},Ze(this.$props,ie),{ref:an(l),onMouseenter:j([c,a.onMouseenter]),onMouseleave:j([r,a.onMouseleave])}),{action:()=>{var h,b;return(b=(h=this.$slots).action)===null||b===void 0?void 0:b.call(h)},empty:()=>{var h,b;return(b=(h=this.$slots).empty)===null||b===void 0?void 0:b.call(h)}})}};return f(en,Object.assign({},ce(this.$props,ie),t,{internalDeactivateImmediately:!0}),{trigger:()=>{var o,l;return(l=(o=this.$slots).default)===null||l===void 0?void 0:l.call(o)}})}});export{fn as N,Rn as _,pn as a,kn as c,Sn as f,Pn as p,sn as u};
