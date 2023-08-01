import fs from 'fs'

class CartManager{
    constructor(){
        this.path = 'carrito.json'
    }

    async getNewId(newCode) {
        return newCode + 1
    }

    async getCart(productos){
        let carritos 
        try {
            let contenido = await fs.promises.readFile(this.path)
            productos = JSON.parse(contenido)
        } catch (error) {
            console.log(error)
        }
        return carritos
    }

    async addProductToCart(pid, cid){
        let carrito
        let carritos = await this.getCart()
        let index = carritos.findIndex(cart => cart.id == cid)
        if(index == -1){
            return carrito
        }

        carritos[index].products.push(pid)
        try {
            await fs.promises.writeFile(this.path, JSON.stringify(carritos))
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async createCart(){
        let newCart = {
            id:this.getNewId(),
            products: []
        }
        let carritos = await this.getCart()
        carritos.push(newCart)
        try {
            await fs.promises.writeFile(this.path,JSON.stringify(carritos))
        } catch (error) {
            console.log(error)
            throw error
        }

        return newCart
    }
    

    
}

export default CartManager