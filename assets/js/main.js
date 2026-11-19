/**
 * MeoCut Video Editor - Official Website Scripts
 * Clean, modern interactions, tab switching, theme toggling, FAQ accordion, lightbox
 */

document.addEventListener('DOMContentLoaded', () => {
  // -------------------------------------------------------------
  // 1. Dark / Light Theme Toggle (Matches App Settings)
  // -------------------------------------------------------------
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = document.getElementById('themeIcon');
  
  const sunIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
  const moonIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;

  const savedTheme = localStorage.getItem('meocut_theme') || 'light';
  setTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      setTheme(newTheme);
      localStorage.setItem('meocut_theme', newTheme);
    });
  }

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    if (themeIcon) {
      themeIcon.innerHTML = theme === 'dark' ? sunIcon : moonIcon;
    }
  }

  // -------------------------------------------------------------
  // 2. Mobile Menu Navigation
  // -------------------------------------------------------------
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const isOpen = navLinks.classList.contains('open');
      mobileMenuBtn.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking outside or on a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
      });
    });
  }

  // -------------------------------------------------------------
  // 3. Header Shadow on Scroll & Active Section Highlighting
  // -------------------------------------------------------------
  const siteHeader = document.querySelector('.site-header');
  const sections = document.querySelectorAll('section[id]');
  const navLinkItems = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      siteHeader?.classList.add('scrolled');
    } else {
      siteHeader?.classList.remove('scrolled');
    }

    // Scroll Spy for nav links
    let current = '';
    const scrollPos = window.scrollY + 100;
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinkItems.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // -------------------------------------------------------------
  // 4. Interactive Feature Showcase Tabs
  // -------------------------------------------------------------
  const showcaseTabs = document.querySelectorAll('.showcase-tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  showcaseTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = tab.getAttribute('data-tab');

      // Update active tab buttons
      showcaseTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Update active tab panes
      tabPanes.forEach(pane => {
        if (pane.id === targetId) {
          pane.classList.add('active');
        } else {
          pane.classList.remove('active');
        }
      });
    });
  });

  // -------------------------------------------------------------
  // 5. Gallery Carousel Controls
  // -------------------------------------------------------------
  const galleryTrack = document.getElementById('galleryTrack');
  const sliderPrev = document.getElementById('sliderPrev');
  const sliderNext = document.getElementById('sliderNext');

  if (galleryTrack && sliderPrev && sliderNext) {
    const scrollAmount = 300;

    sliderPrev.addEventListener('click', () => {
      galleryTrack.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });

    sliderNext.addEventListener('click', () => {
      galleryTrack.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });

    // Drag-to-scroll support for gallery
    let isDown = false;
    let startX;
    let scrollLeft;

    galleryTrack.addEventListener('mousedown', (e) => {
      isDown = true;
      galleryTrack.classList.add('active');
      startX = e.pageX - galleryTrack.offsetLeft;
      scrollLeft = galleryTrack.scrollLeft;
    });

    galleryTrack.addEventListener('mouseleave', () => {
      isDown = false;
    });

    galleryTrack.addEventListener('mouseup', () => {
      isDown = false;
    });

    galleryTrack.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - galleryTrack.offsetLeft;
      const walk = (x - startX) * 1.5;
      galleryTrack.scrollLeft = scrollLeft - walk;
    });
  }

  // -------------------------------------------------------------
  // 6. Screenshot Lightbox Modal
  // -------------------------------------------------------------
  const modalOverlay = document.getElementById('modalOverlay');
  const modalImg = document.getElementById('modalImg');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const clickableScreenshots = document.querySelectorAll('[data-preview-src]');

  clickableScreenshots.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const src = item.getAttribute('data-preview-src') || item.getAttribute('src');
      if (src && modalOverlay && modalImg) {
        modalImg.src = src;
        modalOverlay.classList.add('active');
      }
    });
  });

  if (modalCloseBtn && modalOverlay) {
    modalCloseBtn.addEventListener('click', () => {
      modalOverlay.classList.remove('active');
    });

    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.classList.remove('active');
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
        modalOverlay.classList.remove('active');
      }
    });
  }

  // -------------------------------------------------------------
  // 7. FAQ Accordion Interaction
  // -------------------------------------------------------------
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Optional: close other FAQ items
        faqItems.forEach(otherItem => {
          if (otherItem !== item) otherItem.classList.remove('active');
        });

        if (isActive) {
          item.classList.remove('active');
        } else {
          item.classList.add('active');
        }
      });
    }
  });

  // -------------------------------------------------------------
  // 8. Download / Action Notification Handlers
  // -------------------------------------------------------------
  const downloadTriggers = document.querySelectorAll('.download-trigger');
  downloadTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const href = btn.getAttribute('href');
      if (!href || href === '#' || href.startsWith('javascript')) {
        e.preventDefault();
        alert('MeoCut will be available on Google Play Store soon. Stay tuned for the official launch!');
      }
    });
  });
});
