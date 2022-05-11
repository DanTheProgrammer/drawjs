console.log("Starting Node.js server...")

// Initializing Express webserver
var express = require('express')
var app = express()
var server = app.listen(80)

app.use(express.static('public'))

console.log("Express webserver started.");

// Initializing drawing socket server
var socket = require('socket.io')
var io = socket(server)

var fs = require('fs')

var recap = Array();
data = fs.readFile('canvas.json', (err, data) => {
	if (err) {
		return console.error('Error retrieving canvas file.')
	}
	recap = JSON.parse(data);
});

io.sockets.on('connection', (socket) => {
	console.log("New connection from: "+socket.handshake.address);
	
	socket.on('draw', (data) => {
		socket.broadcast.emit('draw',data)
		socket.emit('draw',data)
		recap.push(data)
		fs.writeFile('canvas.json',JSON.stringify(recap),() => {})
	});

	// 
	socket.on('chat', (data) => {
		if (data.msg == '/admin connected') {
			socket.emit('chat',{msg: io.sockets.clients().addres});
			return;
		}
		socket.emit('chat',data)
		socket.broadcast.emit('chat',data)
	});

	// Desc: Respond to recap requests.
	socket.on('recap', () => socket.emit('recap', recap));

	// Emit the recap data
	socket.emit('recap', recap);
})