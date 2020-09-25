var express = require('express');
var app = express();
app.set('view engine', 'pug')

var http = require('http').createServer(app);
var io = require('socket.io')(http);
var path = require('path');
var port = process.env.PORT || 80;

http.listen(port, () => {
    console.log('listening on *:%d', port);
});

// Routing
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
    res.render('index');
});

var numUsers = 0;
var onlineUsers = [];

io.on('connection', (socket) => {
    var addedUser = false;

    // when the client emits 'new message', this listens and executes
    socket.on('new message', (data) => {
        var firstWord, toSocketId, message;
        firstWord = data.split(" ")[0];
        if (firstWord.match(/\/to:.*/i) !== null) {
            toSocketId = firstWord.substr(4);
            message = data.substr(1 + firstWord.length);
            io.to(toSocketId).emit('new message', {username: socket.username, message: message, isPrivate: true});
        } else {
            socket.broadcast.emit('new message', {
                username: socket.username,
                message: data,
                isPrivate: false
            });
        }
    });

    // when the client emits 'add user', this listens and executes
    socket.on('add user', (username) => {
        if (addedUser) return;

        // we store the username in the socket session for this client
        socket.username = username;
        ++numUsers;
        onlineUsers.push({username: username, socketId: socket.id});
        addedUser = true;
        socket.emit('login', {
            numUsers: numUsers,
            onlineUsers: onlineUsers
        });
        // echo globally (all clients) that a person has connected
        socket.broadcast.emit('user joined', {
            username: socket.username,
            numUsers: numUsers,
            onlineUsers: onlineUsers
        });
    });

    // when the client emits 'typing', we broadcast it to others
    socket.on('typing', () => {
        socket.broadcast.emit('typing', {
            username: socket.username
        });
    });

    // when the client emits 'stop typing', we broadcast it to others
    socket.on('stop typing', () => {
        socket.broadcast.emit('stop typing', {
            username: socket.username
        });
    });

    // when the user disconnects.. perform this
    socket.on('disconnect', () => {
        if (addedUser) {
            --numUsers;
            onlineUsers = onlineUsers.filter(function (user) {
                return user.socketId !== socket.id;
            });

            // echo globally that this client has left
            socket.broadcast.emit('user left', {
                username: socket.username,
                numUsers: numUsers,
                onlineUsers: onlineUsers
            });
        }
    });
});
