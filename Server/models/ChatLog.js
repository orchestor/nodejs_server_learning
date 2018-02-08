var Chat = require('./Chat');
var EventHandler = require('../helpers/EventHandler');
var _chatlog = [];
var _onChatlogChanged = Object.create(EventHandler);
function _addChat(chat) {
    if (chat instanceof Chat) {
        _chatlog.push(chat);
        _onChatlogChanged.trigger(_chatlog);
        return true;
    }else return false;
}
function _addEventToEventHandler(callback) {
    _onChatlogChanged.push(callback);
}
var ChatLog = {
    Log: _chatlog,
    Add: _addChat,
    onChatlogChanged: _addEventToEventHandler
}
module.exports = ChatLog;