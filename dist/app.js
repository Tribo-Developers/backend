"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Define our dependencies
var express_1 = __importDefault(require("express"));
var express_session_1 = __importDefault(require("express-session"));
var passport_1 = __importDefault(require("passport"));
var passport_oauth2_1 = __importDefault(require("passport-oauth2"));
var routes_1 = __importDefault(require("./routes"));
// Define our constants, you will change these with your own
var TWITCH_CLIENT_ID = 'i4ryy5pob5jjyywmvff84n0ay4fmv7';
var TWITCH_SECRET = 'c16f7pcowyvqwwvt094kpu2wmouisz';
var SESSION_SECRET = 'tribo';
var CALLBACK_URL = 'tribogaules://'; // You can run locally with - http://localhost:3333/auth/twitch/callback
var app = express_1.default();
app.use(express_1.default.json());
app.use(routes_1.default);
app.use(express_session_1.default({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}));
// app.use(express.static('public'));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
// Override passport profile function to get user profile from Twitch API
passport_oauth2_1.default.prototype.userProfile = function (accessToken, done) {
    var options = {
        url: 'https://api.twitch.tv/helix/users',
        method: 'GET',
        headers: {
            'Client-ID': TWITCH_CLIENT_ID,
            Accept: 'application/vnd.twitchtv.v5+json',
            Authorization: "Bearer " + accessToken,
        },
    };
    fetch('https://api.twitch.tv/helix/users', options)
        .then(function (response) { return response.json(); })
        .then(function (data) {
        done(null, JSON.parse(data));
    });
};
passport_1.default.serializeUser(function (user, done) {
    done(null, user);
});
passport_1.default.deserializeUser(function (user, done) {
    done(null, user);
});
passport_1.default.use('twitch', new passport_oauth2_1.default({
    authorizationURL: 'https://id.twitch.tv/oauth2/authorize',
    tokenURL: 'https://id.twitch.tv/oauth2/token',
    clientID: TWITCH_CLIENT_ID,
    clientSecret: TWITCH_SECRET,
    callbackURL: CALLBACK_URL,
    state: true,
}, function (accessToken, refreshToken, profile, verified) {
    // eslint-disable-next-line no-param-reassign
    profile.accessToken = accessToken;
    // eslint-disable-next-line no-param-reassign
    profile.refreshToken = refreshToken;
    // Securely store user profile in your DB
    // User.findOrCreate(..., function(err, user) {
    //  done(err, user);
    // });
    verified(null, profile);
}));
// Set route to start OAuth link, this is where you define scopes to request
app.get('/auth/twitch', passport_1.default.authenticate('twitch', { scope: 'user_read' }));
// Set route for OAuth redirect
app.get('/auth/twitch/callback', passport_1.default.authenticate('twitch', {
    successRedirect: '/',
    failureRedirect: '/',
}));
exports.default = app;
