# Casa Solidária — Plataforma para ONG (Entrega 1 — HTML5)

Este repositório contém uma base **100% HTML5 + CSS + JS mínimo** para a primeira entrega do projeto da disciplina.

## 📁 Estrutura
```
ong-platform/
├─ index.html         # Página inicial: missão, história, contato
├─ projetos.html      # Projetos + CTAs para voluntariado/doação
├─ cadastro.html      # Formulários: voluntariado e doação
└─ assets/
   ├─ css/styles.css
   ├─ js/masks.js
   └─ img/ (SVGs otimizados)
```

## ✅ Requisitos atendidos
- **3 páginas** com **semântica HTML5** (`header`, `nav`, `main`, `section`, `article`, `aside`, `footer`).
- **Hierarquia de títulos** lógica e consistente.
- Cada página **usa imagens** (SVGs leves).
- **Formulário complexo** em `cadastro.html` com inputs:
  - Nome completo, e-mail, CPF, telefone, **data de nascimento (com `max` automático)**, endereço, CEP, cidade, estado.
  - **Validação nativa** com `required`, `pattern`, `minlength`, `type`.
  - **Agrupamento** com `fieldset` e `legend`.
  - **Máscaras de input** em JS para **CPF**, **telefone** e **CEP**.
- **Acessibilidade**: rotas de navegação, `aria-label`, `aria-current`, `alt`, `legend`, contraste.
- **Responsivo** (mobile-first) e imagens com `loading="lazy"` quando cabível.
- **SEO**: metatags e estrutura semântica.

## 🧪 Validação W3C
1. Abra <https://validator.w3.org/#validate_by_upload>.
2. Envie cada `*.html` e corrija qualquer alerta que o validador exibir no seu ambiente (os arquivos presentes já validam).

## 🚀 Publicar no GitHub Pages
1. Crie um repositório público chamado **ong-platform**.
2. Envie tudo do diretório (mantenha a mesma estrutura).
3. Ative o **GitHub Pages** em *Settings › Pages* → *Deploy from a branch* → `main` → `/ (root)`.
4. O site ficará disponível em: `https://seu-usuario.github.io/ong-platform/`.

## 💡 Próximos passos (para as próximas entregas)
- Componentizar o CSS (BEM/utility).
- Melhorar acessibilidade (foco visível avançado, `prefers-reduced-motion`).
- Otimizações de desempenho (preload de fontes, compressão de imagens raster).
- Integração de gateway de pagamento e autenticação (futuro).
