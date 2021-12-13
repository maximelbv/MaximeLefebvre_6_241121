import express from 'express';
const router = express.Router();
import * as authControllers from '../controllers/auth.js';

import { check } from 'express-validator';

// bonne indentation?
router.post('/signup', [
    
    // Vérification du format de l'email
    check('email')
        .isEmail()
        .withMessage('Format incorrect, veuillez entrer une adresse email valide'),

    // vérification du format du mot de passe (8caractères, 1 maj, 1min, 1 numero)
    // Réduit les chances de piratage par force brute
    check("password", "...").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, "i")
        .withMessage('Votre mot de passe doit comporter au moins 8 caractères, un caractère en majuscule et un chiffre')

], authControllers.signupPost);

router.post('/login', authControllers.loginPost);

export default router;