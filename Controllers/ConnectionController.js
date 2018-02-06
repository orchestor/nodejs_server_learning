var User = require('../models/User');
var ChatLog = require('../models/ChatLog');
var Chat = require('../models/Chat');

var UserListController = require('./UserListController');
var SocketsHelper = require('../helpers/SocketsHelper');
var UserListHelper = require('../helpers/UserListTools');


function _connectionHandler(socket) {
    //////// HANDLERS /////////////////
    function userLoginHandler(username) {//
        UserListController.AddUser(new User(username, socket));
    }
    function msgHandler(data) {
        ChatLog.Add(new Chat(data.sender, data.message));
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

    ///// TEST DATA //////////////
    console.log("New Connection @ : " + socket.handshake.address);
    UserListController.AddUser(new User('deneme', socket));
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
        //console.log(chatlog)
        SocketsHelper.emitToAll('chatLogChanged', ChatLog, UserListHelper.getAllSockets);

    });

    return {
        Connect: _connectionHandler
    }
}());
module.exports = ConnectionController;