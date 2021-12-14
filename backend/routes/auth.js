import express from 'express';
const router = express.Router();
import * as authControllers from '../controllers/auth.js';
import * as authDataValidation from '../config/authDataValidation.js';


router.post('/signup', authDataValidation.signupCheck, authControllers.signupPost);

router.post('/login', authDataValidation.loginCheck, authControllers.loginPost);

export default router;