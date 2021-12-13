// user model
import user from '../models/auth.js';
// password hash library
import bcrypt from 'bcrypt';
// JSON web token library
import jwt from 'jsonwebtoken';

import { validationResult } from 'express-validator';

export function signupPost(req, res) {
    
    // if(!req.body || !req.body.password || !req.body.email) {
    //     return error
    // }

    const errors = validationResult(req);
    console.log(errors);
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
                            'RANDOM_WEB_TOKEN',
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
// 1 fichier specifique pour cette fonction dans le dossier config ?
export function auth(req, res, next){
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_WEB_TOKEN');
        const userId = decodedToken.userId;
        req.auth = { userId };
        if (req.body.userId && req.body.userId !== userId) {
            throw 'user id non valable';
        } else {
            next();
        }
    } catch(error) {
        res.status(401).json({ error: error | 'Requête non authentifiée' });
    }

}