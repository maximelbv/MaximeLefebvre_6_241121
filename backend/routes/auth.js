import express from 'express';
// router creation
const router = express.Router();
// auth controllers & auth data validation
import * as authControllers from '../controllers/auth.js';
import * as authDataValidation from '../middlewares/authDataValidation.js';

// router actions
// authDataValidation.signupCheck/loginCheck = data validation with the express-validator package
// authControllers.signupPost/loginPost = function triggered 
router.post('/signup', authDataValidation.signupCheck, authControllers.signupPost);

router.post('/login', authDataValidation.loginCheck, authControllers.loginPost);

export default router;