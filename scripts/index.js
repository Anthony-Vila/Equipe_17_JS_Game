let etoile
let randomX , randomY , randomSize

function getRandomPosition(element) {
	var x = document.body.offsetHeight-element.clientHeight
	var y = document.body.offsetWidth-element.clientWidth
	var randomX = Math.floor(Math.random()*x)
	var randomY = Math.floor(Math.random()*y)
	return [randomX,randomY]
}
for (let i=0; i<200;i++){
window.onload=etoileBackground()
  function etoileBackground () {
    var randomSize = Math.floor(Math.random()*15)
    var etoile = document.createElement("IMG")
    etoile.setAttribute("src", "images/etoile.png")
    etoile.style.position = "absolute"
    let starContainer = document.querySelector('#img__container')
    starContainer.appendChild(etoile)
    var xy = getRandomPosition(etoile);
	  etoile.style.top = xy[0] + 'px'
	  etoile.style.left = xy[1] + 'px'
    etoile.style.width = randomSize + 'px'
    etoile.style.height = randomSize + 'px'
  }
}
