// ── Scroll Reveal ──
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ── Counter animation ──
function animateCounter(el, target, suffix='') {
  let start = 0, duration = 1800;
  const step = ts => {
    if (!step.startTime) step.startTime = ts;
    const progress = Math.min((ts - step.startTime) / duration, 1);
    const val = Math.floor(progress * target);
    el.textContent = val.toLocaleString('fr') + suffix;
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target.toLocaleString('fr') + suffix;
  };
  requestAnimationFrame(step);
}
const subsEl = document.getElementById('subs');
const heroObs = new IntersectionObserver(entries => {
  if(entries[0].isIntersecting) { animateCounter(subsEl, 1200, '+'); heroObs.disconnect(); }
});
heroObs.observe(subsEl);

// ── Smooth scroll for nav ──
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior:'smooth', block:'start' }); }
  });
});
