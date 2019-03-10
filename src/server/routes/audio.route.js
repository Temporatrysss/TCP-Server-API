import express from 'express';
// controller
import audioCtrl from '../controllers/audio.controller';

const router = express.Router();

/* GET users listing. */
router.get('/', audioCtrl.audioGet);

export default router;
