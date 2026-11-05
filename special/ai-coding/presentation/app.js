(() => {
  'use strict';
  const slides=window.LAB_SLIDES;
  const names={intro:'Start · AI Coding Assistance',a:'A · Foundations',b:'B · Context engineering',c:'C · Extending the agent',d:'D · Working well & safely'};
  const palette={base:'#10101b',panel:'#1b1c2d',accent:'#d2e589',flow:'#b2a2ed',text:'#f4f3fa',muted:'#b8b7cc'};
  const colors=Object.fromEntries(Object.keys(names).map(k=>[k,palette]));
  const $=s=>document.querySelector(s);
  const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  let track='all',current=slides.find(s=>s.slug===location.hash.slice(1))||slides[0];
  const filtered=()=>slides.filter(s=>track==='all'||s.track===track);
  function slideHTML(s){
    const practice=s.kind==='practice';
    const teaching=practice?`<ol>${s.steps.map(t=>`<li>${esc(t)}</li>`).join('')}</ol>`:s.reading.map(t=>`<p>${esc(t)}</p>`).join('');
    return `<article class="slide" data-slide="${s.slug}" data-track="${s.track}" aria-label="${esc(s.id+' '+s.title)}"><div class="backdrop" aria-hidden="true">${s.background?`<img src="${esc(s.background)}" alt="">`:''}</div><header class="slide-head"><div class="eyebrow"><span class="lab-id">${s.id}</span><span>${names[s.track]} / ${esc(s.kind)}</span></div><h1>${esc(s.title)}</h1><p class="objective"><strong>Objective</strong> &nbsp;${esc(s.objective)}</p></header><div class="lesson-body"><section class="teaching-copy"><h2>${practice?'What to do':'Understand the idea'}</h2>${teaching}</section><section class="worked-example"><h2>${practice?'Example / what to check':'Concrete example'}</h2><p>${esc(s.example)}</p></section></div><section class="mechanism" aria-label="Concept diagram"><h2 class="panel-label">${s.kind==='theory'&&['AI-01','AI-02','AI-09'].includes(s.id)?'Related components':'Follow the mechanism'}</h2>${window.labDiagram(s,true)}</section><div class="evidence-row"><section class="evidence"><h2>${s.kind==='theory'?'Learning outcomes':'Evidence / completion'}</h2><p>${esc(s.evidence)}</p></section><section class="takeaway"><h2>Takeaway</h2><p>${esc(s.takeaway)}</p></section></div><footer class="slide-foot"><span>robotos · ${s.id} · AI coding workshop</span><span><a href="${esc(s.source)}" target="_blank" rel="noopener">Practice source ↗</a> &nbsp; <a href="${esc(s.prompt)}" target="_blank" rel="noopener">Theory / reference ↗</a></span></footer></article>`;
  }
  function render(){
    const list=filtered();
    $('#slide-host').innerHTML=slideHTML(current);
    const i=list.indexOf(current);
    $('#position').textContent=`${i+1} / ${list.length}`;
    $('#previous').disabled=i===0;$('#next').disabled=i===list.length-1;
    $('#track-name').textContent=names[current.track];
    document.title=`${current.id} · ${current.title} · robotos`;
    $('#notes-body').innerHTML=`<p><strong>${esc(current.id)} · ${esc(current.title)}</strong></p><p>Workshop source material; examples are not live test results. Vendor-specific formats are a source snapshot (2026-11-04); consult the cheat sheet and current official docs before teaching.</p><p><a href="${esc(current.source)}" target="_blank" rel="noopener">Practice source</a><a href="${esc(current.prompt)}" target="_blank" rel="noopener">Theory / reference</a></p><h3>Graph and prerequisites</h3><p>${esc(current.prerequisites)}</p><h3>Mechanism</h3><p>${esc(current.mechanism)}</p>${current.notes.filter(n=>n.text).map(n=>`<h3>${esc(n.title)}</h3><pre>${esc(n.text)}</pre>`).join('')}`;
    const c=colors[current.track];
    const reading=$('#student-reading');
    Object.entries(c).forEach(([k,v])=>reading.style.setProperty('--'+k,v));
    reading.innerHTML=`<header><span class="reading-kicker">Student reading · ${esc(current.id)}</span><h2>${esc(current.title)}</h2><p>Read this alongside the slide, then open the linked lab for the complete procedure.</p></header><div class="reading-columns"><section><h3>Explanation</h3>${current.reading.map(t=>`<p>${esc(t)}</p>`).join('')}<h3>Worked example</h3><p>${esc(current.example)}</p><h3>Practice steps</h3><ol>${current.steps.map(t=>`<li>${esc(t)}</li>`).join('')}</ol></section><section class="reading-diagram"><h3>Full mechanism</h3>${window.labDiagram(current)}<h3>Completion evidence</h3><p>${esc(current.evidence)}</p><p><a href="${esc(current.source)}" target="_blank" rel="noopener">Read the full lab ↗</a> · <a href="${esc(current.prompt)}" target="_blank" rel="noopener">Read the theory / reference ↗</a></p></section></div>`;
    renderOutline();
  }
  function renderOutline(){const term=$('#search').value.toLowerCase();const list=filtered().filter(s=>(s.id+' '+s.title+' '+s.diagramBrief+' '+s.reading.join(' ')+' '+s.example).toLowerCase().includes(term));$('#lab-list').innerHTML=list.length?list.map(s=>`<a href="#${s.slug}" ${s===current?'aria-current="true"':''}><small>${s.id}</small> ${esc(s.title)} <span class="kind">${esc(s.kind)}</span></a>`).join(''):'<p>No matching labs.</p>';}
  function go(slide){if(!slide)return;current=slide;history.replaceState(null,'','#'+slide.slug);render();}
  function step(n){const list=filtered();go(list[list.indexOf(current)+n]);}
  function toggle(panel,button,force){const el=$(panel);el.hidden=force===undefined?!el.hidden:!force;$(button).setAttribute('aria-expanded',String(!el.hidden));if(panel==='#outline'&&!el.hidden)$('#search').focus();}
  $('#next').onclick=()=>step(1);$('#previous').onclick=()=>step(-1);
  document.querySelectorAll('[data-track]').forEach(b=>{if(b.tagName!=='BUTTON')return;b.onclick=()=>{track=b.dataset.track;document.querySelectorAll('.tracks button').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));if(!filtered().includes(current))go(filtered()[0]);else render();};});
  $('#outline-toggle').onclick=()=>toggle('#outline','#outline-toggle');
  $('#notes-toggle').onclick=()=>toggle('#notes','#notes-toggle');
  $('#notes-close').onclick=()=>{toggle('#notes','#notes-toggle',false);$('#notes-toggle').focus();};
  $('#search').oninput=renderOutline;
  $('#lab-list').onclick=e=>{const link=e.target.closest('a');if(!link)return;e.preventDefault();go(slides.find(s=>s.slug===link.hash.slice(1)));toggle('#outline','#outline-toggle',false);$('#outline-toggle').focus();};
  window.onhashchange=()=>{const s=slides.find(x=>x.slug===location.hash.slice(1));if(s){if(track!=='all'&&track!==s.track){track='all';document.querySelectorAll('.tracks button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.track==='all')));}go(s);}};
  async function fullscreen(){try{if(document.fullscreenElement)await document.exitFullscreen();else await document.body.requestFullscreen();}catch{toggle('#notes','#notes-toggle',true);}}
  $('#fullscreen').onclick=fullscreen;
  document.addEventListener('keydown',e=>{if(e.target.closest('input,textarea,select')&&e.key!=='Escape')return;if(e.key===' '&&e.target.closest('button,a'))return;if(e.ctrlKey||e.metaKey||e.altKey)return;switch(e.key){case 'ArrowRight':case 'PageDown':case ' ':e.preventDefault();step(1);break;case 'ArrowLeft':case 'PageUp':e.preventDefault();step(-1);break;case 'Home':e.preventDefault();go(filtered()[0]);break;case 'End':e.preventDefault();go(filtered().at(-1));break;case 'n':case 'N':toggle('#notes','#notes-toggle');break;case 'f':case 'F':fullscreen();break;case 'Escape':toggle('#outline','#outline-toggle',false);toggle('#notes','#notes-toggle',false);break;}});
  $('#export-svg').onclick=()=>{const holder=document.createElement('div');holder.innerHTML=window.labDiagram(current);const svg=holder.firstElementChild;const c=colors[current.track];let xml=new XMLSerializer().serializeToString(svg);for(const [key,value] of Object.entries(c))xml=xml.replaceAll(`var(--${key})`,value);xml=xml.replace(/<defs>/,`<rect width="1280" height="360" fill="${c.base}"/><defs>`);const url=URL.createObjectURL(new Blob([xml],{type:'image/svg+xml'}));const a=document.createElement('a');a.href=url;a.download=current.slug+'.svg';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);};
  function preparePrint(){document.querySelector('.print-only')?.remove();const deck=document.createElement('div');deck.className='print-only';deck.innerHTML=filtered().map(slideHTML).join('');$('#main').append(deck);}
  window.addEventListener('beforeprint',preparePrint);
  window.addEventListener('afterprint',()=>document.querySelector('.print-only')?.remove());
  $('#print').onclick=()=>{preparePrint();window.print();};
  render();
})();
