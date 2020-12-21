export default interface Item {
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
