const $ = (sel) => document.querySelector(sel);

function h(tag, attrs = {}, ...children) {
  const el = document.createElement(tag);
  Object.entries(attrs).forEach(([k, v]) => {
    if (v == null) return;
    if (k === "class") el.className = v;
    else if (k.startsWith("on")) el.addEventListener(k.slice(2), v);
    else el.setAttribute(k, v);
  });
  children.flat().forEach((c) => c != null && el.append(c));
  return el;
}

const state = { filter: "all" };

function renderProfile() {
  const { profile } = PORTFOLIO;
  document.querySelectorAll("[data-profile]").forEach((el) => {
    el.textContent = profile[el.dataset.profile] ?? "";
  });
  $("#contact-email").href = `mailto:${profile.email}`;
}

function renderStats() {
  $("#stats").replaceChildren(
    ...PORTFOLIO.stats.map((s) =>
      h("li", { class: "stat reveal" },
        h("span", { class: "stat__value" }, s.value),
        h("span", { class: "stat__label" }, I18n.pick(s.label)))
    )
  );
}

function renderSkills() {
  $("#skills-grid").replaceChildren(
    ...PORTFOLIO.skills.map((group) =>
      h("article", { class: "skill-card reveal" },
        h("div", { class: "skill-card__header", "data-icon-file": group.iconFile },
          h("div", { class: "skill-card__icon", "aria-hidden": "true" }, group.icon),
          h("h3", {}, I18n.pick(group.title))),
        h("ul", { class: "tags" }, group.items.map((item) => h("li", { class: "tag" }, I18n.pick(item)))))
    )
  );
}

function renderFilters() {
  $("#project-filters").replaceChildren(
    ...PORTFOLIO.projectCategories.map((cat) =>
      h("button", {
        type: "button",
        role: "tab",
        class: "filter",
        "aria-selected": String(state.filter === cat.id),
        onclick: () => {
          if ($(".editor").getAttribute("aria-busy") === "true") settleView();
          state.filter = cat.id;
          renderFilters();
          renderProjects();
        },
      }, I18n.pick(cat.label))
    )
  );
}

function projectCover(project) {
  if (project.image) {
    return h("img", { class: "project__img", src: project.image, alt: project.title, loading: "lazy" });
  }
  const initials = project.title.split(/\s+/).map((w) => w[0]).join("").slice(0, 3).toUpperCase();
  return h("div", { class: "project__placeholder", "aria-hidden": "true" }, initials);
}

function renderProjects() {
  const list = PORTFOLIO.projects.filter((p) => state.filter === "all" || p.category === state.filter);
  const grid = $("#projects-grid");

  if (!list.length) {
    grid.replaceChildren(h("p", { class: "projects__empty" }, I18n.t("projects.empty")));
    return;
  }

  const cards = list.map((p) => {
      const category = PORTFOLIO.projectCategories.find((c) => c.id === p.category);
      const detail = (label, value) => h('div', {}, h('dt', {}, label), h('dd', {}, value));
      return h('article', {class: 'project reveal is-visible', 'data-project-title': p.title},
        h('div', {class: 'project__cover'}, projectCover(p),
          p.featured ? h('span', {class: 'project__badge mono'}, '\u2605 ' + I18n.t('projects.featured')) : null),
        h('div', {class: 'project__body'},
          h(state.filter === 'all' ? 'h4' : 'h3', {class: 'project__title'}, p.title),
          h('p', {class: 'project__role mono'}, I18n.pick(p.role) || I18n.t('projects.unspecified')),
          h('dl', {class: 'project__details'},
            detail(I18n.t('projects.type'), category ? I18n.pick(category.label) : I18n.t('projects.unspecified')),
            detail(I18n.t('projects.studio'), I18n.pick(p.studio) || I18n.t('projects.unspecified')),
            detail(I18n.t('projects.status'), I18n.pick(p.status) || I18n.t('projects.unspecified'))),
          h('ul', {class: 'tags'}, p.tags.map(tag => h('li', {class: 'tag'}, I18n.pick(tag)))),
          p.links.length ? h('div', {class: 'project__links'}, p.links.map(link =>
            h('a', {href: link.url, target: '_blank', rel: 'noopener'}, I18n.pick(link.label) + ' \u2197'))) :
            h('p', {class: 'project__unavailable'}, I18n.t('projects.noLink'))));
    });
  const grouped = state.filter === 'all';
  grid.classList.toggle('projects--grouped', grouped);
  if (!grouped) { grid.replaceChildren(...cards); return; }
  const content = [];
  const desktopRows = [];
  const mobileRows = [];
  for (const category of PORTFOLIO.projectCategories.filter(category => category.id !== 'all')) {
    const matches = list.map((project, index) => ({project, card:cards[index]}))
      .filter(entry => entry.project.category === category.id);
    if (!matches.length) continue;
    content.push(h('h3', {class:'project-group-title'}, I18n.pick(category.label)), ...matches.map(entry => entry.card));
    desktopRows.push('auto', 'repeat(' + Math.ceil(matches.length / 2) + ', minmax(0,1fr))');
    mobileRows.push('auto', 'repeat(' + matches.length + ', minmax(0,1fr))');
  }
  grid.style.setProperty('--project-group-rows', desktopRows.join(' '));
  grid.style.setProperty('--project-group-rows-mobile', mobileRows.join(' '));
  grid.replaceChildren(...content);
}

