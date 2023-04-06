import{c as s,a as I,b as g,d as y,i as R,e as Q,f as N,u as V,g as X,h as D,s as Y,p as Z,j as i,k as ee,l as te,m as ne,t as ie,n as z,o as p,q as re,r as P,v as B,w as T,N as se,x as F,E as oe,y as b,z as _,A as m,K as ae,B as le,C as l,D as E,F as j,G as ce,H as A,I as de,J as pe,L as ue,_ as fe,M as he,O as w}from"./index.de60ca02.js";import{u as me}from"./LoginStepsView.e058e055.js";import{g as ve}from"./get-slot.4ceacf82.js";import{F as xe}from"./Checkmark.93029895.js";import"./Contact.a56396af.js";import"./getCacheStaff.283a43f7.js";import"./event.e2dea496.js";import"./autoAddRelayurlByEventIdStaff.73b12553.js";import"./user.a4fb9555.js";import"./channel.8f39afd5.js";import"./ContentBlacklistView.8c70f668.js";import"./Input.cc4eb912.js";import"./FollowChannel.2a5211f1.js";const ge=s("steps",`
 width: 100%;
 display: flex;
`,[s("step",`
 position: relative;
 display: flex;
 flex: 1;
 `,[I("disabled","cursor: not-allowed"),I("clickable",`
 cursor: pointer;
 `),g("&:last-child",[s("step-splitor","display: none;")])]),s("step-splitor",`
 background-color: var(--n-splitor-color);
 margin-top: calc(var(--n-step-header-font-size) / 2);
 height: 1px;
 flex: 1;
 align-self: flex-start;
 margin-left: 12px;
 margin-right: 12px;
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `),s("step-content","flex: 1;",[s("step-content-header",`
 color: var(--n-header-text-color);
 margin-top: calc(var(--n-indicator-size) / 2 - var(--n-step-header-font-size) / 2);
 line-height: var(--n-step-header-font-size);
 font-size: var(--n-step-header-font-size);
 position: relative;
 display: flex;
 font-weight: var(--n-step-header-font-weight);
 margin-left: 9px;
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `,[y("title",`
 white-space: nowrap;
 flex: 0;
 `)]),y("description",`
 color: var(--n-description-text-color);
 margin-top: 12px;
 margin-left: 9px;
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `)]),s("step-indicator",`
 background-color: var(--n-indicator-color);
 box-shadow: 0 0 0 1px var(--n-indicator-border-color);
 height: var(--n-indicator-size);
 width: var(--n-indicator-size);
 border-radius: 50%;
 display: flex;
 align-items: center;
 justify-content: center;
 transition:
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 `,[s("step-indicator-slot",`
 position: relative;
 width: var(--n-indicator-icon-size);
 height: var(--n-indicator-icon-size);
 font-size: var(--n-indicator-icon-size);
 line-height: var(--n-indicator-icon-size);
 `,[y("index",`
 display: inline-block;
 text-align: center;
 position: absolute;
 left: 0;
 top: 0;
 font-size: var(--n-indicator-index-font-size);
 width: var(--n-indicator-icon-size);
 height: var(--n-indicator-icon-size);
 line-height: var(--n-indicator-icon-size);
 color: var(--n-indicator-text-color);
 transition: color .3s var(--n-bezier);
 `,[R()]),s("icon",`
 color: var(--n-indicator-text-color);
 transition: color .3s var(--n-bezier);
 `,[R()]),s("base-icon",`
 color: var(--n-indicator-text-color);
 transition: color .3s var(--n-bezier);
 `,[R()])])]),I("vertical","flex-direction: column;",[Q("show-description",[g(">",[s("step","padding-bottom: 8px;")])]),g(">",[s("step","margin-bottom: 16px;",[g("&:last-child","margin-bottom: 0;"),g(">",[s("step-indicator",[g(">",[s("step-splitor",`
 position: absolute;
 bottom: -8px;
 width: 1px;
 margin: 0 !important;
 left: calc(var(--n-indicator-size) / 2);
 height: calc(100% - var(--n-indicator-size));
 `)])]),s("step-content",[y("description","margin-top: 8px;")])])])])])]);function be(e,o){return typeof e!="object"||e===null||Array.isArray(e)?null:(e.props||(e.props={}),e.props.internalIndex=o+1,e)}function ze(e){return e.map((o,r)=>be(o,r))}const _e=Object.assign(Object.assign({},D.props),{current:Number,status:{type:String,default:"process"},size:{type:String,default:"medium"},vertical:Boolean,"onUpdate:current":[Function,Array],onUpdateCurrent:[Function,Array]}),H=te("n-steps"),Se=N({name:"Steps",props:_e,setup(e,{slots:o}){const{mergedClsPrefixRef:r,mergedRtlRef:a}=V(e),u=X("Steps",a,r),d=D("Steps","-steps",ge,Y,e,r);return Z(H,{props:e,mergedThemeRef:d,mergedClsPrefixRef:r,stepsSlots:o}),{mergedClsPrefix:r,rtlEnabled:u}},render(){const{mergedClsPrefix:e}=this;return i("div",{class:[`${e}-steps`,this.rtlEnabled&&`${e}-steps--rtl`,this.vertical&&`${e}-steps--vertical`]},ze(ee(ve(this))))}}),Ce={status:String,title:String,description:String,disabled:Boolean,internalIndex:{type:Number,default:0}},ye=N({name:"Step",props:Ce,setup(e){const o=ne(H,null);o||ie("step","`n-step` must be placed inside `n-steps`.");const{inlineThemeDisabled:r}=V(),{props:a,mergedThemeRef:u,mergedClsPrefixRef:d,stepsSlots:c}=o,v=z(()=>a.vertical),S=z(()=>{const{status:t}=e;if(t)return t;{const{internalIndex:n}=e,{current:h}=a;if(h===void 0)return"process";if(n<h)return"finish";if(n===h)return a.status||"process";if(n>h)return"wait"}return"process"}),k=z(()=>{const{value:t}=S,{size:n}=a,{common:{cubicBezierEaseInOut:h},self:{stepHeaderFontWeight:x,[p("stepHeaderFontSize",n)]:C,[p("indicatorIndexFontSize",n)]:K,[p("indicatorSize",n)]:L,[p("indicatorIconSize",n)]:O,[p("indicatorTextColor",t)]:U,[p("indicatorBorderColor",t)]:W,[p("headerTextColor",t)]:M,[p("splitorColor",t)]:q,[p("indicatorColor",t)]:G,[p("descriptionTextColor",t)]:J}}=u.value;return{"--n-bezier":h,"--n-description-text-color":J,"--n-header-text-color":M,"--n-indicator-border-color":W,"--n-indicator-color":G,"--n-indicator-icon-size":O,"--n-indicator-index-font-size":K,"--n-indicator-size":L,"--n-indicator-text-color":U,"--n-splitor-color":q,"--n-step-header-font-size":C,"--n-step-header-font-weight":x}}),f=r?re("step",z(()=>{const{value:t}=S,{size:n}=a;return`${t[0]}${n[0]}`}),k,a):void 0,$=z(()=>{if(e.disabled)return;const{onUpdateCurrent:t,"onUpdate:current":n}=a;return t||n?()=>{t&&P(t,e.internalIndex),n&&P(n,e.internalIndex)}:void 0});return{stepsSlots:c,mergedClsPrefix:d,vertical:v,mergedStatus:S,handleStepClick:$,cssVars:r?void 0:k,themeClass:f==null?void 0:f.themeClass,onRender:f==null?void 0:f.onRender}},render(){const{mergedClsPrefix:e,onRender:o,handleStepClick:r,disabled:a}=this,u=B(this.$slots.default,d=>{const c=d||this.description;return c?i("div",{class:`${e}-step-content__description`},c):null});return o==null||o(),i("div",{class:[`${e}-step`,a&&`${e}-step--disabled`,!a&&r&&`${e}-step--clickable`,this.themeClass,u&&`${e}-step--show-description`,`${e}-step--${this.mergedStatus}-status`],style:this.cssVars,onClick:r},i("div",{class:`${e}-step-indicator`},i("div",{class:`${e}-step-indicator-slot`},i(se,null,{default:()=>B(this.$slots.icon,d=>{const{mergedStatus:c,stepsSlots:v}=this;return c==="finish"||c==="error"?c==="finish"?i(F,{clsPrefix:e,key:"finish"},{default:()=>T(v["finish-icon"],()=>[i(xe,null)])}):c==="error"?i(F,{clsPrefix:e,key:"error"},{default:()=>T(v["error-icon"],()=>[i(oe,null)])}):null:d||i("div",{key:this.internalIndex,class:`${e}-step-indicator-slot__index`},this.internalIndex)})})),this.vertical?i("div",{class:`${e}-step-splitor`}):null),i("div",{class:`${e}-step-content`},i("div",{class:`${e}-step-content-header`},i("div",{class:`${e}-step-content-header__title`},T(this.$slots.title,()=>[this.title])),this.vertical?null:i("div",{class:`${e}-step-splitor`})),u))}}),Ve=N({__name:"LoginStepsView",setup(e){const{withPrevStep:o,withNestStep:r,prevStep:a,nextStep:u,current:d,name:c,numberOfSteps:v}=me();return(S,k)=>{const f=ye,$=Se,t=fe,n=he("router-view");return b(),_(n,null,{default:m(({Component:h})=>[(b(),_(ae,null,[(b(),_(le(h),null,{"prev-step":m(({disabled:x})=>[l(o)?(b(),_(t,{key:0,disabled:x,class:"w-full",onClick:l(a)},{default:m(()=>[E(j(l(w)("previous_step")),1)]),_:2},1032,["disabled","onClick"])):ce("",!0)]),"next-step":m(({disabled:x})=>[A(t,{type:l(r)?"primary":"success",disabled:x,class:"w-full",onClick:l(u)},{default:m(()=>[E(j(l(r)?l(w)("next_step"):l(w)("complete")),1)]),_:2},1032,["type","disabled","onClick"])]),default:m(()=>[A($,{size:"small",current:l(d)},{default:m(()=>[(b(!0),de(ue,null,pe(Array.from({length:l(v)}),(x,C)=>(b(),_(f,{key:C,title:C===l(d)-1?l(w)(l(c)):"",description:""},null,8,["title"]))),128))]),_:1},8,["current"])]),_:2},1024))],1024))]),_:1})}}});export{Ve as default};
