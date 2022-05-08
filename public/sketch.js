var socket;
var c;

var x = 0;
var y = 0;

function setup() {
	createCanvas(windowWidth,windowHeight);
	fill(255);
	stroke(255);
	background(24);
	strokeWeight(10);

	c = '#'+Math.floor(Math.random()*16777215).toString(16);

	socket = io.connect(window.location.href);

	socket.on('recap',(data) => {
		background(24);
		for (const e of data) {
			try {stroke(e.c)}
			catch {}
			line(e.x1+x,e.y1+y,e.x2+x,e.y2+y)
		}
	});

	socket.on('draw',(data) => {
		stroke(data.c)
		line(data.x1+x,data.y1+y,data.x2+x,data.y2+y)
	});
}

function draw() {
	strokeWeight(0);
	fill(255)
	
	textSize(32);
	text('DrawJS', 8, 32);

	fill(255)
	strokeWeight(10);
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
	socket.emit('recap')
}

function mouseDragged(event) 
{ 
	if (mouseButton == LEFT) {
		strokeWeight(10);
		stroke(c)
		var data = {
			x1: mouseX-x,
			y1: mouseY-y,
			x2: pmouseX-x,
			y2: pmouseY-y,
			c: c
		}
		
		socket.emit('draw', data)
	} else {
		x += (mouseX - pmouseX);
		y += (mouseY - pmouseY);
		socket.emit('recap')
	}
}

function mousePressed() {
	mouseDragged();
}
