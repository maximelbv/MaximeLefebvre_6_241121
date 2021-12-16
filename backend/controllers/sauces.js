import sauce from '../models/sauce.js';
// package 'file system' de node
import fs from 'fs';

export function getAllSauces(req, res) {
    return sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }))
    ;
};

export function getSauce(req, res) {
    
    return sauce.findOne({_id: req.params.id})
        .then(specSauce => res.status(200).json(specSauce))
        .catch(error => res.status(404).json({ error }))
    ;
};

export function postSauce(req, res) {
    
    const sauceObject = JSON.parse(req.body.sauce);

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

        const newSauce = new sauce({
            ...sauceObject,
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` 
        })
    
        return newSauce.save()
            .then(() => res.status(201).json({message: 'La sauce a bien été créée'}))
            .catch((err) => res.status(400).json({ error: err }))
        ;

    } catch(err) {
        return res.status(403).json({ err })
    }


};

export function modifySauce(req, res) {

    if (!req.body.name || req.body.name.length < 3 || req.body.name.length > 20) {
        throw 'Le nom doit comporter entre 3 et 20 caractères'
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

        const sauceObject = req.file ? 
        { 
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body };
    
        return sauce.updateOne({_id: req.params.id}, {...sauceObject, id: req.params.id})
            .then(() => res.status(200).json({message: 'sauce modifiée'}))
            .catch(error => res.status(400).json({error}))
        ;

    } catch(err) {
        return res.status(403).json({ err })
    }

};

export function deleteSauce(req, res) {

    return sauce.findOne({ _id: req.params.id })
        .then(sauce => {

            const filename = sauce.imageUrl.split('/images/')[1];
            
            fs.unlink(`images/${filename}`, () => {
                return sauce.deleteOne({_id: req.params.id})
                    .then(() => res.status(200).json({message: 'sauce supprimée'}))
                    .catch(error => res.status(404).json({error}))
            });

        })
        .catch(error => res.status(404).json({ error }));
};

// export function likeSauce(req, res) {};

