let star
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
    var star = document.createElement("IMG")
    star.setAttribute("src", "images/etoile.png")
    star.style.position = "absolute"
    let starContainer = document.querySelector('#img__container')
    starContainer.appendChild(star)
    var xy = getRandomPosition(star);
	  star.style.top = xy[0] + 'px'
	  star.style.left = xy[1] + 'px'
    star.style.width = randomSize + 'px'
    star.style.height = randomSize + 'px'
  }
}
