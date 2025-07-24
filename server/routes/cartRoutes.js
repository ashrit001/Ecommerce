import { Router } from "express";

import CartController from "../controllers/CartController.js";

import auth from "../middlewares/auth.js";

const router = Router();

router.get('/', auth, CartController.getCart);
router.post('/', auth, CartController.addToCart);
router.post('/', auth, CartController.removeFromCart);
router.delete('/clear', auth, CartController.clearCart);

export default router;