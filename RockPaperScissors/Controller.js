let eleccionJugador = null;
let eleccionBot = null;
let rachaVictorias = 0;

function mostrarPantalla(id) {
    document.querySelectorAll(".pantalla").forEach(div => div.classList.remove("visible"));
    document.getElementById(id).classList.add("visible");

    // Mostrar header solo si NO es la pantalla de inicio
    if (id === "pantallaInicio") {
        document.getElementById("headerJuego").classList.add("hidden");
    } else {
        document.getElementById("headerJuego").classList.remove("hidden");
    }
}


function irAEleccion() {
    mostrarPantalla("pantallaEleccion");
}

function seleccionar(boton, opcion) {
    eleccionJugador = opcion;
    document.querySelectorAll(".opcion").forEach(b => b.classList.remove("seleccionado"));
    boton.classList.add("seleccionado");
}

function jugar() {
    if (!eleccionJugador) {
        alert("Choose an option first!");
        return;
    }

    const opciones = ["piedra", "papel", "tijera"];
    const iconos = {
        piedra: "./resources/icon-rock.svg",
        papel: "./resources/icon-paper.svg",
        tijera: "./resources/icon-scissors.svg"
    };

    document.getElementById("imgJugador").src = iconos[eleccionJugador];
    mostrarPantalla("pantallaResultado");

    // Ocultar mensaje y botón hasta el final
    document.getElementById("resultadoFinal").style.display = "none";

    // Animación bot
    let i = 0;
    let interval = setInterval(() => {
        const opcionTemp = opciones[i % opciones.length];
        document.getElementById("imgBot").src = iconos[opcionTemp];
        i++;
    }, 150);

    setTimeout(() => {
        clearInterval(interval);
        eleccionBot = opciones[Math.floor(Math.random() * opciones.length)];
        document.getElementById("imgBot").src = iconos[eleccionBot];

        let mensaje = "";
        if (eleccionJugador === eleccionBot) {
            mensaje = "Draw 🤝";
            // la racha se mantiene
        } else if (
            (eleccionJugador === "piedra" && eleccionBot === "tijera") ||
            (eleccionJugador === "papel" && eleccionBot === "piedra") ||
            (eleccionJugador === "tijera" && eleccionBot === "papel")
        ) {
            mensaje = "You Win 🎉";
            rachaVictorias++;
        } else {
            mensaje = "You Lose 😢";
            rachaVictorias = 0;
        }

        document.getElementById("mensajeResultado").textContent = mensaje;
        document.getElementById("contadorVictorias").textContent = rachaVictorias;

        // mostrar mensaje y botón
        document.getElementById("resultadoFinal").style.display = "block";
    }, 2000);
}

function reiniciar() {
    eleccionJugador = null;
    eleccionBot = null;
    document.querySelectorAll(".opcion").forEach(b => b.classList.remove("seleccionado"));
    mostrarPantalla("pantallaEleccion");
}
