if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,t)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(s[r])return;let c={};const f=e=>i(e,r),o={module:{uri:r},exports:c,require:f};s[r]=Promise.all(n.map((e=>o[e]||f(e)))).then((e=>(t(...e),c)))}}define(["./workbox-2dfdff9b"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-Bnu8G7PR.css",revision:null},{url:"assets/index-Z-oqcwJ0.js",revision:null},{url:"index.html",revision:"2515d06738f55742747f41d557dfa6ba"},{url:"registerSW.js",revision:"03834b4d8b7847d6747f51efc7f163b5"},{url:"appIcon.jpg",revision:"4a9f1259ca39561e9f08a130a3f23886"},{url:"manifest.webmanifest",revision:"18e23d3d2a69d301ae415e256fb15f1a"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html"))),e.registerRoute(/someInterface/i,new e.CacheFirst({cacheName:"interface-cache",plugins:[]}),"GET"),e.registerRoute(/(.*?)\.(js|css|ts)/,new e.CacheFirst({cacheName:"js-css-cache",plugins:[]}),"GET"),e.registerRoute(/(.*?)\.(png|jpe?g|svg|gif|bmp|psd|tiff|tga|eps)/,new e.CacheFirst({cacheName:"image-cache",plugins:[]}),"GET")}));
