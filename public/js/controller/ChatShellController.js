var ChatShellController = {
    view : Object.create(ChatShellView)
}
ChatShellController.Show = function _chatShellShow(parent){
    var self = this;

    this.view.initialize(parent);
    this.view.cElement.innerHTML = '';
    this.view.display();
    ChatInputViewController.Show(this.view.cElement);  
    ChatLogController.Show(this.view.cElement);
}