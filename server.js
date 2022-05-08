console.log("Starting Node.js server...")

// Initializing Express webserver
var express = require('express')
var app = express()
var server = app.listen(80)

app.use(express.static('public'))

console.log("Express webserver started.")

// Initializing drawing socket server
var socket = require('socket.io')
var io = socket(server)

io.sockets.on('connection', newConnection)

var recap = Array()
function newConnection(socket) {
	console.log(socket.id)
	
	socket.on('mouse', mouseMsg)
	
	// Emit the recap data
	socket.emit('recap',recap);

	function mouseMsg(data) {
		socket.broadcast.emit('mouse',data)
		recap.push(data)
	}
}
