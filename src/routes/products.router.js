import { Router } from "express";
import { productsManager } from "../controllers/ProductManager.js";
import { __dirname } from "../utils.js";
import CustomError from "../errors/customErrors.js";
import { ErrorMessages } from "../errors/error.enum.js";

const router = Router()

router.get('/', async(req,res) => {
    try {
        const {limit=10, page=1} = req.query
        const products = await productsManager.getProducts(limit,page)
        res.status(200).json({message:'Products',products})
    } catch (error) {
        CustomError.createError(ErrorMessages.PRODUCTS_NOT_FOUND)
    }
})

router.get('/:id', async(req,res) => {
    const {id} = req.params
    try {
        const product = await productsManager.getProductById(id)
        res.status(200).json({message:'Product',product})
    } catch (error) {
        CustomError.createError(ErrorMessages.PRODUCT_NOT_FOUND)
    }
})

router.post('/', async(req,res) => {
    try {
        const newProduct = await productsManager.createProduct(req.body)
        res.status(200).json({message:'New product',product: newProduct})
    } catch (error) {
        CustomError.createError(ErrorMessages.PRODUCT_CANNOT_BE_CREATED)
    }
})

router.delete('/:id', async(req,res) => {
    const {id} = req.params
    try {
        const deleteProduct = await productsManager.deleteProduct(id)
        res.status(200).json({message:'Product Deleted',product: deleteProduct})
    } catch (error) {
        CustomError.createError(ErrorMessages.PRODUCTS_NOT_FOUND)
    }
})


export default router