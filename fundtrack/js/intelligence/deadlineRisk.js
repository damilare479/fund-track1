const RISK_CLS={Critical:'urgent',High:'urgent',Moderate:'attn',Low:'ok'};
function deadlineRisk(a){const o=opp(a.oid),d=days(o.deadline),miss=S.docsList.filter((_,i)=>!a.done[i]);
const level=(d<0||d<=2&&miss.length)?'Critical':(d<=7&&miss.length>=2)?'High':(d<=14&&miss.length>=2||d<=7&&miss.length)?'Moderate':'Low';
return {level,days:d,cls:RISK_CLS[level],reasons:miss.slice(0,3).map(m=>m+' not ready')}}
function riskHtml(a){const r=deadlineRisk(a),m=S.docsList.filter((_,i)=>!a.done[i]);
return `<div style="margin-top:6px"><span class="tag ${r.cls}">${r.level} risk</span> <small>Readiness ${pct(a)}%${m.length?' · '+m.length+' open':''}</small>${m.length?`<small style="display:block">${esc(r.reasons.join(' · '))}</small>`:''}</div>`}
