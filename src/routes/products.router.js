import { Router } from "express";
import { productsManager } from "../controllers/ProductManager.js";
import fs from 'fs'
import { __dirname } from "../utils.js";

const router = Router()

router.get('/', async(req,res) => {
    try {
        const {limit=10, page=1} = req.query
        const products = await productsManager.getProducts(limit,page)
        res.status(200).json({message:'Products',products})
    } catch (error) {
        res.status(500).json({error})
    }
})

router.get('/:id', async(req,res) => {
    const {id} = req.params
    try {
        const product = await productsManager.getProductById(id)
        res.status(200).json({message:'Product',product})
    } catch (error) {
        res.status(500).json({error})
    }
})

router.post('/', async(req,res) => {
    try {
        const newProduct = await productsManager.createProduct(req.body)
        res.status(200).json({message:'New product',product: newProduct})
    } catch (error) {
        res.status(500).json({error})
    }
})

router.delete('/:id', async(req,res) => {
    const {id} = req.params
    try {
        const deleteProduct = await productsManager.deleteProduct(id)
        res.status(200).json({message:'Product Deleted',product: deleteProduct})
    } catch (error) {
        res.status(500).json({error})
    }
})

//const path = __dirname+'/Products.json'
//router.get('/add', async (req,res) => {
//    const productData = await fs.promises.readFile(path, 'utf-8')
//    await productsManager.add(JSON.parse(productData))
//    res.json({message:'productos agregados'})
//})

export default router