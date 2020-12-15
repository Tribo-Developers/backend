import passport from 'passport';
import { Router } from 'express';

const authRouter = Router();

authRouter.get(
    '/twitch',
    passport.authenticate('twitch', { scope: 'user_read' }),
);

authRouter.get(
    '/twitch/callback',
    passport.authenticate('twitch', {
        successRedirect: '/',
        failureRedirect: '/',
    }),
);

authRouter.get('/streamelements', passport.authenticate('streamelements'));

authRouter.get(
    '/streamelements/callback',
    passport.authenticate('streamelements'),
);

export default authRouter;
