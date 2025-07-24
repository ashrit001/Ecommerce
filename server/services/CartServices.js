import AppError from "../utils/AppError.js";

import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import CartItem from "../models/CartItem.js";

const CartServices = {
    getOrCreateCart: async (user_id) => {
        const cart = await Cart.findOne({ user: user_id });
        if (!cart) {
            const newCart = new Cart({ user: user_id });
            await newCart.save();
            return newCart;
        }
        return cart;
    },
    addToCart: async (productId, quantity) => {
        try {
            
            const cart = await CartServices.getOrCreateCart(user_id);
            const product = await Product.findById(productId);
            if (!product) throw new AppError('Product not found', 404);
            
            const cartItem = await CartItem.findOne({ cart: cart._id, product: productId });
            if (cartItem) {
                cartItem.quantity += quantity;
                await cartItem.save();
            } else {
                const newCartItem = new CartItem({ cart: cart._id, product: productId, quantity });
                await newCartItem.save();
                cart.items.push({ item: newCartItem._id });
                await cart.save();
            }
            return cart;
        } catch (err) {
            throw new AppError(err.message, 500);
        }
    },
    removeFromCart: async (productId) => {
        try {
            const cart = await Cart.findOne({ user: user_id });
            if (!cart) throw new AppError('Cart not found', 404);
            
            const product = await Product.findById(productId);
            if (!product) throw new AppError('Product not found', 404)
            
            const cartItem = CartItem.findOne({ cart: cart._id, product: productId });
            if (!cartItem) throw new AppError('Cart item not found', 404);
            
            if (cartItem.quantity > 1) {
                cartItem.quantity -= 1;
                await cartItem.save();
            } else {
                await CartItem.findByIdAndDelete(cartItem._id);
            }

            return cart;
        } catch (err) {
            throw new AppError(err.message, 500);
        }
    },

    getCart: async (user_id) => {
        try {
            const cart = await Cart.findOne({ user: user_id }).populate('items.item');
            if (!cart) throw new AppError('Cart not found', 404);
            return cart;
        } catch (err) {
            throw new AppError(err.message, 500);
        }
    },

    clearCart: async (user_id) => {
        try {
            const cart = await Cart.findOne({ user: user_id });
            if (!cart) throw new AppError('Cart not found', 404);
            await CartItem.deleteMany({ cart: cart._id });
            cart.items = [];
            await cart.save();
            return cart;
        } catch (err) {
            throw new AppError(err.message, 500);
        }
    }
}

export default CartServices;