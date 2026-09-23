# Fábrica de Conteúdo · LDX Live — Execution Status

Atualizado em 2026-09-23 (America/Sao_Paulo).

## BASELINE

- Repositório: https://github.com/deca-txt/fabrica-ldx-live
- Branch de execução Fase 2: `feat/phase2-foundation`
- HEAD inicial desta branch: `a3f313ce84a21923c277196e20e8eeadca80fb9a`
- Branch/produção M-1: `main`
- HEAD de produção: `a3f313ce84a21923c277196e20e8eeadca80fb9a`
- GitHub Pages: https://deca-txt.github.io/fabrica-ldx-live/
- Pages configurado para `main:/`; build do HEAD atual: sucesso (workflow 35815785435).
- App estática servida pela raiz, sem build e sem backend obrigatório. Funcionalidade usa HTML/CSS/JS Vanilla; Poppins é progressiva e tem fallback Arial/sans-serif.
- Segurança M0: nenhuma credencial ou valor de secret no código/configuração. Os hits da busca por `secret`, `token` e `api_key` são apenas nomes de campos e checklists nos documentos de contrato overnight; revistos e não contêm valores. Nenhum dado real de cliente/case encontrado; `cases/` ainda não existe.
- O catálogo não depende de fetch, XHR, WebSocket ou endpoint; Google Fonts é o único recurso externo de frontend.
- Os ZIPs do pacote e os documentos `overnight/` chegaram como arquivos não rastreados neste workspace; foram preservados e não incluídos nos commits de implementação.

## MVP — Gates A–I (após M-1)

- A Estrutura estática, Vanilla, sem build, catálogo JS central e `caseIds`: **PASS**.
- B Home, assinatura, copy revisada pelo amendment e CTAs para explorar/processo: **PASS**.
- C Vinte soluções, cards data-driven, categorias e detalhe: **PASS**.
- D Doze necessidades, multiseleção, contagem, resumo de resultados e seleção restaurada: **PASS**.
- E Detalhes completos, navegação de volta, Escape, foco restaurado e tela integral mobile: **PASS**.
- F Seis etapas de processo em tela independente: **PASS**.
- G 1440×900, 1024×768, 768×1024, 390×844; sem overflow horizontal: **PASS**.
- H Poppins/fallback, paleta oficial documentada, hierarquia clara e transições reduzidas: **PASS**.
- I GitHub Pages, caminhos relativos, build, home/rotas/assets públicos: **PASS**.

## M-1 VISUAL/NAV

- Branch: `fix/konecta-screen-navigation`
- Commits M-1: `267f7a6` navegação screen-based; `06cc322` tokens/visual Konecta; `4f71dff` QA/screenshot evidence; merge em produção `dc084cd`; validação pública documental `a3f313c`.
- Referências oficiais: https://konecta.com/br e https://konecta.com/news-insights/katalyst-2028-konecta-reveals-an-ambitious-3-year-plan-to-become-a-genai-powered-company.
- Tokens: [docs/BRAND_TOKENS.md](BRAND_TOKENS.md).
- Rotas: `#/home`, `#/explore`, `#/needs`, `#/results?ids=...`, `#/catalog`, `#/solution/:id`, `#/process`.
- Testes por viewport, interações e screenshots: [docs/M1_VISUAL_NAV_QA.md](M1_VISUAL_NAV_QA.md), `docs/evidence/`.
- Pages: sucesso; HTTP 200 e verificação browser pública sem erros 4xx/5xx/console.
- Resultado: **PASS**.

## OVERNIGHT MILESTONES

| Marco | Status | Evidência / saída |
|---|---|---|
| M-1 Visual/Nav | PASS | `docs/M1_VISUAL_NAV_QA.md`, evidências visuais, validação Pages |
| M0 Baseline e segurança | PASS | Este registro; Pages e varredura estática revistas |
| M1 Hardening do MVP | PASS local e público | [docs/M1_HARDENING_QA.md](M1_HARDENING_QA.md); Pages workflow `35816390809` |
| M2 Estado e arquitetura data-driven | PASS | `scripts/validate-catalog.js`; M1 runtime resilience |
| M3 Feature flags | PASS | `assets/js/feature-flags.js`; all false |
| M4 Lead capture scaffold inativo | PENDING | — |
| M5 Apps Script backend scaffold | PENDING | — |
| M6 IA Advisor scaffold inativo | PENDING | — |
| M7 Pipeline de cases | PENDING | — |
| M8 Testes e QA | PENDING | — |
| M9 Documentação de retomada | PENDING | — |

## IMPLEMENTADO

- M-1 screen-based UX, visual alinhado aos valores oficiais da Konecta e cobertura mobile prioritária.
- Catálogo mestre original preservado (20 soluções, 12 needs, `caseIds`).
- Evidência visual versionada em `docs/evidence/`.
- Nenhum lead, IA, integração, backend ou case de cliente ativado.

## FEATURE FLAGS

- Implementadas em `assets/js/feature-flags.js`; todas: `false`.
- M4–M6 não podem se tornar visíveis/ativos no Pages público.

## TESTES

- `node --check assets/js/app.js` — PASS.
- `node --check assets/js/catalog-data.js` — PASS.
- `node scripts/validate-catalog.js` — PASS: 20 soluções, 12 necessidades, seis etapas; IDs e referências válidos.
- M1 hardening Chromium local: keyboard/Enter/Escape/foco, fallback Poppins, malformed data, contraste, targets touch, 7 rotas × 4 viewports — PASS.
- `git diff --check` — PASS.
- HTTP local `python3 -m http.server 8080` — home/CSS/JS 200.
- Chromium: fluxos, teclado/foco, refresh, Back/Forward, 4 viewports — PASS, 0 erros.
- Chromium no Pages público: mesmas rotas e viewports, assets sem 4xx/5xx, 0 erros — PASS.
- GitHub Pages workflow 35815673759 (M-1) e 35815785435 (documentação do HEAD atual) — PASS.
- GitHub Pages workflow 35816390809 (M1 hardening) — PASS; Chromium público confirmou 7 telas × 4 viewports, fluxo, filtro, detalhe, assets sem HTTP 4xx/5xx e zero erros de console.

## FASE 2

- Pronto: baseline seguro, screen navigation, tokens Konecta, runtime hardening, validador de catálogo e flags desligadas.
- Em preparação nesta branch: contratos inativos, Apps Script não implantado, pipeline de cases e QA determinístico.
- Dependências de usuário continuam as especificadas em `overnight/`: planilha e consentimento aprovados; endpoint/autorização/agent Intergrall; projetos reais candidatos a case. Não inserir credenciais no repo.

## NÃO EXECUTADO

- Nenhuma IA real, chamada Intergrall, lead capture público, persistência backend ou deployment Apps Script.
- Nenhuma sanitização/inventário real de case; nenhum material de cliente foi fornecido.

## PRÓXIMO PASSO

M0–M3 podem ser publicados segundo o contrato. M4–M8 ficam na branch `feat/phase2-foundation`, sem UI/integração ativa.
