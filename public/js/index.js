ConnectionController.initialize();
document.body.onload = function _onBodyLoad(){
    var ULC = Object.create(UserLoginController);
    ULC.Show(document.body);
}
