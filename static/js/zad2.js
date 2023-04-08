// Losujemy liczbę od 1 do 4 i tworzymy ścieżkę do pliku z obrazkiem w lewej kolumnie
const randomNumber = Math.floor(Math.random() * 4) + 1;
const leftImageSrc = `static/${randomNumber}.png`;

// Tworzymy element obrazka w lewej kolumnie
const leftImage = document.createElement("img");
leftImage.src = leftImageSrc;

const leftColumn = document.getElementById("left"); // zmieniamy z leftColumn na getElementById("left")
leftColumn.appendChild(leftImage);

// Tworzymy ścieżkę do pliku z obrazkiem w prawej kolumnie (litery o)
const rightImageSrc = `static/${randomNumber}o.png`;

// Tworzymy element obrazka w prawej kolumnie
const rightImage = document.createElement("img");
rightImage.src = rightImageSrc;
const rightColumn = document.getElementById("right"); // zmieniamy z rightColumn na getElementById("right")
rightColumn.appendChild(rightImage);

// Tworzymy elementy z odpowiedziami jednokrotnego wyboru
const answers = [
  "Odpowiedź 1",
  "Odpowiedź 2",
  "Odpowiedź 3",
  "Odpowiedź 4",
  "Odpowiedź 5",
  "Odpowiedź 6",
];
const odp = [5,3,1,4];
const answerList = document.createElement("ul");
answerList.setAttribute("id", "answer-list");

answers.forEach((answer, index) => {
  const answerItem = document.createElement("li");
  const answerRadio = document.createElement("input");
  answerRadio.setAttribute("type", "radio");
  answerRadio.setAttribute("name", "answer");
  answerRadio.setAttribute("value", index + 1);

  answerItem.appendChild(answerRadio);
  answerItem.appendChild(document.createTextNode(answer));
  answerList.appendChild(answerItem);
});

// Dodajemy elementy z odpowiedziami do formularza
const formContainer = document.getElementById("form-container");
const answerSection = document.createElement("div");
answerSection.appendChild(answerList);
formContainer.insertBefore(answerSection, formContainer.lastChild); // Dodajemy elementy z odpowiedziami przed przyciskiem "Click here"
let czas;

function startTimer() {
  czas = performance.now();
}

function stopTimer() {
  const endTime = performance.now();
  const timeSpent = (endTime - czas) / 1000;
  console.log(`Czas wykonywania zadania: ${timeSpent} sekund`);
  alert(`Czas wykonywania zadania: ${timeSpent} sekund`);
  window.location.href = "/page6";
}