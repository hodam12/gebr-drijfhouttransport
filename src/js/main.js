document.getElementById('year').textContent = new Date().getFullYear();

const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');

navToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

mainNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');
let lastFocused = null;

function openLightbox(src, alt) {
  lastFocused = document.activeElement;
  lightboxImg.src = src;
  lightboxImg.alt = alt;
  lightbox.hidden = false;
  lightboxClose.focus();
  document.addEventListener('keydown', onKeydown);
}

function closeLightbox() {
  lightbox.hidden = true;
  lightboxImg.src = '';
  document.removeEventListener('keydown', onKeydown);
  if (lastFocused) lastFocused.focus();
}

function onKeydown(e) {
  if (e.key === 'Escape') closeLightbox();
}

document.querySelectorAll('.gallery-item').forEach((btn) => {
  btn.addEventListener('click', () => {
    const img = btn.querySelector('img');
    openLightbox(btn.dataset.full, img ? img.alt : '');
  });
});

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

const revealItems = document.querySelectorAll('.reveal');
if (revealItems.length && 'IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}
