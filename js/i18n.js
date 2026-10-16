const TRANSLATIONS = {
  "pt-BR": {
    meta: {
      title: "{name} | Engenheiro de Software · Unity / C#",
      description: "Portfólio de {name}, Engenheiro de Software e Desenvolvedor Unity focado em sistemas de gameplay, ferramentas e performance.",
    },
    ide: { accept: "Aceitar", suggestion: "Sugest\u00e3o de autocomplete", explorer: "Explorador", files: "Seções do portfólio", hint: "Explore os arquivos para conhecer meu trabalho.", skip: "Ir para o conteúdo", ready: "Pronto", editing: "Editando…", completion: "✦ Sugestão · completando automaticamente" },
    files: { about: "sobre.cs", skills: "habilidades.cs", projects: "projetos.cs", contact: "contato.cs" },
    github: {"title":"Atividade no GitHub","loading":"Carregando contribuições...","total":"{count} contribuições no último ano","day":"{count} contribuições em {date}","error":"Não foi possível atualizar agora. Tente novamente ou veja o perfil no GitHub.","less":"Menos","more":"Mais","note":"Atualiza automaticamente enquanto Contato estiver aberto. Os dados podem levar algumas horas para refletir novas contribuições.","refresh":"Atualizar","profile":"Ver perfil no GitHub"},
    lang: { label: "Idioma" },
    nav: {
      about: "Sobre",
      skills: "Habilidades",
      projects: "Projetos",
      experience: "Experiência",
      contact: "Contato",
      menu: "Abrir menu",
    },
    hero: {
      technologies: "Principais tecnologias",
      greeting: "Olá, eu sou",
      role: "Engenheiro de Software",
      tagline: "Desenvolvo soluções de software para jogos, de sistemas e interfaces a ferramentas e persistência de dados, com foco em arquitetura, usabilidade e performance.",
      available: "Aberto a vagas remotas",
      ctaProjects: "Ver projetos",
      ctaCv: "Baixar CV",
    },
    about: {
      title: "Sobre mim",
      p1: "Sou Engenheiro de Software e Desenvolvedor Unity, com experiência em projetos comerciais para PC, dispositivos móveis e web. Atuo principalmente com C# e Unity, desenvolvendo sistemas, interfaces e ferramentas internas.",
      p2: "Minha atuação abrange arquitetura de software, geração procedural, pathfinding, inteligência artificial para personagens não jogáveis (NPCs), integração de tecnologias e otimização de performance. Valorizo a colaboração entre áreas e a construção de soluções que conciliem qualidade técnica, necessidades de design e experiência do jogador.",
      p3: "Sou formado em Design Digital e também atuei como instrutor de programação e desenvolvimento de jogos, experiência que contribuiu para aprimorar minha comunicação e desenvolver habilidades de liderança. Tenho forte comprometimento com minha carreira no mercado de jogos e busco evoluir continuamente, unindo aprendizado, colaboração e qualidade técnica em cada projeto.",
    },
    skills: { title: "Habilidades" },
    projects: {
      title: "Projetos",
      add: "Adicionar projeto: {name}", type: "Tipo", studio: "Est\u00fadio / Equipe", status: "Estado", unspecified: "PROVISORIO", noLink: "Indispon\u00edvel",
      subtitle: "Jogos em que trabalhei e as principais competências aplicadas em cada projeto.",
      empty: "Nenhum projeto nesta categoria ainda.",
      featured: "Destaque",
    },
    experience: {
      title: "Experiência",
      more: "Histórico completo, formação e cursos estão no meu currículo.",
      cv: "Baixar currículo (PDF)",
    },
    contact: {
      title: "Contato",
      location: "Osasco, São Paulo, Brasil",
      headline: "Vamos trabalhar juntos?",
      text: "Tem um projeto em mente ou uma oportunidade na sua equipe? Envie um e-mail e vamos conversar sobre o que podemos construir juntos.",
      cta: "Enviar e-mail",
      cv: "Baixar CV (PDF)",
    },
    footer: { text: "Feito à mão com HTML, CSS e JavaScript." },
  },

  en: {
    meta: {
      title: "{name} | Software Engineer · Unity / C#",
      description: "Portfolio of {name}, Software Engineer and Unity Developer focused on gameplay systems, tooling and performance.",
    },
    ide: { accept: "Accept", suggestion: "Autocomplete suggestion", explorer: "Explorer", files: "Portfolio sections", hint: "Explore the files to discover my work.", skip: "Skip to content", ready: "Ready", editing: "Editing…", completion: "✦ Suggestion · auto-completing" },
    files: { about: "about.cs", skills: "skills.cs", projects: "projects.cs", contact: "contact.cs" },
    github: {"title":"GitHub activity","loading":"Loading contributions...","total":"{count} contributions in the last year","day":"{count} contributions on {date}","error":"Unable to update right now. Try again or view the GitHub profile.","less":"Less","more":"More","note":"Updates automatically while Contact is open. New contributions may take a few hours to appear.","refresh":"Refresh","profile":"View GitHub profile"},
    lang: { label: "Language" },
    nav: {
      about: "About",
      skills: "Skills",
      projects: "Projects",
      experience: "Experience",
      contact: "Contact",
      menu: "Open menu",
    },
    hero: {
      technologies: "Core technologies",
      greeting: "Hi, I'm",
      role: "Software Engineer",
      tagline: "I develop software solutions for games, from systems and interfaces to tools and data persistence, with a focus on architecture, usability and performance.",
      available: "Open to remote roles",
      ctaProjects: "View projects",
      ctaCv: "Download résumé",
    },
    about: {
      title: "About me",
      p1: "I am a Software Engineer and Unity Developer with experience in commercial projects for PC, mobile and web. I work primarily with C# and Unity, developing systems, interfaces and internal tools.",
      p2: "My work spans software architecture, procedural generation, pathfinding, artificial intelligence for non-player characters (NPCs), technology integration and performance optimization. I value cross-disciplinary collaboration and solutions that balance technical quality, design requirements and the player experience.",
      p3: "I hold a bachelor’s degree in Digital Design and have also taught programming and game development, which helped me improve my communication and develop leadership skills. I am deeply committed to a career in the games industry and to continuous professional growth, bringing learning, collaboration and technical quality to every project.",
    },
    skills: { title: "Skills" },
    projects: {
      title: "Projects",
      add: "Add Project: {name}", type: "Type", studio: "Studio / Team", status: "Status", unspecified: "PROVISORIO", noLink: "Unavailable",
      subtitle: "Games I've worked on and the key skills applied to each project.",
      empty: "No projects in this category yet.",
      featured: "Featured",
    },
    experience: {
      title: "Experience",
      more: "Full history, education and training are in my résumé.",
      cv: "Download résumé (PDF)",
    },
    contact: {
      title: "Contact",
      location: "Osasco, São Paulo, Brazil",
      headline: "Let's work together",
      text: "Have a project in mind or an opportunity on your team? Send me an email and let's explore what we could build together.",
      cta: "Send an email",
      cv: "Download résumé (PDF)",
    },
    footer: { text: "Handmade with HTML, CSS and JavaScript." },
  },
};

