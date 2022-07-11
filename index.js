let productos = []

let formulario;
let inputItem;
let inputPrecio;
let inputaCantidad;
let tabla;

class Productos{
    constructor(item, precio, cantidad){
        this.item = item
        this.precio = precio;
        this.cantidad = cantidad;
    }

}

function inicializarElementos() {
    formulario = document.getElementById("formulario");
    inputItem = document.getElementById("inputItem");
    inputPrecio = document.getElementById("inputPrecio");
    inputaCantidad = document.getElementById("inputCantidad");
    tabla = document.getElementById("tablaProductos");
}

function inicializarEventos() {
    formulario.onsubmit = (event) => validarformulario(event)
}

function validarformulario(event){
    event.preventDefault();
    let item = inputItem.value;
    let precio = parseFloat(inputPrecio.value);
    let cantidad = parseInt(inputaCantidad.value);
    let producto = new Productos(item, precio, cantidad);
    productos.push(producto)

    formulario.reset();
    limpiarTabla();
    agregarProductosTable();
    almacenarProductosLocalStorage();

    console.log(productos)
}

function agregarProductosTable(params) {
    productos.forEach((producto) => {
        let filaTabla = document.createElement("tr");
        filaTabla.innerHTML = `
        <td>${producto.item}</td>
        <td>${producto.precio}</td>
        <td>${producto.cantidad}</td>;`

        tabla.tBodies[0].append(filaTabla)
    });
}

function limpiarTabla(){
    while(tabla.rows.length> 1){
        tabla.deleteRow(1)
    }
}

function almacenarProductosLocalStorage() {
    localStorage.setItem("listaProductos", JSON.stringify(productos))
}

function obtenerProductosLocalStorage() {
    let productosAlmacenados = localStorage.getItem("listaProductos")
    if(productosAlmacenados !== null){
        productos = JSON.parse(productosAlmacenados)
    }

}

function main() {
    inicializarElementos()
    inicializarEventos()
    obtenerProductosLocalStorage();
    agregarProductosTable();
}

main();