let totalKwh = 0;
let totalCosto = 0;

function agregarAparato() {
    let nombre = document.getElementById("nombre-aparato").value;
    let watts = parseFloat(document.getElementById("watts").value);
    let horas = parseFloat(document.getElementById("horas").value);
    let precio = parseFloat(document.getElementById("precio-kwh").value);
    let errorMsg = document.getElementById("error-msg");

    if (nombre.trim() === "" || isNaN(watts) || isNaN(horas)) {
        errorMsg.style.display = "block";
        return;
    }
    
    errorMsg.style.display = "none";

    let kwhMensual = (watts * horas / 1000) * 30;
    let costoMensual = kwhMensual * precio;

    let lista = document.getElementById("lista-aparatos");
    let nuevoItem = document.createElement("li");
    
    nuevoItem.innerHTML = `
        <span><strong>${nombre}</strong>: $${costoMensual.toFixed(2)} USD</span>
        <button class="btn-eliminar" onclick="eliminarAparato(this, ${kwhMensual}, ${costoMensual})">X</button>
    `;
    
    lista.appendChild(nuevoItem);

    totalKwh += kwhMensual;
    totalCosto += costoMensual;
    
    actualizarPantalla();

    document.getElementById("nombre-aparato").value = "";
    document.getElementById("watts").value = "";
    document.getElementById("horas").value = "";
}

function eliminarAparato(boton, kwh, costo) {
    totalKwh -= kwh;
    totalCosto -= costo;
    
    boton.parentElement.remove();
    
    actualizarPantalla();
}

function actualizarPantalla() {
    if (totalKwh < 0) totalKwh = 0;
    if (totalCosto < 0) totalCosto = 0;

    document.getElementById("total-kwh").innerText = totalKwh.toFixed(1);
    document.getElementById("total-dolares").innerText = totalCosto.toFixed(2);
}