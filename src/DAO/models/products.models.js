import mongoose, { Schema } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'

const productsSchema = new mongoose.Schema({
    title:{ 
        type: String,
        required: true,
        index: true
    },
    description:{ 
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    code:{
        type: Number,
        required: true,
        unique: true
    },
    category:{
        type: String,
        required: true
    },
    stock:{
        type: Number,
        required: true,
        default: 0
    }
})

productsSchema.plugin(mongoosePaginate)

export const productsModel = mongoose.model('Products',productsSchema)