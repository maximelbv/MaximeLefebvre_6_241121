import user from '../models/auth.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export function signupPost(req, res) {
    
    // cryptage du mot de passe, il prend en paramètres la donnée à crypter et le nombre d'executions de l'algorithme de hashage (SALT)

    // if(!req.body || !req.body.password ou !req.body.email)
    //     return error;
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

export function auth(req, res, next){
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
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