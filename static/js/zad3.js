// Tworzenie tablicy z hasłami i ich odbiciami lustrzanymi
const hasla = ['kajak', 'ala', 'radar', 'potop', 'kajak', 'oko', 'radar', 'potop'];
const odbicia = hasla.map(haslo => haslo.split('').reverse().join(''));

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

const tbody = tabela.createTBody();
for (let i = 0; i < hasla.length; i++) {
const row = tbody.insertRow();
row.insertCell().innerText = (i + 1).toString();
row.insertCell().innerText = hasla[i];
row.insertCell().innerText = odbicia[i];
row.style.border = '1px solid black'; // dodanie obramowania dla komórek
}

// Tworzenie listy checkboxów
const checkboxy = document.createElement('div');
checkboxy.style.marginTop = '20px'; // dodanie odstępu między checkboxami a tabelą
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
leftColumn.appendChild(document.createElement('br')); // dodanie przejścia do nowej linii między tabelą a listą checkboxów
leftColumn.appendChild(document.createElement('hr')); // dodanie poziomej linii oddzielającej tabelę od listy checkboxów
leftColumn.appendChild(document.createElement('h2')).innerText = 'Wybierz hasła'; // dodanie nagłówka nad listą checkboxów
leftColumn.appendChild(checkboxy);