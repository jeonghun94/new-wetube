(()=>{var e={131:(e,t,r)=>{const n=r(927),{devDependencies:o}=r(681);e.exports={corePath:"undefined"!=typeof process&&"development"===process.env.FFMPEG_ENV?n("/node_modules/@ffmpeg/core/dist/ffmpeg-core.js"):`https://unpkg.com/@ffmpeg/core@${o["@ffmpeg/core"].substring(1)}/dist/ffmpeg-core.js`}},766:(e,t,r)=>{const n=r(927);e.exports=async e=>{let t=e;if(void 0===e)return new Uint8Array;if("string"==typeof e)if(/data:_data\/([a-zA-Z]*);base64,([^"]*)/.test(e))t=atob(e.split(",")[1]).split("").map((e=>e.charCodeAt(0)));else{const r=await fetch(n(e));t=await r.arrayBuffer()}else(e instanceof File||e instanceof Blob)&&(t=await(r=e,new Promise(((e,t)=>{const n=new FileReader;n.onload=()=>{e(n.result)},n.onerror=e=>{let{target:{error:{code:r}}}=e;t(Error(`File could not be read! Code=${r}`))},n.readAsArrayBuffer(r)}))));var r;return new Uint8Array(t)}},82:(e,t,r)=>{const n=r(927),{log:o}=r(380),i=async(e,t)=>{o("info",`fetch ${e}`);const r=await(await fetch(e)).arrayBuffer();o("info",`${e} file size = ${r.byteLength} bytes`);const n=new Blob([r],{type:t}),i=URL.createObjectURL(n);return o("info",`${e} blob URL = ${i}`),i};e.exports=async e=>{let{corePath:t}=e;if("string"!=typeof t)throw Error("corePath should be a string!");const r=n(t),a=await i(r,"application/javascript"),s=await i(r.replace("ffmpeg-core.js","ffmpeg-core.wasm"),"application/wasm"),c=await i(r.replace("ffmpeg-core.js","ffmpeg-core.worker.js"),"application/javascript");return"undefined"==typeof createFFmpegCore?new Promise((e=>{const t=document.createElement("script"),r=()=>{t.removeEventListener("load",r),o("info","ffmpeg-core.js script loaded"),e({createFFmpegCore,corePath:a,wasmPath:s,workerPath:c})};t.src=a,t.type="text/javascript",t.addEventListener("load",r),document.getElementsByTagName("head")[0].appendChild(t)})):(o("info","ffmpeg-core.js script is loaded already"),Promise.resolve({createFFmpegCore,corePath:a,wasmPath:s,workerPath:c}))}},10:(e,t,r)=>{const n=r(131),o=r(82),i=r(766);e.exports={defaultOptions:n,getCreateFFmpegCore:o,fetchFile:i}},620:e=>{e.exports={defaultArgs:["./ffmpeg","-nostdin","-y"],baseOptions:{log:!1,logger:()=>{},progress:()=>{},corePath:""}}},554:(e,t,r)=>{const{defaultArgs:n,baseOptions:o}=r(620),{setLogging:i,setCustomLogger:a,log:s}=r(380),c=r(683),l=r(959),{defaultOptions:f,getCreateFFmpegCore:u}=r(10),{version:p}=r(681),d=Error("ffmpeg.wasm is not ready, make sure you have completed load().");e.exports=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const{log:t,logger:r,progress:h,...m}={...o,...f,...e};let g=null,y=null,v=null,w=!1,b=h;const x=e=>{let{type:t,message:r}=e;s(t,r),c(r,b),(e=>{"FFMPEG_END"===e&&null!==v&&(v(),v=null,w=!1)})(r)};return i(t),a(r),s("info",`use ffmpeg.wasm v${p}`),{setProgress:e=>{b=e},setLogger:e=>{a(e)},setLogging:i,load:async()=>{if(s("info","load ffmpeg-core"),null!==g)throw Error("ffmpeg.wasm was loaded, you should not load it again, use ffmpeg.isLoaded() to check next time.");{s("info","loading ffmpeg-core");const{createFFmpegCore:e,corePath:t,workerPath:r,wasmPath:n}=await u(m);g=await e({mainScriptUrlOrBlob:t,printErr:e=>x({type:"fferr",message:e}),print:e=>x({type:"ffout",message:e}),locateFile:(e,t)=>{if("undefined"!=typeof window){if(void 0!==n&&e.endsWith("ffmpeg-core.wasm"))return n;if(void 0!==r&&e.endsWith("ffmpeg-core.worker.js"))return r}return t+e}}),y=g.cwrap("proxy_main","number",["number","number"]),s("info","ffmpeg-core loaded")}},isLoaded:()=>null!==g,run:function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];if(s("info",`run ffmpeg command: ${t.join(" ")}`),null===g)throw d;if(w)throw Error("ffmpeg.wasm can only run one command at a time");return w=!0,new Promise((e=>{const r=[...n,...t].filter((e=>0!==e.length));v=e,y(...l(g,r))}))},FS:function(e){for(var t=arguments.length,r=new Array(t>1?t-1:0),n=1;n<t;n++)r[n-1]=arguments[n];if(s("info",`run FS.${e} ${r.map((e=>"string"==typeof e?e:`<${e.length} bytes binary file>`)).join(" ")}`),null===g)throw d;{let t=null;try{t=g.FS[e](...r)}catch(t){throw"readdir"===e?Error(`ffmpeg.FS('readdir', '${r[0]}') error. Check if the path exists, ex: ffmpeg.FS('readdir', '/')`):"readFile"===e?Error(`ffmpeg.FS('readFile', '${r[0]}') error. Check if the path exists`):Error("Oops, something went wrong in FS operation.")}return t}}}}},137:(e,t,r)=>{r(760);const n=r(554),{fetchFile:o}=r(10);e.exports={createFFmpeg:n,fetchFile:o}},380:e=>{let t=!1,r=()=>{};e.exports={logging:t,setLogging:e=>{t=e},setCustomLogger:e=>{r=e},log:(e,n)=>{r({type:e,message:n}),t&&console.log(`[${e}] ${n}`)}}},959:e=>{e.exports=(e,t)=>{const r=e._malloc(t.length*Uint32Array.BYTES_PER_ELEMENT);return t.forEach(((t,n)=>{const o=e._malloc(t.length+1);e.writeAsciiToMemory(t,o),e.setValue(r+Uint32Array.BYTES_PER_ELEMENT*n,o,"i32")})),[t.length,r]}},683:e=>{let t=0;const r=e=>{const[t,r,n]=e.split(":");return 60*parseFloat(t)*60+60*parseFloat(r)+parseFloat(n)};e.exports=(e,n)=>{if("string"==typeof e)if(e.startsWith("  Duration")){const n=e.split(", ")[0].split(": ")[1],o=r(n);(0===t||t>o)&&(t=o)}else if(e.startsWith("frame")||e.startsWith("size")){const o=e.split("time=")[1].split(" ")[0];n({ratio:r(o)/t})}else e.startsWith("video:")&&(n({ratio:1}),t=0)}},760:e=>{var t=function(e){"use strict";var t,r=Object.prototype,n=r.hasOwnProperty,o=Object.defineProperty||function(e,t,r){e[t]=r.value},i="function"==typeof Symbol?Symbol:{},a=i.iterator||"@@iterator",s=i.asyncIterator||"@@asyncIterator",c=i.toStringTag||"@@toStringTag";function l(e,t,r){return Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}),e[t]}try{l({},"")}catch(e){l=function(e,t,r){return e[t]=r}}function f(e,t,r,n){var i=t&&t.prototype instanceof y?t:y,a=Object.create(i.prototype),s=new R(n||[]);return o(a,"_invoke",{value:k(e,r,s)}),a}function u(e,t,r){try{return{type:"normal",arg:e.call(t,r)}}catch(e){return{type:"throw",arg:e}}}e.wrap=f;var p="suspendedStart",d="suspendedYield",h="executing",m="completed",g={};function y(){}function v(){}function w(){}var b={};l(b,a,(function(){return this}));var x=Object.getPrototypeOf,E=x&&x(x(S([])));E&&E!==r&&n.call(E,a)&&(b=E);var F=w.prototype=y.prototype=Object.create(b);function L(e){["next","throw","return"].forEach((function(t){l(e,t,(function(e){return this._invoke(t,e)}))}))}function j(e,t){function r(o,i,a,s){var c=u(e[o],e,i);if("throw"!==c.type){var l=c.arg,f=l.value;return f&&"object"==typeof f&&n.call(f,"__await")?t.resolve(f.__await).then((function(e){r("next",e,a,s)}),(function(e){r("throw",e,a,s)})):t.resolve(f).then((function(e){l.value=e,a(l)}),(function(e){return r("throw",e,a,s)}))}s(c.arg)}var i;o(this,"_invoke",{value:function(e,n){function o(){return new t((function(t,o){r(e,n,t,o)}))}return i=i?i.then(o,o):o()}})}function k(e,t,r){var n=p;return function(o,i){if(n===h)throw new Error("Generator is already running");if(n===m){if("throw"===o)throw i;return T()}for(r.method=o,r.arg=i;;){var a=r.delegate;if(a){var s=O(a,r);if(s){if(s===g)continue;return s}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(n===p)throw n=m,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n=h;var c=u(e,t,r);if("normal"===c.type){if(n=r.done?m:d,c.arg===g)continue;return{value:c.arg,done:r.done}}"throw"===c.type&&(n=m,r.method="throw",r.arg=c.arg)}}}function O(e,r){var n=r.method,o=e.iterator[n];if(o===t)return r.delegate=null,"throw"===n&&e.iterator.return&&(r.method="return",r.arg=t,O(e,r),"throw"===r.method)||"return"!==n&&(r.method="throw",r.arg=new TypeError("The iterator does not provide a '"+n+"' method")),g;var i=u(o,e.iterator,r.arg);if("throw"===i.type)return r.method="throw",r.arg=i.arg,r.delegate=null,g;var a=i.arg;return a?a.done?(r[e.resultName]=a.value,r.next=e.nextLoc,"return"!==r.method&&(r.method="next",r.arg=t),r.delegate=null,g):a:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,g)}function P(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function _(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function R(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(P,this),this.reset(!0)}function S(e){if(e){var r=e[a];if(r)return r.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var o=-1,i=function r(){for(;++o<e.length;)if(n.call(e,o))return r.value=e[o],r.done=!1,r;return r.value=t,r.done=!0,r};return i.next=i}}return{next:T}}function T(){return{value:t,done:!0}}return v.prototype=w,o(F,"constructor",{value:w,configurable:!0}),o(w,"constructor",{value:v,configurable:!0}),v.displayName=l(w,c,"GeneratorFunction"),e.isGeneratorFunction=function(e){var t="function"==typeof e&&e.constructor;return!!t&&(t===v||"GeneratorFunction"===(t.displayName||t.name))},e.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,w):(e.__proto__=w,l(e,c,"GeneratorFunction")),e.prototype=Object.create(F),e},e.awrap=function(e){return{__await:e}},L(j.prototype),l(j.prototype,s,(function(){return this})),e.AsyncIterator=j,e.async=function(t,r,n,o,i){void 0===i&&(i=Promise);var a=new j(f(t,r,n,o),i);return e.isGeneratorFunction(r)?a:a.next().then((function(e){return e.done?e.value:a.next()}))},L(F),l(F,c,"Generator"),l(F,a,(function(){return this})),l(F,"toString",(function(){return"[object Generator]"})),e.keys=function(e){var t=Object(e),r=[];for(var n in t)r.push(n);return r.reverse(),function e(){for(;r.length;){var n=r.pop();if(n in t)return e.value=n,e.done=!1,e}return e.done=!0,e}},e.values=S,R.prototype={constructor:R,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=t,this.done=!1,this.delegate=null,this.method="next",this.arg=t,this.tryEntries.forEach(_),!e)for(var r in this)"t"===r.charAt(0)&&n.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=t)},stop:function(){this.done=!0;var e=this.tryEntries[0].completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var r=this;function o(n,o){return s.type="throw",s.arg=e,r.next=n,o&&(r.method="next",r.arg=t),!!o}for(var i=this.tryEntries.length-1;i>=0;--i){var a=this.tryEntries[i],s=a.completion;if("root"===a.tryLoc)return o("end");if(a.tryLoc<=this.prev){var c=n.call(a,"catchLoc"),l=n.call(a,"finallyLoc");if(c&&l){if(this.prev<a.catchLoc)return o(a.catchLoc,!0);if(this.prev<a.finallyLoc)return o(a.finallyLoc)}else if(c){if(this.prev<a.catchLoc)return o(a.catchLoc,!0)}else{if(!l)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return o(a.finallyLoc)}}}},abrupt:function(e,t){for(var r=this.tryEntries.length-1;r>=0;--r){var o=this.tryEntries[r];if(o.tryLoc<=this.prev&&n.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===e||"continue"===e)&&i.tryLoc<=t&&t<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=e,a.arg=t,i?(this.method="next",this.next=i.finallyLoc,g):this.complete(a)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),g},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.finallyLoc===e)return this.complete(r.completion,r.afterLoc),_(r),g}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.tryLoc===e){var n=r.completion;if("throw"===n.type){var o=n.arg;_(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(e,r,n){return this.delegate={iterator:S(e),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=t),g}},e}(e.exports);try{regeneratorRuntime=t}catch(e){"object"==typeof globalThis?globalThis.regeneratorRuntime=t:Function("r","regeneratorRuntime = r")(t)}},927:function(e,t,r){var n,o;n=function(){return function(){var e=arguments.length;if(0===e)throw new Error("resolveUrl requires at least one argument; got none.");var t=document.createElement("base");if(t.href=arguments[0],1===e)return t.href;var r=document.getElementsByTagName("head")[0];r.insertBefore(t,r.firstChild);for(var n,o=document.createElement("a"),i=1;i<e;i++)o.href=arguments[i],n=o.href,t.href=n;return r.removeChild(t),n}},void 0===(o=n.call(t,r,t,e))||(e.exports=o)},681:e=>{"use strict";e.exports=JSON.parse('{"name":"@ffmpeg/ffmpeg","version":"0.9.7","description":"FFmpeg WebAssembly version","main":"src/index.js","types":"src/index.d.ts","directories":{"example":"examples"},"scripts":{"start":"node scripts/server.js","build":"rimraf dist && webpack --config scripts/webpack.config.prod.js","prepublishOnly":"npm run build","lint":"eslint src","wait":"rimraf dist && wait-on http://localhost:3000/dist/ffmpeg.dev.js","test":"npm-run-all -p -r start test:all","test:all":"npm-run-all wait test:browser:ffmpeg test:node:all","test:node":"node --experimental-wasm-threads --experimental-wasm-bulk-memory node_modules/.bin/_mocha --exit --bail --require ./scripts/test-helper.js","test:node:all":"npm run test:node -- ./tests/*.test.js","test:browser":"mocha-headless-chrome -a allow-file-access-from-files -a incognito -a no-sandbox -a disable-setuid-sandbox -a disable-logging -t 300000","test:browser:ffmpeg":"npm run test:browser -- -f ./tests/ffmpeg.test.html"},"browser":{"./src/node/index.js":"./src/browser/index.js"},"repository":{"type":"git","url":"git+https://github.com/ffmpegwasm/ffmpeg.wasm.git"},"keywords":["ffmpeg","WebAssembly","video"],"author":"Jerome Wu <jeromewus@gmail.com>","license":"MIT","bugs":{"url":"https://github.com/ffmpegwasm/ffmpeg.wasm/issues"},"engines":{"node":">=12.16.1"},"homepage":"https://github.com/ffmpegwasm/ffmpeg.wasm#readme","dependencies":{"is-url":"^1.2.4","node-fetch":"^2.6.1","regenerator-runtime":"^0.13.7","resolve-url":"^0.2.1"},"devDependencies":{"@babel/core":"^7.12.3","@babel/preset-env":"^7.12.1","@ffmpeg/core":"^0.8.5","@types/emscripten":"^1.39.4","babel-loader":"^8.1.0","chai":"^4.2.0","cors":"^2.8.5","eslint":"^7.12.1","eslint-config-airbnb-base":"^14.1.0","eslint-plugin-import":"^2.22.1","express":"^4.17.1","mocha":"^8.2.1","mocha-headless-chrome":"^2.0.3","npm-run-all":"^4.1.5","wait-on":"^5.2.0","webpack":"^5.3.2","webpack-cli":"^4.1.0","webpack-dev-middleware":"^4.0.0"}}')}},t={};function r(n){var o=t[n];if(void 0!==o)return o.exports;var i=t[n]={exports:{}};return e[n].call(i.exports,i,i.exports,r),i.exports}r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},r.d=(e,t)=>{for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{"use strict";var e=r(137);const t=document.getElementById("actionBtn"),n=document.getElementById("preview");let o,i,a;const s="recording.webm",c="output.mp4",l="thumbnail.jpg",f=(e,t)=>{const r=document.createElement("a");r.href=e,r.download=t,document.body.appendChild(r),r.click()},u=async()=>{t.removeEventListener("click",u),t.innerText="Transcoding...",t.disabled=!0;const r=(0,e.createFFmpeg)({log:!0});await r.load(),r.FS("writeFile",s,await(0,e.fetchFile)(a)),await r.run("-i",s,"-r","60",c),await r.run("-i",s,"-ss","00:00:01","-frames:v","1",l);const n=r.FS("readFile",c),o=r.FS("readFile",l),i=new Blob([n.buffer],{type:"video/mp4"}),d=new Blob([o.buffer],{type:"image/jpg"}),h=URL.createObjectURL(i),m=URL.createObjectURL(d);f(h,"MyRecording.mp4"),f(m,"MyThumbnail.jpg"),r.FS("unlink",s),r.FS("unlink",c),r.FS("unlink",l),URL.revokeObjectURL(h),URL.revokeObjectURL(m),URL.revokeObjectURL(a),t.disabled=!1,t.innerText="Record Again",t.addEventListener("click",p)},p=()=>{t.innerText="Recording",t.disabled=!0,t.removeEventListener("click",p),i=new MediaRecorder(o,{mimeType:"video/webm"}),i.ondataavailable=e=>{a=URL.createObjectURL(e.data),n.srcObject=null,n.src=a,n.loop=!0,n.play(),t.innerText="Download",t.disabled=!1,t.addEventListener("click",u)},i.start(),setTimeout((()=>{i.stop()}),5e3)};(async()=>{o=await navigator.mediaDevices.getUserMedia({audio:!1,video:{width:1024,height:576}}),n.srcObject=o,n.play()})(),t.addEventListener("click",p)})()})();