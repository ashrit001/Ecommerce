import { Router } from "express";

import OrderController from "../controllers/OrderController.js";

import auth from "../middlewares/auth.js";

const router = Router();

router.get('/', auth, OrderController.getOrders);
router.get('/:id', auth, OrderController.getOrder);
router.post('/', auth, OrderController.placeOrder);
router.put('/cancel/:id', auth, OrderController.cancelOrder);
router.put('/ship/:id', auth, OrderController.markShipped);
router.put('/deliver/:id', auth, OrderController.markDelivered);

export default router;