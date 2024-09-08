import express from 'express';
import { isAdmin, requiredSignIn } from '../middleware/authMiddleware.js';
import { createProduct, deleteProduct, getProduct, getSingleProduct, productByCategory, productCount, productFilters, productPerPage, productPhoto, searchProduct, similarProduct, updateProduct } from '../controllers/productControllers.js';
import formidable from 'express-formidable';
const router = express.Router();

//routes

router.post('/create-product', requiredSignIn, isAdmin, formidable(), createProduct);

//get product route
router.get('/get-product', getProduct)

//single product get
router.get('/get-product/:slug', getSingleProduct)
//get photo
router.get('/product-photo/:pid', productPhoto)

//delete product
router.delete('/delete-product/:pid', requiredSignIn, isAdmin, deleteProduct)
//update product
router.put('/update-product/:pid', requiredSignIn, isAdmin, formidable(), updateProduct);

//filter product
router.post('/product-filters', productFilters);

// product count
router.get('/product-count', productCount);

//product per page
router.get('/product-list/:page', productPerPage);

//search product
router.get('/search/:keyword', searchProduct)

//similar product
router.get('/related-product/:pid/:cid', similarProduct)

//product by category
router.get('/product-category/:slug',  productByCategory)

export default router;