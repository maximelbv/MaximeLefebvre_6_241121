import express from 'express';
const router = express.Router();
import * as saucesControllers from '../controllers/sauces.js';
import { auth } from '../controllers/auth.js';
import multerConfig from '../middlewares/multerConfig.js';



router.get('/', auth, saucesControllers.getAllSauces);

router.get('/:id', auth, saucesControllers.getSauce);

router.post('/', auth, multerConfig, saucesControllers.postSauce);

router.put('/:id', auth, multerConfig, saucesControllers.modifySauce);

router.delete('/:id', saucesControllers.deleteSauce);

// router.post('/:id/like', auth, saucesControllers.likeSauce);

export default router;