var ConnectionController = {
    connectionUser: '',
    socket: undefined
}
ConnectionController.initialize = function _initialize() {
    this.socket = io();
    this.socket.on('userListChanged', _onUserConnected)
    this.socket.on('chatLogChanged', _onChatLogChanged)
    function _onUserConnected(userList) {

    }
    function _onChatLogChanged(data) {
        console.log(data);
        ChatLogController.ShowAllActiveMessages();
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
    function _onConnectionSuccess(data) {
        cb(true, data);
        self.connectionUser = data;
    }
}

ConnectionController.SendMessage = function _sendMessageToAll(message, cb){
    var self = this;
    this.socket.emit('newMsg',message);
    this.socket.on('msgSendSuccess',
    function(data){
        cb(true);
    });
    this.socket.on('msgSendFailed',function(data){cb(false,data)});
}