var ConnectionController = {
    connectionUser: '',
    socket: undefined
}
ConnectionController.initialize = function _initialize() {
    this.socket = io();
    this.socket.on('userListChanged', _onUserConnected)
    this.socket.on('chatLogChanged', _onChatLogChanged)
    function _onUserConnected(userList) {
        //TODO:
        //Tüm Activ user'ları göster
    }
    function _onChatLogChanged(data) {
        //console.log("_onChatLogChanged");
        //console.log(data);
        ChatLogController.ShowAllActiveMessages(data);
    }
}
ConnectionController.LoginWithUserName = function _loginwithusername(username, cb) {
    var self = this;
    this.socket.emit('userNameSet', username);
    this.socket.on('connectionFailed', _onConnectionFailed)
    this.socket.on('connectionSuccess', _onConnectionSuccess);
    function _onConnectionFailed(data) {
        cb(false, data);
    }
    //IDEA:
    //DATA OLARAK KULLANICI ADINI VE CHATLOGLARI AL?
    function _onConnectionSuccess(data) {
        //console.log("0_onConnectionSuccess " + data);
        cb(true, data);
        self.connectionUser = data.name;
    }
}

ConnectionController.SendMessage = function _sendMessageToAll(message, cb){
    //console.log("ConnectionController_sendMessageToAll")
    var self = this;
    //console.log('ConnectionController_sendMessageToAll : ' + message);
    this.socket.emit('newMsg',{sender:ConnectionController.connectionUser, message:message});
    this.socket.on('msgSendSuccess',
    function(data){
        cb(true);
    });
    this.socket.on('msgSendFailed',function(data){cb(false,data)});
}