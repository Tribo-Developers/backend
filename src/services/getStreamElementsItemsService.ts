import AppError from '../errors/AppError';
import { openApi } from './streamElementsApi';
import Item from '../models/Item';

interface filteredItem {
    id: string;
    name: string;
    description: string;
    type: string;
    cost: number;
    image: string;
    public: boolean;
    userInput: [string];
    subscriberOnly: boolean;
    quantity: {
        total: number;
        current: number;
    };
}

class GetStreamElementsItemsService {
    public async execute(): Promise<[filteredItem]> {
        const response = await openApi.get(
            `/store/${process.env.TWITCH_GAULES_ID || ''}/items`,
        );

        if (response.status !== 200 && response.statusText !== 'ok') {
            throw new AppError('Error on get items from streamelements API');
        }

        const result = response.data as [Item];

        const items: [filteredItem] = [];

        result.map(item => { // eslint-disable-line
            items.push({
                id: item._id, // eslint-disable-line
                name: item.name,
                description: item.description,
                type: item.type,
                cost: item.cost,
                image: item.preview,
                public: item.public,
                userInput: item.userInput,
                subscriberOnly: item.subscriberOnly,
                quantity: item.quantity,
            });
        });

        return items;
    }
}

export default GetStreamElementsItemsService;
