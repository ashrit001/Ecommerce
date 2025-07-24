import { success, error, notFound } from "../Helper/ResponseHelper.js";
import Product from "../models/Product.js";

const ProductController = {
    addProduct: async (req, res) => {
        const product = new Product(req.body);
        try {
            const savedProduct = await product.save();
            return success(res, savedProduct);
        } catch (err) {
            return error(res, err.message);
        }
    },
    getAllProducts: async (req, res) => {
        try {
            const products = await Product.find();
            return success(res, products);
        } catch (err) {
            return error(res, err.message);
        }
    },
    getProduct: async (req, res) => {
        try {
            const product = await Product.findById(req.params.id);
            if (!product) return notFound(res, 'Product not found');
            return success(res, product);
        } catch (err) {
            return error(res, err.message);
        }
    },
    updateProduct: async (req, res) => {
        try {
            const updatedProduct = await Product.findByIdAndUpdate(
                req.params.id,
                { $set: req.body },
                { new: true }
            );
            if (!updatedProduct) return notFound(res, 'Product not found');
            return success(res, updatedProduct);
        } catch (err) {
            return error(res, err.message);
        }
    },
    
    deleteProduct: async (req, res) => {
        try {
            const deletedProduct = await Product.findByIdAndDelete(req.params.id);
            return success(res, deletedProduct);
        } catch (err) {
            return error(res, err.message);
        }
    },
}

export default ProductController;