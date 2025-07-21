// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function () {
  const toggle = document.querySelector('.mobile-menu-toggle');
  const menu = document.querySelector('.nav-menu');
  
  // Toggle mobile menu
  toggle.addEventListener('click', () => {
    menu.classList.toggle('active');
    toggle.classList.toggle('open');
  });

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







window.addEventListener('scroll', handleScroll);