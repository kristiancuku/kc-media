window.kcRun=async function(n){
 const sleep=ms=>new Promise(r=>setTimeout(r,ms));
 const eps=await (await fetch('https://raw.githubusercontent.com/kristiancuku/kc-media/main/spotify/eps.json?'+Date.now())).json();
 const e=eps.find(x=>x.n===n);
 const si=Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set, st=Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype,'value').set, ss=Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype,'value').set;
 const log=[];
 // upload
 const inp=document.querySelector('input[type=file]');
 const b=await (await fetch('https://raw.githubusercontent.com/kristiancuku/kc-media/main/spotify/'+e.file)).blob();
 const dt=new DataTransfer(); dt.items.add(new File([b],e.file,{type:'audio/mpeg'})); inp.files=dt.files; inp.dispatchEvent(new Event('change',{bubbles:true}));
 let t=null; for(let k=0;k<60&&!t;k++){await sleep(1000); t=document.querySelector('input[name=title]');}
 log.push('upload '+b.size+' form '+!!t);
 t.focus(); si.call(t,e.title); t.dispatchEvent(new Event('input',{bubbles:true})); t.dispatchEvent(new Event('change',{bubbles:true}));
 // HTML toggle
 const tog=[...document.querySelectorAll('input[type=checkbox]')].find(c=>{let p=c.parentElement;for(let i=0;i<4&&p;i++){if(/^HTML$/m.test(p.innerText||''))return true;p=p.parentElement;}return false;});
 (tog.closest('label')||tog).click(); await sleep(800);
 const ta=[...document.querySelectorAll('textarea')].find(x=>x.offsetParent); ta.focus(); st.call(ta,e.desc); ta.dispatchEvent(new Event('input',{bubbles:true})); ta.dispatchEvent(new Event('change',{bubbles:true})); ta.blur(); await sleep(600);
 const num=document.querySelector('input[name=podcastEpisodeNumber]'); num.focus(); si.call(num,String(n)); num.dispatchEvent(new Event('input',{bubbles:true})); num.dispatchEvent(new Event('change',{bubbles:true})); num.blur();
 await sleep(600);
 log.push('title '+t.value+' | '+(document.body.innerText.match(/\d+ \/ 4000/)||[''])[0]+' | ep '+num.value);
 // wait preview ready
 for(let k=0;k<120;k++){ if(/Preview ready/.test(document.body.innerText)) break; await sleep(1000);}
 return log;
};
