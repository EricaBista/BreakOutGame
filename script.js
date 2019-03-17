var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var x = canvas.width/2;
var y = canvas.height - 30;
var dx = 5;
var dy = -5;
var ballRadius = 10;
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth)/2;
var rightPress = false;
var leftPress = false;
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeigth =  20;
var brickPadding = 10;
var brickOffsetLeft = 30;
var brickOffsetTop = 30;
var score = 0;
var lives = 3;
var level = 1;
var maxLevel = 5;
var paused = false;

var bricks = [];
initBricks();
function initBricks() {
	for(c=0; c<brickColumnCount; c++) {
		bricks[c] = [];
		for(r=0; r<brickRowCount; r++) {
			bricks[c][r] =  {x: 0, y: 0, status: 1}
		}
	}
}

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

function drawBricks() {
	for(c=0; c<brickColumnCount; c++) {
		for(r=0; r<brickRowCount; r++) {
			if (bricks[c][r].status == 1) {
				var brickX = (c*(brickWidth + brickPadding)) + brickOffsetLeft;
				var brickY = (r*(brickHeigth + brickPadding)) + brickOffsetTop;
				bricks[c][r].x = brickX;
				bricks[c][r].y = brickY;
				ctx.beginPath();
				ctx.rect(brickX, brickY, brickWidth, brickHeigth);
				ctx.fillStyle = '#0095DD';
				ctx.fill();
				ctx.closePath();
			}
		}
	}
}

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

function collisionDetection() {
	for(c=0; c<brickColumnCount; c++) {
		for(r=0; r<brickRowCount; r++) {
			var b = bricks[c][r];
			if (b.status == 1) {
				if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeigth ) {
					dy = -dy;
					b.status = 0;
					score++;
					if (score == brickRowCount*brickColumnCount) {
						if (level === maxLevel) {
							alert('YOU WIN, CONGRATULATION');
							document.location.reload();
						} else {
							level++;
							brickRowCount++;
							initBricks();
							score = 0;
							dx += 1;
							dy = -dy;
							dy -= 1;
							x = canvas.width/2;
							y = canvas.height - 30;
							paddleX = (canvas.width - paddleWidth)/2;
							paused = true;
							ctx.beginPath();
							ctx.rect(0, 0, canvas.width, canvas.height);
							ctx.fillStyle = '#0095DD';
							ctx.fill();
							ctx.font = '16px Arial';
							ctx.fillStyle = '#FFFFFF';
							ctx.fillText("Level " + (level - 1) + " completed, starting new level...", 110, 150);
							setTimeout(function() {
								paused = false;
								draw();
							}, 3000);
						}
					}
				}
			}
		}
	}
}

function drawScore() {
	ctx.font = "16px Arial";
	ctx.fillStyle = "#0095DD";
	ctx.fillText("Score: "+score, 8, 20);
}

function drawLives() {
	ctx.font = "16px Arial";
	ctx.fillStyle = "#0095DD";
	ctx.fillText("Lives: "+lives, canvas.width - 65, 20);
}

function drawLevel() {
	ctx.font = "16px Arial";
	ctx.fillStyle = "#0095DD";
	ctx.fillText("Level: "+level, 210, 20);
}

function draw() {
	ctx.clearRect(0,0, canvas.width, canvas.height);
	drawBricks();
	drawBall();
	drawPaddle();
	drawScore();
	drawLives();
	drawLevel();
	collisionDetection();

	if(y + dy < ballRadius) {
		dy = -dy;
	} 
	else if (y + dy > canvas.height-ballRadius) {
		if (x > paddleX && x < paddleX + paddleWidth) {
			dy = -dy;
		} else {
			lives--;
			if (!lives) {
				alert("GAME OVER!!!");
				document.location.reload();
			} else {
				x = canvas.width/2;
				y = canvas.height - 30;
				paddleX = (canvas.width - paddleWidth)/2;
			}
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
	if (!paused) {
		requestAnimationFrame(draw);
	}
}

document.addEventListener("mousemove", mouseMoveHandler);

function mouseMoveHandler(e) {
	var relativeX =e.clientX - canvas.offsetLeft;
	if(relativeX > 0+paddleWidth/2 && relativeX < canvas.width-paddleWidth/2) {
		paddleX = relativeX - paddleWidth/2;
	}
}

draw();
