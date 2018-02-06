var TOOLS = {
    checkUsername: function (name) {
        var result = true;
        require('../models/UserList').Users.map(
            (user) => {
                if (user.username === name) {
                    result = false;
                }
            });
        return result;
    },
    getAllUsernames: function () {
        var res = [];
        for (var i = 0; i < require('../models/UserList').Users.length; i++) {
            res.push(require('../models/UserList').Users[i].username);
        }
        return res;
    },
    getAllSockets: function () {
        var res = [];
        for (var i = 0; i < require('../models/UserList').Users.length; i++) {
            res.push(require('../models/UserList').Users[i].socket);
        }
        return res;
    },
    getUserFromSocket : function(socket){
        var res = {};
        require('../models/UserList').Users.map(user => {if(user.socket === socket)res = user});
        return res;
    }
}

module.exports = TOOLS;


