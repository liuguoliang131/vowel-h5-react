"use strict";(self.webpackChunkreact_template=self.webpackChunkreact_template||[]).push([[396],{8396:function(e,t,a){a.r(t),a.d(t,{default:function(){return h}});var r=a(4165),n=a(2982),i=a(5861),s=a(885),o=a(2791),c=a(3622),u=a(457),l=a(6429),d=a(9642),p=a(184);var h=function(){var e=(0,o.useState)(1),t=(0,s.Z)(e,2),a=t[0],h=t[1],m=(0,o.useState)([]),v=((0,s.Z)(m,1)[0],(0,o.useState)({expiration_time:"",push_award_time:""})),x=(0,s.Z)(v,2),_=x[0],f=x[1],Z=d.Z.getHashQuery(),j=(0,o.useState)([]),w=(0,s.Z)(j,2),g=w[0],y=w[1],k=(0,o.useState)(!0),N=(0,s.Z)(k,2),b=N[0],S=N[1];function C(){return(C=(0,i.Z)((0,r.Z)().mark((function e(){var t;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,(0,l.UJ)({course_id:location.state.course_id||Z.query.course_id,page:a});case 3:t=e.sent,h((function(e){return e+1})),0!==t.code&&S(!1),t.data&&t.data.list&&t.data.list.length?(y((function(e){return[].concat((0,n.Z)(e),(0,n.Z)(t.data.list))})),f({expiration_time:t.data.expiration_time,push_award_time:t.data.push_award_time}),S(t.data.list.length>0)):S(!1),e.next=13;break;case 9:throw e.prev=9,e.t0=e.catch(0),S(!1),e.t0;case 13:case"end":return e.stop()}}),e,null,[[0,9]])})))).apply(this,arguments)}var M=function(){var e=(0,i.Z)((0,r.Z)().mark((function e(){var t;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,h(1),e.next=4,(0,l.UJ)({course_id:location.state.course_id||Z.query.course_id,page:a});case 4:t=e.sent,h((function(e){return e+1})),console.log("res",t),t.data&&t.data.list&&t.data.list.length?(f({expiration_time:t.data.expiration_time,push_award_time:t.data.push_award_time}),y((function(e){return(0,n.Z)(t.data)})),S(t.data.list.length>0)):(y([]),S(!1)),e.next=14;break;case 10:throw e.prev=10,e.t0=e.catch(0),S(!1),e.t0;case 14:case"end":return e.stop()}}),e,null,[[0,10]])})));return function(){return e.apply(this,arguments)}}();return(0,p.jsxs)("div",{className:"MyCourse",children:[(0,p.jsx)(c.Z,{text:"\u6211\u7684\u5956\u54c1"}),(0,p.jsx)(u.t8,{onRefresh:function(){return M()},children:(0,p.jsxs)("div",{className:"list",children:[(0,p.jsx)("div",{className:"scroll-box",children:g.map((function(e,t){return(0,p.jsxs)("div",{className:"item",children:[(0,p.jsx)("div",{className:"item-title",children:e.title}),(0,p.jsx)("div",{className:"item-video",children:(0,p.jsx)("video",{controls:!0,controlslist:"nodownload noremoteplayback",poster:e.img_url,disablePictureInPicture:!0,onPlay:function(e){return function(e,t){console.log(e,t);var a=document.getElementsByTagName("video");console.log("videoDomList",a);for(var r=0;r<a.length;r++){var n=a[r];e!==r&&n.pause()}}(t,e)},children:(0,p.jsx)("source",{src:e.video_url,type:"video/mp4"})})})]},t)}))}),_.expiration_time?(0,p.jsx)("div",{className:"footer",children:(0,p.jsxs)("div",{className:"footer-content",children:[(0,p.jsx)("div",{children:"\u63d0\u793a\uff1a\u672c\u6b21\u8bfe\u7a0b\u7684\u6709\u6548\u671f\u4e3a"}),(0,p.jsxs)("div",{children:[_.expiration_time,"-",_.push_award_time]})]})}):null,(0,p.jsx)(u.v_,{loadMore:function(){return C.apply(this,arguments)},hasMore:b})]})})]})}}}]);
//# sourceMappingURL=396.8b4c58a4.chunk.js.map