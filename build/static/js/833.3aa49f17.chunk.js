"use strict";(self.webpackChunkreact_template=self.webpackChunkreact_template||[]).push([[833],{9833:function(e,t,s){s.r(t),s.d(t,{default:function(){return u}});var i=s(4165),r=s(5861),n=s(885),a=s(2791),o=(s(457),s(3622)),c=s(9642),A=s(2377),l=s.n(A),d=s(6429),h=s(6871),f=s(184);var u=function(){var e=(0,a.useState)({user_name:"",user_avatar:"",poster_url:""}),t=(0,n.Z)(e,2),A=t[0],u=t[1],g=(0,a.useRef)(),m=(0,a.useRef)(),p=(0,h.TH)(),v=function(){var e=(0,r.Z)((0,i.Z)().mark((function e(){var t;return(0,i.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,d.EU)({promotion_id:p.state.id||1});case 2:if(0===(t=e.sent).code){e.next=5;break}return e.abrupt("return",!1);case 5:u(t.data);case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),w=function(){if(console.log("viewRef",m),g.current&&m.current){var e=g.current,t=m.current;t.width=e.offsetWidth,t.height=e.offsetHeight;var s=375,i=517,r={x:0,y:0,width:0,height:0};r.x=14*e.offsetWidth/s,r.y=17*e.offsetHeight/i,r.width=30*e.offsetWidth/s,r.height=30*e.offsetWidth/s;var n={x:50*e.offsetWidth/s,y:37*e.offsetHeight/i,fontSize:15*e.offsetHeight/i},a={x:147*e.offsetWidth/s,y:405*e.offsetHeight/i,width:82*e.offsetWidth/s,height:82*e.offsetWidth/s},o=t.getContext("2d"),c=null;(c=new Image).crossOrigin="anonymous",c.setAttribute("crossOrigin","anonymous");var d=new Image;d.setAttribute("crossOrigin","anonymous"),d.crossOrigin="anonymous";var h=document.createElement("div");h.height=a.height,h.width=a.width;var f=window.location.protocol+"//"+window.location.host+"/#/layout/home?id=".concat(p.state.id,"&share_sign=").concat(A.share_sign),u=(v=a.width,w=a.height,x=f,b="canvas",y=h,new(l())(y,{width:v,height:w,text:x,render:b,correctLevel:1}));console.log("qrcodeObj src",u._el.children[1]),d.onload=function(){alert("code2onload"),console.log("codeImg.src1",d.src),o.drawImage(d,a.x,a.y,a.width,a.width)},d.onerror=function(e){alert("codeImg error")},c.src=A.poster_url+"?v="+Math.random(),c.onload=function(){o.drawImage(c,0,0,e.offsetWidth,e.offsetHeight),o.font="".concat(n.fontSize,"px PingFang SC"),o.textAlign="left",console.log("title.x, title.y",n.x,n.y),o.fillText(A.user_name,n.x,n.y),d.src=u._el.children[1].src;var t=new Image;t.crossOrigin="anonymous",t.setAttribute("crossOrigin","anonymous"),t.onload=function(){console.log("ava.x, ava.y, ava.width, ava.height",r.x,r.y,r.width,r.height),o.arc(r.x+r.width/2,r.y+r.height/2,r.width/2,0,2*Math.PI),o.clip(),o.drawImage(t,r.x,r.y,r.width,r.height)},t.src=A.user_avatar+"?v="+Math.random(),console.log("avaImg src",t.src)}}var v,w,x,b,y},x=function(){m.current.toBlob((function(e){var t=Date.now().toString(),s=document.createElement("a");document.body.append(s),s.download="".concat(t,".png"),s.href=URL.createObjectURL(e),s.click(),s.remove()}))};return(0,a.useEffect)((function(){v()}),[]),(0,a.useEffect)((function(){w()}),[m,g,A]),(0,f.jsxs)("div",{className:"poster",children:[(0,f.jsx)(o.Z,{text:"\u62bd\u5956\u6d77\u62a5"}),A.share_sign?(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)("div",{className:"poster-box",children:(0,f.jsx)("div",{className:"full",ref:g,children:(0,f.jsx)("canvas",{ref:m})})}),(0,f.jsxs)("div",{className:"bottom-box",children:[(0,f.jsx)("a",{className:"save-the",download:!0,href:"javascript:;",onClick:function(){x()},children:"\u70b9\u51fb\u4fdd\u5b58\u6d77\u62a5"}),(0,f.jsxs)("div",{className:"bottom-box-share",children:[(0,f.jsxs)("div",{className:"line",children:[(0,f.jsx)("div",{className:"line-1"}),(0,f.jsx)("div",{className:"line-1"})]}),(0,f.jsx)("div",{className:"share-title",children:"\u5206\u4eab\u81f3\u5fae\u4fe1\u6216\u670b\u53cb\u5708"}),(0,f.jsxs)("div",{className:"share-btns",children:[(0,f.jsxs)("div",{className:"share-btns-friends",children:[(0,f.jsx)("img",{onClick:function(){return c.Z.shareWebToWX("title","desc","https://www.baidu.com","coverurl")},src:s(8621),alt:""}),(0,f.jsx)("span",{children:"\u5fae\u4fe1"})]}),(0,f.jsxs)("div",{className:"share-btns-friends",children:[(0,f.jsx)("img",{onClick:function(){return c.Z.shareWebToWX("title","desc","https://www.baidu.com","coverurl")},src:s(2518),alt:""}),(0,f.jsx)("span",{children:"\u670b\u53cb\u5708"})]})]})]})]})]}):null]})}},2518:function(e){e.exports="data:image/png;base64,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"},8621:function(e){e.exports="data:image/png;base64,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"}}]);
//# sourceMappingURL=833.3aa49f17.chunk.js.map