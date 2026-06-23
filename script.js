import { capabilities, careerEntries, profile, projects, techGroups } from './portfolio-data.js';

const escapeHtml = (value) => String(value).replace(/[&<>'"]/g, (character) => ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  "'": '&#39;',
  '"': '&quot;'
})[character]);

const renderChips = (items) => items.map((item) => `<li>${escapeHtml(item)}</li>`).join('');

document.querySelector('#hero-title').textContent = profile.name;
document.querySelector('.hero-role').textContent = profile.role;
document.querySelector('.hero-summary').textContent = profile.summary;
document.querySelector('.hero-period').textContent = profile.period;

const heartLineGroup = document.querySelector('#heart-line-group');
const heartPoints = [
  [0, 172],
  [34, 172],
  [48, 164],
  [60, 179],
  [75, 170],
  [89, 172],
  [104, 172],
  [118, 164],
  [130, 178],
  [144, 172],
  [160, 172],
  [174, 168],
  [189, 177],
  [204, 172],
  [218, 172],
  [232, 165],
  [244, 179],
  [258, 170],
  [274, 172],
  [292, 172],
  [310, 160],
  [324, 182],
  [338, 170],
  [354, 172],
  [368, 172],
  [382, 164],
  [394, 179],
  [408, 171],
  [424, 172],
  [440, 172],
  [454, 168],
  [469, 177],
  [484, 172],
  [498, 172],
  [512, 164],
  [524, 179],
  [538, 170],
  [554, 172],
  [570, 172],
  [584, 162],
  [598, 180],
  [612, 171],
  [640, 172]
];

const buildHeartLineMarkup = () => heartPoints.slice(1).map((point, index) => {
  const [x1, y1] = heartPoints[index];
  const [x2, y2] = point;
  const isDescending = y2 < y1;
  const lineClass = isDescending ? 'heart-line heart-line--dim' : 'heart-line heart-line--bright';

  return `
    <polyline
      class="${lineClass}"
      points="${x1},${y1} ${x2},${y2}"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
    />`;
}).join('');

if (heartLineGroup) {
  heartLineGroup.innerHTML = buildHeartLineMarkup();
}

document.querySelector('#capability-list').innerHTML = capabilities.map(({ icon, title, description }) => `
  <article class="capability-card">
    <span aria-hidden="true">${icon}</span>
    <h3>${escapeHtml(title)}</h3>
    <p>${escapeHtml(description)}</p>
  </article>
`).join('');

document.querySelector('#tech-groups').innerHTML = techGroups.map(({ title, items }) => `
  <article class="tech-group">
    <h3>${escapeHtml(title)}</h3>
    <ul class="chip-list">${renderChips(items)}</ul>
  </article>
`).join('');

document.querySelector('#project-list').innerHTML = projects.map(({ title, period, summary, tech }) => `
  <article class="project-card">
    <p class="card-kicker">${escapeHtml(period)}</p>
    <h3>${escapeHtml(title)}</h3>
    <p>${escapeHtml(summary)}</p>
    <ul class="chip-list">${renderChips(tech)}</ul>
  </article>
`).join('');

document.querySelector('#career-list').innerHTML = careerEntries.map(({ company, period, summary, details }) => `
  <details class="career-item">
    <summary>
      <span><strong>${escapeHtml(company)}</strong><small>${escapeHtml(period)}</small></span>
      <span class="career-toggle" aria-hidden="true">+</span>
    </summary>
    <div class="career-details">
      <p>${escapeHtml(summary)}</p>
      <ul>${details.map((detail) => `<li>${escapeHtml(detail)}</li>`).join('')}</ul>
    </div>
  </details>
`).join('');

const menuToggle = document.querySelector('#menu-toggle');
const siteMenu = document.querySelector('#site-menu');
const menuLinks = siteMenu.querySelectorAll('a');

menuToggle.addEventListener('click', () => {
  const willOpen = !siteMenu.classList.contains('is-open');
  siteMenu.classList.toggle('is-open', willOpen);
  menuToggle.setAttribute('aria-expanded', String(willOpen));
});

menuLinks.forEach((link) => {
  link.addEventListener('click', () => {
    siteMenu.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});
