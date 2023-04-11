Oto poprawiony kod JavaScript, który usuwa obrazy po kliknięciu i zapisuje ich id do zmiennej selectedanswer:

js
Copy code
var selectedanswer = "";
var clickedSquares = [];
let czas;
let timeSpent;

function startTimer() {
  czas = performance.now();
}

// funkcja obsługująca kliknięcie w kwadrat
function handleClick(square) {
  if (!clickedSquares.includes(square)) { // sprawdzenie, czy kwadrat nie został już kliknięty
    clickedSquares.push(square); // dodanie klikniętego kwadratu do listy klikniętych
    selectedanswer += square.id.replace("square", ""); // dodanie numeru klikniętego kwadratu do zapisanej odpowiedzi
    square.style.backgroundImage = "none"; // usunięcie obrazka
  }
}

// dodanie obsługi kliknięć na kwadratach
document.querySelectorAll(".square").forEach(function(square) {
  square.addEventListener("click", function() {
    handleClick(square);
  });
});


function stopTimer() {
  const endTime = performance.now();
  const timeSpent = (endTime - czas) / 1000;
  console.log(`Czas wykonywania zadania: ${timeSpent} sekund`);
  $.ajax({
    url: "/page18",
    type: "POST",
    data: { timetak: timeSpent, sel: selectedanswer },
    success: function(response) {
      console.log(response);
      window.location.href = "/page19";
    },
    error: function(xhr, status, error) {
      console.log(xhr.responseText);
    }
  });
}
