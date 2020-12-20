import axios from 'axios';

export const openApi = axios.create({
    baseURL: ' https://api.streamelements.com/kappa/v2/',
});

export const api = {};
