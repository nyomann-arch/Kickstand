(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const i of t)if(i.type==="childList")for(const g of i.addedNodes)g.tagName==="LINK"&&g.rel==="modulepreload"&&a(g)}).observe(document,{childList:!0,subtree:!0});function r(t){const i={};return t.integrity&&(i.integrity=t.integrity),t.referrerPolicy&&(i.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?i.credentials="include":t.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(t){if(t.ep)return;t.ep=!0;const i=r(t);fetch(t.href,i)}})();const E=`:root {\r
  --pip-bg: #171A20;\r
  --pip-image-padding: 10px;\r
}\r
\r
html,\r
body {\r
  margin: 0;\r
  padding: 0;\r
  height: 100%;\r
  background: var(--pip-bg);\r
}\r
\r
.pip-stage {\r
  box-sizing: border-box;\r
  width: 100%;\r
  height: 100%;\r
  display: flex;\r
  align-items: center;\r
  justify-content: center;\r
  padding: var(--pip-image-padding);\r
}\r
\r
.pip-image {\r
  max-width: 100%;\r
  max-height: 100%;\r
  width: auto;\r
  height: auto;\r
  object-fit: contain;\r
  display: block;\r
}\r
`,I=new Set(["image/png","image/jpeg","image/webp"]),L=20*1024*1024,y=640,v=480,p=document.getElementById("fileInput"),B=document.getElementById("chooseButton"),O=document.getElementById("replaceButton"),x=document.getElementById("removeButton"),w=document.getElementById("popoutButton"),P=document.getElementById("previewSection"),o=document.getElementById("previewImage"),M=document.getElementById("statusMessage"),f="documentPictureInPicture"in window;let l=null,d=null,c=null,u=!1;function s(e){M.textContent=e}function h(){return d!==null}function m(){const e=l!==null,n=!f||u||h()||!e;w.disabled=n,f?h()&&s("Floating window is open. Keep this tab open."):s("This browser does not support Document Picture-in-Picture. Preview only.")}function T(){const e=o.naturalWidth||y,n=o.naturalHeight||v,r=Math.min(y/e,v/n,1);return{width:Math.max(1,Math.round(e*r)),height:Math.max(1,Math.round(n*r))}}function A(e){if(!e)return;const n=()=>URL.revokeObjectURL(e);o.addEventListener("load",n,{once:!0}),o.addEventListener("error",n,{once:!0})}function b(e){if(!e)return;if(!I.has(e.type)){s("This image type is not supported. Use PNG, JPG, or WebP.");return}if(e.size>L){s("This image is too large. The maximum size is 20 MB.");return}const n=URL.createObjectURL(e),r=l;l=n,P.hidden=!1,o.src=n,o.alt=e.name||"Image preview",c&&d&&(c.src=n,c.alt=o.alt),A(r),s("Image ready to float."),m()}function S(){const e=l;l=null,o.removeAttribute("src"),o.alt="Image preview",P.hidden=!0,c&&c.removeAttribute("src"),e&&URL.revokeObjectURL(e),s("Paste or choose an image to get started."),m()}document.addEventListener("paste",e=>{var r;const n=(r=e.clipboardData)==null?void 0:r.items;if(n){for(const a of n)if(a.kind==="file"){const t=a.getAsFile();if(t){e.preventDefault(),b(t);return}}}});p.addEventListener("change",()=>{var e;b((e=p.files)==null?void 0:e[0]),p.value=""});B.addEventListener("click",()=>p.click());O.addEventListener("click",()=>p.click());x.addEventListener("click",S);o.addEventListener("error",()=>{l&&s("The image could not be loaded. Try another file.")});async function U(){if(!(!f||u||h()||!l)){u=!0,w.disabled=!0;try{const{width:e,height:n}=T(),r=await window.documentPictureInPicture.requestWindow({width:e,height:n});d=r;const a=r.createElement("style");a.textContent=E,r.head.appendChild(a);const t=r.createElement("div");t.className="pip-stage";const i=r.createElement("img");i.className="pip-image",i.src=l,i.alt=o.alt||"Floating image preview",t.appendChild(i),r.body.appendChild(t),c=i,d.addEventListener("pagehide",()=>{d=null,c=null,u=!1,s("Floating window closed. Your image is still here."),m()}),s("Floating window is open. Keep this tab open.")}catch(e){d=null,c=null,s("Could not open the floating window. Try again."),console.error("Document PiP request failed:",e)}finally{u=!1,m()}}}w.addEventListener("click",()=>{U()});m();
