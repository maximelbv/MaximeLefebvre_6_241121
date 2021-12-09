import express from 'express';
const router = express.Router();
import * as saucesControllers from '../controllers/sauces.js';
import {auth} from '../controllers/auth.js';
import multerConfig from '../config/multerConfig.js';



router.get('/', saucesControllers.getAllSauces);

router.get('/:id', saucesControllers.getSauce);

router.post('/',multerConfig , saucesControllers.postSauce);

router.put('/:id', saucesControllers.modifySauce);

router.delete('/:id', auth, saucesControllers.deleteSauce);

// router.post('/:id/like', auth, saucesControllers.likeSauce);

export default router;