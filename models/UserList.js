var UserList = (function () {
    var _users = [];
    function _addUser(UserModel){
        _users.push(UserModel);
    }
    function _removeUser(UserModel) {
        _users = _users.filter(x => x !== UserModel);
    }
    return {
        get Users(){
            return _users;
        },
        Add : _addUser,
        Remove : _removeUser
    }
})();

module.exports = UserList;