let attempts = 0;

const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const question = document.getElementById("question");

const texts = [
  "Why are you like this? 😭",
  "Stop playing 💔",
  "You know you want to say yes 😏",
  "I'm begging you now 🥺",
  "I'm not going to stop until you say YES 😌",
  "Last chance!",
  "Come ooooon 😩",
  "Just one little yes 🥺👉👈",
  "NO is not an option anymore 😌",
];

function moveNoButton() {
  attempts++;

  // Update text - loop through messages
  question.textContent = texts[(attempts - 1) % texts.length];

  // Get viewport dimensions
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const btnRect = noBtn.getBoundingClientRect();
  
  // Calculate random position across entire viewport
  const maxX = viewportWidth - btnRect.width - 20;
  const maxY = viewportHeight - btnRect.height - 20;
  
  const newX = Math.random() * maxX;
  const newY = Math.random() * maxY;
  
  // Position absolutely on the page
  noBtn.style.position = 'fixed';
  noBtn.style.left = `${newX}px`;
  noBtn.style.top = `${newY}px`;
  noBtn.style.transform = 'none';

  // Grow YES button but cap at 2x size
  const yesScale = Math.min(2, 1 + attempts * 0.15);
  yesBtn.style.transform = `scale(${yesScale})`;
  yesBtn.style.zIndex = "10";
}

noBtn.addEventListener("mouseenter", moveNoButton);

yesBtn.addEventListener("click", () => {
  document.body.innerHTML = `
    <img src="happyDance.gif" alt="Happy Dance" style="max-width: 300px; margin-bottom: 20px;">
    <h1>Yayyyy 🥰💖</h1>
    <p>You are officially my Valentine 😍</p>
  `;
});

console.log(texts.length);

// for mobile devices where hover is not possible
noBtn.addEventListener("touchstart", (e) => {
  e.preventDefault();
  moveNoButton();
});
