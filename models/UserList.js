


function _removeUser(UserModel) {
    //console.log('UserList_removeUser');
    //console.log("UL_1:"+_users);
    _users = _users.filter(x => x !== UserModel);
    //console.log("UL_2:"+_users);
}
var _users = [];
function _addUser(UserModel) {
    _users.push(UserModel);
}
var UserList = {
    get Users() {
        return _users;
    },
    Add: _addUser,
    Remove: _removeUser
};

module.exports = UserList;