import express from 'express';
import { forgotPasswordController, loginController, registerController, testController, updateProfileController } from '../controllers/authController.js';
import { isAdmin, requiredSignIn } from '../middleware/authMiddleware.js';

// router object

const router = express.Router();

router.post('/register', registerController);

router.post('/login', loginController)

//forgot Password || post 
router.post('/forgot-password', forgotPasswordController)

// test route
router.get('/test', requiredSignIn, isAdmin, testController);

// protected user router
router.get('/user-auth', requiredSignIn, (req, res) => {
    res.status(200).send({ ok: true })
})

// protcated admin-route auth
router.get('/admin-auth', requiredSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true })
});

// update profile
router.put('/profile', requiredSignIn, updateProfileController)

export default router;