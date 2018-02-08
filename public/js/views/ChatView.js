var ChatView = Object.create(CoreView);
ChatView.SenderUsername = function _setUserName(username){
    var childs = this.cElement.childNodes;
    for(var i = 0; i < childs.length; i++){
        if(childs[i].getAttribute('data') && childs[i].getAttribute('data') === 'user')
            childs[i].innerText = username;
    }
}
ChatView.SenderMessage = function _setMessage(username){
    var childs = this.cElement.childNodes;
    for(var i = 0; i < childs.length; i++){
        if(childs[i].getAttribute('data') && childs[i].getAttribute('data') === 'message')
            childs[i].innerText = username;
    }
}