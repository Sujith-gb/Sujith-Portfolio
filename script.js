// Mobile navigation toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const revealItems = document.querySelectorAll('.reveal');
const counters = document.querySelectorAll('[data-count]');
const backToTop = document.querySelector('.back-to-top');
const photoViewer = document.querySelector('.photo-viewer');

navToggle?.addEventListener('click', () => {
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!expanded));
  navLinks?.classList.toggle('open');
});

navLinks?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Reveal-on-scroll animation
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');

        if (entry.target.classList.contains('skill-item')) {
          entry.target.classList.add('skill-visible');
        }

        const skillItems = document.querySelectorAll('.skill-item');
        skillItems.forEach((item) => item.classList.add('skill-visible'));

        if (entry.target.classList.contains('reveal')) {
          const bars = entry.target.querySelectorAll('.skill-bar span');
          bars.forEach((bar) => bar.classList.add('visible'));
        }
      }
    });
  },
  { threshold: 0.2 }
);

revealItems.forEach((item) => observer.observe(item));

document.querySelectorAll('.skill-item').forEach((item) => observer.observe(item));

// Animated counters for hero metrics
const animateCounter = (element) => {
  const target = Number(element.getAttribute('data-count'));
  const suffix = element.getAttribute('data-suffix') || '';
  let current = 0;
  const increment = Math.max(1, Math.floor(target / 45));

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = `${target}${suffix}`;
      clearInterval(timer);
    } else {
      element.textContent = `${current}${suffix}`;
    }
  }, 40);
};

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.8 });

counters.forEach((counter) => counterObserver.observe(counter));

// Back-to-top button visibility
window.addEventListener('scroll', () => {
  backToTop?.classList.toggle('visible', window.scrollY > 500);
});

backToTop?.addEventListener('click', (event) => {
  event.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

if (photoViewer) {
  photoViewer.addEventListener('click', () => {
    if (photoViewer.classList.contains('animating') || photoViewer.classList.contains('revealed')) {
      return;
    }

    photoViewer.classList.remove('revealed');
    void photoViewer.offsetWidth;
    photoViewer.classList.add('animating');

    window.setTimeout(() => {
      photoViewer.classList.add('revealed');
      photoViewer.classList.remove('animating');
    }, 3000);
  });
}