function renderCvLinks() {
  const href = I18n.pick(PORTFOLIO.profile.cv);
  document.querySelectorAll("[data-cv]").forEach((a) => a.setAttribute("href", href));
}

function renderSocials() {
  $("#socials").replaceChildren(
    ...PORTFOLIO.socials.map((s) =>
      h("li", {}, h("a", { class: "btn btn--ghost social-button", href: s.url, target: "_blank", rel: "noopener" }, s.name))
    )
  );
}

function renderAll() {
  renderStats();
  renderSkills();
  renderFilters();
  renderProjects();
  renderCvLinks();
  observeReveals();
}

let revealObserver;
function observeReveals() {
  if (!("IntersectionObserver" in window)) {
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible"));
    return;
  }
  revealObserver ??= new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("is-visible");
        revealObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll(".reveal:not(.is-visible)").forEach((el) => revealObserver.observe(el));
}


const views = ['about', 'skills', 'projects', 'contact'];
// A visit lasts for this browser tab, including reloads; languages have separate history.
const animationStorageKey = 'portfolio-played-animations-v1';
const playedAnimations = new Set();
try {
  const saved = JSON.parse(sessionStorage.getItem(animationStorageKey) || '[]');
  if (Array.isArray(saved)) saved.filter(key => typeof key === 'string').forEach(key => playedAnimations.add(key));
} catch {}
function rememberAnimation(key) {
  playedAnimations.add(key);
  try { sessionStorage.setItem(animationStorageKey, JSON.stringify([...playedAnimations])); } catch {}
}
let activeView = 'about';
let transitionVersion = 0;
let restoreDocument = () => {};
// Source races ahead; suggestion reading and mouse movement keep independent timing.
const typingSpeed = { chunk: 8, interval: 16 };
const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

function updateChrome() {
  document.querySelectorAll('[data-view]').forEach(button => {
    const selected = button.dataset.view === activeView;
    button.classList.toggle('is-active', selected);
    if (button.getAttribute('role') === 'tab') {
      button.setAttribute('aria-selected', String(selected));
      button.tabIndex = selected ? 0 : -1;
    } else if (button.tagName === 'BUTTON') {
      if (selected) button.setAttribute('aria-current', 'page');
      else button.removeAttribute('aria-current');
    }
  });
  $('#current-file').textContent = I18n.t('files.' + activeView);
  $('#document-label').textContent = I18n.t('nav.' + activeView);
}

