// Define our dependencies
require("dotenv").config()
import express from 'express';
import session from 'express-session';
import passport from 'passport';
import OAuth2Strategy, { VerifyCallback } from 'passport-oauth2';

import routes from './routes';
import Profile from './Domain/profile';

const app = express();

app.use(express.json());

app.use(
    session({
        secret: process.env.SESSION_SECRET || '',
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

passport.use(
    'twitch',
    new OAuth2Strategy(
        {
            authorizationURL: 'https://id.twitch.tv/oauth2/authorize',
            tokenURL: 'https://id.twitch.tv/oauth2/token',
            clientID: process.env.TWITCH_CLIENT_ID || '',
            clientSecret: process.env.TWITCH_SECRET || '',
            callbackURL: process.env.CALLBACK_URL || '',
            state: true,
        },
        (
            accessToken: string,
            refreshToken: string,
            profile: Profile,
            verified: VerifyCallback,
        ) => {
            // Securely store user profile in your DB
            // User.findOrCreate(..., function(err, user) {
            //  done(err, user);
            // });

            verified(null, profile);
        },
    )
);

export default app;
