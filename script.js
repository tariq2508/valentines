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
  const yesRect = yesBtn.getBoundingClientRect();
  
  // Calculate random position across entire viewport
  const maxX = viewportWidth - btnRect.width - 20;
  const maxY = viewportHeight - btnRect.height - 20;
  
  let newX, newY;
  let attempts_to_place = 0;
  const max_attempts = 50;
  
  // Keep trying until we find a position that doesn't overlap with Yes button
  do {
    newX = Math.random() * maxX;
    newY = Math.random() * maxY;
    attempts_to_place++;
    
    // Check if the new position overlaps with Yes button
    // Add padding of 20px around Yes button to create safe zone
    const padding = 20;
    const noRight = newX + btnRect.width;
    const noBottom = newY + btnRect.height;
    
    const yesLeft = yesRect.left - padding;
    const yesRight = yesRect.right + padding;
    const yesTop = yesRect.top - padding;
    const yesBottom = yesRect.bottom + padding;
    
    // Check if rectangles don't overlap
    const noOverlap = (
      noRight < yesLeft ||
      newX > yesRight ||
      noBottom < yesTop ||
      newY > yesBottom
    );
    
    if (noOverlap) break;
  } while (attempts_to_place < max_attempts);
  
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
