let czas;
let timeSpent;
let correct;
// Zapisywanie wybranej odpowiedzi do zmiennej selected
let selectedAnswer;
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
  timeSpent = (endTime - czas) / 1000;
  console.log(`Czas wykonywania zadania: ${timeSpent} sekund`);

  selectedAnswer = document.querySelector('input[name="answer"]:checked').value;
  correct = answers[0];
  sendData();
}
function sendData() {
    const dict_values = {timeSpent, selectedAnswer, correct};
    const s = JSON.stringify(dict_values);
    
   
  
    $.ajax({
        url:"/page20",
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