var UserList = require('../models/UserList');
var UserListTools = require('../helpers/UserListHelpers');
var EventHandler = require('../helpers/EventHandler');

var _onUsersChanged = Object.create(EventHandler);
function _addNewUser(UserModel) {
    if (UserListTools.checkUsername(UserModel.Username)) {
        UserList.Add(UserModel);
        _onUsersChanged.trigger(UserList.Users);
        return true;
    }else {
        return false;
    }
}
function _removeUser(UserModel) {
    if (UserListTools.checkUsername( UserModel.Username)) {
        UserList.Remove(UserModel);
        _onUsersChanged.trigger(UserList.Users);
        return true;
    }else {
        return false;
    };
}
var UserListController = (function () {
    return {
        AddUser: _addNewUser,
        RemoveUser : _removeUser,
        set onUsersChanged(callback) {
            _onUsersChanged.push(callback);
        }
    }
}());

module.exports = UserListController;