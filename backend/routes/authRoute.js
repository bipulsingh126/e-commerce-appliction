import express from 'express';
import { loginController, registerController, testController } from '../controllers/authController.js';

// router object

const router = express.Router();

router.post('/register', registerController);

router.post('/login', loginController)

// test route
router.get('/ktest', testController);


export default router;