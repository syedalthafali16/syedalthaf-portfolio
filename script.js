// ============================================
// MODERN PORTFOLIO - COMPLETE JAVASCRIPT
// Theme Toggle | Mobile Menu | Typing Effects
// Infinity Typing Lines | Scroll Reveal
// Robot Animation | Progress Bars | Active Nav
// ============================================

(function() {
  'use strict';

  // ----- DOM REFS -----
  const intro = document.getElementById('intro');
  const scenes = document.querySelectorAll('.scene');
  const portfolio = document.getElementById('portfolio');
  const loadingBar = document.getElementById('loading-bar');
  const loadingPercent = document.getElementById('loading-percent');
  const loadingContainer = document.getElementById('loading-container');

  let currentScene = 0;
  const sceneCount = scenes.length;
  let isAnimating = false;
  let timer = null;
  let introCompleted = false;
  let loadingComplete = false;

  // ----- LOADING PROGRESS -----
  let progress = 0;
  const totalDuration = 7500;
  const startTime = Date.now();

  function updateLoading() {
    const elapsed = Date.now() - startTime;
    progress = Math.min(elapsed / totalDuration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const percent = Math.round(eased * 100);
    
    if (loadingBar) loadingBar.style.width = percent + '%';
    if (loadingPercent) loadingPercent.textContent = percent + '%';

    if (progress < 1) {
      requestAnimationFrame(updateLoading);
    } else {
      if (loadingBar) loadingBar.style.width = '100%';
      if (loadingPercent) loadingPercent.textContent = '100%';
      
      if (!loadingComplete) {
        loadingComplete = true;
        hideLoadingBar();
      }
    }
  }

  // ----- Hide Loading Bar Function -----
  function hideLoadingBar() {
    if (loadingContainer) {
      loadingContainer.style.opacity = '0';
      loadingContainer.style.transition = 'opacity 0.5s ease';
      setTimeout(() => {
        loadingContainer.style.display = 'none';
      }, 500);
    }
  }

  // ----- SCENE TRANSITION -----
  function transitionToScene(index) {
    if (isAnimating) return;
    if (index >= sceneCount) {
      finishIntro();
      return;
    }

    isAnimating = true;

    scenes.forEach((s, i) => {
      if (i === currentScene) {
        s.classList.remove('active');
      }
    });

    setTimeout(() => {
      currentScene = index;
      scenes[currentScene].classList.add('active');

      // FIXED: use .intro-text instead of .hero-text
      const text = scenes[currentScene].querySelector('.intro-text');
      if (text) {
        text.style.animation = 'none';
        void text.offsetHeight;
        const sceneId = scenes[currentScene].id;
        if (sceneId === 'scene-1') {
          text.style.animation = 'scene1Reveal 1.4s cubic-bezier(0.23, 1, 0.32, 1) forwards';
        } else if (sceneId === 'scene-2') {
          text.style.animation = 'scene2Reveal 1.4s cubic-bezier(0.23, 1, 0.32, 1) forwards';
        } else if (sceneId === 'scene-3') {
          text.style.animation = 'scene3Reveal 1.4s cubic-bezier(0.23, 1, 0.32, 1) forwards';
        }
      }

      isAnimating = false;

      const sceneId = scenes[currentScene].id;
      let duration = 1600;
      if (sceneId === 'scene-1') duration = 1800;
      if (sceneId === 'scene-2') duration = 1600;
      if (sceneId === 'scene-3') duration = 1700;

      timer = setTimeout(() => {
        transitionToScene(currentScene + 1);
      }, duration);

    }, 700);
  }

  // ----- FINISH INTRO -----
  function finishIntro() {
    if (introCompleted) return;
    introCompleted = true;

    if (timer) clearTimeout(timer);
    
    if (intro) intro.classList.add('fade-out');
    
    setTimeout(() => {
      if (portfolio) portfolio.classList.add('visible');
      if (intro) intro.style.display = 'none';
      
      if (!loadingComplete) {
        loadingComplete = true;
        hideLoadingBar();
      }
    }, 1200);
  }

  // ----- START -----
  updateLoading();
    timer = setTimeout(() => {
      transitionToScene(1);
  }, 1800);

  // ----- SKIP FUNCTIONALITY -----
  function skipToPortfolio() {
    if (introCompleted) return;
    if (intro && !intro.classList.contains('fade-out')) {
      if (timer) clearTimeout(timer);
      introCompleted = true;
      
      intro.classList.add('fade-out');
      setTimeout(() => {
        if (portfolio) portfolio.classList.add('visible');
        if (intro) intro.style.display = 'none';
        
        if (!loadingComplete) {
          loadingComplete = true;
          hideLoadingBar();
        }
      }, 1200);
    }
  }

  document.addEventListener('click', (e) => {
    if (e.target.closest('a') || e.target.closest('button')) return;
    if (portfolio && !portfolio.classList.contains('visible') && !introCompleted) {
      skipToPortfolio();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      if (portfolio && !portfolio.classList.contains('visible') && !introCompleted) {
        e.preventDefault();
        skipToPortfolio();
      }
    }
  });

  // Safety fallback
  setTimeout(() => {
    if (!loadingComplete) {
      loadingComplete = true;
      hideLoadingBar();
    }
    if (portfolio && !portfolio.classList.contains('visible')) {
      skipToPortfolio();
    }
  }, 10000);

})();


// ============================================================
//  DOM CONTENT LOADED — MAIN FUNCTIONALITY
// ============================================================
document.addEventListener('DOMContentLoaded', function() {

  // ===== DARK/LIGHT MODE TOGGLE =====
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;
  
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
  
  const savedTheme = localStorage.getItem('portfolio_theme');
  applyTheme(savedTheme === 'light' ? 'light' : 'dark');
  
  if (themeToggle) {
    themeToggle.addEventListener('click', function(e) {
      e.preventDefault();
      applyTheme(body.classList.contains('dark-mode') ? 'light' : 'dark');
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
    
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function() {
        navMenu.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-times');
        }
      });
    });
    
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
  
  window.addEventListener('resize', function() {
    if (window.innerWidth > 768 && navMenu && navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
      const icon = menuToggle?.querySelector('i');
      if (icon) {
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
      }
    }
  });

  // ===== Typing Animation for Hero Section =====
  const words = ['Full Stack Developer', 'Python Developer', 'Software Developer', 'Problem Solver'];
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
    const aboutWords = ['Software Developer', 'Full Stack Developer', 'Backend Developer', 'Flask Developer', 'Problem Solver', 'API Builder'];
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


  // ============================================================
  //  INFINITY TYPING LINES — for project cards
  // ============================================================
  const typingLines = document.querySelectorAll('.typing-line');

  typingLines.forEach(function(line) {
    const textsAttr = line.getAttribute('data-texts');
    if (!textsAttr) return;

    const phrases = textsAttr.split('|').map(s => s.trim());
    let currentPhraseIndex = 0;
    let currentCharIndex = 0;
    let isDeletingLine = false;
    let lineInterval = null;

    function typeLine() {
      const currentPhrase = phrases[currentPhraseIndex];
      if (!currentPhrase) return;

      // Build the display text
      if (isDeletingLine) {
        line.textContent = currentPhrase.substring(0, currentCharIndex - 1);
        currentCharIndex--;
      } else {
        line.textContent = currentPhrase.substring(0, currentCharIndex + 1);
        currentCharIndex++;
      }

      // Decide next step
      if (!isDeletingLine && currentCharIndex === currentPhrase.length) {
        // Full phrase typed → pause then delete
        isDeletingLine = true;
        clearTimeout(lineInterval);
        lineInterval = setTimeout(typeLine, 1800);
        return;
      }

      if (isDeletingLine && currentCharIndex === 0) {
        // Fully deleted → move to next phrase
        isDeletingLine = false;
        currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
        clearTimeout(lineInterval);
        lineInterval = setTimeout(typeLine, 400);
        return;
      }

      // Continue typing/deleting
      const delay = isDeletingLine ? 60 : 100;
      clearTimeout(lineInterval);
      lineInterval = setTimeout(typeLine, delay);
    }

    // Start the infinity loop for this line
    lineInterval = setTimeout(typeLine, 300);
  });


  // ============================================================
  //  SCROLL REVEAL ANIMATION
  // ============================================================
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

  // Observe existing .reveal elements
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // Auto-reveal sections (without .reveal class)
  const sectionsToReveal = document.querySelectorAll(
    '.section, .hero-content, .about-grid, .skills-grid, ' +
    '.education-list, .experience-list, .contact-box, ' +
    '.projects-categories, .category-section'
  );
  sectionsToReveal.forEach(el => {
    if (!el.classList.contains('reveal')) {
      el.classList.add('reveal');
      revealObserver.observe(el);
    }
  });

  // ===== Smooth Scroll for Navigation Links =====
  const header = document.querySelector('header');
  const headerHeight = header ? header.offsetHeight : 80;
  
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === "#" || href === "" || href === "#home") return;
      
      const targetElement = document.querySelector(href);
      if (targetElement) {
        e.preventDefault();
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerHeight + 10;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        
        history.pushState(null, null, href);
      }
    });
  });

  // ===== Progress Bar Animation =====
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
  
  document.querySelectorAll('.progress-fill').forEach(bar => progressObserver.observe(bar));

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
    document.querySelectorAll('.reveal').forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 50) {
        el.classList.add('active');
      }
    });
  }, 200);
  
  window.addEventListener('load', function() {
    document.body.classList.add('loaded');
  });

  // ===== Robot Animation Mouse Move Effect =====
  const robot = document.querySelector(".hero-animation");
  if (robot) {
    document.addEventListener("mousemove", (e) => {
      const mouseX = e.clientX / window.innerWidth;
      const mouseY = e.clientY / window.innerHeight;
      
      const moveX = (mouseX - 0.5) * 30;
      const moveY = (mouseY - 0.5) * 30;
      
      robot.style.transform = `translate(${moveX}px, ${moveY}px)`;
      robot.style.transition = 'transform 0.1s ease-out';
    });
    
    document.addEventListener("mouseleave", () => {
      robot.style.transform = `translate(0px, 0px)`;
    });
  }

  // ===== Lottie Player Responsive Sizing =====
  const lottiePlayer = document.querySelector('dotlottie-player');
  if (lottiePlayer) {
    function updateLottieSize() {
      let w = 400;
      if (window.innerWidth <= 480) w = 180;
      else if (window.innerWidth <= 768) w = 220;
      lottiePlayer.setAttribute('style', `width: ${w}px; height: ${w}px; max-width: 100%;`);
    }
    updateLottieSize();
    window.addEventListener('resize', updateLottieSize);
  }

  // ===== Prevent scrollbar shift =====
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  if (scrollbarWidth > 0) {
    document.body.style.marginRight = '0px';
  }

  // ===== Hero reveal =====
  const heroContent = document.querySelector('.hero-content');
  if (heroContent && !heroContent.classList.contains('reveal')) {
    heroContent.classList.add('reveal');
    setTimeout(() => heroContent.classList.add('active'), 100);
  }
});


// ============================================================
//  PAGE LOAD — visibility + hero min-height
// ============================================================
window.addEventListener('load', function() {
  document.body.style.visibility = 'visible';
  
  const hero = document.querySelector('.hero');
  if (hero) {
    hero.style.minHeight = `${window.innerHeight - 100}px`;
  }
});


// ============================================================
//  SAFARI SMOOTH SCROLL FIX
// ============================================================
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