"use strict";(self.webpackChunkreact_template=self.webpackChunkreact_template||[]).push([[396],{8396:function(t,e,a){a.r(e),a.d(e,{default:function(){return v}});var n=a(4165),r=a(2982),s=a(5861),i=a(885),c=a(2791),o=a(3622),u=a(457),l=a(6871),d=a(6429),h=a(9642),p=a(4270),m=a(184);var v=function(){var t=(0,l.TH)(),e=(0,c.useState)(1),a=(0,i.Z)(e,2),v=a[0],x=a[1],_=(0,c.useState)([]),f=((0,i.Z)(_,1)[0],(0,c.useState)({expiration_time:"",push_award_time:""})),Z=(0,i.Z)(f,2),j=Z[0],g=Z[1],w=h.Z.getHashQuery(),y=(0,c.useState)([]),k=(0,i.Z)(y,2),N=k[0],b=k[1],M=(0,c.useState)(!0),S=(0,i.Z)(M,2),T=S[0],q=S[1];function C(){return(C=(0,s.Z)((0,n.Z)().mark((function e(){var a,s,i,c,o;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,(0,d.UJ)({course_id:t.state.course_id||w.query.course_id,page:v});case 3:a=e.sent,x((function(t){return t+1})),0!==a.code&&q(!1),a.data&&a.data.list&&a.data.list.length?(b((function(t){return[].concat((0,r.Z)(t),(0,r.Z)(a.data.list))})),s=h.Z.getTimeData(1e3*a.data.expiration_time),i=h.Z.getTimeData(1e3*a.data.push_award_time),c="".concat(s.y,".").concat(s.mon,".").concat(s.dd," ").concat(s.hh,":").concat(s.MM,":").concat(s.ss),o="".concat(i.y,".").concat(i.mon,".").concat(i.dd," ").concat(i.hh,":").concat(i.MM,":").concat(i.ss),g({expiration_time:c,push_award_time:o}),q(a.data.list.length>0)):q(!1),e.next=13;break;case 9:throw e.prev=9,e.t0=e.catch(0),q(!1),e.t0;case 13:case"end":return e.stop()}}),e,null,[[0,9]])})))).apply(this,arguments)}var D=function(){var e=(0,s.Z)((0,n.Z)().mark((function e(){var a;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,x(1),e.next=4,(0,d.UJ)({course_id:t.state.course_id||w.query.course_id,page:1});case 4:a=e.sent,x((function(t){return t+1})),console.log("res",a),a.data&&a.data.list&&a.data.list.length?(g({expiration_time:a.data.expiration_time,push_award_time:a.data.push_award_time}),b((function(t){return(0,r.Z)(a.data.list)})),q(a.data.list.length>0)):(b([]),q(!1)),e.next=14;break;case 10:throw e.prev=10,e.t0=e.catch(0),q(!1),e.t0;case 14:case"end":return e.stop()}}),e,null,[[0,10]])})));return function(){return e.apply(this,arguments)}}();return(0,m.jsxs)("div",{className:"MyCourse",children:[(0,m.jsx)(p.q,{children:(0,m.jsx)("title",{children:"\u6211\u7684\u8bfe\u7a0b"})}),(0,m.jsx)(o.Z,{text:"\u6211\u7684\u8bfe\u7a0b"}),(0,m.jsx)(u.t8,{onRefresh:function(){return D()},children:(0,m.jsxs)("div",{className:"list",children:[(0,m.jsx)("div",{className:"scroll-box",children:N.map((function(t,e){return(0,m.jsxs)("div",{className:"item",children:[(0,m.jsx)("div",{className:"item-title",children:t.title}),(0,m.jsx)("div",{className:"item-video",children:(0,m.jsx)("video",{controls:!0,controlslist:"nodownload noremoteplayback",poster:t.img_url,disablePictureInPicture:!0,onPlay:function(t){return function(t,e){console.log(t,e);var a=document.getElementsByTagName("video");console.log("videoDomList",a);for(var n=0;n<a.length;n++){var r=a[n];t!==n&&r.pause()}}(e,t)},children:(0,m.jsx)("source",{src:t.video_url,type:"video/mp4"})})})]},e)}))}),j.expiration_time?(0,m.jsx)("div",{className:"footer",children:(0,m.jsxs)("div",{className:"footer-content",children:[(0,m.jsx)("div",{children:"\u63d0\u793a\uff1a\u672c\u6b21\u8bfe\u7a0b\u7684\u6709\u6548\u671f\u4e3a"}),(0,m.jsxs)("div",{children:[j.expiration_time,"-",j.push_award_time]})]})}):null,(0,m.jsx)(u.v_,{loadMore:function(){return C.apply(this,arguments)},hasMore:T})]})})]})}}}]);
//# sourceMappingURL=396.ccdef4c5.chunk.js.map