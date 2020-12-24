import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';

const swaggerDocument = require('../docs/swagger.json'); //eslint-disable-line
const swaggerRouter = Router();

swaggerRouter.use('/', swaggerUi.serve);
swaggerRouter.get('/', swaggerUi.setup(swaggerDocument));

export default swaggerRouter;
