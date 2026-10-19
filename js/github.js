/* Public contribution calendar. No credentials are shipped to the browser. */
const GitHubActivity = (() => {
  const interval = 5 * 60 * 1000;
  const cacheKey = 'portfolio-github-calendar-' + PORTFOLIO.profile.github;
  let days = null;
  function normalize(data) {
    if (!Array.isArray(data.contributions) || !data.contributions.length) throw new Error('Empty calendar');
    const result = data.contributions.flat().map(day => ({
      date: day?.date, count: day?.count, level: Number(day?.intensity ?? day?.level),
    }));
    if (!result.every(day => /^\d{4}-\d{2}-\d{2}$/.test(day.date) &&
      Number.isFinite(Date.parse(day.date)) && Number.isInteger(day.count) && day.count >= 0 &&
      Number.isInteger(day.level) && day.level >= 0 && day.level <= 4)) throw new Error('Invalid calendar');
    return result.sort((a,b) => a.date.localeCompare(b.date));
  }
  try {
    const cached = JSON.parse(localStorage.getItem(cacheKey));
    if (cached) days = normalize({contributions: cached});
  } catch { /* Storage may be unavailable or contain an older format. */ }
  let lastAttempt = 0;
  let pending = false;
  let failed = false;
  let host;
  let timer;

  function render() {
    if (!host) return;
    const total = days?.reduce((sum, day) => sum + day.count, 0);
    const status = h('p', { class: 'github-status', role: 'status' },
      failed ? I18n.t('github.error') : days ? I18n.t('github.total', {count: total}) : I18n.t('github.loading'));
    const content = [
      h('div', {class: 'github-header'},
        h('button', {type: 'button', class: 'github-refresh', onclick: () => refresh(true),
          ...(pending ? {disabled: ''} : {})}, I18n.t('github.refresh')),
        h('h3', {id: 'github-heading'}, I18n.t('github.title'))),
      status,
    ];
    if (days) {
      const grid = h('div', {class: 'github-grid', 'aria-hidden': 'true'});
      const months = h('div', {class: 'github-months', 'aria-hidden': 'true'});
      const first = new Date(days[0].date + 'T00:00:00Z');
      const offset = first.getUTCDay();
      months.style.gridTemplateColumns = `repeat(${Math.ceil((days.length + offset) / 7)},${host.closest('#panel-about') ? 4 : 10}px)`;
      for (let i = 0; i < offset; i++) grid.append(h('span', {class: 'github-cell is-blank'}));
      let lastMonth = '';
      const monthFormat = new Intl.DateTimeFormat(I18n.lang, {month: 'short', timeZone: 'UTC'});
      const dateFormat = new Intl.DateTimeFormat(I18n.lang, {dateStyle: 'medium', timeZone: 'UTC'});
      days.forEach((day, index) => {
        const date = new Date(day.date + 'T00:00:00Z');
        const month = day.date.slice(0, 7);
        const column = Math.floor((index + offset) / 7) + 1;
        if (month !== lastMonth) {
          const label = h('span', {}, monthFormat.format(date));
          label.style.gridColumn = String(column);
          months.append(label);
          lastMonth = month;
        }
        grid.append(h('span', {
          class: 'github-cell level-' + day.level,
          title: I18n.t('github.day', {count: day.count, date: dateFormat.format(date)}),
        }));
      });
      const scroll = h('div', {class: 'github-calendar-scroll', tabindex: '0',
        role: 'img', 'aria-label': I18n.t('github.total', {count: total})}, months, grid);
      content.push(scroll,
        h('div', {class: 'github-legend', 'aria-hidden': 'true'},
          h('span', {}, I18n.t('github.less')),
          ...[0, 1, 2, 3, 4].map(level => h('span', {class: 'github-cell level-' + level})),
          h('span', {}, I18n.t('github.more'))));
    }
    host.replaceChildren(...content);
  }

  async function refresh(force = false) {
    if (!host || pending || (!force && lastAttempt && Date.now() - lastAttempt < interval)) return;
    pending = true;
    lastAttempt = Date.now();
    render();
    // Same-origin snapshot keeps the calendar usable when external requests are blocked.
    if (!days) {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 4000);
      try {
        const response = await fetch('assets/data/github-contributions.json', {signal: controller.signal, cache: 'no-cache'});
        if (response.ok) { days = normalize(await response.json()); render(); }
      } catch (error) { console.warn('Local contribution calendar unavailable:', error); }
      finally { clearTimeout(timeout); }
    }
    const username = encodeURIComponent(PORTFOLIO.profile.github);
    const sources = [
      'https://gh-calendar.rschristian.dev/user/' + username,
      'https://github-contributions-api.jogruber.de/v4/' + username + '?y=last',
    ];
    try {
      let updated = null;
      for (const url of sources) {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 8000);
        try {
          const response = await fetch(url, {signal: controller.signal, credentials: 'omit'});
          if (!response.ok) throw new Error('HTTP ' + response.status);
          updated = normalize(await response.json());
          break;
        } catch (error) {
          console.warn('GitHub calendar source unavailable:', url, error);
        } finally {
          clearTimeout(timeout);
        }
      }
      if (!updated) throw new Error('All calendar sources unavailable');
      days = updated;
      failed = false;
      try { localStorage.setItem(cacheKey, JSON.stringify(days)); } catch { /* Optional cache. */ }
    } catch {
      failed = !days;
    } finally {
      pending = false;
      render();
    }
  }

  function refreshWhenVisible() {
    if (document.visibilityState === 'visible' && activeView === 'about') refresh();
  }

  function init() {
    host = document.querySelector('#github-activity');
    if (!host) return;
    render();
    I18n.onChange(render);
    document.addEventListener('visibilitychange', refreshWhenVisible);
    window.addEventListener('focus', refreshWhenVisible);
    timer = setInterval(refreshWhenVisible, interval);
    window.addEventListener('pagehide', () => clearInterval(timer));
    window.addEventListener('pageshow', event => {
      if (event.persisted) { timer = setInterval(refreshWhenVisible, interval); refreshWhenVisible(); }
    });
  }

  return {init, refresh};
})();
