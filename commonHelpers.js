import"./assets/modulepreload-polyfill-3cfb730f.js";/* empty css                      */const t={startBtn:document.querySelector("[data-start]"),stopBTtn:document.querySelector("[data-stop]")},n=e=>{e.target.disabled=!0,t.stopBTtn.disabled=!1;const r=setInterval(()=>{document.body.style.backgroundColor=o()},1e3);t.stopBTtn.addEventListener("click",a=>{clearInterval(r),t.startBtn.disabled=!1,a.target.disabled=!0})};t.startBtn.addEventListener("click",n);function o(){return`#${Math.floor(Math.random()*16777215).toString(16).padStart(6,0)}`}
//# sourceMappingURL=commonHelpers.js.map