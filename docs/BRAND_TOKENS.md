# Konecta brand tokens — Fábrica de Conteúdo · LDX Live

## Referências oficiais consultadas

- Konecta Brasil, página pública atual: https://konecta.com/br — consultada em 2026-09-23. A página e os estilos oficiais servidos pelo mesmo domínio usam, entre outros, `rgb(42, 1, 205)` (violeta elétrico), `rgb(15, 15, 114)` (azul-violeta profundo), `rgb(166, 183, 255)` (violeta claro), `rgb(15, 15, 15)` (ink), branco e `rgb(242, 243, 247)` (cinza muito claro). O site também usa cores vivas em elementos específicos; elas não foram trazidas ao design system deste catálogo.
- Konecta, anúncio oficial da identidade Katalyst: https://konecta.com/news-insights/katalyst-2028-konecta-reveals-an-ambitious-3-year-plan-to-become-a-genai-powered-company — referência sobre a identidade introduzida em 2025.

## Tokens adotados

| Token CSS | Valor | Uso |
|---|---|---|
| `--brand-primary` | `#2A01CD` | CTA primário, links ativos, ênfase de marca e seleção |
| `--brand-primary-strong` | `#0F0F72` | contraste de apoio sobre superfícies claras |
| `--brand-primary-soft` | `#A6B7FF` | foco, contornos e detalhes secundários |
| `--brand-primary-wash` | `#F0EEFF` | estados interativos, tonalidade derivada do violeta |
| `--surface` | `#FFFFFF` | superfície principal |
| `--surface-alt` | `#F2F3F7` | superfície neutra alternativa |
| `--ink` | `#0F0F0F` | texto principal |
| `--muted` | `#646477` | texto secundário |
| `--line` | `#E4E4EC` | divisores e bordas |

## Justificativa

O violeta elétrico é o acento cromático principal do catálogo, sustentado pelo azul-violeta profundo. Branco, ink e cinza frio organizam a leitura. O wash é uma variação clara de estado, não um accent adicional. Rosa/coral, laranja, verde e a combinação lilás multicolorida anterior foram removidos da interface. As cores são centralizadas em CSS Custom Properties no início de `assets/css/styles.css`.
