///DATA MODELS
var User = require('../models/User');
var ChatLog = require('../models/ChatLog');
var Chat = require('../models/Chat');

///CONTROLLERS
var UserListController = require('./UserListController');

//TOOLS
var SocketsHelper = require('../helpers/SocketsHelper');
var UserListHelper = require('../helpers/UserListTools');

//TODO: Remove old chat logs after some time

function _connectionHandler(socket) {
    //////// HANDLERS /////////////////
    /*This section dedicated for handling signals
    */

    //TODO: check if username is safe
    function userLoginHandler(username) {//
        /*Try to add Username to list
        */
        if (!UserListController.AddUser(new User(username, socket))) {
            socket.emit('connectionFailed', 'Connection Failed; Username is already in use. Or you already have a user logged in in this computer');
        } else {
            socket.emit('connectionSuccess', {name:username, messages:ChatLog.Log});
        }
    }
    //TODO: check if message is safe
    function msgHandler(data) {
        /** Try to add chat log to log list */
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
    /*This Section is dedicated for listening and directing signals from client */
    socket.on('userNameSet', userLoginHandler);
    socket.on('newMsg', msgHandler);
    socket.on('disconnect', disconnectionHandler);
    ////////////-------------------------///////////////////////////  
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