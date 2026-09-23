# Fábrica de Conteúdo · LDX Live — Execution Status

Atualizado em 2026-09-23 (America/Sao_Paulo).

## BASELINE

- Repositório: https://github.com/deca-txt/fabrica-ldx-live
- Branch de execução Fase 2: `feat/phase2-foundation`
- HEAD inicial desta branch: `a3f313ce84a21923c277196e20e8eeadca80fb9a`
- Branch/produção M-1: `main`
- HEAD de produção: `4d6e63dd6e463eaf0a0355231668358da726f84e` (Pages workflow `35816791925`: sucesso)
- GitHub Pages: https://deca-txt.github.io/fabrica-ldx-live/
- Pages configurado para `main:/`; workflows M-1, M1 hardening e M3/publicação atual: sucesso (`35815673759`, `35816390809`, `35816791925`).
- App estática servida pela raiz, sem build e sem backend obrigatório. Funcionalidade usa HTML/CSS/JS Vanilla; Poppins é progressiva e tem fallback Arial/sans-serif.
- Segurança M0: nenhuma credencial ou valor secreto no código/configuração. Hits de `secret`, `token` e `api_key` são apenas nomenclatura de contrato/documentação, revisados sem valores. Nenhum dado real de cliente/case foi fornecido.
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
| M3 Feature flags | PASS | `assets/js/feature-flags.js`; todas false; smoke público após retirar scripts de scaffold da página |
| M4 Lead capture scaffold inativo | PASS | `assets/js/lead-capture.js`; validação e adapter de mock sem UI/rede |
| M5 Apps Script backend scaffold | PASS | `backend/apps-script/`; sem propriedades, credenciais ou deployment |
| M6 IA Advisor scaffold inativo | PASS | `assets/js/ai-advisor.js`; mock determinístico, checagem de IDs, sem chamadas externas |
| M7 Pipeline de cases | PASS | `cases/`; scanner local somente leitura; inventário vazio (nenhum case fornecido) |
| M8 Testes e QA | PASS local | `tests/phase2.test.js`; matriz Chromium reexecutada no Pages após build |
| M9 Documentação de retomada | PASS | Este registro, checklist de dependências e próximos passos |

## IMPLEMENTADO

- M-1 screen-based UX, visual alinhado aos valores oficiais da Konecta e cobertura mobile prioritária.
- Catálogo mestre original preservado (20 soluções, 12 needs, `caseIds`).
- Evidência visual versionada em `docs/evidence/`.
- Nenhum lead, IA, integração, backend ou case de cliente ativado. Os scaffolds de M4–M8 não estão incluídos na branch de produção.

## FEATURE FLAGS

- Implementadas em `assets/js/feature-flags.js`; todas: `false`.
- M4–M6 não podem se tornar visíveis/ativos no Pages público.

## TESTES

- `node --check assets/js/app.js` — PASS.
- `node --check assets/js/catalog-data.js` — PASS.
- `node scripts/validate-catalog.js` — PASS: 20 soluções, 12 necessidades, seis etapas; IDs e referências válidos.
- `node --test tests/phase2.test.js` — PASS: 8 testes (schema válido/inválido, flags, lead consentimento/estados, IA IDs/fallback e Apps Script).
- `node scripts/inventory-cases.js` — PASS; `cases/raw/` permanece sem material; 0 arquivos inventariados.
- `node --check` nos scripts JS e Apps Script (via stdin) — PASS.
- Varredura de padrões de credencial/URLs internas — PASS; resultados revistos e sem credenciais ou endpoints internos.
- M1 hardening Chromium local: keyboard/Enter/Escape/foco, fallback Poppins, malformed data, contraste, targets touch, 7 rotas × 4 viewports — PASS.
- `git diff --check` — PASS.
- HTTP local `python3 -m http.server 8080` — home/CSS/JS 200.
- Chromium: fluxos, teclado/foco, refresh, Back/Forward, 4 viewports — PASS, 0 erros.
- Chromium no Pages público: mesmas rotas e viewports, assets sem 4xx/5xx, 0 erros — PASS.
- GitHub Pages workflow 35815673759 (M-1) e 35815785435 (documentação do HEAD anterior) — PASS.
- GitHub Pages workflow 35816390809 (M1 hardening) — PASS; Chromium público confirmou 7 telas × 4 viewports, fluxo, filtro, detalhe, assets sem HTTP 4xx/5xx e zero erros de console.
- Após M3, QA encontrou referência prematura aos módulos M4/M6; removida antes do encerramento. Workflow `35816791925` e Chromium público no HEAD `4d6e63d`: PASS, sem erros HTTP/console.

## FASE 2

- Pronto: baseline seguro, screen navigation, tokens Konecta, runtime hardening, validador de catálogo e flags desligadas.
- M4–M8 implementados nesta branch `feat/phase2-foundation`, sem integração ativa ou publicação no Pages.
- Dependências de usuário continuam as especificadas em `overnight/`: planilha e consentimento aprovados; endpoint/autorização/agent Intergrall; projetos reais candidatos a case. Não inserir credenciais no repo.

## NÃO EXECUTADO

- Nenhuma IA real, chamada Intergrall, lead capture público, persistência backend ou deployment Apps Script.
- Nenhuma sanitização de case; não há material de cliente. O inventário gerado contém zero cases.

## PRÓXIMO PASSO

Fila M-1 e M0–M9 concluída. Para futura ativação, seguir `overnight/10_TOMORROW_MORNING_CHECKLIST.md`; manter produção com as quatro flags false até aprovação de dados, consentimento, endpoint e cases reais.
