import mongoose, {Schema} from 'mongoose';

const usersSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name:{
        type: String,
        required : true
    },
    email: String,
    age: Number,
    password: String,
    role: String,
    orders: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Cart"
    }
})

const userModel = mongoose.model("user", usersSchema);

export default userModel;