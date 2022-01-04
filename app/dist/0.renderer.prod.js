exports.ids=[0],exports.modules={"./app/containers/CounterPage.tsx":function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return j}));n("./node_modules/react/index.js");var r,o=n("./node_modules/react-redux/es/index.js"),a=n("./node_modules/react-router-dom/esm/react-router-dom.js"),c=n("./app/features/counter/Counter.css"),i=n.n(c),s=n("./app/constants/routes.json"),u=n("./app/features/counter/counterSlice.ts");function l(e,t,n,o){r||(r="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var a=e&&e.defaultProps,c=arguments.length-3;if(t||0===c||(t={children:void 0}),1===c)t.children=o;else if(c>1){for(var i=new Array(c),s=0;s<c;s++)i[s]=arguments[s+3];t.children=i}if(t&&a)for(var u in a)void 0===t[u]&&(t[u]=a[u]);else t||(t=a||{});return{$$typeof:r,type:e,key:void 0===n?null:""+n,ref:null,props:t,_owner:null}}var d,f=l("i",{className:"fa fa-arrow-left fa-3x"}),m=l("i",{className:"fa fa-plus"}),v=l("i",{className:"fa fa-minus"});function p(){var e=Object(o.d)(),t=Object(o.e)(u.f);return l("div",{},void 0,l("div",{className:i.a.backButton,"data-tid":"backButton"},void 0,l(a.a,{to:s.HOME},void 0,f)),l("div",{className:"counter ".concat(i.a.counter),"data-tid":"counter"},void 0,t),l("div",{className:i.a.btnGroup},void 0,l("button",{className:i.a.btn,onClick:function(){e(Object(u.c)())},"data-tclass":"btn",type:"button"},void 0,m),l("button",{className:i.a.btn,onClick:function(){e(Object(u.a)())},"data-tclass":"btn",type:"button"},void 0,v),l("button",{className:i.a.btn,onClick:function(){e(Object(u.e)())},"data-tclass":"btn",type:"button"},void 0,"odd"),l("button",{className:i.a.btn,onClick:function(){e(Object(u.d)())},"data-tclass":"btn",type:"button"},void 0,"async")))}function b(e,t,n,r){d||(d="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var o=e&&e.defaultProps,a=arguments.length-3;if(t||0===a||(t={children:void 0}),1===a)t.children=r;else if(a>1){for(var c=new Array(a),i=0;i<a;i++)c[i]=arguments[i+3];t.children=c}if(t&&o)for(var s in o)void 0===t[s]&&(t[s]=o[s]);else t||(t=o||{});return{$$typeof:d,type:e,key:void 0===n?null:""+n,ref:null,props:t,_owner:null}}var y=b(p,{});function j(){return y}},"./app/features/counter/Counter.css":function(e,t,n){e.exports={backButton:"Counter__backButton__36cu-",counter:"Counter__counter__26nx-",btnGroup:"Counter__btnGroup__15oL3",btn:"Counter__btn__20dlg"}},"./node_modules/react-router-dom/esm/react-router-dom.js":function(e,t,n){"use strict";n.d(t,"a",(function(){return b}));var r=n("./node_modules/react-router/esm/react-router.js"),o=n("./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js"),a=n("./node_modules/react/index.js"),c=n.n(a),i=n("./node_modules/history/esm/history.js"),s=(n("./node_modules/prop-types/index.js"),n("./node_modules/@babel/runtime/helpers/esm/extends.js")),u=n("./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js"),l=n("./node_modules/tiny-invariant/dist/tiny-invariant.esm.js");c.a.Component;c.a.Component;var d=function(e,t){return"function"==typeof e?e(t):e},f=function(e,t){return"string"==typeof e?Object(i.c)(e,null,null,t):e},m=function(e){return e},v=c.a.forwardRef;void 0===v&&(v=m);var p=v((function(e,t){var n=e.innerRef,r=e.navigate,o=e.onClick,a=Object(u.a)(e,["innerRef","navigate","onClick"]),i=a.target,l=Object(s.a)({},a,{onClick:function(e){try{o&&o(e)}catch(t){throw e.preventDefault(),t}e.defaultPrevented||0!==e.button||i&&"_self"!==i||function(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}(e)||(e.preventDefault(),r())}});return l.ref=m!==v&&t||n,c.a.createElement("a",l)}));var b=v((function(e,t){var n=e.component,o=void 0===n?p:n,a=e.replace,i=e.to,b=e.innerRef,y=Object(u.a)(e,["component","replace","to","innerRef"]);return c.a.createElement(r.d.Consumer,null,(function(e){e||Object(l.a)(!1);var n=e.history,r=f(d(i,e.location),e.location),u=r?n.createHref(r):"",p=Object(s.a)({},y,{href:u,navigate:function(){var t=d(i,e.location);(a?n.replace:n.push)(t)}});return m!==v?p.ref=t||b:p.innerRef=b,c.a.createElement(o,p)}))})),y=function(e){return e},j=c.a.forwardRef;void 0===j&&(j=y);j((function(e,t){var n=e["aria-current"],o=void 0===n?"page":n,a=e.activeClassName,i=void 0===a?"active":a,m=e.activeStyle,v=e.className,p=e.exact,_=e.isActive,h=e.location,C=e.sensitive,O=e.strict,x=e.style,N=e.to,k=e.innerRef,g=Object(u.a)(e,["aria-current","activeClassName","activeStyle","className","exact","isActive","location","sensitive","strict","style","to","innerRef"]);return c.a.createElement(r.d.Consumer,null,(function(e){e||Object(l.a)(!1);var n=h||e.location,a=f(d(N,n),n),u=a.pathname,R=u&&u.replace(/([.+*?=^!:${}()[\]|/\\])/g,"\\$1"),w=R?Object(r.e)(n.pathname,{path:R,exact:p,sensitive:C,strict:O}):null,S=!!(_?_(w,n):w),E=S?function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return t.filter((function(e){return e})).join(" ")}(v,i):v,$=S?Object(s.a)({},x,{},m):x,A=Object(s.a)({"aria-current":S&&o||null,className:E,style:$,to:a},g);return y!==j?A.ref=t||k:A.innerRef=k,c.a.createElement(b,A)}))}))}};