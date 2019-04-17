/* VARIABLES*/
let canvas=document.querySelector('canvas'),
    context=canvas.getContext('2d')
const aRadius=[20, 30, 40]
let aPosX, aPosY, radius, indexRadius, sPosX, sPosY

/*OBJETS*/
// Game
let game = {
  background:context.createRadialGradient(
      400, 200, 100,
      400, 300, 400,
      400, 300, 600,
  ),
  score:0,
  asteroids:new Array(5),
  generateBackground:function(){
    this.background.addColorStop(0, '#6b35ab')    // Couleur de départ
    this.background.addColorStop(0.5, '#322778') // Couleur de milieu
    this.background.addColorStop(1, '#041444') // Couleur de arrivée
    context.fillStyle = this.background
    context.fillRect(0, 0, canvas.width, canvas.height) // remplissage du canvas
  }
}

//Spaceship
let spaceship ={
  sPosX: 0,
  sPosY: 0,
  hp : 100,
  munition : 100,
  draw :function(){
    context.beginPath()
    context.moveTo(this.sPosX+30,this.sPosY) //en bas à droite
    context.lineTo(this.sPosX-30, this.sPosY) // en bas à gauche
    context.lineTo(this.sPosX,this.sPosY-60) // en haut
    context.closePath()
    context.fillStyle = '#fff'
    context.strokeStyle = "#FFFFFF"
    context.lineWidth = 2
    context.lineJoin = 'round'
    context.shadowColor = 'rgba(255,255,255,0.4)'
    context.shadowBlur = 10
    context.shadowOffsetX = 0
    context.shadowOffsetY = 0
    context.stroke()
    context.fill()
  }
}

// Asteroids
class Asteroid{
  constructor(aPosX, aPosY, radius){
    this.aPosX=aPosX
    this.aPosY=aPosY
    this.radius=radius
  }
  draw(){
    context.beginPath()
    context.fillStyle="#C6C7A2"
    context.arc(this.aPosX, this.aPosY, this.radius, 0, 2 * Math.PI)
    context.fill()
  }
  static generateAsteroid (number) {
      for (let i = 0; i < number; i++){
        aPosY=Math.floor(Math.random()*600)
        aPosX=Math.floor(Math.random()*800)
        indexRadius=Math.floor(Math.random()*3)
        radius=aRadius[indexRadius]
        game.asteroids[i] = new Asteroid(aPosX, aPosY, radius)
      }
  }
}

// Souris
let mouse ={
  x: 0,
  y: 0 ,
// Récupération des coordonnées de la souris
   mouseMouve : function(){
     window.addEventListener(
      'mousemove',
      function(event){
        mouse.x = event.clientX
        mouse.y = event.clientY
    })
  }
}

/* GAME */
// Asteroids creation
Asteroid.generateAsteroid(game.asteroids.length)
let play= setInterval(
    function(){
    Asteroid.generateAsteroid(game.asteroids.length,
    game.score +=50)
    }
  1500
)

mouse.mouseMouve()

// Animation
const loop = () =>
{
    window.requestAnimationFrame(loop)
    // Met à jour les coordonnées de du vaisseau en appliquant un easing
    spaceship.sPosX += (mouse.x - spaceship.sPosX)
    spaceship.sPosY += (mouse.y - spaceship.sPosY)
    //console.log(spaceship.sPosY, mouse.y, spaceship.sPosY )
    // Astéroïdes se déplacent verticalement
    for (let i = 0; i < game.asteroids.length; i++){
      game.asteroids[i].aPosY += 5
      // Si une asteroide arrive sur le vaisseau, le score diminue
      if (Math.abs(game.asteroids[i].aPosY-spaceship.sPosY)<=10 && Math.abs(game.asteroids[i].aPosX-spaceship.sPosX)<=10){
        game.score--
      }
    }
    // Efface le canvas
    game.generateBackground()
    // Dessine les asteroides
    for (let i = 0; i < game.asteroids.length; i++) {
      game.asteroids[i].draw()
    }
    // Dessine le vaisseau
    spaceship.draw()
    //Affiche le score
    context.font = '20px Arial'
    context.fillText(game.score, 700, 50)
}
loop()




/*FUNCTIONS*/
// Spaceship
