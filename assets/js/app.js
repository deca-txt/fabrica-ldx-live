(() => {
  const grid = document.querySelector('#solution-grid');
  const chips = document.querySelector('#need-chips');
  const count = document.querySelector('#solution-count');
  const resultsLabel = document.querySelector('#results-label');
  const empty = document.querySelector('#empty-state');
  const dialog = document.querySelector('#solution-dialog');
  const dialogContent = document.querySelector('#dialog-content');
  const selected = new Set();
  const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const list = values => values.map(value => `<li>${esc(value)}</li>`).join('');
  function renderChips() {
    chips.innerHTML = window.NEEDS.map(n => `<button class="need-chip${selected.has(n.id)?' selected':''}" type="button" data-need="${n.id}" aria-pressed="${selected.has(n.id)}">${esc(n.label)}<span aria-hidden="true">${selected.has(n.id)?'✓':'+'}</span></button>`).join('');
  }
  function renderCards() {
    const items = window.CATALOG.filter(item => !selected.size || item.needs.some(need => selected.has(need)));
    count.textContent = String(items.length).padStart(2,'0');
    resultsLabel.textContent = `${items.length} ${items.length === 1 ? 'solução' : 'soluções'}${selected.size ? ' encontradas' : ''}`;
    empty.hidden = items.length > 0;
    grid.innerHTML = items.map((item,index) => `<button class="solution-card" type="button" data-solution="${item.id}" aria-label="Ver detalhes de ${esc(item.name)}"><span class="card-top"><span class="card-category">${esc(item.category)}</span><span class="card-index">${String(index+1).padStart(2,'0')}</span></span><span class="card-title">${esc(item.name)}</span><span class="card-description">${esc(item.shortDescription)}</span><span class="card-tags">${item.capabilities.slice(0,3).map(x=>`<span>${esc(x)}</span>`).join('')}</span><span class="card-bottom"><span>Explorar solução</span><span class="card-arrow" aria-hidden="true">↗</span></span></button>`).join('');
  }
  function openDetail(id) {
    const item = window.CATALOG.find(x => x.id === id);
    if (!item) return;
    const needLabels = item.needs.map(id => window.NEEDS.find(n => n.id === id)?.label).filter(Boolean);
    dialogContent.innerHTML = `<div class="dialog-kicker">${esc(item.category)} <span>·</span> SOLUÇÃO ${esc(item.id)}</div><h2 id="dialog-title">${esc(item.name)}</h2><p class="dialog-description">${esc(item.fullDescription)}</p><div class="detail-columns"><section><h3>Ideal para</h3><ul>${list(item.idealFor)}</ul></section><section><h3>Entregas possíveis</h3><ul>${list(item.outputs)}</ul></section><section><h3>Capacidades</h3><div class="detail-tags">${item.capabilities.map(x=>`<span>${esc(x)}</span>`).join('')}</div></section><section><h3>Necessidades atendidas</h3><div class="detail-tags">${needLabels.map(x=>`<span>${esc(x)}</span>`).join('')}</div></section></div><div class="case-slot"><span>✳</span><div><b>Histórias que vêm por aí.</b><p>Cases relacionados poderão aparecer aqui.</p></div><small>CASE EM BREVE</small></div><button class="dialog-back" type="button">← Voltar ao catálogo</button>`;
    if (!dialog.open) dialog.showModal();
    history.replaceState(null,'',`#solucao-${encodeURIComponent(id)}`);
    dialog.querySelector('.dialog-back').addEventListener('click', closeDetail);
  }
  function closeDetail() { dialog.close(); history.replaceState(null,'','#catalogo'); }
  renderChips(); renderCards();
  chips.addEventListener('click', e => { const btn = e.target.closest('[data-need]'); if (!btn) return; const id=btn.dataset.need; selected.has(id)?selected.delete(id):selected.add(id); renderChips(); renderCards(); });
  document.querySelector('#clear-filters').addEventListener('click', () => { selected.clear(); renderChips(); renderCards(); });
  document.querySelector('#empty-clear').addEventListener('click', () => { selected.clear(); renderChips(); renderCards(); });
  grid.addEventListener('click', e => { const card=e.target.closest('[data-solution]'); if(card) openDetail(card.dataset.solution); });
  dialog.querySelector('.dialog-close').addEventListener('click',closeDetail);
  dialog.addEventListener('click',e=>{if(e.target===dialog)closeDetail();});
  dialog.addEventListener('close',()=>{if(location.hash.startsWith('#solucao-'))history.replaceState(null,'','#catalogo');});
  document.querySelectorAll('.view-tab').forEach(tab=>tab.addEventListener('click',()=>{document.querySelectorAll('.view-tab').forEach(x=>{x.classList.toggle('active',x===tab);x.setAttribute('aria-pressed',x===tab?'true':'false');}); if(tab.dataset.mode==='needs')document.querySelector('#necessidades').scrollIntoView({behavior:'smooth',block:'center'});else {selected.clear();renderChips();renderCards();}}));
  document.querySelector('#process-grid').innerHTML = window.PROCESS.map((step,i)=>`<article class="process-step"><span class="step-number">0${i+1}<i></i></span><h3>${esc(step[0])}</h3><p>${esc(step[1])}</p></article>`).join('');
  const menu=document.querySelector('.menu-toggle'), nav=document.querySelector('#main-nav');
  menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('nav-open',open);});
  nav.addEventListener('click',e=>{if(e.target.closest('a')){menu.setAttribute('aria-expanded','false');nav.classList.remove('nav-open');}});
  if(location.hash.startsWith('#solucao-')) {const id=decodeURIComponent(location.hash.slice('#solucao-'.length));openDetail(id);}
})();
