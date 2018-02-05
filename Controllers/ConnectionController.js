var UserListController = require('./UserListController');
var SocketsHelper = require('../helpers/SocketsHelper');
var UserConstructor = require('../models/User');
var UserListHelper = require('../helpers/UserListHelpers');
var _io;
function _connectionHandler(socket) {
    console.log(socket.handshake.address);
    socket.on('userNameSet', function (u) {
        UserListController.AddUser(u);
    });
    UserListController.AddUser(new UserConstructor('deneme', socket));

}
var ConnectionController = (function () {
    UserListController.onUsersChanged = function (userlist) {
        SocketsHelper.emitToAll('userListChanged',
            UserListHelper.getAllUsernames(),
            UserListHelper.getAllSockets());
    };
    
    return {
        Connect: _connectionHandler
    }
}());
module.exports = ConnectionController;