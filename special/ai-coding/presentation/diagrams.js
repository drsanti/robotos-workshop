/* Native, editable SVG. The diagrams illustrate the source; no starter is executed. */
(() => {
  const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c]));
  let serial=0,marker;
  const wrap=(s,max=30)=>{const words=s.split(' '),lines=[];let line='';for(const w of words){if((line+' '+w).trim().length>max&&line){lines.push(line);line=w;}else line=(line+' '+w).trim();}if(line)lines.push(line);return lines;};
  const text=(x,y,lines,size=20,color='var(--text)',anchor='middle')=>`<text x="${x}" y="${y}" fill="${color}" font-family="Inter,Segoe UI,sans-serif" font-size="${size}" text-anchor="${anchor}">${[].concat(lines).map((l,i)=>`<tspan x="${x}" dy="${i?25:0}">${esc(l)}</tspan>`).join('')}</text>`;
  const box=(x,y,w,h,title,detail,accent=false)=>`<g><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="var(--panel)" stroke="${accent?'var(--accent)':'var(--flow)'}" stroke-width="1.8"/>${text(x+w/2,y+38,title,22,accent?'var(--accent)':'var(--text)')}${text(x+w/2,y+74,wrap(detail,Math.floor(w/9)),18,'var(--muted)')}</g>`;
  const arrow=(x1,y1,x2,y2,accent=false,dashed=false)=>`<path d="M${x1} ${y1} L${x2} ${y2}" fill="none" stroke="${accent?'var(--accent)':'var(--flow)'}" stroke-width="2.5" ${dashed?'stroke-dasharray="8 7"':''} marker-end="url(#${marker}${accent?'a':'f'})"/>`;
  const note=s=>text(640,322,wrap(s,110),17,'var(--muted)');
  function flow(s){const parallel=s.kind==='theory'&&['AI-01','AI-02','AI-09'].includes(s.id);return s.flow.map((n,i)=>{const x=25+i*315;return text(x+145,55,parallel?'COMPONENT '+(i+1):'STEP '+(i+1),13,'var(--muted)')+box(x,85,285,145,n[0],n[1],i===3)+(i<3&&!parallel?arrow(x+285,157,x+315,157):'');}).join('')+note(parallel?'These are related components, not a mandatory execution order.':'Work in bounded steps; retain the evidence needed to check the result.');}
  function special(s){
    if(s.kind==='theory'&&s.id==='AI-06')return box(30,85,300,150,'Main agent','Assign a bounded review')+box(475,85,330,150,'lab-reviewer','Separate context · read-only tools')+box(950,85,300,150,'Verdict','PASS / FAIL + evidence')+arrow(330,160,475,160)+arrow(805,160,950,160)+note('The reviewer reports findings. Limited tools prevent it from silently editing the work.');
    if(s.kind==='theory'&&s.id==='AI-07')return box(10,70,270,150,'AI app / client','Select a typed tool')+box(345,70,290,150,'MCP server','topic_list · read_scan · drive')+box(700,70,240,150,'robotos graph','Twist out · scan in')+box(1010,70,260,150,'Native sim','Observed behavior')+arrow(280,145,345,145)+arrow(635,145,700,145)+arrow(940,145,1010,145)+`<path d="M1140 220 V267 H145 V220" fill="none" stroke="var(--accent)" stroke-width="2" stroke-dasharray="7 6" marker-end="url(#${marker}a)"/>`+text(640,294,'Tool results return to context · stdio stdout is the protocol channel',18,'var(--accent)');
    if(s.kind==='practice'&&s.id==='AI-07')return flow(s)+'';
    if(s.kind==='theory'&&s.id==='AI-08')return box(15,80,270,145,'Requested action','Model asks for a tool')+box(340,80,270,145,'Host policy','Allow / ask / deny')+box(665,80,270,145,'Pre-tool check','Permit or block')+box(990,80,270,145,'Tool + post-check','Result / check feedback')+arrow(285,150,340,150)+arrow(610,150,665,150)+arrow(935,150,990,150)+note('Enforcement depends on actual configuration coverage. Red-team alternate write paths.');
    if(s.kind==='theory'&&s.id==='AI-03')return box(30,45,350,110,'Shared instructions','Build / run / scope / gotchas')+box(30,195,350,110,'Local preferences','Keep personal context local')+box(520,100,300,140,'Loaded context','Inspect what the tool read')+box(960,100,290,140,'Observed behavior','Compare the same task')+`<path d="M380 100 H450 V145 H520 M380 250 H450 V190 H520" stroke="var(--flow)" fill="none" stroke-width="2"/>`+arrow(820,170,960,170)+note('Loading, precedence and imports are tool-specific; verify against the source tool and current docs.',338);
    return flow(s);
  }
  window.labDiagram=(s,compact=false)=>{
    marker='ai-arrow-'+(++serial);
    const parallel=s.kind==='theory'&&['AI-01','AI-02','AI-09'].includes(s.id);
    const body=compact?s.flow.map((n,i)=>box(25+i*315,5,285,105,n[0],n[1],i===3)+(i<3&&!parallel?arrow(310+i*315,57,340+i*315,57):'')).join(''):special(s);
    return `<svg class="diagram" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 ${compact?140:360}" role="img" aria-labelledby="${marker}-title ${marker}-desc"><title id="${marker}-title">${esc(s.id+' · '+s.title)}</title><desc id="${marker}-desc">${esc(s.diagramBrief)}</desc><defs>${['a','f'].map(c=>`<marker id="${marker+c}" markerWidth="9" markerHeight="9" refX="8" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8Z" fill="${c==='a'?'var(--accent)':'var(--flow)'}"/></marker>`).join('')}</defs>${body}</svg>`;
  };
})();
