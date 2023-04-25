let czas;
let timeSpent;
let selectedanswer; 
let isPlaying = false;
var img = document.getElementById("imgg")
var nr1 = document.getElementById("nr1")
var nr2 = document.getElementById("nr2")


function startTimer() {
  czas = performance.now();
}

function Show(){
  img.style.visibility = "visible";
  nr1.style.visibility = "visible";
  nr2.style.visibility = "visible";

}

function buttonClick(){
  Show();
  playAudio();
  unlockBTN();
  startTimer();
}

function unlockBTN(){
  document.getElementById("dalejBtn").disabled = false;
      document.getElementById("odsluchajBtn").disabled = true;
}


function getSelectedAnswer() {
  const nr1 = document.getElementById('nr1').value;
  const nr2 = document.getElementById('nr2').value;
  selectedanswer = `${nr1}${nr2}`; 
}



function stopTimer() {
  const endTime = performance.now();
  timeSpent = (endTime - czas) / 1000;
  console.log(`Czas wykonywania zadania: ${timeSpent} sekund`);

  getSelectedAnswer();
  sendData();
}
function sendData() {
    const dict_values = {timeSpent, selectedanswer};
    const s = JSON.stringify(dict_values);
    console.log(s);
 
  
    $.ajax({
        url:"/page16",
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
