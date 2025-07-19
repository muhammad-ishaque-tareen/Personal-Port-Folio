// main.js

const roles = ["Full Stack Developer","Programmer", "MERN Stack Intern", "Web & Mobile Enthusiast"];
const typingSpeed = 150;
const erasingSpeed = 80;
const delayBetween = 2000;

let roleIndex = 0;
let charIndex = 0;
const target = document.getElementById("typewriter");
const cursor = document.querySelector(".cursor");

function type() {
  if (charIndex < roles[roleIndex].length) {
    target.textContent += roles[roleIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingSpeed);
  } else {
    setTimeout(erase, delayBetween);
  }
}

function erase() {
  if (charIndex > 0) {
    target.textContent = roles[roleIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, erasingSpeed);
  } else {
    roleIndex = (roleIndex + 1) % roles.length;
    setTimeout(type, typingSpeed);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  if (roles.length) setTimeout(type, delayBetween / 2);
  setInterval(() => cursor.classList.toggle("blink"), 500);
});
