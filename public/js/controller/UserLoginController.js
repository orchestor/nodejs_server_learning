var UserLoginController = {
    view: Object.create(UserLoginView)
}
UserLoginController.Remove = function _remove() {
    this.view.parent.removeChild(this.view.cElement);
}
UserLoginController.Show = function _show(parent) {
    var self = this;
    this.view.initialize(parent);
    this.view.display();
    this.view.$button = document.getElementById('userLoginButton');
    this.view.$input = document.getElementById('userLoginInput');
    this.view.$serverMessage = document.getElementById('loginServerMessage');
    function _loginHandler(result, data) {

        if (result) {
            self.Remove();
            ChatShellController.Show(document.body);
            ChatLogController.ShowAllActiveMessages(data.messages);

        } else {
            self.view.$serverMessage.innerText = data;
        }
    }
    this.view.$button.onclick = function _onLoginButonClicked (e) {
        if (self.view.$input.value && self.view.$input.value.length > 0) {
            ConnectionController.LoginWithUserName(self.view.$input.value, _loginHandler)
        }
    }
};

    ///INPUT'a onEnter koy


