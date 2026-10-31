/**
 * ============================================================
 * RAJESH SIR PHYSICS - JAVASCRIPT
 * Features: Mobile Nav, Smooth Scroll, Active Nav Highlight,
 * Scroll Fade-in, Stat Counters, Testimonials Slider, FAQ Accordion,
 * Form Validation, Demo Modal, PDF Download Toast
 * ============================================================
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------------------------
     1. STICKY NAVBAR & MOBILE MENU TOGGLE
     ------------------------------------------------------------ */
  const header = document.getElementById('header');
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  // Change navbar appearance on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  });

  // Toggle mobile navigation drawer
  if (hamburgerBtn && mobileDrawer) {
    hamburgerBtn.addEventListener('click', () => {
      const isOpen = hamburgerBtn.classList.toggle('is-active');
      mobileDrawer.classList.toggle('is-open', isOpen);
      hamburgerBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      mobileDrawer.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
    });

    // Close mobile drawer when clicking any nav link
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburgerBtn.classList.remove('is-active');
        mobileDrawer.classList.remove('is-open');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
        mobileDrawer.setAttribute('aria-hidden', 'true');
      });
    });

    // Close mobile menu if clicked outside
    document.addEventListener('click', (e) => {
      if (!header.contains(e.target) && mobileDrawer.classList.contains('is-open')) {
        hamburgerBtn.classList.remove('is-active');
        mobileDrawer.classList.remove('is-open');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
        mobileDrawer.setAttribute('aria-hidden', 'true');
      }
    });
  }


  /* ------------------------------------------------------------
     2. ACTIVE NAV LINK HIGHLIGHT ON SCROLL
     ------------------------------------------------------------ */
  const sections = document.querySelectorAll('section[id]');
  const desktopNavLinks = document.querySelectorAll('.nav-link');

  function highlightNavOnScroll() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        desktopNavLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
        mobileNavLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }
  window.addEventListener('scroll', highlightNavOnScroll);


  /* ------------------------------------------------------------
     3. INTERSECTION OBSERVER FOR SCROLL FADE-IN
     ------------------------------------------------------------ */
  const fadeElements = document.querySelectorAll('.fade-in-element');

  if ('IntersectionObserver' in window) {
    const fadeObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    fadeElements.forEach(el => fadeObserver.observe(el));
  } else {
    // Fallback if browser doesn't support IntersectionObserver
    fadeElements.forEach(el => el.classList.add('is-visible'));
  }


  /* ------------------------------------------------------------
     4. ANIMATED STATS COUNTER
     ------------------------------------------------------------ */
  const statCounters = document.querySelectorAll('.stat-counter');
  let hasAnimatedCounters = false;

  function runCounterAnimation() {
    statCounters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'), 10);
      const duration = 1800; // ms
      const frameDuration = 1000 / 60;
      const totalFrames = Math.round(duration / frameDuration);
      let frame = 0;

      const easeOutQuad = (t) => t * (2 - t);

      const timer = setInterval(() => {
        frame++;
        const progress = easeOutQuad(frame / totalFrames);
        const currentCount = Math.round(target * progress);

        if (frame >= totalFrames) {
          counter.textContent = target.toLocaleString();
          clearInterval(timer);
        } else {
          counter.textContent = currentCount.toLocaleString();
        }
      }, frameDuration);
    });
  }

  const statsSection = document.getElementById('stats');
  if (statsSection && 'IntersectionObserver' in window) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimatedCounters) {
          hasAnimatedCounters = true;
          runCounterAnimation();
          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    statsObserver.observe(statsSection);
  }


  /* ------------------------------------------------------------
     5. COMPACT CURRICULUM HOVER & TOUCH INTERACTION
     ------------------------------------------------------------ */
  const compactCards = document.querySelectorAll('.compact-class-card');
  const studentClassSelect = document.getElementById('studentClass');

  compactCards.forEach(card => {
    // Touch tap toggle for mobile
    card.addEventListener('click', () => {
      const isAlreadyExpanded = card.classList.contains('is-expanded');
      compactCards.forEach(c => c.classList.remove('is-expanded'));
      if (!isAlreadyExpanded) {
        card.classList.add('is-expanded');
      }

      // Pre-select matching class in contact form
      const badgeText = card.querySelector('.compact-grade-badge')?.textContent || '';
      if (studentClassSelect) {
        for (let i = 0; i < studentClassSelect.options.length; i++) {
          const opt = studentClassSelect.options[i];
          if (badgeText.includes('9-10') && opt.value === 'Class 9-10') {
            studentClassSelect.selectedIndex = i;
            break;
          } else if (badgeText.includes('11') && opt.value === 'Class 11') {
            studentClassSelect.selectedIndex = i;
            break;
          } else if (badgeText.includes('12') && opt.value === 'Class 12') {
            studentClassSelect.selectedIndex = i;
            break;
          } else if (badgeText.includes('JEE') && opt.value === 'JEE / NEET') {
            studentClassSelect.selectedIndex = i;
            break;
          }
        }
      }
    });
  });


  /* ------------------------------------------------------------
     6. TESTIMONIALS SLIDER
     ------------------------------------------------------------ */
  const sliderTrack = document.getElementById('sliderTrack');
  const slides = document.querySelectorAll('.slider-slide');
  const prevBtn = document.getElementById('prevSlideBtn');
  const nextBtn = document.getElementById('nextSlideBtn');
  const dotsContainer = document.getElementById('sliderDots');

  let currentSlide = 0;
  const totalSlides = slides.length;
  let autoplayTimer = null;

  if (sliderTrack && totalSlides > 0) {
    // Generate Pagination Dots
    dotsContainer.innerHTML = '';
    slides.forEach((_, idx) => {
      const dot = document.createElement('button');
      dot.className = `slider-dot ${idx === 0 ? 'is-active' : ''}`;
      dot.setAttribute('aria-label', `Go to review ${idx + 1}`);
      dot.addEventListener('click', () => {
        goToSlide(idx);
        restartAutoplay();
      });
      dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll('.slider-dot');

    function updateSlider() {
      sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
      dots.forEach((dot, idx) => {
        dot.classList.toggle('is-active', idx === currentSlide);
      });
    }

    function goToSlide(index) {
      if (index < 0) {
        currentSlide = totalSlides - 1;
      } else if (index >= totalSlides) {
        currentSlide = 0;
      } else {
        currentSlide = index;
      }
      updateSlider();
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        goToSlide(currentSlide - 1);
        restartAutoplay();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        goToSlide(currentSlide + 1);
        restartAutoplay();
      });
    }

    // Autoplay functionality
    function startAutoplay() {
      autoplayTimer = setInterval(() => {
        goToSlide(currentSlide + 1);
      }, 5000);
    }

    function restartAutoplay() {
      clearInterval(autoplayTimer);
      startAutoplay();
    }

    startAutoplay();

    // Pause on hover
    const viewport = document.getElementById('sliderViewport');
    if (viewport) {
      viewport.addEventListener('mouseenter', () => clearInterval(autoplayTimer));
      viewport.addEventListener('mouseleave', () => startAutoplay());

      // Touch / Swipe Support
      let touchStartX = 0;
      let touchEndX = 0;

      viewport.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });

      viewport.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
      }, { passive: true });

      function handleSwipe() {
        const threshold = 40;
        if (touchEndX < touchStartX - threshold) {
          // Swiped left
          goToSlide(currentSlide + 1);
          restartAutoplay();
        } else if (touchEndX > touchStartX + threshold) {
          // Swiped right
          goToSlide(currentSlide - 1);
          restartAutoplay();
        }
      }
    }
  }


  /* ------------------------------------------------------------
     7. FAQ ACCORDION (SMOOTH EXPAND / COLLAPSE)
     ------------------------------------------------------------ */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    questionBtn.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');

      // Close all other accordion items for clean single-view
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('is-open');
          const otherBtn = otherItem.querySelector('.faq-question');
          const otherAns = otherItem.querySelector('.faq-answer');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
          if (otherAns) otherAns.style.maxHeight = null;
        }
      });

      // Toggle current item
      if (isOpen) {
        item.classList.remove('is-open');
        questionBtn.setAttribute('aria-expanded', 'false');
        answer.style.maxHeight = null;
      } else {
        item.classList.add('is-open');
        questionBtn.setAttribute('aria-expanded', 'true');
        answer.style.maxHeight = answer.scrollHeight + 32 + 'px';
      }
    });
  });


  /* ------------------------------------------------------------
     8. CONTACT FORM VALIDATION & SUBMISSION
     ------------------------------------------------------------ */
  const contactForm = document.getElementById('contactForm');
  const formFeedback = document.getElementById('formFeedback');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('studentName');
      const classSelect = document.getElementById('studentClass');
      const phoneInput = document.getElementById('studentPhone');
      const messageInput = document.getElementById('studentMessage');

      let isValid = true;

      // Validate Name
      if (!nameInput.value.trim()) {
        showFieldError(nameInput, 'nameError');
        isValid = false;
      } else {
        clearFieldError(nameInput);
      }

      // Validate Class Select
      if (!classSelect.value) {
        showFieldError(classSelect, 'classError');
        isValid = false;
      } else {
        clearFieldError(classSelect);
      }

      // Validate Phone (10 digits)
      const phoneVal = phoneInput.value.trim().replace(/\D/g, '');
      if (phoneVal.length !== 10) {
        showFieldError(phoneInput, 'phoneError');
        isValid = false;
      } else {
        clearFieldError(phoneInput);
      }

      if (isValid) {
        // Success simulation
        formFeedback.className = 'form-feedback is-success';
        formFeedback.innerHTML = `
          <strong>Thank you, ${escapeHTML(nameInput.value.trim())}!</strong><br>
          Your enquiry for <em>${escapeHTML(classSelect.value)}</em> has been recorded. Our academic coordinator will connect with you on WhatsApp (+91 ${phoneVal}) within 24 hours.
        `;

        contactForm.reset();

        // Show toast
        showToast('Enquiry submitted successfully!');
      } else {
        formFeedback.className = 'form-feedback is-error';
        formFeedback.textContent = 'Please fill out all required fields correctly before submitting.';
      }
    });

    // Clear field errors as user types
    ['studentName', 'studentClass', 'studentPhone'].forEach(id => {
      const field = document.getElementById(id);
      if (field) {
        field.addEventListener('input', () => clearFieldError(field));
        field.addEventListener('change', () => clearFieldError(field));
      }
    });
  }

  function showFieldError(field, errorId) {
    field.classList.add('is-invalid');
    const group = field.closest('.form-group');
    if (group) group.classList.add('has-error');
  }

  function clearFieldError(field) {
    field.classList.remove('is-invalid');
    const group = field.closest('.form-group');
    if (group) group.classList.remove('has-error');
  }


  /* ------------------------------------------------------------
     9. FREE DEMO CLASS MODAL
     ------------------------------------------------------------ */
  const demoModalBackdrop = document.getElementById('demoModalBackdrop');
  const closeDemoModalBtn = document.getElementById('closeDemoModalBtn');
  const openDemoModalBtns = document.querySelectorAll('.open-demo-modal');
  const demoModalForm = document.getElementById('demoModalForm');
  const modalFeedback = document.getElementById('modalFeedback');

  function openDemoModal(e) {
    if (e) e.preventDefault();
    if (demoModalBackdrop) {
      demoModalBackdrop.classList.add('is-open');
      demoModalBackdrop.setAttribute('aria-hidden', 'false');
      const firstInput = document.getElementById('demoName');
      if (firstInput) setTimeout(() => firstInput.focus(), 200);
    }
  }

  function closeDemoModal() {
    if (demoModalBackdrop) {
      demoModalBackdrop.classList.remove('is-open');
      demoModalBackdrop.setAttribute('aria-hidden', 'true');
      if (modalFeedback) modalFeedback.innerHTML = '';
      if (demoModalForm) demoModalForm.reset();
    }
  }

  openDemoModalBtns.forEach(btn => {
    btn.addEventListener('click', openDemoModal);
  });

  if (closeDemoModalBtn) {
    closeDemoModalBtn.addEventListener('click', closeDemoModal);
  }

  if (demoModalBackdrop) {
    demoModalBackdrop.addEventListener('click', (e) => {
      if (e.target === demoModalBackdrop) closeDemoModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && demoModalBackdrop && demoModalBackdrop.classList.contains('is-open')) {
      closeDemoModal();
    }
  });

  if (demoModalForm) {
    demoModalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const demoName = document.getElementById('demoName').value.trim();
      const demoClass = document.getElementById('demoClass').value;
      const demoPhone = document.getElementById('demoPhone').value.trim().replace(/\D/g, '');

      if (!demoName || !demoClass || demoPhone.length !== 10) {
        modalFeedback.className = 'form-feedback is-error';
        modalFeedback.textContent = 'Please enter student name, select grade, and provide a valid 10-digit number.';
        return;
      }

      modalFeedback.className = 'form-feedback is-success';
      modalFeedback.innerHTML = `
        <strong>Slot Reserved!</strong><br>
        Thank you, ${escapeHTML(demoName)}. We will confirm your demo schedule on WhatsApp (+91 ${demoPhone}).
      `;

      setTimeout(() => {
        closeDemoModal();
        showToast('Free Demo Class booked successfully!');
      }, 2500);
    });
  }


  /* ------------------------------------------------------------
     10. FREE RESOURCES DOWNLOAD INTERACTION
     ------------------------------------------------------------ */
  const downloadBtns = document.querySelectorAll('.btn-download');

  downloadBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const fileName = btn.getAttribute('data-file') || 'Physics-Notes.pdf';
      btn.innerHTML = `
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
        Downloaded!
      `;
      btn.classList.add('btn-primary');
      btn.classList.remove('btn-outline-primary');

      showToast(`Preparing ${fileName} for download...`);

      setTimeout(() => {
        btn.innerHTML = `
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          Download PDF
        `;
        btn.classList.remove('btn-primary');
        btn.classList.add('btn-outline-primary');
      }, 3500);
    });
  });


  /* ------------------------------------------------------------
     11. TOAST NOTIFICATION UTILITY
     ------------------------------------------------------------ */
  const toastNotification = document.getElementById('toastNotification');
  let toastTimer = null;

  function showToast(message) {
    if (!toastNotification) return;
    toastNotification.textContent = message;
    toastNotification.classList.add('is-visible');

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastNotification.classList.remove('is-visible');
    }, 3800);
  }


  /* ------------------------------------------------------------
     12. FOOTER DYNAMIC YEAR
     ------------------------------------------------------------ */
  const currentYearSpan = document.getElementById('currentYear');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }


  /* ------------------------------------------------------------
     13. PHOTO FALLBACK DETECTION SAFETY NET
     ------------------------------------------------------------ */
  const heroImg = document.getElementById('heroTeacherImg');
  const heroBox = document.getElementById('heroFallbackBox');
  if (heroImg && heroBox) {
    if (heroImg.complete && heroImg.naturalWidth === 0) {
      heroImg.style.display = 'none';
      heroBox.style.display = 'flex';
    }
  }

  const aboutImg = document.querySelector('.about-portrait-img');
  const aboutBox = document.getElementById('aboutFallbackBox');
  if (aboutImg && aboutBox) {
    if (aboutImg.complete && aboutImg.naturalWidth === 0) {
      aboutImg.style.display = 'none';
      aboutBox.style.display = 'flex';
    }
  }

  /* ------------------------------------------------------------
     14. HELPER FUNCTIONS
     ------------------------------------------------------------ */
  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
    );
  }

});
