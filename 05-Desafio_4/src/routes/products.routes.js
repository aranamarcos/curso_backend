import {Router} from 'express'
import { ProductManager } from '../controllers/ProductManager.js'

const routerProd = Router()
const prodManager = new ProductManager("./src/models/productos.json")


// Consulta completa
routerProd.get('/', async (req, res) => {
    const { limit } = req.query;
    const { status, resp  } = await prodManager.getProducts();
    limit ? res.status(status).send(resp.slice(0,limit)) : res.status(status).send(resp);
})


// Consulta por id
routerProd.get('/:id', async (req, res) => {
    const { status, resp  } = await prodManager.getProductById(parseInt(req.params.id));
    res.status(status).send(resp);
});


// Crear un nuevo producto
routerProd.post('/', async (req, res) => {
    const {status, resp} = await prodManager.addProduct(req.body);
    res.status(status).send(resp);
})


// Modificar un producto
routerProd.put('/:id', async (req, res) => {
    const {status, resp} = await prodManager.updateProduct(parseInt(req.params.id), req.body);
    res.status(status).send(resp);
})


// Eliminar un producto
routerProd.delete('/:id', async (req, res) => {
    const {status, resp} = await prodManager.deleteProduct(parseInt(req.params.id));
    res.status(status).send(resp);
})


// Informe de ruta incorrecta
routerProd.get('*', (req, res) => {
    res.status(404).send("Error 404. Pagina no encontrada");
});

export default routerProd