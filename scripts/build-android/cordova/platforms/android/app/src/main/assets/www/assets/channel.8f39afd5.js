import{a8 as l,a1 as r,a2 as n,Y as i,a3 as c,ai as o}from"./index.de60ca02.js";import{i as d,c as S,a as h,b as u}from"./getCacheStaff.283a43f7.js";import{c as m,a as C,b as M,d as E}from"./event.e2dea496.js";import{a as f}from"./autoAddRelayurlByEventIdStaff.73b12553.js";import{c as g}from"./user.a4fb9555.js";import{c as B}from"./ContentBlacklistView.8c70f668.js";const p=l()(a=>({initialization(){const e=d.channelMetadataEventMap.get(a);e&&this.beltline.pushEvent(e),this.beltline.feat.onHasLatestEvent(t=>{d.channelMetadataEventMap.set(a,t)})}}));function k(a){return r(`getChannelMetadataBeltlineByChannelId:${a}`,()=>{const e=n({describe:"getChannelMetadataBeltlineByChannelId"}).addFilter({ids:[a],kinds:[40]}).addFilter({kinds:[41],"#e":[a]}).addStaff(i()).addStaff(g()).addStaff(c()).addStaff(S()).addStaff(p(a)).addStaff(h());return e.feat.withEvent()||e.addStaff(f(a)).addReadUrl(),e},{useMemoryCache:!0,useLocalStorage:!1})}function T(a,e){return r(`etChannelMessageBeltline:${a}`,()=>{const t=n({describe:"getChannelMessageBeltline"}).addStaff(m([{kinds:[42],"#e":[a]}])).addStaff(C()).addStaff(u()).addStaff(M()).addStaff(E()).addStaff(B()).addStaffOfSortByCreateAt();return setTimeout(()=>{t.addExtends(t.createChild().addRelayUrls(e==null?void 0:e.urls).onAddRelayUrlsAfter(s=>{t.addRelayUrls(s)}).addFilter({ids:[a],kinds:[40]}).addFilter({kinds:[41],"#e":[a]}).addFilter({kinds:[42],"#e":[a],since:o()}).addStaff(f(a)).addReadUrl()),t.feat.firstLoad()},0),t},{useLocalStorage:!1})}export{T as a,k as g};
