import { generateProducts } from "../mocks.js"
import { Router } from "express"
import { __dirname } from "../utils.js";
import { productsModel } from "../DAO/models/products.models.js";

const router = Router()

router.get('/', async(req,res) => {

    const products = []
    for (let i=0; i<100; i++) {
        const productMock = generateProducts()
        products.push(productMock)
    }
    const result = await productsModel.create(products)
})

export default router