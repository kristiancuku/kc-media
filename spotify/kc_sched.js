window.kcSched=async function(n){
 const sleep=ms=>new Promise(r=>setTimeout(r,ms)); const log=[];
 const btn=txt=>[...document.querySelectorAll('button')].find(b=>b.innerText.trim()===txt&&b.offsetParent);
 btn('Next').click(); await sleep(2500);
 const rad=document.querySelector('input[value=schedule]'); (rad.closest('label')||rad).click(); rad.click(); await sleep(800);
 // open date picker: element containing mm/dd/yyyy
 const dEl=[...document.querySelectorAll('button,input,div')].filter(e=>e.offsetParent&&/^\d{2}\/\d{2}\/\d{4}$/.test((e.value||e.innerText||'').trim())).pop();
 dEl.click(); await sleep(1000);
 // find November heading then day 18 after it
 const all=[...document.querySelectorAll('*')].filter(e=>e.offsetParent&&e.children.length===0);
 const ni=all.findIndex(e=>e.innerText&&e.innerText.trim()==='November 2026');
 const d18=all.slice(ni).find(e=>e.innerText.trim()==='18');
 (d18.closest('button,[role=button],td')||d18).click(); await sleep(600);
 const cl=btn('Close'); cl&&cl.click(); await sleep(800);
 const si=Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set, ss=Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype,'value').set;
 const h=document.querySelector('[data-testid=hour-picker]'), m=document.querySelector('[data-testid=minute-picker]'), p=document.querySelector('[data-testid=meridiem-picker]');
 for(const [el,v] of [[h,'08'],[m,String(n-1).padStart(2,'0')]]){el.focus(); si.call(el,v); el.dispatchEvent(new Event('input',{bubbles:true})); el.dispatchEvent(new Event('change',{bubbles:true})); el.blur();}
 ss.call(p,'AM'); p.dispatchEvent(new Event('change',{bubbles:true})); await sleep(700);
 const dv=[...document.querySelectorAll('button,input,div')].filter(e=>e.offsetParent&&/^\d{2}\/\d{2}\/\d{4}$/.test((e.value||e.innerText||'').trim())).pop();
 log.push('date '+(dv.value||dv.innerText).trim()+' time '+h.value+':'+m.value+' '+p.value);
 return log;
};
