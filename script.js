/* ============================================================
   FRESH MERCY — script.js
   Handles: navbar scroll, mobile menu, scroll reveal,
            active nav highlighting, form feedback,
            smooth scroll, parallax hint, typing verse
   ============================================================ */

'use strict';

/* ── DOM REFERENCES ─────────────────────────────────────── */
const navbar      = document.getElementById('navbar');
const hamburger   = document.getElementById('hamburger');
const navLinks    = document.getElementById('navLinks');
const contactForm = document.getElementById('contactForm');
const signupForm  = document.querySelector('.signup-form');

/* ═══════════════════════════════════════════════════════════
   1. NAVBAR — scroll state + shrink effect
═══════════════════════════════════════════════════════════ */
function handleNavbarScroll() {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', handleNavbarScroll, { passive: true });
handleNavbarScroll(); // run once on load

/* ═══════════════════════════════════════════════════════════
   2. MOBILE MENU — hamburger toggle
═══════════════════════════════════════════════════════════ */
function openMenu() {
  navLinks.classList.add('open');
  hamburger.classList.add('open');
  hamburger.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  navLinks.classList.remove('open');
  hamburger.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

if (hamburger) {
  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.contains('open');
    isOpen ? closeMenu() : openMenu();
  });
}

// Close menu when a nav link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', closeMenu);
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (
    navLinks.classList.contains('open') &&
    !navLinks.contains(e.target) &&
    !hamburger.contains(e.target)
  ) {
    closeMenu();
  }
});

// Close menu on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navLinks.classList.contains('open')) {
    closeMenu();
    hamburger.focus();
  }
});

/* ═══════════════════════════════════════════════════════════
   3. SCROLL REVEAL — IntersectionObserver
═══════════════════════════════════════════════════════════ */

// Add .reveal class to all target elements
const revealSelectors = [
  '.section-header',
  '.pillar-card',
  '.devotional-card',
  '.community-feature',
  '.testimonial-card',
  '.about-visual',
  '.about-text',
  '.contact-text',
  '.contact-form',
  '.devotional-signup',
  '.scripture-banner blockquote',
  '.verse-content',
];

revealSelectors.forEach(selector => {
  document.querySelectorAll(selector).forEach((el, i) => {
    el.classList.add('reveal');
    // Stagger children of grid containers
    const delay = Math.min(i % 6, 5);
    if (delay > 0) el.classList.add(`reveal-delay-${delay}`);
  });
});

// Observer
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target); // animate once
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ═══════════════════════════════════════════════════════════
   4. ACTIVE NAV LINK — highlight current section
═══════════════════════════════════════════════════════════ */
const sections  = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

function setActiveLink() {
  let currentId = '';
  sections.forEach(section => {
    const top = section.getBoundingClientRect().top;
    if (top <= 120) currentId = section.id;
  });

  navAnchors.forEach(a => {
    a.classList.remove('active-link');
    if (a.getAttribute('href') === `#${currentId}`) {
      a.classList.add('active-link');
    }
  });
}

window.addEventListener('scroll', setActiveLink, { passive: true });
setActiveLink();

// Inject active link style dynamically
const activeLinkStyle = document.createElement('style');
activeLinkStyle.textContent = `
  .nav-links a.active-link { color: var(--gold) !important; }
`;
document.head.appendChild(activeLinkStyle);

/* ═══════════════════════════════════════════════════════════
   5. CONTACT FORM — feedback + validation
═══════════════════════════════════════════════════════════ */
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name    = contactForm.name.value.trim();
    const email   = contactForm.email.value.trim();
    const message = contactForm.message.value.trim();

    // Basic validation
    if (!name || !email || !message) {
      showFormMessage(contactForm, 'Please fill in all fields.', 'error');
      return;
    }

    if (!isValidEmail(email)) {
      showFormMessage(contactForm, 'Please enter a valid email address.', 'error');
      return;
    }

    // Simulate send — replace with real API call
    const btn = contactForm.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Sending…';

    setTimeout(() => {
      showFormMessage(
        contactForm,
        'Your message has been received. We are praying over it and will be in touch soon. 🙏',
        'success'
      );
      contactForm.reset();
      btn.disabled = false;
      btn.textContent = 'Send Message';
    }, 1200);
  });
}

/* ── SIGNUP FORM ──────────────────────────────────────────── */
if (signupForm) {
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = signupForm.querySelector('input[type="email"]');
    const email = emailInput.value.trim();

    if (!isValidEmail(email)) {
      showFormMessage(signupForm, 'Please enter a valid email address.', 'error');
      return;
    }

    const btn = signupForm.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Subscribing…';

    setTimeout(() => {
      showFormMessage(
        signupForm,
        'You are subscribed! Fresh mercy in your inbox every morning. ✨',
        'success'
      );
      signupForm.reset();
      btn.disabled = false;
      btn.textContent = 'Subscribe';
    }, 1000);
  });
}

