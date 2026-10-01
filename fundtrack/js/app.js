document.addEventListener('click',e=>{const t=e.target.closest('[data-act],[data-v]');if(!t)return;const id=t.dataset.id,a=t.dataset.act;
if(t.dataset.v&&!a)return go(t.dataset.v);
({go:()=>go(t.dataset.v),save(){const o=opp(id);o.saved=!o.saved;save();render();toast(o.saved?'Saved ✓':'Removed from saved')},start:()=>startApp(id),
del(){S.opps=S.opps.filter(o=>o.id!==id);S.apps=S.apps.filter(x=>x.oid!==id);save();render();toast('Opportunity deleted')},
fflt(){flt[t.dataset.k]=!flt[t.dataset.k];render()},fclr(){delete flt[t.dataset.k];render()},fclrall(){flt={};q='';render()},
sent(){const p=S.prof.find(x=>x.id===id);p.stage='Email sent';p.contacted=D(0);save();render();toast('Outreach logged')},
newprof:()=>form('Add professor',[['name','Name'],['inst','University'],['area','Research area']],p=>{S.prof.push({...p,id:'p'+Date.now(),contacted:D(0),stage:'Ready to contact',note:''});toast('Professor added')})}[a]||(()=>{}))()});
document.addEventListener('change',e=>{const t=e.target,id=t.dataset.id;
if(t.id==='fc'){flt.country=t.value;render()}
else if(t.dataset.act==='st')moveApplication(id,t.value)
else if(t.dataset.act==='chk'){const a=S.apps.find(x=>x.id===id);a.done[t.dataset.i]=t.checked?1:0;save();render();if(pct(a)===100)toast('Application 100% complete')}});
let dt;document.addEventListener('input',e=>{if(e.target.id==='q'){clearTimeout(dt);const v=e.target.value;dt=setTimeout(()=>{q=v;render();const i=document.getElementById('q');i.focus();i.setSelectionRange(v.length,v.length)},180)}});
document.getElementById('theme').onclick=()=>{const r=document.documentElement,n=r.dataset.theme==='dark'?'light':'dark';r.dataset.theme=n;try{localStorage.setItem('ft.theme',n)}catch(e){}};
try{const t=localStorage.getItem('ft.theme');if(t)document.documentElement.dataset.theme=t}catch(e){}
render();
