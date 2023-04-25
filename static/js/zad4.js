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
let selectedAnswer;
let correct;
ver = x;
function startTimer() {
  czas = performance.now();
}

function stopTimer() {
  const endTime = performance.now();
  timeSpent = (endTime - czas) / 1000;
  console.log(`Czas wykonywania zadania: ${timeSpent} sekund`);

  selectedAnswer = document.querySelector('input[name="answer"]:checked').value;

  let cor = x - 2;
  correct = answers[cor];
  sendData();
}
function sendData() {
    const dict_values = {timeSpent, selectedAnswer, correct, ver};
    const s = JSON.stringify(dict_values);
    
   
  
    $.ajax({
        url:"/page12",
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
