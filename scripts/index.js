let star , specialStar
let randomX , randomY , randomSize
let starContainer = document.querySelector('#img__container')
let stars = new Array()

function getRandomPosition(element) {
	var x = document.body.offsetHeight-element.clientHeight
	var y = document.body.offsetWidth-element.clientWidth
	var randomX = Math.floor(Math.random()*x)
	var randomY = Math.floor(Math.random()*y)
	return [randomX,randomY]
}
for (let i=0; i<200;i++){                   // Creation de 200 images :etoiles
window.onload=etoileBackground()
  function etoileBackground () {
    var randomSize = Math.floor(Math.random()*20)
    var star = document.createElement("IMG")
    star.classList.add("star")
    star.setAttribute("src", "images/etoile.png")
    star.style.filter = "blur(1px)"
    star.classList.add("rotating")      //ajout d'une classe pour la rotation
    star.style.position = "absolute"
    star.style.transition ="all 1s"
    starContainer.appendChild(star)
    var xy = getRandomPosition(star)
	  star.style.top = xy[0] + 'px'      //emplacement au hasard
	  star.style.left = xy[1] + 'px'
    star.style.width = randomSize + 'px'    //taille au hasard
    star.style.height = randomSize + 'px'
  }
  stars.push(star)
}
setInterval(function(){
  stars = document.querySelectorAll('.star')
  console.log(stars)
   for(let i=0; i<stars.length;i++){
    specialStar = stars[Math.floor(Math.random()*stars.length)]   //selection d'une etoile au hasard
    specialStar.classList.toggle("specialStar")   //eleve le flou de l'etoile
   }
}, 3000)
