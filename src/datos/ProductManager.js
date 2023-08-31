import { productsModel } from "../db/models/products.models.js"

class ProductManager { 
    

    async getProducts(){
        try {
            const result = await productsModel.paginate({},{limit:10})
            const info = {
                count: result.totalDocs,
                pages: result.totalPages,
                next: result.hasNextPage
                    ?   `http://localhost:8080/api/products?page=${result.nextPage}`
                    :   null,
                prev: result.hasPrevPage
                    ?   `http://localhost:8080/api/products?page=${result.prevPage}`
                    :   null
            }
            return {info, results: result.docs}
        } catch (error) {
            return error
        }
    }

    async createProduct(obj){
        try {
            const newProduct = await productsModel.create(obj)
            return newProduct
        } catch (error) {
            return error
        }
    }

    async getProductById(id){
        try {
            const product = await productsModel.findById(id)
            return product
        } catch (error) {
            return error
        }
    }


    async deleteProduct(id){
        try {
            const deleteProduct = await productsModel.findByIdAndDelete(id)
            return deleteProduct
        } catch (error) {
            return error
        }
    }

    async add(products){
        try {
            await productsModel.create(products)
            return 'Products added'
        } catch (error) {
            return error
        }
    }
}

export const productsManager = new ProductManager()

