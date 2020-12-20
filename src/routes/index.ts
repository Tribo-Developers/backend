import { Router } from 'express';
import authRouter from './auth.routes';
import streamElementsRouter from './streamelements.routes';

const routes = Router();

routes.use('/auth', authRouter);

routes.use('/streamelements', streamElementsRouter);

export default routes;
