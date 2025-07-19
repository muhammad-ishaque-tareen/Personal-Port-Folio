// JS/projects.js

document.addEventListener("DOMContentLoaded", () => {
  const projectCards = document.querySelectorAll(".project-card");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
        observer.unobserve(entry.target); // Run animation once
      }
    });
  }, { threshold: 0.2 });

  projectCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.2}s`; // Staggered entry
    observer.observe(card);
  });
});
