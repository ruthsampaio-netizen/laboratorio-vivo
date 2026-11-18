/**
 * ==========================================================================
 * Laboratório Vivo de Plantas Medicinais — Interações do site
 * Menu mobile, cabeçalho fixo, scroll suave, animações de entrada,
 * botão voltar ao topo, renderização de conteúdo a partir de js/data.json
 * e lightbox da galeria.
 *
 * Por que um arquivo .json e não um .js? Porque o js/data.json é o arquivo
 * que o editor visual (pasta /admin — veja o README, seção "Editar o site
 * pelo navegador") consegue ler e escrever automaticamente. Continua
 * podendo ser editado à mão, normalmente, como qualquer arquivo de texto.
 * ==========================================================================
 */

// Cópia de segurança dos dados, usada apenas se o navegador não conseguir
// carregar js/data.json — por exemplo, ao abrir o index.html diretamente
// com duplo clique (sem um servidor local). Isso evita que o site apareça
// quebrado durante testes rápidos. Veja o README, seção "Como testar
// localmente", para rodar um servidor local e sempre ver os dados reais
// de js/data.json.
const DADOS_PADRAO = {
  instituicao: {
    nomeProjeto: "Laboratório Vivo de Plantas Medicinais",
    instituicaoNome: "Centro Universitário Leão Sampaio – Unileão",
    curso: "Curso de Biomedicina",
    endereco: "[INSERIR ENDEREÇO INSTITUCIONAL]",
    instagram: "[INSERIR LINK DO INSTAGRAM]",
    email: "[INSERIR E-MAIL DE CONTATO]",
    linkGoogleForms: "[INSERIR LINK DO GOOGLE FORMS]"
  },
  impacto: [],
  projetos: [],
  trajetoria: [],
  publicacoes: [],
  galeria: []
};

document.addEventListener("DOMContentLoaded", async () => {
  window.SITE_DATA = await carregarDados();

  renderizarContatos();
  renderizarProjetos();
  renderizarTrajetoria();
  renderizarImpacto();
  renderizarPublicacoes();
  renderizarGaleria();

  inicializarMenuMobile();
  inicializarCabecalhoFixo();
  inicializarVoltarAoTopo();
  inicializarRevelacaoAoRolar();
  inicializarLightbox();
  inicializarFormularioContato();

  const anoEl = document.getElementById("ano-atual");
  if (anoEl) anoEl.textContent = new Date().getFullYear();
});

/* --------------------------------------------------------------------
 * CARREGAMENTO DOS DADOS (js/data.json)
 * ------------------------------------------------------------------ */
async function carregarDados() {
  try {
    const resposta = await fetch("js/data.json", { cache: "no-store" });
    if (!resposta.ok) throw new Error(`Falha ao buscar js/data.json (status ${resposta.status})`);
    return await resposta.json();
  } catch (erro) {
    console.warn(
      "Não foi possível carregar js/data.json — usando dados padrão de segurança. " +
      "Isso é normal se você abriu o index.html direto no navegador (duplo clique), " +
      "sem um servidor local. Veja o README.md, seção 'Como testar localmente'.",
      erro
    );
    return DADOS_PADRAO;
  }
}

/* --------------------------------------------------------------------
 * CONTATOS — preenche links/textos a partir de SITE_DATA.instituicao
 * ------------------------------------------------------------------ */
function renderizarContatos() {
  const d = SITE_DATA.instituicao;

  const setText = (id, valor) => {
    const el = document.getElementById(id);
    if (el) el.textContent = valor;
  };
  const setHref = (id, valor, textoVisivel) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.href = valor && valor.startsWith("[") ? "#" : valor;
    if (textoVisivel) el.textContent = textoVisivel;
  };

  setText("info-instituicao", `${d.instituicaoNome} — ${d.curso}`);
  setText("info-endereco", d.endereco);
  setHref("info-instagram", d.instagram, d.instagram && !d.instagram.startsWith("[") ? d.instagram : "Instagram (em breve)");
  setHref("info-email", d.email && !d.email.startsWith("[") ? `mailto:${d.email}` : "#", d.email);
  setHref("rodape-instagram", d.instagram, "Instagram");
  setHref("rodape-email", d.email && !d.email.startsWith("[") ? `mailto:${d.email}` : "#", "E-mail");
}

/* --------------------------------------------------------------------
 * PROJETOS E SUBPROJETOS
 * ------------------------------------------------------------------ */
