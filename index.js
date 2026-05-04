const LETTERS = "abcdefghijklmnopqrstuvwxyz".split("");
const audioMap = new Map(
  LETTERS.map((letter) => [letter, new Audio(`sounds/${letter}.mp3`)])
);

const lettersGrid = document.querySelector(".letters-grid");
const yearElement = document.getElementById("current-year");

const setFooterYear = () => {
  if (!yearElement) return;
  yearElement.textContent = String(new Date().getFullYear());
};

const playLetterSound = (letter) => {
  const normalizedLetter = letter.toLowerCase();
  const audio = audioMap.get(normalizedLetter);

  if (!audio) return;

  audio.currentTime = 0;
  audio.play().catch((error) => {
    console.error(`Failed to play audio for letter "${normalizedLetter}".`, error);
  });
};

const animateLetterButton = (letter) => {
  const button = document.querySelector(`[data-letter="${letter.toLowerCase()}"]`);
  if (!button) return;

  button.classList.add("is-pressed");
  window.setTimeout(() => {
    button.classList.remove("is-pressed");
  }, 120);
};

const handleLetterAction = (letter) => {
  if (!letter || !LETTERS.includes(letter.toLowerCase())) return;

  playLetterSound(letter);
  animateLetterButton(letter);
};

lettersGrid?.addEventListener("click", (event) => {
  const button = event.target.closest(".letter-button");
  if (!button) return;

  handleLetterAction(button.dataset.letter);
});

document.addEventListener("keydown", (event) => {
  handleLetterAction(event.key);
});

setFooterYear();
