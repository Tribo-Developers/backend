import AppError from '../errors/AppError';
import User from '../models/User';
import { openApi } from './streamElementsApi';

class GetStreamElementsUserPoints {
    public async execute(username: string): Promise<User> {
        if (!username) {
            throw new AppError('Invalid user');
        }
        const response = await openApi.get(
            `/points/${process.env.TWITCH_GAULES_ID || ''}/${username}`,
        );

        if (response.status !== 200 && response.statusText !== 'ok') {
            throw new AppError(
                'Error on get user points from streamelements API',
            );
        }

        const user = response.data as User;

        return user;
    }
}

export default GetStreamElementsUserPoints;
