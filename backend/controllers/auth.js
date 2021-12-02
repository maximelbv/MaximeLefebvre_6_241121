// const signupPost = (req, res, next) => {
//     const newUser = new user({
//         ...req.body
//         // hash du password
//     })
//     newUser.save()
//     .then(() => res.status(201).json({message: 'Le compte a bien été créé'}))
//     .catch(() => res.status(400).json({error}))
// };


export function signupPost (req, res, next) {
    console.log('I am posting');
    const newUser = new user({
        ...req.body
        // hash du password
    })
    newUser.save()
    .then(() => res.status(201).json({message: 'Le compte a bien été créé'}))
    .catch(() => res.status(400).json({error}))
};