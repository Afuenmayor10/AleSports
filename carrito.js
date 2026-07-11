let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const lista = document.getElementById("lista-carrito");
const total = document.getElementById("total");
const cantidadProductos = document.getElementById("cantidad-productos");

function mostrarCarrito(){

    lista.innerHTML="";

    let totalCompra=0;

    carrito.forEach(producto=>{

    totalCompra += producto.precio * producto.cantidad;

    lista.innerHTML +=`

    <div class="item-carrito">

        <img src="${producto.imagen}" class="imagen-carrito">

        <div class="info-producto">

            <h3>${producto.nombre}</h3>

            <p>Precio: $${producto.precio.toLocaleString()}</p>

            <div class="controles">

                <button onclick="restar(${producto.id})">−</button>

                <span>${producto.cantidad}</span>

                <button onclick="sumar(${producto.id})">+</button>

            </div>

        </div>


        <button class="btn-eliminar" onclick="eliminar(${producto.id})">
            🗑️
        </button>


    </div>

    `;

});
  

    total.textContent=totalCompra.toLocaleString();
    let cantidadTotal = carrito.reduce((acumulado, producto) => {
    return acumulado + producto.cantidad;
}, 0);

cantidadProductos.textContent = cantidadTotal;

    localStorage.setItem("carrito",JSON.stringify(carrito));

}

function sumar(id){

    let producto=carrito.find(p=>p.id==id);

    producto.cantidad++;

    mostrarCarrito();

}

function restar(id){

    let producto=carrito.find(p=>p.id==id);

    if(producto.cantidad>1){

        producto.cantidad--;

    }else{

        eliminar(id);

        return;

    }

    mostrarCarrito();

}

function eliminar(id){

    carrito=carrito.filter(p=>p.id!=id);

    mostrarCarrito();

}

function vaciarCarrito() {

    if (confirm("¿Deseas vaciar el carrito?")) {

        carrito = [];

        localStorage.removeItem("carrito");

        mostrarCarrito();

    }

}
mostrarCarrito();