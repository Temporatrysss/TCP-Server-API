import express from 'express';
// Router
import audio from './audio.route';
import config from './../../config/config';


const router = express.Router();

/* GET localhost:[port]/api page. */
router.get('/test', (req, res) => {
  console.log('sfsdf');
  res.send(`server started on PORT ${config.port} (${config.env})`);
});

/** Audio Router */
router.use('/audio', audio);

export default router;
