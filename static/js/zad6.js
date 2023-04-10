// definicja odgłosów zwierząt
const animalSounds = ["dog1", "dog2", "dog3", "dog4"];


// funkcja odtwarzająca odgłosy zwierząt w tle
function playAnimalSounds() {
  animalSounds.forEach((sound) => {
    const audio = new Audio(`static/${sound}.mp3`);
    audio.loop = true;
    audio.play();
  });
}

// funkcja pobierająca wartości z inputów i zapisująca je w zmiennej selectedanswer
function getSelectedAnswer() {
  const nr1 = document.getElementById('nr1').value;
  const nr2 = document.getElementById('nr2').value;
  const selectedanswer = `${nr1}${nr2}`;
}

// odtwarzanie odgłosów zwierząt w tle
playAnimalSounds();
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

  $.ajax({
    url: "/page16",
    type: "POST",
    data: {timetak: timeSpent, sel: selectedAnswers },
    success: function(response) {
      console.log(response);
      window.location.href = "/page17";
    },
    error: function(xhr, status, error) {
      console.log(xhr.responseText);
    }
  });
}