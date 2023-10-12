import { cartsModel } from "../DAO/models/carts.models.js";

class CartManager {
    
    async getCarts() {
        try {
            const carts = await cartsModel.find({})
            return carts
        } catch (error) {
            return error
        }
    }

    async createCart(obj) {
        try {
            const cart = await cartsModel.create(obj)
            return cart
        } catch (error) {
            return error
        }
    }

    async getCartById(id){
        try {
            const cart = await cartsModel.findById(id)
            return cart
        } catch (error) {
            return error
        }
    }

    async updateOne(id, obj){
        try {
            const updateCart = await cartsModel.updateOne({ _id: id},{ ...obj })
            return updateCart
        } catch (error) {
            return error
        }
    }

    async deleteOne(id){
        try {
            const deleteCart = await cartsModel.findByIdAndDelete(id)
            return deleteCart
        } catch (error) {
            return error
        }
    }


    async deleteProduct(cid,pid){
        try {
            const cart = await cartsModel.findById(cid)
            if(!cart) throw new Error('cart not found')

            const response = await cartsModel.updateOne({_id:cid}, {$pull:{products:pid}})
        return response
        } catch (error) {
            return error
        }
    }
}

export const cartManager = new CartManager()