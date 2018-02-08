var ChatBoxController = {
    view: Object.create(ChatBoxView)
}
ChatBoxController.Show = function _show(parent) {
    var self = this;
    this.view.initialize(parent);
    this.view.display();
    this.view.$button = document.getElementById('chatButton');
    this.view.$input = document.getElementById('chatInput');
    ChatLogController.Show(this.view.cElement);
    
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
ChatBoxController.Remove = function _remove() {
    this.view.remove();
}

//ChatLogController'ı nasıl ChatBoxController içine koyucam? 
//ChatLogView'in parent'i ChatBoxController.view.cElement i olmalı
//Peki bunu ChatBoxShow'unda mı yapmalıyım yoksa dışarda mı ?