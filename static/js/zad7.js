let selectedanswer = "";
let clickedSquares = [];
let czas;
let timeSpent;

function startTimer() {
  czas = performance.now();
}

// funkcja obsługująca kliknięcie w kwadrat
function handleClick(square) {
  if (!clickedSquares.includes(square)) { // sprawdzenie, czy kwadrat nie został już kliknięty
    clickedSquares.push(square); // dodanie klikniętego kwadratu do listy klikniętych
    document.getElementById(square).style.visibility = 'hidden';
    selectedanswer += square.replace("square", ""); // dodanie numeru klikniętego kwadratu do zapisanej odpowiedzi
  }
}

function stopTimer() {
  const endTime = performance.now();
  timeSpent = (endTime - czas) / 1000;
  console.log(`Czas wykonywania zadania: ${timeSpent} sekund`);
  sendData();
}
function sendData() {
    const dict_values = {timeSpent, selectedanswer};
    const s = JSON.stringify(dict_values);
   
    
  
    $.ajax({
        url:"/page18",
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