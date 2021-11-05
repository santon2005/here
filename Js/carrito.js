const listaProductos = document.querySelector('.cards');
const tableCarrito = document.querySelector('#lista-carrito tbody');
const btnVaciarCarrito = document.querySelector('#vaciar-carrito');



let carrito = []
document.addEventListener('DOMContentLoaded', () => {
    const carritoStorage = JSON.parse(localStorage.getItem('carrito'));

    carrito = carritoStorage || [];
    actualizarCarritoHTML();
    if (carritoStorage === null) {
        carrito = [];
    } else {
        carrito = carritoStorage;
    }
    $('h1').show('slow');
    


    renderProducts(productos);

});

$('.cards').click(agregarProductos);
$('#lista-carrito tbody').click(eliminarProducto);
$('#vaciar-carrito').click(vaciarCarrito);


function vaciarCarrito(e) {
    e.preventDefault();
    carrito = [];

    actualizarCarritoHTML();
    actualizarStorage();
}

function eliminarProducto(e) {
    e.preventDefault();
    if (e.target.nodeName === "A" || e.target.nodeName === "I") {
        const id = e.target.closest('a').dataset.id;

        const carritoFiltrado = carrito.filter(producto => producto.id !== id);
        carrito = [...carritoFiltrado];

        actualizarCarritoHTML();
        actualizarStorage();
    }
}

function agregarProductos(e) {
    e.preventDefault();
    if (e.target.classList.contains("agregar-carrito")) {
        const productCard = e.target.parentElement;
        const productoAgregado = {
            imagen: productCard.querySelector('img').src,
            nombre: productCard.querySelector('h4').textContent,
            precio: productCard.querySelector('.precio').textContent,
            cantidad: 1,
            id: productCard.querySelector('a').id


        }

        const existe = carrito.some(producto => producto.id === productoAgregado.id);

        if (existe) {
            const nuevoCarrito = carrito.map(producto => {
                if (producto.id === productoAgregado.id) {
                    producto.cantidad++;

                }
                return producto;


            });

            carrito = [...nuevoCarrito];

        } else {

            carrito.push(productoAgregado);
        }
        actualizarCarritoHTML();
        actualizarStorage();
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Producto Agregado al carrito',
            showConfirmButton: false,
            timer: 1500
        });
    }
}

function actualizarCarritoHTML() {
    tableCarrito.innerHTML = '';
    carrito.forEach(producto => {
        const {
            imagen,
            nombre,
            precio,
            cantidad,
            id
        } = producto;
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
        <img src="${imagen}" class="img">
    </td>
    <td>
        ${nombre}
    </td>
    <td>
        ${precio}
    </td>
    <td>
        ${cantidad}
    </td>
    <td>
        <a href="#" class="borrar-producto" id="vaciar"   data-id="${id}"><i class="fas fa-trash" "></i></a>
    </td>
        `
        tableCarrito.appendChild(row);
    })

};

function actualizarStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function renderProducts(productos) {
    productos.forEach(producto => {

        const html = `
        
        <div  class= "card-body bg-light text-center">
            <img src="${producto.imagen}" class="imagen producto u full width"
            <div class="info card">
            <h4>${producto.nombre}</h4>
            <p  class="precio"> ${producto.precio}</p>
            <a href= "#" class="u full width button primary button input agregar-carrito" data id= "${producto.id}">Agregar al carrito</a>
        </div>
        
        `
        listaProductos.innerHTML += html;
    });
}