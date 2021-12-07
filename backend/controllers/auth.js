import user from '../models/auth.js';
import bcrypt from 'bcrypt';

// 'export function signupPost()' ou 'exports.signupPost' ?
export function signupPost(req, res) {
    // 'delete req.body._id' dans le tuto, pourquoi?

    // cryptage du mot de passe, il prend en paramètres la donnée à crypter et le nombre d'executions de l'algorithme de hashage (SALT)
    bcrypt.hash(req.body.password, 10)
    .then(hash => {

        const newUser = new user({
            email: req.body.email,
            password: hash
        })

        return newUser.save()
        .then(() => res.status(201).json({message: 'Le compte a bien été créé'}))
        .catch(error => res.status(400).json({ error }))

    })
    .catch(error => res.status(500).json({ error }));
};

export function loginPost(req, res){

    user.findOne({email: req.body.email})
    .then(user => {
        if (!user) {
            return res.status(401).json({ error: 'Utilisateur non trouvé' })
        } 
        bcrypt.compare(req.body.password, user.password)

        .then(valid => {
            if (!valid) {
                return res.status(401).json({ error: 'Mot de passe incorrect' })
            }
            res.status(200).json({
                userId: user._id
            })
        })
        .catch(error => res.status(500).json({ error }))
    })
    .catch(error => res.status(500).json({ error }))

}
