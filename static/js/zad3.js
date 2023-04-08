// Tablica z hasłami
const hasla = ["pies", "kot", "ptak", "krokodyl", "słoń", "krokodyl", "ryba", "krowa"];

// Wylosowanie indeksu hasła, które będzie miało złe odbicie lustrzane
const indeksZlego = Math.floor(Math.random() * hasla.length);

// Tworzenie tabeli
const table = document.createElement("table");

// Dodawanie wierszy do tabeli
for (let i = 0; i < hasla.length; i++) {
  const row = document.createElement("tr");

  // Dodawanie ID hasła do pierwszej kolumny
  const idCell = document.createElement("td");
  idCell.textContent = i + 1;
  row.appendChild(idCell);

  // Dodawanie hasła do drugiej kolumny
  const hasloCell = document.createElement("td");
  hasloCell.textContent = hasla[i];
  row.appendChild(hasloCell);

  // Dodawanie odbicia lustrzanego do trzeciej kolumny
  const odbicieCell = document.createElement("td");
  const odbicie = i === indeksZlego ? odwroc(hasla[i]) : odwroc(hasla[Math.floor(Math.random() * hasla.length)]);
  odbicieCell.textContent = odbicie;
  row.appendChild(odbicieCell);

  table.appendChild(row);
}

// Dodawanie tabeli do strony
const tableContainer = document.getElementById("table-container");
tableContainer.appendChild(table);

let odp_pop = indeksZlego + 1;
let odp_uz = null;

function odwroc(haslo) {
  return haslo.split("").reverse().join("");
}

function startTimer() {
  czas = performance.now();
}

function stopTimer() {
  const endTime = performance.now();
  const timeSpent = (endTime - czas) / 1000;
  console.log(`Czas wykonywania zadania: ${timeSpent} sekund`);
  alert(`Czas wykonywania zadania: ${timeSpent} sekund`);
  window.location.href = "/page7";
}

// Dodanie event listenera na kliknięcie w komórkę z hasłem
table.addEventListener("click", function(event) {
  const target = event.target;
  if (target.tagName === "TD" && target.cellIndex === 2) { // Kliknięto w trzecią kolumnę
    const row = target.parentNode;
    const id = parseInt(row.cells[0].textContent);
    odp_uz = id;
    if (id === odp_pop) {
      alert("Dobrze!");
    } else {
      alert("Źle!");
    }
  }
});

