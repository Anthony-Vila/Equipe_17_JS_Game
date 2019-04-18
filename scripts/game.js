/* VARIABLES*/
let canvas=document.querySelector('canvas'),
    context=canvas.getContext('2d')
const aRadius=[20, 30, 40]
let aPosX, aPosY, radius, indexRadius, sPosX, sPosY, shPosX, shPosY, shNxtPosY, indexaPosX, indexaPosY, id, destroyedAsteroids=[]

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
  asteroids:[],
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

// Asteroids
class Asteroid{
  constructor(aPosX, aPosY, radius, id){
    this.aPosX=aPosX
    this.aPosY=aPosY
    this.radius=radius
    this.id=id
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
        aPosY=-Math.floor(Math.random()*canvas.height/5)
        indexRadius=Math.floor(Math.random()*3)
        radius=aRadius[indexRadius]
        id=i
        game.asteroids.push(new Asteroid(aPosX, aPosY, radius, id))
      }
  }
  static deleteAsteroids(){
    game.asteroids.splice(0, game.asteroids.length)
  }
}

// Mouse
let mouse ={
  x: 0,
  y: 0 ,
// mouse coords
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
Asteroid.generateAsteroid(10)
Shooting.shoot()
let play= setInterval(
    function(){
    Shooting.shoot(),
    Asteroid.deleteAsteroids(),
    Shooting.deleteShootings(),
    Asteroid.generateAsteroid(10),
    game.score +=10
  },
  2000
)

mouse.mouseMouve()

// Animation
const loop = () =>
{
    window.requestAnimationFrame(loop)
    // update spaceship coords
    spaceship.sPosX += (mouse.x - spaceship.sPosX)
    spaceship.sPosY += (mouse.y - spaceship.sPosY)
    // asteroids fall
    for (let i = 0; i < game.asteroids.length; i++){
      game.asteroids[i].aPosY += 5
      // collision between spaceship and asteroid
      if (Math.abs(game.asteroids[i].aPosY-spaceship.sPosY)<=game.asteroids[i].radius && Math.abs(game.asteroids[i].aPosX-spaceship.sPosX)<=game.asteroids[i].radius){
        if (destroyedAsteroids.indexOf(game.asteroids[i].id)==-1){
          destroyedAsteroids.push(game.asteroids[i].id)
          game.life--
        }
      }
    }
    // when life=0, game over
    if (game.life<=0){
      window.alert("Game over")
    }
    // when shooting a asteroid, score increases and the asteroid disappears
    for (let i = 0; i < game.shootings.length; i++) {
      for (let j = 0; j < game.asteroids.length; j++) {
        if ( (game.shootings[i].shPosX > (game.asteroids[j].aPosX-game.asteroids[j].radius)) && game.shootings[i].shPosX<game.asteroids[j].aPosX+game.asteroids[j].radius && game.shootings[i].shNxtPosY + game.shootings[i].shPosY > game.asteroids[j].aPosY-game.asteroids[j].radius && game.shootings[i].shNxtPosY + game.shootings[i].shPosY<game.asteroids[j].aPosY+game.asteroids[j].radius){
          game.score +=20
          game.asteroids.splice(j, 1)
        }
      }
    }
    // clear the canvas
    game.generateBackground()
    // draw the spaceship
    spaceship.draw()
    // draw the asteroids
    for (let i = 0; i < game.asteroids.length; i++) {
      game.asteroids[i].draw()
    }
    // draw the shootings
    for (let i = 0; i < game.shootings.length; i++) {
      game.shootings[i].draw()
      game.shootings[i].shNxtPosY -=20
    }
    //display score
    context.font = '20px Arial'
    context.fillText("Score: "+game.score, canvas.width*0.9, canvas.height*0.1)
    context.fillText("Vies: "+game.life, canvas.width*0.9 ,canvas.height*0.15)
}
loop()
