var MessageLog = Object.create(Component);
MessageLog.class = 'msg';
MessageLog.message = '';
MessageLog.sender = '';
MessageLog.avatar = '';
MessageLog.WriteMessage = function (data) {
    this.Render();
    var childNodes = this.cElement.childNodes;
    for (var i = 0; i < childNodes.length; i++) {
        switch (childNodes[i].getAttribute("data")) {
            case "userMessage":
                childNodes[i].innerText = data.message;
                break;
            case "userInfo":
                var gChilds = childNodes[i].childNodes;
                for(var j = 0; j < gChilds.length; j++)
                {
                    if(gChilds[j].getAttribute("data") === "userName") gChilds[j].innerText= data.user;
                    if(gChilds[j].getAttribute("data") === "userAvatar") gChilds[j].classList.add(Tools.getAvatarFromID(data.avatar));
                }
                break;
        }
    }
}

var UserMessageLog = Object.create(MessageLog);
UserMessageLog.init("msgUser");
var StrangerMessageLog = Object.create(MessageLog);
StrangerMessageLog.init("msgStranger");