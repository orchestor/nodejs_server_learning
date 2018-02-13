var ChatInputViewController = {
    view: Object.create(ChatInputView)
}
ChatInputViewController.Show = function _show(parent) {
    var self = this;
    this.view.initialize(parent);
    this.view.display();
    this.view.$button = document.getElementById('chatButton');
    this.view.$input = document.getElementById('chatInput');
    function _onchatsendresponsehandler(boolResponse, message ='')
    {
        if(!boolResponse)
        {
            alert(message);
        }
    }
    this.view.$button.onclick = function _onChatSend(){
        //console.log("_onchatsend");
        //console.log(self.view.$input.value)
        ConnectionController.SendMessage(self.view.$input.value, _onchatsendresponsehandler);
    };
}
ChatInputViewController.Remove = function _remove() {
    this.view.remove();
}