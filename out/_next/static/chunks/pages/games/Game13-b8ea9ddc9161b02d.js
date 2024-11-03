(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[271],{13786:(e,t,n)=>{(window.__NEXT_P=window.__NEXT_P||[]).push(["/games/Game13",function(){return n(32989)}])},32989:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>j});var r=n(85893),o=n(67294),s=n(45281),i=n(84283),l=n(53637),a=n(39886),c=n(54610),d=n(84082),u=n(49816),f=n(89163),p=n(87261),y=n(74855),h=n(44173);let b=JSON.parse('[{"inputs":[{"internalType":"string","name":"_str","type":"string"},{"internalType":"uint256","name":"_num","type":"uint256"}],"name":"decode","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes","name":"encodedData","type":"bytes"}],"name":"decodeStringAndUint","outputs":[{"internalType":"string","name":"","type":"string"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"encodeStringAndUint","outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"player","outputs":[{"internalType":"string","name":"_string","type":"string"},{"internalType":"uint256","name":"_number","type":"uint256"}],"stateMutability":"view","type":"function"}]');var m=n(72771);n(18384);var g=n(52802);let j=()=>{let[e,t]=(0,o.useState)(""),[n,j]=(0,o.useState)(""),[x,v]=(0,o.useState)(""),[w,k]=(0,o.useState)(""),[O,N]=(0,o.useState)(!1),S=(0,o.useRef)(null),{walletAddress:_,factoryContract:C,nftContract:Z,web3:P}=(0,o.useContext)(m.S),[T,M]=(0,o.useState)(null),[A,E]=(0,o.useState)(!1),[D,R]=(0,o.useState)(null),[I,z]=(0,o.useState)(null);(0,o.useEffect)(()=>{P&&P.utils.isAddress(x)&&M(new P.eth.Contract(b,x))},[x,P]),(0,o.useEffect)(()=>{(async()=>{_&&Z&&(k(await Z.methods.balanceOf(_,13).call()),console.log(w))})()},[_,Z,w]);let U=async()=>{try{N(!0);let e=(await C.methods.deploy(13).send({from:_})).events.DeployInstance;e?(v(e.returnValues.Instance),h.Am.success("Game created successfully!")):h.Am.error("Game creation failed."),N(!1)}catch(e){N(!1),console.log(e),h.Am.error("Game creation failed. \n      Please make sure:\n-That your Metamask wallet is properly connected.")}},B=async(e,t)=>{if(T){if(isNaN(Number(t))){alert("Invalid input! Please enter a number.");return}try{await T.methods.decode(e,t).send({from:_}).then(async()=>{if(console.log("The Mission Is Complete"),(0,h.Am)("Well done! You have solved this level!",{autoClose:5e3}),w<1)try{console.log(w),await Z.methods.mint(13,x).send({from:_}).once("error",e=>{console.log(e),h.Am.error("Minting failed.")}).once("receipt",async()=>{let e=await Z.methods.balanceOf(_,13).call();k(e),console.log(e),h.Am.success("Minting completed successfully!")})}catch(e){console.error(e.message),h.Am.error("Minting failed.")}})}catch(e){console.error(e.message),h.Am.error("Encoding failed.")}}},G=async()=>{let e=await T.methods.encodeStringAndUint().call();console.log(e),R(e)},H=async()=>{let e=await T.methods.player().call();console.log(e),z(e)},Y='// SPDX-License-Identifier: MIT\n  pragma solidity ^0.8.10;\n  \n  contract DecodeData{\n      bytes public encodeStringAndUint =hex"00000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000b4920416d204e756d626572000000000000000000000000000000000000000000";\n       \n      struct Player{\n         string _string;\n         uint256 _number;\n      }\n      Player public player;\n  \n      function decode(string memory _str, uint256 _num) external {\n          bytes memory encodedData = abi.encode(_str, _num);\n          require(keccak256(encodedData) == keccak256(encodeStringAndUint), "The Answer is incorrect");\n          player = Player(_str, _num);\n      }\n  }\n  ';return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(l.Z,{className:"bg-primary-black overflow-hidden",children:[(0,r.jsx)(g.wp,{}),(0,r.jsx)("h1",{className:"game-title title-color",children:(0,r.jsx)("b",{children:"Decode Data"})}),(0,r.jsx)(a.Z,{className:"card",style:{backgroundColor:"#000000",color:"white"},children:(0,r.jsx)(c.Z,{children:(0,r.jsxs)("div",{className:"code-section",children:[(0,r.jsx)(y.CopyToClipboard,{text:Y,children:(0,r.jsx)(d.Z,{className:"button-copy",children:"Copy code"})}),(0,r.jsx)(s.Z,{language:"javascript",style:i.Vg,ref:S,children:Y})]})})}),(0,r.jsx)(a.Z,{className:"game-card",style:{backgroundColor:"#000000",color:"white"},children:(0,r.jsxs)(c.Z,{children:[(0,r.jsx)(u.Z,{className:"desc-title title-color",children:(0,r.jsx)("b",{children:"Game Description"})}),(0,r.jsxs)("p",{children:[(0,r.jsx)("b",{children:"Master data decryption in Solidity. Decode and pass data with precision."}),(0,r.jsx)("br",{}),(0,r.jsx)("br",{}),(0,r.jsxs)("b",{children:[(0,r.jsx)("strong",{children:" You need:"})," To complete this mission, you need to be familiar with the abi.encode function for encoding data in Solidity, understand how the keccak256 hash function works, and use these tools to decode data. "]})]}),(0,r.jsx)("div",{children:(0,r.jsx)(d.Z,{style:{backgroundColor:"#c97539",color:"white"},className:"button-margin",onClick:U,children:"Create Instance"})})]})}),!O&&""!==x&&(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(a.Z,{className:"game-card",style:{backgroundColor:"#000000",color:"white"},children:(0,r.jsxs)(c.Z,{children:[(0,r.jsx)(u.Z,{className:"desc-title title-color",children:(0,r.jsx)("b",{children:"State Variables"})}),(0,r.jsx)(d.Z,{style:{backgroundColor:"#355f7d",color:"white"},className:"mt-1",onClick:G,children:"encodeStringAndUint"}),null!==D&&(0,r.jsxs)("p",{style:{wordBreak:"break-all"},children:[" ",JSON.stringify(D)]}),(0,r.jsx)("br",{}),(0,r.jsx)("br",{}),(0,r.jsxs)("div",{style:{display:"flex",alignItems:"center"},children:[(0,r.jsx)(d.Z,{style:{backgroundColor:"#355f7d",color:"white"},className:"mt-1",onClick:H,children:"player"}),null!==I&&(0,r.jsx)("p",{style:{marginLeft:"10px",wordBreak:"break-all"},children:JSON.stringify(I,(e,t)=>"bigint"==typeof t?t.toString():t)})]}),(0,r.jsx)(d.Z,{style:{backgroundColor:"#355f7d",color:"white"},className:"button",onClick:()=>{E(!A)},children:A?"Hide Hint":"Show Hint"}),A&&(0,r.jsx)(a.Z,{className:"card",style:{backgroundColor:"#000000",color:"white"},children:(0,r.jsxs)(c.Z,{children:[(0,r.jsx)(u.Z,{className:"desc-title title-color",children:(0,r.jsx)("b",{children:"Hint"})}),(0,r.jsxs)("p",{children:[(0,r.jsx)("strong",{children:"Use the decodeparameters function from the web3js library. You can read more "})," ",(0,r.jsx)("a",{style:{textDecoration:"underline"},href:"https://web3js.readthedocs.io/en/v1.7.1/web3-eth-abi.html#decodeparameters",target:"_blank",rel:"noopener noreferrer",children:(0,r.jsx)("strong",{children:"Here"})}),".",(0,r.jsx)("br",{}),(0,r.jsx)("strong",{children:(0,r.jsx)("strong",{children:"Or"})}),(0,r.jsx)("br",{}),(0,r.jsxs)("strong",{children:["Write a function according to the following interface:",(0,r.jsx)("br",{})," ",(0,r.jsx)("strong",{children:" function decode(bytes memory encodedData) external pure returns (string memory, uint256);"})]})]})]})})]})}),(0,r.jsx)(a.Z,{className:"game-card",style:{backgroundColor:"#000000",color:"white"},children:(0,r.jsxs)(c.Z,{children:[(0,r.jsx)("h3",{className:"desc-title title-color",children:(0,r.jsx)("b",{children:"Your Test Address:"})}),(0,r.jsxs)("p",{style:{wordBreak:"break-all"},className:"Instance-color",children:[" ",x," "]}),(0,r.jsxs)(f.Z,{children:[(0,r.jsx)(p.Z,{style:{color:"black"},className:"form-control-alternative",id:"input-city",placeholder:"_str",type:"text",onChange:e=>t(e.target.value)}),(0,r.jsx)("br",{}),(0,r.jsx)(p.Z,{style:{color:"black"},className:"form-control-alternative",id:"input-city",placeholder:"_num",type:"text",onChange:e=>j(e.target.value)})]}),(0,r.jsx)(d.Z,{style:{backgroundColor:"#c97539",color:"white"},className:"mt-1",onClick:()=>B(e,n),children:"decode"})]})})]}),(0,r.jsx)("p",{style:{display:"flex",justifyContent:"center",alignItems:"center"},children:w<1?null:(0,r.jsxs)("div",{children:[(0,r.jsxs)("strong",{children:["Congratulations! You Got A Badge"," ",(0,r.jsx)("i",{className:"fas fa-medal",style:{color:"gold",fontSize:"20px",position:"relative",top:"3px"}})]}),(0,r.jsx)("br",{}),(0,r.jsx)("br",{})]})})]}),(0,r.jsx)(h.Ix,{})]})}},89163:(e,t,n)=>{"use strict";n.d(t,{Z:()=>p});var r=n(67294),o=n(45697),s=n.n(o),i=n(93967),l=n.n(i),a=n(22040),c=["className","cssModule","row","disabled","check","inline","floating","noMargin","tag","switch"];function d(){return(d=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}var u={children:s().node,row:s().bool,check:s().bool,switch:s().bool,inline:s().bool,floating:s().bool,noMargin:s().bool,disabled:s().bool,tag:a.iC,className:s().string,cssModule:s().object};function f(e){var t=e.className,n=e.cssModule,o=e.row,s=e.disabled,i=e.check,u=e.inline,f=e.floating,p=e.noMargin,y=e.tag,h=void 0===y?"div":y,b=e.switch,m=function(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},s=Object.keys(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(r=0;r<s.length;r++)n=s[r],!(t.indexOf(n)>=0)&&Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}(e,c),g=i||b,j=(0,a.mx)(l()(t,!!o&&"row",!!g&&"form-check",!!b&&"form-switch",!g&&!p&&"mb-3",!!g&&!!u&&"form-check-inline",!!g&&!!s&&"disabled",f&&"form-floating"),n);return"fieldset"===h&&(m.disabled=s),r.createElement(h,d({},m,{className:j}))}f.propTypes=u;let p=f},87261:(e,t,n)=>{"use strict";n.d(t,{Z:()=>m});var r=n(67294),o=n(45697),s=n.n(o),i=n(93967),l=n.n(i),a=n(22040);function c(e){return(c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var d=["className","cssModule","type","bsSize","valid","invalid","tag","addon","plaintext","innerRef"];function u(){return(u=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function f(e,t){return(f=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e})(e,t)}function p(e){if(void 0===e)throw ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function y(e){return(y=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var h={children:s().node,type:s().string,size:s().oneOfType([s().number,s().string]),bsSize:s().string,valid:s().bool,invalid:s().bool,tag:a.iC,innerRef:s().oneOfType([s().object,s().func,s().string]),plaintext:s().bool,addon:s().bool,className:s().string,cssModule:s().object},b=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&f(e,t)}(s,e);var t,n,o=(t=function(){if("undefined"==typeof Reflect||!Reflect.construct||Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(e){return!1}}(),function(){var e,n=y(s);return e=t?Reflect.construct(n,arguments,y(this).constructor):n.apply(this,arguments),function(e,t){if(t&&("object"===c(t)||"function"==typeof t))return t;if(void 0!==t)throw TypeError("Derived constructors may only return object or undefined");return p(e)}(this,e)});function s(e){var t;return!function(e,t){if(!(e instanceof t))throw TypeError("Cannot call a class as a function")}(this,s),(t=o.call(this,e)).getRef=t.getRef.bind(p(t)),t.focus=t.focus.bind(p(t)),t}return n=[{key:"getRef",value:function(e){this.props.innerRef&&this.props.innerRef(e),this.ref=e}},{key:"focus",value:function(){this.ref&&this.ref.focus()}},{key:"render",value:function(){var e=this.props,t=e.className,n=e.cssModule,o=e.type,s=void 0===o?"text":o,i=e.bsSize,c=e.valid,f=e.invalid,p=e.tag,y=e.addon,h=e.plaintext,b=e.innerRef,m=function(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},s=Object.keys(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(r=0;r<s.length;r++)n=s[r],!(t.indexOf(n)>=0)&&Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}(e,d),g=["switch","radio","checkbox"].indexOf(s)>-1,j="textarea"===s,x="select"===s,v="range"===s,w=p||(x||j?s:"input"),k="form-control";h?(k="".concat(k,"-plaintext"),w=p||"input"):v?k="form-range":x?k="form-select":g&&(k=y?null:"form-check-input"),m.size&&/\D/g.test(m.size)&&((0,a.O4)('Please use the prop "bsSize" instead of the "size" to bootstrap\'s input sizing.'),i=m.size,delete m.size);var O=(0,a.mx)(l()(t,f&&"is-invalid",c&&"is-valid",!!i&&(x?"form-select-".concat(i):"form-control-".concat(i)),k),n);return("input"===w||p&&"function"==typeof p)&&(m.type="switch"===s?"checkbox":s),m.children&&!(h||"select"===s||"string"!=typeof w||"select"===w)&&((0,a.O4)('Input with a type of "'.concat(s,'" cannot have children. Please use "value"/"defaultValue" instead.')),delete m.children),r.createElement(w,u({},m,{ref:b,className:O,"aria-invalid":f}))}}],function(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}(s.prototype,n),Object.defineProperty(s,"prototype",{writable:!1}),s}(r.Component);b.propTypes=h;let m=b}},e=>{var t=t=>e(e.s=t);e.O(0,[817,956,802,888,774,179],()=>t(13786)),_N_E=e.O()}]);