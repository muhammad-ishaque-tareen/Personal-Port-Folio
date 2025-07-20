// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function () {
  const toggle = document.querySelector('.mobile-menu-toggle');
  const menu = document.querySelector('.nav-menu');
  
  // Toggle mobile menu
  toggle.addEventListener('click', () => {
    menu.classList.toggle('active');
    toggle.classList.toggle('open');
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!toggle.contains(e.target) && !menu.contains(e.target)) {
      menu.classList.remove('active');
      toggle.classList.remove('open');
    }
  });

  // Close menu when clicking on a nav link (mobile)
  const navLinks = document.querySelectorAll('.nav-menu a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('active');
      toggle.classList.remove('open');
    });
  });
});

// Legacy Typewriter Effect Variables (if needed for other pages)
const roles = [
  "Web Developer",
  "Front-End Engineer", 
  "MERN Stack Developer",
  "JavaScript Enthusiast",
  "ReactJS Specialist",
  "Programmer"
];

const typingSpeed = 100;
const erasingSpeed = 50;
const delayBetween = 2000;

let roleIndex = 0;
let charIndex = 0;

// Legacy Typewriter Functions (for compatibility)
function type() {
  const target = document.getElementById("typewriter");
  if (target && charIndex < roles[roleIndex].length) {
    target.textContent += roles[roleIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingSpeed);
  } else if (target) {
    setTimeout(erase, delayBetween);
  }
}

function erase() {
  const target = document.getElementById("typewriter");
  if (target && charIndex > 0) {
    target.textContent = roles[roleIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, erasingSpeed);
  } else if (target) {
    roleIndex = (roleIndex + 1) % roles.length;
    setTimeout(type, typingSpeed);
  }
}

// Initialize typewriter if element exists
function initializeTypewriter() {
  const typewriterElement = document.getElementById("typewriter");
  if (typewriterElement && roles.length) {
    setTimeout(type, delayBetween / 2);
  }
}

// Cursor blink effect for typewriter
function initializeCursor() {
  const cursor = document.querySelector(".cursor");
  if (cursor) {
    setInterval(() => cursor.classList.toggle("blink"), 500);
  }
}

// Smooth scrolling for anchor links
function initializeSmoothScrolling() {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Fade in animation on scroll
function initializeFadeInAnimation() {
  const fadeElements = document.querySelectorAll('.fade-in-up');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  fadeElements.forEach(element => {
    observer.observe(element);
  });
}

// Initialize all features when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Core navigation functionality
  
  // Optional features (only if elements exist)
  initializeTypewriter();
  initializeCursor();
  initializeSmoothScrolling();
  initializeFadeInAnimation();
  
  // Header scroll effect
  window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
      header.style.background = 'rgba(26, 26, 46, 0.95)';
    } else {
      header.style.background = 'rgba(26, 26, 46, 0.8)';
    }
  });
});

// Performance optimization - debounce scroll events
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

// Optimized scroll handler
const handleScroll = debounce(() => {
  const header = document.querySelector('header');
  if (header) {
    if (window.scrollY > 100) {
      header.style.background = 'rgba(26, 26, 46, 0.95)';
    } else {
      header.style.background = 'rgba(26, 26, 46, 0.8)';
    }
  }
}, 10);

window.addEventListener('scroll', handleScroll);