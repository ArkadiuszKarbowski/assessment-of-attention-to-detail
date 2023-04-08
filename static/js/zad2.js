let czas;
let selectedAnswer;
let timeSpent; // zmienna zdefiniowana na początku skryptu

function startTimer() {
  czas = performance.now();
}

function stopTimer() {
  const endTime = performance.now();
  const timeSpent = (endTime - czas) / 1000;
  console.log(`Czas wykonywania zadania: ${timeSpent} sekund`);
  alert(`Czas wykonywania zadania: ${timeSpent} sekund`);

  const selectedAnswer = document.querySelector('input[name="answer"]:checked').value;

  $.ajax({
    url: "/page6",
    type: "POST",
    data: { ver: randomNumber, correct: odp_pop, timetak: timeSpent, sel: selectedAnswer },
    success: function(response) {
      console.log(response);
      window.location.href = "/page7";
    },
    error: function(xhr, status, error) {
      console.log(xhr.responseText);
    }
  });
}