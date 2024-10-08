import express from 'express';
import { isAdmin, requiredSignIn } from '../middleware/authMiddleware.js';
import { categoryController, createCategoryControllers, deleteCategory, singleCategory, updateCategory } from '../controllers/categoryController.js';

const router = express.Router();

//routes create category
router.post('/create-category', requiredSignIn, isAdmin, createCategoryControllers)

// update category
router.put('/update-category/:id', requiredSignIn, isAdmin, updateCategory)

// get All category
router.get('/get-category', categoryController)

//single category 
router.get('/single-category/:slug', singleCategory)

//delete category
router.delete('/delete-category/:id',requiredSignIn, isAdmin, deleteCategory)

export default router;