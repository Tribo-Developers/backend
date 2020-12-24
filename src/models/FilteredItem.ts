export default interface filteredItem {
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
