/* VARIABLES*/
let canvas=document.querySelector('canvas'),
    context=canvas.getContext('2d')
const aRadius=[20, 30, 40]
let aPosX, aPosY, radius, indexRadius, sPosX, sPosY, shPosX, shPosY, shNxtPosY, indexaPosX, indexaPosY

/* RESIZE CANVAS */
function resizeCanvas(){
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
  width         = window.innerWidth;
  height        = window.innerHeight;
}
window.addEventListener('resize',resizeCanvas);
resizeCanvas();

/*OBJETS*/
// Game
let game = {
  background:context.createRadialGradient(
      700, 400, 200,
      700, 600, 800,
      700, 600, 1200,
  ),
  score:0,
  life:3,
  asteroids:new Array(10),
  shootings:[],
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
    context.moveTo(this.sPosX+30,this.sPosY+30) //en bas à droite
    context.lineTo(this.sPosX-30, this.sPosY+30) // en bas à gauche
    context.lineTo(this.sPosX,this.sPosY-30) // en haut
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

// Asteroids  indexaPosX, indexaPosY
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
        aPosX=Math.floor(Math.random()*canvas.width)
        aPosY=Math.floor(Math.random()*canvas.height/5)
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

// shooting
class Shooting{
  constructor(shPosX, shPosY, shNextPosY){
    this.shPosX= shPosX,
    this.shPosY= shPosY,
    this.shNxtPosY=shNextPosY
  }
  static shoot(){
    canvas.addEventListener(
      'click',
      function(){
        this.shPosX=spaceship.sPosX
        this.shPosY=spaceship.sPosY
        game.shootings.push(new Shooting(this.shPosX, this.shPosY, 0))
        for (let i = 0; i < game.asteroids.length; i++) {
          if (Math.abs(this.shPosX-game.asteroids[i].aPosX)<=5){
            game.score +=20
            game.asteroids.splice(i,i)
          }
        }
      }
    )
  }
  draw(){
    context.beginPath()
    context.moveTo(this.shPosX, this.shPosY-30)
    context.lineTo(this.shPosX, this.shPosY-30+this.shNxtPosY)
    context.closePath()
    context.shadowBlur=0
    context.lineWidth = 1
    context.strokeStyle = 'red'
    context.stroke()
  }
  static deleteShootings(){
    game.shootings.splice(0, game.shootings.length)
  }
}



/* GAME */
// Asteroids creation
Asteroid.generateAsteroid(game.asteroids.length)
Shooting.shoot()
let play= setInterval(
    function(){
    Asteroid.generateAsteroid(game.asteroids.length),
    Shooting.shoot(),
    Shooting.deleteShootings(),
    game.score +=10
  },
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
    // Astéroïdes se déplacent verticalement
    for (let i = 0; i < game.asteroids.length; i++){
      game.asteroids[i].aPosY += 5
      // Si une asteroide arrive sur le vaisseau, le score diminue
      if (Math.abs(game.asteroids[i].aPosY-spaceship.sPosY)<=game.asteroids[i].radius && Math.abs(game.asteroids[i].aPosX-spaceship.sPosX)<=game.asteroids[i].radius){
        game.life=game.life-1/game.asteroids[i].radius
      }
    }
    // Efface le canvas
    game.generateBackground()
    // Dessine le vaisseau
    spaceship.draw()
    // Dessine les asteroides
    for (let i = 0; i < game.asteroids.length; i++) {
      game.asteroids[i].draw()
    }
    // Dessine les tirs
    for (let i = 0; i < game.shootings.length; i++) {
      game.shootings[i].draw()
      game.shootings[i].shNxtPosY -=20
    }
    //Affiche le score
    context.font = '20px Arial'
    context.fillText("Score: "+game.score, canvas.width*0.9, canvas.height*0.1)
    context.fillText("Vies: "+game.life, canvas.width*0.9 ,canvas.height*0.15)
}
loop()
