import { promises as fs } from 'fs'


export class ProductManager {

    constructor(path) {
        this.path = path
    }

    static incrementarID() {
        if (this.idIncrement) {
            this.idIncrement++
        } else {
            this.idIncrement = 4
        }
        return this.idIncrement
    }

    getProducts = async () => {
        // Leo el txt y lo imprimo en consola
        const products = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        if(products.length > 0){
            return{status: 200, resp: products}
        } else {
            return{status: 400, resp: "No hay productos cargados"}
        }
    }
    
    getProductById = async (id) => {
        // Leo el txt
        const products = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        // Busco el id en el array y lo comunica si existe y sino da un mensaje
        const prod = products.find(producto => producto.id === id)
        if(prod){
            return{status: 200, resp: prod}
        } else {
            return{status: 404, resp: "Producto no encontrado"}
        }
    }

    addProduct = async (product) => {
        const products = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        
        if(products.find(producto => producto.codigo == product.codigo)) {
            return{status: 400, resp: "Producto ya existente"}
        }
        product.id = ProductManager.incrementarID();
        product.status = true;
        products.push(product)
        await fs.writeFile(this.path, JSON.stringify(products))
        return{status: 200, resp: "Producto creado correctamente"}
    }
    
    updateProduct = async (id, {nombre, descripcion}) => {
        // Leo el txt
        console.log("id= ",id);
        console.log("nombre= ",nombre);
        console.log("descripcion= ",descripcion);
        const products = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        // Me devuelve el indice donde esta el producto, si no lo encuentra devuelve -1
        let indice = products.findIndex(prod => prod.id === id)
        if(indice != -1){
            // Modifico los atributos
            products[indice].nombre = nombre
            products[indice].descripcion = descripcion
            // Actualizo el txt
            await fs.writeFile(this.path, JSON.stringify(products))
            return{status: 200, resp: "Producto modificado"}
        } else {
            return{status: 404, resp: "Producto no encontrado"}
        }
    }
    
    deleteProduct = async (id) => {
        // Leo el txt
        const products = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        // Validacion
        const prodIndex = products.findIndex(product => product.id === parseInt(id));
        if(prodIndex != -1){
            // Filtro quedandome con todos excepto el que quiero eliminar
            const prod = products.filter(prod => prod.id != id)
            // Actualizo el txt
            await fs.writeFile(this.path, JSON.stringify(prod))
            return{status: 200, resp: "Producto eliminado correctamente"}
        } else {
            return{status: 404, resp: "Producto no encontrado"}
        }
    }
}





