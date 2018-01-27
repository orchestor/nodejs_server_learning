var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

users = [];
io.on('connection', function (socket) {
    console.log('A user connected from ' + socket.handshake.address);
    socket.on('setUsername', function (u) {
        if (checkAdress(socket.handshake.address)) {
            socket.emit('serverMessage', 'you already have a connection and a username! : ' + getUserNameFromIP(socket.handshake.address));
        } else if (!checkUserName(u)) {
            socket.emit('serverMessage', u + ' username is taken! Try some other username.');
        } else {
            console.log("new user name '" + u + "' from '" + socket.handshake.address + "'");
            users.push({ socket: socket, address: socket.handshake.address, name: u });
            io.sockets.emit('userConnected', u);
            socket.emit('userSet', { username: u });
        }
    });
    socket.on('msg', function (data) {
        //Send message to everyone
        if (checkAdress(socket.handshake.address) && checkUserName(socket.handshake.address) && getUserSocketFromIP(socket.handshake.address) === socket) {
            data.message = data.message.replace(/</g, "&lt;").replace(/>/g, "&gt;");
            io.sockets.emit('newmsg', data);
        }
        else {
            socket.emit('warning', "you are not connected");
        }
    });
    socket.on('disconnect', function (data) {
        //console.log(users);
        if (checkAdress(socket.handshake.address) && getUserSocketFromIP(socket.handshake.address) === socket) {
            console.log("'" + getUserNameFromIP(socket.handshake.address) + "' has left");
            io.sockets.emit('userDisconnect', getUserNameFromIP(socket.handshake.address));
            io.sockets.emit('someUserDoneWriting', getUserNameFromIP(socket.handshake.address));
            //console.log(users + " to : ");
            users = users.filter((val) => val.address != socket.handshake.address);
            //console.log(users);
        } else
            console.log(socket.handshake.address + " has left");
    });
    socket.on('Writing',function(user){
        io.sockets.emit('someUserWriting', user);
        //console.log(user + " is writing");
    });
    socket.on('DoneWriting', function(user){
        io.sockets.emit('someUserDoneWriting', user);
        //console.log(user + " done writing");
    });
});

http.listen(9696, function () {
    console.log('localhost:' + '9696' + ' -> Server is now listening at designated adress');
});
function checkAdress(userAdress) {
    var result = false;
    users.map(item => {
        if (item.address === userAdress) {
            result = true;
        }
    });
    return result;
    //return false; // DEBUG MODE
}
function getIPFromUserName(userName) {
    var result = false;
    users.map(item => {
        if (item.name === userName) {
            result = item.name;
        }
    });
    return result;
}
function getUserSocketFromIP(userAdress) {
    var result = false;
    users.map(item => {
        if (item.address === userAdress) {
            result = item.socket;
        }
    });
    return result;
}
function getUserNameFromIP(userAdress) {
    var result = false;
    users.map(item => {
        if (item.address === userAdress) {
            result = item.name;
        }
    });
    return result;
}
function checkUserName(name) {
    var x = users.map(item => {
        if (item.name === name) {
            return true;
        }
    });
    return x;
}