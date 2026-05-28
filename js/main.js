// ── NAV scroll effect ──
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
}

// ── Hamburger menu ──
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', navLinks.classList.contains('open'));
  });
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

// ── Animated counters ──
function animateCounters() {
  document.querySelectorAll('.stat-number[data-target]').forEach(el => {
    const target = +el.dataset.target;
    const duration = 1600;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = Math.floor(current);
      if (current >= target) clearInterval(timer);
    }, 16);
  });
}

// Trigger counters when stats section enters view
const statsBar = document.querySelector('.stats-bar');
if (statsBar) {
  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) { animateCounters(); observer.disconnect(); }
  }, { threshold: 0.3 });
  observer.observe(statsBar);
}

// ── Favourite button toggle ──
document.querySelectorAll('.fav-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.classList.toggle('active');
    btn.textContent = btn.classList.contains('active') ? '♥' : '♡';
  });
});

// ── Form submissions → toast ──
function showToast(msg) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<span class="toast-icon">✓</span> ${msg}`;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 4000);
}

document.querySelectorAll('form').forEach(form => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const id = form.id;
    if (id === 'valuationForm') showToast('Request received! Your valuation arrives within 24 hrs.');
    else if (id === 'contactForm')  showToast('Message sent! We\'ll be in touch within 1 business day.');
    else if (id === 'heroSearch')   window.location.href = 'properties.html';
    else showToast('Submitted successfully!');
    form.reset();
  });
});

// ── Scroll-in animations ──
const animatedEls = document.querySelectorAll(
  '.property-card, .testimonial, .step, .team-card, .stat'
);
const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

animatedEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity .5s ease, transform .5s ease';
  fadeObserver.observe(el);
});
