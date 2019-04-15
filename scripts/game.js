const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

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
