// inicjalizacja zmiennych
var selectedanswer = "";
var clickedSquares = [];
let czas;
let timeSpent;

function startTimer() {
  czas = performance.now();
}

// dodanie nasłuchiwania kliknięć na kwadratach
document.querySelectorAll(".square").forEach(function(square) {
  square.addEventListener("click", function() {
    if (!clickedSquares.includes(this)) { // sprawdzenie, czy kwadrat nie został już kliknięty
      clickedSquares.push(this); // dodanie klikniętego kwadratu do listy klikniętych
      selectedanswer += clickedSquares.indexOf(this) + 1; // dodanie numeru klikniętego kwadratu do zapisanej odpowiedzi
      this.style.backgroundImage = "none"; 
    }
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
