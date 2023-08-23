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
    e.target.reset
})
