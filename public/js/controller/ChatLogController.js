var ChatLogController = {
    view: Object.create(ChatLogView)
}
ChatLogController.Show = function _show(parent) {
    var self = this;
    this.view.initialize(parent);
    this.view.display(true);
}
ChatLogController.ShowAllActiveMessages = function _showmessages(messages) {
   console.log("_showmessages");
    for (var i = 0; i < messages.length; i++) {
        
        console.log(messages[i]);
    }
}