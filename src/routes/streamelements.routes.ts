import { Router } from 'express';
import GetStreamElementsItemService from '../services/getStreamElementsItemService';
import GetStreamElementsItemsService from '../services/getStreamElementsItemsService';
import GetStreamElementsUserPoints from '../services/getStreamElementsUserPoints';

const streamElementsRouter = Router();

streamElementsRouter.get('/items', async (request, response) => {
    const getStreamElementsService = new GetStreamElementsItemsService();
    const items = await getStreamElementsService.execute();
    return response.json(items);
});

streamElementsRouter.get('/items/:id', async (request, response) => {
    const { id } = request.params;
    const getStreamElementsItemService = new GetStreamElementsItemService();
    const item = await getStreamElementsItemService.execute(id);
    return response.json(item);
});

streamElementsRouter.get('/points/:username', async (request, response) => {
    const { username } = request.params;
    const getStreamElementsUserPoints = new GetStreamElementsUserPoints();
    const points = await getStreamElementsUserPoints.execute(username);

    return response.json(points);
});

export default streamElementsRouter;
