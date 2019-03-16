var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var x = canvas.width/2;
var y = canvas.height - 30;
var dx = 2;
var dy = -2;
var ballRadius = 10;
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth)/2;
var rightPress = false;
var leftPress = false;

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

function keyDownHandler(e) {
	if(e.keyCode == 39) {
		rightPress = true;
	} 
	else if (e.keyCode == 37) {
		leftPress = true;
	}
}

function keyUpHandler(e) {
	if(e.keyCode == 39) {
		rightPress = false;
	} 
	else if (e.keyCode == 37) {
		leftPress = false;
	}
}

function drawBall() {
	ctx.beginPath();
	ctx.arc(x, y, ballRadius, 0, Math.PI*2);
	ctx.fillStyle = 'blue';
	ctx.fill();
	ctx.closePath();
}

function drawPaddle() {
	ctx.beginPath();
	ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
	ctx.fillStyle = "#0095DD";
	ctx.fill();
	ctx.closePath();
}

function draw() {
	ctx.clearRect(0,0, canvas.width, canvas.height);
	drawBall();
	drawPaddle();

	if(y + dy < ballRadius) {
		dy = -dy;
	} 
	else if (y + dy > canvas.height-ballRadius) {
		if (x > paddleX && x < paddleX + paddleWidth) {
			dy = -dy;
		} else {
			alert("GAME OVER!!!");
			window.location.reload();
		}
	}
	if(x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
		dx = -dx;
	}

	if (rightPress && paddleX < canvas.width - paddleWidth) {
		paddleX += 7;
	}
	else if(leftPress && paddleX > 0) {
		paddleX -= 7;
	}

	x += dx;
	y += dy;
}

setInterval(draw, 10);