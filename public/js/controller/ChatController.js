var ChatController = {}
ChatController.AddChatLog = function chatcontroller_display(parent, data) {
    // console.log("chatcontroller_display1");
    
    var log;
    //todo check user
    if (/*isUser*/ false) {
        //TODO:
        // log = Object.create(UserChatLogView);
    } else {
        log = Object.create(StrangerChatLogView);
    }
    //console.log("chatcontroller_display2");
    log.initialize(parent);
    //console.log("chatcontroller_display3");
    
    log.SenderUsername("name : " + data.sender);
    //console.log("chatcontroller_display4");
    
    log.SenderMessage("message : " + data.message);
    // console.log("chatcontroller_display5");
    
    log.display();
}
