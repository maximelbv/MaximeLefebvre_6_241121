import user from '../models/auth.js'

console.log(typeof user);

export function signupPost(req, res, next) {
    console.log('test');
    // delete req.body._id;
    const newUser = new user({
        // email: req.body.email,
        // password: req.body.password
        ...req.body
        // hash du password
    })
    console.log(newUser);
    return newUser.save()
        .then(() => res.status(201).json({message: 'Le compte a bien été créé'}))
        .catch(() => res.status(400).json({error: 'error'}))
    ;
};

// export function loginPost(req, res, next) => {
// }
