import{f as u,bv as p,n as _,C as e,y as o,I as n,F as r,O as i,z as f,a9 as l}from"./index.de60ca02.js";import{f as y}from"./use.9a2f80b1.js";import{_ as h}from"./AddButton.vue_vue_type_script_setup_true_lang.afbaf71a.js";const k={key:0},x={key:1},g={key:2},B={key:3},S={key:4},b=u({__name:"DateTime",props:{secondTimestamp:null},setup(t){const c=t,{secondTimestamp:a}=p(c),d=y(),s=_(()=>d.value-a.value),m=_(()=>new Date(a.value*1e3).toLocaleDateString());return(T,v)=>e(s)>=60*60*24?(o(),n("span",k,r(e(m)),1)):e(s)<60?(o(),n("span",x,r(e(i)("x_seconds_ago",{x:e(s)})),1)):e(s)<3600?(o(),n("span",g,r(e(i)("x_minutes_ago",{x:Math.floor(e(s)/60)})),1)):e(s)<60*60*24?(o(),n("span",B,r(e(i)("x_hours_ago",{x:Math.floor(e(s)/60/60)})),1)):(o(),n("span",S,r(e(m)),1))}}),w=u({__name:"RelayAddButton",props:{url:null},setup(t){return(c,a)=>(o(),f(h,{disabled:e(l).hasReadByUrl(t.url)||e(l).hasWriteByUrl(t.url),onClick:a[0]||(a[0]=()=>{e(l).addWriteRead(t.url),c.$emit("click")})},null,8,["disabled"]))}});export{b as _,w as a};
