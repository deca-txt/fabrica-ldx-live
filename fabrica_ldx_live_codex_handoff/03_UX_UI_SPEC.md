# UX/UI SPEC

## Direção

Objetivo visual:
- clean
- sofisticado
- contemporâneo
- premium
- claro
- muito espaço
- altamente navegável
- cara Konecta
- não parecer dashboard
- não parecer LMS tradicional

## Tipografia
Fonte principal:
**Poppins**

Importar via Google Fonts se disponível.
Garantir fallback:
`Poppins, Arial, sans-serif`

## Layout

### Desktop
Max-width de conteúdo:
`1200px–1280px`

Grid catálogo:
- 3 colunas desktop
- 2 tablet
- 1 mobile

### Espaçamento
Usar sistema consistente de 8px.

### Header
- logo/nome à esquerda
- `Catálogo`
- `Como trabalhamos`
- `LDX Live`
- CTA opcional "Explorar catálogo"

Sticky apenas se não gerar peso visual.

## Home

Hero grande, simples.

Sugestão visual:
- eyebrow
- headline em 48–64px desktop
- supporting copy
- CTA
- composição abstrata sutil ao fundo

Não usar carrossel.

## Catálogo

### Filtros por necessidade
Usar chips/cards selecionáveis.

Comportamento:
- múltipla seleção
- atualização instantânea
- mostrar quantidade de soluções encontradas
- botão "Limpar filtros"

### Cards
Cada card mostra:
- categoria
- nome
- descrição curta
- tags/capabilities principais
- seta/CTA

Evitar excesso de texto.

## Detalhe de solução

Pode ser:
- modal/drawer grande
OU
- seção expandida
OU
- rota/hash

Preferência:
drawer/modal responsivo, se simples e robusto.

Conteúdo:
- nome
- descrição
- ideal para
- entregas possíveis
- capacidades
- necessidades atendidas
- bloco de case futuro
- CTA voltar

## Como trabalhamos
6 etapas em sequência visual.
Desktop horizontal.
Mobile vertical.

## Responsividade obrigatória

Viewports de QA:
- 1440x900
- 1024x768
- 768x1024
- 390x844

Critérios:
- zero overflow horizontal
- nenhum texto cortado
- nenhum CTA fora da tela
- filtro usável por toque
- menu adaptado
- cards em coluna única no mobile
- fonte mínima 15–16px para corpo
- botões com área de toque adequada
- nenhum recurso depende de hover

## Motion
Permitido:
- fade
- translate leve
- hover sutil
- expansão de cards
- transição de filtro

Evitar:
- animações longas
- parallax pesado
- bibliotecas externas
- efeitos que prejudiquem performance
