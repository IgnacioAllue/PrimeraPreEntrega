import fs from "fs"

export class ProductManager { 

    constructor () {
        this.path = 'products.json'
    }

    async getNewId(newCode) {
        return newCode + 1
    }
    

    async addProduct(product){
        try {
            let products = await this.getProducts()
            let newCode = products.length
            product.id = newCode
            products.push(product)
            await fs.promises.writeFile(this.path, JSON.stringify(products))
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async getProducts(){
        let products
        try {
            let contenido = await fs.promises.readFile(this.path)
            products = JSON.parse(contenido)
        } catch (error) {
            console.log(error)
        }
        return products
    }

    async getProductById(id){
        let producto
        let products = await this.getProducts()
        producto = products.find(products => products.id ==id)
        return producto
    }

    async updateProducts(pid, fields){
        let producto
        try {
            let productos = await this.getProducts()
            let indice = productos.findIndex(product => product.id == pid)
            if(indice == -1){
                return producto
            }
            productos[indice].title = fields.title
            productos[indice].description = fields.description
            productos[indice].stock = fields.stock
            productos[indice].category = fields.category
            productos[indice].status = fields.status
            productos[indice.thumbnail = fields.thumbnail]
            
            producto = productos[indice]
            await fs.promises.writeFile(this.path, JSON.stringify(productos))
        } catch (error) {
            console.log(error)
            throw error
        }
        return producto
    }

    async deleteProduct(pid){

        try {
            let productos = await this.getProducts()
            let indice = productos.filter(product => product.id !== pid)
            await fs.promises.writeFile(this.path, JSON.stringify(indice))
        } catch (error) {
            console.log(error)
            return error
        }
    }
}

