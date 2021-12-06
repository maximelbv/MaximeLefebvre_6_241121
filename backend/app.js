import express from 'express';
import mongoose from 'mongoose';

// import authRoutes from './routes/auth';
// import saucesRoutes from './routes/sauces';

import * as authControllers from './controllers/auth.js';
import * as saucesControllers from './controllers/sauces.js';

// import sauce from './models/sauce.js';
// import user from './models/user.js';

const app = express();

mongoose.connect('mongodb+srv://Maximelbv:azer@piiquante.s8orz.mongodb.net/Piiquante?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie'))
  .catch(() => console.log('Connexion à MongoDB échouée'));


// CORS middleware (Cross-origin resource sharing)
// autorise la compatibilité entre les ports
// a mettre dans config.js
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

// applique le body des json sur la 'req'
app.use(express.json());

// CRUD middlewares (Create, Read, Update, Delete)

app.post('/api/auth/signup', authControllers.signupPost);

app.post('/api/auth/login', authControllers.loginPost);

app.get('/api/sauces', saucesControllers.getAllSauces);

app.get('/api/sauces/:id', saucesControllers.getSauce);

app.post('/api/sauces', saucesControllers.postSauce);

app.put('/api/sauces/:id', saucesControllers.modifySauce);

app.delete('/api/sauces/:id', saucesControllers.deleteSauce);

// app.post('/api/sauces/:id/like',saucesControllers.likeSauce);

export default app; 