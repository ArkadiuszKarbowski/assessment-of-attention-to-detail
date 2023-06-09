  const randomNumber = Math.floor(Math.random() * 4) + 1;
  const leftImageSrc = `static/${randomNumber}.png`;

  // Tworzymy element obrazka w lewej kolumnie
  const leftImage = document.createElement("img");
  leftImage.src = leftImageSrc;
  leftImage.classList.add("image-container"); // Dodajemy klasę "image-container"
  const leftColumn = document.getElementById("left");
  leftColumn.appendChild(leftImage);

  // Tworzymy ścieżkę do pliku z obrazkiem w prawej kolumnie (litery o)
  const rightImageSrc = `static/${randomNumber}o.png`;

  // Tworzymy element obrazka w prawej kolumnie
  const rightImage = document.createElement("img");
  rightImage.src = rightImageSrc;
  rightImage.classList.add("image-container"); // Dodajemy klasę "image-container"
  const rightColumn = document.getElementById("right");
  rightColumn.appendChild(rightImage);

  // Tworzymy elementy z odpowiedziami jednokrotnego wyboru
  const answers = [
    " Odpowiedź 1",
    " Odpowiedź 2",
    " Odpowiedź 3",
    " Odpowiedź 4",
    " Odpowiedź 5",
    " Odpowiedź 6",
  ];
  const odp = [5,3,1,4];
  const odp_pop = odp[randomNumber - 1];
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
  answerSection.classList.add("row")
  answerSection.appendChild(answerList);
  formContainer.insertBefore(answerSection, formContainer.lastElementChild); // Dodajemy elementy z odpowiedziami przed przyciskiem "Click here"
  let czas;
  let selectedAnswer;
  let timeSpent; // zmienna zdefiniowana na początku skryptu
  ver = randomNumber;
  correct = odp_pop;
  function startTimer() {
    czas = performance.now();
  }

  function stopTimer() {
    const endTime = performance.now();
    timeSpent = (endTime - czas) / 1000;
    console.log(`Czas wykonywania zadania: ${timeSpent} sekund`);

    selectedAnswer = document.querySelector('input[name="answer"]:checked').value;

    sendData();
  }

  function sendData(){
    const dict_values = {timeSpent, selectedAnswer, ver, correct};
    const s = JSON.stringify(dict_values);
   

$.ajax({
        url:"/page7",
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