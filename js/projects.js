
window.projectsJSLoaded = true;


document.documentElement.classList.remove('no-js');


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
  

  const animationTypes = ['animate-from-top', 'animate-from-left', 'animate-from-right', 'animate-from-bottom'];
  
 
  projectCards.forEach((card, index) => {
    const animationType = animationTypes[index % animationTypes.length];
    card.classList.add(animationType);
    card.style.transitionDelay = `${index * 0.3}s`; 
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


    projectCards.forEach((card) => {
      observer.observe(card);
    });

   
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