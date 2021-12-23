// sauces model
import sauce from '../models/sauce.js';
// Node.js 'file system' package
import fs from 'fs';

// functions added to the sauce routers


// get all sauces
export function getAllSauces(req, res) {

    return sauce.find()
        .then(sauces => {res.status(200).json( sauces )})
        .catch(error => res.status(400).json({ error }))
    ;

};

// get a specific sauce
export function getSauce(req, res) {
    
    return sauce.findOne({_id: req.params.id})
        .then(specSauce => res.status(200).json(specSauce))
        .catch(error => res.status(404).json({ error }))
    ;
};

// post a sauce
export function postSauce(req, res) {
    
    // parse the request
    const sauceObject = JSON.parse(req.body.sauce);

    // check conditions
    if (!sauceObject.name || sauceObject.name.length < 3 || sauceObject.name.length > 20) {
        throw 'Le nom doit comporter entre 3 et 20 caractères'
    } else if (!sauceObject.manufacturer ||sauceObject.manufacturer.length < 3 || sauceObject.manufacturer.length > 20) {
        throw 'Le nom du manufacturer doit comporter entre 3 et 20 cartactères'
    } else if (sauceObject.description.length > 300) {
        throw 'La description est trop longue'
    } else if (!sauceObject.mainPepper ||sauceObject.mainPepper.length < 3 || sauceObject.mainPepper.length > 20) {
        throw 'Le piment principal doit comporter entre 3 et 20 caractères'
    } else if (!sauceObject.heat) {
        throw 'Mauvais format d\'intensité '
    }
    
    try {

        // define the const 'newSauce' as a new 'sauce' model with the parsed data recieved
        const newSauce = new sauce({
            ...sauceObject,
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
            likes: 0,
            dislikes: 0
        })
    
        // save the sauce to the database
        return newSauce.save()
            .then(() => res.status(201).json({message: 'La sauce a bien été créée'}))
            .catch((error) => res.status(400).json({ error }))
        ;

    } catch(error) {
        return res.status(403).json({ error })
    }


};

// modify a sauce
export function modifySauce(req, res) {

    // check conditions
    if (!req.body.name || req.body.name.length < 3 || req.body.name.length > 20) {
        throw new Error('Le nom doit comporter entre 3 et 20 caractères');
    } else if (!req.body.manufacturer ||req.body.manufacturer.length < 3 || req.body.manufacturer.length > 20) {
        throw 'Le nom du manufacturer doit comporter entre 3 et 20 cartactères'
    } else if (req.body.description.length > 300) {
        throw 'La description est trop longue'
    } else if (!req.body.mainPepper ||req.body.mainPepper.length < 3 || req.body.mainPepper.length > 20) {
        throw 'Le piment principal doit comporter entre 3 et 20 caractères'
    } else if (!req.body.heat) {
        throw 'Mauvais format d\'intensité '
    }
    
    try {

        // is there a file in the request ?
        const sauceObject = req.file ? 
        { 
            // if yes : modify the sauce according to the request + the 'imageUrl' according to the filename
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body }; // if not: modify the sauce according to the request
    
        // update the sauce in the database
        return sauce.updateOne({_id: req.params.id}, {...sauceObject, id: req.params.id})
            .then(() => res.status(200).json({message: 'sauce modifiée'}))
            .catch(error => res.status(400).json({error}))
        ;

    } catch(err) {
        return res.status(403).json({ err })
    }

};

// delete a sauce
export function deleteSauce(req, res) {

    // find in the database the sauce that is displayed
    return sauce.findOne({ _id: req.params.id })
        // then
        .then(sauce => {
        
            // check if this sauce exists and if the user has the right to delete it
            if (!sauce) {
                return res.status(404).json({error: 'sauce non trouvée'});
            } else if (sauce.userId !== req.auth.userId) {
                return res.status(401).json({error: 'requête non autorisée'});
            }

            // take the image name
            const filename = sauce.imageUrl.split('/images/')[1];
            // and unlink it from the images directory
            fs.unlink(`images/${filename}`, () => {
                // then, delete the sauce
                return sauce.deleteOne({_id: req.params.id})
                    .then(() => res.status(200).json({message: 'sauce supprimée'}))
                    .catch(error => res.status(404).json({error}))
            });

        })
        .catch(error => res.status(404).json({ error }));
};

// like a sauce
export function likeSauce(req, res) {

    // find in the database the sauce that is displayed
    sauce.findOne({_id: req.params.id})
        // then 
        .then(sauce => {
            let curentUserId = req.body.userId;
            let userLikeState = req.body.like;
            let likedUsersList = sauce.usersLiked;
            let dislikedUsersList = sauce.usersDisliked;

            // if the user dislike
            if (userLikeState == -1) {
                // & he liked before
                if (likedUsersList.indexOf(`${curentUserId}`) !== -1) {
                    sauce.likes -= 1;
                    likedUsersList.pop(curentUserId);
                    sauce.dislikes += 1;
                    dislikedUsersList.push(curentUsertId);
                }
                // & he hasn't yet disliked
                else if (dislikedUsersList.indexOf(`${curentUserId}`) == -1) {
                    sauce.dislikes += 1;
                    dislikedUsersList.push(curentUserId);
                }
            }

            // if the user remove his like / dislike
            else if (userLikeState == 0) {

                // if he removes his dislike
                if (dislikedUsersList.indexOf(`${curentUserId}`) !== -1) {
                    sauce.dislikes -= 1;
                    dislikedUsersList.pop(curentUserId);
                }
                // if he remove his like
                else if (likedUsersList.indexOf(`${curentUserId}`) !== -1) {
                    sauce.likes -= 1;
                    likedUsersList.pop(curentUserId);
                }
            }

            // if the user like
            else if (userLikeState == 1) {
                // & he hasn't yet liked
                if (likedUsersList.indexOf(`${curentUserId}`) == -1) {
                    sauce.likes += 1;
                    likedUsersList.push(curentUserId);
                }
                // & he disliked before
                else if(dislikedUsersList.indexOf(`${curentUserId}`) !== -1) {
                    sauce.dislikes -= 1;
                    dislikedUsersList.pop(curentUserId);
                    sauce.likes += 1;
                    likedUsersList.push(curentUsertId);
                }
            }

            // // test block : uncomment to see the results of the 'like / dislike' function 
            // console.log('état du like de l\'user : ' + userLikeState);
            // console.log('likes list : ' + likedUsersList);
            // console.log('dislikes list : ' + dislikedUsersList);
            // console.log('likes : ' + sauce.likes);
            // console.log('dislikes : ' + sauce.dislikes);
            // console.log('***********************************************')

            // then, save the sauce in the database
            return sauce.save()
                .then(res.status(200).json({ message: 'Vote enregistré' }))
                .catch(error => {res.status(404).json({ error })})
        })
        .catch(error => {
            res.status(404).json({ error })
        })
};

