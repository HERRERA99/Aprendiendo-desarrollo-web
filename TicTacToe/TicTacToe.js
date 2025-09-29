// Tablero
let tablero = Array(9).fill(null);

// Jugador Actual
let jugadorActual = "X";

// Control juego
let juegoActivo = true;

// Combinaciones ganadoras
const combinacionesGanadoras = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const tableroDiv = document.getElementById("tablero");
const mensajeDiv = document.getElementById("mensaje");

// Crear botones del tablero
const botones = [];
for (let i = 0; i < 9; i++) {
    const casilla = document.createElement("button");
    casilla.dataset.index = i;
    casilla.textContent = "";
    casilla.onclick = () => jugar(i);
    tableroDiv.appendChild(casilla);
    botones.push(casilla);
}

function jugar(pos) {
    if (!juegoActivo || tablero[pos]) return;

    tablero[pos] = jugadorActual;
    const boton = document.querySelector(`[data-index='${pos}']`);
    boton.textContent = jugadorActual; // Solo pone X u O

    if (verificarGanador()) {
        juegoActivo = false; // deshabilitar tablero
        setTimeout(() => {
            alert(`🎉 ¡El jugador ${jugadorActual} ha ganado!`);
        }, 10);
    } else if (tablero.every(c => c !== null)) {
        juegoActivo = false;
        setTimeout(() => {
            alert("🤝 ¡Empate!");
        }, 10);
    } else {
        jugadorActual = jugadorActual === "X" ? "O" : "X";
    }
}

// Verificar ganador
function verificarGanador() {
    return combinacionesGanadoras.some(([a, b, c]) =>
        tablero[a] && tablero[a] === tablero[b] && tablero[a] === tablero[c]
    );
}

document.getElementById("reiniciar").addEventListener("click", reiniciar);

function reiniciar() {
    tablero.fill(null);
    jugadorActual = "X";
    juegoActivo = true;
    botones.forEach(b => b.textContent = "");
}

