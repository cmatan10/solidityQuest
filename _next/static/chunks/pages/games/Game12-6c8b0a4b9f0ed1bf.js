(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[873],{24093:(e,t,n)=>{(window.__NEXT_P=window.__NEXT_P||[]).push(["/games/Game12",function(){return n(68406)}])},68406:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>j});var o=n(85893),s=n(67294),r=n(45281),l=n(84283),i=n(53637),c=n(39886),a=n(54610),u=n(84082),d=n(49816),f=n(89163),h=n(87261),p=n(74855),y=n(44173);let b=JSON.parse('[{"inputs":[],"name":"collisionFound","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes","name":"guess","type":"bytes"}],"name":"findCollision","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"secretHash","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"}]');var m=n(72771);n(18384);var g=n(52802);let j=()=>{let[e,t]=(0,s.useState)(""),[n,j]=(0,s.useState)(""),[x,v]=(0,s.useState)(""),[w,k]=(0,s.useState)(!1),O=(0,s.useRef)(null),{walletAddress:C,factoryContract:N,nftContract:S,web3:P}=(0,s.useContext)(m.S),[Z,_]=(0,s.useState)(null),[T,M]=(0,s.useState)(!1),[E,I]=(0,s.useState)(""),[R,z]=(0,s.useState)(null);(0,s.useEffect)(()=>{P&&P.utils.isAddress(n)&&_(new P.eth.Contract(b,n))},[n,P]),(0,s.useEffect)(()=>{(async()=>{C&&S&&(v(await S.methods.balanceOf(C,12).call()),console.log(x))})()},[C,S,x]);let A=async()=>{try{k(!0);let e=(await N.methods.deploy(12).send({from:C})).events.DeployInstance;e?(j(e.returnValues.Instance),y.Am.success("Game created successfully!")):y.Am.error("Game creation failed."),k(!1)}catch(e){k(!1),console.log(e),y.Am.error("Game creation failed. \n      Please make sure:\n-That your Metamask wallet is properly connected.")}},H=async e=>{if(Z){if(isNaN(Number(e))){alert("Invalid input! Please enter a hexadecimal.");return}try{await Z.methods.findCollision(e).send({from:C}).then(async()=>{if(console.log("The Mission Is Complete"),(0,y.Am)("Well done! You have solved this level!",{autoClose:5e3}),x<1)try{await S.methods.mint(12,n).send({from:C}).once("error",e=>{console.log(e),y.Am.error("Minting failed.")}).once("receipt",async()=>{let e=await S.methods.balanceOf(C,12).call();v(e),console.log(e),y.Am.success("Minting completed successfully!")})}catch(e){console.error(e.message),y.Am.error("Minting failed.")}})}catch(e){console.error(e.message),y.Am.error("Find collision operation failed.")}}},F=async()=>{let e=await Z.methods.secretHash().call();console.log(e),I(e)},G=async()=>{let e=await Z.methods.collisionFound().call();console.log(e),z(e)},B='// SPDX-License-Identifier: MIT\n  pragma solidity ^0.8.10;\n  \n  contract HashCollision {\n      bytes32 public secretHash = keccak256(abi.encodePacked(sha256("secret")));\n  \n      bool public collisionFound = false;\n  \n      function findCollision(bytes memory guess) public {\n          require(keccak256(abi.encodePacked(guess)) == secretHash, "Not a collision!");\n          collisionFound = true;\n      }\n  }';return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsxs)(i.Z,{className:"bg-primary-black overflow-hidden",children:[(0,o.jsx)(g.wp,{}),"        ",(0,o.jsx)("h1",{className:"game-title title-color",children:(0,o.jsx)("b",{children:"Hash Collision"})}),(0,o.jsx)(c.Z,{className:"card",style:{backgroundColor:"#000000",color:"white"},children:(0,o.jsx)(a.Z,{children:(0,o.jsxs)("div",{className:"code-section",children:[(0,o.jsx)(p.CopyToClipboard,{text:B,children:(0,o.jsx)(u.Z,{className:"button-copy",children:"Copy code"})}),(0,o.jsx)(r.Z,{language:"javascript",style:l.Vg,ref:O,children:B})]})})}),(0,o.jsx)(c.Z,{className:"game-card",style:{backgroundColor:"#000000",color:"white"},children:(0,o.jsxs)(a.Z,{children:[(0,o.jsx)(d.Z,{className:"desc-title title-color",children:(0,o.jsx)("b",{children:"Game Description"})}),(0,o.jsxs)("p",{children:[(0,o.jsx)("b",{children:"Challenge Solidity's hash functions. Find collisions and match outputs."}),(0,o.jsx)("br",{}),(0,o.jsx)("br",{}),(0,o.jsxs)("b",{children:[(0,o.jsx)("strong",{children:" You need:"})," To solve this puzzle, you need to understand hash functions in Solidity, specifically keccak256 and sha256, as well as how to use the abi.encodePacked function. You'll also need to understand the concept of hash collisions, where different inputs produce the same hashed output. "]})]}),(0,o.jsx)("div",{children:(0,o.jsx)(u.Z,{style:{backgroundColor:"#c97539",color:"white"},className:"button-margin",onClick:A,children:"Create Instance"})})]})}),!w&&""!==n&&(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(c.Z,{className:"game-card",style:{backgroundColor:"#000000",color:"white"},children:(0,o.jsxs)(a.Z,{children:[(0,o.jsx)(d.Z,{className:"desc-title title-color",children:(0,o.jsx)("b",{children:"State Variables"})}),(0,o.jsxs)("div",{style:{display:"flex",alignItems:"center"},children:[(0,o.jsx)(u.Z,{style:{backgroundColor:"#355f7d",color:"white"},className:"mt-1",onClick:F,children:"secretHash"}),""!==E&&(0,o.jsxs)("p",{style:{marginLeft:"10px",wordBreak:"break-all"},children:[" ",E]})]}),(0,o.jsx)("br",{}),(0,o.jsxs)("div",{style:{display:"flex",alignItems:"center"},children:[(0,o.jsx)(u.Z,{style:{backgroundColor:"#355f7d",color:"white"},className:"mt-1",onClick:G,children:"collisionFound"}),null!==R&&(0,o.jsx)("p",{style:{marginLeft:"10px"},children:R?"True":"False"})]}),(0,o.jsx)("br",{}),(0,o.jsx)(u.Z,{style:{backgroundColor:"#355f7d",color:"white"},className:"button",onClick:()=>{M(!T)},children:T?"Hide Hint":"Show Hint"}),T&&(0,o.jsx)(c.Z,{className:"card",style:{backgroundColor:"#000000",color:"white"},children:(0,o.jsxs)(a.Z,{children:[(0,o.jsx)(d.Z,{className:"desc-title title-color",children:(0,o.jsx)("b",{children:"Hint"})}),(0,o.jsx)("p",{children:(0,o.jsxs)("strong",{children:["Write a function according to the following interface:",(0,o.jsx)("strong",{children:" function guess() external pure returns (bytes memory secret);"})]})})]})})]})}),(0,o.jsx)(c.Z,{className:"game-card",style:{backgroundColor:"#000000",color:"white"},children:(0,o.jsxs)(a.Z,{children:[(0,o.jsx)("h3",{className:"desc-title title-color",children:(0,o.jsx)("b",{children:"Your Test Address:"})}),(0,o.jsxs)("p",{style:{wordBreak:"break-all"},className:"Instance-color",children:[" ",n," "]}),(0,o.jsx)(f.Z,{children:(0,o.jsx)(h.Z,{style:{color:"black"},className:"form-control-alternative",id:"input-city",placeholder:"guess",type:"text",onChange:e=>t(e.target.value)})}),(0,o.jsx)(u.Z,{style:{backgroundColor:"#c97539",color:"white"},className:"mt-1",onClick:()=>H(e),children:"findCollision"})]})})]}),(0,o.jsx)("p",{style:{display:"flex",justifyContent:"center",alignItems:"center"},children:x<1?null:(0,o.jsxs)("div",{children:[(0,o.jsxs)("strong",{children:["Congratulations! You Got A Badge"," ",(0,o.jsx)("i",{className:"fas fa-medal",style:{color:"gold",fontSize:"20px",position:"relative",top:"3px"}})]}),(0,o.jsx)("br",{}),(0,o.jsx)("br",{})]})})]}),(0,o.jsx)(y.Ix,{})]})}},89163:(e,t,n)=>{"use strict";n.d(t,{Z:()=>h});var o=n(67294),s=n(45697),r=n.n(s),l=n(93967),i=n.n(l),c=n(22040),a=["className","cssModule","row","disabled","check","inline","floating","noMargin","tag","switch"];function u(){return(u=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var d={children:r().node,row:r().bool,check:r().bool,switch:r().bool,inline:r().bool,floating:r().bool,noMargin:r().bool,disabled:r().bool,tag:c.iC,className:r().string,cssModule:r().object};function f(e){var t=e.className,n=e.cssModule,s=e.row,r=e.disabled,l=e.check,d=e.inline,f=e.floating,h=e.noMargin,p=e.tag,y=void 0===p?"div":p,b=e.switch,m=function(e,t){if(null==e)return{};var n,o,s=function(e,t){if(null==e)return{};var n,o,s={},r=Object.keys(e);for(o=0;o<r.length;o++)n=r[o],t.indexOf(n)>=0||(s[n]=e[n]);return s}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(o=0;o<r.length;o++)n=r[o],!(t.indexOf(n)>=0)&&Object.prototype.propertyIsEnumerable.call(e,n)&&(s[n]=e[n])}return s}(e,a),g=l||b,j=(0,c.mx)(i()(t,!!s&&"row",!!g&&"form-check",!!b&&"form-switch",!g&&!h&&"mb-3",!!g&&!!d&&"form-check-inline",!!g&&!!r&&"disabled",f&&"form-floating"),n);return"fieldset"===y&&(m.disabled=r),o.createElement(y,u({},m,{className:j}))}f.propTypes=d;let h=f},87261:(e,t,n)=>{"use strict";n.d(t,{Z:()=>m});var o=n(67294),s=n(45697),r=n.n(s),l=n(93967),i=n.n(l),c=n(22040);function a(e){return(a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var u=["className","cssModule","type","bsSize","valid","invalid","tag","addon","plaintext","innerRef"];function d(){return(d=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}function f(e,t){return(f=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e})(e,t)}function h(e){if(void 0===e)throw ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function p(e){return(p=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var y={children:r().node,type:r().string,size:r().oneOfType([r().number,r().string]),bsSize:r().string,valid:r().bool,invalid:r().bool,tag:c.iC,innerRef:r().oneOfType([r().object,r().func,r().string]),plaintext:r().bool,addon:r().bool,className:r().string,cssModule:r().object},b=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&f(e,t)}(r,e);var t,n,s=(t=function(){if("undefined"==typeof Reflect||!Reflect.construct||Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(e){return!1}}(),function(){var e,n=p(r);return e=t?Reflect.construct(n,arguments,p(this).constructor):n.apply(this,arguments),function(e,t){if(t&&("object"===a(t)||"function"==typeof t))return t;if(void 0!==t)throw TypeError("Derived constructors may only return object or undefined");return h(e)}(this,e)});function r(e){var t;return!function(e,t){if(!(e instanceof t))throw TypeError("Cannot call a class as a function")}(this,r),(t=s.call(this,e)).getRef=t.getRef.bind(h(t)),t.focus=t.focus.bind(h(t)),t}return n=[{key:"getRef",value:function(e){this.props.innerRef&&this.props.innerRef(e),this.ref=e}},{key:"focus",value:function(){this.ref&&this.ref.focus()}},{key:"render",value:function(){var e=this.props,t=e.className,n=e.cssModule,s=e.type,r=void 0===s?"text":s,l=e.bsSize,a=e.valid,f=e.invalid,h=e.tag,p=e.addon,y=e.plaintext,b=e.innerRef,m=function(e,t){if(null==e)return{};var n,o,s=function(e,t){if(null==e)return{};var n,o,s={},r=Object.keys(e);for(o=0;o<r.length;o++)n=r[o],t.indexOf(n)>=0||(s[n]=e[n]);return s}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(o=0;o<r.length;o++)n=r[o],!(t.indexOf(n)>=0)&&Object.prototype.propertyIsEnumerable.call(e,n)&&(s[n]=e[n])}return s}(e,u),g=["switch","radio","checkbox"].indexOf(r)>-1,j="textarea"===r,x="select"===r,v="range"===r,w=h||(x||j?r:"input"),k="form-control";y?(k="".concat(k,"-plaintext"),w=h||"input"):v?k="form-range":x?k="form-select":g&&(k=p?null:"form-check-input"),m.size&&/\D/g.test(m.size)&&((0,c.O4)('Please use the prop "bsSize" instead of the "size" to bootstrap\'s input sizing.'),l=m.size,delete m.size);var O=(0,c.mx)(i()(t,f&&"is-invalid",a&&"is-valid",!!l&&(x?"form-select-".concat(l):"form-control-".concat(l)),k),n);return("input"===w||h&&"function"==typeof h)&&(m.type="switch"===r?"checkbox":r),m.children&&!(y||"select"===r||"string"!=typeof w||"select"===w)&&((0,c.O4)('Input with a type of "'.concat(r,'" cannot have children. Please use "value"/"defaultValue" instead.')),delete m.children),o.createElement(w,d({},m,{ref:b,className:O,"aria-invalid":f}))}}],function(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}(r.prototype,n),Object.defineProperty(r,"prototype",{writable:!1}),r}(o.Component);b.propTypes=y;let m=b}},e=>{var t=t=>e(e.s=t);e.O(0,[817,956,802,888,774,179],()=>t(24093)),_N_E=e.O()}]);