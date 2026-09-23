// Inactive deterministic contract mock. It does not call an AI service.
(() => {
  function recommend(needs, catalog) {
    const items = Array.isArray(catalog) ? catalog : [];
    const allowed = new Map(items.filter(item => item && typeof item.id === 'string').map(item => [item.id, item]));
    const requested = Array.isArray(needs) ? new Set(needs.filter(id => typeof id === 'string')) : new Set();
    const ids = items.filter(item => item && Array.isArray(item.needs) && item.needs.some(id => requested.has(id))).slice(0, 4);
    if (!ids.length) return { fallback: true, diagnosis: '', objective: '', recommended: [], journey: [], notes: 'Explore o catálogo de soluções.' };
    return { fallback: false, diagnosis: 'Sugestão demonstrativa baseada nas necessidades selecionadas.', objective: 'Explorar soluções relacionadas ao desafio.', recommended: ids.map(item => ({ id: item.id, reason: 'Atende a uma ou mais necessidades selecionadas.' })).filter(item => allowed.has(item.id)), journey: [], notes: 'Mock local determinístico; não representa recomendação de IA.' };
  }
  function safeResult(result, catalog) {
    const allowed = new Set((Array.isArray(catalog) ? catalog : []).filter(item => item && typeof item.id === 'string').map(item => item.id));
    const recommended = Array.isArray(result?.recommended) ? result.recommended.filter(item => item && allowed.has(item.id)).slice(0, 4).map(item => ({ id: item.id, reason: String(item.reason || '') })) : [];
    const journey = Array.isArray(result?.journey) ? result.journey.filter(item => item && allowed.has(item.solutionId)).map(item => ({ stage: String(item.stage || ''), solutionId: item.solutionId })) : [];
    return { fallback: !recommended.length, diagnosis: String(result?.diagnosis || ''), objective: String(result?.objective || ''), recommended, journey, notes: String(result?.notes || '') };
  }
  window.LDXAIAdvisor = Object.freeze({ recommend, safeResult });
})();
