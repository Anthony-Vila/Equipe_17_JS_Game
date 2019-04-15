/* VARIABLES*/
var canvas    = document.querySelector('canvas'),
    context   = canvas.getContext('2d'),
    width     = window.innerWidth,
    height    = window.innerHeight,
    game_over = false,
    game_start = false,
    wait_restart = false,
    time_spend = 0,
    asteroid_destroyed = 0,
    score = 0;

var score_munition_update;

// Spaceship

context.fill()

// Asteroïdes

class Asteroid{
  constructor(posX, posY, radius){
    this.posX=posX;
    this.posY=posY;
    this.radius=radius;
  }
  draw(){
    context.beginPath();
    context.fillStyle="#C6C7A2"
    context.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI);
    context.fill();
  }
}

let asteroid1 = new Asteroid(50, 50, 20);
asteroid1.draw()
