"use strict";(self.webpackChunkreact_template=self.webpackChunkreact_template||[]).push([[396],{8396:function(e,t,a){a.r(t),a.d(t,{default:function(){return m}});var r=a(4165),n=a(2982),s=a(5861),i=a(885),c=a(2791),o=a(3622),u=a(457),l=a(6871),d=a(6429),p=a(9642),h=a(184);var m=function(){var e=(0,l.TH)(),t=(0,c.useState)(1),a=(0,i.Z)(t,2),m=a[0],v=a[1],x=(0,c.useState)([]),_=((0,i.Z)(x,1)[0],(0,c.useState)({expiration_time:"",push_award_time:""})),f=(0,i.Z)(_,2),Z=f[0],j=f[1],w=p.Z.getHashQuery(),g=(0,c.useState)([]),y=(0,i.Z)(g,2),k=y[0],N=y[1],b=(0,c.useState)(!0),S=(0,i.Z)(b,2),C=S[0],M=S[1];function P(){return(P=(0,s.Z)((0,r.Z)().mark((function t(){var a;return(0,r.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,(0,d.UJ)({course_id:e.state.course_id||w.query.course_id,page:m});case 3:a=t.sent,v((function(e){return e+1})),0!==a.code&&M(!1),a.data&&a.data.list&&a.data.list.length?(N((function(e){return[].concat((0,n.Z)(e),(0,n.Z)(a.data.list))})),j({expiration_time:a.data.expiration_time,push_award_time:a.data.push_award_time}),M(a.data.list.length>0)):M(!1),t.next=13;break;case 9:throw t.prev=9,t.t0=t.catch(0),M(!1),t.t0;case 13:case"end":return t.stop()}}),t,null,[[0,9]])})))).apply(this,arguments)}var q=function(){var t=(0,s.Z)((0,r.Z)().mark((function t(){var a;return(0,r.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,v(1),t.next=4,(0,d.UJ)({course_id:e.state.course_id||w.query.course_id,page:1});case 4:a=t.sent,v((function(e){return e+1})),console.log("res",a),a.data&&a.data.list&&a.data.list.length?(j({expiration_time:a.data.expiration_time,push_award_time:a.data.push_award_time}),N((function(e){return(0,n.Z)(a.data.list)})),M(a.data.list.length>0)):(N([]),M(!1)),t.next=14;break;case 10:throw t.prev=10,t.t0=t.catch(0),M(!1),t.t0;case 14:case"end":return t.stop()}}),t,null,[[0,10]])})));return function(){return t.apply(this,arguments)}}();return(0,h.jsxs)("div",{className:"MyCourse",children:[(0,h.jsx)(o.Z,{text:"\u6211\u7684\u8bfe\u7a0b"}),(0,h.jsx)(u.t8,{onRefresh:function(){return q()},children:(0,h.jsxs)("div",{className:"list",children:[(0,h.jsx)("div",{className:"scroll-box",children:k.map((function(e,t){return(0,h.jsxs)("div",{className:"item",children:[(0,h.jsx)("div",{className:"item-title",children:e.title}),(0,h.jsx)("div",{className:"item-video",children:(0,h.jsx)("video",{controls:!0,controlslist:"nodownload noremoteplayback",poster:e.img_url,disablePictureInPicture:!0,onPlay:function(e){return function(e,t){console.log(e,t);var a=document.getElementsByTagName("video");console.log("videoDomList",a);for(var r=0;r<a.length;r++){var n=a[r];e!==r&&n.pause()}}(t,e)},children:(0,h.jsx)("source",{src:e.video_url,type:"video/mp4"})})})]},t)}))}),Z.expiration_time?(0,h.jsx)("div",{className:"footer",children:(0,h.jsxs)("div",{className:"footer-content",children:[(0,h.jsx)("div",{children:"\u63d0\u793a\uff1a\u672c\u6b21\u8bfe\u7a0b\u7684\u6709\u6548\u671f\u4e3a"}),(0,h.jsxs)("div",{children:[Z.expiration_time,"-",Z.push_award_time]})]})}):null,(0,h.jsx)(u.v_,{loadMore:function(){return P.apply(this,arguments)},hasMore:C})]})})]})}}}]);
//# sourceMappingURL=396.11a9e910.chunk.js.map