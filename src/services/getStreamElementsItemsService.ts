import gaulesConfig from '../config/gaulesConfig';
import AppError from '../errors/AppError';
import { openApi } from './streamElementsApi';

interface Item {
    categoryName: string;
    preview: string;
    updatedAt: Date;
    createdAt: Date;
    channel: string;
    public: boolean;
    cost: number;
    type: string;
    description: string;
    name: string;
    featured: boolean;
    _id: string;
    enabled: boolean;
    order: number;
    userInput: [string];
    sources: [string];
    subscriberOnly: boolean;
    alert: {
        graphics: {
            duration: number;
            src: string;
            type: string;
        };
        audio: {
            volume: number;
            src: string;
        };
        enabled: boolean;
        type: string;
    };
    quantity: {
        total: number;
        current: number;
    };
    cooldown: {
        user: number;
        global: number;
        category: number;
    };
    bot: {
        sendResponse: boolean;
        identifier: string;
    };
}

interface Response {
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
    public async execute(): Promise<[Response]> {
        const response = await openApi.get(
            `/store/${gaulesConfig.TWITCH_GAULES_ID}/items`,
        );

        if (response.status !== 200 && response.statusText !== 'ok') {
            throw new AppError('Error on get items from streamelements API');
        }

        const result = response.data as [Item];

        const items: [Response] = [];

        result.map(item => {
            items.push({
                id: item._id,
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
