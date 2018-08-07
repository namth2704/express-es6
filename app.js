import Debug from 'debug';
import express from 'express';
import routes from './routes';
import middleware from './middleware';
import views from './views';

const app = express();

middleware(app);
routes(app);
views(app);

// Handle uncaughtException
const debug = Debug('express-es-6:app');
process.on('uncaughtException', (err) => {
    debug('Caught exception: %j', err);
    process.exit(1);
});

export default app;
