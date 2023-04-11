// Losowanie liczby x od 3 do 6
var x = Math.floor(Math.random() * 4) + 3;

// Tresci odpowiedzi
var answers = [
    " granie na gitarze",
    " ubranie się",
    " spacer",
    " odkurzanie",
    " pranie",
    " ugotowanie obiadu",
    " zmywanie naczyń"
];

// Tworzenie pytania wraz z odpowiedziami radiowymi
var question = "Która z czynności została wykonana jako " + x + "?<br>";
for (var i = 0; i < answers.length; i++) {
    question += "<input type='radio' name='answer' value='" + answers[i] + "'>" + answers[i] + "<br>";
}

// Wyświetlanie pytania i odpowiedzi na stronie
document.getElementById("question-container").innerHTML = question;

let czas;
let timeSpent;
// Zapisywanie wybranej odpowiedzi do zmiennej selected
var selectedAnswer;
function startTimer() {
  czas = performance.now();
}

function stopTimer() {
  const endTime = performance.now();
  const timeSpent = (endTime - czas) / 1000;
  console.log(`Czas wykonywania zadania: ${timeSpent} sekund`);

  selectedAnswer = document.querySelector('input[name="answer"]:checked').value;

  let cor = x - 2;
  let correct = answers[cor];

  $.ajax({
    url: "/page12",
    type: "POST",
    data: { ver: x, correct: correct, timetak: timeSpent, sel: selectedAnswer },
    success: function(response) {
      console.log(response);
      window.location.href = "/page13";
    },
    error: function(xhr, status, error) {
      console.log(xhr.responseText);
    }
  });
}
