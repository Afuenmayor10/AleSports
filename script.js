// ===============================
// CARRITO
// ===============================

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

actualizarContador();

// ===============================
// CARGAR PRODUCTOS DESDE LA API
// ===============================

fetch("productos.json")
    .then(response => response.json())
    .then(data => {

        const contenedor = document.getElementById("contenedor-productos");

        data.forEach(producto => {

            contenedor.innerHTML += `
                <div class="card-producto">

                    <img src="${producto.thumbnail}" alt="${producto.title}">

                    <div class="info-producto">

                        <h3>${producto.title}</h3>

                       <span>$ ${producto.price}</span>

                        <button
                            class="btn-carrito"
                            data-id="${producto.id}"
                            data-nombre="${producto.title}"
                            data-precio="${producto.price}"
                            data-imagen="${producto.thumbnail}">
                            Agregar al carrito 🛒
                        </button>

                    </div>

                </div>
            `;

        });

        activarBotonesCarrito();

    })
    .catch(error => {

        console.error(error);

    });

// ===============================
// BOTONES DEL CARRITO
// ===============================

function activarBotonesCarrito() {

    document.querySelectorAll(".btn-carrito").forEach(boton => {

        boton.addEventListener("click", () => {

            const id = boton.dataset.id;

            const productoExistente = carrito.find(p => p.id == id);

            if (productoExistente) {

                productoExistente.cantidad++;

            } else {

                carrito.push({

                    id: id,
                    nombre: boton.dataset.nombre,
                    precio: Number(boton.dataset.precio),
                    imagen: boton.dataset.imagen,
                    cantidad: 1

                });

            }

            guardarCarrito();

            alert("Producto agregado al carrito");

        });

    });

}

// ===============================
// GUARDAR CARRITO
// ===============================

function guardarCarrito() {

    localStorage.setItem("carrito", JSON.stringify(carrito));

    actualizarContador();

}

// ===============================
// CONTADOR
// ===============================

function actualizarContador() {

    let carritoGuardado = JSON.parse(localStorage.getItem("carrito")) || [];

    let total = carritoGuardado.reduce((suma, p) => suma + p.cantidad, 0);

    let contador = document.getElementById("contador-carrito");

    if (contador) {

        contador.textContent = total;

    }

}

// ===============================
// VALIDACIÓN FORMULARIO
// ===============================

const formulario = document.getElementById("form-contacto");

if (formulario) {

    formulario.addEventListener("submit", function (e) {

        const nombre = document.getElementById("nombre").value.trim();
        const apellido = document.getElementById("apellido").value.trim();
        const email = document.getElementById("email").value.trim();

        if (nombre === "" || apellido === "" || email === "") {

            e.preventDefault();

            alert("Completa Nombre, Apellido y Correo.");

            return;

        }

        const formatoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!formatoEmail.test(email)) {

            e.preventDefault();

            alert("Correo electrónico inválido.");

        }

    });

}