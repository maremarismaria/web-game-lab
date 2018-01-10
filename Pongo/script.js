var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

//Canvas properties
var wdt = canvas.width;
var hgt = canvas.height;

//Ball properties
var x = wdt / 2;
var y = hgt - 50;
var radiusBall = 10;
var movX = 2;
var movY = -2;

//Paddle properties
var xPaddle = wdt - 50;
var yPaddle = 200;

//Keyword event listeners
document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

//Ball
function drawBall(colour){
  ctx.beginPath();
  ctx.arc(x, y, radiusBall, 0, Math.PI * 2);
  ctx.strokeStyle = colour;
  ctx.fillStyle = colour;
  ctx.fill();
  ctx.stroke();
  ctx.closePath();
}

//Paddle
function drawPaddle(colour){
  ctx.beginPath();
  ctx.rect(xPaddle, yPaddle, 10, 100);
  ctx.strokeStyle = colour;
  ctx.fillStyle = colour;
  ctx.fill();
  ctx.stroke();
  ctx.closePath();
}

//Text
function drawText(message, text, posX, posY){
  ctx.font = "bold 20px Courier New";
  ctx.fillText(message + ": " + text, posX, posY);
}

//Key events for paddle
var upPressed = false; //38
var downPressed = false; //40

function keyDownHandler(evt){
  if (evt.keyCode == 38) {
    upPressed = true;
    //console.log('Up detected!');
  }else if (evt.keyCode == 40) {
    downPressed = true;
    //console.log('Down detected!');
  }
}

function keyUpHandler(evt){
  if (evt.keyCode == 38) {
    upPressed = false;
  }else if (evt.keyCode == 40) {
    downPressed = false;
  }
}

//Fails & collisions
var numFails = 0;
var numCollision = 0;

function calculateFails(){
  var failure = x + movX + radiusBall == hgt;
  if (failure) {
    numFails++;
  }
  return numFails;
}

/*GAME*/

function game(){
  ctx.clearRect(0, 0, wdt, hgt);

  drawBall('#F98903');
  drawPaddle('#FEFFCB');

  //Ball performance
  if (x + movX > wdt - radiusBall || x + movX < radiusBall) {
    movX *= -1;
  }

  if (y + movY > hgt - radiusBall || y + movY < radiusBall) {
    movY *= -1;
  }

  x += movX;
  y += movY;

  //Paddle performance
  if (upPressed && yPaddle > 0) {
    yPaddle -= 4;
  }else if (downPressed && yPaddle < hgt - 100) { //100 -> paddle's height
    yPaddle += 4;
  }

  //Colissions
  var xPaddleCollision = x + movX + radiusBall == xPaddle || x + movX >= xPaddle + 10;
  var yPaddleCollision = y + movY >= yPaddle && y + movY <= yPaddle + 100;

  if (xPaddleCollision && yPaddleCollision) {
    movX *= -1;
    movY *= -1;

    var collision = x + movX >= xPaddle + 10;
    if (!collision) { //inner side: I wont numCollision++ in this case
      numCollision++;
    }

  }

  drawText("Fails", calculateFails(), 15, 30);
  drawText("Collisions", numCollision, 150, 30);

}

setInterval(game, 8);
