const KEY='fundtrack.v3',D=n=>{const d=new Date();d.setDate(d.getDate()+n);return d.toISOString().slice(0,10)};
const days=iso=>Math.ceil((new Date(iso+'T23:59:59')-new Date())/864e5);
const STAT=['Researching','Preparing','Submitted','Interview','Decision','Accepted','Rejected'];
const OST=['Ready to contact','Email sent','Follow-up due','Response received','Not available'];
const esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
