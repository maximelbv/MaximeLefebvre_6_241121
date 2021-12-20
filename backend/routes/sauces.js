import express from 'express';
// router creation
const router = express.Router();
// sauces controllers
import * as saucesControllers from '../controllers/sauces.js';
// auth function
import { auth } from '../controllers/auth.js';
// multer configuration 
import multerConfig from '../middlewares/multerConfig.js';


// router actions 
// auth: function that checks if the user is authentified
// multerConfig: images import process
// saucesControllers.function: functions triggered

router.get('/', auth, saucesControllers.getAllSauces);

router.get('/:id', auth, saucesControllers.getSauce);

router.post('/', auth, multerConfig, saucesControllers.postSauce);

router.put('/:id', auth, multerConfig, saucesControllers.modifySauce);

router.delete('/:id', auth, saucesControllers.deleteSauce);

router.post('/:id/like', auth, saucesControllers.likeSauce);

export default router;