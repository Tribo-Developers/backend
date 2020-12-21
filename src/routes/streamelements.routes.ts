import { Router } from 'express';
import GetStreamElementsItemsService from '../services/getStreamElementsItemsService';
import GetStreamElementsUserPoints from '../services/getStreamElementsUserPoints';

const streamElementsRouter = Router();

streamElementsRouter.get('/items', async (request, response) => {
    const getStreamElementsService = new GetStreamElementsItemsService();
    const items = await getStreamElementsService.execute();
    return response.json(items);
});

streamElementsRouter.get('/points/:username', async (request, response) => {
    const { username } = request.params;
    const getStreamElementsUserPoints = new GetStreamElementsUserPoints();
    const points = await getStreamElementsUserPoints.execute(username);

    return response.json(points);
});

export default streamElementsRouter;
