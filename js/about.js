document.addEventListener("DOMContentLoaded", () => {
  const fadeElements = document.querySelectorAll(".fade-in-up");

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add("visible");
          }, i * 300); // staggered reveal
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.3,
    }
  );

  fadeElements.forEach((el) => {
    observer.observe(el);
  });

  // Fallback: force reveal after 3s if not visible
  setTimeout(() => {
    fadeElements.forEach((el) => {
      el.classList.add("visible");
    });
  }, 3000);
});
