/* ================================================================
   HEALTHY DENTI – script.js
   Interactivity, Animations & Particle System
================================================================ */

(function () {
  'use strict';

  /* ===================================================
     1. PARTICLES SYSTEM (50 particles)
  =================================================== */
  function initParticles() {
    const container = document.getElementById('particles-container');
    if (!container) return;

    const count = 50;
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      p.style.cssText = `
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation-delay: ${(Math.random() * 20).toFixed(2)}s;
        animation-duration: ${(14 + Math.random() * 10).toFixed(2)}s;
        width: ${(1.5 + Math.random() * 2.5).toFixed(1)}px;
        height: ${(1.5 + Math.random() * 2.5).toFixed(1)}px;
        opacity: ${(0.2 + Math.random() * 0.5).toFixed(2)};
      `;
      fragment.appendChild(p);
    }

    container.appendChild(fragment);
  }

  /* ===================================================
     2. STICKY NAVBAR
  =================================================== */
  function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    const onScroll = debounce(() => {
      navbar.classList.toggle('scrolled', window.scrollY > 60);
    }, 10);

    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ===================================================
     3. MOBILE MENU
  =================================================== */
  function initMobileMenu() {
    const toggle = document.getElementById('mobile-menu-toggle');
    const menu = document.getElementById('mobile-menu');
    if (!toggle || !menu) return;

    toggle.addEventListener('click', () => {
      const isOpen = menu.classList.toggle('open');
      toggle.classList.toggle('open', isOpen);
      toggle.setAttribute('aria-expanded', isOpen);
    });

    // Close menu on nav link click
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.remove('open');
        toggle.classList.remove('open');
      });
    });
  }

  /* ===================================================
     4. SMOOTH SCROLL
  =================================================== */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (!target) return;
        e.preventDefault();

        const navH = document.getElementById('navbar')?.offsetHeight || 80;
        const top = target.getBoundingClientRect().top + window.scrollY - navH - 12;

        window.scrollTo({ top, behavior: 'smooth' });
      });
    });
  }

  /* ===================================================
     5. INTERSECTION OBSERVER – REVEAL ANIMATIONS
  =================================================== */
  function initReveal() {
    const items = document.querySelectorAll('.reveal');
    if (!items.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            // Stagger delay using data attribute or index
            const delay = entry.target.dataset.delay || 0;
            setTimeout(() => {
              entry.target.classList.add('revealed');
            }, Number(delay));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );

    // Add stagger delays to grid children
    document.querySelectorAll('.services-grid .reveal').forEach((el, i) => {
      el.dataset.delay = i * 80;
    });
    document.querySelectorAll('.results-grid .reveal').forEach((el, i) => {
      el.dataset.delay = i * 100;
    });
    document.querySelectorAll('.team-grid .reveal').forEach((el, i) => {
      el.dataset.delay = i * 120;
    });

    items.forEach(item => observer.observe(item));
  }

  /* ===================================================
     6. ANIMATED COUNTERS
  =================================================== */
  function animateCounter(el, target, duration = 2000, decimals = 0) {
    const start = performance.now();
    const startVal = 0;

    function update(timestamp) {
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = startVal + (target - startVal) * eased;
      el.textContent = decimals > 0
        ? current.toFixed(decimals)
        : Math.round(current).toLocaleString();

      if (progress < 1) requestAnimationFrame(update);
      else el.textContent = decimals > 0 ? target.toFixed(decimals) : target.toLocaleString();
    }

    requestAnimationFrame(update);
  }

  function initCounters() {
    const counters = document.querySelectorAll('.count, .stat-number');
    if (!counters.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseFloat(el.dataset.target || '0');
            const decimals = Number.isInteger(target) ? 0 : 1;
            animateCounter(el, target, 2000, decimals);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach(c => observer.observe(c));
  }

  /* ===================================================
     7. FLIP CARDS (mobile tap support)
  =================================================== */
  function initFlipCards() {
    const cards = document.querySelectorAll('.service-card-flip');

    cards.forEach(card => {
      // Touch/click support on mobile
      card.addEventListener('click', () => {
        // Only toggle on touch devices (hover handles desktop)
        if (window.matchMedia('(hover: none)').matches) {
          card.classList.toggle('flipped');
        }
      });

      // Keyboard accessibility
      card.setAttribute('tabindex', '0');
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          card.classList.toggle('flipped');
        }
      });
    });
  }

  /* ===================================================
     8. TESTIMONIALS CAROUSEL
  =================================================== */
  function initCarousel() {
    const track = document.getElementById('test-track');
    const dotsContainer = document.getElementById('carousel-dots');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    if (!track) return;

    const cards = track.querySelectorAll('.testimonial-card');
    const total = cards.length;
    let current = 0;
    let autoInterval = null;

    // How many cards visible at once (responsive)
    function getVisible() {
      if (window.innerWidth < 768) return 1;
      if (window.innerWidth < 1100) return 2;
      return 3;
    }

    function totalSlides() {
      return Math.ceil(total / getVisible());
    }

    // Build dots
    function buildDots() {
      dotsContainer.innerHTML = '';
      for (let i = 0; i < totalSlides(); i++) {
        const dot = document.createElement('button');
        dot.className = 'dot' + (i === current ? ' active' : '');
        dot.setAttribute('aria-label', `Ir al testimonio ${i + 1}`);
        dot.addEventListener('click', () => goTo(i));
        dotsContainer.appendChild(dot);
      }
    }

    function goTo(index) {
      current = Math.max(0, Math.min(index, totalSlides() - 1));
      const visible = getVisible();
      const cardW = cards[0].offsetWidth;
      const gap = 24;
      const offset = current * visible * (cardW + gap);
      track.style.transform = `translateX(-${offset}px)`;

      dotsContainer.querySelectorAll('.dot').forEach((d, i) => {
        d.classList.toggle('active', i === current);
      });
    }

    function next() { goTo((current + 1) % totalSlides()); }
    function prev() { goTo((current - 1 + totalSlides()) % totalSlides()); }

    prevBtn?.addEventListener('click', () => { prev(); resetAuto(); });
    nextBtn?.addEventListener('click', () => { next(); resetAuto(); });

    function startAuto() {
      autoInterval = setInterval(next, 5000);
    }

    function resetAuto() {
      clearInterval(autoInterval);
      startAuto();
    }

    // Touch swipe
    let touchStartX = 0;
    track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', e => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) { diff > 0 ? next() : prev(); }
    });

    window.addEventListener('resize', debounce(() => {
      buildDots();
      goTo(0);
    }, 200));

    buildDots();
    startAuto();
  }

  /* ===================================================
     9. PARALLAX – subtle background elements
  =================================================== */
  function initParallax() {
    const heroBg = document.querySelector('.hero-bg-glow');
    if (!heroBg) return;

    window.addEventListener('scroll', debounce(() => {
      const scrolled = window.scrollY;
      heroBg.style.transform = `translateX(-50%) translateY(${scrolled * 0.3}px)`;
    }, 5), { passive: true });
  }

  /* ===================================================
     10. CONTACT FORM – Webhook n8n
  =================================================== */
  const WEBHOOK_URL = 'https://proyectts.app.n8n.cloud/webhook/8d315d9c-6333-49c0-ad12-6abde90353b0';

  window.handleFormSubmit = async function (e) {
    e.preventDefault();

    const form       = e.target;
    const submitBtn  = form.querySelector('#form-submit');
    const successMsg = document.getElementById('form-success');
    const errorMsg   = document.getElementById('form-error');

    // ── Recolectar todos los campos del formulario ──
    const payload = {
      nombre:   form.querySelector('#form-name')?.value.trim()    || '',
      email:    form.querySelector('#form-email')?.value.trim()   || '',
      telefono: form.querySelector('#form-phone')?.value.trim()   || '',
      servicio: form.querySelector('#form-service')?.value        || '',
      mensaje:  form.querySelector('#form-message')?.value.trim() || '',
      // Metadatos adicionales útiles en n8n
      fuente:    'HEALTHY DENTI – Web',
      fecha_envio: new Date().toISOString(),
      url_origen: window.location.href,
    };

    // ── Estado: cargando ──
    submitBtn.textContent = '⏳ Enviando...';
    submitBtn.disabled = true;
    if (successMsg) successMsg.style.display = 'none';
    if (errorMsg)   errorMsg.style.display   = 'none';

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      // ── Éxito ──
      form.reset();
      submitBtn.textContent = 'Solicitar mi Cita ✨';
      submitBtn.disabled = false;

      if (successMsg) {
        successMsg.style.display = 'block';
        setTimeout(() => { successMsg.style.display = 'none'; }, 6000);
      }

      console.log('%c✅ Formulario enviado al webhook', 'color:#22C55E; font-weight:bold;', payload);

    } catch (err) {
      // ── Error ──
      submitBtn.textContent = 'Solicitar mi Cita ✨';
      submitBtn.disabled = false;

      if (errorMsg) {
        errorMsg.style.display = 'block';
        setTimeout(() => { errorMsg.style.display = 'none'; }, 7000);
      }

      console.error('❌ Error al enviar formulario:', err);
    }
  };

  /* ===================================================
     11. HERO IMAGE FALLBACK SHOW
  =================================================== */
  function initHeroFallback() {
    const heroImg = document.getElementById('hero-img');
    const fallback = document.getElementById('hero-svg-fallback');
    if (!heroImg || !fallback) return;

    heroImg.addEventListener('load', () => {
      fallback.style.display = 'none';
    });

    // If already loaded (cached)
    if (heroImg.complete && heroImg.naturalWidth > 0) {
      fallback.style.display = 'none';
    }
  }

  /* ===================================================
     UTILITY: debounce
  =================================================== */
  function debounce(fn, wait = 16) {
    let t;
    return function (...args) {
      clearTimeout(t);
      t = setTimeout(() => fn.apply(this, args), wait);
    };
  }

  /* ===================================================
     INIT – DOM Ready
  =================================================== */
  function init() {
    initParticles();
    initNavbar();
    initMobileMenu();
    initSmoothScroll();
    initReveal();
    initCounters();
    initFlipCards();
    initCarousel();
    initParallax();
    initHeroFallback();

    console.log('%c🦷 HEALTHY DENTI – Web loaded successfully', 'color:#3B82F6; font-size:14px; font-weight:bold;');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
