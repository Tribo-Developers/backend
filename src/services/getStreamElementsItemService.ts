import AppError from '../errors/AppError';
import filteredItem from '../models/FilteredItem';
import GetStreamElementsItemsService from './getStreamElementsItemsService';

class GetStreamElementsItemService {
    public async execute(itemId: string): Promise<filteredItem> {
        if (!itemId) {
            throw new AppError('Invalid Item ID');
        }

        const getStreamElementsItemsService = new GetStreamElementsItemsService();

        const items = await getStreamElementsItemsService.execute();

        const itemFounded = items.findIndex(Item => (Item.id = itemId)); // eslint-disable-line

        if (itemFounded < 0) {
            throw new AppError('Item not found', 404);
        }

        return items[itemFounded];
    }
}

export default GetStreamElementsItemService;
