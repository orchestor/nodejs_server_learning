var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var path = require("path");
app.use(express.static(path.join(__dirname, "public")));

users = [];
writingUsers = [];
io.on("connection", function (socket) {
  console.log("A user connected from " + socket.handshake.address);
  socket.on("setUsername", function (u) {
    if (checkAdress(socket.handshake.address)) {
      socket.emit(
        "serverMessage",
        "you already have a connection and a username! : " +
        getUserNameFromIP(socket.handshake.address)
      );
    } else if (/\S/.test(u)) {
      if (checkUserName(u)) {
        socket.emit("serverMessage", u + " username is taken! Try some other username.");
      } else {
        console.log("new user name '" + u + "' from '" + socket.handshake.address + "'");

        users.push({
          socket: socket,
          address: socket.handshake.address,
          name: u
        });

        io.sockets.emit("userConnected", u);
        socket.emit("userSet", { username: u });
      }
    } else {
      socket.emit("serverMessage", "Your username can't be empty or whitespace");
    }
  });
  socket.on("msg", function (data) {
    //Send message to everyone
    // console.log(checkAdress(socket.handshake.address));
    // console.log(data);
    // console.log(checkUserName(data.user));
    // console.log(getUserSocketFromIP(socket.handshake.address) === socket);
    if (checkAdress(socket.handshake.address) && checkUserName(data.user) && getUserSocketFromIP(socket.handshake.address) === socket) {
      data.message = data.message.replace(/</g, "&lt;").replace(/>/g, "&gt;");
      if (~(data.message.indexOf('@'))) {
        var words = data.message.split(/\s+/);
        for (var i = 0; i < words.length; i++) {
          if (words[i].indexOf('@') === 0) {
            var s = words[i].substr(1);
            if (checkUserName(s) /* && s !== data.user*/) {//fix : check username if it is senders name
              var mentionee = getUserFromUserName(s);
              //console.log(mentionee[0]);
              if (mentionee.name === s)
                io.sockets.connected[mentionee.socket.id].emit('mention', data);
              //user[0].socket.emit('mention', data);
            }
          }
        }
      }
      io.sockets.emit("newmsg", data);
    } else {
      socket.emit("warning", "you are not connected");
    }
  });
  socket.on("disconnect", function (data) {
    //console.log(users);
    if (
      checkAdress(socket.handshake.address) &&
      getUserSocketFromIP(socket.handshake.address) === socket
    ) {
      sendWriterDone(getUserNameFromIP(socket.handshake.address));
      console.log("'" + getUserNameFromIP(socket.handshake.address) + "' has left");
      io.sockets.emit(
        "userDisconnect",
        getUserNameFromIP(socket.handshake.address)
      );
      io.sockets.emit(
        "someUserDoneWriting",
        getUserNameFromIP(socket.handshake.address)
      );
      //console.log(users + " to : ");
      users = users.filter(val => val.address != socket.handshake.address);
      //console.log(users);
    } else console.log(socket.handshake.address + " has left");
  });
  socket.on("Writing", function (user) {
    if (!checkUserName(user)) {
      return;
    }
    var checkIfUserisAlreadyWriting = writingUsers.filter(u => u.name === user);
    if (checkIfUserisAlreadyWriting.length === 0) {
      writingUsers.push({ name: user });
      io.sockets.emit("usersOnWriting", writingUsers);
    }
  });
  socket.on("DoneWriting", function (user) { sendWriterDone(user) });

  function sendWriterDone(user) {
    var checkIfUserisAlreadyWriting = writingUsers.filter(u => u.name === user);
    if (checkIfUserisAlreadyWriting.length === 1) {
      removeUserFromWriterList(user);
      io.sockets.emit("usersOnWriting", writingUsers);
    }
  }
  function removeUserFromWriterList(username) {
    writingUsers = writingUsers.filter(u => u.name != username);
  }
});

http.listen(9696, function () {
  console.log(
    "localhost:" + "9696" + " -> Server is active"
  );
});
function checkAdress(userAdress) {
  var result = false;
  users.map(item => {
    if (item.address === userAdress) {
      result = true;
    }
  });
  return result;
}
function getIPFromUserName(userName) {
  users.map((item) => {
    if (item.name === userName) {
      return item.address;
    }
  });
}
function getUserSocketFromIP(userAdress) {
  var result = false;
  users.map(item => {
    if (item.address === userAdress) {
      result = item.socket;
    }
  });
  return result;
}
function getUserNameFromIP(userAdress) {
  var result = false;
  users.map(item => {
    if (item.address === userAdress) {
      result = item.name;
    }
  });
  return result;
}
function checkUserName(name) {
  var result = false;
  users.map(item => {
    if (item.name === name) {
      result = true;
    }
  });
  return result;
}
function getUserFromUserName(name) {
  var foundOne_BOOL = false;
  var result;
  for (var i = 0; i < users.length; i++) {
    if (users[i].name === name) {
      if (!foundOne_BOOL) {
        foundOne_BOOL = true;
        result = users[i];
      } else throw Error;
    }
  }
  return result;
}
function getUserFromIP(address) {
  if (checkAdress(address)) {
    return users.map((item) => {
      if (item.address === address) {
        return item;
      }
    });
  }
}