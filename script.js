// ============================================
// MODERN PORTFOLIO - COMPLETE JAVASCRIPT
// Theme Toggle | Mobile Menu | Typing Effects
// Swiper Slider | Scroll Reveal | Smooth Scroll
// Robot Animation | Progress Bars | Active Nav
// ============================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {

  // ===== DARK/LIGHT MODE TOGGLE =====
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;
  
  // Function to apply theme
  function applyTheme(theme) {
    if (theme === 'light') {
      body.classList.add('light-mode');
      body.classList.remove('dark-mode');
      if (themeToggle) {
        themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
      }
      localStorage.setItem('portfolio_theme', 'light');
    } else {
      body.classList.add('dark-mode');
      body.classList.remove('light-mode');
      if (themeToggle) {
        themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
      }
      localStorage.setItem('portfolio_theme', 'dark');
    }
  }
  
  // Check for saved theme preference
  const savedTheme = localStorage.getItem('portfolio_theme');
  
  if (savedTheme === 'light') {
    applyTheme('light');
  } else {
    applyTheme('dark');
  }
  
  // Theme Toggle Button Click
  if (themeToggle) {
    themeToggle.addEventListener('click', function(e) {
      e.preventDefault();
      if (body.classList.contains('dark-mode')) {
        applyTheme('light');
      } else {
        applyTheme('dark');
      }
    });
  }

  // ===== Mobile Menu Toggle =====
  const menuToggle = document.getElementById('mobile-menu');
  const navMenu = document.getElementById('nav-menu');
  
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      navMenu.classList.toggle('active');
      const icon = menuToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
      }
    });
    
    // Close menu when clicking a link
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        navMenu.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-times');
        }
      });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (window.innerWidth <= 768) {
        if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
          navMenu.classList.remove('active');
          const icon = menuToggle.querySelector('i');
          if (icon) {
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
          }
        }
      }
    });
  }
  
  // Close mobile menu on window resize
  window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
      if (navMenu && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        const icon = menuToggle?.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-times');
        }
      }
    }
  });

  // ===== Typing Animation for Hero Section =====
  const words = ['Full Stack Developer',  'Python Developer',  'Software Developer', 'Problem Solver'];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingElement = document.querySelector('.typing-text');
  
  function typeEffect() {
    if (!typingElement) return;
    
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
      typingElement.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingElement.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }
    
    if (!isDeleting && charIndex === currentWord.length) {
      isDeleting = true;
      setTimeout(typeEffect, 2000);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      setTimeout(typeEffect, 500);
    } else {
      setTimeout(typeEffect, isDeleting ? 100 : 150);
    }
  }
  
  setTimeout(typeEffect, 500);
  
  // ===== About Section Typing Effect =====
  const aboutTypingElement = document.querySelector('.about-typing');
  if (aboutTypingElement) {
    const aboutWords = [ ' Software Developer', ' Aspiring Full Stack Developer', ' Backend Developer', ' Flask Developer', ' Problem Solver', ' API Builder', ' Tech Enthusiast' ];
    let aboutWordIndex = 0;
    let aboutCharIndex = 0;
    let aboutIsDeleting = false;
    
    function aboutTypeEffect() {
      const currentWord = aboutWords[aboutWordIndex];
      
      if (aboutIsDeleting) {
        aboutTypingElement.textContent = currentWord.substring(0, aboutCharIndex - 1);
        aboutCharIndex--;
      } else {
        aboutTypingElement.textContent = currentWord.substring(0, aboutCharIndex + 1);
        aboutCharIndex++;
      }
      
      if (!aboutIsDeleting && aboutCharIndex === currentWord.length) {
        aboutIsDeleting = true;
        setTimeout(aboutTypeEffect, 1500);
      } else if (aboutIsDeleting && aboutCharIndex === 0) {
        aboutIsDeleting = false;
        aboutWordIndex = (aboutWordIndex + 1) % aboutWords.length;
        setTimeout(aboutTypeEffect, 500);
      } else {
        setTimeout(aboutTypeEffect, aboutIsDeleting ? 80 : 120);
      }
    }
    
    setTimeout(aboutTypeEffect, 1000);
  }

  // ===== Scroll Reveal Animation =====
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { 
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  });
  
  revealElements.forEach(el => revealObserver.observe(el));
  
  // Add reveal class to sections
  const sectionsToReveal = document.querySelectorAll('.section, .hero-content, .about-grid, .skills-grid, .education-grid, .project-slider, .contact-box');
  sectionsToReveal.forEach(el => {
    if (!el.classList.contains('reveal')) {
      el.classList.add('reveal');
      revealObserver.observe(el);
    }
  });

  // ===== Smooth Scroll for Navigation Links (Fixed - No Blink) =====
  const allNavLinks = document.querySelectorAll('a[href^="#"]');
  const header = document.querySelector('header');
  const headerHeight = header ? header.offsetHeight : 80;
  
  allNavLinks.forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === "#" || href === "" || href === "#home") return;
      
      const targetElement = document.querySelector(href);
      if (targetElement) {
        e.preventDefault();
        
        // Get element position
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerHeight + 10;
        
        // Smooth scroll with native behavior
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        
        // Update URL without causing jump
        history.pushState(null, null, href);
      }
    });
  });

  // ===== Initialize Swiper Slider =====
  if (typeof Swiper !== 'undefined') {
    const swiperContainer = document.querySelector('.project-slider');
    if (swiperContainer) {
      setTimeout(() => {
        const swiper = new Swiper('.project-slider', {
          slidesPerView: 1,
          spaceBetween: 30,
          loop: true,
          autoplay: {
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          },
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true,
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
          breakpoints: {
            640: { slidesPerView: 1, spaceBetween: 20 },
            768: { slidesPerView: 2, spaceBetween: 25 },
            1024: { slidesPerView: 2, spaceBetween: 30 },
          },
          effect: 'slide',
          speed: 600,
          grabCursor: true,
        });
        
        window.addEventListener('resize', () => swiper.update());
      }, 100);
    }
  }

  // ===== Progress Bar Animation =====
  const progressBars = document.querySelectorAll('.progress-fill');
  
  const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const width = bar.style.width;
        bar.style.width = '0%';
        setTimeout(() => { bar.style.width = width; }, 100);
        progressObserver.unobserve(bar);
      }
    });
  }, { threshold: 0.5 });
  
  progressBars.forEach(bar => progressObserver.observe(bar));

  // ===== Set Current Year =====
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // ===== Active Nav Link on Scroll =====
  const sections = document.querySelectorAll('section');
  const navLinksDynamic = document.querySelectorAll('.nav-link');
  
  function updateActiveNav() {
    let current = '';
    const scrollPosition = window.scrollY + 150;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });
    
    navLinksDynamic.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href === `#${current}`) {
        link.classList.add('active');
      }
    });
  }
  
  window.addEventListener('scroll', updateActiveNav);
  updateActiveNav();

  // ===== Force reveal on load =====
  setTimeout(() => {
    const allReveal = document.querySelectorAll('.reveal');
    allReveal.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 50) {
        el.classList.add('active');
      }
    });
  }, 200);
  
  // Add loaded class
  window.addEventListener('load', function() {
    document.body.classList.add('loaded');
  });

  // ===== Robot/Animation Mouse Move Effect =====
  const robot = document.querySelector(".hero-animation");
  
  if (robot) {
    document.addEventListener("mousemove", (e) => {
      // Calculate mouse position relative to center of screen
      const mouseX = e.clientX / window.innerWidth;
      const mouseY = e.clientY / window.innerHeight;
      
      // Calculate movement range (max 30px in each direction)
      const moveX = (mouseX - 0.5) * 30;
      const moveY = (mouseY - 0.5) * 30;
      
      // Apply smooth transform
      robot.style.transform = `translate(${moveX}px, ${moveY}px)`;
      robot.style.transition = 'transform 0.1s ease-out';
    });
    
    // Reset position when mouse leaves window
    document.addEventListener("mouseleave", () => {
      robot.style.transform = `translate(0px, 0px)`;
    });
  }

  // ===== Fix for Lottie Player on Mobile =====
  const lottiePlayer = document.querySelector('dotlottie-player');
  if (lottiePlayer && window.innerWidth <= 768) {
    lottiePlayer.setAttribute('style', 'width: 220px; height: 220px; max-width: 100%;');
  }
  
  // ===== Handle window resize for lottie player =====
  window.addEventListener('resize', function() {
    if (lottiePlayer) {
      if (window.innerWidth <= 480) {
        lottiePlayer.setAttribute('style', 'width: 180px; height: 180px; max-width: 100%;');
      } else if (window.innerWidth <= 768) {
        lottiePlayer.setAttribute('style', 'width: 220px; height: 220px; max-width: 100%;');
      } else {
        lottiePlayer.setAttribute('style', 'width: 400px; height: 400px; max-width: 100%;');
      }
    }
  });

  // ===== Prevent scrollbar shift on page load =====
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  if (scrollbarWidth > 0) {
    document.body.style.marginRight = '0px';
  }

  // ===== Add smooth reveal for initial content =====
  const heroContent = document.querySelector('.hero-content');
  if (heroContent && !heroContent.classList.contains('reveal')) {
    heroContent.classList.add('reveal');
    setTimeout(() => {
      heroContent.classList.add('active');
    }, 100);
  }
});

// ===== Handle page load performance =====
window.addEventListener('load', function() {
  // Remove any preloader if exists
  document.body.style.visibility = 'visible';
  
  // Fix any height issues with sections
  const hero = document.querySelector('.hero');
  if (hero) {
    const minHeight = window.innerHeight - 100;
    hero.style.minHeight = `${minHeight}px`;
  }
});

// ===== Smooth scroll fix for Safari =====
if (navigator.userAgent.includes('Safari') && !navigator.userAgent.includes('Chrome')) {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === "#" || href === "" || href === "#home") return;
      
      const targetElement = document.querySelector(href);
      if (targetElement) {
        e.preventDefault();
        const headerHeight = document.querySelector('header')?.offsetHeight || 80;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        
        setTimeout(() => {
          window.scrollTo({
            top: targetPosition - headerHeight,
            behavior: 'smooth'
          });
        }, 10);
      }
    });
  });
}