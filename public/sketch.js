var socket;

function setup() {
	createCanvas(400,400);
	fill(255);
	stroke(255);
	background(24);
	strokeWeight(10);

	socket = io.connect(window.location.href);
	socket.on('recap',recapHandler);
	socket.on('mouse',(data) => line(data.x1,data.y1,data.x2,data.y2))
}

function recapHandler(data) {
	for (const element of data) {
		line(element.x1,element.y1,element.x2,element.y2)
	}
}

function draw() {
	strokeWeight(0);
	fill(255,0,0)
	
	fill(255)
	strokeWeight(10);
}

function mouseDragged() 
{ 
	strokeWeight(10);
	line(mouseX, mouseY, pmouseX, pmouseY);

	var data = {
		x1: mouseX,
		y1: mouseY,
		x2: pmouseX,
		y2: pmouseY
	}
	
	socket.emit('mouse', data)
}

function mousePressed() {
	mouseDragged();
}
