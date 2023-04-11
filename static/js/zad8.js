let czas;
let timeSpent;
// Zapisywanie wybranej odpowiedzi do zmiennej selected
var selectedAnswer;
function startTimer() {
  czas = performance.now();
}
// Tresci odpowiedzi
var answers = [
    " herbatę",
    " sok pomarańczowy",
    " sok jabłkowy",
    " kawę",
    " mleko",
];

// Tworzenie pytania wraz z odpowiedziami radiowymi
var question = "Co wypiła do śniadania osoba opowiadająca o swoim dniu na poprzednich stronach?"+ "<br>";
for (var i = 0; i < answers.length; i++) {
    question += "<input type='radio' name='answer' value='" + answers[i] + "'>" + answers[i] + "<br>";
}

// Wyświetlanie pytania i odpowiedzi na stronie
document.getElementById("question-container").innerHTML = question;


function stopTimer() {
  const endTime = performance.now();
  const timeSpent = (endTime - czas) / 1000;
  console.log(`Czas wykonywania zadania: ${timeSpent} sekund`);

  selectedAnswer = document.querySelector('input[name="answer"]:checked').value;
  let correct = answers[1];

  $.ajax({
    url: "/page20",
    type: "POST",
    data: {correct: correct, timetak: timeSpent, sel: selectedAnswer },
    success: function(response) {
      console.log(response);
      window.location.href = "/page21";
    },
    error: function(xhr, status, error) {
      console.log(xhr.responseText);
    }
  });
}
