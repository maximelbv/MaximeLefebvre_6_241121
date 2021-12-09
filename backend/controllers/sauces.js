import sauce from '../models/sauce.js';

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
    const newSauce = new sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` 
    })
    console.log(`${req.protocol}://${req.get('host')}/images/${req.file.filename}`);
    return newSauce.save()
        .then(() => res.status(201).json({message: 'La sauce a bien été créée'}))
        .catch((err) => res.status(400).json({ error: err }))
    ;
};

export function modifySauce(req, res) {
    return sauce.updateOne({_id: req.params.id}, {...req.body, id: req.params.id})
        .then(() => res.status(200).json({message: 'sauce modifiée'}))
        .catch(error => res.status(400).json({error}))
    ;
};

// fonctionne 
export function deleteSauce(req, res) {
    return sauce.findOne({ _id: req.params._id })
        .then(sauce => {
            if (!sauce) {
                return res.status(404).json({error: 'sauce non trouvée'});
            }
            if (sauce.userId !== req.auth.userId) {
                return res.status(401).json({error: 'requête non autorisée'});
            }
            return sauce.deleteOne({_id: req.params.id})
                .then(() => res.status(200).json({message: 'sauce supprimée'}))
                .catch(error => res.status(404).json({error}))
            ;
        })
};

// export function likeSauce(req, res) {};