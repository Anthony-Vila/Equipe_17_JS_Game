const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

// Spaceship

context.beginPath()      // Commencer un tracé

context.moveTo(50, 50)   // Placer le tracé
context.lineTo(200, 200) // Tracer une ligne
context.lineTo(50, 200)  // Tracer autre une ligne

context.fill()           // Faire apparaitre la forme dessinée

// Asteroïdes
