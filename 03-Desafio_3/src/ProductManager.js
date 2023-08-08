import { promises as fs } from 'fs'


export class ProductManager {

    constructor(path) {
        this.path = path
    }

    getProducts = async () => {
        // Leo el txt y lo imprimo en consola
        const products = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        return products
    }
    
    getProductById = async (id) => {
        // Leo el txt
        const products = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        // Busco el id en el array y lo comunica si existe y sino da un mensaje
        const prod = products.find(producto => producto.id === id)
        return(prod)
    }
    
    addProduct = async (product) => {
        // Leo el txt
        const products = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        // Valido si ya existe producto con mismo id
        if(products.find(producto => producto.id == product.id)) {
            return "Producto ya agregado"
        }
        // Si no existe agrego el producto al array product
        products.push(product)
        // Actualizo el txt
        await fs.writeFile(this.path, JSON.stringify(products))
    }
    
    updateProduct = async (id, {nombre, descripcion}) => {
        // Leo el txt
        const products = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        // Me devuelve el indice donde esta el producto, si no lo encuentra devuelve -1
        let indice = products.findIndex(prod => prod.id === id)
        if(indice != -1){
            // Modifico los atributos
            products[indice].nombre = nombre
            products[indice].descripcion = descripcion
            // Actualizo el txt
            await fs.writeFile(this.path, JSON.stringify(products))
        } else {
            console.log("Producto no encontrado")
        }
    }
    
    deleteProduct = async (id) => {
        // Leo el txt
        const products = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        // Filtro quedandome con todos excepto el que quiero eliminar
        const prods = products.filter(prod => prod.id != id)
        // Actualizo el txt
        await fs.writeFile(this.path, JSON.stringify(prods))
    }
}

// ----------------------------------------------

class Producto {
    constructor(nombre, descripcion, precio, img, codigo, stock) {
        this.nombre = nombre 
        this.descripcion = descripcion
        this.precio = precio
        this.img = img
        this.codigo = codigo
        this.stock = stock
        this.id = Producto.incrementarID()
    }

    static incrementarID() {
        if (this.idIncrement) {
            this.idIncrement++
        } else {
            this.idIncrement = 1
        }
        return this.idIncrement
    }
}

// ----------------------------------------------

const probarFunciones = async () => {
    await productManager.addProduct(producto1)
    await productManager.addProduct(producto2)
    await productManager.getProductById(producto2.id)
    await productManager.updateProduct(producto2.id, {nombre: "marcador", descripcion: "rojo"})
    await productManager.getProducts()
}

const producto1 = new Producto("lapiz", "negro", 100, "", 78965, 10)
const producto2 = new Producto("lapicera", "azul", 200, "", 78895, 10)

const productManager = new ProductManager("./src/products.txt")

probarFunciones();





