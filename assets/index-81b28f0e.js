(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const e of t)if(e.type==="childList")for(const i of e.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function c(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerpolicy&&(e.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?e.credentials="include":t.crossorigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function s(t){if(t.ep)return;t.ep=!0;const e=c(t);fetch(t.href,e)}})();const f=document.querySelector(".calendar__title"),d=document.querySelector(".days"),y=document.querySelector(".calendar__arrows");let a=new Date;console.log("date :>> ",a);let g=a.getDay();console.log("currDay :>> ",g);let n=a.getFullYear(),r=a.getMonth();const D=["January","February","March","April","May","June","July","August","September","October","November","December"],u=()=>{const l=new Date(n,r,1).getDay();console.log("firstDayOfMonth :>> ",l);const o=new Date(n,r+1,0).getDate(),c=new Date(n,r,o).getDay(),s=new Date(n,r,0).getDate();let t="";for(let e=l-1;e>0;e-=1)t+=`<li class='inactive'>${s-e+1}</li>`;if(l===0)for(let e=6;e>0;e-=1)t+=`<li class='inactive'>${s-e+1}</li>`;for(let e=1;e<=o;e+=1){const i=e===a.getDate()&&r===new Date().getMonth()&&n===new Date().getFullYear()?"active":"";t+=`<li class='${i}'>${e}</li>`}if(c!==0)for(let e=c;e<7;e+=1)t+=`<li class='inactive'>${e-c+1}</li>`;f.innerHTML=`${D[r]} ${n}`,d.innerHTML=t};u();y.addEventListener("click",l=>{const o=l.target;switch(console.log("clickedIconRef :>> ",o),o.id){case"month__prev":r-=1;break;case"month__next":r+=1;break;case"year__prev":n-=1;break;case"year__next":n+=1;break}r<0||r>11?(a=new Date(n,r,new Date().getDate()),n=a.getFullYear(),r=a.getMonth()):a=new Date,u()});
