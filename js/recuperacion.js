const formulario = document.getElementById("agregar-gasto");
const txtxNombreGasto = document.getElementById("gasto");
const txtxCantidad = document.getElementById("cantidad");

const lblPresupuestoTotal  = document.getElementById("total");
const lblRestante  = document.getElementById("restante");
const listadoGastos  = document.querySelector("#gastos ul");

let presupuestoInicial = 1000;
let restante = presupuestoInicial;

lblPresupuestoTotal.innerText = presupuestoInicial;
lblRestante.innerText = restante;

formulario.addEventListener("submit", function(e){
    e.preventDefault();
    const gasto = txtxNombreGasto.value;
    const cantidad = Number(txtxCantidad.value);
    console.log(gasto, cantidad);
    restante = restante - cantidad;
    lblRestante.innerText  = restante;
});