/* ── Helpers ─────────────────────────────────────────────── */
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showFormMessage(form, text, type) {
  // Remove any existing message
  const existing = form.parentNode.querySelector('.form-feedback');
  if (existing) existing.remove();

  const msg = document.createElement('p');
  msg.className = 'form-feedback';
  msg.textContent = text;
  msg.style.cssText = `
    margin-top: 0.9rem;
    padding: 0.75rem 1.1rem;
    border-radius: 8px;
    font-size: 0.9rem;
    line-height: 1.5;
    font-family: 'Lato', sans-serif;
    background: ${type === 'success' ? 'rgba(74, 103, 65, 0.12)' : 'rgba(180, 60, 60, 0.10)'};
    color:      ${type === 'success' ? '#2D4A2D' : '#8B2020'};
    border-left: 3px solid ${type === 'success' ? '#C9A84C' : '#B84040'};
  `;

  form.parentNode.insertBefore(msg, form.nextSibling);

  // Auto-remove after 6 seconds
  setTimeout(() => msg.remove(), 6000);
}

/* ═══════════════════════════════════════════════════════════
   6. SMOOTH SCROLL — for browsers that need a nudge
       (CSS scroll-behavior handles most modern cases,
        this covers reduced-motion & hash-link edge cases)
═══════════════════════════════════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();

    const navH = navbar ? navbar.offsetHeight : 0;
    const top  = target.getBoundingClientRect().top + window.scrollY - navH - 12;

    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ═══════════════════════════════════════════════════════════
   7. HERO SCROLL HINT — fade out when user starts scrolling
═══════════════════════════════════════════════════════════ */
const scrollHint = document.querySelector('.hero-scroll-hint');
if (scrollHint) {
  window.addEventListener('scroll', () => {
    scrollHint.style.opacity = window.scrollY > 80 ? '0' : '';
  }, { passive: true });
}

/* ═══════════════════════════════════════════════════════════
   8. PILLAR CARDS — subtle entrance stagger on first view
═══════════════════════════════════════════════════════════ */
const pillarsGrid = document.querySelector('.pillars-grid');
if (pillarsGrid) {
  const pillarsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const cards = entry.target.querySelectorAll('.pillar-card');
        cards.forEach((card, i) => {
          card.style.transitionDelay = `${i * 80}ms`;
        });
        pillarsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  pillarsObserver.observe(pillarsGrid);
}

/* ═══════════════════════════════════════════════════════════
   9. VERSE HIGHLIGHT — subtle gold shimmer pulse
═══════════════════════════════════════════════════════════ */
const verseSection = document.querySelector('.verse-highlight');
if (verseSection) {
  const shimmerStyle = document.createElement('style');
  shimmerStyle.textContent = `
    @keyframes goldShimmer {
      0%   { opacity: 0.6; }
      50%  { opacity: 1; }
      100% { opacity: 0.6; }
    }
    .verse-decoration {
      animation: goldShimmer 3s ease-in-out infinite;
    }
  `;
  document.head.appendChild(shimmerStyle);
}

/* ═══════════════════════════════════════════════════════════
   10. LOGO SVG — gentle rotate-pulse on hover
═══════════════════════════════════════════════════════════ */
const logoMark = document.querySelector('.hero-logo-mark');
if (logoMark) {
  const pulseStyle = document.createElement('style');
  pulseStyle.textContent = `
    @keyframes sunPulse {
      0%, 100% { transform: scale(1); }
      50%       { transform: scale(1.04); }
    }
    .hero-logo-mark:hover .logo-svg {
      animation: sunPulse 2s ease-in-out infinite;
    }
  `;
  document.head.appendChild(pulseStyle);
}

/* ═══════════════════════════════════════════════════════════
   11. TESTIMONIAL CARDS — auto-rotate on mobile
═══════════════════════════════════════════════════════════ */
function initTestimonialRotator() {
  if (window.innerWidth > 640) return; // desktop shows all 3

  const cards = document.querySelectorAll('.testimonial-card');
  if (cards.length < 2) return;

  let current = 0;

  cards.forEach((c, i) => {
    c.style.display = i === 0 ? 'block' : 'none';
  });

  setInterval(() => {
    cards[current].style.display = 'none';
    current = (current + 1) % cards.length;
    cards[current].style.display = 'block';
    cards[current].style.animation = 'fadeUp 0.5s ease forwards';
    cards[current].style.opacity   = '1';
    cards[current].style.transform = 'translateY(0)';
  }, 4500);
}

initTestimonialRotator();

/* ═══════════════════════════════════════════════════════════
   12. YEAR — auto-update copyright year in footer
═══════════════════════════════════════════════════════════ */
const copyEl = document.querySelector('.footer-copy');
if (copyEl) {
  const year = new Date().getFullYear();
  copyEl.textContent = copyEl.textContent.replace(/\d{4}/, year);
}

/* ═══════════════════════════════════════════════════════════
   13. REDUCED MOTION — respect user preference
═══════════════════════════════════════════════════════════ */
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (prefersReducedMotion) {
  // Immediately reveal all elements without animation
  document.querySelectorAll('.reveal').forEach(el => {
    el.classList.add('revealed');
    el.style.transition = 'none';
  });
}
