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

var score_munition_update


// Jeu

init()

function init()
{
  //initialisation
  score = 0

  //lancement du jeu
  generateAsteroid()

  let play= setInterval(
    function(){
    asteroidFall()
  },
  1000
  )
}


// Spaceship

context.fill()

// Asteroïdes

class Asteroid{
  constructor(posX, posY, radius){
    this.posX=posX
    this.posY=posY
    this.radius=radius
  }
  draw(){
    context.beginPath()
    context.fillStyle="#C6C7A2"
    context.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI)
    context.fill()
  }
}

// let asteroid1 = new Asteroid(50, 50, 10);
// asteroid1.draw();

const tRadius=[20, 30, 40]
const asteroids=new Array(5)
let posX, posY, radius, indexRadius

function generateAsteroid(){
  for (let i = 0; i < asteroids.length; i++) {
    posY=20
    posX=Math.floor(Math.random()*800)
    indexRadius=Math.floor(Math.random()*3)
    radius=tRadius[indexRadius]
    asteroids[i]=new Asteroid(posX, posY, radius)
    asteroids[i].draw()
  }
}

function asteroidFall(){
  
}
