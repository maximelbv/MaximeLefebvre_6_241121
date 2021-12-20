// user model
import user from '../models/auth.js';
import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config();

export function signupPost(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    } else {
        bcrypt.hash(req.body.password, 10)
            .then(hash => {
                const newUser = new user({
                    email: req.body.email,
                    password: hash
                });
    
                return newUser.save()
                    .then(() => res.status(201).json({message: 'Le compte a bien été créé'}))
                    .catch(error => res.status(400).json({ error }))
                ;
            })
            .catch(error => res.status(500).json({ error }));

    }


};

export function loginPost(req, res){

    return user.findOne({email: req.body.email})
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé' })
            } 
            return bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect' })
                    }
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

export function auth(req, res, next){
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.userId;
        req.auth = { userId };
        if (req.body.userId && req.body.userId !== userId) {
            throw 'user id non valable';
        } else {
            next();
        }
    } catch(error) {
        res.status(401).json({ error: 'Requête non authentifiée' });
    }

}