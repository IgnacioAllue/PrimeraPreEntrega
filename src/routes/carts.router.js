import { Router } from "express";
import { cartManager } from "../controllers/CartManager.js";
import { transporter } from "../nodemailer.js";
import hbs from "nodemailer-express-handlebars"
import { ticketModel } from "../DAO/models/ticket.models.js";
const cartRouter = Router()

cartRouter.get('/', async (req,res) => {
    try {
        const carts = await cartManager.getCarts()
        res.status(200).json({message: 'Carts found', carts})
    } catch (error) {
        res.status(500).json({error})
    }
})

cartRouter.get('/:id',async (req,res) => {
    const {id} = req.params
    try {
        const cart = await cartManager.getCartById(id)
        res.status(200).json({message:'Cart',cart})
    } catch (error) {
        res.status(500).json({error})
    }
    
})

cartRouter.post('/', async (req,res) => {
    try {
        const newCart = await cartManager.createCart(req.body)
        res.status(200).json({message:'Cart created', cart: newCart})
    } catch (error) {
        res.status(500).json({error})
    }
})

cartRouter.put('/:cid', async (req,res) => {
    try {
        const actCart = await cartManager.updateOne(req.body)
        res.status(200).json({message:'Cart actualizado', cart: actCart})
    } catch (error) {
        res.status(500).json({error})
    }
})

cartRouter.delete('/:id', async (req,res) => {
    const {id} = req.params
    try {
        const deleteCart = await cartManager.deleteOne(id)
        res.status(200).json({message:'Cart Deleted',product: deleteCart})
    } catch (error) {
        res.status(500).json({error})
    }
})

cartRouter.delete('/:cid/products/pid', async(req,res)=> {
    const {cid,pid} = req.params
    try {
        const result = await cartManager.deleteProduct(cid,pid)
        res.status(200).json({message:'Success'})
    } catch (error) {
        res.status(500).json({error})
    }
})

cartRouter.get("/:cid/purchase", async (req,res) => {
    try {
        const newTicket = await cartManager.createTicket(req.body)
        const mail = {
            from: "Ecommerce",
            to: "ignacioaallue@gmail.com",
            subject: "Ticket de compra",
            text: "My first message"
        }
        await transporter.sendMail(mail)
        res.status(200).json({message:'Ticket created', cart: newTicket})
    } catch (error) {
        res.status(500).json({error})
    }
})

export default cartRouter

