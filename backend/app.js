import express from 'express';
import * as midd from './controllers/middlewares.js';
import mongoose from 'mongoose';
import sauce from './models/sauce.js';
import user from './models/user.js';


const app = express();



// connexion à la DB
mongoose.connect('mongodb+srv://Maximelbv:azer@piiquante.s8orz.mongodb.net/Piiquante?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie'))
  .catch(() => console.log('Connexion à MongoDB échouée'));

// applique le body des json sur la 'req'
app.use(express.json());

// CORS middleware (Cross-origin resource sharing)
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

// CRUD middlewares (Create, Read, Update, Delete)

app.post('/api/auth/signup', midd.signupPost);

app.post('/api/auth/login', (req, res, next) => {
    // utiliser 'newuser.find()' ? 
    // si la req match un user: renvoie son id et un 'token web JSON' (?)
});

app.get('/api/sauces', (req, res, next) => {
    sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({error}));
});

app.get('/api/sauces/:id', (req, res, next) => {
    sauce.findOne({id: req.params.id})
    .then(specSauce => res.status(200).json(specSauce))
    .catch(error => res.status(404).json({error}));
});

// app.post('/api/sauces', (req, res, next) => {});

app.put('/api/sauces/:id', (req, res, next) => {
    // revoir updateOne method
    sauce.updateOne({id: req.params.id}, {...req.body, id: req.params.id})
    .then(() => res.status(200).json({message: 'sauce modifiée'}))
    .catch(error => res.status(404).json({error}));
});

app.delete('/api/sauces/:id', (req, res, next) => {
    sauce.deleteOne({id: req.params.id})
    .then(() => res.status(200).json({message: 'sauce supprimée'}))
    .catch(error => res.status(404).json({error}));
});

// app.post('/api/sauces/:id/like',( req, res) => {});



export default app; 