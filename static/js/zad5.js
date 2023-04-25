let czas;
let selectedAnswer;
let timeSpent; // zmienna zdefiniowana na początku skryptu

function startTimer() {
  czas = performance.now();
}

function stopTimer() {
  const endTime = performance.now();
  timeSpent = (endTime - czas) / 1000;
  console.log(`Czas wykonywania zadania: ${timeSpent} sekund`);
  selectedAnswer = document.getElementById("odp").value;
  sendData();
}
function sendData() {
    const dict_values = {timeSpent, selectedAnswer};
    const s = JSON.stringify(dict_values);
    console.log(s);
    window.alert(s);
  
    $.ajax({
        url:"/page14",
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