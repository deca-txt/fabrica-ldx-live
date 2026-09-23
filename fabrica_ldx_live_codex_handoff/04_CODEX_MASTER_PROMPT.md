# PROMPT MESTRE PARA CODEX

Você é o implementador responsável pelo MVP do catálogo web **Fábrica de Conteúdo · LDX Live** para demonstração no CONAREC.

## Objetivo
Construir, versionar, publicar e validar uma aplicação web estática, responsiva e visualmente sofisticada usando apenas HTML, CSS e JavaScript Vanilla.

O produto deve funcionar como um catálogo navegável das entregas da Fábrica de Conteúdo e permitir filtro por necessidades/dor.

Leia integralmente:
- `00_README.md`
- `01_PRODUCT_SPEC.md`
- `02_CATALOG_DATA.md`
- `03_UX_UI_SPEC.md`
- `05_ACCEPTANCE_QA.md`

Estas documentações são autoridade de escopo.

---

## REGRAS

1. NÃO implementar IA nesta rodada.
2. NÃO implementar backend.
3. NÃO implementar captura de lead.
4. NÃO usar React, Next.js ou framework.
5. NÃO adicionar npm/build se não for estritamente necessário.
6. NÃO inventar funcionalidades fora do escopo.
7. NÃO depender de assets externos além da fonte Poppins.
8. Construir data-driven: catálogo e filtros devem vir de estrutura JS centralizada.
9. Garantir responsividade desde o início.
10. Preparar arquitetura para posterior IA sem implementar a integração agora.

---

## ESTRUTURA ESPERADA

Sugestão:

/
├── index.html
├── README.md
├── assets/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   ├── catalog-data.js
│   │   └── app.js
│   └── images/
└── docs/

Pode adaptar apenas se houver justificativa técnica objetiva.

---

## FUNCIONALIDADES OBRIGATÓRIAS

### 1. Landing
Hero:
`FÁBRICA DE CONTEÚDO · LDX LIVE`

Headline:
`Transformamos necessidades de aprendizagem e operação em experiências digitais.`

Supporting copy:
`Estratégia, conteúdo, design e tecnologia combinados para criar soluções que ajudam pessoas a aprender, praticar, consultar, comunicar e performar melhor.`

CTA:
`Conheça nosso catálogo`

### 2. Catálogo
Exibir todas as soluções definidas em `02_CATALOG_DATA.md`.

### 3. Filtro por necessidade
Criar interface multi-select com as necessidades definidas em `01_PRODUCT_SPEC.md`.

Lógica recomendada:
- se nenhum filtro selecionado: mostrar tudo;
- se houver filtros: mostrar soluções que atendam pelo menos uma necessidade selecionada;
- atualizar resultado sem reload;
- exibir count;
- oferecer "Limpar filtros".

### 4. Detalhe de solução
Cada solução deve permitir abrir detalhes com:
- descrição;
- ideal para;
- entregas;
- capabilities;
- necessidades relacionadas.

### 5. Como trabalhamos
Exibir:
Diagnosticar → Desenhar → Construir → Validar → Entregar → Evoluir.

### 6. Estrutura preparada para cases
Cada solução deve conter `caseIds`, mesmo vazio.

Não criar cases fictícios.

---

## DESIGN

Usar Poppins.

Priorizar:
- fundo claro;
- muita área em branco;
- hierarquia forte;
- cards amplos;
- tipografia grande;
- acentos visuais inspirados na Konecta;
- aparência premium;
- microinterações discretas.

Evitar:
- visual dashboard;
- preto dominante;
- excesso de gradiente;
- excesso de bordas;
- glassmorphism exagerado;
- interface densa.

---

## RESPONSIVIDADE

Validar obrigatoriamente:

1440px
1024px
768px
390px

Não considerar concluído se houver:
- overflow horizontal;
- cards quebrados;
- filtros inutilizáveis;
- texto cortado;
- modais maiores que viewport;
- CTA inacessível.

---

## ACESSIBILIDADE BÁSICA

- HTML semântico;
- foco visível;
- botões reais;
- labels adequados;
- contraste suficiente;
- navegação básica por teclado;
- `aria-*` apenas quando necessário.

---

## GIT

Trabalhar em branch própria caso o repositório já exista.

Commits sugeridos:
1. `feat: scaffold fabrica catalog`
2. `feat: add catalog data and filters`
3. `feat: add responsive solution details`
4. `style: polish ldx live visual system`
5. `docs: add github pages setup`

Não misturar alterações não relacionadas.

---

## GITHUB PAGES

Ao concluir:

1. garantir que a app funcione com caminhos relativos;
2. publicar no GitHub;
3. configurar GitHub Pages;
4. confirmar a URL pública;
5. testar a URL publicada.

Se o repositório já tiver Pages configurado, preservar configuração compatível.

---

## TESTE LOCAL

Antes do push, testar por HTTP local, por exemplo:

`python3 -m http.server 8080`

Não validar apenas abrindo `file://`.

---

## ENTREGÁVEL FINAL DO CODEX

Ao finalizar, reportar:

### Implementado
- lista objetiva

### Arquivos principais
- caminhos

### Testes
- viewports
- interações
- navegador

### Git
- branch
- commits
- HEAD

### Deploy
- URL do GitHub Pages

### Pendências
Somente pendências reais.

Não declarar PASS sem evidência.
