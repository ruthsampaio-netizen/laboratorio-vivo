# Laboratório Vivo de Plantas Medicinais — Site Institucional

Site institucional do **Laboratório Vivo de Plantas Medicinais**, projeto de ensino, pesquisa e extensão vinculado ao curso de **Biomedicina** do **Centro Universitário Leão Sampaio – Unileão**, integrante do **Programa de Educação Ambiental e Social (PEAS)**.

Construído com **HTML5 + CSS3 + JavaScript puro** (sem frameworks, sem build, sem dependências pagas). O conteúdo (textos, números, projetos, fotos) foi atualizado com dados reais do *Relatório Histórico de Atividades 2025–2026*.

---

## 1. Como manter o site atualizado (o jeito combinado com você)

Por uma regra de segurança deste ambiente, eu não consigo criar ou publicar diretamente no GitHub por você digitando um código no chat (isso é bloqueado de propósito, para proteger sua conta — não é um problema com o seu código, é assim para todo mundo). Então o modelo ficou um pouquinho diferente do que eu descrevi antes, mas ainda é bem simples:

**🟢 Para publicar a primeira vez:** você faz 3 cliques únicos no site do GitHub (sem programar nada) — veja a seção 2. Eu já deixei tudo pronto para isso ser rápido.

**🟡 Para editar depois de publicado:** use o painel visual em `SEU-SITE/admin` (veja a seção 4) — esse painel funciona direto do seu navegador, sem passar por mim, então continua tão fácil quanto no plano original.

**🔵 Ou peça no chat:** me diga o que quer mudar ("troca o número de mudas para Y"), eu preparo o arquivo atualizado e te devolvo pronto para você arrastar e soltar no GitHub (leva uns 10 segundos — mostro exatamente onde). Não é mais 100% automático da minha parte, mas continua sem exigir nenhum conhecimento técnico seu.

---

## 2. Publicar o site (uma única vez, 3 passos)

