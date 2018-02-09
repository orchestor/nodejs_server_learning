var User = require('../models/User');
var ChatLog = require('../models/ChatLog');
var Chat = require('../models/Chat');

var UserListController = require('./UserListController');
var SocketsHelper = require('../helpers/SocketsHelper');
var UserListHelper = require('../helpers/UserListTools');


function _connectionHandler(socket) {
    //////// HANDLERS /////////////////
    function userLoginHandler(username) {//
        //console.log(username);
        // ///////------ DEBUG -------//////////
        // socket.emit('connectionFailed','This is a test message.');
        // return null;
        // ///////------------------///////////
        if (!UserListController.AddUser(new User(username, socket))) {
            console.log('connection failed');
            
            socket.emit('connectionFailed', 'Connection Failed; Username is already in use.');
        } else {
            socket.emit('connectionSuccess', username);
            // //////-------- DEBUG ---------///
            // //TEST:
            // ChatLog.Add(new Chat('chatter', 'Chat Chat Chat'));
            // /////////////---------------////////////
        }
    }
    function msgHandler(data) {
        //console.log('msgHandler ' + data.sender, data.message);
        if (!ChatLog.Add(new Chat(data.sender, data.message))) {
            socket.emit('msgSendFailed', '0X0001 Message send failed');
        } else socket.emit('msgSendSuccess');
    }
    function disconnectionHandler() {
        var disconnetedUser = UserListHelper.getUserFromSocket(socket);
        UserListController.RemoveUser(disconnetedUser);
    }
    //////////----------------------////////////////////////////

    /////// Signal Listening ///////////////
    socket.on('userNameSet', userLoginHandler);
    socket.on('newMsg', msgHandler);
    socket.on('disconnect', disconnectionHandler);
    ////////////-------------------------///////////////////////////  

    /// //TEST: //////////////
    //console.log("New Connection @ " + socket.handshake.address);
    // if (!UserListController.AddUser(new User('username', socket))) {
    //     console.log('connection failed');
    //     socket.emit('connectionFailed', 'Connection Failed');
    // }
    //UserListController.AddUser(new User('deneme2', socket));

    //ChatLog.Add(new Chat('chatter', 'Chat Chat Chat'));
    //////-------------------/////////////
}
var ConnectionController = (function () {
    UserListController.onUsersChanged(function userListChangedHandler(userlist) {

        SocketsHelper.emitToAll('userListChanged',
            userlist,
            UserListHelper.getAllSockets());
    });

    ChatLog.onChatlogChanged(function (chatlog) {
        //console.log("onChatlogChanged")
        SocketsHelper.emitToAll('chatLogChanged',
            chatlog,
            UserListHelper.getAllSockets());

    });

    return {
        Connect: _connectionHandler
    }
}());
module.exports = ConnectionController;