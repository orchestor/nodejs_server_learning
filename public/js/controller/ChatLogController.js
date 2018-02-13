var ChatLogController = {
    /**IDEA:1  Add Chat Logs as Model */
    model : {},
    view: Object.create(ChatLogView)
}
ChatLogController.Show = function _show(parent) {
    var self = this;
    this.view.initialize(parent);
    this.view.display(true);
}
ChatLogController.ShowAllActiveMessages = function _showmessages(messages) {
    /**IDEA:1
     * Change only different ones
     * - Check if first in messages equal to first in view 
     *      >if not equal   : remove one from view and check again
     *      >if equal       : check last in messages equal to last in view
     *                          >if not equal   : add message to top of array and check lasts again
     *                          >if equal       : add messages in array to bottom of view
     */
    //console.log("3_showmessages + " + messages);
    this.view.cElement.innerHTML = '';
    for (var i = 0; i < messages.length; i++) {
        //console.log(messages[i]);
        //console.log(messages[i].sender+ " : " + messages[i].message);
        //console.log(ChatController);
        ChatController.AddChatLog(this.view.cElement, messages[i]);
    }
}