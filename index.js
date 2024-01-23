var express = require('express')
var socket = require('socket.io')
    // App setup
var app = express()
    // browser gone listen to perticular port number
var server = app.listen(4000, () => {
    console.log("Listen");
})

// static render template
app.use(express.static('public'))

// Socket setup
var io = socket(server) //socket was just inilize to server to that perticular port
io.on('connection', (socket) => {
    console.log("Make socket connection", socket.id); // every time we refresh socket id will be change

    // here server will send message( that sent by sender client)
    // to the other receiver client
    socket.on('chat', (data) => {
        io.sockets.emit('chat', data) // emit message to other client
    })

    socket.on('typing', (data) => {
        // broadcast message to all except own user
        socket.broadcast.emit('typing', data)
    })
})