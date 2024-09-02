import express from 'express';
import { isAdmin, requiredSignIn } from '../middleware/authMiddleware.js';
import { createProduct, getProduct, getSingleProduct } from '../controllers/productControllers.js';
import formidable from 'express-formidable';
const router = express.Router();

//routes

router.post('/create-product', requiredSignIn, isAdmin, formidable(), createProduct);

//get product route
router.get('/get-product', getProduct)

//single product get
router.get('/get-product/:id', getSingleProduct)


export default router;