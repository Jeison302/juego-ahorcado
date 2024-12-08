// script.js

// Palabras posibles
const words = ["javascript", "frontend", "programacion", "computadora", "ahorcado"];
const word = words[Math.floor(Math.random() * words.length)]; // Palabra al azar
let guessedWord = Array(word.length).fill("_");
let attemptsLeft = 6;
const usedLetters = new Set();

// Elementos del DOM
const hangmanWord = document.getElementById("hangman-word");
const remainingAttempts = document.getElementById("remaining-attempts");
const usedLettersElement = document.getElementById("used-letters");
const messageElement = document.getElementById("message");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-button");

// Inicialización
hangmanWord.textContent = guessedWord.join(" ");
remainingAttempts.textContent = attemptsLeft;

// Capturar letras
document.addEventListener("keydown", (event) => {
  const letter = event.key.toLowerCase();

  // Validar entrada
  if (!/^[a-zñ]$/.test(letter)) return; // Solo letras
  if (usedLetters.has(letter)) return; // No repetir

  usedLetters.add(letter);
  updateUsedLetters();

  // Comprobar si la letra está en la palabra
  if (word.includes(letter)) {
    updateWord(letter);
    if (!guessedWord.includes("_")) {
      endGame(true); // Ganaste
    }
  } else {
    attemptsLeft--;
    remainingAttempts.textContent = attemptsLeft;
    if (attemptsLeft === 0) {
      endGame(false); // Perdiste
    }
  }
});

// Actualizar las letras usadas
function updateUsedLetters() {
  usedLettersElement.textContent = Array.from(usedLetters).join(", ");
}

// Actualizar la palabra mostrada
function updateWord(letter) {
  for (let i = 0; i < word.length; i++) {
    if (word[i] === letter) {
      guessedWord[i] = letter;
    }
  }
  hangmanWord.textContent = guessedWord.join(" ");
}

// Mostrar el resultado
function endGame(won) {
  messageElement.classList.remove("hidden");
  messageElement.style.display = "block";

  if (won) {
    resultMessage.textContent = "¡GANASTE! 🎉";
    resultMessage.style.color = "green";
  } else {
    resultMessage.textContent = `¡PERDISTE! La palabra era: ${word}`;
    resultMessage.style.color = "red";
  }
}

// Reiniciar el juego
restartButton.addEventListener("click", () => {
  location.reload(); // Recargar la página
});


