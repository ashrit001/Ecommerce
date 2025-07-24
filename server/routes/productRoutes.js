import { Router } from "express";

import auth from "../middlewares/auth.js";
import role from "../middlewares/role.js";

import ProductController from "../controllers/ProductController.js";

const router = Router();

router.get('/', ProductController.getAllProducts);
router.get('/:id', ProductController.getProduct);

router.post('/', auth, role('admin'), ProductController.addProduct);
router.put('/:id', auth, role('admin'), ProductController.updateProduct);
router.delete('/:id', auth, role('admin'), ProductController.deleteProduct);

export default router;