function renderizarProjetos() {
  const container = document.getElementById("lista-projetos");
  if (!container) return;

  container.innerHTML = SITE_DATA.projetos.map(p => `
    <article class="projeto-card reveal">
      <div class="imagem">
        <img src="${p.imagem}" alt="Imagem provisória do projeto ${p.titulo}" loading="lazy">
      </div>
      <div class="corpo">
        <h3>${p.titulo}</h3>
        <p>${p.resumo}</p>
        <a class="link-projeto" href="${p.link}">Saiba mais →</a>
      </div>
    </article>
  `).join("");
}

/* --------------------------------------------------------------------
 * TRAJETÓRIA E RECONHECIMENTO — linha do tempo
 * ------------------------------------------------------------------ */
function renderizarTrajetoria() {
  const container = document.getElementById("lista-trajetoria");
  if (!container || !SITE_DATA.trajetoria) return;

  container.innerHTML = SITE_DATA.trajetoria.map(item => `
    <div class="trajetoria-item reveal">
      <span class="trajetoria-ano">${item.ano}</span>
      <h3>${item.titulo}</h3>
      <p>${item.descricao}</p>
    </div>
  `).join("");
}

/* --------------------------------------------------------------------
 * IMPACTO — números
 * ------------------------------------------------------------------ */
function renderizarImpacto() {
  const container = document.getElementById("lista-impacto");
  if (!container) return;

  container.innerHTML = SITE_DATA.impacto.map(item => `
    <div class="impacto-item reveal">
      <span class="numero">${item.numero}</span>
      <span class="rotulo">${item.rotulo}</span>
    </div>
  `).join("");
}

/* --------------------------------------------------------------------
 * PUBLICAÇÕES — ciência e conhecimento
 * ------------------------------------------------------------------ */
function renderizarPublicacoes() {
  const container = document.getElementById("lista-publicacoes");
  if (!container) return;

  container.innerHTML = SITE_DATA.publicacoes.map(pub => `
    <article class="publicacao-card reveal">
      <span class="tipo-tag">${pub.tipo}</span>
      <h3>${pub.titulo}</h3>
      <p class="meta">${pub.autores} · ${pub.ano}</p>
      <a class="saiba-mais" href="${pub.linkPdf}" target="_blank" rel="noopener">Saiba mais →</a>
    </article>
  `).join("");
}

/* --------------------------------------------------------------------
 * GALERIA "NA PRÁTICA" — grade + filtros por categoria
 * ------------------------------------------------------------------ */
function renderizarGaleria() {
  const grid = document.getElementById("galeria-grid");
  const filtrosContainer = document.getElementById("galeria-filtros");
  if (!grid || !filtrosContainer) return;

  const categorias = [...new Set(SITE_DATA.galeria.map(item => item.categoria))];

  filtrosContainer.innerHTML = `<button class="filtro-btn ativo" data-filtro="todas">Todas</button>` +
    categorias.map(cat => `<button class="filtro-btn" data-filtro="${cat}">${cat}</button>`).join("");

  grid.innerHTML = SITE_DATA.galeria.map((item, i) => `
    <div class="galeria-item" data-categoria="${item.categoria}" data-index="${i}">
      <img src="${item.imagem}" alt="Imagem provisória — ${item.legenda}" loading="lazy">
      <div class="legenda">${item.categoria}</div>
    </div>
  `).join("");

  filtrosContainer.addEventListener("click", (e) => {
    const btn = e.target.closest(".filtro-btn");
    if (!btn) return;

    filtrosContainer.querySelectorAll(".filtro-btn").forEach(b => b.classList.remove("ativo"));
    btn.classList.add("ativo");

    const filtro = btn.dataset.filtro;
    grid.querySelectorAll(".galeria-item").forEach(item => {
      const mostrar = filtro === "todas" || item.dataset.categoria === filtro;
      item.classList.toggle("oculto", !mostrar);
    });
  });
}

/* --------------------------------------------------------------------
 * LIGHTBOX
 * ------------------------------------------------------------------ */
