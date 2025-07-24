import AuthRouter from "./authRoutes.js";
import CartRouter from "./cartRoutes.js";
import OrderRouter from "./orderRoutes.js";
import ProductRouter from "./productRoutes.js";

import { Router } from "express";

const router = Router();

router.use('/auth', AuthRouter);
router.use('/cart', CartRouter);
router.use('/order', OrderRouter);
router.use('/product', ProductRouter);

export default router;