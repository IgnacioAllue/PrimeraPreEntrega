import { Router } from "express";
import CartManager from "../datos/CartManager.js";
const cartRouter = Router()

const cart = []

const cartManager = new CartManager()

cartRouter.get('/', async (req, res) => {
   
})

cartRouter.post('/', async (req, res) => {
    let cart = await cartManager.createCart()
    res.send({status: "success", msg: "cart created"})
})

export default cartRouter