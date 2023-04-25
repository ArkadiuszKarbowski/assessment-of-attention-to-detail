// Tworzenie tablicy z hasłami i ich odbiciami lustrzanymi
const hasla = ['5g@K9zJt', 'x#2Dp8Ls', 'H3qR@t7Z', 'fU6j$W9b', 'N5sT@r2P', 'g#7HkD6c', 'V9nM@p4T', 'e2fL#5tS'];
const odbicia = hasla.map(haslo => haslo.split('').reverse().join(''));
let correct = '';
// Losowe przemieszanie hasel
for (let i = hasla.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [hasla[i], hasla[j]] = [hasla[j], hasla[i]];
  [odbicia[i], odbicia[j]] = [odbicia[j], odbicia[i]];
}

// Tworzenie tabeli i wypełnienie jej danymi
const tabela = document.createElement('table');
const thead = tabela.createTHead();
const row = thead.insertRow();
row.insertCell().innerText = 'Hasło ID';
row.insertCell().innerText = 'Hasło';
row.insertCell().innerText = 'Odbicie lustrzane';

for (let i = 0; i < hasla.length; i++) {
  if (hasla[i] === '5g@K9zJt' || hasla[i] === 'fU6j$W9b') {
    correct += (i + 1)+'';
  }
}

// Tworzenie listy checkboxów
const checkboxy = document.createElement('div');
// Wybrane hasła, których odbicie lustrzane ma być błędne
const haslaDoPoprawki = ['5g@K9zJt', 'fU6j$W9b'];
// Wybrane litery, które zostaną dodane w złych miejscach
const literyDoDodania = ['a', 'd'];

// Usuwanie losowego znaku z wybranych haseł i dodawanie litery w złym miejscu
for (let i = 0; i < haslaDoPoprawki.length; i++) {
  const haslo = haslaDoPoprawki[i];
  const index = hasla.indexOf(haslo);
  const odbicie = odbicia[index].split('');
  const randIndex = Math.floor(Math.random() * odbicie.length);
  odbicie[randIndex] = literyDoDodania[i];
  odbicia[index] = odbicie.join('');
}
const tbody = tabela.createTBody();
for (let i = 0; i < hasla.length; i++) {
  const row = tbody.insertRow();
  row.insertCell().innerText = (i + 1).toString();
  row.insertCell().innerText = hasla[i];
  row.insertCell().innerText = odbicia[i];
  row.style.border = '1px solid black'; // dodanie obramowania dla komórek
  
}
for (let i = 0; i < hasla.length; i++) {
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.value = (i + 1).toString();
  checkbox.style.marginRight = '5px'; // dodanie odstępu między checkboxem a jego etykietą
  const label = document.createElement('label');
  label.innerText = (i + 1).toString();
  checkboxy.appendChild(checkbox);
  checkboxy.appendChild(label);
  checkboxy.appendChild(document.createElement('br')); // dodanie przejścia do nowej linii po każdym checkboxie
}

// Dodanie tabeli i listy checkboxów do dokumentu
const formContainer = document.getElementById('form-container');
const leftColumn = document.getElementById('left');
leftColumn.appendChild(tabela);
tabela.classList.add('mx-auto');
leftColumn.appendChild(document.createElement('br')); // dodanie przejścia do nowej linii między tabelą a listą checkboxów
const rightColumn = document.getElementById('right');
rightColumn.appendChild(document.createElement('h2')).innerText = 'Wybierz hasła, których odbicie lustrzane jest błędne';
rightColumn.appendChild(checkboxy);

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

  let selectedAnswers = '';
  checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
  for (let i = 0; i < checkboxes.length; i++) {
  selectedAnswers += checkboxes[i].value;
  if (i < checkboxes.length - 1) {
    selectedAnswers += '';
  }
}
  sendData();
  }  
  function sendData(){
    const dict_values = {timeSpent, selectedAnswer, correct};
    const s = JSON.stringify(dict_values);
    console.log(s);
    window.alert(s)

$.ajax({
        url:"/page9",
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