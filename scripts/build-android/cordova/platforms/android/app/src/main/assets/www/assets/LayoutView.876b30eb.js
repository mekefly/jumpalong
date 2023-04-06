import{f as B,j as d,l as re,c as h,a as P,h as Y,ap as F,u as ue,cx as be,p as Q,cy as Be,n as p,q as me,aI as Ve,d as m,b as S,x as Ee,m as G,by as ve,aB as pe,au as ce,r as D,bc as Z,L as he,aD as ge,c8 as eo,c5 as Fe,bA as xe,bk as fe,e as ie,c6 as oo,cz as to,aG as $e,bV as no,y as T,I as O,H as v,A,aP as _,F as J,C as k,aY as se,D as oe,c3 as Re,cA as Pe,O as V,G as te,bX as ro,bY as lo,bF as io,cB as ao,_ as _e,cC as co,bl as so,cD as uo,Q as we,aw as de,ab as Ae,aq as mo,z as ee,c4 as ho,cg as vo,aX as fo,cE as po,R as go,a4 as bo,bs as j,aO as xo,cF as _o,cG as wo,cH as yo,cI as Co,br as zo,cJ as So,K as ko,B as Io,M as $o}from"./index.de60ca02.js";import{F as Ro}from"./Favicon.d50cbcc4.js";import{C as Po}from"./CloudUpload.92ef62d3.js";import{N as ne}from"./Icon.919891f2.js";import{_ as Ao}from"./Empty.316516f4.js";import{h as To,f as Ho}from"./use.9a2f80b1.js";import{E as No}from"./Ellipsis.e5fc37f4.js";import{M as Te}from"./MdSearch.ac61994b.js";import{_ as Lo}from"./Input.cc4eb912.js";import{C as Mo,_ as je}from"./Dropdown.fb4da711.js";import{r as q}from"./naiveUi.3b033277.js";import{u as Oo}from"./composables.0dd76f13.js";import{c as Bo}from"./create.2deeaf6a.js";import{_ as He,a as Ne}from"./ThemeButton.vue_vue_type_script_setup_true_lang.e34b8d0d.js";import{_ as Vo,a as Eo}from"./DrawerContent.4dbf8f07.js";import{u as Fo}from"./use-theme-vars.c1c11cee.js";import"./autoAddRelayurlByEventIdStaff.73b12553.js";import"./getCacheStaff.283a43f7.js";import"./create-ref-setter.fe4a2903.js";const jo=B({name:"ChevronDownFilled",render(){return d("svg",{viewBox:"0 0 16 16",fill:"none",xmlns:"http://www.w3.org/2000/svg"},d("path",{d:"M3.20041 5.73966C3.48226 5.43613 3.95681 5.41856 4.26034 5.70041L8 9.22652L11.7397 5.70041C12.0432 5.41856 12.5177 5.43613 12.7996 5.73966C13.0815 6.0432 13.0639 6.51775 12.7603 6.7996L8.51034 10.7996C8.22258 11.0668 7.77743 11.0668 7.48967 10.7996L3.23966 6.7996C2.93613 6.51775 2.91856 6.0432 3.20041 5.73966Z",fill:"currentColor"}))}}),Ke=re("n-layout-sider"),ye={type:String,default:"static"},Ko=h("layout",`
 color: var(--n-text-color);
 background-color: var(--n-color);
 box-sizing: border-box;
 position: relative;
 z-index: auto;
 flex: auto;
 overflow: hidden;
 transition:
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
`,[h("layout-scroll-container",`
 overflow-x: hidden;
 box-sizing: border-box;
 height: 100%;
 `),P("absolute-positioned",`
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `)]),Do={embedded:Boolean,position:ye,nativeScrollbar:{type:Boolean,default:!0},scrollbarProps:Object,onScroll:Function,contentStyle:{type:[String,Object],default:""},hasSider:Boolean,siderPlacement:{type:String,default:"left"}},De=re("n-layout");function Uo(e){return B({name:e?"LayoutContent":"Layout",props:Object.assign(Object.assign({},Y.props),Do),setup(o){const t=F(null),i=F(null),{mergedClsPrefixRef:a,inlineThemeDisabled:r}=ue(o),u=Y("Layout","-layout",Ko,be,o,a);function s(z,R){if(o.nativeScrollbar){const{value:M}=t;M&&(R===void 0?M.scrollTo(z):M.scrollTo(z,R))}else{const{value:M}=i;M&&M.scrollTo(z,R)}}Q(De,o);let c=0,f=0;const N=z=>{var R;const M=z.target;c=M.scrollLeft,f=M.scrollTop,(R=o.onScroll)===null||R===void 0||R.call(o,z)};Be(()=>{if(o.nativeScrollbar){const z=t.value;z&&(z.scrollTop=f,z.scrollLeft=c)}});const $={display:"flex",flexWrap:"nowrap",width:"100%",flexDirection:"row"},x={scrollTo:s},C=p(()=>{const{common:{cubicBezierEaseInOut:z},self:R}=u.value;return{"--n-bezier":z,"--n-color":o.embedded?R.colorEmbedded:R.color,"--n-text-color":R.textColor}}),b=r?me("layout",p(()=>o.embedded?"e":""),C,o):void 0;return Object.assign({mergedClsPrefix:a,scrollableElRef:t,scrollbarInstRef:i,hasSiderStyle:$,mergedTheme:u,handleNativeElScroll:N,cssVars:r?void 0:C,themeClass:b==null?void 0:b.themeClass,onRender:b==null?void 0:b.onRender},x)},render(){var o;const{mergedClsPrefix:t,hasSider:i}=this;(o=this.onRender)===null||o===void 0||o.call(this);const a=i?this.hasSiderStyle:void 0,r=[this.themeClass,e&&`${t}-layout-content`,`${t}-layout`,`${t}-layout--${this.position}-positioned`];return d("div",{class:r,style:this.cssVars},this.nativeScrollbar?d("div",{ref:"scrollableElRef",class:`${t}-layout-scroll-container`,style:[this.contentStyle,a],onScroll:this.handleNativeElScroll},this.$slots):d(Ve,Object.assign({},this.scrollbarProps,{onScroll:this.onScroll,ref:"scrollbarInstRef",theme:this.mergedTheme.peers.Scrollbar,themeOverrides:this.mergedTheme.peerOverrides.Scrollbar,contentStyle:[this.contentStyle,a]}),this.$slots))}})}const qo=Uo(!1),Go=h("layout-header",`
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 box-sizing: border-box;
 width: 100%;
 background-color: var(--n-color);
 color: var(--n-text-color);
`,[P("absolute-positioned",`
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 `),P("bordered",`
 border-bottom: solid 1px var(--n-border-color);
 `)]),Yo={position:ye,inverted:Boolean,bordered:{type:Boolean,default:!1}},Wo=B({name:"LayoutHeader",props:Object.assign(Object.assign({},Y.props),Yo),setup(e){const{mergedClsPrefixRef:o,inlineThemeDisabled:t}=ue(e),i=Y("Layout","-layout-header",Go,be,e,o),a=p(()=>{const{common:{cubicBezierEaseInOut:u},self:s}=i.value,c={"--n-bezier":u};return e.inverted?(c["--n-color"]=s.headerColorInverted,c["--n-text-color"]=s.textColorInverted,c["--n-border-color"]=s.headerBorderColorInverted):(c["--n-color"]=s.headerColor,c["--n-text-color"]=s.textColor,c["--n-border-color"]=s.headerBorderColor),c}),r=t?me("layout-header",p(()=>e.inverted?"a":"b"),a,e):void 0;return{mergedClsPrefix:o,cssVars:t?void 0:a,themeClass:r==null?void 0:r.themeClass,onRender:r==null?void 0:r.onRender}},render(){var e;const{mergedClsPrefix:o}=this;return(e=this.onRender)===null||e===void 0||e.call(this),d("div",{class:[`${o}-layout-header`,this.themeClass,this.position&&`${o}-layout-header--${this.position}-positioned`,this.bordered&&`${o}-layout-header--bordered`],style:this.cssVars},this.$slots)}}),Xo=h("layout-sider",`
 flex-shrink: 0;
 box-sizing: border-box;
 position: relative;
 z-index: 1;
 color: var(--n-text-color);
 transition:
 color .3s var(--n-bezier),
 border-color .3s var(--n-bezier),
 min-width .3s var(--n-bezier),
 max-width .3s var(--n-bezier),
 transform .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 background-color: var(--n-color);
 display: flex;
 justify-content: flex-end;
`,[P("bordered",[m("border",`
 content: "";
 position: absolute;
 top: 0;
 bottom: 0;
 width: 1px;
 background-color: var(--n-border-color);
 transition: background-color .3s var(--n-bezier);
 `)]),m("left-placement",[P("bordered",[m("border",`
 right: 0;
 `)])]),P("right-placement",`
 justify-content: flex-start;
 `,[P("bordered",[m("border",`
 left: 0;
 `)]),P("collapsed",[h("layout-toggle-button",[h("base-icon",`
 transform: rotate(180deg);
 `)]),h("layout-toggle-bar",[S("&:hover",[m("top",{transform:"rotate(-12deg) scale(1.15) translateY(-2px)"}),m("bottom",{transform:"rotate(12deg) scale(1.15) translateY(2px)"})])])]),h("layout-toggle-button",`
 left: 0;
 transform: translateX(-50%) translateY(-50%);
 `,[h("base-icon",`
 transform: rotate(0);
 `)]),h("layout-toggle-bar",`
 left: -28px;
 transform: rotate(180deg);
 `,[S("&:hover",[m("top",{transform:"rotate(12deg) scale(1.15) translateY(-2px)"}),m("bottom",{transform:"rotate(-12deg) scale(1.15) translateY(2px)"})])])]),P("collapsed",[h("layout-toggle-bar",[S("&:hover",[m("top",{transform:"rotate(-12deg) scale(1.15) translateY(-2px)"}),m("bottom",{transform:"rotate(12deg) scale(1.15) translateY(2px)"})])]),h("layout-toggle-button",[h("base-icon",`
 transform: rotate(0);
 `)])]),h("layout-toggle-button",`
 transition:
 color .3s var(--n-bezier),
 right .3s var(--n-bezier),
 left .3s var(--n-bezier),
 border-color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 cursor: pointer;
 width: 24px;
 height: 24px;
 position: absolute;
 top: 50%;
 right: 0;
 border-radius: 50%;
 display: flex;
 align-items: center;
 justify-content: center;
 font-size: 18px;
 color: var(--n-toggle-button-icon-color);
 border: var(--n-toggle-button-border);
 background-color: var(--n-toggle-button-color);
 box-shadow: 0 2px 4px 0px rgba(0, 0, 0, .06);
 transform: translateX(50%) translateY(-50%);
 z-index: 1;
 `,[h("base-icon",`
 transition: transform .3s var(--n-bezier);
 transform: rotate(180deg);
 `)]),h("layout-toggle-bar",`
 cursor: pointer;
 height: 72px;
 width: 32px;
 position: absolute;
 top: calc(50% - 36px);
 right: -28px;
 `,[m("top, bottom",`
 position: absolute;
 width: 4px;
 border-radius: 2px;
 height: 38px;
 left: 14px;
 transition: 
 background-color .3s var(--n-bezier),
 transform .3s var(--n-bezier);
 `),m("bottom",`
 position: absolute;
 top: 34px;
 `),S("&:hover",[m("top",{transform:"rotate(12deg) scale(1.15) translateY(-2px)"}),m("bottom",{transform:"rotate(-12deg) scale(1.15) translateY(2px)"})]),m("top, bottom",{backgroundColor:"var(--n-toggle-bar-color)"}),S("&:hover",[m("top, bottom",{backgroundColor:"var(--n-toggle-bar-color-hover)"})])]),m("border",`
 position: absolute;
 top: 0;
 right: 0;
 bottom: 0;
 width: 1px;
 transition: background-color .3s var(--n-bezier);
 `),h("layout-sider-scroll-container",`
 flex-grow: 1;
 flex-shrink: 0;
 box-sizing: border-box;
 height: 100%;
 opacity: 0;
 transition: opacity .3s var(--n-bezier);
 max-width: 100%;
 `),P("show-content",[h("layout-sider-scroll-container",{opacity:1})]),P("absolute-positioned",`
 position: absolute;
 left: 0;
 top: 0;
 bottom: 0;
 `)]),Jo=B({name:"LayoutToggleButton",props:{clsPrefix:{type:String,required:!0},onClick:Function},render(){const{clsPrefix:e}=this;return d("div",{class:`${e}-layout-toggle-button`,onClick:this.onClick},d(Ee,{clsPrefix:e},{default:()=>d(Mo,null)}))}}),Qo=B({props:{clsPrefix:{type:String,required:!0},onClick:Function},render(){const{clsPrefix:e}=this;return d("div",{onClick:this.onClick,class:`${e}-layout-toggle-bar`},d("div",{class:`${e}-layout-toggle-bar__top`}),d("div",{class:`${e}-layout-toggle-bar__bottom`}))}}),Zo={position:ye,bordered:Boolean,collapsedWidth:{type:Number,default:48},width:{type:[Number,String],default:272},contentStyle:{type:[String,Object],default:""},collapseMode:{type:String,default:"transform"},collapsed:{type:Boolean,default:void 0},defaultCollapsed:Boolean,showCollapsedContent:{type:Boolean,default:!0},showTrigger:{type:[Boolean,String],default:!1},nativeScrollbar:{type:Boolean,default:!0},inverted:Boolean,scrollbarProps:Object,triggerStyle:[String,Object],collapsedTriggerStyle:[String,Object],"onUpdate:collapsed":[Function,Array],onUpdateCollapsed:[Function,Array],onAfterEnter:Function,onAfterLeave:Function,onExpand:[Function,Array],onCollapse:[Function,Array],onScroll:Function},et=B({name:"LayoutSider",props:Object.assign(Object.assign({},Y.props),Zo),setup(e){const o=G(De),t=F(null),i=F(null),a=p(()=>ve(c.value?e.collapsedWidth:e.width)),r=p(()=>e.collapseMode!=="transform"?{}:{minWidth:ve(e.width)}),u=p(()=>o?o.siderPlacement:"left"),s=F(e.defaultCollapsed),c=pe(ce(e,"collapsed"),s);function f(L,I){if(e.nativeScrollbar){const{value:H}=t;H&&(I===void 0?H.scrollTo(L):H.scrollTo(L,I))}else{const{value:H}=i;H&&H.scrollTo(L,I)}}function N(){const{"onUpdate:collapsed":L,onUpdateCollapsed:I,onExpand:H,onCollapse:w}=e,{value:y}=c;I&&D(I,!y),L&&D(L,!y),s.value=!y,y?H&&D(H):w&&D(w)}let $=0,x=0;const C=L=>{var I;const H=L.target;$=H.scrollLeft,x=H.scrollTop,(I=e.onScroll)===null||I===void 0||I.call(e,L)};Be(()=>{if(e.nativeScrollbar){const L=t.value;L&&(L.scrollTop=x,L.scrollLeft=$)}}),Q(Ke,{collapsedRef:c,collapseModeRef:ce(e,"collapseMode")});const{mergedClsPrefixRef:b,inlineThemeDisabled:z}=ue(e),R=Y("Layout","-layout-sider",Xo,be,e,b);function M(L){var I,H;L.propertyName==="max-width"&&(c.value?(I=e.onAfterLeave)===null||I===void 0||I.call(e):(H=e.onAfterEnter)===null||H===void 0||H.call(e))}const W={scrollTo:f},U=p(()=>{const{common:{cubicBezierEaseInOut:L},self:I}=R.value,{siderToggleButtonColor:H,siderToggleButtonBorder:w,siderToggleBarColor:y,siderToggleBarColorHover:n}=I,g={"--n-bezier":L,"--n-toggle-button-color":H,"--n-toggle-button-border":w,"--n-toggle-bar-color":y,"--n-toggle-bar-color-hover":n};return e.inverted?(g["--n-color"]=I.siderColorInverted,g["--n-text-color"]=I.textColorInverted,g["--n-border-color"]=I.siderBorderColorInverted,g["--n-toggle-button-icon-color"]=I.siderToggleButtonIconColorInverted,g.__invertScrollbar=I.__invertScrollbar):(g["--n-color"]=I.siderColor,g["--n-text-color"]=I.textColor,g["--n-border-color"]=I.siderBorderColor,g["--n-toggle-button-icon-color"]=I.siderToggleButtonIconColor),g}),K=z?me("layout-sider",p(()=>e.inverted?"a":"b"),U,e):void 0;return Object.assign({scrollableElRef:t,scrollbarInstRef:i,mergedClsPrefix:b,mergedTheme:R,styleMaxWidth:a,mergedCollapsed:c,scrollContainerStyle:r,siderPlacement:u,handleNativeElScroll:C,handleTransitionend:M,handleTriggerClick:N,inlineThemeDisabled:z,cssVars:U,themeClass:K==null?void 0:K.themeClass,onRender:K==null?void 0:K.onRender},W)},render(){var e;const{mergedClsPrefix:o,mergedCollapsed:t,showTrigger:i}=this;return(e=this.onRender)===null||e===void 0||e.call(this),d("aside",{class:[`${o}-layout-sider`,this.themeClass,`${o}-layout-sider--${this.position}-positioned`,`${o}-layout-sider--${this.siderPlacement}-placement`,this.bordered&&`${o}-layout-sider--bordered`,t&&`${o}-layout-sider--collapsed`,(!t||this.showCollapsedContent)&&`${o}-layout-sider--show-content`],onTransitionend:this.handleTransitionend,style:[this.inlineThemeDisabled?void 0:this.cssVars,{maxWidth:this.styleMaxWidth,width:ve(this.width)}]},this.nativeScrollbar?d("div",{class:`${o}-layout-sider-scroll-container`,onScroll:this.handleNativeElScroll,style:[this.scrollContainerStyle,{overflow:"auto"},this.contentStyle],ref:"scrollableElRef"},this.$slots):d(Ve,Object.assign({},this.scrollbarProps,{onScroll:this.onScroll,ref:"scrollbarInstRef",style:this.scrollContainerStyle,contentStyle:this.contentStyle,theme:this.mergedTheme.peers.Scrollbar,themeOverrides:this.mergedTheme.peerOverrides.Scrollbar,builtinThemeOverrides:this.inverted&&this.cssVars.__invertScrollbar==="true"?{colorHover:"rgba(255, 255, 255, .4)",color:"rgba(255, 255, 255, .3)"}:void 0}),this.$slots),i?i==="bar"?d(Qo,{clsPrefix:o,style:t?this.collapsedTriggerStyle:this.triggerStyle,onClick:this.handleTriggerClick}):d(Jo,{clsPrefix:o,style:t?this.collapsedTriggerStyle:this.triggerStyle,onClick:this.handleTriggerClick}):null,this.bordered?d("div",{class:`${o}-layout-sider__border`}):null)}}),le=re("n-menu"),Ce=re("n-submenu"),ze=re("n-menu-item-group"),ae=8;function Se(e){const o=G(le),{props:t,mergedCollapsedRef:i}=o,a=G(Ce,null),r=G(ze,null),u=p(()=>t.mode==="horizontal"),s=p(()=>u.value?t.dropdownPlacement:"tmNodes"in e?"right-start":"right"),c=p(()=>{var x;return Math.max((x=t.collapsedIconSize)!==null&&x!==void 0?x:t.iconSize,t.iconSize)}),f=p(()=>{var x;return!u.value&&e.root&&i.value&&(x=t.collapsedIconSize)!==null&&x!==void 0?x:t.iconSize}),N=p(()=>{if(u.value)return;const{collapsedWidth:x,indent:C,rootIndent:b}=t,{root:z,isGroup:R}=e,M=b===void 0?C:b;if(z)return i.value?x/2-c.value/2:M;if(r)return C/2+r.paddingLeftRef.value;if(a)return(R?C/2:C)+a.paddingLeftRef.value}),$=p(()=>{const{collapsedWidth:x,indent:C,rootIndent:b}=t,{value:z}=c,{root:R}=e;return u.value||!R||!i.value?ae:(b===void 0?C:b)+z+ae-(x+z)/2});return{dropdownPlacement:s,activeIconSize:f,maxIconSize:c,paddingLeft:N,iconMarginRight:$,NMenu:o,NSubmenu:a}}const ke={internalKey:{type:[String,Number],required:!0},root:Boolean,isGroup:Boolean,level:{type:Number,required:!0},title:[String,Function],extra:[String,Function]},Ue=Object.assign(Object.assign({},ke),{tmNode:{type:Object,required:!0},tmNodes:{type:Array,required:!0}}),ot=B({name:"MenuOptionGroup",props:Ue,setup(e){Q(Ce,null);const o=Se(e);Q(ze,{paddingLeftRef:o.paddingLeft});const{mergedClsPrefixRef:t,props:i}=G(le);return function(){const{value:a}=t,r=o.paddingLeft.value,{nodeProps:u}=i,s=u==null?void 0:u(e.tmNode.rawNode);return d("div",{class:`${a}-menu-item-group`,role:"group"},d("div",Object.assign({},s,{class:[`${a}-menu-item-group-title`,s==null?void 0:s.class],style:[(s==null?void 0:s.style)||"",r!==void 0?`padding-left: ${r}px;`:""]}),Z(e.title),e.extra?d(he,null," ",Z(e.extra)):null),d("div",null,e.tmNodes.map(c=>Ie(c,i))))}}}),qe=B({name:"MenuOptionContent",props:{collapsed:Boolean,disabled:Boolean,title:[String,Function],icon:Function,extra:[String,Function],showArrow:Boolean,childActive:Boolean,hover:Boolean,paddingLeft:Number,selected:Boolean,maxIconSize:{type:Number,required:!0},activeIconSize:{type:Number,required:!0},iconMarginRight:{type:Number,required:!0},clsPrefix:{type:String,required:!0},onClick:Function,tmNode:{type:Object,required:!0}},setup(e){const{props:o}=G(le);return{menuProps:o,style:p(()=>{const{paddingLeft:t}=e;return{paddingLeft:t&&`${t}px`}}),iconStyle:p(()=>{const{maxIconSize:t,activeIconSize:i,iconMarginRight:a}=e;return{width:`${t}px`,height:`${t}px`,fontSize:`${i}px`,marginRight:`${a}px`}})}},render(){const{clsPrefix:e,tmNode:o,menuProps:{renderIcon:t,renderLabel:i,renderExtra:a,expandIcon:r}}=this,u=t?t(o.rawNode):Z(this.icon);return d("div",{onClick:s=>{var c;(c=this.onClick)===null||c===void 0||c.call(this,s)},role:"none",class:[`${e}-menu-item-content`,{[`${e}-menu-item-content--selected`]:this.selected,[`${e}-menu-item-content--collapsed`]:this.collapsed,[`${e}-menu-item-content--child-active`]:this.childActive,[`${e}-menu-item-content--disabled`]:this.disabled,[`${e}-menu-item-content--hover`]:this.hover}],style:this.style},u&&d("div",{class:`${e}-menu-item-content__icon`,style:this.iconStyle,role:"none"},[u]),d("div",{class:`${e}-menu-item-content-header`,role:"none"},i?i(o.rawNode):Z(this.title),this.extra||a?d("span",{class:`${e}-menu-item-content-header__extra`}," ",a?a(o.rawNode):Z(this.extra)):null),this.showArrow?d(Ee,{ariaHidden:!0,class:`${e}-menu-item-content__arrow`,clsPrefix:e},{default:()=>r?r(o.rawNode):d(jo,null)}):null)}}),Ge=Object.assign(Object.assign({},ke),{rawNodes:{type:Array,default:()=>[]},tmNodes:{type:Array,default:()=>[]},tmNode:{type:Object,required:!0},disabled:{type:Boolean,default:!1},icon:Function,onClick:Function}),tt=B({name:"Submenu",props:Ge,setup(e){const o=Se(e),{NMenu:t,NSubmenu:i}=o,{props:a,mergedCollapsedRef:r,mergedThemeRef:u}=t,s=p(()=>{const{disabled:x}=e;return i!=null&&i.mergedDisabledRef.value||a.disabled?!0:x}),c=F(!1);Q(Ce,{paddingLeftRef:o.paddingLeft,mergedDisabledRef:s}),Q(ze,null);function f(){const{onClick:x}=e;x&&x()}function N(){s.value||(r.value||t.toggleExpand(e.internalKey),f())}function $(x){c.value=x}return{menuProps:a,mergedTheme:u,doSelect:t.doSelect,inverted:t.invertedRef,isHorizontal:t.isHorizontalRef,mergedClsPrefix:t.mergedClsPrefixRef,maxIconSize:o.maxIconSize,activeIconSize:o.activeIconSize,iconMarginRight:o.iconMarginRight,dropdownPlacement:o.dropdownPlacement,dropdownShow:c,paddingLeft:o.paddingLeft,mergedDisabled:s,mergedValue:t.mergedValueRef,childActive:ge(()=>t.activePathRef.value.includes(e.internalKey)),collapsed:p(()=>a.mode==="horizontal"?!1:r.value?!0:!t.mergedExpandedKeysRef.value.includes(e.internalKey)),dropdownEnabled:p(()=>!s.value&&(a.mode==="horizontal"||r.value)),handlePopoverShowChange:$,handleClick:N}},render(){var e;const{mergedClsPrefix:o,menuProps:{renderIcon:t,renderLabel:i}}=this,a=()=>{const{isHorizontal:u,paddingLeft:s,collapsed:c,mergedDisabled:f,maxIconSize:N,activeIconSize:$,title:x,childActive:C,icon:b,handleClick:z,menuProps:{nodeProps:R},dropdownShow:M,iconMarginRight:W,tmNode:U,mergedClsPrefix:K}=this,L=R==null?void 0:R(U.rawNode);return d("div",Object.assign({},L,{class:[`${K}-menu-item`,L==null?void 0:L.class],role:"menuitem"}),d(qe,{tmNode:U,paddingLeft:s,collapsed:c,disabled:f,iconMarginRight:W,maxIconSize:N,activeIconSize:$,title:x,extra:this.extra,showArrow:!u,childActive:C,clsPrefix:K,icon:b,hover:M,onClick:z}))},r=()=>d(eo,null,{default:()=>{const{tmNodes:u,collapsed:s}=this;return s?null:d("div",{class:`${o}-submenu-children`,role:"menu"},u.map(c=>Ie(c,this.menuProps)))}});return this.root?d(je,Object.assign({size:"large",trigger:"hover"},(e=this.menuProps)===null||e===void 0?void 0:e.dropdownProps,{themeOverrides:this.mergedTheme.peerOverrides.Dropdown,theme:this.mergedTheme.peers.Dropdown,builtinThemeOverrides:{fontSizeLarge:"14px",optionIconSizeLarge:"18px"},value:this.mergedValue,disabled:!this.dropdownEnabled,placement:this.dropdownPlacement,keyField:this.menuProps.keyField,labelField:this.menuProps.labelField,childrenField:this.menuProps.childrenField,onUpdateShow:this.handlePopoverShowChange,options:this.rawNodes,onSelect:this.doSelect,inverted:this.inverted,renderIcon:t,renderLabel:i}),{default:()=>d("div",{class:`${o}-submenu`,role:"menuitem","aria-expanded":!this.collapsed},a(),this.isHorizontal?null:r())}):d("div",{class:`${o}-submenu`,role:"menuitem","aria-expanded":!this.collapsed},a(),r())}}),Ye=Object.assign(Object.assign({},ke),{tmNode:{type:Object,required:!0},disabled:Boolean,icon:Function,onClick:Function}),nt=B({name:"MenuOption",props:Ye,setup(e){const o=Se(e),{NSubmenu:t,NMenu:i}=o,{props:a,mergedClsPrefixRef:r,mergedCollapsedRef:u}=i,s=t?t.mergedDisabledRef:{value:!1},c=p(()=>s.value||e.disabled);function f($){const{onClick:x}=e;x&&x($)}function N($){c.value||(i.doSelect(e.internalKey,e.tmNode.rawNode),f($))}return{mergedClsPrefix:r,dropdownPlacement:o.dropdownPlacement,paddingLeft:o.paddingLeft,iconMarginRight:o.iconMarginRight,maxIconSize:o.maxIconSize,activeIconSize:o.activeIconSize,mergedTheme:i.mergedThemeRef,menuProps:a,dropdownEnabled:ge(()=>e.root&&u.value&&a.mode!=="horizontal"&&!c.value),selected:ge(()=>i.mergedValueRef.value===e.internalKey),mergedDisabled:c,handleClick:N}},render(){const{mergedClsPrefix:e,mergedTheme:o,tmNode:t,menuProps:{renderLabel:i,nodeProps:a}}=this,r=a==null?void 0:a(t.rawNode);return d("div",Object.assign({},r,{role:"menuitem",class:[`${e}-menu-item`,r==null?void 0:r.class]}),d(Fe,{theme:o.peers.Tooltip,themeOverrides:o.peerOverrides.Tooltip,trigger:"hover",placement:this.dropdownPlacement,disabled:!this.dropdownEnabled||this.title===void 0,internalExtraClass:["menu-tooltip"]},{default:()=>i?i(t.rawNode):Z(this.title),trigger:()=>d(qe,{tmNode:t,clsPrefix:e,paddingLeft:this.paddingLeft,iconMarginRight:this.iconMarginRight,maxIconSize:this.maxIconSize,activeIconSize:this.activeIconSize,selected:this.selected,title:this.title,extra:this.extra,disabled:this.mergedDisabled,icon:this.icon,onClick:this.handleClick})}))}}),rt=B({name:"MenuDivider",setup(){const e=G(le),{mergedClsPrefixRef:o,isHorizontalRef:t}=e;return()=>t.value?null:d("div",{class:`${o.value}-menu-divider`})}}),lt=xe(Ue),it=xe(Ye),at=xe(Ge);function We(e){return e.type==="divider"||e.type==="render"}function ct(e){return e.type==="divider"}function Ie(e,o){const{rawNode:t}=e,{show:i}=t;if(i===!1)return null;if(We(t))return ct(t)?d(rt,Object.assign({key:e.key},t.props)):null;const{labelField:a}=o,{key:r,level:u,isGroup:s}=e,c=Object.assign(Object.assign({},t),{title:t.title||t[a],extra:t.titleExtra||t.extra,key:r,internalKey:r,level:u,root:u===0,isGroup:s});return e.children?e.isGroup?d(ot,fe(c,lt,{tmNode:e,tmNodes:e.children,key:r})):d(tt,fe(c,at,{key:r,rawNodes:t[o.childrenField],tmNodes:e.children,tmNode:e})):d(nt,fe(c,it,{key:r,tmNode:e}))}const Le=[S("&::before","background-color: var(--n-item-color-hover);"),m("arrow",`
 color: var(--n-arrow-color-hover);
 `),m("icon",`
 color: var(--n-item-icon-color-hover);
 `),h("menu-item-content-header",`
 color: var(--n-item-text-color-hover);
 `,[S("a",`
 color: var(--n-item-text-color-hover);
 `),m("extra",`
 color: var(--n-item-text-color-hover);
 `)])],Me=[m("icon",`
 color: var(--n-item-icon-color-hover-horizontal);
 `),h("menu-item-content-header",`
 color: var(--n-item-text-color-hover-horizontal);
 `,[S("a",`
 color: var(--n-item-text-color-hover-horizontal);
 `),m("extra",`
 color: var(--n-item-text-color-hover-horizontal);
 `)])],st=S([h("menu",`
 background-color: var(--n-color);
 color: var(--n-item-text-color);
 overflow: hidden;
 transition: background-color .3s var(--n-bezier);
 box-sizing: border-box;
 font-size: var(--n-font-size);
 padding-bottom: 6px;
 `,[P("horizontal",`
 display: inline-flex;
 padding-bottom: 0;
 `,[h("submenu","margin: 0;"),h("menu-item","margin: 0;"),h("menu-item-content",`
 padding: 0 20px;
 border-bottom: 2px solid #0000;
 `,[S("&::before","display: none;"),P("selected","border-bottom: 2px solid var(--n-border-color-horizontal)")]),h("menu-item-content",[P("selected",[m("icon","color: var(--n-item-icon-color-active-horizontal);"),h("menu-item-content-header",`
 color: var(--n-item-text-color-active-horizontal);
 `,[S("a","color: var(--n-item-text-color-active-horizontal);"),m("extra","color: var(--n-item-text-color-active-horizontal);")])]),P("child-active",`
 border-bottom: 2px solid var(--n-border-color-horizontal);
 `,[h("menu-item-content-header",`
 color: var(--n-item-text-color-child-active-horizontal);
 `,[S("a",`
 color: var(--n-item-text-color-child-active-horizontal);
 `),m("extra",`
 color: var(--n-item-text-color-child-active-horizontal);
 `)]),m("icon",`
 color: var(--n-item-icon-color-child-active-horizontal);
 `)]),ie("disabled",[ie("selected, child-active",[S("&:focus-within",Me)]),P("selected",[X(null,[m("icon","color: var(--n-item-icon-color-active-hover-horizontal);"),h("menu-item-content-header",`
 color: var(--n-item-text-color-active-hover-horizontal);
 `,[S("a","color: var(--n-item-text-color-active-hover-horizontal);"),m("extra","color: var(--n-item-text-color-active-hover-horizontal);")])])]),P("child-active",[X(null,[m("icon","color: var(--n-item-icon-color-child-active-hover-horizontal);"),h("menu-item-content-header",`
 color: var(--n-item-text-color-child-active-hover-horizontal);
 `,[S("a","color: var(--n-item-text-color-child-active-hover-horizontal);"),m("extra","color: var(--n-item-text-color-child-active-hover-horizontal);")])])]),X("border-bottom: 2px solid var(--n-border-color-horizontal);",Me)]),h("menu-item-content-header",[S("a","color: var(--n-item-text-color-horizontal);")])])]),P("collapsed",[h("menu-item-content",[P("selected",[S("&::before",`
 background-color: var(--n-item-color-active-collapsed) !important;
 `)]),h("menu-item-content-header","opacity: 0;"),m("arrow","opacity: 0;"),m("icon","color: var(--n-item-icon-color-collapsed);")])]),h("menu-item",`
 height: var(--n-item-height);
 margin-top: 6px;
 position: relative;
 `),h("menu-item-content",`
 box-sizing: border-box;
 line-height: 1.75;
 height: 100%;
 display: grid;
 grid-template-areas: "icon content arrow";
 grid-template-columns: auto 1fr auto;
 align-items: center;
 cursor: pointer;
 position: relative;
 padding-right: 18px;
 transition:
 background-color .3s var(--n-bezier),
 padding-left .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `,[S("> *","z-index: 1;"),S("&::before",`
 z-index: auto;
 content: "";
 background-color: #0000;
 position: absolute;
 left: 8px;
 right: 8px;
 top: 0;
 bottom: 0;
 pointer-events: none;
 border-radius: var(--n-border-radius);
 transition: background-color .3s var(--n-bezier);
 `),P("disabled",`
 opacity: .45;
 cursor: not-allowed;
 `),P("collapsed",[m("arrow","transform: rotate(0);")]),P("selected",[S("&::before","background-color: var(--n-item-color-active);"),m("arrow","color: var(--n-arrow-color-active);"),m("icon","color: var(--n-item-icon-color-active);"),h("menu-item-content-header",`
 color: var(--n-item-text-color-active);
 `,[S("a","color: var(--n-item-text-color-active);"),m("extra","color: var(--n-item-text-color-active);")])]),P("child-active",[h("menu-item-content-header",`
 color: var(--n-item-text-color-child-active);
 `,[S("a",`
 color: var(--n-item-text-color-child-active);
 `),m("extra",`
 color: var(--n-item-text-color-child-active);
 `)]),m("arrow",`
 color: var(--n-arrow-color-child-active);
 `),m("icon",`
 color: var(--n-item-icon-color-child-active);
 `)]),ie("disabled",[ie("selected, child-active",[S("&:focus-within",Le)]),P("selected",[X(null,[m("arrow","color: var(--n-arrow-color-active-hover);"),m("icon","color: var(--n-item-icon-color-active-hover);"),h("menu-item-content-header",`
 color: var(--n-item-text-color-active-hover);
 `,[S("a","color: var(--n-item-text-color-active-hover);"),m("extra","color: var(--n-item-text-color-active-hover);")])])]),P("child-active",[X(null,[m("arrow","color: var(--n-arrow-color-child-active-hover);"),m("icon","color: var(--n-item-icon-color-child-active-hover);"),h("menu-item-content-header",`
 color: var(--n-item-text-color-child-active-hover);
 `,[S("a","color: var(--n-item-text-color-child-active-hover);"),m("extra","color: var(--n-item-text-color-child-active-hover);")])])]),P("selected",[X(null,[S("&::before","background-color: var(--n-item-color-active-hover);")])]),X(null,Le)]),m("icon",`
 grid-area: icon;
 color: var(--n-item-icon-color);
 transition:
 color .3s var(--n-bezier),
 font-size .3s var(--n-bezier),
 margin-right .3s var(--n-bezier);
 box-sizing: content-box;
 display: inline-flex;
 align-items: center;
 justify-content: center;
 `),m("arrow",`
 grid-area: arrow;
 font-size: 16px;
 color: var(--n-arrow-color);
 transform: rotate(180deg);
 opacity: 1;
 transition:
 color .3s var(--n-bezier),
 transform 0.2s var(--n-bezier),
 opacity 0.2s var(--n-bezier);
 `),h("menu-item-content-header",`
 grid-area: content;
 transition:
 color .3s var(--n-bezier),
 opacity .3s var(--n-bezier);
 opacity: 1;
 white-space: nowrap;
 overflow: hidden;
 text-overflow: ellipsis;
 color: var(--n-item-text-color);
 `,[S("a",`
 outline: none;
 text-decoration: none;
 transition: color .3s var(--n-bezier);
 color: var(--n-item-text-color);
 `,[S("&::before",`
 content: "";
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `)]),m("extra",`
 font-size: .93em;
 color: var(--n-group-text-color);
 transition: color .3s var(--n-bezier);
 `)])]),h("submenu",`
 cursor: pointer;
 position: relative;
 margin-top: 6px;
 `,[h("menu-item-content",`
 height: var(--n-item-height);
 `),h("submenu-children",`
 overflow: hidden;
 padding: 0;
 `,[oo({duration:".2s"})])]),h("menu-item-group",[h("menu-item-group-title",`
 margin-top: 6px;
 color: var(--n-group-text-color);
 cursor: default;
 font-size: .93em;
 height: 36px;
 display: flex;
 align-items: center;
 transition:
 padding-left .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `)])]),h("menu-tooltip",[S("a",`
 color: inherit;
 text-decoration: none;
 `)]),h("menu-divider",`
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-divider-color);
 height: 1px;
 margin: 6px 18px;
 `)]);function X(e,o){return[P("hover",e,o),S("&:hover",e,o)]}const dt=Object.assign(Object.assign({},Y.props),{options:{type:Array,default:()=>[]},collapsed:{type:Boolean,default:void 0},collapsedWidth:{type:Number,default:48},iconSize:{type:Number,default:20},collapsedIconSize:{type:Number,default:24},rootIndent:Number,indent:{type:Number,default:32},labelField:{type:String,default:"label"},keyField:{type:String,default:"key"},childrenField:{type:String,default:"children"},disabledField:{type:String,default:"disabled"},defaultExpandAll:Boolean,defaultExpandedKeys:Array,expandedKeys:Array,value:[String,Number],defaultValue:{type:[String,Number],default:null},mode:{type:String,default:"vertical"},watchProps:{type:Array,default:void 0},disabled:Boolean,show:{type:Boolean,defalut:!0},inverted:Boolean,"onUpdate:expandedKeys":[Function,Array],onUpdateExpandedKeys:[Function,Array],onUpdateValue:[Function,Array],"onUpdate:value":[Function,Array],expandIcon:Function,renderIcon:Function,renderLabel:Function,renderExtra:Function,dropdownProps:Object,accordion:Boolean,nodeProps:Function,items:Array,onOpenNamesChange:[Function,Array],onSelect:[Function,Array],onExpandedNamesChange:[Function,Array],expandedNames:Array,defaultExpandedNames:Array,dropdownPlacement:{type:String,default:"bottom"}}),ut=B({name:"Menu",props:dt,setup(e){const{mergedClsPrefixRef:o,inlineThemeDisabled:t}=ue(e),i=Y("Menu","-menu",st,to,e,o),a=G(Ke,null),r=p(()=>{var w;const{collapsed:y}=e;if(y!==void 0)return y;if(a){const{collapseModeRef:n,collapsedRef:g}=a;if(n.value==="width")return(w=g.value)!==null&&w!==void 0?w:!1}return!1}),u=p(()=>{const{keyField:w,childrenField:y,disabledField:n}=e;return Bo(e.items||e.options,{getIgnored(g){return We(g)},getChildren(g){return g[y]},getDisabled(g){return g[n]},getKey(g){var E;return(E=g[w])!==null&&E!==void 0?E:g.name}})}),s=p(()=>new Set(u.value.treeNodes.map(w=>w.key))),{watchProps:c}=e,f=F(null);c!=null&&c.includes("defaultValue")?$e(()=>{f.value=e.defaultValue}):f.value=e.defaultValue;const N=ce(e,"value"),$=pe(N,f),x=F([]),C=()=>{x.value=e.defaultExpandAll?u.value.getNonLeafKeys():e.defaultExpandedNames||e.defaultExpandedKeys||u.value.getPath($.value,{includeSelf:!1}).keyPath};c!=null&&c.includes("defaultExpandedKeys")?$e(C):C();const b=no(e,["expandedNames","expandedKeys"]),z=pe(b,x),R=p(()=>u.value.treeNodes),M=p(()=>u.value.getPath($.value).keyPath);Q(le,{props:e,mergedCollapsedRef:r,mergedThemeRef:i,mergedValueRef:$,mergedExpandedKeysRef:z,activePathRef:M,mergedClsPrefixRef:o,isHorizontalRef:p(()=>e.mode==="horizontal"),invertedRef:ce(e,"inverted"),doSelect:W,toggleExpand:K});function W(w,y){const{"onUpdate:value":n,onUpdateValue:g,onSelect:E}=e;g&&D(g,w,y),n&&D(n,w,y),E&&D(E,w,y),f.value=w}function U(w){const{"onUpdate:expandedKeys":y,onUpdateExpandedKeys:n,onExpandedNamesChange:g,onOpenNamesChange:E}=e;y&&D(y,w),n&&D(n,w),g&&D(g,w),E&&D(E,w),x.value=w}function K(w){const y=Array.from(z.value),n=y.findIndex(g=>g===w);if(~n)y.splice(n,1);else{if(e.accordion&&s.value.has(w)){const g=y.findIndex(E=>s.value.has(E));g>-1&&y.splice(g,1)}y.push(w)}U(y)}const L=w=>{const y=u.value.getPath(w!=null?w:$.value,{includeSelf:!1}).keyPath;if(!y.length)return;const n=Array.from(z.value),g=new Set([...n,...y]);e.accordion&&s.value.forEach(E=>{g.has(E)&&!y.includes(E)&&g.delete(E)}),U(Array.from(g))},I=p(()=>{const{inverted:w}=e,{common:{cubicBezierEaseInOut:y},self:n}=i.value,{borderRadius:g,borderColorHorizontal:E,fontSize:Je,itemHeight:Qe,dividerColor:Ze}=n,l={"--n-divider-color":Ze,"--n-bezier":y,"--n-font-size":Je,"--n-border-color-horizontal":E,"--n-border-radius":g,"--n-item-height":Qe};return w?(l["--n-group-text-color"]=n.groupTextColorInverted,l["--n-color"]=n.colorInverted,l["--n-item-text-color"]=n.itemTextColorInverted,l["--n-item-text-color-hover"]=n.itemTextColorHoverInverted,l["--n-item-text-color-active"]=n.itemTextColorActiveInverted,l["--n-item-text-color-child-active"]=n.itemTextColorChildActiveInverted,l["--n-item-text-color-child-active-hover"]=n.itemTextColorChildActiveInverted,l["--n-item-text-color-active-hover"]=n.itemTextColorActiveHoverInverted,l["--n-item-icon-color"]=n.itemIconColorInverted,l["--n-item-icon-color-hover"]=n.itemIconColorHoverInverted,l["--n-item-icon-color-active"]=n.itemIconColorActiveInverted,l["--n-item-icon-color-active-hover"]=n.itemIconColorActiveHoverInverted,l["--n-item-icon-color-child-active"]=n.itemIconColorChildActiveInverted,l["--n-item-icon-color-child-active-hover"]=n.itemIconColorChildActiveHoverInverted,l["--n-item-icon-color-collapsed"]=n.itemIconColorCollapsedInverted,l["--n-item-text-color-horizontal"]=n.itemTextColorHorizontalInverted,l["--n-item-text-color-hover-horizontal"]=n.itemTextColorHoverHorizontalInverted,l["--n-item-text-color-active-horizontal"]=n.itemTextColorActiveHorizontalInverted,l["--n-item-text-color-child-active-horizontal"]=n.itemTextColorChildActiveHorizontalInverted,l["--n-item-text-color-child-active-hover-horizontal"]=n.itemTextColorChildActiveHoverHorizontalInverted,l["--n-item-text-color-active-hover-horizontal"]=n.itemTextColorActiveHoverHorizontalInverted,l["--n-item-icon-color-horizontal"]=n.itemIconColorHorizontalInverted,l["--n-item-icon-color-hover-horizontal"]=n.itemIconColorHoverHorizontalInverted,l["--n-item-icon-color-active-horizontal"]=n.itemIconColorActiveHorizontalInverted,l["--n-item-icon-color-active-hover-horizontal"]=n.itemIconColorActiveHoverHorizontalInverted,l["--n-item-icon-color-child-active-horizontal"]=n.itemIconColorChildActiveHorizontalInverted,l["--n-item-icon-color-child-active-hover-horizontal"]=n.itemIconColorChildActiveHoverHorizontalInverted,l["--n-arrow-color"]=n.arrowColorInverted,l["--n-arrow-color-hover"]=n.arrowColorHoverInverted,l["--n-arrow-color-active"]=n.arrowColorActiveInverted,l["--n-arrow-color-active-hover"]=n.arrowColorActiveHoverInverted,l["--n-arrow-color-child-active"]=n.arrowColorChildActiveInverted,l["--n-arrow-color-child-active-hover"]=n.arrowColorChildActiveHoverInverted,l["--n-item-color-hover"]=n.itemColorHoverInverted,l["--n-item-color-active"]=n.itemColorActiveInverted,l["--n-item-color-active-hover"]=n.itemColorActiveHoverInverted,l["--n-item-color-active-collapsed"]=n.itemColorActiveCollapsedInverted):(l["--n-group-text-color"]=n.groupTextColor,l["--n-color"]=n.color,l["--n-item-text-color"]=n.itemTextColor,l["--n-item-text-color-hover"]=n.itemTextColorHover,l["--n-item-text-color-active"]=n.itemTextColorActive,l["--n-item-text-color-child-active"]=n.itemTextColorChildActive,l["--n-item-text-color-child-active-hover"]=n.itemTextColorChildActiveHover,l["--n-item-text-color-active-hover"]=n.itemTextColorActiveHover,l["--n-item-icon-color"]=n.itemIconColor,l["--n-item-icon-color-hover"]=n.itemIconColorHover,l["--n-item-icon-color-active"]=n.itemIconColorActive,l["--n-item-icon-color-active-hover"]=n.itemIconColorActiveHover,l["--n-item-icon-color-child-active"]=n.itemIconColorChildActive,l["--n-item-icon-color-child-active-hover"]=n.itemIconColorChildActiveHover,l["--n-item-icon-color-collapsed"]=n.itemIconColorCollapsed,l["--n-item-text-color-horizontal"]=n.itemTextColorHorizontal,l["--n-item-text-color-hover-horizontal"]=n.itemTextColorHoverHorizontal,l["--n-item-text-color-active-horizontal"]=n.itemTextColorActiveHorizontal,l["--n-item-text-color-child-active-horizontal"]=n.itemTextColorChildActiveHorizontal,l["--n-item-text-color-child-active-hover-horizontal"]=n.itemTextColorChildActiveHoverHorizontal,l["--n-item-text-color-active-hover-horizontal"]=n.itemTextColorActiveHoverHorizontal,l["--n-item-icon-color-horizontal"]=n.itemIconColorHorizontal,l["--n-item-icon-color-hover-horizontal"]=n.itemIconColorHoverHorizontal,l["--n-item-icon-color-active-horizontal"]=n.itemIconColorActiveHorizontal,l["--n-item-icon-color-active-hover-horizontal"]=n.itemIconColorActiveHoverHorizontal,l["--n-item-icon-color-child-active-horizontal"]=n.itemIconColorChildActiveHorizontal,l["--n-item-icon-color-child-active-hover-horizontal"]=n.itemIconColorChildActiveHoverHorizontal,l["--n-arrow-color"]=n.arrowColor,l["--n-arrow-color-hover"]=n.arrowColorHover,l["--n-arrow-color-active"]=n.arrowColorActive,l["--n-arrow-color-active-hover"]=n.arrowColorActiveHover,l["--n-arrow-color-child-active"]=n.arrowColorChildActive,l["--n-arrow-color-child-active-hover"]=n.arrowColorChildActiveHover,l["--n-item-color-hover"]=n.itemColorHover,l["--n-item-color-active"]=n.itemColorActive,l["--n-item-color-active-hover"]=n.itemColorActiveHover,l["--n-item-color-active-collapsed"]=n.itemColorActiveCollapsed),l}),H=t?me("menu",p(()=>e.inverted?"a":"b"),I,e):void 0;return{mergedClsPrefix:o,controlledExpandedKeys:b,uncontrolledExpanededKeys:x,mergedExpandedKeys:z,uncontrolledValue:f,mergedValue:$,activePath:M,tmNodes:R,mergedTheme:i,mergedCollapsed:r,cssVars:t?void 0:I,themeClass:H==null?void 0:H.themeClass,onRender:H==null?void 0:H.onRender,showOption:L}},render(){const{mergedClsPrefix:e,mode:o,themeClass:t,onRender:i}=this;return i==null||i(),d("div",{role:o==="horizontal"?"menubar":"menu",class:[`${e}-menu`,t,`${e}-menu--${o}`,this.mergedCollapsed&&`${e}-menu--collapsed`],style:this.cssVars},this.tmNodes.map(a=>Ie(a,this.$props)))}}),Oe=B({__name:"PoolStateNumber",setup(e){const o=p(()=>Re.getPool().size),t=p(()=>Re.allSubIds.size);return(i,a)=>{const r=Fe;return T(),O(he,null,[v(r,{trigger:"hover"},{trigger:A(()=>[_("span",{style:se({color:k(Pe)(k(t),20,400)})},J(k(t)),5)]),default:A(()=>[oe(" "+J(k(V)("tips.current_number_of_subscriptions_including_temporary_subscriptions")),1)]),_:1}),oe(" / "),v(r,{trigger:"hover"},{trigger:A(()=>[_("span",{style:se({color:k(Pe)(k(o),5,30)})},J(k(o)),5)]),default:A(()=>[oe(" "+J(k(V)("tips.number_of_current_and_continued_connections")),1)]),_:1})],64)}}}),mt={class:""},ht={key:0,class:"ml-1"},vt=B({__name:"Upload",setup(e){const{isShow:o}=ao(),t=uo(),i=p(()=>t.value.filter(a=>a.status==="uploading").length);return(a,r)=>{const u=ne,s=_e,c=Ao,f=co,N=so;return T(),O("div",mt,[v(N,{show:k(o),"onUpdate:show":r[1]||(r[1]=$=>io(o)?o.value=$:null),"display-directive":"show",trigger:"manual"},{trigger:A(()=>[v(s,{quaternary:"",onClick:r[0]||(r[0]=$=>o.value=!k(o))},{default:A(()=>[v(u,{size:20},{default:A(()=>[v(Po)]),_:1}),k(i)>0?(T(),O("span",ht,J(k(i)),1)):te("",!0)]),_:1})]),default:A(()=>[ro(v(c,{description:k(V)("empty_text")},null,8,["description"]),[[lo,k(t).length===0]]),v(f,{class:"min-w-[25em]"})]),_:1},8,["show"])])}}});function ft(e,o,t){const i=we(),a=F(!0);de(()=>i.name,async()=>{i.name===e?a.value=!0:a.value=!1},{immediate:!0});const r=F(o);return de(a,async()=>{a.value?(await Ae(0),r.value=t):(await Ae(0),r.value=o)},{immediate:!0}),{teleportTo:r,isView:a}}const pt=_("div",{id:"search-input-default"},null,-1),gt={key:1,class:"md:hidden"},bt=B({__name:"SearchForm",setup(e){const o=go();we();const t=F(""),i=mo("search-history",[]),a=p(()=>{const C=[];for(const b of i.value)C.push({label:()=>d(No,{class:"flex-shrink flex w-sm max-w-screen",style:{width:"min-content",maxWidth:"100vw"}},{default:()=>b}),value:b,key:b});return C});function r(){o.push({name:"search"})}function u(C){C==null||C.preventDefault(),s()}function s(){c.value=!1;const C=t.value.trim();if(!C){r();return}const b=new Set;b.add(C),bo(b,i.value),i.value=[...b].slice(0,10),o.push({name:"search",params:{value:C}})}const c=F(!1),f=To(),{isView:N,teleportTo:$}=ft("search","#search-input-default","#search-input");function x(C){c.value=!1,t.value=C,s()}return(C,b)=>{const z=ne,R=_e,M=Lo,W=je;return T(),O(he,null,[pt,k(f)?(T(),ee(po,{key:0,to:k($)},[_("div",{class:fo(["flex-shrink flex-1",{"hidden md:block":!k(N)}])},[v(W,{show:c.value,onClickoutside:b[3]||(b[3]=()=>c.value=!1),options:k(a),onSelect:x},{default:A(()=>[v(M,{clearable:"",round:"",onKeyup:ho(s,["enter"]),value:t.value,"onUpdate:value":b[0]||(b[0]=U=>t.value=U),onFocus:b[1]||(b[1]=()=>c.value=!0),onClick:b[2]||(b[2]=()=>c.value=!0),placeholder:k(V)("search")},{suffix:A(()=>[v(R,{class:"ml-1",size:"tiny",quaternary:"",circle:"",onClick:vo(u,["stop"])},{icon:A(()=>[v(z,null,{default:A(()=>[v(Te)]),_:1})]),_:1},8,["onClick"])]),_:1},8,["onKeyup","value","placeholder"])]),_:1},8,["show","options"])],2)],8,["to"])):te("",!0),k(N)?te("",!0):(T(),O("div",gt,[v(R,{quaternary:"",circle:"",onClick:r},{icon:A(()=>[v(z,null,{default:A(()=>[v(Te)]),_:1})]),_:1})]))],64)}}}),xt={},_t={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 16 16"},wt=_("g",{fill:"none"},[_("path",{d:"M3.5 6.5a4.5 4.5 0 0 1 9 0v1.904l.964 2.41A.5.5 0 0 1 13 11.5H3a.5.5 0 0 1-.464-.686l.964-2.41V6.5zm2.562 6C6.283 13.365 7.064 14 8 14c.936 0 1.717-.635 1.938-1.5H6.062z",fill:"currentColor"})],-1),yt=[wt];function Ct(e,o){return T(),O("svg",_t,yt)}const zt=j(xt,[["render",Ct]]),St={},kt={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 512 512"},It=_("path",{d:"M256 80c-8.66 0-16.58 7.36-16 16l8 216a8 8 0 0 0 8 8h0a8 8 0 0 0 8-8l8-216c.58-8.64-7.34-16-16-16z",fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32"},null,-1),$t=_("circle",{cx:"256",cy:"416",r:"16",fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32"},null,-1),Rt=[It,$t];function Pt(e,o){return T(),O("svg",kt,Rt)}const At=j(St,[["render",Pt]]),Tt={},Ht={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 512 512"},Nt=_("path",{d:"M352 48H160a48 48 0 0 0-48 48v368l144-128l144 128V96a48 48 0 0 0-48-48z",fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32"},null,-1),Lt=[Nt];function Mt(e,o){return T(),O("svg",Ht,Lt)}const Ot=j(Tt,[["render",Mt]]),Bt={},Vt={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 512 512"},Et=_("path",{d:"M98 190.06l139.78 163.12a24 24 0 0 0 36.44 0L414 190.06c13.34-15.57 2.28-39.62-18.22-39.62h-279.6c-20.5 0-31.56 24.05-18.18 39.62z",fill:"currentColor"},null,-1),Ft=[Et];function jt(e,o){return T(),O("svg",Vt,Ft)}const Kt=j(Bt,[["render",jt]]),Dt={},Ut={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 20 20"},qt=_("g",{fill:"none"},[_("path",{d:"M8.5 2a1.5 1.5 0 0 0-1.415 1H5.5A1.5 1.5 0 0 0 4 4.5v12A1.5 1.5 0 0 0 5.5 18h9a1.5 1.5 0 0 0 1.5-1.5v-12A1.5 1.5 0 0 0 14.5 3h-1.585A1.5 1.5 0 0 0 11.5 2h-3zM8 3.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm1.354 4.354l-1.75 1.75a.5.5 0 0 1-.691.015l-.75-.685a.5.5 0 1 1 .674-.738l.397.362l1.412-1.412a.5.5 0 1 1 .708.708zm0 4.292a.5.5 0 0 1 0 .708l-1.75 1.75a.5.5 0 0 1-.691.015l-.75-.685a.5.5 0 0 1 .674-.738l.397.363l1.412-1.413a.5.5 0 0 1 .708 0zM11 12.75h2.5a.5.5 0 0 1 0 1H11a.5.5 0 0 1 0-1zm-.5-4.5a.5.5 0 0 1 .5-.5h2.5a.5.5 0 0 1 0 1H11a.5.5 0 0 1-.5-.5z",fill:"currentColor"})],-1),Gt=[qt];function Yt(e,o){return T(),O("svg",Ut,Gt)}const Wt=j(Dt,[["render",Yt]]),Xt={},Jt={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 512 512"},Qt=_("path",{d:"M261.56 101.28a8 8 0 0 0-11.06 0L66.4 277.15a8 8 0 0 0-2.47 5.79L63.9 448a32 32 0 0 0 32 32H192a16 16 0 0 0 16-16V328a8 8 0 0 1 8-8h80a8 8 0 0 1 8 8v136a16 16 0 0 0 16 16h96.06a32 32 0 0 0 32-32V282.94a8 8 0 0 0-2.47-5.79z",fill:"currentColor"},null,-1),Zt=_("path",{d:"M490.91 244.15l-74.8-71.56V64a16 16 0 0 0-16-16h-48a16 16 0 0 0-16 16v32l-57.92-55.38C272.77 35.14 264.71 32 256 32c-8.68 0-16.72 3.14-22.14 8.63l-212.7 203.5c-6.22 6-7 15.87-1.34 22.37A16 16 0 0 0 43 267.56L250.5 69.28a8 8 0 0 1 11.06 0l207.52 198.28a16 16 0 0 0 22.59-.44c6.14-6.36 5.63-16.86-.76-22.97z",fill:"currentColor"},null,-1),en=[Qt,Zt];function on(e,o){return T(),O("svg",Jt,en)}const tn=j(Xt,[["render",on]]),nn={},rn={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 448 512"},ln=_("path",{d:"M437.4 226.3c-.3-.9-.9-1.4-1.4-2l-70-38.6c-.9-.6-2-.6-3.1 0l-58.9 36c-.9.6-1.4 1.7-1.4 2.6l-.9 31.4l-24-16c-.9-.6-2.3-.6-3.1 0L240 260.9l-1.4-35.1c0-.9-.6-2-1.4-2.3l-36-24.3l33.7-17.4c1.1-.6 1.7-1.7 1.7-2.9l-5.7-132.3c0-.9-.9-2-1.7-2.6L138.6.3c-.9-.3-1.7-.3-2.3-.3L12.6 38.6c-1.4.6-2.3 2-2 3.7L38 175.4c.9 3.4 34 27.4 38.6 30.9l-26.9 12.9c-1.4.9-2 2.3-1.7 3.4l20.6 100.3c.6 2.9 23.7 23.1 27.1 26.3l-17.4 10.6c-.9.6-1.7 2-1.4 3.1c1.4 7.1 15.4 77.7 16.9 79.1l65.1 69.1c.6.6 1.4.6 2.3.9c.6 0 1.1-.3 1.7-.6l83.7-66.9c.9-.6 1.1-1.4 1.1-2.3l-2-46l28 23.7c1.1.9 2.9.9 4 0l66.9-53.4c.9-.6 1.1-1.4 1.1-2.3l2.3-33.4l20.3 14c1.1.9 2.6.9 3.7 0l54.6-43.7c.6-.3 1.1-1.1 1.1-2c.9-6.5 10.3-70.8 9.7-72.8zm-204.8 4.8l4 92.6l-90.6 61.2l-14-96.6l100.6-57.2zm-7.7-180l5.4 126l-106.6 55.4L104 97.7l120.9-46.6zM44 173.1L18 48l79.7 49.4l19.4 132.9L44 173.1zm30.6 147.8L55.7 230l70 58.3l13.7 93.4l-64.8-60.8zm24.3 117.7l-13.7-67.1l61.7 60.9l9.7 67.4l-57.7-61.2zm64.5 64.5l-10.6-70.9l85.7-61.4l3.1 70l-78.2 62.3zm82-115.1c0-3.4.9-22.9-2-25.1l-24.3-20l22.3-14.9c2.3-1.7 1.1-5.7 1.1-8l29.4 22.6l.6 68.3l-27.1-22.9zm94.3-25.4l-60.9 48.6l-.6-68.6l65.7-46.9l-4.2 66.9zm27.7-25.7l-19.1-13.4l2-34c.3-.9-.3-2-1.1-2.6L308 259.7l.6-30l64.6 40.6l-5.8 66.6zm54.6-39.8l-48.3 38.3l5.7-65.1l51.1-36.6l-8.5 63.4z",fill:"currentColor"},null,-1),an=[ln];function cn(e,o){return T(),O("svg",rn,an)}const sn=j(nn,[["render",cn]]),dn={},un={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 512 512"},mn=_("path",{d:"M160 256a16 16 0 0 1 16-16h144V136c0-32-33.79-56-64-56H104a56.06 56.06 0 0 0-56 56v240a56.06 56.06 0 0 0 56 56h160a56.06 56.06 0 0 0 56-56V272H176a16 16 0 0 1-16-16z",fill:"currentColor"},null,-1),hn=_("path",{d:"M459.31 244.69l-80-80a16 16 0 0 0-22.62 22.62L409.37 240H320v32h89.37l-52.68 52.69a16 16 0 1 0 22.62 22.62l80-80a16 16 0 0 0 0-22.62z",fill:"currentColor"},null,-1),vn=[mn,hn];function fn(e,o){return T(),O("svg",un,vn)}const pn=j(dn,[["render",fn]]),gn={},bn={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 512 512"},xn=_("circle",{cx:"256",cy:"256",r:"48",fill:"currentColor"},null,-1),_n=_("path",{d:"M470.39 300l-.47-.38l-31.56-24.75a16.11 16.11 0 0 1-6.1-13.33v-11.56a16 16 0 0 1 6.11-13.22L469.92 212l.47-.38a26.68 26.68 0 0 0 5.9-34.06l-42.71-73.9a1.59 1.59 0 0 1-.13-.22A26.86 26.86 0 0 0 401 92.14l-.35.13l-37.1 14.93a15.94 15.94 0 0 1-14.47-1.29q-4.92-3.1-10-5.86a15.94 15.94 0 0 1-8.19-11.82l-5.59-39.59l-.12-.72A27.22 27.22 0 0 0 298.76 26h-85.52a26.92 26.92 0 0 0-26.45 22.39l-.09.56l-5.57 39.67a16 16 0 0 1-8.13 11.82a175.21 175.21 0 0 0-10 5.82a15.92 15.92 0 0 1-14.43 1.27l-37.13-15l-.35-.14a26.87 26.87 0 0 0-32.48 11.34l-.13.22l-42.77 73.95a26.71 26.71 0 0 0 5.9 34.1l.47.38l31.56 24.75a16.11 16.11 0 0 1 6.1 13.33v11.56a16 16 0 0 1-6.11 13.22L42.08 300l-.47.38a26.68 26.68 0 0 0-5.9 34.06l42.71 73.9a1.59 1.59 0 0 1 .13.22a26.86 26.86 0 0 0 32.45 11.3l.35-.13l37.07-14.93a15.94 15.94 0 0 1 14.47 1.29q4.92 3.11 10 5.86a15.94 15.94 0 0 1 8.19 11.82l5.56 39.59l.12.72A27.22 27.22 0 0 0 213.24 486h85.52a26.92 26.92 0 0 0 26.45-22.39l.09-.56l5.57-39.67a16 16 0 0 1 8.18-11.82c3.42-1.84 6.76-3.79 10-5.82a15.92 15.92 0 0 1 14.43-1.27l37.13 14.95l.35.14a26.85 26.85 0 0 0 32.48-11.34a2.53 2.53 0 0 1 .13-.22l42.71-73.89a26.7 26.7 0 0 0-5.89-34.11zm-134.48-40.24a80 80 0 1 1-83.66-83.67a80.21 80.21 0 0 1 83.66 83.67z",fill:"currentColor"},null,-1),wn=[xn,_n];function yn(e,o){return T(),O("svg",bn,wn)}const Cn=j(gn,[["render",yn]]),zn={},Sn={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 448 512"},kn=_("path",{d:"M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0S96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z",fill:"currentColor"},null,-1),In=[kn];function $n(e,o){return T(),O("svg",Sn,In)}const Rn=j(zn,[["render",$n]]),Pn={},An={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 640 512"},Tn=_("path",{d:"M96 224c35.3 0 64-28.7 64-64s-28.7-64-64-64s-64 28.7-64 64s28.7 64 64 64zm448 0c35.3 0 64-28.7 64-64s-28.7-64-64-64s-64 28.7-64 64s28.7 64 64 64zm32 32h-64c-17.6 0-33.5 7.1-45.1 18.6c40.3 22.1 68.9 62 75.1 109.4h66c17.7 0 32-14.3 32-32v-32c0-35.3-28.7-64-64-64zm-256 0c61.9 0 112-50.1 112-112S381.9 32 320 32S208 82.1 208 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C179.6 288 128 339.6 128 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zm-223.7-13.4C161.5 263.1 145.6 256 128 256H64c-35.3 0-64 28.7-64 64v32c0 17.7 14.3 32 32 32h65.9c6.3-47.4 34.9-87.3 75.2-109.4z",fill:"currentColor"},null,-1),Hn=[Tn];function Nn(e,o){return T(),O("svg",An,Hn)}const Ln=j(Pn,[["render",Nn]]),Mn=B({__name:"LogoutButton",setup(e){const o=Oo();function t(){o.warning({title:V("warning"),content:V("message.logout_dialog_content"),positiveText:V("yes"),negativeText:V("no"),onPositiveClick:()=>{_o()}})}return(i,a)=>(T(),O("div",{onClick:t},[xo(i.$slots,"default",{},()=>[oe(J(k(V)("logout")),1)])]))}}),Xe=B({__name:"Sidebar",props:{collapsed:{type:Boolean}},setup(e){const o=p(()=>[{key:"Home",label:V("home"),href:"/home",icon:q(tn)},{key:"Profile",label:V("profile"),href:"/profile",icon:q(Rn)},{key:"Relays",label:V("relays"),href:"/relays",icon:q(sn)},{key:"Channels",label:V("channel"),href:"/channels",icon:q(Ln)},{key:"Notice",label:V("notice"),href:"/notice",icon:q(zt)},{key:"Task",label:V("task"),href:"/task",icon:q(Wt)},{key:"Settings",label:V("settings"),href:"/settings",icon:q(Cn)},{key:"About",label:V("about"),href:"/about",icon:q(At)},{key:"Logout",label:()=>d(Mn,{},{default:()=>V("logout")}),icon:q(pn)}]);function t(r){return"href"in r?d(wo,{to:r.href},{default:()=>r.label}):yo(r.label)?r.label():r.label}function i(r){return r.icon?r.icon():d(ne,null,{default:()=>d(Ot)})}function a(){return d(ne,null,{default:()=>d(Kt)})}return(r,u)=>(T(),ee(k(ut),{collapsed:e.collapsed,"collapsed-width":64,"collapsed-icon-size":22,options:k(o),"render-label":t,"render-icon":i,"expand-icon":a},null,8,["collapsed","options"]))}}),On={},Bn={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 512 512"},Vn=_("path",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-miterlimit":"10","stroke-width":"48",d:"M88 152h336"},null,-1),En=_("path",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-miterlimit":"10","stroke-width":"48",d:"M88 256h336"},null,-1),Fn=_("path",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-miterlimit":"10","stroke-width":"48",d:"M88 360h336"},null,-1),jn=[Vn,En,Fn];function Kn(e,o){return T(),O("svg",Bn,jn)}const Dn=j(On,[["render",Kn]]),Un={key:0,class:"h-4 w-4 flex justify-center items-center"},qn=B({__name:"LoadProgress",setup(e){const o=Co(),t=zo(),i=p(()=>{var f;return(f=o==null?void 0:o.bufferOpt.value)==null?void 0:f.isLoading}),a=Ho(),r=p(()=>{const f=o==null?void 0:o.bufferOpt.value;if(!!f)return Math.floor(Math.log2(a.value-f.minSince))}),u=p(()=>{const f=o==null?void 0:o.bufferOpt.value;if(!!f)return f.minSince===f.createTime}),s=p(()=>{const f=o==null?void 0:o.bufferOpt.value;if(!f)return;const N=f.until-f.since;return N===0?1:Math.floor(Math.log2(N))}),c=p(()=>{if(!(!s.value||!r.value))return s.value/r.value*100});return de(i,()=>{i.value||!o||o.bufferOpt.value===null||(s.value&&r.value&&s.value>=r.value&&t.success(V("all_loading_completed")),o.bufferOpt.value=null)}),(f,N)=>{const $=So;return k(i)&&k(s)?(T(),O("div",Un,[oe(J(k(s))+" ",1),k(c)?(T(),ee($,{key:0,class:"absolute h-1 w-full left-0 bottom-0",type:"line",percentage:k(u)?100-k(c):k(c),"show-indicator":!1,"offset-degree":120,height:2,style:{}},null,8,["percentage"])):te("",!0)])):te("",!0)}}}),Gn=_("span",{class:"ml-6 hidden md:block"}," Jumpalong ",-1),Yn={class:"flex justify-center items-center"},Wn={class:"ml-3"},Xn={class:"ml-3 clashidden sm:block"},Jn={class:"ml-3 hidden sm:block"},Qn={class:"ml-3 hidden sm:block"},Zn={class:"ml-3 md:hidden"},er={class:"flex items-center"},or=B({__name:"LayoutHeader",setup(e){const o=F(!1),t=we();return de(()=>t.path,()=>{o.value=!1}),(i,a)=>{const r=ne,u=Oe,s=_e,c=Vo,f=Eo;return T(),O(he,null,[_("span",{class:"text-xl font-bold flex justify-center items-center",onClick:a[0]||(a[0]=()=>i.$router.push("/"))},[v(r,{size:"40"},{default:A(()=>[v(Ro)]),_:1}),Gn]),_("div",Yn,[v(bt),_("div",Wn,[v(vt)]),_("div",Xn,[v(u)]),v(qn,{class:"ml-3"}),_("div",Jn,[v(He)]),_("div",Qn,[v(Ne)]),_("div",Zn,[v(s,{quaternary:"",onClick:a[1]||(a[1]=()=>o.value=!o.value)},{default:A(()=>[v(r,{size:"22"},{default:A(()=>[v(Dn)]),_:1})]),_:1}),v(f,{show:o.value,"onUpdate:show":a[2]||(a[2]=N=>o.value=N),width:"100%",placement:"right"},{default:A(()=>[v(c,{title:"Menu",closable:""},{footer:A(()=>[_("div",er,[v(Ne),v(He),v(Oe)])]),default:A(()=>[v(Xe,{collapsed:!1})]),_:1})]),_:1},8,["show"])])])],64)}}}),tr={class:"h-full overflow-x-hidden"},yr=B({__name:"LayoutView",setup(e){const o=F(!0);return Fo(),(t,i)=>{const a=Wo,r=et,u=$o("router-view"),s=qo;return T(),ee(s,{style:{height:"100vh"}},{default:A(()=>[v(a,{class:"h-14 md:h-20 flex justify-between items-center px-3 relative",style:se({transition:"height 0.5s"}),bordered:""},{default:A(()=>[v(or)]),_:1},8,["style"]),v(s,{class:"absolute w-full top-14 md:top-20 bottom-0","has-sider":"",style:se({transition:"top 0.5s, bottoom 0.5s"})},{default:A(()=>[v(r,{class:"hidden md:flex","native-scrollbar":!1,bordered:"","collapse-mode":"width","collapsed-width":64,width:240,collapsed:o.value,"show-trigger":"",onCollapse:i[0]||(i[0]=c=>o.value=!0),onExpand:i[1]||(i[1]=c=>o.value=!1)},{default:A(()=>[v(Xe,{collapsed:o.value},null,8,["collapsed"])]),_:1},8,["collapsed"]),v(s,{"content-style":"padding: 8px;"},{default:A(()=>[_("div",tr,[v(u,null,{default:A(({Component:c})=>[(T(),ee(ko,null,[(T(),ee(Io(c)))],1024))]),_:1})])]),_:1})]),_:1},8,["style"])]),_:1})}}});export{yr as default};
