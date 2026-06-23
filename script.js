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
