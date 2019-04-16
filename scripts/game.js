/* VARIABLES*/
let canvas=document.querySelector('canvas'),
    context=canvas.getContext('2d'),
    score=0
const aRadius=[20, 30, 40]
let asteroids = new Array(5), aPosX, aPosY, radius, indexRadius, sPosX, sPosY
//Fond dégradé
const gradient = context.createRadialGradient(
    400, 200, 100,
    400, 300, 400,
    400, 300, 600,
)
//Souris
let mouse = { x: 0, y: 0 }

/*OBJETS*/
//Spaceship
class Spaceship{
  constructor(sPosX, sPosY){
    this.sPosX=sPosX
    this.sPosY=sPosY
    this.life=0
    this.munition=100
  }
  draw(){
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

// Asteroïdes
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
}

/* GAME */
// Récupération des coordonnées de la souris
window.addEventListener(
  'mousemove',
   function(event){
    mouse.x = event.clientX
    mouse.y = event.clientY
})

// Création du vaisseau spacial
let spaceship=new Spaceship(0,0)

// Création astéroïdes
let play= setInterval(
    function(){
    generateAsteroid()
  },
  1500
)

// Animation
const loop = () =>
{
    window.requestAnimationFrame(loop)
    // Met à jour les coordonnées de du vaiseau en appliquant un easing
    spaceship.sPosX += (mouse.x - spaceship.sPosX) * 0.1
    spaceship.sPosY += (mouse.y - spaceship.sPosY) * 0.1
    // Astéroïdes se déplacent verticalement
    for (let i = 0; i < asteroids.length; i++){
      asteroids[i].aPosY += 5
    }
      // Si une asteroide arrive sur le vaisseau, le score diminue
    //   if (asteroids[i].posY-SposY==10 && asteroids[i].posX-SposX==10){
    //     score--
    //   }
    // }
    // Efface le canvas
    gradient.addColorStop(0, '#6b35ab')    // Couleur de départ
    gradient.addColorStop(0.5, '#322778') // Couleur de milieu
    gradient.addColorStop(1, '#041444') // Couleur de arrivée
    context.fillStyle = gradient  // Le dégradé devient le style de remplissage
    context.fillRect(0, 0, canvas.width, canvas.height) // remplissage du canvas
    // Dessine les asteroides
    for (let i = 0; i < asteroids.length; i++) {
      asteroids[i].draw()
    }
    // Dessine le vaisseau
    spaceship.draw()
    //Affiche le score
    context.font = '20px Arial'
    context.fillText(score, 700, 50)
}
loop()




/*FUNCTIONS*/
// Spaceship



// Asteroïdes

function generateAsteroid(){
  for (let i = 0; i < asteroids.length; i++){
    aPosY=20
    aPosX=Math.floor(Math.random()*800)
    indexRadius=Math.floor(Math.random()*3)
    radius=aRadius[indexRadius]
    asteroids[i] = new Asteroid(aPosX, aPosY, radius)
  }
}
