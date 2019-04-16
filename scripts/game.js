/* VARIABLES*/
let canvas    = document.querySelector('canvas'),
    context   = canvas.getContext('2d'),
    score = 0

const tRadius=[20, 30, 40]
let asteroids = new Array(5)
let posX, posY, radius, indexRadius

/*OBJETS*/
//Spaceship


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

/* GAME */

generateAsteroid()


/*FUNCTIONS*/
// Spaceship



// Asteroïdes

function generateAsteroid(){
  for (let i = 0; i < asteroids.length; i++){
    console.log(asteroids);
    posY=20
    posX=Math.floor(Math.random()*800)
    indexRadius=Math.floor(Math.random()*3)
    radius=tRadius[indexRadius]
    asteroids[i] = new Asteroid(posX, posY, radius)
    asteroids[i].draw()
  }
}
