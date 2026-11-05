(() => {
  'use strict';
  const slides=window.LAB_SLIDES;
  const names={mw:'Middleware · Signal Lab',wh:'Warehouse · Industrial Ice',hw:'Hardware · Dark Sci-fi'};
  const colors={mw:{base:'#090b10',panel:'#151922',accent:'#f4d35e',flow:'#668cff',text:'#f4f6fa',muted:'#b6bfce'},wh:{base:'#101418',panel:'#192027',accent:'#e6a06b',flow:'#8cc8e8',text:'#f4f6f8',muted:'#b5bec7'},hw:{base:'#080c0b',panel:'#111a17',accent:'#ff9a5c',flow:'#8de8b5',text:'#f3f8f5',muted:'#b8c9bf'}};
  const $=s=>document.querySelector(s);
  const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  let track='all',current=slides.find(s=>s.slug===location.hash.slice(1))||slides[0];
  const filtered=()=>slides.filter(s=>track==='all'||s.track===track);
  function slideHTML(s){return `<article class="slide" data-slide="${s.slug}" data-track="${s.track}" aria-label="${esc(s.id+' '+s.title)}"><div class="backdrop" aria-hidden="true">${s.background?`<img src="${esc(s.background)}" alt="">`:''}</div><header class="slide-head"><div class="eyebrow"><span class="lab-id">${s.id}</span><span>${names[s.track]}</span></div><h1>${esc(s.title)}</h1><p class="objective"><strong>Objective</strong> &nbsp;${esc(s.objective)}</p></header><div class="lesson-body"><section class="teaching-copy"><h2>Understand the lab</h2>${s.reading.map(t=>`<p>${esc(t)}</p>`).join('')}</section><section class="worked-example"><h2>Try and observe</h2><ol>${s.steps.map(t=>`<li>${esc(t)}</li>`).join('')}</ol><h2>Concrete example</h2><p>${esc(s.example)}</p></section></div><section class="mechanism" aria-label="Practice sequence"><h2 class="panel-label">Practice sequence · full mechanism in student reading</h2>${window.labDiagram(s,true)}</section><div class="evidence-row"><section class="evidence"><h2>Expected evidence</h2><p>${esc(s.evidence)}</p></section><section class="takeaway"><h2>Takeaway</h2><p>${esc(s.takeaway)}</p></section></div><footer class="slide-foot"><span>robotos · ${s.id} · Illustrative overview</span><span><a href="${esc(s.source)}" target="_blank" rel="noopener">Lab source ↗</a> &nbsp; <a href="${esc(s.prompt)}" target="_blank" rel="noopener">Prompt ↗</a></span></footer></article>`;}

  function render(){
    const list=filtered();
    $('#slide-host').innerHTML=slideHTML(current);
    const i=list.indexOf(current);
    $('#position').textContent=`${i+1} / ${list.length}`;
    $('#previous').disabled=i===0;$('#next').disabled=i===list.length-1;
    $('#track-name').textContent=names[current.track];
    document.title=`${current.id} · ${current.title} · robotos`;
    $('#notes-body').innerHTML=`<p><strong>${esc(current.id)} · ${esc(current.title)}</strong></p><p>Source-based expected behavior; this presentation does not claim a live test.</p><p><a href="${esc(current.source)}" target="_blank" rel="noopener">Student lab</a><a href="${esc(current.prompt)}" target="_blank" rel="noopener">Full prompt</a></p><h3>Graph and prerequisites</h3><p>${esc(current.prerequisites)}</p><h3>Mechanism</h3><p>${esc(current.mechanism)}</p>${current.notes.filter(n=>n.text).map(n=>`<h3>${esc(n.title)}</h3><pre>${esc(n.text)}</pre>`).join('')}`;
    const reading=$('#student-reading');
    Object.entries(colors[current.track]).forEach(([k,v])=>reading.style.setProperty('--'+k,v));
    reading.innerHTML=`<header><span class="reading-kicker">Student reading · ${esc(current.id)}</span><h2>${esc(current.title)}</h2><p>Study the explanation, then follow the lab procedure for your operating system.</p></header><div class="reading-columns"><section><h3>How it works</h3>${current.reading.map(t=>`<p>${esc(t)}</p>`).join('')}<h3>Concrete example</h3><p>${esc(current.example)}</p><h3>Practice steps</h3><ol>${current.steps.map(t=>`<li>${esc(t)}</li>`).join('')}</ol></section><section class="reading-diagram"><h3>Expected evidence</h3><p>${esc(current.evidence)}</p><h3>Before you run</h3><p>${esc(current.prerequisites)}</p></section></div><section class="full-mechanism"><h3>Full mechanism · SVG diagram</h3>${window.labDiagram(current)}</section><details class="procedure" open><summary>Run procedure · choose Windows or macOS</summary><p>Start in the workshop root. Follow terminal roles, keep blocking processes open as directed, and use one OS section at a time.</p><pre>${esc(current.procedure)}</pre></details><section class="cleanup"><h3>Finish and leave a known state</h3><p>${esc(current.cleanup)}</p></section><p class="source-links"><a href="${esc(current.source)}" target="_blank" rel="noopener">Complete lab sheet ↗</a> · <a href="${esc(current.prompt)}" target="_blank" rel="noopener">Source prompt ↗</a></p>`;
    renderOutline();
  }
  function renderOutline(){const term=$('#search').value.toLowerCase();const list=filtered().filter(s=>(s.id+' '+s.title+' '+s.diagramBrief+' '+s.reading.join(' ')+' '+s.example).toLowerCase().includes(term));$('#lab-list').innerHTML=list.length?list.map(s=>`<a href="#${s.slug}" ${s===current?'aria-current="true"':''}><small>${s.id}</small> ${esc(s.title)}</a>`).join(''):'<p>No matching labs.</p>';}
  function go(slide){if(!slide)return;current=slide;history.replaceState(null,'','#'+slide.slug);render();}
  function step(n){const list=filtered();go(list[list.indexOf(current)+n]);}
  function toggle(panel,button,force){const el=$(panel);el.hidden=force===undefined?!el.hidden:!force;$(button).setAttribute('aria-expanded',String(!el.hidden));if(panel==='#outline'&&!el.hidden)$('#search').focus();}
  $('#next').onclick=()=>step(1);$('#previous').onclick=()=>step(-1);
  document.querySelectorAll('[data-track]').forEach(b=>{if(b.tagName!=='BUTTON')return;b.onclick=()=>{track=b.dataset.track;document.querySelectorAll('.tracks button').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));if(!filtered().includes(current))go(filtered()[0]);else render();};});
  $('#outline-toggle').onclick=()=>toggle('#outline','#outline-toggle');
  $('#read').onclick=()=>$('#student-reading').scrollIntoView({block:'start'});
  $('#notes-toggle').onclick=()=>toggle('#notes','#notes-toggle');
  $('#notes-close').onclick=()=>{toggle('#notes','#notes-toggle',false);$('#notes-toggle').focus();};
  $('#search').oninput=renderOutline;
  $('#lab-list').onclick=e=>{const link=e.target.closest('a');if(!link)return;e.preventDefault();go(slides.find(s=>s.slug===link.hash.slice(1)));toggle('#outline','#outline-toggle',false);$('#outline-toggle').focus();};
  window.onhashchange=()=>{const s=slides.find(x=>x.slug===location.hash.slice(1));if(s){if(track!=='all'&&track!==s.track){track='all';document.querySelectorAll('.tracks button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.track==='all')));}go(s);}};
  async function fullscreen(){try{if(document.fullscreenElement)await document.exitFullscreen();else await document.body.requestFullscreen();}catch{toggle('#notes','#notes-toggle',true);}}
  $('#fullscreen').onclick=fullscreen;
  document.addEventListener('keydown',e=>{if(e.target.closest('input,textarea,select')&&e.key!=='Escape')return;if(e.key===' '&&e.target.closest('button,a'))return;if(e.ctrlKey||e.metaKey||e.altKey)return;switch(e.key){case 'ArrowRight':case 'PageDown':case ' ':e.preventDefault();step(1);break;case 'ArrowLeft':case 'PageUp':e.preventDefault();step(-1);break;case 'Home':e.preventDefault();go(filtered()[0]);break;case 'End':e.preventDefault();go(filtered().at(-1));break;case 'n':case 'N':toggle('#notes','#notes-toggle');break;case 'f':case 'F':fullscreen();break;case 'Escape':toggle('#outline','#outline-toggle',false);toggle('#notes','#notes-toggle',false);break;}});
  $('#export-svg').onclick=()=>{const holder=document.createElement('div');holder.innerHTML=window.labDiagram(current);const svg=holder.firstElementChild;const c=colors[current.track];let xml=new XMLSerializer().serializeToString(svg);for(const [key,value] of Object.entries(c))xml=xml.replaceAll(`var(--${key})`,value);xml=xml.replace(/<defs>/,`<rect width="1280" height="350" fill="${c.base}"/><defs>`);const url=URL.createObjectURL(new Blob([xml],{type:'image/svg+xml'}));const a=document.createElement('a');a.href=url;a.download=current.slug+'.svg';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);};
  function preparePrint(){document.querySelector('.print-only')?.remove();const deck=document.createElement('div');deck.className='print-only';deck.innerHTML=filtered().map(slideHTML).join('');$('#main').append(deck);}
  window.addEventListener('beforeprint',preparePrint);
  window.addEventListener('afterprint',()=>document.querySelector('.print-only')?.remove());
  $('#print').onclick=()=>{preparePrint();window.print();};
  render();
})();
