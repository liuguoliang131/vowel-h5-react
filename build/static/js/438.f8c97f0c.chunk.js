(self.webpackChunkreact_template=self.webpackChunkreact_template||[]).push([[438],{438:function(e,t,a){"use strict";a.r(t),a.d(t,{default:function(){return A}});var n=a(4165),r=a(2982),s=a(5861),c=a(1413),o=a(885),i=a(2791),l=a(6871),d=a(5664),u=a(6998),p=a.n(u),m=a(9642),f=a(3622),x=a(6429),h=a(184);var A=function(){var e=(0,l.TH)(),t=(0,l.s0)();console.log("location",e);var u=(0,i.useState)(1),A=(0,o.Z)(u,2),v=A[0],g=A[1],w=(0,i.useState)([]),y=(0,o.Z)(w,2),j=y[0],b=y[1],N=(0,i.useState)(""),C=(0,o.Z)(N,2),D=C[0],Z=C[1],R=function(e){4===e.type?t("/layout/myCourse",{state:(0,c.Z)({},e),replace:!1}):2===e.type&&m.Z.openAppPage({page:"myScorePage",params:(0,c.Z)({},e),isNeedLogin:!0})},k=(0,i.useState)(!0),S=(0,o.Z)(k,2),E=S[0],I=S[1];function _(){return(_=(0,s.Z)((0,n.Z)().mark((function t(){var a;return(0,n.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,(0,x.wh)({promotion_id:e.state.id,page:v});case 3:if(a=t.sent,g((function(e){return e+1})),console.log("res",a),0===a.code){t.next=9;break}return I(!1),t.abrupt("return",!1);case 9:a.data&&a.data.list&&a.data.list.length?(b((function(e){return[].concat((0,r.Z)(e),(0,r.Z)(a.data.list))})),Z(a.data.customer_service||""),I(!0)):I(!1),t.next=16;break;case 12:throw t.prev=12,t.t0=t.catch(0),I(!1),t.t0;case 16:case"end":return t.stop()}}),t,null,[[0,12]])})))).apply(this,arguments)}var B=function(){var t=(0,s.Z)((0,n.Z)().mark((function t(){var a;return(0,n.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,g(1),t.next=4,(0,x.wh)({promotion_id:e.state.id,page:v});case 4:a=t.sent,g((function(e){return e+1})),console.log("res",a),a.data&&a.data.list&&a.data.list.length?(Z(a.data.customer_service||""),b((function(e){return[].concat((0,r.Z)(e),(0,r.Z)(a.data))})),I(!0)):(b([]),I(!1)),t.next=14;break;case 10:throw t.prev=10,t.t0=t.catch(0),I(!1),t.t0;case 14:case"end":return t.stop()}}),t,null,[[0,10]])})));return function(){return t.apply(this,arguments)}}();return(0,h.jsxs)("div",{className:"myPrize",children:[(0,h.jsx)(f.Z,{text:"\u6211\u7684\u5956\u54c1"}),(0,h.jsx)(d.t8,{onRefresh:(0,s.Z)((0,n.Z)().mark((function e(){return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",B());case 1:case"end":return e.stop()}}),e)}))),children:(0,h.jsxs)("div",{className:"list",children:[j.map((function(e,t){return 1===e.type?(0,h.jsxs)("div",{className:"item type1",children:[(0,h.jsxs)("div",{className:"item-row1",children:[e.title,(0,h.jsx)("span",{children:"\xd71\u4efd"})]}),(0,h.jsx)("div",{className:"item-row2",children:e.note}),(0,h.jsx)("div",{className:"item-row3",children:(0,h.jsx)("img",{src:e.img_url,alt:""})})]},t):3===e.type?(0,h.jsxs)("div",{className:"item type2",children:[(0,h.jsxs)("div",{className:"item-row1",children:[e.title,(0,h.jsx)("span",{children:"\xd71\u4efd"})]}),(0,h.jsx)("div",{className:"item-row2",children:e.note}),(0,h.jsx)("div",{className:"item-row3",children:(0,h.jsx)("img",{src:e.img_url,alt:""})}),(0,h.jsxs)("div",{className:"item-row4",children:[(0,h.jsx)("div",{className:"item-row4-l copytxt",children:e.batch_no}),(0,h.jsx)("div",{className:"item-row4-r",onClick:function(){return function(e){p()(e.batch_no),d.FN.show({icon:"success",content:"\u590d\u5236\u6210\u529f"})}(e)},children:"\u590d\u5236"})]})]},t):2===e.type?(0,h.jsxs)("div",{className:"item type4",children:[(0,h.jsxs)("div",{className:"item-row1",children:[e.title,(0,h.jsxs)("span",{children:["\xd7",e.integral_num,"\u4efd"]})]}),(0,h.jsx)("div",{className:"item-row2",children:e.note}),(0,h.jsx)("div",{className:"type4-row3",children:(0,h.jsx)("img",{src:e.img_url,alt:""})}),(0,h.jsx)("div",{className:"type4-row4",children:(0,h.jsx)("span",{onClick:function(){return R(e)},children:"\u7acb\u5373\u67e5\u770b"})})]},t):4===e.type?(0,h.jsxs)("div",{className:"item type5",children:[(0,h.jsxs)("div",{className:"item-row1",children:[e.title,(0,h.jsx)("span",{children:"\xd71\u4efd"})]}),(0,h.jsx)("div",{className:"item-row2",children:e.note}),(0,h.jsx)("div",{className:"type5-row3",children:(0,h.jsxs)("span",{onClick:function(){return R(e)},children:[(0,h.jsx)("i",{children:(0,h.jsx)("img",{src:a(676),alt:""})}),"\u7acb\u5373\u89c2\u770b\u8bfe\u7a0b"]})}),(0,h.jsx)("div",{className:"type5-row4",children:e.expiration_time?"\u6709\u6548\u671f\u4e3a\uff1a\u83b7\u5f97\u5956\u54c1\u65e5\u8d77".concat(e.expiration_time,"\u5929\u5185\u968f\u610f\u89c2\u770b\uff01"):"\u5956\u54c1\u6c38\u4e45\u6709\u6548"})]},t):null})),(0,h.jsx)(d.v_,{loadMore:function(){return _.apply(this,arguments)},hasMore:E}),D?(0,h.jsxs)("div",{className:"footer",children:[(0,h.jsx)("a",{download:"\u5143\u97f3\u7b26\u5ba2\u670d\u4e8c\u7ef4\u7801",href:D,children:(0,h.jsx)("img",{src:D,alt:"",className:"qrcode"})}),(0,h.jsx)("div",{className:"footer-tip",children:"\u5fae\u4fe1\u626b\u7801\u6dfb\u52a0\u5ba2\u670d"})]}):null]})})]})}},6998:function(e,t,a){"use strict";var n=a(2458),r={"text/plain":"Text","text/html":"Url",default:"Text"};e.exports=function(e,t){var a,s,c,o,i,l,d=!1;t||(t={}),a=t.debug||!1;try{if(c=n(),o=document.createRange(),i=document.getSelection(),(l=document.createElement("span")).textContent=e,l.ariaHidden="true",l.style.all="unset",l.style.position="fixed",l.style.top=0,l.style.clip="rect(0, 0, 0, 0)",l.style.whiteSpace="pre",l.style.webkitUserSelect="text",l.style.MozUserSelect="text",l.style.msUserSelect="text",l.style.userSelect="text",l.addEventListener("copy",(function(n){if(n.stopPropagation(),t.format)if(n.preventDefault(),"undefined"===typeof n.clipboardData){a&&console.warn("unable to use e.clipboardData"),a&&console.warn("trying IE specific stuff"),window.clipboardData.clearData();var s=r[t.format]||r.default;window.clipboardData.setData(s,e)}else n.clipboardData.clearData(),n.clipboardData.setData(t.format,e);t.onCopy&&(n.preventDefault(),t.onCopy(n.clipboardData))})),document.body.appendChild(l),o.selectNodeContents(l),i.addRange(o),!document.execCommand("copy"))throw new Error("copy command was unsuccessful");d=!0}catch(u){a&&console.error("unable to copy using execCommand: ",u),a&&console.warn("trying IE specific stuff");try{window.clipboardData.setData(t.format||"text",e),t.onCopy&&t.onCopy(window.clipboardData),d=!0}catch(u){a&&console.error("unable to copy using clipboardData: ",u),a&&console.error("falling back to prompt"),s=function(e){var t=(/mac os x/i.test(navigator.userAgent)?"\u2318":"Ctrl")+"+C";return e.replace(/#{\s*key\s*}/g,t)}("message"in t?t.message:"Copy to clipboard: #{key}, Enter"),window.prompt(s,e)}}finally{i&&("function"==typeof i.removeRange?i.removeRange(o):i.removeAllRanges()),l&&document.body.removeChild(l),c()}return d}},2458:function(e){e.exports=function(){var e=document.getSelection();if(!e.rangeCount)return function(){};for(var t=document.activeElement,a=[],n=0;n<e.rangeCount;n++)a.push(e.getRangeAt(n));switch(t.tagName.toUpperCase()){case"INPUT":case"TEXTAREA":t.blur();break;default:t=null}return e.removeAllRanges(),function(){"Caret"===e.type&&e.removeAllRanges(),e.rangeCount||a.forEach((function(t){e.addRange(t)})),t&&t.focus()}}},676:function(e){"use strict";e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAOCAYAAAAbvf3sAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAACqSURBVHgBlZDdDYMgAISFdAEhvHeFbtBNGkdwg7KBTlBHcRNZgJ8FCD1JSbARxUsIAe67AxpjzLIOa+2rqRCBOWTrmRDStW2rSgD9Wz9DCIvW+oPGe03DRoAnSqnMGw+BnxyuOWAeAboaIEkBfF8BougFr8Ob+lulOX43Y0ydAWuq5JwPaaMIIHHC1CPV5ft7gPLed0KIeS9o82jUj0h+lMypIR4iVR4Zk74Nl1E6bwBIbAAAAABJRU5ErkJggg=="}}]);
//# sourceMappingURL=438.f8c97f0c.chunk.js.map