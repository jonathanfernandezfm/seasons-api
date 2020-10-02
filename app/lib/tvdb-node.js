/*
    tvdb-node

    Library for connecting to TheTVDB API
*/

const url = require('url');
const fetch = require("node-fetch");

const BASE_URL = 'https://api.thetvdb.com';
const API_VERSION = 'V3.0.0';
const AV_HEADER = `application/vnd.thetvdb.${API_VERSION}`;
const API_KEY = 'c60336c8cf1830a45a71d020b1a7a181';
const DEFAULT_LANG = 'en'

class Client {
    constructor() {
        let token = null;

        this.getToken = function() {
            if(!token) {
                token = logIn();
            }

            return token;
        }
    }

    getSeriesById(seriesId, opts) {
        return this.sendRequest(`series/${seriesId}`, opts);
    }

    searchSeriesByName(name, opts){
        const query = { name: name };
        const options = Object.assign({}, opts, { query: query });
        return this.sendRequest(`search/series`, options);
    }

    sendRequest(path, opts) {
        const options = Object.assign({}, opts);
        const query = Object.assign({}, options.query);
        const headers = Object.assign({
            'Accept': AV_HEADER,
            'Accept-language': options.lang || DEFAULT_LANG
        }, options.headers);
    
        const requestURL = BASE_URL + '/' + url.format({
            pathname: path,
            query: query
        });

        return this.getToken()
            .then(token => {    
                headers['Authorization'] = `Bearer ${token}`;
                return fetch(requestURL, {headers: headers})
            })
            .then(res => checkHttpError(res))
            .then(res => checkJsonError(res))
            .then(json => json.data)
    }
}

function checkHttpError(res) {
    const contentType = res.headers.get('content-type') || '';

    if (res.status && res.status >= 400 && !contentType.includes('application/json')) {
        let err = new Error(res.statusText);
        err.url = res.url;
        err.code = res.status;
        err.message = res.statusText;

        return Promise.reject(err);
    }
    return Promise.resolve(res);
}

function checkJsonError(res) {
    return res.json().then((json) => {
        if (json.Error) {
            let err = new Error();
            err.url = res.url;
            err.status = res.status;
            err.message = res.statusText;

            return Promise.reject(err);
        }
        return Promise.resolve(json);
    });
}

function logIn() {
    const opts = {
        method: 'POST',
        body: JSON.stringify({apikey: API_KEY}),
        headers: {
            'Accept': AV_HEADER,
            'Content-Type': 'application/json'
        }
    };


    return fetch(`${BASE_URL}/login`, opts)
        .then(res => checkHttpError(res))
        .then(res => checkJsonError(res))
        .then(json => json.token);
}

module.exports = Client;