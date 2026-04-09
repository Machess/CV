/* ─────────────────────────────────────────────
   main.js — Mac Tilma CV
───────────────────────────────────────────── */

(function () {
  'use strict';

  // ── Footer timestamp ─────────────────────────
  function setFooterTimestamp() {
    const el = document.getElementById('footer-ts');
    if (!el) return;
    const now = new Date();
    const iso = now.toISOString().replace('T', ' ').slice(0, 19);
    el.textContent = `generated :: ${iso} UTC`;
  }

  // ── Staggered fade-in on load ─────────────────
  function animateIn() {
    const targets = document.querySelectorAll(
      '.cv__header, .exp, .edu, .skills, .langs, .lang, .cv__section'
    );

    targets.forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(6px)';
      el.style.transition = `opacity 0.35s ease ${i * 28}ms, transform 0.35s ease ${i * 28}ms`;
    });

    // Trigger on next frame so initial styles are painted
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        targets.forEach((el) => {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        });
      });
    });
  }

  // ── Skill tag interaction ─────────────────────
  function initSkillTags() {
    const tags = document.querySelectorAll('.tag--skill');
    tags.forEach((tag) => {
      tag.setAttribute('title', tag.textContent.trim());
    });
  }

  // ── Typed cursor effect on name ───────────────
  function typeEffect() {
    const lastName = document.querySelector('.cv__name-last');
    if (!lastName) return;

    const text = lastName.textContent;
    lastName.textContent = '';
    lastName.style.borderRight = '2px solid var(--accent)';

    let i = 0;
    const speed = 80;

    function type() {
      if (i < text.length) {
        lastName.textContent += text.charAt(i);
        i++;
        setTimeout(type, speed);
      } else {
        // Blink then remove cursor
        setTimeout(() => {
          lastName.style.borderRight = 'none';
        }, 900);
      }
    }

    // Small delay before typing starts
    setTimeout(type, 300);
  }

  // ── Theme toggle ──────────────────────────────
  function initThemeToggle() {
    const root    = document.documentElement;
    const btn     = document.getElementById('theme-toggle');
    const label   = document.getElementById('theme-label');
    if (!btn) return;

    const STORAGE_KEY = 'cv-theme';
    const saved = localStorage.getItem(STORAGE_KEY) || 'dark';

    function applyTheme(theme) {
      root.setAttribute('data-theme', theme);
      label.textContent = theme.toUpperCase();
      localStorage.setItem(STORAGE_KEY, theme);
    }

    applyTheme(saved);

    btn.addEventListener('click', () => {
      const current = root.getAttribute('data-theme') || 'dark';
      applyTheme(current === 'dark' ? 'light' : 'dark');
    });
  }


  function consoleGreeting() {
    const styles = [
      'color: #00d4a0; font-size: 14px; font-family: monospace;',
      'color: #7a8394; font-size: 12px; font-family: monospace;',
    ];
    console.log('%c// MAC TILMA — CV', styles[0]);
    console.log('%c// Full-Stack Developer · AI · Infrastructure', styles[1]);
    console.log('%c// Built with plain HTML, CSS & JS. No frameworks harmed.', styles[1]);
  }

  // ── Init ─────────────────────────────────────
  document.addEventListener('DOMContentLoaded', () => {
    setFooterTimestamp();
    animateIn();
    initSkillTags();
    initThemeToggle();
    typeEffect();
    consoleGreeting();
  });

})();
