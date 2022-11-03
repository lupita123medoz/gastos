const formulario=document.getElementById("agregar-gasto");
const txtNombreGasto = document.getElementById("gasto");
const txtCantidad = document.getElementById("cantidad");
const lblPresupuestoTotal  = document.getElementById("total");
const lblRestante  = document.getElementById("restante");
const listadoGastos=document.querySelector("#gastos ul");

//-------------------------Eventos
document.addEventListener("DOMContentLoaded", preguntarPresupuesto);
formulario.addEventListener("submit", agregarGasto);
//-------------------------Funciones

function preguntarPresupuesto(){
    const presupuestoUsuario = 999// prompt("¿Cual es tu presupuesto anual?");
    if(isNaN(presupuestoUsuario) || presupuestoUsuario <= 0){
        window.location.reload();
    }
    gastoSemanal  = new GastoSemanal(presupuestoUsuario);
    ui.insertarValoresIniciales();
    //-----presupuesto del usuario es valido                        
}
function agregarGasto(e){
    e.preventDefault();
    if (!validar()){
        return;
    }
    const gasto = txtNombreGasto.value;
    const cantidad = Number(txtCantidad.value);
    const gastoIndividual = new GastoIndividual(gasto, cantidad);

    gastoSemanal.ingresarGasto(gastoIndividual);
    gastoSemanal.descontarGasto(cantidad);
    gastoSemanal.imprimirGastos();
    ui.imprimirAlerta("Gasto agregado correctamente");

    ui.actualizarRestante();
    ui.agregarListadoGastos();
    ui.comprobarCantidadRestante();

    formulario.reset();
    //console.log("Click en el boton agregar gasto");
}
function validar(){
    if (txtNombreGasto.value === "" || txtCantidad.value === ""){
        ui.imprimirAlerta("Ambos campos son obligatorios", "error");
        return false;
    }
    if (Number(txtCantidad.value) <= 0 || isNaN(txtCantidad.value)){
        ui.imprimirAlerta("Cantidad no valida", "error");
        return false;
    }
    return true;
}
//-----------------------CLASES
class GastoSemanal{
    constructor(presupuestoInicial){
        this.presupuestoTotal=Number(presupuestoInicial);
        this.restante=Number(presupuestoInicial);
        this.gastos=[];
    }
    obtenerPresupuestoTotal() {
        return this.presupuestoTotal;
    }
    obtenerRestante(){
        return this.restante;
    }
    descontarGasto(cantidad){
        this.restante -= cantidad;
    }
    ingresarGasto(gasto){
        this.gastos.push(gasto);
    }
    imprimirGastos(){
        console.clear();
        this.gastos.forEach(function (gasto){
            console.log(`Nombre del gasto: ${gasto.obtenerGastoNombre()}, cantidad: ${gasto.obtenerGastoCantidad()}`);
        })
    }
    obtenerListaGastos() {
        return this.gastos;
    }
}
class GastoIndividual {
    constructor(nombre, cantidad){
        this.nombre = nombre;
        this.cantidad = cantidad;
    }
    obtenerGastoNombre(){
        return this.nombre;
    }
    obtenerGastoCantidad(){
        return this.cantidad;
    }
    
}
class UI{
    insertarValoresIniciales(){
        lblPresupuestoTotal.innerText = gastoSemanal.obtenerPresupuestoTotal();
        lblRestante.innerText = gastoSemanal.obtenerRestante();                                                                                                  
    }
    actualizarRestante() {
        lblRestante.innerText = gastoSemanal.obtenerRestante();
    }
    agregarListadoGastos(){
        this.limpiarListadoGastos();
        const gastos  = gastoSemanal.obtenerListaGastos();
        gastos.forEach((gasto, indice) => {
            const nuevoGasto = document.createElement("li");
            nuevoGasto.className = "list-group-item d-flex justify-content-between align-items-center";
            nuevoGasto.dataset.id = indice.toString();
            nuevoGasto.innerHTML = `${gasto.obtenerGastoNombre()} <span> $ ${gasto.obtenerGastoCantidad()} </span>`;
            listadoGastos.appendChild(nuevoGasto);
        });     
    }
    limpiarListadoGastos(){
        while (listadoGastos.firstChild) {
            listadoGastos.removeChild(listadoGastos.firstChild);
        }
    }
    imprimirAlerta(mensaje,tipo){
        const divMensaje = document.createElement("div");
        divMensaje.classList.add("text-center", "alert");
        if (tipo === "error"){
            divMensaje.classList.add("alert-danger");
        } else {
            divMensaje.classList.add("alert-success");
        }
        divMensaje.textContent = mensaje;
        document.querySelector(".primario").insertBefore(divMensaje, formulario);

        setTimeout(() => {
            divMensaje.remove();
        }, 3000);
    }
    comprobarCantidadRestante() {
        const restanteDiv = document.querySelector(".restante");
        if ((gastoSemanal.obtenerPresupuestoTotal() / 4) > gastoSemanal.obtenerRestante()){
            restanteDiv.classList.remove('alert-success', "alert-warning");    
            restanteDiv.classList.add("alert-danger");   
        } else if ((gastoSemanal.obtenerPresupuestoTotal() / 2) > gastoSemanal.obtenerRestante()){
            restanteDiv.classList.remove('alert-success');    
            restanteDiv.classList.add("alert-warning");   
        }
        if (gastoSemanal.obtenerRestante() <= 0 ) {
            ui.imprimirAlerta("El presupuesto se ha agotado", "error");    
            formulario.querySelector('button[type="submit"]').disabled = true;
        }
    }
}
//------Iniciar UI
const ui = new UI();
//------CREAR VARIABLE GLOBAL PARA PRESUPUESTO
let gastoSemanal;