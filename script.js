// ====================================
// R.H. STUDIOS - JAVASCRIPT
// ====================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize all functionality
  initSmoothScroll();
  initActiveNav();
  initMobileMenu();
  initHeaderScroll();
});

// ====================================
// 1. SMOOTH SCROLLING
// ====================================
function initSmoothScroll() {
  // Select all anchor links that start with #
  const navLinks = document.querySelectorAll('a[href^="#"]');

  navLinks.forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();

      // Get the target section
      const targetId = this.getAttribute('href');

      // Skip if href is just "#"
      if (targetId === '#') return;

      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        // Calculate position accounting for fixed header
        const headerOffset = 80; // Height of fixed header
        const elementPosition = targetSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        // Smooth scroll to target
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });

        // Close mobile menu if open
        const mobileNav = document.querySelector('.main-nav');
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');

        if (mobileNav && mobileNav.classList.contains('active')) {
          mobileNav.classList.remove('active');
          mobileMenuToggle.classList.remove('active');
          mobileMenuToggle.setAttribute('aria-expanded', 'false');
        }
      }
    });
  });
}

// ====================================
// 2. ACTIVE NAVIGATION STATE
// ====================================
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  // Configuration for Intersection Observer
  const observerOptions = {
    root: null, // viewport
    rootMargin: '-100px 0px -66%', // Trigger when section is in middle of viewport
    threshold: 0
  };

  // Create Intersection Observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Remove active class from all nav links
        navLinks.forEach(link => {
          link.classList.remove('active');
        });

        // Add active class to corresponding nav link
        const activeLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
        if (activeLink) {
          activeLink.classList.add('active');
        }
      }
    });
  }, observerOptions);

  // Observe all sections
  sections.forEach(section => {
    observer.observe(section);
  });
}

// ====================================
// 3. MOBILE MENU TOGGLE
// ====================================
function initMobileMenu() {
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const mainNav = document.querySelector('.main-nav');

  if (!mobileMenuToggle || !mainNav) return;

  // Toggle mobile menu
  mobileMenuToggle.addEventListener('click', function() {
    const isActive = mainNav.classList.contains('active');

    // Toggle classes
    mainNav.classList.toggle('active');
    this.classList.toggle('active');

    // Update ARIA attribute
    this.setAttribute('aria-expanded', !isActive);
  });

  // Close menu when clicking outside
  document.addEventListener('click', function(e) {
    if (!mainNav.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
      if (mainNav.classList.contains('active')) {
        mainNav.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
      }
    }
  });

  // Close menu on escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && mainNav.classList.contains('active')) {
      mainNav.classList.remove('active');
      mobileMenuToggle.classList.remove('active');
      mobileMenuToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

// ====================================
// 4. HEADER SCROLL EFFECT
// ====================================
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  let lastScroll = 0;

  if (!header) return;

  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;

    // Add shadow to header when scrolled
    if (currentScroll > 100) {
      header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    } else {
      header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
    }

    lastScroll = currentScroll;
  });
}

// ====================================
// 5. UTILITY FUNCTIONS
// ====================================

// Debounce function for performance optimization
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Optional: Add animation on scroll (can be enabled if desired)
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.class-item, .team-card');

  const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, {
    threshold: 0.1
  });

  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    animationObserver.observe(el);
  });
}

// Uncomment the line below to enable scroll animations:
// document.addEventListener('DOMContentLoaded', initScrollAnimations);
