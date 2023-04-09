// Pobieramy elementy paragrafów
const leftColumn = document.querySelector("#left p");
const rightColumn = document.querySelector("#right p");
const suma = 0;
// Dzielimy zawartość paragrafów na słowa
const leftWords = leftColumn.textContent
  .trim()
  .split(" ")
  .filter((word) => word)
  .map((word) => word.trim());
const rightWords = rightColumn.textContent
  .trim()
  .split(" ")
  .filter((word) => word)
  .map((word) => word.trim());

leftColumn.innerHTML = "";

// Iterujemy po słowach w lewej kolumnie i sprawdzamy, czy istnieją w prawej kolumnie
for (let i = 0; i < leftWords.length; i++) {
  if (leftWords[i]) {
    // Tworzymy nowy element do zastąpienia każdego słowa
    const span = document.createElement("span");
    span.textContent = leftWords[i] + " ";

    span.addEventListener("click", () => {
      console.log("Kliknięto na słowo");
      if (rightWords[i] === leftWords[i]) {
        // Jeśli tak, to ustawiamy kolor na zielony
        span.style.color = "green";
      } else {
        span.style.backgroundColor = "red";
        suma++;
      }
    });

    // Zamieniamy oryginalne słowo na nowo utworzony element z kolorem
    leftColumn.appendChild(span);
  }
}
let czas;
let timeSpent;
function startTimer() {
  czas = performance.now();
}

function stopTimer() {
  const endTime = performance.now();
  const timeSpent = (endTime - czas) / 1000;
  console.log(`Czas wykonywania zadania: ${timeSpent} sekund`);

  $.ajax({
    url: "/page5",
    type: "POST",
    data: { timetak: timeSpent, sum: suma},
    success: function(response) {
      console.log(response);
      window.location.href = "/page6";
    },
    error: function(xhr, status, error) {
      console.log(xhr.responseText);
    }
  });
}