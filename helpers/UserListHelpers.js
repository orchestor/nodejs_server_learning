var UserList = require('../models/UserList').Users;
var TOOLS = {
    checkUsername : function (name)
    {
        var result = false;




        //FOR DEBUG ONLY
        //TODO: check if name is in userList
        result = true;
        return result;
    },
    getAllUsernames : function()
    {
        var res = [];
        for(var i = 0; i< UserList.length;i++){
                res.push(UserList[i].username);
        }
        return res;
    },
    getAllSockets : function()
    {
        var res = [];
        for(var i = 0; i< UserList.length;i++){
                res.push(UserList[i].socket);
        }
        return res;
    }
}

module.exports = TOOLS;


