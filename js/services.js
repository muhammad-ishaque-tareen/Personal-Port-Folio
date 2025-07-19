// JS/services.js

// Flag that script loaded
window.servicesJSLoaded = true;

// Remove fallback class
document.documentElement.classList.remove('no-js');

// Show cards immediately if no IntersectionObserver
if (!window.IntersectionObserver) {
  document.addEventListener("DOMContentLoaded", showAllCards);
} else {
  document.addEventListener("DOMContentLoaded", initializeAnimations);
}

function showAllCards() {
  const cards = document.querySelectorAll(".project-card");
  cards.forEach((card, index) => {
    setTimeout(() => {
      card.style.opacity = '1';
      card.style.transform = 'none';
      card.classList.add('fade-in');
    }, index * 200);
  });
}

function initializeAnimations() {
  const cards = document.querySelectorAll(".project-card");
  const directions = ['animate-from-top', 'animate-from-left', 'animate-from-right', 'animate-from-bottom'];

  cards.forEach((card, i) => {
    const dir = directions[i % directions.length];
    card.classList.add(dir);
    card.style.transitionDelay = `${i * 0.3}s`;
  });

  try {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in");
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: "50px"
    });

    cards.forEach((card) => observer.observe(card));

    setTimeout(() => {
      cards.forEach((card) => {
        if (!card.classList.contains("fade-in")) {
          card.classList.add("fade-in");
        }
      });
    }, 2000);

  } catch (e) {
    console.warn("IntersectionObserver failed, fallback used:", e);
    showAllCards();
  }
}

window.addEventListener("load", () => {
  setTimeout(() => {
    const hidden = document.querySelectorAll(".project-card:not(.fade-in)");
    hidden.forEach((card, i) => {
      setTimeout(() => card.classList.add("fade-in"), i * 100);
    });
  }, 1000);
});

setTimeout(() => {
  const hidden = document.querySelectorAll(".project-card:not(.fade-in)");
  hidden.forEach(card => {
    card.style.opacity = '1';
    card.style.transform = 'none';
    card.classList.add('fade-in');
  });
}, 5000);
