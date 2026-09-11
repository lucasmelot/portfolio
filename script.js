(() => {
  const header = document.querySelector('[data-header]');
  const progress = document.querySelector('[data-progress]');
  const trigger = document.querySelector('[data-menu-trigger]');
  const menu = document.querySelector('[data-mobile-menu]');
  const reveals = [...document.querySelectorAll('.reveal')];
  const year = document.querySelector('[data-year]');

  if (year) year.textContent = new Date().getFullYear();

  const updateScrollUI = () => {
    const top = window.scrollY || document.documentElement.scrollTop;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (header) header.classList.toggle('scrolled', top > 12);
    if (progress) progress.style.transform = `scaleX(${max > 0 ? Math.min(1, top / max) : 0})`;
  };

  // Agrupa eventos consecutivos em uma atualização por quadro.
  // Mantém o mesmo progresso e estado do cabeçalho durante a rolagem.
  let scrollFrame = null;
  const scheduleScrollUI = () => {
    if (scrollFrame !== null) return;
    scrollFrame = window.requestAnimationFrame(() => {
      scrollFrame = null;
      updateScrollUI();
    });
  };

  updateScrollUI();
  window.addEventListener('scroll', scheduleScrollUI, { passive: true });
  window.addEventListener('resize', scheduleScrollUI, { passive: true });
  window.addEventListener('load', scheduleScrollUI, { once: true });

  const closeMenu = () => {
    if (!trigger || !menu) return;
    trigger.setAttribute('aria-expanded', 'false');
    trigger.querySelector('.sr-only').textContent = 'Abrir menu';
    menu.hidden = true;
    document.body.classList.remove('menu-open');
  };

  if (trigger && menu) {
    trigger.addEventListener('click', () => {
      const willOpen = trigger.getAttribute('aria-expanded') !== 'true';
      trigger.setAttribute('aria-expanded', String(willOpen));
      trigger.querySelector('.sr-only').textContent = willOpen ? 'Fechar menu' : 'Abrir menu';
      menu.hidden = !willOpen;
      document.body.classList.toggle('menu-open', willOpen);
    });

    menu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
    window.addEventListener('keydown', event => {
      if (event.key === 'Escape') closeMenu();
    });
  }

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion || !('IntersectionObserver' in window)) {
    reveals.forEach(item => item.classList.add('is-visible'));
  } else {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    reveals.forEach(item => observer.observe(item));
  }
})();
