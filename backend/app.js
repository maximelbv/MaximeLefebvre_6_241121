// standard framework to build on node.js
import express from 'express';
// used to allow connexion between the app and the MongoDB database
import mongoose from 'mongoose';
// node.js module - allow access to the server path
import path from 'path';
// used for the environement variables
import dotenv from 'dotenv'

// sauces & auth routers
import authRoutes from './routes/auth.js';
import saucesRoutes from './routes/sauces.js';

// dotenv module configuration
dotenv.config();

// express app creation
const app = express();

// mongoose function - allow connexion between the app and the database
mongoose.connect(process.env.DB_LINK,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie'))
  .catch(() => console.log('Connexion à MongoDB échouée'));

// CORS middleware (Cross-origin resource sharing) - allow  front & back ports compatibility
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

// used to recognize incoming request objects as JSON objects
app.use(express.json());

// auth & sauces middlewares

app.use('/images', express.static(path.join('images')));

app.use('/api/auth', authRoutes);

app.use('/api/sauces', saucesRoutes);

export default app; 
