ConnectionController.initialize();
window.onload = function _onBodyLoad(){
    var ULC = Object.create(UserLoginController);
    ULC.Show(document.body);
}
