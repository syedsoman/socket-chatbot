var socket = io.connect('http://localhost:4000/');

var message = document.getElementById("message");
var handle = document.getElementById("handle");
var btn = document.getElementById("send");
var output = document.getElementById("output");
var feedback = document.getElementById("feedback");


btn.addEventListener('click', () => {
    console.log("Button is clicked");
    // 2 parameter ->  1. name of chat (its same as topic in MQTT) 2. message 
    // we were emmiting chat message and send message to server 
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    })
})

// who is typing 
message.addEventListener('keypress', () => {
    socket.emit('typing', handle.value)
})

socket.on('chat', (data) => {
    output.innerHTML += '<p><strong>' + data.handle + ':</strong>' + data.message + '</p>'
})

socket.on('typing', (data) => {
    feedback.innerHTML = '<p><em><strong>' + data + ': </strong></em> is typing .... </p>'
})