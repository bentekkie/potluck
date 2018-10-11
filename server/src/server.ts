import * as express from 'express';
import * as errorHandler from 'errorhandler';
import * as http from 'http';
import * as path from "path";
import { ApiRouter } from './api/router';

class Server {
    private app = express();
    constructor(){
        this.app.set('port', process.env.PORT || 3000);
        const env = process.env.NODE_ENV || 'development';
        if ('development' === env) {
            console.log('Running in development mode');
            this.app.use(errorHandler());
        }
        this.app.use(express.static(path.join('..', 'client', 'build')));
        this.app.use('/api',ApiRouter)
        this.app.get('*', function(req, res) {
            res.sendFile(path.resolve('..', 'client', 'build','index.html'));
        });
        let server = http.createServer(this.app);
        server.listen(this.app.get('port'), () => {
            console.log('Express server listening on port ' + this.app.get('port'));
        });
    }

}

new Server();