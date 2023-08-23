import express from 'express'
import { engine } from 'express-handlebars'
import routerProd from './routes/products.routes.js';
import routerCart from './routes/cart.routes.js';
import { __dirname } from './path.js';
import path from 'path'
import { Server } from 'socket.io';
import { ProductManager } from './controllers/ProductManager.js'

const PORT = 4000;
const app = express();
const prodManager = new ProductManager("./src/models/productos.json")


// Server
const server = app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`);
});

const io = new Server(server)


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //URL extensas

app.engine('handlebars', engine()); //Defino que trabajo con handlebars
app.set('view engine', 'handlebars')
app.set('views', path.resolve(__dirname, './views')) //Defino la ruta de las vistas


// Conexion de Socket.io
io.on('connection', (socket) => {
    console.log("Conexion con Socket.io")

    socket.on('mensaje', info => {
        console.log(info)
        socket.emit('respuesta', true)
    })

    socket.on('nuevoProducto', (prod) => {
        prodManager.addProduct(prod)
        socket.emit('mensajeProductoCreado', "Producto creado correctamente")
    })
})


// Routes
app.use('/static', express.static(__dirname + '/public'))
app.use('/api/product', routerProd)
app.use('/api/carts', routerCart);
// Handlebars
app.get('/static', async (req, res) => {
    const getProductos = await prodManager.getProducts()
    //Indico la plantilla a utilizar
    res.render('home', {
        rutaCSS: 'home.css',
        rutaJS: 'script.js',
        titulo: "Ver Productos",
        productos: getProductos.resp,
        hayProductos: getProductos.resp != "No hay productos cargados"
    })
})
app.get('/static/realTimeProducts', (req, res) => {
    //Indico la plantilla a utilizar
    res.render('realTimeProducts', {
        rutaCSS: 'realTimeProducts.css',
        rutaJS: 'realTimeProducts.js',
        titulo: "Crear Producto",
    })
})


