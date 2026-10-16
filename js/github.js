/* Public contribution calendar. No credentials are shipped to the browser. */
const GitHubActivity = (() => {
  const interval = 5 * 60 * 1000;
  let days = null;
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
      months.style.gridTemplateColumns = `repeat(${Math.ceil((days.length + offset) / 7)},10px)`;
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
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);
    try {
      const username = encodeURIComponent(PORTFOLIO.profile.github);
      const response = await fetch(`https://gh-calendar.rschristian.dev/user/${username}`,
        {signal: controller.signal, credentials: 'omit'});
      if (!response.ok) throw new Error('Calendar request failed');
      const data = await response.json();
      if (!Array.isArray(data.contributions) || !data.contributions.length) throw new Error('Empty calendar');
      // This endpoint returns weeks and intensity strings; normalize before rendering.
      const contributions = data.contributions.flat().map(day => ({
        date: day?.date, count: day?.count, level: Number(day?.intensity),
      }));
      const valid = contributions.length > 0 && contributions.every(day => /^\d{4}-\d{2}-\d{2}$/.test(day.date) &&
        Number.isFinite(Date.parse(day.date)) && Number.isInteger(day.count) && day.count >= 0 &&
        Number.isInteger(day.level) && day.level >= 0 && day.level <= 4);
      if (!valid) throw new Error('Invalid calendar');
      const sum = contributions.reduce((total, day) => total + day.count, 0);
      if (!Number.isInteger(data.total) || data.total !== sum) throw new Error('Inconsistent calendar total');
      days = contributions.sort((a, b) => a.date.localeCompare(b.date));
      failed = false;
    } catch {
      failed = true;
    } finally {
      clearTimeout(timeout);
      pending = false;
      render();
    }
  }

  function refreshWhenVisible() {
    if (document.visibilityState === 'visible' && activeView === 'contact') refresh();
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