const I18n = (() => {
  const SUPPORTED = Object.keys(TRANSLATIONS);
  const DEFAULT = "pt-BR";
  const STORAGE_KEY = "portfolio-lang";
  const listeners = [];
  const beforeListeners = [];
  let current = DEFAULT;

  function detect() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (SUPPORTED.includes(saved)) return saved;
    } catch {}
    const preferred = navigator.languages?.find(lang => typeof lang === "string" && lang.trim()) || navigator.language || DEFAULT;
    const browser = preferred.trim().toLowerCase();
    return browser.startsWith("pt") ? "pt-BR" : browser ? "en" : DEFAULT;
  }

  function t(key, vars = {}) {
    const value = key.split(".").reduce((obj, k) => obj?.[k], TRANSLATIONS[current]);
    if (typeof value !== "string") return key;
    return value.replace(/\{(\w+)\}/g, (_, v) => vars[v] ?? `{${v}}`);
  }

  function pick(value) {
    if (value && typeof value === "object") return value[current] ?? value[DEFAULT];
    return value;
  }

  function apply() {
    beforeListeners.forEach(fn => fn());
    document.documentElement.lang = current;

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      el.textContent = t(el.dataset.i18n);
    });

    document.querySelectorAll("[data-i18n-attr]").forEach((el) => {
      el.dataset.i18nAttr.split(";").forEach((pair) => {
        const [attr, key] = pair.split(":").map((s) => s.trim());
        el.setAttribute(attr, t(key));
      });
    });

    document.querySelectorAll("[data-lang]").forEach((btn) => {
      btn.setAttribute("aria-pressed", String(btn.dataset.lang === current));
    });

    const name = PORTFOLIO.profile.name;
    document.title = t("meta.title", { name });
    document.querySelector('meta[name="description"]').setAttribute("content", t("meta.description", { name }));

    listeners.forEach((fn) => fn(current));
  }

  function set(lang) {
    if (!SUPPORTED.includes(lang)) return;
    current = lang;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {}
    apply();
  }

  function init() {
    current = detect();
    document.querySelectorAll("[data-lang]").forEach((btn) => {
      btn.addEventListener("click", () => set(btn.dataset.lang));
    });
    apply();
  }

  return { init, set, t, pick, onBeforeChange: (fn) => beforeListeners.push(fn), onChange: (fn) => listeners.push(fn), get lang() { return current; } };
})();
