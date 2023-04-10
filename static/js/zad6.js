const animalSounds = ["dog1", "dog2", "dog3", "dog4"];
let index = 0;

function playAnimalSounds() {
  const sound = animalSounds[index];
  const audio = new Audio(`static/${sound}.mp3`);
  audio.loop = true;
  audio.onended = function() {
    index++;
    if (index >= animalSounds.length) {
      index = 0;
    }
    playAnimalSounds();
  };
  audio.play();
}

function getSelectedAnswer() {
  const nr1 = document.getElementById('nr1').value;
  const nr2 = document.getElementById('nr2').value;
  const selectedanswer = `${nr1}${nr2}`;
}

playAnimalSounds();
let czas;
let selectedAnswer;
let timeSpent;

function startTimer() {
  czas = performance.now();
}

function stopTimer() {
  const endTime = performance.now();
  timeSpent = (endTime - czas) / 1000;
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
