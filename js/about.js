// about.js

// === Fade-in Animations for Sections ===
const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll(".fade-in-up").forEach((el) => {
  observer.observe(el);
});

// === Mobile Menu Toggle ===
const mobileToggle = document.querySelector(".mobile-menu-toggle");
const navMenu = document.querySelector(".nav-menu");

mobileToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  mobileToggle.classList.toggle("open");
});
