import { check } from 'express-validator';

export const sauceCheck = [

    check('name')
        .notEmpty().withMessage('Le nom ne peut pas être vide')
        .isLength({ min: 3, max: 20 }).withMessage('Le nom doit comprendre entre 3 et 20 caractères'),

    check('manufacturer')
        .notEmpty().withMessage('Le nom du manufacturer ne peut pas être vide')
        .isLength({ min: 3, max: 20 }).withMessage('Le nom du manufacturer doit comprendre entre 3 et 20 caractères'),

    check('description')
        .notEmpty().withMessage('La description ne peut pas être vide')
        .isLength({ max: 300 }),

    check('mainPepper')
        .notEmpty().withMessage('Le nom du piment principal ne peut pas être vide')
        .isLength({ min: 3, max: 20 }).withMessage('Le nom du piment principal doit comprendre entre 3 et 20 caractères'),

    check('imageUrl')
        .isEmpty().withMessage('Veuillez insérer une image')
        .matches(/(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))/),

    check('heat')
        .isEmpty().withMessage('Valeur vide')
        .isDecimal(),

    check('likes')
        .isEmpty().withMessage('Valeur vide')
        .isDecimal(),

    check('dislikes')
        .isEmpty().withMessage('Valeur vide')
        .isDecimal(),

]