(window.wpJsonpTemplateSections=window.wpJsonpTemplateSections||[]).push([[7],{132:function(t,e){function n(e){return t.exports=n=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},t.exports.__esModule=!0,t.exports.default=t.exports,n(e)}t.exports=n,t.exports.__esModule=!0,t.exports.default=t.exports},136:function(t,e,n){var r=n(184);t.exports=function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");Object.defineProperty(t,"prototype",{value:Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),writable:!1}),e&&r(t,e)},t.exports.__esModule=!0,t.exports.default=t.exports},137:function(t,e,n){var r=n(199).default,o=n(142);t.exports=function(t,e){if(e&&("object"===r(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return o(t)},t.exports.__esModule=!0,t.exports.default=t.exports},142:function(t,e){t.exports=function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t},t.exports.__esModule=!0,t.exports.default=t.exports},152:function(t,e,n){"use strict";n(0);function r(t){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}var o=function t(e,n){if(e===n)return!0;if(r(e)!==r(n)||"object"!==r(e)||null===e||null===n)return!1;var o=Object.keys(e),i=Object.keys(n);if(o.length!==i.length||o.find((function(t){return i.indexOf(t)<0})))return!1;for(var s in e)if(!t(e[s],n[s]))return!1;return!0};function i(t){return(i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function s(t){return t&&t.constructor&&"Object"===t.constructor.name}function c(t,e){return!t&&!e||Array.isArray(t)&&Array.isArray(e)||s(t)&&s(e)||"string"==typeof t&&"string"==typeof e||!isNaN(t)&&!isNaN(e)}function a(t){var e=t.newPointer,n=t.oldPointer,r=new Set;return e.forEach((function(t){n.includes(t)||r.add(t)})),Array.isArray(n)&&n.forEach((function(t){e.includes(t)||r.add(t)})),Array.from(r)}e.a=function t(e,n){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"";if("object"!==i(e)||"object"!==i(n))throw new Error("".concat(t.name," parameters must be Arrays or Objects, received: ").concat(e," and ").concat(n));if(!o(e,n)){if(Array.isArray(e)&&Array.isArray(n))return a({newPointer:e,oldPointer:n});var u=Object.keys(e),f=u.map((function(i){var u=e[i],f=n[i];if(!c(u,f))return"".concat(r).concat(i);if(s(u)&&s(f))return t(u,f,"".concat(r).concat(i,"."));if(Array.isArray(u)){if(o(u,f))return null;var l=a({newPointer:u,oldPointer:f});return"".concat(r).concat(i,"[").concat(l,"]")}return o(u,f)?null:"".concat(r).concat(i)})).filter((function(t){return!!t})),l=a({newPointer:Object.keys(e),oldPointer:Object.keys(n)});return l.forEach((function(t){f.includes("".concat(r).concat(t))||f.push("".concat(r).concat(t))})),f.flat()}return[]}},161:function(t,e,n){var r=n(220),o=n(221),i=n(54),s=n(222);t.exports=function(t,e){return r(t)||o(t,e)||i(t,e)||s()},t.exports.__esModule=!0,t.exports.default=t.exports},181:function(t,e,n){"use strict";n.d(e,"a",(function(){return A}));n(0);var r=n(380),o=n(3),i=n(7),s=n(152);function c(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function a(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?c(Object(n),!0).forEach((function(e){u(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function u(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function f(t,e){return"SITE_PALETTE_COLOR"===(null==t?void 0:t.type)?function(t,e){return e.find((function(e){return e.id===t}))}(t.sitePaletteColor.id,e).value:"CUSTOM_COLOR"===(null==t?void 0:t.type)?t.customColor:void 0}var l=n(35),p="squarespace-bgfx-prefer-paused";function y(t){return(y="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function h(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(t)))return;var n=[],r=!0,o=!1,i=void 0;try{for(var s,c=t[Symbol.iterator]();!(r=(s=c.next()).done)&&(n.push(s.value),!e||n.length!==e);r=!0);}catch(t){o=!0,i=t}finally{try{r||null==c.return||c.return()}finally{if(o)throw i}}return n}(t,e)||function(t,e){if(!t)return;if("string"==typeof t)return v(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return v(t,e)}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function v(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function d(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function g(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function m(t,e){return(m=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function b(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=S(t);if(e){var o=S(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return x(this,n)}}function x(t,e){return!e||"object"!==y(e)&&"function"!=typeof e?P(t):e}function P(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function S(t){return(S=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function O(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var _=[],w=["startColor","endColor","baseColor","backgroundColor","imageTint","patternColor"],j=new Map,A=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&m(t,e)}(u,t);var e,n,o,c=b(u);function u(t,e){var n;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,u),O(P(n=c.call(this)),"shouldCacheComponent",!1),O(P(n),"isDestroyed",!1),O(P(n),"onPauseButtonClick",(function(){var t;n.component.togglePaused(),(t=n.component.isPaused)?localStorage.setItem(p,t):localStorage.removeItem(p),n.component.isPaused&&_.forEach((function(t){t!==P(n)&&t.forcePaused()})),n.updateButtons()})),O(P(n),"getResolvedGenerativeContext",(function(t,e){var n,r,o=e?null==e||null===(n=e.colors)||void 0===n||null===(r=n.palette)||void 0===r?void 0:r.colors:window.__INITIAL_SQUARESPACE_7_1_SITE_PALETTE__;return function(t,e,n){for(var r={},o=0,i=Object.keys(t);o<i.length;o++){var s=i[o];e.includes(s)&&(r[s]=f(t[s],n))}return a(a({},t),r)}(t,w,o)})),O(P(n),"onSectionDataChange",(function(t){var e=t.styles;if(n.shouldCacheComponent=!1,"generative"!==e.backgroundMode)return!1;var r=e.generative,o=Object(s.a)(r,n.currentGenerative);if(n.currentGenerative=r,-1!==o.indexOf("type")||-1!==o.indexOf("customImageId"))return!1;if(n.shouldCacheComponent="none"!==r.type,o.length){var i=n.getResolvedGenerativeContext(r);n.component.setProps(i),n.updateButtons()}return n.component.refresh(),!0})),O(P(n),"destroy",(function(){n.isDestroyed||(n.isDestroyed=!0,n.playButton&&(n.pauseButton.removeEventListener("click",n.onPauseButtonClick),n.playButton.removeEventListener("click",n.onPauseButtonClick)),n.component&&(n.shouldCacheComponent?(j.set(n.sectionId,n.component),n.component.detach()):(j.delete(n.sectionId),n.component.destroy())),n.keepAlive=!1,Object(i.a)().then((function(t){t.disconnectBackground(n.sectionId,n.onSectionDataChange)})),"function"==typeof n.unsubscribeFromSiteAestheticValuesObserver&&n.unsubscribeFromSiteAestheticValuesObserver(),_.splice(_.indexOf(P(n)),1))})),n.section=t.closest("section");var r=n.section.dataset,o=r.sectionId,l=r.currentStyles;return n.sectionId=o,n.currentStyles=JSON.parse(l||{}),n.currentGenerative=n.currentStyles.generative||{},e?(n.initComponent(t,e),n.component.isSupported?(n.initButtons(),Object(i.a)().then((function(t){t.watchBackground(n.sectionId,n.onSectionDataChange)})),n.unsubscribeFromSiteAestheticValuesObserver=Object(i.b)().then((function(t){t.subscribe((function(t,e){if(t.colors.palette!==e.colors.palette){var r=n.getResolvedGenerativeContext(n.currentGenerative,t);n.component.setProps(r)}}))})),_.push(P(n)),n):x(n)):(Object(i.a)().then((function(t){t.watchBackground(n.sectionId,n.onSectionDataChange)})),x(n))}return e=u,(n=[{key:"initComponent",value:function(t,e){var n=t.querySelector(".background-fx-canvas"),o=this.getResolvedGenerativeContext(function(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?d(Object(n),!0).forEach((function(e){O(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):d(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}({reduceMotion:l.b||!!localStorage.getItem(p),pixelRatio:Math.min(1.5,devicePixelRatio)},this.currentGenerative));if(j.has(this.sectionId))return this.component=j.get(this.sectionId),this.component.attach(n),this.component.setProps(o),void this.component.refresh();this.component=new r.a(e,n,o)}},{key:"initButtons",value:function(){var t=h(this.section.querySelectorAll(".background-pause-button"),2),e=t[0],n=t[1];this.pauseButton=e,this.playButton=n,this.pauseButton.addEventListener("click",this.onPauseButtonClick),this.playButton.addEventListener("click",this.onPauseButtonClick),this.updateButtons()}},{key:"forcePaused",value:function(){this.component.setPaused(!0),this.updateButtons()}},{key:"updateButtons",value:function(){var t=this.component,e=t.autoUpdate,n=t.isPaused,r=this.pauseButton===document.activeElement,o=this.playButton===document.activeElement,i=e&&!n,s=e&&n;this.pauseButton.classList.toggle("visible",i),this.playButton.classList.toggle("visible",s),r&&s?this.playButton.focus():o&&i&&this.pauseButton.focus()}}])&&g(e.prototype,n),o&&g(e,o),u}(o.a)},184:function(t,e){function n(e,r){return t.exports=n=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},t.exports.__esModule=!0,t.exports.default=t.exports,n(e,r)}t.exports=n,t.exports.__esModule=!0,t.exports.default=t.exports},199:function(t,e){function n(e){return t.exports=n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t.exports.__esModule=!0,t.exports.default=t.exports,n(e)}t.exports=n,t.exports.__esModule=!0,t.exports.default=t.exports},200:function(t,e,n){"use strict";n.d(e,"d",(function(){return i})),n.d(e,"b",(function(){return c})),n.d(e,"a",(function(){return a})),n.d(e,"c",(function(){return u}));var r=n(161),o=n.n(r),i=(n(0),function(t,e){var n=o()(e,3),r=n[0],i=n[1],s=n[2],c=Math.max(r,i,s),a=Math.min(r,i,s),u=0,f=0,l=(c+a)/2;if(c!==a){var p=c-a;switch(f=l>.5?p/(2-c-a):p/(c+a),c){case r:u=(i-s)/p+(i<s?6:0);break;case i:u=(s-r)/p+2;break;case s:u=(r-i)/p+4}u/=6}return t[0]=u,t[1]=f,t[2]=l,t}),s=function(t,e,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?t+6*(e-t)*n:n<.5?e:n<2/3?t+(e-t)*(2/3-n)*6:t},c=function(t,e){var n=o()(e,3),r=n[0],i=n[1],c=n[2],a=0,u=0,f=0;if(0===i)a=c,u=c,f=c;else{var l=c<.5?c*(1+i):c+i-c*i,p=2*c-l;a=s(p,l,r+1/3),u=s(p,l,r),f=s(p,l,r-1/3)}return t[0]=a,t[1]=u,t[2]=f,t},a=function(t,e,n){return.2126*t+.7152*e+.0722*n},u=function(t){var e,n=[0,0,0,1];if(e=/^((?:rgb|hsl)a?)\(([^\)]*)\)/.exec(t)){var r,o=e[1],i=e[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(i))return n[0]=Math.min(255,parseInt(r[1],10))/255,n[1]=Math.min(255,parseInt(r[2],10))/255,n[2]=Math.min(255,parseInt(r[3],10))/255,n[3]=r[4]?parseFloat(r[4]):1,n;if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(i))return n[0]=Math.min(100,parseInt(r[1],10))/100,n[1]=Math.min(100,parseInt(r[2],10))/100,n[2]=Math.min(100,parseInt(r[3],10))/100,n[3]=r[4]?parseFloat(r[4]):1,n;break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(i)){var c=parseFloat(r[1])/360,a=parseInt(r[2],10)/100,u=parseInt(r[3],10)/100;if(0===a)n[0]=u,n[1]=u,n[2]=u;else{var f=u<=.5?u*(1+a):u+a-u*a,l=2*u-f;n[0]=s(l,f,c+1/3),n[1]=s(l,f,c),n[2]=s(l,f,c-1/3)}return n[3]=r[4]?parseFloat(r[4]):1,n}}}else if(e=/^\#([A-Fa-f\d]+)$/.exec(t)){var p=e[1],y=p.length;if(3===y||4===y)return n[0]=parseInt(p.charAt(0)+p.charAt(0),16)/255,n[1]=parseInt(p.charAt(1)+p.charAt(1),16)/255,n[2]=parseInt(p.charAt(2)+p.charAt(2),16)/255,n[3]=p.charAt(3)?parseInt(p.charAt(3)+p.charAt(3),16)/255:1,n;if(6===y)return n[0]=parseInt(p.charAt(0)+p.charAt(1),16)/255,n[1]=parseInt(p.charAt(2)+p.charAt(3),16)/255,n[2]=parseInt(p.charAt(4)+p.charAt(5),16)/255,n[3]=p.charAt(6)&&p.charAt(7)?parseInt(p.charAt(6)+p.charAt(7),16)/255:1,n}return n}},220:function(t,e){t.exports=function(t){if(Array.isArray(t))return t},t.exports.__esModule=!0,t.exports.default=t.exports},221:function(t,e){t.exports=function(t,e){var n=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=n){var r,o,i=[],s=!0,c=!1;try{for(n=n.call(t);!(s=(r=n.next()).done)&&(i.push(r.value),!e||i.length!==e);s=!0);}catch(t){c=!0,o=t}finally{try{s||null==n.return||n.return()}finally{if(c)throw o}}return i}},t.exports.__esModule=!0,t.exports.default=t.exports},222:function(t,e){t.exports=function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")},t.exports.__esModule=!0,t.exports.default=t.exports},303:function(t,e,n){"use strict";var r=n(304),o=n.n(r),i=n(306),s=n.n(i),c=n(307),a=n.n(c),u=n(308),f=n.n(u);e.a={sub:o.a,length:s.a,copy:a.a,rotate:f.a}},304:function(t,e,n){t.exports=n(305)},305:function(t,e){t.exports=function(t,e,n){return t[0]=e[0]-n[0],t[1]=e[1]-n[1],t}},306:function(t,e){t.exports=function(t){var e=t[0],n=t[1];return Math.sqrt(e*e+n*n)}},307:function(t,e){t.exports=function(t,e){return t[0]=e[0],t[1]=e[1],t}},308:function(t,e){t.exports=function(t,e,n){var r=Math.cos(n),o=Math.sin(n),i=e[0],s=e[1];return t[0]=i*r-s*o,t[1]=i*o+s*r,t}},380:function(t,e,n){"use strict";n.d(e,"a",(function(){return l}));var r=n(110),o=n.n(r),i=n(111),s=n.n(i),c=n(109),a=n.n(c),u=n(19),f=n(214),l=function(){function t(e,n,r){var i=this;o()(this,t),a()(this,"isPaused",!1),a()(this,"isIntersecting",!1),a()(this,"onIntersection",(function(t){i.isIntersecting=t,i.updatePlayState(),i.isIntersecting&&i.isPaused&&i.instance.renderFrame()})),a()(this,"setPaused",(function(t){i.isPaused=t,i.updatePlayState()})),a()(this,"togglePaused",(function(){i.setPaused(!i.isPaused)})),a()(this,"onResize",(function(){i.instance.refresh()})),this.instance=new e(n,r),this.node=n,r.reduceMotion&&(this.isPaused=!0),this.bindListeners()}return s()(t,[{key:"bindListeners",value:function(){this.intersectionScroll=new f.a(this.node,{onIntersection:this.onIntersection,onProgress:this.instance.onScrollProgress}),u.a.on(this.onResize)}},{key:"unbindListeners",value:function(){this.intersectionScroll.destroy(),u.a.off(this.onResize)}},{key:"detach",value:function(){this.unbindListeners(),this.instance.detach(),this.node=null}},{key:"attach",value:function(t){this.node=t,this.bindListeners(),this.instance.attach(t)}},{key:"updatePlayState",value:function(){!this.isIntersecting||this.isPaused?this.instance.stop():this.instance.start()}},{key:"setProps",value:function(t){this.instance.setProps(t)}},{key:"refresh",value:function(){this.instance.refresh()}},{key:"destroy",value:function(){this.unbindListeners(),this.instance.destroy()}},{key:"props",get:function(){return this.instance.props}},{key:"autoUpdate",get:function(){return this.instance.autoUpdate}},{key:"isSupported",get:function(){return this.instance.isSupported}}]),t}()},989:function(t,e,n){"use strict";n.r(e);n(0);var r=n(161),o=n.n(r),i=n(141),s=n.n(i),c=n(110),a=n.n(c),u=n(111),f=n.n(u),l=n(136),p=n.n(l),y=n(137),h=n.n(y),v=n(132),d=n.n(v),g=n(109),m=n.n(g),b=n(946),x=n(494),P=n(375),S=n(378),O=n(244),_=n(303),w=n(200),j="\nattribute vec3 aPosition;\n\nvarying vec2 vUv;\n\nvoid main() {\n  gl_Position = vec4(aPosition, 1.0);\n  vUv = gl_Position.xy * 0.5 + 0.5;\n}\n",A='\n#ifndef PI\n#define PI 3.141592653589793\n#endif\n\nfloat ease(float t) {\n  return -0.5 * (cos(PI * t) - 1.0);\n}\n\n//\n// GLSL textureless classic 3D noise "cnoise",\n// with an RSL-style periodic variant "pnoise".\n// Author:  Stefan Gustavson (stefan.gustavson@liu.se)\n// Version: 2011-10-11\n//\n// Many thanks to Ian McEwan of Ashima Arts for the\n// ideas for permutation and gradient selection.\n//\n// Copyright (c) 2011 Stefan Gustavson. All rights reserved.\n// Distributed under the MIT license. See LICENSE file.\n// https://github.com/ashima/webgl-noise\n//\n\nvec3 mod289_2013602866(vec3 x)\n{\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 mod289_2013602866(vec4 x)\n{\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 permute_2013602866(vec4 x)\n{\n  return mod289_2013602866(((x*34.0)+1.0)*x);\n}\n\nvec4 taylorInvSqrt_2013602866(vec4 r)\n{\n  return 1.79284291400159 - 0.85373472095314 * r;\n}\n\nvec3 fade_2013602866(vec3 t) {\n  return t*t*t*(t*(t*6.0-15.0)+10.0);\n}\n\n// Classic Perlin noise\nfloat cnoise(vec3 P)\n{\n  vec3 Pi0 = floor(P); // Integer part for indexing\n  vec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1\n  Pi0 = mod289_2013602866(Pi0);\n  Pi1 = mod289_2013602866(Pi1);\n  vec3 Pf0 = fract(P); // Fractional part for interpolation\n  vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0\n  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);\n  vec4 iy = vec4(Pi0.yy, Pi1.yy);\n  vec4 iz0 = Pi0.zzzz;\n  vec4 iz1 = Pi1.zzzz;\n\n  vec4 ixy = permute_2013602866(permute_2013602866(ix) + iy);\n  vec4 ixy0 = permute_2013602866(ixy + iz0);\n  vec4 ixy1 = permute_2013602866(ixy + iz1);\n\n  vec4 gx0 = ixy0 * (1.0 / 7.0);\n  vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;\n  gx0 = fract(gx0);\n  vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);\n  vec4 sz0 = step(gz0, vec4(0.0));\n  gx0 -= sz0 * (step(0.0, gx0) - 0.5);\n  gy0 -= sz0 * (step(0.0, gy0) - 0.5);\n\n  vec4 gx1 = ixy1 * (1.0 / 7.0);\n  vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;\n  gx1 = fract(gx1);\n  vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);\n  vec4 sz1 = step(gz1, vec4(0.0));\n  gx1 -= sz1 * (step(0.0, gx1) - 0.5);\n  gy1 -= sz1 * (step(0.0, gy1) - 0.5);\n\n  vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);\n  vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);\n  vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);\n  vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);\n  vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);\n  vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);\n  vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);\n  vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);\n\n  vec4 norm0 = taylorInvSqrt_2013602866(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));\n  g000 *= norm0.x;\n  g010 *= norm0.y;\n  g100 *= norm0.z;\n  g110 *= norm0.w;\n  vec4 norm1 = taylorInvSqrt_2013602866(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));\n  g001 *= norm1.x;\n  g011 *= norm1.y;\n  g101 *= norm1.z;\n  g111 *= norm1.w;\n\n  float n000 = dot(g000, Pf0);\n  float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));\n  float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));\n  float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));\n  float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));\n  float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));\n  float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));\n  float n111 = dot(g111, Pf1);\n\n  vec3 fade_xyz = fade_2013602866(Pf0);\n  vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);\n  vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);\n  float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);\n  return 2.2 * n_xyz;\n}\n\nuniform float uAspect;\nuniform float uBevelStrength;\nuniform float uComplexity;\nuniform float uCutOff;\nuniform float uMorphTime;\nuniform float uScale;\nuniform float uSeed;\nuniform float uSteps;\nuniform vec2 uBevelOffset;\nuniform vec2 uTravel;\nuniform vec3 uColorEnd;\nuniform vec3 uColorStart;\nvarying vec2 vUv;\n\nfloat getNoise (vec2 uv, vec2 travel, float n1, float n2, float t) {\n  return (\n    (cnoise(vec3(uv * n1 - travel + uSeed, t)) +\n      cnoise(vec3(uv * n2 - travel + uSeed, t)) * 0.1) *\n      0.5 +\n    0.5\n  );\n}\n\nfloat getDepth (float noise) {\n  return max(0.0, noise - uCutOff) / (1.0 - uCutOff);\n}\n\nvoid main () {\n  vec2 uv = (vUv - 0.5);\n  float morphTime = uMorphTime + uSeed;\n\n  uv.x *= uAspect;\n\n  float baseNoise = ease(getNoise(uv, uTravel, uScale, uComplexity, morphTime));\n  float baseDepth = getDepth(baseNoise);\n  float baseDepthColorStrength = baseDepth;\n\n  #ifndef IS_BLUR_ENABLED\n  baseDepth = floor(baseDepth * uSteps + 0.5);\n  baseDepthColorStrength = baseDepth / uSteps;\n  #endif\n\n  vec4 color = vec4(mix(uColorStart, uColorEnd, baseDepthColorStrength), 1.0);\n\n  #ifdef IS_BEVEL_ENABLED\n  float offsetNoise = ease(\n    getNoise(uv + uBevelOffset, uTravel, uScale, uComplexity, morphTime)\n  );\n  float offsetDepth = floor(getDepth(offsetNoise) * uSteps + 0.5);\n  float highlight = baseDepth - offsetDepth;\n  float lowlight = offsetDepth - baseDepth;\n\n  color.rgb += (highlight - lowlight) * uBevelStrength;\n\n  #endif\n\n  gl_FragColor = color;\n}\n';function I(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=d()(t);if(e){var o=d()(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return h()(this,n)}}var C=function(t){p()(n,t);var e=I(n);function n(t,r){var o;return a()(this,n),(o=e.call(this,t,r)).isSupported?(o.programKey=o.getProgramKey(o.props),o.createResources(),o.updateAutoUpdate(),o):h()(o)}return f()(n,[{key:"createResources",value:function(){this.drawInfo=Object(b.a)({program:this.createProgram(this.props),uniforms:s()({uMorphTime:0,uTravel:[0,0],uTravelDirection:[0,0],uAspect:this.canvas.width/this.canvas.height},this.updateUniforms({},this.props)),geometry:this.getGeometry({key:"big-triangle",factory:function(){return Object(x.a)()}})})}},{key:"createProgram",value:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return this.getProgram({key:this.programKey,factory:function(){return new P.a({vert:j,frag:t.concatFragmentShader(A,e)})}})}},{key:"concatFragmentShader",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=e.isBlurEnabled,r=e.isBevelEnabled;return"\n    ".concat(n?"#define IS_BLUR_ENABLED":"","\n    ").concat(!n&&r?"#define IS_BEVEL_ENABLED":"","\n    ").concat(t,"\n    ")}},{key:"getProgramKey",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=t.isBlurEnabled,n=t.isBevelEnabled;return"contours-program-".concat(+e,"-").concat(+(!e&&n))}},{key:"updateProgram",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=this.getProgramKey(t);e!==this.programKey&&(this.releaseResource(this.programKey),this.programKey=e,this.drawInfo.program=this.createProgram(t))}},{key:"updateUniforms",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=this.getColors(),r=o()(n,2),i=r[0],s=r[1];return Object.assign(t,{uTravelDirection:_.a.rotate([],[1,0],e.travelDirection),uBevelOffset:_.a.rotate([],[1e-4*e.bevelSize,0],e.bevelRotation*Math.PI/180),uBevelStrength:.01*e.bevelStrength,uComplexity:e.complexity,uCutOff:.01*Math.min(e.cutoff,99.99),uColorStart:i,uColorEnd:s,uScale:.2*Math.max(1,100-e.scale),uSeed:.1*e.seed,uSteps:e.steps}),t}},{key:"updateAutoUpdate",value:function(){var t=this.props,e=t.speedTravel,n=t.speedMorph;this.autoUpdate=!(!e&&!n)}},{key:"onUpdateProps",value:function(t){t.seed!==this.props.seed&&(this.uniforms.uTravel=[0,0],this.uniforms.uMorphTime=0),this.updateProgram(this.props),this.updateUniforms(this.uniforms,this.props),this.updateAutoUpdate(),this.refresh()}},{key:"update",value:function(){var t=25e-6*this.props.speedTravel,e=this.uniforms.uTravelDirection;this.uniforms.uMorphTime+=1e-5*this.props.speedMorph,this.uniforms.uTravel[0]+=t*e[0],this.uniforms.uTravel[1]+=t*e[1]}},{key:"render",value:function(){Object(S.a)(this.renderer,this.drawInfo)}},{key:"onRefresh",value:function(){this.uniforms.uAspect=this.canvas.width/this.canvas.height}},{key:"uniforms",get:function(){return this.drawInfo.uniforms}},{key:"getColors",value:function(){var t=Object(w.c)(this.props.startColor),e=Object(w.c)(this.props.endColor);return this.props.invertColors?[e,t]:[t,e]}}]),n}(O.a);function z(t){return(z="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function k(t,e){return(k=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function E(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=D(t);if(e){var o=D(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return B(this,n)}}function B(t,e){return!e||"object"!==z(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function D(t){return(D=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}m()(C,"defaultProps",{startColor:"#ffffff",endColor:"#000000",invertColors:!1,complexity:0,cutoff:0,scale:1,seed:0,speedMorph:0,speedTravel:0,travelDirection:0,isBlurEnabled:!1,steps:2,isBevelEnabled:!1,bevelRotation:0,bevelSize:0,bevelStrength:0});var M=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&k(t,e)}(n,t);var e=E(n);function n(t){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,n),e.call(this,t,C)}return n}(n(181).a);e.default=function(t){return new M(t)}}}]);