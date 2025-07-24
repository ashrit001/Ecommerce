import handleServiceError, { success } from "../Helper/ResponseHelper.js";
import CartServices from "../services/CartServices.js";

const CartController = {
    addToCart: async (req, res) => {
        try {
            const cart = await CartServices.addToCart(req.params.id, req.body.quantity);
            return success(res, cart);
        } catch (err) {
            return handleServiceError(res, err.message);
        }
    },

    removeFromCart: async (req, res) => {
        try {
            const cart = await CartServices.removeFromCart(req.params.id);
            return success(res, cart);
        }  catch (err) {
            return handleServiceError(res, err.message);
        }
    },

    getCart: async (req, res) => {
        try {
            const cart = await CartServices.getCart(req.user._id);
            return success(res, cart);
        } catch (err) {
            return handleServiceError(res, err.message);
        }
    },

    clearCart: async (req, res) => {
        try {
            const cart = await CartServices.clearCart(req.user._id);
            return success(res, cart);
        } catch (err) {
            return handleServiceError(res, err.message);
        }
    }
}

export default CartController;