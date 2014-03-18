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
var settings = require('./settings');

// Launch web server
server.listen(process.env.PORT || settings.QUEST_PORT);

// Launch game server
require('./server/start')(server);

// Configuration and routes
require('./config')(app);
require('./routes')(app);
