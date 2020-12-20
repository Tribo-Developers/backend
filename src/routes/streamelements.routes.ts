import { response, Router } from 'express';
import GetStreamElementsItemsService from '../services/getStreamElementsItemsService';

const streamElementsRouter = Router();

streamElementsRouter.get('/items', async (request, response) => {
    const getStreamElementsService = new GetStreamElementsItemsService();
    const items = await getStreamElementsService.execute();
    return response.json(items);
});

export default streamElementsRouter;
