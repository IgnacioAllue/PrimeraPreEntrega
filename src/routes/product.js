import { Router } from "express";
import { ProductManager } from "../datos/ProductManager.js";
import { validateProduct } from "../utils/index.js";
const productRouter = Router()

const manager = new ProductManager()

productRouter.get('/', async (req, res) => {
    let products = await manager.getProducts()
    res.send(products)
})

productRouter.get('/:pid', async (req, res) => {
    let pid = req.params.pid
    let producto = await manager.getProductById(pid)
    res.send(producto)
})

productRouter.post('/', async (req, res) => {
    let producto = req.body
    producto.status = true
    await manager.addProduct(producto)
    res.send({status:'success', msg:'Producto agregado'})
}) 

productRouter.put('/:pid', async (req, res) => {
    let pid = req.params.pid
    let fields = req.body
    let updateProd = await manager.updateProducts(pid, fields)
    res.send({ status:'success', msg:'Producto actualizado'})
})

productRouter.delete('/:pid', async (req, res) => {
    let pid = req.params.pid
try {
    const borrar = await manager.deleteProduct(+pid)
    res.send({ status:'sucess', msg:'Producto eliminado'})
} catch (error) {
    res.send({error})
}
})

export default productRouter