import ngrok from 'ngrok';
import config from './config/config';
import app from './config/express';
import logger from './config/winston';

if (!module.parent) {
  // listen on port config.port
  app.listen(process.env.PORT || config.port, () => {
    logger.info(`server started on ${config.port} PORT (${config.env})`);
    ngrok.connect(config.port).then(async (res) => {
      const url = res.split('//');
      logger.info(`http://${url[1]}`);
    });
  });
}

export default app;
