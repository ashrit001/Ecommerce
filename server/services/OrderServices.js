import mongoose from "mongoose";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";

import costCalculator from "../utils/CostCalculator.js";
import InventoryServices from "./InventoryServices.js";
import OrderConstant from "../constants/OrderContants.js";
import AppError from "../utils/AppError.js";

const OrderService = {
    placeOrder: async (user_id) => {
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const cart = await Cart.findOne({ user: user_id });
            if (!cart) throw new AppError('Cart not found', 404);

            const orderItems = [];
            let orderTotal = 0;
            for (const cartItem of cart.items){
                const product = await Product.findById(cartItem.product);
                if (!product) throw new AppError('Product not found', 404);
                const orderItem = {
                    item: product._id,
                    quantity: cartItem.quantity,
                    price: product.price,
                    discount: product.discount
                };
                orderItems.push(orderItem);
                InventoryServices.decrease(product._id, cartItem.quantity, session);
                orderTotal += costCalculator(cartItem.quantity, product.price, product.discount);
            }
            const order = new Order({
                user: user_id,
                items: orderItems,
                total: orderTotal,
                status: OrderConstant.PENDING
            });
            await order.save({ session });
            await Cart.findByIdAndDelete(cart._id).session(session);
            await session.commitTransaction();
            return order;
        } catch (err) {
            await session.abortTransaction();
            throw AppError(err.message, 500);
        } finally {
            session.endSession();
        }
    
    },
    getOrders: async (user_id) => {
        try {
            const orders = await Order.find({ user: user_id }).populate('items.item');
            return orders;
        } catch (err) {
            throw new AppError(err.message, 500);
        }
    },
    getOrder: async (order_id) => {
        try { 
            const order = await Order.findById(order_id).populate('items.item');
            return order;
        } catch (err) {
            throw new AppError(err.message, 500);
        }
    },
    cancelOrder: async (order_id) => {
        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            const order = await Order.findById(order_id);
            if (!order) throw new AppError('Order not found', 404);
            if (order.status !== 'pending') throw new Error('Order cannot be cancelled');
            order.status = OrderConstant.CANCELLED;
            for (const item of order.items) {
                await InventoryServices.increase(item.item, item.quantity, session);
            }
            await order.save();
            await session.commitTransaction();
            return order;
        } catch(err) {
            await session.abortTransaction();
            throw new AppError(err.message, 500);
        } finally {
            session.endSession();
        }
    
    },
    markShipped: async (order_id) => {
        try {
            const order = await Order.findById(order_id);
            if (!order) throw new AppError('Order not found', 404);
            if (order.status !== OrderConstant.PENDING) throw new AppError('Order cannot be shipped', 400);

            order.status = OrderConstant.SHIPPED;
            await order.save();
            return order;
        } catch (err) {
            throw new AppError(err.message, 500);
        }
    },
    markDelivered: async (order_id) => {
        try {
            const order = await Order.findById(order_id);
            if (!order) throw new AppError('Order not found', 404);
            if (order.status !== OrderConstant.SHIPPED) throw new AppError('Order cannot be delivered', 400);

            order.status = OrderConstant.DELIVERED;
            await order.save();
            return order;
        } catch (err) {
            throw new AppError(err.message, 500);
        }
    }
}

export default OrderService;