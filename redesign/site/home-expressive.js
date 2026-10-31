const menuButton = document.querySelector('.editorial-menu-toggle');
const navigation = document.querySelector('#editorial-nav');
const servicesButton = document.querySelector('.editorial-services-toggle');
const servicesMenu = document.querySelector('#editorial-services-menu');
const header = document.querySelector('.editorial-header');
const desktop = matchMedia('(min-width: 941px)');
function closeServices() { servicesMenu.hidden = true; servicesButton.setAttribute('aria-expanded', 'false'); }
function closeNavigation() { navigation.dataset.open = 'false'; menuButton.setAttribute('aria-expanded', 'false'); menuButton.setAttribute('aria-label', 'Otvori izbornik'); closeServices(); }
menuButton.addEventListener('click', () => { const open = menuButton.getAttribute('aria-expanded') !== 'true'; navigation.dataset.open = String(open); menuButton.setAttribute('aria-expanded', String(open)); menuButton.setAttribute('aria-label', open ? 'Zatvori izbornik' : 'Otvori izbornik'); if (!open) closeServices(); });
servicesButton.addEventListener('click', () => { const open = servicesButton.getAttribute('aria-expanded') !== 'true'; servicesButton.setAttribute('aria-expanded', String(open)); servicesMenu.hidden = !open; });
navigation.addEventListener('click', event => { if (event.target.closest('a')) closeNavigation(); });
document.addEventListener('click', event => { if (!header.contains(event.target)) closeNavigation(); });
header.addEventListener('focusout', event => { if (!header.contains(event.relatedTarget)) closeNavigation(); });
document.addEventListener('keydown', event => {
  if (event.key !== 'Escape') return;
  if (!servicesMenu.hidden) { closeServices(); servicesButton.focus(); }
  else if (navigation.dataset.open === 'true') { closeNavigation(); menuButton.focus(); }
});
desktop.addEventListener('change', closeNavigation);

// Contact submission and consent use the shared runtime in contact-live.js.

const cookieDialog = document.querySelector('#cookie-preview');
document.querySelector('.footer-cookie-button').addEventListener('click', () => cookieDialog.showModal());
cookieDialog.querySelector('.dialog-close').addEventListener('click', () => cookieDialog.close());
cookieDialog.addEventListener('keydown', event => {
  if (event.key !== 'Tab' || event.ctrlKey || event.altKey || event.metaKey) return;
  const controls = [...cookieDialog.querySelectorAll('a[href],button:not([disabled]),[tabindex="0"]')].filter(element => element.getClientRects().length);
  const first = controls[0], last = controls[controls.length - 1];
  if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
  else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
});

const motionButton = document.querySelector('.motion-toggle');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
function setMotion(reduced) { document.documentElement.classList.toggle('motion-off', reduced); motionButton.removeAttribute('aria-pressed'); motionButton.textContent = reduced ? 'Uključi animacije' : 'Smanji animacije'; }
setMotion(reducedMotion.matches);
motionButton.addEventListener('click', () => setMotion(!document.documentElement.classList.contains('motion-off')));
reducedMotion.addEventListener('change', event => setMotion(event.matches));
const revealObserver = new IntersectionObserver(entries => { for (const entry of entries) if (entry.isIntersecting) { entry.target.classList.add('revealed'); revealObserver.unobserve(entry.target); } }, { threshold: .08 });
document.querySelectorAll('.motion-reveal').forEach(element => revealObserver.observe(element));
let pointerFrame = 0;
const hero = document.querySelector('.hero-grid');
hero?.addEventListener('pointermove', event => { if (event.pointerType !== 'mouse' || document.documentElement.classList.contains('motion-off')) return; cancelAnimationFrame(pointerFrame); pointerFrame = requestAnimationFrame(() => { const box = hero.getBoundingClientRect(); hero.style.setProperty('--pointer-x', ((event.clientX - box.left) / box.width - .5) * 18); hero.style.setProperty('--pointer-y', ((event.clientY - box.top) / box.height - .5) * 18); }); });
hero?.addEventListener('pointerleave', () => { cancelAnimationFrame(pointerFrame); hero.style.setProperty('--pointer-x', 0); hero.style.setProperty('--pointer-y', 0); });
