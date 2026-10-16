const PORTFOLIO = {
  profile: {
    name: "Filipe de Camargo",
    initials: "FC",
    github: "filipecamargo92",
    email: "filipecamargo92@gmail.com",
    cv: {
      "pt-BR": "assets/cv/filipe-de-camargo-cv-pt.pdf",
      en: "assets/cv/filipe-de-camargo-resume-en.pdf",
    },
  },

  stats: [
    { value: "3+", label: { "pt-BR": "Anos de experiência", en: "Years of experience" } },
    { value: "7", label: { "pt-BR": "Jogos no portfólio", en: "Games in the portfolio" } },
    { value: "3", label: { "pt-BR": "Plataformas (PC, Android e WebGL)", en: "Platforms (PC, Android and WebGL)" } },
  ],

  skills: [
    {
      "title": {
        "pt-BR": "Engines & Linguagens",
        "en": "Engines & Languages"
      },
      "icon": "🎮",
      "iconFile": "enginesicon.png",
      "items": [
        "Unity",
        "C#",
        "Unreal Engine",
        "C++",
        "GameMaker",
        "GML",
        "TypeScript",
        "JavaScript",
        "Three.js",
        "PixiJS",
        "Node.js"
      ]
    },
    {
      "title": {
        "pt-BR": "Sistema de Jogos",
        "en": "Game Systems"
      },
      "icon": "🧩",
      "iconFile": "gameplayicon.png",
      "items": [
        {
          "pt-BR": "Geração procedural",
          "en": "Procedural generation"
        },
        "State Machine",
        "Pathfinding",
        "Object Pooling",
        "Multiplayer",
        {
          "pt-BR": "Inteligência Artificial",
          "en": "Artificial Intelligence"
        },
        {
          "pt-BR": "Sistemas de UI",
          "en": "UI systems"
        }
      ]
    },
    {
      "title": {
        "pt-BR": "Arquitetura de Software",
        "en": "Software Architecture"
      },
      "icon": "🏗️",
      "iconFile": "architectureicon.png",
      "items": [
        "OOP",
        "SOLID",
        "Design Patterns",
        "Event-Driven Architecture"
      ]
    },
    {
      "title": {
        "pt-BR": "Ferramentas Externas",
        "en": "External Tools"
      },
      "icon": "🛠️",
      "iconFile": "externaltoolsicon.png",
      "items": [
        "FMOD",
        "Git",
        "DOTween",
        "FEEL",
        "Spine"
      ]
    }
  ],

  projectCategories: [
    { id: "all", label: { "pt-BR": "Todos", en: "All" } },
    { id: "commercial", label: { "pt-BR": "Comercial", en: "Commercial" } },
    { id: "advergame", label: { "pt-BR": "Advergame", en: "Advergame" } },
    { id: "jam", label: { "pt-BR": "Game Jam", en: "Game Jam" } },
    { id: "indie", label: { "pt-BR": "Independente", en: "Indie" } },
  ],

  projects: [
    {
      title: "Kundara: Art of Cards",
      featured: true,
      category: "commercial",
      image: "assets/projects/kundara.jpg",
      year: { "pt-BR": "Em desenvolvimento", en: "In development" },
      status: { "pt-BR": "Em desenvolvimento", en: "In development" },
      studio: "Mikan Studio",
      role: { "pt-BR": "Engenheiro de Software", en: "Software Engineer" },
      description: {
        "pt-BR": "Roguelite de cartas para PC com combate teatral inspirado no kabuki, cartas elementais e progressão por um mapa procedural.",
        en: "PC card roguelite with theatrical, kabuki-inspired combat, elemental cards and progression across a procedural map.",
      },
      highlights: [
        {
          "pt-BR": "Projetei e implementei do zero o sistema de mapa procedural e progressão: nós gerados por regras, com caminhos ramificados e convergentes e conteúdo definido em ScriptableObjects.",
          en: "Designed and built from scratch the procedural map and progression system: rule-based nodes with branching and converging paths, driven by ScriptableObject content.",
        },
        {
          "pt-BR": "Criei ferramentas internas para QA e Game Design, como Build Modes configuráveis e um Save Editor.",
          en: "Built internal tools for QA and Game Design, such as configurable Build Modes and a Save Editor.",
        },
        {
          "pt-BR": "Fiz profiling e otimização com o Unity Profiler (update loops, object pooling, draw calls e carregamento) em cenas com centenas de objetos gerados dinamicamente.",
          en: "Profiled and optimized with Unity Profiler (update loops, object pooling, draw calls and loading) in scenes with hundreds of dynamically generated objects.",
        },
      ],
      tags: ["Unity","C#","PC",{"pt-BR":"Geração Procedural","en":"Procedural Generation"},"Object Pooling",{"pt-BR":"Inteligência Artificial","en":"Artificial Intelligence"},{"pt-BR":"Sistemas de UI","en":"UI systems"},"OOP","SOLID","Design Patterns","Event-Driven Architecture","FMOD","Git","DOTween","FEEL","Spine"],
      links: [
        { label: { "pt-BR": "Página na Steam", en: "Steam page" }, url: "https://store.steampowered.com/app/4245280/" },
      ],
    },
    {
      "title": "Coliseum Burger",
      "category": "advergame",
      "image": "assets/projects/coliseum-burger.png",
      "status": {
        "pt-BR": "Lançado",
        "en": "Released"
      },
      "studio": "Mikan Studio",
      "role": {
        "pt-BR": "Engenheiro de Software",
        "en": "Software Engineer"
      },
      "tags": [
        "Unity",
        "C#",
        "WebGL",
        "State Machine",
        "OOP",
        "Spine",
        "FMOD",
        "Git",
        "SOLID",
        "Design Patterns",
        "Event-Driven Architecture",
        {
          "pt-BR": "Inteligência Artificial",
          "en": "Artificial Intelligence"
        },
        {
          "pt-BR": "Sistemas de UI",
          "en": "UI Systems"
        }
      ],
      "links": [
        {
          "label": {
            "pt-BR": "Jogar no navegador",
            "en": "Play in browser"
          },
          "url": "https://coliseumburger.itch.io/coliseum"
        }
      ]
    },
    {
      title: "Excommunicated",
      status: { "pt-BR": "Cancelado (demo dispon\u00edvel)", en: "Cancelled (demo available)" },
      category: "commercial",
      image: "assets/projects/excommunicated.jpg",
      year: "2024",
      studio: "Tamarin Studio",
      role: { "pt-BR": "Engenheiro de Software", en: "Software Engineer" },
      description: {
        "pt-BR": "Aventura 2D de digitação: exorcize criaturas possuídas digitando palavras numa estação espacial abandonada. Chegou a ter demo pública.",
        en: "2D typing adventure: exorcise possessed creatures by typing words aboard an abandoned space station. Reached a public demo.",
      },
      highlights: [
        {
          "pt-BR": "Combate por digitação com localização: os inimigos sorteiam palavras de bancos específicos por idioma.",
          en: "Localization-aware typing combat: enemies pick battle words from language-specific word banks.",
        },
        {
          "pt-BR": "Movimentação, combate, inventário, inimigos, diálogos, câmera, save/load e áudio com FMOD.",
          en: "Movement, combat, inventory, enemies, dialogue, camera, save/load and audio with FMOD.",
        },
      ],
      tags: ["Unity","C#","PC","State Machine",{"pt-BR":"Inteligência Artificial","en":"Artificial Intelligence"},{"pt-BR":"Sistemas de UI","en":"UI systems"},"OOP","SOLID","Design Patterns","Event-Driven Architecture","FMOD","Git","DOTween"],
      links: [
        { label: { "pt-BR": "Página na Steam", en: "Steam page" }, url: "https://store.steampowered.com/app/2982570/Excommunicated/" },
      ],
    },
    {
      title: "Among Animals: Pets Rescue",
      status: { "pt-BR": "Lan\u00e7ado", en: "Released" },
      category: "commercial",
      image: "assets/projects/among-animals.png",
      year: "2023",
      studio: "Toninha Games",
      role: { "pt-BR": "Engenheiro de Software", en: "Software Engineer" },
      description: {
        "pt-BR": "Endless runner vertical para mobile, lançado na Google Play.",
        en: "Mobile vertical endless runner, released on Google Play.",
      },
      highlights: [
        {
          "pt-BR": "Implementei e mantive funcionalidades de gameplay sob direção técnica.",
          en: "Implemented and maintained gameplay features under technical direction.",
        },
      ],
      tags: ["Unity","C#","Android",{"pt-BR":"Sistemas de UI","en":"UI systems"},"OOP","Git"],
      links: [],
    },
    {
      title: "Eu, Pilho",
      studio: "Game Jam",
      status: {"pt-BR":"Lançado","en":"Released"},
      category: "jam",
      image: "assets/projects/eu-pilho.jpg",
      year: "Ctrl Alt Jam #2",
      role: { "pt-BR": "Desenvolvedor de Jogos", en: "Game Developer" },
      description: {
        "pt-BR": "Plataforma 2D de ação: uma pilha enfrenta o caos da TV para encontrar o controle remoto. Tema da jam: \"fora de controle\".",
        en: "2D action platformer: a battery fights the TV's chaos to find the remote. Jam theme: \"out of control\".",
      },
      highlights: [
        {
          "pt-BR": "Movimentação, pulo, dash e tiro; também contribuí com o Game Design.",
          en: "Movement, jumping, dashing and shooting; also contributed to Game Design.",
        },
      ],
      tags: ["Unity","C#","PC",{"pt-BR":"Sistemas de UI","en":"UI systems"},"OOP","Git",{"pt-BR":"Inteligência Artificial","en":"Artificial Intelligence"},"State Machine"],
      links: [
        { label: { "pt-BR": "Jogar no navegador", en: "Play in browser" }, url: "https://filipe-de-camargo.itch.io/eupilho" },
      ],
    },
    {
      title: "Nous",
      studio: "Game Jam",
      status: {"pt-BR":"Lançado","en":"Released"},
      category: "jam",
      image: "assets/projects/nous.png",
      year: "Ânima Impact Games",
      role: { "pt-BR": "Desenvolvedor de Jogos e Game Design", en: "Game Developer & Game Design" },
      description: {
        "pt-BR": "Puzzle de terror casual em pixel art: cumpra tarefas de casa enquanto foge dos \"demônios\" do isolamento.",
        en: "Casual pixel-art horror puzzle: finish household chores while escaping the \"demons\" of isolation.",
      },
      highlights: [
        {
          "pt-BR": "Programação de perseguição de inimigos e pathfinding.",
          en: "Programmed enemy pursuit and pathfinding.",
        },
      ],
      tags: ["Unity","C#","PC",{"pt-BR":"Sistemas de UI","en":"UI systems"},"OOP","Git",{"pt-BR":"Inteligência Artificial","en":"Artificial Intelligence"},"State Machine","Pathfinding"],
      links: [
        { label: { "pt-BR": "Ver no itch.io", en: "View on itch.io" }, url: "https://yukapu.itch.io/nous" },
      ],
    },
    {
      title: "Shattered",
      studio: "Freelance",
      status: {"pt-BR":"Lançado","en":"Released"},
      category: "indie",
      image: "assets/projects/shattered.png",
      year: "",
      role: { "pt-BR": "Desenvolvedor de Jogos", en: "Game Developer" },
      description: {
        "pt-BR": "Aventura 2D surrealista inspirada em Yume Nikki: explore os sonhos de outras pessoas em quatro mundos diferentes.",
        en: "Surreal 2D adventure inspired by Yume Nikki: explore other people's dreams across four different worlds.",
      },
      highlights: [],
      tags: ["Unity","C#","PC",{"pt-BR":"Sistemas de UI","en":"UI systems"},"OOP","Git",{"pt-BR":"Inteligência Artificial","en":"Artificial Intelligence"},"State Machine","Pathfinding"],
      links: [
        { label: { "pt-BR": "Ver no itch.io", en: "View on itch.io" }, url: "https://granai.itch.io/shattered" },
      ],
    },
  ],

  experience: [
    {
      period: { "pt-BR": "Jun 2025 — atual", en: "Jun 2025 — present" },
      role: { "pt-BR": "Engenheiro de Software Pleno · Unity / C#", en: "Mid-Level Software Engineer · Unity / C#" },
      company: "Mikan Studio",
      description: {
        "pt-BR": "Sistemas de gameplay, arquitetura e ferramentas internas para múltiplos jogos, incluindo Kundara: Art of Cards.",
        en: "Gameplay systems, architecture and internal tools across multiple games, including Kundara: Art of Cards.",
      },
    },
    {
      period: { "pt-BR": "Nov 2023 — Jun 2024", en: "Nov 2023 — Jun 2024" },
      role: { "pt-BR": "Engenheiro de Software Júnior · Unity / C#", en: "Junior Software Engineer · Unity / C#" },
      company: "Tamarin Studio",
      description: {
        "pt-BR": "Único engenheiro de software em Excommunicated, responsável pelo gameplay principal.",
        en: "Sole software engineer on Excommunicated, owning core gameplay.",
      },
    },
    {
      period: { "pt-BR": "Jul 2023 — Fev 2024", en: "Jul 2023 — Feb 2024" },
      role: { "pt-BR": "Engenheiro de Software Júnior · Unity / C#", en: "Junior Software Engineer · Unity / C#" },
      company: "Toninha Games",
      description: {
        "pt-BR": "Gameplay para Among Animals: Pets Rescue, lançado na Google Play.",
        en: "Gameplay for Among Animals: Pets Rescue, released on Google Play.",
      },
    },
    {
      period: { "pt-BR": "2022 — 2025", en: "2022 — 2025" },
      role: { "pt-BR": "Instrutor de Desenvolvimento de Jogos", en: "Game Development Instructor" },
      company: "Super Geeks & Happy",
      description: {
        "pt-BR": "Ensino de programação e Game Design para crianças e adolescentes com Unity e Unreal Engine.",
        en: "Taught programming and Game Design to kids and teens using Unity and Unreal Engine.",
      },
    },
    {
      period: { "pt-BR": "Nov 2021 — Nov 2022", en: "Nov 2021 — Nov 2022" },
      role: { "pt-BR": "Desenvolvedor de Jogos Independente", en: "Independent Game Developer" },
      company: { "pt-BR": "Game jams e projetos independentes", en: "Game jams & indie projects" },
      description: {
        "pt-BR": "Projetos em Unity com equipes pequenas, como Eu, Pilho e Nous.",
        en: "Unity projects with small teams, such as Eu, Pilho and Nous.",
      },
    },
  ],

  socials: [
    { name: "LinkedIn", url: "https://www.linkedin.com/in/filipe-de-camargo/" },
    { name: "GitHub", url: "https://github.com/filipecamargo92" },
    { name: "itch.io", url: "https://filipe-de-camargo.itch.io/" },
  ],
};
