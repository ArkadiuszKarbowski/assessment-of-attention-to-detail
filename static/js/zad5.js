const leftImageSrc = 'static/trojkat.png';
const leftColumn = document.getElementById("trng");
// Tworzymy element obrazka w lewej kolumnie
const leftImage = document.createElement("img");
leftImage.src = leftImageSrc;
leftColumn.classList.add('justify-content-center');
leftColumn.appendChild(leftImage);


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
  const selectedAnswer = document.getElementById("odp").value;
  $.ajax({
      url: "/page14",
      type: "POST",
      data: {timetak: timeSpent, sel: selectedAnswer },
      success: function(response) {
        console.log(response);
        window.location.href = "/page15";
      },
      error: function(xhr, status, error) {
        console.log(xhr.responseText);
      }
  });
}