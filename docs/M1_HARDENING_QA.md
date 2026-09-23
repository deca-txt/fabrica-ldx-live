# M1 — MVP hardening QA

**Status branch QA:** PASS — 2026-09-23  
**Branch:** `feat/phase2-foundation`

## Mudanças de hardening

- Live region isolada: mudanças de tela anunciam somente o respectivo título; listas de catálogo não são anunciadas como um único bloco.
- Dados ausentes/malformados são filtrados por schema básico em runtime; catálogo, needs e processo degradam para estados vazios legíveis sem exceção JS.
- Foco visível usa o violeta de marca de alto contraste. Texto secundário de cards, needs, detalhe e processo foi aumentado para leitura móvel; filtro de categoria tem alvo touch mínimo de 44 px.
- Conteúdo/data source central (20 soluções e 12 needs) não alterado.

## QA

- Semântica: landmarks `header`, `nav`, `main`, `footer`, headings por tela, botões e links nativos; páginas ocultas usam `hidden`.
- Navegação por teclado: Enter em CTA/solução, Escape do detalhe, foco no título de tela e retorno do foco ao card de origem — PASS.
- Hash, refresh de detalhe/needs/results, Browser Back/Forward e restauração multi-select — PASS.
- Multi-select e resultados OR; limpar/ajustar; filtro por categoria; vazio legível com dados incompletos — PASS.
- Poppins bloqueada deliberadamente: fallback `Poppins, Arial, sans-serif`; home continuou funcional e sem overflow — PASS.
- Dado incompleto deliberado (`CATALOG` inválido, `NEEDS` ausente, `PROCESS` inválido): vazio seguro, CTA coerente e zero page errors — PASS.
- Touch: chips de categoria medidos com 44 px; cards/checks e CTAs excedem esse mínimo — PASS.
- Contraste medido sobre superfície branca: ink 19.17:1, muted 5.78:1, violeta primário 10.58:1 — PASS (mínimo de texto normal 4.5:1).
- Viewports e todos os estados (`home`, `explore`, `needs`, `results`, `catalog`, `solution`, `process`): 1440×900, 1024×768, 768×1024, 390×844 — PASS, zero overflow horizontal.
- JavaScript syntax, console/page errors, links/assets em HTTP local — PASS, zero erros.

## Próximo

Integrar após este PASS, testar novamente produção pública e continuar M2. As features de Fase 2 permanecem ausentes/inativas neste marco.
