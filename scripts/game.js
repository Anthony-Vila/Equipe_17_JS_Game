/* VARIABLES*/
let canvas=document.querySelector('canvas'),
    context=canvas.getContext('2d'),
    score=0
// Asteroid
const tRadius=[20, 30, 40]
let asteroids = new Array(5)
let posX, posY, radius, indexRadius, SposX, SposY
//Fond
const gradient = context.createRadialGradient(
    400, 200, 100,
    400, 300, 400,
    400, 300, 600,
)

/*OBJETS*/
//Spaceship
class Spaceship{
  constructor(SposX, SposY, life, munition, reload){
    this.SposX=SposX
    this.SposY=SposY
    this.life=life
    this.munition=munition
    this.reload=reload
  }
  draw(){
    context.beginPath()
    context.fillStyle="white"
    context.moveTo(0,-20);
    context.lineTo(16,10);
    context.lineTo(-16,10);
    context.closePath();
    context.strokeStyle = "#FFFFFF";
    context.lineWidth = 2;
    context.lineJoin = 'round';
    context.shadowColor = 'rgba(255,255,255,0.4)';
    context.shadowBlur = 10;
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;
    context.fill()
    context.stroke()
  }
}

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
// Coordonnées de la souris
const mouse = { x: 0, y: 0 }

window.addEventListener('mousemove', (event) =>
{
    mouse.x = event.clientX
    mouse.y = event.clientY
})

// Création vaisseau
let spaceship=new Spaceship(0,300,100)

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
    // Astéroïdes se déplacent verticalement
    for (let i = 0; i < asteroids.length; i++){
      asteroids[i].posY += 5
    }
    // Met à jour les coordonnées de du vaiseau en appliquant un easing
    SposX += (mouse.x - SposX) * 0.1
    SposY += (mouse.y - SposY) * 0.1
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
    spaceship.draw()
    //afficher score
    context.font = '20px Arial'
    context.fillText(score, 700, 50)
}
loop()




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

function generateSpaceship(){
  for (let i = 0; i < asteroids.length; i++){
    console.log(Spaceship);
    SposY=50
    SposX=80
    Spaceship[i] = new Spaceship(SposX, SposY)
    Spaceship[i].draw()
}
}
