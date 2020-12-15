// Define our dependencies
import express from 'express';
import session from 'express-session';
import passport from 'passport';
import OAuth2Strategy, { VerifyCallback } from 'passport-oauth2';

import routes from './routes';

// Define our constants, you will change these with your own
const TWITCH_CLIENT_ID = 'i4ryy5pob5jjyywmvff84n0ay4fmv7';
const TWITCH_SECRET = 'c16f7pcowyvqwwvt094kpu2wmouisz';

const STREAMELEMENTS_CLIENT_ID = 'f5341e614456f2f0';
const STREAMELEMENTS_SECRET = '02ae024e26f880e0a5d8fd1fc3492881';

const SESSION_SECRET = 'tribo';
const CALLBACK_URL = 'tribogaules://'; // You can run locally with - http://localhost:3333/auth/twitch/callback, http://localhost:3333/auth/streamelements/callback

const app = express();
app.use(express.json());

app.use(
    session({
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
    }),
);

app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

type ProfileToken = {
    accessToken: string;
    refreshToken: string;
};

passport.use(
    'twitch',
    new OAuth2Strategy(
        {
            authorizationURL: 'https://id.twitch.tv/oauth2/authorize',
            tokenURL: 'https://id.twitch.tv/oauth2/token',
            clientID: TWITCH_CLIENT_ID,
            clientSecret: TWITCH_SECRET,
            callbackURL: CALLBACK_URL,
            state: true,
        },
        (
            accessToken: string,
            refreshToken: string,
            profile: ProfileToken,
            verified: VerifyCallback,
        ) => {
            // eslint-disable-next-line no-param-reassign
            profile.accessToken = accessToken;
            // eslint-disable-next-line no-param-reassign
            profile.refreshToken = refreshToken;

            console.log('User logged');
            // Securely store user profile in your DB
            // User.findOrCreate(..., function(err, user) {
            //  done(err, user);
            // });

            verified(null, profile);
        },
    ),
);

passport.use(
    'streamelements',
    new OAuth2Strategy(
        {
            authorizationURL: 'https://api.streamelements.com/oauth2/authorize',
            tokenURL: 'https://api.streamelements.com/oauth2/token',
            clientID: STREAMELEMENTS_CLIENT_ID,
            clientSecret: STREAMELEMENTS_SECRET,
            callbackURL: CALLBACK_URL,
            state: false,
            scope: ['channel:read'],
        },
        (
            accessToken: string,
            refreshToken: string,
            profile: ProfileToken,
            verified: VerifyCallback,
        ) => {
            // eslint-disable-next-line no-param-reassign
            profile.accessToken = accessToken;
            // eslint-disable-next-line no-param-reassign
            profile.refreshToken = refreshToken;

            console.log('User logged');
            // Securely store user profile in your DB
            // User.findOrCreate(..., function(err, user) {
            //  done(err, user);
            // });

            verified(null, profile);
        },
    ),
);

export default app;
