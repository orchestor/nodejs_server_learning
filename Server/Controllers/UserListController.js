var User = require('../models/User');
var UserList = require('../models/UserList');
var UserListTools = require('../helpers/UserListTools');
var EventHandler = require('../helpers/EventHandler');

var _onUsersChanged = Object.create(EventHandler);
function _addNewUser(UserModel) {
    //console.log("_addNewUser1" + UserModel.username);
    if (UserModel instanceof User) {
        //  console.log("_addNewUser2");
        if (UserListTools.checkUsername(UserModel.username)) {
            //    console.log("_addNewUser3");
            UserList.Add(UserModel);
            //  console.log("_addNewUser4");
            _onUsersChanged.trigger(UserListTools.getAllUsernames());
            // console.log("_addNewUser5 " +  UserListTools.getAllUsernames());
            return true;
        } else {
            return false;
        }
    }
}
function _removeUser(UserModel) {
    if (UserModel instanceof User)
        //console.log('ULC_removeUser1 ' + UserModel.username );
    if (!UserListTools.checkUsername(UserModel.username)) {
        //console.log('ULC_removeUser2')
        UserList.Remove(UserModel);
        //console.log('ULC_removeUser3' +  UserListTools.getAllUsernames())
        _onUsersChanged.trigger(UserListTools.getAllUsernames());
        //console.log('ULC_removeUser4' + UserListTools.getAllUsernames());
        return true;
    } else {
        return false;
    };
}
function addEventonUsersChanged(callback) {
    //if (callback == 'function') { //function'mı diye kontrol etmek iyi olucaktır
    _onUsersChanged.push(callback);
    //}
}
var UserListController = {
    AddUser: _addNewUser,
    RemoveUser: _removeUser,
    onUsersChanged: addEventonUsersChanged
};

module.exports = UserListController;