import"./assets/modulepreload-polyfill-3cfb730f.js";/* empty css                      */import{i as r}from"./assets/vendor-77e16229.js";const n=document.querySelector(".form");n.addEventListener("submit",c);const m={icon:"",position:"topRight",timeout:5e3};function c(o){o.preventDefault();const[e,t,i]=[...o.target.elements].map(({value:s})=>s.match("e")?NaN:Number(s));if(isNaN(e)||isNaN(t)||isNaN(i)){r.error({...m,message:"Invalid data"}),n.reset();return}for(let s=1;s<=i;s+=1){const a=e+t*s;u(s,a)}n.reset()}function u(o,e){l(o,e).then(t=>{r.success({...m,message:t,title:"✅"})}).catch(t=>{r.error({...m,message:t,title:"❌"})})}function l(o,e){return new Promise((t,i)=>{setTimeout(()=>{Math.random()>.3?t(`Fulfilled promise ${o} in ${e}ms`):i(`Rejected promise ${o} in ${e}ms`)},e)})}
//# sourceMappingURL=commonHelpers3.js.map
