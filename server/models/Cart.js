import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [{
        item: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'CartItem',
            required: true
        }
    }]

}, {
    timestamps: true
})

export default mongoose.model('Cart', CartSchema)