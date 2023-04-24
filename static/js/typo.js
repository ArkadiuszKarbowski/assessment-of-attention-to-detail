// Pobieramy elementy paragrafów
const leftColumn = document.querySelector("#left p");
const rightColumn = document.querySelector("#right p");
let suma = 0;
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
  timeSpent = (endTime - czas) / 1000;
  console.log(`Czas wykonywania zadania: ${timeSpent} sekund`);


  sendData();
}

function sendData(){
    const dict_values = {timeSpent, suma};
    const s = JSON.stringify(dict_values);

$.ajax({
        url:"/page5",
        type:"POST",
        contentType: "application/json",
        data: JSON.stringify(s),
        success: function(response) {
            if (response.status === 'success') { 
                window.location.href = response.redirect;
            }
        }
        });
      
       
}
