import { success } from "../Helper/ResponseHelper.js";
import handleServiceError from "../Helper/ResponseHelper.js";

import OrderService from "../services/OrderServices.js";

const OrderController = {
    placeOrder: async (req, res) => {
        try {
            const order = OrderService.placeOrder(req.user._id);
            return success(res, order);
        } catch (err) {
            return handleServiceError(err, res);
        }
    },

    getOrders: async (req, res) => {
        try {
            const orders = OrderService.getOrders(req.user._id);
            return success(res, orders);
        } catch (err) {
            return handleServiceError(err, res);
        }
    },

    getOrder: async (req, res) => {
        try {
            const order = OrderService.getOrder(req.params.id);
            return success(res, order);
        } catch (err) {
            return handleServiceError(err, res);
        }
    },

    cancelOrder: async (req, res) => {
        try {
            const order = OrderService.cancelOrder(req.params.id);
            return success(res, order);
        } catch (err) {
            return handleServiceError(err, res);
        }
    },

    markShipped: async (req, res) => {
        try {
            const order = OrderService.markShipped(req.params.id);
            return success(res, order);
        } catch (err) {
            return handleServiceError(err, res);
        }
    },

    markDelivered: async (req, res) => {
        try {
            const order = OrderService.markDelivered(req.params.id);
            return success(res, order);
        } catch (err) {
            return handleServiceError(err, res);
        }
    }

}

export default OrderController;