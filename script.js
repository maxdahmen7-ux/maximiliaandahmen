/* =========================================================
   Maximiliaan Dahmen — Portfolio interactions
   ========================================================= */
(function () {
  'use strict';

  /* --- Gentle reveal on scroll ------------------------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('in'));
  }

  /* --- Nav shadow after scroll ------------------------- */
  const nav = document.querySelector('nav.top');
  const onScroll = () => {
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 12);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* --- Experience carousel tabs ------------------------ */
  document.querySelectorAll('.carousel-tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      const panel = tab.dataset.panel;
      const carousel = tab.closest('.carousel');
      if (!carousel) return;
      carousel.querySelectorAll('.carousel-tab').forEach((t) => t.classList.remove('active'));
      carousel.querySelectorAll('.carousel-panel').forEach((p) => p.classList.remove('active'));
      tab.classList.add('active');
      const target = carousel.querySelector(`.carousel-panel[data-panel="${panel}"]`);
      if (target) target.classList.add('active');
    });
  });

  /* --- Automation accordion ---------------------------- */
  document.querySelectorAll('.accord-trigger').forEach((btn) => {
    btn.addEventListener('click', () => {
      const accord = btn.closest('.accord');
      if (!accord) return;
      const open = accord.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(open));
    });
  });

  /* --- Smooth anchor scroll (offset for fixed nav) ----- */
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (!id || id.length < 2) return;
      const t = document.querySelector(id);
      if (t) {
        e.preventDefault();
        const y = t.getBoundingClientRect().top + window.scrollY - 78;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    });
  });
})();
