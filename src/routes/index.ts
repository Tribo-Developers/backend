import { Router } from 'express';
import authRouter from './auth.routes';
import streamElementsRouter from './streamelements.routes';
import swaggerRouter from './swagger.routes';

const routes = Router();

routes.use('/auth', authRouter);

routes.use('/streamelements', streamElementsRouter);

routes.use('/docs', swaggerRouter);

export default routes;