1. **Crie o repositório:** clique neste link → [criar repositório "laboratorio-vivo"](https://github.com/new?name=laboratorio-vivo&description=Site+institucional+do+Laborat%C3%B3rio+Vivo+de+Plantas+Medicinais&visibility=public) → role até o final e clique no botão verde **Create repository**. (Se pedir login, entre com sua conta do GitHub.)
2. **Envie os arquivos:** na página do repositório que abrir, clique em **uploading an existing file** (ou **Add file → Upload files**). Abra o arquivo `.zip` que eu te enviei, extraia/descompacte ele no seu computador, e arraste **o conteúdo de dentro da pasta** (os arquivos e pastas `index.html`, `css`, `js`, `admin`, `images`, `favicon.svg`, `README.md` — não a pasta em si) para a caixa de upload do GitHub. Role até o final e clique em **Commit changes**.
3. **Ative o link público:** vá em **Settings** (aba no topo do repositório) → **Pages** (menu da esquerda) → em "Branch" escolha **main** e a pasta **/ (root)** → clique em **Save**. Em 1-2 minutos, o GitHub mostra o link do seu site (algo como `https://ruthsampaio-netizen.github.io/laboratorio-vivo/`).

Me avise quando terminar esses 3 passos — eu confiro se tudo carregou certinho e te confirmo o link final.

---

## 3. Estrutura de pastas

```
laboratorio-vivo/
├── index.html               → Página única com todas as seções do site
├── favicon.svg                → Ícone do site
├── css/style.css               → Identidade visual (cores, fontes, layout)
├── js/
│   ├── data.json                → TODO o conteúdo editável (projetos, trajetória, números, contatos)
│   └── main.js                   → Interações (menu, galeria, animações)
├── admin/
│   ├── index.html                 → Abre o editor visual (seção 4)
│   └── config.yml                   → Configuração do editor visual
├── images/                        → Fotos do site, organizadas por seção
└── README.md                      → Este arquivo
```

Todas as imagens atuais são **placeholders provisórios** (SVGs com o selo "IMAGEM PROVISÓRIA"). Nenhuma fotografia real do projeto foi usada ou inventada — assim como nenhum número, nome ou dado foi inventado: tudo vem do relatório de atividades ou está marcado como `[INSERIR INFORMAÇÃO]` quando ainda não informado (endereço, Instagram, e-mail, publicações científicas).

---

## 4. Usando o painel visual (opção B)

1. Acesse `SEU-SITE/admin` no navegador (eu te aviso o endereço exato assim que publicar).
2. Na primeira vez, o painel vai pedir uma chave de acesso pessoal do GitHub (Personal Access Token) — a mesma que você já gerou, ou uma nova, gerada do mesmo jeito (Settings → Developer settings → Personal access tokens → Tokens (classic) → Generate new token (classic), marcando a opção **repo**). Cole a chave **direto nessa tela do painel** — como ela abre no seu próprio navegador conectando direto com o GitHub, isso é seguro; só não cole essa chave aqui no chat.
3. Você verá um painel com: Institucional e Contato, Números de Impacto, Projetos e Subprojetos, Trajetória e Reconhecimento, Ciência e Conhecimento, Galeria. Edite o que quiser, incluindo enviar fotos novas direto pelo formulário.
4. Clique em **Publicar**. Em 1 a 2 minutos o site atualiza sozinho.

> Esse painel (Sveltia CMS) é uma ferramenta gratuita e de código aberto mantida pela comunidade. Evite ter duas pessoas editando ao mesmo tempo para não haver conflito de alterações.

---

## 5. Onde fica cada informação em `js/data.json`

| O que editar | Onde, dentro de `js/data.json` |
|---|---|
| Endereço, Instagram, e-mail, link do Google Forms | `"instituicao"` |
| Números de impacto | `"impacto"` |
| Cards de projetos/subprojetos | `"projetos"` |
| Linha do tempo (Trajetória e Reconhecimento) | `"trajetoria"` |
| Publicações científicas | `"publicacoes"` |
| Fotos e categorias da galeria "Na Prática" | `"galeria"` |

Textos mais longos (seções "Sobre" e "O Território") ficam no `index.html`, dentro de tags `<p>...</p>` — procure pelos comentários `SOBRE` e `TERRITÓRIO`.

### Sobre os números do relatório

Os números da seção "Impacto" vêm do relatório 2025–2026 e, para 2026, são **estimativas da coordenação**, não contagens exatas — por isso aparecem como faixas (ex.: "500–1.000") em vez de um número único. Ao atualizar esses números no futuro, mantenha esse cuidado: se for uma estimativa, deixe isso claro no texto do rótulo, como já está feito.

---

## 6. Formulário de contato — como deixá-lo funcionando de graça

1. Crie um formulário gratuito em [forms.google.com](https://forms.google.com) com os campos: Nome, E-mail, Perfil, Mensagem.
2. Copie o link de compartilhamento do formulário.
3. Me envie esse link (ou cole em `"linkGoogleForms"` você mesma) para eu conectar o botão de contato a ele.

Alternativa gratuita: [Formspree](https://formspree.io).

---

## 7. Como testar localmente (opcional)

Você não precisa fazer isso — eu já testo tudo antes de publicar. Mas se quiser conferir no seu computador antes de me pedir para publicar algo, rode um servidor local (abrir o `index.html` com duplo clique não carrega os dados corretamente, por uma limitação de segurança dos navegadores):

```
python3 -m http.server 8000
```
Depois acesse `http://localhost:8000` no navegador.

---

## 8. Domínio próprio (opcional, para o futuro)

O endereço gratuito do GitHub Pages já é suficiente para divulgar o projeto (editais, redes sociais, congressos). Se no futuro quiser um domínio próprio (ex.: `laboratoriovivo.com.br`), isso pode ser conectado gratuitamente nas configurações do GitHub Pages — o único custo seria a compra do domínio em si, o que não é necessário agora.

---

## 9. Regra seguida na criação deste site

Nenhuma informação específica sobre o Laboratório Vivo foi inventada. Os conteúdos de projetos, trajetória e números de impacto vêm do *Relatório Histórico de Atividades 2025–2026*. Onde uma informação real não havia sido fornecida (endereço, e-mail, Instagram, publicações científicas, nomes de parceiros, data e nome formal do prêmio institucional), foi utilizado um marcador `[INSERIR INFORMAÇÃO]`, para preenchimento posterior com dados reais.
