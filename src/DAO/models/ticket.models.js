import mongoose, { Schema } from "mongoose";

const ticketSchema = new mongoose.Schema({
    code: {
        type: Number,
        required: true,
        unique: true
    },
    puchase_datetime: {
        type: Number,
    },
    amount: {
        type: Number
    },
    puchaser: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "user"
    }
})

export const ticketModel = mongoose.model('Ticket', ticketSchema)