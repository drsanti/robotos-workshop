(() => {
  'use strict';
  const slides=window.LAB_SLIDES;
  const i18n=window.LAB_I18N;
  const ui=key=>i18n.text(key);
  const names=()=>({mw:ui('trackMw'),wh:ui('trackWh'),hw:ui('trackHw')});
  const colors={mw:{base:'#090b10',panel:'#151922',accent:'#f4d35e',flow:'#668cff',text:'#f4f6fa',muted:'#b6bfce'},wh:{base:'#101418',panel:'#192027',accent:'#e6a06b',flow:'#8cc8e8',text:'#f4f6f8',muted:'#b5bec7'},hw:{base:'#080c0b',panel:'#111a17',accent:'#ff9a5c',flow:'#8de8b5',text:'#f3f8f5',muted:'#b8c9bf'}};
  const $=s=>document.querySelector(s);
  const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  let track='all',current=slides.find(s=>s.slug===location.hash.slice(1))||slides[0];
  const filtered=()=>slides.filter(s=>track==='all'||s.track===track);
  function slideHTML(raw){const s=i18n.view(raw);return `<article class="slide" data-slide="${s.slug}" data-track="${s.track}" aria-label="${esc(s.id+' '+s.title)}"><div class="backdrop" aria-hidden="true">${s.background?`<img src="${esc(s.background)}" alt="">`:''}</div><header class="slide-head"><div class="eyebrow"><span class="lab-id">${s.id}</span><span>${names()[s.track]}</span></div><h1>${esc(s.title)}</h1><p class="objective"><strong>${ui('objective')}</strong> &nbsp;${esc(s.objective)}</p></header><div class="lesson-body"><section class="teaching-copy"><h2>${ui('understand')}</h2>${s.reading.map(t=>`<p>${esc(t)}</p>`).join('')}</section><section class="worked-example"><h2>${ui('tryObserve')}</h2><ol>${s.steps.map(t=>`<li>${esc(t)}</li>`).join('')}</ol><h2>${ui('exampleHeading')}</h2><p>${esc(s.example)}</p></section></div><section class="mechanism" aria-label="${esc(ui('practiceSequence'))}"><h2 class="panel-label">${ui('practiceSequence')}</h2>${window.labDiagram(s,true)}</section><div class="evidence-row"><section class="evidence"><h2>${ui('evidence')}</h2><p>${esc(s.evidence)}</p></section><section class="takeaway"><h2>${ui('takeaway')}</h2><p>${esc(s.takeaway)}</p></section></div><footer class="slide-foot"><span>robotos · ${s.id} · ${ui('illustrative')}</span></footer></article>`;}

  function render(){
    const list=filtered();
    $('#slide-host').innerHTML=slideHTML(current);
    const i=list.indexOf(current);
    $('#position').textContent=`${i+1} / ${list.length}`;
    $('#previous').disabled=i===0;$('#next').disabled=i===list.length-1;
    const s=i18n.view(current);
    $('#track-name').textContent=names()[current.track];
    document.title=`${s.id} · ${s.title} · robotos`;
    $('#notes-body').innerHTML=`<p><strong>${esc(s.id)} · ${esc(s.title)}</strong></p><p>${ui('notesDisclaimer')}</p><p><a href="${esc(current.source)}" target="_blank" rel="noopener">${ui('studentLab')}</a><a href="${esc(current.prompt)}" target="_blank" rel="noopener">${ui('fullPrompt')}</a></p><h3>${ui('graphPrereq')}</h3><p>${esc(s.prerequisites)}</p><h3>${ui('mechanism')}</h3><p>${esc(current.mechanism)}</p>${current.notes.filter(n=>n.text).map(n=>`<h3>${esc(n.title)}</h3><pre>${esc(n.text)}</pre>`).join('')}`;
    const reading=$('#student-reading');
    Object.entries(colors[current.track]).forEach(([k,v])=>reading.style.setProperty('--'+k,v));
    reading.innerHTML=`<header><span class="reading-kicker">${ui('studentReading')} · ${esc(s.id)}</span><h2>${esc(s.title)}</h2><p>${ui('studyLead')}</p></header><div class="reading-columns"><section><h3>${ui('howItWorks')}</h3>${s.reading.map(t=>`<p>${esc(t)}</p>`).join('')}<h3>${ui('exampleHeading')}</h3><p>${esc(s.example)}</p><h3>${ui('practiceSteps')}</h3><ol>${s.steps.map(t=>`<li>${esc(t)}</li>`).join('')}</ol></section><section class="reading-diagram"><h3>${ui('evidence')}</h3><p>${esc(s.evidence)}</p><h3>${ui('beforeYouRun')}</h3><p>${esc(s.prerequisites)}</p></section></div><section class="full-mechanism"><h3>${ui('fullMechanism')}</h3>${window.labDiagram(s)}</section><details class="procedure" open><summary>${ui('runProcedure')}</summary><p>${ui('procedureLead')}</p><pre>${esc(s.procedure)}</pre></details><section class="cleanup"><h3>${ui('finishKnown')}</h3><p>${esc(s.cleanup)}</p></section><p class="source-links"><a href="${esc(current.source)}" target="_blank" rel="noopener">${ui('completeSheet')} ↗</a> · <a href="${esc(current.prompt)}" target="_blank" rel="noopener">${ui('sourcePrompt')} ↗</a></p>`;
    renderOutline();
  }
  function renderOutline(){const term=$('#search').value.toLowerCase();const list=filtered().filter(s=>{const v=i18n.view(s);return (s.id+' '+s.title+' '+v.title+' '+s.diagramBrief+' '+s.reading.join(' ')+' '+v.reading.join(' ')+' '+s.example+' '+v.example).toLowerCase().includes(term);});$('#lab-list').innerHTML=list.length?list.map(s=>`<a href="#${s.slug}" ${s===current?'aria-current="true"':''}><small>${s.id}</small> ${esc(i18n.view(s).title)}</a>`).join(''):`<p>${ui('noMatch')}</p>`;}
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
  function setLang(lang){
    window.LAB_LANG=lang==='th'?'th':'en';
    try{localStorage.setItem('robotos-lab-lang',window.LAB_LANG);}catch{}
    applyChrome();
    render();
  }
  function toggleLang(){setLang(window.LAB_LANG==='th'?'en':'th');}
  document.addEventListener('keydown',e=>{if(e.target.closest('input,textarea,select')&&e.key!=='Escape')return;if(e.key===' '&&e.target.closest('button,a'))return;if(e.ctrlKey||e.metaKey||e.altKey)return;switch(e.key){case 'ArrowRight':case 'PageDown':case ' ':e.preventDefault();step(1);break;case 'ArrowLeft':case 'PageUp':e.preventDefault();step(-1);break;case 'Home':e.preventDefault();go(filtered()[0]);break;case 'End':e.preventDefault();go(filtered().at(-1));break;case 'n':case 'N':toggle('#notes','#notes-toggle');break;case 'f':case 'F':fullscreen();break;case 'l':case 'L':e.preventDefault();toggleLang();break;case 'Escape':toggle('#outline','#outline-toggle',false);toggle('#notes','#notes-toggle',false);$('#pointer-panel').hidden=true;$('#pointer-toggle').setAttribute('aria-expanded','false');break;}});
  $('#export-svg').onclick=()=>{const holder=document.createElement('div');holder.innerHTML=window.labDiagram(i18n.view(current));const svg=holder.firstElementChild;const c=colors[current.track];let xml=new XMLSerializer().serializeToString(svg);for(const [key,value] of Object.entries(c))xml=xml.replaceAll(`var(--${key})`,value);xml=xml.replace(/<defs>/,`<rect width="1280" height="350" fill="${c.base}"/><defs>`);const url=URL.createObjectURL(new Blob([xml],{type:'image/svg+xml'}));const a=document.createElement('a');a.href=url;a.download=current.slug+'.svg';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);};
  function preparePrint(){document.querySelector('.print-only')?.remove();const deck=document.createElement('div');deck.className='print-only';deck.innerHTML=filtered().map(slideHTML).join('');$('#main').append(deck);}
  window.addEventListener('beforeprint',preparePrint);
  window.addEventListener('afterprint',()=>document.querySelector('.print-only')?.remove());
  $('#print').onclick=()=>{preparePrint();window.print();};
  function applyChrome(){
    document.documentElement.lang=window.LAB_LANG==='th'?'th':'en';
    const label=(sel,text,kbd)=>{const el=$(sel);el.innerHTML=kbd?`${text} <kbd>${kbd}</kbd>`:text;};
    document.querySelector('[data-track=all]').innerHTML=`${ui('all')} <small>24</small>`;
    label('#read',ui('read'));
    label('#outline-toggle',ui('labs'));
    label('#notes-toggle',ui('notes'),'N');
    label('#fullscreen',ui('present'),'F');
    label('#export-svg',ui('exportSvg'));
    label('#print',ui('printDeck'));
    $('#outline label').textContent=ui('findLab');
    $('#search').placeholder=ui('searchPlaceholder');
    $('#previous').setAttribute('aria-label',ui('previous'));
    $('#next').setAttribute('aria-label',ui('next'));
    $('#notes h2').textContent=ui('presenterNotes');
    $('#notes-close').setAttribute('aria-label',ui('closeNotes'));
    $('.shortcuts').innerHTML=ui('shortcuts');
    const langBtn=$('#lang-toggle');
    const langCode=window.LAB_LANG==='th'?'TH':'EN';
    langBtn.innerHTML=`${langCode} <kbd>L</kbd>`;
    langBtn.setAttribute('aria-label',`${ui('language')} ${langCode} (${ui('languageSwitch')})`);
    langBtn.title=`${ui('language')} (L)`;
    $('#pointer-toggle').firstChild && ($('#pointer-toggle').textContent=ui('pointer'));
    $('#pointer-title').textContent=ui('pointer');
    $('#pointer-color-name').textContent=ui('pointerColor');
    $('#pointer-size-name').textContent=ui('pointerSize');
    $('#pointer-length-name').textContent=ui('pointerLength');
    $('#pointer-life-name').textContent=ui('pointerLife');
    document.querySelector('[data-comet=track]').textContent=ui('pointerTrack');
    syncCometControls();
  }
  const comet=loadComet();
  function loadComet(){
    const fallback={mode:'track',color:'#8cc8e8',size:1,length:36,life:340};
    try{
      const saved=JSON.parse(localStorage.getItem('robotos-comet')||'null');
      if(!saved||typeof saved!=='object')return fallback;
      const color=/^#[0-9a-fA-F]{6}$/.test(saved.color)?saved.color:fallback.color;
      const num=(v,lo,hi,d)=>Number.isFinite(+v)?Math.min(hi,Math.max(lo,+v)):d;
      return {mode:saved.mode==='custom'?'custom':'track',color,size:num(saved.size,.5,2.5,1),length:Math.round(num(saved.length,6,90,36)),life:Math.round(num(saved.life,80,1600,340))};
    }catch{return fallback;}
  }
  function saveComet(){try{localStorage.setItem('robotos-comet',JSON.stringify(comet));}catch{}}
  function syncCometControls(){
    $('#comet-size').value=comet.size;$('#comet-size-val').textContent=comet.size.toFixed(1)+'×';
    $('#comet-length').value=comet.length;$('#comet-length-val').textContent=String(comet.length);
    $('#comet-life').value=comet.life;$('#comet-life-val').textContent=(comet.life/1000).toFixed(2)+' s';
    $('#comet-color').value=comet.color;
    document.querySelectorAll('[data-comet]').forEach(b=>{
      const on=b.dataset.comet==='track'?comet.mode==='track':comet.mode==='custom'&&b.dataset.comet.toLowerCase()===comet.color.toLowerCase();
      b.setAttribute('aria-pressed',String(on));
    });
  }
  function setComet(patch){Object.assign(comet,patch);saveComet();syncCometControls();}
  $('#pointer-toggle').onclick=()=>{const open=$('#pointer-panel').hidden;$('#pointer-panel').hidden=!open;$('#pointer-toggle').setAttribute('aria-expanded',String(open));};
  document.querySelectorAll('[data-comet]').forEach(b=>b.onclick=()=>{if(b.dataset.comet==='track')setComet({mode:'track'});else setComet({mode:'custom',color:b.dataset.comet});});
  $('#comet-color').oninput=()=>setComet({mode:'custom',color:$('#comet-color').value});
  $('#comet-size').oninput=()=>setComet({size:+$('#comet-size').value});
  $('#comet-length').oninput=()=>setComet({length:+$('#comet-length').value});
  $('#comet-life').oninput=()=>setComet({life:+$('#comet-life').value});
  $('#lang-toggle').onclick=()=>toggleLang();
  applyChrome();
  startComet();
  render();

  function startComet(){
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const canvas=$('#comet');
    const ctx=canvas.getContext('2d');
    const trail=[];
    let head=null;
    let dpr=1;
    function resize(){
      dpr=Math.min(devicePixelRatio||1,2);
      canvas.width=Math.floor(innerWidth*dpr);
      canvas.height=Math.floor(innerHeight*dpr);
    }
    resize();
    addEventListener('resize',resize);
    document.documentElement.classList.add('comet');
    addEventListener('pointermove',e=>{
      if(e.pointerType==='touch')return;
      const now=performance.now();
      const point={x:e.clientX,y:e.clientY,t:now};
      head=point;
      const prev=trail.at(-1);
      if(!prev||Math.hypot(point.x-prev.x,point.y-prev.y)>=2.5)trail.push(point);
    });
    document.documentElement.addEventListener('pointerleave',e=>{
      if(e.pointerType==='touch')return;
      head=null;
    });
    function tailColor(){
      if(comet.mode==='custom')return comet.color;
      const slide=document.querySelector('.slide');
      const flow=slide&&getComputedStyle(slide).getPropertyValue('--flow').trim();
      return flow||'#8cc8e8';
    }
    function frame(now){
      const life=comet.life;
      const scale=comet.size;
      while(trail.length&&now-trail[0].t>life)trail.shift();
      if(trail.length>comet.length)trail.splice(0,trail.length-comet.length);
      const pts=head&&trail.at(-1)!==head?trail.concat(head):trail;
      ctx.setTransform(dpr,0,0,dpr,0,0);
      ctx.clearRect(0,0,innerWidth,innerHeight);
      if(pts.length||head){
        const color=tailColor();
        ctx.lineCap='round';
        ctx.lineJoin='round';
        ctx.globalCompositeOperation='lighter';
        for(let i=1;i<pts.length;i++){
          const t=i/(pts.length-1||1);
          const age=1-(now-pts[i].t)/life;
          ctx.globalAlpha=Math.max(0,age)*(0.08+0.55*t*t);
          ctx.strokeStyle=color;
          ctx.lineWidth=(1+t*t*11)*scale;
          ctx.beginPath();
          ctx.moveTo(pts[i-1].x,pts[i-1].y);
          ctx.lineTo(pts[i].x,pts[i].y);
          ctx.stroke();
        }
        if(!head){ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over';requestAnimationFrame(frame);return;}
        const {x,y}=head;
        const glow=ctx.createRadialGradient(x,y,0,x,y,18*scale);
        glow.addColorStop(0,'#ffffff');
        glow.addColorStop(0.22,color);
        glow.addColorStop(1,'transparent');
        ctx.globalAlpha=.9;
        ctx.fillStyle=glow;
        ctx.beginPath();
        ctx.arc(x,y,18*scale,0,Math.PI*2);
        ctx.fill();
        ctx.globalCompositeOperation='source-over';
        ctx.globalAlpha=1;
        ctx.fillStyle='#ffffff';
        ctx.beginPath();
        ctx.arc(x,y,2.6*scale,0,Math.PI*2);
        ctx.fill();
      }
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }
})();
