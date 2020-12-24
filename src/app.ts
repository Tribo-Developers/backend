// Define our dependencies
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import session from 'express-session';
import passport from 'passport';
import OAuth2Strategy, { VerifyCallback } from 'passport-oauth2';

import dotenv from 'dotenv';
import routes from './routes';
import Profile from './models/profile';
import AppError from './errors/AppError';

const app = express();

// process.env config
dotenv.config();

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
    ),
);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            status: 'Error',
            message: err.message,
        });
    }
    console.log(err.message);
    return response.status(500).json({
        status: 'Error',
        message: 'Internal server error',
    });
});

export default app;
