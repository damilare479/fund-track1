const ACTIONS={
mission(id){const a=getNextBestActions().find(x=>x.id===id);if(!a)return;({app:()=>go('apps'),prof:()=>ACTIONS.profm(a.entityId),opp:()=>{go('opp',a.entityId)},doc:()=>go('apps')})[a.entityType]()},
mdone(id){const i=S.doneActions.indexOf(id);i<0?S.doneActions.push(id):S.doneActions.splice(i,1);save();render();document.querySelector(`[data-mi="${id}"]`)?.animate([{transform:'scale(1.02)'},{transform:'none'}],{duration:220});toast(i<0?'Action completed':'Action reopened')},
openprof:id=>go('prof',id),openopp(id){const d=document.getElementById('dlg');if(d.open)d.close();go('opp',id)},
build:id=>outreachDialog(id),closedlg:()=>document.getElementById('dlg').close(),
regen(id){const p=S.prof.find(x=>x.id===id);document.getElementById('odraft').value=draftText(p,document.getElementById('opub').value,document.getElementById('oexp').value,fitFor(p).overlap.map(r=>r[0].toLowerCase()))},
savedraft(id){const p=S.prof.find(x=>x.id===id);p.draft=document.getElementById('odraft').value;p.followUp=D(7);save();document.getElementById('dlg').close();render();toast('Draft saved. Follow-up scheduled for '+fmt(D(7)))},
logsent(id){const p=S.prof.find(x=>x.id===id);p.stage='Email sent';p.contacted=D(0);p.followUp=D(7);save();render();toast('Outreach logged. Follow-up in 7 days')},
addapp(id){const p=S.prof.find(x=>x.id===id);if(!p.oid)return toast('No linked opportunity');if(S.apps.some(a=>a.oid===p.oid))return go('apps');startApp(p.oid,p.id)},
expall(){dlFile('fundtrack-backup.json',JSON.stringify(S,null,2),'application/json');toast('Export started')},
dl(id,t){const k=t.dataset.k,rows=S[k];t.dataset.f==='csv'?dlFile(k+'.csv',csv(rows),'text/csv'):dlFile(k+'.json',JSON.stringify(rows,null,2),'application/json')},
reset(){storage.reset();S=seed();save();flt={};q='';render();toast('Demo data restored')}};
document.addEventListener('click',e=>{const t=e.target.closest('[data-act]'),h=t&&ACTIONS[t.dataset.act];if(h)h(t.dataset.id,t)});
Object.assign(ACTIONS,{
addopp:()=>oppForm(),editopp:id=>oppForm(id),ofilt(id,t){ofk=t.dataset.k;render()},
askdel(id){const d=document.getElementById('dlg');d.innerHTML=`<h3>Delete this opportunity?</h3><p>This will remove the opportunity from your tracker.</p><div class="bar"><button class="btn" data-act="closedlg">Cancel</button><button class="btn p" data-act="delyes" data-id="${id}">Delete</button></div>`;d.showModal()},
delyes(id){S.opps=S.opps.filter(o=>o.id!==id);S.apps=S.apps.filter(a=>a.oid!==id);save();document.getElementById('dlg').close();go('opps');toast('Opportunity deleted')},
saveprof(){const L=(i,lc=1)=>document.getElementById(i).value.split(',').map(x=>x.trim()).filter(Boolean).map(y=>lc?y.toLowerCase():y);S.userName=document.getElementById('pf-name').value.trim();S.profile={...S.profile,degreeGoal:document.getElementById('pf-goal').value,areas:L('pf-areas'),countries:L('pf-countries',0)};save();render();toast('Changes saved')},
themetoggle:()=>document.getElementById('theme').click(),
obtog(id,t){const l=ob[t.dataset.k],v=t.dataset.val,i=l.indexOf(v);i<0?l.push(v):l.splice(i,1);render()},
obgoal(id,t){ob.goal=t.dataset.val;render()},obback(){ostep--;render()},
obnext(){const n=document.getElementById('ob-name');if(n)ob.name=n.value;ostep++;render()},
obskip(){const n=document.getElementById('ob-name');if(n)ob.name=n.value;ostep++;render()},
obfinish(){S.userName=ob.name.trim();S.profile.degreeGoal=ob.goal||S.profile.degreeGoal;if(ob.areas.length)S.profile.areas=ob.areas.map(a=>a.toLowerCase());if(ob.countries.length)S.profile.countries=ob.countries;S.onboarded=true;save();render()}});
