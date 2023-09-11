const socket = io()

const form = document.getElementById('formProduct')

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const datForm = new FormData(e.target) // Trae el dato de todo el formulario
    const prod = Object.fromEntries(datForm) // Devuelve los datos en un objeto simple
    console.log(prod)
    socket.emit('nuevoProducto', prod)
    socket.on('mensajeProductoCreado', (mensaje) => {
        Swal.fire(mensaje)
    })
    e.target.reset()
});

const productsDiv = document.getElementById("productsDiv");

socket.on("products", (products) => {
    productsDiv.innerHTML = "";
    products.forEach((prod) => {
      productsDiv.innerHTML += `

      <div class="card m-1" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">${prod.nombre} ${prod.descripcion}</h5>
            <h6 class="card-subtitle mb-2 text-muted">$ ${prod.precio}</h6>
            <p class="card-text">Codigo: ${prod.codigo}</p>
            <p class="card-text">Stock: ${prod.stock}</p>
        </div>
      </div>
      `;
    });
  });
