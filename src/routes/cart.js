import { Router } from "express";
import CartManager from "../datos/CartManager.js";
const cartRouter = Router()

const cart = []

const cartManager = new CartManager()

cartRouter.get('/cid', async (req, res) => {
   let cid = req.params.cid
   let cart = await cartManager.getCart(id)
   res.send(cart)
})

cartRouter.post('/', async (req, res) => {
    try {
        const createNewCart = await cartManager.createCart()
        res.status(200).json({message:'Nuevo carrito agregado', cart: createNewCart})
    } catch (error) {
        res.status(500).json({error})
    }
})

cartRouter.post('/:cid/product/:pid', async (req, res) => {
    const {cid,pid} = req.params
    try {
        const addProductToCart = await cartManager.addProductToCart(+cid, +pid)
        res.status(200).json({message:'Cart-Product', cart: addProductToCart})
    } catch (error) {
        res.status(500).json({error})
    }
})

export default cartRouter