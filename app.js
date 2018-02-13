var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var path = require("path");
app.use(express.static(path.join(__dirname, "public")));
//
var ConnectionController = require('./Server/Controllers/ConnectionController');

io.on('connection',
    function (socket) {
        ConnectionController.IO = io;
        ConnectionController.Connect(socket);
    }
);
var port = process.env.PORT || 5000
http.listen(port,
    function writeToConsole() {
        console.clear();
        console.log('started at : ' + port)
    }
);