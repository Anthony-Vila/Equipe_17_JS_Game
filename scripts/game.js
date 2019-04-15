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

context.beginPath()      // Commencer un tracé

context.moveTo(50, 50)   // Placer le tracé
context.lineTo(200, 200) // Tracer une ligne
context.lineTo(50, 200)  // Tracer autre une ligne

context.fill()           // Faire apparaitre la forme dessinée

// Asteroïdes

class Asteroid{
  constructor(diameter){
    this.diameter=diameter
  }
  display(){
    context.beginPath();
    context.fillStyle="#FF4422"
    context.arc(80, 80, 70, 0, 2 * Math.PI);
    context.fill();
  }
}

let asteroid1 = new Asteroid(100)
 asteroid1.display()