function settleView() {
  transitionVersion++;
  restoreDocument();
  restoreDocument = () => {};
  views.forEach(id => { $('#panel-' + id).hidden = id !== activeView; });
  $('#typing-buffer').hidden = true;
  $('#completion-label').hidden = true;
  $('.editor').setAttribute('aria-busy', 'false');
  $('#editor-status').textContent = I18n.t('ide.ready');
  updateChrome();
}

// Display-only API shortcuts for ready-made widgets; full HTML/CSS for other parts.
function simulatedSource(element, markup, index) {
  const literal = value => JSON.stringify(String(value));
  if (element.matches('.github-activity')) {
    return 'Import.GitHub(' + literal(PORTFOLIO.profile.github) + ');';
  }
  if (element.matches('.technology-tile')) {
    return 'Import.Technology(' + literal(element.dataset.technology) + ');';
  }
  if (element.matches('[data-cv]')) {
    return 'Import.Curriculum(' + literal(I18n.lang) + ');';
  }
  if (element.matches('.stat')) {
    const value = element.querySelector('.stat__value').textContent;
    const label = element.querySelector('.stat__label').textContent;
    return 'Stats.Add(' + literal(value) + ', ' + literal(label) + ');';
  }
  if (element.matches('.skill-card .tag')) {
    return 'Import.Skill(' + literal(element.textContent) + ');';
  }
  const isSkillHeader = element.matches('.skill-card__header');
  const styledElement = isSkillHeader ? element.closest('.skill-card') : element;
  if (isSkillHeader) {
    const icon = h('img', { src: 'assets/icons/' + element.dataset.iconFile });
    const title = h('h3', {}, element.querySelector('h3').textContent);
    markup = '<article class="skill-card">' + icon.outerHTML + title.outerHTML + '<ul class="tags"></ul></article>';
  }
  // Only show attributes that explain the component, not accessibility/runtime metadata.
  const template = document.createElement('template');
  template.innerHTML = markup;
  template.content.querySelectorAll('.cursor').forEach(node => node.remove());
  for (const node of template.content.querySelectorAll('*')) {
    for (const attribute of [...node.attributes]) {
      if (!['class', 'src', 'href'].includes(attribute.name)) node.removeAttribute(attribute.name);
    }
    if (node.hasAttribute('class')) {
      const classes = [...node.classList].filter(name => !['reveal', 'is-visible', 'mono', 'accent'].includes(name));
      if (classes.length) node.className = classes.join(' ');
      else node.removeAttribute('class');
    }
  }
  markup = template.innerHTML.trim();
  const style = window.getComputedStyle(styledElement);
  const className = [...styledElement.classList].find(name => !['reveal', 'is-visible'].includes(name));
  const selector = className ? '.' + className : element.localName;
  const properties = isSkillHeader ? ['padding', 'background-color', 'border-radius'] :
    element.matches('h1, h2, h3') ? ['font-size', 'font-weight', 'color'] : ['font-size', 'line-height', 'color'];
  const declarations = properties
    .map(property => [property, style.getPropertyValue(property).trim()])
    .filter(([, value]) => value && value !== 'rgba(0, 0, 0, 0)' && value !== 'transparent')
    .map(([property, value]) => {
      const compact = value.replace(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/g,
        (_, r, g, b) => '#' + [r, g, b].map(channel => Number(channel).toString(16).padStart(2, '0')).join(''));
      return property + ': ' + compact + ';';
    }).join(' ');
  const html = markup.replace(/><(?=(?:img|h[1-6]|ul|p)\b)/g, '>\n  <')
    .replace(/><\/article>/g, '>\n</article>').split('\n').map(line => '    ' + line).join('\n');
  // A longer delimiter also supports content that happens to contain triple quotes.
  const quotes = Math.max(3, ...[...markup.matchAll(/"+/g)].map(match => match[0].length + 1));
  const delimiter = '"'.repeat(quotes);
  return 'var component' + (index + 1) + ' = new\n{\n' +
    '    Html = ' + delimiter + '\n' + html + '\n    ' + delimiter + ',\n' +
    '    Css = ' + delimiter + '\n    ' + selector + ' { ' + declarations +
    ' }\n    ' + delimiter + '\n};';
}

async function selectView(id, restart = false, fromEmpty = false) {
  if (!views.includes(id) || (id === activeView && !restart)) return;
  // Every navigation cancels the previous animation. No stale content can reappear.
  const buffer = $('#typing-buffer');
  const previous = fromEmpty ? '' : (buffer.hidden ? $('#panel-' + activeView).innerText : buffer.textContent);
  activeView = id;
  if (id === "contact") GitHubActivity.refresh();
  settleView();
  history.replaceState(null, '', '#' + id);
  $('#editor-scroll').scrollTop = 0;
  const animationKey = I18n.lang + ":" + id;
  if (motionQuery.matches || playedAnimations.has(animationKey)) return;
  const version = transitionVersion;
  const current = () => version === transitionVersion;
  const target = $('#panel-' + id);
  target.hidden = true;
  buffer.hidden = false;
  $('.editor').setAttribute('aria-busy', 'true');
  $('#editor-status').textContent = I18n.t('ide.editing');
  buffer.classList.add('is-erasing');
  for (let step = 0; previous && step <= 9; step++) {
    if (!current()) return;
    buffer.textContent = previous.slice(0, Math.floor(previous.length * (1 - step / 9)));
    await delay(9);
  }
  buffer.classList.remove('is-erasing');
  buffer.hidden = true;

  // Each formatted part types its complete source in its own layout slot.
  // Original nodes stay intact, preserving links, handlers and translated markup.
  const units = [];
  const collect = parent => {
    for (const element of parent.children) {
      if (element.matches('.project, .technology-tile, .github-activity, .skill-card__header, .about-copy, h1, h2, h3, p, a, button, img, .skill-card__icon, .project__placeholder, .stat, .tag') || !element.children.length) {
        const clone = element.cloneNode(true);
        for (const node of [clone, ...clone.querySelectorAll('*')]) {
          for (const attribute of [...node.attributes]) {
            if (attribute.name.startsWith('data-')) node.removeAttribute(attribute.name);
          }
        }
        const project = element.matches('.project');
        const code = h(project ? 'div' : element.localName === 'img' ? 'div' : element.localName,
          {class: project ? 'project-slot typing-pending' : element.className + ' is-code-unit typing-pending', 'aria-hidden': 'true'});
        units.push({element, code, source: project ? '' : simulatedSource(element, clone.outerHTML, units.length), text: element.textContent});
      } else collect(element);
    }
  };
  collect(target);
  const cursor = h('span', { class: 'typing-caret', 'aria-hidden': 'true' }, '_');
  let ghost;
  let suggestion;
  let simulatedMouse;
  let mouseAnimation;
  restoreDocument = () => {
    for (const { element, code } of units) if (code.parentNode) code.replaceWith(element);
    cursor.remove();
    ghost?.remove();
    suggestion?.remove();
    mouseAnimation?.cancel();
    simulatedMouse?.remove();
  };
  for (const { element, code } of units) element.replaceWith(code);
  target.hidden = false;
  for (const { element, code, source, text } of units) {
    if (!current()) return;
    code.classList.remove('typing-pending');
    if (element.matches('.project')) {
      const rect = code.getBoundingClientRect();
      const x = Math.max(12, Math.min(rect.left + 26, window.innerWidth - 300));
      const y = Math.max(12, Math.min(rect.top + 26, window.innerHeight - 90));
      simulatedMouse = h('span', {class: 'simulated-mouse', 'aria-hidden': 'true'});
      document.body.append(simulatedMouse);
      const corners = [[8,8], [window.innerWidth-27,8], [8,window.innerHeight-33], [window.innerWidth-27,window.innerHeight-33]];
      const [startX,startY] = corners[Math.floor(Math.random()*4)];
      mouseAnimation = simulatedMouse.animate([
        {transform: 'translate('+startX+'px,'+startY+'px)'},
        {transform: 'translate('+x+'px,'+y+'px)'},
      ], {duration:550,fill:'forwards',easing:'ease-out'});
      await mouseAnimation.finished.catch(() => {});
      if (!current()) return;
      simulatedMouse.classList.add('is-right-clicking');
      code.classList.add('is-context-target');
      await delay(180);
      if (!current()) return;
      const item = h('span', {class:'project-menu-item'}, I18n.t('projects.add', {name:element.dataset.projectTitle}));
      suggestion = h('div', {class:'project-context-menu', 'aria-hidden':'true'}, item);
      suggestion.style.left = x+'px';
      suggestion.style.top = y+'px';
      document.body.append(suggestion);
      simulatedMouse.classList.remove('is-right-clicking');
      const menuRect = item.getBoundingClientRect();
      mouseAnimation.cancel();
      mouseAnimation = simulatedMouse.animate([
        {transform:'translate('+x+'px,'+y+'px)'},
        {transform:'translate('+(menuRect.left+menuRect.width/2)+'px,'+(menuRect.top+menuRect.height/2)+'px)'},
      ], {duration:350,fill:'forwards',easing:'ease-out'});
      await mouseAnimation.finished.catch(() => {});
      if (!current()) return;
      suggestion.classList.add('is-accepting');
      simulatedMouse.classList.add('is-clicking');
      await delay(220);
      if (!current()) return;
      code.replaceWith(element);
      suggestion.remove();
      mouseAnimation.cancel();
      simulatedMouse.remove();
      await delay(180);
      continue;
    }
    const output = document.createTextNode('');
    code.append(output, cursor);
    const chars = Array.from(source);
    const isTagline = element.matches('.hero__tagline');
    const taglinePrefix = isTagline ? source.match(/^.*?(?:Desenvolvo soluções de software para jogos, |I develop software solutions for games, )/is)?.[0] : null;
    const prefix = taglinePrefix || source.match(/^.*?\b(?:Desenvolvedor|Developer)\s/is)?.[0];
    const contentStart = source.indexOf('>') + 1;
    const completionStart = prefix ? Array.from(prefix).length :
      Array.from(source.slice(0, contentStart)).length + 32;
    const shouldComplete = !/^(?:Import\.|Stats\.)/.test(source) && (isTagline || text.trim().length >= 160);
    for (let position = 0; position < chars.length;) {
      if (!current()) return;
      if (shouldComplete && position === completionStart) {
        ghost = h('span', { class: 'ghost-text', 'aria-hidden': 'true' }, chars.slice(position).join(''));
        cursor.before(ghost);
        const accept = h('span', { class: 'suggestion-accept' }, I18n.t('ide.accept'));
        suggestion = h('div', { class: 'suggestion-popup', 'aria-hidden': 'true' },
          h('span', {}, I18n.t('ide.suggestion')), accept);
        simulatedMouse = h('span', { class: 'simulated-mouse', 'aria-hidden': 'true' });
        document.body.append(suggestion, simulatedMouse);
        const anchor = cursor.getBoundingClientRect();
        const left = Math.max(12, Math.min(anchor.left, window.innerWidth - 270));
        const top = Math.max(12, Math.min(anchor.bottom + 10, window.innerHeight - 72));
        suggestion.style.left = left + 'px';
        suggestion.style.top = top + 'px';
        const right = Math.max(8, window.innerWidth - 27);
        const bottom = Math.max(8, window.innerHeight - 33);
        const corners = [[8, 8], [right, 8], [8, bottom], [right, bottom]];
        const [startX, startY] = corners[Math.floor(Math.random() * corners.length)];
        const button = accept.getBoundingClientRect();
        const destinationX = button.left + button.width / 2;
        const destinationY = button.top + button.height / 2;
        // One uninterrupted movement from a random screen corner to Accept.
        mouseAnimation = simulatedMouse.animate([
          { transform: 'translate(' + startX + 'px,' + startY + 'px)' },
          { transform: 'translate(' + destinationX + 'px,' + destinationY + 'px)' },
        ], { duration: 700, easing: 'cubic-bezier(.2,.6,.35,1)', fill: 'forwards' });
        await mouseAnimation.finished.catch(() => {});
        if (!current()) return;
        suggestion.classList.add('is-accepting');
        simulatedMouse.classList.add('is-clicking');
        await delay(220);
        if (!current()) return;
        ghost.remove();
        output.textContent = source;
        suggestion.remove();
        mouseAnimation.cancel();
        simulatedMouse.remove();
        break;
      }
      // Stop exactly at the suggestion boundary, even when typing in large bursts.
      const end = Math.min(chars.length, position + typingSpeed.chunk,
        shouldComplete && position < completionStart ? completionStart : chars.length);
      const burst = chars.slice(position, end).join('');
      output.textContent += burst;
      position = end;
      await delay(typingSpeed.interval);
    }
    if (!current()) return;
    cursor.remove();
    // Atomic replacement: complete code disappears only as its styled part appears.
    code.replaceWith(element);
    await delay(0);
  }
  if (current()) {
    rememberAnimation(animationKey);
    settleView();
  }
}

function setupLineNumbers() {
  const viewport = $('#editor-scroll');
  const documentArea = $('.editor-document');
  const gutter = $('.line-numbers');
  let scheduled = false;
  function update() {
    scheduled = false;
    const padding = parseFloat(getComputedStyle(documentArea).paddingTop) || 0;
    const lineHeight = parseFloat(getComputedStyle(gutter).lineHeight) || 28;
    const height = Math.max(documentArea.offsetHeight, viewport.clientHeight);
    const count = Math.max(1, Math.ceil((height - padding) / lineHeight));
    gutter.style.paddingTop = padding + 'px';
    gutter.style.height = height + 'px';
    while (gutter.children.length < count) gutter.append(h('span', {}, String(gutter.children.length + 1)));
    while (gutter.children.length > count) gutter.lastElementChild.remove();
  }
  function schedule() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(update);
  }
  if ('ResizeObserver' in window) {
    const observer = new ResizeObserver(schedule);
    observer.observe(documentArea);
    observer.observe(viewport);
  } else {
    new MutationObserver(schedule).observe(documentArea, {subtree: true, childList: true, characterData: true, attributes: true});
  }
  window.addEventListener('resize', schedule);
  schedule();
}

function setupWorkspace() {
  $('#explorer-files').replaceChildren(...views.map(id =>
    h('button', {type: 'button', class: 'explorer-file', 'data-view': id},
      h('span', {class: 'file-icon', 'aria-hidden': 'true'}, 'C#'),
      h('span', { 'data-i18n': 'files.' + id }, I18n.t('files.' + id)))));
  document.addEventListener('click', event => {
    const link = event.target.closest('[data-view], a[href="#projects"]');
    if (!link) return;
    event.preventDefault();
    selectView(link.dataset.view || 'projects');
  });
  $('.file-tabs').addEventListener('keydown', event => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    let index = views.indexOf(activeView);
    index = event.key === 'Home' ? 0 : event.key === 'End' ? views.length - 1 :
      (index + (event.key === 'ArrowRight' ? 1 : -1) + views.length) % views.length;
    $('#tab-' + views[index]).focus();
    selectView(views[index]);
  });
  window.addEventListener('hashchange', () => selectView(location.hash.slice(1)));
  motionQuery.addEventListener('change', () => { if (motionQuery.matches) settleView(); });
}

renderProfile();
renderSocials();
setupWorkspace();
setupLineNumbers();
let languageInitialized = false;
I18n.onBeforeChange(settleView);
I18n.onChange(() => {
  renderAll();
  settleView();
  selectView(activeView, true, !languageInitialized);
  languageInitialized = true;
});
GitHubActivity.init();
I18n.init();
