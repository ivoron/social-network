(this["webpackJsonpnetwork-app"]=this["webpackJsonpnetwork-app"]||[]).push([[4],{294:function(e,a,t){},299:function(e,a,t){"use strict";t.r(a);var n=t(0),s=t.n(n),r=t(13);function l(e){var a="/dialogs/"+e.personId;return s.a.createElement("div",null,s.a.createElement("li",null,s.a.createElement(r.b,{to:a},e.personName)))}function c(e){return s.a.createElement("div",null,s.a.createElement("span",null,e.message)," ",s.a.createElement("br",null))}var m=t(119),o=t(120),u=function(e){var a=e.dialogsPage,t=e.sendMessage,n=a.dialogs.map((function(e){return s.a.createElement(l,{key:e.id,personId:e.id,personName:e.name})})),r=a.messages.map((function(e){return s.a.createElement(c,{key:e.id,message:e.message})})),u=Object(o.a)({form:"send-message"})((function(e){var a=e.handleSubmit;return s.a.createElement("form",{onSubmit:a},s.a.createElement(m.a,{name:"message",component:"textarea",placeholder:"enter your message",className:"addMessage"}),s.a.createElement("br",null),s.a.createElement("button",null,"send"))}));return s.a.createElement("div",{className:"dialogs"},s.a.createElement("div",{className:"chatItems"},s.a.createElement("ul",null,n)),s.a.createElement("div",{className:"chatBody"},s.a.createElement("div",{className:"chatField"},r),s.a.createElement(u,{onSubmit:function(e){t(e.message)}})))},i=t(96),d=t(12),g=t(86),p=t(9);t(294),a.default=Object(p.d)(Object(d.b)((function(e){return{dialogsPage:e.dialogsPage}}),{sendMessage:i.b}),g.a)(u)}}]);
//# sourceMappingURL=4.2009c403.chunk.js.map