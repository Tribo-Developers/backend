import { Router } from 'express';
import passport from 'passport';

const routes = Router();

// Set route to start OAuth link, this is where you define scopes to request
routes.get(
    '/auth/twitch',
    passport.authenticate('twitch', { scope: 'user_read' }),
);

routes.get('/auth/streamelements', passport.authenticate('streamelements'));

// Set route for OAuth redirect
routes.get(
    '/auth/twitch/callback',
    passport.authenticate('twitch', {
        successRedirect: '/',
        failureRedirect: '/',
    }),
);

// Set route for OAuth redirect
routes.get(
    '/auth/streamelements/callback',
    passport.authenticate('streamelements'),
);

export default routes;
