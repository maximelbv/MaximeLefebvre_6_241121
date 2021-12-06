import user from '../models/auth.js';

export function signupPost(req, res) {
    // delete req.body._id; Pourquoi?
    // verifier si un compte avec cet email existe déjà?
        const newUser = new user({
            // hash du password
            ...req.body
        })        
        return newUser.save()
            .then(() => res.status(201).json({message: 'Le compte a bien été créé'}))
            .catch(() => res.status(400).json({error: 'erreure'}))
        ;
        // renvoyer vers la page de connexion dans le '.then?'
};

export function loginPost(req, res){
    console.log(req);
    user.findOne({email: req.body.email})
    .then(newUser => res.status(200).json(newUser))
    .catch(error => res.status(404).json({error: 'error'}))
}
