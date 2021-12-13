import express from 'express';
const router = express.Router();
import * as authControllers from '../controllers/auth.js';

import { check } from 'express-validator';

// bonne indentation?
// bonne pratique d'enchainer .methode().withMessage().methode().withmessage() ?
// ou : 
//      check('email).isNotEmpty().withMessage('blabla'),
//      check('email').isEmail().withMessage('blabla'),
router.post('/signup', [

    // Vérification du format de l'email
    check('email')
        .notEmpty().withMessage('Le champ d\'email ne peut pas être vide')
        .isEmail().withMessage('Format incorrect, veuillez entrer une adresse email valide'),

    // Vérification du format du mot de passe (8caractères, 1 maj, 1min, 1 numero)
    // Réduit les chances de piratage par force brute
    check('password')
        .notEmpty().withMessage('Le champ de mot de passe ne peut pas être vide')
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, "i").withMessage('Votre mot de passe doit comporter au moins 8 caractères, un caractère en majuscule et un chiffre')

], authControllers.signupPost);

router.post('/login', [

    // Vérifie si le champ n'est pas vide
    check('email')
        .notEmpty().withMessage('Le champ d\'email ne peut pas être vide'),

    // Vérifie si le champ n'est pas vide
    check('password')
        .notEmpty().withMessage('Le champ de mot de passe ne peut pas être vide')

], authControllers.loginPost);

export default router;