let ball1, ball2, ball3;

let SPEED = 3;

let whichBall = 1;

function setup() {
  createCanvas(600, 600);
  ellipseMode(RADIUS);
  resetAllBalls()
}

function draw() {
  background(220);
  drawBall(ball1);
  updateBall(ball1);
  keepInBounds(ball1);
  drawBall(ball2);
  updateBall(ball2);
  keepInBounds(ball2);
  drawBall(ball3);
  updateBall(ball3);
  keepInBounds(ball3);
  bounceBalls(ball1,ball2);
  bounceBalls(ball2,ball3);
  bounceBalls(ball1,ball3);
}

function bounceBalls(ballA, ballB) {
  // if the distance between the centers is less than the sum of their radii
  if( dist(ballA.position.x,ballA.position.y,ballB.position.x,ballB.position.y) <= ballA.radius + ballB.radius ) {
    ballA.velocity.x *= -1;
    ballA.velocity.y *= -1;
    ballB.velocity.x *= -1;
    ballB.velocity.y *= -1;
  }
}


function keepInBounds(ball) {
  // ball.x + ball.r > width, then we are off the screen // right
  if( ball.position.x + ball.radius > width ) {
     ball.velocity.x *= -1; // change x direction
  }
  // ball.y + ball.r > height, then we are off the screen // bottom
  if( ball.position.y + ball.radius > height ) {
    ball.velocity.y *= -1; // change y direction
  }
  // ball.x - ball.r < 0, then we are off the screen // left
  if( ball.position.x - ball.radius < 0 ) {
    ball.velocity.x *= -1; // change x direction
  }
  // ball.y - ball.r > 0, then we are off the screen // top
  if( ball.position.y - ball.radius < 0 ) {
    ball.velocity.y *= -1; // change y direction
  }
}

function resetAllBalls() {
  ball1 = createBall()
  ball2 = createBall()
  ball3 = createBall()  
}

function mouseClicked() {
  
  // create a new ball wherever we clicked the mouse
  if( whichBall === 1 ) {
    ball1 = createBallAt({x:mouseX,y:mouseY})
  }
  
}

function keyPressed() {
  if( key === 'r' ) {
    resetAllBalls()
  }
}

function updateBall(ball) {
  ball.position.y = ball.position.y + ball.velocity.y;
  ball.position.x = ball.position.x + ball.velocity.x;  
}

function drawBall(ball) { // implicit declaration of the variable (parameter) ball
  fill(ball.c);
  circle(ball.position.x,ball.position.y,ball.radius);  
}

function createBallAt(position) {
  let ball = {} // creating an empty object
  // assigning properties to that object
  ball.c = color(random(256),random(256),random(256))
  ball.radius = random(10,50)
  ball.position = position
  ball.velocity = {
    x: random(-SPEED,SPEED),
    y: random(-SPEED,SPEED)
  }
  return ball;  
}


function createBall() {
  return createBallAt({
    x: random(50, width-50),
    y: random(50, height-50)
  });
}
