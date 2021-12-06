import sauce from '../models/sauce.js';
// fonctionne
// afficher message d'erreur dans le DOM? 
export function getAllSauces(req, res) {
    sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error }))
    ;
};
// fonctionne 
export function getSauce(req, res) {
    sauce.findOne({_id: req.params.id})
    .then(specSauce => res.status(200).json(specSauce))
    .catch(error => res.status(404).json({ error }));
};
// erreur
export function postSauce(req, res) {
    const newSauce = new sauce({
        ...req.body
    })
    return newSauce.save()
    .then(() => res.status(201).json({message: 'La sauce a bien été créée'}))
    .catch(() => res.status(400).json({ error: "erreur" }))
    ;
};
// ne fonctionne pas et ne renvoie pas d'erreur
export function modifySauce(req, res) {
    sauce.updateOne({_id: req.params.id}, {...req.body, id: req.params.id})
    .then(() => res.status(200).json({message: 'sauce modifiée'}))
    .catch(error => res.status(400).json({error}));
};

// fonctionne 
export function deleteSauce(req, res) {
    sauce.deleteOne({_id: req.params.id})
    .then(() => res.status(200).json({message: 'sauce supprimée'}))
    .catch(error => res.status(404).json({error}))
    ;
};

// export function likeSauce( req, res) {};