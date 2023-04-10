const leftImageSrc = 'static/trojkat.png';

// Tworzymy element obrazka w lewej kolumnie
const leftImage = document.createElement("img");
leftImage.src = leftImageSrc;

const leftColumn = document.getElementById("left");
leftColumn.appendChild(leftImage);

let czas;
let selectedAnswer;
let timeSpent; // zmienna zdefiniowana na początku skryptu

function startTimer() {
czas = performance.now();
}

function stopTimer() {
const endTime = performance.now();
timeSpent = (endTime - czas) / 1000;
selectedAnswer = document.getElementById("odp").value;
console.log(Czas wykonywania zadania: ${timeSpent} sekund);

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