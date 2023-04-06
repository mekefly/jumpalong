import{S as v,T as L,U as B,V as h,W as E,X as d,Y as C,Z as R,$ as M,a0 as u,a1 as y,a2 as S,a3 as m}from"./index.de60ca02.js";import{c as D,a as k,b as w,d as U}from"./getCacheStaff.283a43f7.js";import{c as F}from"./event.e2dea496.js";import{c as P,g as T}from"./user.a4fb9555.js";import{g as b}from"./channel.8f39afd5.js";class j extends L{constructor(){super("ContactConfiguration",{contactConfiguration:{},channelConfiguration:new Map})}getFilters(){return[{kinds:[3],authors:[B.value.publicKey]}]}serializeToData(t){const a={},r=h(t.tags);for(const{name:n,pubkey:e,relayUrl:i}of r)a[e]={name:n,pubkey:e,relayUrl:i};const c=new Map,o=E(t.tags);for(const n of o){const e=d.createChild().addFilter({kinds:[41],"#e":[n.eventId]}).addFilter({ids:[n.eventId],kinds:[40]}).addStaff(C()).addStaff(P());e.feat.onHasLatestEvent(i=>{Object.assign(n,i)}),e.addExtends(d),c.set(n.eventId,n)}return{contactConfiguration:a,channelConfiguration:c}}getContactConfiguration(){return this.getData().contactConfiguration}deserializeToEvent(t,a){const r=t.contactConfiguration,c=Object.entries(r).map(([e,{name:i,relayUrl:s}])=>["p",e,s,i].filter(Boolean)),o=t.channelConfiguration,n=R(Array.from(o.entries(),([e,i])=>i));return M({kind:3,tags:[...c,...n],created_at:a})}joinChannel(t,a){if(!t)return;const r=this.getData().channelConfiguration;if(r.get(t))return;this.toChanged();const o={eventId:t,marker:"root",relay:a!=null?a:"",type:""},n=this.toChanged();r.set(t,o),this.save();const e=b(t),i=u((s,f)=>{if(this.isReChange(n)){e.closeReq();return}if(Object.assign(o,s),s.relayUrls&&s.relayUrls.length>0)o.relay=s.relayUrls[0];else{const g=e.getUrlBySubId(f!=null?f:"");g&&(o.relay=g)}this.save()},3e3);e.feat.onHasMetadata(i)}leaveChannel(t){if(!t)return;const a=this.getData().channelConfiguration;!a.has(t)||(this.toChanged(),a.delete(t),this.save())}getChannelConfiguration(){return this.getData().channelConfiguration}getChannelList(){return Array.from(this.getChannelConfiguration()).map(([t,a])=>a)}follow(t,a,r){if(!t)return;const c=this.getDataAndChange().contactConfiguration,o=c[t]={pubkey:t,name:r!=null?r:"",relayUrl:a!=null?a:""},n=this.toChanged();this.save();const e=T(t),i=u((s,f)=>{if(this.isReChange(n)){e.closeReq();return}if(Object.assign(o,s),s.relayUrls&&s.relayUrls.length>0)o.relayUrl=s.relayUrls[0];else{const g=e.getUrlBySubId(f!=null?f:"");g&&(o.relayUrl=g)}this.save()});e.feat.onHasMetadata(i)}unFollow(t){if(!t)return;const a=this.getData().contactConfiguration;a[t]!==void 0&&(this.toChanged(),delete a[t],this.save())}isFollow(t){return Boolean(this.getData().contactConfiguration[t])}}const z=v(new j);setTimeout(()=>{z.sync()},0);function H(l,t){return y(`getContactListLineByPubkey:${l}`,()=>{const a=S().addFilter({kinds:[3],authors:[l]}).addStaff(C()).addStaff(m()).addStaff(D()).addStaff({feat:{getContactList(){const c=this.beltline.feat.getLatestEvent();return c?h(c.tags):[]}}}).addStaff(k());return(async()=>{a.addRelayUrls(t==null?void 0:t.urls),a.addStaff(U(l)),a.addReadUrl()})(),a},{useLocalStorage:!1})}function $(l,t){return y(`getFollowerLineByPubkey:${l}`,()=>{const a=S({name:"getFollowerLineByPubkey"}).addStaff(F([{kinds:[3],"#p":[l]}],100)).addStaff(w()).addStaff(U(l)).addReadUrl().addRelayUrls(t==null?void 0:t.urls);return a.feat.load(),a},{useLocalStorage:!1,duration:1e5})}export{$ as a,z as c,H as g};
