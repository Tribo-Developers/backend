import { Router } from 'express';
import authRouter from './auth.routes';

const routes = Router();

routes.use('/auth', authRouter);

export default routes;
