module.exports=function(e){var t={};function r(n){if(t[n])return t[n].exports;var u=t[n]={i:n,l:!1,exports:{}};return e[n].call(u.exports,u,u.exports,r),u.l=!0,u.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var u in e)r.d(n,u,function(t){return e[t]}.bind(null,u));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=5)}([function(e,t,r){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.opWordToHex=t.opWordToCode=t.opcodeToWord=t.hexLittleEndian=void 0;var u=n(r(7));t.hexLittleEndian=function(e){if(e.length%2==0){var t="0x",r=0;e.startsWith("0x")&&(r=2);for(var n=e.length;n>r;n-=2)t+=e.substring(n-2,n);return t}return console.warn("its odd"),"something went wrong"};t.opcodeToWord=function(e){var t;return(null===(t=u.default.find((function(t){return t.opcode===e})))||void 0===t?void 0:t.word)||""};t.opWordToCode=function(e){var t,r=null===(t=u.default.find((function(t){return t.word===e})))||void 0===t?void 0:t.opcode;return void 0===r?-1:r};t.opWordToHex=function(e){var t;return(null===(t=u.default.find((function(t){return t.word===e})))||void 0===t?void 0:t.hex)||""}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.MAX_INTEGER=t.EMOJI_REGEX=void 0;t.MAX_INTEGER=2147483647;t.EMOJI_REGEX=/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2694-\u2697]|\uD83E[\uDD10-\uDD5D])/g},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(0),u=r(1),a=function(e){var t=(e.length-2)/2;if(!(0==t||4<t)&&function(e,t){var r=Number(e);return 2!==t||!(1<=r&&r<=127||32768<=r&&r<=32895)}(e,t)){var r=Number(e),n=function(e){var t=Math.pow(2,8*e-9),r=Math.pow(2,8*e-1);if(0<e&&e<5)return{minPos:t,maxPos:r-1,minNeg:1-r,maxNeg:-1*t}}(t);if(void 0!==n)return n.minPos<=r&&r<=n.maxPos?r:Math.pow(2,8*t-1)-r}};t.default=function(e){var t,r=e;e.length%2==1&&(r=e.substr(0,e.length-1)+"0"+e.substr(e.length-1,1));var o=void 0,i=n.hexLittleEndian(r),d=a(i);return d?(o=d)<=u.MAX_INTEGER&&-1*u.MAX_INTEGER<=o?t=d:(o=void 0,t=r):t=r,{input:e,numberValue:o,byteValue:r,byteValueDisplay:t.toString(),stringValue:e}}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(0),u=r(1),a=function(e){if(0===e)return"";var t=function(e){var t=0;if(0===e)return t;Math.abs(e);for(var r=1;r<5;r++){var n=Math.pow(2,8*(r-1)-1),u=Math.pow(2,8*r-1);if(-1*u<e&&e<=-1*n||n<=e&&e<u){t=r;break}}return t}(e),r=e;e<0&&0!==t&&(r=Math.pow(2,8*t-1)-e);var n=r.toString(16);return n.length%2==1&&(n="0"+n),(n.length/2<t||0===t)&&(n="00"+n),n};t.default=function(e){var t=Number(e),r=a(t),o=n.hexLittleEndian(r),i=void 0,d=o;return t<=u.MAX_INTEGER&&(i=t,d=e),{input:e,numberValue:i,byteValueDisplay:d,byteValue:o}}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(1);t.default=function(e){var t="0x"+function(e){var t,r="";for(t=0;t<e.length;t++){r+=("0"+e.charCodeAt(t).toString(16)).slice(-2)}return r}(e),r=parseInt(t),u=void 0;return r<=n.MAX_INTEGER&&(u=r),{input:e,byteValue:t,byteValueDisplay:e,numberValue:u,stringValue:e}}},function(e,t,r){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.stackDataArray=t.clearStack=t.parse=void 0;var u=n(r(6)),a=[];t.stackDataArray=a;t.parse=function(e){var r=u.default(e,a);return r.removeLastSize>0&&(t.stackDataArray=a=a.slice(0,a.length-r.removeLastSize)),a.push(r.data),a};t.clearStack=function(){t.stackDataArray=a=[]}},function(e,t,r){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var u=r(0),a=n(r(2)),o=n(r(3)),i=n(r(8)),d=n(r(4));t.default=function(e,t){if(e.startsWith("<")&&e.endsWith(">"))return{data:function(e){if(e.startsWith("0x"))return a.default(e);if(e.startsWith('"')&&e.endsWith('"')||e.startsWith("'")&&e.endsWith("'")){var t=e.substr(1,e.length-2);return d.default(t)}if(e.startsWith("OP_")){var r=u.opWordToHex(e);if(""===r)throw"ParseFinalInput Error: it is not a valid op word!";return"0x00"===r?{byteValue:"0x00",input:"0x00",byteValueDisplay:"0"}:a.default(r)}if(!isNaN(e))return o.default(e);throw"ParseFinalInput Error: it is not a valid final input string!"}(e.substr(1,e.length-2)),removeLastSize:0};if(e.startsWith("OP_")||!isNaN(e)){var r=e;if(!isNaN(e)&&""===(r=u.opcodeToWord(Number(e))))throw"Unknown OP code number";return i.default(r,t)}throw"it is not a valid input script"}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=[{word:"OP_0",opcode:0,hex:"0x00"},{word:"OP_FALSE",opcode:0,hex:"0x00"},{word:"OP_CAT",opcode:126,hex:"0x7e"},{word:"OP_SUBSTR",opcode:127,hex:"0x7f"},{word:"OP_ADD",opcode:147,hex:"0x93"},{word:"OP_SUB",opcode:148,hex:"0x94"}]},function(e,t,r){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var u=n(r(2)),a=n(r(3)),o=n(r(4)),i=function(e,t){if(void 0!==e.numberValue&&void 0!==t.numberValue){var r=e.numberValue+t.numberValue;return a.default(r.toString())}throw"OP_ADD Error: this operation requires 2 valid number data"},d=function(e,t){if(void 0!==t.numberValue&&void 0!==e.numberValue){var r=e.numberValue-t.numberValue;return a.default(r.toString())}throw"OP_SUB Error: this operation requires 2 valid number data"},l=function(e,t,r){if(void 0!==e.stringValue){if(void 0!==t.numberValue&&void 0!==r.numberValue){var n=e.stringValue.substr(t.numberValue,r.numberValue);return o.default(n)}throw"OP_SUBSTR Error: Index and size must be number!"}throw"OP_SUBSTR Error: Invalid string value for sub string!"};t.default=function(e,t){if("OP_0"===e||"OP_FALSE"===e)return{data:{byteValue:"0x00",input:"0x00",byteValueDisplay:"0"},removeLastSize:0};var r,n,a,o,s=t.length;if("OP_ADD"===e){if(s<2)throw"OP_ADD Error: stack data array must include min 2 data!";return{data:i(t[s-2],t[s-1]),removeLastSize:2}}if("OP_SUB"===e){if(s<2)throw"OP_SUB Error: stack data array must include min 2 data!";return{data:d(t[s-2],t[s-1]),removeLastSize:2}}if("OP_CAT"===e){if(s<2)throw"OP_CAT Error: stack data array must include min 2 data!";return{data:(r=t[s-2],n=t[s-1],a=r.byteValue.substring(2),o=n.byteValue.substring(2),a="00"===a?"":a,o="00"===o?"":o,u.default("0x"+a+o)),removeLastSize:2}}if("OP_SUBSTR"===e){if(s<3)throw"OP_SUBSTR Error: stack data array must include min 3 data!";return{data:l(t[s-3],t[s-2],t[s-1]),removeLastSize:3}}throw"Unknown OP word!"}}]);
//# sourceMappingURL=index.js.map