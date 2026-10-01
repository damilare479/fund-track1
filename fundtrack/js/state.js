let S=storage.load()||seed(),view='overview',q='',flt={};
const normOpp=o=>{o.added=o.added||new Date().toISOString();o.status=o.status||'Interested';o.priority=o.priority||'Medium';o.fields=o.fields||String(o.field||'').split(',').map(x=>x.trim()).filter(Boolean);o.reqs=o.reqs||S.docsList.map(t=>({t,done:false}));o.log=o.log||[{d:o.added,t:'Opportunity added'}];return o};
S.opps.forEach(normOpp);S.prof.forEach(p=>{if(p.stage==='Interested')p.stage='Response received';if(p.stage==='No response')p.stage='Not available'});S.motiv=S.motiv||{on:true,auto:false,vol:1,voice:''};S.userName=S.userName||'';const nm=()=>S.userName?', '+S.userName:'';

const save=()=>storage.save(S);
const opp=id=>S.opps.find(o=>o.id===id)||{};
const pct=a=>Math.round(a.done.reduce((x,y)=>x+y,0)/a.done.length*100);
const urg=d=>d<0?['Closed','']:d<7?['Urgent','urgent']:d<15?['Attention','attn']:d<=30?['Watch','']:['Normal','ok'];
const dtag=iso=>{if(!iso)return '<span class="tag">Check source</span>';const d=days(iso),[l,c]=urg(d);return `<span class="tag ${c}">${d<0?'Closed':d+' days · '+l}</span>`};
const toast=m=>{const t=document.getElementById('toast');t.textContent=m;t.classList.add('on');clearTimeout(toast.t);toast.t=setTimeout(()=>t.classList.remove('on'),2200)};
const fmt=iso=>new Date(iso+'T00:00').toLocaleDateString(undefined,{day:'numeric',month:'short',year:'numeric'});
const empty=(m,b)=>`<div class="empty">${m}${b?`<p>${b}</p>`:''}</div>`;
