function startApp(oid,pid){if(S.apps.find(a=>a.oid===oid))return toast('Application already exists');S.apps.push({id:'a'+Date.now(),oid,profId:pid,status:'Researching',priority:'Medium',done:S.docsList.map(()=>0),updated:D(0),created:D(0)});save();toast('Application started');go('apps')}

function moveApplication(id,status){const a=S.apps.find(x=>x.id===id);if(!a||a.status===status)return;a.status=status;a.updated=D(0);const o=opp(a.oid);if(o.log)o.log.unshift({d:new Date().toISOString(),t:'Application moved to '+status});
if(['Submitted','Interview','Decision','Accepted'].includes(status)&&['Interested','Researching','Preparing'].includes(o.status))o.status='Applied';save();render();toast('Application moved to '+status)}
