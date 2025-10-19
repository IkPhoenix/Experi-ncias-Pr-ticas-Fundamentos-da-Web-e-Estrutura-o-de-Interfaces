# Instituto Sementes do Amanhã — Entrega II (CSS3)
Esta versão acrescenta **Design System**, **layout responsivo avançado** (Grid de 12 colunas + Flexbox, 5 breakpoints), **menu com dropdown e hambúrguer**, **componentes** (cards, botões, formulários com feedback, alerts, modal, badges) e **CSS modular**.

## Estrutura
```
assets/css/
  ├─ variables.css   # Paleta (8+ cores), tipografia (>=5 tamanhos), espaçamentos modulares
  ├─ base.css        # Reset leve e elementos base
  ├─ layout.css      # Grid 12 colunas, header, navegação responsiva com dropdown/hambúrguer
  ├─ components.css  # Cards, botões, formulários, alerts, modal, toast, badges
  ├─ utilities.css   # Helpers utilitários
  └─ main.css        # Importa todos os módulos
```
### Requisitos atendidos (resumo)
- **Design System** com variáveis (`variables.css`): paleta 8+, tipografia (xxs–3xl), spacing 8/16/24/32/48/64.
- **Layout**: grid 12 colunas + flex; **5 breakpoints** (1280/1024/900/720/480).
- **Navegação**: dropdown em desktop e **hambúrguer mobile** sem JS (checkbox hack).
- **Componentes**: cards responsivos, botões com estados, formulários com validação visual (`:user-invalid`), **alerts**, **modal** (via `:target`), **badges**.
- **Entrega**: arquivos CSS adicionados e HTML apontando para `assets/css/main.css`.
