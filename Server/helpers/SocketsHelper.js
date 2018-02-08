function _emitToAll(signal, signalData, recievers) {
    //console.log(recievers[0]);
    for (var i = 0; i < recievers.length; i++) {
        recievers[i].emit(signal, signalData);
    }
}

var SocketsHelper = {
    emitToAll: _emitToAll
}

module.exports = SocketsHelper;
