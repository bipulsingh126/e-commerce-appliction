import express from 'express';
import { loginController, registerController, testController } from '../controllers/authController.js';
import { isAdmin, requiredSignIn } from '../middleware/authMiddleware.js';

// router object

const router = express.Router();

router.post('/register', registerController);

router.post('/login', loginController)

// test route
router.get('/test',requiredSignIn,isAdmin, testController);

// protected router
router.get('/user-auth', requiredSignIn, (req ,res)=>{
    res.status(200).send({ok : true})
})

export default router;