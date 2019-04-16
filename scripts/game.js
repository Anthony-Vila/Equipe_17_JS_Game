/* VARIABLES*/
let canvas=document.querySelector('canvas'),
    context=canvas.getContext('2d'),
    score=0
// Asteroid
const tRadius=[20, 30, 40]
let asteroids = new Array(5)
let posX, posY, radius, indexRadius
//Fond
const gradient = context.createRadialGradient(
    400, 300, 100,
    400, 300, 400,
    400, 300, 600,
)

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

let asteroidtest=new Asteroid(20, 20, 30)

const loop = () =>
{
    window.requestAnimationFrame(loop)
    // Mise à jour des coordonnées
    asteroidtest.posY += 5
    // Efface le canvas
    gradient.addColorStop(0, '#6b35ab')    // Couleur de départ
    gradient.addColorStop(0.5, ' #322778') // Couleur de milieu
    gradient.addColorStop(1, '#041444') // Couleur de arrivée
    context.fillStyle = gradient  // Le dégradé devient le style de remplissage
    // context.fillStyle = '#041444'
    context.fillRect(0, 0, canvas.width, canvas.height)
    // Dessine l'asteroide
    asteroidtest.draw()
}
loop()


// let play= setInterval(
//     function(){
//     generateAsteroid()
//   },
//   1000
//   )


/*FUNCTIONS*/
// Spaceship



// Asteroïdes

function generateAsteroid(){
  for (let i = 0; i < asteroids.length; i++){
    posY=20
    posX=Math.floor(Math.random()*800)
    indexRadius=Math.floor(Math.random()*3)
    radius=tRadius[indexRadius]
    asteroids[i] = new Asteroid(posX, posY, radius)
  }
}
