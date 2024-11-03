"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[802],{52802:(e,t,a)=>{a.d(t,{NM:()=>f,$_:()=>y,wp:()=>m,Oz:()=>w,dy:()=>u,eN:()=>g,gw:()=>h});var i=a(85893),s=a(13566),n=a(67294),l=a(11163),r=a(41664),d=a.n(r),o=a(72771),c=a(22723),x=a(73847),p=a(73948);let m=()=>{let{walletAddress:e,requestAccount:t}=(0,n.useContext)(o.S),a=(0,l.useRouter)(),[r,m]=(0,n.useState)(!1);return(0,n.useEffect)(()=>{let e=()=>{m(!1)};return window.addEventListener("scroll",e),()=>window.removeEventListener("scroll",e)},[]),(0,i.jsxs)("div",{className:"relative",children:[(0,i.jsx)(s.E.nav,{variants:x.yB,initial:"hidden",whileInView:"show",className:"".concat(c.Z.xPaddings," py-8 relative z-10"),children:(0,i.jsxs)("div",{className:"".concat(c.Z.innerWidth," mx-auto flex justify-between gap-8"),children:[(0,i.jsx)(d(),{href:"/",passHref:!0,children:(0,i.jsx)("h2",{className:"font-extrabold text-[24px] leading-[30.24px] text-white",children:"Solidity Quest"})}),(0,i.jsxs)("div",{className:"flex items-center",children:[(0,i.jsx)("button",{onClick:t,className:"bg-blue-500 text-white px-4 py-2 rounded-md",disabled:!t,children:e?"Connected":"Connect Wallet"}),(0,i.jsx)("img",{src:"/menu.svg",alt:"menu",className:"w-[24px] h-[24px] object-contain ml-4 cursor-pointer",onClick:()=>{m(e=>!e),console.log("Dropdown Open State:",!r)}})]})]})}),r&&(0,i.jsx)("div",{className:"absolute top-20 right-0 bg-gray-800 rounded-lg shadow-lg p-4 z-50",children:p.Wp.map((e,t)=>(0,i.jsx)("div",{className:"cursor-pointer text-white hover:text-gray-300 mb-2",onClick:()=>{a.push("/games/Game".concat(t+1)),m(!1)},children:(0,i.jsx)("p",{className:"small-title",children:e.title})},e.id))})]})},h=e=>{let{title:t,textStyles:a}=e;return(0,i.jsx)(s.E.p,{variants:x.AR,className:"font-normal text-[14px] text-secondary-white ".concat(a),children:Array.from(t).map((e,t)=>(0,i.jsx)(s.E.span,{variants:x.lM,children:" "===e?"\xa0":e},t))})},g=e=>{let{title:t,textStyles:a}=e;return(0,i.jsx)(s.E.h2,{variants:x.lM,initial:"hidden",whileInView:"show",className:"mt-[8px] font-bold md:text-[64px] text-[40px] text-white ".concat(a),children:t})},f=e=>{let{id:t,imgUrl:a,title:n,index:r,active:d,handleClick:o}=e,p=(0,l.useRouter)();return(0,i.jsxs)(s.E.div,{variants:(0,x.Ji)("right","spring",.25*r,2.75),className:"relative ".concat(d===t?"h-[360px] rounded-[12px]":"h-[220px] sm:h-[320px] rounded-[12px]"," flex items-center justify-center transition-[flex] duration-[0.5s] ease-out cursor-pointer m-3"),onClick:()=>{d===t?p.push("/games/Game".concat(r+1)):o(t)},children:[(0,i.jsx)("img",{src:a,alt:n,className:"absolute w-full h-full object-cover rounded-[12px]"}),d!==t?(0,i.jsx)("div",{className:"absolute bottom-0 p-4 flex justify-start w-full flex-col rounded-b-[12px]",children:(0,i.jsx)("h2",{className:"mt-[12px] font-semibold sm:text-[16px] text-[18px] text-white whitespace-nowrap",children:n})}):(0,i.jsxs)("div",{className:"absolute bottom-0 p-4 flex justify-start w-full flex-col bg-[rgba(0,0,0,0.5)] rounded-[12px]",children:[" ",(0,i.jsx)("div",{className:"".concat(c.Z.flexCenter," w-[50px] h-[50px] rounded-[12px] glassmorphism mb-[8px]"),children:(0,i.jsx)("img",{src:"/game.png",alt:"headset",className:"object-contain"})}),(0,i.jsx)("p",{className:"font-normal text-[14px] leading-[16px] text-white uppercase",children:"Play Now!"}),(0,i.jsx)("h2",{className:"mt-[12px] font-semibold sm:text-[16px] text-[18px] text-white whitespace-nowrap",children:n})]})]})},u=e=>{let{number:t,text:a}=e;return(0,i.jsxs)("div",{className:"".concat(c.Z.flexCenter," flex-row"),children:[(0,i.jsx)("div",{className:"".concat(c.Z.flexCenter," w-[70px] h-[70px] rounded-[24px] bg-[#323F5D]"),children:(0,i.jsx)("p",{className:"font-bold text-[20px] text-white",children:t})}),(0,i.jsx)("p",{className:"flex-1 ml-[30px] font-normal text-[18px] text-[#B0B0B0] leading-[32.4px]",children:a})]})},w=e=>{let{imgUrl:t,title:a,subtitle:s}=e;return(0,i.jsxs)("div",{className:"flex-1 flex flex-col sm:max-w-[250px] min-w-[210px]",children:[(0,i.jsx)("div",{className:"".concat(c.Z.flexCenter," w-[70px] h-[70px] rounded-[24px] bg-[#323F5D]"),children:(0,i.jsx)("img",{src:t,alt:"icon",className:"w-1/2 h-1/2 object-contain"})}),(0,i.jsx)("h1",{className:"mt-[26px] font-bold text-[24px] leading-[30.24px] text-white",children:a}),(0,i.jsx)("p",{className:"flex-1 mt-[16px] font-normal text-[18px] text-[#B0B0B0] leading-[32.4px]",children:s})]})},y=()=>{let{finalMint:e}=(0,n.useContext)(o.S);return(0,i.jsxs)(s.E.footer,{variants:x.FT,initial:"hidden",whileInView:"show",className:"".concat(c.Z.xPaddings," py-8 relative"),children:[(0,i.jsx)("div",{className:"footer-gradient"}),(0,i.jsxs)("div",{className:"".concat(c.Z.innerWidth," mx-auto flex flex-col gap-8"),children:[(0,i.jsxs)("div",{className:"flex items-center justify-between flex-wrap gap-5",children:[(0,i.jsx)("h4",{className:"font-bold md:text-[64px] text-[44px] text-white",children:"Claim Final Certificate"}),(0,i.jsxs)("button",{type:"button",onClick:e,className:"flex items-center h-fit py-4 px-6 bg-[#25618B] rounded-[32px] gap-[12px]",children:[(0,i.jsx)("img",{src:"/vrpano.svg",alt:"vrpano",className:"w-[24px] h-[24px] object-contain"}),(0,i.jsx)("span",{className:"font-normal text-[16px] text-white",children:"Claim"})]})]}),(0,i.jsxs)("div",{className:"flex flex-col",children:[(0,i.jsx)("div",{className:"mb-[50px] h-[2px] bg-white opacity-10"}),(0,i.jsxs)("div",{className:"flex items-center justify-between flex-wrap gap-4",children:[(0,i.jsx)("h4",{className:"font-extrabold text-[24px] text-white",children:"METAVERUS"}),(0,i.jsx)("p",{className:"font-normal text-[14px] text-white opacity-50",children:"Copyright \xa9 2021 - 2022 Metaversus. All rights reserved."}),(0,i.jsx)("div",{className:"flex gap-4",children:p.UY.map(e=>(0,i.jsx)("img",{src:e.url,alt:e.name,className:"w-[24px] h-[24px] object-contain cursor-pointer"},e.name))})]})]})]})]})}},73948:(e,t,a)=>{a.d(t,{UY:()=>l,Wp:()=>i,gw:()=>n,pT:()=>s});let i=[{id:"game-1",imgUrl:"/GAME1.png",title:"Bytes2"},{id:"game-2",imgUrl:"/GAME2.png",title:"Fallback"},{id:"game-3",imgUrl:"/GAME3.png",title:"Check Balance"},{id:"game-4",imgUrl:"/GAME4.png",title:"Payable Contract"},{id:"game-5",imgUrl:"/GAME5.png",title:"TimeStamp"},{id:"game-6",imgUrl:"/GAME6.png",title:"Gas Checker"},{id:"game-7",imgUrl:"/GAME7.png",title:"Change Password"},{id:"game-8",imgUrl:"/GAME8.png",title:"overflow"},{id:"game-9",imgUrl:"/GAME9.png",title:"BlockHash"},{id:"game-10",imgUrl:"GAME10.png",title:"interface Id"},{id:"game-11",imgUrl:"/GAME11.png",title:"EncodeData"},{id:"game-12",imgUrl:"/GAME12.png",title:"Hash Collision"},{id:"game-13",imgUrl:"/GAME13.png",title:"Decode Data"},{id:"game-14",imgUrl:"/GAME14.png",title:"Contract Factory"},{id:"game-15",imgUrl:"/GAME15.png",title:"Interface Id"},{id:"game-16",imgUrl:"/GAME16.png",title:"Limited Tickets"},{id:"game-17",imgUrl:"/GAME17.png",title:"Educated Guess"}],s=["Find a world that suits you and you want to enter","Enter the world by reading basmalah to be safe","No need to beat around the bush, just stay on the gas and have fun"],n=[{imgUrl:"/game.png",title:"Play To Learn",subtitle:"Enhance your solidity skills by solving fun challenges, Come explore, experiment and excel."},{imgUrl:"/iconSol.Png",title:"Get Certificate",subtitle:"Each step solution awards a badge. Gather all required badges, and you can mint a final certificate!\xa0"}],l=[{name:"twitter",url:"/twitter.svg"},{name:"linkedin",url:"/linkedin.svg"},{name:"instagram",url:"/instagram.svg"},{name:"facebook",url:"/facebook.svg"}]},22723:(e,t,a)=>{a.d(t,{Z:()=>i});let i={innerWidth:"2xl:max-w-[1280px] w-full",interWidth:"lg:w-[80%] w-[100%]",paddings:"sm:p-6 xs:p-8 px-6 py-12 top-[-32px] ",yPaddings:"sm:py-16 xs:py-8 py-12",xPaddings:"sm:px-16 px-6",topPaddings:"sm:pt-16 xs:pt-8 pt-12",bottomPaddings:"sm:pb-16 xs:pb-8 pb-12",flexCenter:"flex justify-center items-center",flexStart:"flex justify-start items-start",flexEnd:"flex justify-end",navPadding:"pt-[98px]"}},73847:(e,t,a)=>{a.d(t,{AR:()=>n,FT:()=>c,Ji:()=>r,Jm:()=>s,kr:()=>o,lM:()=>l,vk:()=>d,yB:()=>i});let i={hidden:{opacity:0,y:-50,transition:{type:"spring",stiffness:300,damping:20}},show:{opacity:1,y:0,transition:{type:"spring",stiffness:100,damping:20,delay:.5}}},s=(e,t)=>({hidden:{},show:{transition:{staggerChildren:e,delayChildren:t}}}),n={hidden:{opacity:0},show:function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;return{opacity:1,transition:{staggerChildren:.1,delayChildren:.1*e}}}},l={hidden:{opacity:0,y:20},show:{opacity:1,y:0,transition:{type:"tween",ease:"easeIn"}}},r=(e,t,a,i)=>({hidden:{x:"left"===e?100:"right"===e?-100:0,y:"up"===e?100:"down"===e?-100:0,opacity:0},show:{x:0,y:0,opacity:1,transition:{type:t,delay:a,duration:i,ease:"easeOut"}}}),d=e=>({hidden:{x:"left"===e?"-100%":"100%",rotate:120},show:{x:0,rotate:0,transition:{type:"spring",duration:1.8,delay:.5}}}),o=(e,t)=>({hidden:{scale:0,opacity:0},show:{scale:1,opacity:1,transition:{type:"tween",delay:e,duration:t,ease:"easeOut"}}}),c={hidden:{opacity:0,y:50,transition:{type:"spring",stiffness:300,damping:140}},show:{opacity:1,y:0,transition:{type:"spring",stiffness:80,delay:.5}}}}}]);