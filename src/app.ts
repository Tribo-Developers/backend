// Define our dependencies
import express from 'express';
import session from 'express-session';
import passport from 'passport';
import OAuth2Strategy, { VerifyCallback } from 'passport-oauth2';

import routes from './routes';

// Define our constants, you will change these with your own
const TWITCH_CLIENT_ID = 'i4ryy5pob5jjyywmvff84n0ay4fmv7';
const TWITCH_SECRET = 'c16f7pcowyvqwwvt094kpu2wmouisz';
const SESSION_SECRET = 'tribo';
const CALLBACK_URL = 'tribogaules://'; // You can run locally with - http://localhost:3333/auth/twitch/callback

const app = express();
app.use(express.json());
app.use(routes);

app.use(
    session({
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
    }),
);
// app.use(express.static('public'));
app.use(passport.initialize());
app.use(passport.session());

// Override passport profile function to get user profile from Twitch API
OAuth2Strategy.prototype.userProfile = (accessToken, done) => {
    const options = {
        url: 'https://api.twitch.tv/helix/users',
        method: 'GET',
        headers: {
            'Client-ID': TWITCH_CLIENT_ID,
            Accept: 'application/vnd.twitchtv.v5+json',
            Authorization: `Bearer ${accessToken}`,
        },
    };

    fetch('https://api.twitch.tv/helix/users', options)
        .then(response => response.json())
        .then(data => {
            done(null, JSON.parse(data));
        });
};

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

            // Securely store user profile in your DB
            // User.findOrCreate(..., function(err, user) {
            //  done(err, user);
            // });

            verified(null, profile);
        },
    ),
);

// Set route to start OAuth link, this is where you define scopes to request
app.get(
    '/auth/twitch',
    passport.authenticate('twitch', { scope: 'user_read' }),
);

// Set route for OAuth redirect
app.get(
    '/auth/twitch/callback',
    passport.authenticate('twitch', {
        successRedirect: '/',
        failureRedirect: '/',
    }),
);

export default app;
