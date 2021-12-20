// const added to the login and signup routers. 
// define conditions to the data sent by the user with the package express-validator
// .withMessage() : message sent if the condition is not approved
// .notEmpty() : check if the data is not empty
// .isEmail() : check if the data is an email 
// .matches() : check if the data matches the regex

import { check } from 'express-validator';

export const signupCheck = [

    check('email')
        .notEmpty().withMessage('Le champ d\'email ne peut pas être vide')
        .isEmail().withMessage('Format incorrect, veuillez entrer une adresse email valide'),

    check('password')
        .notEmpty().withMessage('Le champ de mot de passe ne peut pas être vide')
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, "i")
        .withMessage('Votre mot de passe doit comporter au moins 8 caractères, un caractère en majuscule et un chiffre')

]

export const loginCheck = [

    check('email')
        .notEmpty().withMessage('Le champ d\'email ne peut pas être vide'),

    check('password')
        .notEmpty().withMessage('Le champ de mot de passe ne peut pas être vide')

]