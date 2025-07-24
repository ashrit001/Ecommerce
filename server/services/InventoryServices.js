import Product from "../models/Product.js";
import AppError from "../utils/AppError.js";

const InventoryServices = {
    increase: async (productId, quantity, session) => {
        const product = await Product.findById(productId);
        if (!product) throw new AppError('Product not found', 404);
        product.quantity += quantity;
        await product.save({ session });
    },
    decrease: async (productId, quantity, session) => {
        const product = await Product.findById(productId);
        if (!product) throw new AppError('Product not found', 404);
        if (product.quantity < quantity) throw new AppError('Insufficient quantity', 400);
        product.quantity -= quantity;
        await product.save({ session });
    }
}

export default InventoryServices;