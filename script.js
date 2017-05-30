var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext('2d');


var snakeLength = 20;
var snakeHeight = 20;
var snakeX = 0;
var snakeY = 0;
var changeX = 2;
var changeY = 2;
var upPressed = false;
var downPressed = false;
var leftPressed = false;
var rightPressed = false;
var lastPress = 0;
var ateFood = true;
var food_x_old = 0;
var food_y_old = 0;
var length = 4;
var bar1X = 150;
var bar1Y = 200;
var bar2X = 600;
var bar2Y = 200;
var barWidth = 50;
var barHeight = 200;
var score = 0;

var snake = [];
	
	for (var i = 0; i<5000; i++) {
	snake[i] = {x:i*5, y:5};
	}



function drawSnake () {
	for(var i = 0; i<length; i++) {
		ctx.beginPath();
		ctx.rect(snake[i].x, snake[i].y, snakeLength, snakeHeight);
		ctx.fillStyle = "green";
		ctx.fill();
		ctx.closePath();
	}
	
}


function bodySnake () {
	
	ctx.beginPath();
	ctx.rect(snakeX, snakeY, snakeLength, snakeHeight);
	ctx.fillStyle = "green";
	ctx.fill();
	ctx.closePath();
	
}



document.addEventListener("keydown", keyUpHandler);
document.addEventListener("keyup", keyDownHandler);


function keyUpHandler(e) {
	lastPress = e.keyCode;
	if (e.keyCode == 38) {
		upPressed = true;

	} else if (e.keyCode == 40) {
		downPressed = true;

	} else if (e.keyCode == 37) {
		leftPressed = true;

	} else if (e.keyCode == 39) {
		rightPressed = true;
	}

}

function keyDownHandler (e) {
	upPressed = false;
	downPressed = false;
	leftPressed = false;
	rightPressed = false;

}

function drawBarrier () {
	ctx.beginPath();
	ctx.rect(bar1X,bar1Y,barWidth,barHeight);
	ctx.fillStyle = "blue";
	ctx.fill();
	ctx.closePath();
	ctx.beginPath();
	ctx.rect(bar2X,bar2Y,barWidth,barHeight);
	ctx.fillStyle = "blue";
	ctx.fill();
	ctx.closePath();
}


function moveSnake () {
	console.log(lastPress);

	
		if (upPressed == true || lastPress == 38) {

			snake.unshift({x:snake[0].x,y:snake[0].y-snakeHeight})
	
		}else if (downPressed == true || lastPress == 40) {

			snake.unshift({x:snake[0].x,y:snake[0].y+snakeHeight})
			
		}else if (leftPressed == true || lastPress == 37) {

			snake.unshift({x:snake[0].x-snakeLength,y:snake[0].y})
		}else if (rightPressed == true || lastPress == 39) {

			snake.unshift({x:snake[0].x+snakeLength,y:snake[0].y})
		}

		ctx.beginPath();
		ctx.rect(snake[0].x, snake[0].y, snakeLength, snakeHeight);
		ctx.fillStyle = "green";
		ctx.fill();
		ctx.closePath();


}

function createFood (){
	
    if(ateFood == true) {
    	food = {
        x: Math.floor((Math.random() * canvas.width)),
    	y: Math.floor((Math.random() * canvas.height))
   		}

   		if (food.x  <= 0 || food.x + snakeLength >= canvas.width || food.y <= 0 || food.y + snakeHeight >= canvas.height) {
   			createFood();
   		}
   		if (food.x >= bar1X && food.x <= bar1X + barWidth && food.y >= bar1Y && food.y <= bar1Y + barHeight) {
   			createFood();
   		}
   		if (food.x >= bar2X && food.x <= bar2X + barWidth && food.y >= bar2Y && food.y <= bar2Y + barHeight) {
   			createFood();
   		}
   		food_x_old = food.x;
   		food_y_old = food.y;
    	drawFood (food.x, food.y);
    	ateFood = false;
    } else {
    	drawFood(food_x_old, food_y_old)
    }

}

function drawFood (foodX, foodY) {
	ctx.beginPath();
	ctx.rect(foodX, foodY, snakeLength, snakeHeight);
	ctx.fillStyle = "red";
	ctx.fill();
	ctx.closePath();
}

function ate () {
	if ((snake[0].x > food.x-10 && snake[0].x < food.x + snakeLength +10) && (snake[0].y > food.y-10 && snake[0].y < food.y + snakeHeight +10)) {
		ateFood = true;
		length+=2;
		score++;
	}
}

function checkCollision() {
	if ((snake[0].x < 0|| snake[0].x >= canvas.width) || (snake[0].y <= 0 || snake[0].y >= canvas.height)) {
		alert('GAME OVER - crashed into wall');
		document.location.reload();
	}

	for (var i = 1; i < length; i++) {
		if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
			alert('GAME OVER - crashed into self');
			document.location.reload();
		}
	}

	if (snake[0].x > bar1X && snake[0].x < bar1X + barWidth && snake[0].y > bar1Y && snake[0].y < bar1Y + barHeight) {
		alert('GAME OVER - crashed into barrier');
		document.location.reload();
	}

	if (snake[0].x > bar2X && snake[0].x < bar2X + barWidth && snake[0].y > bar2Y && snake[0].y < bar2Y + barHeight) {
		alert('GAME OVER - crashed into barrier');
		document.location.reload();
	}
}

function drawScore () {
	ctx.font = "20px Arial";
	ctx.fillStyle = "#0095DD";
	ctx.fillText("Score: " + score,360,590);
}

function draw () {
	document.getElementById("startButton").style.visibility = "hidden";
	ctx.clearRect(0,0,canvas.width, canvas.height);
	drawBarrier();
	drawSnake();
	moveSnake();
	createFood();
	ate();
	
	
	if(lastPress!=0){
		checkCollision();
	}

	drawScore();

}

 function startGame () {
 	 setInterval(draw, 30);
 }

