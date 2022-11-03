const formulario=document.getElementById("agregar-gasto");
const txtNombreGasto = document.getElementById("gasto");
const txtCantidad = document.getElementById("cantidad");

formulario.addEventListener("submit", function (e){
    e.preventDefault();
    console.clear();
    if(validar () === false){
        return;
    }
    console.log("Escribiendo datos");
});
function validar() {
    if(txtNombreGasto.value === "" || txtCantidad.value === ""){
        console.log("Los campos estan vacios");
        return false;
    }
    if (Number(txtCantidad.value) <= 0 || isNaN (txtCantidad.value)){
        console.log("Cantidad no valida");
        return false;
    }
    return true;
}