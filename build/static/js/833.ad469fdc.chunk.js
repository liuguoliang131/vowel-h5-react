"use strict";(self.webpackChunkreact_template=self.webpackChunkreact_template||[]).push([[833],{9833:function(e,t,s){s.r(t),s.d(t,{default:function(){return p}});var r=s(1413),a=s(4165),n=s(5861),o=s(885),i=s(2791),c=(s(457),s(3622)),A=(s(9642),s(2377)),l=s.n(A),u=s(6429),f=s(6871),g=s(4569),h=s.n(g),d=s(184);var p=function(){var e=(0,i.useState)({user_name:"",user_avatar:"",poster_url:""}),t=(0,o.Z)(e,2),A=t[0],g=t[1],p=(0,i.useRef)(),m=(0,i.useRef)(),v=(0,f.TH)(),w=function(e){console.log("blobToBase64 1",e);var t=new FileReader;return t.readAsDataURL(e),new Promise((function(e){t.onload=function(t){e(t.target.result)}}))},x=function(){var e=(0,n.Z)((0,a.Z)().mark((function e(t){var s,r;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,h().get(t,{responseType:"blob"});case 2:return s=e.sent,e.next=5,w(new Blob([s.data],{type:s.headers["content-type"]}));case 5:return r=e.sent,e.abrupt("return",r);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),b=function(){var e=(0,n.Z)((0,a.Z)().mark((function e(){var t,s;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,u.EU)({promotion_id:v.state.id});case 2:if(0===(t=e.sent).code){e.next=5;break}return e.abrupt("return",!1);case 5:return s={posterUrl:"",userAvatar:""},e.next=8,x(t.data.poster_url);case 8:return s.posterUrl=e.sent,e.next=11,x(t.data.user_avatar);case 11:s.userAvatar=e.sent,console.log("resData",s),g((0,r.Z)((0,r.Z)({},t.data),s));case 14:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),y=function(){if(console.log("viewRef",m),p.current&&m.current){var e=p.current,t=m.current;t.width=e.offsetWidth,t.height=e.offsetHeight;var s=375,r=517,a={x:0,y:0,width:0,height:0};a.x=14*e.offsetWidth/s,a.y=17*e.offsetHeight/r,a.width=30*e.offsetWidth/s,a.height=30*e.offsetWidth/s;var n={x:50*e.offsetWidth/s,y:37*e.offsetHeight/r,fontSize:15*e.offsetHeight/r},o={x:147*e.offsetWidth/s,y:405*e.offsetHeight/r,width:82*e.offsetWidth/s,height:82*e.offsetWidth/s},i=t.getContext("2d"),c=null;(c=new Image).crossOrigin="anonymous",c.setAttribute("crossOrigin","anonymous");var u=new Image;u.setAttribute("crossOrigin","anonymous"),u.crossOrigin="anonymous";var f=document.createElement("div");f.height=o.height,f.width=o.width;var g=window.location.protocol+"//"+window.location.host+"/#/layout/home?id=".concat(v.state.id,"&share_sign=").concat(A.share_sign),h=(w=o.width,x=o.height,b=g,y="canvas",D=f,new(l())(D,{width:w,height:x,text:b,render:y,correctLevel:1})),d=h._el.querySelector("canvas").toDataURL("image/png");console.log("qrcodeObj src",h._el.children[1]),u.onload=function(){console.log("codeImg.src1",u.src),i.drawImage(u,o.x,o.y,o.width,o.width)},u.onerror=function(e){},c.onerror=function(e){console.log("image error",e)},c.onload=function(){console.log("image"),i.drawImage(c,0,0,e.offsetWidth,e.offsetHeight),i.font="".concat(n.fontSize,"px PingFang SC"),i.textAlign="left",console.log("title.x, title.y",n.x,n.y),i.fillText(A.user_name,n.x,n.y),u.src=d;var t=new Image;t.crossOrigin="anonymous",t.setAttribute("crossOrigin","anonymous"),t.onload=function(){console.log("ava.x, ava.y, ava.width, ava.height",a.x,a.y,a.width,a.height),i.arc(a.x+a.width/2,a.y+a.height/2,a.width/2,0,2*Math.PI),i.clip(),i.drawImage(t,a.x,a.y,a.width,a.height)},t.src=A.userAvatar,console.log("avaImg src",t.src)},c.src=A.posterUrl,console.log("image.src",c)}var w,x,b,y,D};return(0,i.useEffect)((function(){b()}),[]),(0,i.useEffect)((function(){y()}),[m,p,A]),(0,d.jsxs)("div",{className:"poster",children:[(0,d.jsx)(c.Z,{text:"\u62bd\u5956\u6d77\u62a5"}),A.share_sign?(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)("div",{className:"poster-box",children:(0,d.jsx)("div",{className:"full",ref:p,children:(0,d.jsx)("canvas",{ref:m})})}),(0,d.jsxs)("div",{className:"bottom-box",children:[(0,d.jsx)("a",{className:"save-the",download:!0,href:"javascript:;",onClick:function(){return function(){try{var e=document.createElement("a");e.download="\u5206\u4eab\u6d77\u62a5",e.href=m.current.toDataURL("image/png;base64"),e.click()}catch(t){console.log(t),alert(t.message)}}()},children:"\u70b9\u51fb\u4fdd\u5b58\u6d77\u62a5"}),(0,d.jsxs)("div",{className:"bottom-box-share",children:[(0,d.jsx)("div",{className:"share-1",children:"\u53ef\u5206\u4eab\u81f3\u5fae\u4fe1\u6216\u670b\u53cb\u5708"}),(0,d.jsx)("img",{src:s(8621),alt:"",className:"share-2"}),(0,d.jsx)("img",{src:s(2518),alt:"",className:"share-3"})]})]})]}):null]})}},2518:function(e){e.exports="data:image/png;base64,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"},8621:function(e){e.exports="data:image/png;base64,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"}}]);
//# sourceMappingURL=833.ad469fdc.chunk.js.map