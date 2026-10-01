// One pointer-based drag for Applications and Outreach (mouse, touch, pen). Motion handles the settle and count animations.
(()=>{
const LONG_PRESS=220,MOVE_TOL=10,EDGE=56,SPEED=14;
const M=()=>window.Motion,reduce=()=>!!(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches);
const anim=(el,kf,o)=>{if(!el||reduce()||!M()||!M().animate)return;try{return M().animate(el,kf,o)}catch(e){}};
let d=null;
const colAt=(x,y,kind)=>{for(const el of document.elementsFromPoint(x,y)){const c=el.closest&&el.closest('[data-drop]');if(c&&(c.dataset.k==='p')===(kind==='p'))return c}return null};
function place(){const dx=d.px-d.x0+(d.kan?d.kan.scrollLeft-d.sl0:0),dy=d.py-d.y0;d.card.style.transform=`translate3d(${dx}px,${dy}px,0) scale(1.03)`;
 const c=colAt(d.px,d.py,d.kind),over=c&&c!==d.origin?c:null;if(over!==d.col){d.col&&d.col.classList.remove('over');over&&over.classList.add('over');d.col=over}}
function loop(){if(!d||!d.on)return;if(d.kan){const r=d.kan.getBoundingClientRect(),v=d.px>r.right-EDGE?SPEED:d.px<r.left+EDGE?-SPEED:0;if(v){d.kan.scrollLeft+=v;place()}}d.raf=requestAnimationFrame(loop)}
function start(){d.on=true;d.card.classList.add('dragging');document.body.classList.add('drag-active');d.card.style.transition='box-shadow .15s,opacity .15s';if(navigator.vibrate)navigator.vibrate(8);place();loop()}
function end(commit){const s=d;if(!s)return;d=null;clearTimeout(s.t);cancelAnimationFrame(s.raf);try{s.h.releasePointerCapture(s.pid)}catch(e){}
 document.body.classList.remove('drag-active');s.col&&s.col.classList.remove('over');if(!s.on)return;
 const stage=commit&&s.col?s.col.dataset.drop:null,c=s.card;
 if(stage){(s.kind==='p'?moveProfessor:moveApplication)(s.id,stage);anim(document.querySelector(`[data-drag="${s.kind}"][data-id="${s.id}"]`),{scale:[1.04,1],opacity:[.6,1]},{type:'spring',stiffness:420,damping:28})}
 else{c.style.transition=reduce()?'none':'transform .25s cubic-bezier(.2,.8,.2,1)';c.style.transform='';setTimeout(()=>{c.classList.remove('dragging');c.style.transition=''},260)}}
document.addEventListener('pointerdown',e=>{const h=e.target.closest&&e.target.closest('.drag-handle');if(!h||d||(e.pointerType==='mouse'&&e.button!==0))return;const card=h.closest('[data-drag]');if(!card)return;const kan=card.closest('.kan');
 d={card,h,kind:card.dataset.drag,id:card.dataset.id,pid:e.pointerId,touch:e.pointerType!=='mouse',x0:e.clientX,y0:e.clientY,px:e.clientX,py:e.clientY,kan,sl0:kan?kan.scrollLeft:0,origin:card.closest('[data-drop]'),on:false,col:null};
 try{h.setPointerCapture(e.pointerId)}catch(x){}if(d.touch)d.t=setTimeout(()=>{if(d&&!d.on)start()},LONG_PRESS);e.preventDefault()});
document.addEventListener('pointermove',e=>{if(!d||e.pointerId!==d.pid)return;d.px=e.clientX;d.py=e.clientY;
 if(!d.on){const m=Math.hypot(e.clientX-d.x0,e.clientY-d.y0);if(d.touch){if(m>MOVE_TOL)end(false);return}if(m<4)return;start()}place()});
document.addEventListener('pointerup',e=>{if(d&&e.pointerId===d.pid)end(true)});
document.addEventListener('pointercancel',e=>{if(d&&e.pointerId===d.pid)end(false)});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&d)end(false)});
document.addEventListener('touchmove',e=>{if(d&&d.on)e.preventDefault()},{passive:false});
document.addEventListener('contextmenu',e=>{if(e.target.closest&&e.target.closest('.drag-handle'))e.preventDefault()});
const prev={};
window.afterRender=()=>document.querySelectorAll('[data-count]').forEach(el=>{const k=el.dataset.count,v=+el.textContent,p=prev[k];prev[k]=v;
 if(p!==undefined&&p!==v&&!reduce()&&M()&&M().animate)try{M().animate(p,v,{duration:.5,onUpdate:n=>{el.textContent=Math.round(n)}})}catch(e){}});
})();
