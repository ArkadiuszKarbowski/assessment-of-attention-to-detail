let czas;
let timeSpent;
let selectedanswer; 
let isPlaying = false;
let audio =  document.getElementById('Audio'); 

function startTimer() {
  czas = performance.now();
}

function playAnimalSounds() {
  if (!isPlaying) {
    isPlaying = true;
    audio.currentTime = 0;
    audio.play();
    setTimeout(function() {
      isPlaying = false;
      playAnimalSounds();
    }, audio.duration * 1000 + 2000); // opóźnienie równoważne długości dźwięku + 2 sekundy
  }
}

function getSelectedAnswer() {
  const nr1 = document.getElementById('nr1').value;
  const nr2 = document.getElementById('nr2').value;
  selectedanswer = `${nr1}${nr2}`; 
}

playAnimalSounds();

function stopTimer() {
  const endTime = performance.now();
  timeSpent = (endTime - czas) / 1000;
  console.log(`Czas wykonywania zadania: ${timeSpent} sekund`);

  getSelectedAnswer();

  $.ajax({
    url: "/page16",
    type: "POST",
    data: {timetak: timeSpent, sel: selectedanswer }, 
    success: function(response) {
      console.log(response);
      window.location.href = "/page17";
    },
    error: function(xhr, status, error) {
      console.log(xhr.responseText);
    }
  });
}
