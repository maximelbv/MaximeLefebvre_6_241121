const express = require('express');
const mongoose = require('mongoose');
const app = express();

const sauce = require('./models/sauce');
const user = require('./models/user');

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

app.post('/api/auth/signup', (req, res, next) => {
    const newUser = new user({
        ...req.body
        // hash du password
    })
    newUser.save()
    .then(() => res.status(201).json({message: 'Le compte a bien été créé'}))
    .catch(() => res.status(400).json({error}))
});

app.post('/api/auth/login', (req, res, next) => {
    // utiliser 'newuser.find()' ? 
    // si la req match un user: renvoie son id et un 'token web JSON' (??)
});

app.use('/api/sauces', (req, res) => {
    // renvoie un tableau de toutes les sauces depuis la DB
});

app.use('/api/sauces/:id', (req, res, next) => {
    // renvoie la sauce avec l'id fourni
});

// app.post('/api/sauces', (req, res, next) => {});

// app.post('/api/sauces/:id', (req, res, next) => {}); // post ou put ?

// app.delete('/api/sauces/:id', (req, res, next) => {});

// app.post('/api/sauces/:id/like',( req, res) => {});



module.exports = app; 