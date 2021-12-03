// export function getAllSauces(req, res, next) => {
//     sauce.find()
//     .then(sauces => res.status(200).json(sauces))
//     .catch(error => res.status(400).json({error}));
// };

// export function getSauce(req, res, next) => {
//     sauce.findOne({id: req.params.id})
//     .then(specSauce => res.status(200).json(specSauce))
//     .catch(error => res.status(404).json({error}));
// };

// export function postSauce(req, res, next) => {};

// export function modifySauce(req, res, next) => {
//     // revoir updateOne method
//     sauce.updateOne({id: req.params.id}, {...req.body, id: req.params.id})
//     .then(() => res.status(200).json({message: 'sauce modifiée'}))
//     .catch(error => res.status(404).json({error}));
// };

// export function deleteSauce(req, res, next) => {
//     sauce.deleteOne({id: req.params.id})
//     .then(() => res.status(200).json({message: 'sauce supprimée'}))
//     .catch(error => res.status(404).json({error}));
// };

// export function likeSauce( req, res) => {};