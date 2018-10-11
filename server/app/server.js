"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const errorHandler = require("errorhandler");
const http = require("http");
const path = require("path");
class Server {
    constructor() {
        this.app = express();
        this.app.set('port', process.env.PORT || 3000);
        const env = process.env.NODE_ENV || 'development';
        if ('development' === env) {
            console.log('Running in development mode');
            this.app.use(errorHandler());
        }
        this.app.use(express.static(path.join('..', 'client', 'build')));
        this.app.get('*', function (req, res) {
            res.sendFile(path.resolve('..', 'client', 'build', 'index.html'));
        });
        let server = http.createServer(this.app);
        server.listen(this.app.get('port'), () => {
            console.log('Express server listening on port ' + this.app.get('port'));
        });
    }
}
new Server();
