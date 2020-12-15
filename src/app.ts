// Define our dependencies
import express from 'express';
import session from 'express-session';
import passport from 'passport';
import OAuth2Strategy, { VerifyCallback } from 'passport-oauth2';

import routes from './routes';
import Profile from './Domain/profile';

// Define our constants, you will change these with your own
const TWITCH_CLIENT_ID = 'i4ryy5pob5jjyywmvff84n0ay4fmv7'; //! change it for: process.env.TWITCH-CLIENT
const TWITCH_SECRET = 'c16f7pcowyvqwwvt094kpu2wmouisz'; //! change it for: process.env.TWITCH-SECRET
const SESSION_SECRET = 'tribo'; //! change it for: process.env.TWITCH_SESSION_SECRET
const CALLBACK_URL = 'tribogaules://'; //! change it for: process.env.TWITCH_CALLBACK_URL

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
            profile: Profile,
            verified: VerifyCallback,
        ) => {
            // Securely store user profile in your DB
            // User.findOrCreate(..., function(err, user) {
            //  done(err, user);
            // });

            verified(null, profile);
        },
    ),
);

export default app;
