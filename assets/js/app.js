(() => {
  const routes = ['home','explore','needs','results','catalog','detail','process'];
  const needsSelected = new Set();
  const stringList = value => Array.isArray(value) && value.every(item => typeof item === 'string');
  const catalogItems = (Array.isArray(window.CATALOG) ? window.CATALOG : []).filter(item => item &&
    ['id','name','category','shortDescription','fullDescription'].every(key => typeof item[key] === 'string' && item[key].trim()) &&
    ['idealFor','needs','capabilities','outputs','caseIds'].every(key => stringList(item[key])));
  const needOptions = (Array.isArray(window.NEEDS) ? window.NEEDS : []).filter(item => item && typeof item.id === 'string' && item.id.trim() && typeof item.label === 'string' && item.label.trim());
  const processSteps = (Array.isArray(window.PROCESS) ? window.PROCESS : []).filter(step => Array.isArray(step) && step.length >= 2 && step.slice(0,2).every(value => typeof value === 'string' && value.trim()));
  let activeCategory = 'Todas';
  let activeSolution = null;
  let previousFocus = null;
  let lastScreen = null;
  let lastRenderedHash = null;
  let hasRendered = false;
  const get = selector => document.querySelector(selector);
  const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const fromRoute = () => {
    const raw = location.hash.replace(/^#\/?/, '') || 'home';
    const [path, query=''] = raw.split('?');
    const [route, ...parts] = path.split('/');
    const params = new URLSearchParams(query);
    return {route:routes.includes(route)||route==='solution'?route:'home', id:route==='solution'?parts[0]:null, params};
  };
  function restoreNeedsFromRoute(){
    const {route,params}=fromRoute();
    if(!['needs','results'].includes(route)||!params.has('ids'))return;
    needsSelected.clear();params.get('ids').split(',').filter(Boolean).forEach(id=>{if(needOptions.some(n=>n.id===id))needsSelected.add(id);});
  }
  const needsHash = route => {
    const ids = [...needsSelected];
    return `#/${route}${ids.length && ['needs','results'].includes(route) ? `?ids=${encodeURIComponent(ids.join(','))}` : ''}`;
  };
  function navigate(route, {replace=false, id=null, preserveNeeds=true}={}) {
    if (!preserveNeeds && ['needs','results'].includes(route)) needsSelected.clear();
    const hash = route === 'solution' ? `#/solution/${encodeURIComponent(id)}` : needsHash(route);
    if (location.hash !== hash) history[replace?'replaceState':'pushState']({ldxRoute:route,id,previousRoute:replace?null:fromRoute().route},'',hash);
    renderRoute();
  }
  function list(items){return items.map(item=>`<li>${esc(item)}</li>`).join('');}
  function card(item,index){return `<button class="solution-card" type="button" data-solution="${esc(item.id)}" aria-label="Ver detalhes de ${esc(item.name)}"><span class="card-meta"><span>${esc(item.category)}</span><i>${String(index+1).padStart(2,'0')}</i></span><strong>${esc(item.name)}</strong><span class="card-description">${esc(item.shortDescription)}</span><span class="card-capabilities">${item.capabilities.slice(0,2).map(x=>`<i>${esc(x)}</i>`).join('')}</span><span class="card-open">Ver solução <b aria-hidden="true">↗</b></span></button>`;}
  function renderNeeds(){
    get('#need-grid').innerHTML=needOptions.map(need=>`<button class="need-option${needsSelected.has(need.id)?' is-selected':''}" type="button" data-need="${esc(need.id)}" aria-pressed="${needsSelected.has(need.id)}"><span class="need-check" aria-hidden="true">${needsSelected.has(need.id)?'✓':'+'}</span><span>${esc(need.label)}</span></button>`).join('');
    const n=needsSelected.size;get('#selection-count').textContent=n?`${n} ${n===1?'necessidade selecionada':'necessidades selecionadas'}`:'Nenhuma necessidade selecionada';get('#show-results').disabled=!n;
    if(fromRoute().route==='needs'&&history.state?.ldxRoute==='needs')history.replaceState({...history.state,selectedNeeds:[...needsSelected]},'',needsHash('needs'));
  }
  function renderResults(){
    const needs=needOptions.filter(n=>needsSelected.has(n.id));
    if(!needs.length){navigate('needs',{replace:true});return;}
    const items=catalogItems.filter(item=>item.needs.some(id=>needsSelected.has(id)));
    get('#selected-summary').innerHTML=needs.map(n=>`<span>${esc(n.label)}</span>`).join('');
    get('#results-count').textContent=`${items.length} ${items.length===1?'solução':'soluções'}`;
    get('#empty-state').hidden=items.length>0;
    get('#results-grid').innerHTML=items.map(card).join('');
  }
  function renderCatalog(){
    const categories=['Todas',...new Set(catalogItems.map(item=>item.category))];
    get('#category-filters').innerHTML=categories.map(category=>`<button type="button" class="category-filter${activeCategory===category?' is-active':''}" data-category="${esc(category)}" aria-pressed="${activeCategory===category}">${esc(category)}</button>`).join('');
    const items=activeCategory==='Todas'?catalogItems:catalogItems.filter(item=>item.category===activeCategory);
    get('#screen-catalog .screen-intro').textContent=`${catalogItems.length} possibilidades para transformar aprendizagem e operação.`;
    get('#catalog-count').textContent=`${items.length} ${items.length===1?'solução':'soluções'}`;
    get('#catalog-empty').hidden=items.length>0;
    if(catalogItems.length===0)get('#catalog-empty h2').textContent='O catálogo não está disponível no momento.';
    get('#catalog-grid').innerHTML=items.map(card).join('');
  }
  function renderDetail(id){
    const item=catalogItems.find(x=>x.id===id);if(!item){navigate('catalog',{replace:true});return;}
    activeSolution=item.id;previousFocus=document.activeElement;
    const labels=item.needs.map(id=>needOptions.find(n=>n.id===id)?.label).filter(Boolean);
    get('#detail-screen').innerHTML=`<div class="detail-scroll"><header class="detail-heading"><p class="screen-kicker">${esc(item.category)} <span>· ${esc(item.id)}</span></p><h1 id="detail-title">${esc(item.name)}</h1><p class="detail-description">${esc(item.fullDescription)}</p></header><div class="detail-columns"><section><h2>Ideal para</h2><ul>${list(item.idealFor)}</ul></section><section><h2>Entregas possíveis</h2><ul>${list(item.outputs)}</ul></section><section><h2>Capacidades</h2><div class="detail-tags">${item.capabilities.map(x=>`<span>${esc(x)}</span>`).join('')}</div></section><section><h2>Necessidades atendidas</h2><div class="detail-tags">${labels.map(x=>`<span>${esc(x)}</span>`).join('')}</div></section></div><div class="case-slot"><span aria-hidden="true">＋</span><div><b>Cases relacionados</b><p>Histórias e experiências poderão aparecer aqui.</p></div><small>EM BREVE</small></div></div><div class="detail-bottom"><button class="button button-primary" type="button" data-action="back-detail">← Voltar às soluções</button></div>`;
  }
  function renderProcess(){get('#process-grid').innerHTML=processSteps.map((step,i)=>`<article class="process-step"><span class="step-number">${String(i+1).padStart(2,'0')} <i></i></span><div><h2>${esc(step[0])}</h2><p>${esc(step[1])}</p></div></article>`).join('');}
  function renderRoute(){
    const {route,id}=fromRoute();const wasDetail=!get('#screen-detail').hidden;const oldScreen=lastScreen;const screen=route==='solution'?'detail':route;
    document.querySelectorAll('[data-screen]').forEach(el=>{el.hidden=el.dataset.screen!==screen;el.classList.remove('screen-enter');});
    const current=get(`[data-screen="${screen}"]`);if(current){void current.offsetWidth;current.classList.add('screen-enter');current.scrollTop=0;}
    get('#back-button').hidden=route==='home';
    const pos=routes.indexOf(screen)+1;get('#screen-position').innerHTML=`${String(pos).padStart(2,'0')} <b>/</b> 07`;
    if(route==='needs')renderNeeds();if(route==='results')renderResults();if(route==='catalog')renderCatalog();if(route==='solution')renderDetail(id);if(route==='process')renderProcess();
    if(hasRendered&&oldScreen!==screen&&wasDetail&&screen!=='detail'){
      const restoredCard=activeSolution&&current?.querySelector(`[data-solution="${CSS.escape(activeSolution)}"]`);
      const focusTarget=previousFocus?.isConnected?previousFocus:restoredCard||get('#app-main');
      requestAnimationFrame(()=>requestAnimationFrame(()=>{if(focusTarget?.isConnected)focusTarget.focus({preventScroll:true});}));
      activeSolution=null;
    }
    else if(hasRendered&&oldScreen!==screen){const heading=current?.querySelector('h1');if(heading){heading.tabIndex=-1;heading.focus({preventScroll:true});}}
    lastScreen=screen;hasRendered=true;
    lastRenderedHash=location.hash;
    const announcement=get('#route-announcement');const heading=current?.querySelector('h1');if(announcement&&heading)announcement.textContent=heading.textContent.replace(/\s+/g,' ').trim();
    document.title=`${route==='home'?'Fábrica de Conteúdo · LDX Live':({explore:'Como explorar',needs:'Escolha por necessidade',results:'Soluções para seu desafio',catalog:'Catálogo de soluções',solution:activeSolution?'Detalhe da solução':'Solução',process:'Como trabalhamos'}[route])} · LDX Live`;
  }
  document.addEventListener('click',e=>{
    const routeLink=e.target.closest('a[href^="#/"]');
    if(routeLink){
      e.preventDefault();
      const hash=routeLink.getAttribute('href');
      const solution=hash.match(/^#\/solution\/([^?]+)/);
      navigate(solution?'solution':hash.slice(2).split(/[/?]/)[0],{id:solution?decodeURIComponent(solution[1]):null});
      return;
    }
    const need=e.target.closest('[data-need]');if(need){const id=need.dataset.need;needsSelected.has(id)?needsSelected.delete(id):needsSelected.add(id);renderNeeds();return;}
    const cat=e.target.closest('[data-category]');if(cat){activeCategory=cat.dataset.category;renderCatalog();return;}
    const cardButton=e.target.closest('[data-solution]');if(cardButton){navigate('solution',{id:cardButton.dataset.solution});return;}
    if(e.target.closest('#show-results')){navigate('results');return;}
    if(e.target.closest('#back-button')||e.target.closest('[data-action="back-detail"]')){
      if(history.state?.ldxRoute&&history.state?.previousRoute)history.back();
      else {const route=fromRoute().route;const fallback=route==='solution'?'catalog':route==='results'?'needs':'home';navigate(fallback);}
      return;
    }
    if(e.target.closest('#clear-category')){activeCategory='Todas';renderCatalog();}
  });
  const onHistoryNavigation=()=>{if(location.hash===lastRenderedHash)return;restoreNeedsFromRoute();renderRoute();};
  window.addEventListener('hashchange',onHistoryNavigation);window.addEventListener('popstate',onHistoryNavigation);
  window.addEventListener('keydown',e=>{if(e.key==='Escape'&&activeSolution){if(history.state&&history.length>1)history.back();else navigate('catalog');}});
  restoreNeedsFromRoute();
  if(!history.state?.ldxRoute)history.replaceState({...history.state,ldxRoute:fromRoute().route,previousRoute:null},'',location.hash||'#/home');
  renderRoute();
})();