function inicializarLightbox() {
  const lightbox = document.getElementById("lightbox");
  const img = document.getElementById("lightbox-img");
  const legenda = document.getElementById("lightbox-legenda");
  const fechar = document.getElementById("lightbox-fechar");
  const grid = document.getElementById("galeria-grid");
  if (!lightbox || !grid) return;

  grid.addEventListener("click", (e) => {
    const item = e.target.closest(".galeria-item");
    if (!item) return;
    const dado = SITE_DATA.galeria[Number(item.dataset.index)];
    img.src = dado.imagem;
    img.alt = `Imagem provisória — ${dado.legenda}`;
    legenda.textContent = `${dado.legenda} (imagem provisória — categoria: ${dado.categoria})`;
    lightbox.classList.add("aberto");
  });

  const fecharLightbox = () => lightbox.classList.remove("aberto");

  fechar.addEventListener("click", fecharLightbox);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) fecharLightbox();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") fecharLightbox();
  });
}

/* --------------------------------------------------------------------
 * MENU MOBILE
 * ------------------------------------------------------------------ */
function inicializarMenuMobile() {
  const botao = document.getElementById("botao-menu-mobile");
  const menu = document.getElementById("menu-principal");
  if (!botao || !menu) return;

  const alternar = () => {
    const aberto = document.body.classList.toggle("menu-mobile-aberto");
    botao.setAttribute("aria-expanded", String(aberto));
    botao.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
  };

  botao.addEventListener("click", alternar);

  menu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      document.body.classList.remove("menu-mobile-aberto");
      botao.setAttribute("aria-expanded", "false");
    });
  });
}

/* --------------------------------------------------------------------
 * CABEÇALHO FIXO — muda aparência ao rolar
 * ------------------------------------------------------------------ */
function inicializarCabecalhoFixo() {
  const cabecalho = document.getElementById("cabecalho");
  if (!cabecalho) return;

  const aoRolar = () => {
    cabecalho.classList.toggle("rolado", window.scrollY > 12);
  };
  aoRolar();
  window.addEventListener("scroll", aoRolar, { passive: true });
}

/* --------------------------------------------------------------------
 * BOTÃO VOLTAR AO TOPO
 * ------------------------------------------------------------------ */
function inicializarVoltarAoTopo() {
  const botao = document.getElementById("voltar-topo");
  if (!botao) return;

  window.addEventListener("scroll", () => {
    botao.classList.toggle("visivel", window.scrollY > 480);
  }, { passive: true });

  botao.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* --------------------------------------------------------------------
 * ANIMAÇÕES DE ENTRADA AO ROLAR (discretas)
 * ------------------------------------------------------------------ */
function inicializarRevelacaoAoRolar() {
  const elementos = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window) || elementos.length === 0) {
    elementos.forEach(el => el.classList.add("mostrar"));
    return;
  }

  // threshold baixo + rootMargin generoso: revela assim que o elemento
  // começa a aparecer, reduzindo a chance de ele "pular" a área visível
  // sem nunca disparar a interseção (rolagem muito rápida, teclas
  // Home/End, restauração de posição de rolagem pelo navegador etc.).
  const observador = new IntersectionObserver((entradas) => {
    entradas.forEach(entrada => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add("mostrar");
        observador.unobserve(entrada.target);
      }
    });
  }, { threshold: 0, rootMargin: "200px 0px 0px 0px" });

  elementos.forEach(el => observador.observe(el));

  // Rede de segurança: se, por qualquer motivo, algum elemento nunca for
  // considerado "interseccionando" (ex.: saltos instantâneos de rolagem),
  // ele é revelado de qualquer forma depois de um curto intervalo — assim
  // nenhum conteúdo do site fica permanentemente invisível.
  window.setTimeout(() => {
    document.querySelectorAll(".reveal:not(.mostrar)").forEach(el => {
      el.classList.add("mostrar");
      observador.unobserve(el);
    });
  }, 2500);
}

/* --------------------------------------------------------------------
 * FORMULÁRIO DE CONTATO
 * Por padrão, este formulário não envia dados a lugar nenhum (é apenas
 * visual). Para funcionar de graça, siga o passo a passo do README.md
 * para conectá-lo ao Google Forms (ou a um serviço gratuito como o
 * Formspree). Depois de configurado, ajuste a função abaixo conforme
 * as instruções do README.
 * ------------------------------------------------------------------ */
function inicializarFormularioContato() {
  const form = document.getElementById("form-contato");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    alert(
      "Este formulário ainda não está conectado a um serviço de envio.\n\n" +
      "Siga o passo a passo do README.md para conectá-lo gratuitamente ao " +
      "Google Forms (recomendado) ou ao Formspree."
    );
  });
}
