import{a_ as B,f as C,u as G,h as v,g as R,n as j,k as E,j as x,a$ as _,o as I,b0 as M,b1 as b}from"./index.de60ca02.js";import{g as P}from"./get-slot.4ceacf82.js";let h;const T=()=>{if(!B)return!0;if(h===void 0){const e=document.createElement("div");e.style.display="flex",e.style.flexDirection="column",e.style.rowGap="1px",e.appendChild(document.createElement("div")),e.appendChild(document.createElement("div")),document.body.appendChild(e);const a=e.scrollHeight===1;return document.body.removeChild(e),h=a}return h},A=Object.assign(Object.assign({},v.props),{align:String,justify:{type:String,default:"start"},inline:Boolean,vertical:Boolean,size:{type:[String,Number,Array],default:"medium"},wrapItem:{type:Boolean,default:!0},itemStyle:[String,Object],wrap:{type:Boolean,default:!0},internalUseGap:{type:Boolean,default:void 0}}),W=C({name:"Space",props:A,setup(e){const{mergedClsPrefixRef:a,mergedRtlRef:u}=G(e),n=v("Space","-space",void 0,_,e,a),g=R("Space",u,a);return{useGap:T(),rtlEnabled:g,mergedClsPrefix:a,margin:j(()=>{const{size:t}=e;if(Array.isArray(t))return{horizontal:t[0],vertical:t[1]};if(typeof t=="number")return{horizontal:t,vertical:t};const{self:{[I("gap",t)]:f}}=n.value,{row:s,col:p}=M(f);return{horizontal:b(p),vertical:b(s)}})}},render(){const{vertical:e,align:a,inline:u,justify:n,itemStyle:g,margin:t,wrap:f,mergedClsPrefix:s,rtlEnabled:p,useGap:o,wrapItem:w,internalUseGap:S}=this,c=E(P(this));if(!c.length)return null;const y=`${t.horizontal}px`,d=`${t.horizontal/2}px`,$=`${t.vertical}px`,i=`${t.vertical/2}px`,l=c.length-1,m=n.startsWith("space-");return x("div",{role:"none",class:[`${s}-space`,p&&`${s}-space--rtl`],style:{display:u?"inline-flex":"flex",flexDirection:e?"column":"row",justifyContent:["start","end"].includes(n)?"flex-"+n:n,flexWrap:!f||e?"nowrap":"wrap",marginTop:o||e?"":`-${i}`,marginBottom:o||e?"":`-${i}`,alignItems:a,gap:o?`${t.vertical}px ${t.horizontal}px`:""}},!w&&(o||S)?c:c.map((z,r)=>x("div",{role:"none",style:[g,{maxWidth:"100%"},o?"":e?{marginBottom:r!==l?$:""}:p?{marginLeft:m?n==="space-between"&&r===l?"":d:r!==l?y:"",marginRight:m?n==="space-between"&&r===0?"":d:"",paddingTop:i,paddingBottom:i}:{marginRight:m?n==="space-between"&&r===l?"":d:r!==l?y:"",marginLeft:m?n==="space-between"&&r===0?"":d:"",paddingTop:i,paddingBottom:i}]},z)))}});export{W as _};
