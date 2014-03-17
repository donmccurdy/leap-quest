/**
 * Leap Quest - Site & Game Server
 * 
 * Author: Don McCurdy
 */

// Requirements
var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);

// Launch web server
server.listen(Number(process.env.PORT || 5000));

// Launch game server
require('./server/start')(server);

// Configuration and routes
require('./config')(app);
require('./routes')(app);
