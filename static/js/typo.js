// Pobieramy elementy paragrafów
const leftColumn = document.querySelector("#left p");
const rightColumn = document.querySelector("#right p");
let suma = 0;
let czas;
let timeSpent = 0;
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

function startTimer() {
  czas = performance.now();
}

function stopTimer() {
  const endTime = performance.now();
  timeSpent = (endTime - czas) / 1000;
  console.log(`Czas wykonywania zadania: ${timeSpent} sekund`);

}

function nxtBtn(){
  stopTimer();
  send();
}
function send(){
  
  const dataToSend = {
    sum: suma,
    timetak: timeSpent.toFixed(2)
  };
  
  // Wysyłamy żądanie POST na serwer
  fetch('/endpoint-na-serwerze', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dataToSend)
  })
  .then(response => {
    if (response.ok) {
      console.log('Dane przesłane na serwer.');
    } else {
      console.error('Błąd podczas przesyłania danych na serwer.');
    }
  })
  .catch(error => {
    console.error('Błąd podczas przesyłania danych na serwer:', error);
  });
}