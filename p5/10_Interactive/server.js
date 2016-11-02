
// // Starts a node express server
// var express = require('express');
//
// var app = express();
// var server = app.listen(3000);
//
// app.use(express.static('public'));
//
// console.log("Your node server is running");
//
// //-------------------------------------------------------------------------------------------------
//
// // Creates a socket that's a part of this server
//
// var socket = require('socket.io');
//
// var io = socket(server);
//
// // Sets up a connection event
// io.sockets.on('connection', newConnection);
//
// function newConnection(socket) {
//     console.log('new connection: ' + socket.id);
//
//     socket.on('mouse', mouseMsg);
//
//     function mouseMsg(data) {
//         console.log(data);
//         socket.broadcast.emit('mouse', data);
//         // io.sockets.emit('mouse', data);
//     }
// }




// HEROKU TUTORIAL

var http = require('http');

var server = http.createServer( function (req, res) {
    res.writeHead(200, {'Content-Type': 'text'});
    res.end('<h1>Hello World</h1>');
});

var port = Number(process.env.PORT || 3000);

server.listen(port);