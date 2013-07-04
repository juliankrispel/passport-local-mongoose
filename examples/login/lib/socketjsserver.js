var express = require('express');
var sockjs  = require('sockjs');
var http    = require('http');

var SocketJsServer = function(expressServer){
    var sockjs_echo = sockjs.createServer();
    sockjs_echo.on('connection', function(conn) {
        conn.on('data', function(message) {
            conn.write(message);
        });
    });

    sockjs_echo.installHandlers(expressServer, {prefix:'/echo'});
}

module.exports = SocketJsServer;
