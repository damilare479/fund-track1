const sharedAreas=(mine,theirs)=>theirs.filter(t=>mine.some(m=>t.toLowerCase().includes(m.toLowerCase())||m.toLowerCase().includes(t.toLowerCase())));
const fitFor=p=>({overlap:sharedAreas(S.profile.areas,p.areas).map(n=>[n])});
const chips=(l,c='')=>l.map(x=>`<span class="tag ${c}">${esc(x)}</span>`).join(' ')||'<small>None</small>';
