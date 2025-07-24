import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    category: {
        type: [String],
        required: true,
    },
    images: {
        type: [String]
    },
    discount: {
        type: Number,
        default: 0,
    },
    rating: {
        type: Number,
        default: 0,
    }
})

export default mongoose.model('Product', ProductSchema)