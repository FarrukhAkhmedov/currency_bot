const axios = require("axios");

class HttpHandler {
    constructor(baseURL) {
        this.api = axios.create({ baseURL:baseURL });
    }
}

module.exports = HttpHandler;
