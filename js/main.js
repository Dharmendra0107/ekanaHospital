/* ============================================================
   EKANA MEDICARE — Interactions v2
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Preloader ---------- */
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => preloader.classList.add('hide'), 220);
  });
  setTimeout(() => preloader && preloader.classList.add('hide'), 2400);

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Scroll progress bar ---------- */
  const progressBar = document.getElementById('scrollProgress');
  const updateProgress = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (progressBar) progressBar.style.width = pct + '%';
  };

  /* ---------- Sticky nav shrink + back-to-top visibility ---------- */
  const nav = document.getElementById('siteNav');
  const fabTop = document.getElementById('fabTop');
  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 30);
    if (fabTop) fabTop.classList.toggle('show', window.scrollY > 500);
    updateProgress();
  };

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  navToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    navToggle.innerHTML = open
      ? '<i class="fa-solid fa-xmark"></i>'
      : '<i class="fa-solid fa-bars"></i>';
  });
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
  }));

  /* ---------- Departments dropdown (mobile toggle) ---------- */
  const deptDropdown = document.getElementById('deptDropdown');
  if (deptDropdown) {
    deptDropdown.querySelector('a').addEventListener('click', (e) => {
      if (window.innerWidth <= 991) {
        e.preventDefault();
        deptDropdown.classList.toggle('open');
      }
    });
  }

  /* ---------- Active link spy ---------- */
  const sections = document.querySelectorAll('section[id], header[id]');
  const navAnchors = document.querySelectorAll('.nav-links a:not(.dropdown-panel a)');
  const spyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navAnchors.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${id}`));
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach(s => spyObserver.observe(s));

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal, .reveal-stagger');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.10 });
  revealEls.forEach(el => revealObserver.observe(el));

  /* ---------- Count-up stats ---------- */
  const counters = document.querySelectorAll('[data-count]');
  const animateCount = (el) => {
    const target = parseInt(el.getAttribute('data-count'), 10);
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 1600;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(target * eased).toLocaleString('en-IN') + suffix;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        countObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.55 });
  counters.forEach(c => countObserver.observe(c));

  /* ---------- Doctor row arrows ---------- */
  const doctorRow = document.getElementById('doctorRow');
  const docPrev = document.getElementById('docPrev');
  const docNext = document.getElementById('docNext');
  if (doctorRow && docNext && docPrev) {
    const scrollAmt = 294;
    docNext.addEventListener('click', () => doctorRow.scrollBy({ left: scrollAmt, behavior: 'smooth' }));
    docPrev.addEventListener('click', () => doctorRow.scrollBy({ left: -scrollAmt, behavior: 'smooth' }));
  }

  /* ---------- Back to top ---------- */
  if (fabTop) fabTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ---------- Smooth scroll for all anchor links ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = nav ? nav.offsetHeight + 16 : 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ---------- Appointment form demo submit ---------- */
  const form = document.getElementById('appointmentForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const original = btn.innerHTML;
      btn.innerHTML = '<i class="fa-solid fa-check"></i> Request Received!';
      btn.style.background = 'var(--teal-deep)';
      btn.disabled = true;
      setTimeout(() => {
        btn.innerHTML = original;
        btn.style.background = '';
        btn.disabled = false;
        form.reset();
      }, 3000);
    });
  }

  /* ---------- Newsletter form ---------- */
  document.querySelectorAll('.footer-newsletter button').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = btn.previousElementSibling;
      if (input && input.value.includes('@')) {
        btn.innerHTML = '<i class="fa-solid fa-check"></i>';
        btn.style.background = '#1B8A5A';
        setTimeout(() => {
          btn.innerHTML = '<i class="fa-solid fa-paper-plane"></i>';
          btn.style.background = '';
          input.value = '';
        }, 2500);
      } else if (input) {
        input.style.borderColor = 'var(--emergency)';
        setTimeout(() => input.style.borderColor = '', 1400);
      }
    });
  });

  /* ---------- Tip card read more pulse ---------- */
  document.querySelectorAll('.tip-read').forEach(a => {
    a.addEventListener('mouseenter', () => {
      const icon = a.querySelector('i');
      if (icon) { icon.style.transform = 'translateX(4px)'; icon.style.transition = '.2s'; }
    });
    a.addEventListener('mouseleave', () => {
      const icon = a.querySelector('i');
      if (icon) { icon.style.transform = ''; }
    });
  });

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
});
