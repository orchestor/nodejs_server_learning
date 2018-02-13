var ChatCore = Object.create(CoreView);
ChatCore.SenderUsername = function _setUserName(username){
    var childs = this.cElement.childNodes;
    for(var i = 0; i < childs.length; i++){
        if(childs[i].getAttribute('data') && childs[i].getAttribute('data') === 'user')
            childs[i].innerText = username;
    }
}
ChatCore.SenderMessage = function _setMessage(username){
    var childs = this.cElement.childNodes;
    for(var i = 0; i < childs.length; i++){
        if(childs[i].getAttribute('data') && childs[i].getAttribute('data') === 'message')
            childs[i].innerText = username;
    }
}