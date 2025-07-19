// JS/projects.js

// Set flag to indicate script loaded
window.projectsJSLoaded = true;

// Remove no-js class if JavaScript is enabled
document.documentElement.classList.remove('no-js');

// Immediately show cards if IntersectionObserver is not supported
if (!window.IntersectionObserver) {
  document.addEventListener("DOMContentLoaded", showAllCards);
} else {
  document.addEventListener("DOMContentLoaded", initializeAnimations);
}

function showAllCards() {
  const projectCards = document.querySelectorAll(".project-card");
  projectCards.forEach((card, index) => {
    setTimeout(() => {
      card.style.opacity = '1';
      card.style.transform = 'none';
      card.classList.add('fade-in');
    }, index * 200);
  });
}

function initializeAnimations() {
  const projectCards = document.querySelectorAll(".project-card");
  
  // Define animation directions for each card
  const animationTypes = ['animate-from-top', 'animate-from-left', 'animate-from-right', 'animate-from-bottom'];
  
  // Add animation classes to cards
  projectCards.forEach((card, index) => {
    const animationType = animationTypes[index % animationTypes.length];
    card.classList.add(animationType);
    card.style.transitionDelay = `${index * 0.3}s`; // Staggered entry
  });

  // Create intersection observer with error handling
  try {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in");
          observer.unobserve(entry.target); // Run animation once
        }
      });
    }, { 
      threshold: 0.1,
      rootMargin: "50px"
    });

    // Observe each project card
    projectCards.forEach((card) => {
      observer.observe(card);
    });

    // Fallback: Show cards after 2 seconds if animation hasn't triggered
    setTimeout(() => {
      projectCards.forEach((card) => {
        if (!card.classList.contains("fade-in")) {
          card.classList.add("fade-in");
        }
      });
    }, 2000);

  } catch (error) {
    console.warn('IntersectionObserver failed, falling back to immediate display:', error);
    showAllCards();
  }
}

// Additional fallback for slower connections
window.addEventListener('load', () => {
  setTimeout(() => {
    const projectCards = document.querySelectorAll(".project-card:not(.fade-in)");
    if (projectCards.length > 0) {
      console.log('Triggering fallback animation for', projectCards.length, 'cards');
      projectCards.forEach((card, index) => {
        setTimeout(() => {
          card.classList.add("fade-in");
        }, index * 100);
      });
    }
  }, 1000);
});

// Force show cards if they're still hidden after 5 seconds
setTimeout(() => {
  const hiddenCards = document.querySelectorAll(".project-card:not(.fade-in)");
  if (hiddenCards.length > 0) {
    console.log('Emergency fallback: showing', hiddenCards.length, 'hidden cards');
    hiddenCards.forEach((card) => {
      card.style.opacity = '1';
      card.style.transform = 'none';
      card.classList.add('fade-in');
    });
  }
}, 5000);