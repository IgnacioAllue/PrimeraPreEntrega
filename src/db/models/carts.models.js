import mongoose, { Schema } from "mongoose";

const cartSchemas = new mongoose.Schema({
    title:{ 
        type: String,
        required: true,
        index: true
    },
    description:{ 
        type: String,
        required: true
    },
    products: [
        {
            id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Products'
            },
            quantity:{
                type: Number
            }
        }
    ]
})


export const cartsModel = mongoose.model('Cart',cartSchemas)