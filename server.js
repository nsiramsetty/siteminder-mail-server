let express = require('express');

let indexRouter = require('./routes/index');

let app = express();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", req.get('origin')); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/', indexRouter);

let http = require('http');

/**
 * Get port from environment and store in Express.
 */

let port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */

let server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error('Port  : ' + port + ' requires elevated privileges.');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error('Port  : ' + port + ' is already in use.');
            process.exit(1);
            break;
        default:
            console.log(error.toString());
            process.exit(1);
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    let addr = server.address();
    let bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    console.log('Listening on ' + bind);
}