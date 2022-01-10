// user model
import user from '../models/auth.js';
// data encryption package
import bcrypt from 'bcrypt';
// 'results' function from the express-validator package
import { validationResult } from 'express-validator';
// token generation package
import jwt from 'jsonwebtoken';
// env variables package
import dotenv from 'dotenv'

// dotenv package config
dotenv.config();

// functions added to the auth routers + auth function added to the sauce routers

// create an account
export function signupPost(req, res) {
    const errors = validationResult(req);

    // check if all the conditions from '../middlewares/authDataValidation.js' are respected
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    // if yes : 
    } else {
        // take the password given and encrypt it 10 times
        bcrypt.hash(req.body.password, 10)
            .then(hash => {
                // then, create a new user model with the email requested and the password generated from the password request encryption
                const newUser = new user({
                    email: req.body.email,
                    password: hash
                });
                // save the user in the database
                return newUser.save()
                    .then(() => res.status(201).json({message: 'Le compte a bien été créé'}))
                    .catch(error => res.status(400).json({ error }))
                ;
            })
            .catch(error => res.status(500).json({ error }));

    }


};

// login
export function loginPost(req, res){

    // find in the database the user who matches the email requested
    return user.findOne({email: req.body.email})
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Connexion impossible' })
            } 
            // then compare the password requested with the password of the account in the database
            return bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    // if the passwords dont match, return an error message
                    if (!valid) {
                        return res.status(401).json({ error: 'Connexion impossible' })
                    }
                    // else, return the user id + his token
                    return res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            {userId: user._id},
                            process.env.JWT_SECRET,
                            {expiresIn: '24h'}
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }))
            ;
        })
        .catch(error => res.status(500).json({ error }))
    ;

}

// check if the user is authentified (used on the sauce routers)
export function auth(req, res, next){
    try {
        // take the authorization token (and remove the 'Bearer ')
        const token = req.headers.authorization.split(' ')[1];
        // verify if the token matches the env token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.userId;
        req.auth = { userId };
        // if not: throw an arror message
        if (req.body.userId && req.body.userId !== userId) {
            throw 'user id non valable';
        // else: continue the execution
        } else {
            next();
        }
    } catch(error) {
        res.status(401).json({ error: 'Requête non authentifiée' });
    }

}