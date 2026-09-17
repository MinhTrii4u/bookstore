/* ============================================================
   GoldPage — Animations Module
   Scroll fade-in (IntersectionObserver), ripple, shimmer toggle
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ========== Scroll Fade-In using IntersectionObserver ==========
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.1
  };

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all fade-in elements
  function initFadeAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right');
    fadeElements.forEach(el => fadeObserver.observe(el));
  }

  initFadeAnimations();

  // ========== Ripple Effect on Click ==========
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.ripple');
    if (!btn) return;

    const circle = document.createElement('span');
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    circle.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(212,175,55,0.4) 0%, transparent 70%);
      transform: scale(0);
      animation: rippleAnim 0.6s ease-out;
      pointer-events: none;
    `;

    btn.appendChild(circle);
    setTimeout(() => circle.remove(), 600);
  });

  // Add ripple animation keyframes
  if (!document.querySelector('#ripple-keyframes')) {
    const style = document.createElement('style');
    style.id = 'ripple-keyframes';
    style.textContent = `
      @keyframes rippleAnim {
        to {
          transform: scale(4);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // ========== Counter Animation ==========
  function animateCounter(element, target, duration = 1500) {
    const start = 0;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      const current = Math.floor(start + (target - start) * easeProgress);
      element.textContent = new Intl.NumberFormat('vi-VN').format(current);

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  // Observe counter elements
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.getAttribute('data-target'));
        if (target) {
          animateCounter(entry.target, target);
        }
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('[data-counter]').forEach(el => counterObserver.observe(el));

  // ========== Parallax Scroll (subtle) ==========
  window.addEventListener('scroll', () => {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    parallaxElements.forEach(el => {
      const speed = parseFloat(el.getAttribute('data-parallax')) || 0.3;
      const rect = el.getBoundingClientRect();
      const scrolled = window.scrollY;
      el.style.transform = `translateY(${scrolled * speed}px)`;
    });
  });

  // Expose for dynamic content
  window.initFadeAnimations = initFadeAnimations;
});
