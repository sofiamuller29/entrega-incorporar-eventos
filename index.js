let nombreUsuario = prompt("Ingrese su nombre");

if (nombreUsuario == ""){
    alert("No ingresaste su nombre");
    prompt("Ingrese su nombre");
}

else{
    alert("Hola "+ nombreUsuario);
}

let productos = []

let formulario;
let inputItem;
let inputaCantidad;
let inputPrecio;
let tabla;

class Productos{
    constructor(item, cantidad, precio){
        this.item = item;
        this.cantidad = cantidad;
        this.total = precio;
    }

    precio = () => (this.item*this.cantidad)
    precioTotal = () => {
        let valorAmultiplicar = 0
        switch (this.item){
            case "Esponja":
                valorAmultiplicar = 100
                break;
            case "Jabon":
                valorAmultiplicar = 200
                break;
            case "Shampoo":
                valorAmultiplicar = 400
                break;
            case "Acondicionador":
                valorAmultiplicar = 450
                break;
            case "Ninguno":
                valorAmultiplicar = 0
            default: 
                valorAmultiplicar = 1
        }
        return this.cantidad() * valorAmultiplicar
    
    }

}


function inicializarElementos() {
    formulario = document.getElementById("formulario");
    inputItem = document.getElementById("inputItem");
    inputaCantidad = document.getElementById("inputCantidad");
    inputPrecio = document.getElementById("inputPrecio")
    tabla = document.getElementById("tablaProductos");
}

function inicializarEventos() {
    formulario.onsubmit = (event) => validarformulario(event)
}

function validarformulario(event){
    event.preventDefault();
    let item = (inputItem.value);
    let cantidad = parseInt(inputaCantidad.value);
    let precio = parseFloat(inputPrecio.value);
    let producto = new Productos(item, cantidad, precio);
    productos.push(producto)

    formulario.reset();
    limpiarTabla();
    agregarProductosTabla();
    almacenarProductosLocalStorage();

    console.log(productos)
}

function agregarProductosTabla() {
    productos.forEach((producto) => {
        let filaTabla = document.createElement("tr");
        filaTabla.innerHTML = `
        <td>${producto.item}</td>
        <td>${producto.cantidad}</td>
        <td>${producto.precioTotal}</td>
        ;`

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
    inicializarElementos();
    inicializarEventos();
    obtenerProductosLocalStorage();
    agregarProductosTable();
}

main();