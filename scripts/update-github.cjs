const fs = require('node:fs');
(async () => {
  const username = 'filipecamargo92';
  const response = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`, {signal: AbortSignal.timeout(20000)});
  if (!response.ok) throw new Error(`Calendar HTTP ${response.status}`);
  const data = await response.json();
  if (!Array.isArray(data.contributions) || !data.contributions.length || !data.contributions.every(day =>
    /^\d{4}-\d{2}-\d{2}$/.test(day.date) && Number.isInteger(day.count) && day.count >= 0 &&
    Number.isInteger(day.level) && day.level >= 0 && day.level <= 4)) throw new Error('Invalid contribution calendar');
  fs.mkdirSync('assets/data', {recursive: true});
  fs.writeFileSync('assets/data/github-contributions.json', JSON.stringify({updatedAt: new Date().toISOString(), contributions: data.contributions}) + '\n');
})().catch(error => { console.error(error); process.exitCode = 1; });
