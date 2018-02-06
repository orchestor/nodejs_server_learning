function User(username,socket) {
    this.username = username;
    this.socket = socket;
    this.address = socket.handshake.address;
}
module.exports = User;