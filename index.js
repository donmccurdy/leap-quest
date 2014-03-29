/**
 * Leap Quest - Site & Game Server
 * 
 * Author: Don McCurdy
 */

// Express
var app = require('express')();
var server = require('http').createServer(app);
var settings = require('./settings');

// Launch web server
server.listen(process.env.PORT || settings.port);

// Launch game server
require('./server/start')(server);

// Configuration and routes
require('./config')(app);
require('./routes')(app);
